function partY(c) {
  const q = QF(c), IN = '#2a2230', YL = '#ffd36a', RDD = '#ff4a5a', GN = '#4cc24c', BLU = '#6a7ae8';
  const PBD = (a, b, Pf, t) => BIG(a) + C(180, 300, 520, b, OP(0.55)) + C(940, 1500, 640, b, OP(0.45)) + glow(Pf, 'F', 540, 700, 800, 0.3);
  const SPD = (t, n = 9, col = '#fff') => { let s = ''; for (let i = 0; i < n; i++) { const y = 300 + hz(i, 3) * 1300, x = ((t * 1400 + hz(i, 4) * 1500) % 1700) - 300; s += R(x, y, 260 + hz(i, 5) * 200, 8, col, OP(0.55)); } return s; };
  /* 27 */
  q(178, 188, { z0: 1, z1: 1.1, shk: 0.5 }, (t, lt, Pf, d) => { const hi = Math.floor(lt * 0.9) % 3; const items = [[300, 700, 'SOM'], [800, 900, 'SOMBRA'], [450, 1300, 'RITMO']]; return PBD('#ffe8d0', '#ffcc98', Pf, t) + DAV(t, { eye: 1, worry: 0.5, lx: 0.6 }, 540, 1150, 2.4) + items.map((it, i) => G(R(-150, -60, 300, 120, i === hi ? RDD : '#fff', `rx="30" stroke="${IN}" stroke-width="7"`) + TXE(it[2], 0, 28, 74, 9, i === hi ? '#fff' : IN, {}), `translate(${it[0]} ${it[1] - 300 + (i === hi ? -20 : 0)})`)).join(''); }, 0);
  /* 28 */
  q(188, 196, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const k = ez(lt / d), gap = lp(520, 130, k); return FLAT(STN(Pf, t)) + SHAD(300, 1780, 200) + DAVB({ view: 's', t, walk: 1, ph: t * 4, arms: 'swing', worry: 0.5 }, 300 + 150, 1760, 1.4) + SHAD(300 - gap, 1780, 200) + RUIB({ view: 's', t, walk: 1, ph: t * 4 + 0.3, arms: 'swing' }, 150 - gap + 150, 1760, 1.4) + L(150 + 150 - gap + 80, 1250, 300 + 150 - 80, 1250, RDD, 12) + TXE('MAIS PERTO', 540, 1100, 120, lt - 0.2, RDD, { stroke: '#fff' }); }, 0);
  /* 29 */
  q(196, 202, { z0: 1, z1: 1.12, shk: 1.2 }, (t, lt, Pf, d) => PBD('#ffd8d0', '#ff9a90', Pf, t) + DAV(t, { eye: 1.2, worry: 0.9, sweat: 1, lx: 0.8, trem: 0.4 }, 540, 1050, 3.0) + TXE('ME SEGUINDO!', 540, 420, 130, lt - 0.1, RDD, { stroke: '#fff' }), RDD);
  /* 30 */
  q(202, 209, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const k = ez(lt / d), px = lp(100, 520, k * k); return FLAT(STN(Pf, t)) + SHAD(px, 1780, 220) + RUIB({ view: 's', t, walk: lt < d - 1.5 ? 1 : 0, ph: px * 0.04, arms: 'swing', sm: 0.4 }, px, 1760, 1.4) + DAVB({ view: 's', t, walk: 1, ph: t * 3, arms: 'swing', worry: 0.5 }, 880, 1500, 0.8) + TXE('DEVAGAR...', 540, 520, 110, lt - 0.5, IN, { stroke: '#fff' }); }, 0);
  /* 31 */
  q(209, 214, { z0: 1, z1: 1.1, shk: 0.4 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcc98', Pf, t) + RUI(t, { eye: 1, lx: Math.sin(t * 2) * 0.5, sm: 0.3 }, 540, 1050, 2.8) + G(C(0, 0, 90, '#fff', `stroke="${IN}" stroke-width="9"`) + L(0, 0, 0, -55, IN, 8) + L(0, 0, 40 * Math.cos(t * 3), 40 * Math.sin(t * 3), IN, 8), 'translate(800 1500)') + TXE('...', 540, 400, 200, lt - 0.3, IN, {}), 0);
  /* 32 */
  q(214, 222, { z0: 1, z1: 1.1, shk: 0.8 }, (t, lt, Pf, d) => PBD('#ffe0d0', '#ffb090', Pf, t) + DAV(t, { eye: 1.1, worry: 0.7, lx: 0.9, raise: 0.5 }, 380, 1100, 2.6) + BAGP(800, 800, 1.6, t) + [0, 1, 2].map(i => TXE('FRUSH', 800, 420 - i * 20, 70 + i * 20, lt - 0.3 - i * 0.4, BLU, { stroke: IN, rot: -10 + i * 10 })).join(''), 0);
  /* 33 */
  q(222, 227, { z0: 1, z1: 1.2, shk: 1.5 }, (t, lt, Pf, d) => { const k = ez((lt - 0.3) / 0.35); return PBD('#fff0d8', '#ffd8a0', Pf, t) + DAV(t, { eye: 1.2, worry: 0.6, lx: lp(0.9, -0.9, k), tilt: lp(-6, 8, k) }, 540, 1050, 3.0) + SPD(t, 5); }, YL);
  /* 34 */
  q(227, 234, { z0: 1, z1: 1.08, shk: 0.5 }, (t, lt, Pf, d) => PBD('#fffbe0', '#fff0a0', Pf, t) + DAV(t, { eye: 1, raise: 0.6, sm: 0.5 }, 540, 1150, 2.5) + BULB(540, 420 - Math.sin(lt * 3) * 10, 1.8, ez((lt - 0.8) / 0.2) > 0 ? 1 : 0), YL);
  /* 35 */
  q(234, 240, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => FLAT(STN(Pf, t)) + SHAD(380, 1780, 220) + DAVB({ view: 's', t, walk: 1, ph: t * 5, arms: 'swing', lean: 8 }, 380, 1760, 1.5) + RUIB({ view: 's', t, walk: 1, ph: t * 3, arms: 'swing' }, 100 - lt * 10, 1620, 0.95) + SPD(t, 6), 0);
  /* 36 */
  q(240, 247, { z0: 1, z1: 1.12, shk: 0.5 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcc98', Pf, t) + RUI(t, { eye: 1, lx: -0.4 }, 540, 1050, 2.6) + TGT(540, 800, 600, 640, RDD, t) + TXE('OBSERVANDO', 540, 330, 100, lt - 0.2, IN, { stroke: '#fff' }), 0);
  /* 37 */
  q(247, 253, { z0: 1, z1: 1, shk: 1.2 }, (t, lt, Pf, d) => { const k = ez(lt / d); return FLAT(STN(Pf, t)) + SHAD(lp(120, 640, k), 1780, 230) + RUIB({ view: 's', t, walk: 1, ph: t * 6, arms: 'swing', lean: 12 }, lp(120, 640, k), 1760, 1.5) + DAVB({ view: 's', t, walk: 1, ph: t * 5, arms: 'swing' }, 900, 1600, 0.9) + SPD(t, 8); }, 0);
  /* 38 */
  q(253, 262, { z0: 1, z1: 1.1, shk: 0.6 }, (t, lt, Pf, d) => { const k = ez((lt - 0.4) / 0.3); return PBD('#e0ffe8', '#a8e8b8', Pf, t) + DAV(t, { eye: 1, worry: 0.5, lx: 0.4 }, 540, 1200, 2.4) + G(C(0, 0, 150, GN, `stroke="${IN}" stroke-width="12"`) + P('M-70,0 L-20,55 L75,-55', 'none', 'stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"'), `translate(540 540) scale(${f1(k)})`) + TXE('EU SABIA!', 540, 820, 120, lt - 1.0, GN, { stroke: IN }); }, GN);
  /* 39 */
  q(262, 270, { z0: 1, z1: 1.08, shk: 0.4 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcc98', Pf, t) + RUI(t, { eye: 1, worry: 0.4, ly: -0.2, tilt: -4 }, 400, 1250, 2.4) + THINK(660, 500, 1.0, DAVB({ view: 'f', t, arms: 'swing', worry: 0.5 }, 0, 120, 0.35) + TXE('?', 130, 20, 120, lt - 0.6, RDD, { stroke: IN }), t), 0);
  /* 40 */
  q(270, 280, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const k = ez(lt / d), px = lp(100, 620, k); return FLAT(STN(Pf, t)) + SHAD(px, 1780, 220) + RUIB({ view: 's', t, walk: 1, ph: px * 0.04, arms: 'swing', lean: 6 }, px, 1760, 1.4) + DAVB({ view: 's', t, walk: 1, ph: px * 0.04 + 0.1, arms: 'swing' }, px + 340, 1760, 1.4) + TXE('MESMO RITMO', 540, 520, 110, lt - 0.3, IN, { stroke: '#fff' }); }, 0);
  /* 41 */
  q(280, 285, { z0: 1, z1: 1.15, shk: 0.8 }, (t, lt, Pf, d) => PBD('#ffe0d0', '#ffb090', Pf, t) + RUI(t, { eye: 1.1, worry: 0.9, sweat: 1, lx: 0.6 }, 540, 1050, 3.0), 0);
  /* 42 */
  q(285, 298, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const sw = Math.floor(lt / 1.5) % 2; return PBD(sw ? '#ffe0c8' : '#ffe8d0', '#ffcc98', Pf, t) + DAV(t, { eye: 1, worry: 0.5, lx: 0.8 }, 270, 1050, 2.0) + RUI(t, { eye: 1, worry: 0.5, lx: -0.8 }, 810, 1050, 2.0) + G(SPD(t, 3), '') + TXE('REAGEM IGUAL', 540, 500, 100, lt - 0.3, IN, { stroke: '#fff' }) + [0, 1].map(i => TXE('!', 270 + i * 540, 560, 160, lt - 0.5 - i * 0.6, RDD, { stroke: IN })).join(''); }, 0);
  /* 43 */
  q(298, 308, { z0: 1, z1: 1.08, shk: 0.5 }, (t, lt, Pf, d) => { let s = PBD('#e8f0ff', '#c8d8ff', Pf, t); for (let i = 0; i < 12; i++) { const x = 140 + (i % 4) * 267, y = 500 + Math.floor(i / 4) * 380, on = ez((lt - i * 0.35) / 0.3); s += G(R(-70, -120, 140, 240, '#2a2a3a', `rx="22" stroke="${IN}" stroke-width="7"`) + R(-56, -98, 112, 190, '#9ad0ff') + glow(Pf, 'B', 0, -10, 130, 0.5), `translate(${x} ${y}) scale(${f1(on)}) rotate(${f1((i % 3 - 1) * 6)})`); } return s + TXE('TODO MUNDO', 540, 330, 120, lt - 0.2, IN, { stroke: '#fff' }); }, 0);
  /* 44 */
  q(308, 318, { z0: 1, z1: 1.1, shk: 0.5 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcc98', Pf, t) + DAV(t, { eye: 0.9, sm: 0.5, lx: 0.2, ly: 0.5, tilt: -3 }, 540, 1000, 2.8) + PHN(Pf, t, 540, 1500, 0.75, { k: 'msg' }) + TXE('MENSAGEM?', 540, 340, 110, lt - 0.3, IN, { stroke: '#fff' }), 0);
  /* 45 */
  q(318, 327, { z0: 1, z1: 1.12, shk: 0.4 }, (t, lt, Pf, d) => PBD('#e0e0f0', '#b8b8d8', Pf, t) + R(240, 360, 600, 1180, '#14141e', `rx="60" stroke="${IN}" stroke-width="12"`) + RUI(t, { eye: 0.9, lx: Math.sin(t * 2) * 0.4 }, 540, 1020, 1.5).replace('<g', '<g opacity="0.55"') + R(240, 360, 600, 1180, '#fff', `rx="60"` + OP(0.08)) + TXE('TELA', 540, 1660, 90, lt - 0.3, IN, {}), 0);
  /* 46 */
  q(327, 337, { z0: 1, z1: 1.1, shk: 0.4 }, (t, lt, Pf, d) => PBD('#f0e8f8', '#d8c8f0', Pf, t) + DAV(t, { eye: 0.9, worry: 0.3, ly: -0.3, lx: 0.3, tilt: 4 }, 540, 1100, 2.5) + TXE('?', 780, 560 + Math.sin(t * 3) * 15, 360, lt - 0.3, BLU, { stroke: IN }), 0);
  /* 47 */
  q(337, 347, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const rv = ez((lt - 5.5) / 0.6); return PBD('#e8e0f8', '#c8b8ee', Pf, t) + SIL(540, 1180, 3.0, '#2a1a3a', '#ffd08a') + G(RUI(t, { eye: 1, sm: 0.7 }, 0, 0, 1.0), `translate(540 ${f1(780)}) scale(${f1(2.6)})`, OP(rv)) + TXE('MEDO', 540, 330, 130, lt - 0.2, RDD, { stroke: '#fff' }); }, 0);
  /* 48 */
  q(347, 355, { z0: 1, z1: 1, shk: 0.5 }, (t, lt, Pf, d) => { const k = ez(lt / d), px = lp(100, 900, k); return FLAT(STN(Pf, t)) + SHAD(px, 1780, 220) + DAVB({ view: 's', t, walk: 1, ph: px * 0.04, arms: 'swing', sm: 0.4 }, px, 1760, 1.4) + RUIB({ view: 's', t, walk: 1, ph: px * 0.04, arms: 'swing' }, px - 330, 1760, 1.4); }, 0);
  /* 49 */
  q(355, 366, { z0: 1, z1: 1.1, shk: 0.4 }, (t, lt, Pf, d) => PBD('#ffe8d0', '#ffcc98', Pf, t) + RUI(t, { eye: 1, lx: -0.5, tilt: -4, sm: 0.2 }, 330, 1150, 2.4) + TXE('?', 780, 600 + Math.sin(t * 3) * 14, 420, lt - 0.3, BLU, { stroke: IN }) + DAV(t, { eye: 1, lx: 0.4, worry: 0.2 }, 800, 1500, 0.9), 0);
  /* 50 */
  q(366, null, { z0: 1, z1: 1.15, shk: 0.3 }, (t, lt, Pf, d) => { const k = ez(lt / (d - 2.5)), fade = ez((lt - (d - 1.3)) / 1.0), arrive = ez((lt - 3.5) / 0.6); return FLAT(STN(Pf, t, { fg: 0 })) + HOUSEW(Pf, 860, 1250, 1.3, t, 1) + SHAD(lp(100, 640, k), 1780, 220) + DAVB({ view: 's', t, walk: lt < d - 3 ? 1 : 0, ph: lp(100, 640, k) * 0.04, arms: 'swing', sm: 0.6 }, lp(100, 640, k), 1760, 1.4) + RUIB({ view: 'f', t, walk: 0, arms: 'swing', sm: 0.8 }, 880, 1760, 1.0) + R(0, 0, 1080, 1920, '#fff', OP(fade)); }, 0);
}
