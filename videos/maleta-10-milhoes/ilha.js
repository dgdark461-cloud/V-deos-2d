/* ilha.js - Ilha da Queimada Grande: céu, mar, rochas, farol, cobras, objetos. Strings SVG. Depende de art.js, art3.js, env.js, p3.js. */
const GOLD = '#ffc83a', JAR = '#d8b84a', SNKDK = '#5a3410';
const lf = (o, x, y, sc) => G(lucasFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
const lucasF = o => lucasFig(o);

/* ---- 2.5D: camadas com profundidade d (0 = infinito, 1 = plano da tela, >1 = perto) e câmera {x,y,z} */
function par(Pf, cam, layers) {
  let s = `<defs>` + [6, 14, 26].map(b => `<filter id="${Pf}bl${b}" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2080" height="2920"><feGaussianBlur stdDeviation="${b}"/></filter>`).join('') + `</defs>`;
  for (const Ly of layers) {
    const d = Ly.d, z = 1 + (cam.z - 1) * d;
    s += `<g transform="translate(${f1(540 - (cam.x - 540) * d)} ${f1(960 - (cam.y - 960) * d)}) scale(${z.toFixed(4)}) translate(-540 -960)"${Ly.blur ? ` filter="url(#${Pf}bl${Ly.blur})"` : ''}>${Ly.svg}</g>`;
    if (Ly.fog) s += R(-400, -400, 1880, 2720, Ly.fogc || '#0a1620', OP(Ly.fog));
  }
  return s;
}

/* ---- céu e mar */
const SKYS = {
  storm: ['#14203a', '#3a4a6a', '#8a8aa0'], dawn: ['#1c2a48', '#5a6a8a', '#f0b88a'], dusk: ['#1a1440', '#9a3a6a', '#ff9a5a'],
  night: ['#03060e', '#0a1a30', '#16304a'], day: ['#2a5a8a', '#6aa0c0', '#d8e8e0'],
};
function skyI(Pf, t, hor, mode = 'night', o = {}) {
  const c = SKYS[mode];
  let s = `<defs><linearGradient id="${Pf}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="0.6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient></defs>` + R(-400, -600, 1880, hor + 1800, `url(#${Pf}sk)`);
  if (mode === 'night' || o.stars) for (let i = 0; i < 50; i++) s += C(hz(i, 3) * 1080, hz(i, 4) * hor * 0.85, 1 + 2 * hz(i, 5), '#dff2ff', OP((0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i))) * (o.stars || 1)));
  for (let i = 0; i < (o.clouds === undefined ? 4 : o.clouds); i++) { const cx = ((hz(i, 11) * 1500 + t * (6 + 8 * hz(i, 12))) % 1500) - 200, cy = hor * (0.12 + 0.55 * hz(i, 13)), w = 240 + 200 * hz(i, 14); s += E(cx, cy, w, w * 0.18, mixc(c[1], '#000', 0.2), OP(0.6)) + E(cx + w * 0.3, cy + 14, w * 0.6, w * 0.14, mixc(c[1], c[2], 0.3), OP(0.5)); }
  if (o.moon) s += moon(Pf, o.moon[0], o.moon[1], o.moon[2] || 70);
  return s;
}
function moon(Pf, x, y, r, a = 1) { return glow(Pf, 'B', x, y, r * 3.4, 0.55 * a) + C(x, y, r, '#e6f1fa', OP(a)) + C(x - r * 0.3, y - r * 0.2, r * 0.2, '#c8d8e6', OP(0.6 * a)) + C(x + r * 0.35, y + r * 0.3, r * 0.14, '#c8d8e6', OP(0.6 * a)); }
function waveYI(x, t, y0, amp, i) { return y0 + amp * Math.sin(x * 0.011 + t * (1.0 + 0.2 * i) + i * 1.7) + amp * 0.5 * Math.sin(x * 0.027 - t * 1.5 + i * 3.1); }
function waveLayerI(t, y0, amp, i, fill, foam, bottom = 2400) {
  const pts = []; for (let x = -700; x <= 1780; x += 30) pts.push([x, waveYI(x, t, y0, amp, i)]);
  return P('M-700,' + bottom + ' ' + pts.map(p => 'L' + f1(p[0]) + ',' + f1(p[1])).join(' ') + ` L1780,${bottom}Z`, fill) + (foam > 0 ? PL(pts, '#cfe8f0', 5, OP(foam)) : '');
}
function seaI(Pf, t, hor, rough = 1, o = {}) {
  const c1 = o.c1 || '#1f5a78', c2 = o.c2 || '#050f1c', n = o.n || 6, span = o.span || 1500 - hor, bottom = o.bottom || 2400;
  let s = R(-400, hor - 4, 1880, bottom - hor + 4, mixc(c1, c2, 0.1));
  for (let i = 0; i < n; i++) s += waveLayerI(t, hor + 10 + span * Math.pow(i / n, 1.3), (4 + i * 8) * rough, i, mixc(c1, c2, 0.1 + 0.85 * (n > 1 ? i / (n - 1) : 0.3)), (0.18 + 0.06 * i) * (o.foam === undefined ? 1 : o.foam), bottom);
  return s;
}
function rockI(x, y, w, h, seed, col = '#34444f') {
  const n = 7, pts = []; for (let i = 0; i <= n; i++) { const a = i / n; pts.push([x - w / 2 + w * a, y - h * Math.sin(a * Math.PI) * (0.6 + 0.6 * hz(i, seed)) * (i % 2 ? 0.85 : 1.1)]); }
  const d = 'M' + f1(x - w / 2) + ',' + f1(y) + ' ' + pts.map(p => 'L' + f1(p[0]) + ',' + f1(p[1])).join(' ') + ' L' + f1(x + w / 2) + ',' + f1(y) + 'Z';
  return P(d, col) + P(d, '#9ac0d8', OP(0.16) + ' transform="translate(-7 -7)"') + L(x - w * 0.1, y, x + w * 0.05, y - h * 0.7, '#0a1218', 5, OP(0.5)) + E(x, y - 4, w * 0.45, 8, '#9ac0d8', OP(0.25));
}
function treesI(Pf, t, x0, x1, base, hgt, col = '#0f3a30', hi = '#1f6a4a') {
  let s = ''; const n = Math.round((x1 - x0) / 90);
  for (let i = 0; i < n; i++) {
    const px = x0 + (x1 - x0) * (i + 0.5) / n, ph = hgt * (0.5 + 0.6 * hz(i, 31)), sw = 5 * Math.sin(t * 1.1 + i);
    s += L(px, base, px + sw, base - ph, '#2a1a10', 12 + 6 * hz(i, 32));
    for (let k = 0; k < 4; k++) s += C(px + sw + (k - 1.5) * 50 + 10 * hz(k + i, 33), base - ph - 20 * (k % 2) + 20, 70 + 30 * hz(i + k, 34), mixc(col, hi, 0.2 + 0.5 * hz(i + k, 35)));
  }
  return s;
}
function lighthouseObj(Pf, x, y, sc, lit, t) {
  let s = P('M-62,0 L-36,-440 L36,-440 L62,0Z', '#e8e0cc') + P('M-52,-130 L-47,-170 L47,-170 L52,-130Z', '#c8302a') + P('M-44,-290 L-40,-330 L40,-330 L44,-290Z', '#c8302a') + P('M-62,0 L-36,-440 L-8,-440 L-30,0Z', '#000', OP(0.15));
  s += R(-46, -460, 92, 24, '#2a303a') + R(-34, -540, 68, 80, lit ? '#ffe9a0' : '#3a4450', 'rx="6"') + POLY([[-44, -540], [0, -600], [44, -540]], '#c8302a') + R(-12, -60, 24, 60, '#3a2a1a', 'rx="6"');
  if (lit) { const a = (t * 0.8) % 6.283; s += glow(Pf, 'A', 0, -500, 220, 0.9); for (const sg of [0, Math.PI]) { const aa = a + sg; s += POLY([[0, -500], [Math.cos(aa - 0.07) * 1300, -500 + Math.sin(aa - 0.07) * 160], [Math.cos(aa + 0.07) * 1300, -500 + Math.sin(aa + 0.07) * 160]], 'rgba(255,240,170,0.28)'); } }
  return G(s, T(x, y, 0, sc));
}
function hutObj(Pf, o) {
  const d = Object.assign({ x: 540, y: 1300, sc: 1, door: 0, lit: 0.6, t: 0 }, o);
  let s = R(-260, -300, 520, 300, '#d4ccb8') + POLY([[-290, -300], [0, -420], [290, -300]], '#3a2a24') + R(-250, -280, 520 - 20, 8, '#000', OP(0.1));
  s += R(60, -250, 150, 250, '#4a3222', 'rx="6"') + R(75, -235, 120, 235, '#5a3e2a') + C(180, -120, 8, '#d8b86a') + R(-200, -230, 140, 110, '#10202e', 'stroke="#3a2a24" stroke-width="10"') + R(-200, -230, 140, 110, `rgba(255,210,120,${(0.8 * d.lit).toFixed(2)})`);
  if (d.door) s += POLY([[60, -250], [60 + 90 * d.door, -270], [60 + 90 * d.door, 10], [60, 0]], '#2a1c12') + R(60 + 5, -240, 140 * (1 - d.door), 240, '#0a0806');
  return G(glow(Pf, 'A', -130, -170, 240 * d.lit, 0.6 * d.lit) + s, T(d.x, d.y, 0, d.sc));
}
/* ---- cobras */
function snakeBody(pts, w, o = {}) {
  const col = o.col || GOLD, dk = o.dk || SNKDK, bell = o.bell || '#fff0b0';
  let s = PL(pts, '#1a1006', w + 10) + PL(pts, col, w) + PL(pts.map(p => [p[0], p[1] + w * 0.2]), bell, w * 0.3, OP(0.5));
  for (let i = 2; i < pts.length - 2; i += 3) { const a = pts[i], b = pts[i + 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; s += G(POLY([[-w * 0.55, 0], [0, -w * 0.4], [w * 0.55, 0], [0, w * 0.4]], dk, OP(0.85)), `translate(${f1(a[0])} ${f1(a[1])}) rotate(${f1(ang)})`); }
  return s;
}
function snakeHeadSide(x, y, ang, sz, o = {}) {
  const d = Object.assign({ tongue: 0, col: GOLD, eye: '#fff2a0', t: 0 }, o);
  let s = P('M-44,-24 Q8,-38 66,-12 Q92,2 66,18 Q8,32 -44,24Z', d.col) + P('M-44,24 Q8,32 66,18 Q40,10 -44,8Z', '#fff0b0', OP(0.6)) + P('M-30,-18 Q10,-30 50,-10', 'none', 'stroke="#1a1006" stroke-width="5" opacity="0.5"');
  s += C(30, -8, 12, d.eye) + E(30, -8, 3.5, 10, '#000') + C(78, 0, 3, '#1a1006');
  if (d.tongue > 0) { const l = 70 * d.tongue; s += PL([[90, 4], [90 + l, 4]], '#e8203a', 5) + PL([[90 + l, 4], [90 + l + 18, -8]], '#e8203a', 4) + PL([[90 + l, 4], [90 + l + 18, 16]], '#e8203a', 4); }
  return G(s, `translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)}) scale(${sz})`);
}
function snakeHeadFront(x, y, sz, o = {}) {
  const d = Object.assign({ tongue: 0, col: GOLD, t: 0, eyeGlow: 1 }, o);
  let s = P('M-130,-90 Q0,-150 130,-90 Q160,30 80,130 Q0,190 -80,130 Q-160,30 -130,-90Z', d.col) + P('M-130,-90 Q0,-150 130,-90 Q100,-60 0,-70 Q-100,-60 -130,-90Z', '#fff0b0', OP(0.35));
  s += P('M-30,-130 L0,-60 L30,-130Z', SNKDK, OP(0.7)) + P('M-110,-40 L-60,-10 M110,-40 L60,-10', 'none', 'stroke="#1a1006" stroke-width="10" stroke-linecap="round"');
  for (const sx of [-1, 1]) { s += glow('', 'A', sx * 66, -10, 0, 0) + E(sx * 66, -10, 42, 34, '#ffe04a') + E(sx * 66, -10, 10, 32, '#000') + C(sx * 54, -22, 8, '#fff', OP(0.8)); }
  s += C(-20, 80, 6, '#1a1006') + C(20, 80, 6, '#1a1006');
  if (d.tongue > 0) { const l = 130 * d.tongue; s += PL([[0, 150], [0, 150 + l]], '#e8203a', 9) + PL([[0, 150 + l], [-26, 150 + l + 34]], '#e8203a', 7) + PL([[0, 150 + l], [26, 150 + l + 34]], '#e8203a', 7); }
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sz})`);
}
/* serpente enrolada: espiral achatada + pescoço levantado e cabeça lateral */
function snakeCoil(x, y, sz, t, o = {}) {
  const d = Object.assign({ turns: 2.2, w: 40, col: GOLD, raise: 190, headAng: 180, tongue: 0, sway: 0.12 }, o);
  const pts = [], N = 60;
  for (let i = 0; i <= N; i++) { const u = i / N, a = u * d.turns * 6.283, r = 150 * (1 - u * 0.5); pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.36 - u * 40]); }
  const last = pts[pts.length - 1];
  for (let i = 1; i <= 14; i++) { const u = i / 14; pts.push([last[0] * (1 - u) + 20 * Math.sin(u * 3 + t * 1.5) * d.sway * 5, last[1] - d.raise * Math.pow(u, 0.8) + 10 * Math.sin(u * 6 + t * 2) * d.sway * 3]); }
  const hd = pts[pts.length - 1];
  return G(snakeBody(pts, d.w, { col: d.col }) + snakeHeadSide(hd[0], hd[1], d.headAng, 1.0, { tongue: d.tongue, col: d.col, t }), T(x, y, 0, sz));
}
/* serpente rastejando em linha reta (x0,y0)->(x1,y1); head = fração [0,1] da posição da cabeça */
function snakeCrawl(x0, y0, x1, y1, head, t, w, o = {}) {
  const d = Object.assign({ len: 520, amp: 26, col: JAR, N: 46, tongue: 0 }, o), L0 = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L0, uy = (y1 - y0) / L0, hs = head * (L0 + d.len);
  const pts = []; for (let i = 0; i <= d.N; i++) { const sv = hs - i * d.len / d.N; if (sv < 0 || sv > L0 + 40) continue; const off = d.amp * Math.sin(sv * 0.035 - t * 3) * (0.4 + 0.6 * i / d.N); pts.push([x0 + ux * sv - uy * off, y0 + uy * sv + ux * off]); }
  if (pts.length < 3) return '';
  const a = Math.atan2(pts[0][1] - pts[2][1], pts[0][0] - pts[2][0]) * 180 / Math.PI;
  return snakeBody(pts.slice().reverse(), w, { col: d.col }) + snakeHeadSide(pts[0][0], pts[0][1], a, w / 34, { tongue: d.tongue, col: d.col });
}
function snakeHang(x, y0, len, t, w, o = {}) {
  const d = Object.assign({ col: JAR, sway: 20, tongue: 0 }, o), pts = [];
  for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([x + d.sway * Math.sin(u * 4 + t * 1.6) * u, y0 + len * u]); }
  return snakeBody(pts, w, { col: d.col }) + snakeHeadSide(pts[30][0], pts[30][1], 90, w / 34, { tongue: d.tongue, col: d.col });
}
function branchObj(x, y, len, sc = 1, flip = 1) { return G(PL([[0, 0], [len * 0.4, -14], [len, 10]], '#2a1a10', 26) + PL([[len * 0.5, -10], [len * 0.7, -60]], '#2a1a10', 12) + [0, 1, 2, 3, 4].map(i => E(len * (0.2 + 0.18 * i), -20 + 30 * (i % 2), 60, 22, i % 2 ? '#1f6a4a' : '#0f3a30', `transform="rotate(${(i % 2 ? 20 : -20)} ${len * (0.2 + 0.18 * i)} 0)"`)).join(''), `translate(${x} ${y}) scale(${sc * flip} ${sc})`); }
/* objetos */
function backpackObj(x, y, sc, open = 0, t = 0) {
  let s = E(0, 6, 190, 26, 'rgba(0,0,0,0.45)') + P('M-150,0 L-170,-260 Q-160,-330 0,-340 Q160,-330 170,-260 L150,0Z', '#6a4a2a') + P('M-150,-190 Q0,-150 150,-190 L152,-100 Q0,-60 -152,-100Z', '#5a3c20') + R(-30, -200, 60, 50, '#c8a050', 'rx="8"') + P('M-150,0 L-170,-260 L-120,-300 L-110,0Z', '#000', OP(0.15));
  s += P('M-100,-340 Q0,-420 100,-340 Q0,-300 -100,-340Z', '#3a2a18');
  if (open) { const u = ez(open); s += R(-70, -340 - 160 * u, 40, 130, '#9ad6f0', OP(0.8 * u), 'rx="10"') + R(-62, -360 - 160 * u, 24, 24, '#e8e8f0', OP(u)) + R(20, -330 - 120 * u, 28, 120, '#c8c8d0', OP(u), 'rx="6"') + R(60, -320 - 100 * u, 70, 110, '#1c2228', OP(u), 'rx="10"') + L(110, -320 - 100 * u, 120, -380 - 100 * u, '#888', 5, OP(u)); }
  return G(s, T(x, y, 0, sc));
}
function noteObj(x, y, sc, rot, lines, size = 34) {
  let s = P('M-190,-120 L180,-130 L190,130 L-180,140Z', '#f0e6c8') + P('M-190,-120 L180,-130 L170,-100 L-180,-90Z', '#000', OP(0.08)) + L(-190, 10, 190, 6, '#000', 3, OP(0.1));
  lines.forEach((ln, i) => { s += TX(0, -40 + i * (size + 14), ln, size, '#2a1a10', 'font-weight="600"'); });
  return G(s, T(x, y, rot, sc));
}
function boatObj(Pf, t, x, y, sc, tilt, lit = 1) {
  let s = P('M-240,-40 L260,-60 Q300,-70 330,-100 L240,50 L-200,50Z', '#2a5a78') + P('M-240,-40 L260,-60 L255,-30 L-236,-14Z', '#e8e0cc') + R(-100, -150, 130, 110, '#e8e0cc') + R(-84, -130, 40, 50, lit ? '#ffd870' : '#3a4450') + L(60, -40, 60, -260, '#3a2a1a', 8) + L(60, -250, 200, -60, '#3a2a1a', 4);
  if (lit) s += glow(Pf, 'A', -64, -105, 150, 0.7) + C(260, -75, 8, '#ffd870') + glow(Pf, 'A', 260, -75, 80, 0.6);
  return G(s, T(x, y, tilt, sc));
}
function chairObj(x, y, sc) { return G(L(-60, 0, -60, -160, '#3a2a1a', 14) + L(60, 0, 60, -160, '#3a2a1a', 14) + R(-80, -170, 160, 20, '#5a3e2a') + L(-60, -170, -60, -380, '#3a2a1a', 14) + L(60, -170, 60, -380, '#3a2a1a', 14) + R(-70, -380, 140, 18, '#5a3e2a') + R(-62, -330, 124, 12, '#5a3e2a'), T(x, y, 0, sc)); }
function doorObj(Pf, o) {
  const d = Object.assign({ x: 540, y: 1500, sc: 1, t: 0, handle: 0, light: 0, knock: 0 }, o);
  let s = R(-200, -560, 400, 560, '#3e2a1c', 'stroke="#1a110a" stroke-width="14"');
  for (let i = 0; i < 4; i++) s += L(-200 + i * 100 + 50, -556, -200 + i * 100 + 50, -4, '#1a110a', 5, OP(0.6));
  s += R(-170, -500, 340, 24, '#5a3e2a', OP(0.35)) + R(-170, -120, 340, 24, '#5a3e2a', OP(0.35));
  if (d.light) s += R(-196, -8, 392, 8, '#ffe49a', OP(d.light)) + POLY([[-196, 0], [196, 0], [380, 220], [-380, 220]], 'rgba(255,228,150,0.25)', OP(d.light));
  s += C(150, -270, 22, '#a89060') + G(R(0, -7, 80, 14, '#a89060', 'rx="7"'), `translate(150 -270) rotate(${f1(d.handle)})`);
  return G(s, T(d.x, d.y, 0, d.sc));
}
