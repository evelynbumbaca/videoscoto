// Headless renderer for src/index.html.
// Every frame is a pure function of time: the page exposes window.__seek(t),
// we seek, capture, and hand the images to ffmpeg.
//
//   node render/render.mjs --still=12.5 [--out=out/still.png]
//   node render/render.mjs --sheet=1,2.5,4 [--cols=4] [--w=480] [--out=out/check/sheet.jpg]
//   node render/render.mjs --strip=10:11 [--step=0.1] ...          (sheet of a time range)
//   node render/render.mjs --frames [--workers=4] [--mb=1] [--from=0 --to=DUR]
//   node render/render.mjs --encode [--mb=1] [--out=out/video.mp4]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, ...v] = a.replace(/^--/, '').split('=');
  return [k, v.length ? v.join('=') : true];
}));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };

function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
      fs.createReadStream(p).pipe(rsp);
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}

async function openPage(browser, port, query = '') {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('[page error]', e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('[console]', m.text()); });
  await page.goto(`http://127.0.0.1:${port}/src/index.html?render=1${query}`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  const client = await page.context().newCDPSession(page);
  return { page, client };
}

async function capture({ page, client }, t, type = 'png') {
  await page.evaluate(t => window.__seek(t), t);
  const r = await client.send('Page.captureScreenshot', { format: type, quality: type === 'jpeg' ? 92 : undefined, optimizeForSpeed: true });
  return Buffer.from(r.data, 'base64');
}

function ffmpeg(argv) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...argv], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + argv.join(' '));
}

const outPath = p => { fs.mkdirSync(path.dirname(path.resolve(ROOT, p)), { recursive: true }); return path.resolve(ROOT, p); };

async function main() {
  const srv = await serve();
  const port = srv.address().port;
  const browser = await chromium.launch({
    args: ['--force-color-profile=srgb', '--hide-scrollbars', '--disable-lcd-text', '--font-render-hinting=none', '--disable-gpu-vsync'],
  });
  try {
    const debug = args.sheet || args.strip ? '&debug=1' : '';
    const P = await openPage(browser, port, debug);
    const meta = await P.page.evaluate(() => ({ dur: window.__DUR, fps: window.__FPS, audioOffset: window.__audioOffset }));

    if (args.still) {
      const out = outPath(args.out || 'out/still.png');
      fs.writeFileSync(out, await capture(P, parseFloat(args.still), out.endsWith('.jpg') ? 'jpeg' : 'png'));
      console.log('still ->', out);
    } else if (args.sheet || args.strip) {
      let times;
      if (args.sheet) times = String(args.sheet).split(',').map(Number);
      else {
        const [a, b] = String(args.strip).split(':').map(Number);
        const step = parseFloat(args.step || 1 / meta.fps);
        times = []; for (let t = a; t <= b + 1e-6; t += step) times.push(+t.toFixed(4));
      }
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sheet-'));
      for (let i = 0; i < times.length; i++) fs.writeFileSync(path.join(tmp, `s_${String(i).padStart(3, '0')}.jpg`), await capture(P, times[i], 'jpeg'));
      const cols = parseInt(args.cols || Math.min(times.length, 4));
      const rows = Math.ceil(times.length / cols);
      const w = parseInt(args.w || 480);
      const out = outPath(args.out || 'out/check/sheet.jpg');
      ffmpeg(['-framerate', '1', '-i', path.join(tmp, 's_%03d.jpg'), '-vf', `scale=${w}:-1:flags=lanczos,tile=${cols}x${rows}:padding=6:margin=6:color=0x202020`, '-frames:v', '1', '-q:v', '3', out]);
      fs.rmSync(tmp, { recursive: true, force: true });
      console.log('sheet ->', out, `(${times.length} frames)`);
    } else if (args.frames) {
      await P.page.close();
      const fps = meta.fps, mb = parseInt(args.mb || 1);
      const from = Math.round(parseFloat(args.from || 0) * fps), to = Math.round(parseFloat(args.to || meta.dur) * fps);
      const dir = outPath(`out/frames${mb > 1 ? '_mb' + mb : ''}/x`); fs.mkdirSync(path.dirname(dir), { recursive: true });
      const workers = parseInt(args.workers || 4);
      const total = to - from, per = Math.ceil(total / workers);
      const t0 = Date.now(); let done = 0;
      await Promise.all(Array.from({ length: workers }, async (_, w) => {
        const a = from + w * per, b = Math.min(to, a + per);
        if (a >= b) return;
        const W = await openPage(browser, port);
        // walk into the range so the first frame is rendered exactly like its neighbours
        for (let f = Math.max(0, a - 2 * fps); f < a; f++) await W.page.evaluate(t => window.__seek(t), f / fps);
        for (let f = a; f < b; f++) {
          for (let k = 0; k < mb; k++) {
            const idx = f * mb + k;
            const file = path.join(path.dirname(dir), `f_${String(idx).padStart(6, '0')}.png`);
            if (fs.existsSync(file) && !args.force) continue;
            // 180-degree shutter: subframes spread over half a frame, centred on the frame time
            const t = f / fps + (mb > 1 ? ((k + 0.5) / mb - 0.5) * 0.5 / fps : 0);
            fs.writeFileSync(file, await capture(W, Math.max(0, t)));
          }
          if (++done % 100 === 0) console.log(`${done}/${total} frames  ${((Date.now() - t0) / done).toFixed(0)} ms/frame`);
        }
        await W.page.close();
      }));
      console.log(`frames done in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    } else if (args.encode) {
      const fps = meta.fps, mb = parseInt(args.mb || 1);
      const dir = path.resolve(ROOT, `out/frames${mb > 1 ? '_mb' + mb : ''}`);
      const out = outPath(args.out || 'out/video.mp4');
      const audio = path.resolve(ROOT, 'assets/audio/locucion.mp3');
      const offMs = Math.round(meta.audioOffset * 1000);
      // RGB -> BT.709 limited range with accurate rounding, so #E6352F stays #E6352F (±1) in any player
      const toYuv = 'scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int+bitexact,format=yuv420p';
      const vf = mb > 1
        ? `tmix=frames=${mb}:weights=${Array(mb).fill(1).join(' ')},select='not(mod(n+1\\,${mb}))',setpts=N/(${fps}*TB),${toYuv}`
        : toYuv;
      ffmpeg(['-framerate', String(fps * mb), '-i', path.join(dir, 'f_%06d.png'),
        '-i', audio, '-filter_complex', `[0:v]${vf}[v];[1:a]adelay=${offMs}:all=1,apad=whole_dur=${meta.dur}[a]`,
        '-map', '[v]', '-map', '[a]', '-r', String(fps),
        '-c:v', 'libx264', '-preset', 'slow', '-crf', String(args.crf || 10), '-tune', 'animation', '-profile:v', 'high', '-g', String(fps),
        '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
        '-c:a', 'aac', '-b:a', '256k', '-t', String(meta.dur), '-movflags', '+faststart', out]);
      console.log('video ->', out);
    }
  } finally {
    await browser.close();
    srv.close();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
