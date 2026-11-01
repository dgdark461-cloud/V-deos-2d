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
  SN(0, 0.001, (t, lt, Pf) => CM(Pf, t, WIDE(Pf, t, {}), lt, 1.0, { x0: 380, y0: 1330, z0: 3.4, x1: 540, y1: 1000, z1: 1.0, shk: 4 }) + PUNCH(lt, 0.7));
  sh(2.62, 0.77, { x0: 830, y0: 1020, z0: 1.8, x1: 830, y1: 1000, z1: 2.8, shk: 3 }, (t, lt, Pf) => WIDE(Pf, t, { bg: { lamp: 1 } }), 0.5);
  sh(3.39, 0.89, { x0: 380, y0: 1320, z0: 3.0, x1: 380, y1: 1330, z1: 2.2, shk: 5 }, (t, lt, Pf) => WIDE(Pf, t, { wm: 1 }), 0.5);
  sh(4.28, 0.76, { z0: 1.3, z1: 1.0, shk: 4 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + CLR(Pf, t, 540, 1500, 1.9, { mouth: 1 }) + SHOUT(620, 760, 2.0, t) + R(0, 0, 1080, 1920, '#000', OP(0.0)), '#fff');
  sh(5.04, 0.73, { z0: 1.0, z1: 1.35, y0: 1000, y1: 1180, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + CLR(Pf, t, 400, 1440, 1.0, { mouth: Math.abs(Math.sin(t * 14)) }) + SHOUT(450, 1020, 1.3, t) + WOLFX(Pf, t, 830, 1420, 0.8, { flip: -1, mouth: 0.6, dark: 0.5 }), 0.4);
  sh(5.77, 0.4, { x0: 600, x1: 700, y0: 1200, y1: 1150, z0: 1.2, z1: 1.6, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + CLR(Pf, t, 240, 1440, 1.0, { mouth: 0.5 }) + MANX(Pf, t, 830, 1430, 1.0, { flip: -1 }), 0.4);
  SN(6.17, 0.001, (t, lt, Pf) => { const u = E_(lt / 1.6); return CM(Pf, t, ROOMW(Pf, t, {}) + CLR(Pf, t, 240, 1440, 1.0, { mouth: 0.4 }) + MANX(Pf, t, 850 - 380 * u, 1430, 1.0, { flip: -1, walk: lt * 1.3 }) + WOLFX(Pf, t, 960, 1420, 0.6, { flip: -1, mouth: 0.2, dark: 0.6, crouch: 0.5 }), lt, 1.6, { x0: 600, x1: 480, y0: 1250, y1: 1250, z0: 1.2, z1: 1.45, shk: 2 }) + PUNCH(lt, 0.3); });
  sh(7.27, 0.82, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + CLR(Pf, t, 540, 1500, 1.9, { mouth: 0 }) + G(MANX(Pf, t, 1300, 1500, 1.6, { flip: -1 }), 'translate(-420 0)'), 0.35);
  sh(8.09, 0.6, { z0: 1.0, z1: 1.35, x0: 640, x1: 560, y0: 1220, y1: 1200, shk: 1.5 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + CLR(Pf, t, 320, 1440, 1.0, { mouth: 0 }) + MANX(Pf, t, 600, 1430, 1.0, { flip: -1 }), 0.35);
  sh(8.69, 0.09, { z0: 1.0, z1: 1.5, x0: 700, x1: 600, y0: 1150, y1: 1000, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 1 }) + MANX(Pf, t, 760, 1430, 1.0, { flip: -1, point: 1 }) + YOUB(t, 260, 1450, 0.95), 0.4);
  sh(8.78, 0.72, { z0: 1.2, z1: 1.4, x0: 300, x1: 330, y0: 1000, y1: 900, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 1 }) + YOUB(t, 260, 1450, 0.95), 0.35);
  sh(9.5, 1.46, { z0: 1.0, z1: 2.6, x0: 540, x1: 540, y0: 900, y1: 640, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 1 }) + G(TVF(Pf, t, 540, 640, 1.0, R(-270, -210, 540, 420, '#0a1e26') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(-270 + hz(i, Math.floor(t * 20)) * 400, -210 + i * 52, 140 + hz(i, 7) * 200, 14, '#9fe8ff', OP(0.5))).join(''), { glitch: 1, stamp: '--:--' }), ''), 0.4);
  /* 11.9: a gravação */
  sh(10.96, 0.38, { z0: 1.4, z1: 1.1, shk: 5 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.7, R(-270, -210, 540, 420, '#0a1e26') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => R(-270 + hz(i, Math.floor(t * 24)) * 400, -210 + i * 42, 160 + hz(i, 5) * 200, 12, '#cfefff', OP(0.5))).join(''), { glitch: 1 }), '#cfefff');
  sh(11.34, 2.1, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.7, ROOMIN(Pf, t, { you: 0 }), { stamp: '03:12' }), 0.5);
  sh(13.44, 1.24, { z0: 1.1, z1: 1.4, x0: 540, x1: 470, y0: 1000, y1: 1000, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.7, ROOMIN(Pf, t, { you: 0 }), { stamp: '03:12' }), 0.4);
  sh(14.68, 0.81, { z0: 1.1, z1: 1.45, x0: 600, x1: 640, y0: 1000, y1: 980, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.7, ROOMIN(Pf, t, { gun: 1 }), { stamp: '03:12' }), 0.4);
  sh(15.5, 1.52, { z0: 1.0, z1: 1.35, shk: 3 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#3a6a7a') + G(gunObj(0, 0, 1.0, -8), 'translate(-80 20) scale(2.4)') + glow(Pf, 'G', 0, 0, 300, 0.2), { stamp: '03:12' }), 0.55);
  sh(17.02, 1.47, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#0a1e26') + TXT(0, 20, '-' + (4 - Math.floor(E_(lt / 1.4) * 4)).toString().padStart(2, '0') + ':' + String(59 - Math.floor((lt * 60) % 60)).padStart(2, '0'), 120, '#ffd23a') + [0, 1].map(i => P(`M${-120 + i * 70},90 l-50,30 l50,30Z`, '#cfefff')).join(''), { stamp: '<<' }), 0.45);
  sh(18.48, 1.51, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, ROOMIN(Pf, t, { you: 1, gun: 0 }) + G(P('M-60,0 Q-90,-300 -50,-440 Q0,-500 50,-440 Q90,-300 60,0Z', '#000', OP(0.85)), 'translate(-230 190) scale(0.5)') + P('M-170,-70 l24,-18 l-8,24 l24,-14', 'none', 'stroke="#ffd23a" stroke-width="6"'), { stamp: '03:08' }), 0.4);
  sh(19.99, 1.7, { z0: 1.0, z1: 1.2, shk: 3 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#0a1e26') + WAVE(0, 0, 440, 130, t, 1, '#7fe8c8'), { stamp: '03:09', glitch: 1 }), 0.4);
  sh(21.7, 1.47, { z0: 1.2, z1: 1.0, shk: 2 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#0a1e26') + WAVE(0, 0, 440, 130, t, lt < 1.0 ? 1 : 0, lt < 1.0 ? '#7fe8c8' : '#ffffff'), { stamp: '03:09' }) + glow(Pf, 'C', 540, 960, 700, lt > 1.0 ? 0.4 : 0), 0.45);
  sh(23.17, 3.65, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => TVBG(Pf, t) + TVF(Pf, t, 540, 960, 1.9, R(-270, -210, 540, 420, '#0a1e26') + G(P('M-60,0 Q-90,-300 -50,-440 Q0,-500 50,-440 Q90,-300 60,0Z', '#000', OP(0.9)), 'translate(110 200) scale(0.55)') + WAVE(-80, 20, 240, 80, t, 0, '#ffffff') + G(ROOMIN(Pf, t, { you: 1, gun: 0 }), 'translate(0 0) scale(0.01)'), { stamp: '03:09' }), 0.4);
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
