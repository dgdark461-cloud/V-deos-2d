/* scenes_c.js - parte 3, ~111 a 164 s: o rio, o lobo, a prisão, o amanhecer, a mensagem final. */
const chatPhone = (Pf, o) => {
  const d = Object.assign({ x: 540, y: 960, scale: 2.4, t: 0, bub: 1, lines: ['Você prefere ficar', 'sozinha com um', 'homem ou com um', 'lobo?'], strike: 0, dim: 0 }, o);
  let s = glow(Pf, 'B', 0, 0, 420, 0.5) + R(-150, -300, 300, 600, '#0d1117', 'rx="40" stroke="#2c3440" stroke-width="9"') + R(-132, -280, 264, 560, '#0f1c28', 'rx="28"') + R(-44, -270, 88, 12, '#000', 'rx="6"');
  s += R(-112, -230, 224, 40, '#1b2a38', 'rx="12"') + TXT(0, -202, 'número desconhecido', 17, '#9ab', 'font-weight="600"');
  const u = E_back(cl(d.bub));
  s += G(R(-116, -150, 232, 70 + d.lines.length * 38, '#2a3a4c', 'rx="22"') + d.lines.map((ln, i) => TXT(0, -100 + i * 38, ln, 25, '#eaf2fa', 'font-weight="600"')).join(''), `scale(${u.toFixed(3)})`);
  if (d.strike) s += L(-120, -20, 120, 140, '#ff3b30', 12, OP(d.strike));
  return G(s, `translate(${f1(d.x)} ${f1(d.y)}) scale(${d.scale})`, OP(1 - d.dim));
};
const E_back = k => { const x = cl(k); return x <= 0 ? 0 : 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2); };
const dawnBG = (Pf, t, kk = 1, o = {}) => forest(Pf, t, Object.assign({ k: kk, px: 0, fog: 0.6, shafts: 0.4, ground: 1450 }, o));

