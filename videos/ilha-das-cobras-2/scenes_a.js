/* scenes_a.js - Ilha das Cobras 2: 0 a 50.6 s */
const BGN = (Pf, t) => BIG('#07141a') + glow(Pf, 'B', 300, 500, 900, 0.22) + treesI(Pf, t, -300, 1400, 1150, 520, '#08201c', '#103a30') + R(-300, 1150, 1680, 1200, '#0a1618');
const BGW = (Pf, g = 0.5) => BIG('#1a120c') + R(-300, 1300, 1680, 800, '#120c08') + glow(Pf, 'A', 700, 600, 900, g);
const BGD = Pf => BIG('#05090c') + glow(Pf, 'B', 540, 700, 800, 0.08);
const FC = (fn, o, bg, x = 540, y = 880, sc = 1.55) => bg + fn(o, x, y, sc);
const LANT = (Pf, t, x = 880, y = 1380, sc = 1.7, on = 1) => lanternObj(Pf, { x, y, scale: sc, on, sw: 5 * Math.sin(t * 2.2) });
const HAND2 = (x, y, sc, rot, col = '#c7966f', point = 0) => G(R(-40, 0, 80, 300, col, 'rx="30"') + E(0, -10, 56, 70, col) + (point ? R(-14, -150, 28, 150, col, 'rx="14"') : [-30, -10, 10, 30].map((q, i) => R(q - 10, -70 - 6 * (i % 2), 20, 70, col, 'rx="10"')).join('')) + R(-44, 240, 88, 70, '#35503c'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const TALLY = (n, x, y, sc) => { let s = ''; for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), r = i % 5, bx = g * 150; s += r < 4 ? L(bx + r * 28, 0, bx + r * 28, 100, '#d8c8a0', 9) : L(bx - 14, 90, bx + 108, 10, '#d8c8a0', 9); } return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const figP = (over, a) => { const sv = Object.assign({}, HK); Object.assign(HK, over); try { return hikerFig(Object.assign({ bag: 0, hair: 0 }, a)); } finally { Object.assign(HK, sv); } };
const ANDF = a => figP({ jacket: '#35503c', jacketDk: '#223828', jacketLt: '#4a6a50', shirt: '#7a6a3a', pants: '#2a2a22', pantsDk: '#1a1a14', boot: '#2a1c14', bootDk: '#1a100a', skin: '#c7966f', skinDk: '#8c6244', hair: '#2a2018', cap: '#2a3a30', capDk: '#1a2820', capLt: '#3a5040' }, Object.assign({ cap: 1, hair: 0 }, a));
const RESF = a => figP({ jacket: '#e8641c', jacketDk: '#b04a10', jacketLt: '#ff8a40', shirt: '#f2f2ea', pants: '#1f2a3a', pantsDk: '#141c28', boot: '#1a1a1a', bootDk: '#0a0a0a', skin: '#e8b890', skinDk: '#b4805e', hair: '#3a2a1c', cap: 1, capDk: '#b04a10', capLt: '#ff8a40' }, a);
const GRND = (Pf, t, dist, y = 1500) => BGN(Pf, t) + G(treesI(Pf, t, -900, 2000, 1100, 560, '#071a18', '#0e3028'), `translate(${f1(-(dist * 0.25) % 600)} 0)`) + R(-300, y - 40, 1680, 800, '#0e1c1c') + [0, 1, 2, 3, 4, 5].map(i => { const x = ((i * 380 - dist) % 2400 + 2400) % 2400 - 500; return rockI(x, y + 30 + 30 * hz(i, 3), 200 + 80 * hz(i, 4), 60 + 30 * hz(i, 5), i + 7, '#1a2a2e'); }).join('');
const WALKS = (Pf, t, lt, o = {}) => { const sc = o.sc || 1.3, cps = o.cps || 0.6, dist = WALK_CYCLE * sc * cps * lt, hx = o.hx || 540, gy = o.gy || 1530; return GRND(Pf, t, dist, gy) + (o.snakes ? [0, 1, 2].map(i => snakeCrawl(-300 + 400 * i - (lt * 60) % 100, gy + 60 + 30 * i, 1500, gy + 60 + 30 * i, ez(lt / 2) + 0.4, t + i, 22, { len: 360 })).join('') : '') + E(hx, gy + 6, 150 * sc, 16 * sc, 'rgba(0,0,0,0.5)') + G((o.fig || ANDF)({ t, walk: dist / (WALK_CYCLE * sc), view: 's', stride: 1, flip: o.flip || 1, scared: 0 }), `translate(${f1(hx)} ${f1(gy)}) scale(${sc})`) + (o.lant ? lanternObj(Pf, { x: hx + 90 * sc * (o.flip || 1), y: gy - 300 * sc, scale: 0.9, on: 1, sw: 8 * Math.sin(t * 5) }) : ''); };
const HEART = (t, x, y, sc) => { const bt = Math.pow(Math.max(0, Math.sin(t * 9)), 6); return G(P('M0,200 C-300,-20 -200,-250 0,-100 C200,-250 300,-20 0,200Z', '#c01830') + P('M0,200 C-300,-20 -200,-250 0,-100', '#e03050', OP(0.4)), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc * (1 + 0.16 * bt))})`); };
function partD(c) {
  const { add, tw, k, S } = c; const E_ = ez;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(0, 0.5); mb(17.3, 19.0); mb(36.9, 38.5); mb(48.6, 49.9); mb(31.2, 31.5);
  const sh = (s0, dur, o, fn, pf) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + (pf === 0 ? '' : PUNCH(lt, pf === undefined ? 0.4 : pf, typeof pf === 'string' ? pf : '#fff')));
  /* 0-4.1 gancho 2.5D */
  SN(0, 0.001, (t, lt, Pf) => PARS(Pf, t, lt, 1.6, FOC(540, 1050, 1.0), FOC(540, 1050, 1.2), [
    { d: 0.1, svg: skyI(Pf, t, 800, 'night', { clouds: 2 }) + moon(Pf, 800, 360, 80) }, { d: 0.35, svg: seaI(Pf, t, 1000, 0.6, { n: 3, c1: '#1a3a50', span: 300 }) },
    { d: 0.8, svg: R(-300, 1300, 1680, 800, '#0a1618') + treesI(Pf, t, -200, 1300, 1300, 380, '#08201c', '#103a30'), fog: 0.2, fogc: '#1a3040' },
    { d: 1.5, svg: glow(Pf, 'A', 540, 1100, 560, 0.45) + snakeHeadFront(540, 1250, 2.8, { tongue: 0.5 + 0.5 * Math.sin(t * 9) }) }]) + PUNCH(lt, 0.8));
  sh(1.6, 1.1, { z0: 1.5, z1: 1.0, shk: 2 }, (t, lt, Pf) => skyI(Pf, t, 1000, 'night', { clouds: 3 }) + seaI(Pf, t, 1150, 0.7, { n: 4, c1: '#1a3a50', span: 400 }) + G(P('M-520,0 Q-380,-120 -220,-170 Q-60,-260 80,-230 Q300,-200 420,-90 Q520,-40 560,0Z', '#10261f') + treesI(Pf, t, -400, 400, -140, 120, '#0b2a22', '#1a4a38'), 'translate(540 1160)') + lighthouseObj(Pf, 600, 1060, 0.9, 1, t));
  sh(2.6, 0.9, { z0: 1.0, z1: 1.25, shk: 3 }, (t, lt, Pf) => BGN(Pf, t) + snakeCoil(540, 1450, 2.4, t, { raise: 160 }) + glow(Pf, 'A', 540, 1100, 500, 0.2));
  sh(3.5, 0.6, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => BGN(Pf, t) + branchObj(100, 400, 900, 1.2) + snakeHang(540, 400, 700, t, 40) + eyesPair(Pf, 540, 1100, 1.2, '#ffd35a', 0.9), 0.5);
  /* 4.1 homem na cabana */
  sh(4.1, 1.6, { z0: 1.0, z1: 1.35, y0: 1000, y1: 1100, shk: 1.5 }, (t, lt, Pf) => BGN(Pf, t) + hutObj(Pf, { x: 540, y: 1350, sc: 1.8, door: 0.7, lit: 0.8, t }) + G(ANDF({ t, walk: 0.1, view: 'f', idle: 1 }), 'translate(700 1330) scale(0.8)') + lanternObj(Pf, { x: 800, y: 1150, scale: 0.9, on: 1, sw: 6 * Math.sin(t * 2) }), 0.7);
  sh(5.7, 1.1, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => FC(AND, { eye: 1, worry: 0.1, anger: 0.2, t, lookx: -0.3 }, BGW(Pf, 0.4)) + LANT(Pf, t));
  sh(6.8, 0.8, { z0: 1.0, z1: 1.5, y0: 1000, y1: 1180, shk: 1 }, (t, lt, Pf) => BGN(Pf, t) + hutObj(Pf, { x: 540, y: 1400, sc: 2.0, door: 0.4, lit: 0.9, t }), 0.4);
  sh(7.4, 1.0, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => FC(LU, { eye: 1.1, worry: 0.6, lookx: 0.4, t, sweat: 0.3 }, BGN(Pf, t)));
  sh(8.4, 1.3, { z0: 1.2, z1: 1.0, shk: 2.5 }, (t, lt, Pf) => skyI(Pf, t, 1000, 'night', { clouds: 3 }) + seaI(Pf, t, 1000, 1, { n: 4, c1: '#1a3a50', span: 400 }) + boatObj(Pf, t, 400 + 200 * lt, 1180 + 14 * Math.sin(t * 2), 1.0, 4 * Math.sin(t * 1.6), 1));
  sh(9.7, 1.1, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => BGD(Pf) + G(P('M-520,0 Q-380,-120 -220,-170 Q-60,-260 80,-230 Q300,-200 420,-90 Q520,-40 560,0Z', '#08150f') + treesI(Pf, t, -400, 400, -140, 120, '#07130f', '#0e2a20'), 'translate(540 1200) scale(1.3)') + seaI(Pf, t, 1220, 0.6, { n: 3, c1: '#0e2a38', span: 300 }));
  sh(10.8, 0.5, { z0: 1.0, z1: 1.6, shk: 5 }, (t, lt, Pf) => BGD(Pf) + eyesPair(Pf, 540, 900, 1.5, '#ffd35a', 1) + G(P('M-60,300 L-40,-20 Q0,-60 40,-20 L60,300Z', '#020406'), 'translate(540 1000) scale(1.4)'), 0.8);
  /* 11.3 paralisado */
  sh(11.3, 1.5, { z0: 1.0, z1: 1.45, shk: 1 }, (t, lt, Pf) => FC(LU, { eye: 1.25, worry: 0.8, tremble: 0.6, t, sweat: 0.5, lookx: 0.5 }, BGN(Pf, t)), 0.5);
  sh(12.8, 1.4, { z0: 1.0, z1: 1.8, x0: 540, x1: 700, y0: 1000, y1: 1200, shk: 2 }, (t, lt, Pf) => BGN(Pf, t) + hutObj(Pf, { x: 760, y: 1350, sc: 1.1, door: 0.8, lit: 0.7, t }) + G(ANDF({ t, view: 'f', idle: 1 }), 'translate(700 1335) scale(0.7)') + lanternObj(Pf, { x: 640, y: 1190, scale: 0.7, on: 1, sw: 5 * Math.sin(t * 2) }));
  sh(14.2, 0.9, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => FC(AND, { eye: 0.9, worry: 0.2, t, sweat: 0.9, wet: 1, lookx: -0.2 }, BGN(Pf, t)) + [0, 1, 2, 3, 4].map(i => { const u = (t * 1.2 + i * 0.2) % 1; return E(300 + 120 * i, 600 + 700 * u, 6, 14, '#9ac0d8', OP(0.7 * (1 - u))); }).join(''));
  sh(15.1, 1.0, { z0: 1.2, z1: 1.8, x0: 540, x1: 540, y0: 1300, y1: 1400, shk: 1.5 }, (t, lt, Pf) => BGW(Pf, 0.3) + AND({ eye: 1, t }, 540, 880, 1.55) + R(0, 1100, 1080, 400, '#000', OP(0)));
  sh(16.1, 1.2, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BGD(Pf) + lanternObj(Pf, { x: 540, y: 1000, scale: 3.2, on: 1, sw: 10 * Math.sin(t * 2.5) }) + glow(Pf, 'A', 540, 1000, 800, 0.4));
  /* 17.3 caminha sem medo */
  SN(17.3, 0.001, (t, lt, Pf) => CM(Pf, t, WALKS(Pf, t, lt, { snakes: 1, lant: 1, cps: 0.5 }), lt, 1.7, { z0: 1.05, z1: 1.2, y0: 1100, y1: 1200, shk: 1.5 }) + PUNCH(lt, 0.4));
  sh(19.0, 0.8, { z0: 1.0, z1: 1.4, y0: 1300, y1: 1450, shk: 3 }, (t, lt, Pf) => GRND(Pf, t, 100 * lt, 1500) + [0, 1, 2].map(i => snakeCrawl(-300, 1560 + 40 * i, 1500, 1560 + 40 * i, ez(lt / 0.8) + 0.5, t + i, 30, { len: 420 })).join('') + R(430, 700, 150, 900, '#2a3548') + R(690, 700, 150, 900, '#2a3548') + BOOT(500, 1590, 1.8) + BOOT(760, 1600, 1.8), 0.5);
  /* 19.8 olha para voce */
  sh(19.8, 1.6, { z0: 1.0, z1: 1.35, shk: 1.2 }, (t, lt, Pf) => FC(AND, { eye: 1, worry: 0, anger: 0.3, t, lookx: lp(-0.8, 0, ez(lt / 0.6)) }, BGN(Pf, t), 540 - 60 * (1 - ez(lt / 0.8)), 880, 1.55) + LANT(Pf, t), 0.4);
  sh(21.4, 0.6, { z0: 1.3, z1: 2.4, y0: 760, y1: 700, shk: 2 }, (t, lt, Pf) => FC(AND, { eye: 1.15, anger: 0.4, t }, BGD(Pf)), 0.5);
  sh(22.0, 1.1, { z0: 1.6, z1: 1.9, y0: 900, y1: 900, shk: 1 }, (t, lt, Pf) => FC(AND, { eye: 1, anger: 0.3, t, mouth: DLG(t, 22.0, 23.0) }, BGW(Pf, 0.3)) + LANT(Pf, t), 0.5);
  sh(23.1, 1.0, { z0: 1.0, z1: 1.2, shk: 3 }, (t, lt, Pf) => BGD(Pf) + FC(LU, { eye: 1.3, worry: 1, t, tremble: 1.5 }, '', 540, 700, 1.1) + HEART(t, 540, 1400, 0.8) + ecgLine(100, 1650, 880, t, 140, 0.9, 120, '#ff4a4a'), 0.5);
  sh(24.1, 1.4, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => FC(LU, { eye: 1, worry: 0.7, lookx: -0.6, looky: 0.2, t, mouth: 0 }, BGN(Pf, t)));
  sh(25.5, 1.2, { z0: 1.5, z1: 1.0, shk: 2 }, (t, lt, Pf) => BGN(Pf, t) + R(-300, 1300, 1680, 800, '#0e1c1c') + backpackObj(540, 1500, 1.8, 0, t));
  sh(26.7, 1.4, { z0: 1.0, z1: 1.4, y0: 960, y1: 1080, shk: 2 }, (t, lt, Pf) => forest(Pf, t, {}) + BIG('#06121a', 0.7));
  /* 28.1 antes que responda */
  sh(28.1, 1.3, { z0: 1.0, z1: 1.25, shk: 2 }, (t, lt, Pf) => FC(LU, { eye: 1.1, worry: 0.6, mouth: 0.5, t, lookx: 0.3 }, BGN(Pf, t)));
  sh(29.4, 1.8, { z0: 1.0, z1: 1.2, shk: 1.5 }, (t, lt, Pf) => BGN(Pf, t) + AND({ eye: 1, anger: 0.3, looky: 0.8, t }, 540, 700, 1.3) + HAND2(780, 1500 - 400 * ez(lt / 0.4), 1.4, 170, '#c7966f', 1) + LANT(Pf, t, 230, 1400, 1.4));
  SN(31.2, 0.001, (t, lt, Pf) => CM(Pf, t, FC(AND, { eye: 1.2, anger: 0.6, t, mouth: DLG(t, 31.2, 31.9) }, BGW(Pf, 0.25)) + LANT(Pf, t), lt, 0.7, { z0: 1.0, z1: 1.6, shk: 5 }) + PUNCH(lt, 0.9, '#ffc15a'));
  /* 31.9 jararaca entre os pes */
  sh(31.9, 1.5, { z0: 1.0, z1: 1.6, y0: 1100, y1: 1200, shk: 2 }, (t, lt, Pf) => BGN(Pf, t) + R(-300, 1250, 1680, 800, '#0e1c1c') + snakeHeadFront(540, 1350, 2.4, { tongue: 0.5 + 0.5 * Math.sin(t * 9) }), 0.6);
  SN(33.4, 0.001, (t, lt, Pf) => CM(Pf, t, GRND(Pf, t, 0, 1450) + R(-300, 1450, 1680, 800, '#0e1c1c') + R(330, 600, 160, 1000, '#2a3548') + R(680, 600, 160, 1000, '#2a3548') + BOOT(400, 1620, 2.0) + BOOT(760, 1620, 2.0, -1) + snakeCrawl(-200, 1600, 1500, 1600, ez(lt / 1.7) + 0.3, t, 34, { len: 520, amp: 18 }), lt, 1.8, { z0: 1.2, z1: 1.0, y0: 1300, y1: 1400, shk: 1.5 }) + PUNCH(lt, 0.5));
  sh(35.2, 1.7, { z0: 1.0, z1: 1.4, shk: 0.8 }, (t, lt, Pf) => FC(LU, { eye: 1.2, worry: 0.7, tremble: 0.9, t, sweat: 0.9, looky: 0.5 }, BGN(Pf, t)));
  SN(36.9, 0.001, (t, lt, Pf) => CM(Pf, t, WALKS(Pf, t, lt, { cps: 0.35, lant: 1, flip: -1, sc: 1.4 }), lt, 1.6, { z0: 1.0, z1: 1.15, shk: 1 }) + PUNCH(lt, 0.4));
  sh(38.5, 0.8, { z0: 1.2, z1: 1.5, shk: 2 }, (t, lt, Pf) => GRND(Pf, t, 0, 1500) + HAND2(560, 1500 - 120 * ez(lt / 0.5), 1.2, 180 + 8 * lt, '#c7966f') + branchObj(300, 1580, 600, 1.0));
  sh(39.3, 0.8, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => GRND(Pf, t, 0, 1450) + R(-300, 1450, 1680, 800, '#0e1c1c') + branchObj(200 + 500 * ez(lt / 0.4), 1500, 500, 1.0, 1) + snakeCrawl(400, 1580, 1500, 1520, ez((lt - 0.15) / 0.65) * 0.8 + 0.2, t * 3, 32, { len: 420, amp: 34 }), 0.5);
  sh(40.1, 1.9, { z0: 1.2, z1: 1.0, shk: 1 }, (t, lt, Pf) => forest(Pf, t, {}) + BIG('#06121a', 0.7) + snakeCrawl(100, 1450, 1000, 1450, ez(lt / 1.6) * 1.2 + 0.2, t, 26, { len: 380 }) + [0, 1, 2, 3, 4].map(i => E(700 + 60 * i, 1440 + 20 * (i % 2), 90, 26, '#17321f')).join(''));
  sh(42.0, 1.4, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => FC(AND, { eye: 1, worry: 0.1, t, lookx: lp(0.8, 0, ez(lt / 0.7)) }, BGN(Pf, t)) + LANT(Pf, t), 0.4);
  sh(43.4, 1.0, { z0: 1.5, z1: 1.8, y0: 880, y1: 900, shk: 0.8 }, (t, lt, Pf) => FC(AND, { eye: 1, anger: 0.1, t, mouth: DLG(t, 43.4, 44.3) }, BGW(Pf, 0.3)) + LANT(Pf, t), 0.4);
  sh(44.4, 1.4, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => BGW(Pf, 0.4) + R(100, 500, 880, 1000, '#2a1c12') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(100 + i * 110, 500, 6, 1000, '#140c06', OP(0.6))).join('') + TALLY(Math.min(11, 1 + Math.floor(lt * 9)), 200, 800, 1.7), 0.5);
  sh(45.8, 1.7, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => FC(LU, { eye: 1, worry: 0.5, mouth: DLG(t, 45.8, 47.2), t }, BGN(Pf, t)) + questionMarks(t, 540, 400, 300, 6, '#8fe0d0'));
  sh(47.5, 1.1, { z0: 1.4, z1: 1.2, shk: 0.8 }, (t, lt, Pf) => FC(AND, { eye: 0.8, anger: 0.2, worry: 0.3, t, lookx: -0.7, looky: 0.3 }, BGD(Pf)), 0.5);
  SN(48.6, 0.001, (t, lt, Pf) => CM(Pf, t, BGN(Pf, t) + hutObj(Pf, { x: 540, y: 1450, sc: 2.0, door: 0.7, lit: 0.9, t }) + G(ANDF({ t, walk: lt * 0.9, view: 'b', stride: 0.8 }), `translate(${f1(300 + 330 * ez(lt / 1.2))} 1460) scale(${f1(1.3 - 0.3 * ez(lt / 1.2))})`), lt, 1.3, { z0: 1.0, z1: 1.3, x0: 540, x1: 640, shk: 1.5 }) + PUNCH(lt, 0.4));
  SN(49.9, 0.001, (t, lt, Pf) => { const cl2 = ez(lt / 0.25); return CM(Pf, t, BGN(Pf, t) + G(doorObj(Pf, { x: 0, y: 0, sc: 1.6, t, light: 1 - cl2 }) , `translate(540 1500)`) + R(-300, 0, 1680, 2000, '#000', OP(0)), lt, 0.7, { z0: 1.0, z1: 1.1, shk: lt < 0.3 ? 6 : 1 }) + (lt > 0.22 ? PUNCH(lt - 0.22, 0.8) : ''); });
}
