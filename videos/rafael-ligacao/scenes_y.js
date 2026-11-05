function partY(c) {
  const q = QF(c), BL = '#6ab4d8', AM = '#ffb86a', RD = '#ff4a3a', CY = '#6ad0ff', GD = '#ffd36a', GN = '#6aff9a';
  const rot = (s, a, x = 540, y = 960) => G(s, `rotate(${f1(a)} ${x} ${y})`);
  const FINGER = (x, y, sc = 1, a = 0) => G(P('M-34,0 Q-40,-80 -20,-140 Q0,-170 22,-140 Q40,-80 34,0 L60,260 L-60,260Z', '#d2a07a', `stroke="${OD}" stroke-width="5"`) + E(0, -128, 14, 20, '#e8c4a4', OP(0.6)), `translate(${f1(x)} ${f1(y)}) rotate(${a}) scale(${sc})`);
  const SIDEH = (Pf, t, o = {}) => BIG(o.bg || '#0a1018') + R(-100, 1450, 1280, 600, '#1a1618') + R(-100, 1430, 1280, 26, '#05070b') + [0, 1, 2].map(i => R(120 + i * 400, 560, 200, 880, '#1c2230', `stroke="${OD}" stroke-width="8"`) + R(140 + i * 400, 580, 160, 840, '#12161e') + C(270 + i * 400, 1010, 12, '#c8b060')).join('') + (o.light ? glow(Pf, 'F', 1000, 1000, 600, o.light) + R(960, 560, 200, 880, '#ffcf80', OP(0.5 * o.light)) : '');
  const STOPW = (t, x, y, sc, a) => G(C(0, 0, 220, '#e8e4dc', `stroke="${OD}" stroke-width="12"`) + R(-24, -290, 48, 70, '#8a8a8a', 'rx="8"') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => L(Math.sin(i / 12 * 6.283) * 180, -Math.cos(i / 12 * 6.283) * 180, Math.sin(i / 12 * 6.283) * 200, -Math.cos(i / 12 * 6.283) * 200, '#222', 6)).join('') + P('M0,0 L0,-210 A210,210 0 0 1 ' + f1(Math.sin(a * 6.283) * 210) + ',' + f1(-Math.cos(a * 6.283) * 210) + 'Z', RD, OP(0.35)) + L(0, 0, Math.sin(a * 6.283) * 190, -Math.cos(a * 6.283) * 190, RD, 10) + C(0, 0, 16, '#222'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
  /* 37 */
  q(194, 199, { z0: 1, z1: 1.2, shk: 1 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 1500, 900, 0.3) + PHN(Pf, t, 540, 1560, 1.1, { k: 'log', rows: [{ n: 'EU', s: '23:41', hl: '#7a1d1d', c: RD }, { n: 'MÃE', s: 'ontem' }], on: 0.4 }) + RAF(t, { eye: lp(1, 1.5, ez(lt / 1.8)), worry: 0.8, ly: 0.3, raise: 0.5, rim: CY }, 540, 700, 3.0), CY);
  /* 38 */
  q(199, 206, { z0: 1, z1: 1.15, shk: 1 }, (t, lt, Pf, d) => { const p = ez((lt - 0.5) / 0.3); return BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.55, { k: 'log', rows: [{ n: 'EU', s: '11 min', hl: '#7a1d1d', c: RD, sc: '#fff', ha: 0.9 }, { n: 'MÃE', s: 'ontem' }, { n: 'AMIGO', s: '19:02' }], gc: 'R' }) + G(TXE('11 MIN', 0, 0, 250, 9, '#fff', { stroke: RD }), `translate(540 ${f1(250 - 20 * p)}) scale(${f1(0.3 + 0.55 * p)})`, OP(p)) + RING(t, 540, 960, RD, 2, 600, 6); }, RD);
  /* 39 */
  q(206, 215, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const a = Math.min(1, lt / 3.2) * 0.5, b1 = ez((lt - 3.5) / 1.5); return BIG('#05070b') + glow(Pf, 'A', 540, 700, 800, 0.2) + STOPW(t, 540, 640, 1.2, a * ez(Math.min(1, lt / 3))) + TXE('30 s', 540, 1010, 130, lt - 2.5, '#fff', { stroke: '#000' }) + R(140, 1130, 800, 60, '#1a2a3e', 'rx="14"') + R(140, 1130, 800 * 0.08, 60, GN, 'rx="14"') + R(140, 1260, 800, 60, '#1a2a3e', 'rx="14"') + R(140, 1260, 800 * ez((lt - 3.5) / 1.5), 60, RD, 'rx="14"') + TXE('30 SEGUNDOS', 300, 1110, 46, lt - 3.0, GN, { stroke: '#000' }) + TXE('11 MINUTOS', 300, 1240, 46, lt - 3.6, RD, { stroke: '#000' }); }, 0);
  /* 40 */
  q(215, 219, { z0: 1, z1: 1.15, shk: 1.2 }, (t, lt, Pf, d) => { let s = BIG('#06080e') + glow(Pf, 'B', 540, 1000, 900, 0.3) + RAFB({ view: 'f', t, arms: 'cheeks', worry: 1, eye: 1.3, sweat: 1, lean: Math.sin(t * 3) * 3 }, 540, 1700, 1.65); for (let i = 0; i < 3; i++) s += TXE('?', 220 + i * 320, 420 + 90 * Math.sin(t * 3 + i) - i * 30, 150, lt - 0.1 * i, RD, { stroke: '#000' }); return s; }, 0);
  /* 41 */
  q(219, 223, { z0: 1.1, z1: 1, shk: 2 }, (t, lt, Pf, d) => BIG('#2a1c12') + [0, 1, 2, 3, 4, 5].map(i => R(-100, i * 360 - 80, 1280, 8, '#1a0f08')).join('') + glow(Pf, 'B', 540, 960, 700, 0.5) + rot(PHN(Pf, t, 540 + Math.sin(t * 50) * 6, 960, 1.15, { k: 'call', name: 'EU', nsz: 150, sub: 'MEU NÚMERO', vib: 1.4, nobtn: true }), 32, 540, 960) + RING(t, 540, 960, CY, 3, 520, 6) + DIMM(0.3), CY);
  /* 42 */
  q(223, 228, { z0: 1, z1: 1.12, shk: 1 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'R', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.55, { k: 'msg', time: '', bub: [{ l: ['NÃO VÁ ATÉ', 'A COZINHA.'], y: -120, col: '#7a1d1d', sz: 62 }], gc: 'R' }), RD);
  /* 43 */
  q(228, 236, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const px = lp(80, 700, ez(lt / d)); return SIDEH(Pf, t, { light: 0.8 }) + G(RAFB({ view: 's', t, walk: 1, ph: px * 0.034, arms: 'swing', worry: 0.7 }, 0, 0, 1), `translate(${f1(px)} 1680) scale(1.5)`) + DIMM(0.15); }, 0);
  /* 44 */
  q(236, 239, { z0: 1, z1: 1.3, x0: 540, x1: 540, y0: 960, y1: 1100, shk: 0.6 }, (t, lt, Pf, d) => HALL(Pf, t, { far: 0.35 }) + RAFB({ view: 'b', t, arms: 'swing' }, 540, 1620, 1.1), 0);
  /* 45 */
  q(239, 246, { z0: 1, z1: 1, shk: 3 }, (t, lt, Pf, d) => { let s = BIG('#06080e') + glow(Pf, 'B', 540, 960, 800, 0.2) + RAF(t, { eye: 1.4, worry: 0.8, raise: 0.8, lx: 0.6, rim: CY }, 540, 1000, 2.4); const h = lt > 1.0; if (h) { s += CRACKS(540, 700, 700, Math.min(1, (lt - 1.0) * 4)) + DEBRIS(lt - 1.0, 540, 700, 28, 700, '#d8ecff'); s += R(0, 0, 1080, 1920, '#fff', OP(0.5 * Math.exp(-(lt - 1.0) * 12))); } return s; }, 0);
  /* 46 */
  q(246, 257, { z0: 1, z1: 1.45, x0: 540, x1: 540, y0: 1100, y1: 600, shk: 0.8 }, (t, lt, Pf, d) => FLAT(KITC(Pf, t, { glass: true })) + RAFB({ view: 'b', t }, 220, 1700, 1.2) + DIMM(0.15), 0);
  /* 47 */
  q(257, 264, { z0: 1.0, z1: 1.0, x0: 540, x1: 540, y0: 1100, y1: 700, shk: 0.6 }, (t, lt, Pf, d) => FLAT(KITC(Pf, t, { shards: true, mud: 1 })) + DIMM(0.2) + FOOTS(540, 1080, 6, 1.7, 1), 0);
  /* 48 */
  q(264, 267, { z0: 1, z1: 1, shk: 2 }, (t, lt, Pf, d) => { const bt = Math.max(0, Math.sin(t * 9)); return BIG('#0a0508') + glow(Pf, 'R', 540, 960, 900, 0.3 + 0.2 * bt) + HEART(540, 960, 3.2, bt) + RING(t, 540, 960, RD, 3, 700, 8) + P('M0,1500 L300,1500 L350,1400 L420,1620 L480,1380 L540,1500 L1080,1500', 'none', `stroke="${RD}" stroke-width="8"`); }, RD);
  /* 49 */
  q(267, 271, { z0: 1, z1: 1.15, shk: 1.2 }, (t, lt, Pf, d) => { const k = ez(lt / 1.0); return FLAT(KITC(Pf, t, {})) + DIMM(0.35) + G(R(-60, -230, 120, 250, '#2a1a10', `rx="10" stroke="${OD}" stroke-width="6"`) + [0, 1, 2].map(i => R(-44 + i * 32, -300, 14, 90, '#c0c8d0')).join(''), 'translate(540 1000) scale(2.2)') + KNIFE(480, lp(1100, 640, k), 1.8, -80) + (k > 0.9 ? SPARK(t, 480, 450, 6, 120, '#fff') : ''); }, 0);
  /* 50 */
  q(271, 278, { z0: 1, z1: 1, shk: 0.6 }, (t, lt, Pf, d) => { const px = lp(100, 900, ez(lt / d)); return SIDEH(Pf, t, { bg: '#06080e' }) + DIMM(0.35) + G(RAFB({ view: 's', t, walk: 1, creep: 1, ph: px * 0.04, arms: 'hold', hold: KNIFE(0, 0, 0.3, -80), worry: 0.8 }, 0, 0, 1), `translate(${f1(px)} 1680) scale(1.5)`); }, 0);
  /* 51 */
  q(278, 282, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const pn = (y, h, inner, nm) => `<g>` + R(0, y, 1080, h, '#080c14') + inner + TXE(nm, 540, y + h - 50, 60, lt - 0.1, '#cfe4f4', { stroke: '#000' }) + R(0, y + h - 6, 1080, 8, '#000') + `</g>`; const a = ez(lt / 0.2), b = ez((lt - 0.35) / 0.2), cc = ez((lt - 0.7) / 0.2); return BIG('#000') + G(pn(0, 640, R(100, 300, 500, 200, '#2a4a64', 'rx="20"') + R(100, 220, 80, 280, '#1a2a3e') + R(700, 100, 200, 360, '#0a1424') + WINF(700, 100, 200, 360, 'night'), 'QUARTO'), `translate(${f1((1 - a) * -1080)} 0)`) + G(pn(640, 640, R(300, 800, 480, 340, '#d8e4ec', 'rx="50"') + R(120, 700, 200, 440, '#1a2a3e') + R(850, 700, 120, 440, '#0f1c2e'), 'BANHEIRO'), `translate(${f1((1 - b) * 1080)} 0)`) + G(pn(1280, 640, [0, 1, 2, 3, 4, 5].map(i => R(120 + i * 150, 1330, 90, 440, ['#6a3a3a', '#3a4a6a', '#3a6a4a'][i % 3])).join(''), 'CLOSET'), `translate(${f1((1 - cc) * -1080)} 0)`) + DIMM(0.2); }, 0);
  /* 52 */
  q(282, 287, { z0: 1, z1: 1.15, x0: 540, x1: 540, y0: 1100, y1: 1000, shk: 0.6 }, (t, lt, Pf, d) => FLAT(RM(Pf, t, { lit: 0.35, tv: { k: 'show', gl: 0.9 }, lamp: 0 })) + RAFB({ view: 'b', t, arms: 'hold', hold: KNIFE(0, 0, 0.3, -80) }, 340, 1740, 1.5) + DIMM(0.1), 0);
  /* 53 */
  q(287, 294, { z0: 1, z1: 1.2, shk: 1.5 }, (t, lt, Pf, d) => { const on = lt > 0.8; return BIG('#04060a') + TVS(Pf, t, 540, 860, 860, 520, { k: on ? 'static' : 'off', gl: 0.9 }) + (on ? '' : '') + RAFB({ view: 'b', t }, 220, 1900, 1.8) + (lt > 0.78 && lt < 0.9 ? R(0, 0, 1080, 1920, '#fff', OP(0.6)) : ''); }, '#fff');
  /* 54 */
  q(294, 303, { z0: 1, z1: 1.15, shk: 1 }, (t, lt, Pf, d) => { const ct = G(FLAT(RM(Pf, t, { lit: 1, tv: { k: 'off' } })), 'scale(0.667) translate(-540 -1150)'); return BIG('#030405') + CCTV(Pf, t, 540, 960, 1.45, { content: ct, time: '23:40:12', cam: 'SALA', glitch: true }); }, 0);
  /* 55 */
  q(303, 311, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const u = ez(lt / d); return BIG('#05070b') + glow(Pf, 'R', 120, 220, 600, 0.3) + P(`M130,230 L${f1(lp(400, 560, u))},1180 L${f1(lp(740, 640, u))},1180Z`, '#6aff9a', OP(0.1)) + CAMH(130, 230, 3.2, t) + RAF(t, { eye: 1, worry: 0.7, ly: -0.6, lx: -0.6, rim: GN }, 560, 1250, 2.0) + TXE('?', 780, 420, 260, lt - 0.6, RD, { stroke: '#000' }) + TXE('QUE ÂNGULO É ESSE?', 540, 1700, 60, lt - 1.5, '#9ac4dc', { stroke: '#000' }); }, 0);
  /* 56 */
  q(311, 320, { z0: 1, z1: 1.12, shk: 1 }, (t, lt, Pf, d) => { const ct = BIG('#0a120e') + R(-360, 80, 720, 400, '#0d1a14') + E(0, 150, 300, 70, '#000', OP(0.4)) + G(RAFB({ view: 'f', t, worry: 0.4 }, 0, 0, 1), 'translate(0 240) scale(0.62)'); return BIG('#030405') + CCTV(Pf, t, 540, 960, 1.5, { content: ct, time: '23:40:31', cam: 'SALA', glitch: true }); }, 0);
  /* 57 */
  q(320, 326, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const o = { eye: 1.1, worry: 0.7, ly: 0.2, trem: 0.3 }; return BIG('#05070b') + R(0, 0, 540, 1920, '#0a1018') + RAF(t, Object.assign({ rim: CY }, o), 270, 960, 1.9) + R(540, 0, 540, 1920, '#06100a') + G(RAF(t, Object.assign({ rim: GN }, o), 0, 0, 1.9), `translate(810 960)`) + R(540, 0, 540, 1920, GN, OP(0.12)) + R(536, 0, 8, 1920, '#fff') + TXE('REAL', 270, 400, 70, lt - 0.1, CY, { stroke: '#000' }) + TXE('TV', 810, 400, 70, lt - 0.1, GN, { stroke: '#000' }) + (Math.sin(t * 29) > 0.8 ? R(540, 600 + 400 * Math.sin(t), 540, 24, GN, OP(0.4)) : ''); }, 0);
  /* 58 */
  q(326, 335, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const a = ez((lt - 1.4) / 0.5), gl = Math.sin(lt * 30) > 0.7 && lt > 1.3 ? 14 : 0; const ct = BIG('#0a120e') + R(-360, 80, 720, 400, '#0d1a14') + G(RAFB({ view: 'b', t, worry: 0.4 }, 0, 0, 1), 'translate(-40 240) scale(0.62)') + G(STRANGER(0, 0, 0.5, t, { rim: GN }), `translate(${40 + gl} 260)`, OP(a)); return BIG('#030405') + CCTV(Pf, t, 540, 960, 1.5, { content: ct, time: '23:40:48', cam: 'SALA', glitch: lt > 1.3 }) + R(0, 0, 1080, 1920, RD, OP(0.2 * a)); }, RD);
  /* 59 */
  q(335, 339, { z0: 1, z1: 1.2, shk: 3 }, (t, lt, Pf, d) => { const w = ez(lt / 0.35), x = lp(300, 780, w); let s = BIG('#07090e') + glow(Pf, 'B', 540, 900, 800, 0.3); for (let i = 0; i < 6; i++) s += R(0, 300 + i * 220, 1080, 8, '#fff', OP(0.18 * (1 - w))); return s + RAF(t, { eye: 1.3, worry: 0.8, lx: lp(-0.9, 0.9, w), tilt: lp(-10, 6, w), rim: CY }, x, 960, 2.8); }, 0);
  /* 60 */
  q(339, 343, { z0: 1.0, z1: 1.2, x0: 400, x1: 480, y0: 1000, y1: 900, shk: 0.8 }, (t, lt, Pf, d) => FLAT(RM(Pf, t, { lit: 0.4, tv: { k: 'cam', c: BIG('#0a120e') + G(STRANGER(0, 0, 0.35, t, { rim: GN }), 'translate(0 120)') } , lamp: 0 })) + RAFB({ view: 'f', t, worry: 0.8, eye: 1.2 }, 760, 1750, 1.4) + DIMM(0.1), 0);
  /* 61 */
  q(343, 348, { z0: 1, z1: 1.1, shk: 2 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 1200, 900, 0.4) + RAF(t, { eye: 1.4, worry: 1, sweat: 1, trem: 0.7, ly: 0.5, rim: CY }, 540, 520, 1.7) + PHN(Pf, t, 540, 1360, 1.2, { k: 'call', name: 'EU', nsz: 150, sub: 'MEU NÚMERO', vib: 1.2 }) + RING(t, 540, 1360, CY, 3, 480, 6), CY);
  /* 62 */
  q(348, 351, { z0: 1, z1: 1.3, shk: 1 }, (t, lt, Pf, d) => BIG('#05070b') + glow(Pf, 'B', 540, 960, 900, 0.35) + PHN(Pf, t, 540, 960, 1.6, { k: 'call', name: 'EU', nsz: 150, sub: 'ERA VOCÊ', ssz: 54, scol: RD, face: G(RAF(t, { eye: 1.1, worry: 0.6, rim: CY }, 0, 0, 0.32), 'translate(0 -190)') }), CY);
  /* 63 */
  q(351, 357, { z0: 1, z1: 1.12, shk: 1.5 }, (t, lt, Pf, d) => BIG('#0a0508') + glow(Pf, 'R', 540, 900, 900, 0.3) + RAF(t, { eye: 1.3, worry: 1, sweat: 1, trem: 0.5, lx: 0.5, rim: RD }, 540, 800, 2.6) + WAVE(Pf, t * 2, 540, 1560, 900, 160, RD) + rot(PHN(Pf, t, 930, 900, 0.55, { k: 'text', lines: [{ s: 'EU', y: 0, sz: 140 }] }), 14, 930, 900), RD);
  /* 64 */
  q(357, 367, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const m = ez(lt / (d - 1)); return BIG('#050810') + glow(Pf, 'R', 540, 960, 900, 0.2) + PLAN(Pf, t, 540, 900, 1.2, { dot: [lp(-340, -240, m), lp(-60, 200, m)], me: [-250, 260] }) + TXE('SAIA DAÍ', 540, 400, 160, lt - 0.1, RD, { stroke: '#000' }) + TXE('ALGUÉM NA CASA', 540, 1560, 90, lt - 2.5, '#fff', { stroke: '#000' }); }, RD);
  /* 65 */
  q(367, 373, { z0: 1, z1: 1.2, shk: 1 }, (t, lt, Pf, d) => { const m = 0.5 + 0.5 * Math.sin(t * 12); return BIG('#05070b') + glow(Pf, 'B', 540, 960, 900, 0.3) + RAF(t, { eye: 1.2, worry: 0.9, m: m * 0.6, sweat: 0.8, rim: CY }, 540, 960, 3.0) + TXE('QUEM?', 540, 330, 180, lt - 0.2, '#fff', { stroke: '#000' }); }, 0);
  /* 66 */
  q(373, 382, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const k = ez(lt / 3.5); return BIG('#05070b') + glow(Pf, 'B', 540, 1200, 900, 0.3) + RAFB({ view: 'f', t, arms: 'swing', crouch: k * 0.9, worry: 1, eye: lp(1.2, 0.7, k), lean: k * 5 }, 540, 1640 + k * 40, 1.6) + R(0, 0, 1080, 1920, '#000', OP(0.35 * k)); }, 0);
  /* 67 */
  q(382, 388, { z0: 1, z1: 1.1, shk: 1 }, (t, lt, Pf, d) => { const u = ez(lt / (d - 0.5)), mn = Math.floor(u * 20); return BIG('#05070b') + glow(Pf, 'A', 540, 840, 800, 0.25) + CLKN(t, 540, 840, 3.4, 11, mn) + TXE('+20 MIN', 540, 1480, 170, lt - 0.1, GD, { stroke: '#000' }) + TXE('EU', 540, 340, 180, lt - 1.8, RD, { stroke: '#000' }); }, GD);
  /* 68 */
  q(388, 395, { z0: 1, z1: 1, shk: 1 }, (t, lt, Pf, d) => { const lit = lt < 0.9 ? 1 : (lt < 1.4 ? (Math.sin(t * 40) > 0 ? 0.8 : 0.1) : 0), ph = lt > 1.3 ? ez((lt - 1.3) / 0.4) : 0; return FLAT(RM(Pf, t, { lit: Math.max(0.0, lit), lamp: lit > 0.5 ? 1 : 0 })) + RAFB({ view: 'f', t, worry: 0.7, eye: 1.2 }, 540, 1700, 1.5) + DIMM(0.8 * (1 - ph) + (lt >= 1.4 ? 0.2 : 0), '#000') + (ph ? glow(Pf, 'B', 540, 1300, 520, 0.7 * ph) : ''); }, 0);
}
