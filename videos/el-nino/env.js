/* env.js - cenários do El Niño: céu claro, nuvens, tempestade iluminada, cidade, casas, árvores, tornado,
   granizo, globo, mapas, oceano, quarto, painel de meteorologia, furacão, camadas da atmosfera. Tudo em strings SVG. */

/* ------------------------------------------------------------ céu */
function skyDefs(Pf, o = {}) {
  const st = o.storm || 0;
  const top = mixc(PAL.sky0, PAL.storm0, st), mid = mixc(PAL.sky1, PAL.storm1, st * 0.85), bot = mixc(PAL.sky2, '#ffd2b0', st * 0.6);
  return LG(Pf + 'sky', [[0, top], [0.55, mid], [1, bot]]) +
    RG(Pf + 'sun', [[0, '#fffbe0'], [0.25, PAL.sun], [0.6, PAL.sunHot, 0.35], [1, PAL.sunHot, 0]]) +
    RG(Pf + 'glw', [[0, '#ffffff', 0.9], [1, '#ffffff', 0]]) +
    RG(Pf + 'glwA', [[0, '#ffe27a', 0.95], [0.5, '#ffb84a', 0.35], [1, '#ffb84a', 0]]) +
    RG(Pf + 'glwB', [[0, '#bff4ff', 0.95], [1, '#7fe0ff', 0]]) +
    RG(Pf + 'glwR', [[0, '#ff7a3d', 0.95], [0.5, '#ff5a3c', 0.4], [1, '#ff5a3c', 0]]) +
    BLURF(Pf + 'bl8', 8) + BLURF(Pf + 'bl20', 20) + BLURF(Pf + 'bl3', 3);
}
function sky(Pf, t, o = {}) {
  const d = Object.assign({ storm: 0, sunX: 820, sunY: 360, sun: 1, rays: 1 }, o);
  let s = DEFS(skyDefs(Pf, d)) + R(-1500, -1500, 4080, 4920, U(Pf + 'sky'));
  if (d.sun > 0) {
    s += C(d.sunX, d.sunY, 360, U(Pf + 'sun'), OP(d.sun));
    if (d.rays) for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.08; s += POLY([[d.sunX, d.sunY], [d.sunX + Math.cos(a - 0.05) * 900, d.sunY + Math.sin(a - 0.05) * 900], [d.sunX + Math.cos(a + 0.05) * 900, d.sunY + Math.sin(a + 0.05) * 900]], '#fff6c8', OP(0.12 * d.sun * d.rays)); }
    s += C(d.sunX, d.sunY, 92, '#fff6b0', OP(d.sun));
  }
  return s;
}
const glowC = (Pf, k, x, y, r, a = 1) => C(x, y, r, U(Pf + k), OP(a));

