/* kit3.js - Vizinho do 302: personagens (Marina, Augusto, Porteiro), cenários quentes (amanhecer) */
const KP = {
  mar: { skin: '#e3b08c', sh: '#b98068', hair: '#3a2418', hi: '#5a3a28', cloth: '#2f9aa0', clothSh: '#1f6f75', pants: '#2d3550' },
  aug: { skin: '#e8c3a4', sh: '#c08c72', hair: '#f3f1ec', hi: '#fff', cloth: '#a8714c', clothSh: '#744a30', pants: '#3a3f4a' },
  por: { skin: '#d9a37f', sh: '#a8745a', hair: '#2a2420', hi: '#4a3c34', cloth: '#2d5a9a', clothSh: '#1d3a66', pants: '#222a38' },
};
function FG(t, o = {}) {
  const d = Object.assign({ kind: 'mar', eye: 1, lookx: 0, looky: 0, worry: 0, mouth: 0, smile: 0.3, tilt: 0, blush: 0.3, up: 0 }, o), K = KP[d.kind];
  const bl = (t % 3.9) < 0.12 ? 0.12 : 1, ey = Math.min(1.5, d.eye) * bl, lx = d.lookx * 12, ly = d.looky * 9, br = Math.sin(t * 1.5) * 2;
  const ink = 'stroke="#05080b" stroke-width="3"';
  let s = '';
  s += P('M-100,150 Q-120,260 -180,340 L180,340 Q120,260 100,150Z', K.cloth) + P('M-100,150 Q0,225 100,150 L100,176 Q0,256 -100,176Z', K.clothSh);
  if (d.kind === 'mar') s += P('M-40,180 L0,300 L40,180Z', '#f4efe6');
  if (d.kind === 'aug') s += P('M-40,172 L0,330 L40,172Z', '#efe6d2') + [0, 1, 2].map(i => C(0, 220 + i * 40, 6, '#5a3a24')).join('');
  if (d.kind === 'por') s += P('M-40,172 L0,260 L40,172Z', '#e8eef4') + R(-8, 255, 16, 90, '#1d3a66');
  s += R(-42, 100, 84, 74, K.sh, 'rx="20"');
  s += E(-142, 10, 22, 36, K.skin) + E(142, 10, 22, 36, K.skin);
  /* cabelo atrás */
  if (d.kind === 'mar') s += P('M-150,-20 Q-170,-170 0,-185 Q170,-170 150,-20 Q165,90 120,150 Q100,60 100,-10 L-100,-10 Q-100,60 -120,150 Q-165,90 -150,-20Z', K.hair) + C(0, -190, 52, K.hair) + C(0, -190, 52, 'none', 'stroke="' + K.hi + '" stroke-width="5" opacity="0.5"');
  if (d.kind === 'aug') s += P('M-146,-30 Q-176,50 -128,110 Q-120,20 -110,-30Z', K.hair) + P('M146,-30 Q176,50 128,110 Q120,20 110,-30Z', K.hair);
  s += P('M-140,-20 Q-150,-150 0,-170 Q150,-150 140,-20 Q150,90 70,150 Q0,185 -70,150 Q-150,90 -140,-20Z', K.skin, ink);
  if (d.kind === 'mar') s += P('M-146,-10 Q-165,-170 0,-182 Q165,-170 146,-10 Q130,-80 70,-118 Q20,-70 -40,-112 Q-110,-90 -146,-10Z', K.hair) + P('M-70,-124 Q-10,-160 60,-132', 'none', `stroke="${K.hi}" stroke-width="5" stroke-linecap="round" opacity="0.6"`);
  if (d.kind === 'aug') s += P('M-146,-20 Q-160,-110 -90,-150 Q-120,-80 -112,-30Z', K.hair) + P('M146,-20 Q160,-110 90,-150 Q120,-80 112,-30Z', K.hair) + P('M-90,-150 Q0,-186 90,-150 Q40,-166 0,-160 Q-40,-166 -90,-150Z', K.hair, OP(0.9)) + [-1, 1].map(sx => P(`M${sx * 40},-140 q${sx * 20},-20 ${sx * 50},-10`, 'none', 'stroke="#ddd" stroke-width="5" stroke-linecap="round"')).join('');
  if (d.kind === 'por') s += P('M-150,-30 Q-160,-130 0,-150 Q160,-130 150,-30 L150,-52 Q60,-62 0,-60 Q-60,-62 -150,-52Z', '#1d3a66') + P('M-150,-52 Q0,-92 150,-52 L190,-36 Q0,-70 -190,-36Z', '#142a4a') + C(0, -118, 18, '#e8c14a');
  const eye = cx => G(E(0, 0, 33, 28 * ey + 2, '#f8f6f0', ink) + C(lx, ly, 14 * (0.85 + 0.15 * Math.min(1.3, d.eye)), d.kind === 'aug' ? '#5a7a8a' : '#4a2e1c') + C(lx, ly, 6.5, '#05080b') + C(lx + 4, ly - 5, 3.5, '#fff'), `translate(${cx} 0)`);
  s += eye(-60) + eye(60);
  const lid = d.kind === 'aug' ? 0.35 : 0;
  if (d.kind === 'aug') s += [-60, 60].map(cx => P(`M${cx - 38},-8 Q${cx},${-28 * ey - 4} ${cx + 38},-8`, 'none', `stroke="${K.sh}" stroke-width="5" opacity="0.8"`)).join('');
  const wt = d.worry * 12 - d.up * 10, bc = d.kind === 'aug' ? '#eeeeee' : K.hair, bw = d.kind === 'aug' ? 11 : 9;
  s += P(`M-98,${-60 - d.up * 8} Q-60,${-80 - d.up * 10} -26,${-60 + wt}`, 'none', `stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"`) + P(`M98,${-60 - d.up * 8} Q60,${-80 - d.up * 10} 26,${-60 + wt}`, 'none', `stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"`);
  if (d.kind === 'aug') s += R(-104, -48, 88, 66, 'rgba(255,255,255,0.08)', 'rx="30" stroke="#c7a15a" stroke-width="5"') + R(16, -48, 88, 66, 'rgba(255,255,255,0.08)', 'rx="30" stroke="#c7a15a" stroke-width="5"') + L(-16, -20, 16, -20, '#c7a15a', 5);
  s += P('M-8,6 Q0,30 12,28', 'none', `stroke="${K.sh}" stroke-width="6" stroke-linecap="round"`);
  s += E(-90, 52, 26, 16, '#ff7a7a', OP(0.25 * d.blush)) + E(90, 52, 26, 16, '#ff7a7a', OP(0.25 * d.blush));
  if (d.kind === 'por') s += P('M-48,78 Q-24,60 0,72 Q24,60 48,78 Q24,86 0,80 Q-24,86 -48,78Z', '#2a2420');
  if (d.kind === 'aug') s += [0, 1, 2].map(i => P(`M${-104 + i * 6},${-80 + i * 8} q40,-10 80,0`, 'none', `stroke="${K.sh}" stroke-width="3" opacity="0.5"`)).join('') + P('M-64,70 Q-50,110 -30,118 M64,70 Q50,110 30,118', 'none', `stroke="${K.sh}" stroke-width="4" opacity="0.6"`);
  const mo = d.mouth, sm = d.smile;
  s += mo > 0.05 ? E(0, 94, 30 + 8 * mo, 6 + 28 * mo, '#5a1e26', ink) + (mo > 0.25 ? R(-22, 80, 44, 8, '#f8f6f0') : '') : P(`M-36,${94 - 4 * d.worry - 10 * sm} Q0,${96 + 26 * sm - 6 * d.worry} 36,${94 - 4 * d.worry - 10 * sm}`, 'none', 'stroke="#7a3a38" stroke-width="6" stroke-linecap="round"');
  return G(s, `translate(0 ${f1(br)}) rotate(${d.tilt})`);
}
const FGX = (t, o, x = 540, y = 960, sc = 2.6) => G(FG(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* corpo de pé: view b|f; pés em 0,0 ; altura ~560 */
function BG(o = {}) {
  const d = Object.assign({ kind: 'mar', t: 0, view: 'f', walk: 0, ph: 0, armR: 0, armL: 0, lean: 0, bag: 0 }, o), K = Object.assign({}, KP[d.kind], o.kp || {});
  const sw = d.walk ? Math.sin(d.ph) * 26 : 0, bob = d.walk ? Math.abs(Math.sin(d.ph)) * 6 : Math.sin(d.t * 1.6) * 2;
  let s = R(-150, 0, 300, 12, '#000', OP(0.3) + ' rx="6"');
  s += R(-50 + sw * 0.5, -250, 44, 250, K.pants, 'rx="12"') + R(6 - sw * 0.5, -250, 44, 250, K.pants, 'rx="12" filter="none"') + R(-56 + sw * 0.5, -14, 56, 18, '#201a18', 'rx="8"') + R(2 - sw * 0.5, -14, 56, 18, '#201a18', 'rx="8"');
  const ty = -250 - bob;
  s += G(P('M-84,0 Q-98,-150 -66,-232 L66,-232 Q98,-150 84,0Z', K.cloth) + (d.view === 'f' ? P('M-34,-232 L0,-150 L34,-232Z', d.kind === 'por' ? '#e8eef4' : '#f4efe6') : P('M-40,-228 Q0,-196 40,-228 L50,-205 Q0,-160 -50,-205Z', K.clothSh)) + (d.kind === 'por' ? P('M-60,-200 L-60,-20 M60,-200 L60,-20', 'none', 'stroke="#e8c14a" stroke-width="5"') : ''), `translate(0 ${f1(ty)})`);
  const ay = ty - 190;
  const arm = (sx, a) => G(R(-18, 0, 36, 150, K.cloth, 'rx="16"') + C(0, 156, 20, K.skin), `translate(${sx} ${f1(ay + 14)}) rotate(${f1(a)})`);
  s += arm(-84, 8 + d.armL) + arm(84, -8 + d.armR);
  const hair = d.kind === 'mar' ? K.hair : K.hair;
  s += G((d.view === 'b' ? C(0, 0, 56, hair) : C(0, 0, 56, K.skin) + P('M-56,-8 Q-40,-62 0,-60 Q40,-62 56,-8 Q20,-34 -56,-8Z', hair) + C(-20, 4, 6, '#05080b') + C(20, 4, 6, '#05080b') + P('M-18,32 Q0,42 18,32', 'none', 'stroke="#7a3a38" stroke-width="5"')) + (d.kind === 'mar' ? C(0, -58, 24, hair) : '') + (d.kind === 'por' ? P('M-58,-14 Q0,-76 58,-14 L74,-6 L-74,-6Z', '#1d3a66') : ''), `translate(0 ${f1(ty - 280)})`);
  if (d.bag) s += G(R(-30, 0, 60, 70, '#e8c14a', 'rx="10"') + P('M-20,0 Q0,-40 20,0', 'none', 'stroke="#8a6a1a" stroke-width="6"'), `translate(${f1(100)} ${f1(ay + 150)})`);
  return G(s, `rotate(${d.lean})`);
}
const BGX = (o, x, y, sc) => G(BG(o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* Augusto na cadeira de rodas: view b (costas) | f (frente). origem = chão no centro */
function AUGC(o = {}) {
  const d = Object.assign({ t: 0, view: 'b', wave: 0, head: 0, arm: 0 }, o), K = KP.aug, br = Math.sin(d.t * 1.4) * 2;
  let s = R(-210, 0, 420, 14, '#000', OP(0.28) + ' rx="7"');
  const wheel = (x) => G(C(0, 0, 130, 'none', 'stroke="#14181e" stroke-width="16"') + C(0, 0, 118, 'none', 'stroke="#8a9098" stroke-width="3"') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => L(0, 0, Math.cos(i * Math.PI / 4) * 118, Math.sin(i * Math.PI / 4) * 118, '#8a9098', 2)).join('') + C(0, 0, 16, '#8a9098'), `translate(${x} -130)`);
  if (d.view === 'b') {
    s += d.hide ? (R(-190, -330, 380, 330, '#4a2e2a', 'rx="40"') + R(-150, -560, 300, 300, '#5a3a34', 'rx="70" stroke="#2a1814" stroke-width="8"') + R(-210, -360, 70, 280, '#3e2622', 'rx="30"') + R(140, -360, 70, 280, '#3e2622', 'rx="30"')) : (wheel(-140) + wheel(140) + R(-120, -300, 240, 30, '#1b2028', 'rx="10"') + R(-110, -480, 220, 200, '#2a313c', 'rx="26" stroke="#14181e" stroke-width="8"') + R(-130, -500, 30, 120, '#14181e', 'rx="10"') + R(100, -500, 30, 120, '#14181e', 'rx="10"'));
    s += G(P('M-86,0 Q-100,-120 -64,-200 L64,-200 Q100,-120 86,0Z', K.cloth) + C(0, -250, 56, K.hair) + E(-52, -240, 10, 30, K.hair, OP(0.9)) + E(52, -240, 10, 30, K.hair, OP(0.9)) + P('M-40,-300 Q0,-318 40,-300', 'none', 'stroke="#fff" stroke-width="5" opacity="0.7"'), `translate(${f1(0)} ${f1(-330 + br)}) rotate(${f1(d.head)})`);
  } else {
    s += wheel(-170) + wheel(170) + R(-100, -230, 200, 30, '#1b2028', 'rx="10"') + R(-80, -250, 160, 30, '#2a313c') + G(P('M-90,0 Q-104,-130 -70,-200 L70,-200 Q104,-130 90,0Z', K.cloth) + P('M-34,-196 L0,-110 L34,-196Z', '#efe6d2') + [0, 1, 2].map(i => C(0, -90 + i * 30, 5, '#5a3a24')).join(''), `translate(0 ${f1(-330 + br)})`) + P('M-130,-300 L130,-300 Q150,-200 120,-130 L-120,-130 Q-150,-200 -130,-300Z', '#b9634a', OP(1)) + R(-120, -200, 240, 60, '#9a4a34', OP(0.5)) + R(-70, -132, 50, 130, '#2b2f38', 'rx="12"') + R(20, -132, 50, 130, '#2b2f38', 'rx="12"') + R(-80, -14, 70, 18, '#201a18', 'rx="8"') + R(10, -14, 70, 18, '#201a18', 'rx="8"');
    s += G(FG(d.t, { kind: 'aug', smile: 0.7, eye: 0.9 }), `translate(0 ${f1(-640 + br)}) scale(0.42) rotate(${f1(d.head)})`);
    s += G(R(-14, 0, 28, 110, K.cloth, 'rx="12"') + C(0, 116, 18, K.skin), `translate(${f1(-96)} ${f1(-470)}) rotate(${f1(8)})`) + G(R(-14, 0, 28, 110, K.cloth, 'rx="12"') + C(0, 116, 18, K.skin), `translate(96 -470) rotate(${f1(-8 - d.arm)})`);
  }
  return s;
}
const AUGX = (o, x, y, sc) => G(AUGC(o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);

/* ------------------------------------------------------------------ cenários (amanhecer, tom acolhedor) */
const SKYD = (Pf, t, o = {}) => { const w = o.warm === undefined ? 0 : o.warm; return `<defs><linearGradient id="${Pf}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mixc('#1d2a52', '#4a6fb0', w)}"/><stop offset="0.6" stop-color="${mixc('#5a4f86', '#f0a878', w)}"/><stop offset="1" stop-color="${mixc('#c07a6a', '#ffd9a0', w)}"/></linearGradient></defs>` + R(-400, -400, 1880, 2720, `url(#${Pf}sky)`); };
/* fachada do prédio ao amanhecer: janelas em grade; 302 destacada (o.bl: 0 apagada, 1 acesa) */
const FACADE = (Pf, t, o = {}) => {
  const w = o.warm || 0; let s = SKYD(Pf, t, { warm: w }) + C(820, 520, 140, '#ffe8b8', OP(0.25 + 0.5 * w)) + glow(Pf, 'A', 820, 520, 520, 0.25 + 0.4 * w);
  s += R(-60, 330, 1200, 1700, '#6d5f78') + R(-60, 330, 1200, 40, '#54486a') + R(-60, 330, 1200, 1700, '#2a2438', OP(0.15));
  for (let r = 0; r < 6; r++) for (let q = 0; q < 4; q++) { const id = r * 4 + q, x = 60 + q * 250, y = 400 + r * 230, hero = (r === 2 && q === 1), on = hero ? o.bl : (hz(id, 4) > 0.8 ? 0.8 : 0); s += R(x - 6, y - 6, 172, 172, '#4a3f5e') + R(x, y, 160, 160, mixc('#2a3c5c', '#ffd88a', on), '') + L(x + 80, y, x + 80, y + 160, '#4a3f5e', 6) + L(x, y + 80, x + 160, y + 80, '#4a3f5e', 6) + R(x - 10, y + 160, 180, 12, '#54486a'); if (hero) s += glow(Pf, 'A', x + 80, y + 80, 300 * o.bl + 1, 0.8 * o.bl); }
  s += R(-60, 1790, 1200, 400, '#3a3340') + R(-60, 1790, 1200, 16, '#5a5060');
  return s + (o.over || '');
};
const HERO302 = { x: 310, y: 860 }; /* centro da janela 302 na fachada */
/* sala do Augusto (interior quente): janela, abajur, estante com foto */
const SALAA = (Pf, t, o = {}) => { const lamp = o.lamp === undefined ? 0 : o.lamp, w = o.warm === undefined ? 0.2 : o.warm;
  return R(-400, -400, 1880, 2720, '#2a2438') + R(-400, 1450, 1880, 600, '#3a2c28') + R(-400, 1440, 1880, 14, '#241a18') +
    G(R(-190, -260, 380, 520, `${mixc('#2a3c6a', '#ffcf94', w)}`, 'stroke="#54406a" stroke-width="18"') + L(0, -260, 0, 260, '#54406a', 12) + L(-190, 0, 190, 0, '#54406a', 12) + glow(Pf, 'A', 0, 0, 380, 0.15 + 0.5 * w) + P('M-190,-260 L-120,-260 L-150,260 L-190,260Z', '#7a4a5a', OP(0.7)) + P('M190,-260 L120,-260 L150,260 L190,260Z', '#7a4a5a', OP(0.7)), 'translate(320 760)') +
    G(R(-170, -20, 340, 18, '#4a3430') + R(-150, -150, 70, 130, '#e8d8b8', 'stroke="#241a18" stroke-width="6"') + C(-115, -105, 18, '#c8967a') + R(-40, -110, 40, 90, '#7a8aa0') + R(10, -90, 36, 70, '#a87a5a'), 'translate(820 900)') +
    G(R(-12, 0, 24, 160, '#5a4430') + P('M-70,0 L70,0 L40,-110 L-40,-110Z', mixc('#a89a82', '#ffe4a8', lamp)) + glow(Pf, 'A', 0, -50, 340, 0.15 + 0.85 * lamp), 'translate(820 1290)') + (lamp > 0.05 ? R(-400, -400, 1880, 2720, '#ffd88a', OP(0.1 * lamp)) : '') + (o.over || '') + R(-400, -400, 1880, 2720, '#0a0a1a', OP(o.dark === undefined ? 0.25 : o.dark)); };
const HALLA = (Pf, t, o = {}) => R(-400, -400, 1880, 2720, '#3a3050') + R(-400, 1500, 1880, 600, '#2a2228') + R(-400, 1480, 1880, 24, '#4a3a44') + [0, 1, 2].map(i => G(R(-110, -250, 220, 500, i === 1 ? '#6a4a34' : '#4a3a4c', 'stroke="#241a24" stroke-width="10"') + R(-90, -230, 180, 200, '#000', OP(0.1)) + C(70, 20, 12, '#d8c07a') + R(-40, -310, 80, 40, '#cdb98a', 'rx="6"') + TXT(0, -278, i === 1 ? '302' : (i ? '303' : '301'), 30, '#2a1a10'), `translate(${200 + i * 340} 1250)`)).join('') + R(-400, -400, 1880, 400, '#24202e') + [0, 1].map(i => R(300 + i * 480, 100, 220, 30, '#fff2c0', OP(0.8)) + glow(Pf, 'A', 410 + i * 480, 120, 260, 0.3)).join('') + (o.over || '');
const LOBBYA = (Pf, t, o = {}) => R(-400, -400, 1880, 2720, '#4a3a4c') + R(-400, 1480, 1880, 600, '#2e2830') + R(-400, 1470, 1880, 16, '#5a4a54') + G(R(-250, -140, 500, 280, '#5a3a24', 'rx="12" stroke="#2a1810" stroke-width="10"') + R(-250, -140, 500, 40, '#7a5234') + R(-230, -300, 460, 160, '#8a6a4a', OP(0.0)), 'translate(540 1320)') + G(R(-170, -230, 340, 300, '#2a2630', 'rx="10"') + [0, 1, 2, 3, 4, 5].map(i => R(-150 + (i % 3) * 100, -210 + Math.floor(i / 3) * 140, 80, 110, '#8a9098', 'rx="6"') + R(-124 + (i % 3) * 100, -150 + Math.floor(i / 3) * 140, 28, 8, '#3a3f4a')).join(''), 'translate(160 700)') + G(C(0, 0, 70, '#f4efe6', 'stroke="#2a1810" stroke-width="10"') + L(0, 0, 0, -48, '#241a18', 6) + L(0, 0, 36 * Math.cos(o.hm || 0), 36 * Math.sin(o.hm || 0), '#241a18', 6), 'translate(900 520)') + glow(Pf, 'A', 540, 300, 500, 0.35) + (o.over || '');
const WALLCLK = (Pf, t, x, y, sc, m = 0, hr = 9) => G(C(0, 0, 150, '#f4efe6', 'stroke="#2a1810" stroke-width="14"') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => L(Math.sin(i * Math.PI / 6) * 118, -Math.cos(i * Math.PI / 6) * 118, Math.sin(i * Math.PI / 6) * 136, -Math.cos(i * Math.PI / 6) * 136, '#2a1810', i % 3 ? 4 : 8)).join('') + L(0, 0, Math.sin((hr % 12) / 12 * Math.PI * 2 + m / 60 * Math.PI / 6) * 80, -Math.cos((hr % 12) / 12 * Math.PI * 2 + m / 60 * Math.PI / 6) * 80, '#2a1810', 10) + L(0, 0, Math.sin(m / 60 * Math.PI * 2) * 118, -Math.cos(m / 60 * Math.PI * 2) * 118, '#2a1810', 6) + C(0, 0, 12, '#c8452e'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const SWITCH = (Pf, t, x, y, sc, on) => G(R(-90, -140, 180, 280, '#e8e2d6', 'rx="20" stroke="#8a8478" stroke-width="8"') + R(-40, -90, 80, 180, '#c8c2b4', 'rx="14"') + G(R(-30, -10, 60, 90, '#fffaf0', 'rx="12" stroke="#8a8478" stroke-width="4"'), `translate(0 ${on ? -50 : 20})`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const SIGNAL = (Pf, t, x, y, sc, n) => G([0, 1, 2].map(i => glow(Pf, 'A', i * 150 - 150, 0, 150, i < n ? 0.9 : 0.1) + C(i * 150 - 150, 0, 40, i < n ? '#ffe9a0' : '#5a4c60')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const STREETA = (Pf, t, o = {}) => SKYD(Pf, t, { warm: o.warm === undefined ? 0.7 : o.warm }) + R(-400, 1300, 1880, 800, '#4a4452') + R(-400, 1290, 1880, 20, '#8a8294') + R(-400, 1500, 1880, 600, '#2e2a34') + [0, 1, 2, 3].map(i => R(-100 + i * 380, 1700, 200, 16, '#d8d0c0', OP(0.5))).join('') + [0, 1, 2].map(i => G(R(-250, -700, 500, 700, ['#7a6a8a', '#8a6a6a', '#6a7a8a'][i]) + [0, 1, 2, 3].map(j => R(-200 + (j % 2) * 220, -620 + Math.floor(j / 2) * 260, 160, 180, '#3a4a6a')).join(''), `translate(${100 + i * 520} 1300)`)).join('');
const COFFEE = (Pf, t, x, y, sc) => G(P('M-70,-80 L70,-80 L56,70 Q0,96 -56,70Z', '#f4efe6', 'stroke="#8a7a6a" stroke-width="6"') + E(0, -80, 70, 18, '#5a3a24', 'stroke="#8a7a6a" stroke-width="6"') + P('M70,-50 Q130,-40 110,10 Q100,30 60,20', 'none', 'stroke="#f4efe6" stroke-width="14"') + [0, 1, 2].map(i => P(`M${-30 + i * 30},-110 q${14 * Math.sin(t * 3 + i)},-30 0,-60 q${-14 * Math.sin(t * 3 + i)},-30 0,-50`, 'none', 'stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.4"')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const COMMENTA = (Pf, t, lt) => R(-400, -400, 1880, 2720, '#2a2438') + glow(Pf, 'A', 540, 900, 800, 0.35) + G(R(-320, -170, 640, 340, '#fff4dc', 'rx="44" stroke="#c8801e" stroke-width="10"') + TXT(0, -60, 'Você bateria na', 56, '#3a2418') + TXT(0, 10, 'porta do vizinho?', 56, '#3a2418') + TXT(0, 100, '💬 comente', 44, '#c8801e'), `translate(540 ${f1(900)}) scale(${f1(0.8 + 0.2 * ez(lt / 0.3))})`);