function partF(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);

  /* 111.47 o homem tenta fugir */
  SN(sg(77), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: lt * 600, fog: 0.6, shafts: 0, ground: 1450 }) + fgTrunks(t, lt * 900, 2, -200, 4, 0.9);
    s += G(manJacket(Pf, { scale: 1.3, eyes: 0, t, lantern: 0, walk: t * 2.8, rim: 0.5, flip: -1 }), `translate(${f1(H.lerp(300, 840, ez(lt / 1.3)))} 1620)`) + speedLines(t, 10, 'rgba(255,255,255,0.15)');
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 1.3, 0, 4, s) + vignette(Pf, 1);
  });
  /* 112.83 para subitamente */
  SN(sg(78), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1450 });
    s += G(manJacket(Pf, { scale: 1.8, eyes: 1, t, lantern: 0, rim: 0.7, headLook: 0 }), `translate(540 ${f1(1850)}) skewX(${f1(-8 * Math.exp(-lt * 8))})`);
    for (let i = 0; i < 12; i++) s += C(300 + hz(i, 2) * 480, 1800 - 80 * hz(i, 3) * lt, 20 + 30 * hz(i, 4), 'rgba(200,210,220,0.3)', OP(1 - lt * 0.6));
    return cam3(t, lt, 540, 1200, 1.2, 1.0, 0.5, 0, 12 * Math.exp(-lt * 8), s) + vignette(Pf, 1);
  });
  /* 113.99 margem oposta */
  SN(sg(79), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: lt * 200, fog: 0.6, shafts: 0, ground: 1000 }) + streamBand(Pf, t, 1000, 700, { moonx: 540 });
    s += G(manSil({ scale: 1, eyes: 0, col: '#030405', t, rim: 0.5 }), 'translate(780 1850) scale(1.2)');
    return cam3(t, lt, 540, 800, 1.3, 1.0, 1.1, 0, 0, s) + vignette(Pf, 1);
  });
  /* 115.16 lobo cinzento observa */
  SN(sg(80), 0.03, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1050 }) + streamBand(Pf, t, 1050, 700, { moonx: 540 });
    s += G(wolfSide({ phase: 0, run: 0, head: 0, glow: 1, t, scale: 1.3, flip: 1, sniff: 0 }), 'translate(300 1060)') + glow(Pf, 'A', 410, 740, 200, 0.5);
    return cam3(t, lt, 300, 800, 1.0, 1.5, 2.0, 0, 0, s) + vignette(Pf, 1);
  });
  /* 116.9 em silêncio: lobo de perto */
  SN(tw('silêncio', 0, 116.7), 0.02, (t, lt, Pf) => {
    let s = BIG('#06090e') + glow(Pf, 'B', 540, 700, 900, 0.3) + G(wolfHead({ t, calm: 1, glow: 1, eye: 1 }), 'translate(540 960) scale(2.0)');
    return cam3(t, lt, 540, 960, 1.0, 1.1, 0.5, 0, 0, s) + vignette(Pf, 1);
  });
  /* 117.15 o homem recua */
  SN(sg(81), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1250 }) + streamBand(Pf, t, 1250, 500, { moonx: 740 });
    s += G(manJacket(Pf, { scale: 1.3, eyes: 1, t, lantern: 0, walk: t * 1.4, rim: 0.6, flip: -1 }), `translate(${f1(540 + 80 * lt)} 1620)`);
    s += eyesPair(Pf, 220, 960, 1.2, '#ffb52e', 1, 36);
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 1.1, 0, 2, s) + vignette(Pf, 1);
  });
  /* 118.27 tropeça e cai na água */
  SN(sg(82), 0.02, (t, lt, Pf) => {
    const f = ez(k(lt, 0, 0.5)), hit = k(lt, 0.5, 0.9);
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.6, shafts: 0, ground: 1200 }) + streamBand(Pf, t, 1200, 700, { moonx: 740 });
    s += G(manSil({ scale: 1, eyes: 1, col: '#030405', t, rim: 0.5 }), `translate(${f1(500 + 120 * f)} ${f1(1500 + 200 * f)}) rotate(${f1(-80 * f)}) scale(0.9)`);
    for (let i = 0; i < 18; i++) { const a = -Math.PI * (0.1 + 0.8 * hz(i, 61)), v = 200 + 300 * hz(i, 62); s += C(650 + Math.cos(a) * v * hit, 1650 + Math.sin(a) * v * hit + 380 * hit * hit, 8 + 12 * hz(i, 63), '#dff2ff', OP(hit > 0 ? 1 - hit : 0)); }
    return cam3(t, lt, 540, 1300, 1.0, 1.15, 1.6, 0, hit > 0 ? 10 * (1 - hit) : 0, s) + FB('#fff', hit > 0 && hit < 0.2 ? 0.3 : 0) + vignette(Pf, 1);
  });
  /* 120.22 segundos depois: lanternas pelas árvores */
  SN(sg(83), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.8, shafts: 0, ground: 1450 });
    for (let i = 0; i < 5; i++) s += beam(Pf, 100 + i * 220, 1400, -60 - 10 * i + 10 * Math.sin(t * 3 + i), 1100, 8, 0.6);
    return cam3(t, lt, 540, 1100, 1.0, 1.1, 0.9, 0, 1, s) + fgTrunks(t, 0, 2, -200, 4, 1) + vignette(Pf, 1);
  });
  /* 121.09 policiais aparecem e prendem */
  SN(sg(84), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 1450 }) + policeGlow(Pf, t, 0.7);
    for (let i = 0; i < 4; i++) s += copSil({ x: H.lerp(-100 + i * 300, 160 + i * 240, ez(lt / 1.5)), y: 1700, sc: 0.9 + 0.1 * (i % 2), t });
    s += beam(Pf, 300, 1250, -20, 900, 10, 0.5) + beam(Pf, 780, 1250, 200, 900, 10, 0.5);
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 2.2, 0, 1, s) + fgTrunks(t, 0, 2, -200, 3, 1) + vignette(Pf, 1);
  });
  /* 123.4 prendem: algemas */
  SN(tw('prendem', 0, 123.4), 0.02, (t, lt, Pf) => {
    const u = E_.outBack(k(lt, 0, 0.3));
    let s = BIG('#090b10') + policeGlow(Pf, t, 1) + cuffs(540, 960, 3.2, u);
    s += FB('#fff', 0.5 * Math.exp(-lt * 10));
    return cam3(t, lt, 540, 960, 1.0, 1.15, 0.8, 0, 4 * Math.exp(-lt * 3), s) + vignette(Pf, 1);
  });
  /* 124.28 você finalmente respira */
  SN(sg(85), 0.04, (t, lt, Pf) => {
    const br = Math.sin(lt * 2.6);
    let s = BIG('#17202c') + glow(Pf, 'B', 540, 800, 1100, 0.5) + wf({ t, eye: 0.2, pupil: 0.8, worry: 0.2, mouth: 0.2 + 0.1 * br, smile: 0.2, tremble: 0.4, cold: 0.1, bodyLen: 430 + 12 * br }, 540, 960 + 10 * br, 2.3);
    for (let i = 0; i < 5; i++) { const ph = (lt * 0.7 + i / 5) % 1; s += C(540 + 30 * Math.sin(ph * 6 + i), 1200 - ph * 260, 20 + ph * 70, 'rgba(255,255,255,0.35)', OP(1 - ph)); }
    return cam3(t, lt, 540, 960, 1.15, 1.0, 1.3, 0, 0, s) + vignette(Pf, 0.7);
  });
  /* 125.63 ao amanhecer */
  SN(sg(86), 0.05, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 1.0 - 0.3 * k(lt, 0, 0.9), { fx: 540 }) + glow(Pf, 'A', 540, 700 - 80 * k(lt, 0, 0.9), 700, 0.9) + fgTrunks(t, lt * 100, 1, -200, 3, 0.9);
    for (let i = 0; i < 6; i++) s += POLY([[540, 700], [540 + (i - 2.5) * 360 - 60, 1900], [540 + (i - 2.5) * 360 + 60, 1900]], 'rgba(255,230,160,0.12)');
    return cam3(t, lt, 540, 1000, 1.0, 1.1, 0.9, 0, 0, s);
  });
  /* 126.5 agentes encontram vítimas */
  SN(sg(87), 0.03, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.7, { ground: 1350 }) + R(-400, 1200, 1880, 900, 'rgba(30,20,10,0.15)');
    for (let i = 0; i < 3; i++) s += G(E(0, -80, 120, 150, ['#c97a4a', '#6a8aa8', '#c9a45a'][i]) + C(0, -250, 46, PAL.skin) + P('M-48,-262 Q0,-320 48,-262 Q30,-290 -48,-262Z', ['#2b1a14', '#8a3a1c', '#1a1a22'][i]), `translate(${f1(220 + i * 300)} ${f1(1620 - 8 * Math.sin(t * 2 + i))})`);
    s += copSil({ x: 880, y: 1750, sc: 1.0, t, col: '#0c1018' });
    s += L(0, 1050, 1080, 1100, '#ffd35a', 18) + L(0, 1076, 1080, 1126, '#10151c', 4);
    return cam3(t, lt, 540, 1200, 1.0, 1.15, 1.7, 0, 0, s) + vignette(Pf, 0.5);
  });
  /* 128.4 equipamentos escondidos */
  SN(tw('equipamentos', 0, 128.4), 0.02, (t, lt, Pf) => {
    let s = BIG('#1a1612') + glow(Pf, 'A', 540, 900, 1000, 0.5) + monitorGrid(Pf, t, 0) + R(40, 1600, 1000, 200, '#2a2a30', 'rx="10"');
    for (let i = 0; i < 8; i++) s += PL([[100 + i * 120, 1600], [160 + i * 90, 1480 + 40 * Math.sin(i)], [60 + i * 130, 1900]], i % 2 ? '#d6322a' : '#2a2a30', 12);
    s += beam(Pf, 900, 200, 150, 1500, 10, 0.5);
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.7, 0, 1, s) + vignette(Pf, 0.8);
  });
  /* 130.21 Clara entrega as gravações */
  SN(sg(88), 0.03, (t, lt, Pf) => {
    const u = ez(k(lt, 0.1, 0.9));
    let s = dawnBG(Pf, t, 0.5, { ground: 1500 }) + glow(Pf, 'A', 540, 900, 900, 0.6);
    s += G(R(-60, -100, 120, 200, '#1c2228', 'rx="16" stroke="#6dff9a" stroke-width="6"') + C(0, -20, 30, '#2a3238') + C(0, 70, 8, '#6dff9a'), `translate(540 ${f1(1000)}) scale(2.4)`);
    s += G(HAND(0, 0, 2.2, '#e9bb9c', 90) + PL([[0, 60], [-300, 60]], '#3f5f52', 150), `translate(${f1(H.lerp(100, 400, u))} 1000)`) + G(HAND(0, 0, 2.2, '#c9a07a', -90) + PL([[0, 60], [300, 60]], '#0c1018', 150), `translate(${f1(H.lerp(1000, 680, u))} 1000)`);
    return cam3(t, lt, 540, 1000, 1.0, 1.15, 1.5, 0, 0, s);
  });
  /* 131.72 lobo na floresta clara */
  SN(sg(89), 0.03, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.6, { ground: 1300 }) + G(wolfSide({ phase: (t * 0.5) % 1, run: 0, head: 0, glow: 0.5, t, scale: 1.3, flip: 1, sniff: 0 }), `translate(${f1(H.lerp(200, 700, ez(lt / 1.4)))} 1450)`);
    return cam3(t, lt, 540, 1100, 1.0, 1.15, 1.4, 0, 0, s) + fgTrunks(t, 0, 1, -300, 3, 0.9);
  });
  /* 133.0 selvagem */
  SN(tw('selvagem', 0, 133.0), 0.03, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.6, { ground: 1300 }) + G(wolfHead({ t, calm: 1, glow: 0.6, eye: 1, sniff: 1 }), 'translate(540 1000) scale(1.8)');
    return cam3(t, lt, 540, 1000, 1.0, 1.12, 1.6, 0, 0, s) + vignette(Pf, 0.5);
  });
  /* 134.7 restos de comida */
  SN(tw('restos', 0, 134.7), 0.02, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.5, { ground: 1100 }) + R(-400, 1100, 1880, 900, '#3a3226');
    s += G(R(-60, -90, 120, 90, '#c8c8d0', 'rx="10"') + E(0, -90, 60, 16, '#e0e0e8'), 'translate(300 1500) rotate(-12)') + G(R(-70, -70, 140, 70, '#d6322a', 'rx="10"'), 'translate(760 1620) rotate(18)');
    for (let i = 0; i < 4; i++) s += G(R(-90, -14, 180, 28, '#ede2c8', 'rx="14"') + C(-90, 0, 22, '#ede2c8') + C(90, 0, 22, '#ede2c8'), `translate(${f1(200 + i * 220)} ${f1(1300 + 130 * (i % 2))}) rotate(${(i * 47) % 90 - 40})`);
    s += G(wolfHead({ t, calm: 1, glow: 0.4, eye: 1, sniff: 1 }), 'translate(900 700) scale(0.9)');
    return cam3(t, lt, 540, 1300, 1.0, 1.2, 1.7, 0, 0, s) + vignette(Pf, 0.6);
  });
  /* 136.4 deixados pelos sequestradores */
  SN(tw('sequestradores', 0, 136.4), 0.02, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.5, { ground: 1100 }) + R(-400, 1100, 1880, 900, '#3a3226');
    s += G(sackShape({ s: 2.2, t, open: 0 }), 'translate(540 1450) scale(2.2)') + PL([[200, 1650], [400, 1580], [700, 1700]], '#8a6a3a', 14);
    return cam3(t, lt, 540, 1300, 1.0, 1.2, 1.6, 0, 0, s) + vignette(Pf, 0.7);
  });
  /* 137.99 não era sobrenatural: mito riscado */
  SN(sg(90), 0.02, (t, lt, Pf) => {
    let s = BIG('#0c1018') + glow(Pf, 'B', 540, 900, 1000, 0.4);
    s += G(wolfHead({ t, snarl: 0, glow: 1, eye: 1, calm: 0 }), 'translate(540 900) scale(1.6)', OP(0.55));
    for (let i = 0; i < 7; i++) s += E(540 + 200 * Math.sin(t + i), 900 + 80 * i - 300, 300, 40, 'rgba(180,220,255,0.12)');
    s += bigX(540, 900, 380 * E_.outBack(k(lt, 0.4, 0.8)), 1, PAL.red, 44);
    return cam3(t, lt, 540, 900, 1.0, 1.12, 1.8, 0, 2 * Math.exp(-lt), s) + vignette(Pf, 1);
  });
  /* 139.8 encurralado: lobo acuado ataca */
  SN(sg(91), 0.02, (t, lt, Pf) => {
    let s = forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, ground: 1500 }) + R(-400, -400, 1880, 2720, 'rgba(30,0,0,0.2)');
    s += G(wolfSide({ phase: 0, crouch: 1, glow: 1, t, scale: 1.5, flip: -1, mouth: 1, tail: 0, lunge: 0.5 + 0.5 * Math.sin(t * 6) }), 'translate(700 1560)') + G(manSil({ scale: 1, eyes: 1, col: '#030405', t, rim: 0.4 }), `translate(${f1(260 - 30 * ez(lt / 2))} 1700) scale(1.0)`);
    return cam3(t, lt, 540, 1200, 1.0, 1.25, 2.6, 0, 3, s) + vignette(Pf, 1);
  });
  /* 142.73 confessa: mapa com marcas */
  SN(sg(92), 0.03, (t, lt, Pf) => {
    let s = BIG('#1a1410') + glow(Pf, 'A', 540, 700, 1000, 0.7) + R(80, 400, 920, 1200, '#e8dcc0', 'rx="12" stroke="#6a4a30" stroke-width="12"');
    s += PL([[160, 560], [380, 760], [300, 980], [620, 1100], [880, 1400]], '#6a4a30', 8, 'stroke-dasharray="20 18"') + PL([[200, 1400], [440, 1280], [700, 800], [900, 560]], '#4a8ab8', 12);
    for (let i = 0; i < 5; i++) { const u = E_.outBack(k(lt, 0.2 + i * 0.4, 0.5 + i * 0.4)); s += G(C(0, 0, 36, '#d6322a') + L(0, 0, 0, 70, '#8a1d1d', 8), `translate(${[300, 620, 880, 440, 220][i]} ${[980, 1100, 1400, 700, 1300][i] - 60}) scale(${u.toFixed(3)})`); }
    s += G(shadowFace({ lookx: 0, smile: 0, t, hood: false }), 'translate(930 280) scale(0.6)', OP(0.85));
    return cam3(t, lt, 540, 960, 1.0, 1.15, 2.2, 0, 0, s) + vignette(Pf, 0.7);
  });
  /* 144.95 antes de ir embora */
  SN(sg(93), 0.04, (t, lt, Pf) => {
    let s = dawnBG(Pf, t, 0.3, { ground: 1500 }) + glow(Pf, 'A', 540, 500, 800, 0.7);
    s += G(youFig({ back: true, walk: 0, scale: 1.2, arms: [8, 14, -8, -14], headTilt: 6 * Math.sin(t) }), 'translate(540 1700)') + fgTrunks(t, 0, 0.6, -300, 3, 0.9);
    return cam3(t, lt, 540, 1200, 1.0, 1.1, 1.0, 0, 0, s);
  });
  /* 145.98 lobo desaparece entre as árvores */
  SN(sg(94), 0.03, (t, lt, Pf) => {
    const u = ez(lt / 2.2);
    let s = dawnBG(Pf, t, 0.45, { ground: 1500, fog: 0.8 }) + G(wolfSide({ phase: (t * 0.6) % 1, run: 0, glow: 0.4, t, scale: 1.3, flip: 1 }), `translate(${f1(H.lerp(300, 900, u))} 1480)`, OP(1 - 0.85 * u));
    s += R(-400, 1000, 1880, 1000, 'rgba(220,235,245,0.25)', OP(u));
    return cam3(t, lt, 540, 1200, 1.0, 1.1, 2.2, 0, 0, s) + fgTrunks(t, 0, 0.6, -300, 3, 1);
  });
  /* 148.22 todo aquele tempo: olhos do lobo */
  SN(sg(95), 0.03, (t, lt, Pf) => {
    let s = BIG('#0c1218') + glow(Pf, 'A', 540, 900, 900, 0.4) + G(wolfHead({ t, calm: 1, glow: 1, eye: 1 }), 'translate(540 960) scale(2.1)');
    return cam3(t, lt, 540, 960, 1.0, 1.15, 1.4, 0, 0, s) + vignette(Pf, 0.8);
  });
  /* 149.6 nunca foi o monstro: lobo sereno ao amanhecer */
  SN(sg(96), 0.03, (t, lt, Pf) => {
    const u = ez(k(lt, 0, 1.8));
    let s = dawnBG(Pf, t, 0.3, { ground: 1500 }) + glow(Pf, 'A', 540, 600, 900, 0.8);
    s += G(wolfHead({ t, calm: 1, glow: 0.4, eye: 1 }), 'translate(540 1050) scale(1.7)');
    s += G(shadowFace({ lookx: 0, smile: 0, t, hood: true }), 'translate(180 1700) scale(0.5)', OP(0.9 * u)) + cuffs(180, 1900, 1.0, u);
    return cam3(t, lt, 540, 1000, 1.0, 1.1, 1.8, 0, 0, s);
  });
  /* 151.44 dias depois: calendário virando */
  SN(sg(97), 0.03, (t, lt, Pf) => {
    let s = homeBG(Pf, t) + G(calGrid(t, 0), 'translate(0 0)', OP(0.0));
    const fl = lt * 6;
    for (let i = 0; i < 4; i++) { const f = cl(fl - i * 0.6); s += G(R(-300, -380, 600, 760, '#f6efe0', 'rx="26" stroke="#c92f2b" stroke-width="12"') + R(-300, -380, 600, 120, '#c92f2b', 'rx="26"') + TXT(0, 140, String(3 + i * 2), 280, '#2a2a2a'), `translate(540 960) rotate(${f1(-6 + 8 * f)}) scale(${(1 - 0.0 * f).toFixed(3)} ${(1 - f).toFixed(3)})`, OP(f < 1 ? 1 : 0)); }
    return cam3(t, lt, 540, 960, 1.0, 1.1, 0.7, 0, 1, s);
  });
  /* 152.13 em casa */
  SN(sg(98), 0.04, (t, lt, Pf) => {
    let s = homeBG(Pf, t) + G(womanFig({ scale: 1.5, arms: [8, 14, -8, -14], bob: 2 * Math.sin(t * 2), headTilt: 3 * Math.sin(t) }), 'translate(540 1700)') + R(220, 1300, 640, 40, '#8a5a38') + R(300, 1340, 40, 300, '#8a5a38');
    return cam3(t, lt, 540, 1100, 1.0, 1.12, 0.9, 0, 0, s);
  });
  /* 153.09 celular recebe mensagem: vibrando */
  SN(sg(99), 0.02, (t, lt, Pf) => {
    let s = homeBG(Pf, t) + R(100, 1200, 880, 40, '#8a5a38') + G(R(-120, -230, 240, 460, '#0d1117', 'rx="34" stroke="#2c3440" stroke-width="8"') + R(-104, -214, 208, 428, '#0f1c28', 'rx="24"') + glow(Pf, 'B', 0, 0, 360, 0.7) + TXT(0, 20, '?', 200, '#9ab'), `translate(${f1(540 + 6 * Math.sin(t * 60))} 1000) rotate(${f1(3 * Math.sin(t * 50))}) scale(2.0)`);
    s += ringWaves(540, 1000, t, 0, 3, 600, 'rgba(120,180,255,0.6)', 0.7, 6);
    return cam3(t, lt, 540, 1000, 1.0, 1.2, 2.5, 0, 1, s) + vignette(Pf, 0.7);
  });
  /* 155.92 a mensagem */
  SN(sg(100), 0.02, (t, lt, Pf) => {
    let s = BIG('#06090e') + glow(Pf, 'B', 540, 960, 1100, 0.35) + chatPhone(Pf, { x: 540, y: 960, scale: 2.7, t, bub: k(lt, 0, 0.3) });
    return cam3(t, lt, 540, 960, 1.0, 1.2, 2.7, 0, 0.5, s) + vignette(Pf, 1);
  });
  /* 158.61 desta vez */
  SN(sg(101), 0.03, (t, lt, Pf) => {
    let s = BIG('#101820') + glow(Pf, 'A', 600, 800, 1000, 0.4) + wf({ t, eye: 1, pupil: 0.8, worry: 0, anger: 0.35, mouth: 0, tremble: 0.2 }, 540, 960, 2.4);
    return cam3(t, lt, 540, 960, 1.0, 1.12, 0.6, 0, 0, s) + vignette(Pf, 0.8);
  });
  /* 159.06 você não responde: polegar recua */
  SN(sg(102), 0.02, (t, lt, Pf) => {
    const th = ez(k(lt, 0, 0.5)), out = ez(k(lt, 0.6, 1.0));
    let s = BIG('#06090e') + chatPhone(Pf, { x: 540, y: 900, scale: 2.5, t, bub: 1 });
    s += G(E(0, 0, 60, 90, '#e9bb9c') + E(0, -80, 40, 56, '#e9bb9c'), `translate(${f1(H.lerp(900, 640, th) + 400 * out)} ${f1(H.lerp(1700, 1240, th) + 700 * out)}) rotate(-30)`);
    s += bigX(540, 900, 160 * E_.outBack(k(lt, 0.7, 1.0)), 1, '#ff3b30', 22);
    return cam3(t, lt, 540, 1000, 1.0, 1.1, 1.3, 0, 0, s) + vignette(Pf, 1);
  });
  /* 160.18 entrega o telefone à polícia */
  SN(sg(103), 0.03, (t, lt, Pf) => {
    const u = ez(k(lt, 0, 0.8));
    let s = dawnBG(Pf, t, 0.3, { ground: 1500 }) + glow(Pf, 'A', 540, 700, 900, 0.7) + copSil({ x: 800, y: 1850, sc: 1.5, t, col: '#0c1018' });
    s += G(R(-60, -110, 120, 220, '#0d1117', 'rx="16" stroke="#6a7a8a" stroke-width="4"') + R(-48, -96, 96, 180, '#0f1c28', 'rx="10"'), `translate(${f1(H.lerp(300, 620, u))} 1150) rotate(-10) scale(2.0)`);
    s += G(HAND(0, 0, 1.8, '#e9bb9c', 90) + PL([[0, 60], [-300, 60]], '#e7dcc9', 140), `translate(${f1(H.lerp(60, 380, u))} 1160)`);
    return cam3(t, lt, 540, 1200, 1.0, 1.12, 1.4, 0, 0, s);
  });
  /* 161.76 pela primeira vez: sorriso leve */
  SN(sg(105), 0.04, (t, lt, Pf) => {
    let s = BIG('#e8d2b0') + glow(Pf, 'A', 700, 600, 1200, 0.9) + wf({ t, eye: 0.8, pupil: 0.8, worry: 0, smile: 0.7, mouth: 0, tilt: -2 }, 540, 980, 2.3);
    return cam3(t, lt, 540, 960, 1.0, 1.1, 0.9, 0, 0, s) + vignette(Pf, 0.35);
  });
  /* 162.57 a pergunta não decide o seu destino: caminho ao amanhecer */
  SN(sg(106), 0.05, (t, lt, Pf) => {
    const u = ez(lt / 2.2);
    let s = dawnBG(Pf, t, 0.1, { ground: 1350 }) + glow(Pf, 'A', 540, 600, 1100, 0.9);
    for (let i = 0; i < 7; i++) s += POLY([[540, 600], [540 + (i - 3) * 320 - 60, 1900], [540 + (i - 3) * 320 + 60, 1900]], 'rgba(255,240,180,0.14)');
    s += P('M380,1920 L520,1300 L560,1300 L760,1920Z', '#d9c19a', OP(0.8)) + G(youFig({ back: true, walk: t * 0.9, scale: H.lerp(1.1, 0.7, u), arms: [8, 14, -8, -14] }), `translate(540 ${f1(H.lerp(1800, 1400, u))})`);
    s += chatPhone(Pf, { x: 860, y: 520, scale: 0.8, t, bub: 1, strike: 1, dim: 0.5 * u }).replace(/<g /, '<g ');
    return cam3(t, lt, 540, 1200, 1.0, 1.1, 2.4, 0, 0, s);
  });
}
