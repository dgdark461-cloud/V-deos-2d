function partZ(c) {
  const q = QF(c), BL = '#6ab4d8', AM = '#ffb86a', RD = '#ff4a3a', CY = '#6ad0ff', GD = '#ffd36a', GN = '#6aff9a';
  const rot = (s, a, x = 540, y = 960) => G(s, `rotate(${f1(a)} ${x} ${y})`);
  const FINGER = (x, y, sc = 1, a = 0) => G(P('M-34,0 Q-40,-80 -20,-140 Q0,-170 22,-140 Q40,-80 34,0 L60,260 L-60,260Z', '#d2a07a', `stroke="${OD}" stroke-width="5"`) + E(0, -128, 14, 20, '#e8c4a4', OP(0.6)), `translate(${f1(x)} ${f1(y)}) rotate(${a}) scale(${sc})`);
  const SIDEH = (Pf, t, o = {}) => BIG(o.bg || '#0a1018') + R(-100, 1450, 1280, 600, '#1a1618') + R(-100, 1430, 1280, 26, '#05070b') + [0, 1, 2].map(i => R(120 + i * 400, 560, 200, 880, '#1c2230', `stroke="${OD}" stroke-width="8"`) + R(140 + i * 400, 580, 160, 840, '#12161e') + C(270 + i * 400, 1010, 12, '#c8b060')).join('');
  const BATHR = (Pf, t) => BIG('#0a1620') + (() => { let s = ''; for (let i = 0; i < 10; i++) for (let j = 0; j < 12; j++) s += R(-60 + i * 130, -60 + j * 130, 126, 126, (i + j) % 2 ? '#152a3a' : '#122434', OP(0.9)); return s; })() + R(-100, 1500, 1280, 500, '#0c1822');
  const EYEB = (Pf, t, x, y, sc, o = {}) => { const bl = (t % 4.3) < 0.1 ? 0.2 : 1, pr = o.pr === undefined ? 52 : o.pr; return G(E(0, 0, 340, 170 * bl, '#e6ded6', `stroke="#0a0604" stroke-width="12"`) + C(o.lx || 0, 0, 120, '#5a3a1e', `stroke="#0a0f0c" stroke-width="8"`) + C(o.lx || 0, 0, pr, '#030504') + C((o.lx || 0) - 40, -40, 14, '#fff', OP(0.8)) + P('M-420,-190 Q0,-330 420,-190', 'none', 'stroke="#15100c" stroke-width="34" stroke-linecap="round"'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
  const HANDS = (x, y, sc) => G([-1, 1].map(sg => R(sg * 120 - 90, -60, 180, 120, '#d2a07a', `rx="50" stroke="${OD}" stroke-width="6"`) + [0, 1, 2, 3].map(i => L(sg * 120 - 60 + i * 40, -20, sg * 120 - 60 + i * 40, 40, '#a2704e', 4)).join('')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
  /* 69 */
  q(395, 400, { z0: 1, z1: 1, shk: 1.5 }, (t, lt, Pf, d) => { const px = lp(60, 960, ez(lt / d)); return SIDEH(Pf, t, { bg: '#06080e' }) + DIMM(0.4) + glow(Pf, 'B', px + 60, 1200, 400, 0.4) + G(RAFB({ view: 's', t, walk: 1, ph: px * 0.045, arms: 'swing', worry: 1, lean: 8 }, 0, 0, 1), `translate(${f1(px)} 1680) scale(1.5)`); }, 0);
  /* 70 */
  q(400, 405, { z0: 1, z1: 1.25, shk: 2.5 }, (t, lt, Pf, d) => BIG('#0a0a0e') + glow(Pf, 'R', 540, 900, 700, 0.3) + KNOB(540 + Math.sin(t * 40) * 4, 900, 3.0, Math.sin(t * 40) * 4, { lock: RD }) + R(240, 1180, 600, 60, '#8a8a90', `rx="20" stroke="${OD}" stroke-width="6"`) + R(520, 1180, 180, 60, RD, 'rx="20"') + HANDS(540, 1600, 1.2), RD);
  /* 71 */
  q(405, 412, { z0: 1, z1: 1, shk: 0.8 }, (t, lt, Pf, d) => { const u = ez(lt / d); return HALL(Pf, t, { far: 0.1 }) + DIMM(0.5) + G(STRANGER(0, 0, 1, t, { rim: '#4a6a88' }), `translate(540 ${f1(lp(1010, 1120, u))}) scale(${f1(lp(0.12, 0.42, u))})`, OP(0.9)) + [0, 1, 2].map(i => E(540 + (i % 2 ? 30 : -30), 1100 + ((t * 0.6 + i / 3) % 1) * 600, 30 + ((t * 0.6 + i / 3) % 1) * 90, 10 + ((t * 0.6 + i / 3) % 1) * 20, '#000', OP(0.6))).join(''); }, 0);
  /* 72 */
  q(412, 421, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const cl_ = ez((lt - 0.4) / 1.6), bolt = ez((lt - 2.3) / 0.4); return BATHR(Pf, t) + DOORI(Pf, t, 540, 1700, 1.5, { open: 1 - cl_, inner: '#0a0a0e', lock: bolt > 0.5 ? RD : '#8a8a90' }) + glow(Pf, 'W', 540, 900, 700, 0.12) + RAFB({ view: 'f', t, worry: 1, eye: 1.2, arms: 'swing' }, 200, 1900, 1.3) + DIMM(0.25); }, 0);
  /* 73 */
  q(421, 427, { z0: 1, z1: 1.2, shk: 2 }, (t, lt, Pf, d) => BATHR(Pf, t) + DIMM(0.7) + glow(Pf, 'B', 540, 1200, 700, 0.5) + RAF(t, { eye: 1.2, worry: 1, sweat: 1, trem: 0.5, ly: 0.6, rim: CY }, 540, 880, 2.7) + PHN(Pf, t, 540, 1720, 0.95, { k: 'call', name: 'EU', nsz: 140, sub: 'NOVA MENSAGEM', vib: 1 }), CY);
  /* 74 */
  q(427, 438, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const ls = ['NÃO FAÇA', 'BARULHO.', 'ELE ESTÁ', 'PROCURANDO', 'VOCÊ.'], n = Math.min(5, 1 + Math.floor(lt / 1.8)); return BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.6, { k: 'msg', time: '', bub: [{ l: ls.slice(0, n), y: -230, col: '#7a1d1d', sz: 62 }], gc: 'R' }); }, RD);
  /* 75 */
  q(438, 442, { z0: 1, z1: 1.2, shk: 1.5 }, (t, lt, Pf, d) => { let s = BATHR(Pf, t) + DIMM(0.75) + glow(Pf, 'B', 540, 1000, 700, 0.3) + RAF(t, { eye: 0.6, worry: 1.4, trem: 0.9, sweat: 0.6, rim: CY }, 540, 960, 3.0); for (let i = 0; i < 2; i++) { const k = ((t * 1.1 + i * 0.5) % 1); s += E(540 + (i ? 150 : -150), 1000 + k * 380, 12, 26, '#bfe6ff', OP(0.9 * (1 - k))); } return s; }, 0);
  /* 76 */
  q(442, 448, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { let s = BATHR(Pf, t) + DIMM(0.7) + RAFB({ view: 'f', t, arms: 'cheeks', crouch: 0.8, worry: 1, eye: 0.8 }, 540, 1700, 1.65); for (let i = 0; i < 3; i++) { const a = t * 1.4 + i * 2.1; s += TXE('?', 540 + Math.cos(a) * 340, 700 + Math.sin(a) * 120, 130, lt - 0.1 * i, RD, { stroke: '#000' }); } return s; }, 0);
  /* 77 */
  q(448, 454, { z0: 1, z1: 1.15, shk: 2 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.55, { k: 'call', name: 'EU', nsz: 150, sub: 'ÚLTIMA LIGAÇÃO', ssz: 52, scol: RD, vib: 1.4, gc: 'R' }) + RING(t, 540, 960, RD, 4, 700, 8), RD);
  /* 78 */
  q(454, 457, { z0: 1, z1: 1, shk: 2 }, (t, lt, Pf, d) => { const sw = ez(lt / 0.5); return BIG('#05070b') + glow(Pf, 'B', 540, 1300, 900, 0.35) + RAF(t, { eye: 0.9, worry: 0.8, ly: 0.5, rim: CY }, 540, 520, 1.9) + PHN(Pf, t, 540, 1400, 1.0, { k: 'call', name: 'EU', nsz: 140, sub: 'CHAMANDO...' }) + FINGER(lp(760, 650, sw), lp(1850, 1640, sw), 0.9, -20) + (sw > 0.9 ? R(0, 0, 1080, 1920, GN, OP(0.25 * (1 - (lt - 0.45) * 3))) : ''); }, GN);
  /* 79 */
  q(457, 464, { z0: 1, z1: 1.35, shk: 0.5 }, (t, lt, Pf, d) => BIG('#030406') + glow(Pf, 'B', 540, 960, 700, 0.2) + E(540, 960, 190, 270, '#d2a07a', OP(0.5) + ` stroke="${OD}" stroke-width="8"`) + DIMM(0.55) + WAVE(Pf, t * 0.6, 220, 960, 300, 24, CY, 0.7) + TXE('SHHH', 540, 520, 140, lt - 0.5, '#9ac4dc', { stroke: '#000' }), 0);
  /* 80 */
  q(464, 473, { z0: 1, z1: 1.15, shk: 1 }, (t, lt, Pf, d) => { const ey = lt < 2.5 ? 1.2 : lp(1.2, 0.04, ez((lt - 2.5) / 0.5)); return BATHR(Pf, t) + DIMM(0.78) + glow(Pf, 'B', 540, 1000, 700, 0.3) + RAF(t, { eye: ey, worry: 1.2, sweat: 1, trem: 0.4, rim: CY }, 540, 960, 3.0) + (lt > 4 ? HANDS(540, 940, 1.5) : ''); }, 0);
  /* 81 */
  q(473, 479, { z0: 1, z1: 1.2, shk: 1 }, (t, lt, Pf, d) => BIG('#07090e') + glow(Pf, 'W', 540, 900, 800, 0.15) + KNOB(540, 960, 3.2, lp(0, 42, ez(lt / (d - 0.8))), {}) + R(0, 1500, 1080, 6, '#ffe6a0', OP(0.4)), 0);
  /* 82 */
  q(479, 485, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const bx = lp(520, 180, ez(lt / d)); return BATHR(Pf, t) + DIMM(0.7) + glow(Pf, 'B', bx, 1000, 500, 0.25) + RAFB({ view: 'f', t, arms: 'cover', worry: 1, eye: 1.3, sweat: 1, crouch: 0.2 }, bx, 1720, 1.6); }, 0);
  /* 83 */
  q(485, 491, { z0: 1, z1: 1.3, x0: 540, x1: 520, y0: 1000, y1: 700, shk: 1 }, (t, lt, Pf, d) => BATHR(Pf, t) + DOORI(Pf, t, 540, 1720, 1.5, { open: lp(0, 0.1, ez(lt / 1.5)), inner: '#020203', light: 0 }) + DIMM(0.3), 0);
  /* 84 */
  q(491, 496, { z0: 1, z1: 1.25, x0: 540, x1: 600, y0: 1000, y1: 900, shk: 1.5 }, (t, lt, Pf, d) => BATHR(Pf, t) + DOORI(Pf, t, 540, 1720, 1.5, { open: 0.14, inner: '#020203', hand: ez(lt / 1.2) }) + DIMM(0.3), RD);
  /* 85 */
  q(496, 504, { z0: 1, z1: 1.2, shk: 1.5 }, (t, lt, Pf, d) => BIG('#030406') + EYEB(Pf, t, 540, 960, 1.35, { lx: 0.5 * 40 * Math.sin(lt * 1.2), pr: lp(60, 26, ez(lt / d)) }) + RING(t, 540, 960, RD, 3, 800, 5) + WAVE(Pf, t, 540, 1500, 900, 40, RD, 0.8), RD);
  /* 86 */
  q(504, 507, { z0: 1, z1: 1.3, shk: 3 }, (t, lt, Pf, d) => BIG('#020204') + RAF(t, { eye: 1.35, sm: 1, m: 0.7, angry: 0.8, rim: RD }, 540, 960, 3.4) + DIMM(0.55) + EYESP(Pf, t, 540, 800, 1.3, 1, { col: '#fff' }) + R(0, 0, 1080, 1920, RD, OP(0.2)), RD);
  /* 87 */
  q(507, 514, { z0: 1, z1: 1.15, shk: 1.5 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 960, 900, 0.4) + PHN(Pf, t, 540, 1000, 1.6, { k: 'call', name: 'EU', nsz: 140, sub: 'CHAMADA ATIVA', scol: GN, nobtn: true, vib: 0.5 }) + FINGER(80, 1720, 1.3, 20) + FINGER(1000, 1720, 1.3, -20), CY);
  /* 88 */
  q(514, 521, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const s = 47 + Math.floor(lt); return BIG('#05070b') + glow(Pf, 'B', 540, 960, 900, 0.4) + PHN(Pf, t, 540, 960, 1.6, { k: 'text', lines: [{ s: 'EU', y: -130, sz: 160 }, { s: 'CHAMADA ATIVA', y: -40, sz: 54, col: GN }, { s: '00:' + s, y: 120, sz: 150, col: GN }, { s: 'ENCERRAR', y: 300, sz: 60, col: RD }] }); }, GN);
  /* 89 */
  q(521, 529, { z0: 1, z1: 2.2, x0: 540, x1: 540, y0: 960, y1: 1080, shk: 1 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.6, { k: 'text', gc: 'R', lines: [{ s: 'EU', y: -130, sz: 160 }, { s: '00:58', y: 120, sz: 150, col: GN }] }), RD);
  /* 90 */
  q(529, 535, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const x = ez((lt - 1.0) / 0.3); return BIG('#05070b') + glow(Pf, 'A', 540, 960, 900, 0.2) + TXE('FUTURO', 540, 1030, 280, 9, '#fff', { stroke: '#000' }) + L(lp(140, 940, x), 880, lp(140, 940, x), 880, RD, 0) + R(140, 940 - 12, 800 * x, 24, RD, 'rx="12"') + TXE('→', 540, 560, 200, lt - 0.1, GD, { stroke: '#000' }) + (x > 0.9 ? RING(t, 540, 960, RD, 2, 500, 6) : ''); }, RD);
  /* 91 */
  q(535, 544, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => BIG('#050810') + glow(Pf, 'R', 540, 960, 900, 0.2) + PLAN(Pf, t, 540, 900, 1.2, { dot: [200, 230], me: [250, 290] }) + RING(t, 740, 1130, RD, 4, 400, 6) + TXE('DENTRO DE CASA', 540, 1560, 96, lt - 0.6, '#fff', { stroke: '#000' }), RD);
  /* 92 */
  q(544, 550, { z0: 1, z1: 1.15, shk: 1 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 960, 900, 0.3) + RAF(t, { eye: 1.2, worry: 0.9, ly: 0.7, rim: CY }, 540, 480, 1.9) + PHN(Pf, t, 540, 1300, 1.2, { k: 'log', rows: [{ n: 'EU', s: 'agora', hl: '#7a1d1d', c: RD }, { n: 'EU', s: '11 min' }, { n: 'MÃE', s: 'ontem' }] }), CY);
  /* 93 */
  q(550, 559, { z0: 1, z1: 1.2, shk: 1.2 }, (t, lt, Pf, d) => { const p = ez((lt - 0.8) / 0.3); return BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.55, { k: 'log', rows: [{ n: 'EU', s: '23:47', hl: '#7a1d1d', c: RD, sc: '#fff', ha: 0.9 }, { n: 'EU', s: '11 min' }, { n: 'MÃE', s: 'ontem' }], gc: 'R' }) + G(TXE('AMANHÃ', 0, 0, 230, 9, '#fff', { stroke: RD }), `translate(540 1500) scale(${f1(0.3 + 0.7 * p)}) rotate(-6)`, OP(p)); }, RD);
  /* 94 */
  q(559, 566, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => BIG('#0a0508') + glow(Pf, 'R', 540, 960, 900, 0.3 + 0.1 * Math.sin(t * 5)) + DCLK(Pf, 540, 960, 1.9, '23:46') + RING(t, 540, 960, RD, 2, 600, 5), RD);
  /* 95 */
  q(566, 574, { z0: 1, z1: 1.15, shk: 1.5 }, (t, lt, Pf, d) => { const fl = lt > 1.0; return BIG('#0a0508') + glow(Pf, 'R', 540, 700, 900, 0.3) + DCLK(Pf, 540, 520, 1.5, fl ? '23:47' : '23:46') + (lt > 1.0 && lt < 1.12 ? R(0, 0, 1080, 1920, '#fff', OP(0.6)) : '') + (lt > 1.6 ? PHN(Pf, t, 540, 1330, 1.0, { k: 'call', name: 'EU', nsz: 140, sub: 'MEU NÚMERO', vib: 1.2 }) + RING(t, 540, 1330, RD, 3, 440, 6) : ''); }, RD);
  /* 96 */
  q(574, 584, { z0: 1, z1: 1.12, shk: 1.2 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 1100, 900, 0.4) + RAF(t, { eye: 1.25, worry: 0.9, ly: 0.7, sweat: 0.8, trem: 0.3, rim: CY }, 540, 600, 2.5) + PHN(Pf, t, 540, 1560, 1.0, { k: 'call', name: 'EU', nsz: 140, sub: 'MEU NÚMERO', vib: 0.8 }), CY);
  /* 97 */
  q(584, 593, { z0: 1, z1: 1.2, shk: 1.5 }, (t, lt, Pf, d) => { const gl = Math.sin(lt * 33) > 0.5 ? 10 : 0, sw = lt > 3.2; return BIG('#0a0508') + glow(Pf, 'R', 540, 960, 900, 0.35) + G(PHN(Pf, t, 540, 960, 1.5, { k: 'call', name: sw ? 'RAFAEL' : 'EU', nsz: 120, sub: sw ? 'IDENTIFICAÇÃO NOVA' : 'MEU NÚMERO', ssz: 46, scol: sw ? RD : '#9ac4dc', gc: 'R', vib: 0.6 }), `translate(${gl} 0)`); }, RD);
  /* 98 */
  q(593, 596, { z0: 1, z1: 1.3, shk: 3 }, (t, lt, Pf, d) => BIG('#100304') + glow(Pf, 'R', 540, 960, 900, 0.5) + PHN(Pf, t, 540, 960, 1.6, { k: 'call', name: 'RAFAEL', nsz: 130, sub: 'NÃO ATENDA', ssz: 90, scol: RD, vib: 1.5, gc: 'R', nobtn: true }) + R(0, 0, 1080, 1920, RD, OP(0.12 + 0.1 * Math.sin(t * 20))), RD);
  /* 99 */
  q(596, 601, { z0: 1, z1: 1.2, shk: 2 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'R', 540, 1300, 900, 0.3) + DOORI(Pf, t, 800, 900, 0.5, { open: lp(0, 0.05, ez(lt / d)), inner: '#020203' }) + PHN(Pf, t, 540, 1280, 1.2, { k: 'call', name: 'RAFAEL', nsz: 110, sub: 'NÃO ATENDA', ssz: 60, scol: RD, vib: 0.8, gc: 'R' }) + FINGER(lp(760, 650, ez(lt / d)) + Math.sin(t * 40) * 5, 1700, 1.1, -20), RD);
  /* 100 */
  q(601, 608, { z0: 1, z1: 1.3, x0: 540, x1: 540, y0: 1000, y1: 900, shk: 2.5 }, (t, lt, Pf, d) => BATHR(Pf, t) + DOORI(Pf, t, 540, 1720, 1.5, { open: lp(0.05, 0.9, ez(lt / 2.2)), inner: '#010102', shake: ez(lt / 2.2) * 0.3 }) + DIMM(0.4), RD);
  /* 101 */
  q(608, 617, { z0: 1, z1: 1.5, x0: 540, x1: 540, y0: 960, y1: 900, shk: 0.8 }, (t, lt, Pf, d) => { const a = ez((lt - 1.4) / 0.8); return BIG('#010102') + glow(Pf, 'B', 540, 960, 500, 0.12) + E(470, 880, 30, 12, '#fff', OP(a)) + E(610, 880, 30, 12, '#fff', OP(a)) + glow(Pf, 'W', 540, 880, 260, 0.25 * a) + WAVE(Pf, t, 540, 1500, 800, 30, '#9ac4dc', 0.6 * a); }, 0);
  /* 102 */
  q(617, null, { z0: 1, z1: 1.25, shk: 1.2 }, (t, lt, Pf, d) => { const fade = ez((lt - (d - 1.4)) / 1.2); return BIG('#020204') + glow(Pf, 'R', 540, 960, 900, 0.3) + RAF(t, { eye: 1.1, sm: 0.5, worry: 0.2, angry: 0.3, rim: RD }, 540, 960, 3.3) + DIMM(0.5) + WAVE(Pf, t, 540, 1560, 900, 50, RD, 0.7) + R(0, 0, 1080, 1920, '#000', OP(fade)); }, 0);
}
