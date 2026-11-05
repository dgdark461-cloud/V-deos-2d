/* base.js - primitivas de SVG em string (reaproveitadas de vídeos anteriores) + câmera 2.5D e transições.
   Sem estilo: cores e personagens ficam em kit.js. */
const f1 = n => Math.round(n * 10) / 10;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lp = (a, b, u) => a + (b - a) * u;
const ez = x => { x = cl(x); return x * x * (3 - 2 * x); };
const R = (x, y, w, h, fill, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0, r))}" fill="${fill}" ${ex}/>`;
const E = (x, y, rx, ry, fill, ex = '') => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(Math.max(0, rx))}" ry="${f1(Math.max(0, ry))}" fill="${fill}" ${ex}/>`;
const P = (d, fill, ex = '') => `<path d="${d}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, stroke, w, ex = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const PL = (pts, stroke, w, ex = '') => `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const POLY = (pts, fill, ex = '') => `<polygon points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;
const SP = (pts, fill, ex = '', closed = true) => P(H.smoothPath(pts, closed), fill, ex);
const G = (inner, tf = '', ex = '') => `<g transform="${tf}" ${ex}>${inner}</g>`;
const T = (x, y, rot = 0, sx = 1, sy = sx) => `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`;
const OP = v => `opacity="${cl(v).toFixed(3)}"`;
const ST = (col, w, ex = '') => `stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}`;
const hex2rgb = h => { if (h[0] === 'r') return h.match(/[\d.]+/g).slice(0, 3).map(Number); h = h.replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
function mixc(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); k = cl(k); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',') + ')'; }
const hz = (n, s = 0) => H.hash(n * 1.0 + s * 131);
const TXT = (x, y, str, size, fill, ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" font-family="Arial, 'Liberation Sans', Helvetica, sans-serif" font-weight="700" font-size="${f1(size)}" fill="${fill}" ${ex}>${str}</text>`;
const LG = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}" stop-opacity="${s[2] === undefined ? 1 : s[2]}"/>`).join('')}</linearGradient>`;
const RG = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}" stop-opacity="${s[2] === undefined ? 1 : s[2]}"/>`).join('')}</radialGradient>`;
const DEFS = s => `<defs>${s}</defs>`;
const BLURF = (id, sd) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
const U = id => `url(#${id})`;

/* câmera 2D: centro (cx,cy), zoom, rotação, tremor */
function camG(t, cx, cy, zoom, rot, shk, inner) {
  const sx = shk ? H.noise(t * 9, 1) * shk : 0, sy = shk ? H.noise(t * 9, 2) * shk : 0;
  return `<g transform="translate(${f1(540 + sx)} ${f1(960 + sy)}) rotate(${f1(rot)}) scale(${zoom.toFixed(4)}) translate(${f1(-cx)} ${f1(-cy)})">${inner}</g>`;
}
/* 2.5D: cada camada tem profundidade z (1 = plano de referência). Câmera em (x,y,z): z>0 aproxima.
   s = z/(z - cam.z): na câmera em z=0 toda camada ocupa a tela; o avanço amplia mais as camadas próximas; deslocamento proporcional a s (camadas distantes andam menos = parallax). */
function LAY(z, inner, cam) {
  const s = z / Math.max(0.05, z - cam.z);
  return G(inner, `translate(${f1(540 - cam.x * s / z)} ${f1(960 - cam.y * s / z)}) scale(${s.toFixed(4)}) translate(-540 -960)`);
}
/* desfoque de profundidade barato: opacidade + leve névoa clara para camadas distantes */
const HAZE = (col, a) => a > 0.005 ? R(-2000, -2000, 5080, 5920, col, OP(a)) : '';
