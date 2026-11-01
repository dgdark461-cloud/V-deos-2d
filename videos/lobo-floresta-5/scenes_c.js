/* scenes_c.js - Parte 5: ~93 a 147.6 s */
const EMER = (Pf, t, a = 1) => R(-300, -300, 1680, 2520, '#ff1a10', OP(a * (0.1 + 0.1 * Math.sin(t * 8)))) + glow(Pf, 'E', 120, 120, 700, 0.8 * a * (0.6 + 0.4 * Math.sin(t * 8))) + glow(Pf, 'F', 960, 120, 700, 0.8 * a * (0.6 + 0.4 * Math.cos(t * 8)));
const WOLFEYES = (Pf, x, y, s, a = 1) => eyesPair(Pf, x, y, s, '#ffb02a', a, 60);
function partF(c) {
  const { sh, SN, mb, E_ } = MK5(c);
  mb(101.9, 102.6); mb(103.4, 105.1);
  sh(93.5, 1.8, { z0: 1.2, z1: 1.8, x0: 830, x1: 830, y0: 1050, y1: 980, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, {}) + G(MANX(Pf, t, 830, 1430, 1.2, { flip: -1 }), `translate(0 ${f1(6 * Math.sin(t * 22))})`), 0.4);
  sh(95.3, 1.6, { z0: 1.0, z1: 1.4, shk: 1.5 }, (t, lt, Pf) => WIDE(Pf, t, { wm: 0.2 }), 0.35);
  sh(96.9, 1.7, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { tv: 0.3 }) + FACE(t, { eye: 1.3, worry: 0.9, tremble: 0.8, lookx: 0.3 }, 540, 1000, 2.3), 0.4);
  SN(98.6, 0.001, (t, lt, Pf) => CM(Pf, t, ROOMW(Pf, t, { lamp: lt < 0.15 ? 1 : 0 }) + BLK(lt < 0.15 ? 0.0 : 0.75) + (lt > 0.15 ? WOLFEYES(Pf, 320, 1330, 0.7, 0.5 * E_((lt - 0.4) / 0.5)) : ''), lt, 1.6, { z0: 1.0, z1: 1.15, shk: 10 * Math.exp(-lt * 2) }) + PUNCH(lt, 0.9, '#fff'));
  sh(100.2, 1.7, { z0: 1.0, z1: 2.2, x0: 400, x1: 360, y0: 1100, y1: 1330, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + BLK(0.75) + WOLFEYES(Pf, 320, 1330, 0.9, 1) + P('M300,1400 L330,1380 L360,1400', 'none', 'stroke="#fff" stroke-width="4" opacity="0.6"'), 0.5);
  sh(101.9, 1.5, { z0: 1.5, z1: 1.2, shk: 1 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.35) + WOLFX(Pf, t, 400, 1420, 1.0, { mouth: 0.9, dark: 0.55, crouch: 1 }) + BLK(0.55), 0.35);
  SN(103.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#05080b') + R(-300, 1500, 1680, 500, '#0a1014') + [0, 1, 2, 3].map(i => R(120 + i * 250, 700, 130, 800, '#0e161b')).join('') + G(manSil({ col: '#000' }), `translate(${f1(1300 - 1500 * E_(lt / 1.3))} 1480) scale(0.9)`) + EMER(Pf, t, 0.5), lt, 1.7, { z0: 1.0, z1: 1.25, shk: 5 }) + PUNCH(lt, 0.3));
  sh(105.1, 1.9, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + DOORM(Pf, t, 850, 1500, 1.2, {}) + EMER(Pf, t, 0.8) + BLK(0.35), '#ff3b30');
  sh(107.0, 1.9, { z0: 1.0, z1: 1.2, x0: 830, x1: 830, y0: 1100, y1: 1050, shk: 1 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.7) + BLK(0.3), 0.35);
  sh(108.9, 1.7, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.7) + CLR(Pf, t, 540, 1500, 1.9, { mouth: 0 }) + BLK(0.3), 0.35);
  sh(110.6, 1.7, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => TABLE(Pf, t) + EMER(Pf, t, 0.5) + FOLDER(540, 1320, 1.4, 1, 0) + G(R(-150, -110, 300, 220, '#efe7d2') + R(-60, -70, 120, 140, '#2a3a46'), 'translate(540 1320) scale(1.0)'), 0.4);
  sh(112.3, 1.7, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => BIG('#0a0e11') + photoCard(540, 960, 2.8, -2, G(R(-114, -134, 228, 220, '#16222a') + G(heroFig({ t, view: 's', idle: 0 }), 'translate(-10 84) scale(0.22)') + KEYX(30, -20, 0.3, 20)), ''), 0.4);
  sh(114.0, 1.7, { z0: 1.0, z1: 2.0, x0: 540, x1: 560, y0: 960, y1: 900, shk: 2 }, (t, lt, Pf) => BIG('#0a0e11') + photoCard(540, 960, 2.8, -2, G(R(-114, -134, 228, 220, '#16222a') + G(heroFig({ t, view: 's', idle: 0 }), 'translate(-10 84) scale(0.22)') + KEYX(30, -20, 0.3, 20)), ''), 0.4);
  sh(115.7, 3.3, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#0a0e11') + G(R(-190, -220, 380, 440, '#efe7d2', 'rx="6"') + TXT(0, -100, 'SUJEITO', 44, '#2a2a2a') + TXT(0, -30, 'AUTORIZADO', 44, '#2a2a2a') + TXT(0, 40, 'A LIBERTAR', 44, '#2a2a2a') + TXT(0, 110, 'O ANIMAL', 50, '#d02020') + R(-170, 140, 340, 8, '#d02020', OP(0.6)), 'translate(540 960) scale(2.4)'), 0.5);
  sh(119.0, 1.5, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.5) + FACE(t, { eye: 1.2, worry: 0.7, lookx: -0.7 }, 540, 1000, 2.2), 0.4);
  sh(120.5, 3.0, { z0: 1.0, z1: 1.35, x0: 540, x1: 600, y0: 1000, y1: 1100, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.4) + DOORM(Pf, t, 760, 1500, 1.3, { scratch: 1 }) + WOLFX(Pf, t, 460, 1420, 0.9, { flip: -1, mouth: 0.4, dark: 0.55, crouch: 1, head: 0.5 }) + G(L(0, 0, 40, 60, '#cdd5da', 4), `translate(${f1(430 + 30 * Math.sin(t * 14))} 1480)`), 0.4);
  sh(123.8, 1.6, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.4) + FACE(t, { eye: 1.35, pupil: 0.55, worry: 0.9, looky: 0.9 }, 540, 1000, 2.2), 0.45);
  sh(125.4, 1.7, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BIG('#0a0e11') + photoCard(540, 960, 2.2, -2, G(R(-114, -134, 228, 220, '#16222a') + KEYX(0, -20, 0.5, 20))) + glow(Pf, 'K', 540, 960, 500, 0.2), 0.4);
  sh(127.1, 1.5, { z0: 1.0, z1: 1.5, x0: 540, x1: 540, y0: 1100, y1: 1000, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.4) + G(heroFig({ t, view: 'f', idle: 1 }), 'translate(540 1600) scale(1.25)'), 0.5);
  sh(128.6, 1.8, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.4) + CF(t, { mouth: Math.abs(Math.sin(t * 8)) * 0.7, worry: 1, tear: 1, tilt: 5 * Math.sin(t * 3) }, 540, 1000, 2.3), 0.4);
  sh(130.4, 1.6, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.3) + DOORM(Pf, t, 540, 1500, 1.6, { shake: 0.4 }), 0.4);
  sh(132.0, 1.7, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + BLK(0.4) + DOORM(Pf, t, 540, 1500, 1.6, { shake: 0.6, light: 1 }) + G(WAVE(0, 0, 360, 70, t, 0, '#cfefff'), 'translate(540 900)'), 0.5);
  sh(133.7, 1.8, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.3) + FACE(t, { eye: 1.45, pupil: 0.5, worry: 1, tremble: 1, sweat: 1, tear: 0.5 }, 540, 1000, 2.3), 0.5);
  sh(135.5, 1.7, { z0: 1.0, z1: 1.8, shk: 5 }, (t, lt, Pf) => BIG('#05080b') + FACE(t, { eye: 1.5, pupil: 0.45, worry: 1, tremble: 1, mouth: 0.4 }, 540, 1000, 2.4) + WAVE(540, 1650, 700, 90, t, 0, '#cfefff') + glow(Pf, 'Y', 540, 1000, 800, 0.2), '#fff');
  /* CTA */
  sh(137.2, 1.6, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.3) + DOORM(Pf, t, 540, 1500, 1.6, { light: 1 }) + G(MANO(0, 0, 1.4, 90, '#e9bb9c'), 'translate(660 1180) rotate(90)'), 0.4);
  sh(138.7, 1.5, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.3) + DOORM(Pf, t, 540, 1500, 1.6, { light: 1, shake: 0.4 }), 0.4);
  sh(140.2, 1.6, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + EMER(Pf, t, 0.3) + CLR(Pf, t, 380, 1440, 1.1, { mouth: 0.6 }) + G(heroFig({ t, view: 's', idle: 1, run: 0 }), `translate(${f1(780 - 60 * E_(lt / 1.2))} 1430) scale(1.0) scale(-1 1)`), 0.4);
  SN(141.8, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#05080b') + glow(Pf, 'D', 300, 960, 700, 0.3) + glow(Pf, 'G', 780, 960, 700, 0.3) + DOORM(Pf, t, 300, 1250, 0.9, { light: 1 }) + G(CLR(Pf, t, 0, 0, 0.8, {}), 'translate(790 1250)') + L(540, 300, 540, 1600, '#fff', 4, OP(0.4)) + TXT(300, 1450, '?', 160, '#ffd23a') + TXT(790, 1450, '?', 160, '#ffd23a'), lt, 3.0, { z0: 1.0, z1: 1.1, shk: 1 }));
  sh(144.8, 2.8, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => ROOMW(Pf, t, { lamp: 0 }) + BLK(0.4) + DOORM(Pf, t, 540, 1500, 1.7, { light: 0.6 + 0.4 * Math.sin(t * 6), shake: 0.5 }) + glow(Pf, 'Z', 540, 1500, 700, 0.3), 0.4);
}
