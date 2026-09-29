// Scene 3 · Evaluación y feedback en cascada (38.8 – 68.3 s)
// The October strip becomes the timeline; it advances one number at a time. Then step 4 grows into the
// "Importante" card (close the process in SuccessFactors), which finally expands into scene 4's red.
SCENES.push(tl => {
  const s3 = h('div', { cls: 'scene' });
  const TX2 = 36.736;                                  // scene 2 starts leaving
  const TE = 70.12;                                   // "…Desempeño 2026." ends: Importante clears
  show(tl, s3, TX2 + .02, TE + 1.07);
  box(s3, { x: 0, y: 0, w: W, h: H, bg: C.bg });
  gsap.set(s3.firstChild, { autoAlpha: 0 });
  tl.set(s3.firstChild, { autoAlpha: 1 }, TX2 + .42);          // behind the collapsing strip of scene 2
  const content = h('div', { cls: 'fill' }, s3);

  // header
  const eb = T(content, 'Después viene la etapa de', { x: 150, y: 176, cls: 'eyebrow', nowrap: true });
  revealWords(tl, eb, A(36.626) + .02, { stagger: .05 });
  const title = T(content, 'Evaluación y feedback', { x: 145, y: 214, size: 108, weight: 800, rw: true, ls: '-.02em', nowrap: true });
  revealWords(tl, title, A(38.226) - .3, { stagger: .08 });

  // "En cascada" tag with a stair icon
  const tag = h('div', { cls: 'pill' }, content);
  gsap.set(tag, { left: 150, top: 364, height: 60, padding: '0 28px 0 18px', border: `2.5px solid ${C.red}`, color: C.red, fontSize: 30, fontWeight: 700 });
  const st = sv('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', stroke: C.red, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  const stairs = sv('path', { d: 'M4 8 H14 V18 H24 V28 H35' }, st);
  const arrowH = sv('path', { d: 'M29 22 L35 28 L29 34' }, st);
  tag.appendChild(st);
  h('span', { html: 'En cascada' }, tag);
  const tTag = A(40.23) - .3;
  tl.fromTo(tag, { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: .7, ease: 'expo.out' }, tTag);
  tl.fromTo(stairs, { drawSVG: '0%' }, { drawSVG: '100%', duration: .7, ease: 'power2.inOut' }, tTag + .1);
  tl.fromTo(arrowH, { drawSVG: '50% 50%', autoAlpha: 0 }, { drawSVG: '0% 100%', autoAlpha: 1, duration: .3 }, tTag + .7);

  // timeline: the line arrives from the strip position, then settles at LY
  const X0 = 150, X1 = 1770, LY = 548;
  const base = box(content, { x: X0, y: LY - 3, w: X1 - X0, h: 6, bg: '#DDD5CE', r: 3 });
  tl.fromTo(base, { autoAlpha: 0, y: 898 - LY, scaleX: 1 }, { autoAlpha: 1, duration: .25 }, TX2 + .17);
  tl.to(base, { y: 0, duration: .85, ease: 'power3.inOut' }, TX2 + .47);
  const prog = box(content, { x: X0, y: LY - 5, w: X1 - X0, h: 10, bg: C.red, r: 5 });
  gsap.set(prog, { scaleX: 0, transformOrigin: '0% 50%' });

  const CW = 390, GAP = 20;
  const steps = [
    { a: 'Directores', b: 'Gerentes', dates: '12 al 23 de octubre', tStep: A(40.92), tName: A(41.718), tDate: A(43.159) },
    { a: 'Gerentes', b: 'Mandos Medios', dates: '26 de octubre<br>al 13 de noviembre', tStep: A(45.478), tName: A(46.2), tDate: A(47.879) },
    { a: 'Mandos Medios', b: 'Colaboradores', dates: '2 al 20<br>de noviembre', tStep: A(50.92), tName: A(51.799), tDate: A(53.793) },
    { a: 'Cierre', b: 'del proceso', dates: '23 de noviembre<br>al 7 de diciembre', tStep: A(56.188), tName: A(56.828), tDate: A(58.349), last: true },
  ];
  const circles = [], cards = [];
  steps.forEach((s, i) => {
    const x = X0 + i * (CW + GAP), cx = x + CW / 2;
    // placeholder circle (grey) that fills red when the line reaches it
    const c = box(content, { x: cx - 50, y: LY - 50, w: 100, h: 100, r: 50, bg: '#fff', border: '4px solid #DDD5CE' });
    const fillC = box(c, { x: -4, y: -4, w: 100, h: 100, r: 50, bg: C.red });
    const num = T(c, String(i + 1), { x: 46, y: 18, w: 100, align: 'center', size: 44, weight: 900, color: '#B7ADA6', lh: 1.2 });
    const numW = T(c, String(i + 1), { x: 46, y: 18, w: 100, align: 'center', size: 44, weight: 900, color: '#fff', lh: 1.2 });
    gsap.set(fillC, { scale: 0 }); gsap.set(numW, { autoAlpha: 0 });
    pop(tl, c, A(38.226) + .05 + i * .14, { dur: .6 });
    circles.push({ c, fillC, num, numW, cx });

    // card under the circle
    const card = box(content, { x, y: LY + 88, w: CW, h: 286, r: 26, bg: '#fff', shadow: '0 16px 44px rgba(90,40,30,.08)' });
    const notch = box(card, { x: CW / 2 - 13, y: -11, w: 26, h: 26, bg: '#fff', r: 5 });
    gsap.set(notch, { rotation: 45 });
    const nm = T(card, s.last ? `<b>${s.a}</b><br><b>${s.b}</b>` : `<b>${s.a}</b><br><span class="light" style="color:${C.ink2}">a</span> <b>${s.b}</b>`,
      { x: 34, y: 30, w: CW - 44, size: 36, weight: 700, lh: 1.18, ls: '-.012em', nowrap: true });
    const bar = box(card, { x: 34, y: 152, w: 54, h: 5, r: 3, bg: C.red });
    const dt = T(card, s.dates, { x: 34, y: 176, w: CW - 50, size: 32, weight: 500, lh: 1.26, color: C.ink });
    tl.fromTo(card, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out' }, s.tName - .35);
    revealLines(tl, nm, s.tName - .2, { stagger: .1 });
    tl.fromTo(bar, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .6, ease: 'expo.out' }, s.tDate - .25);
    revealLines(tl, dt, s.tDate - .15, { stagger: .1 });
    cards.push(card);

    // the red line advances to this circle
    const tArrive = s.tStep + .15;
    tl.to(prog, { scaleX: (cx - X0) / (X1 - X0), duration: .65, ease: 'power2.inOut' }, tArrive - .65);
    tl.to(fillC, { scale: 1, duration: .45, ease: 'back.out(1.6)' }, tArrive - .08);
    tl.to(numW, { autoAlpha: 1, duration: .2 }, tArrive);
    tl.fromTo(c, { scale: 1 }, { scale: 1.14, duration: .22, ease: 'power2.out', yoyo: true, repeat: 1, immediateRender: false }, tArrive);
    // focus: previous card steps back a little while the new one is read
    if (i > 0) tl.to(cards[i - 1], { autoAlpha: .55, duration: .4 }, s.tName - .35);
  });
  tl.to(prog, { scaleX: 1, duration: .8, ease: 'power2.inOut' }, A(60.747) - .2);
  tl.to(cards.slice(0, 3), { autoAlpha: 1, duration: .4 }, A(60.747) - .2);

  // ---------------------------------------------------------------- Importante
  const c4 = circles[3];
  const grow = box(s3, { x: c4.cx - 50, y: LY - 50, w: 100, h: 100, r: 50, bg: C.red });
  gsap.set(grow, { autoAlpha: 0 });
  const TG = 61.393;
  tl.set(grow, { autoAlpha: 1 }, TG);
  tl.to(grow, { left: 110, top: 150, width: 1700, height: 780, borderRadius: 44, duration: .85, ease: 'power4.inOut' }, TG);
  tl.to(content, { autoAlpha: 0, duration: .4, ease: 'power1.in' }, TG + .12);

  const imp = h('div', { cls: 'fill' }, s3);
  const pill = h('div', { cls: 'pill' }, imp);
  gsap.set(pill, { left: 200, top: 238, height: 66, padding: '0 30px 0 20px', backgroundColor: '#fff', color: C.red, fontSize: 28, fontWeight: 700, letterSpacing: '.14em' });
  const al = sv('svg', { width: 38, height: 38, viewBox: '0 0 24 24', fill: 'none', stroke: C.red, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  al.innerHTML = window.LUCIDE['circle-alert'];
  pill.appendChild(al);
  h('span', { html: 'IMPORTANTE' }, pill);
  tl.fromTo(pill, { autoAlpha: 0, scale: .5, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(1.8)' }, A(61.788) + .02);
  tl.fromTo(al, { rotation: -30 }, { rotation: 0, duration: .8, ease: 'elastic.out(1.2,.4)' }, A(61.788) + .2);

  const hl = T(imp, 'Recordá cerrar<br>el proceso en', { x: 196, y: 348, size: 80, weight: 900, color: '#fff', lh: 1.1, ls: '-.015em' });
  revealLines(tl, hl, A(62.829) - .15, { stagger: .12 });
  // "SuccessFactors" on its own line, with a marker highlight that turns it red on white
  const sfY = 348 + 88 * 2 + 20;
  const sf = T(imp, 'SuccessFactors', { x: 196, y: sfY, size: 80, weight: 900, color: '#fff', lh: 1.1, ls: '-.015em', nowrap: true });
  const mark = box(imp, { x: 180, y: sfY + 6, w: sf.offsetWidth + 34, h: 86, r: 14, bg: '#fff' });
  imp.insertBefore(mark, sf);
  revealLines(tl, sf, A(62.829) + .09);
  tl.fromTo(mark, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .5, ease: 'power3.inOut' }, A(65.307) - .12);
  tl.to(sf, { color: C.red, duration: .15 }, A(65.307) + .1);

  const sub = T(imp, 'para concluir tu evaluación<br>de Desempeño 2026.', { x: 200, y: 700, w: 900, size: 40, weight: 500, color: 'rgba(255,255,255,.92)', lh: 1.3 });
  revealLines(tl, sub, A(66.509) - .12, { stagger: .1 });

  // generic form being completed and closed (no third-party branding)
  const FX = 1222, FY = 236, FW = 480, FH = 600;
  const form = box(imp, { x: FX, y: FY, w: FW, h: FH, r: 28, bg: '#fff', shadow: '0 30px 60px rgba(120,20,15,.28)' });
  const top = box(form, { x: 0, y: 0, w: FW, h: 70, bg: '#F6F2EF' });
  gsap.set(top, { borderRadius: '28px 28px 0 0' });
  ['#E9A09D', '#EFC6A0', '#D9D2CC'].forEach((c, i) => box(top, { x: 28 + i * 26, y: 28, w: 14, h: 14, r: 7, bg: c }));
  T(form, 'Evaluación de Desempeño 2026', { x: 36, y: 100, size: 26, weight: 700, color: C.ink, nowrap: true });
  const rows = [0, 1, 2].map(i => {
    const y = 176 + i * 78;
    const cb = box(form, { x: 36, y, w: 40, h: 40, r: 10, border: '3px solid #D8CFC8' });
    const tick = sv('svg', { width: 40, height: 40, viewBox: '0 0 40 40' });
    tick.style.cssText = 'position:absolute;left:-3px;top:-3px';
    const tf = sv('rect', { x: 0, y: 0, width: 40, height: 40, rx: 10, fill: C.red }, tick);
    const tp = sv('path', { d: 'M11 20.5 L17.5 27 L29 14', fill: 'none', stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, tick);
    cb.appendChild(tick);
    box(form, { x: 96, y: y + 6, w: [300, 250, 330][i], h: 12, r: 6, bg: '#E7E1DC' });
    box(form, { x: 96, y: y + 26, w: [200, 260, 170][i], h: 10, r: 5, bg: '#F0EBE7' });
    return { tf, tp };
  });
  const btn = box(form, { x: 36, y: FH - 132, w: FW - 72, h: 84, r: 42, bg: C.red });
  const bt1 = T(btn, 'Cerrar proceso', { x: (FW - 72) / 2, y: 22, w: FW - 72, align: 'center', size: 30, weight: 700, color: '#fff' });
  const bt2 = T(btn, 'Proceso cerrado', { x: (FW - 72) / 2 + 22, y: 22, w: FW - 72, align: 'center', size: 30, weight: 700, color: '#fff' });
  const okc = sv('svg', { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  okc.innerHTML = window.LUCIDE.check; okc.style.cssText = 'position:absolute;left:60px;top:25px';
  btn.appendChild(okc);
  const cursor = sv('svg', { width: 64, height: 64, viewBox: '0 0 24 24', fill: C.ink, stroke: '#fff', 'stroke-width': 1.4, 'stroke-linejoin': 'round' });
  cursor.innerHTML = window.LUCIDE['mouse-pointer-2'];
  cursor.style.cssText = `position:absolute;left:${FX + 330}px;top:${FY + FH - 70}px`;
  imp.appendChild(cursor);
  const seal = box(imp, { x: FX + FW - 62, y: FY - 38, w: 100, h: 100, r: 50, bg: '#fff', shadow: '0 12px 30px rgba(120,20,15,.25)' });
  const sealIc = icon(seal, 'check', { cx: 50, cy: 50, size: 60, sw: 3, color: C.red });

  const tF = A(62.829) + .05;
  tl.fromTo(form, { autoAlpha: 0, y: 80, rotation: 3 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 1.1, ease: 'expo.out' }, tF - .35);
  rows.forEach((r, i) => {
    tl.fromTo(r.tf, { autoAlpha: 0, scale: .4, svgOrigin: '20 20' }, { autoAlpha: 1, scale: 1, svgOrigin: '20 20', duration: .35, ease: 'back.out(2)' }, tF + .45 + i * .42);
    tl.fromTo(r.tp, { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out' }, tF + .6 + i * .42);
  });
  gsap.set([bt2, okc], { autoAlpha: 0 });
  tl.fromTo(cursor, { autoAlpha: 0, x: 160, y: 140 }, { autoAlpha: 1, x: 0, y: 0, duration: .9, ease: 'power3.out' }, A(65.307) - .55);
  const tClick = A(65.948) + .1;
  tl.to(cursor, { scale: .82, duration: .1, ease: 'power2.in', yoyo: true, repeat: 1, transformOrigin: '20% 20%' }, tClick);
  tl.to(btn, { scale: .95, duration: .1, ease: 'power2.in', yoyo: true, repeat: 1 }, tClick);
  tl.to(bt1, { autoAlpha: 0, y: -20, duration: .2 }, tClick + .12);
  tl.fromTo(bt2, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .45, ease: 'expo.out' }, tClick + .2);
  tl.fromTo(okc, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: .45, ease: 'back.out(2.5)' }, tClick + .25);
  tl.to(cursor, { x: 60, y: 70, autoAlpha: 0, duration: .6, ease: 'power2.in' }, tClick + .5);
  pop(tl, seal, tClick + .45, { dur: .7, ease: 'back.out(2.2)' });
  drawIn(tl, sealIc, tClick + .6, { dur: .4 });

  // Importante → scene 4: everything clears and the card fills the frame
  tl.to([pill, hl, sf, mark, sub], { autoAlpha: 0, y: -30, duration: .4, ease: 'power2.in', stagger: .04 }, TE);
  tl.to([form, seal], { autoAlpha: 0, y: 40, duration: .4, ease: 'power2.in' }, TE);
  tl.to(grow, { left: 0, top: 0, width: W, height: H, borderRadius: 0, duration: .8, ease: 'power4.inOut' }, TE + .15);
});