/* ------------------------------------------------------------ nuvens */
function cloudPuff(x, y, s, o = {}) {
  const d = Object.assign({ col: PAL.cloud, sh: PAL.cloudSh, rim: PAL.rim, seed: 1, t: 0, a: 1 }, o);
  let base = '', top = '';
  const n = 6;
  for (let i = 0; i < n; i++) {
    const px = (i - (n - 1) / 2) * 52 + (hz(i, d.seed) - 0.5) * 20, r = 44 + 34 * Math.sin((i + 0.5) / n * Math.PI) + 12 * hz(i, d.seed + 2);
    const py = -r * 0.55 + H.noise(d.t * 0.3 + i, d.seed) * 4;
    base += C(px, py + 10, r, d.sh);
    top += C(px - 4, py, r * 0.94, d.col);
  }
  return G(base + top + R(-170, -10, 340, 30, d.sh, 'rx="15"') + P('M-110,-70 Q-40,-128 40,-100', 'none', ST(d.rim, 8, OP(0.7))), T(x, y, 0, s), OP(d.a));
}
/* nuvem de tempestade (cumulonimbo) iluminada pelo sol: corpo lilás, topo pêssego, base escura suave */
function stormCloud(x, y, s, t, o = {}) {
  const d = Object.assign({ seed: 3, grow: 1, anvil: 1, a: 1, lit: 1 }, o);
  let sh = '', body = '', hi = '';
  const g = d.grow;
  for (let i = 0; i < 9; i++) {
    const px = (i - 4) * 70 + (hz(i, d.seed) - 0.5) * 30, r = 80 + 40 * hz(i, d.seed + 1);
    body += C(px, -r * 0.4 + H.noise(t * 0.4 + i, d.seed) * 6, r, PAL.storm1);
    sh += C(px, 30, r * 0.9, PAL.stormSh);
  }
  for (let j = 0; j < 7; j++) {
    const h = -120 - j * 70 * g, w = 200 - j * 14 + (j > 4 ? (j - 4) * 60 * d.anvil : 0);
    for (let i = 0; i < 4; i++) {
      const px = (i - 1.5) * w / 2.4 + H.noise(t * 0.5 + i + j * 3, d.seed) * 12, r = 92 + 30 * hz(i + j * 5, d.seed + 3);
      body += C(px, h, r, mixc(PAL.storm1, '#c9b8ff', j / 9));
      if (i % 2 === 0) hi += C(px - r * 0.25, h - r * 0.3, r * 0.6, PAL.stormRim, OP(0.32 * d.lit * (0.4 + j / 10)));
    }
  }
  if (d.anvil > 0) body += E(60, -120 - 6 * 70 * g - 40, 380 * d.anvil, 60, '#d8ccff') + E(90, -120 - 6 * 70 * g - 60, 300 * d.anvil, 30, PAL.stormRim, OP(0.6 * d.lit));
  return G(sh + body + hi, T(x, y, 0, s), OP(d.a));
}
function bolt(x, y, len, seed, a = 1, w = 14) {
  if (a <= 0.01) return '';
  const pts = [[x, y]]; let cx = x, cy = y;
  for (let i = 0; i < 8; i++) { cx += (hz(i, seed) - 0.5) * 90; cy += len / 8; pts.push([cx, cy]); }
  return PL(pts, '#fff7b0', w * 2.4, OP(0.35 * a)) + PL(pts, '#ffffff', w, OP(a)) + PL([pts[3], [pts[3][0] + 70, pts[3][1] + 60], [pts[3][0] + 90, pts[3][1] + 130]], '#fff', w * 0.5, OP(a * 0.8));
}
function rainFx(t, n, o = {}) {
  const d = Object.assign({ x0: -100, x1: 1180, y0: -100, y1: 2020, col: '#e9f7ff', a: 0.55, slant: 0.22, sp: 2.2, len: 70, w: 4, seed: 1 }, o);
  let s = '';
  for (let i = 0; i < n; i++) {
    const ph = (t * d.sp * (0.8 + 0.4 * hz(i, d.seed + 3)) + hz(i, d.seed)) % 1;
    const x = d.x0 + hz(i, d.seed + 1) * (d.x1 - d.x0) + ph * d.slant * (d.y1 - d.y0) * 0.3, y = d.y0 + ph * (d.y1 - d.y0);
    s += L(x, y, x - d.slant * d.len, y + d.len, d.col, d.w, OP(d.a * (0.5 + 0.5 * hz(i, d.seed + 2))));
  }
  return s;
}
/* partículas de luz flutuando (poeira dourada) */
function motes(t, n, o = {}) {
  const d = Object.assign({ x0: 0, x1: 1080, y0: 0, y1: 1920, col: '#fff6c8', a: 0.6, seed: 5, r: 6 }, o);
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = d.x0 + ((hz(i, d.seed) * (d.x1 - d.x0) + t * 20 * (hz(i, d.seed + 4) - 0.3)) % (d.x1 - d.x0) + (d.x1 - d.x0)) % (d.x1 - d.x0);
    const y = d.y0 + ((hz(i, d.seed + 1) * (d.y1 - d.y0) - t * 30 * (0.4 + hz(i, d.seed + 2))) % (d.y1 - d.y0) + (d.y1 - d.y0)) % (d.y1 - d.y0);
    s += C(x, y, d.r * (0.5 + hz(i, d.seed + 3)), d.col, OP(d.a * (0.5 + 0.5 * Math.sin(t * 2 + i))));
  }
  return s;
}
function sparkle(x, y, r, a = 1, col = '#fff') {
  if (a <= 0.01) return '';
  return POLY(H.starPoints(x, y, r, r * 0.22, 4), col, OP(a));
}

