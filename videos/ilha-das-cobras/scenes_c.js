/* scenes_c.js - 95 s a fim */
const inHut = (Pf, t, lit = 0.6) => BIG('#1a1612') + R(-400, 1450, 1880, 600, '#2a1e14') + R(-400, 0, 1880, 1450, '#2c2a26') + [0, 1, 2, 3, 4, 5, 6].map(i => L(i * 180 - 20, 0, i * 180 - 20, 1450, '#000', 4, OP(0.2))).join('') + glow(Pf, 'A', 540, 900, 900, 0.25 * lit);
const winObj = (Pf, t, x, y, sc, moon = 1) => G(R(-200, -260, 400, 520, '#050c1a', 'stroke="#3a2a1a" stroke-width="22"') + C(80, -120, 40, '#e6f1fa', OP(moon)) + L(0, -260, 0, 260, '#3a2a1a', 12) + L(-200, 0, 200, 0, '#3a2a1a', 12) + glow(Pf, 'B', 80, -120, 200, 0.5 * moon), T(x, y, 0, sc));
const lampWalk = (Pf, t, x, y, sc, on = 1) => G(lanternObj(Pf, { on, t, sw: 5 * Math.sin(t * 3) }) , T(x, y, 0, sc));
function partF(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  /* 95.24 sol desaparece */
  SN(sg(55), 0.03, (t, lt, Pf) => { const u = lt / 1.3; return FIN(Pf, t, skyI(Pf, t, 1100, 'dusk', { clouds: 4 }) + C(540, H.lerp(1000, 1250, u), 120, '#ff9a4a') + seaI(Pf, t, 1250, 0.7, { n: 3, c1: '#4a3a5a' }) + R(-400, -400, 1880, 2720, '#02050a', OP(0.6 * u)), lt, 1.3, 1.0, 1.1, 540, 1000, 2); });
  /* 96.51 alcança o farol e a construção */
  SN(sg(56), 0.03, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 1100, 'night', { clouds: 2, moon: [820, 300, 70] }) + treesI(Pf, t, -300, 1400, 1400, 600, '#06160f', '#0e2a1e') + lighthouseObj(Pf, 760, 1450, 1.5, 1, t) + hutObj(Pf, { x: 300, y: 1560, sc: 1.2, lit: 0.7, t }) + R(-400, 1450, 1880, 600, '#08140e'), lt, 3.0, 1.0, 1.2, 540, 1100, 2));
  /* 99.76 porta destrancada */
  SN(sg(57), 0.03, (t, lt, Pf) => FIN(Pf, t, BIG('#070f14') + hutObj(Pf, { x: 540, y: 1500, sc: 2.0, lit: 0.8, door: ez(H.prog(lt, 0.4, 1.2)) * 0.5, t }), lt, 1.2, 1.0, 1.2, 540, 1200, 2));
  /* 101.04 lá dentro: cobertores, comida, cadeira */
  SN(sg(58), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t) + winObj(Pf, t, 540, 800, 1.2) + chairObj(540, 1450, 1.1), lt, 0.6, 1.0, 1.1, 540, 1000, 2));
  SN(sg(59), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t) + R(100, 1200, 880, 250, '#6a4a3a', '', ) + P('M100,1200 Q540,1120 980,1200 L980,1450 L100,1450Z', '#7a3a3a') + P('M100,1300 Q540,1230 980,1300', 'none', 'stroke="#000" stroke-width="6" opacity="0.2"'), lt, 1.0, 1.0, 1.2, 540, 1250, 1));
  SN(sg(60), 0.02, (t, lt, Pf) => { let s = inHut(Pf, t) + winObj(Pf, t, 540, 740, 1.1) + chairObj(540, 1450, 1.4); for (let i = 0; i < 5; i++) s += G(R(-40, -20, 80, 40, ['#c8302a', '#e8e0cc', '#3a6a8a'][i % 3], 'rx="6"'), T(180 + i * 160, 1500 + 20 * (i % 2), 15 * (i - 2), 1)); return FIN(Pf, t, s, lt, 4.0, 1.0, 1.2, 540, 1100, 1); });
  /* 106.69 alguém esteve ali recentemente: copo de café quente */
  SN(sg(61), 0.02, (t, lt, Pf) => { let s = inHut(Pf, t) + chairObj(540, 1500, 1.5) + G(R(-40, -80, 80, 80, '#d8d0b8', 'rx="10"'), 'translate(540 1100)'); for (let i = 0; i < 3; i++) s += E(540 + 12 * Math.sin(t * 2 + i), 1000 - ((t * 60 + i * 50) % 150), 14, 30, 'rgba(255,255,255,0.3)'); s += eyesPair(Pf, 540, 700, 0.8, '#ffd35a', 0.15 + 0.2 * Math.sin(t * 3), 40); return FIN(Pf, t, s, lt, 1.6, 1.0, 1.25, 540, 1200, 2); });
  /* 108.41 liga o rádio / 109.52 interferência */
  SN(sg(62), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.3) + G(HAND(0, 0, 2, PAL.skin, 20), 'translate(780 1250)') + radioVintage(Pf, { on: ez(lt / 0.8), t, x: 540, y: 1000, scale: 1.7 }), lt, 1.5, 1.0, 1.2, 540, 1000, 2));
  SN(sg(63), 0.02, (t, lt, Pf) => { let s = BIG('#0a0c0e') + radioVintage(Pf, { on: 1, t, x: 540, y: 1000, scale: 1.7 }); for (let i = 0; i < 14; i++) s += R(0, hz(i, Math.floor(t * 20)) * 1920, 1080, 4 + 10 * hz(i, 3), 'rgba(255,255,255,0.12)'); return FIN(Pf, t, s, lt, 1.2, 1.0, 1.1, 540, 1000, 3); });
  /* 110.72 voz masculina surge */
  SN(sg(64), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a0c0e') + radioVintage(Pf, { on: 1, t, x: 540, y: 1000, scale: 2.2 }) + ringWaves(540, 1000, t, 0, 4, 700, 'rgba(255,211,90,0.35)', 1, 6), lt, 1.4, 1.0, 1.2, 540, 1000, 2));
  SN(sg(65), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + glow(Pf, 'A', 540, 960, 700, 0.3) + TX(540, 1020, 'LUCAS...', 150, '#ffd35a', OP(0.85 + 0.15 * Math.sin(t * 20))) + ringWaves(540, 960, t, 0, 3, 700, 'rgba(255,211,90,0.3)', 1, 5), lt, 0.7, 1.0, 1.2, 540, 960, 4));
  SN(sg(66), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + radioVintage(Pf, { on: 1, t, x: 540, y: 900, scale: 1.8 }) + ringWaves(540, 900, t, 0, 3, 700, 'rgba(255,211,90,0.3)', 1, 5), lt, 0.9, 1.0, 1.15, 540, 900, 2));
  /* 113.62 sangue gela / 114.52 como sabe */
  SN(sg(67), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#081420') + LUC({ t, eye: 1, pupil: 0.2, worry: 1, sweat: 1, tremble: 3, cold: 0.5, mouth: 0.3, mess: 1, wet: 1 }, 540, 960, 3.0) + ringWaves(540, 960, t, 0, 2, 700, 'rgba(160,210,255,0.4)', 1, 5), lt, 0.9, 1.0, 1.25, 540, 960, 3));
  SN(sg(68), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a1018') + questionMarks(t, 540, 960, 420, 6) + radioVintage(Pf, { on: 1, t, x: 540, y: 1500, scale: 1.0 }) + LUC({ t, eye: 1, pupil: 0.35, worry: 1, sweat: 1, mess: 1, wet: 1, mouth: 0.1 }, 540, 1050, 1.8), lt, 1.4, 1.0, 1.15, 540, 1000, 2));
  /* 115.58 aperta o botão / 116.55 quem está falando */
  SN(sg(69), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.3) + radioVintage(Pf, { on: 1, t, x: 540, y: 1100, scale: 1.8 }) + G(HAND(0, 0, 2.2, PAL.skin, 10 + 14 * Math.sin(lt * 5)), 'translate(820 1250)'), lt, 0.9, 1.0, 1.2, 640, 1100, 2));
  SN(sg(70), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#080e14') + LUC({ t, eye: 1, pupil: 0.4, worry: 0.8, sweat: 1, mouth: 0.7 * Math.abs(Math.sin(t * 10)), mess: 1, wet: 1 }, 540, 1000, 2.6), lt, 0.7, 1.0, 1.15, 540, 1000, 2));
  /* 117.24 silêncio */
  SN(sg(71), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#020406') + radioVintage(Pf, { on: 0.2, t, x: 540, y: 1000, scale: 1.6 }), lt, 0.65, 1.0, 1.1, 540, 1000, 0));
  /* 117.9 voz responde / 119.13 não saia */
  SN(sg(72), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + radioVintage(Pf, { on: 1, t, x: 540, y: 1000, scale: 2.0 }) + ringWaves(540, 1000, t, 0, 3, 700, 'rgba(255,211,90,0.3)', 1, 5), lt, 1.2, 1.0, 1.15, 540, 1000, 2));
  SN(sg(73), 0.02, (t, lt, Pf) => { const b = Math.max(0, Math.sin(t * 6)); return FIN(Pf, t, BIG('#0a0608') + hutObj(Pf, { x: 540, y: 1400, sc: 1.6, lit: 0.8, t }) + TX(540, 520, 'NÃO SAIA', 130, '#ff3b30', OP(0.8 + 0.2 * b)) + glow(Pf, 'R', 540, 900, 700, 0.15), lt, 2.1, 1.0, 1.15, 540, 1000, 3); });
  /* 121.33 pergunta por quê / 122.44 rádio desliga */
  SN(sg(74), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.3) + LUC({ t, eye: 1, pupil: 0.4, worry: 0.8, sweat: 1, mouth: 0.6 * Math.abs(Math.sin(t * 9)), mess: 1, wet: 1 }, 540, 1000, 2.4), lt, 1.1, 1.0, 1.1, 540, 1000, 1));
  SN(sg(75), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#040608') + radioVintage(Pf, { on: 1 - ez(lt / 0.4), t, x: 540, y: 1000, scale: 1.7 }) + FB('#fff', 0.5 * Math.exp(-lt * 14)), lt, 1.0, 1.0, 1.1, 540, 1000, 2));
  /* 123.52 naquela noite / 124.29 luz entre árvores */
  SN(sg(76), 0.02, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 1100, 'night', { clouds: 2, moon: [800, 260, 70] }) + treesI(Pf, t, -300, 1400, 1400, 700, '#05100b', '#0a2218') + R(-400, 1400, 1880, 600, '#050c08') + hutObj(Pf, { x: 300, y: 1620, sc: 1.1, lit: 0.8, t }), lt, 0.8, 1.0, 1.1, 540, 1100, 1));
  SN(sg(77), 0.02, (t, lt, Pf) => { let s = jungle(Pf, t, 'night') + R(-400, -400, 1880, 2720, '#01040a', OP(0.5)); const x = H.lerp(900, 640, lt / 1.9); s += glow(Pf, 'A', x, 1180, 160, 0.9) + lampWalk(Pf, t, x, 1150, 0.6); return FIN(Pf, t, s, lt, 1.9, 1.0, 1.25, x, 1180, 2); });
  /* 126.2 alguém caminhando com lanterna */
  SN(sg(78), 0.02, (t, lt, Pf) => { const u = lt / 2.1; let s = jungle(Pf, t, 'night') + R(-400, -400, 1880, 2720, '#01040a', OP(0.5)); s += G(manJacket(Pf, { scale: 0.8, t, lantern: 1, walk: t * 0.7, beamA: 0.5, beamAng: 200 }), `translate(${f1(H.lerp(900, 560, u))} 1500)`); return FIN(Pf, t, s, lt, 2.1, 1.0, 1.2, 640, 1250, 2); });
  /* 128.31 aproxima da janela */
  SN(sg(79), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.1) + winObj(Pf, t, 540, 800, 1.5, 0.6) + G(lucasFig({ back: 1, scale: 1, t, look: 1 }), 'translate(300 1750) scale(1.4)') + lampWalk(Pf, t, 640, 650, 0.5), lt, 1.5, 1.0, 1.15, 540, 900, 2));
  /* 129.78 luz para / 130.5 apaga */
  SN(sg(80), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#02050a') + G(lanternObj(Pf, { on: 1, t, sw: 0 }), 'translate(540 960) scale(2.2)'), lt, 0.7, 1.0, 1.1, 540, 960, 0));
  SN(sg(81), 0.01, (t, lt, Pf) => BIG('#000') + vignette(Pf, 1) + FB('#000', 1));
  /* 131.11 e, segundos depois, três batidas */
  SN(sg(82), 0.01, (t, lt, Pf) => FIN(Pf, t, BIG('#010204') + eyesPair(Pf, 540, 1000, 0.6, '#ffd35a', 0.15 + 0.1 * Math.sin(t * 4), 40) , lt, 1.2, 1.0, 1.05, 540, 1000, 0));
  SN(sg(84), 0.01, (t, lt, Pf) => { const kn = [0, 0.5, 1.0].reduce((a, x) => a + Math.exp(-Math.pow((lt - x) * 14, 2)), 0); return FIN(Pf, t, BIG('#040608') + doorObj(Pf, { x: 540, y: 1600, sc: 2.0, t, light: 0.3 }) + ringWaves(540, 1100, t, 0, 3, 500, 'rgba(255,255,255,0.3)', 0.5 + kn, 5), lt, 1.4, 1.0, 1.05, 540, 1100, 2 + 12 * kn) + FB('#fff', 0.35 * kn); });
  /* 133.71 imóvel */
  SN(sg(85), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.15) + doorObj(Pf, { x: 760, y: 1500, sc: 1.4, t, light: 0.3 }) + G(lucasFig({ back: 0, scale: 1, t, scared: 1, tremble: 1 }), 'translate(300 1750) scale(1.4)'), lt, 1.5, 1.0, 1.12, 540, 1100, 1));
  /* 135.23 voz pergunta / 136.6 Lucas? / 137.06 resgate */
  SN(sg(86), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + doorObj(Pf, { x: 540, y: 1600, sc: 2.0, t, light: 0.5 }), lt, 1.4, 1.0, 1.15, 540, 1100, 1));
  SN(sg(87), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + ringWaves(540, 960, t, 0, 3, 700, 'rgba(255,211,90,0.3)', 1, 5) + TX(540, 1010, 'LUCAS?', 160, '#ffd35a'), lt, 0.5, 1.0, 1.2, 540, 960, 3));
  SN(sg(88), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + doorObj(Pf, { x: 540, y: 1600, sc: 2.0, t, light: 0.5 }) + G(R(-300, -80, 600, 150, 'rgba(0,0,0,0.6)', 'rx="30"') + TX(0, 30, 'EQUIPE DE RESGATE', 54, '#fff'), 'translate(540 500)'), lt, 1.2, 1.0, 1.12, 540, 1100, 1));
  /* 138.25 quase abre / 139.32 estranho */
  SN(sg(89), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.15) + doorObj(Pf, { x: 540, y: 1500, sc: 1.6, t, light: 0.4, handle: 20 * ez(lt / 0.8) }) + G(HAND(0, 0, 2.2, PAL.skin, -20 + 30 * ez(lt / 0.8)), 'translate(760 1100)'), lt, 1.1, 1.0, 1.15, 640, 1100, 2));
  SN(sg(90), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + questionMarks(t, 540, 900, 400, 4) + LUC({ t, eye: 1, pupil: 0.3, lookx: 20, worry: 1, sweat: 1, mess: 1, wet: 1, mouth: 0 }, 540, 1050, 2.4), lt, 1.2, 1.0, 1.15, 540, 1000, 2));
  /* 140.55 se realmente é resgate / 142.05 sozinho / 143.45 pela mata no escuro */
  SN(sg(91), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + G(R(-300, -200, 600, 400, '#1a2a38', 'rx="30"') + TX(0, 40, 'RESGATE', 110, '#9ad6f0'), 'translate(540 900)') + bigX(540, 900, 220, ez(H.prog(lt, 0.8, 1.3))), lt, 1.5, 1.0, 1.1, 540, 960, 1));
  SN(sg(92), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#02050a') + G(manJacket(Pf, { scale: 1.1, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(540 1650)') + glow(Pf, 'R', 540, 1000, 600, 0.12), lt, 1.4, 1.0, 1.15, 540, 1100, 2));
  SN(sg(93), 0.02, (t, lt, Pf) => { const u = lt / 1.7; return FIN(Pf, t, jungle(Pf, t, 'night') + R(-400, -400, 1880, 2720, '#01040a', OP(0.6)) + G(manJacket(Pf, { scale: 0.7, t, lantern: 0, walk: t * 0.6 }), `translate(${f1(H.lerp(300, 700, u))} 1450)`) + eyesPair(Pf, 200, 1100, 0.6, '#ffd35a', 0.5, 30), lt, 1.7, 1.0, 1.2, 540, 1250, 2); });
  /* 145.12 pergunta de qual equipe / 146.91 nenhuma resposta */
  SN(sg(94), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + LUC({ t, eye: 1, pupil: 0.4, worry: 0.8, sweat: 1, mouth: 0.6 * Math.abs(Math.sin(t * 9)), mess: 1, wet: 1 }, 540, 1000, 2.6), lt, 1.8, 1.0, 1.15, 540, 1000, 2));
  SN(sg(95), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#020406') + doorObj(Pf, { x: 540, y: 1600, sc: 2.0, t, light: 0.25 }), lt, 1.0, 1.0, 1.08, 540, 1100, 0));
  /* 147.96 rádio volta */
  SN(sg(96), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#040608') + radioVintage(Pf, { on: ez(lt / 0.3), t, x: 540, y: 1000, scale: 1.9 }) + FB('#fff', 0.4 * Math.exp(-lt * 12)), lt, 1.4, 1.0, 1.15, 540, 1000, 3));
  SN(sg(97), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + radioVintage(Pf, { on: 1, t, x: 540, y: 1000, scale: 2.1 }) + ringWaves(540, 1000, t, 0, 3, 700, 'rgba(255,211,90,0.3)', 1, 5), lt, 1.6, 1.0, 1.15, 540, 1000, 2));
  /* 151.26 não abra / 151.88 resgate só amanhã */
  SN(sg(98), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 700, 0.3 + 0.2 * Math.sin(t * 10)) + TX(540, 1030, 'NÃO ABRA', 170, '#ff3b30'), lt, 0.6, 1.0, 1.25, 540, 960, 6));
  SN(sg(99), 0.02, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 1100, 'dawn', { clouds: 3 }) + seaI(Pf, t, 1100, 0.6, { n: 3 }) + boatObj(Pf, t, 700, 1180, 0.6, 1, 1) + G(R(-260, -70, 520, 140, 'rgba(0,0,0,0.55)', 'rx="28"') + TX(0, 28, 'AMANHÃ', 90, '#fff'), 'translate(540 500)'), lt, 1.7, 1.0, 1.1, 540, 1000, 1));
  /* 153.69 recua */
  SN(sg(100), 0.02, (t, lt, Pf) => FIN(Pf, t, inHut(Pf, t, 0.15) + doorObj(Pf, { x: 540, y: 1500, sc: 1.8, t, light: 0.4 }) + G(lucasFig({ back: 0, scale: 1, t, scared: 1, walk: lt * 0.3, tremble: 1 }), `translate(${f1(H.lerp(540, 300, ez(lt / 0.4)))} 1850) scale(1.4)`), lt, 0.4, 1.0, 1.1, 540, 1100, 2));
  /* 154.11 do lado de fora / 155.48 maçaneta gira */
  SN(sg(101), 0.02, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 1100, 'night', { clouds: 2, moon: [800, 260, 70] }) + treesI(Pf, t, -300, 1400, 1400, 700, '#05100b', '#0a2218') + R(-400, 1400, 1880, 600, '#050c08') + hutObj(Pf, { x: 540, y: 1650, sc: 1.4, lit: 0.8, t }) + G(manJacket(Pf, { scale: 0.7, t, lantern: 0, eyes: 1 }), 'translate(250 1700)'), lt, 1.3, 1.0, 1.15, 540, 1300, 2));
  SN(sg(102), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#040608') + doorObj(Pf, { x: 540, y: 1700, sc: 2.6, t, light: 0.35, handle: 30 * Math.sin(lt * 5) }), lt, 1.3, 1.0, 1.3, 760, 1000, 3));
  /* 156.8 homem diz / 157.75 voz completamente diferente */
  SN(sg(103), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + G(manJacket(Pf, { scale: 1.4, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(540 1750)') , lt, 0.9, 1.0, 1.2, 540, 1000, 2));
  SN(sg(104), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a0408') + glow(Pf, 'R', 540, 800, 800, 0.3) + eyesPair(Pf, 540, 800, 2.4, '#ffd35a', 0.9, 90) + ringWaves(540, 800, t, 0, 3, 700, 'rgba(255,60,60,0.3)', 1, 5), lt, 1.5, 1.0, 1.25, 540, 800, 4));
  /* 159.28 Lucas... eu sei da mochila */
  SN(sg(105), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + TX(540, 1010, 'LUCAS...', 150, '#ff5a4a') + ringWaves(540, 960, t, 0, 3, 700, 'rgba(255,60,60,0.3)', 1, 5), lt, 0.4, 1.0, 1.2, 540, 960, 4));
  SN(sg(106), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a0608') + backpackObj(540, 1300, 1.8, 0, t) + glow(Pf, 'R', 540, 900, 700, 0.25) + eyesPair(Pf, 540, 520, 1.4, '#ff5a4a', 0.8, 70), lt, 1.8, 1.0, 1.2, 540, 1000, 3));
  /* 161.46 porta continua fechada */
  SN(sg(107), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#040608') + doorObj(Pf, { x: 540, y: 1600, sc: 2.0, t, light: 0.4 }) + eyesPair(Pf, 540, 700, 0.5, '#ff5a4a', 0.2 + 0.2 * Math.sin(t * 5), 30), lt, 1.4, 1.0, 1.1, 540, 1100, 1));
  /* 162.85 agora entende / 164.59 cobras talvez não sejam o maior perigo */
  SN(sg(108), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#060a0e') + LUC({ t, eye: 1, pupil: 0.3, worry: 0.8, sweat: 1, tremble: 1, mess: 1, wet: 1, mouth: 0 }, 540, 1000, 2.6) + glow(Pf, 'R', 540, 1000, 700, 0.1), lt, 1.7, 1.0, 1.2, 540, 1000, 1));
  SN(sg(109), 0.02, (t, lt, Pf) => { let s = BIG('#050a0c') + glow(Pf, 'A', 540, 700, 600, 0.3); s += snakeCoil(540, 1250, 1.3, t, { raise: 220, tongue: 0.4 }); s += G(manJacket(Pf, { scale: 0.9, t, lantern: 0, eyes: 1 }), 'translate(820 1600)') + ez(H.prog(lt, 2.0, 3.0)) * 0; return FIN(Pf, t, s, lt, 3.0, 1.0, 1.1, 540, 1100, 1) + FB('#000', 0.6 * H.prog(lt, 2.2, 3.1)); });
}
