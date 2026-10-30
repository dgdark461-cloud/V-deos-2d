/* scenes_b.js - 25 a 95 s */
const jungle = (Pf, t, mode = 'dusk', n = 0) => skyI(Pf, t, 700, mode, { clouds: 3 }) + treesI(Pf, t, -200, 1300, 1000, 700, '#0b2a22', '#1a5a3a') + R(-400, 1000, 1880, 1000, '#16281f') + treesI(Pf, t, -300, 1400, 1250, 900, '#082018', '#124030') + R(-400, 1250, 1880, 800, '#10201a') + glow(Pf, 'A', 540, 1000, 700, 0.15);
const trailBG = (Pf, t, mode) => jungle(Pf, t, mode) + P('M420,1920 Q500,1500 620,1250 Q680,1100 700,1000 L760,1000 Q740,1150 800,1300 Q900,1550 1100,1920Z', '#3a2c1c') + P('M420,1920 Q500,1500 620,1250 Q680,1100 700,1000 L720,1000 Q600,1300 560,1920Z', '#000', OP(0.2));
const camS = (t, lt, d, z0, z1, s, x = 540, y = 960, shk = 2) => cam3(t, lt, x, y, z0, z1, d, 0, shk, s) + vignette('', 0) ;
const FIN = (Pf, t, s, lt, d, z0, z1, x = 540, y = 960, shk = 2, rot = 0) => cam3(t, lt, x, y, z0, z1, d, rot, shk, s) + vignette(Pf, 1) + grain(t, 0.08);

