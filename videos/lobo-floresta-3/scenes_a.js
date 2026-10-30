/* scenes_a.js - parte 3, 0 a ~59 s: a mão, Clara, o túnel, o vídeo, a cicatriz. */
const cabinB = (Pf, t, l = 0.15) => cabinWall(Pf, t, { light: l, moon: 1, win: 1 }) + glow(Pf, 'A', 140, 1000, 900, 0.25 + 0.5 * l);
const vidFx = (Pf, t, inner, o = {}) => {
  let s = inner;
  for (let i = 0; i < 40; i++) s += R(0, i * 48 + ((t * 80) % 48), 1080, 4, 'rgba(0,0,0,0.18)');
  s += R(-400, -400, 1880, 2720, 'rgba(120,200,255,0.06)');
  const g = o.glitch || 0; if (g > 0) for (let i = 0; i < 6; i++) s += R(0, hz(i, Math.floor(t * 18)) * 1920, 1080, 8 + 60 * hz(i, 4), 'rgba(255,255,255,0.18)', OP(g));
  s += C(110, 130, 20, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 5))) + TXT(250, 148, 'REC', 56, '#fff') + TXT(880, 148, o.stamp || '03:12', 50, '#fff');
  return s + vignette(Pf, 0.7) + grain(t, 0.12);
};
const photoYou = (x, y, sc, rot, a = 1, idx = 0) => G(R(-130, -150, 260, 330, '#ece6d6', 'rx="6" stroke="rgba(0,0,0,0.3)" stroke-width="3"') + R(-112, -132, 224, 250, '#1a2a26') + G(womanFace({ eye: 1, worry: 0.3, bodyLen: 260 }), 'translate(0 -10) scale(0.52)').replace(/WEYEf/g, 'WEYEp' + idx + 'f') + R(-50, -172, 100, 30, 'rgba(230,220,170,0.8)', 'rx="2"'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`, OP(a));

function partD(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);

  /* 0.0 HOOK: a mão no ombro, close extremo */
  SN(0, 0.001, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.12) + glow(Pf, 'R', 900, 700, 800, 0.25 + 0.2 * Math.sin(t * 14));
    s += wf({ t, eye: 1, pupil: 0.38, lookx: -14, looky: 0, worry: 1, mouth: 0.35, sweat: 1, tremble: 5, mess: 1, dirt: 0.5, tilt: 3 * Math.sin(t * 10) }, 540, 940, 2.55);
    s += G(R(-110, -40, 220, 700, '#0a0c10', 'rx="60"') + HAND(0, 0, 1.2, '#e9bb9c', 0), `translate(${f1(960 - 30 * Math.sin(t * 12))} 1280) rotate(-70)`);
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.2, 0, 10 * Math.exp(-lt * 3) + 3, s) + FB('#fff', 0.7 * Math.exp(-lt * 14)) + vignette(Pf, 1) + grain(t, 0.07);
  });
  /* 1.25 tenta gritar */
  SN(sg(1), 0.02, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.1) + wf({ t, eye: 0.85, pupil: 0.4, worry: 1, mouth: 0.6 + 0.4 * Math.abs(Math.sin(t * 9)), sweat: 1, tremble: 3, mess: 1 }, 540, 330, 3.3);
    s += ringWaves(540, 980, t, 0, 3, 520, 'rgba(255,255,255,0.4)', 0.5, 4);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 0.7, 0, 5, s) + vignette(Pf, 1);
  });
  /* 2.0 mão tapa a boca */
  SN(sg(2), 0.02, (t, lt, Pf) => {
    const u = E_.outBack(k(lt, 0, 0.18));
    let s = cabinB(Pf, t, 0.1) + wf({ t, eye: 1, pupil: 0.35, worry: 1, mouth: 0, sweat: 1, tremble: 3, mess: 1, tilt: -3 }, 540, 880, 2.3);
    s += G(HAND(0, 0, 1.0, '#e9bb9c', 0) + PL([[0, 60], [0, 600]], '#3f5f52', 120), `translate(${f1(H.lerp(1500, 580, u))} ${f1(H.lerp(1250, 1170, u))}) rotate(-90) scale(2.6)`);
    return cam3(t, lt, 540, 1000, 1.0, 1.1, 0.9, 0, 4, s) + vignette(Pf, 1);
  });
  /* 2.75 sussurra: olhos de Clara no escuro */
  SN(tw('sussurra', 0, 2.75), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + cf({ t, eye: 1, pupil: 0.8, worry: 0.5, mouth: 0, shadow: 0.55, tilt: 6, bruise: 0.6 }, 640, 1080, 3.2);
    s += ringWaves(300, 1000, t, 0, 4, 500, 'rgba(255,255,255,0.35)', 0.5, 3);
    return cam3(t, lt, 540, 960, 1.15, 1.0, 0.7, 0, 2, s) + vignette(Pf, 1);
  });
  /* 3.5 Se fizer barulho: homem na janela com lanterna */
  SN(sg(3), 0.02, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.12);
    s += G(manSil({ scale: 1, eyes: 1, col: '#05070a', t, rim: 1 }), 'translate(890 700) scale(0.34)') + beam(Pf, 880, 560, 150 + 14 * Math.sin(t * 3), 700, 12, 0.7);
    s += R(780, 360, 220, 300, 'none', 'stroke="#1b120c" stroke-width="16"');
    return cam3(t, lt, 890, 560, 1.3, 2.6, 0.9, 0, 3, s) + glow(Pf, 'R', 890, 560, 600, 0.12) + vignette(Pf, 1);
  });
  /* 4.25 ele mata nós duas */
  SN(sg(4), 0.02, (t, lt, Pf) => {
    let s = BIG('#150608') + glow(Pf, 'R', 540, 960, 1100, 0.5) + ecgLine(0, 1500, 1080, t, 160, 1, 140, '#ff4a4a');
    s += eyesPair(Pf, 540, 800, 2.2, '#eaf6ff', 1, 52) + glow(Pf, 'W', 540, 800, 260, 0.2);
    return cam3(t, lt, 540, 960, 1.0, 1.25, 0.7, 0, 5, s) + vignette(Pf, 1);
  });
  /* 5.0 É uma mulher: revelação de Clara */
  SN(sg(5), 0.03, (t, lt, Pf) => {
    const sh = H.lerp(0.5, 0, E_.outCubic(k(lt, 0.2, 1.0)));
    let s = cabinB(Pf, t, 0.2) + glow(Pf, 'A', 300, 800, 700, 0.5) + cf({ t, eye: 1, pupil: 0.8, worry: 0.6, mouth: 0, shadow: sh, tremble: 0.8, tilt: -3 }, 540, 960, 2.3);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.3, 0, 1, s) + vignette(Pf, 1);
  });
  /* 6.34 rosto machucado: close na bochecha */
  SN(sg(6), 0.02, (t, lt, Pf) => {
    let s = BIG('#10090a') + glow(Pf, 'A', 300, 900, 700, 0.4) + cf({ t, eye: 0.9, pupil: 0.7, worry: 0.9, tear: 1, mouth: 0, bruise: 1 }, 960, 700, 4.2);
    return cam3(t, lt, 540, 960, 1.0, 1.18, 1.2, -2, 1.5, s) + vignette(Pf, 1);
  });
  /* 7.63 antes que consiga reagir: você, olhar acelerado */
  SN(sg(7), 0.02, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.12) + wf({ t, eye: 1, pupil: 0.4, lookx: 30 * Math.sin(t * 9), looky: -4, worry: 1, mouth: 0.15, sweat: 1, tremble: 3, mess: 1, dirt: 0.5 }, 540, 960, 2.4);
    return cam3(t, lt, 540, 960, 1.0, 1.35, 1.7, 0, 5, s) + vignette(Pf, 1);
  });
  /* 9.38 aponta a passagem atrás do armário */
  SN(sg(9), 0.03, (t, lt, Pf) => {
    const u = E_.outCubic(k(lt, 0, 0.35));
    let s = cabinB(Pf, t, 0.22) + wardrobe({ x: 700, y: 1560, scale: 1.3 }) + glow(Pf, 'A', 700, 1000, 300, 0.35 * u);
    s += G(PL([[0, 0], [260, -30], [520, -40]], '#3f5f52', 110) + HAND(540, -40, 1.1, '#e9bb9c', 90), `translate(${f1(-380 + 380 * u)} 1180)`);
    s += ringWaves(700, 1000, t, 0.3, 2, 300, '#ffcf8a', 0.7, 5);
    return cam3(t, lt, 540, 1100, 1.0, 1.2, 1.5, 0, 2, s) + vignette(Pf, 1);
  });
  /* 10.9 armário: fresta se abre, luz */
  SN(tw('armário', 0, 10.9), 0.02, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.2);
    s += wardrobe({ x: 540, y: 1700, scale: 2.0, crack: 0.06 + 0.5 * E_.outCubic(k(lt, 0, 1.2)) }) + glow(Pf, 'A', 540, 1000, 160 + 400 * k(lt, 0, 1.2), 0.9 * k(lt, 0, 1));
    s += motes(t, 18, 1080, 1920, 3, 'rgba(255,220,160,0.6)', 3, 10);
    return cam3(t, lt, 540, 1000, 1.0, 1.25, 1.5, 0, 3, s) + vignette(Pf, 1);
  });
  /* 12.39 do outro lado: homem de costas */
  SN(sg(10), 0.03, (t, lt, Pf) => {
    let s = cabinB(Pf, t, 0.3) + G(manJacket(Pf, { scale: 1.45, eyes: 0, t, lantern: 1, rim: 0.8, headLook: 0 }), 'translate(540 1750)') + glow(Pf, 'A', 380, 1500, 600, 0.35);
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 0.8, 0, 1, s) + vignette(Pf, 1);
  });
  /* 13.1 olhando a fotografia */
  SN(sg(11), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + glow(Pf, 'A', 540, 1500, 700, 0.5) + G(shadowFace({ lookx: -8, smile: 0, t, tilt: 0 }), 'translate(540 760) scale(2.4)');
    s += photoYou(540, 1620, 1.3, -6 + 3 * Math.sin(t * 2));
    return cam3(t, lt, 540, 1100, 1.0, 1.12, 1.2, 0, 1, s) + vignette(Pf, 1);
  });
  /* 14.3 fotografia: close */
  SN(tw('fotografia', 0, 14.4), 0.02, (t, lt, Pf) => {
    let s = BIG('#090b0f') + glow(Pf, 'A', 540, 960, 900, 0.5) + photoYou(540, 960, 3.4, -4 + 2 * Math.sin(t * 2));
    s += G(paleHand(0, 0, 1.6, 0, 1), 'translate(160 1700) rotate(30)');
    return cam3(t, lt, 540, 960, 1.0, 1.15, 0.8, 0, 1, s) + vignette(Pf, 1);
  });
  /* 15.03 Ela já esteve aqui */
  SN(sg(12), 0.02, (t, lt, Pf) => {
    let s = BIG('#120708') + glow(Pf, 'R', 540, 900, 900, 0.3) + G(shadowFace({ lookx: 0, smile: 0.5 + 0.4 * Math.abs(Math.sin(t * 8)), t, tilt: 0 }), 'translate(540 900) scale(2.9)');
    return cam3(t, lt, 540, 900, 1.0, 1.2, 1.0, 0, 2, s) + vignette(Pf, 1);
  });
  /* 16.18 comunicador */
  SN(sg(14), 0.02, (t, lt, Pf) => {
    let s = BIG('#080b10') + glow(Pf, 'B', 540, 960, 900, 0.4) + walkie({ x: 540, y: 980, scale: 3.8, rot: -8 + 3 * Math.sin(t * 3), led: 1, t });
    s += ringWaves(540, 900, t, 0, 4, 700, '#6dff9a', 0.6, 5);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.2, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 17.54 mesma pessoa: várias fotos iguais */
  SN(sg(15), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + glow(Pf, 'R', 540, 960, 1100, 0.3);
    for (let i = 0; i < 8; i++) { const u = E_.outBack(k(lt, i * 0.12, i * 0.12 + 0.25)); s += photoYou(190 + (i % 3) * 340, 480 + Math.floor(i / 3) * 520, 1.25 * u, (i * 37 % 20) - 10, 1, i + 1); }
    s += questionMarks(t, 540, 960, 380, 5, '#ff6a5a');
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.5, 0, 2, s) + vignette(Pf, 1);
  });
  /* 19.14 puxa pelo túnel */
  SN(sg(16), 0.02, (t, lt, Pf) => {
    let s = tunnelBG(Pf, t, { speed: 0.7, light: '#ffcf8a' });
    s += G(claraFig({ back: true, run: 1, walk: t * 2.4, scale: 1.0, arms: [60 * Math.sin(t * 14), 70, 40, 70], bob: 5 * Math.abs(Math.sin(t * 14)) }), 'translate(470 1700) scale(1.5)') + G(youFig({ back: true, run: 1, walk: t * 2.4 + 0.5, scale: 0.9, arms: [-40, 50, 70, 90], scared: 1, bob: 5 * Math.abs(Math.sin(t * 14 + 1)) }), 'translate(720 1720) scale(1.5)');
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.7, 0, 3, s) + speedLines(t, 14, 'rgba(255,230,180,0.3)') + vignette(Pf, 1);
  });
  /* 20.88 a porta se fecha */
  SN(sg(17), 0.02, (t, lt, Pf) => {
    const u = E_.inCubic(k(lt, 0.15, 0.55));
    let s = tunnelBG(Pf, t, { speed: 0.05, la: 0.6 * (1 - u) });
    s += R(H.lerp(1200, 0, u), 0, 1100, 1920, '#3b2819', 'stroke="#1b120a" stroke-width="14"') + L(H.lerp(1200, 0, u) + 500, 0, H.lerp(1200, 0, u) + 500, 1920, '#2a1a0e', 10);
    for (let i = 0; i < 14; i++) { const ph = cl((lt - 0.55) * 1.6); s += C(300 + hz(i, 2) * 700, 1200 + 400 * hz(i, 3) - ph * 200 * hz(i, 4), 8 + 14 * hz(i, 5), 'rgba(200,170,130,0.5)', OP(1 - ph)); }
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.0, 0, lt > 0.55 ? 12 * Math.exp(-(lt - 0.55) * 6) : 0, s) + FB('#000', 0.4 * k(lt, 0.55, 0.8)) + vignette(Pf, 1);
  });
  /* 21.82 ela revela */
  SN(sg(18), 0.03, (t, lt, Pf) => {
    let s = BIG('#120d0a') + glow(Pf, 'A', 700, 900, 800, 0.5) + cf({ t, eye: 1, pupil: 0.8, worry: 0.3, mouth: 0, tilt: 4 }, 540, 980, 2.3);
    return cam3(t, lt, 540, 960, 1.1, 1.0, 0.6, 0, 0, s) + vignette(Pf, 1);
  });
  /* 22.49 Meu nome é Clara */
  SN(sg(19), 0.02, (t, lt, Pf) => {
    let s = BIG('#150f0b') + glow(Pf, 'A', 300, 800, 800, 0.6) + cf({ t, eye: 1, pupil: 0.8, worry: 0.2, mouth: 0.35 + 0.3 * Math.abs(Math.sin(t * 10)), tilt: 0 }, 540, 960, 2.4);
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.0, 0, 0.5, s) + vignette(Pf, 1);
  });
  /* 23.44 mandou a mensagem */
  SN(sg(20), 0.02, (t, lt, Pf) => {
    let s = BIG('#06090e') + phoneMsg(Pf, { t, x: 540, y: 960, scale: 3.0, msg: k(lt, 0.2, 0.5), shake: 1, batt: 0.12 });
    s += ringWaves(540, 960, t, 0.2, 3, 700, '#ff6a5a', 0.6, 6);
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.4, 0, 1, s) + vignette(Pf, 1);
  });
  /* 24.94 celular sem sinal */
  SN(sg(21), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0c10') + glow(Pf, 'B', 540, 600, 800, 0.3) + wf({ t, eye: 1, pupil: 0.5, worry: 0.8, anger: 0.4, mouth: 0.4 * Math.abs(Math.sin(t * 8)), tremble: 1.5 }, 400, 800, 2.0);
    s += phoneObj(Pf, { x: 810, y: 1450, scale: 1.7, batt: 0.12, noSig: 1, t });
    return cam3(t, lt, 540, 1000, 1.0, 1.15, 1.4, 0, 2, s) + vignette(Pf, 1);
  });
  /* 26.7 transmissor na floresta */
  SN(sg(22), 0.03, (t, lt, Pf) => {
    const u = ez(k(lt, 0, 1.6));
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 1500 }) + towerObj(Pf, 700, 1500, 1.5, t);
    s += fgTrunks(t, 0, 2, -200, 3, 1) + vignette(Pf, 1);
    return cam3(t, lt, 700, H.lerp(1500, 700, u), 1.1, 1.0, 1.8, 0, 0, s);
  });
  /* 28.85 controlar tudo o que você vê: olho gigante + câmeras */
  SN(sg(23), 0.02, (t, lt, Pf) => {
    let s = BIG('#06101a') + glow(Pf, 'B', 540, 900, 900, 0.5);
    s += E(540, 900, 460, 250, '#eaf6ff') + C(540 + 40 * Math.sin(t * 2), 900, 190, '#2fb8e8') + C(540 + 40 * Math.sin(t * 2), 900, 90, '#04141e') + C(500 + 40 * Math.sin(t * 2), 860, 28, '#fff', OP(0.8));
    for (let i = 0; i < 18; i++) s += L(60, 700 + i * 22, 1020, 700 + i * 22, 'rgba(0,0,0,0.25)', 6);
    s += PL([[540 - 120, 900], [540 + 120, 900]], 'rgba(255,60,60,0.7)', 3) + PL([[540, 780], [540, 1020]], 'rgba(255,60,60,0.7)', 3);
    for (let i = 0; i < 6; i++) { const x = 120 + i * 170, y = 1300 + 80 * (i % 2); s += G(R(-40, -26, 80, 52, '#10161e', 'rx="8"') + C(14, 0, 14, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 6 + i))), `translate(${x} ${y}) rotate(${(i % 2 ? 12 : -12)})`); }
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.4, 0, 2, s) + vignette(Pf, 1);
  });
  /* 30.42 exige saber */
  SN(sg(24), 0.02, (t, lt, Pf) => {
    let s = BIG('#0c0809') + glow(Pf, 'R', 540, 900, 900, 0.35) + wf({ t, eye: 1, pupil: 0.55, anger: 1, worry: 0.4, mouth: 0.5 + 0.4 * Math.abs(Math.sin(t * 9)), tremble: 2, tilt: -4, mess: 1 }, 540, 960, 2.4);
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.4, 0, 3, s) + vignette(Pf, 1);
  });
  /* 31.9 fotografia já estava ali: foto com ? */
  SN(tw('fotografia', 1, 31.9), 0.02, (t, lt, Pf) => {
    let s = BIG('#090b0f') + glow(Pf, 'A', 540, 960, 900, 0.5) + photoYou(540, 960, 3.0, 3 * Math.sin(t * 3)) + questionMarks(t, 540, 960, 420, 4, '#ffcf8a');
    return cam3(t, lt, 540, 960, 1.15, 1.0, 0.9, 0, 1, s) + vignette(Pf, 1);
  });
  /* 33.02 Clara respira fundo */
  SN(sg(25), 0.03, (t, lt, Pf) => {
    const br = Math.sin(lt * 3.2);
    let s = BIG('#120d0a') + glow(Pf, 'A', 700, 900, 800, 0.45) + cf({ t, eye: 0.15 + 0.05 * br, pupil: 0.8, worry: 0.5, mouth: 0, tilt: -2, bodyLen: 430 + 10 * br }, 540, 960 + 10 * br, 2.3);
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.0, 0, 0, s) + vignette(Pf, 1);
  });
  /* 34.01 não é sua primeira noite: ecos */
  SN(sg(26), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a0e18') + C(840, 360, 120, '#dbe9f4') + glow(Pf, 'B', 840, 360, 500, 0.5);
    for (let i = 3; i >= 1; i--) s += G(womanFace({ t, eye: 1, pupil: 0.5, worry: 1, mouth: 0.1 }).replace(/WEYEf/g, 'WEYEg' + i + 'f'), `translate(${f1(540 - i * 70 * Math.sin(t * 2))} 980) scale(${(2.3 - i * 0.05).toFixed(3)})`, OP(0.22));
    s += wf({ t, eye: 1, pupil: 0.45, worry: 1, mouth: 0.15, sweat: 1, tremble: 1.5, cold: 0.2 }, 540, 980, 2.3);
    return cam3(t, lt, 540, 960, 1.0, 1.2, 1.8, 0, 1.5, s) + vignette(Pf, 1);
  });
  /* 35.84 vídeo no celular de Clara */
  SN(sg(27), 0.02, (t, lt, Pf) => {
    let s = BIG('#050709') + glow(Pf, 'B', 540, 800, 900, 0.5) + R(200, 300, 680, 1100, '#0b1117', 'rx="60" stroke="#2c3440" stroke-width="14"') + R(230, 340, 620, 1020, '#10222c', 'rx="40"');
    s += POLY([[470, 680], [470, 960], [700, 820]], 'rgba(255,255,255,0.9)') + C(540, 820, 170, 'none', 'stroke="#fff" stroke-width="12" opacity="0.8"');
    s += HAND(300, 1500, 2.4, '#e9bb9c', 20) + HAND(800, 1500, 2.2, '#e9bb9c', -20);
    return cam3(t, lt, 540, 900, 1.0, 1.15, 1.3, 0, 1, s) + vignette(Pf, 1);
  });
  /* 37.77 você saindo da cabana (vídeo) */
  SN(sg(29), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1500 }) + R(100, 700, 420, 800, '#241a12') + R(180, 900, 160, 600, '#0a0705') + R(540, 700, 40, 800, '#1b120c');
    s += G(youFig({ walk: t * 1.2, scale: 1.2, scared: 0, cold: 0.3, arms: [10, 20, -10, -20] }), `translate(${f1(H.lerp(260, 760, k(lt, 0, 1.8)))} 1500)`);
    return vidFx(Pf, t, cam3(t, lt, 540, 1100, 1.0, 1.1, 1.8, 0, 1.5, s));
  });
  /* 39.62 semanas antes: carimbo de data */
  SN(tw('semanas', 0, 39.62), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1500 }) + calGrid(t, 0.9 * k(lt, 0, 0.8)) + R(-400, -400, 1880, 2720, 'rgba(10,20,30,0.25)');
    return vidFx(Pf, t, cam3(t, lt, 540, 960, 1.0, 1.1, 0.9, 0, 1, s), { stamp: '-21 DIAS', glitch: 0.7 });
  });
  /* 40.52 mesmo homem */
  SN(sg(31), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1500 });
    s += G(manJacket(Pf, { scale: 1.3, eyes: 0, t, lantern: 0, walk: t * 1.1, rim: 0.4 }), `translate(${f1(H.lerp(320, 640, k(lt, 0, 1.2)))} 1500)`) + G(youFig({ walk: t * 1.1, scale: 1.15, cold: 0.3, arms: [10, 20, -10, -20], headTilt: 4 }), `translate(${f1(H.lerp(520, 840, k(lt, 0, 1.2)))} 1500)`);
    return vidFx(Pf, t, cam3(t, lt, 540, 1100, 1.0, 1.15, 1.3, 0, 1.5, s));
  });
  /* 41.91 está chorando */
  SN(sg(32), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a1218') + wf({ t, eye: 0.7, pupil: 0.8, worry: 1, tear: 1, mouth: 0.1, tremble: 1.2, cold: 0.3, tilt: 3 }, 540, 960, 2.4) + C(380, 1100 + 200 * ez(lt), 10, '#bfe4ff', OP(0.8));
    return vidFx(Pf, t, cam3(t, lt, 540, 960, 1.0, 1.12, 0.7, 0, 1, s));
  });
  /* 42.91 Se eu esquecer */
  SN(sg(34), 0.02, (t, lt, Pf) => {
    let s = BIG('#0a1218') + wf({ t, eye: 0.8, pupil: 0.8, worry: 1, tear: 1, mouth: 0.3 + 0.3 * Math.abs(Math.sin(t * 9)), tremble: 1.5, cold: 0.3 }, 540, 960, 2.5);
    return vidFx(Pf, t, cam3(t, lt, 540, 960, 1.05, 1.15, 0.7, 0, 1, s), { glitch: 0.4 });
  });
  /* 43.6 não deixem que me tragam de volta */
  SN(sg(35), 0.02, (t, lt, Pf) => {
    const g = k(lt, 0, 1.4);
    let s = BIG('#0a1218') + G(womanFace({ t, eye: 1, pupil: 0.6, worry: 1, tear: 1, mouth: 0.4 + 0.4 * Math.abs(Math.sin(t * 11)), tremble: 2 + 6 * g, cold: 0.4 }), `translate(540 960) scale(${(2.5 + 0.5 * g).toFixed(3)}) skewX(${f1(12 * g * Math.sin(t * 20))})`);
    return vidFx(Pf, t, cam3(t, lt, 540, 960, 1.0, 1.1, 1.2, 0, 4 * g, s), { glitch: 0.4 + 0.6 * g, stamp: '03:1' + Math.floor(t * 3) % 10 });
  });
  /* 45.24 pernas enfraquecem */
  SN(sg(36), 0.03, (t, lt, Pf) => {
    const kn = ez(k(lt, 0.2, 0.8));
    let s = tunnelBG(Pf, t, { speed: 0.02, la: 0.5 }) + G(youFig({ scale: 1.5, scared: 1, arms: [30, 30, -30, -30], bob: 160 * kn, lean: -20 * kn, headTilt: 10 * kn, cold: 0.3 }), `translate(540 ${f1(1700 + 40 * kn)})`);
    return cam3(t, lt, 540, 1000, 1.0, 1.2, 0.9, 6 * kn, 3 * Math.sin(t * 30) * (1 - kn), s) + vignette(Pf, 1);
  });
  /* 46.11 cicatriz na nuca */
  SN(sg(37), 0.03, (t, lt, Pf) => {
    const pul = 0.6 + 0.4 * Math.sin(t * 7);
    let s = BIG('#0c0a10') + glow(Pf, 'R', 540, 900, 700, 0.2 * pul) + G(napeObj({ t, glow: pul, hand: E_.outCubic(k(lt, 0.2, 0.9)) }), 'translate(540 400) scale(1.45)');
    return cam3(t, lt, 540, 960, 1.0, 1.3, 2.0, 0, 1, s) + vignette(Pf, 1);
  });
  /* 48.17 acidente */
  SN(sg(38), 0.02, (t, lt, Pf) => {
    const hit = k(lt, 0.5, 0.6);
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.8, shafts: 0, ground: 1450 }) + G(carBack(Pf, { brake: 1, t, rot: 8 * hit, shake: hit > 0 ? 8 : 0 }), `translate(540 1500) scale(${(1.6 - 0.25 * hit).toFixed(3)})`);
    for (let i = 0; i < 16; i++) { const a = hz(i, 3) * 6.283, l = 80 + 320 * hit * hz(i, 4); s += L(540, 1100, 540 + Math.cos(a) * l, 1100 + Math.sin(a) * l, '#dff2ff', 4, OP(hit > 0 ? 1 - hit * 0.6 : 0)); }
    return cam3(t, lt, 540, 1100, 1.0, 1.25, 1.5, 0, 14 * hit * Math.exp(-lt), s) + FB('#fff', lt > 0.5 ? 0.8 * Math.exp(-(lt - 0.5) * 9) : 0) + vignette(Pf, 1);
  });
  /* 49.55 semanas inteiras sem recordar */
  SN(sg(39), 0.02, (t, lt, Pf) => {
    let s = BIG('#120d14') + glow(Pf, 'B', 540, 900, 900, 0.3) + calGrid(t, 0.15 + 0.85 * k(lt, 0.3, 2.2));
    return cam3(t, lt, 540, 960, 1.0, 1.1, 2.4, 0, 0, s) + vignette(Pf, 1);
  });
  /* 52.14 queda: tombo */
  SN(sg(40), 0.02, (t, lt, Pf) => {
    let s = BIG('#0b1018') + speedLines(t, 22, 'rgba(180,210,255,0.3)', -1) + glow(Pf, 'B', 540, 900, 900, 0.3);
    s += G(youFig({ scale: 1.2, scared: 1, arms: [160, 20, -160, -20], cold: 0.2 }), `translate(${f1(540 + 40 * Math.sin(t * 3))} ${f1(900 + 120 * lt)}) rotate(${f1(-30 + lt * 260)})`);
    return cam3(t, lt, 540, 960, 1.0, 1.1, 1.8, 0, 4, s) + vignette(Pf, 1);
  });
  /* 54.08 acordava assustada */
  SN(sg(41), 0.02, (t, lt, Pf) => {
    const u = E_.outBack(k(lt, 0.1, 0.4));
    let s = BIG('#0a1020') + R(660, 260, 320, 440, '#12203a', 'rx="10" stroke="#1b2a48" stroke-width="14"') + C(820, 420, 70, '#dbe9f4', OP(0.9)) + bedObj(540, 1500);
    s += wf({ t, eye: H.lerp(0.1, 1, u), pupil: 0.45, worry: 1, mouth: 0.4 * u, sweat: 1, tremble: 3, mess: 1, tilt: 4 * Math.sin(t * 10) }, 460, 1000, 2.3);
    return cam3(t, lt, 540, 1000, 1.0, 1.15, 1.5, 0, 4, s) + vignette(Pf, 1);
  });
  /* 56.6 árvores no sonho */
  SN(tw('árvores', 0, 56.6), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: lt * 300, fog: 0.9, shafts: 0, ground: 1500 }) + fgTrunks(t, lt * 700, 2, -200, 4, 1) + R(-400, -400, 1880, 2720, 'rgba(60,40,120,0.2)');
    s += eyesPair(Pf, 760, 800, 1.2, '#eaf6ff', 0.8, 40);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.3, 2 * Math.sin(t * 2), 1, s) + vignette(Pf, 1);
  });
  /* 57.8 passos no escuro */
  SN(tw('passos', 0, 57.8), 0.02, (t, lt, Pf) => {
    let s = BIG('#06080c') + glow(Pf, 'B', 540, 700, 900, 0.2);
    for (let i = 0; i < 3; i++) { const ph = cl(lt * 1.2 - i * 0.3); s += boot(250 + i * 280, 1700 - 600 * ph, 1.2 + ph * 1.8, '#3a4660') ; }
    s += ringWaves(540, 1300, t, 0, 4, 700, 'rgba(255,255,255,0.3)', 0.5, 4);
    return cam3(t, lt, 540, 1200, 1.0, 1.2, 1.2, 0, 3, s) + vignette(Pf, 1);
  });
}
