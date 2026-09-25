// Scene 5 · Si sos el evaluado (79.85 – 102.6 s)
// The evaluado from scene 4 is carried over while a light iris opens from it. Checklist of four tips,
// each starting with a verb; the badge on the avatar changes with every tip.
SCENES.push(tl => {
  const s5 = h('div', { cls: 'scene' });
  const T0 = 80.16;                                    // "…aprendizaje mutuo." ends
  show(tl, s5, T0 - .03, 107.92);
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
  tl.to(av.wrap, { y: -10, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 17 }, T0 + 1.1);
  const content = h('div', { cls: 'fill' }, s5);

  const badge = badgeIcons(tl, content, AX + AD * .36, AY - AD * .36, 128, [
    ['message-circle-question', A(81.363) + .1, A(92.08) - .3],
    ['lightbulb', A(92.08) - .2, A(97.745) - .3],
    ['hand-helping', A(97.745) - .2, A(103.267) - .3],
    ['messages-square', A(103.267) - .2, null],
  ]);
  pop(tl, badge, A(81.363) - .05, { dur: .6 });
  // tiny nudge each time the badge changes
  [A(92.08), A(97.745), A(103.267)].forEach(t => tl.to(badge, { keyframes: [{ rotation: -8, duration: .08 }, { rotation: 0, duration: .6, ease: 'elastic.out(1,.4)' }] }, t - .28));

  // header
  const hd = T(content, 'Si sos el evaluado', { x: 760, y: 176, size: 60, weight: 800, rw: true, color: C.red, ls: '-.01em', nowrap: true });
  revealWords(tl, hd, A(80.641) + .1, { stagger: .07 });
  const bar = box(content, { x: 762, y: 268, w: 90, h: 7, r: 4, bg: C.red });
  tl.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .7, ease: 'expo.out' }, A(81.363));

  // intro line: the opportunity
  const intro = T(content, 'Es tu oportunidad de tomar un rol activo y ser <span class="red">protagonista</span> de tu propio desarrollo.',
    { x: 760, y: 330, w: 1000, size: 64, weight: 700, lh: 1.12, ls: '-.018em' });
  const is = revealLines(tl, intro, A(82.161) - .15, { stagger: .45, dur: 1 });
  hideSplit(tl, is, A(85.761) + .1);

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
  [['Recursos', A(99.906)], ['Acompañamiento', A(100.786)], ['Nuevos desafíos', A(101.906)]].forEach(([txt, t]) => {
    const chip = h('div', { cls: 'pill', html: txt }, content);
    gsap.set(chip, { left: cx, top: ys[2] + 68, height: 54, padding: '0 24px', backgroundColor: C.tint, color: C.red, fontSize: 28, fontWeight: 700 });
    cx += chip.offsetWidth + 14;
    tl.fromTo(chip, { autoAlpha: 0, scale: .5, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .55, ease: 'back.out(2)' }, t - .12);
    tips[2].all.push(chip);
  });
  const tIn = [A(87.28) - .15, A(92.08) - .28, A(97.745) - .28, A(103.267) - .28];
  const tDt = [A(88.241) - .05, A(93.842) - .1, null, A(105.506) - .12];
  tips.forEach((it, i) => {
    tipIn(tl, it, tIn[i], tDt[i]);
    if (i > 0) tl.to(tips[i - 1].all, { autoAlpha: .38, duration: .45 }, tIn[i] - .1);
  });
});
