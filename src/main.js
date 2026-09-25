// Boot: wait for the fonts, build every scene onto one paused timeline, expose seek() for the renderer.
(async () => {
  const params = new URLSearchParams(location.search);
  const RENDER = params.has('render');
  const tl = gsap.timeline({ paused: true });

  await Promise.all([300, 400, 500, 600, 700, 800].map(w => document.fonts.load(`${w} 40px Poppins`)));
  await document.fonts.ready;

  for (const build of SCENES) build(tl);
  tl.set({}, {}, DUR);

  const dbg = document.getElementById('dbg');
  if (params.has('debug')) dbg.style.display = 'block';
  window.__DUR = DUR; window.__FPS = FPS; window.__audioOffset = OFF;
  window.__seek = t => { tl.seek(t); dbg.textContent = t.toFixed(2) + ' s'; };
  window.__seek(parseFloat(params.get('t') || 0));
  window.__ready = true;
  if (RENDER) return;

  // Preview player: scales the stage to the window and plays the timeline against the voice-over.
  const player = document.getElementById('player');
  player.style.display = 'flex';
  const fit = () => { const k = Math.min(innerWidth / W, (innerHeight - 50) / H); STAGE.style.transform = `scale(${k})`; };
  fit(); addEventListener('resize', fit);
  const audio = new Audio('../assets/audio/locucion.mp3');
  const scrub = document.getElementById('scrub'), tc = document.getElementById('tc'), btn = document.getElementById('play');
  scrub.max = DUR;
  let playing = false, t0 = 0, start = 0;
  const now = () => playing ? t0 + (performance.now() - start) / 1000 : +scrub.value;
  const sync = () => { const t = now(); audio.currentTime = Math.max(0, t - OFF); };
  function frame() {
    if (!playing) return;
    const t = now();
    if (t >= DUR) { toggle(); return; }
    if (t >= OFF && audio.paused) { audio.currentTime = t - OFF; audio.play(); }
    window.__seek(t); scrub.value = t; tc.textContent = t.toFixed(2);
    requestAnimationFrame(frame);
  }
  function toggle() {
    playing = !playing; btn.textContent = playing ? '❚❚ Pausa' : '▶︎ Play';
    if (playing) { t0 = +scrub.value; start = performance.now(); if (t0 >= OFF) { sync(); audio.play(); } requestAnimationFrame(frame); }
    else audio.pause();
  }
  btn.onclick = toggle;
  scrub.oninput = () => { if (playing) toggle(); window.__seek(+scrub.value); tc.textContent = (+scrub.value).toFixed(2); };
})();
