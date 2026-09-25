// Scene 1 · Apertura (0 – 22.5 s)
// 1A title on red · 1B the year line and "1 de octubre" · 1C the three instances · 1D "Una oportunidad para…"
SCENES.push(tl => {
  const W0 = 2.518;                                     // wipe to the year line, in the pause after "año"
  // ---------------------------------------------------------------- 1A · title on red
  const s1a = h('div', { cls: 'scene' });
  gsap.set(s1a, { autoAlpha: 1 });                     // first frame is already the red title card
  tl.set(s1a, { autoAlpha: 0 }, 3.518);
  box(s1a, { x: 0, y: 0, w: W, h: H, bg: C.red });
  const content = h('div', { cls: 'fill' }, s1a);

  // background detail: concentric arcs in the lower right corner, drawn slowly
  const deco = layer(content);
  const arcs = [320, 490, 660].map(r => sv('circle', { cx: 1790, cy: 1110, r, fill: 'none', stroke: 'rgba(255,255,255,.12)', 'stroke-width': 2 }, deco));
  tl.fromTo(arcs, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 2.6, ease: 'power2.out', stagger: .18 }, .1);
  tl.fromTo(deco, { rotation: -8, svgOrigin: '1790 1110' }, { rotation: 4, svgOrigin: '1790 1110', duration: 3.518, ease: 'none' }, 0);

  // badge with the ascending arrow
  const bx = 470, by = 540;
  const badgeSvg = layer(content);
  const badge = sv('g', {}, sv('g', { transform: `translate(${bx} ${by})` }, badgeSvg));
  const disc = sv('circle', { r: 150, fill: 'rgba(255,255,255,.14)' }, badge);
  const trend = sv('path', { d: 'M -80 54 L -26 -4 L 12 30 L 76 -46', fill: 'none', stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, badge);
  const head = sv('path', { d: 'M 39.3 -36.2 L 76 -46 L 72.7 -8.2', fill: 'none', stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, badge);
  tl.fromTo(disc, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .9, ease: 'back.out(1.6)' }, .12);
  tl.fromTo(trend, { drawSVG: '0%' }, { drawSVG: '100%', duration: .95, ease: 'power2.inOut' }, .38);
  tl.fromTo(head, { drawSVG: '50% 50%', autoAlpha: 0 }, { drawSVG: '0% 100%', autoAlpha: 1, duration: .45, ease: 'power2.out' }, 1.22);
  tl.to(badge, { y: -6, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.7);

  // title with a sweep ("barrido"), subtitle word by word
  const title = T(content, 'Etapas de evaluación', { x: 700, y: 408, size: 100, weight: 800, rw: true, color: '#fff', ls: '-.015em', nowrap: true });
  const tw = title.offsetWidth;
  const bar = box(content, { x: 690, y: 414, w: tw + 22, h: 116, bg: '#fff', origin: '0% 50%' });
  gsap.set(title, { autoAlpha: 0 });
  tl.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .5, ease: 'power3.inOut' }, .3);
  tl.set(title, { autoAlpha: 1 }, .8);
  tl.to(bar, { scaleX: 0, transformOrigin: '100% 50%', duration: .55, ease: 'power3.inOut' }, .8);
  const sub = T(content, 'Gestión del desempeño 2026', { x: 703, y: 548, size: 56, weight: 500, color: 'rgba(255,255,255,.93)', nowrap: true });
  revealWords(tl, sub, 1.05, { stagger: .07 });

  // exit: the whole card drifts left under the wipe
  tl.to(content, { x: -260, duration: 1.1, ease: 'power3.inOut' }, W0);

  // ---------------------------------------------------------------- 1B + 1C · light scene
  const s1b = h('div', { cls: 'scene' });
  show(tl, s1b, W0, 14.127);
  const wipeDk = box(s1b, { x: 0, y: 0, w: W, h: H, bg: C.redDk });
  const wipeLt = box(s1b, { x: 0, y: 0, w: W, h: H, bg: C.bg });
  tl.fromTo(wipeDk, { xPercent: 100 }, { xPercent: 0, duration: .9, ease: 'wipe' }, W0);
  tl.fromTo(wipeLt, { xPercent: 100 }, { xPercent: 0, duration: .9, ease: 'wipe' }, W0 + .1);

  const X0 = 150, X1 = 1770, LY = 720, MW = (X1 - X0) / 12;
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const yearG = h('div', { cls: 'fill' }, s1b);
  const base = box(yearG, { x: X0, y: LY - 3, w: X1 - X0, h: 6, bg: '#DDD5CE', r: 3 });
  tl.fromTo(base, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, W0 + .52);
  const ticks = [], labels = [];
  months.forEach((m, i) => {
    const tick = box(yearG, { x: X0 + MW * i - 5, y: LY - 5, w: 10, h: 10, bg: '#CFC6BE', r: 5 });
    ticks.push(tick);
    labels.push(T(yearG, m, { x: X0 + MW * (i + .5), y: LY + 32, w: 130, align: 'center', size: 27, weight: 700, color: '#5F5754', ls: '.1em' }));
  });
  tl.fromTo(ticks, { scale: 0 }, { scale: 1, duration: .4, ease: 'back.out(2)', stagger: .045 }, W0 + .6);
  tl.fromTo(labels, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'expo.out', stagger: .045 }, W0 + .66);

  // final stretch: OCT → DIC turns red
  const XO = X0 + MW * 9;
  const seg = box(yearG, { x: XO, y: LY - 7, w: X1 - XO, h: 14, bg: C.red, r: 7 });
  tl.fromTo(seg, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .85, ease: 'power3.inOut' }, A(4.88) - .1);
  tl.to(labels.slice(9), { color: C.red, fontWeight: 700, duration: .3, stagger: .22 }, A(4.88));

  // a dot travels through the year and stops on October 1st
  const dot = box(yearG, { x: X0 - 15, y: LY - 15, w: 30, h: 30, bg: C.red, r: 15 });
  const tArr = A(3.84) + .07;                                  // the dot lands on October as "octubre" is said
  tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: .3, ease: 'back.out(2)' }, W0 + .58);
  tl.fromTo(dot, { x: 0 }, { x: XO - X0, duration: tArr - (W0 + .7), ease: 'power2.inOut' }, W0 + .7);
  const ring = box(yearG, { x: XO - 15, y: LY - 15, w: 30, h: 30, r: 15, border: `3px solid ${C.red}` });
  tl.fromTo(ring, { scale: 1, autoAlpha: 0 }, { keyframes: [{ autoAlpha: .9, duration: .05 }, { scale: 3, autoAlpha: 0, duration: .9, ease: 'power2.out' }] }, tArr - .03);
  const ring2 = box(yearG, { x: XO - 15, y: LY - 15, w: 30, h: 30, r: 15, border: `3px solid ${C.red}` });
  tl.fromTo(ring2, { scale: 1, autoAlpha: 0 }, { keyframes: [{ autoAlpha: .7, duration: .05 }, { scale: 3, autoAlpha: 0, duration: 1.1, ease: 'power2.out' }] }, 6);
  const stem = box(yearG, { x: XO - 2, y: LY - 104, w: 4, h: 90, bg: C.red, r: 2 });
  tl.fromTo(stem, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .45, ease: 'power3.out' }, tArr - .05);
  const cal = icon(yearG, 'calendar-days', { cx: XO + 34, cy: LY - 138, size: 50, sw: 2, color: C.red });
  pop(tl, cal, tArr + .07);
  const oct = T(yearG, '1 de octubre', { x: XO + 72, y: LY - 166, size: 42, weight: 700, color: C.red, nowrap: true });
  revealWords(tl, oct, tArr + .09, { stagger: .07 });

  // headline block
  const eyebrow = T(yearG, 'El último tramo del año', { x: X0, y: 212, cls: 'eyebrow', nowrap: true });
  revealWords(tl, eyebrow, W0 + .75, { stagger: .05 });
  const head1 = T(yearG, 'Comienza la etapa final', { x: X0 - 4, y: 262, size: 104, weight: 800, rw: true, ls: '-.018em', nowrap: true });
  revealWords(tl, head1, A(4.32) - .2, { stagger: .07 });
  const head2 = T(yearG, 'de la <span class="red" style="font-weight:700">Gestión del Desempeño 2026</span>', { x: X0, y: 392, size: 54, weight: 500, color: C.ink2, nowrap: true });
  revealWords(tl, head2, A(5.52) - .1, { stagger: .06 });

  // 1B → 1C: text leaves, the red stretch becomes the connector of the three instances
  const T1 = 8.146;
  tl.to([eyebrow, head1, head2], { y: -40, autoAlpha: 0, duration: .5, ease: 'power2.in', stagger: .06 }, T1);
  tl.to([...labels, oct, cal, stem], { autoAlpha: 0, duration: .35, ease: 'power1.in' }, T1);
  tl.to([base, ...ticks, dot, ring, ring2], { autoAlpha: 0, duration: .35 }, T1 + .1);
  const CY = 565, CX = [460, 960, 1460];
  tl.to(seg, { left: CX[0], width: CX[2] - CX[0], top: CY - 5, height: 10, duration: .9, ease: 'power3.inOut' }, T1 + .15);

  const eb2 = T(yearG, 'La etapa final incluye', { x: 960, y: 300, w: 1200, align: 'center', cls: 'eyebrow' });
  revealWords(tl, eb2, A(8.64) + .05, { stagger: .05 });
  const items = [
    ['user-check', 'Autoevaluación', A(10.48)],
    ['messages-square', 'Feedback', A(11.842)],
    ['clipboard-check', 'Evaluación', A(12.722)],
  ];
  const discs = [], names = [];
  items.forEach(([ic, name, t], i) => {
    const d = box(yearG, { x: CX[i] - 95, y: CY - 95, w: 190, h: 190, bg: C.red, r: 95, shadow: '0 18px 40px rgba(230,53,47,.28)' });
    const g = icon(d, ic, { cx: 95, cy: 95, size: 92, sw: 1.7, color: '#fff' });
    pop(tl, d, t - .3, { dur: .75 });
    drawIn(tl, g, t - .2, { dur: .8, stagger: .1 });
    const nm = T(yearG, name, { x: CX[i], y: CY + 138, w: 460, align: 'center', size: 50, weight: 700, ls: '-.01em' });
    revealWords(tl, nm, t - .18);
    discs.push(d); names.push(nm);
  });
  // gentle life while holding
  tl.to(discs, { y: -8, duration: .9, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: .15 }, 12.392);

  // 1C exit
  const T2 = 13.158;
  tl.to(eb2, { y: -30, autoAlpha: 0, duration: .4, ease: 'power2.in' }, T2);
  tl.to(names, { y: 30, autoAlpha: 0, duration: .4, ease: 'power2.in', stagger: .05 }, T2);
  tl.to(discs, { scale: 0, duration: .45, ease: 'back.in(1.6)', stagger: .06 }, T2 + .05);
  tl.to(seg, { scaleX: 0, transformOrigin: '0% 50%', duration: .5, ease: 'power3.in' }, T2 + .15);

  // ---------------------------------------------------------------- 1D · "Una oportunidad para…"
  const s1d = h('div', { cls: 'scene' });
  show(tl, s1d, 13.291, 21.024);
  const l1 = T(s1d, 'Una oportunidad para', { x: 150, y: 318, size: 84, weight: 800, rw: true, ls: '-.015em', nowrap: true });
  revealWords(tl, l1, A(13.857) - .15, { stagger: .08 });
  const accent = box(s1d, { x: 150, y: 450, w: 90, h: 8, bg: C.red, r: 4 });
  tl.fromTo(accent, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .7, ease: 'expo.out' }, A(14.337));

  const phrases = [
    ['cerrar el recorrido', A(15.297) - .35, A(16.737) - .45],
    ['intercambiar miradas', A(16.737) - .45, A(17.937) - .4],
    ['poner en común los<br>próximos desafíos', A(17.937) - .4, null],
  ];
  const ph = phrases.map(([txt, tin, tout], i) => {
    const el = T(s1d, txt, { x: 146, y: 492, size: 92, weight: 900, color: C.red, ls: '-.02em', lh: 1.06, nowrap: true });
    const sp = splitLines(el);
    if (i === 0) revealLines(tl, sp, tin, { dur: .8, stagger: .08 });
    else tl.fromTo(sp.lines, { yPercent: 150 }, { yPercent: 0, duration: .6, ease: 'power3.inOut', stagger: .08 }, tin);
    if (tout) tl.to(sp.lines, { yPercent: -150, duration: .6, ease: 'power3.inOut', stagger: .04 }, tout);
    return sp;
  });

  // illustration badge on the right
  const ICX = 1500, ICY = 540;
  const bg = box(s1d, { x: ICX - 230, y: ICY - 230, w: 460, h: 460, bg: C.tint, r: 230 });
  pop(tl, bg, A(15.297) - .45, { dur: .9, ease: 'back.out(1.4)' });
  const ill = layer(s1d);
  const G = (t0, t1) => { const g = sv('g', { transform: `translate(${ICX} ${ICY})` }, ill); return g; };

  // I1 · route with a flag
  const g1 = G();
  const route = sv('path', { d: 'M -150 118 C -70 118 -92 28 -18 28 C 52 28 34 -52 92 -52', fill: 'none', stroke: C.red, 'stroke-width': 13, 'stroke-linecap': 'round' }, g1);
  const start = sv('circle', { cx: -150, cy: 118, r: 17, fill: C.red }, g1);
  const pole = sv('path', { d: 'M 92 -52 L 92 -150', fill: 'none', stroke: C.ink, 'stroke-width': 9, 'stroke-linecap': 'round' }, g1);
  const flag = sv('path', { d: 'M 92 -150 L 158 -126 L 92 -102 Z', fill: C.red, stroke: C.red, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g1);
  const t1 = A(15.297) - .3;
  pop(tl, start, t1, { dur: .45 });
  tl.fromTo(route, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' }, t1 + .1);
  tl.fromTo(pole, { drawSVG: '0%' }, { drawSVG: '100%', duration: .4, ease: 'power2.out' }, t1 + 1.02);
  tl.fromTo(flag, { scaleX: 0, transformOrigin: '0% 50%', autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: .6, ease: 'back.out(2.2)' }, t1 + 1.3);
  tl.to(g1, { scale: .6, autoAlpha: 0, svgOrigin: '0 0', duration: .35, ease: 'power2.in' }, A(16.737) - .38);

  // I2 · two speech bubbles taking turns
  const g2 = G();
  const bA = sv('g', {}, g2), bB = sv('g', {}, g2);
  sv('path', { d: 'M -150 -120 H 10 a 26 26 0 0 1 26 26 V -10 a 26 26 0 0 1 -26 26 H -95 L -135 56 V 16 H -150 a 26 26 0 0 1 -26 -26 V -94 a 26 26 0 0 1 26 -26 Z', fill: C.red }, bA);
  [-100, -60, -20].forEach(x => sv('circle', { cx: x, cy: -52, r: 10, fill: '#fff' }, bA));
  sv('path', { d: 'M -10 -12 H 150 a 26 26 0 0 1 26 26 V 98 a 26 26 0 0 1 -26 26 H 135 V 164 L 95 124 H -10 a 26 26 0 0 1 -26 -26 V 14 a 26 26 0 0 1 26 -26 Z', fill: '#fff', stroke: C.red, 'stroke-width': 9, 'stroke-linejoin': 'round' }, bB);
  [40, 80, 120].forEach(x => sv('circle', { cx: x, cy: 56, r: 10, fill: C.red }, bB));
  const t2 = A(16.737) - .2;
  tl.fromTo(bA, { scale: 0, svgOrigin: '-135 56' }, { scale: 1, svgOrigin: '-135 56', duration: .6, ease: 'back.out(2)' }, t2);
  tl.fromTo(bB, { scale: 0, svgOrigin: '135 164' }, { scale: 1, svgOrigin: '135 164', duration: .6, ease: 'back.out(2)' }, t2 + .38);
  tl.to(bA, { y: -8, duration: .5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, t2 + .75);
  tl.to(g2, { scale: .6, autoAlpha: 0, svgOrigin: '0 0', duration: .35, ease: 'power2.in' }, A(17.937) - .3);

  // I3 · mountain with a flag on the summit
  const g3 = G();
  const mount = sv('path', { d: 'M -168 122 L -66 -18 L -20 38 L 52 -92 L 168 122 Z', fill: 'none', stroke: C.red, 'stroke-width': 13, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g3);
  const snow = sv('path', { d: 'M 22 -38 L 52 -92 L 84 -34 L 64 -46 L 52 -30 L 40 -46 Z', fill: C.red }, g3);
  const pole3 = sv('path', { d: 'M 52 -92 L 52 -178', fill: 'none', stroke: C.ink, 'stroke-width': 9, 'stroke-linecap': 'round' }, g3);
  const flag3 = sv('path', { d: 'M 52 -178 L 114 -156 L 52 -134 Z', fill: C.red, stroke: C.red, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g3);
  const t3 = A(17.937) - .1;
  tl.fromTo(mount, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut' }, t3);
  tl.fromTo(snow, { autoAlpha: 0, scale: .4, svgOrigin: '52 -60' }, { autoAlpha: 1, scale: 1, svgOrigin: '52 -60', duration: .5, ease: 'back.out(2)' }, t3 + .9);
  tl.fromTo(pole3, { drawSVG: '0%' }, { drawSVG: '100%', duration: .4, ease: 'power2.out' }, A(19.297) - .1);
  tl.fromTo(flag3, { scaleX: 0, transformOrigin: '0% 50%', autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: .6, ease: 'back.out(2.2)' }, A(19.777) - .05);
  tl.to(flag3, { skewY: -6, duration: .45, ease: 'sine.inOut', yoyo: true, repeat: 1, transformOrigin: '0% 50%' }, A(19.777) + .6);
});
