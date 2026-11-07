/* kitP.js - elenco novo (bonecos "peg": olhos solidos, sem contorno, cabecas ovais) + cenarios de praia e almoco */
const IKX = "#2a2230";

const SP = {
  raf: { skin: '#e8b690', sk2: '#c98f6a', hair: '#3a2316', hk: 'quiff', top: '#1f9d8f', top2: '#157a70', pants: '#c8b078', pants2: '#a8905a', shoe: '#ffffff', w: 200, leg: 290, hs: 0.78, arm: 225, st: 1 },
  rafk: { skin: '#e8b690', sk2: '#c98f6a', hair: '#3a2316', hk: 'tuft', top: '#ffd23a', top2: '#e0a820', pants: '#e0503c', pants2: '#b83a2a', shoe: '#6ac0e8', w: 170, leg: 150, hs: 1.0, arm: 140, kid: 1 },
  pai: { skin: '#d7a07a', sk2: '#b27a58', hair: '#2a2420', hk: 'short', stub: 1, grey: 1, top: '#f08a3c', top2: '#c86a22', pants: '#3a5a8a', pants2: '#2a4268', shoe: '#4a3a2a', w: 250, leg: 290, hs: 0.8, arm: 230 },
  mae: { skin: '#f0c4a0', sk2: '#d09c78', hair: '#7a3a22', hk: 'bob', top: '#9a6ad8', top2: '#7a4ab8', pants: '#2a2a3a', pants2: '#1a1a28', shoe: '#c84a5a', w: 200, leg: 290, hs: 0.78, arm: 225 },
  irm: { skin: '#a8704a', sk2: '#8a5636', hair: '#1c1410', hk: 'buns', top: '#ff7aa8', top2: '#d85a88', pants: '#6a8ae8', pants2: '#4a68c0', shoe: '#ffffff', w: 190, leg: 270, hs: 0.8, arm: 215 },
  pri: { skin: '#f2c8a8', sk2: '#d6a280', hair: '#d8582a', hk: 'curls', fr: 1, top: '#5ac05a', top2: '#3a9a3a', pants: '#3a4a8a', pants2: '#2a3668', shoe: '#e8e0d0', w: 170, leg: 150, hs: 1.0, arm: 140, kid: 1 }
};
const HEADP = (s, t, o = {}, view = 'f') => {
  const bl = ((t * 0.55 + (s.w % 7)) % 3.1) < 0.1 ? 0.1 : 1, e = Math.max(0.1, (o.eye == null ? 1 : o.eye) * bl);
  const lx = (o.lx || 0) * 10, ly = (o.ly || 0) * 8, wr = o.worry || 0, sm = o.sm || 0, rs = o.raise || 0, op = o.open || 0, an = o.angry || 0, jx = (o.trem || 0) * Math.sin(t * 50) * 4, HC = s.hair, hk = s.hk;
  let back = '', fr = '';
  if (hk === 'bob') back = P('M-150,160 Q-175,-60 -100,-135 Q0,-195 100,-135 Q175,-60 150,160Z', HC);
  if (hk === 'buns') back = C(-105, -125, 48, HC) + C(105, -125, 48, HC) + C(-105, -125, 16, '#ffd23a') + C(105, -125, 16, '#ffd23a');
  if (hk === 'curls') for (let k = 0; k < 9; k++) { const a = Math.PI * (1.05 + k * 0.1); back += C(Math.cos(a) * 118, Math.sin(a) * 118 - 5, 46, HC); }
  if (hk === 'quiff') fr = P('M-126,-35 Q-132,-150 0,-152 Q132,-148 127,-30 Q100,-95 25,-85 Q-60,-100 -126,-35Z', HC) + P('M-70,-120 Q0,-205 120,-135 Q55,-150 -5,-122Z', HC);
  if (hk === 'tuft') fr = P('M-126,-30 Q-130,-138 0,-138 Q130,-138 126,-30 Q70,-75 0,-65 Q-70,-75 -126,-30Z', HC) + P('M-8,-136 Q-25,-195 35,-180 Q0,-165 22,-136Z', HC);
  if (hk === 'short') fr = P('M-126,-30 Q-130,-142 0,-142 Q130,-142 126,-30 Q70,-80 0,-70 Q-70,-80 -126,-30Z', HC) + (s.grey ? E(-117, -72, 8, 20, '#b8b0a8') + E(117, -72, 8, 20, '#b8b0a8') : '');
  if (hk === 'bob' || hk === 'buns') fr = P('M-128,-40 Q-100,-148 0,-142 Q100,-148 128,-40 Q50,-98 -20,-88 Q-80,-86 -128,-40Z', HC);
  if (hk === 'curls') fr = C(-62, -118, 36, HC) + C(0, -132, 40, HC) + C(62, -118, 36, HC);
  const ears = hk === 'bob' ? '' : C(-126, 12, 24, s.sk2) + C(126, 12, 24, s.sk2);
  let head = back + ears + E(0, 0, 128, 122, s.skin);
  if (view === 'b') return G(head + (hk === 'bob' ? '' : C(0, -14, 124, HC)) + (hk === 'curls' || hk === 'buns' ? C(0, -14, 124, HC) : ''), `translate(${f1(jx)} 0)`);
  let f = E(-78, 48, 28, 18, '#ff7a6a', OP(0.35)) + E(78, 48, 28, 18, '#ff7a6a', OP(0.35)) + P('M-110,60 Q0,170 110,60 Q0,125 -110,60Z', s.sk2, OP(0.3));
  if (s.stub) f += P('M-102,36 Q0,196 102,36 Q60,104 0,108 Q-60,104 -102,36Z', '#3a2c26', OP(0.3));
  if (s.fr) f += [[-62, 34], [-46, 48], [-80, 46], [62, 34], [46, 48], [80, 46]].map(a => C(a[0], a[1], 4.5, '#b8582a')).join('');
  for (const i of [-1, 1]) {
    const ex = i * 50;
    f += E(ex + lx, 5 + ly * 0.5, 15, 22 * e, '#1a1216') + C(ex + lx + 4, 5 + ly * 0.5 - 7 * e, 5, '#fff');
    f += P(`M${ex + i * 28},${f1(-40 - rs * 20 + wr * 6 - an * 6)} Q${ex},${f1(-62 - rs * 20)} ${ex - i * 28},${f1(-44 - rs * 20 - wr * 16 + an * 14)}`, 'none', `stroke="${HC === '#d8582a' ? '#b84418' : HC}" stroke-width="10" stroke-linecap="round"`);
  }
  f += C(0, 32, 6, s.sk2);
  if (op > 0.05) f += E(0, 76, 20 + sm * 12, 8 + op * 26, '#5a1a22') + E(0, 76 + op * 16, 14, 8 + op * 8, '#e8607a');
  else f += P(`M${-28 - sm * 8},72 Q0,${f1(72 + sm * 34 - wr * 24 + 6)} ${28 + sm * 8},72`, 'none', 'stroke="#5a2a22" stroke-width="8" stroke-linecap="round"');
  if (o.cry) for (const i of [-1, 1]) { const u = (t * 1.6 + (i > 0 ? 0.4 : 0)) % 1; f += E(i * 62, 40 + u * 90, 9, 16, '#8ad0ff', OP(1 - u * 0.5)) + P(`M${i * 62 - 6},24 Q${i * 62},${f1(40 + u * 90)} ${i * 62 + 6},24Z`, '#8ad0ff', OP(0.7)); }
  if (o.sweat) f += P('M122,-50 Q142,-12 122,6 Q102,-12 122,-50Z', '#8ad0ff');
  head += view === 's' ? G(f, 'translate(42 0) scale(0.78 1)') + C(130, 30, 16, s.skin) : f;
  return G(head + fr, `translate(${f1(jx)} 0)`);
};
const BUSTP = (s, t, o, x, y, sc) => {
  o = o || {};
  let body = R(-32, 100, 64, 90, s.sk2, 'rx="24"') + P('M-232,540 Q-238,200 -100,168 L100,168 Q238,200 232,540Z', s.top) + P('M-62,168 L0,236 L62,168Z', s.sk2);
  if (s.st) body += [300, 370, 440].map(yy => R(-236, yy, 472, 22, s.top2, OP(0.55))).join('');
  if (s.hk === 'short') body += P('M-70,168 L0,236 L-96,230Z', s.top2) + P('M70,168 L0,236 L96,230Z', s.top2);
  const rim = o.rim ? P('M126,-90 Q154,0 122,80', 'none', `stroke="${o.rim}" stroke-width="10" stroke-linecap="round" opacity="0.6"`) : '';
  return G(body + HEADP(s, t, o, o.view || 'f') + rim, `translate(${f1(x + Math.sin(t * 1.1 + s.w) * 4)} ${f1(y + Math.sin(t * 2.3 + s.w) * 6)}) rotate(${f1((o.tilt || 0) + Math.sin(t * 1.4 + s.w) * 1.6)}) scale(${sc})`);
};
const FIGP = (s, o, x, y, sc) => {
  o = o || {};
  const view = o.view || 'f', walk = o.walk ? 1 : 0, ph = o.ph || 0, t = o.t || 0, bob = walk ? Math.abs(Math.sin(ph)) * 12 : Math.sin(t * 2) * 3, side = view === 's', LL = s.leg, kid = s.kid, hipY = -(LL + 10) + bob, lw = kid ? 52 : 62;
  const leg = i => { const p = ph + (i > 0 ? Math.PI : 0), col = i > 0 ? s.pants : s.pants2;
    if (side) { const a = Math.sin(p) * 0.62 * walk, lift = Math.max(0, Math.cos(p)) * 48 * walk * (LL / 290), fx = Math.sin(a) * LL, fy = hipY + Math.cos(a) * LL - lift;
      return P(`M${i * 6},${f1(hipY)} Q${f1(fx * 0.5 + 24)},${f1((hipY + fy) / 2)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="${lw}" stroke-linecap="round"`) + E(fx + 32, fy + 6, 58, 26, s.shoe); }
    const lift = Math.max(0, Math.sin(p)) * 50 * walk * (LL / 290), fx = i * 50, fy = hipY + LL - lift;
    return P(`M${i * 44},${f1(hipY)} Q${f1(i * 60)},${f1((hipY + fy) / 2)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="${lw}" stroke-linecap="round"`) + E(fx + i * 6, fy + 8, 48, 26, s.shoe); };
  const sy = hipY - 140, arm = i => { const p = ph + (i > 0 ? 0 : Math.PI), sw = walk ? Math.sin(p) * 0.7 : Math.sin(t * 1.5) * 0.08, sx = side ? 0 : i * (s.w * 0.55), AL = s.arm, up = (o.up === true || (o.up === 'r' && i > 0) || (o.up === 'l' && i < 0)) ? 1 : 0;
    const hx = side ? sx + Math.sin(sw) * AL : sx + i * 10 + Math.sin(sw) * 24 + (up ? i * 30 : 0), hy = up ? sy - AL * 0.9 : sy + AL + (side ? -Math.abs(Math.sin(sw)) * 26 : 0);
    return L(sx, sy, hx, hy, i > 0 ? s.top : s.top2, kid ? 40 : 48) + C(hx, hy + 12, kid ? 26 : 30, s.skin); };
  const tw = side ? s.w * 0.72 : s.w, th = kid ? 220 : 240, torso = R(-tw / 2, hipY - 190, tw, th, s.top, `rx="${kid ? 60 : 72}"`) + (s.st ? [0, 1].map(k => R(-tw / 2 + 4, hipY - 150 + k * 60, tw - 8, 20, s.top2, OP(0.55))).join('') : '');
  const hs = s.hs, headY = hipY - 195 - hs * 118, neck = R(-26, hipY - 215, 52, 50, s.sk2, 'rx="20"');
  const head = G(HEADP(s, t, o, view), `translate(0 ${f1(headY)}) scale(${hs})`);
  const lean = o.lean || 0;
  const str = leg(-1) + (side ? arm(-1) : '') + G(neck + torso, `rotate(${f1(lean * 0.6)} 0 ${f1(hipY)})`) + leg(1) + arm(side ? 1 : -1) + (side ? '' : arm(1)) + G(head, `rotate(${f1(lean)} 0 ${f1(hipY)})`);
  return G(str, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const RFN = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.raf, t, o, x, y, sc);
const RAFK = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.rafk, t, o, x, y, sc);
const PAI = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.pai, t, o, x, y, sc);
const MAE = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.mae, t, o, x, y, sc);
const IRM = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.irm, t, o, x, y, sc);
const PRI = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTP(SP.pri, t, o, x, y, sc);
const RFB = (o, x, y, sc) => FIGP(SP.raf, o, x, y, sc);
const RAFKB = (o, x, y, sc) => FIGP(SP.rafk, o, x, y, sc);
const PAIB = (o, x, y, sc) => FIGP(SP.pai, o, x, y, sc);
const MAEB = (o, x, y, sc) => FIGP(SP.mae, o, x, y, sc);
const IRMB = (o, x, y, sc) => FIGP(SP.irm, o, x, y, sc);
const PRIB = (o, x, y, sc) => FIGP(SP.pri, o, x, y, sc);
const SHD = (x, y, w, o = 0.3) => E(x, y, w, w * 0.14, '#6a4a2a', OP(o));
/* ---------- objetos ---------- */
const UMB = (x, y, sc, ang = 0, c1 = '#e8453c', c2 = '#fffdf4') => { let s = L(0, 0, 0, 330, '#8a6a4a', 14); for (let k = 0; k < 6; k++) { const a0 = Math.PI + k * Math.PI / 6, a1 = a0 + Math.PI / 6; s += P(`M0,0 L${f1(Math.cos(a0) * 230)},${f1(Math.sin(a0) * 230)} A230,230 0 0 1 ${f1(Math.cos(a1) * 230)},${f1(Math.sin(a1) * 230)}Z`, k % 2 ? c2 : c1); } return G(s + C(0, -232, 12, '#8a6a4a'), `translate(${f1(x)} ${f1(y)}) rotate(${ang}) scale(${sc})`); };
const CAST = (x, y, sc, grow = 1) => G(R(-110, -190, 220, 190, '#e6b866', 'rx="10"') + R(-180, -150, 76, 150, '#e6b866', 'rx="10"') + R(104, -150, 76, 150, '#e6b866', 'rx="10"') + [-170, -140, -110, 114, 144, 164].map(xx => R(xx, -176, 24, 28, '#e6b866')).join('') + [-100, -50, 0, 50, 90].map(xx => R(xx, -216, 28, 28, '#e6b866')).join('') + P('M-40,0 L-40,-70 Q0,-120 40,-70 L40,0Z', '#b8863a') + R(-180, -60, 76, 12, '#c99a48') + L(0, -216, 0, -300, '#8a6a4a', 6) + P('M0,-300 L70,-278 L0,-256Z', '#e8453c'), `translate(${f1(x)} ${f1(y)}) scale(${sc} ${f1(sc * Math.max(0.01, grow))})`);
const BUCK = (x, y, sc, rot = 0) => G(L(10, -40, 120, -150, '#ffd23a', 14) + P('M-72,-80 L72,-80 L56,62 L-56,62Z', '#e8453c') + R(-78, -94, 156, 24, '#c0302a', 'rx="10"') + P('M-60,-94 Q0,-190 60,-94', 'none', 'stroke="#8a2a20" stroke-width="9"') + R(-50, -30, 100, 14, '#ff8a7a', OP(0.5)), `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sc})`);
const CAMR = (x, y, sc, fl = 0) => G(R(-110, -70, 220, 140, '#3a3a46', 'rx="22"') + R(-50, -102, 100, 40, '#2a2a34', 'rx="12"') + C(0, 0, 54, '#1a1a22') + C(0, 0, 36, '#4a6a9a') + C(-12, -12, 10, '#fff') + R(62, -96, 44, 26, '#ffd36a', 'rx="6"') + (fl > 0 ? C(0, 0, 320 * fl, '#fffbe0', OP(0.85 * fl)) : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const WVB = (t, k, col = '#2a9ad0') => { const y0 = 1350 - k * 850; let foam = ''; for (let i = 0; i < 10; i++) foam += C(i * 130 - 40, y0 - 30 + Math.sin(t * 3 + i) * 14 + (i % 2) * 24, 44 + hz(i, 2) * 30, '#fff', OP(0.92)); return P(`M-100,2000 L-100,${f1(y0 + 220)} Q200,${f1(y0 - 120)} 540,${f1(y0)} Q860,${f1(y0 + 40)} 1180,${f1(y0 + 300)} L1180,2000Z`, col) + P(`M-100,2000 L-100,${f1(y0 + 320)} Q300,${f1(y0 + 120)} 600,${f1(y0 + 160)} Q900,${f1(y0 + 200)} 1180,${f1(y0 + 420)} L1180,2000Z`, '#4cb8e6', OP(0.7)) + foam; };
const BEACHL = (Pf, t) => {
  const wv = (y, amp, col, sp, ph) => { let d = `M-100,${y}`; for (let x = -100; x <= 1200; x += 60) d += ` Q${x + 30},${f1(y + Math.sin(t * sp + x * 0.02 + ph) * amp - amp)} ${x + 60},${y}`; return P(d + ' L1200,2000 L-100,2000Z', col); };
  let dots = ''; for (let i = 0; i < 16; i++) dots += C(hz(i, 7) * 1100, 1380 + hz(i, 8) * 520, 5, '#dcb468', OP(0.7));
  return [{ d: 0.05, svg: SKYE('day', 1000) + glow(Pf, 'F', 760, 520, 700, 0.55) + C(760, 480, 110, '#fff6c0', OP(0.95)) + NUV(((t * 8 + 200) % 1500) - 200, 300, 1.3, 0.8) + NUV(((t * 5 + 700) % 1500) - 200, 520, 1.0, 0.7) },
    { d: 0.25, svg: R(-200, 900, 1600, 400, '#4fc3e8') + wv(930, 14, '#7fd8f0', 1.6, 0) + wv(1010, 18, '#3aa8d8', 1.2, 2) },
    { d: 0.55, svg: wv(1130, 12, '#b8ecf8', 1.0, 1) + P(`M-100,1250 Q540,${f1(1210 + Math.sin(t * 1.2) * 8)} 1200,1250 L1200,2000 L-100,2000Z`, '#f6dc9c') },
    { d: 0.9, svg: R(-200, 1330, 1600, 700, '#f2d28c') + dots }];
};
const LUNCHL = (Pf, t) => [
  { d: 0.05, svg: R(-100, -100, 1280, 2200, '#ffe2c0') + R(-100, 1360, 1280, 700, '#c8946a') + glow(Pf, 'F', 800, 500, 800, 0.4) },
  { d: 0.25, svg: R(600, 220, 380, 520, '#9fdcf8', `rx="8"`) + C(840, 340, 60, '#fff6c0') + R(600, 220, 380, 520, 'none', `stroke="#fff" stroke-width="18"`) + L(790, 220, 790, 740, '#fff', 14) + L(600, 480, 980, 480, '#fff', 14) + P('M560,200 Q640,500 580,800 L520,800 L520,200Z', '#ff8a7a') + P('M1020,200 Q940,500 1000,800 L1060,800 L1060,200Z', '#ff8a7a') + R(110, 300, 260, 200, '#fff', `rx="8"`) + R(130, 320, 220, 160, '#bfe8d0') + C(240, 400, 30, '#ffd23a') + R(110, 300, 260, 200, 'none', 'stroke="#8a5a34" stroke-width="14"') },
  { d: 0.9, svg: R(-100, 1440, 1280, 90, '#8a5a34') + R(-100, 1500, 1280, 500, '#ff9a8a') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => R(-100 + i * 110, 1500, 55, 500, '#fff', OP(0.5))).join('') + E(260, 1450, 130, 26, '#fff') + E(820, 1450, 130, 26, '#fff') + P('M520,1450 L520,1330 Q560,1290 600,1330 L600,1450Z', '#7ac0f0') + C(380, 1420, 34, '#e8453c') + C(720, 1424, 30, '#ffd23a') }];
const MEMS = (t, o = {}) => { const g = o.grow == null ? 1 : o.grow; let w = ''; for (let i = 0; i < 6; i++) w += P(`M${i * 120 - 60},232 Q${i * 120},${f1(220 + Math.sin(t * 2 + i) * 8)} ${i * 120 + 60},232`, 'none', 'stroke="#fff" stroke-width="5" opacity="0.8"');
  return R(0, 0, 600, 380, '#bfe8f8') + C(500, 70, 40, '#fff6c0') + R(0, 170, 600, 70, '#4fc3e8') + w + R(0, 230, 600, 160, '#f2d28c') + UMB(120, 110, 0.5) + CAST(360, 330, 0.55, g) + G(BUSTP(SP.rafk, t, { sm: 1 }, 0, 0, 0.3), 'translate(250 300)') + (o.ghost ? R(0, 0, 600, 380, '#fff', OP(o.ghost)) : ''); };
const MEMCL = (x, y, sc, t, o = {}) => THINK(x, y, sc, `<svg x="-225" y="-150" width="450" height="300" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">${MEMS(t, o)}</svg>`, t);
const FOTO = (t) => R(0, 0, 440, 440, '#cfeaf8') + C(360, 70, 34, '#fff6c0') + R(0, 190, 440, 50, '#4fc3e8') + R(0, 240, 440, 200, '#efd090') + UMB(330, 130, 0.42) + BUSTP(SP.pai, t, { sm: 0.7 }, 150, 290, 0.38) + BUSTP(SP.pri, t, { sm: 0.5 }, 214, 322, 0.24) + R(0, 0, 440, 440, '#b8803a', OP(0.22));
const POL = (x, y, sc, rot, inner) => G(R(-250, -290, 500, 600, '#fffdf4', 'rx="14"') + `<svg x="-220" y="-260" width="440" height="440" viewBox="0 0 440 440">${inner}</svg>`, `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sc})`, '');
const SPB = (x, y, sc, txt, sz = 90, tail = -1) => { const w = Math.max(240, txt.length * sz * 0.4 + 90); return G(E(0, 0, w / 2, sz * 0.9, '#fff', `stroke="${IKX}" stroke-width="8"`) + P(`M${tail * 70},${f1(sz * 0.8)} L${tail * 120},${f1(sz * 1.6)} L${tail * 10},${f1(sz * 0.85)}Z`, '#fff', `stroke="${IKX}" stroke-width="8" stroke-linejoin="round"`) + E(0, 0, w / 2 - 6, sz * 0.9 - 6, '#fff') + TXE(txt, 0, sz * 0.3, sz, 9, IKX, { stroke: '#fff' }), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const BULB = (x, y, sc, on = 1) => G(glow('', 'F', 0, 0, 260, 0.6 * on) + C(0, 0, 80, on ? '#ffe566' : '#ddd', `stroke="${IKX}" stroke-width="8"`) + R(-34, 70, 68, 60, '#9a9aa6', `rx="10" stroke="${IKX}" stroke-width="7"`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const BXC = (x, y, sc, on = 1) => G(L(-90, -90, 90, 90, '#ff3a4a', 34) + L(90, -90, -90, 90, '#ff3a4a', 34), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc * on)})`);
const QMK = (x, y, sc, t, col = '#6a7ae8') => TXE('?', x, y + Math.sin(t * 3) * 14, sc, 9, col, { stroke: IKX });
const SPDX = (t, n = 8, col = '#fff') => { let s = ''; for (let i = 0; i < n; i++) { const y = 300 + hz(i, 3) * 1300, x = ((t * 1400 + hz(i, 4) * 1500) % 1700) - 300; s += R(x, y, 260 + hz(i, 5) * 200, 8, col, OP(0.55)); } return s; };
const PBX = (a, b, Pf) => BIG(a) + C(180, 300, 520, b, OP(0.55)) + C(940, 1500, 640, b, OP(0.45)) + glow(Pf, 'F', 540, 700, 800, 0.3);

const STAMPX = (x, y, sc, txt, col = '#e8453c', rot = -10) => G(R(-250, -70, 500, 140, 'rgba(255,255,255,0.85)', `rx="20" stroke="${col}" stroke-width="12"`) + TXE(txt, 0, 38, 110, 9, col, { stroke: 'none' }), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${f1(sc)})`);
const CARP = (Pf, t, x, y, sc, speed = 1) => { const bob = Math.sin(t * 14) * 3 * speed, id = Pf + 'cw', wh = xx => G(C(0, 0, 62, '#2a2230') + C(0, 0, 34, '#cfd4dc') + [0, 1, 2, 3].map(i => L(0, 0, Math.cos(i * 0.785 + t * speed * 10) * 34, Math.sin(i * 0.785 + t * speed * 10) * 34, '#8a8f9a', 6)).join(''), `translate(${xx} 40)`);
  return G(`<defs><clipPath id="${id}"><path d="M-170,-80 L-135,-185 L110,-185 L170,-80Z"/></clipPath></defs>` + R(-70, -262, 150, 62, '#c8783a', 'rx="10"') + R(-30, -280, 70, 22, 'none', 'rx="8" stroke="#8a4a1a" stroke-width="8"') + P('M-170,-80 L-135,-185 L110,-185 L170,-80Z', '#bfe8f8') + G(BUSTP(SP.pai, t, { sm: 0.8 }, -80, -115, 0.26) + BUSTP(SP.mae, t + 1, { sm: 0.8 }, 30, -115, 0.26) + BUSTP(SP.rafk, t + 2, { sm: 1 }, 118, -100, 0.2), '', `clip-path="url(#${id})"`) + P('M-185,-80 L-140,-200 L120,-200 L185,-80 L170,-80 L110,-185 L-135,-185 L-170,-80Z', '#e8453c') + P('M-260,-70 Q-260,-100 -220,-100 L190,-100 Q260,-90 270,-30 L270,40 L-260,40Z', '#e8453c') + R(-260, -20, 530, 12, '#c0302a') + C(252, -34, 16, '#ffe566') + wh(-150) + wh(150), `translate(${f1(x)} ${f1(y + bob)}) scale(${sc})`); };
const BAL = (x, y, sc, col, txt, t) => G(P('M0,90 Q-20,200 10,300', 'none', 'stroke="#8a8a9a" stroke-width="5"') + E(0, 0, 70, 90, col) + E(-24, -30, 14, 22, '#fff', OP(0.5)) + P('M-10,90 L10,90 L0,104Z', col) + TXE(txt, 0, 36, 110, 9, '#fff', { stroke: IKX }), `translate(${f1(x + Math.sin(t * 2 + sc) * 12)} ${f1(y)}) scale(${sc})`);
const GULL = (x, y, sc, t) => { const s = Math.sin(t * 9 + x); return G(P(`M-46,0 Q-22,${f1(-34 * s - 10)} 0,0 Q22,${f1(-34 * s - 10)} 46,0`, 'none', `stroke="#fff" stroke-width="9" stroke-linecap="round"`) + P(`M-46,0 Q-22,${f1(-34 * s - 10)} 0,0 Q22,${f1(-34 * s - 10)} 46,0`, 'none', `stroke="#9aa4b8" stroke-width="3" stroke-linecap="round"`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const DUST = (t, x, y, u, n = 60, w = 440, h = 520) => { let s = ''; for (let i = 0; i < n; i++) { const a = Math.max(0, 1 - u * (0.6 + hz(i, 7) * 0.8)); s += R(x + (hz(i, 1) - 0.5) * w + u * u * 700 * (hz(i, 5) + 0.3), y + (hz(i, 2) - 0.5) * h - u * 420 * hz(i, 6), 22, 22, ['#cfeaf8', '#efd090', '#e8453c', '#fff'][i % 4], OP(a) + ` transform="rotate(${f1(u * 300 * hz(i, 3))} ${f1(x + (hz(i, 1) - 0.5) * w)} ${f1(y + (hz(i, 2) - 0.5) * h)})"`); } return s; };
const ROADL = (Pf, t, sp = 1) => { let hl = '', tr = ''; for (let i = 0; i < 5; i++) hl += E(((i * 520 - t * 40 * sp) % 2600 + 2600) % 2600 - 300, 1060, 420, 200, '#8ad07a'); for (let i = 0; i < 6; i++) { const xx = ((i * 430 - t * 300 * sp) % 2580 + 2580) % 2580 - 300; tr += R(xx - 14, 1180, 28, 200, '#8a5a34') + C(xx, 1150, 90, '#4cb04c') + C(xx - 30, 1120, 50, '#6cd06c', OP(0.6)); } let ds = ''; for (let i = 0; i < 6; i++) ds += R(((i * 300 - t * 900 * sp) % 1800 + 1800) % 1800 - 300, 1540, 150, 16, '#fff');
  return [{ d: 0.05, svg: SKYE('day', 1000) + glow(Pf, 'F', 760, 520, 700, 0.5) + C(760, 480, 100, '#fff6c0') + NUV(((t * 8 + 200) % 1500) - 200, 300, 1.3, 0.8) + NUV(((t * 5 + 700) % 1500) - 200, 560, 1.0, 0.7) }, { d: 0.25, svg: hl + R(-200, 1060, 1600, 500, '#8ad07a') }, { d: 0.6, svg: tr }, { d: 0.9, svg: R(-100, 1400, 1300, 300, '#5a5a66') + ds + R(-100, 1700, 1300, 300, '#7ac86a') }]; };
const PROJ = (x, y, sc, t) => G([0, 1].map(i => C(-60 + i * 110, -118, 56, '#3a3a4a') + [0, 1, 2].map(k => L(-60 + i * 110, -118, -60 + i * 110 + Math.cos(t * 5 + k * 2.09) * 44, -118 + Math.sin(t * 5 + k * 2.09) * 44, '#8a8a9a', 8)).join('')).join('') + R(-140, -70, 280, 150, '#5a5a6a', 'rx="16"') + R(140, -34, 60, 70, '#3a3a4a', 'rx="8"') + C(205, 0, 22, '#fff6c0') + L(-80, 80, -110, 170, '#3a3a4a', 14) + L(80, 80, 110, 170, '#3a3a4a', 14), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const EARX = (x, y, sc) => G(P('M-70,-120 Q-140,-60 -90,40 Q-60,110 -10,120 Q40,125 50,80 Q60,40 20,20 Q80,-20 70,-80 Q50,-150 -70,-120Z', '#e8b690') + P('M-40,-70 Q-90,-20 -50,40 Q-20,70 10,60', 'none', 'stroke="#c98f6a" stroke-width="12" stroke-linecap="round"'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