function partE(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  /* 25.36 algo se mexe: cobra perto da cabeça */
  SN(sg(12), 0.03, (t, lt, Pf) => {
    let s = skyI(Pf, t, 600, 'dawn', { clouds: 3 }) + rockFloor(Pf, 800, '#2c3c48') + glow(Pf, 'B', 540, 900, 700, 0.2);
    s += G(lucasFig({ back: 0, scale: 1, t, scared: 0.6 }), 'translate(380 1600) rotate(88) scale(1.5)');
    s += rockI(760, 1250, 360, 160, 21) + rockI(980, 1250, 300, 200, 22) + snakeCoil(860, 1230, 0.9, t, { raise: 110, tongue: 0.5 + 0.5 * Math.sin(t * 7) });
    return FIN(Pf, t, s, lt, 1.5, 1, 1.35, 700, 1250, 2);
  });
  /* 27.59 serpente enrolada entre duas pedras */
  SN(sg(13), 0.03, (t, lt, Pf) => {
    let s = BIG('#0e1a22') + glow(Pf, 'A', 540, 1150, 700, 0.4) + rockI(220, 1500, 640, 520, 31, '#2c3c48') + rockI(900, 1500, 640, 560, 32, '#2c3c48') + snakeCoil(560, 1480, 2.2, t, { raise: 260, tongue: 0.6 * (0.5 + 0.5 * Math.sin(t * 6)) });
    s += rockFloor(Pf, 1480, '#1c2a34').replace(/<rect[^>]*>/, '');
    return FIN(Pf, t, s, lt, 2.4, 1.0, 1.2, 560, 1100, 2);
  });
  /* 30.2 menos de um metro: dois pontos e régua */
  SN(sg(14), 0.03, (t, lt, Pf) => {
    const u = ez(lt / 0.6);
    let s = BIG('#0e1a22') + R(-400, 1300, 1880, 800, '#2c3c48') + snakeCoil(220, 1250, 1.4, t, { raise: 200 }) + G(lucasFace({ t, eye: 1, pupil: 0.4, lookx: -30, worry: 1, sweat: 1, mouth: 0.1, mess: 1, wet: 1 }), 'translate(840 900) scale(1.4)');
    s += L(240, 1500, H.lerp(240, 840, u), 1500, '#ffd35a', 8) + L(240, 1480, 240, 1520, '#ffd35a', 8) + L(H.lerp(240, 840, u), 1480, H.lerp(240, 840, u), 1520, '#ffd35a', 8) + TX(540, 1600, '< 1 m', 80, '#ffd35a', OP(u));
    return FIN(Pf, t, s, lt, 2, 1, 1.1, 540, 1100, 2);
  });
  /* 32.09 afasta lentamente */
  SN(sg(15), 0.03, (t, lt, Pf) => {
    const u = lt / 1.3;
    let s = skyI(Pf, t, 600, 'dawn', { clouds: 3 }) + rockFloor(Pf, 800, '#2c3c48');
    s += snakeCoil(250, 1500, 1.5, t, { raise: 200, tongue: 0.5 });
    s += G(lucasFig({ back: 0, scale: 1, t, walk: u * 0.8, scared: 0.7, look: -1 }), `translate(${f1(H.lerp(520, 800, u))} 1700) scale(1.3)`);
    return FIN(Pf, t, s, lt, 1.3, 1, 1.1, 540, 1250, 2);
  });
  /* 33.42 sem tocar nela: mão recuando */
  SN(sg(16), 0.03, (t, lt, Pf) => {
    const u = ez(lt / 1.0);
    let s = BIG('#0e1a22') + R(-400, 1300, 1880, 800, '#2c3c48') + snakeCoil(330, 1400, 1.8, t, { raise: 230, tongue: 0.6 }) + HAND(H.lerp(560, 860, u), H.lerp(1000, 900, u), 2.2, PAL.skin, 30) + ringWaves(560, 1100, t, 0, 2, 300, 'rgba(255,200,60,0.4)', 1, 4);
    return FIN(Pf, t, s, lt, 1, 1, 1.1, 540, 1100, 1);
  });
  /* 34.51 ao levantar: farol no alto */
  SN(sg(17), 0.03, (t, lt, Pf) => {
    const u = ez(lt / 1.8);
    let s = skyI(Pf, t, 900, 'dawn', { clouds: 3 }) + islandSil(Pf, t, 540, 1300, 2.4, 0) + rockFloor(Pf, 1500, '#2c3c48');
    s += G(lucasFig({ back: 1, scale: 1, t, walk: 0, scared: 0.3 }), `translate(300 ${f1(1900 - 30 * u)}) scale(1.6)`);
    return FIN(Pf, t, s, lt, 2.2, 1.0, 1.25, 540, 1500 - 400 * u, 2);
  });
  /* 35.15 reconhece construção: zoom no farol */
  SN(sg(18), 0.03, (t, lt, Pf) => {
    let s = skyI(Pf, t, 1200, 'dawn', { clouds: 3 }) + treesI(Pf, t, -300, 1400, 1500, 700, '#0b2a22', '#1a5a3a') + lighthouseObj(Pf, 540, 1560, 2.2, 0, t);
    s += wispL(t, 3, 300, 1500, 'rgba(210,225,235,0.3)');
    return FIN(Pf, t, s, lt, 2.1, 1.0, 1.3, 540, 1000, 1);
  });
  /* 37.27 Um farol. */
  SN(sg(19), 0.01, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 1200, 'dawn', { clouds: 3 }) + lighthouseObj(Pf, 540, 1700, 3.2, 1, t) + treesI(Pf, t, -300, 1400, 1700, 500, '#0b2a22', '#1a5a3a'), lt, 0.6, 1.0, 1.2, 540, 900, 4) + FB('#fff', 0.5 * Math.exp(-lt * 10)));
  /* 37.81 então percebe onde está */
  SN(sg(20), 0.02, (t, lt, Pf) => {
    let s = skyI(Pf, t, 900, 'dusk', { clouds: 4 }) + seaI(Pf, t, 900, 0.8, { n: 4 }) + LUC({ t, eye: 1, pupil: 0.3, worry: 1, mouth: 0.3, sweat: 1, mess: 1, wet: 1 }, 540, 1150, 2.6);
    s += questionMarks(t, 540, 520, 300, 3);
    return FIN(Pf, t, s, lt, 1.3, 1.0, 1.15, 540, 1000, 2);
  });
  /* 39.18 Ilha da Queimada Grande: mapa/aérea com texto */
  SN(sg(21), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.6);
    let s = BIG('#06202e') + seaI(Pf, t, 0, 0.4, { n: 5, c1: '#1a5a78', span: 1800, foam: 0.5 });
    s += P('M200,1000 Q260,820 460,780 Q640,700 820,820 Q930,900 900,1040 Q820,1140 600,1130 Q320,1180 200,1000Z', '#1b4a32') + P('M260,1000 Q330,860 470,830 Q640,780 780,860Z', '#2a6a44', OP(0.7)) + lighthouseObj(Pf, 640, 900, 0.5, 1, t);
    for (let i = 0; i < 14; i++) { const a = hz(i, 61) * 6.283, r = 60 + 230 * hz(i, 62); s += C(560 + Math.cos(a) * r * 1.1, 960 + Math.sin(a) * r * 0.55, 7, GOLD, OP(0.8 * u)); }
    s += G(R(-330, -80, 660, 140, 'rgba(0,0,0,0.6)', 'rx="30"') + TX(0, 28, 'QUEIMADA GRANDE', 66, '#ffd35a'), `translate(540 ${f1(1400 + 20 * (1 - u))})`, OP(u));
    return FIN(Pf, t, s, lt, 1.3, 1.25, 1.0, 540, 960, 2);
  });
  /* 40.49 Ilha das Cobras */
  SN(sg(22), 0.02, (t, lt, Pf) => {
    let s = BIG('#06130e') + glow(Pf, 'A', 540, 900, 800, 0.4);
    for (let i = 0; i < 9; i++) s += snakeCrawl(-200, 300 + i * 180, 1300, 260 + i * 180, ((t * 0.45 + hz(i, 71)) % 1.2), t + i, 46, { col: i % 3 ? JAR : GOLD, len: 520 });
    s += G(R(-320, -90, 640, 170, 'rgba(0,0,0,0.65)', 'rx="30"') + TX(0, -8, 'ILHA DAS', 70, '#fff') + TX(0, 62, 'COBRAS', 84, '#ffd35a'), 'translate(540 960)', OP(ez(lt / 0.3)));
    return FIN(Pf, t, s, lt, 1.5, 1.2, 1.0, 540, 960, 3);
  });
  /* 42.46 lugar real / 43.15 35 km do litoral */
  SN(sg(23), 0.02, (t, lt, Pf) => FIN(Pf, t, skyI(Pf, t, 900, 'day', { clouds: 5 }) + seaI(Pf, t, 900, 0.7, { n: 4, c1: '#2a7090' }) + islandSil(Pf, t, 540, 1050, 1.6, 0), lt, 1.5, 1.0, 1.15, 540, 1000, 2));
  SN(sg(24), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 2.3);
    let s = BIG('#08283a') + seaI(Pf, t, 0, 0.3, { n: 5, c1: '#1a6a8a', span: 1800, foam: 0.4 });
    s += P('M-40,1500 L-40,1000 Q80,900 140,1100 Q200,1400 100,1700 L-40,1700Z', '#a89868') + P('M-40,1500 L-40,1000 Q80,900 140,1100Q100,1300 -40,1500Z', '#4a6a3a');
    s += E(900, 640, 90, 50, '#1b4a32') + L(180, 1300, H.lerp(180, 880, u), H.lerp(1300, 700, u), '#ffd35a', 6, 'stroke-dasharray="26 18"') + C(H.lerp(180, 880, u), H.lerp(1300, 700, u), 16, '#ffd35a') + G(R(-170, -60, 340, 110, 'rgba(0,0,0,0.6)', 'rx="24"') + TX(0, 22, '35 km', 76, '#fff'), 'translate(540 960)');
    return FIN(Pf, t, s, lt, 2.3, 1.0, 1.1, 540, 960, 2);
  });
  /* 45.86 milhares de jararacas */
  SN(sg(25), 0.02, (t, lt, Pf) => {
    let s = BIG('#0c1c14') + glow(Pf, 'A', 540, 960, 900, 0.25);
    for (let i = 0; i < 12; i++) s += snakeCrawl(-200 + (i % 2) * 100, 250 + i * 140, 1300, 220 + i * 140 + 30 * Math.sin(i), (t * 0.35 + hz(i, 73)) % 1.3, t * 1.1 + i, 40, { col: i % 4 ? JAR : GOLD, len: 480, amp: 22 });
    return FIN(Pf, t, s, lt, 2.3, 1.0, 1.15, 540, 960, 2);
  });
  /* 48.34 espécie venenosa só ali */
  SN(sg(26), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.5);
    let s = BIG('#0a1620') + glow(Pf, 'R', 540, 900, 700, 0.2 + 0.1 * Math.sin(t * 6)) + snakeHeadFront(540, 980, 2.2, { tongue: 0.5 + 0.5 * Math.sin(t * 8) });
    for (let i = 0; i < 6; i++) s += P(`M${f1(540 + (i - 2.5) * 70)},1380 q6,40 0,80`, 'none', `stroke="#9be86a" stroke-width="10" stroke-linecap="round" opacity="${(0.4 + 0.6 * Math.sin(t * 5 + i)) * u}"`);
    s += TX(540, 420, 'VENENOSA', 100, '#9be86a', OP(u)) + TX(540, 1620, 'SÓ EXISTE AQUI', 76, '#fff', OP(H.prog(lt, 0.6, 1.0)));
    return FIN(Pf, t, s, lt, 2.1, 1.0, 1.15, 540, 960, 2);
  });
  /* 50.5 detalhe assustador / 51.88 nos galhos */
  SN(sg(27), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#050c0a') + eyesPair(Pf, 540, 960, 3, '#ffd35a', 0.5 + 0.5 * Math.sin(t * 5), 60) + glow(Pf, 'R', 540, 960, 500, 0.15), lt, 1.4, 1.0, 1.3, 540, 960, 4));
  SN(sg(28), 0.02, (t, lt, Pf) => {
    let s = jungle(Pf, t, 'dusk');
    s += branchObj(-100, 300, 900, 1.3) + branchObj(1200, 520, 800, 1.2, -1);
    s += snakeHang(300, 300, 380, t, 44, { col: JAR }) + snakeHang(820, 520, 520, t + 1, 50, { col: GOLD }) + snakeHang(560, 340, 300, t + 2, 38, { col: JAR });
    s += fgTrunks(t, 0, 0, -400, 3, 0.9);
    return FIN(Pf, t, s, lt, 2.4, 1.0, 1.2, 540, 700, 2);
  });
  /* 54.3 olha para cima / 55.15 cobra sobre a cabeça */
  SN(sg(29), 0.02, (t, lt, Pf) => {
    let s = BIG('#102418') + treesI(Pf, t, -300, 1400, 1300, 900, '#082018', '#124030') + snakeHang(700, 0, 500, t, 44);
    s += G(lucasFig({ back: 1, scale: 1, t, look: 1, headTilt: -20, scared: 0.5 }), 'translate(540 1900) scale(1.8)');
    return FIN(Pf, t, s, lt, 0.8, 1.0, 1.1, 540, 700, 1);
  });
  SN(sg(30), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 2.5);
    let s = jungle(Pf, t, 'dusk') + R(-400, -400, 1880, 2720, '#000', OP(0.3));
    s += G(branchObj(0, 500, 1200, 1.1), '') + snakeCoil(520, 520, 1.3, t, { raise: 0, headAng: 90, tongue: 0.7, turns: 3 });
    s += lucasFace({ t, eye: 1, pupil: 0.3, lookx: 0, looky: -30, worry: 1, sweat: 1, mouth: 0.2, mess: 1, wet: 1, bodyLen: 260 }).replace(/^/, '') ? G(lucasFace({ t, eye: 1, pupil: 0.3, looky: -30, worry: 1, sweat: 1, mouth: 0.2, mess: 1, wet: 1, bodyLen: 260 }), 'translate(540 1320) scale(1.5)') : '';
    return FIN(Pf, t, s, lt, 2.5, 1.0, 1.25, 540, 700 + 200 * u, 2);
  });
  /* 58.19 coração dispara */
  SN(sg(31), 0.02, (t, lt, Pf) => {
    const b = Math.pow(Math.max(0, Math.sin(t * 9)), 6);
    let s = BIG('#1a0a0e') + glow(Pf, 'R', 540, 960, 700 + 150 * b, 0.4 + 0.3 * b) + LUC({ t, eye: 1, pupil: 0.25, worry: 1, sweat: 1, mouth: 0.4, tremble: 4, mess: 1, wet: 1 }, 540, 960, 2.8 + 0.1 * b);
    s += ringWaves(540, 960, t, 0, 3, 600, 'rgba(255,60,60,0.4)', 1, 6);
    return FIN(Pf, t, s, lt, 1.2, 1.0, 1.15, 540, 960, 3 + 4 * b);
  });
  /* 59.43 precisa de abrigo antes de anoitecer: sol desce */
  SN(sg(32), 0.02, (t, lt, Pf) => {
    const u = lt / 2.5;
    let s = skyI(Pf, t, 1100, 'dusk', { clouds: 4 }) + C(540, H.lerp(1000, 1180, u), 110, '#ffcf6a') + glow(Pf, 'A', 540, H.lerp(1000, 1180, u), 500, 0.8) + treesI(Pf, t, -300, 1400, 1300, 700, '#06160f', '#0e2a1e') + R(-400, 1300, 1880, 800, '#08140e');
    s += G(lucasFig({ back: 1, scale: 1, t, walk: lt * 0.3 }), 'translate(540 1800) scale(1.3)');
    s += R(-400, -400, 1880, 2720, '#02050a', OP(0.5 * u));
    return FIN(Pf, t, s, lt, 2.5, 1.0, 1.15, 540, 1000, 2);
  });
  /* 61.95 atravessar território: mata cheia de olhos */
  SN(sg(33), 0.02, (t, lt, Pf) => {
    let s = jungle(Pf, t, 'night') + R(-400, -400, 1880, 2720, '#02080a', OP(0.45));
    for (let i = 0; i < 9; i++) s += eyesPair(Pf, 80 + hz(i, 81) * 920, 900 + hz(i, 82) * 600, 0.7, '#ffd35a', 0.5 + 0.5 * Math.sin(t * 3 + i), 28);
    s += G(lucasFig({ back: 1, scale: 1, t, walk: t * 0.5 }), 'translate(540 1850) scale(1.2)');
    return FIN(Pf, t, s, lt, 3.4, 1.0, 1.2, 540, 1100, 2);
  });
  /* 65.6 primeira regra: mão e folhas */
  SN(sg(34), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a1a12') + TX(540, 700, '1', 420, '#ffd35a', 'opacity="0.9"') + TX(540, 940, 'REGRA', 120, '#fff'), lt, 0.5, 1.0, 1.25, 540, 900, 5));
  SN(sg(35), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.5);
    let s = BIG('#0a1a12') + glow(Pf, 'A', 540, 900, 700, 0.3) + R(-400, 1200, 1880, 800, '#1a2a1c');
    s += G(R(-240, -120, 480, 240, '#10241a', 'rx="40"'), 'translate(540 1000)') + G(R(-200, -90, 400, 180, '#06100a', 'rx="30"'), 'translate(540 1000)');
    s += snakeCoil(540, 1060, 0.7, t, { raise: 100, tongue: 0.4, headAng: 0 }).replace(/^/, '');
    s += HAND(H.lerp(900, 640, u), H.lerp(1400, 1020, u), 2.2, PAL.skin, -40) + bigX(540, 940, 180, ez(H.prog(lt, 1.0, 1.4)));
    return FIN(Pf, t, s, lt, 2.6, 1.0, 1.15, 540, 1000, 2);
  });
  /* 68.74 cobra entre folhas / 70.82 pedras ou galhos */
  SN(sg(36), 0.02, (t, lt, Pf) => {
    let s = BIG('#0e1c12') + R(-400, 1200, 1880, 800, '#1a2a1c');
    for (let i = 0; i < 16; i++) s += E(hz(i, 91) * 1080, 1200 + hz(i, 92) * 600, 80 + 60 * hz(i, 93), 22, mixc('#2a5a2a', '#6a5a22', hz(i, 94)), `transform="rotate(${f1(hz(i, 95) * 60 - 30)} ${f1(hz(i, 91) * 1080)} ${f1(1200 + hz(i, 92) * 600)})"`);
    s += snakeCrawl(-100, 1480, 1200, 1420, H.lerp(0.1, 1.0, lt / 2.0), t, 54, { col: JAR, len: 500 }) + eyesPair(Pf, 760, 1400, 0.9, '#ffd35a', 0.8, 30);
    return FIN(Pf, t, s, lt, 2.0, 1.0, 1.1, 540, 1300, 2);
  });
  SN(sg(37), 0.02, (t, lt, Pf) => {
    let s = BIG('#0e1c12') + rockI(260, 1500, 520, 380, 41) + rockI(800, 1500, 460, 300, 42) + branchObj(100, 700, 900, 1.2);
    s += snakeHang(520, 760, 260, t, 40) + snakeCoil(280, 1330, 0.6, t, { raise: 100 }) + glow(Pf, 'A', 540, 1100, 600, 0.2);
    return FIN(Pf, t, s, lt, 1.3, 1.0, 1.15, 540, 1100, 2);
  });
  /* 72.18 trilha estreita subindo */
  SN(sg(38), 0.02, (t, lt, Pf) => {
    const u = lt / 2.0;
    let s = trailBG(Pf, t, 'dusk') + G(lucasFig({ back: 1, scale: 1, t, walk: t * 0.9 }), `translate(${f1(H.lerp(560, 700, u))} ${f1(H.lerp(1850, 1350, u))}) scale(${f1(H.lerp(1.5, 0.8, u))})`);
    return FIN(Pf, t, s, lt, 2.1, 1.0, 1.1, 540, 1000, 2);
  });
  /* 74.3 de repente / 74.84 movimento na vegetação */
  SN(sg(39), 0.01, (t, lt, Pf) => FIN(Pf, t, trailBG(Pf, t, 'dusk') + R(-400, -400, 1880, 2720, '#000', OP(0.3)) + glow(Pf, 'R', 540, 960, 500, 0.12), lt, 0.5, 1.0, 1.1, 540, 1000, 6) + FB('#fff', 0.3 * Math.exp(-lt * 12)));
  SN(sg(40), 0.02, (t, lt, Pf) => {
    let s = jungle(Pf, t, 'dusk') + R(-400, -400, 1880, 2720, '#000', OP(0.3));
    for (let i = 0; i < 6; i++) s += E(150 + i * 170, 1250 + 20 * Math.sin(t * 8 + i), 130, 40, '#1a4a2a', `transform="rotate(${f1(8 * Math.sin(t * 9 + i))} ${150 + i * 170} 1250)"`);
    s += eyesPair(Pf, 640, 1230, 0.9, '#ffd35a', 0.6 + 0.4 * Math.sin(t * 6), 34);
    return FIN(Pf, t, s, lt, 2.0, 1.0, 1.25, 640, 1200, 3);
  });
  /* 76.81 para imediatamente */
  SN(sg(41), 0.02, (t, lt, Pf) => FIN(Pf, t, trailBG(Pf, t, 'dusk') + G(lucasFig({ back: 0, side: 0, scale: 1, t, scared: 0.8 }), 'translate(540 1700) scale(1.5)') + eyesPair(Pf, 560, 1130, 0.6, '#ffd35a', 0.5, 20), lt, 1.3, 1.0, 1.1, 540, 1100, 1));
  /* 78.1 jararaca atravessa lentamente */
  SN(sg(42), 0.02, (t, lt, Pf) => {
    let s = trailBG(Pf, t, 'dusk') + snakeCrawl(-100, 1430, 1250, 1380, H.lerp(0.1, 1.0, lt / 2.0), t, 56, { col: JAR, len: 560, tongue: 0.5 });
    s += G(lucasFig({ back: 1, scale: 1, t }), 'translate(540 1760) scale(1.0)');
    return FIN(Pf, t, s, lt, 2.0, 1.0, 1.2, 600, 1350, 2);
  });
  /* 80.1 espera ela desaparecer */
  SN(sg(43), 0.02, (t, lt, Pf) => FIN(Pf, t, trailBG(Pf, t, 'dusk') + snakeCrawl(300, 1380, 1250, 1380, H.lerp(0.9, 1.5, lt / 1.5), t, 56, { col: JAR, len: 560 }) + G(lucasFig({ back: 1, scale: 1, t }), 'translate(540 1760) scale(1.0)'), lt, 1.6, 1.0, 1.05, 540, 1100, 1));
  /* 81.79 mais adiante / 82.57 mochila abandonada */
  SN(sg(44), 0.02, (t, lt, Pf) => FIN(Pf, t, trailBG(Pf, t, 'dusk') + G(lucasFig({ back: 1, scale: 1, t, walk: t * 0.9 }), `translate(560 ${f1(1850 - 150 * lt / 0.8)}) scale(${f1(1.4 - 0.4 * lt / 0.8)})`), lt, 0.8, 1.0, 1.1, 540, 1000, 2));
  SN(sg(45), 0.02, (t, lt, Pf) => FIN(Pf, t, jungle(Pf, t, 'dusk') + R(-400, 1300, 1880, 700, '#1a2a1c') + glow(Pf, 'A', 540, 1350, 500, 0.35) + backpackObj(540, 1700, 1.3, 0, t), lt, 1.5, 1.0, 1.25, 540, 1300, 2));
  /* 84.06 dentro dela: itens */
  SN(sg(46), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0e1a14') + glow(Pf, 'A', 540, 1000, 700, 0.3) + R(-400, 1500, 1880, 600, '#1a2a1c') + backpackObj(540, 1700, 1.7, ez(lt / 0.6), t), lt, 1.2, 1.0, 1.1, 540, 1100, 2));
  SN(sg(47), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0e1a14') + glow(Pf, 'B', 540, 900, 600, 0.35) + G(R(-90, -300, 180, 520, 'rgba(154,214,240,0.7)', 'rx="50"') + R(-40, -380, 80, 80, '#e8e8f0', 'rx="10"') + R(-90, -90, 180, 90, 'rgba(60,140,200,0.5)') + L(-60, -240, -60, 160, '#fff', 8, OP(0.5)), `translate(540 1000) rotate(${f1(4 * Math.sin(t * 2))}) scale(1.5)`), lt, 1.3, 1.0, 1.2, 540, 960, 1));
  SN(sg(48), 0.02, (t, lt, Pf) => {
    const lb = lt > 0.5 ? 1 : 0;
    let s = BIG('#0a1210') + G(lanternObj(Pf, { on: 1, t, sw: 4 * Math.sin(t * 3) }), 'translate(300 960) scale(2.6)') + radioVintage(Pf, { on: 0, t, x: 760, y: 1180, scale: 0.9 });
    s += beam(Pf, 300, 1010, 20, 900, 14, 0.5);
    return FIN(Pf, t, s, lt, 2.0, 1.0, 1.15, 540, 1000, 2);
  });
  /* 87.92 bilhete */
  SN(sg(49), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a1210') + glow(Pf, 'A', 540, 960, 700, 0.4) + HAND(300, 1500, 2.6, PAL.skin, 30) + noteObj(540, 980, 1.7, -4, ['SE ENCONTRAR', 'ALGUÉM NESTA', 'ILHA...'], 40), lt, 2.4, 1.0, 1.25, 540, 960, 1));
  SN(sg(50), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a1210') + glow(Pf, 'A', 540, 960, 700, 0.4) + noteObj(540, 980, 2.0, -3, ['SE ENCONTRAR', 'ALGUÉM NESTA', 'ILHA...'], 40), lt, 1.4, 1.0, 1.15, 540, 960, 1));
  SN(sg(51), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a1210') + glow(Pf, 'R', 540, 960, 700, 0.2 + 0.15 * Math.sin(t * 6)) + noteObj(540, 980, 2.0, 2, ['NÃO DIGA', 'SEU NOME.'], 66), lt, 1.2, 1.0, 1.3, 540, 960, 3));
  /* 93.06 olha ao redor / 93.81 quem escreveu / 94.68 e por quê */
  SN(sg(52), 0.02, (t, lt, Pf) => FIN(Pf, t, jungle(Pf, t, 'dusk') + R(-400, -400, 1880, 2720, '#000', OP(0.3)) + LUC({ t, eye: 1, pupil: 0.5, lookx: 25 * Math.sin(t * 2), worry: 0.7, sweat: 1, mess: 1, wet: 1, mouth: 0.1 }, 540, 1050, 2.2), lt, 0.8, 1.0, 1.1, 540, 1000, 2));
  SN(sg(53), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#08100c') + questionMarks(t, 540, 960, 400, 5) + LUC({ t, eye: 1, pupil: 0.4, worry: 0.9, sweat: 1, mess: 1, wet: 1, mouth: 0.1 }, 540, 1150, 2.0), lt, 0.9, 1.0, 1.15, 540, 1000, 2));
  SN(sg(54), 0.02, (t, lt, Pf) => FIN(Pf, t, BIG('#0a0608') + TX(540, 1150, '?', 900, '#ff3b30', OP(0.8 + 0.2 * Math.sin(t * 8))), lt, 0.6, 1.0, 1.3, 540, 960, 5));
}
