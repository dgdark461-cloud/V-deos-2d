function partX(c) {
  const q = QF(c), W = i => c.WORDS[i].start, YL = '#ffd36a', RDD = '#e8453c', BLU = '#4cb8e6', PK = '#ff7aa8';
  const dl = (a, b) => W(a) - W(b);
  const RAYS = (t, x, y, col, n = 14) => { let s = ''; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + t * 0.2; s += P(`M${f1(x)},${f1(y)} L${f1(x + Math.cos(a - 0.08) * 1400)},${f1(y + Math.sin(a - 0.08) * 1400)} L${f1(x + Math.cos(a + 0.08) * 1400)},${f1(y + Math.sin(a + 0.08) * 1400)}Z`, col, OP(0.35)); } return s; };
  const SPLASH = (t, x, y, n = 8) => { let s = ''; for (let i = 0; i < n; i++) { const u = (t * 2.2 + hz(i, 1)) % 1, a = -0.4 - hz(i, 2) * 2.3; s += C(x + Math.cos(a) * u * 220, y + Math.sin(a) * u * 260 + u * u * 200, 14 * (1 - u) + 4, '#bfeaff', OP(1 - u * 0.6)); } return s; };
  /* 1 */
  q(0, 10, { z0: 1, z1: 1, shk: 0.4 }, (t, lt, Pf, d) => { const u = ez(lt / d), g = ez(lt / 3.5); const LY = [{ d: 0.05, svg: PBX('#fff4e0', '#ffe0b0', Pf) }, { d: 0.55, svg: MEMCL(540, 470, 1.2, t, { grow: g }) + SPARK(t, 540, 470, 14, 420, '#fff0b0') }, { d: 0.85, svg: RFN(t, { eye: 1.1, sm: 0.5, lx: Math.sin(t * 1.5) * 0.6, ly: -0.4, rim: '#fff0c8' }, 540, 1210 + Math.sin(t * 2) * 5, 2.5) }]; return PAR(srt(LY), { x: lp(-40, 40, u), dz: 0.22 * u }); }, '#ffd08a');
  /* 2 */
  q(10, 20, { z0: 1, z1: 1.1, shk: 0.8 }, (t, lt, Pf, d) => PBX('#fff0d0', '#ffd890', Pf) + RAYS(t, 540, 1000, '#ffe8a8') + RFN(t, { eye: 1.2, raise: 0.9, open: 0.4, worry: 0.3, trem: 0.3 }, 540, 1180, 2.7) + TXE('TENHO CERTEZA!', 540, 380, 130, lt - 0.6, RDD, { stroke: '#fff' }) + SPARK(t, 540, 700, 8, 520, '#fff'), RDD);
  /* 3 */
  q(20, 30, { z0: 1, z1: 1, shk: 0.4 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = [{ d: 0.05, svg: PBX('#ffe8f0', '#ffc8d8', Pf) }]; [[250, 520, -8, 0], [800, 700, 7, 1.2], [420, 1000, 4, 2.4]].forEach((p, i) => LY.push({ d: 0.45 + i * 0.12, svg: POL(p[0], p[1] + Math.sin(t * 1.6 + i) * 14, 0.5 + i * 0.05, p[2], G(MEMS(t, { grow: 1 }), 'translate(0 40) scale(0.73)') + R(0, 0, 440, 440, '#fff', OP(ez((lt - p[3]) / 0.4) > 0.5 ? 0 : 0.7))) })); LY.push({ d: 0.9, svg: RFN(t, { eye: 0.15, sm: 0.9, tilt: -4 }, 540, 1580, 1.8) + [0, 1, 2, 3].map(i => HEART(180 + i * 240, 1100 - ((t * 120 + i * 80) % 400), 0.5, 0, PK)).join('') }); return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.15 * u }); }, 0);
  /* 4 */
  q(30, 35, { z0: 1, z1: 1.1, shk: 0.5 }, (t, lt, Pf, d) => { const g = ez(lt / d); return PBX('#e8e0f8', '#c8b8ee', Pf) + MEMCL(540, 480, 1.2, t, { ghost: g * 0.85 }) + RFN(t, { eye: 1, worry: 0.7, lx: 0.5, ly: -0.5 }, 540, 1250, 2.4) + QMK(540, 520, 360, t, '#6a7ae8') .replace('<g', '<g'); }, 0);
  /* 5 */
  q(35, 41, { z0: 1, z1: 1.08, shk: 0.4 }, (t, lt, Pf, d) => PBX('#e8f6ff', '#bfe4f8', Pf) + SHD(540, 1720, 220) + RFB({ view: 'f', t, walk: 1, ph: t * 4, sm: 0.6 }, 540, 1700, 1.55) + TXE('RAFAEL', 540, 420, 250, lt - dl(41, 35), '#1f9d8f', { stroke: '#fff' }), 0);
  /* 6 */
  q(41, 54, { z0: 1, z1: 1, shk: 0.4 }, (t, lt, Pf, d) => { const u = ez(lt / d), px = lp(-80, 640, u), ph = px * 0.045; const LY = BEACHL(Pf, t); LY.push({ d: 0.7, svg: UMB(180, 1250, 0.9, -6) }, { d: 0.95, svg: SHD(px + 100, 1730, 200) + SHD(px + 380, 1730, 200) + SHD(px + 640, 1730, 120) + RAFKB({ view: 's', t, walk: 1, ph: ph + 1, sm: 0.8 }, px + 640, 1710, 1.15) + PAIB({ view: 's', t, walk: 1, ph, sm: 0.8 }, px + 100, 1710, 1.1) + MAEB({ view: 's', t, walk: 1, ph: ph + 0.5, sm: 0.8 }, px + 380, 1710, 1.1) }); return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.1 }); }, 0);
  /* 7 */
  q(54, 62, { z0: 1, z1: 1.1, shk: 0.5 }, (t, lt, Pf, d) => { const k = ez(lt / 0.5); return PBX('#fff6d8', '#ffe590', Pf) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => C(hz(i, 1) * 1000 + 40, ((t * 160 + hz(i, 2) * 1900) % 2000) - 40, 16, ['#ff7aa8', '#4cb8e6', '#ffd23a', '#5ac05a'][i % 4], OP(0.85))).join('') + RAFK(t, { eye: 1.1, sm: 1, raise: 0.4 }, 540, 1250, 2.5) + G(C(0, 0, 150, '#ffd23a', `stroke="${IKX}" stroke-width="10"`) + TXE('5', 0, 80, 230, 9, IKX, { stroke: '#fff' }), `translate(840 470) rotate(8) scale(${f1(k)})`); }, YL);
  /* 8 */
  q(62, 72, { z0: 1, z1: 1, shk: 0.4 }, (t, lt, Pf, d) => { const u = ez(lt / d), fl = Math.pow(Math.max(0, Math.sin(lt * 2.6)), 10); const LY = BEACHL(Pf, t); LY.push({ d: 0.78, svg: CAST(540, 1560, 1.5, ez(lt / (d * 0.8))) }, { d: 0.95, svg: SHD(240, 1740, 190) + RAFKB({ view: 'f', t, sm: 1, up: lt > d * 0.6 }, 240, 1730, 1.3) + SHD(860, 1740, 220) + PAIB({ view: 'f', t, sm: 0.6 }, 860, 1730, 1.1) + CAMR(860, 1090, 0.95, fl) }); return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.12 * u }); }, 0);
  /* 9 */
  q(72, 78, { z0: 1, z1: 1.06, shk: 0.9 }, (t, lt, Pf, d) => { const k = ez(lt / d); return FLAT(BEACHL(Pf, t)) + WVB(t, k * 0.8) + SHD(250, 1780, 190) + RAFKB({ view: 'f', t, worry: 0.8, open: 0.4, trem: 0.4 }, 250, 1770, 1.15) + CAST(740, 1660, 0.9, 1); }, BLU);
  /* 10 */
  q(78, 83, { z0: 1, z1: 1.08, shk: 1.3 }, (t, lt, Pf, d) => { const u = ez(lt / d), bx = lp(560, 900, u), by = lp(1650, 1100, u) + Math.sin(t * 6) * 16; const LY = [{ d: 0.05, svg: FLAT(BEACHL(Pf, t)) }, { d: 0.5, svg: WVB(t, 0.9 - 0.3 * u) }, { d: 0.9, svg: BUCK(bx, by, 1.4, t * 200) + SPLASH(t, bx, by + 100, 10) }]; return PAR(srt(LY), { dz: 0.1 * u }); }, BLU);
  /* 11 */
  q(83, 88, { z0: 1, z1: 1.12, shk: 0.8 }, (t, lt, Pf, d) => PBX('#dce8f8', '#b0c8e8', Pf) + RAFK(t, { eye: 1, cry: 1, worry: 1, open: 0.6, trem: 0.3 }, 540, 1200, 2.7), 0);
  /* 12 */
  q(88, 98, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d), px = lp(60, 640, ez(lt / (d * 0.7))), ph = px * 0.045 + t * 2, bk = u < 0.7 ? [900, 1620 + Math.sin(t * 5) * 14] : [px + 250, 1500 - ez((u - 0.7) / 0.3) * 90]; return FLAT(BEACHL(Pf, t)) + WVB(t, 0.18) + SHD(px, 1780, 230) + PAIB({ view: 's', t, walk: u < 0.7 ? 1 : 0, ph, lean: 8, worry: 0.3, open: 0.4 }, px, 1760, 1.2) + BUCK(bk[0], bk[1], 1.1, Math.sin(t * 5) * 8) + SPLASH(t, px + 40, 1740, 8); }, 0);
  /* 13 */
  q(98, 103, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const u = ez(lt / d); const LY = BEACHL(Pf, t); LY.push({ d: 0.8, svg: PAI(t, { eye: 1, sm: 1, tilt: -4, rim: '#fff0c8' }, 430, 1060, 2.5) }, { d: 0.95, svg: RAFK(t, { eye: 0.5, sm: 0.8, tilt: 6 }, 840, 1560, 1.7) + BUCK(900, 1800, 0.9, -10) + [0, 1, 2].map(i => HEART(160 + i * 110, 560 - ((t * 90 + i * 70) % 260), 0.4, 0, PK)).join('') }); return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.2 * u }); }, '#ffd08a');
  /* 14 */
  q(103, 112, { z0: 1, z1: 1.08, shk: 0.4 }, (t, lt, Pf, d) => { const p = 1 + 0.04 * Math.sin(t * 5); return PBX('#fff0c0', '#ffd870', Pf) + RAYS(t, 540, 520, '#ffe8a0', 12) + MEMCL(540, 500, 1.25 * p, t, { grow: 1 }) + SPARK(t, 540, 500, 16, 460, '#fff') + RFN(t, { eye: 0.12, sm: 0.9, tilt: 3 }, 540, 1330, 2.3); }, YL);
  /* 15 */
  q(112, 116, { z0: 1, z1: 1.08, shk: 0.4 }, (t, lt, Pf, d) => { let sc = ''; for (let i = 0; i < 3; i++) { const x = 300 + i * 240; sc += P(`M${x},1000 Q${x + 50 * Math.sin(t * 3 + i)},850 ${x},700 Q${x - 50 * Math.sin(t * 3 + i)},550 ${x},400`, 'none', `stroke="#8ad0e8" stroke-width="16" stroke-linecap="round" opacity="0.7"`); } return PBX('#dff4ff', '#bfe4f8', Pf) + sc + RFN(t, { eye: 0.1, sm: 0.8, tilt: -4, ly: -0.5 }, 540, 1350, 2.3) + TXE('CHEIRO DE MAR', 540, 300, 110, lt - 0.2, '#1a7aa8', { stroke: '#fff' }); }, 0);
  /* 16 */
  q(116, 120, { z0: 1, z1: 1.1, shk: 0.8 }, (t, lt, Pf, d) => PBX('#d8f0ff', '#a8d8f8', Pf) + RING(t, 540, 960, '#3aa8d8', 4, 760, 14) + WVB(t, 0.0).replace(/./, m => m) + RFN(t, { eye: 0.15, sm: 0.5, tilt: 8 }, 540, 1400, 2.1) + TXE('SHHHH...', 540, 560, 220, lt - 0.1, '#1a7aa8', { stroke: '#fff', rot: -4 }), 0);
  /* 17 */
  q(120, 126, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const u = ez(lt / d), cols = ['#e8453c', '#ffd23a', '#4cb8e6', '#5ac05a', '#ff7aa8'], k = Math.floor(lt * 2.4) % 5; const LY = [{ d: 0.05, svg: PBX('#fff8e0', '#ffe8a0', Pf) + RAYS(t, 540, 900, '#fff0b0', 16) }, { d: 0.9, svg: UMB(540, 900, 2.1, Math.sin(t * 2) * 6, cols[k], '#fffdf4') + SPARK(t, 540, 700, 12, 560, '#fff') }]; return PAR(srt(LY), { dz: 0.15 * u }); }, YL);
  /* 18 */
  q(126, 133, { z0: 1, z1: 1, shk: 0.4 }, (t, lt, Pf, d) => { const u = ez(lt / d), bs = (s, i, x, y, sc, o) => ({ d: 0.6, svg: s(t + i, o, x, y, sc) }); const LY = LUNCHL(Pf, t); LY.push(bs(PAI, 0, 170, 1120, 1.0, { sm: 0.6 }), bs(MAE, 1, 410, 1120, 1.0, { sm: 0.6 }), bs(IRM, 2, 650, 1120, 1.0, { sm: 0.6 }), bs(RFN, 3, 900, 1120, 1.0, { sm: 0.7 })); LY.push({ d: 1.0, svg: TXE('ANOS DEPOIS', 540, 360, 190, lt - 0.2, '#7a3a22', { stroke: '#fff' }) }); return PAR(srt(LY), { x: lp(-30, 30, u), dz: 0.1 * u }); }, 0);
  /* 19 */
  q(133, 138, { z0: 1, z1: 1.08, shk: 0.4 }, (t, lt, Pf, d) => FLAT(LUNCHL(Pf, t)) + RFN(t, { eye: 1, open: 0.35 + 0.3 * Math.sin(t * 14), sm: 0.4, lx: 0.4 }, 330, 1220, 2.1) + SPB(700, 520, 1.0, 'LEMBRO DA PRAIA!', 100, -1), 0);
  /* 20 */
  q(138, 145, { z0: 1, z1: 1.12, shk: 0.3 }, (t, lt, Pf, d) => FLAT(LUNCHL(Pf, t)) + MAE(t, { eye: 1.15, lx: 0.3, sm: 0 }, 540, 1150, 2.7) + TXE('...', 540, 330, 220, lt - 0.4, '#7a3a22', { stroke: '#fff' }), 0);
  /* 21 */
  q(145, 150, { z0: 1, z1: 1.1, shk: 0.5 }, (t, lt, Pf, d) => FLAT(LUNCHL(Pf, t)) + MAE(t, { eye: 1.1, worry: 0.7, raise: 0.6, tilt: 8, ly: -0.3 }, 540, 1150, 2.7) + QMK(820, 460, 380, t, '#9a6ad8'), 0);
  /* 22 */
  q(150, 158, { z0: 1, z1: 1.06, shk: 0.4 }, (t, lt, Pf, d) => FLAT(LUNCHL(Pf, t)) + MAE(t, { eye: 1, open: 0.35 + 0.3 * Math.sin(t * 13), worry: 0.3, raise: 0.4, tilt: -3 }, 360, 1250, 2.2) + RFN(t, { eye: 1.1, worry: 0.6, lx: -0.5 }, 880, 1550, 1.4) + SPB(640, 470, 1.0, 'DE QUE VIAGEM?', 100, -1), 0);
  /* 23 */
  q(158, 171, { z0: 1, z1: 1.06, shk: 0.4 }, (t, lt, Pf, d) => { const sp = lt < d - 0.1 ? 0.35 + 0.3 * Math.sin(t * 13) : 0; return FLAT(LUNCHL(Pf, t)) + RFN(t, { eye: 1, open: sp, sm: 0.4, lx: 0.4, tilt: 3 }, 320, 1300, 2.2) + MEMCL(690, 520, 1.15, t, { grow: 1 }) + BUCK(740, 650, 0.6, -10); }, 0);
}
