/* scenes_b.js - 66 a ~113 s */
const rockSq = (x, y, sc, t) => '';
function partE(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI.push([a, b]); };
  /* 66.36 ao chegar: protagonista caminha de costas rumo à construção */
  SN(sg(37), 0.02, (t, lt, Pf) => { mb(sg(37), sg(38)); const u = Math.min(1, lt / 0.6); let s = nightF(Pf, t, { fog: 0.7 }) + grnd(Pf, 1380); s += shadowFoot(540, 1560, 130 * (1 - 0.3 * u)) + HERO(t, 540, 1560 - 250 * Math.min(1, lt / 0.6), 1.1 - 0.35 * Math.min(1, lt / 0.6), { view: 'b', walk: lt * 1.1, stride: 0.9 }); return FZ(Pf, t, s, lt, 0.6, 1.0, 1.08, 540, 1200, 3); });
  /* 66.97 encontra construção abandonada próxima à floresta */
  SN(sg(38), 0.02, (t, lt, Pf) => { const u = ez(lt / 2.4); return FZ(Pf, t, nightF(Pf, t, { fog: 0.6 }).slice(0, 0) + buildingExt(Pf, t) + treesI(Pf, t, -300, 300, 1500, 700, '#06120f', '#0c2018') + treesI(Pf, t, 780, 1400, 1500, 700, '#06120f', '#0c2018') + R(-500, 1500, 2080, 800, '#0a1410') + HERO(t, 250 + 160 * u, 1750, 0.8, { view: 'b', walk: lt * 0.9, stride: 0.9 }), lt, 2.4, 1.0, 1.15, 540, 1300, 2); });
  /* 69.42 a porta está aberta */
  SN(sg(39), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07100f') + doorM(540, 1500, 1.9, 0.55 + 0.04 * Math.sin(t * 2)) + glow(Pf, 'A', 540, 1000, 600, 0.35) + redLight(Pf, t, 540, 100, 0.0), lt, 1.2, 1.0, 1.2, 540, 1000, 2));
  /* 70.69 lá dentro / 71.07 televisão ligada */
  SN(sg(40), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + glow(Pf, 'B', 540, 900, 900, 0.2), lt, 0.4, 1.0, 1.05, 540, 960, 1));
  SN(sg(41), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + tvObj(Pf, t, 540, 960, 1.6, {}) , lt, 1.5, 1.0, 1.25, 540, 960, 3));
  /* 72.61 várias telas de monitoramento e dezenas de fotografias */
  SN(sg(42), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + monitorGrid(Pf, t, 1) + glow(Pf, 'B', 540, 960, 700, 0.15), lt, 2.6, 1.0, 1.14, 540, 960, 2));
  SN(tw('fotografias', 0, 75.5), 0.02, (t, lt, Pf) => FZ(Pf, t, photoWall(Pf, t, { crossed: 0 }), lt, 2.4, 1.0, 1.15, 540, 960, 2));
  /* 77.79 reconhece rostos */
  SN(sg(43), 0.02, (t, lt, Pf) => FZ(Pf, t, photoWall(Pf, t, { crossed: 0 }) + glow(Pf, 'A', 540, 700, 500, 0.3) + G(R(-100, -130, 200, 260, '#ece6d6', 'rx="6"') + R(-86, -116, 172, 180, '#2a3a40') + wf({ eye: 1, worry: 0.4, bodyLen: 120 }, 0, -26, 0.5), T(540, 900, 0, 3.0)), lt, 1.4, 1.0, 1.12, 540, 960, 2));
  /* 79.23 outros riscados */
  SN(sg(44), 0.02, (t, lt, Pf) => { const u = ez(lt / 1.2); return FZ(Pf, t, photoWall(Pf, t, { crossed: 0.55 * u }) + R(-400, -400, 1880, 2720, '#c92f2b', OP(0.06 * Math.sin(t * 8))), lt, 1.5, 1.0, 1.12, 540, 960, 3); });
  /* 80.74 no centro da sala encontra mesa */
  SN(sg(45), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + R(-400, 1300, 1880, 800, '#10161c') + glow(Pf, 'A', 540, 1100, 600, 0.35) + G(R(-300, -30, 600, 30, '#4a3222') + L(-260, 0, -260, 260, '#3a281a', 20) + L(260, 0, 260, 260, '#3a281a', 20), 'translate(540 1450)') + HERO(t, 300, 1760, 0.85, { view: 'b', walk: lt * 0.7, stride: lt < 0.6 ? 0.9 : 0 }), lt, 1.0, 1.0, 1.12, 540, 1250, 2));
  /* 81.77 mesa com duas fotografias / 83.31 homem e lobo */
  SN(sg(46), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.35) + G(R(-380, 0, 760, 40, '#4a3222') + R(-380, 40, 760, 600, '#2a1c12'), 'translate(540 1200)') + G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#10222c'), 'translate(340 1100) rotate(-5)') + G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#10222c'), 'translate(740 1100) rotate(5)'), lt, 1.5, 1.0, 1.2, 540, 1150, 2));
  SN(sg(47), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#0e1a22') + G(manSil({ scale: 0.35, eyes: 1, col: '#02040a', t }), 'translate(0 80)'), 'translate(300 960) scale(1.6) rotate(-4)') + G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#0e1a22') + G(wolfHead({ t, glow: 1, calm: 1 }), 'translate(0 -10) scale(0.2)'), 'translate(780 960) scale(1.6) rotate(4)'), lt, 1.9, 1.0, 1.12, 540, 960, 2));
  /* 85.2 abaixo delas uma pergunta / 86.82 a pergunta */
  SN(sg(48), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + TXT(540, 960, '?', 800, 'rgba(232,238,248,0.7)'), lt, 1.6, 1.0, 1.2, 540, 960, 3));
  SN(sg(50), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + glow(Pf, 'A', 540, 1000, 800, 0.3) + G(R(-420, -300, 840, 600, '#ece6d6', 'rx="10"') + TXT(0, -130, 'COM QUEM', 100, '#1a1410') + TXT(0, 0, 'ESCOLHERIA', 100, '#1a1410') + TXT(0, 130, 'FICAR?', 100, '#c92f2b'), 'translate(540 960) rotate(-2)'), lt, 4.3, 1.0, 1.15, 540, 960, 1));
  /* 88.63 antes que consiga sair */
  SN(sg(51), 0.02, (t, lt, Pf) => { mb(sg(51), sg(51) + 1.0); return FZ(Pf, t, BIG('#0a0e12') + R(-400, 1350, 1880, 800, '#10161c') + doorM(840, 1500, 1.3) + WH(t, lt, 300, 700, 1760, 1.0, 1.05, { view: 's', scared: 0.6 }) + redLight(Pf, t, 540, 80, 0.4 * H.prog(lt, 1.5, 2.6)), lt, 2.7, 1.0, 1.1, 540, 1100, 3); });
  /* 91.39 voz nos alto-falantes */
  SN(sg(52), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + speakerObj(300, 700, 1.8, t) + speakerObj(790, 700, 1.8, t) + FACE(t, { eye: 1, pupil: 0.3, worry: 0.9, mouth: 0, sweat: 1, tremble: 1 }, 540, 1500, 1.3), lt, 1.8, 1.0, 1.1, 540, 960, 2));
  /* 93.2 você ainda não entendeu / 94.8 homem nunca foi o verdadeiro teste */
  SN(sg(53), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + speakerObj(540, 900, 2.6, t), lt, 1.6, 1.0, 1.2, 540, 900, 3));
  SN(sg(54), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 900, 700, 0.25) + G(manSil({ scale: 1.2, eyes: 0, col: '#030507', t }), 'translate(540 1500)') + bigX(540, 900, 380, ez(H.prog(lt, 1.0, 1.6)), '#ff3b30') + TXT(540, 520, 'O HOMEM', 110, '#e8eef8', OP(0.9)), lt, 3.5, 1.0, 1.15, 540, 1000, 2));
  /* 98.87 telas mostram gravações / 99.54 caminhando pela floresta antes do sequestro */
  SN(tw('gravações', 0, 97.5), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + monitorGrid(Pf, t, 1) + FB('#fff', 0.12 * Math.max(0, Math.sin(t * 20))), lt, 1.6, 1.0, 1.12, 540, 960, 3));
  SN(sg(56), 0.02, (t, lt, Pf) => { mb(sg(56), sg(57)); return FZ(Pf, t, vidFx(Pf, t, nightF(Pf, t, { fog: 0.5 }) + grnd(Pf, 1400, '#0a1614') + shadowFoot(540, 1560, 140) + WH(t, lt, 100, 960, 1560, 3.6, 1.0, {}), { stamp: '??:??', glitch: 0.2 }), lt, 3.9, 1.0, 1.06, 540, 1100, 2); });
  /* 103.48 em outra / 104.01 abrindo a maleta com regras */
  SN(sg(57), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + monitorGrid(Pf, t, 0), { stamp: '??:??', glitch: 0.8 }), lt, 0.5, 1.0, 1.1, 540, 960, 4));
  SN(sg(58), 0.02, (t, lt, Pf) => { const u = ez(lt / 0.6); return FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + glow(Pf, 'A', 540, 1000, 600, 0.3 * u) + caseM(Pf, 540, 1500, 1.3, { open: u, t, money: 0, glow: 0 }) + R(300, 1180, 480, 150, '#ece6d6', OP(u), 'rx="8"') + TXT(540, 1270, 'REGRAS', 80, '#1a1410', OP(u)) + FACE(t, { eye: 1, pupil: 0.4, worry: 0.3 }, 540, 520, 1.1), { stamp: '??:??' }), lt, 2.2, 1.0, 1.1, 540, 1100, 2); });
  /* 106.33 gravação diante do lobo / 110.0 apontando arma */
  SN(sg(59), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, nightF(Pf, t, { fog: 0.4 }) + grnd(Pf, 1400, '#0a1614') + G(wolfHead({ t, snarl: 0.6, glow: 1 }), 'translate(780 1100) scale(1.6)') + HERO(t, 250, 1700, 1.2, { view: 's', stride: 0, scared: 0.7 }), { stamp: '??:??', glitch: 0.5 }), lt, 3.7, 1.0, 1.1, 540, 1100, 3));
  SN(sg(60), 0.02, (t, lt, Pf) => { const gun = G(R(-20, -60, 130, 40, '#15181e', 'rx="6"') + R(-10, -30, 40, 110, '#15181e', 'rx="6"'), ''); return FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + glow(Pf, 'R', 540, 1000, 600, 0.25) + G(wolfHead({ t, snarl: 0.8, glow: 1 }), 'translate(800 960) scale(2.4)') + G(HAND(0, 0, 1.8, PAL.skin, -90) + gun, 'translate(250 1100) scale(1.6)'), { stamp: '??:??', glitch: 0.8 }), lt, 1.3, 1.0, 1.2, 540, 1000, 6); });
  /* 111.28 não se lembra de nada */
  SN(sg(61), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0e12') + questionMarks(t, 540, 960, 500, 6, '#d8e4f0') + FACE(t, { eye: 1, pupil: 0.3, worry: 1, mouth: 0.1, sweat: 1, tremble: 2, lookx: 12 * Math.sin(t * 3) }, 540, 1000, 2.2), lt, 1.4, 1.0, 1.15, 540, 1000, 3));
  /* 112.8 a voz continua */
  SN(sg(62), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07090d') + speakerObj(540, 900, 2.6, t), lt, 0.8, 1.0, 1.12, 540, 900, 2));
}
