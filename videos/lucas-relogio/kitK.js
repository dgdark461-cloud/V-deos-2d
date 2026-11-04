PAL2.luc = { skin: '#c99a74', sh: '#9a6c4a', hair: '#1c140e', jk: '#2f7a84', jks: '#1e535c', pants: '#2a2e3a', pantsS: '#1a1d26', boot: '#141414' };
const DIG = (Pf, txt, x, y, sz, col = '#ff4a3a', a = 1, rot = 0) => G(glow(Pf, 'R', 0, -sz * 0.3, sz * 1.6, 0.35 * a) + TXE(txt, 0, 0, sz, 9, col, { stroke: '#050000', a }), `translate(${f1(x)} ${f1(y)}) rotate(${rot})`);
const PHONE = (Pf, t, x, y, sc, o = {}) => { let s = glow(Pf, 'B', 0, 0, 700, 0.5 * (o.on === undefined ? 1 : o.on)) + R(-215, -440, 430, 880, '#07090d', `rx="46" stroke="${o.rim || '#4a6a8a'}" stroke-width="6"`) + R(-195, -420, 390, 840, o.bg || '#0a1c2c', 'rx="34"');
  if (o.time) s += TXE(o.time, 0, o.msg ? -250 : 40, o.msg ? 150 : 200, 9, o.tcol || '#ffffff', { stroke: '#000' });
  if (o.msg) { o.msg.forEach((ln, i) => { s += TXE(ln, 0, -30 + i * 54, 50, 9, '#fff', { stroke: '#000' }); }); s = s.replace('@@', ''); }
  if (o.bubble) { const h = 60 + o.bubble.length * 56; s += R(-170, -80, 340, h, o.bcol || '#1d5a8a', `rx="26" opacity="0.95"`); o.bubble.forEach((ln, i) => { s += TXE(ln, 0, -30 + i * 54, 46, 9, '#fff', { stroke: '#0a1c2c' }); }); }
  s += R(-60, -432, 120, 18, '#000', 'rx="9"');
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
/* quarto 2.5D em camadas */
const ROOML = (Pf, t, o = {}) => { const wall = BIG('#0b1220') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(-100 + i * 170, -100, 70, 1700, '#0e1626', OP(0.6))).join('') + R(-100, 1450, 1280, 600, '#0a0d14') + R(-100, 1430, 1280, 30, '#05070b');
  const win = WINF(660, 360, 300, 480, 'night') + glow(Pf, 'B', 810, 600, 500, 0.25);
  const bed = R(-120, 1050, 700, 300, '#1e5a64', `rx="30" stroke="${OD}" stroke-width="6"`) + R(-120, 880, 90, 520, '#241812', `stroke="${OD}" stroke-width="6"`) + R(-20, 1000, 260, 110, '#cfd8dc', `rx="40" stroke="${OD}" stroke-width="5"`) + R(240, 1130, 340, 220, '#174850', `rx="20"`);
  const ns = R(700, 1160, 320, 300, '#2a1a12', `stroke="${OD}" stroke-width="6"`) + R(720, 1180, 280, 120, '#1c1008') + R(800, 1100, 120, 62, '#0a0c10', `rx="10" stroke="${o.rim || '#4a6a8a'}" stroke-width="3"`) + (o.phoneGlow ? glow(Pf, 'B', 860, 1100, 360, o.phoneGlow) : '');
  return [{ d: 0.12, svg: wall }, { d: 0.25, svg: win }, { d: 0.55, svg: bed }, { d: 0.85, svg: ns }]; };
/* armario com porta de espelho. origem = centro do chao */
const WARD = (Pf, t, x, y, sc, o = {}) => { const oL = o.openL || 0, oR = o.openR || 0, sL = Math.cos(oL * Math.PI * 0.42), sR = Math.cos(oR * Math.PI * 0.42);
  let s = E(0, 6, 340, 20, '#000', OP(0.5)) + R(-290, -1010, 580, 1010, '#2a1a12', `stroke="${OD}" stroke-width="8"`) + R(-262, -980, 524, 950, '#040302');
  if (o.light) s += glow(Pf, 'B', -60, -60, 320, o.light) + R(-110, -50, 150, 24, '#cfe9ff', `rx="6" ${OP(o.light)}`);
  if (o.eyes) s += o.eyes;
  s += G(R(0, -1000, 280, 1000, '#4a2c1a', `stroke="${OD}" stroke-width="8"`) + R(30, -950, 220, 400, '#3a2314') + R(30, -520, 220, 440, '#3a2314') + C(240, -480, 12, '#c8a050'), `translate(-290 0) scale(${sL.toFixed(3)} 1)`);
  const cp = `${Pf}wm`; s += `<defs><clipPath id="${cp}"><rect x="20" y="-960" width="240" height="880" rx="8"/></clipPath></defs>`;
  s += G(R(0, -1000, 280, 1000, '#4a2c1a', `stroke="${OD}" stroke-width="8"`) + R(20, -960, 240, 880, '#152330') + `<g clip-path="url(#${cp})">` + (o.refl ? o.refl : '') + R(20, -960, 240, 880, '#7ab0cc', OP(0.12)) + `</g>` + P('M40,-940 L130,-940 L40,-760Z M150,-940 L190,-940 L40,-560Z', '#fff', OP(0.08)) + R(20, -960, 240, 880, 'none', `stroke="#8aa8b8" stroke-width="6"`), `translate(290 0) scale(${(-sR).toFixed(3)} 1)`);
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
