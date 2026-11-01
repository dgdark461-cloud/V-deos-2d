/* cave.js - Caverna do Diabo: rocha, passarela, formação, Rafael (estilo homem das cavernas), monitor, irmão, objetos. Paleta escura e dessaturada. */
const BONE = '#d9d4c6', ASH = '#8a8d92', ROCKD = '#0d0e11', ROCKM = '#26292f', ROCKL = '#43474f', BLOOD = '#8a1c1c', LAMP = '#f3ecd0';
const lucF = (o, x, y, sc) => G(lucasFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
/* Rafael cavernícola: pele fosca, juba selvagem, cenho forte, colar de ossos, pelo de animal */
function rafaelFace(o) {
  const sv = Object.assign({}, PAL);
  Object.assign(PAL, { skin: '#b09a86', skinSh: '#6e5d50', hair: '#17120e', hairHi: '#3a3028', hood: '#4a4036', hoodSh: '#27211b', vest: '#2a241e' });
  let inner; try { inner = lucasFace(Object.assign({ beard: 0.9, dark: 0.5, bodyLen: 430 }, o)); } finally { Object.assign(PAL, sv); }
  const hr = '#15110d';
  let mane = '';
  for (let i = 0; i < 13; i++) { const a = Math.PI + (i / 12) * Math.PI, r0 = 175, r1 = 235 + 55 * hz(i, 7); mane += POLY([[Math.cos(a - 0.14) * r0, Math.sin(a - 0.14) * r0 - 20], [Math.cos(a) * r1, Math.sin(a) * r1 - 20], [Math.cos(a + 0.14) * r0, Math.sin(a + 0.14) * r0 - 20]], hr); }
  mane = G(mane + P('M-190,-30 Q-210,170 -120,250 L-170,40Z', hr) + P('M190,-30 Q210,170 120,250 L170,40Z', hr), '');
  let ov = '';
  for (const sx of [-1, 1]) ov += P(`M${sx * 160},-70 Q${sx * 80},-118 ${sx * 8},-70 L${sx * 8},-52 Q${sx * 80},-92 ${sx * 160},-50Z`, '#6e5d50', OP(0.9)) + P(`M${sx * 160},-70 Q${sx * 80},-118 ${sx * 8},-70`, 'none', 'stroke="#17120e" stroke-width="9" stroke-linecap="round"');
  ov += L(-120, 40, -76, 54, '#cfc8b6', 7, OP(0.7)) + L(-124, 62, -80, 74, '#cfc8b6', 7, OP(0.7)) + L(120, 40, 76, 54, '#cfc8b6', 7, OP(0.7));
  let fur = ''; for (let i = 0; i < 12; i++) { const x = -190 + i * 34; fur += POLY([[x, 222], [x + 17, 262 + 18 * hz(i, 8)], [x + 34, 222]], '#27211b'); }
  let neck = ''; for (let i = 0; i < 9; i++) { const a = i / 8, x = -110 + 220 * a, y = 240 + 70 * Math.sin(a * Math.PI); neck += P(`M${f1(x - 8)},${f1(y)} q8,26 16,0 q-8,-8 -16,0Z`, BONE); }
  return mane + inner + ov + fur + PL([[-110, 240], [-60, 290], [0, 310], [60, 290], [110, 240]], '#3a2f26', 5) + neck;
}
const rafF = (o, x, y, sc) => G(rafaelFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
function rafaelFig(o) {
  const sv = Object.assign({}, PAL);
  Object.assign(PAL, { skin: '#b09a86', skinSh: '#6e5d50', hair: '#17120e', hood: '#4a4036', hoodSh: '#27211b', vest: '#2a241e', pants: '#2a241e' });
  try { return lucasFig(o); } finally { Object.assign(PAL, sv); }
}
function monitorFace(o) {
  const sv = Object.assign({}, PAL);
  Object.assign(PAL, { skin: '#c0a894', skinSh: '#786658', hair: '#1a1816', hood: '#3c4a54', hoodSh: '#202a32', vest: '#c8c4b4' });
  let inner; try { inner = lucasFace(Object.assign({ beard: 0.1, dark: 0.2 }, o)); } finally { Object.assign(PAL, sv); }
  const bl = o.blood || 0, wet = o.wet2 || 0;
  const cap = P('M-176,-50 C-170,-210 170,-210 176,-50 L176,-84 C130,-150 -130,-150 -176,-84Z', '#202a32') + P('M-176,-84 Q0,-50 176,-84 L186,-70 Q0,-20 -186,-70Z', '#111820');
  const blood = bl ? P('M-30,-130 Q-20,-90 -34,-40 Q-18,-10 -14,10 Q-4,-20 -6,-60 Q4,-100 -4,-130Z', BLOOD, OP(bl)) + C(-14, 20, 8, BLOOD, OP(bl)) : '';
  return inner + cap + blood + (wet ? E(0, 0, 170, 220, 'rgba(180,200,220,0.1)') : '');
}
const monF = (o, x, y, sc) => G(monitorFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
function ghostFace(o) {
  return G(lucasFace(Object.assign({ cold: 1, dark: 1, eye: 1, pupil: 0.4, beard: 0 }, o)), '', OP(o.a === undefined ? 0.55 : o.a)) + glow('', 'W', 0, 0, 0, 0);
}
/* ---------- cenário */
const lightMask = (Pf, x, y, r, a = 0.96, col = '0,0,0') => `<defs><radialGradient id="${Pf}lm" gradientUnits="userSpaceOnUse" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"><stop offset="0" stop-color="rgb(${col})" stop-opacity="0"/><stop offset="0.55" stop-color="rgb(${col})" stop-opacity="${(a * 0.5).toFixed(2)}"/><stop offset="1" stop-color="rgb(${col})" stop-opacity="${a}"/></radialGradient></defs>` + R(-400, -400, 1880, 2720, `url(#${Pf}lm)`);
const mist = (t, y0, y1, n = 6, a = 0.07, col = '200,205,215') => { let s = ''; for (let i = 0; i < n; i++) { const x = ((hz(i, 21) * 1700 + t * (8 + 14 * hz(i, 22))) % 1700) - 300; s += E(x, y0 + (y1 - y0) * hz(i, 23), 280 + 200 * hz(i, 24), 40 + 40 * hz(i, 25), `rgba(${col},${a})`); } return s; };
function stalac(x, y, w, h, col = ROCKL, up = false) { const s = up ? -1 : 1; return POLY([[x - w / 2, y], [x - w * 0.18, y + s * h * 0.6], [x + 6, y + s * h], [x + w * 0.2, y + s * h * 0.55], [x + w / 2, y]], col) + POLY([[x - w / 2, y], [x - w * 0.18, y + s * h * 0.6], [x - w * 0.3, y]], '#fff', OP(0.05)); }
function caveBG(Pf, t, o = {}) {
  const d = Object.assign({ floorY: 1280, rail: 1, walk: 1, shift: 0, bright: 1, ceil: 1, depth: 1 }, o), b = d.bright;
  let s = `<defs><linearGradient id="${Pf}cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050607"/><stop offset="0.55" stop-color="${mixc('#171a20', '#363a42', b * 0.6)}"/><stop offset="1" stop-color="#0a0b0d"/></linearGradient></defs>` + R(-400, -400, 1880, 2720, `url(#${Pf}cv)`);
  for (let i = 0; i < 5; i++) s += E(540 + (i - 2) * 220 - d.shift * 0.2, d.floorY - 300, 320, 520 - i * 40, mixc('#101216', '#2a2e35', 0.3 + 0.2 * b), OP(0.55));
  if (d.ceil) for (let i = 0; i < 14; i++) s += stalac(-100 + i * 110 - d.shift * 0.5 + 30 * hz(i, 31), -20, 70 + 60 * hz(i, 32), 180 + 420 * hz(i, 33), mixc(ROCKM, ROCKL, hz(i, 34)));
  s += R(-400, d.floorY, 1880, 1200, '#0b0c0e');
  for (let i = 0; i < 10; i++) s += stalac(-60 + i * 130 - d.shift * 0.7 + 40 * hz(i, 35), d.floorY + 10, 90 + 60 * hz(i, 36), 120 + 260 * hz(i, 37), mixc(ROCKM, ROCKL, hz(i, 38)), true);
  if (d.walk) {
    const fy = d.floorY + 160;
    s += POLY([[-200 - d.shift, 1920], [380 - d.shift * 0.3, fy], [700 - d.shift * 0.3, fy], [1280 - d.shift, 1920]], '#363a41');
    for (let i = 1; i < 12; i++) { const u = Math.pow(i / 12, 1.7), y = fy + (1920 - fy) * u; s += L(-200 + (380 + 200) * (1 - u) - d.shift * (0.3 + 0.7 * u), y, 1280 - (1280 - 700) * (1 - u) - d.shift * (0.3 + 0.7 * u), y, '#000', 3 + 4 * u, OP(0.4)); }
    if (d.rail) { s += L(380 - d.shift * 0.3, fy - 70, -200 - d.shift, 1560, '#5a5d63', 8) + L(700 - d.shift * 0.3, fy - 70, 1280 - d.shift, 1560, '#5a5d63', 8); for (let i = 0; i < 6; i++) { const u = i / 6, x1 = H.lerp(380, -200, u * u) - d.shift * 0.5, y1 = H.lerp(fy - 70, 1560, u * u), x2 = H.lerp(700, 1280, u * u) - d.shift * 0.5; s += L(x1, y1, x1, y1 + 110 + 160 * u * u, '#3a3d43', 6 + 8 * u) + L(x2, y1, x2, y1 + 110 + 160 * u * u, '#3a3d43', 6 + 8 * u); } }
  }
  return s + mist(t, d.floorY - 100, d.floorY + 300, 6, 0.06);
}
/* formação rochosa marcante: coluna com 3 estrias e um nódulo claro à esquerda */
function formationObj(Pf, x, y, sc, lit = 0.5) {
  let s = P('M-130,0 Q-150,-300 -90,-620 Q-50,-860 -30,-980 L40,-980 Q60,-840 100,-600 Q160,-300 150,0Z', mixc(ROCKM, '#7a7d82', lit * 0.5));
  s += P('M-130,0 Q-150,-300 -90,-620 Q-50,-860 -30,-980 L-10,-980 Q-60,-700 -80,-400 Q-100,-200 -80,0Z', '#fff', OP(0.08 * lit));
  for (let i = 0; i < 3; i++) s += P(`M${-60 + i * 55},-980 Q${-70 + i * 60},-500 ${-50 + i * 55},0`, 'none', `stroke="#000" stroke-width="10" opacity="0.35"`);
  s += E(-130, -420, 60, 90, mixc('#b8b4a6', '#2a2c30', 1 - lit)) + E(-120, -440, 30, 50, '#fff', OP(0.12 * lit)) + P('M60,-980 q40,60 10,140 q-40,-40 -10,-140Z', mixc('#b8b4a6', '#2a2c30', 1 - lit));
  return G(s, T(x, y, 0, sc));
}
function watchObj(Pf, x, y, sc, rot, broken = 0, flipped = 0, t = 0) {
  let s = R(-34, -150, 68, 90, '#3a3c40') + R(-34, 60, 68, 90, '#3a3c40') + C(0, 0, 90, '#8a8d92') + C(0, 0, 76, '#1c1e22') + C(0, 0, 70, '#e0dccc', OP(0.9));
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; s += L(Math.sin(a) * 58, -Math.cos(a) * 58, Math.sin(a) * 66, -Math.cos(a) * 66, '#1c1e22', 4); }
  s += L(0, 0, 0, -44, '#111', 6) + L(0, 0, 30, 10, '#111', 5);
  if (broken) s += PL([[-60, -50], [-10, -10], [20, -60], [10, -10], [60, 30]], '#fff', 3, OP(0.7)) + PL([[-10, -10], [-30, 40], [-60, 60]], '#fff', 3, OP(0.6));
  return G(s, T(x, y, rot, sc));
}
function phoneLight(Pf, x, y, sc, rot, batt, t) { return G(R(-70, -140, 140, 280, '#0d0e11', 'rx="22" stroke="#4a4d52" stroke-width="5"') + R(-60, -128, 120, 256, '#e8e4d2', 'rx="14"') + TX(0, 30, batt + '%', 46, '#2a2c30') + R(-40, 72, 80, 20, '#9a1c1c', 'rx="6"') + R(-40, 72, 80 * (batt / 100), 20, '#9a1c1c', 'rx="6"') + C(0, -146, 6, '#222'), T(x, y, rot, sc)); }
function flashBeam(Pf, x, y, ang, len, sp, a = 1, id = 'fb') { return beam(Pf + id, x, y, ang, len, sp, a); }
function groupSil(x, y, sc, n, t, walk = 1) { let s = ''; for (let i = 0; i < n; i++) { const px = i * 70 + 12 * Math.sin(t * 2 + i); s += G(E(0, -150, 26, 30, '#0a0b0c') + P('M-34,-110 Q0,-130 34,-110 L40,0 L-40,0Z', '#0a0b0c') + L(-14, 0, -14 + 8 * Math.sin(t * 6 + i), 60, '#0a0b0c', 12) + L(14, 0, 14 - 8 * Math.sin(t * 6 + i), 60, '#0a0b0c', 12), `translate(${px} ${i % 2 * 12})`); } return G(s, T(x, y, 0, sc)); }
function lampObj(x, y, sc, a = 1) { return G(C(0, 0, 14, LAMP) + glow('', 'W', 0, 0, 0, 0), T(x, y, 0, sc)); }
const bloodDrip = (x, y, t, a = 1) => P(`M${x},${y} q6,${40 + 20 * Math.sin(t * 2)} 0,70 q-8,-30 0,-70Z`, BLOOD, OP(a));
