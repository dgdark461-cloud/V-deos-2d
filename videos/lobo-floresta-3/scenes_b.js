/* scenes_b.js - parte 3, ~59 a 111 s: o jogo, a lembrança, a fuga, a transmissão. */
const hudFx = (t, a = 1) => {
  let s = ''; const w = 80;
  for (const [x, y, sx, sy] of [[60, 60, 1, 1], [1020, 60, -1, 1], [60, 1860, 1, -1], [1020, 1860, -1, -1]]) s += PL([[x, y + sy * w], [x, y], [x + sx * w, y]], '#ff3b30', 8, OP(a));
  s += C(120, 150, 14, '#ff3b30', OP((0.5 + 0.5 * Math.sin(t * 6)) * a)) + TXT(300, 168, 'AO VIVO', 50, '#fff', OP(a)) + TXT(920, 168, '00:' + String(59 - Math.floor(t * 2) % 60).padStart(2, '0'), 50, '#fff', OP(a));
  return s;
};
const roadBG = (Pf, t, sp = 1) => {
  let s = BIG('#04070d') + R(-400, 800, 1880, 1300, '#10151d');
  s += forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 800 }) + P('M300,1920 L480,800 L600,800 L1100,1920Z', '#1a212b');
  for (let i = 0; i < 9; i++) { const z = (((i / 9) + t * 0.5 * sp) % 1), y = 800 + Math.pow(z, 2) * 1120, w = 6 + z * 40, h = 20 + z * 150; s += R(540 + (z - 0.5) * 0 - w / 2 + (z * 20), y, w, h, '#ffd35a', OP(0.9 * z)); }
  return s;
};