/* ------------------------------------------------------------ terreno e cidade */
function hillBand(y, amp, col, seed, w0 = -800, w1 = 1880, ex = '') {
  const pts = [];
  for (let i = 0; i <= 14; i++) { const x = w0 + (w1 - w0) * i / 14; pts.push([x, y - amp * (0.5 + 0.5 * Math.sin(i * 1.3 + seed) * Math.cos(i * 0.7 + seed * 2))]); }
  return P(H.smoothPath(pts) + ` L${w1},${y + 2400} L${w0},${y + 2400}Z`, col, ex);
}
/* lavoura com faixas */
function fieldRows(y, h, col1, col2, n = 9) {
  let s = R(-800, y, 2680, h, col1);
  for (let i = 0; i < n; i++) { const yy = y + h * Math.pow(i / n, 1.6); s += R(-800, yy, 2680, 4 + i * 2.2, col2, OP(0.6)); }
  return s;
}
/* casa: origem = base central. roofOff 0..1 = telhado sendo arrancado; tiles = telhas faltando */
function house(x, y, s, o = {}) {
  const d = Object.assign({ wall: PAL.wallA, roof: PAL.roofA, roofOff: 0, t: 0, lit: 1, w: 220, h: 160, door: '#6a4fd8', seed: 1, flip: 1 }, o);
  const w = d.w, h = d.h;
  let st = R(-w / 2, -h, w, h, d.wall) + R(-w / 2, -h, w * 0.18, h, '#000', OP(0.06));
  st += R(-26, -100, 52, 100, d.door, 'rx="6"') + C(14, -50, 4, '#ffe26a');
  st += R(-w / 2 + 22, -h + 30, 46, 46, '#9be7ff', 'rx="4"') + R(w / 2 - 68, -h + 30, 46, 46, '#9be7ff', 'rx="4"') + L(-w / 2 + 45, -h + 30, -w / 2 + 45, -h + 76, '#fff', 4) + L(w / 2 - 45, -h + 30, w / 2 - 45, -h + 76, '#fff', 4);
  st += R(-w / 2 - 4, 0, w + 8, 10, '#000', OP(0.12));
  /* telhado (peças voando se roofOff>0) */
  const rh = 110, ov = 24;
  let roof = '';
  const rows = 4, cols = 7;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols - r; c++) {
    const i = r * 10 + c;
    const lift = cl((d.roofOff * 1.6 - hz(i, d.seed) * 0.6));
    const bx = -w / 2 - ov + (w + ov * 2) * (c + r * 0.5 + 0.5) / cols, by = -h - rh * (r + 0.5) / rows;
    const fx = bx + lift * (300 + 400 * hz(i, d.seed + 1)) * d.flip, fy = by - lift * (380 + 300 * hz(i, d.seed + 2)) + lift * lift * 200, rot = lift * 540 * (hz(i, d.seed + 3) - 0.5);
    roof += G(R(-((w + ov * 2) / cols) / 2 - 1, -rh / rows / 2 - 1, (w + ov * 2) / cols + 2, rh / rows + 2, (r + c) % 2 ? d.roof : PAL.roofB, 'rx="3"'), `translate(${f1(fx)} ${f1(fy)}) rotate(${f1(rot)})`, OP(1 - lift * 0.3));
  }
  const tri = POLY([[-w / 2 - ov, -h], [w / 2 + ov, -h], [0, -h - rh]], d.roofOff > 0 ? '#c9a77a' : d.roof);
  st = st + (d.roofOff > 0 ? POLY([[-w / 2 - ov, -h], [w / 2 + ov, -h], [0, -h - rh]], '#a77a4a') + [0.25, 0.5, 0.75].map(k => L(lp(-w / 2, 0, k), -h - rh * k, lp(w / 2, 0, k), -h - rh * k, '#7a5030', 5)).join('') : tri);
  st += roof + P(`M${w / 2 + ov - 6},-${h} L6,-${h + rh - 6}`, 'none', ST(PAL.rim, 6, OP(0.6 * d.lit)));
  return G(st, T(x, y, 0, s));
}
function tree(x, y, s, t, o = {}) {
  const d = Object.assign({ bend: 0, fall: 0, col: '#4cc25a', col2: '#2f9e48', seed: 1, wind: 0.3 }, o);
  const sway = d.bend + d.wind * 6 * Math.sin(t * 2.2 + d.seed) + d.wind * 3 * H.noise(t * 3, d.seed);
  const rot = sway + d.fall * 88;
  let s0 = P('M-16,0 L-10,-170 L10,-170 L16,0Z', '#9a5a32') + P('M-16,0 L-10,-170 L-2,-170 L-6,0Z', '#7a4024');
  const k = sway * 0.4;
  s0 += G(C(-60, -200, 74, d.col2) + C(60, -210, 70, d.col2) + C(0, -270, 90, d.col) + C(-60, -220, 66, d.col) + C(62, -230, 62, d.col) + C(-20, -300, 50, '#7ee06f', OP(0.8)) + P('M30,-350 C80,-340 120,-290 124,-240', 'none', ST(PAL.rim, 7, OP(0.6))), `rotate(${f1(k)} 0 -170)`);
  if (d.fall > 0) s0 = s0 + G(P('M-30,6 Q0,-20 30,6Z', '#7a4024'), '');
  return G(s0, T(x, y, rot, s));
}
/* torre cônica de catedral estilizada (genérica) + prédios */
function skyline(x, y, s, o = {}) {
  const d = Object.assign({ col: '#b7c6ff', col2: '#9db0f2', tower: 1 }, o);
  let st = '';
  const b = [[-420, 160, 90], [-330, 240, 70], [-250, 190, 80], [-170, 280, 60], [140, 230, 80], [220, 300, 70], [300, 200, 90], [390, 260, 70]];
  b.forEach(([bx, bh, bw], i) => { st += R(bx, -bh, bw, bh, i % 2 ? d.col : d.col2) + [0, 1, 2, 3, 4].map(j => R(bx + 12, -bh + 20 + j * 40, bw - 24, 14, '#e8f6ff', OP(bh > 40 + j * 40 + 20 ? 0.6 : 0))).join(''); });
  if (d.tower) st += POLY([[-70, 0], [70, 0], [0, -620]], d.col2) + POLY([[0, 0], [70, 0], [0, -620]], '#8798e0') + L(0, -620, 0, -700, '#8798e0', 8) + L(-20, -680, 20, -680, '#8798e0', 6) + P('M-40,-200 Q0,-215 40,-200', 'none', ST('#e8f6ff', 6, OP(0.6)));
  return G(st, T(x, y, 0, s));
}
/* tornado: funil de elipses giratórias + detritos */
function tornado(Pf, x, y, s, t, o = {}) {
  const d = Object.assign({ a: 1, h: 900, w: 330, debris: 1 }, o);
  let st = '';
  const n = 26;
  for (let i = 0; i < n; i++) {
    const k = i / (n - 1), yy = -k * d.h, ww = 30 + d.w * Math.pow(k, 1.6), off = Math.sin(t * 2 + k * 3) * 40 * (1 - k) + Math.sin(k * 5 + t) * 20;
    st += E(off, yy, ww, 26 + 30 * k, mixc('#9aa0dc', '#cfd3f7', k), OP(0.85));
    const ph = (t * 3 + i * 0.37) % 1;
    st += E(off + Math.cos(ph * Math.PI * 2) * ww * 0.7, yy, 26 + 20 * k, 8, '#ffffff', OP(0.4 * Math.max(0, Math.sin(ph * Math.PI * 2))));
  }
  st += E(0, 0, 220, 50, '#d9a77a', OP(0.5)) + E(0, -20, 160, 60, '#e9c39a', OP(0.35));
  if (d.debris) for (let i = 0; i < 30; i++) {
    const ph = (t * (0.6 + hz(i, 61) * 0.5) + hz(i, 62)) % 1, ang = ph * Math.PI * 6 + hz(i, 63) * 6, rad = 80 + 300 * ph, hy = -ph * d.h * 0.8;
    const px = Math.cos(ang) * rad, depth = Math.sin(ang);
    st += G(R(-10, -6, 20 + 14 * hz(i, 64), 12, i % 3 ? '#a2683e' : PAL.roofA, 'rx="2"'), `translate(${f1(px)} ${f1(hy)}) rotate(${f1(ang * 57)}) scale(${f1(0.7 + 0.3 * depth)})`, OP(0.9));
  }
  return G(st, T(x, y, 0, s), OP(d.a));
}
/* pedra de granizo */
const hail = (x, y, r, a = 1) => C(x, y, r, '#eaf8ff', OP(a) + ' ' + ST('#a9d4f0', 3)) + C(x - r * 0.3, y - r * 0.3, r * 0.35, '#fff', OP(a));
/* telhado de telhas em close (perspectiva) */
function tileRoof(Pf, t, o = {}) {
  const d = Object.assign({ cracks: [] }, o);
  let s = R(-200, -200, 1480, 2320, '#d9543c');
  for (let r = 0; r < 18; r++) {
    const y = 200 + r * 110;
    for (let c = -1; c < 9; c++) {
      const x = c * 140 + (r % 2) * 70;
      s += P(`M${x},${y} q70,-36 140,0 v100 q-70,-30 -140,0Z`, r % 3 ? PAL.roofA : PAL.roofB) + P(`M${x + 8},${y + 4} q62,-30 124,0`, 'none', ST('#ffb59e', 6, OP(0.6)));
    }
  }
  return s;
}

