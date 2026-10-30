/* scenes_a.js - 0 a ~68 s */
const FZ = (Pf, t, s, lt, d, z0, z1, x = 540, y = 960, shk = 2, rot = 0) => cam3(t, lt, x, y, z0, z1, d, rot, shk, s) + vignette(Pf, 1) + grain(t, 0.1);
const DK = (Pf, t, o) => caveBG(Pf, t, o);
const RF = (t, o, x = 540, y = 980, sc = 2.6) => rafF(Object.assign({ t, eye: 1, pupil: 0.45, worry: 0.6, mess: 1, wet: 0 }, o), x, y, sc);
const txtBox = (x, y, str, sz, col = BONE, bg = 'rgba(0,0,0,0.6)', w = 700) => G(R(-w / 2, -sz * 0.9, w, sz * 1.6, bg, 'rx="22"') + TX(0, sz * 0.35, str, sz, col), T(x, y, 0, 1));
const eyesG = (Pf, x, y, s, a = 1, sep = 50) => eyesPair(Pf, x, y, s, '#d8d4c0', a, sep);

function partD(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  /* 0.0 HOOK: caverneiro em close, olhos arregalados, voz chamando do escuro */
  SN(0, 0.001, (t, lt, Pf) => {
    let s = DK(Pf, t, { bright: 0.3 }) + RF(t, { eye: 1, pupil: 0.3, worry: 1, sweat: 1, tremble: 2, mouth: 0.1 }, 540, 980, 3.3) + glow(Pf, 'W', 540, 400, 700, 0.12);
    s += lightMask(Pf, 540, 960, 900, 0.85) + eyesG(Pf, 540, 330, 0.6, 0.25 + 0.2 * Math.sin(t * 6), 40);
    return FZ(Pf, t, s, lt, 1.2, 1.0, 1.12, 540, 960, 4) + FB('#fff', 0.6 * Math.exp(-lt * 14));
  });
  /* chamando seu nome no escuro: ondas sonoras vindo do fundo */
  SN(tw('chamando', 0, 2.4), 0.02, (t, lt, Pf) => {
    let s = BIG('#030304') + ringWaves(540, 700, t, 0, 5, 800, 'rgba(220,215,195,0.35)', 1, 5) + eyesG(Pf, 540, 700, 1.4, 0.6 + 0.4 * Math.sin(t * 8), 70) + TX(540, 1300, 'RAFAEL...', 130, 'rgba(230,225,205,0.8)', OP(0.5 + 0.5 * Math.sin(t * 10)));
    return FZ(Pf, t, s, lt, 1.3, 1.0, 1.2, 540, 900, 3);
  });
  /* 4.38 nunca responda: mão na boca, X */
  SN(sg(1), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.2 }) + RF(t, { eye: 1, pupil: 0.3, worry: 1, sweat: 1, mouth: 0, tremble: 1 }, 540, 960, 2.6) + HAND(540, 1180, 3.0, '#b09a86', 0) + bigX(540, 760, 260, ez(H.prog(lt, 0.8, 1.2)), '#a02020') + lightMask(Pf, 540, 900, 1000, 0.8), lt, 1.9, 1.0, 1.12, 540, 960, 2));
  /* 6.26 voz de alguém que morreu: lápide + olhos */
  SN(sg(2), 0.02, (t, lt, Pf) => {
    let s = BIG('#050506') + glow(Pf, 'W', 540, 800, 500, 0.12) + P('M300,1500 L300,820 Q300,600 540,600 Q780,600 780,820 L780,1500Z', '#3a3d42') + P('M300,1500 L300,820 Q300,600 540,600 L540,1500Z', '#000', OP(0.25)) + TX(540, 900, 'R.I.P', 100, '#14161a') + R(480, 1000, 120, 14, '#14161a') + R(535, 960, 14, 100, '#14161a') + E(540, 1510, 340, 30, '#0a0b0c');
    s += eyesG(Pf, 540, 760, 1.2, 0.5 + 0.5 * Math.sin(t * 4), 70) + mist(t, 1300, 1700, 6, 0.1);
    return FZ(Pf, t, s, lt, 3.8, 1.0, 1.15, 540, 1000, 1);
  });
  /* 10.11 Você se chama Rafael: retrato */
  SN(sg(3), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.6 }) + glow(Pf, 'W', 540, 800, 700, 0.25) + RF(t, { eye: 1, pupil: 0.5, worry: 0.2, mouth: 0.1 }, 540, 1000, 2.5) + lightMask(Pf, 540, 900, 1100, 0.7), lt, 1.4, 1.0, 1.1, 540, 1000, 1));
  /* 11.56 28 anos / Caverna do Diabo: entrada */
  SN(sg(4), 0.02, (t, lt, Pf) => {
    let s = skyI(Pf, t, 800, 'dusk', { clouds: 2 }) + R(-400, 800, 1880, 1300, '#0e1012') + P('M-100,1920 L-100,500 Q100,200 540,260 Q980,200 1180,500 L1180,1920Z', '#1a1c20') + P('M200,1920 L200,950 Q250,560 540,520 Q830,560 880,950 L880,1920Z', '#020203');
    for (let i = 0; i < 7; i++) s += stalac(250 + i * 90, 640 + 30 * hz(i, 9) - 60 * Math.sin(i / 6 * Math.PI) * 0, 60, 140 + 120 * hz(i, 10), '#2a2d33');
    s += txtBox(540, 380, 'CAVERNA DO DIABO', 70, BONE, 'rgba(0,0,0,0.7)', 780) + eyesG(Pf, 540, 1100, 1.0, 0.3 + 0.3 * Math.sin(t * 3), 60) + TX(540, 1800, '28 ANOS', 110, 'rgba(230,225,205,0.9)', OP(ez(H.prog(lt, 0.2, 0.5))));
    return FZ(Pf, t, s, lt, 3.7, 1.0, 1.2, 540, 1000, 1);
  });
  /* 15.43 Eldorado / 16.34 interior de SP: mapa */
  SN(sg(5), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0b0d') + P('M200,700 Q400,500 700,620 Q900,700 880,950 Q860,1200 600,1300 Q300,1350 200,1100Z', '#23262b') + P('M200,700 Q400,500 700,620', 'none', 'stroke="#7a7d82" stroke-width="6"');
    s += G(P('M0,0 q-50,-90 0,-150 q50,60 0,150Z', '#a02020') + C(0, -100, 18, '#0a0b0d'), T(560, 960, 0, 2.2 * (0.8 + 0.2 * Math.sin(t * 5)))) + txtBox(540, 1500, 'ELDORADO · SP', 80, BONE, 'rgba(0,0,0,0.6)', 780);
    return FZ(Pf, t, s, lt, 1.0, 1.15, 1.0, 540, 960, 1);
  });
  /* 17.47 lugar existe / 18.62 seis km: galeria com régua */
  SN(sg(7), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.9 }) + lampObj(300, 1200, 3) + glow(Pf, 'W', 300, 1200, 300, 0.25) + glow(Pf, 'W', 800, 1050, 300, 0.2), lt, 1.1, 1.0, 1.15, 540, 1000, 1));
  SN(sg(8), 0.02, (t, lt, Pf) => { const u = ez(lt / 2.2); let s = BIG('#060708') + tunnelBG(Pf, t, { speed: 0.12, light: '#d8d4c0', la: 0.3, cx: 540, cy: 900 }) + R(0, 0, 1080, 1920, '#000', OP(0.35)); s += txtBox(540, 1450, Math.round(6 * u * 10) / 10 + ' km', 140, BONE, 'rgba(0,0,0,0.65)', 640); return FZ(Pf, t, s, lt, 2.4, 1.0, 1.2, 540, 900, 2); });
  /* 21.05 só pequena parte aberta: mapa de túneis com trecho iluminado */
  SN(sg(9), 0.02, (t, lt, Pf) => {
    let s = BIG('#08090b'); const u = ez(lt / 2);
    for (let i = 0; i < 9; i++) s += PL([[540, 960], [540 + 400 * Math.cos(i * 0.7), 960 + 700 * Math.sin(i * 0.7)], [540 + 520 * Math.cos(i * 0.7 + 0.3), 960 + 900 * Math.sin(i * 0.7 + 0.2)]], '#2a2d33', 12);
    s += PL([[540, 960], [640, 1060], [700, 1160]], BONE, 14, OP(u)) + glow(Pf, 'W', 640, 1060, 220, 0.4 * u) + txtBox(540, 380, 'PARTE ABERTA', 70, BONE, 'rgba(0,0,0,0.6)', 700);
    return FZ(Pf, t, s, lt, 3.4, 1.0, 1.2, 640, 1050, 1);
  });
  /* 24.55 tudo normal */
  SN(sg(10), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 1 }) + glow(Pf, 'W', 540, 900, 900, 0.18) + groupSil(120, 1450, 1.4, 4, t) + lampObj(200, 700, 2) + lampObj(900, 800, 2), lt, 0.95, 1.0, 1.08, 540, 1000, 1));
  /* 25.5 caminhava com grupo */
  SN(sg(11), 0.02, (t, lt, Pf) => { const u = lt / 2.3; let s = DK(Pf, t, { bright: 1, shift: 60 * u }) + glow(Pf, 'W', 540, 900, 900, 0.15) + groupSil(H.lerp(160, 360, u), 1500, 1.5, 5, t) + G(rafaelFig({ back: 1, scale: 1, t, walk: t * 0.9 }), `translate(760 1760) scale(1.3)`); return FZ(Pf, t, s, lt, 2.3, 1.0, 1.1, 540, 1100, 2); });
  /* 27.82 monitor */
  SN(sg(12), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.9 }) + glow(Pf, 'W', 540, 800, 700, 0.25) + monF({ t, eye: 1, pupil: 0.5, mouth: 0.15, smile: 1 }, 540, 1000, 2.4), lt, 1.5, 1.0, 1.1, 540, 1000, 1));
  /* 29.4 fotografa formação */
  SN(sg(13), 0.02, (t, lt, Pf) => { const fl = lt > 2.2 && lt < 2.35 ? 1 : 0; let s = DK(Pf, t, { bright: 1 }) + glow(Pf, 'W', 540, 900, 800, 0.2) + formationObj(Pf, 540, 1450, 1.5, 0.8) + G(rafaelFig({ back: 1, scale: 1, t, arms: [-30, 80, 30, 80] }), 'translate(200 1800) scale(1.4)') + phoneLight(Pf, 330, 1160, 0.6, 15, 90, t); return FZ(Pf, t, s, lt, 3.2, 1.0, 1.15, 540, 1000, 1) + FB('#fff', 0.8 * fl); });
  /* 32.67 foi quando ouviu uma voz */
  SN(sg(14), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.5 }) + RF(t, { eye: 1, pupil: 0.3, lookx: 20, worry: 0.8, sweat: 1, mouth: 0 }, 540, 1000, 2.6) + lightMask(Pf, 540, 900, 1100, 0.8) + ringWaves(960, 700, t, 0, 3, 600, 'rgba(220,215,195,0.3)', 0.8, 4), lt, 1.0, 1.0, 1.12, 540, 1000, 2));
  /* 33.7 Rafael... espera por mim */
  SN(sg(15), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#030304') + ringWaves(540, 820, t, 0, 5, 900, 'rgba(220,215,195,0.35)', 1, 5) + eyesG(Pf, 540, 820, 1.2, 0.5 + 0.5 * Math.sin(t * 7), 70) + TX(540, 1350, 'ESPERA POR MIM', 90, 'rgba(230,225,205,0.7)', OP(0.4 + 0.5 * Math.sin(t * 9))), lt, 3.0, 1.0, 1.25, 540, 900, 3));
  SN(sg(16) + 1.0, 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#040405') + RF(t, { eye: 1, pupil: 0.2, worry: 1, sweat: 1, mouth: 0.3, tremble: 2 }, 540, 1000, 3.0) + lightMask(Pf, 540, 950, 1000, 0.8), lt, 1.6, 1.0, 1.15, 540, 1000, 3));
  /* 36.7 voz do irmão: rosto fantasma */
  SN(sg(17), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#040506') + glow(Pf, 'W', 540, 900, 700, 0.2) + G(ghostFace({ a: 0.5 + 0.2 * Math.sin(t * 3) }), 'translate(540 1000) scale(2.6)') + mist(t, 800, 1500, 6, 0.12), lt, 1.4, 1.0, 1.15, 540, 1000, 2));
  /* 38.09 5 anos antes */
  SN(sg(18), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060708') + G(ghostFace({ a: 0.3 }), 'translate(540 1000) scale(2.2)') + TX(540, 640, '5', 460, 'rgba(230,225,205,0.9)', OP(ez(H.prog(lt, 0.1, 0.4)))) + TX(540, 1760, 'ANOS ANTES', 100, '#b0ab9a'), lt, 1.7, 1.0, 1.15, 540, 1000, 1));
  /* 39.79 assustado, virou */
  SN(sg(19), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.5 }) + RF(t, { eye: 1, pupil: 0.3, worry: 1, sweat: 1, mouth: 0.4, tremble: 3, lookx: -20 }, 540, 1000, 2.8) + lightMask(Pf, 540, 950, 1100, 0.8), lt, 0.5, 1.0, 1.2, 540, 1000, 4));
  SN(sg(20), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.5 }) + G(rafaelFig({ back: 0, scale: 1, t, scared: 1, look: -1 }), 'translate(800 1800) scale(1.4)') + lightMask(Pf, 600, 1000, 1000, 0.75), lt, 0.9, 1.1, 1.0, 540, 1000, 2, 2));
  /* 40.72 não havia ninguém */
  SN(sg(21), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.7 }) + lampObj(200, 700, 2) + lampObj(850, 780, 2) + glow(Pf, 'W', 540, 1000, 800, 0.15) + lightMask(Pf, 540, 1100, 1100, 0.6), lt, 1.0, 1.0, 1.1, 540, 1050, 1));
  /* 41.72 passarela / grupo sumiu */
  SN(sg(22), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.8, shift: -40 }) + groupSil(540, 1240, 0.4, 5, t) + lightMask(Pf, 540, 1200, 1200, 0.5), lt, 1.9, 1.0, 1.15, 540, 1100, 1));
  SN(sg(23), 0.02, (t, lt, Pf) => { const u = lt / 2.3; return FZ(Pf, t, DK(Pf, t, { bright: 0.7 }) + groupSil(H.lerp(540, 540, u), 1240, 0.4 * (1 - 0.8 * u), 5, t) + R(-400, -400, 1880, 2720, '#000', OP(0.5 * u)) + lightMask(Pf, 540, 1200, 1200, 0.6), lt, 2.3, 1.0, 1.1, 540, 1100, 1); });
  /* 46.11 chamou monitor */
  SN(sg(24), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.5 }) + RF(t, { eye: 1, pupil: 0.4, worry: 0.9, mouth: 0.8 * Math.abs(Math.sin(t * 8)), sweat: 1 }, 540, 1000, 2.7) + lightMask(Pf, 540, 950, 1100, 0.8), lt, 1.1, 1.0, 1.15, 540, 1000, 2));
  /* 47.29 nenhuma resposta: eco morrendo */
  SN(sg(25), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#040405') + ringWaves(540, 960, t, 0, 4, 900 * (1 - 0.5 * lt), 'rgba(220,215,195,0.3)', 1 - lt * 0.7, 4) + TX(540, 1000, '...', 200, 'rgba(230,225,205,0.5)'), lt, 0.8, 1.0, 1.1, 540, 960, 0));
  /* 48.1 luzes apagam */
  SN(sg(26), 0.01, (t, lt, Pf) => { const off = H.prog(lt, 0.4, 0.55); return FZ(Pf, t, DK(Pf, t, { bright: 1 }) + lampObj(200, 700, 3) + lampObj(850, 780, 3) + glow(Pf, 'W', 540, 900, 1000, 0.3) + R(-400, -400, 1880, 2720, '#000', OP(off)), lt, 1.0, 1.0, 1.05, 540, 1000, 2 + 6 * Math.exp(-Math.abs(lt - 0.45) * 8)); });
  /* 49.67 escuridão: nem a própria mão */
  SN(sg(27), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#000') + HAND(540, 1000, 3.0 + 0.5 * lt, '#b09a86', 0) + R(-400, -400, 1880, 2720, '#000', OP(0.5 + 0.5 * H.prog(lt, 0.5, 3.0))), lt, 3.4, 1.0, 1.05, 540, 1000, 0));
  /* 53.16 desesperado */
  SN(sg(28), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#010101') + RF(t, { eye: 1, pupil: 0.2, worry: 1, sweat: 1, mouth: 0.6, tremble: 4, cold: 0.3 }, 540, 1000, 3.0) + lightMask(Pf, 540, 1000, 700, 0.97), lt, 0.8, 1.0, 1.15, 540, 1000, 4));
  /* 53.95 acendeu a lanterna do celular */
  SN(sg(29), 0.02, (t, lt, Pf) => { const on = H.prog(lt, 0.4, 0.55); return FZ(Pf, t, DK(Pf, t, { bright: 0.2 }) + beam(Pf, 400, 1400, -20, 1600, 14, 0.7 * on) + phoneLight(Pf, 400, 1400, 0.9, -10, 16, t) + glow(Pf, 'W', 400, 1300, 260 * on, 0.7 * on) + lightMask(Pf, 400, 1200, 700 + 600 * on, 0.97 - 0.2 * on), lt, 1.6, 1.0, 1.15, 440, 1250, 2); });
  /* 55.54 16% */
  SN(sg(30), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + glow(Pf, 'W', 540, 960, 700, 0.3) + phoneLight(Pf, 540, 960, 3.0, 0, 16, t) + R(150, 1500, 780, 100, '#16181b', 'rx="20"') + R(160, 1510, 780 * 0.16 - 20, 80, BLOOD, 'rx="12"') + (Math.sin(t * 8) > 0 ? '' : R(150, 1500, 780, 100, 'none')), lt, 1.1, 1.0, 1.12, 540, 960, 2));
  /* 56.79 seguir passarela */
  SN(sg(31), 0.02, (t, lt, Pf) => { const u = lt / 1.8; let s = DK(Pf, t, { bright: 0.2, shift: 40 * u }) + beam(Pf, 420, 1500, -45, 1200, 20, 0.45) + G(rafaelFig({ back: 1, scale: 1, t, walk: t * 0.8 }), 'translate(500 1850) scale(1.5)') + lightMask(Pf, 450, 1400, 800, 0.96); return FZ(Pf, t, s, lt, 1.8, 1.0, 1.12, 540, 1200, 2); });
  SN(sg(32), 0.02, (t, lt, Pf) => { let s = DK(Pf, t, { bright: 0.15, shift: 80 }) + G(rafaelFig({ back: 1, scale: 1, t, walk: t * 0.8 }), 'translate(500 1850) scale(1.2)') + beam(Pf, 420, 1560, -60, 1100, 18, 0.45) + lightMask(Pf, 450, 1400, 700, 0.96) + TX(540, 400, 'SAÍDA?', 120, 'rgba(230,225,205,0.7)', OP(0.4 + 0.3 * Math.sin(t * 6))); return FZ(Pf, t, s, lt, 1.3, 1.0, 1.12, 540, 1200, 2); });
  /* 59.89 algo errado */
  SN(sg(33), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#030304') + RF(t, { eye: 1, pupil: 0.3, worry: 0.9, sweat: 1, mouth: 0, lookx: 20, looky: 5, tremble: 1 }, 540, 1000, 2.7) + lightMask(Pf, 540, 1000, 800, 0.95) + questionMarks(t, 540, 960, 430, 3, '#b0ab9a'), lt, 1.3, 1.0, 1.15, 540, 1000, 2));
  /* 61.26 vários minutos: relógio girando + passos */
  SN(sg(34), 0.02, (t, lt, Pf) => { const a = lt * 220; let s = BIG('#050506') + C(540, 960, 330, '#d9d4c6') + C(540, 960, 310, '#16181b') + C(540, 960, 300, '#d9d4c6', OP(0.9)); for (let i = 0; i < 12; i++) { const q = i / 12 * 6.283; s += L(540 + Math.sin(q) * 250, 960 - Math.cos(q) * 250, 540 + Math.sin(q) * 280, 960 - Math.cos(q) * 280, '#111', 8); } s += L(540, 960, 540 + 200 * Math.sin(a * 0.0175), 960 - 200 * Math.cos(a * 0.0175), '#111', 14) + L(540, 960, 540 + 120 * Math.sin(a * 0.0175 / 12), 960 - 120 * Math.cos(a * 0.0175 / 12), '#111', 20); return FZ(Pf, t, s, lt, 1.8, 1.0, 1.1, 540, 960, 1); });
  /* 63.06 mesma formação reaparece no feixe */
  SN(sg(35), 0.02, (t, lt, Pf) => { const u = ez(lt / 2); let s = DK(Pf, t, { bright: 0.2 }) + formationObj(Pf, 540, 1600, 1.7, 0.3 + 0.6 * u) + beam(Pf, 200, 1700, -40, 1700, 20, 0.5) + lightMask(Pf, 540, 1100, 800 + 300 * u, 0.96); return FZ(Pf, t, s, lt, 3.6, 1.0, 1.2, 540, 1050, 2) ; });
  /* 66.75 andando em círculos */
  SN(sg(36), 0.02, (t, lt, Pf) => { let s = BIG('#050506'); for (let i = 0; i < 4; i++) s += `<circle cx="540" cy="960" r="${f1(150 + i * 110)}" fill="none" stroke="#2a2d33" stroke-width="14" stroke-dasharray="40 30" transform="rotate(${f1(t * 40 * (i % 2 ? -1 : 1))} 540 960)"/>`; const a = t * 2.2; s += G(rafaelFig({ back: 0, scale: 1, t, walk: t * 1.2 }), `translate(${f1(540 + 300 * Math.cos(a))} ${f1(960 + 300 * Math.sin(a) + 250)}) scale(0.7)`) + txtBox(540, 280, 'EM CÍRCULOS', 90, BONE, 'rgba(0,0,0,0.6)', 760); return FZ(Pf, t, s, lt, 1.3, 1.0, 1.1, 540, 960, 2, 6 * Math.sin(t)); });
}
