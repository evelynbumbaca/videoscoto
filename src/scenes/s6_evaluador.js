// Scene 6 · Si sos quien evalúa (101.85 – 125.9 s)
// Red sweep, same checklist format. "Tu rol va mucho más allá de completar un formulario" is set
// typographically (struck through), then three tips; the badge changes with each one.
SCENES.push(tl => {
  const s6 = h('div', { cls: 'scene' });
  show(tl, s6, 101.8, 125.95);
  const content = h('div', { cls: 'fill' }, s6);
  const cover = sweep(tl, s6, 101.86);
  gsap.set(content, { autoAlpha: 0 });
  tl.set(content, { autoAlpha: 1 }, cover);
  box(content, { x: 0, y: 0, w: W, h: H, bg: C.bg });

  const AX = 400, AY = 560, AD = 380;
  const av = avatar(content, AX, AY, AD);
  tl.fromTo(av.wrap, { scale: .85 }, { scale: 1, duration: 1.1, ease: 'expo.out' }, cover);
  tl.to(av.wrap, { y: -10, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 13 }, cover + .6);
  const badge = badgeIcons(tl, content, AX + AD * .36, AY - AD * .36, 128, [
    ['megaphone', cover + .35, A(109.45) - .3],
    ['message-circle-more', A(109.45) - .2, A(115.05) - .3],
    ['search', A(115.05) - .2, A(121.35) - .3],
    ['rocket', A(121.35) - .2, null],
  ]);
  pop(tl, badge, cover + .25, { dur: .6 });
  [A(109.45), A(115.05), A(121.35)].forEach(t => tl.to(badge, { keyframes: [{ rotation: -8, duration: .08 }, { rotation: 0, duration: .6, ease: 'elastic.out(1,.4)' }] }, t - .28));

  const hd = T(content, 'Si sos quien evalúa', { x: 760, y: 176, size: 60, weight: 700, color: C.red, ls: '-.015em', nowrap: true });
  revealWords(tl, hd, cover + .2, { stagger: .07 });
  const bar = box(content, { x: 762, y: 268, w: 90, h: 7, r: 4, bg: C.red });
  tl.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .7, ease: 'expo.out' }, cover + .5);

  // "Tu rol va mucho más allá de ~~completar un formulario~~" → acompañar y generar valor
  const iA = T(content, 'Tu rol va mucho más allá de', { x: 760, y: 322, size: 60, weight: 700, ls: '-.018em', nowrap: true });
  const iB = T(content, 'completar un formulario', { x: 760, y: 402, size: 60, weight: 700, color: '#A39A94', ls: '-.018em', nowrap: true });
  const strike = box(content, { x: 752, y: 402 + 31, w: iB.offsetWidth + 16, h: 7, r: 4, bg: C.red });
  const iC = T(content, 'Acompañar y generar valor en el desarrollo de tu equipo.', { x: 760, y: 530, w: 960, size: 50, weight: 700, color: C.red, lh: 1.16, ls: '-.015em' });
  const sA = revealWords(tl, iA, A(103.46) - .15, { stagger: .06 });
  const sB = revealWords(tl, iB, A(104.74) - .3, { stagger: .06 });
  tl.fromTo(strike, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .5, ease: 'power3.inOut' }, A(105.22) + .12);
  tl.to(iB, { color: '#C9C1BB', duration: .4 }, A(105.22) + .3);
  const sC = revealLines(tl, iC, A(106.81) - .4, { stagger: .3 });
  const TX = A(108.65) + .05;
  hideSplit(tl, sA, TX); hideSplit(tl, sB, TX + .05);
  tl.to(strike, { autoAlpha: 0, duration: .25 }, TX + .1);
  hideSplit(tl, sC, TX + .1);

  // checklist
  const ys = [310, 490, 740];
  const tips = [
    tipItem(content, 760, ys[0], 'Generá espacios de feedback consciente', 'Que refleje todo el año, no solo los últimos meses.'),
    tipItem(content, 760, ys[1], 'Sondeá las percepciones de tu colaborador', null),
    tipItem(content, 760, ys[2], 'Usá este momento como puntapié', 'para el aprendizaje y mejora continua.'),
  ];
  // tip 1: the whole year fills in, not only the last months
  const yb = [];
  for (let m = 0; m < 12; m++) yb.push(box(content, { x: 850 + m * 50, y: ys[0] + 122, w: 42, h: 12, r: 6, bg: '#E5DED8' }));
  tips[0].all.push(...yb);
  tl.fromTo(yb, { autoAlpha: 0, scaleX: .3 }, { autoAlpha: 1, scaleX: 1, duration: .4, ease: 'expo.out', stagger: .025 }, A(111.69) + .1);
  tl.to(yb, { backgroundColor: C.red, duration: .2, stagger: .045 }, A(112.49) - .05);

  // tip 2: the three questions as chips, each on its words
  const qs = [['¿Cómo se ve a sí mismo?', A(117.37)], ['¿Qué necesita de vos como líder?', A(118.57)], ['¿Qué lo motiva?', A(119.93)]];
  let qx = 850, qy = ys[1] + 70;
  qs.forEach(([txt, t], i) => {
    const chip = h('div', { cls: 'pill', html: txt }, content);
    gsap.set(chip, { left: qx, top: qy, height: 54, padding: '0 24px', backgroundColor: C.tint, color: C.red, fontSize: 28, fontWeight: 600 });
    if (qx + chip.offsetWidth > 1790) { qx = 850; qy += 66; gsap.set(chip, { left: qx, top: qy }); }
    qx += chip.offsetWidth + 14;
    tl.fromTo(chip, { autoAlpha: 0, scale: .5, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .55, ease: 'back.out(2)' }, t - .12);
    tips[1].all.push(chip);
  });

  const tIn = [A(109.45) - .2, A(115.05) - .28, A(121.35) - .28];
  const tDt = [A(111.69) - .12, null, A(123.19) - .12];
  tips.forEach((it, i) => {
    tipIn(tl, it, tIn[i], tDt[i]);
    if (i > 0) tl.to(tips[i - 1].all, { autoAlpha: .38, duration: .45 }, tIn[i] - .1);
  });
});