/* ------------------------------------------------------------ globo e mapas */
const LAND = {
  sam: [[-80, 10], [-75, 11], [-62, 10], [-50, 0], [-35, -5], [-35, -9], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-65, -42], [-68, -50], [-72, -53], [-75, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 1], [-78, 7]],
  nam: [[-168, 66], [-160, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 68], [-62, 60], [-55, 50], [-66, 44], [-70, 41], [-76, 35], [-81, 31], [-80, 25], [-84, 30], [-90, 29], [-97, 26], [-97, 20], [-92, 18], [-88, 15], [-83, 9], [-78, 8], [-80, 7], [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-115, 30], [-118, 34], [-124, 40], [-124, 48], [-133, 56], [-150, 60], [-165, 60]],
  afr: [[-17, 15], [-17, 21], [-10, 30], [-5, 36], [10, 37], [20, 33], [32, 31], [35, 28], [43, 12], [51, 12], [45, 2], [40, -5], [40, -15], [35, -24], [30, -31], [20, -35], [17, -29], [12, -18], [13, -8], [9, 0], [8, 4], [-5, 5], [-13, 8]],
  eua: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [3, 51], [8, 54], [12, 56], [5, 58], [8, 63], [15, 69], [28, 71], [40, 67], [60, 70], [80, 73], [100, 77], [120, 73], [140, 72], [160, 70], [175, 66], [170, 60], [160, 55], [142, 50], [140, 40], [130, 35], [122, 30], [120, 22], [108, 20], [106, 10], [100, 13], [98, 8], [103, 2], [100, 7], [92, 20], [80, 15], [77, 8], [72, 20], [66, 25], [57, 26], [52, 24], [56, 18], [44, 12], [35, 30], [30, 35], [27, 40], [20, 40], [15, 38], [12, 44], [5, 43]],
  aus: [[114, -22], [114, -34], [118, -35], [130, -32], [138, -35], [146, -39], [150, -37], [153, -28], [146, -19], [142, -11], [136, -12], [130, -12], [122, -17]],
  grl: [[-45, 60], [-20, 70], [-20, 80], [-40, 83], [-60, 80], [-70, 77], [-55, 70]],
  ind: [[95, 5], [105, -6], [115, -8], [125, -9], [140, -8], [150, -6], [140, -2], [120, 0], [110, 2], [100, 2]],
  mad: [[44, -13], [50, -15], [48, -25], [44, -24]],
  jap: [[130, 31], [135, 34], [141, 37], [142, 43], [140, 40], [136, 36]],
  uk: [[-5, 50], [1, 51], [0, 54], [-3, 58], [-6, 56]],
};
const BRAZIL = [[-60, 5], [-52, 4], [-50, 2], [-44, -2], [-35, -5], [-35, -9], [-39, -15], [-40, -20], [-42, -23], [-48, -26], [-49, -29], [-53, -34], [-57, -30], [-54, -27], [-54, -25], [-58, -23], [-58, -20], [-60, -16], [-65, -12], [-70, -11], [-73, -8], [-70, -4], [-70, 2], [-64, 3]];
const SOUTH = [[-54, -22.5], [-48, -25], [-48.5, -26], [-48.6, -28.5], [-50, -30], [-53, -34], [-57.6, -30.2], [-55.5, -28], [-53.7, -26.5], [-54.6, -25.5], [-54.2, -24], [-52, -22.6]];
const PARANA = [[-54.6, -25.6], [-54.3, -24], [-53.2, -23], [-52, -22.6], [-51, -22.7], [-50, -23], [-49.6, -23.2], [-49.2, -24.6], [-48.3, -25.2], [-48.5, -25.9], [-49.5, -26], [-50.5, -26.1], [-51.5, -26.5], [-53.5, -26.3]];
const subdiv = (pts, n = 3) => { const o = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; for (let k = 0; k < n; k++) o.push([lp(a[0], b[0], k / n), lp(a[1], b[1], k / n)]); } return o; };
function orth(lon, lat, lon0, lat0) {
  const l = H.deg(lon - lon0), p = H.deg(lat), p0 = H.deg(lat0);
  const x = Math.cos(p) * Math.sin(l), y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
  const c = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  if (c < 0) { const m = Math.hypot(x, y) || 1; return [x / m, -y / m, c]; }
  return [x, -y, c];
}
function globePoly(pts, lon0, lat0, cx, cy, r) {
  const pr = subdiv(pts).map(p => orth(p[0], p[1], lon0, lat0));
  if (pr.every(p => p[2] < 0)) return null;
  return pr.map(p => [cx + p[0] * r, cy + p[1] * r]);
}
/* globo: o.warm 0..1 = mancha quente no Pacífico; o.hiBR destaca o Brasil; o.hiSouth o Sul */
function globe(Pf, t, cx, cy, r, lon0, lat0, o = {}) {
  const d = Object.assign({ warm: 0, hiBR: 0, hiSouth: 0, clouds: 1, atm: 1, warmPulse: 1 }, o);
  let s = DEFS(RG(Pf + 'oc', [[0, '#7fe6ff'], [0.55, PAL.ocean], [1, PAL.oceanDk]], 0.38, 0.32, 0.75) + RG(Pf + 'sh', [[0.55, '#1b2a7a', 0], [1, '#1b2a7a', 0.45]], 0.35, 0.3, 0.8) + RG(Pf + 'atm', [[0.82, '#bff4ff', 0], [0.9, '#bff4ff', 0.75], [1, '#bff4ff', 0]]) + `<clipPath id="${Pf}gc"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}"/></clipPath>` + BLURF(Pf + 'wb', r * 0.05));
  if (d.atm) s += C(cx, cy, r * 1.14, U(Pf + 'atm'));
  s += C(cx, cy, r, U(Pf + 'oc'));
  let inner = '';
  /* mancha quente do Pacífico */
  if (d.warm > 0) {
    const pts = []; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; pts.push([-130 + Math.cos(a) * 48 * (0.6 + 0.4 * d.warm), 0 + Math.sin(a) * 13 * (0.7 + 0.3 * d.warm)]); }
    const gp = globePoly(pts, lon0, lat0, cx, cy, r);
    if (gp) inner += G(POLY(gp, PAL.warm, OP(0.9 * d.warm)) + POLY(gp.map(p => [lp(p[0], gp.reduce((a, q) => a + q[0], 0) / gp.length, 0.45), lp(p[1], gp.reduce((a, q) => a + q[1], 0) / gp.length, 0.45)]), PAL.warm2, OP(0.85 * d.warm * (0.8 + 0.2 * Math.sin(t * 4 * d.warmPulse)))), '', `filter="url(#${Pf}wb)"`);
  }
  for (const k in LAND) {
    const gp = globePoly(LAND[k], lon0, lat0, cx, cy, r);
    if (gp) inner += P(H.smoothPath(gp, true, 0.3), '#5fd16a', ST('#2f9e48', 3)) ;
  }
  if (d.hiBR > 0) { const gp = globePoly(BRAZIL, lon0, lat0, cx, cy, r); if (gp) inner += P(H.smoothPath(gp, true, 0.3), '#ffd84a', OP(d.hiBR) + ' ' + ST('#ff9a1e', 4)); }
  if (d.hiSouth > 0) { const gp = globePoly(SOUTH, lon0, lat0, cx, cy, r); if (gp) inner += P(H.smoothPath(gp, true, 0.3), PAL.trim, OP(d.hiSouth) + ' ' + ST('#fff', 3)); }
  if (d.clouds) for (let i = 0; i < 9; i++) {
    const lon = ((hz(i, 71) * 360 + t * 4) % 360) - 180, lat = (hz(i, 72) - 0.5) * 120;
    const p = orth(lon, lat, lon0, lat0); if (p[2] < 0.1) continue;
    inner += E(cx + p[0] * r, cy + p[1] * r, r * 0.16 * p[2], r * 0.04 * p[2], '#fff', OP(0.55 * p[2]));
  }
  s += G(inner + C(cx, cy, r, U(Pf + 'sh')), '', `clip-path="url(#${Pf}gc)"`);
  s += P(H.arcPath(cx, cy, r * 0.86, -2.6, -1.9), 'none', ST('#ffffff', r * 0.04, OP(0.5)));
  return s;
}
/* ponto (lon,lat) no globo: devolve [x,y,visível] */
const gpt = (lon, lat, lon0, lat0, cx, cy, r) => { const p = orth(lon, lat, lon0, lat0); return [cx + p[0] * r, cy + p[1] * r, p[2]]; };
/* mapa plano (equiretangular) */
const eq = (lon, lat, x0, y0, sc, lonC = -60, latC = 0) => [x0 + (lon - lonC) * sc, y0 - (lat - latC) * sc];
function flatPoly(pts, x0, y0, sc, lonC, latC, n = 3) { return subdiv(pts, n).map(p => eq(p[0], p[1], x0, y0, sc, lonC, latC)); }
function worldFlat(Pf, t, x0, y0, sc, lonC, latC, o = {}) {
  const d = Object.assign({ land: '#5fd16a', edge: '#2f9e48', warm: 0, hiBR: 0, hiSouth: 0, hiPR: 0 }, o);
  let s = '';
  if (d.warm > 0) { const pts = []; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; pts.push([-130 + Math.cos(a) * 48, Math.sin(a) * 13]); } s += P(H.smoothPath(flatPoly(pts, x0, y0, sc, lonC, latC, 1), true), PAL.warm, OP(0.85 * d.warm) + ` filter="url(#${Pf}bl20)"`); }
  for (const k in LAND) s += P(H.smoothPath(flatPoly(LAND[k], x0, y0, sc, lonC, latC), true, 0.3), d.land, ST(d.edge, 3));
  if (d.hiBR > 0) s += P(H.smoothPath(flatPoly(BRAZIL, x0, y0, sc, lonC, latC), true, 0.3), '#ffd84a', OP(d.hiBR) + ' ' + ST('#ff9a1e', 5));
  if (d.hiSouth > 0) s += P(H.smoothPath(flatPoly(SOUTH, x0, y0, sc, lonC, latC), true, 0.3), PAL.trim, OP(d.hiSouth) + ' ' + ST('#fff', 4));
  if (d.hiPR > 0) s += P(H.smoothPath(flatPoly(PARANA, x0, y0, sc, lonC, latC), true, 0.3), '#ff4f7b', OP(d.hiPR) + ' ' + ST('#fff', 5));
  return s;
}
/* fundo de "mapa" claro (oceano com grade suave) */
function mapOcean(Pf, t, o = {}) {
  const d = Object.assign({ col: '#47b8f5', col2: '#8be0ff' }, o);
  let s = DEFS(LG(Pf + 'mo', [[0, d.col2], [1, d.col]])) + R(-1500, -1500, 4080, 4920, U(Pf + 'mo'));
  for (let i = -10; i < 30; i++) s += L(i * 120, -1500, i * 120, 3500, '#ffffff', 2, OP(0.12)) + L(-1500, i * 120, 3500, i * 120, '#ffffff', 2, OP(0.12));
  for (let i = 0; i < 16; i++) { const x = hz(i, 81) * 1080, y = hz(i, 82) * 1920; s += P(`M${f1(x)},${f1(y)} q20,-12 40,0 q20,12 40,0`, 'none', ST('#ffffff', 4, OP(0.25 + 0.15 * Math.sin(t * 2 + i)))); }
  return s;
}

