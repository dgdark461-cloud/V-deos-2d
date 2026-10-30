/* scenes_c.js - 66 a 97 s: bolsos, fósforo, ratazanas, escuridão. */
const darkBg = (Pf, t, lvl = 1) => R(-300, -300, 1700, 2600, '#16124e') + glow(Pf, 'B', 540, 500, 1200, 0.25 * lvl) + jungle(Pf, t, -100, 1180, 1100, 480, '#0d4a46', '#1f9a6e') + R(-300, 1100, 1700, 1200, '#2a2058');
const lit = (Pf, x, y, r, t, a = 1) => glow(Pf, 'A', x, y, r * (1 + 0.05 * H.noise(t * 12, 3)), a) + glow(Pf, 'F', x, y, r * 0.55, 0.6 * a);
const ratPack = (Pf, t, n, y0, y1, x0, x1, sc, run = 1, seed = 1, eyes = 1) => { let s = ''; for (let i = 0; i < n; i++) s += ratObj({ t: t + i * 0.37, x: x0 + (x1 - x0) * hz(i, seed), y: y0 + (y1 - y0) * hz(i, seed + 1), sc: sc * (0.8 + 0.4 * hz(i, seed + 2)), flip: hz(i, seed + 3) > 0.5 ? 1 : -1, run, eye: eyes }); return s; };

