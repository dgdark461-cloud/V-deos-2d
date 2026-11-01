/* scenes_a.js - Parte 5: 0 a ~48 s (tempos estimados -> remapeados pelo ASR) */
function MK5(c) {
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn); const E_ = ez;
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  const sh = (s0, dur, o, fn, pf) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + (pf === 0 ? '' : PUNCH(lt, pf === undefined ? 0.35 : pf, typeof pf === 'string' ? pf : '#fff')));
  return { SN, sh, mb, E_ };
}
const CLR = (Pf, t, x, y, sc, o = {}) => chairClara(Pf, t, x, y, sc, o);
const YOUB = (t, x, y, sc, o = {}) => G(heroFig(Object.assign({ t, view: 'b', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const ROOMW = (Pf, t, o = {}) => DUELBG(Pf, t, o);
const TVBG = (Pf, t) => DUELBG(Pf + 'b', t, { lamp: 0 }) + R(-300, -300, 1680, 2520, '#000', OP(0.6));
const WIDE = (Pf, t, o = {}) => ROOMW(Pf, t, o.bg || {}) + WOLFX(Pf, t, o.wx || 330, 1420, 0.85, { mouth: o.wm === undefined ? 0.7 : o.wm, dark: 0.45, crouch: 0.9, head: 0.3, phase: o.wp || 0 }) + MANX(Pf, t, o.mx || 830, 1430, 1.0, { flip: -1, walk: o.walk || 0 });
function partD(c) {
  const { sh, SN, mb, E_ } = MK5(c);
  mb(6.17, 7.27); mb(0, 2.62);
  /* abertura: lobo x homem */
  /* 11.9: a gravação */
  /* 27.0 olha para o homem */
  sh(26.81, 1.63, { z0: 1.0, z1: 1.35, shk: 1.5 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 1 }) + FACE(t, { eye: 1, worry: 0.6, lookx: -0.6 }, 540, 1000, 2.2) , 0.4);
  sh(28.45, 2.26, { z0: 1.2, z1: 1.7, x0: 830, x1: 830, y0: 1050, y1: 980, shk: 1 }, (t, lt, Pf) => WIDE(Pf, t, { wm: 0.2 }), 0.35);
  sh(30.7, 2.04, { z0: 1.7, z1: 2.4, x0: 830, x1: 830, y0: 1000, y1: 930, shk: 1 }, (t, lt, Pf) => WIDE(Pf, t, { wm: 0.1 }), 0.35);
  sh(32.74, 1.43, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 0.5 }) + FACE(t, { eye: 1.1, worry: 0.5, mouth: Math.abs(Math.sin(t * 9)) * 0.7 }, 540, 1000, 2.2) + TXT(840, 560, '?', 280, '#ffd23a', 'opacity="0.9"'), 0.45);
  sh(34.17, 1.52, { z0: 1.0, z1: 1.5, x0: 830, x1: 830, y0: 1100, y1: 1000, shk: 1.5 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + MANX(Pf, t, 830, 1430, 1.2, { flip: -1 }), 0.4);
  sh(35.68, 2.06, { z0: 1.0, z1: 1.1, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + [0, 1, 2, 3].map(i => TVF(Pf + i, t, 300 + (i % 2) * 480, 560 + Math.floor(i / 2) * 640, 0.72, ROOMIN(Pf + i, t, { you: i % 2 }) , { stamp: ['03:12', '21:40', '04:55', '02:30'][i] })).join(''), 0.4);
  sh(37.74, 1.51, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => TVBG(Pf, t) + [0, 1, 2].map(i => G(R(-250, -110, 500, 220, ['#1d3a48', '#3a2a1d', '#1d3a2a'][i], 'stroke="#000" stroke-width="6"') + [0, 1, 2, 3, 4].map(q => R(-230 + q * 100, -100, 12, 20, '#000')).join(''), `translate(${f1(540 + (i - 1) * 120 * (1 - E_(lt / 1.2)) * 0.2)} ${f1(560 + i * 400 - 40 * (2 - i) * (1 - E_(lt / 1.2)))}) rotate(${f1((i - 1) * 8 * (1 - E_(lt / 1.2)))})`)).join('') + P('M200,0 L880,0', 'none', 'stroke="#fff" stroke-width="0"'), 0.4);
  sh(39.25, 2.05, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#0a1e26') + G(heroFig({ t, view: 's', idle: 1, scared: 1 }), 'translate(0 190) scale(0.55)') + glow(Pf, 'S', 0, -40, 260, 0.2), { stamp: '03:12' }), 0.4);
  sh(41.3, 1.62, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + [0, 1].map(i => TVF(Pf + i, t, 540, 560 + i * 640, 0.9, ROOMIN(Pf + i, t, { you: 1 }), { stamp: '03:1' + i })).join('') + G(P('M-60,0 L-20,50 L70,-60', 'none', 'stroke="#46e06a" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"'), `translate(840 ${f1(560)}) scale(${f1(E_(lt / 0.3))})`), '#46e06a');
  sh(42.93, 1.77, { z0: 1.0, z1: 1.2, shk: 3 }, (t, lt, Pf) => TVBG(Pf, t) + [0, 1].map(i => TVF(Pf + i, t, 540, 560 + i * 640, 0.9, ROOMIN(Pf + i, t, { you: i }), { stamp: '03:1' + i, glitch: i })).join('') + G(P('M-50,-50 L50,50 M50,-50 L-50,50', 'none', 'stroke="#ff3b30" stroke-width="24" stroke-linecap="round"'), `translate(840 ${f1(1200)}) scale(${f1(E_(lt / 0.3))})`), '#ff3b30');
  sh(44.7, 1.66, { z0: 1.0, z1: 1.5, shk: 4 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 0.5 }) + FACE(t, { eye: 1.3, pupil: 0.6, worry: 1, tremble: 1, sweat: 1 }, 540, 1000, 2.3), '#fff');
  sh(46.35, 1.81, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 0.5 }) + FACE(t, { eye: 0.8, worry: 0.6, lookx: 0.5, looky: -0.4 }, 540, 1000, 2.3) + R(-300, -300, 1680, 2520, '#e8f0f4', OP(0.55 * E_(lt / 1.6))), 0.4);
}