/* ------------------------------------------------------------ oceano e mar */
function seaSurface(Pf, t, y, o = {}) {
  const d = Object.assign({ warm: 0, col: PAL.ocean, w0: -600, w1: 1680 }, o);
  const c1 = mixc(d.col, PAL.warm, d.warm), c2 = mixc(PAL.oceanDk, '#e8562f', d.warm);
  let s = DEFS(LG(Pf + 'sea', [[0, mixc(PAL.oceanHi, '#ffd07a', d.warm)], [0.25, c1], [1, c2]])) + R(d.w0, y, d.w1 - d.w0, 3000, U(Pf + 'sea'));
  for (let r = 0; r < 14; r++) {
    const yy = y + 20 + Math.pow(r / 14, 1.7) * 1200, amp = 4 + r * 1.6, wl = 60 + r * 18;
    let dd = `M${d.w0},${f1(yy)}`;
    for (let x = d.w0; x <= d.w1; x += wl / 2) dd += ` q${f1(wl / 4)},${f1(-amp * Math.sin(t * 1.5 + r + x * 0.01))} ${f1(wl / 2)},0`;
    s += P(dd, 'none', ST('#ffffff', 2 + r * 0.25, OP(0.25)));
  }
  return s;
}
function boat(x, y, s, t) {
  const bob = Math.sin(t * 2) * 6, rk = Math.sin(t * 1.6) * 4;
  return G(P('M-120,0 L120,0 L90,46 L-96,46Z', '#ff6159') + R(-110, -6, 220, 10, '#fff') + R(-40, -80, 90, 74, '#fff6e0', 'rx="8"') + R(-26, -66, 24, 22, '#8be0ff') + R(8, -66, 24, 22, '#8be0ff') + L(60, -6, 60, -170, '#6a4a3a', 6) + POLY([[64, -165], [64, -60], [130, -70]], '#ffd84a'), T(x, y + bob, rk, s));
}
function thermometer(x, y, s, k, o = {}) {
  const lvl = cl(k);
  return G(R(-38, -420, 76, 440, '#fff', 'rx="38" ' + ST('#2a1e3a', 8)) + C(0, 40, 66, '#fff', ST('#2a1e3a', 8)) + C(0, 40, 50, mixc('#3fb8ff', '#ff4a2a', lvl)) +
    R(-20, 20 - 380 * lvl, 40, 380 * lvl + 20, mixc('#3fb8ff', '#ff4a2a', lvl), 'rx="20"') + [0, 1, 2, 3, 4, 5, 6].map(i => L(40, -380 + i * 60, 66, -380 + i * 60, '#2a1e3a', 6)).join('') + R(-10, -400, 10, 380, '#fff', OP(0.5) + ' rx="5"'), T(x, y, 0, s));
}

