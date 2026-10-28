/* art.js - O Último Sobrevivente: cidade vazia, Arthur, objetos. Tudo devolve strings SVG.
   Estética: cidade fantasma em aço-azulado e verde-petróleo dessaturados, âmbar quente só onde há vida, vermelho de alarme. */
const PAL = {
  skin: '#c98f6a', skinSh: '#8f5a40', hair: '#17110f', hood: '#d9a23a', hoodSh: '#a67420', pants: '#2c3340', shoe: '#e8e6e0', sole: '#8d9199',
  red: '#ff3b3b', amber: '#ffbf47', steel: '#6f8795', teal: '#1d3a45', night: '#050912', cyan: '#8fe3ff', sick: '#bfe6a8', paint: '#e8e2d2',
  ink: '#05080c', moon: '#dbe9f4',
};
const f1 = n => Math.round(n * 10) / 10;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const R = (x, y, w, h, fill, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0, r))}" fill="${fill}" ${ex}/>`;
const E = (x, y, rx, ry, fill, ex = '') => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(Math.max(0, rx))}" ry="${f1(Math.max(0, ry))}" fill="${fill}" ${ex}/>`;
const P = (d, fill, ex = '') => `<path d="${d}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, stroke, w, ex = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const PL = (pts, stroke, w, ex = '') => `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const POLY = (pts, fill, ex = '') => `<polygon points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;
const G = (inner, tf = '', ex = '') => `<g transform="${tf}" ${ex}>${inner}</g>`;
const T = (x, y, rot = 0, sx = 1, sy = sx) => `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`;
const OP = v => `opacity="${cl(v).toFixed(3)}"`;
const hex2rgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
function mixc(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); k = cl(k); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',') + ')'; }
const hz = (n, s = 0) => H.hash(n * 1.0 + s * 131);

/* ---------------------------------------------------------------- defs e overlays comuns */
function defsC(Pf) {
  return `<defs>
  <radialGradient id="${Pf}vig" cx="0.5" cy="0.5" r="0.78"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.82"/></radialGradient>
  <radialGradient id="${Pf}glowW" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowF" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb347" stop-opacity="0.95"/><stop offset="0.45" stop-color="#ff6a1a" stop-opacity="0.35"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowR" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff3b30" stop-opacity="0.95"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowB" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#9fd0ff" stop-opacity="0.9"/><stop offset="1" stop-color="#9fd0ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowA" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd35a" stop-opacity="1"/><stop offset="0.5" stop-color="#ffb52e" stop-opacity="0.45"/><stop offset="1" stop-color="#ffb52e" stop-opacity="0"/></radialGradient>
  </defs>`;
}
const vignette = (Pf, a = 1) => `<rect x="0" y="0" width="1080" height="1920" fill="url(#${Pf}vig)" ${OP(a)}/>`;
const glow = (Pf, kind, x, y, r, a = 1) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#${Pf}glow${kind})" ${OP(a)}/>`;
const flash = (c, a) => a > 0.005 ? R(0, 0, 1080, 1920, c, OP(a)) : '';
/** faixas de cinema simples (sem texto): cantos escuros de câmera tremida */
function grain(t, a = 0.06) {
  let s = '';
  for (let i = 0; i < 18; i++) {
    const x = hz(i, Math.floor(t * 24)) * 1080, y = hz(i + 40, Math.floor(t * 24)) * 1920;
    s += R(x, y, 2 + hz(i + 9) * 5, 2 + hz(i + 11) * 5, '#fff', OP(a * hz(i + 3)));
  }
  return s;
}

