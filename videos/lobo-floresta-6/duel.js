/* duel.js - arte do duelo lobo x homem (sala de laboratorio, luz e sombras) */
const DL = { wall: '#16222a', wall2: '#0d161c', floor: '#0b1217', floorL: '#1c2a32', lamp: '#ffe3a8' };
const DUELBG = (Pf, t, o = {}) => {
  const d = Object.assign({ lamp: 1, sway: 1, x: 540, tv: 0.0, fog: 0.5 }, o), sw = Math.sin(t * 1.6) * 26 * d.sway;
  let s = BIG(DL.wall2);
  s += R(-300, 0, 1680, 1300, DL.wall) + R(-300, 0, 1680, 380, '#0a1015', OP(0.6));
  for (let i = -2; i < 8; i++) s += L(i * 220 + 40, 0, i * 220 + 40, 1300, '#000', 3, OP(0.35));
  for (let i = 0; i < 6; i++) s += L(-300, 240 * i + 120, 1380, 240 * i + 120, '#000', 3, OP(0.22));
  s += R(-300, 1300, 1680, 700, DL.floor) + R(-300, 1296, 1680, 10, '#000', OP(0.6));
  for (let i = 0; i < 9; i++) s += L(-300 + i * 230, 1300, -1100 + i * 460, 1920, '#000', 3, OP(0.25));
  /* jaula ao fundo (esq) e porta de metal (dir) */
  s += G([0, 1, 2, 3, 4, 5].map(i => R(-8 + i * 56, 380, 14, 880, '#05080b')).join('') + R(-20, 380, 330, 16, '#05080b') + R(-20, 1244, 330, 16, '#05080b'), 'translate(30 0)', OP(0.85));
  s += G(R(-130, -420, 260, 420, '#1d272e', 'stroke="#05080b" stroke-width="10"') + L(-130, -210, 130, -210, '#05080b', 6) + C(86, -200, 12, '#3b4a54') + R(-100, -380, 200, 90, '#0e171d'), 'translate(930 1260)');
  if (d.tv) s += G(R(-120, -90, 240, 180, '#05080a', 'rx="10"') + R(-104, -74, 208, 148, '#0a2a36') + glow(Pf, 'T', 0, 0, 340, 0.45 * d.tv), 'translate(540 640)');
  /* lampada pendurada e cone de luz */
  const lx = d.x + sw, ly = 300;
  s += L(lx - sw * 0.0, -50, lx, ly - 40, '#05080b', 6);
  if (d.lamp) {
    s += P(`M${f1(lx - 40)},${ly} L${f1(lx + 40)},${ly} L${f1(lx + 520 + sw)},1320 L${f1(lx - 520 + sw)},1320Z`, DL.lamp, OP(0.1 * d.lamp));
    s += P(`M${f1(lx - 30)},${ly} L${f1(lx + 30)},${ly} L${f1(lx + 330 + sw)},1320 L${f1(lx - 330 + sw)},1320Z`, DL.lamp, OP(0.1 * d.lamp));
    s += E(lx + sw, 1330, 560, 90, DL.lamp, OP(0.18 * d.lamp)) + E(lx + sw, 1330, 330, 52, DL.lamp, OP(0.18 * d.lamp));
    s += glow(Pf, 'L', lx, ly, 360, 0.85 * d.lamp) + P(`M${f1(lx - 54)},${ly} L${f1(lx + 54)},${ly} L${f1(lx + 30)},${ly - 36} L${f1(lx - 30)},${ly - 36}Z`, '#2a343c') + E(lx, ly + 4, 34, 14, '#fff6dc');
    /* poeira */
    for (let i = 0; i < 26; i++) { const px = lx + (hz(i, 3) - 0.5) * 620 + sw * (i / 26), py = 380 + ((hz(i, 8) * 1000 + t * (22 + 20 * hz(i, 5))) % 940); s += C(px, py, 1.5 + 2.5 * hz(i, 9), '#fff2cf', OP(0.12 + 0.3 * hz(i, 2))); }
  }
  return s + glow(Pf, 'V', 540, 1000, 1100, 0.0);
};
/* sombra projetada no chao: elipse + sombra alongada pelo ponto de luz */
const CSHADOW = (x, y, w, o = {}) => E(x, y, w, w * 0.14, '#000', OP(0.55)) + E(x + (o.dx || 0), y + 4, w * 1.5, w * 0.2, '#000', OP(0.22));
const SHADE = (w, h, y0, a = 0.5) => R(-w, y0, w * 2, h, '#000', `style="mix-blend-mode:multiply" opacity="${a}"`);
/* lobo (perfil) com sombra e luz de contorno */
const WOLFX = (Pf, t, x, y, sc, o = {}) => {
  const d = Object.assign({ flip: 1, mouth: 0.4, head: 0.2, crouch: 0.6, tail: 0.3, dark: 0.15, glow: 1, phase: 0, run: 0, lunge: 0, rim: 0.6 }, o);
  const w = wolfSide(Object.assign({ t }, d));
  return CSHADOW(x - 30 * d.flip * sc, y + 6, 260 * sc, { dx: -60 * d.flip * sc }) + G(w + (d.rim ? P('M-210,-210 Q-120,-262 40,-250 L150,-246', 'none', `stroke="#ffe3a8" stroke-width="5" stroke-linecap="round" opacity="${0.4 * d.rim}"`) : ''), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc * d.flip)} ${f1(sc)})`);
};
const MANX = (Pf, t, x, y, sc, o = {}) => {
  const d = Object.assign({ flip: 1, walk: 0, eyes: 1, rim: 0.7, point: 0, col: '#06090d', lantern: 0 }, o);
  return CSHADOW(x, y + 4, 170 * sc, { dx: 140 * sc * d.flip }) + G(manJacket(Pf, Object.assign({ t, lantern: 0 }, d)), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc * d.flip)} ${f1(sc)})`);
};
const SHOUT = (x, y, sc, t, a = 1) => G([0, 1, 2].map(i => P(`M${60 + i * 46},${-50 - i * 14} Q${100 + i * 46},0 ${60 + i * 46},${50 + i * 14}`, 'none', `stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${a * (0.8 - 0.2 * i) * (0.6 + 0.4 * Math.sin(t * 18 - i))}"`)).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* ---- props da sala ---- */
const TVF = (Pf, t, x, y, sc, inner, o = {}) => {
  const id = Pf + 'tvc';
  let s = R(-300, -240, 600, 480, '#07090c', 'rx="28" stroke="#1b232a" stroke-width="10"') + `<clipPath id="${id}"><rect x="-270" y="-210" width="540" height="420" rx="14"/></clipPath>`;
  let v = R(-270, -210, 540, 420, '#0a1e26') + inner;
  for (let i = 0; i < 22; i++) v += R(-270, -210 + i * 19 + ((t * 30) % 19), 540, 4, '#000', OP(0.22));
  v += R(-270, -210, 540, 420, '#7fd8ff', OP(0.05)) + (o.glitch ? R(-270, -210 + hz(Math.floor(t * 14), 3) * 400, 540, 12 + 30 * hz(Math.floor(t * 14), 4), '#fff', OP(0.25)) : '');
  s += G(v, '', `clip-path="url(#${id})"`);
  if (o.rec !== false) s += C(-236, -180, 9, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 5))) + TXT(-176, -170, 'REC', 28, '#fff', 'text-anchor="start" opacity="0.85"').replace('text-anchor="middle"', '').replace('x="-176"', 'x="-216"') + TXT(190, -170, o.stamp || '03:12', 28, '#fff', 'opacity="0.85"');
  return G(s + glow(Pf, 'Q', 0, 0, 620, 0.35), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const ROOMIN = (Pf, t, o = {}) => G(DUELBG(Pf + 'z', t, o) + WOLFX(Pf, t, 330, 1420, 0.85, { mouth: 0.5, dark: 0.5, crouch: 0.8 }) + (o.you === 0 ? '' : G(heroFig({ t, view: 's', idle: 1 }), 'translate(760 1430) scale(0.95) scale(-1 1)') + (o.gun === 0 ? '' : G(gunObj(0, 0, 1.0, -8), 'translate(660 1170) scale(-1 1)'))), 'translate(-270 -495) scale(0.5)');
const LISTP = (x, y, sc, rot = 0, o = {}) => G(R(-190, -260, 380, 520, '#efe7d2', 'rx="6"') + R(-190, -260, 380, 40, '#cfc4a6') + [0, 1, 2, 3, 4, 5, 6].map(i => R(-150, -190 + i * 52, 230 - (i % 3) * 40, 18, '#2a2a2a', OP(0.7)) + C(-166, -181 + i * 52, 5, '#2a2a2a')).join('') + (o.hl ? R(-160, -204, 320, 46, 'none', `stroke="#d02020" stroke-width="7" rx="8" opacity="${o.hl}"`) : '') + (o.resp ? G(TXT(0, 20, 'RESPONSÁVEL', 52, '#d02020', 'opacity="0.95"'), `translate(40 ${f1(-181)}) rotate(-6) scale(${f1(o.resp)})`) : ''), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const FOLDER = (x, y, sc, open = 0, rot = 0) => G(R(-210, -150, 420, 300, '#c9a45a', 'rx="10"') + P('M-210,-150 L-210,-176 L-90,-176 L-70,-150Z', '#b8923f') + (open ? R(-190, -130 - 20 * open, 380, 270, '#efe7d2') + P(`M-210,150 L-210,-150 L${f1(-210 - 150 * open)},-120 L${f1(-210 - 150 * open)},180Z`, '#b8923f') : ''), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const KEYX = (x, y, sc, rot = 0, a = 1) => G(C(0, 0, 44, 'none', 'stroke="#e8c14a" stroke-width="20"') + R(36, -10, 220, 20, '#e8c14a', 'rx="6"') + R(190, 8, 24, 44, '#e8c14a') + R(230, 8, 24, 32, '#e8c14a') + C(0, 0, 44, 'none', 'stroke="#fff" stroke-width="3" opacity="0.3"'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`, `opacity="${a}"`);
const DOORM = (Pf, t, x, y, sc, o = {}) => { const d = Object.assign({ shake: 0, light: 0, scratch: 0 }, o), vx = d.shake * 6 * Math.sin(t * 60); return G(R(-210, -560, 420, 560, '#2a343b', 'stroke="#05080b" stroke-width="14"') + R(-170, -520, 340, 220, '#1d262c') + R(-170, -270, 340, 230, '#1d262c') + [0, 1, 2, 3].map(i => C(-140 + i * 93, -530, 8, '#4a5a64')).join('') + C(150, -280, 18, '#6a7a84') + R(-210, -4, 420, 10, '#fff2c0', OP(0.8 * d.light)) + P('M-210,0 L-260,120 L260,120 L210,0Z', '#fff2c0', OP(0.35 * d.light)) + (d.scratch ? [0, 1, 2].map(i => L(-150 + i * 24, -30, -130 + i * 24, 120, '#8a949c', 3, OP(0.5))).join('') : ''), `translate(${f1(x + vx)} ${f1(y)}) scale(${sc})`); };
const WAVE = (x, y, w, h, t, bad = 1, col = '#7fe8c8') => P(Array.from({ length: 48 }, (_, i) => { const u = i / 47, a = Math.sin(u * 20 + t * 6) * Math.sin(u * 3.1 + 0.4) * h * (bad ? 0.5 + 0.5 * hz(i + Math.floor(t * 12), 7) : 0.9); return `${i ? 'L' : 'M'}${f1(x + (u - 0.5) * w)},${f1(y + a)}`; }).join(' '), 'none', `stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`);
const DATEBOX = (x, y, sc, txt, col = '#ffd23a') => G(R(-190, -60, 380, 120, '#0b0f12', 'rx="14" stroke="#2a343b" stroke-width="6"') + TXT(0, 22, txt, 62, col), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const MAN_EYES = (Pf, x, y, s, a = 1) => eyesPair(Pf, x, y, s, '#e8f4ff', a, 40);
const BLK = (a) => R(-300, -300, 1680, 2520, '#000', OP(a));
const MANO = (x, y, sc, rot, col = '#e9bb9c', point = 0) => G(R(-30, 0, 60, 320, col, 'rx="26"') + E(0, -6, 44, 56, col) + (point ? R(-11, -120, 22, 120, col, 'rx="11"') : [-24, -8, 8, 24].map((q, i) => R(q - 8, -56 - 5 * (i % 2), 16, 58, col, 'rx="8"')).join('')), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