function partC(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SCN(c, s0, fin, fn);

  /* 65.86 tatear os bolsos */
  SN(sg(24), 0.03, (t, lt, Pf) => {
    let s = darkBg(Pf, t) + G(alexFig({ arms: [-40 + 20 * Math.sin(t * 9), 20, 40 - 20 * Math.sin(t * 9), -20], scale: 1.9, scared: 1, look: 1 }), `translate(540 1700)`);
    return cam(t, lt, 540, 1150, 1.0, 1.25, 1.2, 0, 2, s) + post(Pf, t, 0.5);
  });
  /* 66.1 mãos no bolso */
  SN(tw('tatear', 0, 66.1), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a2058') + glow(Pf, 'B', 540, 900, 900, 0.4) + R(150, 400, 780, 1200, '#f4f1e8', 'rx="40"') + R(300, 800, 480, 380, '#d8dff0', 'rx="20"') + L(300, 800, 780, 800, '#8aa0a8', 8);
    for (let i = 0; i < 2; i++) s += armHand(i ? 1100 : -100, 1500 + 40 * i, 540 + (i ? 120 : -120) + 30 * Math.sin(t * 9 + i), 960 + 40 * Math.sin(t * 9 + i * 2), 1.5);
    return cam(t, lt, 540, 960, 1.0, 1.2, 1.1, 0, 3, s) + post(Pf, t, 0.5);
  });
  /* 67.14 encontra a caixa */
  SN(sg(25), 0.03, (t, lt, Pf) => {
    const u = E_.outBack(k(lt, 0, 0.5));
    let s = R(-300, -300, 1700, 2600, '#2a2058') + glow(Pf, 'B', 540, 900, 900, 0.4);
    s += armHand(1100, 1700, 540, 1500 - 560 * u, 1.9) + matchbox(540 + 30, 1500 - 560 * u - 120, -20, 1.4 * u, 1, t);
    s += glow(Pf, 'W', 570, 940, 300 * u, 0.4);
    return cam(t, lt, 540, 1100, 1.0, 1.15, 1.2, 0, 2, s) + post(Pf, t, 0.45);
  });
  /* 68.2 caixa de fósforos molhada, close */
  SN(tw('caixa', 0, 68.2), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + glow(Pf, 'B', 540, 960, 1000, 0.5) + matchbox(540, 960, -8 + 4 * Math.sin(t * 2), 4.2, 1, t);
    return cam(t, lt, 540, 960, 0.0 + 1.0, 1.1, 0.9, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 69.0 molhada: gotas na areia */
  SN(tw('molhada', 0, 69.0), 0.03, (t, lt, Pf) => {
    let s = sandBg(Pf, t, 0, '#d8b078', '#8a6038') ;
    s += matchbox(540, 800, 10, 3.0, 1, t);
    for (let i = 0; i < 10; i++) { const ph = (t * 1.1 + hz(i, 3)) % 1; s += P(`M${f1(300 + hz(i, 2) * 480)},${f1(1000 + ph * 700)} q-14,-30 0,-52 q14,22 0,52Z`, '#6fd8ff', OP(1 - ph)); }
    s += E(540, 1760, 360, 36, '#5a3a1c', OP(0.4));
    return cam(t, lt, 540, 960, 1.0, 1.15, 0.7, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 69.63 só um palito se salvou: caixa aberta */
  SN(sg(26), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + glow(Pf, 'B', 540, 960, 1000, 0.5);
    s += R(140, 700, 800, 520, '#e8b23a', 'rx="20"') + R(170, 730, 740, 460, '#4a2f1a', 'rx="12"');
    for (let i = 0; i < 9; i++) { const dry = i === 4; s += G(R(-9, -170, 18, 340, dry ? '#f4d890' : '#6a4a30', 'rx="8"') + C(0, -170, 22, dry ? '#e0182c' : '#5a2a2a'), `translate(${f1(240 + i * 70)} 960) rotate(${f1(dry ? 0 : (i - 4) * 4)})`); }
    const kk = E_.outCubic(k(lt, 0.6, 1.2)); s += glow(Pf, 'A', 520, 790, 260 * kk, 0.9) + ringWaves(520, 790, t, 0.6, 2, 300, '#ffd24a', kk, 6);
    return cam(t, lt, 540, 960, 1.0, 1.2, 2.0, 0, 1, s) + post(Pf, t, 0.45);
  });
  /* 70.8 o palito: close */
  SN(tw('palito', 0, 70.8), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + glow(Pf, 'A', 540, 700, 800, 0.4);
    s += G(R(-26, -500, 52, 1000, '#f4d890', 'rx="24"') + R(-26, -500, 12, 1000, '#fff2cf', 'rx="6"') + E(0, -480, 70, 90, '#e0182c') + E(-20, -510, 20, 30, '#ff8a9c'), `translate(540 1160) rotate(${f1(-8 + 3 * Math.sin(t * 2))})`);
    s += ringWaves(540, 680, t, 0, 3, 400, '#ffd24a', 0.7, 6);
    return cam(t, lt, 540, 700, 1.3, 1.0, 0.6, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 71.82 riscar */
  SN(sg(27), 0.03, (t, lt, Pf) => {
    const sw = E_.outCubic(k(lt, 0.3, 0.55));
    let s = R(-300, -300, 1700, 2600, '#241a60') + R(140, 1200, 800, 380, '#2b2540', 'rx="14"');
    s += G(R(-14, -300, 28, 300, '#f4d890', 'rx="10"') + C(0, -300, 24, '#e0182c'), `translate(${f1(260 + 520 * sw)} 1200) rotate(${f1(-30 + 10 * sw)})`);
    s += sparksFx(260 + 520 * sw, 1180, t, sw > 0 && lt < 1.1 ? 1 : 0, 22, 120);
    s += armHand(1200, 1900, 900, 1500, 1.6);
    return cam(t, lt, 540, 1250, 1.0, 1.2, 1.0, 0, 3, s) + FB('#ffd24a', lt > 0.55 ? 0.35 * Math.exp(-(lt - 0.55) * 8) : 0) + post(Pf, t, 0.45);
  });
  /* 72.5 chama hesitante */
  SN(tw('chama', 0, 72.5), 0.03, (t, lt, Pf) => {
    const flick = 0.55 + 0.45 * Math.abs(H.noise(t * 6, 8));
    let s = R(-300, -300, 1700, 2600, '#241a60') + lit(Pf, 540, 900, 900, t, 0.8 * flick);
    s += G(R(-14, 0, 28, 900, '#f4d890', 'rx="10"') + C(0, 0, 24, '#4a2a2a'), `translate(540 1000)`) + flameObj(t, 540, 970, 3.4, 0.5 + 0.5 * flick);
    s += armHand(1100, 1900, 570, 1600, 1.8);
    return cam(t, lt, 540, 950, 1.0, 1.25, 1.8, 0, 1, s) + post(Pf, t, 0.45);
  });
  /* 74.26 luz fraca revela: círculo de luz na praia */
  SN(sg(28), 0.04, (t, lt, Pf) => {
    const r = 380 + 260 * E_.outCubic(k(lt, 0, 1.6));
    let s = darkBg(Pf, t, 0.6) + lit(Pf, 540, 1400, r, t, 1) + G(alexFig({ arms: [10, 30, -50, -80], scale: 1.4, scared: 1, look: -1 }), `translate(540 1650)`) + flameObj(t, 640, 1260, 0.7);
    return cam(t, lt, 540, 1300, 1.0, 1.2, 2.0, 0, 1, s) + post(Pf, t, 0.5);
  });
  /* 75.4 horror: rosto iluminado pela chama */
  SN(tw('horror', 0, 75.4), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#1c1450') + lit(Pf, 540 + 180, 1100, 1000, t, 0.9);
    s += faceAt({ t, eye: 1, pupil: 0.25, looky: 6, lookx: -20, worry: 1, mouth: 0.8, tremble: 3.5, cuts: 1, sweat: 1, dark: 0.5 }, 540, 880, 2.3);
    s += flameObj(t, 900, 1500, 1.4) + glow(Pf, 'F', 540, 880, 700, 0.35);
    return cam(t, lt, 540, 900, 1.0, 1.18, 1.0, 0, 5, s) + post(Pf, t, 0.5);
  });
  /* 76.45 a ilha não está deserta: olhos por todos os lados */
  SN(sg(29), 0.03, (t, lt, Pf) => {
    let s = darkBg(Pf, t, 0.5) + lit(Pf, 540, 1300, 500, t, 0.9) + G(alexFig({ arms: [10, 30, -50, -80], scale: 1.1, scared: 1 }), `translate(540 1500)`);
    for (let i = 0; i < 16; i++) s += ratEyes(Pf, 80 + hz(i, 41) * 920, 800 + hz(i, 42) * 700, 0.8 + 0.5 * hz(i, 43), cl((lt - i * 0.08) * 5), t + i);
    return cam(t, lt, 540, 1200, 1.1, 1.0, 0.9, 0, 3, s) + FB('#ff3b30', 0.12 * Math.abs(Math.sin(t * 10))) + post(Pf, t, 0.5);
  });
  /* 77.96 a poucos metros: primeiros ratos */
  SN(sg(30), 0.03, (t, lt, Pf) => {
    let s = darkBg(Pf, t, 0.6) + lit(Pf, 300, 1500, 500, t, 0.8) + G(alexFig({ arms: [10, 30, -50, -80], scale: 1.5, scared: 1 }), `translate(260 1650)`);
    s += ratPack(Pf, t, 3, 1450, 1650, 650 + 300 * (1 - cl(lt)), 900, 0.9, 1, 3);
    return cam(t, lt, 540, 1300, 1.0, 1.15, 1.1, 0, 2, s) + post(Pf, t, 0.5);
  });
  /* 79.12 dezenas de ratazanas */
  SN(sg(31), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + sandBg(Pf, t, 800, '#c49860', '#6a4a2a');
    s += ratPack(Pf, t, 26, 900, 1800, 0, 1080, 0.7, 1.2, 5);
    return cam(t, lt, 540, 1200, 1.0, 1.15, 0.8, 0, 3, s) + post(Pf, t, 0.45);
  });
  /* 80.6 gigantescas: rato enorme em close */
  SN(tw('gigantescas', 0, 80.6), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a1a5a') + lit(Pf, 300, 900, 900, t, 0.5) + ratObj({ t, x: 520, y: 1100, sc: 4.4 + 0.3 * lt, flip: 1, run: 0.2, eye: 1 });
    return cam(t, lt, 540, 1000, 1.0, 1.2, 0.9, -2, 4, s) + post(Pf, t, 0.5);
  });
  /* 81.57 atraídas pelo odor */
  SN(sg(32), 0.03, (t, lt, Pf) => {
    let s = darkBg(Pf, t, 0.7) + sandBg(Pf, t, 1250, '#c49860', '#6a4a2a') + debrisPlank(300, 1400, 12, 1.5, t, 1) + vest(760, 1480, -10, 1.5, t, 2);
    for (let i = 0; i < 7; i++) { const ph = (t * 0.6 + i / 7) % 1; s += PL(Array.from({ length: 8 }, (_, j) => [300 + (i % 2 ? 480 : 0) + 20 * Math.sin(j + t * 3 + i) - ph * 300 + j * 10, 1350 - j * 70 - ph * 200]), 'rgba(255,130,150,0.8)', 8, OP(1 - ph)); }
    s += ratPack(Pf, t, 6, 800, 1000, 0, 1080, 0.55, 1, 9);
    return cam(t, lt, 540, 1200, 1.0, 1.15, 1.2, 0, 2, s) + post(Pf, t, 0.5);
  });
  /* 83.8 vítimas na orla */
  SN(tw('vítimas', 0, 83.8), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { jh: 460, jx: 1000 }) + darkSil(300, 1200, 1.2, t, 1) + hat(700, 1260, 8, 1.4, t, 3) + vest(500, 1350, -14, 1.5, t, 4) + R(-300, -300, 1700, 2600, '#201060', OP(0.25));
    s += ratPack(Pf, t, 5, 1500, 1750, 0, 1080, 0.8, 1, 11);
    return cam(t, lt, 540, 1300, 1.2, 1.0, 0.7, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 84.4 orla: linha de ratos ao longo da beira */
  SN(tw('orla', 0, 84.4), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { sandUp: 60 });
    for (let i = 0; i < 10; i++) s += ratObj({ t: t + i, x: ((i * 170 + t * 160) % 1500) - 200, y: 1250 + 40 * (i % 3), sc: 0.8, flip: 1, run: 1.2, eye: 1 });
    return cam(t, lt, 540, 1250, 1.2, 1.0, 0.6, 0, 1, s) + post(Pf, t, 0.45);
  });
  /* 84.87 aproximam em bando: correria na direção da câmera */
  SN(sg(33), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + sandBg(Pf, t, 700, '#b88c58', '#5a3a1c');
    for (let i = 0; i < 14; i++) { const ph = ((lt * 0.7 + hz(i, 2)) % 1); s += ratObj({ t: t + i, x: 100 + hz(i, 3) * 880, y: 800 + ph * 1100, sc: 0.3 + ph * 1.6, flip: hz(i, 4) > 0.5 ? 1 : -1, run: 1.4, eye: 1 }); }
    return cam(t, lt, 540, 1200, 1.0, 1.1, 1.0, 0, 4, s) + post(Pf, t, 0.45);
  });
  /* 86.26 cercando: vista de cima, anel de ratos */
  SN(sg(34), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a1a5a') + C(540, 960, 520, '#d0a468', OP(0.6)) + lit(Pf, 540, 960, 600, t, 0.5);
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 0.2, rr = 640 - 220 * E_.outCubic(k(lt, 0, 1.0)); s += ratObj({ t: t + i, x: 540 + Math.cos(a) * rr, y: 960 + Math.sin(a) * rr * 1.1, sc: 0.65, flip: Math.cos(a) > 0 ? -1 : 1, run: 1, eye: 1 }); }
    s += E(540, 960, 70, 100, '#f4f1e8') + C(540, 880, 44, PAL.skin) + C(540, 860, 46, PAL.hair, OP(0.9));
    return cam(t, lt, 540, 960, 1.0, 1.15, 1.0, 20 * lt, 2, s) + post(Pf, t, 0.45);
  });
  /* 87.3 o sangue gela */
  SN(sg(35), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#1a2a78') + glow(Pf, 'B', 540, 900, 1000, 0.6);
    s += faceAt({ t, eye: 1, pupil: 0.15, worry: 1, mouth: 0.3, tremble: 0.6, cold: 0.9, cuts: 1, dark: 0.7 }, 540, 880, 2.3);
    for (let i = 0; i < 18; i++) { const a = hz(i, 5) * 6.283; s += PL([[540 + Math.cos(a) * 560, 900 + Math.sin(a) * 700], [540 + Math.cos(a) * (560 - 160 * cl(lt * 3 - i * 0.05)), 900 + Math.sin(a) * (700 - 200 * cl(lt * 3 - i * 0.05))]], '#e6fbff', 8, OP(0.7)); }
    return cam(t, lt, 540, 900, 1.0, 1.12, 0.8, 0, 0.5, s) + post(Pf, t, 0.55);
  });
  /* 88.12 palito se apaga: chama diminuindo */
  SN(sg(36), 0.03, (t, lt, Pf) => {
    const ks = 1 - 0.85 * E_.inCubic(k(lt, 0.0, 1.45));
    let s = R(-300, -300, 1700, 2600, '#1c1450') + lit(Pf, 540, 960, 900 * ks + 80, t, ks);
    for (let i = 0; i < 6; i++) s += E(540 + 20 * Math.sin(t * 3 + i), 700 - i * 50, 14 + i * 6, 14 + i * 6, 'rgba(220,210,240,0.5)', OP(1 - ks));
    s += G(R(-20, 0, 40, 800, '#f4d890', 'rx="16"') + C(0, 0, 36, '#3a2020'), `translate(540 1020)`) + flameObj(t, 540, 1000, 3.4, Math.max(0.12, ks));
    s += E(540, 1040, 130, 70, PAL.skin, OP(1)) + E(430, 1010, 36, 90, PAL.skin) + E(650, 1010, 36, 90, PAL.skin);
    return cam(t, lt, 540, 1000, 1.0, 1.25, 2.4, 0, 1, s) + post(Pf, t, 0.5);
  });
  /* 90.2 dedos: fumaça entre os dedos, só brasa */
  SN(tw('dedos', 0, 90.2), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#171046') + glow(Pf, 'F', 540, 960, 280 * (1 - lt), 0.8 * (1 - lt));
    for (let i = 0; i < 8; i++) { const ph = (lt * 0.8 + i / 8) % 1; s += C(540 + 40 * Math.sin(ph * 8 + i), 940 - ph * 700, 20 + ph * 80, 'rgba(210,200,235,0.6)', OP(1 - ph)); }
    s += G(E(0, 0, 36, 120, PAL.skin) + E(-60, 30, 28, 100, PAL.skin) + E(60, 30, 28, 100, PAL.skin), `translate(540 1080) rotate(${f1(3 * Math.sin(t * 20))})`) + C(540, 950, 12, '#ff6a1a', OP(1 - lt * 1.5 > 0 ? 1 - lt * 1.5 : 0));
    return cam(t, lt, 540, 1000, 1.0, 1.2, 0.5, 0, 3, s) + post(Pf, t, 0.55);
  });
  /* 90.58 breu total */
  SN(sg(37), 0.04, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0e0a38') + glow(Pf, 'B', 540, 700, 1000, 0.2);
    for (let i = 0; i < 20; i++) s += ratEyes(Pf, 60 + hz(i, 51) * 960, 500 + hz(i, 52) * 1200, 0.7 + 0.6 * hz(i, 53), 0.5 + 0.5 * Math.abs(Math.sin(t * 2 + i)), t + i);
    s += G(alexFig({ arms: [10, 30, -20, -30], scale: 1.0, scared: 1 }), `translate(540 1500)`) + R(-300, -300, 1700, 2600, '#05031c', OP(0.3));
    return cam(t, lt, 540, 1100, 1.0, 1.2, 1.9, 0, 1, s) + post(Pf, t, 0.6);
  });
  /* 91.6 breu total: olhos de Alex arregalados na penumbra */
  SN(tw('total', 0, 91.8), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0a0730') + glow(Pf, 'B', 540, 900, 700, 0.35);
    s += faceAt({ t, eye: 1, pupil: 0.2, worry: 1, mouth: 0.4, tremble: 2, cuts: 1, cold: 0.6, dark: 0.9, shadow: 0.45 }, 540, 900, 2.1);
    return cam(t, lt, 540, 900, 1.0, 1.1, 0.8, 0, 1, s) + post(Pf, t, 0.65);
  });
  /* 92.16 garras: sons na escuridão — rochas e patas */
  SN(sg(38), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#100a3a') + glow(Pf, 'B', 540, 900, 900, 0.25);
    for (let i = 0; i < 14; i++) s += ratEyes(Pf, 60 + hz(i, 61) * 960, 400 + hz(i, 62) * 1400, 0.8 + 0.6 * hz(i, 63), 0.9, t + i);
    s += ringWaves(540, 1300, t, 0, 3, 600, 'rgba(255,255,255,0.4)', 0.6, 4);
    return cam(t, lt, 540, 1000, 1.0, 1.15, 0.9, 0, 2, s) + post(Pf, t, 0.6);
  });
  /* 93.9 garras arranhando as pedras */
  SN(tw('garras', 0, 93.9), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#241a60') + rock(540, 1900, 1300, 1000, 4, '#b8683c') + glow(Pf, 'B', 540, 800, 900, 0.3);
    for (let i = 0; i < 4; i++) { const ph = (t * 3 + i * 0.7) % 1; s += G(E(0, 0, 40, 26, '#8f7cae') + [-28, -9, 9, 28].map(x => L(x, 6, x + 4, 50 + 20 * ph, '#f4eaff', 8)).join(''), `translate(${f1(260 + 190 * i)} ${f1(1050 + 200 * ph)}) scale(1.8)`) + L(260 + 190 * i - 40, 1260 + 100 * ph, 260 + 190 * i + 40, 1300 + 100 * ph, '#5a2a14', 6, OP(1 - ph)); }
    s += sparksFx(540, 1100, t, 0.5 + 0.5 * Math.sin(t * 14), 8, 60, '#fff2b0');
    return cam(t, lt, 540, 1200, 1.0, 1.2, 1.6, 0, 3, s) + post(Pf, t, 0.55);
  });
  /* 95.7 avançar: ratos surgem de todos os lados */
  SN(tw('avançar', 0, 95.7), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#1c1450') + glow(Pf, 'R', 540, 960, 1100, 0.3);
    for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, rr = 900 * (1 - E_.inCubic(k(lt, 0, 0.9))) + 160; s += ratObj({ t: t + i, x: 540 + Math.cos(a) * rr, y: 960 + Math.sin(a) * rr * 1.3, sc: 0.9, flip: Math.cos(a) > 0 ? -1 : 1, run: 1.6, eye: 1 }); }
    s += G(alexFig({ arms: [10, 20, -10, -20], scale: 0.8, scared: 1 }), `translate(540 1060)`);
    return cam(t, lt, 540, 960, 1.0, 1.3, 0.8, 0, 6, s) + post(Pf, t, 0.55);
  });
  /* 96.3 direção: olhos disparam em direção à câmera */
  SN(tw('direção', 0, 96.3), 0.03, (t, lt, Pf) => {
    const z = 1 + 9 * E_.inCubic(k(lt, 0, 0.8));
    let s = R(-300, -300, 1700, 2600, '#080522');
    s += camG(t, 540, 960, z, 0, 3, ratEyes(Pf, 540, 960, 2.6, 1, t) + ratEyes(Pf, 300, 800, 1.4, 0.9, t + 1) + ratEyes(Pf, 800, 1100, 1.4, 0.9, t + 2));
    return s + FB('#ff3b30', 0.3 * k(lt, 0.4, 0.8)) + post(Pf, t, 0.6);
  });
}
