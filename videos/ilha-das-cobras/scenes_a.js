/* scenes_a.js - 0 a ~60 s. 0-15.19 em 2.5D (paralaxe); depois 2D. */
const LUC = (o, x, y, sc) => lf(o, x, y, sc);
const lumi = (Pf, a) => glow(Pf, 'B', 540, 600, 900, a);
const lensFx = (Pf, t, v = 1) => vignette(Pf, v) + grain(t, 0.08);
const wispL = (t, n, y0, y1, col = 'rgba(210,225,235,0.5)') => { let s = ''; for (let i = 0; i < n; i++) { const x = ((hz(i, 41) * 1800 + t * (40 + 40 * hz(i, 42))) % 1800) - 360; s += E(x, y0 + (y1 - y0) * hz(i, 43), 300 + 200 * hz(i, 44), 40 + 30 * hz(i, 45), col); } return s; };
const rockFloor = (Pf, y, col = '#34444f') => R(-400, y, 1880, 1400, col) + [0, 1, 2, 3, 4, 5, 6].map(i => rockI(60 + i * 170 + 40 * hz(i, 51), y + 40 + 30 * hz(i, 52), 220 + 80 * hz(i, 53), 70 + 50 * hz(i, 54), 60 + i, mixc(col, '#0a1218', 0.2 * hz(i, 55)))).join('') + R(-400, y + 60, 1880, 1400, '#9ad6f0', OP(0.07));
const islandSil = (Pf, t, x, y, sc, lit = 0) => G(P('M-520,0 Q-380,-120 -220,-170 Q-60,-260 80,-230 Q300,-200 420,-90 Q520,-40 560,0Z', '#10261f') + treesI(Pf, t, -400, 400, -140, 120, '#0b2a22', '#1a4a38') + P('M-520,0 Q-380,-120 -220,-170 Q-60,-260 80,-230 L80,0Z', '#000', OP(0.15)) + lighthouseObj(Pf, 120, -200, 0.55, lit, t), T(x, y, 0, sc));

