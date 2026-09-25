// Scene 5 · Si sos el evaluado (79.85 – 102.6 s)
// The evaluado from scene 4 is carried over while a light iris opens from it. Checklist of four tips,
// each starting with a verb; the badge on the avatar changes with every tip.
SCENES.push(tl => {
  const s5 = h('div', { cls: 'scene' });
  show(tl, s5, 79.85, 102.6);
  const T0 = 79.88;
  const from = window.S4_EVALUADO;
  const AX = 400, AY = 560, AD = 380;

  // iris of light background opening from the evaluado
  const IR = 2300;
  const iris = box(s5, { x: from.x - IR, y: from.y - IR, w: IR * 2, h: IR * 2, r: IR, bg: C.bg });
  tl.fromTo(iris, { scale: (from.d / 2) / IR }, { scale: 1, duration: 1, ease: 'power3.inOut' }, T0);

  // the avatar travels from its scene-4 spot to the left column
  const av = avatar(s5, AX, AY, AD);
  tl.fromTo(av.wrap, { x: from.x - AX, y: from.y - AY, scale: from.d / AD },
    { x: 0, y: 0, scale: 1, duration: 1.05, ease: 'power3.inOut' }, T0);
  tl.to(av.wrap, { y: -10, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 11 }, T0 + 1.1);
  const content = h('div', { cls: 'fill' }, s5);

  const badge = badgeIcons(tl, content, AX + AD * .36, AY - AD * .36, 128, [
    ['message-circle-question', A(80.52) + .1, A(88.68) - .3],
    ['lightbulb', A(88.68) - .2, A(93.14) - .3],
    ['hand-helping', A(93.14) - .2, A(97.78) - .3],
    ['messages-square', A(97.78) - .2, null],
  ]);
  pop(tl, badge, A(80.52) - .05, { dur: .6 });
  // tiny nudge each time the badge changes
  [A(88.68), A(93.14), A(97.78)].forEach(t => tl.to(badge, { keyframes: [{ rotation: -8, duration: .08 }, { rotation: 0, duration: .6, ease: 'elastic.out(1,.4)' }] }, t - .28));

  // header
  const hd = T(content, 'Si sos el evaluado', { x: 760, y: 176, size: 60, weight: 700, color: C.red, ls: '-.015em', nowrap: true });
  revealWords(tl, hd, A(79.80) + .1, { stagger: .07 });
  const bar = box(content, { x: 762, y: 268, w: 90, h: 7, r: 4, bg: C.red });
  tl.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .7, ease: 'expo.out' }, A(80.52));

  // intro line: the opportunity
  const intro = T(content, 'Es tu oportunidad de tomar un rol activo y ser <span class="red">protagonista</span> de tu propio desarrollo.',
    { x: 760, y: 330, w: 1000, size: 64, weight: 700, lh: 1.12, ls: '-.018em' });
  const is = revealLines(tl, intro, A(81.16) - .15, { stagger: .45, dur: 1 });
  hideSplit(tl, is, A(84.28) + .1);

  // checklist
  const ys = [322, 484, 646, 808];
  const tips = [
    tipItem(content, 760, ys[0], 'Preguntá.', 'No te quedes con dudas sobre tu evaluación o tu desarrollo.'),
    tipItem(content, 760, ys[1], 'Tené iniciativa y humildad', 'para recibir el feedback, incluso el que cuesta escuchar.'),
    tipItem(content, 760, ys[2], 'Hacé pedidos concretos a tu líder', null),
    tipItem(content, 760, ys[3], 'Pedí vos también espacios de feedback', 'No esperes solo al momento formal.'),
  ];
  // tip 3: the three concrete asks as chips, each on its word
  let cx = 850;
  [['Recursos', A(94.98)], ['Acompañamiento', A(95.62)], ['Nuevos desafíos', A(96.58)]].forEach(([txt, t]) => {
    const chip = h('div', { cls: 'pill', html: txt }, content);
    gsap.set(chip, { left: cx, top: ys[2] + 68, height: 54, padding: '0 24px', backgroundColor: C.tint, color: C.red, fontSize: 28, fontWeight: 600 });
    cx += chip.offsetWidth + 14;
    tl.fromTo(chip, { autoAlpha: 0, scale: .5, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .55, ease: 'back.out(2)' }, t - .12);
    tips[2].all.push(chip);
  });
  const tIn = [A(85.00) - .15, A(88.68) - .28, A(93.14) - .28, A(97.78) - .28];
  const tDt = [A(85.64) - .05, A(90.20) - .1, null, A(100.02) - .12];
  tips.forEach((it, i) => {
    tipIn(tl, it, tIn[i], tDt[i]);
    if (i > 0) tl.to(tips[i - 1].all, { autoAlpha: .38, duration: .45 }, tIn[i] - .1);
  });
});
