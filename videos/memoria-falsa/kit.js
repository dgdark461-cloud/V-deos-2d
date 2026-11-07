/* kit.js - Rafael 3h12: motor + arte (apartamento noturno, celular, olho mágico). Paleta: azul-noite, ciano de tela, vermelho de alerta, mostarda do moletom. */
const ez = x => { x = cl(x); return x * x * (3 - 2 * x); };
const SNP = (c, start, fin, fn) => c.add(start, fin, (t, lt, Pf) => defsC(Pf) + X(Pf, fn(t, lt, Pf)));
const FB = (c, a) => a > 0.005 ? R(-300, -300, 1680, 2520, c, OP(a)) : '';
const BIG = (col, a = 1) => R(-400, -400, 1880, 2720, col, OP(a));
const lp = (a, b, u) => a + (b - a) * u;
const CM = (Pf, t, s, lt, dur, o = {}) => { const u = ez(Math.min(1, lt / dur)), q = (a, b, d) => a === undefined ? d : (b === undefined ? a : a + (b - a) * u); return camG(t, q(o.x0, o.x1, 540), q(o.y0, o.y1, 960), q(o.z0, o.z1, 1), q(o.r0, o.r1, 0) + 0.35 * Math.sin(t * 1.7), o.shk === undefined ? 2 : o.shk, s) + vignette(Pf, 1) + grain(t, 0.08); };
const PUNCH = (lt, a = 0.5, col = '#fff') => FB(col, a * Math.exp(-lt * 16));
const MK = (c) => {
  const E_ = ez;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  /* sh: plano com câmera + soco de luz + corte com separação RGB opcional (glitch no primeiro 0.12 s) */
  const sh = (s0, dur, o, fn, pf) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + GLCH(lt, o.gl === undefined ? 1 : o.gl) + (pf === 0 ? '' : PUNCH(lt, pf === undefined ? 0.3 : pf, typeof pf === 'string' ? pf : '#fff')));
  return { SN, sh, mb, E_ };
};
/* faixas de glitch no começo de cada corte (dá a sensação de gravação/celular) */
const GLCH = (lt, k = 1) => { if (lt > 0.14 || k <= 0) return ''; const a = (1 - lt / 0.14) * k; let s = ''; for (let i = 0; i < 5; i++) { const y = hz(i, 7) * 1920, h = 14 + hz(i, 9) * 90; s += R(-20, y, 1120, h, i % 2 ? '#6fd2ff' : '#ff3b6a', OP(0.22 * a)); } return s; };
const TXP = (txt, x, y, sz, lt, col = '#fff', o = {}) => { const u = ez(lt / (o.dur || 0.22)); if (u <= 0) return ''; return G(TXT(0, 0, txt, sz, col, `stroke="#05080b" stroke-width="${f1(sz * 0.12)}" paint-order="stroke" stroke-linejoin="round"`), `translate(${f1(x)} ${f1(y + (1 - u) * 40)}) scale(${f1(0.7 + 0.3 * u)})`, OP(u)); };

