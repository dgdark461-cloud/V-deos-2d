/* scenes_b.js - 66.1 a 113.5 s */
const INT = (Pf, col = '#0a0e12') => BIG(col) + R(-400, 1350, 1880, 800, '#10161c') + R(-400, 1344, 1880, 8, '#000', OP(0.4));
const HALL = (Pf, t, dist, gy = 1500, col = '#0a0e12') => { let s = BIG(col) + R(-300, gy, 1680, 900, '#10161c') + R(-300, gy - 4, 1680, 8, '#000', OP(0.4)); const base = Math.floor(dist / 380); for (let k = -1; k <= 4; k++) { const i = k + base, x = k * 380 - (dist - base * 380); s += R(x, gy - 900, 220, 900, '#141c24') + R(x + 220, gy - 900, 160, 900, '#0d131a') + R(x, gy - 900, 6, 900, '#222c36') + (hz(i, 5) > 0.6 ? R(x + 40, gy - 700, 140, 200, '#0a0f14') : ''); } return s; };
const gunObj = (x, y, sc, rot = 0) => G(R(-20, -40, 150, 46, '#15181e', 'rx="8"') + R(-6, -10, 44, 110, '#15181e', 'rx="8"') + R(120, -34, 50, 18, '#0a0c10') + L(-10, 30, 130, 30, '#2a2f38', 4), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const photoCard = (x, y, sc, rot, inner) => G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#0e1a22') + inner, `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);

function partE(c) {
  const { add, tw, k, E_, S } = c;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(66.1, 66.7); mb(80.5, 81.3); mb(90.1, 91.2); mb(99.4, 101.4); mb(101.4, 103.4);
  /* 66.1 "Ao chegar," ela anda de costas rumo à construção */
  SN(66.1, 0.001, (t, lt, Pf) => { return CM(Pf, t, FOREST(Pf, t, 0, { gy: 1500 }) + E(540, 1756, 150, 16, 'rgba(0,0,0,0.5)') + HERO(t, 540, 1750, 1.4, { view: 'b', walk: lt * 0.95 + 0.1, stride: 1 }), lt, 0.6, { z0: 1.0, z1: 1.1, y0: 1200, y1: 1300 }); });
  /* 66.7 construção abandonada */
  SN(66.7, 0.001, (t, lt, Pf) => { const u = ez(lt / 1.9); return CM(Pf, t, buildingExt(Pf, t) + treesI(Pf, t, -300, 300, 1500, 700, '#06120f', '#0c2018') + treesI(Pf, t, 780, 1400, 1500, 700, '#06120f', '#0c2018') + R(-500, 1500, 2080, 800, '#0a1410') + HERO(t, lp(250, 420, u), 1750, 0.55, { view: 'b', walk: lt * 0.95, stride: 1 }), lt, 1.9, { z0: 1.0, z1: 1.35, x0: 540, x1: 540, y0: 1250, y1: 1350 }); });
  SN(68.6, 0.001, (t, lt, Pf) => CM(Pf, t, FOREST(Pf, t, 400, { gy: 1500 }) + G(R(-380, -420, 760, 420, '#2a2e34') + R(-380, -420, 760, 30, '#1a1d22') + P('M-380,-420 L0,-560 L380,-420Z', '#1a1d22') + R(-60, -190, 120, 190, '#d8a24a', OP(0.35)), 'translate(860 1500) scale(0.8)') + glow(Pf, 'A', 860, 1400, 300, 0.4), lt, 1.0, { z0: 1.0, z1: 1.2, x0: 400, x1: 700, y0: 1100, y1: 1200 }));
  /* 69.6 a porta está aberta */
  SN(69.6, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07100f') + doorM(540, 1500, 1.9, 0.5 + 0.1 * ez(H.prog(lt, 0, 1))) + glow(Pf, 'A', 540, 1000, 600, 0.35), lt, 1.3, { z0: 1.0, z1: 1.4, y0: 1000, y1: 900, shk: 2 }) + PUNCH(lt, 0.2));
  /* 70.9 lá dentro: avança no escuro rumo à luz da TV */
  SN(70.9, 0.001, (t, lt, Pf) => CM(Pf, t, HALL(Pf, t, 220 * lt, 1500, '#070b0f') + glow(Pf, 'B', 540, 1000, 700, 0.35 + 0.1 * Math.sin(t * 17)), lt, 1.4, { z0: 1.0, z1: 1.3, shk: 4 }));
  SN(71.9, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + tvObj(Pf, t, 540, 960, 1.7, {}), lt, 0.4, { z0: 1.0, z1: 1.3, shk: 5 }) + PUNCH(lt, 0.3, '#8fb0d6'));
  /* 72.3 várias telas */
  SN(72.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + monitorGrid(Pf, t, 1) + glow(Pf, 'B', 540, 960, 700, 0.15), lt, 1.8, { z0: 1.0, z1: 1.3, x0: 700, x1: 400, y0: 700, y1: 1200 }));
  /* 74.1 dezenas de fotografias */
  SN(74.1, 0.001, (t, lt, Pf) => CM(Pf, t, photoWall(Pf, t, { crossed: 0 }), lt, 1.6, { z0: 1.0, z1: 1.2, x0: 300, x1: 800, y0: 500, y1: 1500, shk: 2 }));
  SN(75.7, 0.001, (t, lt, Pf) => CM(Pf, t, photoWall(Pf, t, { crossed: 0 }) + glow(Pf, 'A', 540, 900, 600, 0.2), lt, 1.9, { z0: 1.5, z1: 2.4, x0: 600, x1: 480, y0: 800, y1: 700, shk: 2 }));
  /* 77.6 reconhece alguns rostos */
  SN(77.6, 0.001, (t, lt, Pf) => CM(Pf, t, photoWall(Pf, t, { crossed: 0 }) + C(300 + 200 * Math.floor(lt * 1.5), 700, 140, 'none', 'stroke="#ffd35a" stroke-width="8"') + glow(Pf, 'A', 540, 700, 500, 0.3), lt, 1.7, { z0: 1.0, z1: 1.5, x0: 540, x1: 460, y0: 700, y1: 600 }) + PUNCH(lt, 0.2));
  /* 79.3 outros estão riscados */
  SN(79.3, 0.001, (t, lt, Pf) => { const u = ez(lt / 0.9); return CM(Pf, t, photoWall(Pf, t, { crossed: 0.7 * u }) + FB('#c92f2b', 0.08 * Math.sin(t * 9)), lt, 1.2, { z0: 1.2, z1: 1.0, shk: 4 }) + PUNCH(lt, 0.3, '#ff3b30'); });
  /* 80.5 no centro da sala, ela caminha até a mesa */
  SN(80.5, 0.001, (t, lt, Pf) => { const x = lp(100, 520, ez(lt / 0.9)); return CM(Pf, t, INT(Pf) + glow(Pf, 'A', 760, 1100, 600, 0.35) + G(R(-300, -30, 600, 30, '#4a3222') + L(-260, 0, -260, 260, '#3a281a', 20) + L(260, 0, 260, 260, '#3a281a', 20), 'translate(820 1450)') + E(x, 1756, 150, 16, 'rgba(0,0,0,0.5)') + HERO(t, x, 1750, 1.0, { view: 's', walk: x / (WALK_CYCLE * 1.0), stride: lt < 0.8 ? 1 : 0.0, scared: 0.3 }), lt, 0.9, { z0: 1.0, z1: 1.1, y0: 1200, y1: 1200 }); });
  SN(81.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.35) + G(R(-380, 0, 760, 40, '#4a3222') + R(-380, 40, 760, 600, '#2a1c12'), 'translate(540 1200)') + photoCard(340, 1060, 1.0, -5, '') + photoCard(740, 1060, 1.0, 5, ''), lt, 2.1, { z0: 1.0, z1: 1.35, y0: 1100, y1: 1080, shk: 2 }));
  SN(83.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.35) + photoCard(540, 960, 2.4, -3, G(manSil({ scale: 0.35, eyes: 1, col: '#02040a', t }), 'translate(0 80)') + MANEYES(Pf, 0, -62, 0.16, 0.9)), lt, 1.0, { z0: 1.0, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.3));
  SN(84.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + photoCard(540, 960, 2.4, 3, G(wolfHead({ t, glow: 1, calm: 1 }), 'translate(0 -10) scale(0.2)')), lt, 0.7, { z0: 1.0, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.3));
  /* 85.1 abaixo delas, uma pergunta */
  SN(85.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + G(R(-380, 0, 760, 40, '#4a3222') + R(-380, 40, 760, 600, '#2a1c12'), 'translate(540 400)') + G(R(-300, -210, 600, 420, '#ece6d6', 'rx="8"') + TXT(0, 80, '?', 360, '#1a1410'), 'translate(540 1450) rotate(-2)'), lt, 0.9, { z0: 1.0, z1: 1.0, y0: 600, y1: 1250, shk: 2 }));
  SN(86.0, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + TXT(540, 1100, '?', 900, 'rgba(232,238,248,0.7)'), lt, 0.8, { z0: 1.3, z1: 1.0, shk: 3 }) + PUNCH(lt, 0.3));
  SN(86.8, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + G(R(-440, -300, 880, 600, '#ece6d6', 'rx="10"') + TXT(0, -130, 'AGORA QUE VOCÊ', 76, '#1a1410') + TXT(0, -30, 'CONHECE', 76, '#1a1410') + TXT(0, 70, 'A VERDADE,', 76, '#c92f2b'), 'translate(540 960) rotate(-2)'), lt, 1.9, { z0: 1.0, z1: 1.2, shk: 2 }));
  SN(88.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + G(R(-420, -300, 840, 600, '#ece6d6', 'rx="10"') + TXT(0, -130, 'COM QUEM', 100, '#1a1410') + TXT(0, 0, 'ESCOLHERIA', 100, '#1a1410') + TXT(0, 130, 'FICAR?', 100, '#c92f2b'), 'translate(540 960) rotate(2)') + photoCard(200, 1500, 0.6, -8, '') + photoCard(880, 1500, 0.6, 8, ''), lt, 1.4, { z0: 1.0, z1: 1.18, shk: 3 }));
  /* 90.1 antes que consiga sair: corre até a porta */
  SN(90.1, 0.001, (t, lt, Pf) => { const sc = 1.0, dist = RUN_CYCLE * sc * 1.35 * lt, wx = 1400 - dist, dc = ez(H.prog(lt, 0.6, 0.95)); return CM(Pf, t, HALL(Pf, t, dist, 1500) + doorM(wx + 400, 1500, 1.2, 1 - dc) + E(420, 1506, 150, 16, 'rgba(0,0,0,0.5)') + G(heroFig({ t, walk: dist / (RUN_CYCLE * sc), view: 's', stride: 1, run: 1, scared: 1, mouth: 0.6 }), 'translate(420 1500)') + (lt > 0.9 ? PUNCH(lt - 0.9, 0.6) : ''), lt, 1.1, { z0: 1.0, z1: 1.12, shk: 5 }); });
  /* 91.2 voz nos alto-falantes */
  SN(91.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + speakerObj(300, 700, 1.8, t) + speakerObj(790, 700, 1.8, t) + FACE(t, { eye: 1, pupil: 0.3, worry: 0.9, mouth: 0, sweat: 1, tremble: 1 }, 540, 1500, 1.3), lt, 1.6, { z0: 1.0, z1: 1.2, shk: 3 }));
  SN(92.8, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + glow(Pf, 'R', 540, 900, 700, 0.2) + FACE(t, { eye: 1, pupil: 0.25, worry: 1, mouth: 0.1, sweat: 1, tremble: 1.5 }, 540, 1000, 2.8), lt, 1.4, { z0: 1.0, z1: 1.25, shk: 3 }));
  SN(94.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 900, 700, 0.25) + G(manSil({ scale: 1.2, eyes: 0, col: '#030507', t }), 'translate(540 1500)') + bigX(540, 900, 380, ez(H.prog(lt, 1.0, 1.7)), '#ff3b30') + TXT(540, 520, 'O HOMEM', 110, '#e8eef8', OP(0.9)), lt, 2.0, { z0: 1.0, z1: 1.25, y0: 1000, y1: 900, shk: 3 }));
  SN(96.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + monitorGrid(Pf, t, 1) + FB('#fff', 0.1 * Math.max(0, Math.sin(t * 20))), lt, 2.4, { z0: 1.0, z1: 1.2, shk: 3 }));
  /* ===== GRAVAÇÕES ===== */
  SN(98.6, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, monitorGrid(Pf, t, 1), { stamp: '??:??', glitch: 0.6 }), lt, 0.8, { z0: 1.5, z1: 2.4, x0: 300, x1: 300, y0: 500, y1: 500 }));
  SN(99.4, 0.001, (t, lt, Pf) => { return CM(Pf, t, vidFx(Pf, t, WALKSHOT(Pf, t, lt, { sc: 1.25, hx: 520 }), { stamp: '??:??', glitch: 0.2 }), lt, 2.0, { z0: 1.0, z1: 1.1, y0: 1150, y1: 1200 }); });
  SN(101.4, 0.001, (t, lt, Pf) => { return CM(Pf, t, vidFx(Pf, t, WALKSHOT(Pf, t, lt, { sc: 1.0, hx: 640, d0: 700 }) + G(silFig({ t, stride: 0, view: 's', flip: 1 }), 'translate(150 1500) scale(0.95)') + MANEYES(Pf, 175, 860, 0.7, H.prog(lt, 1.2, 1.6)), { stamp: '??:??', glitch: 0.3 }), lt, 2.0, { z0: 1.0, z1: 1.25, x0: 540, x1: 380, y0: 1150, y1: 1100 }); });
  SN(103.4, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + monitorGrid(Pf, t, 0), { stamp: '??:??', glitch: 0.9 }), lt, 0.5, { z0: 1.0, z1: 1.1, shk: 6 }));
  SN(103.9, 0.001, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.3, 1.1)); return CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + glow(Pf, 'A', 540, 1000, 600, 0.3 * u) + caseM(Pf, 540, 1500, 1.3, { open: u, t, money: 0, glow: 0 }) + HAND(lp(900, 700, u), lp(1750, 1250, u), 1.8, PAL.skin, -60), { stamp: '??:??' }), lt, 1.1, { z0: 1.0, z1: 1.2, y0: 1100, y1: 1000 }); });
  SN(105.0, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(R(-250, -330, 500, 660, '#f2ead6', 'rx="8"') + TXT(0, -230, 'REGRAS', 70, '#1a1410') + [0, 1, 2, 3].map(i => R(-190, -150 + i * 100, 380 * (0.6 + 0.4 * hz(i, 3)), 16, '#6a6252', 'rx="6"')).join(''), `translate(540 ${f1(lp(1300, 940, ez(lt / 0.6)))}) rotate(-2)`), { stamp: '??:??' }), lt, 1.4, { z0: 1.0, z1: 1.2, shk: 2 }));
  /* 106.4 pernas tremem */
  SN(106.4, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + R(-300, 1400, 1680, 800, '#0a1614') + G(heroFig({ t, view: 'f', stride: 0, scared: 1, idle: 1 }), `translate(${f1(540 + 6 * Math.sin(t * 50))} 1750) scale(2.2)`), { stamp: '??:??', glitch: 0.3 }), lt, 1.8, { z0: 1.0, z1: 1.15, y0: 1500, y1: 1450, shk: 5 }));
  SN(108.2, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, FOREST(Pf, t, 0, { gy: 1500 }) + G(wolfHead({ t, snarl: 0.6, glow: 1 }), 'translate(780 1050) scale(1.7)') + HERO(t, 250, 1700, 1.25, { view: 's', stride: 0, scared: 0.8 }), { stamp: '??:??', glitch: 0.5 }), lt, 1.2, { z0: 1.0, z1: 1.2, x0: 540, x1: 640, y0: 1150, y1: 1100, shk: 4 }));
  SN(109.4, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + glow(Pf, 'R', 540, 1000, 600, 0.25) + G(wolfHead({ t, snarl: 0.8, glow: 1 }), 'translate(800 960) scale(2.4)') + gunObj(300 + 12 * Math.sin(t * 40), 1100, 1.8, 0) + HAND(250, 1170, 1.7, PAL.skin, -90) + L(-100, 1190, 250, 1170, '#e7dcc9', 90), { stamp: '??:??', glitch: 0.8 }), lt, 1.5, { z0: 1.0, z1: 1.3, x0: 540, x1: 640, y0: 1000, y1: 980, shk: 6 }));
  /* 110.9 não se lembra */
  SN(110.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + questionMarks(t, 540, 960, 500, 6, '#d8e4f0') + FACE(t, { eye: 1, pupil: 0.3, worry: 1, mouth: 0.1, sweat: 1, tremble: 2, lookx: 12 * Math.sin(t * 3) }, 540, 1000, 2.2), lt, 1.9, { z0: 1.0, z1: 1.2, r0: -2, r1: 2, shk: 3 }));
  SN(112.8, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + speakerObj(540, 900, 2.6, t), lt, 0.7, { z0: 1.0, z1: 1.2, shk: 3 }));
}
