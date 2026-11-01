/* scenes_a.js - Parte 6: 0 a ~50 s (tempos estimados -> remapeados) */
const NK = (t, x, y, sc) => G(heroFig({ t, view: 's', idle: 1 }), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const FACEL = (t, o, x = 540, y = 1000, sc = 2.3) => FACE(t, Object.assign({ eye: 1.2, worry: 0.7 }, o), x, y, sc);
const ID = (x, y, sc, txt, rot = 0) => G(R(-200, -110, 400, 220, '#efe7d2', 'rx="14" stroke="#05080b" stroke-width="8"') + R(-170, -80, 120, 140, '#2a3a46') + TXT(70, -20, txt, 54, '#2a2a2a') + R(-30, 20, 190, 12, '#2a2a2a', OP(0.5)) + R(-30, 50, 140, 12, '#2a2a2a', OP(0.5)), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
function partD(c) {
  const { sh, SN, mb, E_ } = MK5(c);
  sh(32.1, 1.12, { z0: 1.0, z1: 1.25, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + MANX(Pf, t, 830, 1430, 1.2, { flip: -1 }) + ID(540, 640, 1.6 * E_(lt / 0.3), 'RENATO', -4), 0.45);
  sh(33.22, 0.97, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + ID(540, 620, 2.0, 'RENATO', 0) + glow(Pf, 'id', 540, 620, 600, 0.2) + G(manSil({ col: '#020608', eyes: 1, t }), 'translate(540 1700) scale(1.2)'), 0.4);
  sh(34.19, 0.76, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + G(R(-90, -50, 180, 100, '#1d3a48', 'rx="10" stroke="#e8c14a" stroke-width="5"') + TXT(0, 14, 'RENATO', 32, '#fff'), 'translate(540 420) scale(1.3)') + [0, 1, 2].map(i => G(R(-80, -40, 160, 80, '#1b2227', 'rx="8"'), `translate(${200 + i * 340} 800)`) + L(540, 480, 200 + i * 340, 760, '#e8c14a', 5)).join('') + glow(Pf, 'og', 540, 600, 700, 0.15), 0.4);
  sh(34.95, 0.72, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + CRATE(300, 1500, 1.3) + CRATE(760, 1500, 1.3) + WOLFX(Pf, t, 540, 1000, 0.5, { mouth: 0.4, dark: 0.4 }), 0.4);
  sh(35.67, 1.19, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + R(120, 700, 840, 700, '#1b2227') + [0, 1, 2].map(i => G(manSil({ col: '#020608', eyes: 0.7, t }), `translate(${300 + i * 240} ${1400}) scale(0.5)`)).join('') + R(120, 700, 840, 700, '#05080b', OP(0.6)) + [0, 1, 2, 3, 4].map(i => R(120 + i * 190, 700, 14, 700, '#2a343b')).join(''), 0.4);
  sh(36.86, 1.27, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + BETSCR(Pf, t, 540, 960, 2.0) + MONEY(t, 14), 0.45);
  sh(38.13, 1.95, { z0: 1.0, z1: 1.2, shk: 3 }, (t, lt, Pf) => WIDE(Pf, t, { wm: 1 }), 0.45);
  sh(40.07, 1.2, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + [0, 1, 2, 3].map(i => G(manSil({ col: '#020608', eyes: 0.8, t }), `translate(${180 + i * 240} ${1700}) scale(0.7)`) + BETSCR(Pf + i, t, 180 + i * 240, 900 + 60 * (i % 2), 0.55)).join('') + MONEY(t, 18, 1080, 1920, 5), 0.4);
  sh(41.28, 1.11, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + BETSCR(Pf, t, 540, 900, 2.0) + MONEY(t, 24, 1080, 1920, 8), 0.4);
  sh(42.38, 1.58, { z0: 1.0, z1: 1.35, shk: 1.5 }, (t, lt, Pf) => FOREST(Pf, t, t * 120), 0.4);
  sh(43.96, 1.71, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => FOREST(Pf, t, 0) + CABIN(Pf, t, 540, 1480, 1.6), 0.4);
  sh(45.68, 1.76, { z0: 1.0, z1: 1.2, shk: 1.5 }, (t, lt, Pf) => BIG('#0b1a14') + C(540, 960, 520, '#123222') + C(540, 960, 520, 'none', 'stroke="#46e06a" stroke-width="6" stroke-dasharray="26 16"') + CABIN(Pf, t, 540, 1020, 0.5) + [0, 1, 2, 3, 4, 5].map(i => P(`M${300 + i * 90},${760 + 40 * hz(i, 3)} l30,-70 l30,70Z`, '#0a2a1a')).join('') + TXP('ISOLADA', 540, 400, 90, lt, '#46e06a'), 0.4);
  sh(47.44, 2.62, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#070b0f') + [0, 1, 2].map(i => G(R(-130, -190, 260, 380, '#e6dcc2', 'rx="6"') + R(-100, -150, 200, 200, '#2a3a46') + TXT(0, 120, 'DESAPARECIDO', 20, '#2a2a2a') + G(heroFig({ t, view: 's', idle: 0 }), 'translate(0 40) scale(0.2)'), `translate(${200 + i * 340} ${900 + 30 * (i - 1)}) rotate(${(i - 1) * 6})`)).join(''), 0.4);
}