function partD(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);

  /* 0.0 HOOK 2.5D: cabeça da cobra dourada em close extremo, rosto de Lucas desfocado atrás */
  SN(0, 0.001, (t, lt, Pf) => {
    const u = ez(lt / 0.47), cam = { x: 540 + 16 * Math.sin(t * 2), y: 960 - 20 * u, z: 1 + 0.1 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: skyI(Pf, t, 800, 'dawn', { clouds: 3 }) },
      { d: 0.3, svg: seaI(Pf, t, 1000, 0.6, { n: 3, c1: '#2a6a8a', span: 300 }) + islandSil(Pf, t, 800, 1010, 0.9, 0) },
      { d: 0.7, svg: rockFloor(Pf, 1350), fog: 0.25, fogc: '#2a4050' },
      { d: 1.0, svg: LUC({ t, eye: 1, pupil: 0.6, lookx: 14, looky: 12, worry: 0.2, mouth: 0.1, mess: 1, wet: 1, tilt: -6, bodyLen: 260 }, 560, 760, 2.3), blur: 14 },
      { d: 1.5, svg: glow(Pf, 'A', 540, 1100, 620, 0.5) + snakeHeadFront(540, 1180, 3.7, { tongue: 0.5 + 0.5 * Math.sin(t * 9) * 0.5 }) },
      { d: 2.0, svg: motes(t, 16, 1080, 1920, 5, 'rgba(255,240,190,0.7)', 6, 14), blur: 6 },
    ]) + FB('#fff', 0.6 * Math.exp(-lt * 12)) + lensFx(Pf, t);
  });
  /* acordar: olhos abrem, cobra borrada no primeiro plano */
  SN(tw('acordar', 0, 0.47), 0.02, (t, lt, Pf) => {
    const o = E_.inOut ? 0 : 0, u = ez(lt / 1.1), cam = { x: 540 - 40 * u, y: 960, z: 1.05 + 0.12 * u }, eye = H.prog(lt, 0.05, 0.4);
    return par(Pf, cam, [
      { d: 0.1, svg: skyI(Pf, t, 800, 'dawn', { clouds: 3 }) },
      { d: 0.45, svg: seaI(Pf, t, 1100, 0.6, { n: 3, c1: '#2a6a8a', span: 300 }) + rockI(300, 1200, 600, 200, 3) },
      { d: 1.0, svg: LUC({ t, eye, pupil: 0.5, lookx: 20, worry: 0.15, mouth: 0.15, mess: 1, wet: 1, tilt: 4, bodyLen: 260 }, 480, 900, 2.5) },
      { d: 1.9, svg: snakeCoil(900, 1500, 1.8, t, { raise: 130 }), blur: 14 },
    ]) + lensFx(Pf, t);
  });
  /* nesta ilha: panorâmica da ilha, câmera sobe */
  SN(tw('ilha', 0, 1.1), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.5), cam = { x: 540 + 80 * (1 - u), y: 1000 - 70 * u, z: 1 + 0.25 * u };
    return par(Pf, cam, [
      { d: 0.05, svg: skyI(Pf, t, 1000, 'dawn', { clouds: 4 }) },
      { d: 0.35, svg: seaI(Pf, t, 1200, 0.8, { n: 4, c1: '#2a6a8a', span: 400 }) },
      { d: 0.7, svg: islandSil(Pf, t, 540, 1250, 1.6, 0) },
      { d: 1.5, svg: rockFloor(Pf, 1650), blur: 6 },
      { d: 2.2, svg: wispL(t, 4, 700, 1500, 'rgba(210,225,235,0.35)'), blur: 26 },
    ]) + lensFx(Pf, t);
  });
  /* encontrar uma cobra: cobra enrolada entre rochas, câmera baixa */
  SN(tw('encontrar', 0, 1.58), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.8), cam = { x: 540 - 60 * u, y: 1000 + 30 * u, z: 1 + 0.3 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: skyI(Pf, t, 700, 'dawn', { clouds: 3 }) },
      { d: 0.4, svg: seaI(Pf, t, 800, 0.6, { n: 3, c1: '#2a6a8a', span: 300 }) + islandSil(Pf, t, 760, 810, 0.6, 0) },
      { d: 0.8, svg: rockFloor(Pf, 1050) },
      { d: 1.2, svg: glow(Pf, 'A', 540, 1200, 500, 0.4) + snakeCoil(540, 1330, 1.7, t, { raise: 230, tongue: 0.6 }) },
      { d: 1.8, svg: rockI(100, 1750, 500, 220, 8, '#2a3840') + rockI(1000, 1780, 560, 260, 9, '#2a3840'), blur: 6 },
    ]) + lensFx(Pf, t);
  });
  /* cobra dourada: close frontal brilhando */
  SN(tw('dourada', 0, 2.62), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.5), cam = { x: 540, y: 960, z: 1 + 0.4 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: BIG('#0a1620') + glow(Pf, 'A', 540, 900, 900, 0.5) },
      { d: 0.7, svg: rockFloor(Pf, 1500, '#27333c'), blur: 6 },
      { d: 1.2, svg: snakeHeadFront(540, 1000, 3.3, { tongue: 0.5 + 0.5 * Math.sin(t * 8) }) },
      { d: 2.0, svg: motes(t, 20, 1080, 1920, 7, 'rgba(255,230,140,0.8)', 7, 10), blur: 6 },
    ]) + lensFx(Pf, t);
  });
  /* olhando para o seu rosto: rosto de Lucas close, olho enorme */
  SN(tw('olhando', 0, 2.98), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.9), cam = { x: 540, y: 960, z: 1 + 0.2 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: BIG('#0a1620') + glow(Pf, 'B', 540, 700, 800, 0.35) },
      { d: 1.0, svg: LUC({ t, eye: 1, pupil: 0.3, lookx: 0, looky: 4, worry: 0.9, mouth: 0.2, sweat: 1, tremble: 2, mess: 1, wet: 1, bodyLen: 260 }, 540, 900, 3.4) },
      { d: 1.8, svg: snakeHeadSide(1100, 1400, 200, 3.4, { tongue: 0.7 }), blur: 14 },
    ]) + lensFx(Pf, t);
  });
  /* não faça nenhum movimento brusco: Lucas congelado, cobra se aproxima */
  SN(sg(1), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.8), cam = { x: 540 + 30 * Math.sin(lt * 1.5), y: 960, z: 1 + 0.1 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: skyI(Pf, t, 900, 'dawn', { clouds: 3 }) + seaI(Pf, t, 900, 0.5, { n: 3, c1: '#2a6a8a', span: 300 }) },
      { d: 0.8, svg: rockFloor(Pf, 1250) },
      { d: 1.0, svg: LUC({ t, eye: 1, pupil: 0.3, lookx: -10, worry: 1, mouth: 0, sweat: 1, tremble: 1, mess: 1, wet: 1, bodyLen: 260 }, 440, 700, 2.0) },
      { d: 1.4, svg: snakeCrawl(1300, 1500, 300, 1380, u * 0.8, t, 56, { col: GOLD, len: 600, tongue: 0.6 }) },
      { d: 2.0, svg: rockI(900, 1900, 600, 260, 4, '#243038'), blur: 14 },
    ]) + lensFx(Pf, t);
  });
  /* 6.43 Porque você está num dos lugares mais perigosos: ilha aérea */
  SN(sg(2), 0.02, (t, lt, Pf) => {
    const u = lt / 2.7, cam = { x: 540, y: 1100 - 220 * ez(u), z: 1.0 + 0.5 * ez(u) };
    return par(Pf, cam, [
      { d: 0.05, svg: skyI(Pf, t, 900, 'dusk', { clouds: 5 }) },
      { d: 0.3, svg: seaI(Pf, t, 1000, 1.0, { n: 5, c1: '#2a5a7a', span: 500 }) },
      { d: 0.8, svg: islandSil(Pf, t, 540, 1160, 1.9, 1) },
      { d: 1.6, svg: wispL(t, 5, 400, 1700, 'rgba(220,200,210,0.4)'), blur: 26 },
    ]) + glow(Pf, 'R', 540, 1000, 700, 0.15 + 0.1 * Math.sin(t * 4)) + lensFx(Pf, t);
  });
  /* 9.13 e talvez ninguém venha buscar: mar vazio, câmera recua */
  SN(sg(3), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.6), cam = { x: 540, y: 960, z: 1.6 - 0.6 * u };
    return par(Pf, cam, [
      { d: 0.05, svg: skyI(Pf, t, 960, 'dusk', { clouds: 4 }) },
      { d: 0.5, svg: seaI(Pf, t, 960, 1.2, { n: 6, c1: '#1a4a68', span: 700 }) },
      { d: 1.2, svg: C(840, 1000, 5, '#fff', OP(0.4 + 0.4 * Math.sin(t * 4))) + wispL(t, 3, 400, 900, 'rgba(220,200,210,0.3)'), blur: 6 },
      { d: 1.8, svg: R(-200, 1700, 1500, 400, '#050c14', OP(0.7)), blur: 26 },
    ]) + lensFx(Pf, t, 1.2);
  });
  /* 10.77 Seu nome é Lucas: retrato */
  SN(sg(4), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.0), cam = { x: 540, y: 960, z: 1 + 0.12 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: skyI(Pf, t, 1000, 'dusk', { clouds: 3 }) + seaI(Pf, t, 1000, 0.6, { n: 3, c1: '#1a4a68', span: 300 }) },
      { d: 1.0, svg: glow(Pf, 'A', 540, 760, 700, 0.35) + LUC({ t, eye: 1, pupil: 0.5, lookx: 0, worry: 0.3, mouth: 0.3, smile: 0.2, mess: 1, wet: 1, bodyLen: 260 }, 540, 800, 2.6) },
      { d: 1.7, svg: wispL(t, 3, 1300, 1900, 'rgba(10,20,30,0.5)'), blur: 26 },
    ]) + lensFx(Pf, t);
  });
  /* 11.73 Você tem 29 anos / trabalhava num pequeno barco: barco ao entardecer */
  SN(sg(5), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 3.4), cam = { x: 540 - 120 + 240 * u, y: 960, z: 1.05 + 0.1 * u };
    return par(Pf, cam, [
      { d: 0.05, svg: skyI(Pf, t, 1000, 'dusk', { clouds: 5 }) },
      { d: 0.3, svg: seaI(Pf, t, 1050, 0.7, { n: 3, c1: '#2a5a7a', span: 300 }) },
      { d: 0.9, svg: boatObj(Pf, t, 520, 1180 + 6 * Math.sin(t * 1.5), 1.3, 2 * Math.sin(t * 1.2), 1) },
      { d: 1.3, svg: seaI(Pf, t, 1330, 1.4, { n: 4, c1: '#0e3250', c2: '#030a14', span: 700 }), blur: 6 },
      { d: 2.0, svg: wispL(t, 3, 500, 1000, 'rgba(255,200,170,0.25)'), blur: 26 },
    ]) + lensFx(Pf, t);
  });

  /* ================= 2D a partir de 15.19 ================= */
  /* 15.19 tempestade vira o barco */
  SN(sg(6), 0.3, (t, lt, Pf) => {
    const u = ez(lt / 3.0);
    let s = skyI(Pf, t, 800, 'storm', { clouds: 8 }) + seaI(Pf, t, 1000, 2.2, { n: 6, c1: '#1a3a52', c2: '#02060c', span: 800 });
    s += boatObj(Pf, t, 540, 1180 + 20 * Math.sin(t * 3), 1.5, 8 + 80 * u + 6 * Math.sin(t * 5), 1);
    s += rainFx(t, 90, 1080, 1920, 'rgba(190,210,235,0.45)', 0.3, 2.4);
    const fl = Math.pow(Math.max(0, Math.sin(t * 5.2)), 30);
    s += R(0, 0, 1080, 1920, '#cfe0ff', OP(0.5 * fl));
    return cam3(t, lt, 540, 1000, 1.0, 1.15, 3.2, 3 * Math.sin(t * 2), 6, s) + vignette(Pf, 1) + grain(t, 0.08);
  });
  /* 18.49 abre os olhos */
  SN(sg(7), 0.03, (t, lt, Pf) => {
    const e = H.prog(lt, 0.2, 0.9);
    let s = skyI(Pf, t, 0, 'dawn', { clouds: 4 }) + rockFloor(Pf, 400, '#2a3a45') + glow(Pf, 'B', 540, 500, 1000, 0.2);
    s += LUC({ t, eye: e, pupil: 0.5, worry: 0.5, mouth: 0.2, mess: 1, wet: 1, tilt: 5, bodyLen: 260 }, 540, 920, 3.0);
    return cam3(t, lt, 540, 960, 1.0, 1.12, 1.0, 0, 3, s) + FB('#000', 0.9 * (1 - e)) + vignette(Pf, 1) + grain(t, 0.08);
  });
  /* 19.53 deitado sobre pedras molhadas */
  SN(sg(8), 0.03, (t, lt, Pf) => {
    let s = skyI(Pf, t, 800, 'dawn', { clouds: 4 }) + seaI(Pf, t, 800, 0.6, { n: 3, c1: '#2a6a8a', span: 300 }) + rockFloor(Pf, 950, '#2c3c48');
    s += G(lucasF({ back: 0, walk: 0, scale: 1, t, scared: 0.5 }), 'translate(540 1500) rotate(78) scale(1.3)');
    s += wispL(t, 3, 1400, 1800, 'rgba(210,225,235,0.2)');
    return cam3(t, lt, 540, 1250, 1.0, 1.15, 1.8, 0, 2, s) + vignette(Pf, 1) + grain(t, 0.08);
  });
  /* 21.12 braço machucado */
  SN(sg(9), 0.03, (t, lt, Pf) => {
    let s = BIG('#1a2830') + glow(Pf, 'B', 540, 700, 800, 0.2) + R(-400, 1300, 1880, 800, '#2c3c48');
    const arm = P('M-60,-300 Q-100,0 -70,400 L70,400 Q100,0 60,-300Z', PAL.skin) + P('M-60,300 Q0,330 60,300 L66,400 L-66,400Z', '#000', OP(0.1));
    s += G(arm + P('M-50,60 Q0,20 40,90 Q60,120 20,150 Q-30,150 -50,100Z', '#b01c2c') + P('M-30,70 L10,110 M-10,60 L30,130', 'none', 'stroke="#6a0c18" stroke-width="5"') + [0, 1, 2, 3].map(i => C(-20 + 18 * i, 160 + 40 * i + ((t * 60 + i * 50) % 150) * 0, 7, '#c8283a', OP(0.8))).join(''), 'translate(540 900) rotate(12) scale(1.6)');
    s += ringWaves(540, 960, t, 0, 2, 400, 'rgba(255,60,60,0.3)', 1, 5);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.5, 0, 3, s) + vignette(Pf, 1) + grain(t, 0.08);
  });
  /* 22.7 o barco desapareceu: mar vazio */
  SN(sg(10), 0.03, (t, lt, Pf) => {
    let s = skyI(Pf, t, 900, 'dawn', { clouds: 4 }) + seaI(Pf, t, 900, 1.0, { n: 6, c1: '#2a6a8a', span: 800 });
    s += G(boatObj(Pf, t, 760, 960, 0.2, 10, 0), '', OP(0.9 * (1 - H.prog(lt, 0.2, 1.1))));
    s += E(540, 1000, 300, 14, 'rgba(255,255,255,0.15)', OP(1 - H.prog(lt, 0, 1)));
    s += rockI(100, 1900, 600, 280, 12, '#243038') + rockI(1000, 1900, 500, 220, 13, '#243038');
    return cam3(t, lt, 540, 960, 1.15, 1.0, 1.2, 0, 2, s) + vignette(Pf, 1) + grain(t, 0.08);
  });
  /* 23.94 celular não funciona */
  SN(sg(11), 0.03, (t, lt, Pf) => {
    let s = BIG('#101c26') + glow(Pf, 'B', 540, 900, 700, 0.25) + rockFloor(Pf, 1450, '#2c3c48');
    s += HAND(540, 1200, 3.0, PAL.skin, -8);
    s += G(phoneObj(Pf, { x: 0, y: 0, scale: 1, noSig: 1, batt: 0, t }), T(540, 880, -8 + 2 * Math.sin(t * 7), 1.5));
    s += bigX(540, 880, 190, ez(lt / 0.4));
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.3, 0, 3, s) + vignette(Pf, 1) + grain(t, 0.08);
  });
}
