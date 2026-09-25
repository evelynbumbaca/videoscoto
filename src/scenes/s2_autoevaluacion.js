// Scene 2 · Autoevaluación (21.5 – 39.8 s)
// Header, three cards from the infographic (one per group) and an October strip where each window lights up.
SCENES.push(tl => {
  const s2 = h('div', { cls: 'scene' });
  show(tl, s2, 20.047, 37.61);
  const content = h('div', { cls: 'fill' }, s2);
  const cover = sweep(tl, s2, 20.067);
  gsap.set(content, { autoAlpha: 0 });
  tl.set(content, { autoAlpha: 1 }, cover);
  box(content, { x: 0, y: 0, w: W, h: H, bg: C.bg });

  // header
  const eb = T(content, 'Todo arranca con la', { x: 150, y: 176, cls: 'eyebrow', nowrap: true });
  revealWords(tl, eb, cover + .25, { stagger: .05 });
  const title = T(content, 'Autoevaluación', { x: 145, y: 214, size: 108, weight: 800, rw: true, ls: '-.02em', nowrap: true });
  revealWords(tl, title, A(21.697) - .28);
  const sub = T(content, 'Cada grupo tiene su propia ventana de tiempo para completarla.', { x: 150, y: 358, size: 40, weight: 500, color: C.ink2, nowrap: true });
  revealWords(tl, sub, A(22.897) - .12, { stagger: .035, dur: .8 });

  // October 2026 strip (Oct 1st is a Thursday)
  const SX = 150, SW = 1620, SY = 872, pitch = SW / 31, cw = 44;
  const lab = T(content, 'Octubre 2026', { x: SX, y: SY - 58, cls: 'eyebrow', nowrap: true });
  const cells = [], nums = [];
  for (let d = 1; d <= 31; d++) {
    const dow = (d + 2) % 7;              // 0 = Monday … 5 = Saturday, 6 = Sunday
    const weekend = dow >= 5;
    const c = box(content, { x: SX + pitch * (d - 1) + (pitch - cw) / 2, y: SY, w: cw, h: 52, r: 11, bg: weekend ? 'rgba(0,0,0,0)' : '#EAE4DE', border: weekend ? '2px solid #E4DDD6' : undefined });
    const n = T(c, String(d), { x: cw / 2, y: 12, w: cw, align: 'center', size: 21, weight: 700, color: weekend ? '#B9B0A9' : '#7D746F' });
    cells.push(c); nums.push(n);
  }
  const tStrip = A(24.257) - .25;
  revealWords(tl, lab, tStrip - .1, { stagger: .05 });
  tl.fromTo(cells, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .5, ease: 'expo.out', stagger: .018 }, tStrip);

  const lightUp = (from, to, t) => {
    const cs = cells.slice(from - 1, to), ns = nums.slice(from - 1, to);
    tl.to(cs, { backgroundColor: C.red, borderColor: C.red, scale: 1.08, duration: .28, ease: 'power2.out', stagger: .045 }, t);
    tl.to(cs, { scale: 1, duration: .4, ease: 'power2.inOut', stagger: .045 }, t + .28);
    tl.to(ns, { color: '#fff', duration: .2, stagger: .045 }, t);
  };

  // cards
  const cards = [
    { name: 'Directores y Gerentes', dates: '1 al 9 de octubre', tIn: A(26.309) - .32, tDate: A(27.829) - .12, win: [1, 9] },
    { name: 'Mandos Medios', dates: '12 al 16 de octubre', tIn: A(29.909) - .32, tDate: A(31.109) - .12, win: [12, 16] },
    { name: 'Colaboradores', dates: '19 al 23 de octubre', tIn: A(33.429) - .12, tDate: A(34.549) - .12, win: [19, 23] },
  ];
  const CW = 526, CH = 300, CYt = 462;
  const cardEls = cards.map((c, i) => {
    const x = 150 + i * (CW + 21);
    const card = box(content, { x, y: CYt, w: CW, h: CH, bg: C.tint, r: 32 });
    const disc = box(card, { x: 38, y: 44, w: 108, h: 108, bg: '#fff', r: 54 });
    const ic = icon(disc, 'users', { cx: 54, cy: 54, size: 62, sw: 1.8, color: C.red });
    const div = box(card, { x: 168, y: 44, w: 3, h: 108, bg: C.red, r: 2 });
    const nm = T(card, c.name, { x: 194, y: 0, w: CW - 194 - 30, size: 38, weight: 700, color: C.red, lh: 1.12, ls: '-.01em' });
    gsap.set(nm, { top: 98 - nm.offsetHeight / 2 });
    const pill = h('div', { cls: 'pill', html: '' }, card);
    gsap.set(pill, { left: 38, top: 198, height: 64, padding: '0 28px 0 20px', backgroundColor: '#fff', color: C.ink, fontSize: 30, fontWeight: 500 });
    const pic = sv('svg', { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', stroke: C.red, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    pic.innerHTML = window.LUCIDE['calendar-days'];
    pill.appendChild(pic);
    const pt = h('span', { html: c.dates }, pill);

    tl.fromTo(card, { autoAlpha: 0, y: 70, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, c.tIn);
    pop(tl, disc, c.tIn + .15, { dur: .6 });
    drawIn(tl, ic, c.tIn + .25, { dur: .9, stagger: .08 });
    tl.fromTo(div, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .6, ease: 'expo.out' }, c.tIn + .3);
    revealLines(tl, nm, c.tIn + .3, { stagger: .08 });
    tl.fromTo(pill, { autoAlpha: 0, scale: .6, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(1.8)' }, c.tDate);
    lightUp(c.win[0], c.win[1], c.tDate + .12);
    return { card, pill };
  });
  // a little breath on the cards while the last date is read
  tl.to(cardEls.map(c => c.card), { y: -6, duration: .8, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: .12 }, 35.143);

  // exit toward scene 3: text up, cards down, the strip collapses into the timeline's line
  const TX = 36.49;
  tl.to([eb, title, sub], { y: -40, autoAlpha: 0, duration: .45, ease: 'power2.in', stagger: .05 }, TX);
  tl.to(cardEls.map(c => c.card), { y: 60, autoAlpha: 0, duration: .5, ease: 'power2.in', stagger: .06 }, TX + .05);
  tl.to(lab, { autoAlpha: 0, duration: .3 }, TX);
  tl.to(cells, { scaleY: .1, autoAlpha: 0, duration: .35, ease: 'power2.in', stagger: .01 }, TX + .1);
});