/* ------------------------------------------------------------ interiores */
/* quarto ensolarado com janela (dentro); o.rain 0..1 chuva lá fora */
function roomWall(Pf, t, o = {}) {
  const d = Object.assign({ wall: '#ffe7c2', wall2: '#ffd49a', floor: '#e8a868' }, o);
  return R(-1500, -1500, 4080, 4920, d.wall) + R(-1500, 1500, 4080, 1000, d.floor) + R(-1500, 1490, 4080, 18, '#c98450') + R(-1500, -1500, 4080, 300, d.wall2, OP(0.5));
}
function windowView(Pf, t, x, y, w, h, o = {}) {
  const d = Object.assign({ rain: 0, storm: 0, rainbow: 0, sun: 1, fog: 0, drops: 0 }, o);
  let v = sky(Pf + 'w', t, { storm: d.storm, sunX: w * 0.75, sunY: h * 0.22, sun: d.sun }) + hillBand(h * 0.72, 60, '#8fe08a', 2, -50, w + 50) + hillBand(h * 0.82, 40, PAL.grass, 5, -50, w + 50);
  v += house(w * 0.25, h * 0.86, 0.6, { wall: PAL.wallB }) + house(w * 0.7, h * 0.88, 0.7, { wall: PAL.wallC, roof: '#ff8a5a' }) + tree(w * 0.48, h * 0.9, 0.6, t, { wind: 0.6 + d.storm });
  if (d.rainbow > 0) for (let i = 0; i < 6; i++) v += P(H.arcPath(w * 0.5, h * 0.9, w * (0.6 - i * 0.035), Math.PI, Math.PI * (1 + d.rainbow)), 'none', ST(['#ff4f4f', '#ff9a3c', '#ffe14a', '#5fd16a', '#3fb8ff', '#8a6cff'][i], w * 0.034, OP(0.75)));
  if (d.rain > 0) v += rainFx(t, Math.round(60 * d.rain), { x0: -40, x1: w + 40, y0: -60, y1: h + 60, len: 50, w: 3, a: 0.7 });
  if (d.fog > 0) v += R(0, 0, w, h, '#eef7ff', OP(0.55 * d.fog));
  /* gotas escorrendo no vidro */
  if (d.drops > 0) for (let i = 0; i < 22; i++) { const ph = (t * (0.15 + 0.2 * hz(i, 91)) + hz(i, 92)) % 1, dx = hz(i, 93) * w, dy = ph * h; v += P(`M${f1(dx)},${f1(dy - 40 * d.drops)} L${f1(dx)},${f1(dy)}`, 'none', ST('#ffffff', 3, OP(0.45 * d.drops))) + C(dx, dy, 6 + 3 * hz(i, 94), '#e9f8ff', OP(0.9 * d.drops) + ' ' + ST('#9fd6f5', 2)); }
  const clip = `<clipPath id="${Pf}win"><rect x="0" y="0" width="${w}" height="${h}" rx="10"/></clipPath>`;
  return G(DEFS(clip) + G(v, '', `clip-path="url(#${Pf}win)"`) + R(-24, -24, w + 48, h + 48, 'none', ST('#ffffff', 28)) + L(w / 2, 0, w / 2, h, '#ffffff', 18) + L(0, h * 0.45, w, h * 0.45, '#ffffff', 18) + R(-50, h + 14, w + 100, 36, '#ffffff', 'rx="10"') + P(`M8,${h * 0.06} L${w * 0.2},${h * 0.0 + 8}`, 'none', ST('#fff', 10, OP(0.5))), `translate(${f1(x)} ${f1(y)})`);
}
/* painel de radar/meteorologia */
function radarScreen(Pf, t, x, y, w, h, o = {}) {
  const d = Object.assign({ sweep: 1 }, o);
  let v = R(0, 0, w, h, '#0f3a5a') + R(0, 0, w, h, '#1d5f8a', OP(0.5));
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.44;
  for (let i = 1; i <= 4; i++) v += C(cx, cy, r * i / 4, 'none', ST('#7fe0ff', 3, OP(0.4)));
  v += L(cx - r, cy, cx + r, cy, '#7fe0ff', 2, OP(0.35)) + L(cx, cy - r, cx, cy + r, '#7fe0ff', 2, OP(0.35));
  for (let i = 0; i < 9; i++) { const a = hz(i, 41) * 6.28, rr = r * (0.2 + 0.7 * hz(i, 42)); v += E(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 26 + 30 * hz(i, 43), 16 + 20 * hz(i, 44), ['#5fd16a', '#ffe14a', '#ff9a3c', '#ff4f4f'][i % 4], OP(0.75)); }
  const a = t * 2.2 * d.sweep;
  v += POLY([[cx, cy], [cx + Math.cos(a) * r, cy + Math.sin(a) * r], [cx + Math.cos(a - 0.5) * r, cy + Math.sin(a - 0.5) * r]], '#7fffd0', OP(0.35));
  return G(R(-18, -18, w + 36, h + 36, '#e9eef8', 'rx="20"') + G(v, '', `clip-path="url(#${Pf}rd)"`) + DEFS(`<clipPath id="${Pf}rd"><rect width="${w}" height="${h}" rx="8"/></clipPath>`), `translate(${f1(x)} ${f1(y)})`);
}
/* furacão visto de cima (espiral de nuvens). k 0..1 = organização; tear 0..1 = cisalhado (topo arrancado) */
function hurricane(Pf, t, x, y, r, o = {}) {
  const d = Object.assign({ k: 1, tear: 0, spin: 1, a: 1 }, o);
  let s = '';
  for (let arm = 0; arm < 4; arm++) for (let i = 0; i < 30; i++) {
    const u = i / 29, ang = arm * Math.PI / 2 + u * 4.2 * d.k + t * 1.2 * d.spin, rr = r * (0.12 + u * 0.95);
    const dx = d.tear * u * r * 1.1, dy = -d.tear * u * r * 0.3;
    s += E(x + Math.cos(ang) * rr + dx * (1 + 0.5 * Math.sin(i)), y + Math.sin(ang) * rr * 0.9 + dy, r * (0.2 - u * 0.1) * (1 - d.tear * 0.3), r * (0.08 - u * 0.03), '#ffffff', OP((0.65 - u * 0.35) * (1 - d.tear * u * 0.8)) + ` transform="rotate(${f1(ang * 57 + 90)} ${f1(x + Math.cos(ang) * rr + dx)} ${f1(y + Math.sin(ang) * rr * 0.9 + dy)})"`);
  }
  s += C(x, y, r * 0.18 * d.k, '#ffffff', OP(0.5 * (1 - d.tear))) + C(x, y, r * 0.05, '#1e9be0', OP(d.k * (1 - d.tear)));
  return G(s, '', OP(d.a));
}
/* setas de vento curvas */
function windArrow(x1, y1, x2, y2, bendAmt, col, w, k = 1, a = 1) {
  if (k <= 0.01) return '';
  const mx = (x1 + x2) / 2 - (y2 - y1) * bendAmt, my = (y1 + y2) / 2 + (x2 - x1) * bendAmt;
  const pts = []; for (let i = 0; i <= 20 * k; i++) { const u = i / 20; pts.push([(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * mx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * my + u * u * y2]); }
  if (pts.length < 2) return '';
  const e = pts[pts.length - 1], p = pts[pts.length - 2], ang = Math.atan2(e[1] - p[1], e[0] - p[0]);
  return PL(pts, col, w, OP(a)) + POLY([[e[0] + Math.cos(ang) * w * 1.6, e[1] + Math.sin(ang) * w * 1.6], [e[0] + Math.cos(ang + 2.4) * w * 1.6, e[1] + Math.sin(ang + 2.4) * w * 1.6], [e[0] + Math.cos(ang - 2.4) * w * 1.6, e[1] + Math.sin(ang - 2.4) * w * 1.6]], col, OP(a));
}
/* faixa de texto de apoio (palavras-chave) com fundo arredondado */
function keyTag(x, y, str, size, lt, o = {}) {
  const d = Object.assign({ bg: '#ff5a5f', fg: '#ffffff', rot: -3, delay: 0 }, o);
  const u = H.ease.outBack(cl((lt - d.delay) / 0.3), 2);
  if (u <= 0) return '';
  const w = str.length * size * 0.62 + size * 0.9;
  return G(R(-w / 2 + 8, -size * 0.78 + 10, w, size * 1.36, '#2a1e3a', `rx="${f1(size * 0.3)}" opacity="0.35"`) + R(-w / 2, -size * 0.78, w, size * 1.36, d.bg, `rx="${f1(size * 0.3)}"`) + TXT(0, size * 0.36, str, size, d.fg), `translate(${f1(x)} ${f1(y)}) rotate(${f1(d.rot)}) scale(${u.toFixed(3)})`, 'class="keytag"');
}
