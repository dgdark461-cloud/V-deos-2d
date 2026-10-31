/* scenes_b.js - Halloween: 30.65 a 62.2 s */
const RULEC = (Pf, lt, n) => BIG(HC.night2) + glow(Pf, 'A', 540, 960, 900, 0.3) + G(R(-330, -440, 660, 880, '#2a1648', 'rx="44" stroke="' + HC.or + '" stroke-width="14"') + TXT(0, 140, String(n), 560, HC.or) + [0, 1, 2].map(i => C(-100 + i * 100, -330, 22, i < n ? HC.gr : '#3a2a5a')).join('') + P('M-120,-200 L-60,-120 L100,-290', 'none', 'stroke="' + HC.gr + '" stroke-width="0"'), `translate(540 960) scale(${f1(lp(0.4, 1, ez(k0(lt, 0, 0.3))))}) rotate(${f1(-8 * Math.exp(-lt * 6))})`);
const k0 = (t, a, b) => H.prog(t, a, b);
const RADAR = (t, x, y, col = HC.gr) => ringWaves(x, y, t, 0.9, 4, 700, col, 1, 8);
const MANSIL = (t, x, y, sc, o = {}) => G(silFigH(Object.assign({ t, view: 's', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
function partE(c) {
  const { add, tw, k, S } = c; const E_ = ez;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(34.9, 35.9); mb(60.5, 60.75); mb(60.9, 61.1); mb(62.0, 62.25);
  /* regra 1 */
  SN(30.65, 0.001, (t, lt, Pf) => CM(Pf, t, RULEC(Pf, lt, 1), lt, 0.7, { z0: 1.0, z1: 1.1, shk: 2 }) + PUNCH(lt, 0.8, HC.or2));
  SN(31.35, 0.001, (t, lt, Pf) => CM(Pf, t, BELLC(Pf, t, lt, 0.25), lt, 1.0, { z0: 1.0, z1: 1.35, shk: 2 }) + (lt > 0.25 ? PUNCH(lt - 0.25, 0.6, HC.or2) : ''));
  SN(32.4, 0.001, (t, lt, Pf) => CM(Pf, t, CLOCKH(t, 1) + glow(Pf, 'A', 540, 800, 700, 0.3), lt, 0.9, { z0: 1.5, z1: 0.95, r0: 5, r1: -2, y0: 800, y1: 800, shk: 3 }) + PUNCH(lt, 0.5, HC.or));
  SN(33.3, 0.001, (t, lt, Pf) => { const off = lt > 0.9; return CM(Pf, t, BIG('#2a1c3a') + glow(Pf, 'A', 540, 700, 900, off ? 0.0 : 0.5) + SWITCH(!off, 540, 960, 2.2) + (off ? BIG('#000', 0.75) + glow(Pf, 'W', 540, 960, 400, 0.0) : ''), lt, 1.6, { z0: 1.0, z1: 1.3, shk: off ? 8 : 1 }) + (off ? PUNCH(lt - 0.9, 0.7, '#000') : ''); });
  SN(34.9, 0.001, (t, lt, Pf) => { const sc = 1.3, dist = RUN_CYCLE * sc * 0.55 * lt; return CM(Pf, t, BIG('#07050d') + R(-300, 1500, 1680, 700, '#0e0818') + [0, 1, 2, 3].map(i => { const x = ((i * 600 - dist * 1.3) % 2400 + 2400) % 2400 - 500; return R(x, 400, 260, 1100, '#120a22') + R(x + 40, 520, 180, 300, '#1c1030'); }).join('') + glow(Pf, 'W', 900, 400, 500, 0.12) + MANSIL(t, 540, 1500, sc, { run: 1, walk: dist / (RUN_CYCLE * sc) }), lt, 1.0, { z0: 1.05, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.3, '#000'); });
  SN(35.9, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#0e0818', 0.08, 900, 300) + DV({ eye: 1.25, worry: 0.9, mouth: 0, tremble: 1.2, t, sweat: 0.8, lookx: 0.5 }, 540, 880, 1.55), lt, 1.4, { z0: 1.0, z1: 1.4, shk: 1.5 }) + PUNCH(lt, 0.4));
  SN(37.3, 0.001, (t, lt, Pf) => { const u = E_(k(lt, 0, 1.7)); return CM(Pf, t, WIN(Pf, t, 0.3) + MANSIL(t, 540 - 40 * u, 1500, 1.2 - 0.3 * u, { walk: lt * 0.9, flip: -1, idle: 0 }), lt, 1.7, { z0: 1.0, z1: 0.9, shk: 1.5 }) + PUNCH(lt, 0.4); });
  /* regra 2 */
  SN(39.0, 0.001, (t, lt, Pf) => CM(Pf, t, RULEC(Pf, lt, 2), lt, 0.7, { z0: 1.0, z1: 1.1, shk: 2 }) + PUNCH(lt, 0.8, HC.or2));
  SN(39.8, 0.001, (t, lt, Pf) => CM(Pf, t, WALLBG(Pf, '#0e0818', 0.15, 900, 300) + DV({ eye: 1.0, worry: 0.5, mouth: 0.6, t, lookx: 0.6 }, 540, 880, 1.55), lt, 0.8, { z0: 1.0, z1: 1.35, shk: 1.5 }) + PUNCH(lt, 0.4));
  SN(40.6, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0e0818') + questionMarks(t, 540, 900, 420, 8, HC.or) + REDX(E_(k(lt, 0.3, 0.7)), 540, 900, 260), lt, 0.9, { z0: 0.9, z1: 1.3, shk: 3 }) + PUNCH(lt, 0.5, HC.red));
  SN(41.7, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { gap: E_(k(lt, 0.3, 1)), lit: 0 }), lt, 1.2, { z0: 1.0, z1: 1.5, x0: 540, x1: 520, y0: 1200, y1: 1450, shk: 2 }) + PUNCH(lt, 0.4, HC.gr));
  SN(42.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07050d') + glow(Pf, 'W', 540, 960, 600, 0.0) + GHOSTK(Pf, t, 540, 1650, 1.7, { sway: 2 }) + BIG('#000', 0.15), lt, 1.1, { z0: 1.0, z1: 1.4, y0: 1000, y1: 900, shk: 2, r0: 0, r1: 3 }) + PUNCH(lt, 0.4, HC.gr));
  SN(44.0, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07050d') + G(GHOSTK(Pf, t, 0, 0, 1, { bucket: 0 }), `translate(540 1500) scale(2.4) rotate(${f1(14 * Math.sin(t * 2))})`), lt, 0.9, { z0: 1.0, z1: 1.3, y0: 960, y1: 800, shk: 3 }) + PUNCH(lt, 0.5, HC.gr));
  SN(44.9, 0.001, (t, lt, Pf) => CM(Pf, t, LIVN(Pf, t, { lights: 0 }) + RADAR(t - 44.9, 120, 1000), lt, 1.3, { z0: 1.0, z1: 1.2, shk: 1.5 }) + PUNCH(lt, 0.4, HC.gr));
  SN(46.2, 0.001, (t, lt, Pf) => CM(Pf, t, LIVN(Pf, t, { lights: 0 }) + RADAR(t - 46.2, 120, 1000) + MANSIL(t, 760, 1380, 1.4) + (lt > 0.5 ? G(C(0, 0, 60, 'none', 'stroke="' + HC.red + '" stroke-width="10"') + C(0, 0, 14, HC.red) + L(-90, 0, 90, 0, HC.red, 6) + L(0, -90, 0, 90, HC.red, 6), `translate(760 1100) scale(${f1(1 + 0.15 * Math.sin(t * 14))})`) : ''), lt, 1.3, { z0: 1.0, z1: 1.3, x0: 540, x1: 700, y0: 960, y1: 1150, shk: 2 }) + PUNCH(lt, 0.4, HC.red));
  /* regra 3 */
  SN(47.5, 0.001, (t, lt, Pf) => CM(Pf, t, RULEC(Pf, lt, 3), lt, 0.7, { z0: 1.0, z1: 1.1, shk: 2 }) + PUNCH(lt, 0.8, HC.or2));
  SN(48.3, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { scratch: E_(k(lt, 0.3, 1.8)), knock: 0, lit: 0 }), lt, 1.9, { z0: 1.0, z1: 1.45, x0: 520, x1: 480, y0: 960, y1: 900, shk: 3 }) + PUNCH(lt, 0.4));
  SN(50.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0612') + phoneFrame(Pf, 540, 960, 2.4, R(-114, -234, 228, 468, '#10202e') + TXT(0, -150, '00:14', 70, '#f0f4fa') + TXT(0, -100, '5%', 30, HC.red) + R(-90, 160, 180, 40, '#2a3a4a', 'rx="20"'), { t, bg: '#10202e', shake: 1 }), lt, 0.9, { z0: 1.5, z1: 1.0, shk: 2 }) + PUNCH(lt, 0.5));
  SN(51.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0612') + G(R(-90, -170, 180, 130, '#e8e8f0', 'rx="22"') + R(-60, -40, 120, 190, '#c8c8d8', 'rx="18"') + P('M-50,-170 L-90,-290 L90,-290 L50,-170Z', '#ffe08a') + glow(Pf, 'A', 0, -250, 400, 0.6), 'translate(540 960) scale(1.8)') + REDX(E_(k(lt, 0.2, 0.6)), 540, 960, 330), lt, 1.2, { z0: 1.0, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.5, HC.red));
  SN(52.3, 0.001, (t, lt, Pf) => CM(Pf, t, DOORH(Pf, t, { gap: 1, lit: 0 }) + G(P('M-160,0 L160,0 L400,500 L-400,500Z', '#ffe08a', OP(0.3)), 'translate(540 1640)'), lt, 1.0, { z0: 1.3, z1: 1.7, x0: 540, x1: 540, y0: 1450, y1: 1500, shk: 2 }) + PUNCH(lt, 0.4, HC.or2));
  SN(53.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0612') + R(-300, 1400, 1680, 600, '#3a2a30') + P('M300,1400 L780,1400 L1000,1950 L80,1950Z', '#ffe08a', OP(0.25)) + G(GHOSTK(Pf, t, 0, 0, 1, { bucket: 0, glow: 1 }), `translate(540 ${f1(1700 - 280 * E_(k(lt, 0, 1.2)))}) scale(1.2)`), lt, 1.4, { z0: 1.0, z1: 1.3, shk: 2.5 }) + PUNCH(lt, 0.4, HC.gr));
  /* 54.96 coracao */
  SN(54.96, 0.001, (t, lt, Pf) => { const bt = Math.pow(Math.max(0, Math.sin(t * 9)), 6); return CM(Pf, t, BIG('#1a0508') + C(540, 960, 600, HC.red, OP(0.15 + 0.2 * bt)) + G(P('M0,200 C-300,-20 -200,-250 0,-100 C200,-250 300,-20 0,200Z', '#c01830') + P('M0,200 C-300,-20 -200,-250 0,-100', '#e03050', OP(0.4)), `translate(540 960) scale(${f1(2.2 + 0.35 * bt)})`), lt, 1.4, { z0: 1.0, z1: 1.3, shk: 1 + 4 * bt }) + PUNCH(lt, 0.4, HC.red); });
  SN(56.35, 0.001, (t, lt, Pf) => CM(Pf, t, LIVN(Pf, t, { lights: 0 }) + MANSIL(t, 600, 1360, 1.5, { idle: 1 }) + P('M20,0 L420,0 L700,1400 L-100,1400Z', HC.moon, OP(0.05)), lt, 2.2, { z0: 1.0, z1: 1.5, x0: 540, x1: 600, y0: 960, y1: 1150, shk: 0.5 }) + PUNCH(lt, 0.3));
  SN(58.6, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(HC.night) + SKYH(Pf, t, { bats: 2 }) + R(-300, 1380, 1680, 800, '#0c0716') + R(300, 700, 480, 800, '#1a0e28') + G(GHOSTK(Pf, t, 0, 0, 1, { bucket: 1 }), 'translate(540 1500) scale(1.3)') + FOGL(t, 0.35, 1500), lt, 1.4, { z0: 1.0, z1: 1.3, shk: 1 }) + PUNCH(lt, 0.4));
  const KN = (s0, n) => SN(s0, 0.001, (t, lt, Pf) => { const kk = n.filter(x => lt >= x).length; const last = n.length ? lt - Math.max(...n.filter(x => lt >= x), -9) : 9; return CM(Pf, t, DOORH(Pf, t, { knock: last < 0.12 ? 1 : 0, lit: 0 }) + [0, 1, 2].map(i => C(380 + i * 160, 300, 44, i < kk ? HC.or : '#2a1648', i < kk ? '' : 'stroke="#ff8a1f" stroke-width="6"') ).join(''), lt, 1.0, { z0: 1.0, z1: 1.15, shk: 1 + 6 * Math.exp(-last * 10) }) + (last < 0.1 ? PUNCH(last, 0.5) : ''); });
  KN(60.0, []);
  KN(60.5, [0.0, 0.25, 0.5]);
  SN(61.35, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#000') + glow(Pf, 'G', 0, 0, 0, 0) + C(540, 960, 40, HC.or2, OP(0.8)), lt, 0.5, { z0: 1.0, z1: 1.0, shk: 0 }));
  KN(61.84, [0.0, 0.1, 0.2]);
}
