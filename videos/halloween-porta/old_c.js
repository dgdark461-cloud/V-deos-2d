/* scenes_c.js - parte 2, ~95 a 139,7 s: o rádio, o armário, o homem na cabana, a mão no ombro. */
function paleHand(x, y, sc, rot = 0, a = 1) {
  let s = P('M-40,0 Q-46,-120 -34,-200 L-20,-200 L-18,-120 L-6,-210 L10,-210 L10,-120 L26,-196 L40,-190 L30,-100 L60,-60 Q70,-20 50,20 Q0,50 -40,0Z', '#c9c4cc') + P('M-40,0 Q-46,-120 -34,-200 L-20,-200 L-18,-120Z', 'rgba(0,0,0,0.2)') + PL([[-30, 60], [-60, 160], [-80, 300]], '#3a3a42', 60);
  return G(s, `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`, OP(a));
}
function partC(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start;
  const dark = (Pf, a = 0.35) => R(0, 0, 1080, 1920, '#000', OP(a));
  const radioShot = (Pf, t, o) => { const d = Object.assign({ z: 1.5, glow: 1, x: 540, y: 1050 }, o); return glow(Pf, 'A', d.x - 100, d.y, 700 * d.glow, 0.4 * d.glow) + radioVintage(Pf, { t, x: d.x, y: d.y, scale: d.z, glow: d.glow }); };

  /* 69. o rádio começa a chiar */
  add(sg(69), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.15, win: 0 }) + dark(Pf, 0.4) + staticFx(t, 0.45 * (1 - 0.5 * lt));
    s += radioShot(Pf, t, { z: 1.7, glow: 0.7 + 0.3 * Math.sin(t * 30) });
    s += flash('#fff', 0.1 * (Math.sin(t * 45) > 0.7 ? 1 : 0)) + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0 + 0.1 * lt, 0, 5 * Math.exp(-lt * 2) + 1, s);
  });
  function staticFx(t, a = 0.5) { let s = ''; for (let i = 0; i < 70; i++) { const q = Math.floor(t * 30), y = hz(i, q) * 1920, x = hz(i + 70, q) * 700, w = 60 + 380 * hz(i + 20, q); s += R(x, y, w, 4 + 14 * hz(i + 3, q), '#fff', OP(a * hz(i + 9, q))); } return s; }

  /* 70. voz feminina entre os ruídos: silhueta fantasma na estática */
  add(sg(70), 0.02, (t, lt, Pf) => {
    const dur = sg(71) - sg(70), g = E_.outCubic(k(lt, 0.4, 1.6));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.15, win: 0 }) + dark(Pf, 0.5) + staticFx(t, 0.15);
    s += E(540, 900, 180, 240, 'rgba(180,200,230,0.18)', OP(g)) + P('M360,1160 Q360,820 540,760 Q720,820 720,1160Z', 'rgba(180,200,230,0.12)', OP(g)) + E(540, 760, 80, 100, 'rgba(210,225,245,0.22)', OP(g));
    s += radioShot(Pf, t, { z: 1.2, y: 1450, glow: 1 }) + voiceWave(t, 1000, 120 * g, '#ffd27a', 0.85) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.06 * lt / dur, 0, 1, s);
  });

  /* 71. Se você encontrou a cabana: ela ouvindo */
  add(sg(71), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080605') + glow(Pf, 'A', 1000, 1000, 900, 0.3);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.55, lookx: 20, worry: 0.8, mouth: 0.05, sweat: 1, mess: 1, dirt: 0.8 }, 540, 1020, 2.0)) + voiceWave(t, 330, 70, '#ffd27a', 0.6) + vignette(Pf, 1);
    return s;
  });
  /* 72. não acenda a luz: lâmpada riscada */
  add(sg(72), 0.02, (t, lt, Pf) => {
    const a = E_.outBack(k(lt, 0.1, 0.5)), h = E_.inOutQuad(k(lt, 0.0, 0.5));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050506') + glow(Pf, 'A', 540, 760, 500 * 0.3, 0.2);
    s += L(540, 0, 540, 560, '#222', 8) + E(540, 700, 80, 100, '#2a2a2c') + bigX(540, 700, 170 * a, 1, PAL.red, 30) + HAND(H.lerp(900, 640, h), H.lerp(1500, 1180, h), 3.0, '#d9ab8c', -30 + 30 * k(lt, 0.7, 1.0)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0, 0, 1.2, s);
  });

  /* 73. você se aproxima do aparelho */
  add(sg(73), 0.02, (t, lt, Pf) => {
    const dur = sg(74) - sg(73), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.15, win: 0 }) + dark(Pf, 0.45) + radioShot(Pf, t, { z: 1.4, y: 1000 });
    s += HAND(H.lerp(980, 620, u), H.lerp(1700, 1280, u), 2.4, '#d9ab8c', -25) + vignette(Pf, 1);
    return camG(t, 540, 1000, H.lerp(1.0, 1.6, u), 0, 1, s);
  });
  /* 74. Quem é você? */
  add(sg(74), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080605') + glow(Pf, 'A', 100, 1000, 900, 0.35);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.55, lookx: -18, worry: 0.8, mouth: 0.25 * Math.abs(Math.sin(lt * 9)), sweat: 1, mess: 1, dirt: 0.8 }, 540, 1020, 2.1)) + vignette(Pf, 1);
    return s;
  });
  /* 75. a resposta demora: estática + relógio */
  add(sg(75), 0.02, (t, lt, Pf) => {
    const dur = sg(76) - sg(75);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.12, win: 0 }) + dark(Pf, 0.5) + staticFx(t, 0.2);
    s += radioShot(Pf, t, { z: 1.3, glow: 0.5 }) + G(clockObj(Pf, { h: 0, m: 5 * lt, glow: 0.5 }), 'translate(900 360) scale(0.7)') + voiceWave(t, 1550, 8, '#ffd27a', 0.7) + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0 + 0.1 * lt / dur, 0, 0.8, s);
  });
  /* 76. Eu também escolhi o lobo */
  add(sg(76), 0.02, (t, lt, Pf) => {
    const dur = sg(77) - sg(76), w = E_.outCubic(k(lt, 0.5, 1.2));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.12, win: 0 }) + dark(Pf, 0.55) + staticFx(t, 0.1);
    s += radioShot(Pf, t, { z: 1.7, glow: 1 }) + X(Pf, G(wolfHead({ t, uid: 'r', glow: 1, calm: 1, ears: 0, eye: 1 }), 'translate(540 600) scale(0.9)'), '') .replace('<g', '<g ') ;
    s += R(0, 0, 1080, 1920, '#000', OP(0.0)) + voiceWave(t, 1480, 100, '#ffd27a', 0.8) + vignette(Pf, 1) + flash('#ffd27a', 0.06 * Math.sin(t * 8) ** 2);
    return camG(t, 540, 1000, 1.0 + 0.08 * lt / dur, 0, 1.5, s);
  });

  /* 77. Antes que consiga perguntar: boca abre, congela */
  add(sg(77), 0.02, (t, lt, Pf) => {
    const g = E_.outCubic(k(lt, 0.8, 1.6));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#070606') + glow(Pf, 'A', 540, 900, 900, 0.2);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: H.lerp(0.6, 0.35, g), lookx: H.lerp(0, 40, g), worry: 1, mouth: H.lerp(0.3, 0.0, g), sweat: 1, mess: 1, dirt: 0.8, tremble: 1.5 * g }, 540, 1020, 2.0 + 0.2 * g)) + vignette(Pf, 1);
    return s;
  });
  /* 78. passos do lado de fora: feixe cruza a janela */
  add(sg(78), 0.02, (t, lt, Pf) => {
    const dur = sg(79) - sg(78), u = E_.inOutQuad(k(lt, 0, dur)), bx = H.lerp(-200, 1300, u);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.1, win: 1 }) + dark(Pf, 0.35);
    s += beam(Pf, bx, 700, 80 + 10 * Math.sin(t * 5), 1200, 20, 0.5) + POLY([[bx - 120, 0], [bx + 120, 0], [bx + 220, 1500], [bx - 220, 1500]], 'rgba(255,230,160,0.06)');
    s += G(X(Pf, manJacket(Pf, { eyes: 0, scale: 0.9, lantern: 0, col: '#020304', rim: 0 })), `translate(${f1(bx - 80)} 1300)`, OP(0.0)) + P(`M${f1(bx - 140)},660 q40,-120 80,0 l0,300 l-80,0Z`, 'rgba(0,0,0,0.85)', OP(0.8)) + ringWaves(540, 1600, t, sg(78), 3, 700, 'rgba(255,255,255,0.35)', 0.8, 8) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.05 * lt, 0, 1.5, s);
  });

  /* 79. a voz no rádio sussurra */
  add(sg(79), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.12, win: 0 }) + dark(Pf, 0.55) + radioShot(Pf, t, { z: 1.8, glow: 0.9 });
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); s += C(420, 1100, 60 + ph * 500, 'none', `stroke="rgba(255,210,120,${(0.4 * (1 - ph)).toFixed(2)})" stroke-width="5"`); }
    s += vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0 + 0.1 * lt, 0, 0.8, s);
  });
  /* 80. Ele não pode descobrir: dedo nos lábios + silhueta se aproxima da janela */
  add(sg(80), 0.02, (t, lt, Pf) => {
    const dur = sg(81) - sg(80), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.1, win: 1 }) + dark(Pf, 0.45);
    s += beam(Pf, 890, 520, 200, 900, 12, 0.35 * u) + P('M800,360 l220,0 l0,300 l-220,0Z', 'rgba(0,0,0,0.7)', OP(0.7 * u)) + eyesPair(Pf, 890, 480, 0.8, '#e8f4ff', u * 0.9, 34);
    s += G(womanFig({ scale: 1.2, scared: 1, arms: [10, 14, 160, 110] }), 'translate(360 1800)') + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.06 * lt, 0, 1, s);
  });

  /* 81. você se esconde atrás de um armário */
  add(sg(81), 0.02, (t, lt, Pf) => {
    const dur = sg(82) - sg(81), u = E_.inOutCubic(k(lt, 0.0, dur - 0.3)), cr = k(lt, dur - 0.5, dur);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.12, win: 1 }) + dark(Pf, 0.35);
    s += G(wardrobe({ crack: 0.5 + 0 * cr }), 'translate(780 1560) scale(1.4)') + G(womanFig({ scale: 1.15, scared: 1, run: 1, walk: t * 2.2, arms: [50 * Math.sin(t * 12), 70, -50 * Math.sin(t * 12), 70] }), `translate(${f1(H.lerp(200, 780, u))} 1850)`, OP(1 - 0.0 * u));
    s += vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0, 0, 3, s);
  });

  /* 82. a porta range: feixe entrando no chão */
  add(sg(82), 0.02, (t, lt, Pf) => {
    const dur = sg(83) - sg(82), o = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.08, win: 0 }) + dark(Pf, 0.4);
    s += R(240, 380, 600, 1200, '#050403') + POLY([[240, 380], [240 + 520 * (0.1 + 0.5 * o), 420], [240 + 520 * (0.1 + 0.5 * o), 1540], [240, 1580]], '#3a2c1f');
    s += POLY([[240, 1580], [240 + 600 * o, 1580], [-200 - 600 * o, 1920], [-200, 1920]], 'rgba(255,230,160,0.18)') + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * o, 0, 2, s);
  });
  /* 83. o homem entra */
  add(sg(83), 0.02, (t, lt, Pf) => {
    const dur = sg(84) - sg(83), u = E_.outCubic(k(lt, 0, dur));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.1, win: 0 }) + dark(Pf, 0.4);
    s += R(240, 360, 600, 1240, 'rgba(120,150,190,0.08)') + beam(Pf, 540, 1100, 90 + 30 * Math.sin(t * 2), 1200, 24, 0.5) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: H.lerp(0.9, 1.3, u), lantern: 1, t, rim: 0.6 })), 'translate(540 1860)') + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0, 0, 1.5, s);
  });
  /* 84a. olha as fotografias: feixe varre a parede */
  add(sg(84), 0.02, (t, lt, Pf) => {
    const dur = 1.5, u = k(lt, 0, dur);
    let s = defsC(Pf);
    s += (() => { let w = cabinWall(Pf, t, { light: 0.1, win: 0 }); const dates = ['03/11', '19/02', '07/08', '28/01', '14/05', '30/09', '11/12', '22/04']; for (let i = 0; i < 12; i++) w += polaroid(Pf, { x: 150 + (i % 4) * 260, y: 380 + Math.floor(i / 4) * 400, w: 180, h: 200, rot: (hz(i, 4) - 0.5) * 14, who: i, bag: i % 5 === 3, date: dates[i % 8] }); return w; })();
    s += R(0, 0, 1080, 1920, '#000', OP(0.72)) + beam(Pf, H.lerp(900, 200, u), 1900, -90 + 20 * (0.5 - u), 1800, 14, 0.7) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0, 0, 1, s);
  });
  /* 84b. fala baixinho pelo comunicador */
  add(sg(84) + 1.5, 0.02, (t, lt, Pf) => {
    const dur = sg(85) - (sg(84) + 1.5);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050607') + glow(Pf, 'G', 540, 900, 600, 0.0);
    s += beam(Pf, 540, 1800, -90, 1200, 12, 0.25) + G(walkie({ led: Math.sin(t * 8) > 0 ? 1 : 0.3 }), 'translate(540 1000) scale(4.2) rotate(-6)') + radioWaves(540, 780, t, sg(84), 3, 500, 'rgba(120,255,170,0.5)', 0.8, 7, 6.283, 0) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.08 * lt / dur, 0, 1, s);
  });
  function radioWaves(cx, cy, t, a0, n, maxR, col, a = 1, w = 7) { let s = ''; for (let i = 0; i < n; i++) { const ph = (((t - a0) * 0.8 + i / n) % 1 + 1) % 1; s += C(cx, cy, 30 + ph * maxR, 'none', `stroke="${col}" stroke-width="${f1(w * (1 - ph) + 1)}" ${OP((1 - ph) * a)}`); } return s; }

  /* 85-86. Ela chegou à cabana. Exatamente como os outros. */
  add(sg(85), 0.02, (t, lt, Pf) => {
    const dur = sg(87) - sg(85);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050607');
    s += X(Pf, G(shadowFace({ t, smile: 0.35, lookx: 5 * Math.sin(lt * 2) }), 'translate(540 900) scale(1.7)')) + R(0, 1400, 1080, 520, 'rgba(255,200,90,0.12)') + G(walkie({ led: 1 }), 'translate(860 1560) scale(2.2) rotate(8)') + radioWaves(860, 1400, t, sg(85), 3, 420, 'rgba(120,255,170,0.5)', 0.8, 6) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.06 * lt / dur, 0, 0.8, s);
  });
  /* 87-88. segunda voz responde: confira a fotografia */
  add(sg(87), 0.02, (t, lt, Pf) => {
    const dur = sg(89) - sg(87);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050607') + glow(Pf, 'B', 540, 900, 900, 0.2);
    s += G(walkie({ led: 1 }), 'translate(540 960) scale(4.0) rotate(5)') + radioWaves(540, 760, t, sg(87), 4, 600, 'rgba(120,200,255,0.55)', 0.9, 8) + voiceWave(t, 1620, 90, '#9fd0ff', 0.7) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.06 * lt / dur, 0, 1.2, s);
  });

  /* 89. ele se aproxima da parede: visão pela fresta do armário */
  add(sg(89), 0.02, (t, lt, Pf) => {
    const dur = sg(90) - sg(89), u = E_.inQuad(k(lt, 0, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#000');
    s += R(0, 0, 400, 1920, '#2a1c11') + R(680, 0, 400, 1920, '#2a1c11') + `<defs><clipPath id="${Pf}sl"><rect x="400" y="0" width="280" height="1920"/></clipPath></defs><g clip-path="url(#${Pf}sl)">` + cabinWall(Pf, t, { light: 0.12, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.4)) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: H.lerp(0.7, 1.4, u), lantern: 1, t, rim: 0.5, walk: t * 1.2 })), `translate(540 ${f1(H.lerp(1500, 1900, u))})`) + '</g>';
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1.0, 0, 1.2 + 2 * u, s);
  });
  /* 90. você prende a respiração */
  add(sg(90), 0.02, (t, lt, Pf) => {
    const dur = sg(91) - sg(90), bt = Math.exp(-(((t * 1.9) % 1)) * 9);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050403');
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.3, lookx: 30, worry: 1, mouth: 0, sweat: 1, tremble: 1 + 2 * bt, mess: 1, dirt: 0.8 }, 540, 1020, 2.0));
    s += HAND(540, 1180, 2.8, '#d9ab8c', 90) + R(520, 0, 28, 1920, 'rgba(255,225,150,0.35)') + R(0, 0, 500, 1920, '#000', OP(0.65)) + R(560, 0, 520, 1920, '#000', OP(0.65)) + vignette(Pf, 1) + flash(PAL.red, 0.08 * bt);
    return camG(t, 540, 960, 1.0 + 0.06 * lt / dur, 0, 2 * bt, s);
  });

  /* 91. arranca a foto da parede e vira o papel */
  add(sg(91), 0.02, (t, lt, Pf) => {
    const dur = sg(92) - sg(91), rip = E_.outCubic(k(lt, 0.1, 0.5)), fl = E_.inOutCubic(k(lt, 0.9, 1.6)), sx = Math.cos(fl * Math.PI);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.1, win: 0 }) + dark(Pf, 0.6);
    s += HAND(H.lerp(900, 540, rip), H.lerp(1500, 1000, rip), 3.0, '#7a5a4a', -20);
    const ph = polaroid(Pf, { x: 0, y: 0, w: 560, h: 640, who: 0, sleep: 1, trees: 0 });
    s += G(sx > 0 ? ph : G(R(-300, -380, 600, 760, '#e7dfcb') + TXT(0, 0, '. . .', 100, '#a31616'), ''), `translate(${f1(H.lerp(540, 540, rip))} ${f1(H.lerp(900, 880, rip))}) scale(${Math.abs(sx).toFixed(3)} 1) rotate(${f1(-8 * (1 - rip))})`);
    for (let i = 0; i < 6; i++) s += E(540 + (hz(i, 2) - 0.5) * 500, 760 + hz(i, 3) * 160, 4, 2, '#e8e2d0', OP(1 - rip));
    s += flash('#fff', 0.2 * Math.exp(-lt * 10)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 3 * Math.exp(-lt * 4), s);
  });

  /* 92-93. por alguns segundos, não diz nada: silêncio */
  add(sg(92), 0.03, (t, lt, Pf) => {
    const dur = sg(94) - sg(92);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.1, win: 0 }) + dark(Pf, 0.65);
    s += beam(Pf, 540, 1400, -90, 1100, 10, 0.35) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: 1.2, lantern: 1, t, rim: 0.6, headLook: 0 })), 'translate(540 1900)') + motes(t, 20, 1080, 1900, 7, 'rgba(255,240,200,0.45)', 3, 3) + vignette(Pf, 1.1);
    return camG(t, 540, 1100, H.lerp(1.0, 1.35, E_.inQuad(k(lt, 0, dur))), 0, 0.3, s);
  });

  /* 94-96. Não pode ser. Essa já esteve aqui: o verso com datas repetidas */
  add(sg(94), 0.02, (t, lt, Pf) => {
    const dur = sg(97) - sg(94), a = E_.outCubic(k(lt, 0.6, 1.6)), sh = E_.outCubic(k(lt, 1.6, 2.2));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050607') + glow(Pf, 'A', 540, 1500, 800, 0.3);
    s += X(Pf, G(shadowFace({ t, smile: 0, lookx: 12 * Math.sin(t * 28) * a, tilt: 2 * Math.sin(t * 22) * a }), `translate(540 ${f1(H.lerp(1000, 640, sh))}) scale(${H.lerp(1.8, 1.0, sh).toFixed(3)})`));
    s += G(R(-260, -300, 520, 600, '#e7dfcb', 'rx="6"') + TXT(0, -190, 'ESCOLHEU O LOBO', 38, '#a31616') + TXT(0, -110, '03/11  19/02  07/08', 34, '#7a1010') + TXT(0, -40, '28/01  14/05  30/09', 34, '#7a1010') + TXT(0, 30, '11/12  22/04  hoje', 34, '#7a1010') + L(-220, 80, 220, 80, 'rgba(0,0,0,0.2)', 3) + TXT(0, 160, 'REPETIDA', 70, '#a31616', 'opacity="0.8"'), `translate(540 1330) scale(${(1.1 * sh).toFixed(3)}) rotate(-3)`, OP(sh));
    s += vignette(Pf, 1) + flash(PAL.red, 0.06 * Math.sin(t * 9) ** 2);
    return camG(t, 540, 960, 1.0, 0, 1 + 2 * a, s);
  });

  /* 97-98. e, atrás do armário: algo se move atrás dela */
  add(sg(97), 0.02, (t, lt, Pf) => {
    const dur = sg(99) - sg(97), u = E_.inOutQuad(k(lt, 0, dur)), bt = Math.exp(-(((t * 1.5) % 1)) * 8);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#040303') + glow(Pf, 'R', 540, 900, 900, 0.1 + 0.2 * bt);
    s += eyesPair(Pf, 860, 600, 1.0, '#e8f4ff', u * 0.9, 40) + X(Pf, G(manSil({ eyes: 0, col: '#000' }), `translate(900 1900) scale(1.8)`), OP(0.7 * u));
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.3, lookx: -10, worry: 1, mouth: 0, sweat: 1, tremble: 1 + 2 * bt, mess: 1, dirt: 0.8, cold: 0.2 }, 440, 1060, H.lerp(1.9, 2.3, u)));
    s += vignette(Pf, 1.1) + grain(t, 0.07);
    return camG(t, 540, 960, 1.0, 0, 2 * bt, s);
  });

  /* 99. uma mão toca seu ombro */
  add(sg(99), 0.02, (t, lt, Pf) => {
    const dur = S[99].end - sg(99), tH = 0.6, h = E_.outCubic(k(lt, 0.2, tH)), imp = lt > tH ? Math.exp(-(lt - tH) * 6) : 0;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#040303');
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: H.lerp(0.4, 0.15, E_.outCubic(k(lt, tH, tH + 0.3))), lookx: H.lerp(-10, 20, k(lt, tH, tH + 0.4)), worry: 1, mouth: H.lerp(0, 0.3, k(lt, tH, tH + 0.2)), sweat: 1, tremble: 2 + 5 * imp, mess: 1, dirt: 0.8, cold: 0.5 * k(lt, tH, dur) }, 440, 1060, 2.2));
    s += paleHand(H.lerp(1350, 780, h), H.lerp(1100, 1560, h), 1.7, -30 + 30 * h);
    s += flash('#fff', 0.5 * imp) + R(0, 0, 1080, 1920, '#000', OP(0.0)) + vignette(Pf, 1.1) + flash(PAL.red, 0.1 * imp);
    return camG(t, 540, 960, 1.0 + 0.08 * lt / dur, 0, 12 * imp, s);
  });
}
