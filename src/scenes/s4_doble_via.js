// Scene 4 · Doble vía (67.9 – 80.8 s)
// Change of rhythm on full red: two people face each other, a two-way arrow pulses between them,
// they exchange speech bubbles, and the arrow turns into the ascending arrow (growth).
SCENES.push(tl => {
  const s4 = h('div', { cls: 'scene' });
  show(tl, s4, 67.9, 80.85);
  box(s4, { x: 0, y: 0, w: W, h: H, bg: C.red });

  const CY = 590, LX = 610, RX = 1310, D = 300;
  // background detail: soft rings around the conversation
  const deco = layer(s4);
  const rings = [250, 390, 530].map(r => sv('circle', { cx: 960, cy: CY, r, fill: 'none', stroke: 'rgba(255,255,255,.09)', 'stroke-width': 2 }, deco));
  tl.fromTo(rings, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1.6, ease: 'power2.out', stagger: .15 }, 68.2);
  tl.fromTo(rings, { scale: .96, svgOrigin: `960 ${CY}` }, { scale: 1.04, svgOrigin: `960 ${CY}`, duration: 12, ease: 'none' }, 68.2);

  const ev = avatar(s4, LX, CY, D), ld = avatar(s4, RX, CY, D);
  tl.fromTo(ev.wrap, { autoAlpha: 0, scale: .4, x: -90 }, { autoAlpha: 1, scale: 1, x: 0, duration: .9, ease: 'back.out(1.5)' }, A(67.92) + .02);
  tl.fromTo(ld.wrap, { autoAlpha: 0, scale: .4, x: 90 }, { autoAlpha: 1, scale: 1, x: 0, duration: .9, ease: 'back.out(1.5)' }, A(67.92) + .24);

  // two-way arrow, drawn from the middle outwards
  const arr = layer(s4);
  const ag = sv('g', {}, arr);
  const st = { fill: 'none', stroke: '#fff', 'stroke-width': 13, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const l1 = sv('path', { d: `M960 ${CY} L798 ${CY}`, ...st }, ag), r1 = sv('path', { d: `M960 ${CY} L1122 ${CY}`, ...st }, ag);
  const lh = sv('path', { d: `M830 ${CY - 32} L798 ${CY} L830 ${CY + 32}`, ...st }, ag), rh = sv('path', { d: `M1090 ${CY - 32} L1122 ${CY} L1090 ${CY + 32}`, ...st }, ag);
  const tA = A(69.12) + .1;
  tl.fromTo([l1, r1], { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power3.out' }, tA);
  tl.fromTo([lh, rh], { drawSVG: '50% 50%', autoAlpha: 0 }, { drawSVG: '0% 100%', autoAlpha: 1, duration: .35, ease: 'power2.out' }, tA + .45);
  // pulse on "doble vía", then a calm heartbeat while the idea is explained
  tl.fromTo(ag, { scale: 1, svgOrigin: `960 ${CY}` }, { scale: 1.2, svgOrigin: `960 ${CY}`, duration: .22, ease: 'power2.out', yoyo: true, repeat: 1, immediateRender: false }, A(70.56) - .05);
  tl.to(ag, { scale: 1.08, svgOrigin: `960 ${CY}`, duration: .3, ease: 'sine.inOut', yoyo: true, repeat: 7, repeatDelay: .5 }, A(70.56) + .9);
  tl.to(lh, { x: -8, duration: .3, ease: 'sine.inOut', yoyo: true, repeat: 7, repeatDelay: .5 }, A(70.56) + .9);
  tl.to(rh, { x: 8, duration: .3, ease: 'sine.inOut', yoyo: true, repeat: 7, repeatDelay: .5 }, A(70.56) + .9);

  const head = T(s4, 'Una conversación de doble vía', { x: 960, y: 150, w: 1700, align: 'center', size: 84, weight: 700, color: '#fff', ls: '-.02em' });
  const hs = revealWords(tl, head, A(69.84) - .2, { stagger: .07 });

  const labE = T(s4, 'Evaluado', { x: LX, y: CY + 176, w: 400, align: 'center', size: 48, weight: 700, color: '#fff' });
  const labL = T(s4, 'Líder', { x: RX, y: CY + 176, w: 400, align: 'center', size: 48, weight: 700, color: '#fff' });
  revealWords(tl, labE, A(72.00) - .18);
  revealWords(tl, labL, A(72.80) - .18);

  // "rol activo": both people react, rings pulse out of each
  const tR = A(73.44) - .05;
  [ev, ld].forEach((p, i) => {
    tl.to(p.wrap, { y: -20, duration: .22, ease: 'power2.out', yoyo: true, repeat: 1 }, tR + i * .12);
    const ring = box(s4, { x: (i ? RX : LX) - D / 2, y: CY - D / 2, w: D, h: D, r: D / 2, border: '4px solid rgba(255,255,255,.8)' });
    tl.fromTo(ring, { scale: 1, autoAlpha: 0 }, { keyframes: [{ autoAlpha: .9, duration: .05 }, { scale: 1.32, autoAlpha: 0, duration: .8, ease: 'power2.out' }] }, tR + i * .12);
  });

  // speech bubbles taking turns: "instancia de intercambio"
  const bubble = (cx, cy, flip) => {
    const b = sv('g', {}, arr);
    const bw = 150, bh = 96, x = cx - bw / 2, y = cy - bh / 2;
    sv('rect', { x, y, width: bw, height: bh, rx: 26, fill: '#fff' }, b);
    const tx = flip ? x + bw - 42 : x + 42;          // tail leans toward its own speaker
    sv('path', { d: flip ? `M ${tx - 16} ${y + bh - 6} L ${tx + 22} ${y + bh + 30} L ${tx + 16} ${y + bh - 6} Z`
                         : `M ${tx - 16} ${y + bh - 6} L ${tx - 22} ${y + bh + 30} L ${tx + 16} ${y + bh - 6} Z`, fill: '#fff', 'stroke-linejoin': 'round' }, b);
    [-34, 0, 34].forEach(dx => sv('circle', { cx: cx + dx, cy, r: 10, fill: C.red }, b));
    return b;
  };
  const bL = bubble(820, 372, false), bR = bubble(1100, 372, true);
  const tB = A(74.56) - .1;
  tl.fromTo(bL, { scale: 0, svgOrigin: '798 450' }, { scale: 1, svgOrigin: '798 450', duration: .55, ease: 'back.out(2)' }, tB);
  tl.fromTo(bR, { scale: 0, svgOrigin: '1122 450' }, { scale: 1, svgOrigin: '1122 450', duration: .55, ease: 'back.out(2)' }, tB + .7);
  tl.to(bL, { y: -10, duration: .6, ease: 'sine.inOut', yoyo: true, repeat: 3 }, tB + .6);
  tl.to(bR, { y: -10, duration: .6, ease: 'sine.inOut', yoyo: true, repeat: 2 }, tB + 1.3);

  const sub = T(s4, 'Una instancia de intercambio', { x: 960, y: 262, w: 1400, align: 'center', size: 44, weight: 500, color: 'rgba(255,255,255,.92)' });
  const ss = revealWords(tl, sub, A(75.60) - .25, { stagger: .06 });

  // growth: the arrow gives way to the ascending arrow and both people rise
  const TG = A(76.88) + .15;
  hideSplit(tl, hs, TG); hideSplit(tl, ss, TG + .05);
  tl.to([bL, bR], { scale: 0, duration: .3, ease: 'power2.in' }, TG);
  tl.to([l1, r1, lh, rh], { drawSVG: '50% 50%', autoAlpha: 0, duration: .4, ease: 'power2.in' }, TG);
  const head2 = T(s4, 'Crecimiento y aprendizaje mutuo', { x: 960, y: 150, w: 1700, align: 'center', size: 84, weight: 700, color: '#fff', ls: '-.02em' });
  revealWords(tl, head2, A(78.00) - .12, { stagger: .08 });
  const up = sv('path', { d: `M 822 ${CY + 92} L 922 ${CY - 8} L 990 ${CY + 44} L 1098 ${CY - 92}`, ...st, 'stroke-width': 15 }, arr);
  const upH = sv('path', { d: `M 1048 ${CY - 96} L 1098 ${CY - 92} L 1094 ${CY - 42}`, ...st, 'stroke-width': 15 }, arr);
  tl.fromTo(up, { drawSVG: '0%' }, { drawSVG: '100%', duration: .8, ease: 'power2.inOut' }, A(78.16));
  tl.fromTo(upH, { drawSVG: '50% 50%', autoAlpha: 0 }, { drawSVG: '0% 100%', autoAlpha: 1, duration: .35 }, A(78.16) + .7);
  tl.to([ev.wrap, labE], { y: -24, duration: 1, ease: 'power2.inOut' }, A(78.16) + .1);
  tl.to([ld.wrap, labL], { y: -24, duration: 1, ease: 'power2.inOut' }, A(78.16) + .25);

  // hand-off to scene 5: the evaluado is carried over, everything else goes
  tl.to([labE, labL, ld.wrap, up, upH, head2], { autoAlpha: 0, duration: .35, ease: 'power1.in' }, 79.9);
  window.S4_EVALUADO = { x: LX, y: CY - 24, d: D };
});
