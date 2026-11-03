/* kitF.js - cenarios e objetos: floresta do sonho, quarto, cozinha, quintal, moedas, uva, frango, arvores, gigante. */
const DE = '<defs>' + [['sk_day', '#6fb6ee', '#bfe2f4', '#fff0cc'], ['sk_dusk', '#3a2a6a', '#d8607a', '#ffb878'], ['sk_dream', '#2a1a5a', '#8a4a9a', '#f0a0c0'], ['sk_night', '#0a1030', '#1a2a5a', '#3a4a8a'], ['sk_dark', '#1a1020', '#4a2a3a', '#8a4a3a']].map(g => `<linearGradient id="${g[0]}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g[1]}"/><stop offset="0.6" stop-color="${g[2]}"/><stop offset="1" stop-color="${g[3]}"/></linearGradient>`).join('') + '<linearGradient id="gr_lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ab84a"/><stop offset="1" stop-color="#3a8a34"/></linearGradient><linearGradient id="gr_lawn_d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6a3a"/><stop offset="1" stop-color="#1a3a24"/></linearGradient><radialGradient id="vigE" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></radialGradient><radialGradient id="beamE" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff2c0" stop-opacity="0.9"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient></defs>';
const GRADEE = (t, o = {}) => {
  let s = DE;
  if (o.dust !== 0) for (let i = 0; i < 26; i++) { const x = (hz(i, 1) * 1200 + t * (10 + 14 * hz(i, 3)) * (o.drift === undefined ? 1 : o.drift)) % 1200 - 60, y = (hz(i, 2) * 2100 - t * (18 + 22 * hz(i, 4)) + 4000) % 2100 - 90; s += C(x, y, 2 + 3 * hz(i, 5), o.dcol || '#fff6d8', OP((o.dop === undefined ? 0.35 : o.dop) * (0.4 + 0.6 * Math.sin(t * 1.5 + i)))); }
  s += R(-100, -100, 1280, 2120, 'url(#vigE)');
  if (o.tint) s += R(-100, -100, 1280, 2120, o.tint, OP(o.tinta === undefined ? 0.18 : o.tinta));
  return s;
};
const SKYE = (k, y1 = 1100) => R(-400, -400, 1880, y1 + 400, `url(#sk_${k})`);
const COIN = (x, y, r, rot = 0, o = {}) => { const w = Math.abs(Math.cos(rot)) * r; return G(E(0, 0, Math.max(2, w), r, '#8a5a10', `stroke="${OL}" stroke-width="${f1(Math.max(2, r * 0.07))}"`) + E(Math.max(0, w * 0.1), 0, Math.max(1, w * 0.88), r * 0.9, '#f2c84a') + E(0, 0, Math.max(1, w * 0.66), r * 0.66, 'none', `stroke="#c8941c" stroke-width="${f1(Math.max(1, r * 0.06))}"`) + (w > r * 0.5 ? P(`M0,${-r * 0.38} L${w * 0.12},${-r * 0.1} L${w * 0.4},${-r * 0.1} L${w * 0.16},${r * 0.1} L${w * 0.24},${r * 0.4} L0,${r * 0.2} L${-w * 0.24},${r * 0.4} L${-w * 0.16},${r * 0.1} L${-w * 0.4},${-r * 0.1} L${-w * 0.12},${-r * 0.1}Z`, '#c8941c') : '') + E(-w * 0.3, -r * 0.4, w * 0.2, r * 0.12, '#fff', OP(0.5)), `translate(${f1(x)} ${f1(y)})`); };
const GRAPE = (x, y, sc = 1, o = {}) => { let s = ''; [[0, 0], [-34, 8], [34, 8], [-18, 40], [18, 40], [0, 74], [-52, 44], [52, 44], [0, 30]].forEach(p => { s += C(p[0], p[1], 30, '#7a3a9a', `stroke="${OL}" stroke-width="3"`) + C(p[0] - 9, p[1] - 10, 8, '#d8a8ec', OP(0.7)); }); return G(P('M0,-30 Q4,-60 26,-70', 'none', 'stroke="#4a6a2a" stroke-width="9" stroke-linecap="round"') + P('M20,-72 Q50,-90 70,-60 Q40,-50 20,-72Z', '#5aa03a', `stroke="${OL}" stroke-width="3"`) + s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const GRAPE1 = (x, y, r) => G(C(0, 0, r, '#7a3a9a', `stroke="${OL}" stroke-width="${f1(Math.max(3, r * 0.04))}"`) + E(-r * 0.3, -r * 0.34, r * 0.2, r * 0.13, '#d8a8ec', OP(0.75)) + P(`M0,${-r} Q6,${-r - 24} 26,${-r - 30}`, 'none', 'stroke="#4a6a2a" stroke-width="9" stroke-linecap="round"'), `translate(${f1(x)} ${f1(y)})`);
const CHICK = (x, y, sc = 1, o = {}) => G(E(0, 130, 190, 28, '#000', OP(0.22)) + P('M-170,40 Q-190,-40 -90,-90 Q0,-130 100,-90 Q190,-40 170,50 Q150,130 40,138 Q-60,142 -140,110Z', '#f2c8b4', `stroke="${OL}" stroke-width="5"`) + P('M-110,-50 Q0,-100 90,-60 Q40,-20 -40,-20Z', '#fbe4d6', OP(0.8)) + LIMB([[-110, 100], [-150, 160], [-176, 126]], '#f0b89a', 34) + LIMB([[90, 108], [130, 170], [160, 140]], '#f0b89a', 34) + (o.ice ? [0, 1, 2, 3, 4, 5].map(i => P(`M${-120 + i * 50},${-60 + hz(i, 3) * 100} l14,-22 l12,22 l-12,10Z`, '#cdeeff', OP(0.8))).join('') + E(0, -10, 180, 100, '#bfe8ff', OP(0.18)) : '') + (o.eyes ? C(-60, -30, 12, '#fff') + C(-60, -30, 5, '#111') + C(10, -34, 12, '#fff') + C(10, -34, 5, '#111') : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* arvore: trunk + copa de circulos */
const TREEE = (x, y, sc = 1, o = {}) => {
  const th = o.h || 360, sw = (o.sway === undefined ? 1 : o.sway) * Math.sin((o.t || 0) * 1.4 + x * 0.01) * 3;
  let s = P(`M-34,0 Q-26,${-th * 0.5} -18,${-th} L18,${-th} Q26,${-th * 0.5} 34,0Z`, '#7a4a2a', `stroke="${OL}" stroke-width="4"`) + P(`M-4,0 Q0,${-th * 0.5} 4,${-th}`, 'none', 'stroke="#5a3418" stroke-width="5" opacity="0.6"') + P(`M-22,-30 L-66,6 M22,-30 L66,6`, 'none', 'stroke="#7a4a2a" stroke-width="16" stroke-linecap="round"');
  const cc = o.leaf || '#3a9a3a', cs = o.leafS || '#2a7a2c', ct = -th;
  const blobs = [[0, -60, 130], [-90, -10, 100], [90, -10, 100], [-50, -120, 90], [50, -120, 90], [0, -150, 80]];
  s += G(blobs.map(b => C(b[0], ct + b[1], b[2], cs, `stroke="${OL}" stroke-width="4"`)).join('') + blobs.map(b => C(b[0] - 12, ct + b[1] - 14, b[2] * 0.82, cc)).join('') + [0, 1, 2, 3].map(i => C(-60 + i * 40, ct - 120 + hz(i, 2) * 40, 26, '#7ad05a', OP(0.5))).join(''), `translate(${f1(sw)} 0)`);
  if (o.coins) for (let i = 0; i < o.coins; i++) { const ang = hz(i, 7) * 6.28, rr = 40 + hz(i, 8) * 120, cx = Math.cos(ang) * rr, cy = ct - 40 + Math.sin(ang) * rr * 0.8 + (o.fall ? ((o.t || 0) * 90 * (0.5 + hz(i, 9))) % 400 : 0); s += COIN(cx, cy, 30 + hz(i, 4) * 12, (o.t || 0) * 2 + i); }
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const FENCE = (y, x0 = -100, x1 = 1180, col = '#b88a58') => { let s = R(x0, y - 150, x1 - x0, 14, '#9a6a3a', `stroke="${OL}" stroke-width="3"`) + R(x0, y - 70, x1 - x0, 14, '#9a6a3a', `stroke="${OL}" stroke-width="3"`); for (let x = x0; x < x1; x += 70) s += P(`M${x},${y} L${x},${y - 180} L${x + 30},${y - 206} L${x + 60},${y - 180} L${x + 60},${y}Z`, col, `stroke="${OL}" stroke-width="3"`) + L(x + 18, y - 160, x + 18, y - 10, '#fff', 4, OP(0.12)); return s; };
/* quintal: sk = ceu, hy = horizonte */
const YARDE = (Pf, t, o = {}) => {
  const sk = o.sk || 'day', hy = o.hy || 980, gy = hy + 140, dark = sk === 'dark' || sk === 'dusk';
  let s = SKYE(sk, hy + 100) + (sk === 'day' ? glow(Pf, 'W', 800, 260, 520, 0.5) + [0, 1, 2].map(i => E(160 + i * 380 + 14 * Math.sin(t * 0.3 + i), 260 + 70 * i, 140, 44, '#fff', OP(0.8))).join('') : '') + P(`M-100,${hy} Q200,${hy - 160} 520,${hy - 40} T1180,${hy - 100} L1180,${hy + 60} L-100,${hy + 60}Z`, dark ? '#2a5a3a' : '#7ac070');
  s += FENCE(hy + 90, -100, 1180, dark ? '#8a6a48' : '#c89a64') + R(-100, hy + 90, 1380, 1100, `url(#gr_lawn${dark ? '_d' : ''})`);
  for (let i = 0; i < 40; i++) { const x = hz(i, 1) * 1200 - 60, y = hy + 140 + hz(i, 2) * 800; s += P(`M${x},${y} l-6,-22 M${x},${y} l4,-26 M${x},${y} l10,-20`, 'none', `stroke="${dark ? '#2a6a34' : '#3a8a30'}" stroke-width="4" stroke-linecap="round"`); }
  for (let i = 0; i < 14; i++) { const x = hz(i, 5) * 1100, y = hy + 200 + hz(i, 6) * 700; s += C(x, y, 8, ['#ffd23a', '#fff', '#ff7a9a'][i % 3]) + C(x, y, 3, '#c8541a'); }
  return s;
};
const HOUSEE = (Pf, t, x, y, sc = 1, o = {}) => G(
  R(-300, -420, 600, 420, o.wall || '#f2d8a8', `stroke="${OL}" stroke-width="5"`) + P('M-340,-420 L0,-620 L340,-420Z', '#b8503a', `stroke="${OL}" stroke-width="5"`) + (o.hole ? '' : '') + R(-240, -330, 130, 150, '#bfe2f4', `stroke="${OL}" stroke-width="6"`) + L(-175, -330, -175, -180, OL, 5) + L(-240, -255, -110, -255, OL, 5) + R(-50, -260, 110, 260, '#8a5a3a', `stroke="${OL}" stroke-width="5"`) + C(36, -130, 8, '#f2c84a') + R(110, -330, 130, 150, '#bfe2f4', `stroke="${OL}" stroke-width="6"`) + L(175, -330, 175, -180, OL, 5) +
  /* garagem */ R(300, -300, 380, 300, o.wall || '#ecd09c', `stroke="${OL}" stroke-width="5"`) + P('M280,-300 L490,-400 L700,-300Z', o.roofB || '#a8402e', `stroke="${OL}" stroke-width="5"`) + R(340, -240, 300, 240, '#c8ccd2', `stroke="${OL}" stroke-width="5"`) + [0, 1, 2, 3].map(i => L(340, -200 + i * 50, 640, -200 + i * 50, '#9aa0a8', 4)).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const WINF = (x, y, w, h, sky = 'day', o = {}) => G(R(0, 0, w, h, `url(#sk_${sky})`) + (o.inner || '') + R(0, 0, w, h, 'none', `stroke="#f4efe6" stroke-width="22"`) + L(w / 2, 0, w / 2, h, '#f4efe6', 14) + L(0, h / 2, w, h / 2, '#f4efe6', 14) + R(-14, -14, w + 28, h + 28, 'none', `stroke="${OL}" stroke-width="4"`), `translate(${f1(x)} ${f1(y)})`);
/* quarto do Enzo */
const BEDRM = (Pf, t, o = {}) => {
  const day = o.day === undefined ? 1 : o.day, wall = day ? '#f0d4a8' : '#3a3a5a', fl = day ? '#b8804e' : '#2a2038';
  let s = BIG(wall) + R(-100, 1300, 1280, 700, fl, `stroke="${OL}" stroke-width="4"`) + R(-100, 1290, 1280, 24, day ? '#8a5a30' : '#1a1428');
  for (let i = 0; i < 10; i++) s += L(-100 + i * 150, 1314, -200 + i * 180, 1920, OL, 3, OP(0.2));
  s += WINF(640, 360, 340, 440, day ? 'day' : 'dusk', { inner: o.winInner || '' }) + (day ? P('M640,800 L980,800 L1100,1300 L520,1300Z', '#fff2c0', OP(0.14)) : '');
  s += R(60, 420, 200, 260, '#3a6aa8', `rx="8" stroke="${OL}" stroke-width="5"`) + C(160, 540, 50, '#ffd23a') + P('M100,640 L160,570 L220,640Z', '#e8602c') + R(80, 1090, 18, 18, 'none');
  s += o.bed === false ? '' : G(R(0, 0, 640, 40, '#8a5a30', `stroke="${OL}" stroke-width="4"`) + R(10, -150, 620, 190, '#e8e0f4', `rx="26" stroke="${OL}" stroke-width="4"`) + R(10, -110, 620, 150, '#5aa0d8', `rx="22" stroke="${OL}" stroke-width="4"`) + R(10, -150, 160, 90, '#fff', `rx="30" stroke="${OL}" stroke-width="4"`), `translate(${o.bx === undefined ? 60 : o.bx} 1300)`);
  return s;
};
/* cozinha */
const KITCHE = (Pf, t, o = {}) => {
  let s = BIG('#f6e6b8') + R(-100, 1230, 1280, 700, '#c9a46c', `stroke="${OL}" stroke-width="4"`);
  for (let i = 0; i < 12; i++) for (let j = 0; j < 8; j++) s += R(-100 + i * 120, 380 + j * 100, 120, 100, (i + j) % 2 ? '#fff6dc' : '#f6e0a0', OP(0.8));
  s += R(60, 150, 400, 360, '#8a5a3a', `rx="10" stroke="${OL}" stroke-width="5"`) + L(260, 150, 260, 510, OL, 5) + C(240, 340, 8, '#f2c84a') + C(280, 340, 8, '#f2c84a');
  s += WINF(580, 220, 380, 380, o.sk || 'day') + R(-60, 1060, 760, 190, '#d8a060', `stroke="${OL}" stroke-width="5"`) + R(-60, 1040, 760, 30, '#f4efe6', `stroke="${OL}" stroke-width="4"`) + R(740, 520, 280, 760, '#e8ecf0', `rx="20" stroke="${OL}" stroke-width="5"`) + L(740, 860, 1020, 860, OL, 5) + R(980, 640, 14, 120, '#9aa0a8', 'rx="6"');
  return s + (o.over || '');
};
/* floresta do sonho */
const FORESTD = (Pf, t, o = {}) => {
  const ph = o.ph || 0; let s = SKYE('dream', 1300) + glow(Pf, 'B', 540, 700, 800, 0.4) + C(760, 420, 120, '#ffe6f0', OP(0.8)) + glow(Pf, 'W', 760, 420, 380, 0.5);
  for (let L_ = 0; L_ < 3; L_++) { const n = 7, col = ['#4a2a6a', '#3a1f58', '#241240'][L_]; for (let i = 0; i < n; i++) { const x = ((i * 190 + L_ * 70 + ph * (20 + L_ * 30)) % 1500) - 200, w = 50 + L_ * 26 + 20 * hz(i, L_), h = 1500; s += P(`M${x - w},1500 Q${x - w * 0.6},800 ${x - w * 0.3},0 L${x + w * 0.3},0 Q${x + w * 0.6},800 ${x + w},1500Z`, col, OP(0.95)); } s += R(-100, 0, 1400, 1500, ['#b070c8', '#8a50b0', '#401a60'][L_], OP(0.10)); }
  s += R(-100, 1250, 1280, 700, '#2a1a40') + E(540, 1300, 520, 90, '#6a3a8a', OP(0.5));
  for (let i = 0; i < 30; i++) s += C(hz(i, 1) * 1080, 300 + hz(i, 2) * 1100 + 20 * Math.sin(t * 1.3 + i), 3 + 3 * hz(i, 3), '#ffe890', OP(0.5 + 0.5 * Math.sin(t * 2 + i * 2))) + glow(Pf, 'A', hz(i, 1) * 1080, 300 + hz(i, 2) * 1100, 22, 0.35);
  return s + R(-100, 700, 1280, 700, '#e0b0f0', OP(0.10 + 0.05 * Math.sin(t)));
};
const RAYS = (Pf, t, x, y, n, len, col, a) => { let s = ''; for (let i = 0; i < n; i++) { const an = i / n * 6.283 + t * 0.2; s += P(`M${f1(x)},${f1(y)} L${f1(x + Math.cos(an - 0.05) * len)},${f1(y + Math.sin(an - 0.05) * len)} L${f1(x + Math.cos(an + 0.05) * len)},${f1(y + Math.sin(an + 0.05) * len)}Z`, col, OP(a)); } return s; };
const SPARK = (t, x, y, n, rad, col = '#ffe890') => { let s = ''; for (let i = 0; i < n; i++) { const u = (t * 0.8 + hz(i, 3)) % 1, an = hz(i, 4) * 6.28, r = rad * u; s += P(`M${f1(x + Math.cos(an) * r)},${f1(y + Math.sin(an) * r - 12 * (1 - u))} l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4Z`, col, OP(1 - u)); } return s; };
/* mao / braco gigante saindo da terra */
const GHAND = (Pf, t, x, y, sc, o = {}) => {
  const open = o.open === undefined ? 0 : o.open, dirt = '#4a3020', skin = '#6a4a38', sk2 = '#4a3226';
  let s = P('M-110,0 Q-130,-200 -90,-420 L90,-420 Q130,-200 110,0Z', skin, `stroke="${OL}" stroke-width="6"`) + P('M-100,-60 Q-60,-120 -90,-200 M60,-100 Q100,-180 70,-300', 'none', `stroke="${sk2}" stroke-width="10" stroke-linecap="round" opacity="0.6"`);
  /* palma e dedos */
  s += E(0, -470, 150, 120, skin, `stroke="${OL}" stroke-width="6"`);
  [[-110, -30], [-55, -10], [0, 0], [55, -10], [105, -30]].forEach((f, i) => { const ang = (f[0] / 110) * (20 + 30 * open) + (i === 0 ? -20 * open : 0), len = 150 + 30 * (i === 0 ? -1 : (i === 2 ? 1 : 0)); s += G(R(-26, -len, 52, len, skin, `rx="26" stroke="${OL}" stroke-width="6"`) + L(-8, -len + 30, -8, -len + 60, sk2, 6) + R(-18, -len + 4, 36, 30, '#8a6a52', 'rx="14"'), `translate(${f[0]} ${-540 + f[1]}) rotate(${f1(ang)})`); });
  s += (o.hat ? G(P('M-50,-10 L-18,-120 Q0,-170 40,-150 Q16,-120 36,-100 L60,-10Z', DU.hat, `stroke="${OL}" stroke-width="4"`) + R(-56, -20, 120, 20, '#3a2418', `rx="5" stroke="${OL}" stroke-width="3"`) + R(-10, -22, 24, 24, DU.gold, 'rx="4"'), `translate(0 -520) scale(1.3)`) : '');
  for (let i = 0; i < 16; i++) s += C(-120 + hz(i, 1) * 240, -80 - hz(i, 2) * 420, 8 + 14 * hz(i, 3), dirt, OP(0.9));
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const CRACKS = (x, y, len, a = 1) => { let s = ''; [[-1, 0.7], [1, 0.9], [0.1, 1.1], [-0.5, 0.5], [0.6, 0.6]].forEach((c, i) => { let px = x, py = y, d = `M${px},${py}`; for (let k = 1; k <= 6; k++) { px += c[0] * len / 6 + (hz(i * 7 + k, 3) - 0.5) * 50; py += c[1] * len / 6 + (hz(i * 7 + k, 4) - 0.2) * 20; d += ` L${f1(px)},${f1(py)}`; } s += P(d, 'none', `stroke="#150a06" stroke-width="${f1(14 - i)}" stroke-linecap="round" stroke-linejoin="round" ${OP(a)}`); }); return s; };
const TXE = (txt, x, y, sz, lt, col = '#fff', o = {}) => { const u = ez(lt / (o.dur || 0.25)); if (u <= 0.01) return ''; return G(`<text x="0" y="0" text-anchor="middle" font-family="Bebas Neue, Poppins, sans-serif" font-size="${f1(sz)}" fill="${col}" stroke="${o.stroke || '#1a0c08'}" stroke-width="${f1(sz * 0.14)}" paint-order="stroke" stroke-linejoin="round" letter-spacing="${f1(sz * 0.04)}">${txt}</text>`, `translate(${f1(x)} ${f1(y + (1 - u) * 26)}) rotate(${o.rot || 0}) scale(${f1(0.8 + 0.2 * u)})`, OP(u * (o.a === undefined ? 1 : o.a)));
};
