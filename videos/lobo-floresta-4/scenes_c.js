/* scenes_c.js - 113 s ao fim */
function partF(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI.push([a, b]); };
  const numCard = (Pf, t, n, label, ico) => BIG('#07090d') + glow(Pf, 'A', 540, 800, 700, 0.25) + TXT(540, 900, n, 700, 'rgba(232,238,248,0.9)') + G(ico, 'translate(540 1450)') + TXT(540, 1700, label, 90, '#ffd35a');
  /* 113.6 primeira vez: escolheu o lobo */
  SN(sg(63), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + TXT(540, 700, '1', 520, 'rgba(232,238,248,0.9)') + G(wolfHead({ t, glow: 1, calm: 1 }), 'translate(540 1350) scale(1.2)'), lt, 0.7, 1.0, 1.12, 540, 960, 3));
  SN(sg(64), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + glow(Pf, 'A', 540, 900, 700, 0.3) + G(wolfHead({ t, glow: 1, calm: 0 }), 'translate(540 960) scale(2.6)'), lt, 1.1, 1.0, 1.15, 540, 960, 2));
  /* 115.39 na segunda tentou salvar a si mesma */
  SN(sg(65), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + TXT(540, 700, '2', 520, 'rgba(232,238,248,0.9)') + HERO(t, 540, 1850, 1.3, { view: 'f', stride: 0, scared: 0.6, arms: [[-30, 20], [30, 20]] }), lt, 0.7, 1.0, 1.12, 540, 960, 3));
  SN(sg(66), 0.02, (t, lt, Pf) => { mb(sg(66), sg(67)); return FZ(Pf, t, nightF(Pf, t, { fog: 0.5 }) + grnd(Pf, 1400) + shadowFoot(540, 1600, 150) + WH(t, lt, 100, 980, 1600, 1.2, 1.05, { run: 1, stride: 1.2, scared: 0.8 }), lt, 1.2, 1.0, 1.1, 540, 1150, 4); });
  /* 117.28 agora salvar outra pessoa */
  SN(sg(67), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + TXT(540, 640, '3', 520, 'rgba(232,238,248,0.9)') + G(cf({ eye: 0.9, worry: 1, bruise: 0.5, bodyLen: 200 }, 0, 0, 1), 'translate(540 1380)'), lt, 3.2, 1.0, 1.15, 540, 1000, 2));
  /* 120.75 porta se abre no fundo */
  SN(sg(68), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + doorM(540, 1500, 1.8, ez(H.prog(lt, 0.4, 1.6))) + glow(Pf, 'A', 540, 1000, 700, 0.3 * ez(H.prog(lt, 0.4, 1.6))), lt, 2.0, 1.0, 1.2, 540, 1100, 3));
  /* 122.77 Clara aparece / 123.73 amarrada a uma cadeira */
  SN(sg(69), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + glow(Pf, 'A', 540, 1000, 700, 0.35) + chairClara(Pf, t, 540, 1500, 1.6), lt, 1.0, 1.0, 1.15, 540, 1000, 2));
  SN(sg(70), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 900, 700, 0.35) + cf({ eye: 0.9, worry: 1, bruise: 0.6, tear: 1, mouth: 0.15, tremble: 2, t, bodyLen: 260 }, 540, 1000, 2.6) + R(150, 1150, 780, 60, '#b8a070', OP(0.9), 'rx="10"'), lt, 1.1, 1.0, 1.18, 540, 1000, 2));
  /* 124.81 corre até ela */
  SN(sg(71), 0.02, (t, lt, Pf) => { mb(sg(71), sg(72)); return FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + chairClara(Pf, t, 880, 1500, 1.1) + shadowFoot(300, 1580, 150) + WH(t, lt, -100, 760, 1580, 0.95, 1.05, { run: 1, stride: 1.2, scared: 0.6 }), lt, 1.0, 1.0, 1.1, 540, 1150, 4); });
  /* 125.8 luz vermelha acende sobre sua cabeça */
  SN(sg(72), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + redLight(Pf, t, 540, 120, ez(H.prog(lt, 0.3, 0.9))) + HERO(t, 540, 1750, 1.2, { view: 'f', stride: 0, scared: 1, look: 0, headTilt: 0 }), lt, 2.0, 1.0, 1.15, 540, 1000, 3) + FB('#ff3b30', 0.3 * Math.exp(-lt * 5)));
  /* 127.84 contagem regressiva começa na TV */
  SN(sg(73), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + tvObj(Pf, t, 540, 900, 1.7, { mode: 'dark', txt: '10', col: '#ff3b30', size: 280 }) + redLight(Pf, t, 540, 80, 0.5), lt, 2.2, 1.0, 1.2, 540, 900, 3));
  /* 130.07 dez / 130.72 nove / 131.16 oito */
  for (const [i, n] of [[74, '10'], [75, '9'], [76, '8']]) SN(sg(i), 0.005, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 800, 0.35) + TXT(540, 1160, n, 760, '#ff3b30', OP(0.95)), lt, 0.6, 1.0, 1.18, 540, 960, 6 * Math.exp(-lt * 6) + 2) + FB('#ff3b30', 0.3 * Math.exp(-lt * 10)));
  /* 131.74 uivo na floresta */
  SN(sg(77), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050a10') + nightF(Pf, t, { fog: 0.5 }) + glow(Pf, 'B', 800, 400, 500, 0.5) + G(wolfSide({ t, head: -30, mouth: 1, scale: 1.3, flip: -1, glow: 1 }), 'translate(540 1500)') + ringWaves(540, 900, t, 0, 4, 800, 'rgba(200,220,255,0.3)', 1, 4), lt, 2.3, 1.0, 1.15, 540, 1100, 2));
  /* 134.09 lobo na entrada */
  SN(sg(78), 0.02, (t, lt, Pf) => { mb(sg(78), sg(78) + 1.5); return FZ(Pf, t, BIG('#0a0e12') + doorM(540, 1500, 1.9, 1) + G(wolfSide({ phase: lt * 0.9, run: 0, scale: 1.1, flip: -1, glow: 1, t }), `translate(${f1(H.lerp(900, 540, ez(lt / 1.6)))} 1500)`) + glow(Pf, 'B', 540, 1000, 700, 0.2), lt, 2.0, 1.0, 1.15, 540, 1100, 2); });
  /* 136.12 mas dessa vez ele não está sozinho */
  SN(sg(79), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + doorM(540, 1500, 1.9, 1) + G(wolfSide({ scale: 1.1, flip: -1, glow: 1, t }), 'translate(540 1500)') + eyesPair(Pf, 760, 800, 1.0, '#ffd35a', 0.5 + 0.4 * Math.sin(t * 6), 34), lt, 0.8, 1.0, 1.1, 540, 1100, 2));
  SN(sg(81), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + G(wolfHead({ t, glow: 1, calm: 1 }), 'translate(300 1100) scale(1.4)') + G(manSil({ scale: 1.4, eyes: 1, col: '#02040a', t }), 'translate(790 1650)') + redLight(Pf, t, 540, 80, 0.4), lt, 1.4, 1.0, 1.12, 540, 1100, 3));
  /* 138.27 atrás dele surge o homem misterioso preso */
  SN(sg(82), 0.02, (t, lt, Pf) => { const u = ez(lt / 2.4); return FZ(Pf, t, BIG('#0a0e12') + doorM(540, 1500, 1.9, 1) + G(manJacket(Pf, { scale: H.lerp(0.6, 1.3, u), t, lantern: 0, eyes: 1, rim: 0.8, walk: t * 0.5 }), `translate(540 ${f1(H.lerp(1350, 1700, u))})`) + G(wolfSide({ scale: 0.8, flip: -1, glow: 1, t }), 'translate(300 1620)'), lt, 3.0, 1.0, 1.12, 540, 1150, 2); });
  /* 141.8 olha diretamente para você */
  SN(sg(84), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + glow(Pf, 'R', 540, 800, 600, 0.2) + eyesPair(Pf, 540, 800, 3.2, '#e8eef8', 0.9, 90) + G(manSil({ scale: 1.4, eyes: 0, col: '#02040a', t }), 'translate(540 1700)'), lt, 1.9, 1.0, 1.25, 540, 900, 3));
  /* 143.7 dessa vez não existe escolha entre o homem e o lobo */
  SN(sg(85), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + G(manJacket(Pf, { scale: 1.1, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(300 1700)') + G(wolfSide({ scale: 1.0, flip: -1, glow: 1, t }), 'translate(800 1650)') + TXT(540, 700, 'NÃO HÁ ESCOLHA', 100, '#e8eef8'), lt, 3.8, 1.0, 1.12, 540, 1100, 2));
  /* 147.55 ele aponta para Clara / dessa vez descobrir qual dos dois */
  SN(sg(87), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + chairClara(Pf, t, 800, 1500, 1.3) + G(manSil({ scale: 1.3, eyes: 1, col: '#02040a', t, hands: 1 }), 'translate(250 1650)') + redLight(Pf, t, 540, 80, 0.5), lt, 4.0, 1.0, 1.12, 540, 1100, 2));
  SN(sg(88), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + G(manJacket(Pf, { scale: 0.9, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(300 1500)') + G(wolfSide({ scale: 0.9, flip: -1, glow: 1, t }), 'translate(820 1450)') + TXT(540, 640, 'QUAL DOS DOIS', 100, '#ffd35a') + TXT(540, 780, 'QUER SALVAR VOCÊ?', 80, '#e8eef8') + questionMarks(t, 540, 1050, 420, 3, '#d8e4f0'), lt, 3.9, 1.0, 1.15, 540, 1000, 2));
  /* 151.53 antes que a contagem chegue a zero */
  SN(sg(89), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 700, 0.4 + 0.2 * Math.sin(t * 10)) + TXT(540, 1100, '3', 800, '#ff3b30', OP(0.9)), lt, 1.7, 1.0, 1.2, 540, 960, 5));
  /* 153.25 Clara grita */
  SN(sg(90), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 900, 700, 0.3) + cf({ eye: 1, worry: 1, bruise: 0.6, tear: 1, mouth: 1, tremble: 3, t, bodyLen: 260 }, 540, 1000, 2.8), lt, 1.0, 1.0, 1.2, 540, 1000, 4));
  /* 153.91 NÃO ACREDITE NO QUE VOCÊ VIU NAS GRAVAÇÕES */
  SN(sg(91), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a0608') + cf({ eye: 1, worry: 1, bruise: 0.6, tear: 1, mouth: 0.9, tremble: 3, t, bodyLen: 260 }, 540, 1050, 2.5) + R(60, 1500, 960, 280, 'rgba(0,0,0,0.6)', 'rx="20"') + TXT(540, 1610, 'NÃO ACREDITE NO QUE', 56, '#fff') + TXT(540, 1700, 'VOCÊ VIU NAS GRAVAÇÕES!', 56, '#ff5a4a'), { stamp: '00:03', glitch: 0.6 }) , lt, 2.4, 1.0, 1.15, 540, 1000, 4) + FB('#000', 0.7 * H.prog(lt, 1.8, 2.4)));
}
