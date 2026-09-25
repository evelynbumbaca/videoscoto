# Etapas de evaluación · Gestión del desempeño 2026

Video institucional en motion graphics, sincronizado con la locución.

- **Archivo final:** [`entrega/Etapas_de_evaluacion_GD2026.mp4`](entrega/Etapas_de_evaluacion_GD2026.mp4)
- **Formato:** 1920×1080 (16:9) · 30 fps · H.264 (High, CRF 14) + AAC 256 kbps · 2:14
- **Locución:** empieza en el segundo 0,5 del video (ya viene mezclada en el MP4).
- **Sin logo:** el logo de COTO se agrega en After Effects (ver zonas reservadas).
- **Guion y tiempos:** [`docs/STORYBOARD.md`](docs/STORYBOARD.md)

## Zonas reservadas para el logo

| Momento | Zona libre (px, sobre 1920×1080) |
|---|---|
| Apertura, 0 – 3,4 s (fondo rojo) | esquina superior derecha: x 1480–1800, y 60–200 |
| Cierre, 126 s – fin (fondo rojo) | centrado debajo de la línea de tiempo: x 760–1160, y 720–900 |
| Resto del video | esquina superior derecha (x ≥ 1560, y ≤ 170), para una marca de agua opcional |

## Sistema visual

- Rojo institucional `#E6352F` (todo lo rojo del video), rojo profundo `#C92A24` para capas de barrido, rosa claro `#FCE8E6` para tarjetas y avatares, fondo claro `#F6F4F1`.
- Tipografía Poppins (la del infográfico), pesos 400–800.
- Íconos lineales [Lucide](https://lucide.dev) animados trazo a trazo, más ilustraciones vectoriales propias (avatares, flechas, formulario, montaña, recorrido).

## Cómo está hecho

Cada escena es HTML + SVG animado con [GSAP](https://gsap.com) sobre **una sola línea de tiempo pausada**. El renderizador (Playwright + Chromium) posiciona esa línea en cada cuadro, captura la imagen y ffmpeg arma el video. Por eso cada cuadro es una función exacta del tiempo y el render es reproducible.

Los tiempos salen de la locución: `assets/timing/words.json` tiene la marca de tiempo de cada palabra (reconocimiento de voz con Parakeet v3). En las escenas, `A(t)` convierte un tiempo de audio en tiempo de video, así que cada animación está anclada a la palabra que la dispara.

```
src/
  index.html            escenario 1920×1080 + reproductor de vista previa
  lib.js                constantes, colores y helpers de animación
  scenes/s1…s7_*.js     una escena por archivo
render/render.mjs       render de cuadros, hojas de contacto y codificación
assets/audio/           locución
assets/timing/          marcas de tiempo por palabra
```

## Vista previa y render

```bash
npm install

# vista previa en el navegador, con audio y barra de tiempo
npx http-server -p 8080       # luego abrir http://localhost:8080/src/index.html

# hoja de contacto de revisión (tiempos en segundos)
node render/render.mjs --sheet=2,12,30,62,76,95,112,133 --cols=4 --out=out/check/sheet.jpg

# render final: 4 subcuadros por cuadro = desenfoque de movimiento con obturador de 180°
node render/render.mjs --frames --workers=4 --mb=4
node render/render.mjs --encode --mb=4 --out=entrega/Etapas_de_evaluacion_GD2026.mp4
```

Sin `--mb` se renderiza sin desenfoque de movimiento (unas 4 veces más rápido, útil para borradores).

## Créditos de recursos

- Poppins: Indian Type Foundry, SIL Open Font License.
- Íconos Lucide: licencia ISC.
- GSAP: licencia estándar sin cargo de GSAP (incluye uso comercial).
