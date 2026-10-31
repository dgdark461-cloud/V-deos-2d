/* hal.js - Halloween: paleta, David, abobora, porta, fantasma-crianca, cenarios */
const HC = { night: '#120a22', night2: '#24103e', night3: '#3a1a5a', or: '#ff8a1f', or2: '#ffc15a', gr: '#7aff5a', moon: '#f4e6b0', blk: '#07050d', red: '#e03030' };
const DAVID = { skin: '#e2b58f', skinSh: '#b07a58', hair: '#241812', hairHi: '#4a3426', hood: '#5a3a8a', hoodSh: '#3a2460', vest: '#ff8a1f' };
const DV = (o, x, y, sc) => withPal(DAVID, () => G(lucasFace(Object.assign({ beard: 0.18, dark: 0.15, wet: 0, bodyLen: 430 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
const davidFig = o => { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#5a3a8a', jacketDk: '#3a2460', jacketLt: '#7a5aaa', shirt: '#ff8a1f', pants: '#1f2438', pantsDk: '#141828', boot: '#2a1c18', bootDk: '#1a1210', sole: '#0e0a08', skin: '#e2b58f', skinDk: '#b07a58', hair: '#241812', cap: '#ff8a1f', capDk: '#c9600a', capLt: '#ffb347' }); try { return hikerFig(Object.assign({ cap: 1, bag: 0, hair: 0 }, o)); } finally { Object.assign(HK, sv); } };
const SILH = (t, x, y, sc, o = {}) => G(silFigH(Object.assign({ t, view: 's', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const silFigH = a => { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#06040c', jacketDk: '#030208', jacketLt: '#120c22', shirt: '#06040c', pants: '#06040c', pantsDk: '#030208', boot: '#020106', bootDk: '#020106', sole: '#000', skin: '#06040c', skinDk: '#030208', hair: '#030208', cap: '#06040c', capDk: '#030208', capLt: '#06040c' }); try { return hikerFig(Object.assign({ cap: 1, bag: 0, hair: 0 }, a)); } finally { Object.assign(HK, sv); } };

function bat(x, y, sc, ph) { const f = 0.35 + 0.65 * Math.abs(Math.sin(ph)); return G(P('M0,0 Q-40,-50 -110,-30 Q-80,-10 -90,20 Q-50,0 -30,30 Q-14,10 0,26 Q14,10 30,30 Q50,0 90,20 Q80,-10 110,-30 Q40,-50 0,0Z', '#050309') + C(-8, -6, 3, HC.or2) + C(8, -6, 3, HC.or2), `translate(${f1(x)} ${f1(y)}) scale(${sc} ${(sc * f).toFixed(3)})`); }
function SKYH(Pf, t, o = {}) {
  const mx = o.mx === undefined ? 780 : o.mx, my = o.my === undefined ? 380 : o.my; let s = BIG(HC.night) + R(-300, 0, 1680, 700, HC.night2, OP(0.5)) + R(-300, 600, 1680, 600, HC.night3, OP(0.25));
  for (let i = 0; i < 40; i++) s += C(hz(i, 1) * 1100, hz(i, 2) * 900, 1.5 + 2 * hz(i, 3), '#fff', OP(0.4 + 0.5 * Math.sin(t * 2 + i)));
  s += glow(Pf, 'A', mx, my, 700, 0.35) + C(mx, my, 130, HC.moon) + C(mx - 36, my - 20, 24, '#e0cd90', OP(0.6)) + C(mx + 40, my + 36, 16, '#e0cd90', OP(0.6));
  for (let i = 0; i < 3; i++) s += E(((i * 480 + t * 18) % 1700) - 300, 300 + i * 150, 260, 40, HC.night3, OP(0.5));
  for (let i = 0; i < (o.bats === undefined ? 5 : o.bats); i++) s += bat(((hz(i, 7) * 1500 - t * (60 + 40 * hz(i, 8))) % 1500 + 1500) % 1500 - 200, 250 + 500 * hz(i, 9) + 40 * Math.sin(t * 2 + i), 0.5 + 0.5 * hz(i, 10), t * 9 + i * 2);
  return s;
}
function PUMPK(x, y, sc, o = {}) {
  const d = Object.assign({ t: 0, mood: 0, glow: 1, Pf: 'p_' }, o), fl = 0.8 + 0.2 * Math.sin(d.t * 11) * Math.sin(d.t * 4.3 + 1), m = d.mood;
  let s = d.glow ? G(C(0, -20, 300, HC.or, OP(0.22 * fl)) + C(0, -20, 190, HC.or2, OP(0.18 * fl)), '') : '';
  s += E(0, 70, 200, 20, 'rgba(0,0,0,0.4)') + E(-90, -10, 110, 130, '#e8700f') + E(90, -10, 110, 130, '#e8700f') + E(0, -10, 130, 140, '#ff8a1f') + E(-50, -10, 60, 130, '#ffa03a', OP(0.5)) + R(-14, -170, 28, 60, '#3a5a1a', 'rx="8"') + P('M14,-150 q40,-30 50,10', 'none', 'stroke="#5a8a2a" stroke-width="8"');
  const eyeW = 40 + 20 * m, tilt = 12 * m;
  s += P(`M-${90},-40 L-${90 - eyeW * 0.5},-90 L-${90 - eyeW * 1.2},-30 Z`, '#2a1006') + P(`M90,-40 L${90 - eyeW * 0.5 + 0},-90 L${90 - eyeW * 1.2},-30 Z`, '#2a1006');
  s += P(`M-4,-10 L-26,30 L22,30Z`, '#2a1006');
  const w = 110 + 30 * m; let mp = `M${-w},30 `; for (let i = 0; i <= 8; i++) mp += `L${-w + i * (2 * w / 8)},${i % 2 ? 78 : 32 + 10 * m} `; mp += `L${w},44 Q0,${100 + 30 * m} ${-w},44Z`;
  s += P(mp, '#2a1006') + P(mp, HC.or2, OP(0.8 * fl), 'transform="scale(0.8) translate(0 8)"');
  s += P(`M-${90},-40 L-${90 - eyeW * 0.5},-90 L-${90 - eyeW * 1.2},-30 Z`, HC.or2, OP(0.85 * fl), `transform="scale(0.8) translate(-22 -10)"`) + P(`M90,-40 L${90 - eyeW * 0.5},-90 L${90 - eyeW * 1.2},-30 Z`, HC.or2, OP(0.85 * fl), `transform="scale(0.8) translate(18 -10)"`);
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
}
function GHOSTK(Pf, t, x, y, sc, o = {}) {
  const d = Object.assign({ grin: 1, glow: 1, bucket: 1, sway: 1 }, o), sw = d.sway * 8 * Math.sin(t * 2), hem = (xx, i) => 20 * Math.sin(t * 3 + i + xx * 0.02);
  let s = d.glow ? C(0, -260, 360, HC.gr, OP(0.12)) : '';
  s += E(0, 6, 180, 18, 'rgba(0,0,0,0.5)');
  s += P(`M-150,0 Q-170,-300 -80,-420 Q0,-480 80,-420 Q170,-300 150,0 L110,${24 + hem(110, 4)} L60,${-6 + hem(60, 3)} L10,${26 + hem(10, 2)} L-40,${-4 + hem(-40, 1)} L-90,${22 + hem(-90, 0)}Z`, '#e8e4f0') + P('M-150,0 Q-170,-300 -80,-420 Q-100,-250 -60,0Z', '#b8b0cc', OP(0.6));
  s += E(-52 + sw * 0.2, -290, 36, 56, '#05030a') + E(52 + sw * 0.2, -290, 36, 56, '#05030a') + C(-52 + sw * 0.2, -290, 8, HC.gr, OP(d.glow)) + C(52 + sw * 0.2, -290, 8, HC.gr, OP(d.glow));
  if (d.grin) { let mp = 'M-70,-200 '; for (let i = 0; i <= 8; i++) mp += `L${-70 + i * 17.5},${i % 2 ? -150 : -196} `; mp += 'Q0,-120 -70,-200Z'; s += P(mp, '#05030a') + P(mp, '#f0f0f0', OP(0.0)); }
  if (d.bucket) s += G(P('M-40,-20 L40,-20 L30,50 L-30,50Z', '#ff8a1f') + P('M-36,-20 Q0,-90 36,-20', 'none', 'stroke="#2a1006" stroke-width="6"') + P('M-20,0 L-8,20 L4,0 L14,20 L24,0', 'none', 'stroke="#2a1006" stroke-width="4"'), 'translate(150 -120) rotate(10)') + P('M110,-220 Q150,-200 160,-130', 'none', 'stroke="#e8e4f0" stroke-width="30" stroke-linecap="round"');
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
}
function DOORH(Pf, t, o = {}) {
  const d = Object.assign({ open: 0, knock: 0, scratch: 0, lit: 1, inside: 0, gap: 0, mat: 1 }, o), kx = d.knock * (Math.sin(t * 60) * 7);
  let s = BIG(d.inside ? '#0a0612' : HC.night) + (d.inside ? '' : R(-300, 0, 1680, 1700, HC.night2, OP(0.5))) + R(-300, 1650, 1680, 500, d.inside ? '#0c0814' : '#1a1028') + R(160, 280, 760, 1400, '#0a0610');
  if (d.lit && !d.inside) s += glow(Pf, 'A', 300, 300, 600, 0.45) + R(90, 110, 70, 90, HC.or2) + R(80, 100, 90, 12, '#2a1006');
  const dw = 620, dx = 230;
  if (d.open > 0.01) s += R(dx, 330, dw, 1320, '#0a0610') + C(540, 1000, 700, HC.gr, OP(0.15 * d.open));
  s += G(R(dx, 330, dw, 1320, '#4a2a18', 'rx="10"') + [0, 1].map(i => [0, 1].map(j => R(dx + 50 + j * 290, 400 + i * 560 + (i ? 80 : 0), 230, 440, '#5a3320', 'rx="8"') + R(dx + 50 + j * 290, 400 + i * 560 + (i ? 80 : 0), 230, 440, 'none', 'stroke="#2a1608" stroke-width="8"')).join('')).join('') + R(dx, 330, dw, 1320, 'none', 'stroke="#1a0e06" stroke-width="14"') + (d.lit ? '' : R(dx, 330, dw, 1320, '#000', OP(0.35))), `translate(${f1(kx)} 0)`);
  /* olho magico, macaneta, campainha */
  s += G(C(540, 800, 34, '#b8b0a0') + C(540, 800, 20, '#0a0610') + C(540, 800, 9, d.gap ? HC.gr : '#2a2a3a'), `translate(${f1(kx)} 0)`) + G(R(740, 1080, 70, 26, '#c8b070', 'rx="8"') + C(790, 1150, 36, '#c8b070') + C(790, 1150, 20, '#a08840'), `translate(${f1(kx)} 0)`);
  s += R(920, 920, 70, 110, '#d8d0c0', 'rx="10"') + C(955, 975, 22, d.bell ? HC.or : '#c0382a') + (d.bell ? glow(Pf, 'A', 955, 975, 200, 0.7) : '');
  if (d.mat) s += R(250, 1650, 580, 70, '#3a1a5a', 'rx="12"') + TXT(540, 1700, 'TRUCK OR TREAT', 30, HC.or);
  if (d.gap) s += R(dx, 1600, dw, 50, HC.gr, OP(0.12 * d.gap)) + E(540, 1640, 220, 18, HC.gr, OP(0.25 * d.gap));
  if (d.scratch) for (let i = 0; i < 4; i++) { const u = cl(d.scratch * 4 - i, 0, 1); s += L(400 + i * 60, 600, 400 + i * 60 + 24, 600 + 520 * u, '#1a0c04', 7) + L(404 + i * 60, 600, 404 + i * 60 + 24, 600 + 520 * u, '#c8a070', 3, OP(0.6)); }
  return s;
}
function LIVN(Pf, t, o = {}) {
  const d = Object.assign({ lights: 0, window: 1 }, o), amb = d.lights ? 1 : 0.25;
  let s = BIG(d.lights ? '#2a1c3a' : '#0a0614') + R(-300, 1400, 1680, 700, d.lights ? '#3a2a30' : '#100a14') + R(-300, 1392, 1680, 12, '#000', OP(0.5));
  if (d.window) s += G(R(-150, -220, 300, 440, '#10163a', 'stroke="#2a1c3a" stroke-width="16"') + L(0, -220, 0, 220, '#2a1c3a', 10) + L(-150, 0, 150, 0, '#2a1c3a', 10) + C(60, -110, 36, HC.moon, OP(0.9)) + glow(Pf, 'A', 60, -110, 220, 0.5), 'translate(210 700)') + P('M20,440 Q110,700 60,1000 L-40,1000 L-40,440Z', '#3a1a4a') + P('M400,440 Q310,700 360,1000 L460,1000 L460,440Z', '#3a1a4a') + R(-60, 1230, 460, 0, '#000') + P('M60,1380 L360,1380 L330,1000 L90,1000Z', HC.moon, OP(0.07));
  s += R(560, 1000, 480, 300, '#2a1a3a', 'rx="40"') + R(540, 1170, 520, 190, '#33204a', 'rx="34"') + R(500, 1060, 70, 300, '#24163a', 'rx="30"') + R(1030, 1060, 70, 300, '#24163a', 'rx="30"') + R(700, 1090, 150, 100, '#ff8a1f', OP(0.5 * amb + 0.2), 'rx="22"');
  s += PUMPK(300, 1360, 0.5, { t, mood: 0.2 });
  if (d.lights) s += glow(Pf, 'A', 900, 760, 800, 0.5) + P('M820,880 L980,880 L950,740 L850,740Z', '#ffc15a');
  return s + R(-300, -300, 1680, 2520, '#05030a', OP(d.lights ? 0 : 0.2));
}
const CLOCKH = (t, big = 1) => C(540, 800, 300, '#1c1030', 'stroke="#ff8a1f" stroke-width="14"') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => L(540 + 250 * Math.sin(i * Math.PI / 6), 800 - 250 * Math.cos(i * Math.PI / 6), 540 + 280 * Math.sin(i * Math.PI / 6), 800 - 280 * Math.cos(i * Math.PI / 6), '#f4e6b0', 8)).join('') + L(540, 800, 540, 560, '#f4e6b0', 18) + L(540, 800, 540 + 10 * Math.sin(t * 40) * big, 540, '#ff3b30', 8);
const WIN = (Pf, t, open) => { const sw = 30 * open * Math.sin(t * 2.2); return BIG('#0a0614') + R(240, 300, 600, 1100, '#10163a') + C(700, 560, 90, HC.moon, OP(0.9)) + glow(Pf, 'A', 700, 560, 400, 0.5) + P(`M240,300 Q${150 + sw - 100 * open},800 ${200 + sw},1500 L350,1500 Q330,800 360,300Z`, '#3a1a4a') + P(`M840,300 Q${930 + sw + 100 * open},800 ${880 + sw},1500 L730,1500 Q750,800 720,300Z`, '#3a1a4a') + R(240, 300, 600, 1100, 'none', 'stroke="#24103e" stroke-width="30"') + L(540, 300, 540, 1400, '#24103e', 16) + R(200, 1400, 680, 40, '#24103e'); };
const SWITCH = (on, x = 540, y = 960, sc = 2) => G(R(-70, -110, 140, 220, '#d8d0c0', 'rx="18"') + R(-34, -70, 68, 140, '#a09888', 'rx="12"') + R(-26, on ? -62 : 0, 52, 62, '#f0e8d8', 'rx="10"'), `translate(${x} ${y}) scale(${sc})`);
const RULECARD = (n, col = HC.or) => G(R(-330, -420, 660, 840, '#2a1648', 'rx="40" stroke="' + col + '" stroke-width="14"') + TXT(0, 60, String(n), 520, col) + TXT(0, -300, 'REGRA', 80, '#f4e6b0') + [0, 1, 2].map(i => C(-200 + i * 200, 330, 0, 'none')).join('') + '', 'translate(540 960)');
