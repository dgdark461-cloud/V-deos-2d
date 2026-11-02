function partX(c) {
  const { sh, mb } = MK(c), WD = c.WORDS, W = i => WD[i].start, END = c.S[c.S.length - 1].end;
  const q = (i0, i1, o, fn, pf) => { const s0 = W(i0), d = (i1 === null ? END : W(i1)) - s0; sh(s0, d, o, (t, lt, Pf) => fn(t, lt, Pf) + GRADE(t, o.g || {}), pf); };
  const F = (t, o, x = 540, y = 1000, sc = 2.6) => FMX(t, Object.assign({ wet: 1 }, o), x, y, sc);
  const BGR = (Pf, t, col = '#2a3640') => BIG(col) + glow(Pf, 'W', 540, 600, 1000, 0.18);
  const MA = { kind: 'mar' }, ES = { kind: 'esp' }, IR = { kind: 'irm' };
  const MO = t => 0.3 + 0.3 * Math.abs(Math.sin(t * 15));
  const SOFT = '#cfd8e0';
  const crowd = (t, y, n, k0 = 0) => Array.from({ length: n }, (_, i) => MOURN(t, 90 + i * (900 / (n - 1)) + hz(i + k0, 3) * 30, y + hz(i + k0, 5) * 60, 1.5 + hz(i + k0, 8) * 0.4, i + k0)).join('');
  const hand = (x, y, sc, rot = 0, col = '#c4957a') => G(P('M-30,0 Q-34,-60 -20,-90 L-14,-60 L-10,-110 Q0,-118 8,-108 L10,-62 L18,-104 Q28,-108 32,-96 L30,-56 L40,-80 Q52,-80 52,-64 L40,10 Q10,40 -30,0Z', col, 'stroke="#0a0a0e" stroke-width="3"') + R(-40, 0, 90, 140, '#0c0d11'), `translate(${x} ${y}) rotate(${rot}) scale(${sc})`);
  mb(W(26), W(32)); mb(W(114), W(121)); mb(W(286), W(300));
  /* ---- 1. começa direto no próprio funeral ---- */
  q(0, 3, { z0: 1.0, z1: 1.35, x0: 540, x1: 540, y0: 900, y1: 840, shk: 1, g: { rain: 0.5 } }, (t, lt, Pf) => FUNERAL(Pf, t, { nophoto: 1 }), '#cfe0f0');
  q(3, 7, { z0: 1.0, z1: 1.2, x0: 380, x1: 700, shk: 2 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 760 }) + R(-400, 700, 1880, 40, '#1a1e1c') + R(-400, 740, 1880, 500, '#4a5258') + R(-400, 700, 1880, 14, '#6a7278') + [0, 1, 2, 3, 4].map(i => R(-60 + i * 280, 400, 30, 310, '#14181a')).join('') + F(t, Object.assign({ eye: 0.6, brow: 0.2 }, MA), lp(1300, -250, ez(lt / 2.6)), 1330, 1.5 + 0 * lt));
  q(7, 12, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, y0: 960, y1: 800, shk: 2 }, (t, lt, Pf) => FUNERAL(Pf, t, { nophoto: 1 }), '#fff');
  q(12, 16, { z0: 1.2, z1: 1.9, x0: 540, x1: 540, y0: 800, y1: 960, shk: 2 }, (t, lt, Pf) => BGR(Pf, t, '#222a30') + COFFIN(Pf, t, 540, 1000, 2.3, {}) + R(380, 560, 330, 320, '#d8d4c8', OP(0.0)), '#cfe0f0');
  q(16, 22, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 0.9, brow: 0.3 }, MA), 540, 1040, 2.5), SOFT);
  q(22, 28, { z0: 1.0, z1: 1.2, x0: 540, x1: 700, shk: 3 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + R(-400, 960, 1880, 400, '#3a4044') + F(t, Object.assign({ eye: 0.8 }, MA), 540, 1100, 1.9));
  q(28, 32, { z0: 1.0, z1: 1.4, shk: 4 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + R(-400, 1380, 1880, 600, '#3a4044') + G(P('M-90,0 L-70,-300 Q-60,-440 0,-450 Q60,-440 70,-300 L90,0Z', '#2c3038') + F(t, Object.assign({ eye: 0.8, body: 0 }, MA), 0, -490, 0.7) + R(80, -80, 80, 60, '#1a140e'), `translate(${f1(540 + 40 * Math.sin(t * 3))} 1700) scale(1.7)`));
  q(32, 36, { z0: 1.2, z1: 1.0, shk: 3 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 760 }) + R(-400, 900, 1880, 20, '#0a0e0c') + crowd(t, 1050, 9) + R(-400, 1180, 1880, 800, '#14181a', OP(0.7)), 0);
  q(36, 41, { z0: 1.0, z1: 1.45, shk: 2 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + crowd(t, 1200, 7, 3) + COFFIN(Pf, t, 540, 1100, 1.0, {}), 0);
  q(41, 44, { z0: 1.0, z1: 1.5, shk: 5 }, (t, lt, Pf) => BGR(Pf, t) + R(-400, 1500, 1880, 600, '#241c14') + [0, 1].map(i => G(P('M-50,0 L-40,-80 L40,-80 L50,0Z', '#14100c') + R(-46, -6, 92, 18, '#0a0806'), `translate(${f1(360 + i * 280 + 0)} ${f1(1700 - ((lt / 1.2) % 1) * 160 * (i ? 1 : 0.6))}) scale(2)`)).join(''), 0);
  q(44, 49, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BGR(Pf, t) + crowd(t, 1300, 5, 7) + F(t, Object.assign({ eye: 1, brow: 0.5, lookx: 0.5 }, MA), lp(300, 620, ez(lt / 3)), 1060, 1.9));
  /* ---- aceleração: reconhecimento da foto ---- */
  q(49, 51, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.15, brow: 0.7, lookx: 0, looky: -0.2 }, MA), 540, 1020, 3.0), '#fff');
  q(51, 54, { z0: 1.0, z1: 1.5, x0: 540, x1: 540, y0: 1000, y1: 800, shk: 4 }, (t, lt, Pf) => FUNERAL(Pf, t, { nophoto: 0 }), '#cfe0f0');
  q(54, 57, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#181a1e') + FRAME(t, 540, 940, 2.9, 0, { glare: 1 }), '#fff');
  q(57, 58, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BGR(Pf, t) + COFFIN(Pf, t, 540, 1000, 2.2, {}) + FRAME(t, 540, 700, 1.1, 0, {}), 0);
  q(58, 61, { z0: 1.0, z1: 1.2, r0: 0, r1: 8, shk: 7 }, (t, lt, Pf) => BGR(Pf, t) + R(-400, 1500, 1880, 600, '#241c14') + G(P('M-60,0 L-50,-340 L50,-340 L60,0Z', '#1a1c22') + R(-70, -10, 140, 24, '#0a0806'), `translate(540 ${f1(1700 + 140 * ez(lt / 2.2))}) scale(2.5 0)`.replace(' 0)', ')')), 0);
  q(61, 64, { z0: 1.0, z1: 1.2, r0: 4, r1: -6, shk: 6 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 0.8, trem: 1, pal: 0.3, tilt: -8 * ez(lt / 2) }, MA), 540, lp(1000, 1200, ez(lt / 2)), 2.7), 0);
  q(64, 68, { z0: 1.0, z1: 2.2, x0: 540, x1: 540, y0: 960, y1: 900, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#101216') + FRAME(t, 540, 940, 3.6, 0, { glare: 1 }), '#fff');
  q(68, 72, { z0: 1.0, z1: 1.35, shk: 5 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 0.7, mouth: 0.3 + 0.2 * Math.abs(Math.sin(t * 10)), smile: 0.8, trem: 0.6, tilt: 3 * Math.sin(t * 9), brow: 0.4 }, MA), 540, 1020, 2.7), SOFT);
  q(72, 82, { z0: 1.0, z1: 1.5, x0: 540, x1: 540, shk: 3 }, (t, lt, Pf) => BGR(Pf, t) + crowd(t, 1500, 6, 11) + F(t, Object.assign({ eye: 0.9, smile: Math.max(0, 0.8 - lt / 5), brow: 0.3 + lt / 8, lookx: Math.sin(t * 1.2), sweat: lt / 8 }, MA), 540, 1000, 2.3 + 0 * lt), 0);
  q(82, 86, { z0: 1.2, z1: 1.0, shk: 4 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.1, brow: 0.6, lookx: lp(0, 1.2, ez(lt / 0.8)), tilt: 6 * ez(lt / 0.8) }, MA), 540, 1020, 2.6), 0);
  q(86, 91, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => BGR(Pf, t, '#1c2228') + F(t, Object.assign({ eye: 0.5, cry: 1, mouth: lt % 1.2 < 0.7 ? 0.35 + 0.2 * Math.sin(t * 8) : 0.05, tears: 1, brow: 1, trem: 0.5 }, ES), 540, 1040, 2.6), '#cfe0f0');
  q(91, 95, { z0: 1.0, z1: 1.45, shk: 3 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.25, brow: 0.9, mouth: 0.25, pal: 0.3 }, MA), 540, 1020, 2.8), '#fff');
  q(95, 100, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1, brow: 0.7, mouth: MO(t) * 0.8, lookx: 0.4, tilt: 3 }, MA), 540, 1040, 2.5) + hand(860, 1500 - 100 * ez(lt / 2), 1.4, -20, '#c99a78'), 0);
  q(100, 105, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => BGR(Pf, t, '#1c2228') + F(t, Object.assign({ eye: 0.8, cry: 1, tears: 1, brow: 1, lookx: lp(-1, 0.1, ez(lt / 2)), tilt: lp(-8, 0, ez(lt / 2)) }, ES), 540, 1040, 2.7), 0);
  q(105, 108, { z0: 1.2, z1: 1.9, shk: 4 }, (t, lt, Pf) => BGR(Pf, t, '#1c2228') + F(t, Object.assign({ eye: 1.3, brow: 0.9, mouth: 0.4, tears: 0.5, pal: ez(lt / 2) }, ES), 540, 1040, 2.8), '#fff');
  q(108, 110, { z0: 1.5, z1: 1.8, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#1c2228') + F(t, Object.assign({ eye: 1.3, pal: 0.8, brow: 0.7, mouth: 0.2 }, ES), 540, 1040, 2.9), 0);
  q(109, 110, { z0: 1.0, z1: 1.2, r0: 0, r1: 14, shk: 7, gl: 1 }, (t, lt, Pf) => BGR(Pf, t, '#1c2228') + F(t, Object.assign({ eye: 0.1, pal: 1, tilt: 40 * ez(lt / 0.8) }, ES), 540, lp(1040, 1500, ez(lt / 0.8)), 2.8), '#fff');
  /* ---- irmão: só costas / sombra / mão (rosto escondido) ---- */
  const BRO = (t, x, y, sc, ph = 0) => G(P('M-70,0 L-60,-330 Q-90,-350 -80,-440 Q-60,-500 0,-520 Q60,-500 80,-440 Q90,-350 60,-330 L70,0Z', '#0b0c10') + C(0, -560, 62, '#16110f') + P('M-62,-540 Q0,-640 62,-540 Q50,-600 0,-612 Q-50,-600 -62,-540Z', '#0a0807'), `translate(${f1(x)} ${f1(y)}) rotate(${ph}) scale(${sc})`);
  q(110, 114, { z0: 1.0, z1: 1.4, x0: 540, x1: 500, shk: 3 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + crowd(t, 1250, 8, 4) + COFFIN(Pf, t, 540, 1120, 1.0, {}) + BRO(t, 640, 1500, 0.85, 3 * Math.sin(t)), 0);
  q(114, 121, { z0: 1.0, z1: 1.6, shk: 8 }, (t, lt, Pf) => BGR(Pf, t) + R(-400, 1450, 1880, 600, '#241c14') + BRO(t, 540, 1900, lp(1.0, 2.2, ez(lt / 2.5)), 6 * Math.sin(t * 8)) + [0, 1, 2, 3, 4, 5].map(i => C(240 + hz(i, 3) * 600, 1700 + (t * 300 * (hz(i, 4) + 0.5) % 160), 4 + hz(i, 5) * 6, '#5a4a3a', OP(0.7))).join(''), '#cfe0f0');
  q(121, 126, { z0: 1.0, z1: 1.6, shk: 5 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, Object.assign({ eye: 1.2, brow: 0.8, mouth: 0.15, lookx: 0.4 }, MA), 540, 1020, 2.5) + G(P('M300,1240 Q540,1100 700,1220 L760,1500 L240,1500Z', '#0b0c10', OP(0.95)) + hand(620, 1360, 1.2, 70, '#c4957a'), 'translate(0 0)'), '#fff');
  q(126, 131, { z0: 1.3, z1: 1.9, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + F(t, Object.assign({ eye: 1.1, brow: 0.6, lookx: 0.9, pal: 0.3 }, MA), 440, 1000, 2.9) + P('M900,0 L1080,0 L1080,1920 L860,1920Z', '#000', OP(0.88)), 0);
  q(131, 135, { z0: 1.0, z1: 1.8, x0: 540, x1: 540, y0: 960, y1: 870, shk: 4 }, (t, lt, Pf) => BGR(Pf, t, '#0a0c10') + [-1, 1].map(s => G(eyesPair('', 0, 0, 1.2, '#e8e0d4', 1, 90 * s * 0.5), `translate(540 ${f1(940)}) scale(${s === 1 ? 2.4 : 0.001})`)).join('') + F(t, Object.assign({ eye: 1.3, brow: 1, trem: 0.7 }, MA), 540, 1020, 3.2), '#ff3b30');
  /* ---- reação e documentos (ritmo mais lento) ---- */
  q(135, 141, { z0: 1.0, z1: 1.3, shk: 6, r0: -3, r1: 3 }, (t, lt, Pf) => BGR(Pf, t) + hand(300, 1500 - 400 * ez(lt / 0.5), 2.0, 40) + F(t, Object.assign({ eye: 1.2, brow: 1, mouth: 0.4, tilt: -5 }, MA), 600, 1000, 2.3), '#fff');
  q(141, 143, { z0: 1.0, z1: 1.5, shk: 5 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.1, brow: 1, mouth: 0.7 + 0.2 * Math.sin(t * 20), tilt: 4 }, MA), 540, 1020, 2.9), 0);
  q(143, 149, { z0: 1.0, z1: 1.25, shk: 1 }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + glow(Pf, 'W', 540, 900, 800, 0.1) + BRIEFCASE(t, 540, 1250, 1.9, ez(lt / 1.3)) + P('M-60,1920 L-60,1300 Q300,1180 560,1300 L560,1920Z', '#0b0c10', OP(0.9)), 0);
  q(149, 155, { z0: 1.0, z1: 1.35, x0: 540, x1: 540, y0: 960, y1: 940, shk: 1, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(CERT(t, { st: ez((lt - 2.2) / 0.3) }), `translate(540 960) rotate(${f1(-3 + lt * 0.8)}) scale(2.2)`), '#e8e2d0');
  q(155, 158, { z0: 1.0, z1: 1.25, shk: 1, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(RGCARD(t, { st: ez((lt - 1.0) / 0.3) }), 'translate(540 900) rotate(-4) scale(2.2)'), '#e8e2d0');
  q(158, 166, { z0: 1.0, z1: 1.3, shk: 1, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(EXAM(t, { st: ez((lt - 3.2) / 0.3) }), 'translate(540 960) scale(2.3)'), '#9fd0ff');
  q(166, 170, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(CERT(t, { st: 1 }), `translate(540 960) scale(${f1(2.2 + 0.1 * lt)})`) + R(-400, -400, 1880, 2720, '#b01820', OP(0.25 * Math.exp(-lt * 3))), '#ff3b30');
  q(170, 176, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 1, mouth: 0.15, trem: 0.8, sweat: 1 }, MA), 540, 1000, 2.6), 0);
  q(176, 182, { z0: 1.0, z1: 1.35, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#10141a') + G(PHONEX(t, { status: lt < 2.0 ? 'chamando...' : 'desligado', bad: lt >= 2.0 }), `translate(540 960) rotate(${f1(Math.sin(t * 8) * 1.5)}) scale(2.3)`) , '#ff3b30');
  q(182, 188, { z0: 1.0, z1: 1.25, shk: 5 }, (t, lt, Pf) => BGR(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 0.8, lookx: Math.sin(t * 3) * 1.2, looky: 0.2 * Math.sin(t * 5), trem: 0.3 }, MA), 540, 1000, 2.6), 0);
  q(188, 194, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, { kind: 'm1', eye: 1.2, brow: 0.8, mouth: 0.15, pal: 0.2 }, 540, 1040, 2.6), '#cfe0f0');
  q(194, 197, { z0: 1.0, z1: 1.4, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, { kind: 'm2', eye: 1.3, brow: 0.9, mouth: 0.2, pal: 0.3 }, 540, 1040, 2.6), '#fff');
  q(197, 201, { z0: 1.0, z1: 1.4, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, { kind: 'm3', eye: 1.3, brow: 0.9, mouth: 0.3, pal: 0.2 }, 540, 1040, 2.6), '#fff');
  q(201, 206, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, { kind: 'm4', eye: 1.35, brow: 1, mouth: 0.3, pal: 0.4, trem: 0.5 }, 540, 1040, 2.7), '#fff');
  /* ---- foto no chão, verso ---- */
  q(206, 212, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + crowd(t, 1300, 6, 9) + F(t, Object.assign({ eye: 1, brow: 0.6, lookx: -0.5 }, MA), lp(540, 300, ez(lt / 2)), 1120, 1.7), 0);
  q(212, 215, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, Object.assign({ eye: 1, brow: 0.5, looky: 1, lookx: 0.3 }, MA), 540, 960, 2.6), 0);
  q(215, 222, { z0: 1.2, z1: 1.8, x0: 540, x1: 540, y0: 1100, y1: 1280, shk: 2 }, (t, lt, Pf) => BGR(Pf, t, '#1c1610') + R(-400, 1200, 1880, 800, '#2a2218') + COFFIN(Pf, t, 540, 1000, 1.8, {}) + G(R(-90, -60, 180, 120, '#d8d2c4', 'stroke="#f0ece0" stroke-width="6"'), 'translate(660 1330) rotate(18) scale(1.1)'), 0);
  q(222, 233, { z0: 1.0, z1: 1.3, shk: 2, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(PHOTOCAR(t, { ts: '' }), `translate(540 960) rotate(${f1(-5 + lt * 0.6)}) scale(2.9)`), '#fff');
  q(233, 238, { z0: 1.0, z1: 1.3, shk: 2, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(PHOTOCAR(t, {}), `translate(540 960) rotate(-4) scale(2.9) skewX(${f1(lt < 0.4 ? lt * 80 : 0)})`) , 0);
  q(238, 245, { z0: 1.0, z1: 1.35, shk: 1, g: { rain: 0.15 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(BACKNOTE(t, lt), 'translate(540 960) rotate(-3) scale(2.1)'), '#e8e2d0');
  q(245, 249, { z0: 1.0, z1: 1.9, shk: 1, g: { rain: 0.25 } }, (t, lt, Pf) => BGR(Pf, t, '#0a0c10') + F(t, Object.assign({ eye: 1.2, brow: 0.4, pal: 0.4, lookx: 0 }, MA), 540, 1020, 2.8), 0);
  q(249, 255, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#10141a') + G(RGCARD(t, {}), `translate(${f1(lp(700, 400, ez(lt / 2)))} 700) rotate(-8) scale(1.6)`) + G(FRAME(t, 0, 0, 1, 0, {}), 'translate(780 1250) rotate(6) scale(1.0)') + G(F(t, Object.assign({ eye: 0.8, brow: 0.5, body: 1, pal: 0.2 }, IR), 0, 0, 1) + R(-400, -400, 0, 0, '#000'), 'translate(280 1450) scale(0.6)') , 0);
  q(255, 258, { z0: 1.0, z1: 1.5, shk: 5, g: { rain: 0.2 } }, (t, lt, Pf) => BGR(Pf, t, '#10141a') + G(RGCARD(t, { st: 1 }), 'translate(540 760) rotate(-8) scale(2.0)') + G(CERT(t, { st: 1 }), 'translate(560 1300) rotate(6) scale(0.9)'), '#ff3b30');
  q(258, 265, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BGR(Pf, t, '#10141a') + [0, 1, 2, 3].map(i => G(R(-60, -40, 120, 80, ['#8a7a50', '#4a5a6a', '#6a4a3a', '#5a6a4a'][i], 'rx="10"'), `translate(${f1(200 + i * 220)} ${f1(1000 + 120 * Math.sin(t * 2 + i) + 400 * ez((lt - 1) / 4))}) rotate(${f1(12 * Math.sin(t + i))}) scale(2)`)).join('') + F(t, Object.assign({ eye: 1.1, brow: 0.5, pal: 0.2 }, IR), 540, 960, 0.8), 0);
  /* ---- silêncio breve + revelação final ---- */
  q(265, 272, { z0: 1.0, z1: 1.4, shk: 1, g: { rain: 0.5 } }, (t, lt, Pf) => BGR(Pf, t, '#06080a') + F(t, Object.assign({ eye: 1.1, brow: 0.9, mouth: 0.05, pal: 0.5, trem: 0.4 }, MA), 540, 1020, 2.6), 0);
  q(272, 278, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => CEMBG(Pf, t, { hy: 700 }) + crowd(t, 1350, 5, 2) + F(t, Object.assign({ eye: 0.8, brow: 0.2, mouth: 0, wet: 1 }, IR), 540, 980, 3.0 * (0.8 + 0.1 * ez(lt / 2))), '#ffffff');
  q(278, 283, { z0: 1.0, z1: 1.3, shk: 3, g: { rain: 0.1 } }, (t, lt, Pf) => BGR(Pf, t, '#14181c') + G(POSTER(t, {}), `translate(540 960) rotate(${f1(3 - lt * 0.6)}) scale(2.4)`), '#cfd8c4');
  q(283, 291, { z0: 1.0, z1: 1.5, shk: 4 }, (t, lt, Pf) => BGR(Pf, t, '#1a1e24') + F(t, Object.assign({ eye: 1.2, brow: 0.7, lookx: lp(-0.8, 1, ez(lt / 2)), looky: -0.4 * ez(lt / 1.5) }, MA), 540, 1020, 2.6), 0);
  q(291, 296, { z0: 1.0, z1: 1.6, shk: 5 }, (t, lt, Pf) => CARPARK(Pf, t, {}) + CARX(Pf, t, 760, 1240, 1.6, { col: '#8a949a' }) + BRO(t, lp(300, 560, ez(lt / 2.5)), 1260, 0.7, 0), '#cfd8e0');
  q(296, 300, { z0: 1.0, z1: 1.9, x0: 540, x1: 640, y0: 1000, y1: 1050, shk: 4 }, (t, lt, Pf) => CARPARK(Pf, t, {}) + CARX(Pf, t, 540, 1300, 2.2, { col: '#8a949a', door: 1 }) + P('M520,1100 Q580,1060 640,1100 L650,1200 L520,1200Z', '#0b0c10', OP(0.9)), '#ff3b30');
  q(300, 306, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, y0: 900, y1: 840, shk: 2, g: { rain: 0.5 } }, (t, lt, Pf) => FUNERAL(Pf, t, {}) + R(-400, -400, 1880, 2720, '#000', OP(0.15)), 0);
  q(306, 309, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => CARPARK(Pf, t, {}) + CARX(Pf, t, lp(540, 1200, ez(lt / 2.5)), 1300, lp(2.2, 1.6, ez(lt / 2.5)), { lights: 1, col: '#8a949a' }), '#ff3b30');
  q(309, null, { z0: 1.0, z1: 1.8, x0: 540, x1: 540, y0: 1100, y1: 900, shk: 2, g: { rain: 0.6 } }, (t, lt, Pf) => BGR(Pf, t, '#10141a') + COFFIN(Pf, t, 540, 1150, 2.0, {}) + FRAME(t, 540, 760, 1.3, 0, { glare: 1 }) + F(t, Object.assign({ eye: 0.6, brow: 0.9, cry: 1, tears: 1 }, MA), 540, 1500, 1.3) , '#ff3b30');
}
