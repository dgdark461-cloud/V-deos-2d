function partY(c) {
  const q = QF(c), S = (k, cam, fn, pf, ex) => Z(q, k, cam, fn, pf, ex), RD = '#ff2f4a', BG = ZBG;
  const dogs4 = (t, pose, y = 1500, sc = 0.62) => DOGR(150, y, sc, t, { pose }) + DOGR(420, y + 40, sc, t, { pose, col: '#2a2a30', c2: '#4a4a52', ph: 1.3, dir: -1 }) + DOGR(690, y, sc, t, { pose, col: '#e8e0d0', c2: '#fff', ph: 2.1 }) + DOGR(950, y + 40, sc, t, { pose, col: '#7a4a2c', c2: '#c8a070', ph: 3.4, dir: -1 });
  const DAWN = '#ffd890';
  S(67, 'fast', (t, lt, Pf) => ZDAWN(Pf, t, { u: ez(lt / 1.7) * 0.3 }) + GALOR(540, 1500, 2.3, t) + RING(t, 640, 1260, '#fff2c0', 3, 600, 6) + SHOUT('CÓ-CÓ-RI-CÓ', 540, 520, 150, lt, '#fff', {}), '#fff2c0');
  S(68, 'up', (t, lt, Pf, d) => ZDAWN(Pf, t, { u: ez(lt / d) }) + HUDR('05:40', 60, 120), DAWN);
  S(69, 'in', (t, lt, Pf, d) => INTR(Pf, t, { lamp: 0 }) + glow(Pf, 'A', 540, 900, 1400, 0.25) + ZSC(BODR('avo', { t, walk: 1, ph: t * 5, view: 'f' }, 0, 0, 1), 540, lp(1450, 1750, lt / d), lp(0.6, 1.1, lt / d)), 0);
  S(70, 'hold', (t, lt, Pf) => BG(Pf, '#3a2a1a', '#6a4a2a') + AVOI(t, { eye: 0.8, worry: 0.7, open: 0.1 }, 540, 1040, 2.4) + [0, 1, 2, 3, 4, 5].map(i => L(300 + hz(i, 1) * 460, 760 + hz(i, 2) * 400, 340 + hz(i, 1) * 460, 780 + hz(i, 2) * 400, STRAW, 8)).join('') + [0, 1, 2, 3].map(i => E(380 + i * 90, 1000 + hz(i, 3) * 120, 28, 14, '#5a3a22', OP(0.8))).join(''), 0);
  S(71, 'l', (t, lt, Pf) => BG(Pf, '#3a2a1a', '#6a4a2a') + AVOI(t, { eye: 0.85, worry: 0.6, open: 0.25 + 0.2 * Math.sin(t * 9), tilt: -4 }, 540, 1040, 2.3), 0);
  S(72, 'in', (t, lt, Pf) => PAIOLR(Pf, t, { open: 1 }) + AVOI(t, { eye: 1, worry: 0.6, lx: -1 }, 540, 1380, 0.8), 0);
  S(73, 'hold', (t, lt, Pf) => BG(Pf, '#3a2a1a', '#6a4a2a') + AVOI(t, { eye: 0.7, worry: 1, sweat: 1, ly: 1, tilt: Math.sin(t * 14) * 2 }, 540, 1040, 2.4), 0);
  S(74, 'fast', (t, lt, Pf) => BG(Pf, '#3a2a1a', '#6a4a2a') + CAII(t, { eye: 1, worry: 0.7 }, 540, 900, 1.6) + ARMR(lp(1200, 700, ez(lt / 0.5)), 1350, 0.6, t, 0), 0);
  S(75, 'in', (t, lt, Pf) => BG(Pf, '#2a1a10', '#5a3a20') + ARMR(540, 1000, 1.0, t, 1) + [1, 2, 3, 4].map(i => SHOUT(String(i), 120 + i * 190, 400, 150, lt - i * 0.3, '#fff')).join(''), RD, { shk: 1 });
  S(76, 'dn', (t, lt, Pf) => BG(Pf, '#2a1a10', '#5a3a20') + ARMR(540, 1000, 1.0, t, 1) + ZOP(G(BCHR(0, 0, 1.2, t, { mode: 'hand' }), 'translate(540 1500) rotate(180)'), ez(lt / 0.5) * 0.9), '#e8e0d0');
  S(77, 'slam', (t, lt, Pf) => BG(Pf, '#2a0a10', '#5a1a20') + ARMR(540, 1000, 1.15, t, 1) + FLASHQ(lt, 0, 0.12, RD), RD, { shk: 3 });
  S(78, 'in', (t, lt, Pf) => BG(Pf, '#3a2a1a', '#6a4a2a') + AVOI(t, { eye: 1.3, worry: 1, sweat: 1 }, 540, 1040, 2.4) + ZSC(E(0, 0, 125, 150, '#eaf2ff', OP(0.45 * ez(lt / 0.8))), 540, 1040, 2.3), 0);
  S(79, 'in', (t, lt, Pf) => BG(Pf, '#1a0e06', '#3a2010') + glow(Pf, 'A', 540, 1000, 900, 0.4) + AVOI(t, { eye: 1.1, raise: 0.6, key: WARM }, 540, lp(1100, 1000, lt / 1.5), lp(2.2, 2.6, lt / 1.5)), 0);
  S(80, 'up', (t, lt, Pf) => PAIOLR(Pf, t, {}) + HUDR('03:00', 60, 120), 0);
  S(81, 'hold', (t, lt, Pf) => BG(Pf, '#05070f', '#16203a') + RING(t, 540, 960, '#9ad8ff', 4, 800, 6) + AVOI(t, { eye: 1.3, lx: 1, worry: 0.8 }, 540, 1060, 2.2), 0);
  S(82, 'dn', (t, lt, Pf) => BG(Pf, '#0a0604', '#1a0e08') + glow(Pf, 'A', 540, 1300, 600, 0.2) + MILHOR(540, 1500, 2.2) + RING(t, 540, 1250, '#9ad8ff', 3, 600, 5), 0);
  S(83, 'fast', (t, lt, Pf) => BG(Pf, '#0a0604', '#1a0e08') + ZOP(G(BCHR(0, 0, 1.4, t, { mode: 'hand' }), `translate(540 ${f1(lp(1700, 1250, ez(lt / 1.2)))})`), 1) + MILHOR(540, 1700, 2.4) + FLASHQ(lt, 0.9, 0.1, RD), RD, { shk: 3 });
  S(84, 'in', (t, lt, Pf) => PASTOR(Pf, t, {}) + dogs4(t, 'quiet', 1520, 0.78), 0, { gl: 0.6 });
  S(85, 'l', (t, lt, Pf) => INTR(Pf, t, { dark: 0.4 }) + R(180, 1400, 680, 120, '#7a4a3a', `stroke="${INKR}" stroke-width="8"`) + CAIF({ t, view: 'f', h: { eye: 1.1 } }, 540, 1450, 0.9) + SHOUT('QUARTO', 540, 460, 200, lt, '#fff'), 0);
  S(86, 'r', (t, lt, Pf, d) => PAIOLR(Pf, t, { open: 1 }) + CAIF({ t, walk: 1, ph: t * 8, view: 's' }, lp(100, 700, lt / d), 1750, 0.8) + SHOUT('PAIOL', 540, 460, 200, lt, BLOOD), '#fff');
  S(87, 'in', (t, lt, Pf) => ZCTA(t, lt), '#fff', { gl: 0.6 });
  S(88, 'hold', (t, lt, Pf) => BG(Pf, NT0, NT2) + AVOI(t, { eye: 0.9, worry: 0.4, lx: Math.sin(lt * 1.5) * 1, key: '#8ab4ff', tilt: 3 }, 540, 1040, 2.4) + DIMM(0.15), 0);
  S(89, 'in', (t, lt, Pf) => PAIOLR(Pf, t, { open: 1 }) + BCHR(540, 1300, 1.3, t, { mode: 'eyes' }) + DIMM(0.2), RD, { shk: 1.5 });
  S(90, 'fast', (t, lt, Pf, d) => R(-100, -100, 1280, 2200, '#000') + BCHR(540, 960, 2.2, t, { mode: 'eyes' }) + (lt > d - 0.25 ? DIMM(1, '#000') : ''), RD, { shk: 2 });
}
