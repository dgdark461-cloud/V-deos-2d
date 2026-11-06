function partX(c) {
  const q = QF(c), IN = '#2a2230', YL = '#ffd36a', RDD = '#ff4a5a', GN = '#4cc24c', BLU = '#6a7ae8', PK = '#ff7f9a';
  const PBD = (a, b, Pf, t) => BIG(a) + C(180, 300, 520, b, OP(0.55)) + C(940, 1500, 640, b, OP(0.45)) + glow(Pf, 'F', 540, 700, 800, 0.3);
  const NOTES = (t, x, y) => [0, 1, 2].map(i => { const k = ((t * 0.7 + i / 3) % 1); return TXE(['♪', '♫', '♪'][i], x + (i - 1) * 70 + Math.sin(t * 3 + i) * 20, y - k * 300, 100, 9, '#6a7ae8', { stroke: IN, a: 1 - k }); }).join('');
  const SPD = (t, n = 9, col = '#fff') => { let s = ''; for (let i = 0; i < n; i++) { const y = 300 + hz(i, 3) * 1300, x = ((t * 1400 + hz(i, 4) * 1500) % 1700) - 300; s += R(x, y, 260 + hz(i, 5) * 200, 8, col, OP(0.55)); } return s; };
  const GRD = (t, sp) => R(-100, 1500, 1280, 500, '#e8c8a0') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(((i * 260 - t * sp) % 2080 + 2080) % 2080 - 300, 1500, 8, 500, '#c8a878')).join('');
  /* 1 */
  q(0, 5, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = STN(Pf, t); LY.push({ d: 0.8, svg: DAV(t, { eye: 1, sm: 0.4, lx: 0.1 + Math.sin(t * 2) * 0.1 }, 540, 1020 + Math.sin(t * 6) * 6, 2.7) }); return PAR(srt(LY), { x: lp(-60, 60, u), dz: lp(0, 0.28, u) }); }, '#ffd08a');
  /* 2 */
  q(5, 10, { z0: 1, z1: 1.1, shk: 1.2 }, (t, lt, Pf, d) => { let s = BIG('#ffb870') + R(-100, 0, 1280, 1500, '#ff9a5a', OP(0.5)) + GRD(t, 900); for (let i = 0; i < 2; i++) { const ph = t * 11 + i * Math.PI, dx = Math.sin(ph) * 190, lift = Math.max(0, -Math.cos(ph)) * 110; s += R(430 + i * 220 + dx * 0.4 - 70, 0, 140, 1380 - lift, '#3a3f5a', 'rx="20"') + P(`M${f1(330 + i * 220 + dx)},${f1(1450 - lift)} Q${f1(420 + i * 220 + dx)},${f1(1290 - lift)} ${f1(560 + i * 220 + dx)},${f1(1350 - lift)} L${f1(600 + i * 220 + dx)},${f1(1480 - lift)}Z`, '#f4efe6', `stroke="${IN}" stroke-width="8" stroke-linejoin="round"`); } return s + SPD(t, 8); }, 0);
  /* 3 */
  q(10, 14, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = STN(Pf, t); LY.push({ d: 0.7, svg: G(RUIB({ view: 'f', t, walk: 1, ph: t * 3, arms: 'swing' }, 0, 0, 1), 'translate(540 1380) scale(0.3)', OP(0.55)) }, { d: 0.9, svg: E(540, 1720, 260, 60, '#3a1a4a', OP(0.3)) + P('M440,1720 L-200,1740 L-200,1780 L460,1750Z', '#3a1a4a', OP(0.2)) + DAVB({ view: 'b', t, walk: 1, ph: t * 3, arms: 'swing' }, 540, 1700, 1.5) }); return PAR(srt(LY), { x: lp(-50, 50, u), dz: 0.2 * u }); }, 0);
  /* 4 */
  q(14, 20, { z0: 1, z1: 1.06, shk: 0.5 }, (t, lt, Pf, d) => { const px = lp(200, 800, ez(lt / d)); return FLAT(STN(Pf, t)) + SHAD(px, 1750, 200) + DAVB({ view: 's', t, walk: 1, ph: px * 0.04, arms: 'swing', sm: 0.5 }, px, 1740, 1.4) + THINK(540, 520, 1.1, TXE('♪', -140, 30, 130, lt - 0.4, '#6a7ae8', { stroke: IN }) + C(20, 0, 62, '#ffd84a', `stroke="${IN}" stroke-width="6"` + OP(ez((lt - 1.4) / 0.3))) + P('M120,60 L180,-40 L240,60Z', '#ff9a4a', `stroke="${IN}" stroke-width="6"` + OP(ez((lt - 2.4) / 0.3))), t); }, 0);
  /* 5 */
  q(20, 28, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = [{ d: 0.05, svg: PBD('#ffd9b0', '#ffb070', Pf, t) }, { d: 0.8, svg: DAV(t, { eye: 1.1, lx: -0.8, raise: 0.6, tilt: -5 }, 540, 1000, 3.2) }, { d: 1.25, svg: [0, 1, 2, 3].map(i => TXE('TOC', 860 - i * 60, 520 + i * 260, 90 + i * 30, lt - 0.8 - i * 0.7, RDD, { stroke: IN })).join('') + RING(t, 1060, 1000, '#ff9a4a', 3, 700, 8) }]; return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.18 * u }); }, '#ffd08a');
  /* 6 */
  q(28, 32, { z0: 1, z1: 1.15, shk: 0.5 }, (t, lt, Pf, d) => PBD('#ffe8c8', '#ffc890', Pf, t) + DAV(t, { eye: 0.8, sm: 1, tilt: 4 }, 540, 1000, 3.0) + NOTES(t, 540, 400), 0);
  /* 7 */
  q(32, 40, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const u = ez(lt / d), sec = 3 + Math.floor(lt); const LY = STN(Pf, t); LY.push({ d: 0.9, svg: RUIB({ view: 's', t, walk: 1, ph: t * 3, arms: 'swing' }, 200, 1740, 1.3) + DAVB({ view: 's', t, walk: 1, ph: t * 3 + 0.2, arms: 'swing', worry: 0.3 }, 760, 1740, 1.3) + TXE(sec + 's', 540, 420, 220, lt - 0.1, '#fff', { stroke: IN }) }); return PAR(srt(LY), { x: lp(-60, 60, u), dz: 0.12 }); }, 0);
  /* 8 */
  q(40, 43, { z0: 1, z1: 1.1, shk: 1.2 }, (t, lt, Pf, d) => PBD('#ffd0a0', '#ff9a70', Pf, t) + DAV(t, { eye: 1.2, lx: -0.9, worry: 0.6, raise: 0.5 }, 540, 1000, 3.0) + [0, 1, 2].map(i => TXE('TOC', 860, 520 + i * 260, 110 + i * 60, lt - i * 0.35, RDD, { stroke: IN })).join(''), RDD);
  /* 9 */
  q(43, 47, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = STN(Pf, t); LY.push({ d: 0.9, svg: SHAD(540, 1760, 220) + DAVB({ view: 's', t, walk: 1, ph: t * 5, arms: 'swing', lean: 8, worry: 0.4 }, 540, 1740, 1.5) + SPD(t, 6) }); return PAR(srt(LY), { x: lp(-90, 90, u), dz: 0.1 }); }, 0);
  /* 10 */
  q(47, 50, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const px = lp(100, 600, ez(lt / d)); return FLAT(STN(Pf, t)) + DAVB({ view: 's', t, walk: 1, ph: t * 5, arms: 'swing' }, 860, 1500, 0.8) + SHAD(px, 1770, 230) + RUIB({ view: 's', t, walk: 1, ph: t * 5, arms: 'swing', lean: 8 }, px, 1760, 1.5) + SPD(t, 5); }, 0);
  /* 11 */
  q(50, 55, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d), px = lp(100, 960, u), cx = ((t * 700) % 2200) - 500; const LY = STN(Pf, t); LY.push({ d: 0.6, svg: G(R(-160, -110, 320, 110, '#ff5a5a', `rx="30" stroke="${IN}" stroke-width="7"`) + R(-110, -190, 190, 90, '#ffd0d0', `rx="26" stroke="${IN}" stroke-width="7"`) + C(-90, 0, 40, '#2a2230') + C(90, 0, 40, '#2a2230'), `translate(${f1(cx)} 1400)`) }, { d: 0.9, svg: [0, 1, 2, 3, 4, 5].map(i => R(i * 200 - 60, 1560, 120, 340, '#fff', OP(0.85))).join('') + SHAD(px, 1780, 200) + DAVB({ view: 's', t, walk: 1, ph: px * 0.045, arms: 'swing', worry: 0.4 }, px, 1760, 1.35) }); return PAR(srt(LY), { dz: 0.1 }); }, 0);
  /* 12 */
  q(55, 60, { z0: 1, z1: 1.15, shk: 0.5 }, (t, lt, Pf, d) => { const sl = ez((lt - 0.6) / 0.6); return PBD('#ffe0c0', '#ffb890', Pf, t) + EYEX(540, 960, 1.5, lp(0, -120, sl)) + (sl > 0.5 ? G(RUIB({ view: 'f', t, arms: 'swing' }, 0, 0, 1), 'translate(90 1500) scale(0.5)', OP(0.45)) : ''); }, 0);
  /* 13 */
  q(60, 67, { z0: 1, z1: 1, shk: 1.5 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = STN(Pf, t); LY.push({ d: 0.9, svg: SHAD(540, 1770, 230) + DAVB({ view: 's', t, walk: 1, ph: t * 7, arms: 'swing', lean: 14, worry: 0.9, sweat: 1 }, 540, 1750, 1.55) + SPD(t, 10) }); return PAR(srt(LY), { x: lp(-100, 100, u), dz: 0.15 }); }, 0);
  /* 14 */
  q(67, 72, { z0: 1, z1: 1.12, shk: 0.5 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcca0', Pf, t) + RUI(t, { eye: 0.9, sm: 0.4, tilt: -3 }, 540, 1000, 3.0), 0);
  /* 15 */
  q(72, 80, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const u = ez(lt / d), px = lp(120, 640, ez(lt / (d - 1))); const LY = STN(Pf, t, { fg: 0 }); LY.push({ d: 0.6, svg: HOUSEW(Pf, 800, 1200, 1.5, t, 1) }, { d: 0.9, svg: SHAD(px, 1780, 220) + RUIB({ view: 's', t, walk: lt < d - 1 ? 1 : 0, ph: px * 0.04, arms: 'swing', sm: 0.6 }, px, 1760, 1.3) }); return PAR(srt(LY), { x: lp(-60, 60, u), dz: 0.15 * u }); }, 0);
  /* 16 */
  q(80, 89, { z0: 1, z1: 1.08, shk: 1.5 }, (t, lt, Pf, d) => { const bt = Math.max(0, Math.sin(t * 10)); let bolt = ''; for (let i = 0; i < 5; i++) { const a = i * 1.26 + t * 2; bolt += P('M0,0 L40,-70 L10,-70 L50,-150 L-40,-50 L-5,-50Z', YL, `stroke="${IN}" stroke-width="5"` + OP(0.9)).replace('<path', `<path transform="translate(${f1(540 + Math.cos(a) * 420)} ${f1(900 + Math.sin(a) * 520)}) rotate(${f1(a * 40)})"`); } return PBD('#ffd0c0', '#ff9a80', Pf, t) + bolt + DAV(t, { eye: 1.2, worry: 0.8, sweat: 1, trem: 0.6 }, 540, 880, 2.8) + HEART(540, 1560, 2.0, bt, RDD); }, RDD);
  /* 17 */
  q(89, 98, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d), fl = 0.5 + 0.5 * Math.sin(t * 10); const LY = [{ d: 0.05, svg: PBD('#ffe0d0', '#ffa080', Pf, t) + R(0, 0, 1080, 1920, RDD, OP(0.08 * fl)) }, { d: 0.5, svg: SIL(540, 1150, 2.6, '#2a1a3a', '#ffd08a') }, { d: 1.1, svg: WARN(540, 760, 1.5 + 0.1 * fl, ez(lt / 0.3)) }]; return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.2 * u }); }, RDD);
  /* 18 */
  q(98, 106, { z0: 1, z1: 1.1, shk: 0.6 }, (t, lt, Pf, d) => { const x = ez((lt - 2.2) / 0.3); return PBD('#e8e0ff', '#c8b8ff', Pf, t) + BRAIN(540, 1000, 2.6, t, { lx: Math.sin(t * 3) * 6 }) + TXE('100% CERTEZA?', 540, 380, 110, lt - 0.3, '#2a2230', {}) + (x > 0 ? L(100, 340, 980, 340, RDD, 22 * x) + L(100, 440, 980, 380 - 0, RDD, 0) : ''); }, 0);
  /* 19 */
  q(106, 116, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d), a = t * 4; const LY = [{ d: 0.05, svg: PBD('#ffe0e0', '#ffb0b0', Pf, t) }, { d: 0.6, svg: BRAIN(540, 1080, 2.4, t, { sweat: 1 }) }, { d: 1.0, svg: G(R(-70, -40, 140, 60, '#9a9aa6', `rx="12" stroke="${IN}" stroke-width="7"`) + P('M-60,-40 Q0,-150 60,-40Z', RDD, `stroke="${IN}" stroke-width="7"`) + glow(Pf, 'R', 0, -80, 380, 0.8) + P(`M0,-80 L${f1(Math.cos(a) * 500)},${f1(-80 + Math.sin(a) * 500)} L${f1(Math.cos(a + 0.4) * 500)},${f1(-80 + Math.sin(a + 0.4) * 500)}Z`, '#ff8a8a', OP(0.35)), 'translate(540 640) scale(1.6)') }]; return PAR(srt(LY), { dz: 0.2 * u }); }, RDD);
  /* 20 */
  q(116, 124, { z0: 1, z1: 1.1, shk: 0.8 }, (t, lt, Pf, d) => { const k = ez(lt / d); return FLAT(STN(Pf, t)) + G(SIL(0, 0, 1, '#2a1a3a', '#ffd08a'), `translate(540 ${f1(lp(1000, 900, k))}) scale(${f1(lp(1.0, 3.6, k))})`, OP(0.9)) + SHAD(540, 1800, 220) + DAVB({ view: 'b', t, walk: 1, ph: t * 4, arms: 'swing' }, 540, 1790, 1.5); }, 0);
  /* 21 */
  q(124, 131, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = [{ d: 0.05, svg: PBD('#e8e0f8', '#c0b0e8', Pf, t) }, { d: 0.7, svg: SIL(540, 1250, 3.0, '#2a1a3a', '#ffd08a') }, { d: 1.1, svg: TXE('?', 540, 980, 420, lt - 0.3, '#fff', { stroke: IN }) }]; return PAR(srt(LY), { x: lp(-40, 40, u), dz: 0.2 * u }); }, 0);
  /* 22 */
  q(131, 138, { z0: 1, z1: 1.08, shk: 0.6 }, (t, lt, Pf, d) => PBD('#f0f0ff', '#d0d0f0', Pf, t) + SCALEJ(540, 1100, 1.6, 12 * Math.sin(t * 2.4)) + TXE('INTENÇÃO?', 540, 360, 150, lt - 0.2, '#2a2230', {}), 0);
  /* 23 */
  q(138, 146, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const u = ez(lt / d), jp = Math.floor(lt * 2.2) % 3; const LY = [{ d: 0.05, svg: PBD('#ffe0c0', '#ffc090', Pf, t) }, { d: 0.5, svg: R(520, 480, 500, 1000, '#bfe4f4', `stroke="${IN}" stroke-width="10"`) + G(SIL(0, 0, 1.0, '#2a1a3a', '#6a7ae8'), `translate(${[700, 880, 780][jp]} 1200)`, OP(0.7)) + R(520, 480, 500, 1000, '#fff', OP(0.14)) }, { d: 0.9, svg: DAV(t, { eye: 1.1, worry: 0.6, lx: 0.8, tilt: 6 }, 290, 1250, 2.4) }]; return PAR(srt(LY), { x: lp(-40, 40, u), dz: 0.18 * u }); }, 0);
  /* 24 */
  q(146, 156, { z0: 1, z1: 1.1, shk: 0.6 }, (t, lt, Pf, d) => PBD('#fff0d8', '#ffd8a0', Pf, t) + PUZZ(540, 960, 2.0, ez(lt / 7), t) + TXE('FALTA INFORMAÇÃO', 540, 340, 100, lt - 0.2, '#2a2230', {}), 0);
  /* 25 */
  q(156, 166, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = [{ d: 0.05, svg: PBD('#d8f0e0', '#a8e0c0', Pf, t) }, { d: 0.6, svg: RADAR(540, 960, 2.0, t, [[120, -80], [-160, 140], [60, 200]]) }, { d: 1.15, svg: BRAIN(130, 1720, 0.9, t, { sweat: 1 }) + TXE('ALERTA', 540, 1620, 110, lt - 1.0, RDD, { stroke: '#fff' }) }]; return PAR(srt(LY), { dz: 0.2 * u }); }, 0);
  /* 26 */
  q(166, 178, { z0: 1, z1: 1.1, shk: 0.6 }, (t, lt, Pf, d) => { const mx = 540 + 150 * Math.sin(lt * 0.9), my = 900 + 90 * Math.cos(lt * 1.3); return PBD('#ffe8d0', '#ffcc98', Pf, t) + RUI(t, { eye: 1, sm: 0.2 }, 540, 1000, 2.8) + TGT(540, 760, 520, 560, RDD, t) + TGT(mx, my, 300, 300, '#4aff9a', t) + C(mx, my, 190, 'none', `stroke="${IN}" stroke-width="20"`) + C(mx, my, 190, 'none', `stroke="${YL}" stroke-width="8"`) + L(mx + 134, my + 134, mx + 300, my + 300, '#8a5a34', 32); }, 0);
}