/* ---------------------------------------------------------------- partículas */
function motes(t, n, w, h, seed = 1, col = 'rgba(255,255,255,0.5)', rmax = 4, speed = 12) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = (hz(i, seed) * w + Math.sin(t * 0.7 + i) * 30 + t * speed * (0.5 + hz(i, seed + 3))) % w, y = (hz(i, seed + 1) * h - t * speed * 0.6 * (0.3 + hz(i, seed + 4)) + h * 4) % h;
    s += C(x, y, 1 + hz(i, seed + 2) * rmax, col, OP(0.3 + 0.7 * Math.abs(Math.sin(t * 1.3 + i))));
  }
  return s;
}
function sparksFx(x, y, t, k, n = 12, len = 60, col = '#ffd45e') {
  if (k <= 0) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = hz(i, Math.floor(t * 16)) * 6.28, l = len * (0.3 + hz(i + 7, Math.floor(t * 16))) * k, d0 = 6 + hz(i) * 10;
    s += L(x + Math.cos(a) * d0, y + Math.sin(a) * d0, x + Math.cos(a) * (d0 + l), y + Math.sin(a) * (d0 + l), col, 3, OP(k));
  }
  return s;
}
function ringWaves(cx, cy, t, a0, n, maxR, col, fade = 1, w = 6) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = (((t - a0) * 0.9 + i / n) % 1 + 1) % 1; s += C(cx, cy, 20 + ph * maxR, 'none', `stroke="${col}" stroke-width="${f1(w * (1 - ph) + 1)}" ${OP((1 - ph) * fade)}`); }
  return s;
}
function limb(x, y, a1, l1, a2, l2) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const jx = x + Math.sin(r1) * l1, jy = y + Math.cos(r1) * l1;
  return [[x, y], [jx, jy], [jx + Math.sin(r2) * l2, jy + Math.cos(r2) * l2]];
}
/** origem = pés (centro). altura ~ 560. arms: [aL, eL, aR, eR] ângulos absolutos (0 = pendurado, 180 = para cima). */
function camG(t, cx, cy, zoom, rot, shk, inner) {
  const sx = shk ? H.noise(t * 45, 1) * shk : 0, sy = shk ? H.noise(t * 45, 2) * shk : 0;
  return `<g transform="translate(${f1(540 + sx)} ${f1(960 + sy)}) rotate(${f1(rot)}) scale(${zoom.toFixed(4)}) translate(${f1(-cx)} ${f1(-cy)})">${inner}</g>`;
}
function rainFx(t, n, w, h, col = 'rgba(190,210,235,0.35)', slant = 0.18, sp = 1.8) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = (t * sp + hz(i, 91)) % 1, x = hz(i, 92) * (w + 300) - 150 + ph * 120, y = ph * (h + 200) - 100; s += L(x, y, x - slant * 70, y + 70, col, 2.5); }
  return s;
  return s;
}
function bigX(cx, cy, sz, k, col = PAL.red, w = 26) {
  if (k <= 0) return '';
  return L(cx - sz * k, cy - sz * k, cx + sz * k, cy + sz * k, col, w, OP(Math.min(1, k * 2))) + L(cx + sz * k, cy - sz * k, cx - sz * k, cy + sz * k, col, w, OP(Math.min(1, k * 2)));
}
function checkMark(cx, cy, sz, k, col = '#6dff9a', w = 22) {
  if (k <= 0) return '';
  const a = [cx - sz, cy], b = [cx - sz * 0.3, cy + sz * 0.7], c = [cx + sz, cy - sz * 0.8];
  const k1 = cl(k * 2), k2 = cl(k * 2 - 1);
  return PL([a, [a[0] + (b[0] - a[0]) * k1, a[1] + (b[1] - a[1]) * k1]], col, w) + (k2 > 0 ? PL([b, [b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2]], col, w) : '');
}
/** olhos brilhando no escuro */
function eyesPair(Pf, x, y, s, col = '#ffd35a', a = 1, sep = 40) {
  return glow(Pf, 'A', x, y, 70 * s, 0.6 * a) + E(x - sep * s, y, 14 * s, 8 * s, col, OP(a)) + E(x + sep * s, y, 14 * s, 8 * s, col, OP(a)) + E(x - sep * s, y, 3 * s, 7 * s, '#000', OP(a)) + E(x + sep * s, y, 3 * s, 7 * s, '#000', OP(a));
}
/** substitui marcadores de id por ids com prefixo da cena */
function X(Pf, str) { return str.replace(/__GLOWA__/g, Pf + 'glowA').replace(/__GLOWW__/g, Pf + 'glowW').replace(/WEYE/g, Pf + 'weye'); }
