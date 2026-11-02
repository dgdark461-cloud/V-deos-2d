/* kit5.js - Trem 23h47: personagens (Rafael 29, Rafael +15, senhora, homem de terno, garota, rapaz), vagão em perspectiva, estação, cabine.
   Paleta de suspense: verde-azulado frio de lâmpada fluorescente, azul-noite, vermelho de alerta. */
const TP = {
  raf: { skin: '#dcae88', sh: '#b0795f', hair: '#1c1a22', cloth: '#cfd6e0', clothSh: '#9aa4b4', style: 'short', stub: 1, tie: '#4a5a8a', bags: 1 },
  old: { skin: '#d2a380', sh: '#a0705a', hair: '#3a3840', cloth: '#2c303a', clothSh: '#1c1f27', style: 'short', gray: 1, stub: 1.4, wr: 1, bags: 1.4 },
  sen: { skin: '#e6c4a8', sh: '#b8866c', hair: '#d4d4d8', cloth: '#6a3a5a', clothSh: '#4a2640', style: 'bun', wr: 1, glasses: 1 },
  ter: { skin: '#d9aa86', sh: '#aa7458', hair: '#14121a', cloth: '#2a2d36', clothSh: '#1a1c22', style: 'slick', tie: '#7a1c24' },
  gar: { skin: '#e4b894', sh: '#b88468', hair: '#2a1c2e', cloth: '#7a5aa8', clothSh: '#563c80', style: 'long', phones: 1 },
  rap: { skin: '#d4a07c', sh: '#a5705a', hair: '#201c1a', cloth: '#3a4a3a', clothSh: '#26332a', style: 'hood' },
};
function FT(t, o = {}) {
  const d = Object.assign({ kind: 'raf', eye: 1, lookx: 0, looky: 0, worry: 0.3, mouth: 0, smile: 0, tilt: 0, sweat: 0, trem: 0, pal: 0, blush: 0 }, o), K = TP[d.kind];
  const bl = (t % 3.8) < 0.12 ? 0.12 : 1, ey = Math.min(1.5, d.eye) * bl, lx = d.lookx * 12, ly = d.looky * 10, br = Math.sin(t * 1.5) * 2 + (d.trem ? H.noise(t * 40, 4) * 3 * d.trem : 0);
  const ink = 'stroke="#05080b" stroke-width="3"', skin = d.pal ? mixc(K.skin, '#cfd8d0', d.pal) : K.skin;
  let s = '';
  s += P('M-100,150 Q-120,260 -180,340 L180,340 Q120,260 100,150Z', K.cloth) + P('M-100,150 Q0,225 100,150 L100,176 Q0,256 -100,176Z', K.clothSh);
  if (d.kind === 'raf' || d.kind === 'ter' || d.kind === 'old') s += P('M-44,172 L0,250 L44,172Z', d.kind === 'old' ? '#bfc4cc' : '#e8eef4') + (K.tie ? P('M-10,230 L10,230 L16,330 L0,350 L-16,330Z', K.tie) + P('M-14,200 L14,200 L8,236 L-8,236Z', K.tie) : '');
  if (d.kind === 'sen') s += P('M-90,160 Q0,240 90,160 L80,200 Q0,270 -80,200Z', '#9a5a8a') + P('M-60,200 Q0,250 60,200', 'none', 'stroke="#c88ab8" stroke-width="6"');
  if (d.kind === 'gar') s += P('M-40,172 Q0,200 40,172 L36,215 Q0,235 -36,215Z', '#563c80') + L(-20, 215, -22, 300, '#e8e8f0', 4) + L(20, 215, 22, 300, '#e8e8f0', 4);
  if (d.kind === 'rap') s += P('M-110,160 Q-100,260 -190,340 L190,340 Q100,260 110,160 Q0,230 -110,160Z', '#26332a');
  s += R(-42, 100, 84, 74, K.sh, 'rx="20"');
  s += E(-142, 10, 22, 36, skin) + E(142, 10, 22, 36, skin);
  if (K.style === 'long') s += P('M-150,-20 Q-175,-175 0,-190 Q175,-175 150,-20 Q170,150 150,300 L100,330 Q110,100 100,0 L-100,0 Q-110,100 -100,330 L-150,300 Q-170,150 -150,-20Z', K.hair);
  if (K.style === 'bun') s += C(0, -196, 50, K.hair);
  if (K.style === 'hood') s += P('M-170,-10 Q-190,-200 0,-215 Q190,-200 170,-10 Q190,120 150,260 L-150,260 Q-190,120 -170,-10Z', K.cloth);
  s += P('M-140,-20 Q-150,-150 0,-170 Q150,-150 140,-20 Q150,90 70,150 Q0,185 -70,150 Q-150,90 -140,-20Z', skin, ink);
  if (d.stub) s += P('M-132,40 Q-120,140 0,176 Q120,140 132,40 Q100,100 70,100 Q40,86 0,92 Q-40,86 -70,100 Q-100,100 -132,40Z', '#2a2226', OP(0.22 * d.stub));
  if (K.style === 'short') s += P('M-148,-20 Q-168,-176 0,-190 Q168,-176 148,-20 Q132,-90 84,-112 Q36,-80 -30,-118 Q-90,-90 -112,-60 Q-134,-50 -148,-20Z', K.hair) + (K.gray ? P('M-148,-20 Q-150,-90 -112,-60 Q-134,-50 -148,-20Z', '#c8c8cc') + P('M148,-20 Q150,-90 112,-60 Q134,-50 148,-20Z', '#c8c8cc') + P('M-100,-130 Q-40,-170 20,-150', 'none', 'stroke="#9a9aa0" stroke-width="6"') : '');
  if (K.style === 'slick') s += P('M-146,-20 Q-166,-170 0,-188 Q166,-170 146,-20 Q126,-98 40,-116 Q-30,-110 -96,-84 Q-130,-60 -146,-20Z', K.hair) + P('M-60,-150 Q0,-170 60,-146', 'none', 'stroke="#4a4858" stroke-width="5" opacity="0.7"');
  if (K.style === 'bun') s += P('M-146,-20 Q-166,-168 0,-184 Q166,-168 146,-20 Q130,-100 60,-124 Q0,-92 -60,-124 Q-130,-100 -146,-20Z', K.hair);
  if (K.style === 'long') s += P('M-146,-20 Q-166,-172 0,-188 Q166,-172 146,-20 Q120,-110 30,-126 Q-40,-104 -140,-30Z', K.hair);
  if (K.style === 'hood') s += P('M-150,-14 Q-170,-175 0,-190 Q170,-175 150,-14 Q120,-108 0,-112 Q-120,-108 -150,-14Z', K.cloth) + P('M-150,-14 Q-120,-108 0,-112 Q120,-108 150,-14', 'none', 'stroke="#0a120c" stroke-width="8" opacity="0.8"');
  const eye = cx => G(E(0, 0, 33, 28 * ey + 2, '#f6f4ee', ink) + C(lx, ly, 14 * (0.85 + 0.15 * Math.min(1.3, d.eye)), d.kind === 'ter' ? '#3a4a5a' : '#4a2e1c') + C(lx, ly, 6.5, '#05080b') + C(lx + 4, ly - 5, 3.5, '#fff'), `translate(${cx} 0)`);
  s += eye(-60) + eye(60);
  if (d.bags) s += [-60, 60].map(cx => P(`M${cx - 30},26 Q${cx},${40 + 8 * d.bags} ${cx + 30},26`, 'none', `stroke="#5a3a48" stroke-width="${f1(5 + 3 * d.bags)}" stroke-linecap="round" opacity="${f1(0.35 * d.bags)}"`)).join('');
  if (d.wr) s += [0, 1, 2].map(i => P(`M-104,${-84 + i * 8} q52,-12 104,0 M0,${-84 + i * 8} q52,-12 104,0`, 'none', `stroke="${K.sh}" stroke-width="3" opacity="0.5"`)).join('') + P('M-70,60 Q-56,106 -30,116 M70,60 Q56,106 30,116', 'none', `stroke="${K.sh}" stroke-width="4" opacity="0.55"`);
  const wt = d.worry * 12, bc = K.hair, bw = 9;
  s += P(`M-98,${-60} Q-60,${-80} -26,${-60 + wt}`, 'none', `stroke="${K.gray ? '#8a8a90' : bc}" stroke-width="${bw}" stroke-linecap="round"`) + P(`M98,${-60} Q60,${-80} 26,${-60 + wt}`, 'none', `stroke="${K.gray ? '#8a8a90' : bc}" stroke-width="${bw}" stroke-linecap="round"`);
  if (K.glasses) s += R(-104, -48, 88, 66, 'rgba(255,255,255,0.1)', 'rx="30" stroke="#8a8a96" stroke-width="5"') + R(16, -48, 88, 66, 'rgba(255,255,255,0.1)', 'rx="30" stroke="#8a8a96" stroke-width="5"') + L(-16, -20, 16, -20, '#8a8a96', 5);
  s += P('M-8,6 Q0,30 12,28', 'none', `stroke="${K.sh}" stroke-width="6" stroke-linecap="round"`);
  const mo = d.mouth, sm = d.smile;
  s += mo > 0.05 ? E(0, 94, 30 + 8 * mo, 6 + 28 * mo, '#5a1e26', ink) + (mo > 0.25 ? R(-22, 80, 44, 8, '#f8f6f0') : '') : P(`M-34,${94 - 4 * d.worry - 10 * sm} Q0,${96 + 26 * sm - 6 * d.worry} 34,${94 - 4 * d.worry - 10 * sm}`, 'none', 'stroke="#7a3a38" stroke-width="6" stroke-linecap="round"');
  if (d.sweat > 0) s += P('M118,-40 Q130,-8 118,6 Q104,-8 118,-40Z', '#bfe6ff', OP(0.9 * d.sweat) + ' stroke="#fff" stroke-width="2"');
  if (K.phones) s += P('M-146,10 Q-150,-180 0,-190 Q150,-180 146,10', 'none', 'stroke="#14121a" stroke-width="12"') + R(-170, -20, 38, 80, '#14121a', 'rx="16"') + R(132, -20, 38, 80, '#14121a', 'rx="16"') + R(-164, -10, 14, 60, '#e84a5a', 'rx="6"') + R(150, -10, 14, 60, '#e84a5a', 'rx="6"');
  if (d.kind === 'raf' && !d.noear) s += R(-150, 12, 12, 30, '#f2f2f6', 'rx="6"') + R(138, 12, 12, 30, '#f2f2f6', 'rx="6"') + L(-148, 40, -170, 160, '#f2f2f6', 3) + L(148, 40, 170, 160, '#f2f2f6', 3);
  return G(s, `translate(0 ${f1(br)}) rotate(${d.tilt})`);
}
const FTX = (t, o, x = 540, y = 980, sc = 2.6) => G(FT(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);

/* ---------- vagão em perspectiva ---------- */
const VF = 900, VX = 540, VY = 800;
const PJ = (x, y, z) => [VX + x * VF / z, VY + y * VF / z];
const PQ = (pts, fill, ex = '') => `<polygon points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;
function TRAINI(Pf, t, o = {}) {
  const fl = o.flick === undefined ? 0 : o.flick, on = fl > 0 ? (Math.sin(t * 31) * Math.sin(t * 17.3) > -0.3 + 0.9 * (1 - fl) ? 1 : 0.15) : 1, dim = o.dim === undefined ? 0 : o.dim;
  const cl = mixc('#1a3a36', '#3a6a60', on), wallc = mixc('#16242a', '#2c4a52', on), floorc = mixc('#10161c', '#222e36', on), CE = -1.25, FL = 1.5, WX = 1.45, ZN = 1.2, ZF = 14;
  let s = R(-400, -400, 1880, 2720, '#05080c');
  s += PQ([PJ(-WX, CE, ZN), PJ(WX, CE, ZN), PJ(WX, CE, ZF), PJ(-WX, CE, ZF)], mixc('#10201e', '#1e3a36', on));
  s += PQ([PJ(-WX, FL, ZN), PJ(WX, FL, ZN), PJ(WX, FL, ZF), PJ(-WX, FL, ZF)], floorc);
  s += PQ([PJ(-WX, CE, ZN), PJ(-WX, FL, ZN), PJ(-WX, FL, ZF), PJ(-WX, CE, ZF)], wallc) + PQ([PJ(WX, CE, ZN), PJ(WX, FL, ZN), PJ(WX, FL, ZF), PJ(WX, CE, ZF)], wallc);
  /* piso: faixa central e listras */
  s += PQ([PJ(-0.35, FL, ZN), PJ(0.35, FL, ZN), PJ(0.35, FL, ZF), PJ(-0.35, FL, ZF)], mixc('#1a232a', '#2e3c46', on));
  /* janelas laterais com noite correndo */
  const sp = (o.speed === undefined ? 1 : o.speed), off = (t * 2.2 * sp) % 1.8;
  for (let side = -1; side <= 1; side += 2) for (let k = 0; k < 9; k++) {
    const z0 = 1.6 + k * 1.8 - off * 0 ; const za = z0 + 0.1, zb = z0 + 1.3; if (za < ZN || zb > ZF) continue;
    const q = [PJ(side * WX, -0.55, za), PJ(side * WX, -0.55, zb), PJ(side * WX, 0.35, zb), PJ(side * WX, 0.35, za)];
    s += PQ(q, '#050a12');
    for (let j = 0; j < 4; j++) { const zz = za + ((j * 0.37 + t * 1.3 * sp + k * 0.21) % 1.2), p1 = PJ(side * WX, -0.2 + 0.1 * j, zz), p2 = PJ(side * WX, -0.2 + 0.1 * j, Math.min(zb, zz + 0.12)); if (zz < zb) s += L(p1[0], p1[1], p2[0], p2[1], j % 2 ? '#9fd8ff' : '#ffd88a', Math.max(2, 14 / zz), OP(0.5 * sp)); }
    s += PQ(q, 'none', 'stroke="#0a1418" stroke-width="5"');
  }
  /* bancos (esquerda e direita) */
  const seats = o.seats === undefined ? 1 : o.seats;
  if (seats) for (let k = 7; k >= 0; k--) for (let side = -1; side <= 1; side += 2) {
    const z0 = 1.5 + k * 1.55, z1 = z0 + 1.15;
    const xo = side * WX, xi = side * 0.78;
    s += PQ([PJ(xo, 0.55, z0), PJ(xi, 0.55, z0), PJ(xi, 0.55, z1), PJ(xo, 0.55, z1)], '#2a4a58') + PQ([PJ(xi, 0.55, z0), PJ(xi, 1.2, z0), PJ(xi, 1.2, z1), PJ(xi, 0.55, z1)], '#1a3440');
    s += PQ([PJ(xo, -0.15, z0), PJ(xi * 1.1, -0.15, z0), PJ(xi * 1.1, 0.6, z0), PJ(xo, 0.6, z0)], '#335b6a') + PQ([PJ(xo, 0.6, z0), PJ(xi, 0.55, z0), PJ(xi, 1.2, z0), PJ(xo, 1.2, z0)], '#1c3a46');
  }
  /* passageiros: lista {kind, side, row} -> bust na cadeira */
  (o.pax || []).forEach(p => { const z = 1.5 + p.row * 1.55 + 0.7, side = p.side, x = side * 1.12, c = PJ(x, 0.15, z), sc = (p.sc || 1) * 330 / z / 100;
    s += G(FT(t, Object.assign({ eye: 0.9, worry: 0, smile: 0 }, p.o || {}, { kind: p.kind })), `translate(${f1(c[0])} ${f1(c[1])}) scale(${sc.toFixed(3)}) rotate(${p.rot || 0})`); });
  /* fim do vagão: porta da cabine */
  const dz = 15.5, dq = [PJ(-0.7, -0.9, dz), PJ(0.7, -0.9, dz), PJ(0.7, 1.5, dz), PJ(-0.7, 1.5, dz)];
  s += PQ(dq, mixc('#1c2a30', '#33464c', on)) + PQ([PJ(-0.45, -0.5, dz), PJ(0.45, -0.5, dz), PJ(0.45, 0.05, dz), PJ(-0.45, 0.05, dz)], o.cabin ? '#ffd88a' : '#04080c');
  /* lâmpadas do teto */
  for (let k = 0; k < 7; k++) { const z = 2 + k * 2, a = PJ(-0.22, CE, z), b = PJ(0.22, CE, z), lit = on * (o.bulbs === undefined ? 1 : (hz(k, Math.floor(t * 9)) > (o.bulbs < 0.5 ? 0.4 : 0.1) ? 1 : 0.1)); s += R(a[0], a[1] - 3, b[0] - a[0], Math.max(3, 36 / z), mixc('#1a2c2a', '#d8fff0', lit)) + glow(Pf, 'B', (a[0] + b[0]) / 2, a[1] + 14, 330 / z * 1.6 + 30, 0.55 * lit); }
  s += R(-400, -400, 1880, 2720, '#000', OP(dim));
  return s + (o.over || '');
}
/* corrimão vertical + balanço do vagão */
const SWAY = (t, inner, a = 1) => G(inner, `translate(${f1(H.noise(t * 1.3, 3) * 6 * a)} ${f1(H.noise(t * 1.9, 5) * 4 * a)}) rotate(${f1(H.noise(t * 0.9, 7) * 0.5 * a)} 540 960)`);
/* janela do trem vista de perto (noite correndo + reflexo) */
const WINT = (Pf, t, o = {}) => { const sp = o.speed === undefined ? 1 : o.speed; let s = R(-400, -400, 1880, 2720, '#02050a');
  for (let i = 0; i < 26; i++) { const y = 300 + hz(i, 2) * 1200, w = 60 + hz(i, 3) * 400, x = ((hz(i, 1) * 1400 - t * (500 + hz(i, 4) * 900) * sp) % 1600 + 1600) % 1600 - 260; s += R(x, y, w, 4 + hz(i, 5) * 8, hz(i, 6) > 0.5 ? '#9fd8ff' : '#ffd88a', OP(0.5 * Math.min(1, sp * 2))); }
  if (sp < 0.3) s += o.out || '';
  s += R(40, 180, 1000, 1560, 'none', 'stroke="#10242a" stroke-width="60" rx="60"') + R(30, 170, 1020, 1580, 'none', 'stroke="#2c4a52" stroke-width="12" rx="70"') + (o.over || '');
  return s; };
/* estação deserta: plataforma, faixa amarela, colunas, bancos, relógio */
const STATIONN = (Pf, t, o = {}) => { const fl = Math.sin(t * 23) > 0.9 ? 0.5 : 1; let s = R(-400, -400, 1880, 2720, '#05090e') + R(-400, 1180, 1880, 900, '#161e26') + R(-400, 1160, 1880, 30, '#e8c14a') + R(-400, 1140, 1880, 22, '#0a1016');
  s += [0, 1, 2, 3].map(i => R(120 + i * 290, 460, 40, 700, '#2a3a44') + R(40 + i * 290, 440, 200, 30, '#3a4a54') + glow(Pf, 'B', 140 + i * 290, 470, 340, 0.3 * (hz(i, 3 + Math.floor(t * 3)) > 0.2 ? fl : 0.2))).join('');
  s += G(R(-30, -230, 460, 90, '#0a1016', 'rx="6" stroke="#2a3a44" stroke-width="5"') + TXT(200, -168, o.name || 'ESTAÇÃO', 46, '#9fd8ff'), 'translate(300 560)');
  s += R(100, 1040, 220, 20, '#2a3a44') + R(120, 1060, 12, 80, '#2a3a44') + R(290, 1060, 12, 80, '#2a3a44');
  return s + (o.over || ''); };
/* corredor escuro com lâmpadas piscando, onde deveria haver plataforma */
const DARKHALL = (Pf, t, o = {}) => { let s = BIG('#020306') + P('M0,0 L400,520 L680,520 L1080,0Z', '#0a1014') + P('M0,1920 L400,1400 L680,1400 L1080,1920Z', '#070b10') + P('M0,0 L400,520 L400,1400 L0,1920Z', '#0b1218') + P('M1080,0 L680,520 L680,1400 L1080,1920Z', '#0b1218') + R(400, 520, 280, 880, '#010204');
  [0, 1, 2, 3, 4].forEach(i => { const z = 1 + i * 0.7, y = 520 - 220 / (i + 1) + 60, on = hz(i, Math.floor(t * 11)) > 0.45; const w = 160 / (1 + i * 0.6); s += R(540 - w / 2, y, w, 10 / (1 + i * 0.4), on ? '#e8fff4' : '#1a2a2a') + (on ? glow(Pf, 'B', 540, y + 8, 300 / (1 + i * 0.5), 0.6) : ''); });
  return s + (o.over || ''); };
const DOORT = (Pf, t, x, y, sc, open = 0, o = {}) => G(R(-300, -520, 600, 1040, '#0a1216', 'stroke="#2a3c44" stroke-width="16"') + R(-290 - 0, -510, 290 * (1 - open) + 4, 1020, '#2c4650', 'stroke="#10202a" stroke-width="8"') + R(10 + 280 * open, -510, 280 * (1 - open) + 6, 1020, '#2c4650', 'stroke="#10202a" stroke-width="8"') + R(-250 * (1 - open) - 20, -300, 220 * (1 - open) + 20, 360, '#0a1824', OP(0.9)) + R(30 + 250 * open, -300, 220 * (1 - open) + 10, 360, '#0a1824', OP(0.9)) + (o.inside || ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* cabine do maquinista */
const CABINDOOR = (Pf, t, x, y, sc, o = {}) => { const k = o.knock || 0, sh = k ? H.noise(t * 60, 3) * 8 * k : 0; return G(R(-260, -470, 520, 940, '#25363c', 'stroke="#0a1418" stroke-width="14"') + R(-190, -380, 380, 270, '#02060a', 'stroke="#0a1418" stroke-width="12"') + (o.lit ? R(-180, -370, 360, 250, '#ffd88a', OP(0.35)) : '') + R(-120, -60, 240, 70, '#d8d0b0', 'rx="6" stroke="#0a1418" stroke-width="6"') + TXT(0, -10, 'MAQUINISTA', 40, '#2a2a2a') + C(150, 140, 20, '#8a9098') + R(-200, 200, 400, 14, '#0a1418', OP(0.5)), `translate(${f1(x + sh)} ${f1(y)}) scale(${sc})`); };
const SPKR = (Pf, t, x, y, sc, a = 0) => G(R(-120, -60, 240, 120, '#1a2428', 'rx="14" stroke="#0a1014" stroke-width="8"') + [0, 1, 2, 3, 4].map(i => L(-90, -36 + i * 18, 90, -36 + i * 18, '#0a1014', 6)).join('') + C(100, -80, 10, '#ff3b30', OP(0.4 + 0.6 * a)) + glow(Pf, 'R', 100, -80, 80, 0.8 * a) + (a ? [0, 1, 2].map(i => { const u = ((t * 1.6 + i / 3) % 1); return C(0, 0, 130 + 240 * u, 'none', `stroke="#ff6a5a" stroke-width="${f1(8 * (1 - u))}" ${OP(0.5 * a * (1 - u))}`); }).join('') : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* mapa de linha: estações com pontos (passageiros) que somem */
const LINEMAP = (Pf, t, n, o = {}) => { let s = BIG('#04080e') + glow(Pf, 'B', 540, 960, 800, 0.15); const xs = [0, 1, 2, 3, 4].map(i => 140 + i * 200), y = 960;
  s += L(100, y, 980, y, '#2a4a58', 14) + L(100, y, 980, y, '#9fd8ff', 4, OP(0.4));
  xs.forEach((x, i) => { s += C(x, y, 30, '#0a141c', 'stroke="#9fd8ff" stroke-width="8"'); const gone = i < n; if (i === 4 || true) { const alive = i >= n; s += C(x, y - 90, 20, alive ? '#ffd88a' : '#1a2a36', OP(alive ? 1 : 0.5)) + (!alive && i === n - 1 ? C(x, y - 90, 20 + 70 * ez((o.lt || 0) / 0.5), 'none', `stroke="#ff3b30" stroke-width="6" ${OP(1 - ez((o.lt || 0) / 0.5))}`) : ''); } });
  s += G(R(-26, -40, 52, 30, '#e8c14a', 'rx="8"') + C(-14, -6, 8, '#222') + C(14, -6, 8, '#222'), `translate(${f1(lp(xs[0], xs[Math.min(4, n)], 1) + 0)} ${y - 160})`, OP(0));
  s += G(R(-60, -34, 120, 52, '#e8c14a', 'rx="14"') + R(-48, -22, 30, 22, '#0a141c') + R(-12, -22, 30, 22, '#0a141c') + R(24, -22, 30, 22, '#0a141c'), `translate(${f1(lp(xs[Math.max(0, n - 1)], xs[Math.min(4, n)], ez((o.lt || 0) / 0.8)))} ${y})`);
  return s; };
/* trem de frente chegando na estação (hook) */
const TRAINFRONT = (Pf, t, p, o = {}) => { const z = lp(0.25, 1.4, ez(p)); let s = BIG('#03060a') + P('M0,1920 L440,820 L640,820 L1080,1920Z', '#0c1218');
  for (let i = 0; i < 14; i++) { const u = i / 13, w = lp(10, 340, u * u); s += L(540 - w, lp(820, 1920, u * u), 540 + w, lp(820, 1920, u * u), '#1e2c36', 6 * (0.5 + u)); }
  s += L(470, 820, 120, 1920, '#9aa4ae', 10, OP(0.7)) + L(610, 820, 960, 1920, '#9aa4ae', 10, OP(0.7));
  s += G(R(-230, -280, 460, 520, '#1c2a32', 'rx="46" stroke="#0a1014" stroke-width="12"') + R(-190, -240, 380, 190, '#0a1620', 'rx="20"') + C(-150, 160, 38, '#fff6d0') + C(150, 160, 38, '#fff6d0') + glow(Pf, 'W', -150, 160, 360, 0.9) + glow(Pf, 'W', 150, 160, 360, 0.9) + R(-60, -200, 120, 80, '#3a5a68', OP(0.8)), `translate(540 ${f1(1000 + 120 * (1 - z))}) scale(${f1(z * 1.6)})`);
  return s + glow(Pf, 'W', 540, 1000, 900 * z, 0.25); };
const PLATCROWD = (Pf, t, o = {}) => { let s = ''; for (let i = 0; i < 16; i++) { const x = 60 + i * 64 + hz(i, 3) * 30, sc = 0.6 + hz(i, 4) * 0.35; s += G(P('M-40,0 L-34,-170 Q-60,-182 -52,-248 Q-44,-300 -22,-306 Q0,-336 22,-306 Q44,-300 52,-248 Q60,-182 34,-170 L40,0Z', '#05070a') + (hz(i, 9) > 0.5 ? eyesPair('', 0, -255, 0.4, '#e8f4ff', 0.9, 40) : ''), `translate(${f1(x)} ${1240 + hz(i, 7) * 80}) scale(${sc.toFixed(2)})`); } return s; };
const PHOTOP = (Pf, t, x, y, sc, rot, old) => G(R(-110, -140, 220, 280, '#f0ece0', 'stroke="#c8c0a8" stroke-width="6"') + R(-92, -122, 184, 200, '#2a3a44') + G(FT(t, { kind: old ? 'old' : 'raf', eye: 0.9, noear: 1 }), 'translate(0 -30) scale(0.46)'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const GALLERY = (t, o = {}) => R(-165, -340, 330, 680, '#0b1118', 'rx="40"') + R(-165, -340, 330, 90, '#121b26', 'rx="40"') + R(-165, -290, 330, 40, '#121b26') + TXT(0, -270, o.title || 'Galeria', 28, '#fff') + TXT(110, -300, 'sem sinal', 16, '#ff6a5a') + (o.grid ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => R(-150 + (i % 3) * 102, -230 + Math.floor(i / 3) * 102, 96, 96, i === 0 ? '#3a5a68' : '#1a2a36', 'rx="6"')).join('') + R(-150, -230, 96, 96, 'none', 'stroke="#ffd23a" stroke-width="5" rx="6"') : '');
const NOSIG = (x, y, sc) => G([0, 1, 2, 3].map(i => R(-40 + i * 24, -12 - i * 8 + 24, 16, 8 + i * 8, '#5a6a76')).join('') + L(-50, 40, 60, -30, '#ff3b30', 8), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const RAILS = (Pf, t, o = {}) => { const sp = o.speed === undefined ? 1 : o.speed; let s = BIG('#04070b') + P('M0,1920 L460,700 L620,700 L1080,1920Z', '#0e151c');
  for (let i = 0; i < 18; i++) { const u = ((i / 18 + t * 0.9 * sp) % 1), v = u * u, y = lp(700, 1920, v), w = lp(80, 520, v); s += L(540 - w, y, 540 + w, y, '#2a1e18', lp(2, 22, v)); }
  s += L(500, 700, 140, 1920, '#aab4be', 8, OP(0.8)) + L(580, 700, 940, 1920, '#aab4be', 8, OP(0.8)) + glow(Pf, 'W', 540, 700, 360, 0.5);
  if (o.sparks) for (let i = 0; i < 10; i++) { const u = (t * 3 + hz(i, 1)) % 1; s += C(540 + (hz(i, 2) - 0.5) * 400 * u, 1400 + 500 * u, 3 + 3 * u, '#ffd88a', OP(1 - u)); }
  return s; };
