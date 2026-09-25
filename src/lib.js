// Shared constants, DOM builders and animation helpers.
// Every tween lives on one paused master timeline, so any frame is a pure function of time.
gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin, CustomEase);
// 2D transforms only: no compositor layers, so a frame renders the same however the playhead got there.
gsap.config({ force3D: false });

const W = 1920, H = 1080, FPS = 30;
const OFF = -0.22;                                          // the voice-over is trimmed by 0.22 s: its first word lands at 0.5 s
const A = t => Math.round((t + OFF) * 1000) / 1000;         // audio time (words.json) -> video time
const DUR = 141.1;
const C = {
  red: '#E6352F', redDk: '#C92A24', tint: '#FCE8E6', tint2: '#F7D3CF',
  bg: '#F6F4F1', ink: '#1F1B1B', ink2: '#6A625F', line: '#E2DBD5', white: '#FFFFFF',
};
const SVGNS = 'http://www.w3.org/2000/svg';
CustomEase.create('swift', 'M0,0 C0.6,0 0.12,1 1,1');       // quick start, long soft landing
CustomEase.create('wipe', 'M0,0 C0.75,0 0.2,1 1,1');

const clean = o => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

// ---------- DOM ----------
function h(tag, o = {}, parent) {
  const el = document.createElement(tag);
  if (o.cls) el.className = o.cls;
  if (o.html != null) el.innerHTML = o.html;
  if (o.css) gsap.set(el, clean(o.css));
  (parent || STAGE).appendChild(el);
  return el;
}

// Absolutely positioned text block. align: 'left' | 'center' | 'right' (x is the anchor)
function T(parent, html, o = {}) {
  const el = h('div', { cls: 't ' + (o.cls || '') + (o.rw ? ' rw' : ''), html }, parent);
  const w = o.w;
  let left = o.x;
  if (o.align === 'center' && w) left = o.x - w / 2;
  if (o.align === 'right' && w) left = o.x - w;
  gsap.set(el, clean({ left, top: o.y, width: w, fontSize: o.size, fontWeight: o.weight, color: o.color,
    textAlign: o.align, lineHeight: o.lh, letterSpacing: o.ls, whiteSpace: o.nowrap ? 'nowrap' : undefined }));
  return el;
}

function box(parent, o = {}) {
  const el = h('div', { cls: 'abs ' + (o.cls || '') }, parent);
  gsap.set(el, clean({ left: o.x, top: o.y, width: o.w, height: o.h, backgroundColor: o.bg, borderRadius: o.r,
    boxShadow: o.shadow, border: o.border, transformOrigin: o.origin }));
  return el;
}

