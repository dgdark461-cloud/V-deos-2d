function partX(c) {
  const { sh, mb } = MK(c), WD = c.WORDS, W = i => WD[i].start, END = c.S[c.S.length - 1].end;
  const q = (i0, i1, o, fn, pf) => { const s0 = W(i0), d = (i1 === null ? END : W(i1)) - s0; sh(s0, d, o, (t, lt, Pf) => fn(t, lt, Pf) + GRADE7(t, o.g || {}), pf); };
  const F = (t, o, x = 540, y = 1000, sc = 2.6) => FNX(t, o, x, y, sc);
  const MA = { kind: 'mar' }, ES = { kind: 'esp' }, IR = { kind: 'irm' };
  const MO = t => 0.3 + 0.3 * Math.abs(Math.sin(t * 15));
  const WARM = '#ffd0a0', RED = '#ff3b4a';
  const BG = (Pf, t, a = '#3a1a50', b = '#d8643a') => BIG(a) + glow(Pf, 'F', 540, 1500, 1300, 0.55) + glow(Pf, 'A', 540, 1700, 700, 0.3);
  const hand = (x, y, sc, rot = 0, col = '#c88c66', cuff = '#3a3e48') => G(P('M-30,0 Q-34,-60 -20,-90 L-14,-60 L-10,-110 Q0,-118 8,-108 L10,-62 L18,-104 Q28,-108 32,-96 L30,-56 L40,-80 Q52,-80 52,-64 L40,10 Q10,40 -30,0Z', col, 'stroke="#0a0710" stroke-width="5"') + R(-40, 0, 90, 150, cuff, 'stroke="#0a0710" stroke-width="5"'), `translate(${x} ${y}) rotate(${rot}) scale(${sc})`);
  const BROB = (t, x, y, sc, ph = 0) => G(P('M-72,0 L-62,-330 Q-92,-350 -82,-440 Q-62,-500 0,-520 Q62,-500 82,-440 Q92,-350 62,-330 L72,0Z', '#3a3e48', 'stroke="#0a0710" stroke-width="6"') + P('M-62,-330 Q-92,-350 -82,-440 Q-62,-500 0,-520', 'none', 'stroke="#ffb070" stroke-width="6"') + C(0, -566, 64, '#c88c66', 'stroke="#0a0710" stroke-width="6"') + P('M-60,-580 Q0,-640 60,-580 Q40,-620 0,-624 Q-40,-620 -60,-580Z', '#1a1210') + P('M-58,-566 L58,-566', 'none', 'stroke="#0a0710" stroke-width="3"'), `translate(${f1(x)} ${f1(y)}) rotate(${ph}) scale(${sc})`);
  mb(W(28), W(32)); mb(W(114), W(121)); mb(W(286), W(300));
  /* ---- abertura: plano zenital do funeral, câmera desce ---- */
  q(0, 3, { z0: 1.0, z1: 1.6, r0: 0, r1: 18, shk: 1 }, (t, lt, Pf) => TOPFUN(Pf, t, {}), WARM);
  q(3, 7, { z0: 1.25, z1: 1.0, r0: -6, r1: 4, shk: 2 }, (t, lt, Pf) => GROUND7(Pf, t, 900, {}) + R(380, 560, 18, 360, '#0a0612') + R(682, 560, 18, 360, '#0a0612') + [0, 1, 2, 3, 4, 5, 6].map(i => R(396 + i * 40, 560, 6, 360, '#0a0612')).join('') + P('M390,560 Q540,430 690,560', 'none', 'stroke="#0a0612" stroke-width="16"') + TXT(540, 520, 'CEMITÉRIO', 40, '#0a0612'));
  q(7, 12, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => GROUND7(Pf, t, 880, {}) + CROWD7(t, 1280, 8, 2) + COFF7(Pf, t, 540, 1160, 1.0, {}), WARM);
  q(12, 16, { z0: 1.5, z1: 1.1, r0: 6, r1: -2, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + COFF7(Pf, t, 540, 1040, 2.4, {}) + P('M-400,0 L1480,0 L1480,520 L-400,420Z', '#0a0418', OP(0.5)), 0);
  q(16, 22, { z0: 1.0, z1: 1.3, r0: -3, r1: 0, shk: 2 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 0.9, brow: 0.3, lookx: 0.5 }, MA), 540, 1040, 2.6), WARM);
  q(22, 26, { z0: 1.0, z1: 1.2, x0: 400, x1: 560, shk: 3 }, (t, lt, Pf) => GROUND7(Pf, t, 880, { sx: 300 }) + R(-400, 1180, 1880, 40, '#3a1a3a', OP(0.5)) + G(P('M-90,0 L-70,-300 Q-60,-440 0,-450 Q60,-440 70,-300 L90,0Z', '#33405a', 'stroke="#0a0710" stroke-width="6"') + F(t, Object.assign({ eye: 0.8, body: 0 }, MA), 0, -490, 0.7) + R(60, -300, 70, 110, '#1f7a7a', 'rx="10" stroke="#0a0710" stroke-width="5"'), `translate(${f1(lp(1100, 300, ez((t - 0) % 6 / 6)))} 1500) scale(1.7)`));
  q(26, 32, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + G(R(-60, -250, 120, 220, '#1f7a7a', 'rx="14" stroke="#0a0710" stroke-width="6"') + R(-40, -230, 80, 24, '#0a0710') + C(0, -150, 36, '#e8e8f0', 'stroke="#0a0710" stroke-width="4"') + P('M0,-250 L0,-420', 'none', 'stroke="#f0d060" stroke-width="10"'), `translate(540 ${f1(1100 + 30 * Math.sin(t * 3))}) rotate(${f1(8 * Math.sin(t * 2.2))}) scale(2.6)`), 0);
  q(32, 36, { z0: 1.2, z1: 1.0, x0: 540, x1: 540, shk: 3 }, (t, lt, Pf) => GROUND7(Pf, t, 900, {}) + CROWD7(t, 1220, 9, 8) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => R(-40 + i * 120, -100, 22, 2200, '#0a0612')).join('') + R(-400, 560, 1880, 30, '#0a0612'), 0);
  q(36, 41, { z0: 1.0, z1: 1.5, y0: 1300, y1: 1100, shk: 2 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + CROWD7(t, 1500, 6, 2) + P('M200,1500 Q540,1380 880,1500 L920,1900 L160,1900Z', '#3a2030', 'stroke="#0a0710" stroke-width="6"'), 0);
  q(41, 44, { z0: 1.0, z1: 1.4, shk: 6 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + R(-400, 1380, 1880, 700, '#2a1a30') + [0, 1].map(i => G(P('M-60,0 L-48,-90 L48,-90 L60,0Z', '#14100c', 'stroke="#0a0710" stroke-width="5"') + R(-56, -8, 112, 20, '#0a0612'), `translate(${f1(380 + i * 320)} ${f1(1760 - ((lt / 1.2 + i * 0.5) % 1) * 140)}) scale(2.1)`)).join('') + glow(Pf, 'A', 540, 1500, 600, 0.3), 0);
  q(44, 49, { z0: 1.0, z1: 1.35, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 1.05, brow: 0.5, lookx: lp(-0.6, 0.8, ez(lt / 3.2)) }, MA), 540, 1020, 3.1) + CROWD7(t, 1850, 5, 5).replace(/<g /, '<g opacity="0.0" '), 0);
  /* ---- reconhecimento da foto: cortes rápidos ---- */
  q(49, 51, { z0: 1.0, z1: 1.4, r0: 4, r1: -4, shk: 5 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 0.8 }, MA), 540, 1020, 3.4), '#fff');
  q(51, 54, { z0: 1.0, z1: 1.8, y0: 960, y1: 760, shk: 4 }, (t, lt, Pf) => GROUND7(Pf, t, 880, {}) + CROWD7(t, 1330, 8, 4) + COFF7(Pf, t, 540, 1180, 1.1, {}) + PORTRAIT7(t, 540, 730, 0.5, 0), WARM);
  q(54, 57, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + PORTRAIT7(t, 540, 940, 3.1, 0), '#fff');
  q(57, 58, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BG(Pf, t) + COFF7(Pf, t, 540, 1100, 2.1, {}) + PORTRAIT7(t, 540, 640, 1.0, 0), 0);
  q(58, 61, { z0: 1.0, z1: 1.4, r0: 0, r1: -14, shk: 8 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + R(-400, 1520, 1880, 600, '#2a1a30') + G(P('M-70,0 L-56,-340 L56,-340 L70,0Z', '#33405a', 'stroke="#0a0710" stroke-width="6"') + R(-78, -10, 156, 26, '#0a0612'), `translate(540 ${f1(1720 + 200 * ez(lt / 2.2))}) rotate(${f1(-10 * ez(lt / 2.2))}) scale(2.4)`), 0);
  q(61, 64, { z0: 1.0, z1: 1.2, r0: 6, r1: -8, shk: 6 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 1.25, brow: 0.9, trem: 1, pal: 0.3, tilt: -8 * ez(lt / 2) }, MA), 540, lp(1000, 1180, ez(lt / 2)), 2.8), 0);
  q(64, 68, { z0: 1.0, z1: 2.3, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#10081a') + PORTRAIT7(t, 540, 930, 3.7, 0), '#fff');
  q(68, 72, { z0: 1.0, z1: 1.35, r0: -4, r1: 5, shk: 5 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 0.7, mouth: 0.35 + 0.2 * Math.abs(Math.sin(t * 10)), smile: 0.8, trem: 0.7, tilt: 3 * Math.sin(t * 9), brow: 0.4 }, MA), 540, 1020, 2.8), WARM);
  q(72, 82, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => BG(Pf, t) + CROWD7(t, 1620, 6, 13) + F(t, Object.assign({ eye: 0.9, smile: Math.max(0, 0.8 - lt / 5), brow: 0.3 + lt / 8, lookx: Math.sin(t * 1.3), sweat: lt / 8 }, MA), 540, 960, 2.4), 0);
  q(82, 86, { z0: 1.2, z1: 1.0, r0: 5, r1: 0, shk: 4 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.1, brow: 0.6, lookx: lp(0, 1.2, ez(lt / 0.8)), tilt: 6 * ez(lt / 0.8) }, MA), 540, 1020, 2.7), 0);
  q(86, 91, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 0.5, cry: 1, mouth: lt % 1.2 < 0.7 ? 0.35 + 0.2 * Math.sin(t * 8) : 0.05, tears: 1, brow: 1, trem: 0.5 }, ES), 540, 1040, 2.7), WARM);
  q(91, 95, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.3, brow: 0.9, mouth: 0.25, pal: 0.3 }, MA), 540, 1020, 3.0), '#fff');
  q(95, 100, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1, brow: 0.7, mouth: MO(t) * 0.8, lookx: 0.4, tilt: 3 }, MA), 540, 1040, 2.6) + hand(860, 1560 - 120 * ez(lt / 2), 1.5, -20, '#e2a878', '#33405a'), 0);
  q(100, 105, { z0: 1.0, z1: 1.55, r0: -5, r1: 0, shk: 2 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 0.8, cry: 1, tears: 1, brow: 1, lookx: lp(-1, 0.1, ez(lt / 2)) }, ES), 540, 1040, 2.8), 0);
  q(105, 108, { z0: 1.2, z1: 2.0, shk: 4 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 1.35, brow: 0.9, mouth: 0.4, tears: 0.5, pal: ez(lt / 2) }, ES), 540, 1040, 3.0), '#fff');
  q(108, 110, { z0: 1.0, z1: 1.2, r0: 0, r1: 16, shk: 8 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 0.1, pal: 1, tilt: 40 * ez(lt / 0.8) }, ES), 540, lp(1040, 1500, ez(lt / 0.8)), 2.9), '#fff');
  /* ---- irmão: costas e sombras, rosto oculto ---- */
  q(110, 114, { z0: 1.0, z1: 1.5, x0: 540, x1: 500, shk: 3 }, (t, lt, Pf) => GROUND7(Pf, t, 880, {}) + CROWD7(t, 1260, 8, 4) + COFF7(Pf, t, 540, 1110, 0.9, {}) + BROB(t, 700, 1560, 0.8, 2 * Math.sin(t)), WARM);
  q(114, 121, { z0: 1.0, z1: 1.7, shk: 9 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + R(-400, 1500, 1880, 600, '#2a1a30') + BROB(t, 540, 2000, lp(1.0, 2.3, ez(lt / 2.5)), 6 * Math.sin(t * 8)), WARM);
  q(121, 126, { z0: 1.0, z1: 1.6, shk: 5 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 0.8, mouth: 0.15, lookx: 0.4 }, MA), 540, 1020, 2.6) + hand(660, 1420, 1.5, 65), '#fff');
  q(126, 131, { z0: 1.3, z1: 1.9, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#10081a') + F(t, Object.assign({ eye: 1.1, brow: 0.6, lookx: 0.9, pal: 0.3 }, MA), 440, 1000, 3.0) + P('M880,0 L1080,0 L1080,1920 L840,1920Z', '#0a0612', OP(0.9)), 0);
  q(131, 135, { z0: 1.0, z1: 1.9, shk: 4 }, (t, lt, Pf) => BG(Pf, t, '#10081a') + F(t, Object.assign({ eye: 1.3, brow: 1, trem: 0.8 }, MA), 540, 1020, 3.3) + R(-400, -400, 1880, 2720, '#c01828', OP(0.12)), RED);
  /* ---- reação e documentos ---- */
  q(135, 141, { z0: 1.0, z1: 1.3, r0: -3, r1: 3, shk: 7 }, (t, lt, Pf) => BG(Pf, t) + hand(300, 1560 - 420 * ez(lt / 0.5), 2.1, 40) + F(t, Object.assign({ eye: 1.2, brow: 1, mouth: 0.4, tilt: -5 }, MA), 620, 1000, 2.4), '#fff');
  q(141, 143, { z0: 1.0, z1: 1.5, shk: 5 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.1, brow: 1, mouth: 0.7 + 0.2 * Math.sin(t * 20), tilt: 4 }, MA), 540, 1020, 3.0), 0);
  q(143, 149, { z0: 1.0, z1: 1.25, shk: 1 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + FOLDER7(t, 540, 1260, 1.9, ez(lt / 1.3)) + P('M-60,1920 L-60,1320 Q300,1200 560,1320 L560,1920Z', '#3a3e48', 'stroke="#0a0710" stroke-width="6"'), 0);
  q(149, 155, { z0: 1.0, z1: 1.35, shk: 1, g: { petals: 6 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(CERT7(t, { st: ez((lt - 2.2) / 0.3) }), `translate(540 960) rotate(${f1(3 - lt * 0.8)}) scale(2.2)`), '#f4ecd8');
  q(155, 158, { z0: 1.0, z1: 1.25, shk: 1, g: { petals: 6 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(ID7(t, { st: ez((lt - 1.0) / 0.3) }), 'translate(540 920) rotate(5) scale(2.0)'), '#dfe8f4');
  q(158, 166, { z0: 1.0, z1: 1.3, shk: 1, g: { petals: 6 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(LAUDO7(t, { st: ez((lt - 3.2) / 0.3) }), 'translate(540 960) scale(2.2)'), '#40ff90');
  q(166, 170, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(CERT7(t, { st: 1 }), `translate(540 960) scale(${f1(2.2 + 0.1 * lt)})`) + R(-400, -400, 1880, 2720, '#c01828', OP(0.28 * Math.exp(-lt * 3))), RED);
  q(170, 176, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 1, mouth: 0.15, trem: 0.8, sweat: 1 }, MA), 540, 1000, 2.7), 0);
  q(176, 182, { z0: 1.0, z1: 1.35, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(PHONE7(t, { status: lt < 2.0 ? 'chamando...' : 'desligado', bad: lt >= 2.0 }), `translate(540 960) rotate(${f1(Math.sin(t * 8) * 1.5)}) scale(2.3)`), RED);
  q(182, 188, { z0: 1.0, z1: 1.25, r0: 3, r1: -3, shk: 5 }, (t, lt, Pf) => BG(Pf, t) + F(t, Object.assign({ eye: 1.2, brow: 0.8, lookx: Math.sin(t * 3) * 1.2, looky: 0.3 * Math.sin(t * 5), trem: 0.3 }, MA), 540, 1000, 2.7), 0);
  q(188, 194, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, { kind: 'p1', eye: 1.2, brow: 0.8, mouth: 0.15, pal: 0.2 }, 540, 1040, 2.7), WARM);
  q(194, 197, { z0: 1.0, z1: 1.4, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, { kind: 'p2', eye: 1.3, brow: 0.9, mouth: 0.2, pal: 0.3 }, 540, 1040, 2.7), '#fff');
  q(197, 201, { z0: 1.0, z1: 1.4, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, { kind: 'p3', eye: 1.3, brow: 0.9, mouth: 0.3, pal: 0.2 }, 540, 1040, 2.7), '#fff');
  q(201, 206, { z0: 1.0, z1: 1.6, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, { kind: 'p4', eye: 1.35, brow: 1, mouth: 0.3, pal: 0.4, trem: 0.5 }, 540, 1040, 2.8), '#fff');
  /* ---- foto no chão ---- */
  q(206, 212, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => GROUND7(Pf, t, 880, {}) + CROWD7(t, 1330, 6, 9) + F(t, Object.assign({ eye: 1, brow: 0.6, lookx: -0.5 }, MA), lp(540, 300, ez(lt / 2)), 1150, 1.7), 0);
  q(212, 215, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 1, brow: 0.5, looky: 1, lookx: 0.3 }, MA), 540, 960, 2.8), 0);
  q(215, 222, { z0: 1.2, z1: 1.9, y0: 1100, y1: 1300, shk: 2 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + R(-400, 1220, 1880, 800, '#2a1a30') + COFF7(Pf, t, 540, 1000, 1.9, {}) + G(R(-90, -60, 180, 120, '#f6f0e4', 'stroke="#1a1030" stroke-width="5"'), 'translate(660 1340) rotate(18) scale(1.1)'), 0);
  q(222, 233, { z0: 1.0, z1: 1.3, shk: 2, g: { petals: 8 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(POLA7(t, {}), `translate(540 960) rotate(${f1(-5 + lt * 0.6)}) scale(2.9)`), '#fff');
  q(233, 238, { z0: 1.0, z1: 1.3, shk: 2, g: { petals: 8 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(POLA7(t, {}), 'translate(540 960) rotate(-4) scale(2.9)') + R(-400, -400, 1880, 2720, '#f6f0e4', OP(Math.max(0, 0.7 - lt * 2.5))), 0);
  q(238, 245, { z0: 1.0, z1: 1.35, shk: 1, g: { petals: 6 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(NOTE7(t, lt), 'translate(540 960) rotate(-3) scale(2.1)'), '#e8dcc0');
  q(245, 249, { z0: 1.0, z1: 2.0, shk: 1 }, (t, lt, Pf) => BG(Pf, t, '#0a0414') + F(t, Object.assign({ eye: 1.2, brow: 0.4, pal: 0.4 }, MA), 540, 1020, 3.0), 0);
  q(249, 255, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(ID7(t, {}), `translate(${f1(lp(700, 420, ez(lt / 2)))} 700) rotate(-8) scale(1.5)`) + G(PORTRAIT7(t, 0, 0, 1, 0), 'translate(780 1250) rotate(6) scale(0.8)') + G(F(t, Object.assign({ eye: 0.8, brow: 0.5, pal: 0.2 }, IR), 0, 0, 1), 'translate(280 1480) scale(0.6)'), 0);
  q(255, 258, { z0: 1.0, z1: 1.5, shk: 5 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(ID7(t, { st: 1 }), 'translate(540 760) rotate(-8) scale(1.9)') + G(CERT7(t, { st: 1 }), 'translate(560 1340) rotate(6) scale(0.8)'), RED);
  q(258, 265, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + [0, 1, 2, 3].map(i => G(R(-60, -40, 120, 80, ['#c8a050', '#2a5a9a', '#a01828', '#1f7a7a'][i], 'rx="10" stroke="#0a0710" stroke-width="5"'), `translate(${f1(200 + i * 220)} ${f1(1000 + 120 * Math.sin(t * 2 + i) + 420 * ez((lt - 1) / 4))}) rotate(${f1(12 * Math.sin(t + i))}) scale(2)`)).join('') + F(t, Object.assign({ eye: 1.1, brow: 0.5, pal: 0.2 }, IR), 540, 960, 0.8), 0);
  /* ---- silêncio + revelação ---- */
  q(265, 272, { z0: 1.0, z1: 1.4, shk: 1, g: { petals: 10 } }, (t, lt, Pf) => BG(Pf, t, '#06020c') + F(t, Object.assign({ eye: 1.1, brow: 0.9, pal: 0.5, trem: 0.4 }, MA), 540, 1020, 2.7), 0);
  q(272, 278, { z0: 1.0, z1: 1.7, shk: 3 }, (t, lt, Pf) => GROUND7(Pf, t, 880, {}) + CROWD7(t, 1360, 5, 2) + F(t, Object.assign({ eye: 0.8, brow: 0.2 }, IR), 540, 980, 3.1 * (0.85 + 0.08 * ez(lt / 2))), '#ffffff');
  q(278, 283, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + G(POSTER7(t), `translate(540 960) rotate(${f1(3 - lt * 0.6)}) scale(2.3)`), '#e8dcc0');
  q(283, 291, { z0: 1.0, z1: 1.5, r0: -3, r1: 3, shk: 4 }, (t, lt, Pf) => BG(Pf, t, '#2a1240') + F(t, Object.assign({ eye: 1.2, brow: 0.7, lookx: lp(-0.8, 1, ez(lt / 2)), looky: -0.4 * ez(lt / 1.5) }, MA), 540, 1020, 2.7), 0);
  q(291, 296, { z0: 1.0, z1: 1.6, shk: 5 }, (t, lt, Pf) => PARK7(Pf, t, {}) + CAR7(Pf, t, 760, 1260, 1.7, {}) + BROB(t, lp(300, 560, ez(lt / 2.5)), 1280, 0.7, 0), WARM);
  q(296, 300, { z0: 1.0, z1: 1.9, x0: 540, x1: 640, shk: 4 }, (t, lt, Pf) => PARK7(Pf, t, {}) + CAR7(Pf, t, 540, 1320, 2.3, { door: 1 }) + P('M500,1130 Q570,1090 640,1130 L650,1230 L500,1230Z', '#1a1030', OP(0.9)), RED);
  q(300, 306, { z0: 1.0, z1: 1.35, x0: 540, x1: 540, y0: 900, y1: 840, shk: 2 }, (t, lt, Pf) => TOPFUN(Pf, t, {}) + R(-400, -400, 1880, 2720, '#000', OP(0.15)), 0);
  q(306, 309, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => PARK7(Pf, t, {}) + CAR7(Pf, t, lp(540, 1250, ez(lt / 2.5)), 1320, lp(2.3, 1.6, ez(lt / 2.5)), { lights: 1 }), RED);
  q(309, null, { z0: 1.0, z1: 1.8, x0: 540, x1: 540, y0: 1100, y1: 900, shk: 2, g: { petals: 30 } }, (t, lt, Pf) => BG(Pf, t, '#1a0c2a') + COFF7(Pf, t, 540, 1150, 2.1, {}) + PORTRAIT7(t, 540, 720, 1.0, 0) + F(t, Object.assign({ eye: 0.6, brow: 0.9, cry: 1, tears: 1 }, MA), 540, 1520, 1.3), RED);
}