function partE(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);

  /* 58.95 Clara explica */
  SN(sg(42), 0.03, (t, lt, Pf) => {
    let s = BIG('#120d0a') + glow(Pf, 'A', 300, 800, 800, 0.5) + cf({ t, eye: 1, pupil: 0.8, worry: 0.4, mouth: 0.3 + 0.3 * Math.abs(Math.sin(t * 9)), tilt: 3 }, 540, 960, 2.3);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.0, 0, 0.5, s) + vignette(Pf, 1);
  });
  /* 60.0 um grupo: silhuetas */
  SN(tw('grupo', 0, 60.0), 0.02, (t, lt, Pf) => {
    let s = BIG('#080b12') + glow(Pf, 'B', 540, 900, 900, 0.3);
    for (let i = 0; i < 4; i++) s += G(manSil({ scale: 1, eyes: 1, col: '#05070a', t, rim: 0.6 }), `translate(${f1(150 + i * 250)} ${f1(1700 - 40 * (i % 2))}) scale(${(0.9 + 0.1 * (i % 2)).toFixed(2)})`);
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 1.1, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 61.0 sequestra: vítima com saco na cabeça */
  SN(tw('sequestra', 0, 61.0), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + glow(Pf, 'R', 540, 900, 900, 0.25) + polaroid(Pf, { x: 540, y: 940, w: 560, h: 640, rot: 3 * Math.sin(t * 3), bag: 1, who: 2 });
    s += paleHand(120 + 20 * Math.sin(t * 14), 1500, 1.8, 40) + paleHand(960 - 20 * Math.sin(t * 14), 1500, 1.8, -40);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.0, 0, 3, s) + vignette(Pf, 1);
  });
  /* 62.0 pergunta absurda */
  SN(tw('pergunta', 0, 62.0), 0.02, (t, lt, Pf) => {
    const u = E_.outBack(k(lt, 0, 0.3));
    let s = BIG('#0a0610') + glow(Pf, 'R', 540, 960, 1000, 0.3);
    s += G(R(-420, -170, 840, 340, '#1a1226', 'rx="50" stroke="#ff6a5a" stroke-width="10"') + TXT(0, -20, 'HOMEM', 120, '#fff') + TXT(0, 110, 'OU LOBO?', 120, '#ff6a5a'), `translate(540 960) scale(${(1.2 * u).toFixed(3)}) rotate(${f1(-3 + 2 * Math.sin(t * 4))})`);
    s += questionMarks(t, 540, 960, 480, 6, '#ffb0a0');
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.2, 0, 2, s) + vignette(Pf, 1);
  });
  /* 63.26 jogo de perseguição */
  SN(sg(43), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: lt * 500, fog: 0.7, shafts: 0, ground: 1500 }) + fgTrunks(t, lt * 900, 2, -200, 4, 0.95);
    s += G(youFig({ back: true, run: 1, walk: t * 2.6, scale: 0.9, scared: 1, arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)) }), 'translate(540 1580)');
    s += G(manJacket(Pf, { scale: 0.65, eyes: 1, t, lantern: 1, walk: t * 2.2, rim: 0.4 }), 'translate(860 1420)');
    return cam3(t, lt, 540, 1100, 1.0, 1.15, 2.0, 0, 4, s) + hudFx(t) + vignette(Pf, 1);
  });
  /* 65.63 transmitido para apostadores */
  SN(sg(44), 0.02, (t, lt, Pf) => {
    let s = BIG('#06090e') + monitorGrid(Pf, t, 1);
    for (let i = 0; i < 12; i++) { const ph = (t * 0.5 + hz(i, 2)) % 1; s += G(R(-50, -26, 100, 52, '#3fb26a', 'rx="6"') + C(0, 0, 14, '#1d6b3a'), `translate(${f1(100 + hz(i, 3) * 880)} ${f1(-60 + ph * 2050)}) rotate(${f1(ph * 360)})`, OP(0.85)); }
    return cam3(t, lt, 540, 960, 1.0, 1.12, 1.6, 0, 1, s) + vignette(Pf, 1);
  });
  /* 67.23 lobo: enfrenta o animal */
  SN(sg(45), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 1500 }) + R(-400, -400, 1880, 2720, 'rgba(30,0,0,0.25)');
    s += G(wolfHead({ t, snarl: 1, eye: 1, glow: 1, lookx: 0 }), 'translate(540 760) scale(1.7)');
    s += G(youFig({ back: true, scale: 0.55, scared: 1, arms: [100, 40, -100, -40] }), 'translate(540 1780)');
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.4, 0, 3, s) + vignette(Pf, 1);
  });
  /* 68.84 homem: alvo de caçador */
  SN(sg(46), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 1500 }) + R(-400, -400, 1880, 2720, 'rgba(30,0,0,0.25)');
    s += G(manJacket(Pf, { scale: 1.3, eyes: 1, t, lantern: 1, rim: 0.5, point: 1 }), 'translate(300 1560)');
    s += G(youFig({ back: true, scale: 0.7, scared: 1, arms: [80, 40, -80, -40] }), 'translate(820 1600)');
    const rr = 200 - 60 * cl(lt * 1.5);
    s += C(820, 1260, rr, 'none', 'stroke="#ff3b30" stroke-width="10"') + L(820 - rr - 50, 1260, 820 + rr + 50, 1260, '#ff3b30', 6) + L(820, 1260 - rr - 50, 820, 1260 + rr + 50, '#ff3b30', 6);
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 1.4, 0, 2, s) + vignette(Pf, 1);
  });
  /* 70.95 E eu? */
  SN(sg(47), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + glow(Pf, 'B', 540, 900, 900, 0.3) + wf({ t, eye: 1, pupil: 0.55, worry: 1, mouth: 0.15, tremble: 1.5, cold: 0.15 }, 540, 960, 2.5);
    return cam3(t, lt, 540, 960, 1.1, 1.0, 0.5, 0, 0, s) + vignette(Pf, 1);
  });
  /* 71.45 você escapou da primeira vez (memória sépia) */
  SN(sg(48), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 1, px: lt * 400, fog: 0.7, shafts: 0, ground: 1500 }) + fgTrunks(t, lt * 800, 1, -200, 4, 0.9);
    s += G(youFig({ back: true, run: 1, walk: t * 2.6, scale: 1.0, scared: 1, arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)) }), 'translate(540 1600)');
    return cam3(t, lt, 540, 1100, 1.0, 1.15, 1.4, 0, 3, s) + R(-400, -400, 1880, 2720, 'rgba(150,90,30,0.28)') + vignette(Pf, 1);
  });
  /* 72.85 eles encontraram você de novo */
  SN(sg(49), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.8, shafts: 0, ground: 1700 }) + glow(Pf, 'R', 540, 900, 1000, 0.3);
    s += G(manJacket(Pf, { scale: 1.7 + 0.5 * lt, eyes: 1, t, lantern: 1, rim: 0.7 }), 'translate(540 1860)') + beam(Pf, 420, 1400, -80, 900, 14, 0.5);
    return cam3(t, lt, 540, 1100, 1.0, 1.15, 1.4, 0, 3, s) + vignette(Pf, 1);
  });
  /* 74.25 você se lembra */
  SN(sg(50), 0.02, (t, lt, Pf) => {
    let s = BIG('#101018') + glow(Pf, 'W', 540, 900, 900, 0.5) + wf({ t, eye: 1, pupil: 0.3, looky: -4, worry: 1, mouth: 0.2, tremble: 2.5, tilt: 4 * Math.sin(t * 8) }, 540, 960, 2.4);
    s += ringWaves(540, 900, t, 0, 4, 800, 'rgba(255,255,255,0.7)', 0.8, 6);
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.1, 0, 4, s) + FB('#fff', 0.5 * Math.exp(-lt * 6)) + vignette(Pf, 0.8);
  });
  /* 75.39 uma estrada */
  SN(sg(51), 0.02, (t, lt, Pf) => cam3(t, lt, 540, 1000, 1.0, 1.15, 0.8, 0, 2, roadBG(Pf, t, 1.4)) + vignette(Pf, 1));
  /* 76.12 faróis */
  SN(sg(52), 0.02, (t, lt, Pf) => {
    const g = E_.inCubic(k(lt, 0, 0.5));
    let s = roadBG(Pf, t, 2.5) + glow(Pf, 'W', 400, 1000, 200 + 1300 * g, 1) + glow(Pf, 'W', 700, 1000, 200 + 1300 * g, 1);
    return s + FB('#fff', 0.7 * g) + vignette(Pf, 0.6);
  });
  /* 76.6 mulher gritando */
  SN(sg(53), 0.02, (t, lt, Pf) => {
    let s = BIG('#dfe8f0') + glow(Pf, 'W', 540, 900, 1300, 1) + G(claraFig({ scale: 1.5, scared: 1, arms: [150 + 20 * Math.sin(t * 12), 20, -150 - 20 * Math.sin(t * 12), -20], bob: 6 * Math.sin(t * 14) }), 'translate(540 1750)');
    s += G(R(-300, -200, 600, 360, 'none'), '');
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 1.0, 0, 3, s) + R(-400, -400, 1880, 2720, 'rgba(20,20,30,0.45)') + vignette(Pf, 0.6);
  });
  /* 77.78 pancada na cabeça */
  SN(sg(54), 0.02, (t, lt, Pf) => {
    let s = BIG('#06070c');
    for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283; s += POLY([[540, 960], [540 + Math.cos(a - 0.07) * 1300 * ez(lt * 4), 960 + Math.sin(a - 0.07) * 1300 * ez(lt * 4)], [540 + Math.cos(a + 0.07) * 1300 * ez(lt * 4), 960 + Math.sin(a + 0.07) * 1300 * ez(lt * 4)]], '#fff', OP(0.9 * (1 - lt)));}
    s += wf({ t, eye: 0.2, pupil: 0.5, worry: 1, mouth: 0.5, tilt: -20 * ez(lt * 2), tremble: 4 }, 540, 960, 2.2) + R(-400, -400, 1880, 2720, '#000', OP(0.8 * k(lt, 0.5, 1.2)));
    return cam3(t, lt, 540, 960, 1.0, 1.3, 1.2, 0, 14 * Math.exp(-lt * 3), s) + FB('#fff', 0.9 * Math.exp(-lt * 12));
  });
  /* 79.52 rádio de Clara chia */
  SN(sg(56), 0.02, (t, lt, Pf) => {
    let s = BIG('#070a0f') + glow(Pf, 'B', 540, 960, 900, 0.4) + walkie({ x: 540, y: 1000, scale: 3.6, rot: 6 * Math.sin(t * 20), led: 1, t });
    for (let i = 0; i < 30; i++) s += R(hz(i, Math.floor(t * 24)) * 1080, hz(i + 40, Math.floor(t * 24)) * 1920, 30 + 120 * hz(i, 7), 6, 'rgba(255,255,255,0.35)');
    return cam3(t, lt, 540, 960, 1.0, 1.12, 0.9, 0, 3, s) + vignette(Pf, 1);
  });
  /* 80.45 Encontramos a passagem */
  SN(sg(57), 0.02, (t, lt, Pf) => {
    let s = BIG('#120608') + glow(Pf, 'R', 540, 960, 1100, 0.5 + 0.3 * Math.sin(t * 10)) + walkie({ x: 540, y: 1000, scale: 3.6, rot: -4, led: 0, t }) + ringWaves(540, 900, t, 0, 4, 800, '#ff4a4a', 0.8, 6);
    s += C(540, 990, 22, '#ff3b30');
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.1, 0, 2.5, s) + vignette(Pf, 1);
  });
  /* 81.74 Ela empalidece */
  SN(sg(58), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0e14') + glow(Pf, 'B', 540, 900, 900, 0.3) + cf({ t, eye: 1, pupil: 0.3, worry: 1, mouth: 0.1, cold: 0.85, tremble: 1.5, bruise: 0.8 }, 540, 960, 2.5);
    return cam3(t, lt, 540, 960, 1.0, 1.25, 0.9, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 82.61 correm pelo túnel */
  SN(sg(59), 0.02, (t, lt, Pf) => {
    let s = tunnelBG(Pf, t, { speed: 0.9, light: '#9fd0ff' }) + glow(Pf, 'B', 540, 880, 300 + 400 * k(lt, 0, 2), 0.8);
    s += G(claraFig({ back: true, run: 1, walk: t * 2.8, scale: 1.0, arms: [60 * Math.sin(t * 15), 70, 40, 70], bob: 5 * Math.abs(Math.sin(t * 15)) }), 'translate(480 1520)') + G(youFig({ back: true, run: 1, walk: t * 2.8 + 0.5, scale: 0.92, arms: [-40, 50, 70, 90], scared: 1, bob: 5 * Math.abs(Math.sin(t * 15 + 1)) }), 'translate(690 1540)');
    return cam3(t, lt, 540, 960, 1.0, 1.1, 2.0, 0, 3, s) + speedLines(t, 14, 'rgba(180,220,255,0.3)') + vignette(Pf, 1);
  });
  /* 84.63 atrás */
  SN(sg(60), 0.02, (t, lt, Pf) => {
    let s = tunnelBG(Pf, t, { speed: -0.5, light: '#ff5a4a', la: 0.9 }) + G(manSil({ scale: 1, eyes: 1, col: '#030405', t, rim: 0 }), 'translate(540 1180) scale(0.55)') + glow(Pf, 'R', 540, 880, 500, 0.5);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 0.6, 0, 4, s) + vignette(Pf, 1);
  });
  /* 85.12 passos ecoam */
  SN(sg(61), 0.02, (t, lt, Pf) => {
    let s = tunnelBG(Pf, t, { speed: 0.1, la: 0.5, dark: 0.3 });
    for (let i = 0; i < 3; i++) { const ph = cl(lt * 0.7 - i * 0.2); s += boot(250 + i * 280, 1500 - 300 * ph, 0.8 + ph * 2.2, '#07090d'); }
    s += ringWaves(540, 1500, t, 0, 4, 800, 'rgba(255,255,255,0.3)', 0.5, 4);
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 2.0, 0, 3, s) + vignette(Pf, 1);
  });
  /* 87.24 margem do rio */
  SN(sg(62), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1250 }) + streamBand(Pf, t, 1250, 500, { moonx: 740 });
    s += G(claraFig({ back: true, walk: t * 1.2, scale: 1.0, arms: [10, 20, -10, -20] }), 'translate(420 1500)') + G(youFig({ back: true, walk: t * 1.2 + 0.5, scale: 0.9, scared: 1, arms: [10, 20, -10, -20] }), 'translate(640 1520)');
    return cam3(t, lt, 540, 1100, 1.0, 1.2, 1.6, 0, 0, s) + fgTrunks(t, 0, 2, -300, 3, 1) + vignette(Pf, 1);
  });
  /* 88.77 o homem surge */
  SN(sg(63), 0.02, (t, lt, Pf) => {
    const u = E_.outCubic(k(lt, 0, 0.6));
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1450 }) + G(manJacket(Pf, { scale: 1.9, eyes: 1, t, lantern: 1, rim: 0.7 }), `translate(${f1(H.lerp(-100, 280, u))} 1800)`) + fgTrunks(t, 0, 2, -100, 3, 1);
    return cam3(t, lt, 540, 1100, 1.0, 1.15, 1.0, 0, 3, s) + vignette(Pf, 1);
  });
  /* 89.81 lanterna na cara */
  SN(sg(64), 0.02, (t, lt, Pf) => {
    const g = E_.inCubic(k(lt, 0, 0.8));
    let s = BIG('#06080d') + beam(Pf, 540, 1100, -90, 1800, 30 + 10 * g, 1) + glow(Pf, 'W', 540, 1000, 200 + 1200 * g, 0.6 + 0.4 * g);
    return s + FB('#fff', 0.8 * g) + vignette(Pf, 0.5);
  });
  /* 90.79 Acabou a brincadeira */
  SN(sg(65), 0.02, (t, lt, Pf) => {
    let s = BIG('#140808') + glow(Pf, 'A', 540, 1500, 900, 0.5) + G(shadowFace({ lookx: 0, smile: 0.7 + 0.3 * Math.abs(Math.sin(t * 9)), t }), 'translate(540 900) scale(2.9)');
    return cam3(t, lt, 540, 900, 1.0, 1.25, 1.1, 0, 3, s) + vignette(Pf, 1);
  });
  /* 92.0 Clara ergue as mãos */
  SN(sg(66), 0.02, (t, lt, Pf) => {
    let s = BIG('#080b10') + beam(Pf, 540, 100, 90, 1900, 18, 0.45);
    s += G(claraFig({ scale: 1.55, scared: 0, arms: [155, 10, -155, -10], bob: 0 }), 'translate(540 1800)') + G(youFig({ back: true, scale: 0.8, scared: 1, arms: [20, 30, -20, -30] }), 'translate(180 1760)');
    return cam3(t, lt, 540, 1100, 1.0, 1.2, 1.4, 0, 1, s) + vignette(Pf, 1);
  });
  /* 93.43 ela segura o rádio */
  SN(sg(67), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0d12') + glow(Pf, 'B', 540, 960, 900, 0.3);
    s += G(HAND(0, 0, 3.0, '#e9bb9c', 0) + PL([[0, 120], [0, 700]], '#3f5f52', 260), 'translate(540 1100)') + walkie({ x: 540, y: 1020, scale: 2.4, rot: 0, led: 1, t });
    return cam3(t, lt, 540, 1000, 1.0, 1.18, 1.5, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 95.05 botão pressionado */
  SN(sg(68), 0.02, (t, lt, Pf) => {
    const pr = k(lt, 0.2, 0.4);
    let s = BIG('#120608') + glow(Pf, 'R', 540, 960, 1000, 0.4 * pr) + walkie({ x: 540, y: 1000, scale: 3.8, rot: -4, led: 0, t });
    s += C(540, 980, 26, '#ff3b30', OP(0.4 + 0.6 * pr)) + G(E(0, 0, 60, 90, '#e9bb9c') + E(0, -80, 40, 56, '#e9bb9c'), `translate(${f1(700 - 120 * pr)} ${f1(1260 - 140 * pr)}) rotate(-30)`);
    s += ringWaves(540, 980, t, 0.4, 3, 800, '#ff4a4a', pr, 6);
    return cam3(t, lt, 540, 1000, 1.0, 1.2, 1.4, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 96.66 Não */
  SN(sg(69), 0.02, (t, lt, Pf) => {
    let s = BIG('#0e0a0a') + glow(Pf, 'A', 400, 800, 800, 0.5) + cf({ t, eye: 1, pupil: 0.8, anger: 0.7, worry: 0, mouth: 0.4, tilt: -3 }, 540, 960, 2.5);
    return cam3(t, lt, 540, 960, 1.0, 1.2, 0.7, 0, 2, s) + vignette(Pf, 1);
  });
  /* 97.2 ela responde */
  SN(sg(70), 0.02, (t, lt, Pf) => {
    let s = BIG('#070a10') + glow(Pf, 'R', 540, 960, 900, 0.4) + walkie({ x: 540, y: 980, scale: 3.4, rot: 6, led: 0, t }) + C(540, 960, 22, '#ff3b30') + ringWaves(540, 960, t, 0, 4, 800, '#ff4a4a', 0.8, 6);
    return cam3(t, lt, 540, 960, 1.2, 1.0, 0.7, 0, 2, s) + vignette(Pf, 1);
  });
  /* 97.95 acabou a transmissão */
  SN(sg(71), 0.02, (t, lt, Pf) => {
    const live = lt < 0.7 ? 1 : 0;
    let s = BIG('#06090e') + monitorGrid(Pf, t, live) + (live ? '' : R(-400, -400, 1880, 2720, '#000', OP(0.2)));
    return cam3(t, lt, 540, 960, 1.15, 1.0, 1.6, 0, live ? 0 : 6, s) + FB('#fff', lt > 0.7 ? 0.6 * Math.exp(-(lt - 0.7) * 10) : 0) + vignette(Pf, 1);
  });
  /* 99.4 ao longe */
  SN(sg(72), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.8, shafts: 0, ground: 1350 }) + glow(Pf, 'R', 300, 900, 500 * k(lt, 0, 0.8), 0.5 * (Math.sin(t * 9) > 0 ? 1 : 0.2)) + glow(Pf, 'B', 760, 900, 500 * k(lt, 0, 0.8), 0.5 * (Math.sin(t * 9) > 0 ? 0.2 : 1));
    s += G(claraFig({ back: true, scale: 1.0, arms: [10, 20, -10, -20] }), 'translate(420 1650)') + G(youFig({ back: true, scale: 0.92, scared: 0, arms: [10, 20, -10, -20] }), 'translate(640 1670)') + fgTrunks(t, 0, 2, -300, 3, 1);
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 0.9, 0, 0, s) + vignette(Pf, 1);
  });
  /* 100.22 sirenes */
  SN(sg(73), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: lt * 300, fog: 0.7, shafts: 0, ground: 1450 }) + policeGlow(Pf, t, 1) + fgTrunks(t, lt * 600, 2, -200, 4, 1);
    for (let i = 0; i < 3; i++) s += ringWaves(540, 300, t, i * 0.3, 3, 900, Math.sin(t * 9) > 0 ? 'rgba(255,70,70,0.6)' : 'rgba(90,150,255,0.6)', 0.7, 8);
    return cam3(t, lt, 540, 1000, 1.0, 1.15, 1.5, 0, 1.5, s) + vignette(Pf, 0.8);
  });
  /* 101.77 meses reunindo provas: mural */
  SN(sg(74), 0.03, (t, lt, Pf) => {
    let s = BIG('#2a1d14') + glow(Pf, 'A', 540, 900, 1000, 0.6) + R(60, 200, 960, 1500, '#6a4a30', 'rx="16" stroke="#2a180c" stroke-width="16"');
    const P2 = [[260, 520], [540, 440], [820, 540], [340, 960], [700, 1000], [540, 1380], [240, 1400], [840, 1420]];
    P2.forEach((p, i) => { if (i) s += L(P2[i - 1][0], P2[i - 1][1], p[0], p[1], '#d6322a', 5, OP(cl(lt * 4 - i * 0.4))); });
    P2.forEach((p, i) => { s += polaroid(Pf, { x: p[0], y: p[1], w: 170, h: 200, rot: (i * 29 % 14) - 7, who: i, trees: 1, a: cl(lt * 5 - i * 0.3) }); });
    return cam3(t, lt, 540, 960, 1.0, 1.15, 2.4, 0, 1, s) + vignette(Pf, 1);
  });
  /* 104.7 alguém voltasse à cabana */
  SN(sg(75), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1500 }) + R(240, 760, 600, 740, '#241a12') + P('M200,780 L540,560 L880,780Z', '#150e0a') + R(440, 1000, 200, 500, '#0a0705') + glow(Pf, 'A', 540, 1250, 260, 0.5 * k(lt, 0.5, 1));
    s += G(youFig({ back: true, walk: t * 1.1, scale: 0.9, scared: 1, arms: [10, 20, -10, -20] }), `translate(${f1(H.lerp(120, 540, ez(lt / 2.4)))} 1560)`);
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 2.5, 0, 0, s) + vignette(Pf, 1);
  });
  /* 106.6 registrar a voz */
  SN(tw('voz', 0, 106.9), 0.02, (t, lt, Pf) => {
    let s = BIG('#070a10') + glow(Pf, 'R', 540, 960, 900, 0.3);
    s += G(R(-200, -300, 400, 600, '#1c2228', 'rx="40" stroke="#3a444c" stroke-width="8"') + C(0, -80, 110, '#0a0f12') + C(0, -80, 30, '#2a3238') + R(-120, 140, 240, 40, '#10161a', 'rx="10"') + C(-140, -240, 14, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 6))), 'translate(540 900) scale(1.6)');
    s += voiceWave(t, 1500, 160, '#ff6a5a', 1, 1080);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.8, 0, 1, s) + vignette(Pf, 1);
  });
  /* 108.66 o comunicador entregou tudo */
  SN(sg(76), 0.02, (t, lt, Pf) => {
    const p = ez(k(lt, 0.2, 2.2));
    let s = BIG('#06090e') + glow(Pf, 'B', 540, 800, 900, 0.4) + walkie({ x: 540, y: 800, scale: 2.6, rot: 0, led: 1, t });
    s += gaugeBar(140, 1500, 800, p, '#6dff9a', 10);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.8 + i / 6) % 1; s += P(`M${f1(540 - 40)},${f1(1250 - ph * 700)} l40,-50 l40,50Z`, '#6dff9a', OP(1 - ph)); }
    s += checkMark(540, 1700, 80, k(lt, 2.0, 2.6));
    return cam3(t, lt, 540, 1000, 1.0, 1.1, 2.8, 0, 1, s) + vignette(Pf, 1);
  });
}
