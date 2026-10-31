/* scenes_a.js - Halloween: 0 a 30.65 s */
const WALLBG = (Pf, col = '#1a0e2e', g = 0.35, gx = 200, gy = 500) => BIG(col) + glow(Pf, 'A', gx, gy, 900, g) + R(-300, 1500, 1680, 700, '#0e0818');
const FOGL = (t, a = 0.25, y = 1500) => { let s = ''; for (let i = 0; i < 5; i++) s += E(((i * 300 + t * 30 * (1 + i % 2)) % 1700) - 300, y + 60 * Math.sin(i * 2 + t), 420, 70, '#b8a8d8', OP(a * (0.5 + 0.5 * hz(i, 3)))); return s; };
const EXTR = (Pf, t, o = {}) => {
  const d = Object.assign({ lit: 1, ghost: 0, sc: 1 }, o);
  let s = SKYH(Pf, t, { mx: 800, my: 360 }) + R(-300, 1380, 1680, 800, '#0c0716') + R(-300, 1372, 1680, 10, '#2a1448');
  s += P('M60,1380 L60,900 L540,640 L1020,900 L1020,1380Z', '#0a0612') + R(130, 980, 200, 260, d.lit ? HC.or2 : '#10163a') + R(700, 980, 200, 260, d.lit ? '#ffb040' : '#10163a') + (d.lit ? glow(Pf, 'A', 230, 1110, 380, 0.55) + glow(Pf, 'A', 800, 1110, 380, 0.45) : '') + R(130, 1100, 200, 8, '#0a0612') + R(228, 980, 8, 260, '#0a0612') + R(450, 1060, 180, 320, '#2a1608') + C(610, 1230, 8, HC.or2) + R(440, 1380, 200, 20, '#1a1028');
  s += PUMPK(360, 1420, 0.38, { t, glow: 1 }) + PUMPK(740, 1430, 0.3, { t: t + 1, glow: 1 });
  if (d.ghost) s += GHOSTK(Pf, t, 540, 1480, 0.35, { glow: 1, bucket: 1 });
  for (let i = 0; i < 6; i++) s += L(-20 + i * 190, 1330, -20 + i * 190, 1420, '#0a0612', 8) ;
  return s + FOGL(t, 0.3, 1450);
};
const FLASHR = (lt, th, col, a = 0.6, k = 14) => lt > th ? FB(col, a * Math.exp(-(lt - th) * k)) : '';
const REDX = (u, cx = 540, cy = 960, s = 300) => { const a = cl(u * 2), b = cl(u * 2 - 1); return L(cx - s, cy - s, cx - s + 2 * s * a, cy - s + 2 * s * a, HC.red, 56) + (b > 0 ? L(cx + s, cy - s, cx + s - 2 * s * b, cy - s + 2 * s * b, HC.red, 56) : ''); };
const CLOCKD = (Pf, t, txt, col = HC.red) => BIG('#07050d') + R(60, 700, 960, 520, '#120a1c', 'rx="40" stroke="#2a1648" stroke-width="12"') + TXT(540, 1060, txt, 330, col, OP(0.8 + 0.2 * Math.sin(t * 30))) + glow(Pf, 'A', 540, 960, 800, 0.2);
const PEEP = (Pf, t, lt, inner) => BIG('#000') + `<clipPath id="${Pf}pk"><circle cx="540" cy="960" r="420"/></clipPath>` + G(inner, '', `clip-path="url(#${Pf}pk)"`) + C(540, 960, 420, 'none', 'stroke="#b8b0a0" stroke-width="40"') + C(540, 960, 440, 'none', 'stroke="#2a2a3a" stroke-width="30"') + C(540, 960, 420, '#000', OP(0.15));
const BELLC = (Pf, t, lt, ringAt = 0) => BIG('#1a1028') + R(300, 500, 480, 920, '#8a8478', 'rx="50"') + C(540, 960, 150, '#a09888') + C(540, 960, 120, lt > ringAt ? HC.or : '#c0382a') + (lt > ringAt ? glow(Pf, 'A', 540, 960, 500, 0.3) + ringWaves(540, 960, t - ringAt, 0.8, 3, 520, HC.or2) : '') + G(R(-30, -30, 60, 60, '#fff', 'rx="10"'), 'translate(540 960) scale(0)');
function partD(c) {
  const { add, tw, k, S } = c; const E_ = ez;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(0, 0.7); mb(8.15, 8.77); mb(10.6, 12.9); mb(22.9, 23.4); mb(26.0, 26.7);
  const sh = (s0, dur, o, fn, fl) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + (fl ? FLASHR(lt, 0.0001, fl[0], fl[1]) : ''));
  const flashIn = lt => PUNCH(lt, 0.5);
  /* hook 0-3.2 */
  SN(0, 0.001, (t, lt, Pf) => CM(Pf, t, SKYH(Pf, t, { mx: 540, my: 500 }) + PUMPK(540, 1000, 2.2, { t, mood: 0.6 }), lt, 0.7, { z0: 1.0, z1: 1.6, y0: 1000, y1: 1000, shk: 3 }) + PUNCH(lt, 0.8));
  SN(0.7, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { knock: lt < 0.7 ? 1 : 0, lit: 1 }), lt, 0.7, { z0: 1.0, z1: 1.35, x0: 540, x1: 560, y0: 900, y1: 960, shk: 2 }) + PUNCH(lt, 0.4));
  SN(1.4, 0.001, (t, lt, Pf) => CM(Pf, t, EXTR(Pf, t, { ghost: 0 }), lt, 0.8, { z0: 1.0, z1: 1.5, x0: 540, x1: 500, y0: 960, y1: 1130, shk: 1 }));
  SN(2.2, 0.001, (t, lt, Pf) => CM(Pf, t, CLOCKH(t, 1) + glow(Pf, 'A', 540, 800, 700, 0.3), lt, 1.0, { z0: 0.9, z1: 1.5, y0: 800, y1: 800, r0: -3, r1: 4, shk: 3 }) + (lt > 0.55 ? PUNCH(lt - 0.55, 0.5, HC.or) : ''));
  /* 3.2 nunca abra a porta */
  SN(3.2, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { lit: 1 }) + REDX(E_(k(lt, 0.5, 0.9))) , lt, 1.1, { z0: 1.3, z1: 1.0, shk: 2 }) + PUNCH(lt, 0.4));
  SN(4.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night) + SKYH(Pf, t, { bats: 3 }) + FOGL(t, 0.4, 1500) + GHOSTK(Pf, t, 540, 1650, 1.7, { sway: 1 }), lt, 0.8, { z0: 1.0, z1: 1.35, y0: 1000, y1: 1000, shk: 1.5 }) + PUNCH(lt, 0.3, HC.gr));
  SN(5.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night2) + glow(Pf, 'A', 540, 960, 800, 0.3) + G(R(-190, -190, 380, 340, '#ff8a1f') + P('M-190,-190 L190,-190 L160,150 L-160,150Z', '#ff8a1f') + P('M-140,-140 Q0,-440 140,-140', 'none', 'stroke="#2a1006" stroke-width="22"') + [0, 1, 2, 3, 4, 5, 6].map(i => P(`M${-120 + i * 36},${-140 + 10 * i % 3} l22,0 l-11,60Z`, ['#fff', '#ffb040', '#e8700f'][i % 3]) + C(-130 + (i * 91) % 260, -80 + (i * 53) % 200, 28, ['#e03030', '#7aff5a', '#ffc15a', '#40a0ff', '#ff70c0'][i % 5])).join(''), 'translate(540 980) scale(1.9) rotate(' + f1(6 * Math.sin(t * 5)) + ')') + glow(Pf, 'F', 540, 980, 500, 0.0), lt, 0.6, { z0: 1.0, z1: 1.3, shk: 4 }) + PUNCH(lt, 0.4));
  /* 5.7 David */
  SN(5.7, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf) + DV({ worry: 0.6 + 0.3 * E_(k(lt, 0, 1.3)), lookx: -0.6, eye: 1.1, tremble: 0.5, t, sweat: 0.2 }, 540 + 40 * Math.sin(t * 2), 880, 1.55), lt, 1.4, { z0: 1.05, z1: 1.3, shk: 1.5 }) + PUNCH(lt, 0.5));
  SN(7.1, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { open: E_(k(lt, 0.5, 1.0)) * 0.35, gap: E_(k(lt, 0.3, 1)), lit: 1 }), lt, 1.05, { z0: 1.0, z1: 1.55, x0: 540, x1: 470, y0: 1300, y1: 1500, shk: 3 }) + PUNCH(lt, 0.4));
  /* 8.15 Nessa noite / fronteiras */
  SN(8.15, 0.001, (t, lt, Pf) => CM(Pf, t, SKYH(Pf, t, { mx: 540, my: 600 }) + PUMPK(540, 1000, 2.6, { t, mood: 0 }), lt, 0.62, { z0: 1.4, z1: 1.0, shk: 3 }) + PUNCH(lt, 0.7, HC.or2));
  SN(8.77, 0.001, (t, lt, Pf) => CM(Pf, t, SKYH(Pf, t) + R(-300, 1300, 1680, 800, '#0c0716') + PUMPK(250, 1380, 1.0, { t, mood: 0 }) + PUMPK(540, 1280, 1.5, { t: t + 1, mood: 0 }) + PUMPK(840, 1400, 0.9, { t: t + 2, mood: 0 }), lt, 1.1, { z0: 1.0, z1: 1.2, x0: 540, x1: 560, shk: 1.5 }) + PUNCH(lt, 0.3));
  SN(9.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night2) + glow(Pf, 'A', 540, 900, 900, 0.3) + GHOSTK(Pf, t, 540, 1700, 1.8, { grin: 0, glow: 0, sway: 1 }), lt, 0.7, { z0: 1.0, z1: 1.25, shk: 1.5 }) + PUNCH(lt, 0.3));
  SN(10.6, 0.001, (t, lt, Pf) => { const m = E_(k(lt, 0.0, 1.2)); return CM(Pf, t, BIG(mixc(HC.night2, '#3a0808', m)) + glow(Pf, 'A', 540, 900, 900, 0.3 * (1 - m)) + C(540, 960, 700, HC.red, OP(0.15 * m)) + PUMPK(540, 1000, 2.4, { t, mood: m }), lt, 1.2, { z0: 1.0, z1: 1.45, shk: 2 + 6 * m, r0: 0, r1: -4 }) + PUNCH(lt, 0.4, HC.red); });
  SN(11.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#1a0505') + C(540, 960, 800, HC.red, OP(0.2)) + PUMPK(540, 1000, 3.2, { t: t * 2, mood: 1 }), lt, 0.8, { z0: 1.0, z1: 1.5, shk: 8, r0: 3, r1: -3 }) + PUNCH(lt, 0.5, HC.red));
  SN(12.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#020104') + GHOSTK(Pf, t, 540, 1500, 2.2, { grin: 1, bucket: 0 }), lt, 0.5, { z0: 0.9, z1: 1.5, shk: 4 }));
  /* 12.9 Foi exatamente esse pesadelo */
  SN(12.9, 0.001, (t, lt, Pf) => CM(Pf, t, EXTR(Pf, t, { lit: 1 }), lt, 1.4, { z0: 1.6, z1: 1.0, x0: 560, x1: 540, y0: 1100, y1: 960, shk: 1 }) + PUNCH(lt, 0.4));
  SN(14.3, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#1a0e2e', 0.2, 800, 400) + DV({ eye: 0.12, worry: 0.7, tremble: 1.5, sweat: 0.6, t, mouth: 0.2 }, 540, 880, 1.55), lt, 1.1, { z0: 1.1, z1: 1.0, r0: 3, r1: -2, shk: 3 }) + PUNCH(lt, 0.3));
  SN(15.5, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#1a0e2e', 0.3) + DV({ eye: 1.15, worry: 0.3, lookx: 0.5, t }, 540, 880, 1.55), lt, 0.6, { z0: 1.0, z1: 1.35, y0: 880, y1: 760, shk: 2 }) + PUNCH(lt, 0.5));
  SN(16.1, 0.001, (t, lt, Pf) => CM(Pf, t, BELLC(Pf, t, lt, 0.4), lt, 0.8, { z0: 1.0, z1: 1.45, shk: 2 }) + (lt > 0.4 ? PUNCH(lt - 0.4, 0.7, HC.or2) : ''));
  SN(16.9, 0.001, (t, lt, Pf) => CM(Pf, t, LIVN(Pf, t, { lights: 0 }) + FOGL(t, 0.1, 1400), lt, 1.2, { z0: 1.0, z1: 1.35, x0: 540, x1: 700, y0: 960, y1: 1100, shk: 0.5 }));
  SN(18.1, 0.001, (t, lt, Pf) => CM(Pf, t, CLOCKD(Pf, t, '00:13'), lt, 0.5, { z0: 1.0, z1: 1.2, shk: 4 }) + PUNCH(lt, 0.4, HC.red));
  /* 18.6 primeiro impulso */
  SN(18.6, 0.001, (t, lt, Pf) => { const sc = 1.25, cps = 0.9, dist = WALK_CYCLE * sc * cps * lt; return CM(Pf, t, BIG('#0e0818') + R(-300, 1500, 1680, 700, '#1a1028') + [0, 1, 2, 3, 4].map(i => { const x = ((i * 520 - dist) % 2600 + 2600) % 2600 - 500; return R(x, 300, 180, 1200, '#24103e') + R(x + 20, 340, 140, 1100, '#2a1648'); }).join('') + glow(Pf, 'A', 900, 700, 800, 0.3) + E(540, 1506, 150 * sc, 16 * sc, 'rgba(0,0,0,0.5)') + G(davidFig({ t, walk: dist / (WALK_CYCLE * sc), view: 's', scared: 0.3, stride: 1 }), `translate(540 1500) scale(${sc})`), lt, 1.0, { z0: 1.0, z1: 1.12, shk: 1 }) + PUNCH(lt, 0.5); });
  SN(19.6, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#1a0e2e', 0.2, 900, 400) + DV({ eye: 1.1, worry: 0.4, lookx: 0.8, looky: 0.1, t, tilt: 4 }, 440, 900, 1.5), lt, 0.8, { z0: 1.0, z1: 1.3, x0: 540, x1: 600, shk: 1.5 }) + PUNCH(lt, 0.4));
  SN(20.4, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { lit: 1, gap: 0 }), lt, 0.7, { z0: 1.3, z1: 3.2, x0: 560, x1: 540, y0: 900, y1: 800, shk: 2 }) + PUNCH(lt, 0.4));
  SN(21.1, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#1a0e2e', 0.2) + DV({ eye: 1.0, worry: 0.5, lookx: 0.5, t, mouth: 0.1, tremble: 1 }, 540, 880, 1.5), lt, 0.9, { z0: 1.3, z1: 1.0, shk: 2 }) + PUNCH(lt, 0.4));
  SN(21.5, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#1a1028') + G(R(-60, -280, 120, 560, '#c8b070', 'rx="24"') + C(0, 40, 90, '#d8c080') + R(-18, -300, 36, 380, '#a08840', 'rx="12"'), `translate(540 960) rotate(${f1(-40 * E_(k(lt, 0.2, 0.7)))}) scale(1.4)`) + glow(Pf, 'A', 540, 960, 600, 0.3), lt, 0.7, { z0: 1.0, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.4));
  SN(22.2, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { open: 0.4, gap: 1, lit: 1 }), lt, 0.7, { z0: 1.2, z1: 1.8, x0: 540, x1: 500, y0: 1400, y1: 1450, shk: 4 }) + PUNCH(lt, 0.5, HC.gr));
  /* 22.9 Erro fatal */
  SN(22.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#2a0505') + C(540, 960, 700, HC.red, OP(0.3)) + REDX(E_(k(lt, 0, 0.3)), 540, 960, 380), lt, 0.5, { z0: 0.8, z1: 1.2, shk: 10, r0: -4, r1: 4 }) + PUNCH(lt, 0.9, HC.red));
  SN(23.4, 0.001, (t, lt, Pf) => CM(Pf, t, PEEP(Pf, t, lt, BIG('#14081f') + FOGL(t, 0.5, 1000) + glow(Pf, 'A', 540, 700, 700, 0.3)), lt, 0.6, { z0: 1.0, z1: 1.1, shk: 1 }) + PUNCH(lt, 0.3));
  SN(24.0, 0.001, (t, lt, Pf) => { const u = E_(k(lt, 0, 2.2)); return CM(Pf, t, PEEP(Pf, t, lt, BIG('#14081f') + FOGL(t, 0.5, 1000) + GHOSTK(Pf, t, 540, 900 + 700 * u, 0.5 + 1.8 * u, { bucket: 0 })), lt, 2.2, { z0: 1.0, z1: 1.05, shk: 0.6 + 4 * u }); });
  SN(26.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#000') + E(440, 900, 90, 150, '#05030a') + E(640, 900, 90, 150, '#05030a') + C(440, 900, 26, HC.gr) + C(640, 900, 26, HC.gr) + glow(Pf, 'W', 440, 900, 300, 0.2), lt, 0.5, { z0: 1.0, z1: 1.8, shk: 12 }) + PUNCH(lt, 1.0));
  /* 26.7 protocolo */
  SN(26.7, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#1a0e2e', 0.3) + DV({ eye: 1.0, worry: 0.1, anger: 0.4, t, lookx: 0.4 }, 540, 880, 1.55), lt, 1.0, { z0: 1.3, z1: 1.0, shk: 2 }) + PUNCH(lt, 0.4));
  SN(27.6, 0.001, (t, lt, Pf) => CM(Pf, t, SKYH(Pf, t, { mx: 540, my: 800, bats: 6 }), lt, 0.5, { z0: 1.0, z1: 1.3, shk: 2 }) + PUNCH(lt, 0.3));
  SN(28.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night2) + glow(Pf, 'A', 540, 960, 800, 0.3) + G(P('M0,-300 L260,-200 L260,40 Q260,230 0,320 Q-260,230 -260,40 L-260,-200Z', '#3a1a5a', 'stroke="#ff8a1f" stroke-width="16"') + P('M-110,20 L-30,110 L130,-90', 'none', 'stroke="#7aff5a" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"'), `translate(540 960) scale(${f1(lp(0.6, 1.5, E_(k(lt, 0, 0.5))))})`), lt, 2.5, { z0: 1.0, z1: 1.2, shk: 1 }) + PUNCH(lt, 0.5, HC.or2));
  SN(29.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night2) + glow(Pf, 'A', 540, 960, 800, 0.25) + [0, 1, 2, 3].map(i => { const u = E_(k(lt, 0.12 * i, 0.12 * i + 0.3)); return G(R(-300, -60, 600, 120, '#2a1648', 'rx="30" stroke="#ff8a1f" stroke-width="8"') + C(-230, 0, 34, '#7aff5a') + R(-170, -14, 380 * (0.5 + 0.5 * hz(i, 4)), 28, '#f4e6b0', 'rx="14"'), `translate(540 ${700 + i * 220}) scale(${f1(u)})`); }).join(''), lt, 1.4, { z0: 1.0, z1: 1.15, shk: 1.5 }) + PUNCH(lt, 0.3));
}
