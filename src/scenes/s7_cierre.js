// Scene 7 · Cierre (125.2 s – end)
// Red rises from the bottom. The timeline returns in miniature, its end climbs into the ascending arrow
// of the opening, and "Sigamos creciendo juntos." lands. The area under the timeline stays empty for the logo.
SCENES.push(tl => {
  const s7 = h('div', { cls: 'scene' });
  show(tl, s7, 125.2, null);
  const content = h('div', { cls: 'fill' }, s7);
  const cover = sweep(tl, s7, 125.22, { vertical: true, reverse: true, stay: true });
  gsap.set(content, { autoAlpha: 0 });
  tl.set(content, { autoAlpha: 1 }, cover);
  box(content, { x: 0, y: 0, w: W, h: H, bg: C.red });
  content.style.zIndex = 60;

  // background detail: the opening's arcs, now in the lower left
  const deco = layer(content);
  const arcs = [320, 490, 660].map(r => sv('circle', { cx: 130, cy: 1110, r, fill: 'none', stroke: 'rgba(255,255,255,.12)', 'stroke-width': 2 }, deco));
  tl.fromTo(arcs, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 2.6, ease: 'power2.out', stagger: .18 }, cover + .1);
  tl.fromTo(deco, { rotation: 6, svgOrigin: '130 1110' }, { rotation: -6, svgOrigin: '130 1110', duration: 9, ease: 'none' }, cover);

  // "La gestión del desempeño 2026…": big while it is said, then it steps up into the eyebrow
  const big = T(content, 'Gestión del desempeño 2026', { x: 960, y: 348, w: 1700, align: 'center', size: 84, weight: 700, color: '#fff', ls: '-.02em' });
  const bs = revealWords(tl, big, A(125.35) + .05, { stagger: .09 });
  hideSplit(tl, bs, A(129.59) - .55);
  const eb = T(content, 'Gestión del desempeño 2026', { x: 960, y: 276, w: 1400, align: 'center', cls: 'eyebrow', color: '#fff' });
  gsap.set(eb, { color: '#fff', fontSize: 34, letterSpacing: '.18em' });
  revealWords(tl, eb, A(129.59) - .1, { stagger: .05 });

  // mini timeline with the four steps
  const LY = 650, XS = [476, 716, 956, 1196];
  const line = box(content, { x: XS[0], y: LY - 3, w: XS[3] - XS[0], h: 6, r: 3, bg: 'rgba(255,255,255,.5)' });
  tl.fromTo(line, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, A(125.51));
  const dots = XS.map((x, i) => {
    const d = box(content, { x: x - 34, y: LY - 34, w: 68, h: 68, r: 34, bg: '#fff' });
    T(d, String(i + 1), { x: 34, y: 12, w: 68, align: 'center', size: 32, weight: 700, color: C.red, lh: 1.3 });
    pop(tl, d, A(125.51) + .2 + i * .26, { dur: .6 });
    return d;
  });
  // the path goes on and climbs: the ascending arrow
  const arr = layer(content);
  const st = { fill: 'none', stroke: '#fff', 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const climb = sv('path', { d: `M ${XS[3] + 34} ${LY} L 1290 ${LY} L 1356 ${LY - 70} L 1400 ${LY - 34} L 1480 ${LY - 124}`, ...st }, arr);
  const tip = sv('path', { d: `M 1438 ${LY - 120} L 1480 ${LY - 124} L 1478 ${LY - 82}`, ...st }, arr);
  const tC = A(128.23);
  tl.fromTo(climb, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut' }, tC);
  tl.fromTo(tip, { drawSVG: '50% 50%', autoAlpha: 0 }, { drawSVG: '0% 100%', autoAlpha: 1, duration: .4, ease: 'power2.out' }, tC + .9);
  const glowDot = box(content, { x: 1480 - 12, y: LY - 124 - 12, w: 24, h: 24, r: 12, bg: '#fff' });
  tl.fromTo(glowDot, { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)' }, tC + 1.1);
  const halo = box(content, { x: 1480 - 12, y: LY - 124 - 12, w: 24, h: 24, r: 12, border: '3px solid rgba(255,255,255,.8)' });
  tl.fromTo(halo, { scale: 1, autoAlpha: 0 }, { keyframes: [{ autoAlpha: 1, duration: .05 }, { scale: 4, autoAlpha: 0, duration: 1.2, ease: 'power2.out' }], repeat: 2, repeatDelay: .4 }, tC + 1.2);

  // closing line, word by word with the voice
  const head = T(content, 'Sigamos creciendo juntos.', { x: 960, y: 332, w: 1700, align: 'center', size: 108, weight: 800, color: '#fff', ls: '-.025em' });
  revealWords(tl, head, A(129.59) - .2, { stagger: .44, dur: 1 });

  // keep the frame alive through the hold (the logo goes under the timeline, in After Effects)
  tl.to(dots, { y: -6, duration: .9, ease: 'sine.inOut', yoyo: true, repeat: 3, stagger: .18 }, A(129.59) + 1.2);
});
