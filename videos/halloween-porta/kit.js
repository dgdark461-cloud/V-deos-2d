/* kit.js - O Duplo: paleta, rostos, cenarios e interfaces de celular */
const withPal = (over, fn) => { const sv = {}; for (const k in over) sv[k] = PAL[k]; Object.assign(PAL, over); try { return fn(); } finally { Object.assign(PAL, sv); } };
const ANA = { skin: '#c68a64', skinSh: '#966044', hair: '#14121c', hairHi: '#3c3550', sweater: '#d9a23a', sweaterSh: '#a87a24', scarf: '#2d7a78' };
const MAE = { skin: '#d8a584', skinSh: '#a8765a', hair: '#b9b4c0', hairHi: '#e2dfe8', sweater: '#8a4a6a', sweaterSh: '#5a2e44', scarf: '#d8c8a0' };
const AF = (o, x, y, sc) => withPal(ANA, () => G(womanFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
const DF = (o, x, y, sc) => AF(Object.assign({ smile: 0.7, eye: 1, pupil: 0.5 }, o, { eye: 1 }), x, y, sc);
const MF = (o, x, y, sc) => withPal(MAE, () => G(womanFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
const anaFig = o => { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#c9964a', jacketDk: '#9a6e30', jacketLt: '#e0b878', shirt: '#2d7a78', pants: '#1d2230', pantsDk: '#12151e', boot: '#2a1c18', bootDk: '#1a1210', sole: '#0e0a08', skin: '#c68a64', skinDk: '#966044', hair: '#14121c', pack: '#6a2a3a', packDk: '#4a1a28' }); try { return hikerFig(Object.assign({ cap: 0, bag: 0, hair: 1 }, o)); } finally { Object.assign(HK, sv); } };
const ANAFIG = (t, x, y, sc, o = {}) => G(anaFig(Object.assign({ t, view: 's', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);

/* ---------- cenarios ---------- */
const wallStripes = (col, a) => { let s = ''; for (let i = 0; i < 20; i++) s += R(-300 + i * 90, -100, 36, 1700, col, OP(a)); return s; };
function LIV(Pf, t, o = {}) {
  const d = Object.assign({ tv: 1, lamp: 1, shoes: 1, glass: 1, key: 0 }, o), fl = 0.75 + 0.25 * Math.sin(t * 13) * Math.sin(t * 5.3);
  let s = BIG('#1d2434') + wallStripes('#222b3d', 1) + R(-300, 1380, 1680, 700, '#3a2a22') + R(-300, 1372, 1680, 14, '#14100e');
  for (let i = 0; i < 12; i++) s += R(-300, 1400 + i * 56, 1680, 3, '#2a1e18');
  /* janela */
  s += G(R(-130, -190, 260, 380, '#0c1830', 'stroke="#c9c2b4" stroke-width="14"') + L(0, -190, 0, 190, '#c9c2b4', 10) + L(-130, 0, 130, 0, '#c9c2b4', 10) + C(60, -110, 26, '#dbe9f4', OP(0.8)) + glow(Pf, 'B', 60, -110, 160, 0.5), 'translate(250 640)') + P('M80,420 Q150,640 100,900 L40,900 L40,420Z', '#4a2a3a') + P('M420,420 Q350,640 400,900 L460,900 L460,420Z', '#4a2a3a');
  /* estante + TV */
  s += R(60, 1250, 520, 140, '#2a1e18') + R(60, 1244, 520, 10, '#3a2a22') + R(130, 980, 380, 250, '#08090c', 'rx="12"') + R(145, 995, 350, 220, d.tv ? '#1c3d55' : '#0c0f14', 'rx="6"');
  if (d.tv) { s += glow(Pf, 'B', 320, 1100, 520, 0.45 * fl) + E(320, 1105, 90, 70, '#3a8ab0', OP(0.5)) + R(150, 1150, 340, 60, '#2a6a90', OP(0.5 * fl)) + E(260, 1060, 26, 26, '#f0c060') + L(150, 1120, 490, 1120, '#8fd0f0', 3, OP(0.4)); }
  s += R(300, 1226, 40, 24, '#08090c');
  /* sofa */
  s += R(560, 1010, 480, 300, '#6a3a52', 'rx="40"') + R(540, 1180, 520, 180, '#7a4660', 'rx="34"') + R(500, 1060, 70, 300, '#5a2e44', 'rx="30"') + R(1030, 1060, 70, 300, '#5a2e44', 'rx="30"') + R(580, 1230, 440, 40, '#000', OP(0.15)) + R(560, 1350, 30, 40, '#14100e') + R(1010, 1350, 30, 40, '#14100e') + R(720, 1090, 150, 110, '#c9964a', 'rx="22"') + L(560, 1180, 1040, 1180, '#5a2e44', 4);
  /* mesa + copo */
  s += R(280, 1500, 520, 36, '#5a4030', 'rx="8"') + R(300, 1536, 24, 120, '#3a281c') + R(756, 1536, 24, 120, '#3a281c') + R(320, 1560, 440, 110, '#000', OP(0.12));
  if (d.glass) s += G(P('M-34,-100 L34,-100 L28,0 L-28,0Z', 'rgba(190,225,245,0.28)', 'stroke="rgba(220,240,255,0.7)" stroke-width="4"') + P('M-31,-70 L31,-70 L28,0 L-28,0Z', 'rgba(120,190,230,0.45)') + L(-20, -92, -16, -20, 'rgba(255,255,255,0.6)', 5) + [0, 1, 2].map(i => C(-14 + i * 14, -36 + i * 12, 3, 'rgba(255,255,255,0.7)')).join(''), 'translate(540 1500)');
  if (d.key) s += G(C(0, 0, 14, 'none', 'stroke="#c8d2dc" stroke-width="6"') + R(8, -5, 60, 10, '#c8d2dc') + R(46, 5, 8, 14, '#c8d2dc') + R(58, 5, 8, 12, '#c8d2dc'), 'translate(660 1494)');
  if (d.shoes) s += SHOES(860, 1560, 1);
  /* abajur */
  if (d.lamp) s += glow(Pf, 'A', 1040, 760, 620, 0.55) + R(1030, 880, 20, 500, '#14100e') + P('M960,880 L1120,880 L1090,740 L990,740Z', '#f0c070') + E(1040, 1380, 70, 14, '#14100e');
  /* planta */
  s += G(R(-40, 0, 80, 90, '#6a3a2a', 'rx="10"') + [-1, 0, 1].map(i => P(`M0,0 Q${i * 60},-120 ${i * 90},-200 Q${i * 30},-110 0,0Z`, '#2d6a4a')).join(''), 'translate(120 1360)');
  return s;
}
function KITCH(Pf, t, o = {}) {
  let s = BIG('#232a38') + wallStripes('#2a3345', 0.8) + R(-300, 1300, 1680, 700, '#2a2e3a') + R(-300, 1292, 1680, 14, '#14161c');
  s += R(-100, 1100, 1300, 200, '#4a3a30') + R(-100, 1088, 1300, 24, '#8a7a6a') + R(100, 600, 480, 360, '#1c2230', 'rx="14"') + R(580, 640, 360, 320, '#1c2230', 'rx="14"') + glow(Pf, 'A', 540, 1000, 700, 0.35);
  s += G(C(0, 0, 14, 'none', 'stroke="#c8d2dc" stroke-width="7"') + R(8, -6, 70, 12, '#c8d2dc') + R(52, 6, 9, 16, '#c8d2dc') + R(66, 6, 9, 13, '#c8d2dc') + R(-34, 8, 22, 40, '#ff6a50', 'rx="6"'), 'translate(540 1070)');
  return s;
}
function BEDR(Pf, t, o = {}) {
  const d = Object.assign({ sleeper: 1, empty: 0, lamp: 1 }, o), br = 1 + 0.016 * Math.sin(t * 1.5);
  let s = BIG('#141a2a') + wallStripes('#182034', 1) + R(-300, 1500, 1680, 700, '#2e2228') + R(-300, 1492, 1680, 12, '#0e0a10');
  s += G(R(-120, -170, 240, 340, '#0a1428', 'stroke="#b8b2a6" stroke-width="12"') + L(0, -170, 0, 170, '#b8b2a6', 8) + C(50, -90, 24, '#dbe9f4', OP(0.8)) + glow(Pf, 'B', 50, -90, 260, 0.6), 'translate(170 560)') + glow(Pf, 'B', 170, 700, 800, 0.22);
  /* cabeceira + travesseiros + colchao */
  s += R(160, 600, 760, 440, '#2a2038', 'rx="40"') + R(190, 630, 700, 380, '#34294a', 'rx="30"') + E(400, 1010, 170, 56, '#e8e2f0') + E(680, 1010, 170, 56, '#ddd6ea') + E(400, 1000, 150, 22, '#fff', OP(0.5)) + E(680, 1000, 150, 22, '#fff', OP(0.4));
  if (d.empty) s += E(540, 1020, 130, 38, '#b8b0c8', OP(0.55)) + P('M300,1130 Q520,1060 780,1140 Q560,1200 340,1190Z', '#3a3258', OP(0.8));
  else s += G(withPal(ANA, () => G(womanFace({ eye: 0, mouth: 0, scarf: 0, bodyLen: 0, t }), 'translate(0 0) scale(0.55)')), 'translate(540 930) rotate(2)');
  /* cobertor */
  s += G(P('M-440,0 Q-300,-70 0,-60 Q300,-70 440,0 L470,420 L-470,420Z', d.empty ? '#4a4068' : '#6a5a9a') + P('M-440,0 Q-300,-70 0,-60 Q300,-70 440,0', 'none', 'stroke="#8a7ab8" stroke-width="12"') + [0, 1, 2].map(i => P(`M${-380 + i * 280},40 Q${-300 + i * 280},120 ${-340 + i * 280},300`, 'none', 'stroke="#000" stroke-width="6" opacity="0.12"')).join(''), `translate(540 1110) scale(1 ${d.empty ? 1 : br.toFixed(4)})`);
  if (!d.empty) s += G(P('M0,-14 L190,34 L190,66 L0,22Z', '#c68a64') + C(204, 52, 30, '#c68a64') + L(84, 0, 112, 36, '#c0707a', 5), 'translate(560 1250) rotate(10)');
  /* criado-mudo + abajur */
  s += R(980, 1250, 220, 250, '#3a2a30') + R(970, 1240, 240, 16, '#4a3a40') + (d.lamp ? glow(Pf, 'A', 1090, 1080, 460, 0.3) + P('M1040,1240 L1140,1240 L1120,1120 L1060,1120Z', '#f0c070', OP(0.9)) : '');
  return s;
}
function HALLW(Pf, t, dist, gy = 1500, o = {}) { let s = BIG(o.col || '#10151e') + R(-300, gy, 1680, 900, '#241a1e') + R(-300, gy - 4, 1680, 8, '#000', OP(0.4)); const base = Math.floor(dist / 380); for (let k = -1; k <= 4; k++) { const i = k + base, x = k * 380 - (dist - base * 380); s += R(x, gy - 900, 220, 900, '#1a2030') + R(x + 220, gy - 900, 160, 900, '#121828') + R(x, gy - 900, 6, 900, '#2a3448') + (hz(i, 5) > 0.5 ? R(x + 30, gy - 760, 150, 220, '#0a0e16') + R(x + 40, gy - 750, 130, 200, 'rgba(240,176,96,0.12)') : '') + R(x + 90, gy - 1000, 8, 100, '#000', OP(0.3)); } return s; }
function STREET(Pf, t, dist, o = {}) {
  const gy = o.gy || 1500; let s = BIG('#1a2038');
  s += R(-300, 0, 1680, gy, '#2a2c4a', OP(0.7)) + R(-300, gy - 700, 1680, 700, 'rgba(224,138,90,0.12)') + glow(Pf, 'A', 760, gy - 500, 700, 0.3);
  const lay = (sp, w, col, hh, lit) => { const off = dist * sp, base = Math.floor(off / w); let q = ''; for (let k = -1; k <= Math.ceil(1480 / w) + 1; k++) { const i = k + base, x = k * w - (off - base * w), h = hh * (0.6 + 0.8 * hz(i, 3)); q += R(x, gy - 60 - h, w * 0.9, h + 60, col); if (lit) for (let r = 0; r < 6; r++) for (let c2 = 0; c2 < 2; c2++) if (hz(i * 17 + r * 3 + c2, 4) > 0.45) q += R(x + 24 + c2 * (w * 0.4), gy - 60 - h + 30 + r * 60, w * 0.22, 34, '#f0c070', OP(0.55)); } return q; };
  s += lay(0.15, 300, '#161a2c', 900, 1) + lay(0.35, 360, '#10141f', 700, 1);
  s += R(-300, gy, 1680, 900, '#171a26') + R(-300, gy, 1680, 10, '#000', OP(0.4)) + R(-300, gy + 40, 1680, 6, '#2a2e3e');
  { const off = dist, base = Math.floor(off / 600); for (let k = -1; k <= 3; k++) { const x = k * 600 - (off - base * 600) + 200; s += R(x - 6, gy - 560, 12, 560, '#0a0c12') + R(x - 40, gy - 580, 90, 20, '#0a0c12') + glow(Pf, 'A', x + 20, gy - 560, 260, 0.5); } }
  return s;
}
/* ---------- celular ---------- */
function phoneFrame(Pf, x, y, sc, inner, o = {}) { return G(glow(Pf, 'B', 0, 0, 440, o.glow === undefined ? 0.45 : o.glow) + R(-130, -250, 260, 500, '#0d1117', 'rx="34" stroke="#2c3440" stroke-width="8"') + R(-114, -234, 228, 468, o.bg || '#0b1620', 'rx="24"') + R(-40, -226, 80, 12, '#000', 'rx="6"') + inner, `translate(${f1(x + (o.shake ? H.noise((o.t || 0) * 50, 1) * o.shake : 0))} ${f1(y)}) rotate(${o.rot || 0}) scale(${sc})`); }
const bubble = (x, y, w, txt, me, col) => G(R(x - w / 2, y - 26, w, 52, col || (me ? '#2a7a58' : '#2a3648'), 'rx="22"') + TXT(x, y + 9, txt, 22, '#f0f4fa'), '');
const SCR = {
  notif: (name, txt, t) => R(-104, -200, 208, 100, '#1c2838', 'rx="20"') + C(-76, -168, 18, '#2a7a58') + TXT(-30, -170, name, 20, '#8fb0d6', 'text-anchor="start"') + TXT(0, -130, txt, 24, '#f0f4fa'),
  chat: (msgs) => msgs.map((m, i) => bubble(m.me ? 30 : -20, -150 + i * 70, Math.min(190, 20 + m.t.length * 12), m.t, m.me)).join('') + TXT(0, -212, 'MÃE', 22, '#8fb0d6'),
  call: (t, name) => MF({ eye: 1, smile: 0.2, scarf: 0, t }, 0, -80, 0.2) + TXT(0, 60, name, 38, '#f0f4fa') + TXT(0, 92, 'chamando...', 22, '#8fb0d6') + C(-60, 170, 34, '#d04040') + C(60, 170, 34 + 3 * Math.sin(t * 9), '#3ac060') + P('M48,170 q8,-14 24,-6', 'none', 'stroke="#fff" stroke-width="7"'),
};
/* ---------- utilidades de cena ---------- */
const lp = (a, b, u) => a + (b - a) * u;
const CM = (Pf, t, s, lt, dur, o = {}) => { const u = ez(Math.min(1, lt / dur)), q = (a, b, d) => a === undefined ? d : (b === undefined ? a : a + (b - a) * u); return camG(t, q(o.x0, o.x1, 540), q(o.y0, o.y1, 960), q(o.z0, o.z1, 1), q(o.r0, o.r1, 0) + 0.3 * Math.sin(t * 1.7), o.shk === undefined ? 1.5 : o.shk, s) + vignette(Pf, 1) + grain(t, 0.08); };
const PUNCH = (lt, a = 0.5, col = '#fff') => FB(col, a * Math.exp(-lt * 16));
const FOC = (px, py, z, d = 1) => ({ x: 540 + (1 + (z - 1) * d) * (px - 540) / d, y: 960 + (1 + (z - 1) * d) * (py - 960) / d, z });
const PARS = (Pf, t, lt, dur, c0, c1, layers, shk = 1.2) => { const u = ez(Math.min(1, lt / dur)), q = k => c0[k] + (c1[k] - c0[k]) * u, sx = H.noise(t * 30, 3) * shk, sy = H.noise(t * 30, 4) * shk; return par(Pf, { x: q('x') + sx, y: q('y') + sy, z: q('z') }, layers) + vignette(Pf, 1) + grain(t, 0.08); };
const KEY = (x, y, sc, rot = 0) => G(C(0, 0, 22, 'none', 'stroke="#d8dee6" stroke-width="10"') + R(14, -8, 110, 16, '#d8dee6', 'rx="4"') + R(88, 8, 12, 22, '#d8dee6') + R(108, 8, 12, 18, '#d8dee6') + L(-6, 18, -20, 60, '#ff6a50', 6) + R(-40, 56, 40, 56, '#ff6a50', 'rx="8"') + TXT(-20, 96, '♥', 28, '#fff'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const HANDA = (x, y, sc, rot = 0) => G(E(0, 0, 40, 52, '#c68a64') + E(-30, -18, 11, 34, '#c68a64', 'transform="rotate(14 -30 -18)"') + E(-10, -52, 11, 38, '#c68a64') + E(12, -54, 11, 40, '#c68a64') + E(32, -42, 10, 34, '#c68a64', 'transform="rotate(-10 32 -42)"') + E(44, 14, 10, 30, '#c68a64', 'transform="rotate(-50 44 14)"'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const ARMX = (x, y, sc, rot = 0, scar = 1) => G(P('M-260,-60 Q-120,-80 80,-50 Q150,-40 200,-30 L210,50 Q120,70 -60,70 Q-180,60 -260,50Z', '#c68a64') + P('M-260,-60 L-260,50 L-330,60 L-330,-70Z', '#d9a23a') + E(240, 10, 60, 56, '#c68a64') + (scar ? L(-20, -10, 30, 30, '#d98a8a', 7) + L(-14, 14, 18, -6, '#e0a0a0', 3) : ''), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const DOORX = (Pf, t, o = {}) => { const open = o.open || 0; return BIG('#1a2036') + wallStripes('#1e263c', 1) + R(-300, 1500, 1680, 500, '#171a26') + R(300, 360, 480, 1140, '#0e1220', 'rx="6"') + (open ? G(R(0, 0, 440, 1100, '#f0b060', OP(0.9)) + glow(Pf, 'A', 220, 550, 700, 0.6 * open), 'translate(320 380)') : '') + P(`M320,380 L${320 + 440 * (1 - open * 0.9)},${380 - 20 * open} L${320 + 440 * (1 - open * 0.9)},${1500 + 10 * open} L320,1500Z`, '#4a3426') + R(350 + 0, 760, 12, 12, '#d8d0c0') + C(320 + 440 * (1 - open * 0.9) - 40, 960, 18, '#d8d0c0') + TXT(540, 320, '4B', 60, '#b8b0a0') + glow(Pf, 'A', 960, 500, 420, 0.4) + R(940, 440, 40, 120, '#f0c070'); };
const SOLO = (Pf, t) => BIG('#1c2332') + R(-300, 1250, 1680, 800, '#2a2e3a') + R(100, 1230, 900, 40, '#8a7a6a') + G(R(-60, -120, 120, 120, '#e8e0d0', 'rx="14"') + R(56, -90, 40, 60, 'none', 'rx="20" stroke="#e8e0d0" stroke-width="14"') + E(0, -120, 56, 12, '#6a4a30'), 'translate(540 1230) scale(2.2)') + G(R(-40, -60, 80, 60, 'rgba(200,225,240,0.3)', 'stroke="#c8dce8" stroke-width="4"') + R(-6, -150, 12, 110, '#2d7a78', 'rx="6"') + R(-12, -176, 24, 34, '#f0f4fa', 'rx="8"'), 'translate(860 1230) scale(2)') + glow(Pf, 'A', 540, 900, 700, 0.3);

function SHOES(x, y, sc) { let s = ''; for (const sx of [0, 1]) s += G(E(0, 4, 74, 12, 'rgba(0,0,0,0.35)') + P('M-70,0 L-70,-26 Q-60,-52 -20,-50 L22,-44 Q70,-34 74,-6 L74,0Z', '#2a1c18') + R(-70, -6, 144, 10, '#0e0a08', 'rx="4"') + L(-20, -48, 20, -32, '#d8d0c0', 4) + L(-6, -50, 34, -36, '#d8d0c0', 4), `translate(${f1(x - 60 + sx * 120)} ${f1(y + sx * 8)}) scale(${sx ? 0.98 : 1})`); return G(s, `scale(${sc})`, `transform-origin="${x} ${y}"`) .replace(/^/, ''); }
SCR.contacts = (t, sel) => TXT(0, -200, 'CONTATOS', 22, '#8fb0d6') + ['Ana', 'Beto', 'Carla', 'Dani', 'Edu', 'Fê'].map((n, i) => R(-100, -170 + i * 54, 200, 46, i === sel ? '#2a4a6a' : '#1c2838', 'rx="14"') + C(-72, -147 + i * 54, 14, ['#c9964a', '#2d7a78', '#a85a6a', '#6a5aa0', '#4a8a5a', '#a0703a'][i]) + TXT(10, -138 + i * 54, n, 22, '#f0f4fa')).join('');
SCR.post = (t, o = {}) => C(-80, -200, 22, '#c68a64') + DF({ eye: 1, scarf: 0, smile: 0.6, bodyLen: 0, t }, -80, -200, 0.09) + TXT(10, -204, 'você', 22, '#f0f4fa') + TXT(10, -180, 'há 3 s', 16, '#8fb0d6') + G(R(-104, -160, 208, 150, '#1c1830', 'rx="10"') + R(-70, -90, 140, 80, '#6a5a9a', 'rx="12"') + DF({ eye: 1, scarf: 0, smile: 0.9, bodyLen: 0, t }, 0, -90, 0.22), '') + TXT(0, 20, 'Finalmente em casa.', 20, '#f0f4fa') + TXT(0, 46, 'Que bom estar de volta.', 20, '#f0f4fa') + (o.hearts ? TXT(-70, 90, '♥ ' + o.hearts, 22, '#ff5a6a') : '');
SCR.comments = (n, t) => TXT(0, -212, 'COMENTÁRIOS', 18, '#8fb0d6') + ['Que saudade!!', 'Bem-vinda de volta', 'Te amo', 'Finalmente!', 'Que bom ❤'].slice(0, n).map((c, i) => G(C(-86, -170 + i * 56, 16, ['#c9964a', '#2d7a78', '#a85a6a', '#6a5aa0', '#4a8a5a'][i]) + R(-60, -190 + i * 56, 170, 40, '#1c2838', 'rx="14"') + TXT(25, -163 + i * 56, c, 18, '#f0f4fa'), '')).join('');
const BATHD = (Pf, t, lit) => BIG('#0e121c') + wallStripes('#141a28', 1) + R(-300, 1500, 1680, 500, '#171a26') + glow(Pf, 'A', 540, 1000, 800, 0.5 * lit) + R(340, 400, 400, 1100, '#0a0d14', 'rx="6"') + R(540 - 150 * lit, 410, 300 * lit, 1080, '#f4e0a8', OP(0.95)) + R(340, 400, 400, 1100, 'none', 'stroke="#4a3426" stroke-width="22"') + R(300, 1500, 480, 10, '#000', OP(0.4));