/* ------------------------------------------------------------------ personagem: Rafael */
const SKIN = '#dfae8a', SKSH = '#b5806a', HAIRR = '#1a1820', HOOD = '#d9a441', HOODSH = '#a87a28';
function RFACE(t, o = {}) {
  const d = Object.assign({ eye: 1, lookx: 0, looky: 0, worry: 0.3, mouth: 0, smile: 0, sweat: 0, trem: 0, glow: 0, gl: 1, tilt: 0 }, o);
  const bl = (t % 3.7) < 0.12 ? 0.12 : 1, ey = Math.min(1.5, d.eye) * bl;
  const sx = d.trem ? H.noise(t * 40, 5) * 4 * d.trem : 0, br = Math.sin(t * 1.6) * 3;
  const lx = d.lookx * 14, ly = d.looky * 10;
  const eye = (cx) => G(E(0, 0, 36, 30 * ey + 2, '#f6f6f2', 'stroke="#05080b" stroke-width="3"') + C(lx, ly, 15 * (0.8 + 0.2 * Math.min(1.3, d.eye)), '#2b1d16') + C(lx, ly, 7, '#05080b') + C(lx + 5, ly - 5, 4, '#fff'), `translate(${cx} 0)`);
  let s = '';
  s += P('M-92,150 Q-110,260 -170,330 L170,330 Q110,260 92,150Z', HOOD) + P('M-92,150 Q0,215 92,150 L92,175 Q0,250 -92,175Z', HOODSH) + P('M-30,215 L-34,320 M30,215 L34,320', 'none', 'stroke="#f3e2b0" stroke-width="6" stroke-linecap="round"');
  s += R(-42, 100, 84, 70, SKSH, 'rx="20"');
  s += E(-142, 10, 22, 36, SKIN) + E(142, 10, 22, 36, SKIN);
  s += P('M-140,-20 Q-150,-150 0,-170 Q150,-150 140,-20 Q150,90 70,150 Q0,185 -70,150 Q-150,90 -140,-20Z', SKIN, 'stroke="#05080b" stroke-width="3"');
  s += P('M-150,-30 Q-170,-175 0,-190 Q170,-175 150,-30 Q135,-95 90,-115 Q40,-85 -20,-110 Q-85,-95 -110,-60 Q-135,-50 -150,-30Z', HAIRR);
  s += P('M-110,-118 Q-40,-170 40,-150', 'none', 'stroke="#3a3744" stroke-width="5" stroke-linecap="round"');
  s += eye(-62) + eye(62);
  const wt = d.worry * 12, aw = 1 - ey * 0;
  s += P(`M-100,${-62 - wt * 0.3 - (ey - 1) * 14} Q-62,${-82 - (ey - 1) * 14} -28,${-62 + wt}`, 'none', `stroke="${HAIRR}" stroke-width="9" stroke-linecap="round"`) + P(`M100,${-62 - wt * 0.3 - (ey - 1) * 14} Q62,${-82 - (ey - 1) * 14} 28,${-62 + wt}`, 'none', `stroke="${HAIRR}" stroke-width="9" stroke-linecap="round"`);
  /* óculos */
  s += R(-108, -52, 92, 70, 'rgba(160,220,255,' + (0.1 + 0.22 * d.glow) + ')', 'rx="26" stroke="#0c0e14" stroke-width="7"') + R(16, -52, 92, 70, 'rgba(160,220,255,' + (0.1 + 0.22 * d.glow) + ')', 'rx="26" stroke="#0c0e14" stroke-width="7"') + L(-16, -26, 16, -26, '#0c0e14', 6) + P('M-84,-40 L-52,-18', 'none', 'stroke="rgba(255,255,255,0.4)" stroke-width="6" stroke-linecap="round"');
  s += P('M-8,0 Q0,28 14,26', 'none', `stroke="${SKSH}" stroke-width="6" stroke-linecap="round"`);
  const mo = d.mouth;
  s += mo > 0.05 ? E(0, 92, 32 + 8 * mo, 6 + 30 * mo, '#4a1620', 'stroke="#05080b" stroke-width="3"') + (mo > 0.25 ? R(-24, 78, 48, 9, '#f6f6f2') : '') : P(`M-34,${96 + 4 * d.worry - 14 * d.smile} Q0,${88 + 10 * d.smile - 4 * d.worry} 34,${96 + 4 * d.worry - 14 * d.smile}`, 'none', 'stroke="#6a2e2e" stroke-width="6" stroke-linecap="round"');
  s += P('M-84,100 Q0,150 84,100 Q60,142 0,146 Q-60,142 -84,100Z', '#0b0b10', OP(0.12));
  if (d.sweat > 0) s += P('M118,-40 Q130,-8 118,6 Q104,-8 118,-40Z', '#bfe6ff', OP(0.9 * d.sweat) + ' stroke="#fff" stroke-width="2"');
  return G(s, `translate(${f1(sx)} ${f1(br)}) rotate(${d.tilt})`);
}
const RF = (t, o, x = 540, y = 960, sc = 2.6) => G(RFACE(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* corpo inteiro (view 'b' costas | 'f' frente) 0,0 = pés; altura ~ 520 */
function RBODY(o = {}) {
  const d = Object.assign({ t: 0, view: 'b', walk: 0, ph: 0, armR: 0, armL: 0, phone: 0, crouch: 0, lean: 0 }, o);
  const sw = d.walk ? Math.sin(d.ph) * 26 : 0, bob = d.walk ? Math.abs(Math.sin(d.ph)) * 6 : Math.sin(d.t * 1.6) * 2;
  let s = R(-150, 0, 300, 12, '#000', OP(0.4) + ' rx="6"');
  s += R(-50 + sw * 0.5, -250, 44, 250, '#232c44', 'rx="12"') + R(6 - sw * 0.5, -250, 44, 250, '#2b3652', 'rx="12"') + R(-56 + sw * 0.5, -14, 56, 18, '#16181e', 'rx="8"') + R(2 - sw * 0.5, -14, 56, 18, '#16181e', 'rx="8"');
  const ty = -250 - bob - d.crouch * 60;
  s += G(P('M-82,0 Q-96,-150 -64,-230 L64,-230 Q96,-150 82,0Z', HOOD) + (d.view === 'b' ? P('M-40,-226 Q0,-190 40,-226 L52,-200 Q0,-150 -52,-200Z', HOODSH) : P('M-30,-226 L-34,-120 M30,-226 L34,-120', 'none', 'stroke="#f3e2b0" stroke-width="5"') + R(-52, -90, 104, 52, HOODSH, 'rx="12"')), `translate(0 ${f1(ty + 0)})`);
  const ay = ty - 190;
  const arm = (sx, a) => G(R(-18, 0, 36, 150, HOOD, 'rx="16"') + C(0, 156, 20, SKIN), `translate(${sx} ${f1(ay + 14)}) rotate(${f1(a)})`);
  s += arm(-82, 8 + d.armL) + arm(82, -8 + d.armR);
  s += G(C(0, 0, 56, d.view === 'b' ? HAIRR : SKIN) + (d.view === 'b' ? '' : P('M-56,-8 Q-40,-62 0,-60 Q40,-62 56,-8 Q20,-34 -56,-8Z', HAIRR) + C(-20, 4, 6, '#05080b') + C(20, 4, 6, '#05080b')), `translate(0 ${f1(ty - 280)})`);
  return G(s, `rotate(${d.lean})`);
}
const RB = (o, x, y, sc) => G(RBODY(o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);

/* ------------------------------------------------------------------ luz: lanterna (revela a cena dentro do cone) */
const FLASHLIGHT = (Pf, scene, x, y, ang, len = 1500, spr = 0.3, dark = 0.93) => {
  const a1 = ang - spr, a2 = ang + spr, X1 = x + Math.cos(a1) * len, Y1 = y + Math.sin(a1) * len, X2 = x + Math.cos(a2) * len, Y2 = y + Math.sin(a2) * len;
  const defs = `<defs><filter id="${Pf}fb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter><mask id="${Pf}fm" maskUnits="userSpaceOnUse" x="-400" y="-400" width="1880" height="2720"><rect x="-400" y="-400" width="1880" height="2720" fill="#fff"/><g filter="url(#${Pf}fb)"><polygon points="${f1(x)},${f1(y)} ${f1(X1)},${f1(Y1)} ${f1(X2)},${f1(Y2)}" fill="#000"/><circle cx="${f1(x)}" cy="${f1(y)}" r="70" fill="#000"/></g></mask></defs>`;
  return defs + scene + `<rect x="-400" y="-400" width="1880" height="2720" fill="#02040a" ${OP(dark)} mask="url(#${Pf}fm)"/>` + `<polygon points="${f1(x)},${f1(y)} ${f1(X1)},${f1(Y1)} ${f1(X2)},${f1(Y2)}" fill="#fff6d0" ${OP(0.1)}/>` + glow(Pf, 'W', x, y, 120, 0.7);
};

/* ------------------------------------------------------------------ cenários */
const WALLN = (Pf, t, o = {}) => R(-400, -400, 1880, 2720, o.wall || '#101a2c') + R(-400, 1500, 1880, 800, o.floor || '#0a1019') + R(-400, 1490, 1880, 14, '#060a11') + R(-400, 1460, 1880, 30, '#18243a');
const WINDOWN = (Pf, t, x, y, sc, o = {}) => G(R(-170, -230, 340, 460, '#050a14', 'stroke="#1b2a42" stroke-width="16"') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(-150 + (i % 4) * 78, -190 + Math.floor(i / 4) * 150 + (i % 3) * 10, 40, 60, hz(i, Math.floor(t * 0.4)) > 0.6 ? '#ffd88a' : '#17233a', OP(0.7))).join('') + L(0, -230, 0, 230, '#1b2a42', 12) + L(-170, 0, 170, 0, '#1b2a42', 12) + (o.open ? '' : '') + glow('', 'B', 0, 0, 300, 0.0), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* mesa com monitor aceso */
const DESKN = (Pf, t, o = {}) => WALLN(Pf, t, o) + WINDOWN(Pf, t, 260, 640, 1.2) + R(-300, 1180, 1680, 520, '#1a1410') + R(-300, 1180, 1680, 22, '#2a2018') +
  G(R(-250, -170, 500, 320, '#06090e', 'rx="14" stroke="#10151c" stroke-width="12"') + R(-232, -152, 464, 284, '#0d2a3c') + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => R(-210, -130 + i * 28, 40 + hz(i, 2) * 260, 10, i % 3 ? '#6fd2ff' : '#7dffb0', OP(0.55))).join('') + R(-28, 150, 56, 110, '#10151c') + R(-110, 258, 220, 16, '#10151c'), `translate(700 ${f1(930)})`) +
  glow(Pf, 'B', 700, 930, 700, 0.35 + 0.06 * Math.sin(t * 9)) + R(380, 1170, 640, 26, '#0e1218', 'rx="8"') + R(300, 1150, 90, 90, '#d6d0c4', 'rx="10"');
/* porta de entrada vista de dentro, com olho mágico */
const DOORN = (Pf, t, x, y, sc, o = {}) => {
  const k = o.knock || 0, sh = k ? H.noise(t * 60, 3) * 7 * k : 0;
  return G(R(-210, -520, 420, 1040, '#2c2218', 'rx="8" stroke="#0a0a0a" stroke-width="14"') + R(-170, -470, 340, 400, '#35291d', 'rx="6" stroke="#1a130c" stroke-width="6"') + R(-170, -30, 340, 440, '#35291d', 'rx="6" stroke="#1a130c" stroke-width="6"') +
    C(0, -250, 22, '#8a8f98', 'stroke="#05080b" stroke-width="5"') + C(0, -250, 9, o.peep ? '#9fd0ff' : '#05080b') + R(130, -40, 40, 12, '#b8bcc4', 'rx="6"') + C(150, 10, 18, '#b8bcc4') + L(110, -160, 160, -160, '#b8bcc4', 7) + C(110, -160, 10, '#b8bcc4') +
    (o.strip === 0 ? '' : R(-200, 500, 400, 14, '#fff2c0', OP((o.strip === undefined ? 0.7 : o.strip) * (0.8 + 0.2 * Math.sin(t * 17))))) + (o.mark ? TXT(0, -380, '12', 54, '#b8bcc4') : ''), `translate(${f1(x + sh)} ${f1(y)}) scale(${sc})`);
};
/* corredor do prédio visto pelo olho mágico (fisheye) */
const PEEPV = (Pf, t, o = {}) => {
  const fl = Math.sin(t * 23) > 0.85 ? 0.4 : 1;
  let s = `<defs><clipPath id="${Pf}pk"><circle cx="540" cy="960" r="${f1(o.r || 470)}"/></clipPath></defs>` + BIG('#000');
  let in_ = R(0, 0, 1080, 1920, '#2a4560') + P('M0,0 L420,640 L420,1300 L0,1920Z', '#2f4d6c') + P('M1080,0 L660,640 L660,1300 L1080,1920Z', '#254058') + R(420, 640, 240, 660, '#10202f') + P('M0,1920 L420,1300 L660,1300 L1080,1920Z', '#1c3149') + P('M0,0 L420,640 L660,640 L1080,0Z', '#3a5a7a');
  in_ += R(470, 740, 140, 560, '#0f1b2b') + R(120, 560, 120, 380, '#1b2c42', 'stroke="#05080b" stroke-width="6"') + R(840, 560, 120, 380, '#1b2c42', 'stroke="#05080b" stroke-width="6"') + glow(Pf, 'F', 540, 140, 320, 0.45 * fl) + R(500, 90, 80, 14, '#fff2c0', OP(0.85 * fl));
  in_ += (o.fig ? o.fig : '') + R(0, 0, 1080, 1920, '#000', OP(0.15 + (fl < 1 ? 0.3 : 0)));
  s += `<g clip-path="url(#${Pf}pk)">${G(in_, `translate(540 960) scale(${o.z || 1.15}) translate(-540 -960)`)}</g>` + C(540, 960, o.r || 470, 'none', 'stroke="#0a0a0a" stroke-width="40"') + C(540, 960, (o.r || 470) + 20, 'none', 'stroke="#8a8f98" stroke-width="14"') + P(`M${540 - (o.r || 470)},960 a${o.r || 470},${o.r || 470} 0 0 1 ${2 * (o.r || 470)},0`, 'none', 'stroke="rgba(255,255,255,0.08)" stroke-width="28"');
  return s;
};
/* cozinha */
const KITCHN = (Pf, t, o = {}) => {
  const op = o.open === undefined ? 0 : o.open;
  const cur = Math.sin(t * 1.7) * 20 * op + Math.sin(t * 4) * 6 * op;
  return WALLN(Pf, t, { wall: '#0f1a28' }) + R(-300, 300, 1680, 330, '#0b131e') + [0, 1, 2, 3].map(i => R(-60 + i * 330, 340, 300, 250, '#16253a', 'rx="8" stroke="#0a111b" stroke-width="6"') + C(220 + i * 330, 540, 10, '#8a8f98')).join('') + R(-300, 1230, 1680, 270, '#162236') + R(-300, 1215, 1680, 26, '#26364f') +
    G(R(-130, -310, 260, 620, '#e0e6ec', 'rx="18" stroke="#05080b" stroke-width="10"') + R(-130, -40, 260, 10, '#aeb6c0') + R(94, -250, 14, 100, '#8a8f98', 'rx="6"') + R(94, 10, 14, 120, '#8a8f98', 'rx="6"') + R(-130, -310, 260, 620, '#0a1830', OP(0.55)), 'translate(130 1180)') +
    G(R(-190, -260, 380, 520, '#02050b', 'stroke="#27384f" stroke-width="18"') + glow(Pf, 'B', 0, 0, 340, 0.25) + [0, 1, 2, 3, 4].map(i => R(-160 + i * 70, -180 + (i % 2) * 60, 30, 50, hz(i, 4) > 0.5 ? '#ffd88a' : '#162338', OP(0.6))).join('') + L(0, -260, 0, 260, '#27384f', 14) +
      G(R(-100, -260, 200, 520, '#8fd0ff', OP(0.0)), '') + P(`M-190,-260 L${f1(-190 + 30 + cur)},${f1(-260)} L${f1(-120 + cur * 2)},${f1(60)} L${f1(-190)},${f1(260)}Z`, '#1f3250', OP(op * 0.9)), 'translate(790 770)') +
    (op > 0 ? P(`M610,520 Q${f1(640 + cur)},790 610,1030 L690,1030 Q${f1(710 + cur)},790 690,520Z`, '#223a5c', OP(0.7 * op)) : '') + (o.extra || '');
};
/* sala: sofá (+ figura atrás) */
const LIVINGN = (Pf, t, o = {}) => WALLN(Pf, t, { wall: '#0e1828' }) + WINDOWN(Pf, t, 800, 620, 1.1) + R(100, 1000, 880, 120, '#05080d', 'rx="10"') + R(-120, 1180, 1320, 320, '#0b1522') +
  (o.fig ? o.fig : '') +
  G(R(-330, -120, 660, 240, '#2a3a58', 'rx="34"') + R(-370, -70, 90, 230, '#22314c', 'rx="34"') + R(280, -70, 90, 230, '#22314c', 'rx="34"') + R(-300, 60, 600, 100, '#1e2c46', 'rx="22"') + [-1, 0, 1].map(i => R(i * 200 - 90, -90, 180, 120, '#33466a', 'rx="22"')).join(''), 'translate(540 1330)') + (o.over || '') + R(-400, -400, 1880, 2720, '#050a14', OP(o.dark === undefined ? 0.35 : o.dark));
/* corredor interno do apartamento com a porta do quarto */
const BEDDOORN = (Pf, t, o = {}) => {
  const op = o.open || 0, bw = 300 * (0.15 + 0.85 * op);
  return WALLN(Pf, t, { wall: '#0f1a2a' }) + P('M-400,1500 L1480,1500 L1480,1920 L-400,1920Z', '#080d15') +
    G(R(-170, -430, 340, 860, '#2a2018', 'stroke="#0a0a0a" stroke-width="14"') + R(-150, -410, 300, 820, '#02050a') + glow(Pf, 'B', 0, 0, 380, 0.25 * op) +
    (op > 0.02 ? P(`M-150,-410 L${f1(-150 + 300 * (1 - op * 0.25))},${f1(-410 + 30 * op)} L${f1(-150 + 300 * (1 - op * 0.25))},${f1(410 - 30 * op)} L-150,410Z`, '#3a2c1f', 'stroke="#0a0a0a" stroke-width="8"') : R(-150, -410, 300, 820, '#3a2c1f')) +
    (o.slit ? R(-150 + 300 - 14, -410, 14, 820, '#9fd0ff', OP(0.5 * (o.slit))) : '') + (o.eyes ? eyesPair(Pf, -40, -40, 0.9, '#e8f4ff', o.eyes, 40) : ''), `translate(540 ${f1(1080)})`) + (o.over || '');
};
/* fundo do corredor, longo, com silhueta */
const HALLN = (Pf, t, o = {}) => {
  const z = o.z || 0;
  return BIG('#060a11') + P('M0,0 L400,560 L680,560 L1080,0Z', '#101c2e') + P('M0,1920 L400,1380 L680,1380 L1080,1920Z', '#0a111b') + P('M0,0 L400,560 L400,1380 L0,1920Z', '#0d1827') + P('M1080,0 L680,560 L680,1380 L1080,1920Z', '#0d1827') + R(400, 560, 280, 820, '#02050a') + glow(Pf, 'B', 540, 970, 420, 0.18) +
    (o.fig === 0 ? '' : G(manSilN(), `translate(540 1370) scale(${f1(o.figs || 1)})`)) + (o.over || '');
};
function manSilN() { return P('M-46,0 L-40,-180 Q-70,-190 -66,-250 Q-60,-310 -36,-320 Q0,-360 36,-320 Q60,-310 66,-250 Q70,-190 40,-180 L46,0Z', '#000') + eyesPair('', 0, -265, 0.55, '#e8f4ff', 1, 40) + R(-30, -2, 60, 4, '#000', OP(0.6)); }

/* ------------------------------------------------------------------ celular */
const PHONEW = 330, PHONEH = 680;
function PHONEN(Pf, t, x, y, sc, screen, o = {}) {
  const shx = o.shake ? H.noise(t * 50, 1) * o.shake : 0, shy = o.shake ? H.noise(t * 50, 2) * o.shake : 0;
  return G(glow(Pf, 'B', 0, 0, 520, 0.55 * (o.lit === undefined ? 1 : o.lit)) + R(-PHONEW / 2 - 14, -PHONEH / 2 - 14, PHONEW + 28, PHONEH + 28, '#0a0c10', 'rx="52" stroke="#2a313c" stroke-width="6"') + R(-PHONEW / 2, -PHONEH / 2, PHONEW, PHONEH, '#09131d', 'rx="40"') + `<g>${screen}</g>` + R(-44, -PHONEH / 2 + 12, 88, 22, '#000', 'rx="11"'), `translate(${f1(x + shx)} ${f1(y + shy)}) rotate(${o.rot || 0}) scale(${sc})`);
}
/* bolha de chat. from: 0 recebida, 1 enviada */
const BUBB = (y, lines, k, from = 0, col) => { if (k <= 0) return ''; const w = 296, h = 30 + lines.length * 34, c = col || (from ? '#2a6cf0' : '#1f2a38'); return G(R(-w / 2, 0, w, h, c, 'rx="24"') + lines.map((ln, i) => TXT(0, 38 + i * 34, ln, 22, '#fff')).join(''), `translate(${from ? 18 : -18} ${f1(y)}) scale(${f1(0.6 + 0.4 * ez(k))})`, OP(k)); };
const CHATUI = (t, msgs, o = {}) => {
  /* msgs: [{at, lines, from}] cada mensagem aparece em at (tempo local) */
  let s = R(-165, -340, 330, 680, '#0b1118', 'rx="40"') + R(-165, -340, 330, 120, '#121b26', 'rx="40"') + R(-165, -270, 330, 50, '#121b26') + TXT(0, -262, o.name || 'Desconhecido', 28, '#fff') + C(0, -304, 0, '#fff') + TXT(-110, -300, o.clock || '3:12', 22, '#9fb3c8') + TXT(-0, -228, o.num || '+55 •• •••• ••••', 18, '#7f93a8');
  let y = -190;
  msgs.forEach(m => { const k = cl((t - m.at) / 0.25), h = 30 + m.lines.length * 34; if (k > 0) s += BUBB(y, m.lines, k, m.from || 0, m.col); y += h + 14; });
  if (o.typing !== undefined && t > o.typing) { const ty = y; s += R(-100, ty, 90, 40, '#1f2a38', 'rx="20"') + [0, 1, 2].map(i => C(-76 + i * 22, ty + 20, 6, '#9fb3c8', OP(0.4 + 0.6 * (Math.sin(t * 8 - i) * 0.5 + 0.5)))).join(''); }
  return s;
};
const LOCKUI = (t, o = {}) => R(-165, -340, 330, 680, '#0a1624', 'rx="40"') + TXT(0, -140, o.time || '03:12', 92, '#fff') + TXT(0, -92, 'madrugada', 22, '#9fb3c8') + (o.notif ? G(R(-140, 0, 280, 96, 'rgba(255,255,255,0.14)', 'rx="22"') + C(-106, 28, 12, '#7dffb0') + TXT(18, 36, 'Desconhecido', 24, '#fff') + TXT(0, 74, o.notif, 24, '#dce8f4'), `translate(0 ${f1(lp(40, 0, ez((t - (o.nt || 0)) / 0.2)))})`, OP(ez((t - (o.nt || 0)) / 0.15))) : '');
const CAMUI = (Pf, t, inner, o = {}) => R(-165, -340, 330, 680, '#000', 'rx="40"') + `<g>${inner}</g>` + R(-165, -340, 330, 70, '#000', OP(0.55)) + TXT(-70, -296, 'FOTO', 22, '#ffd23a') + C(0, 292, 30, '#fff', 'stroke="#fff" stroke-width="4"') + TXT(110, -296, o.stamp || '03:12', 22, '#fff');
const CALLUI = (t, o = {}) => R(-165, -340, 330, 680, '#10202f', 'rx="40"') + TXT(0, -140, o.num || '190', 90, '#fff') + TXT(0, -86, o.sub || 'Chamando…', 28, '#9fb3c8') + C(0, 20, 60, '#1f3a52', OP(0.4 + 0.3 * Math.sin(t * 5))) + TXT(0, 38, '☎', 70, '#fff') + G(C(0, 240, 52, '#e23a30') + TXT(0, 250, '✕', 52, '#fff'), '');
/* relógio digital grande */
const CLOCKN = (t, x, y, sc, o = {}) => G(R(-250, -110, 500, 220, '#04070b', 'rx="22" stroke="#1a2430" stroke-width="10"') + TXT(0, 54, o.txt || '03:12', 150, '#ff3b30', `style="filter:none"`) + glow('', 'R', 0, 0, 340, 0.25), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* ondas de batida */
const KNOCKR = (lt, x, y, a = 1) => [0, 1, 2].map(i => { const u = cl((lt - i * 0.18) / 0.4); return u > 0 && u < 1 ? C(x, y, 40 + 220 * u, 'none', `stroke="#fff" stroke-width="${f1(10 * (1 - u))}" ${OP(0.8 * (1 - u) * a)}`) : ''; }).join('');
const VOICEW = (x, y, w, h, t, col = '#7fe8c8', n = 56) => P(Array.from({ length: n }, (_, i) => { const u = i / (n - 1), a = Math.sin(u * 22 + t * 14) * Math.sin(u * 5 + t * 3) * Math.sin(u * Math.PI); return (i ? 'L' : 'M') + f1(x - w / 2 + u * w) + ',' + f1(y + a * h); }).join(' '), 'none', `stroke="${col}" stroke-width="6" stroke-linecap="round"`);