function sv(tag, attrs = {}, parent) {
  const el = document.createElementNS(SVGNS, tag);
  for (const k in attrs) if (attrs[k] !== undefined) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

// Full-frame SVG layer (viewBox == stage pixels) so shapes can use stage coordinates.
function layer(parent, z) {
  const s = sv('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}` });
  s.style.cssText = `position:absolute;left:0;top:0;${z != null ? 'z-index:' + z : ''}`;
  parent.appendChild(s);
  return s;
}

// Lucide icon centred on (cx, cy) in stage px. Returns the wrapper <g> (scale/rotate around its centre).
function icon(parent, name, o = {}) {
  const size = o.size || 96, sw = o.sw || 1.75;
  const svg = sv('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: o.color || C.red,
    'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  svg.innerHTML = window.LUCIDE[name];
  svg.style.cssText = `position:absolute;left:${o.cx - size / 2}px;top:${o.cy - size / 2}px;`;
  parent.appendChild(svg);
  return svg;
}

// Rounded check mark inside a circle (for checklists), drawn in stage px.
function checkIcon(parent, cx, cy, r, color = C.red) {
  const s = sv('svg', { width: r * 2 + 8, height: r * 2 + 8, viewBox: `${-r - 4} ${-r - 4} ${r * 2 + 8} ${r * 2 + 8}` });
  s.style.cssText = `position:absolute;left:${cx - r - 4}px;top:${cy - r - 4}px;`;
  parent.appendChild(s);
  const disc = sv('circle', { r, fill: color }, s);
  const ring = sv('circle', { r: r - 1.5, fill: 'none', stroke: color, 'stroke-width': 3 }, s);
  const tick = sv('path', { d: `M${-r * .38} ${r * .02} L${-r * .1} ${r * .3} L${r * .42} ${-r * .28}`, fill: 'none',
    stroke: '#fff', 'stroke-width': r * .16, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, s);
  return { s, disc, ring, tick };
}

// ---------- text splitting ----------
const splitLines = el => SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' });
const splitWords = el => SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'wd' });

// ---------- animation helpers (t = absolute video time) ----------
function revealLines(tl, el, t, o = {}) {
  const s = el.lines ? el : splitLines(el);
  tl.fromTo(s.lines, { yPercent: 150 }, { yPercent: 0, duration: o.dur || 1, ease: o.ease || 'expo.out', stagger: o.stagger ?? .09 }, t);
  return s;
}
function revealWords(tl, el, t, o = {}) {
  const s = el.words ? el : splitWords(el);
  tl.fromTo(s.words, { yPercent: 150 }, { yPercent: 0, duration: o.dur || .9, ease: o.ease || 'expo.out', stagger: o.stagger ?? .06 }, t);
  return s;
}
function hideSplit(tl, s, t, o = {}) {
  const parts = s.lines && s.lines.length ? s.lines : s.words;
  tl.to(parts, { yPercent: -150, duration: o.dur || .4, ease: o.ease || 'power2.in', stagger: o.stagger ?? .03 }, t);
}
function fadeUp(tl, el, t, o = {}) {
  tl.fromTo(el, { autoAlpha: 0, y: o.dy ?? 40 }, { autoAlpha: 1, y: 0, duration: o.dur || .9, ease: o.ease || 'expo.out' }, t);
}
function fadeOut(tl, el, t, o = {}) {
  tl.to(el, { autoAlpha: 0, y: o.dy ?? -30, duration: o.dur || .45, ease: o.ease || 'power2.in' }, t);
}
function pop(tl, el, t, o = {}) {
  tl.fromTo(el, { scale: o.from ?? 0, autoAlpha: 0, transformOrigin: o.origin || '50% 50%' },
    { scale: 1, autoAlpha: 1, duration: o.dur || .7, ease: o.ease || 'back.out(1.9)' }, t);
}
function drawIn(tl, root, t, o = {}) {
  const parts = root.matches && root.matches('path,circle,line,polyline,rect,ellipse,polygon') ? [root]
    : [...root.querySelectorAll('path,circle,line,polyline,rect,ellipse,polygon')];
  tl.fromTo(parts, { drawSVG: o.from || '0%' }, { drawSVG: '100%', duration: o.dur || 1.1, ease: o.ease || 'power2.inOut', stagger: o.stagger ?? .12 }, t);
  return parts;
}
// A soft "breathing" loop between two times (for things that must never freeze).
function breathe(tl, el, t0, t1, o = {}) {
  const period = o.period || 2.4, n = Math.max(1, Math.floor((t1 - t0) / period));
  tl.to(el, { scale: o.scale || 1.04, duration: period / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1, transformOrigin: '50% 50%' }, t0);
}
// Scene visibility window
function show(tl, scene, t0, t1) {
  tl.set(scene, { autoAlpha: 1 }, t0);
  if (t1 != null) tl.set(scene, { autoAlpha: 0 }, t1);
}

// Two-layer sweep across the frame (deep red leads, red follows; they leave in the same direction).
// Returns the time of full cover, when the scenes underneath can swap.
function sweep(tl, parent, t, o = {}) {
  const a = box(parent, { x: 0, y: 0, w: W, h: H, bg: o.c1 || C.redDk });
  const b = box(parent, { x: 0, y: 0, w: W, h: H, bg: o.c2 || C.red });
  a.style.zIndex = b.style.zIndex = 50;
  const prop = o.vertical ? 'yPercent' : 'xPercent', dir = o.reverse ? -1 : 1;
  tl.fromTo(a, { [prop]: -100 * dir }, { [prop]: 0, duration: .52, ease: 'power3.in' }, t);
  tl.fromTo(b, { [prop]: -100 * dir }, { [prop]: 0, duration: .52, ease: 'power3.in' }, t + .08);
  if (!o.stay) {
    tl.to(b, { [prop]: 100 * dir, duration: .7, ease: 'power3.out' }, t + .64);
    tl.to(a, { [prop]: 100 * dir, duration: .7, ease: 'power3.out' }, t + .72);
  }
  return t + .6;
}

// Person avatar: pale disc with a head and shoulders, clipped to the circle (the reference's "Líder / Evaluado").
let _avatarId = 0;
function avatar(parent, cx, cy, d, o = {}) {
  const wrap = box(parent, { x: cx - d / 2, y: cy - d / 2, w: d, h: d });
  const s = sv('svg', { width: d, height: d, viewBox: '-150 -150 300 300' });
  wrap.appendChild(s);
  const id = 'av' + (++_avatarId);
  const cp = sv('clipPath', { id }, sv('defs', {}, s));
  sv('circle', { r: 150 }, cp);
  const disc = sv('circle', { r: 150, fill: o.bg || C.tint }, s);
  const g = sv('g', { 'clip-path': `url(#${id})` }, s);
  const body = sv('ellipse', { cx: 0, cy: 124, rx: 104, ry: 86, fill: o.fg || C.red }, g);
  const head = sv('circle', { cx: 0, cy: -34, r: 50, fill: o.fg || C.red }, g);
  return { wrap, svg: s, disc, body, head };
}

// Red badge that sits on an avatar and swaps its icon (question mark, bulb, megaphone…).
function badgeIcons(tl, parent, cx, cy, d, list) {
  // list: [[iconName, tIn, tOut], ...]
  const disc = box(parent, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, bg: C.red, r: d / 2, shadow: '0 12px 30px rgba(230,53,47,.3)' });
  list.forEach(([name, tin, tout]) => {
    const ic = icon(disc, name, { cx: d / 2, cy: d / 2, size: d * .52, sw: 2, color: '#fff' });
    tl.fromTo(ic, { scale: 0, rotation: -25, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: .55, ease: 'back.out(2.2)' }, tin);
    if (tout != null) tl.to(ic, { scale: 0, rotation: 20, autoAlpha: 0, duration: .25, ease: 'power2.in' }, tout);
  });
  return disc;
}

// Checklist item: check disc + bold line + optional detail. Returns handles for timing.
function tipItem(parent, x, y, title, detail, o = {}) {
  const r = o.r || 30;
  const chk = checkIcon(parent, x + r, y + 30, r);
  const tt = T(parent, title, { x: x + r * 2 + 30, y: y + 2, size: o.size || 42, weight: 700, ls: '-.012em', nowrap: true });
  const dt = detail != null ? T(parent, detail, { x: x + r * 2 + 30, y: y + 66, w: o.w || 960, size: o.dsize || 31, weight: 500, color: C.ink2, lh: 1.3 }) : null;
  return { chk, tt, dt, all: [chk.s, tt, dt].filter(Boolean) };
}
function tipIn(tl, it, t, tDetail) {
  tl.fromTo(it.chk.s, { scale: 0, rotation: -90, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: .6, ease: 'back.out(1.8)' }, t);
  tl.fromTo(it.chk.tick, { drawSVG: '0%' }, { drawSVG: '100%', duration: .35, ease: 'power2.out' }, t + .32);
  revealWords(tl, it.tt, t + .08, { stagger: .05 });
  if (it.dt && tDetail != null) fadeUp(tl, it.dt, tDetail, { dy: 24, dur: .8 });
}
