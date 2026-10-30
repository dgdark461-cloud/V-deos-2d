/* env.js - Naufrágio de Ilhabela: céu de tempestade luminoso, mar turquesa, navio, ilha, ratazanas. Strings SVG. */
const STRIKES = [0.2, 1.9, 3.5, 5.7, 8.2, 10.9, 13.1, 15.4, 17.6, 19.9, 22.8, 25.0, 27.2, 29.8, 32.5, 35.0, 38.5, 41.2, 44.8, 47.5, 50.9, 54.3, 57.9, 61.2, 63.8];
function flk(t) { let m = 0; for (const ti of STRIKES) { if (t >= ti && t < ti + 0.7) { const d = t - ti; m = Math.max(m, Math.exp(-d * 7) * (0.65 + 0.35 * Math.sin(d * 60))); } } return m; }
const FB = (c, a) => a > 0.005 ? R(-300, -300, 1680, 2520, c, OP(a)) : '';

function sky(Pf, t, hor, fl, o = {}) {
  const top = o.top || '#2a1d8c', mid = o.mid || '#a042d4', low = o.low || '#ff8cbc';
  let s = `<defs><linearGradient id="${Pf}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="0.6" stop-color="${mid}"/><stop offset="1" stop-color="${low}"/></linearGradient></defs>`;
  s += R(-300, -300, 1680, hor + 1600, `url(#${Pf}sky)`);
  if (o.stars) for (let i = 0; i < 40; i++) s += C(hz(i, 3) * 1080, hz(i, 4) * hor * 0.8, 1.5 + 2 * hz(i, 5), '#fff', OP((0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i))) * o.stars));
  const nc = o.clouds === undefined ? 6 : o.clouds;
  for (let i = 0; i < nc; i++) {
    const cx = ((hz(i, 11) * 1500 + t * (10 + 14 * hz(i, 12))) % 1500) - 200, cy = hor * (0.15 + 0.6 * hz(i, 13)), w = 220 + 220 * hz(i, 14);
    const col = mixc(o.cloud || '#6a3fc0', '#fff4ff', fl * 0.7);
    s += E(cx, cy, w, w * 0.22, col, OP(0.85)) + E(cx - w * 0.4, cy + 12, w * 0.6, w * 0.17, col, OP(0.85)) + E(cx + w * 0.45, cy + 14, w * 0.55, w * 0.16, mixc(o.cloud || '#6a3fc0', '#ff9ad0', 0.35 + fl * 0.3), OP(0.8));
  }
  if (fl > 0.01) s += FB('#e6f7ff', fl * 0.5);
  return s;
}
function bolt(x, y0, y1, seed, k) {
  if (k <= 0.02) return '';
  const pts = [[x, y0]]; let cx = x, y = y0, i = 0;
  while (y < y1) { y += 60 + hz(i, seed) * 70; cx += (hz(i, seed + 5) - 0.5) * 150; pts.push([cx, Math.min(y, y1)]); i++; }
  return PL(pts, '#9fe8ff', 34, OP(0.35 * k)) + PL(pts, '#ffffff', 12, OP(k)) + PL(pts, '#fff', 5, OP(k));
}
function waveY(x, t, y0, amp, i) { return y0 + amp * Math.sin(x * 0.011 + t * (1.1 + 0.2 * i) + i * 1.7) + amp * 0.5 * Math.sin(x * 0.027 - t * 1.6 + i * 3.1); }
function waveLayer(t, y0, amp, i, fill, foam = 0.6, bottom = 2200) {
  const pts = []; for (let x = -100; x <= 1180; x += 30) pts.push([x, waveY(x, t, y0, amp, i)]);
  return P('M-100,' + bottom + ' ' + pts.map(p => 'L' + f1(p[0]) + ',' + f1(p[1])).join(' ') + ` L1180,${bottom}Z`, fill) + (foam > 0 ? PL(pts, '#f4fdff', 6, OP(foam)) : '');
}
function seaBand(Pf, t, hor, rough = 1, o = {}) {
  const c1 = o.c1 || '#26d6e2', c2 = o.c2 || '#0a4cac', n = o.n || 6, bottom = o.bottom || 2200, span = o.span || 1900 - hor;
  let s = R(-300, hor - 4, 1680, bottom - hor + 4, mixc(c1, c2, 0.1));
  for (let i = 0; i < n; i++) {
    const y0 = hor + 10 + span * Math.pow(i / n, 1.35), amp = (5 + i * 9) * rough;
    s += waveLayer(t, y0, amp, i, mixc(c1, c2, 0.1 + 0.85 * (n > 1 ? i / (n - 1) : 0.3)), (0.3 + 0.1 * i) * (o.foam === undefined ? 1 : o.foam), bottom);
  }
  return s;
}
function rock(x, y, w, h, seed, col = '#d4783f') {
  const n = 7, pts = []; for (let i = 0; i <= n; i++) { const a = i / n; pts.push([x - w / 2 + w * a, y - h * Math.sin(a * Math.PI) * (0.6 + 0.6 * hz(i, seed)) * (i % 2 ? 0.85 : 1.1)]); }
  const d = 'M' + f1(x - w / 2) + ',' + f1(y) + ' ' + pts.map(p => 'L' + f1(p[0]) + ',' + f1(p[1])).join(' ') + ' L' + f1(x + w / 2) + ',' + f1(y) + 'Z';
  return P(d, col) + P(d, '#ffe0a8', OP(0.22) + ' transform="translate(-6 -6)"') + L(x - w * 0.1, y, x + w * 0.05, y - h * 0.7, '#8c3d1c', 5, OP(0.5));
}
function shipObj(o) {
  const d = Object.assign({ t: 0, lit: 1, tilt: 0, sc: 1, smoke: 1, name: 0, x: 540, y: 900 }, o);
  let s = '';
  s += P('M-320,-90 L300,-90 Q350,-100 390,-160 L330,26 L-300,26Z', '#f6f0e2') + P('M-312,-34 L342,-34 L330,26 L-300,26Z', '#e0384e') + P('M-312,-34 L342,-34', 'none', 'stroke="#fff" stroke-width="5" opacity="0.8"');
  const tiers = [[-90, -150, 500, 14], [-150, -208, 380, 11], [-208, -256, 240, 7]];
  tiers.forEach((tr, ti) => {
    const w = tr[2]; s += R(-w / 2 - 20, tr[1], w, tr[0] - tr[1], ti % 2 ? '#fffaf0' : '#f0e6d2') + R(-w / 2 - 20, tr[1], w, 8, '#c8b690');
    for (let i = 0; i < tr[3]; i++) { const wx = -w / 2 - 6 + (w - 30) * (i + 0.5) / tr[3], fl = d.lit * (0.75 + 0.25 * Math.sin(d.t * 7 + i * 2.3 + ti)); s += R(wx - 11, tr[1] + 20, 22, 20, '#ffd55a', OP(fl)) + C(wx, tr[1] + 30, 22, '#ffd55a', OP(0.18 * fl)); }
  });
  for (const fx of [-70, 60]) s += R(fx - 28, -366, 56, 112, '#e8552f') + R(fx - 28, -366, 56, 22, '#1b1840') + R(fx - 28, -318, 56, 10, '#fff');
  s += L(-200, -256, -200, -420, '#6b4f3a', 6) + L(190, -208, 190, -380, '#6b4f3a', 6) + L(-200, -400, 190, -360, '#6b4f3a', 3);
  if (d.smoke) for (let i = 0; i < 8; i++) { const ph = ((d.t * 0.5 + i / 8) % 1); s += C(-70 + ph * 160 + 10 * i, -380 - ph * 200, 20 + ph * 50, '#d8cde8', OP(0.7 * (1 - ph))); }
  if (d.name) s += TX(10, -52, 'PRÍNCIPE DE ASTÚRIAS', 30, '#8a1d2e', 'letter-spacing="2"');
  return G(s, T(d.x, d.y, d.tilt, d.sc));
}
function swimmer(t, x, y, sc, dir = 1, o = {}) {
  const ph = t * (o.sp || 3.2), a = (ph % 6.283);
  const ax = Math.cos(a) * 70, ay = Math.sin(a) * 60;
  let s = E(0, 10, 60, 24, '#f4f1e8') + E(-30, 8, 26, 16, '#c8d6dc', OP(0.6));
  s += PL([[28, 0], [28 + ax * 0.6, -ay * 0.5 - 30], [30 + ax + 40, -ay - 60 + 30]], PAL.skin, 22) + C(30 + ax + 40, -ay - 30, 13, PAL.skin);
  s += C(52, -22, 30, PAL.skin) + P('M22,-30 Q50,-72 84,-34 Q60,-46 22,-30Z', PAL.hair) + C(64, -18, 4, '#1a0f0b');
  if (o.cuts) s += L(30, -10, 44, 0, '#d62d3f', 4);
  s += E(34, 22, 90, 10, '#fff', OP(0.7)) + E(-30, 24, 50, 7, '#fff', OP(0.6));
  return G(s, T(x, y, 0, sc * dir, sc));
}
function debrisPlank(x, y, rot, sc, t, i) { return G(R(-90, -10, 180, 20, '#c98a4c', 'rx="4"') + R(-90, -10, 180, 6, '#f0b878', 'rx="3"') + L(-50, -10, -50, 10, '#8a5a30', 3) + L(30, -10, 30, 10, '#8a5a30', 3), T(x + 6 * Math.sin(t * 1.3 + i), y + 6 * Math.sin(t * 1.9 + i * 2), rot + 6 * Math.sin(t + i), sc)); }
function lifebuoy(x, y, rot, sc) { let s = C(0, 0, 70, '#f4f1e8') + C(0, 0, 30, 'none', 'stroke="#fff" stroke-width="0"'); s = C(0, 0, 70, '#f4f1e8'); for (let i = 0; i < 4; i++) s += P(`M0,0 L${f1(Math.cos(i * 1.571 + .3) * 72)},${f1(Math.sin(i * 1.571 + .3) * 72)} A72,72 0 0 1 ${f1(Math.cos(i * 1.571 + .8) * 72)},${f1(Math.sin(i * 1.571 + .8) * 72)}Z`, '#e8374a'); s += C(0, 0, 32, '#2fb8d0'); return G(s, T(x, y, rot, sc)); }
function sharkFin(x, y, sc, t, i = 0) { const b = 4 * Math.sin(t * 2 + i); return G(E(30, 8, 120, 14, '#fff', OP(0.5)) + P('M-10,0 Q20,-70 90,-130 Q76,-60 120,0Z', '#5b7fa6') + P('M-10,0 Q20,-70 90,-130 Q60,-70 40,0Z', '#86a9cf', OP(0.7)), T(x, y + b, 0, sc)); }
function ratObj(o) {
  const d = Object.assign({ t: 0, x: 0, y: 0, sc: 1, flip: 1, run: 1, eye: 1, col: '#8f7cae' }, o);
  const w = Math.sin(d.t * 18 * d.run);
  let s = PL([[-70, 0], [-120, 20 + 10 * w], [-170, -10 + 24 * w], [-220, 20]], '#e89cb5', 9);
  for (const lx of [-40, 40]) s += E(lx + 14 * w, 34, 16, 9, '#5f4c7c') + E(lx - 14 * w, 34, 16, 9, '#7a66a0');
  s += E(0, 0, 76, 38, d.col) + E(-6, 18, 56, 18, '#c9b8e0', OP(0.55)) + P('M62,-22 Q126,-14 138,12 Q116,32 58,28Z', mixc(d.col, '#fff', 0.15));
  s += C(50, -34, 17, '#ffa6c4') + C(50, -34, 10, '#c9628a') + C(138, 12, 8, '#ff7aa0');
  s += L(120, 8, 190, -8 + 4 * w, '#f4eaff', 3) + L(120, 14, 190, 24, '#f4eaff', 3) + L(120, 2, 186, -28, '#f4eaff', 3);
  const e = d.eye;
  s += C(96, -6, 26, '#ff3b30', OP(0.4 * e)) + C(96, -6, 9, '#ff5a3c', OP(e)) + C(98, -6, 4, '#fff6a8', OP(e));
  s += P('M70,10 L82,26 L90,10Z', '#fff', OP(0.9));
  return G(s, T(d.x, d.y, 0, d.sc * d.flip, d.sc));
}
function ratEyes(Pf, x, y, s, a = 1, t = 0) { const bl = Math.sin(t * 0.9 + x) > 0.97 ? 0.2 : 1; return glow(Pf, 'R', x, y, 40 * s, 0.5 * a) + E(x - 14 * s, y, 8 * s, 6 * s * bl, '#ff4a38', OP(a)) + E(x + 14 * s, y, 8 * s, 6 * s * bl, '#ff4a38', OP(a)) + C(x - 14 * s, y, 2.5 * s, '#fff2a0', OP(a)) + C(x + 14 * s, y, 2.5 * s, '#fff2a0', OP(a)); }
function flameObj(t, x, y, sc, k = 1) {
  const n = H.noise(t * 14, 4), n2 = H.noise(t * 11, 9), hgt = (1 + 0.14 * n) * k, sw = 10 * n2;
  return G(P(`M0,0 C-34,-10 -30,-70 ${f1(sw)},${f1(-130 * hgt)} C${f1(30 + sw)},-70 34,-10 0,0Z`, '#ff8a1f', OP(0.95)) + P(`M0,0 C-20,-8 -18,-44 ${f1(sw * 0.6)},${f1(-86 * hgt)} C${f1(18 + sw * 0.6)},-44 20,-8 0,0Z`, '#ffd24a') + P(`M0,0 C-9,-4 -8,-24 ${f1(sw * 0.3)},${f1(-46 * hgt)} C${f1(9)},-24 10,-4 0,0Z`, '#fffbe0'), T(x, y, 0, sc * k));
}
function matchbox(x, y, rot, sc, wet = 0, t = 0) {
  let s = R(-90, -50, 180, 100, '#e8b23a', 'rx="8"') + R(-90, -50, 180, 26, '#c9302c', 'rx="6"') + R(-90, 26, 180, 24, '#2b2540', 'rx="6"') + R(-60, -18, 120, 40, '#fff2cf', 'rx="6"') + C(0, 2, 16, '#e8374a');
  for (let i = 0; i < wet * 3; i++) { const ph = (t * 0.8 + i / 3) % 1; s += P(`M${-60 + i * 60},${50 + ph * 120} q-9,-18 0,-34 q9,16 0,34Z`, '#8fe3ff', OP(0.9 * (1 - ph))); }
  return G(s, T(x, y, rot, sc));
}
function jungle(Pf, t, x0, x1, base, hgt, col = '#16805a', hi = '#3fd48a') {
  let s = ''; const n = Math.round((x1 - x0) / 120);
  s += P(`M${x0},${base} ` + Array.from({ length: n + 1 }, (_, i) => `L${f1(x0 + (x1 - x0) * i / n)},${f1(base - hgt * (0.55 + 0.45 * hz(i, 31)))}`).join(' ') + ` L${x1},${base}Z`, col);
  for (let i = 0; i < n; i++) { const px = x0 + (x1 - x0) * (i + 0.5) / n, ph = hgt * (0.8 + 0.5 * hz(i, 32)), sw = 6 * Math.sin(t * 1.2 + i); s += L(px, base, px + sw, base - ph, '#7a4a2a', 12); for (let f = 0; f < 6; f++) { const a = -Math.PI + f * Math.PI / 5 + 0.1; s += P(`M${f1(px + sw)},${f1(base - ph)} Q${f1(px + sw + Math.cos(a) * 60)},${f1(base - ph + Math.sin(a) * 60 - 30)} ${f1(px + sw + Math.cos(a) * 130)},${f1(base - ph + Math.sin(a) * 90 + 28)} Q${f1(px + sw + Math.cos(a) * 60)},${f1(base - ph + Math.sin(a) * 50)} ${f1(px + sw)},${f1(base - ph)}Z`, f % 2 ? hi : mixc(hi, col, 0.4)); } }
  return s;
}
function moon(Pf, x, y, r, a = 1) { return glow(Pf, 'W', x, y, r * 3.4, 0.55 * a) + C(x, y, r, '#fff6d8', OP(a)) + C(x - r * 0.3, y - r * 0.2, r * 0.22, '#ecdcae', OP(0.6 * a)) + C(x + r * 0.35, y + r * 0.3, r * 0.15, '#ecdcae', OP(0.6 * a)); }
function sandBg(Pf, t, y0, col1 = '#ffe2a0', col2 = '#e8a860') {
  let s = `<defs><linearGradient id="${Pf}sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col1}"/><stop offset="1" stop-color="${col2}"/></linearGradient></defs>` + R(-300, y0, 1680, 3000 - y0, `url(#${Pf}sand)`);
  for (let i = 0; i < 30; i++) s += E(hz(i, 51) * 1080, y0 + 40 + hz(i, 52) * (1900 - y0), 6 + 14 * hz(i, 53), 3 + 4 * hz(i, 54), '#b97a3c', OP(0.25));
  return s;
}
function beachNight(Pf, t, o = {}) {
  const fl = o.fl || 0;
  let s = sky(Pf, t, 780, fl, { top: '#1d2a9a', mid: '#4a46c8', low: '#8fb8ff', stars: 1, clouds: 3, cloud: '#5a5ad0' });
  s += moon(Pf, o.mx || 820, o.my || 330, 90);
  s += seaBand(Pf, t, 760, 0.45, { c1: '#3fe0e8', c2: '#1a6ad0', n: 3, span: 360, foam: 0.7, bottom: 1150 });
  s += jungle(Pf, t, -80, o.jx || 520, 780, o.jh || 340, '#157f66', '#37d79a');
  s += sandBg(Pf, t, 1060 - (o.sandUp || 0), '#ffe6a8', '#e9a95e');
  s += seaBand(Pf, t, 1030 - (o.sandUp || 0), 0.25, { c1: '#5ff0ee', c2: '#25a0e6', n: 1, span: 40, bottom: 1110 - (o.sandUp || 0), foam: 1 });
  return s;
}
function clockLite(x, y, r, t, ang) { let s = C(x, y, r, '#fff6e0') + C(x, y, r, 'none', 'stroke="#2b2540" stroke-width="10"'); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += L(x + Math.sin(a) * r * 0.8, y - Math.cos(a) * r * 0.8, x + Math.sin(a) * r * 0.92, y - Math.cos(a) * r * 0.92, '#2b2540', 6); } s += L(x, y, x + Math.sin(ang) * r * 0.75, y - Math.cos(ang) * r * 0.75, '#e0384e', 8); s += L(x, y, x + Math.sin(ang / 12) * r * 0.5, y - Math.cos(ang / 12) * r * 0.5, '#2b2540', 10); return s + C(x, y, 9, '#2b2540'); }
function heartObj(x, y, sc, col = '#ff4a6a') { return G(P('M0,60 C-120,-20 -70,-90 0,-30 C70,-90 120,-20 0,60Z', col) + P('M-40,-30 C-60,-50 -30,-60 -14,-40', 'none', 'stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.6"'), T(x, y, 0, sc)); }
function numeralBadge(Pf, n, x, y, sc, k, t, col = '#ff4a6a') { const b = E_back(k); return G(glow(Pf, 'W', 0, 0, 320, 0.4) + C(0, 0, 200, col) + C(0, 0, 200, 'none', 'stroke="#fff" stroke-width="14"') + C(0, 0, 170, 'none', 'stroke="#fff" stroke-width="4" stroke-dasharray="14 12" opacity="0.8"') + TX(0, 90, String(n), 260, '#fff'), T(x, y, 4 * Math.sin(t * 5), sc * b)); }
const E_back = k => { const x = cl(k); return x <= 0 ? 0 : 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2); };
function armHand(x0, y0, x1, y1, sc = 1, sleeve = '#f4f1e8') { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + 30; return PL([[x0, y0], [mx, my], [x1, y1]], sleeve, 70 * sc) + C(x1, y1, 46 * sc, PAL.skin) + E(x1 + 20 * sc, y1 - 30 * sc, 14 * sc, 30 * sc, PAL.skin); }
function cliffs(Pf, t, x, base, w, h, seed = 1) { let s = ''; const pts = [[x, base]]; for (let i = 0; i <= 8; i++) pts.push([x + w * i / 8, base - h * (0.4 + 0.6 * hz(i, seed)) * (i % 2 ? 1 : 0.85)]); pts.push([x + w, base]); const d = pts.map((p, i) => (i ? 'L' : 'M') + f1(p[0]) + ',' + f1(p[1])).join(' ') + 'Z'; return P(d, '#d6804a') + P(d, '#ffd9a0', OP(0.2) + ' transform="translate(-10 -8)"') + pts.slice(1, -1).map((p, i) => i % 2 ? L(p[0], p[1], p[0] + 20, p[1] + h * 0.5, '#8c3d1c', 6, OP(0.4)) : '').join(''); }
function speedLines(t, n, col = 'rgba(255,255,255,0.35)', dir = 1) {
  let s = '';
  for (let i = 0; i < n; i++) { const y = hz(i, 5) * 1920, x = ((hz(i, 6) * 1600 - t * 2600 * dir * (0.6 + hz(i, 7))) % 1600 + 1600) % 1600 - 260, l = 160 + hz(i, 8) * 320; s += L(x, y, x + l, y, col, 3 + 4 * hz(i, 9)); }
  return s;
}
