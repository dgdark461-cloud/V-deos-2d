/* scenes_c.js - 113.5 s ao fim */
function partF(c) {
  const { add, tw, k, E_, S } = c;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(114.3, 115.4); mb(116.0, 117.1); mb(124.8, 125.8); mb(134.2, 135.6);
  const num = (n, col = 'rgba(232,238,248,0.92)') => TXT(540, 700, n, 520, col);
  /* 113.5 primeira vez / 114.3 escolheu o lobo */
  SN(113.5, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + num('1') + glow(Pf, 'A', 540, 1350, 600, 0.25) + G(wolfHead({ t, glow: 1, calm: 1 }), 'translate(540 1350) scale(1.1)'), lt, 0.8, { z0: 1.0, z1: 1.2, shk: 4 }) + PUNCH(lt, 0.4));
  SN(114.3, 0.001, (t, lt, Pf) => { return CM(Pf, t, WALKSHOT(Pf, t, lt, { sc: 1.1, hx: 360, run: 0, scared: 0.4 }) + G(wolfSide({ phase: lt * 0.9, scale: 1.0, flip: 1, glow: 1, t }), 'translate(800 1500)'), lt, 1.1, { z0: 1.0, z1: 1.12, y0: 1200, y1: 1230 }); });
  /* 115.4 segunda / 116.0 tentou salvar a si mesma: corre */
  SN(115.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + num('2') + HERO(t, 540, 1850, 1.2, { view: 'f', stride: 0, scared: 0.6 }), lt, 0.6, { z0: 1.0, z1: 1.15, shk: 4 }) + PUNCH(lt, 0.4));
  SN(116.0, 0.001, (t, lt, Pf) => { return CM(Pf, t, WALKSHOT(Pf, t, lt, { run: 1, sc: 1.2, scared: 1, mouth: 0.6, hx: 460 }), lt, 1.1, { z0: 1.0, z1: 1.15, y0: 1250, y1: 1250, shk: 5 }); });
  /* 117.1 agora queremos descobrir se consegue salvar outra pessoa */
  SN(117.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + num('3') + G(cf({ eye: 0.9, worry: 1, bruise: 0.5, bodyLen: 200 }, 0, 0, 1.3), 'translate(540 1380)'), lt, 1.3, { z0: 1.0, z1: 1.2, shk: 3 }) + PUNCH(lt, 0.4));
  SN(118.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + glow(Pf, 'A', 540, 900, 700, 0.3) + cf({ eye: 0.9, worry: 1, bruise: 0.5, tear: 1, tremble: 1, t, bodyLen: 260 }, 540, 1000, 2.4) + HERO(t, 200, 1850, 0.7, { view: 's', stride: 0 }), lt, 1.6, { z0: 1.0, z1: 1.2, shk: 3 }));
  SN(120.0, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#050608') + TXT(540, 1000, 'DE REPENTE', 110, '#e8eef8'), lt, 0.5, { z0: 1.0, z1: 1.2, shk: 7 }) + PUNCH(lt, 0.6));
  SN(120.5, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf, '#07090c') + doorM(540, 1500, 1.8, ez(H.prog(lt, 0.2, 1.6))) + glow(Pf, 'A', 540, 1000, 700, 0.35 * ez(H.prog(lt, 0.2, 1.6))), lt, 2.2, { z0: 1.0, z1: 1.35, y0: 1100, y1: 1000, shk: 3 }));
  /* 122.7 Clara aparece / 123.3 amarrada */
  SN(122.7, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + glow(Pf, 'A', 540, 1000, 700, 0.4) + chairClara(Pf, t, 540, 1500, 1.6), lt, 0.6, { z0: 1.3, z1: 1.0, shk: 3 }) + PUNCH(lt, 0.3));
  SN(123.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 700, 0.35) + chairClara(Pf, t, 540, 1700, 2.3), lt, 1.5, { z0: 1.0, z1: 1.2, y0: 1250, y1: 1000, shk: 2 }));
  /* 124.8 corre até ela */
  SN(124.8, 0.001, (t, lt, Pf) => { const sc = 1.0, dist = RUN_CYCLE * sc * 1.35 * lt, dEnd = RUN_CYCLE * 1.35 * 1.0; return CM(Pf, t, HALL(Pf, t, dist, 1500) + chairClara(Pf, t, 900 + (dEnd - dist), 1500, 1.1) + E(380, 1506, 150, 16, 'rgba(0,0,0,0.5)') + G(heroFig({ t, walk: dist / (RUN_CYCLE * sc), view: 's', stride: 1, run: 1, scared: 0.8, mouth: 0.4 }), 'translate(380 1500)'), lt, 1.0, { z0: 1.0, z1: 1.12, shk: 5 }); });
  /* 125.8 luz vermelha acende */
  SN(125.8, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + redLight(Pf, t, 540, 120, ez(H.prog(lt, 0.3, 0.9))) + HERO(t, 540, 1750, 1.2, { view: 'f', stride: 0, scared: 1 }), lt, 2.1, { z0: 1.0, z1: 1.25, y0: 1000, y1: 700, shk: 3 }) + FB('#ff3b30', 0.3 * Math.exp(-lt * 5)));
  /* 127.9 contagem na TV */
  SN(127.9, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + tvObj(Pf, t, 540, 900, 1.7, { mode: 'dark', txt: '10', col: '#ff3b30', size: 280 }) + redLight(Pf, t, 540, 80, 0.5), lt, 2.5, { z0: 1.0, z1: 1.3, y0: 900, y1: 900, shk: 3 }));
  for (const [tt, n, d] of [[130.4, '10', 0.6], [131.0, '9', 0.3], [131.3, '8', 0.4]]) SN(tt, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 800, 0.35) + TXT(540, 1160, n, 760, '#ff3b30', OP(0.95)), lt, d, { z0: 1.25, z1: 1.0, shk: 7 }) + PUNCH(lt, 0.5, '#ff3b30'));
  /* 131.7 uivo da floresta */
  SN(131.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#050a10') + FOREST(Pf, t, 0, { gy: 1560, mx: 800, my: 400 }) + G(wolfSide({ t, head: -30, mouth: 1, scale: 1.3, flip: -1, glow: 1 }), 'translate(540 1500)') + ringWaves(540, 900, t, 0, 4, 800, 'rgba(200,220,255,0.3)', 1, 4), lt, 2.5, { z0: 1.0, z1: 1.25, y0: 1250, y1: 1050, shk: 3 }));
  /* 134.2 lobo na entrada */
  SN(134.2, 0.001, (t, lt, Pf) => { const u = ez(lt / 1.9); return CM(Pf, t, INT(Pf) + doorM(540, 1500, 1.9, 1) + E(lp(900, 540, u), 1506, 260, 16, 'rgba(0,0,0,0.5)') + G(wolfSide({ phase: lt * 1.0, scale: 1.1, flip: -1, glow: 1, t }), `translate(${f1(lp(900, 540, u))} 1500)`) + glow(Pf, 'B', 540, 1000, 700, 0.2), lt, 2.1, { z0: 1.0, z1: 1.15, y0: 1100, y1: 1150, shk: 3 }); });
  /* 136.3 mas dessa vez ele não está sozinho */
  SN(136.3, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + doorM(540, 1500, 1.9, 1) + G(wolfSide({ scale: 1.1, flip: -1, glow: 1, t }), 'translate(540 1500)') + eyesPair(Pf, 760, 800, 1.0, '#ffd35a', 0.5 + 0.4 * Math.sin(t * 6), 34), lt, 2.0, { z0: 1.0, z1: 1.2, shk: 3 }));
  /* 138.3 atrás dele surge o homem misterioso */
  SN(138.3, 0.001, (t, lt, Pf) => { const u = ez(lt / 2.4); return CM(Pf, t, INT(Pf) + doorM(540, 1500, 1.9, 1) + G(manJacket(Pf, { scale: lp(0.6, 1.3, u), t, lantern: 0, eyes: 1, rim: 0.8, walk: t * 0.5 }), `translate(540 ${f1(lp(1350, 1700, u))})`) + G(wolfSide({ scale: 0.8, flip: -1, glow: 1, t }), 'translate(300 1620)'), lt, 3.0, { z0: 1.0, z1: 1.2, y0: 1150, y1: 1100, shk: 2 }); });
  /* 141.7 olha para você */
  SN(141.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + glow(Pf, 'R', 540, 800, 600, 0.2) + eyesPair(Pf, 540, 800, 3.2, '#e8eef8', 0.9, 90) + G(manSil({ scale: 1.4, eyes: 0, col: '#02040a', t }), 'translate(540 1700)'), lt, 2.0, { z0: 1.0, z1: 1.35, y0: 900, y1: 800, shk: 4 }) + PUNCH(lt, 0.4));
  /* 143.7 não existe escolha */
  SN(143.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + G(manJacket(Pf, { scale: 1.1, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(300 1700)') + G(wolfSide({ scale: 1.0, flip: -1, glow: 1, t }), 'translate(800 1650)') + TXT(540, 700, 'NÃO HÁ ESCOLHA', 100, '#e8eef8'), lt, 3.0, { z0: 1.0, z1: 1.15, shk: 3 }));
  /* 146.7 ele aponta para Clara */
  SN(146.7, 0.001, (t, lt, Pf) => CM(Pf, t, INT(Pf) + chairClara(Pf, t, 800, 1500, 1.3) + G(manSil({ scale: 1.3, eyes: 1, col: '#02040a', t, hands: 1 }), 'translate(250 1650)') + HAND(540, 1050, 1.8, '#1a1c20', -90) + redLight(Pf, t, 540, 80, 0.5), lt, 1.2, { z0: 1.0, z1: 1.2, x0: 540, x1: 720, y0: 1100, y1: 1150, shk: 4 }) + PUNCH(lt, 0.3));
  /* 147.9 qual dos dois */
  SN(147.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#07090d') + G(manJacket(Pf, { scale: 0.9, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(300 1500)') + G(wolfSide({ scale: 0.9, flip: -1, glow: 1, t }), 'translate(820 1450)') + TXT(540, 640, 'QUAL DOS DOIS', 100, '#ffd35a') + TXT(540, 780, 'QUER SALVAR VOCÊ?', 80, '#e8eef8') + questionMarks(t, 540, 1050, 420, 3, '#d8e4f0'), lt, 3.4, { z0: 1.0, z1: 1.2, shk: 3 }));
  /* 151.3 antes que a contagem chegue a zero */
  SN(151.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 700, 0.4 + 0.2 * Math.sin(t * 10)) + TXT(540, 1100, lt < 1.0 ? '3' : '2', 800, '#ff3b30', OP(0.9)), lt, 1.0, { z0: 1.3, z1: 1.0, shk: 6 }) + PUNCH(lt % 1.0, 0.4, '#ff3b30'));
  /* 153.2 Clara grita */
  SN(153.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 900, 700, 0.3) + cf({ eye: 1, worry: 1, bruise: 0.6, tear: 1, mouth: 1, tremble: 3, t, bodyLen: 260 }, 540, 1000, 2.8), lt, 0.5, { z0: 1.0, z1: 1.2, shk: 8 }) + PUNCH(lt, 0.6));
  /* 153.7 NÃO ACREDITE */
  SN(153.7, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a0608') + cf({ eye: 1, worry: 1, bruise: 0.6, tear: 1, mouth: 0.9, tremble: 3, t, bodyLen: 260 }, 540, 1050, 2.5) + R(60, 1500, 960, 280, 'rgba(0,0,0,0.6)', 'rx="20"') + TXT(540, 1610, 'NÃO ACREDITE NO QUE', 56, '#fff') + TXT(540, 1700, 'VOCÊ VIU NAS GRAVAÇÕES!', 56, '#ff5a4a'), { stamp: '00:03', glitch: 0.6 }), lt, 2.3, { z0: 1.0, z1: 1.15, shk: 5 }) + FB('#000', 0.7 * H.prog(lt, 1.7, 2.3)));
}
