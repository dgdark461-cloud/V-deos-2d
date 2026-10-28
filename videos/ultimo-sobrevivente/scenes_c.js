/* scenes_c.js - ~85 a 137 s: a janela, SOS, EU TAMBÉM, a marca de mão, o vulto. */
function morseOn(t) {
  const f = (t0, n, per, on) => { for (let i = 0; i < n; i++) if (t >= t0 + i * per && t < t0 + i * per + on) return true; return false; };
  return f(90.7, 3, 0.5, 0.25) || f(92.95, 3, 0.42, 0.3) || f(94.17, 3, 0.19, 0.1);
}
function morseTimes() { const a = []; for (let i = 0; i < 3; i++) a.push([90.7 + i * 0.5, 0.25]); for (let i = 0; i < 3; i++) a.push([92.95 + i * 0.42, 0.3]); for (let i = 0; i < 3; i++) a.push([94.17 + i * 0.19, 0.1]); return a; }
function handPrint(x, y, sc, col, rot = 0, a = 1) {
  let s = E(0, 0, 150, 190, col) + E(-130, -40, 36, 140, col, 'transform="rotate(-18 -130 -40)"') + E(-60, -190, 34, 150, col) + E(20, -210, 34, 160, col) + E(100, -170, 32, 140, col, 'transform="rotate(10 100 -170)"') + E(190, -20, 32, 110, col, 'transform="rotate(60 190 -20)"');
  return G(s, `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`, OP(a));
}

function partC(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start;
  const winPos = [745, 890];

  /* 67. Foi quando enxergou algo impossível */
  add(sg(67), 0.03, (t, lt, Pf) => {
    const dur = sg(68) - sg(67), w = E_.outBack(k(lt, 0.1, 0.5));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05080f') + glow(Pf, 'B', 540, 900, 1000, 0.25);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: H.lerp(0.9, 0.5, w), looky: -3, lookx: 20 * w, worry: 0.6, mouth: 0.25 * w, mess: 1, beard: 1.0, dark: 0.8, cold: 0.1, tilt: 2 * Math.sin(lt * 2) }, 540, 1010, 1.8 + 0.2 * lt));
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1.0, 0, 1.5, s);
  });

  /* 68. Do outro lado do rio: pan pelo rio escuro até o prédio */
  add(sg(68), 0.03, (t, lt, Pf) => {
    const dur = sg(69) - sg(68), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 1, win: 0, px: 0 });
    s += vignette(Pf, 1);
    return camG(t, H.lerp(300, 745, u), H.lerp(1100, 900, u), H.lerp(1.0, 1.7, u), 0, 0.8, s);
  });

  /* 69. uma janela se iluminou */
  add(sg(69), 0.02, (t, lt, Pf) => {
    const dur = sg(70) - sg(69), on = E_.outCubic(k(lt, 0.5, 1.0)), pop = k(lt, 0.5, 0.58);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 1, win: on, px: 0 });
    s += flash('#ffe9a8', 0.25 * Math.exp(-(lt - 0.5) * 9) * (lt > 0.5 ? 1 : 0)) + vignette(Pf, 1);
    return camG(t, 745, 900, 1.9 + 0.5 * lt / dur, 0, 0.5 + 5 * Math.exp(-(lt - 0.5) * 8) * (lt > 0.5 ? 1 : 0), s);
  });

  /* 70-73. SOS em morse na janela */
  add(sg(70), 0.02, (t, lt, Pf) => {
    const on = morseOn(t);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 0.6, win: on ? 1 : 0.06, px: 0 });
    if (on) s += glow(Pf, 'A', 745, 890, 420, 0.6);
    s += vignette(Pf, 1);
    s = camG(t, 745, 900, 2.3, 0, on ? 3 : 0.4, s);
    // fileira de pontos e traços acendendo (desenho, não legenda)
    const mt = morseTimes(); let m = '';
    mt.forEach((q, i) => { const lit = t >= q[0], wd = i < 3 || i > 5 ? 34 : 110, x = 100 + i * 100 + (i > 5 ? 20 : 0); m += R(x - (wd > 40 ? 0 : 0), 1700, wd, 34, lit ? '#ffd77a' : 'rgba(255,255,255,0.15)', 'rx="17"'); });
    return s + m;
  });

  /* 74-75. SOS grande + alguém pedindo socorro */
  add(sg(74), 0.01, (t, lt, Pf) => {
    const pul = 0.5 + 0.5 * Math.sin(lt * 22), a = E_.outBack(k(lt, 0, 0.18));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#08040a') + glow(Pf, 'R', 540, 900, 1100, 0.4 + 0.3 * pul);
    s += TX(540, 1010, 'SOS', 430 * a, '#ff4a4a', 'stroke="#ffd0cb" stroke-width="6"') + ringWaves(540, 900, t, sg(74), 4, 900, 'rgba(255,74,74,0.6)', 1, 10);
    s += flash('#fff', 0.35 * Math.exp(-lt * 14)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.04 * lt, 0, 8 * Math.exp(-lt * 3), s);
  });
  add(sg(75), 0.03, (t, lt, Pf) => {
    const dur = sg(76) - sg(75), pul = 0.5 + 0.5 * Math.sin(t * 9);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 0.6, win: 0.6 + 0.4 * pul, px: 0 });
    s += glow(Pf, 'A', 745, 890, 300 + 100 * pul, 0.45);
    s += G(arthurFig({ back: true, scale: 1.2, arms: [-10, -10, 150, 120], beard: 1.0, flip: -1 }), 'translate(260 1870)') + radioWaves(745, 890, t, sg(75), 3, 600, 'rgba(255,215,120,0.6)', 0.8, 7) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.1 * lt / dur, 0, 1.2, s);
  });

  /* 76. Arthur quase chorou */
  add(sg(76), 0.03, (t, lt, Pf) => {
    const tr = E_.outCubic(k(lt, 0.1, 0.9));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0b10') + glow(Pf, 'A', 760, 900, 900, 0.35);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 0.85, pupil: 1.05, worry: 1, tear: 1, mouth: 0.1, smile: 0.4 * tr, tremble: 1.5, mess: 1, beard: 1.0, dark: 0.7, tilt: -3 }, 540, 1010, 1.9 + 0.2 * lt));
    for (let i = 0; i < 3; i++) { const ph = ((lt * 1.2 + i * 0.3) % 1); s += E(440 + 200 * (i % 2), 1000 + ph * 360, 10, 18, 'rgba(190,230,255,0.8)', OP(tr * (1 - ph))); }
    s += vignette(Pf, 1);
    return s;
  });

  /* 77. primeira vez em um ano: luz quente no rosto, calendário 365 */
  add(sg(77), 0.03, (t, lt, Pf) => {
    const a = E_.outBack(k(lt, 0.1, 0.5));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#14100c') + glow(Pf, 'A', 540, 900, 1100, 0.45);
    s += G(R(-260, -330, 520, 660, '#f1efe8', 'rx="28"') + R(-260, -330, 520, 120, '#d4463c', 'rx="28"') + R(-260, -270, 520, 60, '#d4463c') + TX(0, -240, '1 ANO', 62, '#fff') + TX(0, 130, '365', 270, '#25303a') + L(-200, -20, 200, 140, 'rgba(0,0,0,0)', 1), `translate(540 ${f1(760)}) scale(${(1.15 * a).toFixed(3)})`);
    s += G(arthurFig({ back: true, scale: 0.9, arms: [8, 8, -8, -8], beard: 1.0 }), 'translate(540 1900)') + glow(Pf, 'A', 540, 1100, 500, 0.2) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.06 * lt, 0, 1, s);
  });

  /* 78. não estava sozinho: feixe de luz entre os dois prédios */
  add(sg(78), 0.03, (t, lt, Pf) => {
    const dur = sg(79) - sg(78), u = E_.inOutCubic(k(lt, 0.1, dur - 0.1)), pul = 0.5 + 0.5 * Math.sin(t * 3);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 0.7, win: 1, px: 0 });
    s += POLY([[745, 890], [260, 1500], [260, 1380]], 'rgba(255,225,150,0.18)', OP(u)) + glow(Pf, 'A', 745, 890, 400 + 60 * pul, 0.5);
    s += G(R(-14, -60, 28, 60, '#2e353a') + C(0, -70, 20, '#ffd77a') + glow(Pf, 'A', 0, -70, 120, 0.8), 'translate(260 1480) scale(1.2)', OP(u));
    s += G(arthurFig({ back: true, scale: 1.15, arms: [8, 8, 120, 80], beard: 1.0 }), 'translate(300 1880)') + vignette(Pf, 0.9);
    return camG(t, 540, 1000, 1.0 + 0.12 * u, 0, 0.6, s);
  });

  /* 79. por que nunca respondeu ao rádio? */
  add(sg(79), 0.03, (t, lt, Pf) => {
    const dur = sg(80) - sg(79);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#08090c') + staticFx(t, 0.12) + glow(Pf, 'R', 540, 960, 900, 0.15);
    s += G(radioObj({ on: 1, t, led: 1 }), `translate(540 1100) scale(${(2.0 + 0.2 * lt).toFixed(3)})`) + questionMarks(t, 540, 760, 400, 5, '#ffd77a');
    s += camG(t, 540, 960, 1, 0, 0, '') + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0, 0, 1, s);
  });

  /* 80. por que justamente naquela noite? lua + relógio meia-noite + janela */
  add(sg(80), 0.03, (t, lt, Pf) => {
    const dur = sg(81) - sg(80), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 1, win: 1, px: 0 });
    s += G(clockFace(Pf, { h: 12, m: 0 + 3 * lt, col: '#dbe9f4', face: '#0b121a', glow: 0.5, scale: 1.4 }), 'translate(300 380)') + questionMarks(t, 540, 700, 440, 4, '#ffd77a') + vignette(Pf, 1);
    return camG(t, 540, 960, H.lerp(1.0, 1.25, u), 0, 0.8, s);
  });

  /* 81. atravessar o rio ao amanhecer: nascer do sol + rota tracejada */
  add(sg(81), 0.04, (t, lt, Pf) => {
    const dur = sg(82) - sg(81), u = E_.inOutCubic(k(lt, 0, dur)), dk = H.lerp(2, 0.4, u);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: dk, moon: 1 - u, win: 1 - 0.4 * u, px: 0, dawn: u });
    s += glow(Pf, 'A', 300, 1100, 700 * u, 0.7 * u) + C(300, 1100 + (1 - u) * 160, 70, '#ffd98a', OP(u));
    const pr = E_.outCubic(k(lt, 0.5, dur));
    s += `<path d="M300,1260 Q520,1340 745,1190" fill="none" stroke="#ffe9a8" stroke-width="10" stroke-dasharray="26 22" stroke-linecap="round" stroke-dashoffset="${f1(-t * 40)}" opacity="${(0.9 * pr).toFixed(2)}"/>` + C(745, 1190, 20 * pr, '#ffe9a8');
    s += G(arthurFig({ back: true, scale: 1.15, arms: [8, 8, 8, 8], beard: 1.0 }), 'translate(300 1890)') + vignette(Pf, 0.9);
    return camG(t, 540, 1000, 1.0 + 0.05 * lt, 0, 0.5, s);
  });

  /* 82-84. voltou ao terraço, parou imediatamente */
  add(sg(82), 0.02, (t, lt, Pf) => {
    const op = E_.outCubic(k(lt, 0.0, 0.4));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10181d') + R(300, 400, 480, 1000, `rgba(255,225,170,${(0.9 * op).toFixed(2)})`) + R(300, 400, 480 * (1 - op), 1000, '#2a3036') + glow(Pf, 'A', 540, 800, 1000 * op, 0.5 * op) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.1, 0, 2, s);
  });
  add(sg(83), 0.02, (t, lt, Pf) => {
    const dur = sg(84) - sg(83), u = k(lt, 0, dur);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 0.2, moon: 0, win: 0.7, px: 0, dawn: 1 });
    s += G(arthurFig({ back: true, walk: t * 1.3, scale: 1.2, arms: [14 * Math.sin(t * 8), 10, -14 * Math.sin(t * 8), -10], beard: 1.0, bob: 5 * Math.abs(Math.sin(t * 8)) }), `translate(${f1(H.lerp(150, 540, E_.outQuad(u)))} 1880)`) + vignette(Pf, 0.7);
    return camG(t, 540, 1000, 1.0, 0, 1.0, s);
  });
  add(sg(84), 0.01, (t, lt, Pf) => {
    const sl = E_.outCubic(k(lt, 0, 0.25));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#14181c') + glow(Pf, 'R', 540, 900, 1000, 0.3);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.3, worry: 1, mouth: 0.0, sweat: 1, tremble: 1, mess: 1, beard: 1.0, dark: 0.8, cold: 0.2, tilt: 0 }, 540, 1000, H.lerp(1.5, 2.3, E_.outCubic(k(lt, 0, 1.0)))));
    s += vignette(Pf, 1) + flash('#fff', 0.5 * Math.exp(-lt * 14));
    return camG(t, 540, 960, 1.0, 0, 6 * Math.exp(-lt * 4), s);
  });

  /* 85-86. ao lado do VIVO: visão de cima; área ao lado coberta de sombra */
  const roofTop = (Pf, t, vivo = 1, msg = 0) => {
    let s = R(0, 0, 1080, 1920, '#2a3236');
    for (let i = 0; i < 14; i++) s += R(0, i * 140, 1080, 4, 'rgba(0,0,0,0.25)') + R(i * 80, 0, 3, 1920, 'rgba(0,0,0,0.15)');
    s += G(vivoStrokes(vivo, PAL.paint, 56), 'translate(160 520)');
    return s;
  };
  add(sg(85), 0.03, (t, lt, Pf) => {
    const dur = sg(86) - sg(85), u = E_.inOutCubic(k(lt, 0.2, dur));
    let s = defsC(Pf) + roofTop(Pf, t) + R(0, 0, 1080, 1920, '#06090c', OP(0.12)) + vignette(Pf, 0.8);
    return camG(t, H.lerp(540, 540, u), H.lerp(700, 1200, u), H.lerp(1.0, 1.3, u), 0, 0.8, s);
  });
  add(sg(86), 0.03, (t, lt, Pf) => {
    const dur = sg(87) - sg(86), u = E_.inOutQuad(k(lt, 0, dur)), wob = 0.5 + 0.5 * Math.sin(t * 5);
    let s = defsC(Pf) + roofTop(Pf, t);
    s += R(80, 1000, 920, 300, '#06090c', OP(0.7 * (1 - u * 0.4)));
    for (let i = 0; i < 7; i++) { const a = E_.outCubic(k(lt, i * 0.24, 0.5 + i * 0.24)); s += P(`M${f1(120 + i * 120)},1060 q${f1(18 * Math.sin(i))},${f1(60 + 80 * hz(i, 2))} 0,${f1(150 * a)}`, 'none', `stroke="rgba(232,226,210,${(0.35 + 0.4 * wob).toFixed(2)})" stroke-width="22" stroke-linecap="round"`); }
    s += vignette(Pf, 1) + flash(PAL.red, 0.04 * wob);
    return camG(t, 540, 1150, H.lerp(1.1, 1.5, u), 0, 1.0, s);
  });

  /* 87. A tinta ainda estava molhada: gotas e dedo */
  add(sg(87), 0.03, (t, lt, Pf) => {
    const dur = sg(88) - sg(87);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#262e32') + glow(Pf, 'W', 540, 700, 800, 0.08);
    s += P('M-100,600 Q300,560 540,640 Q820,700 1180,620 L1180,900 Q800,940 540,880 Q300,860 -100,900Z', PAL.paint) + P('M-100,640 Q300,610 540,670 Q820,720 1180,650 L1180,690 Q800,740 540,700 Q300,640 -100,680Z', 'rgba(255,255,255,0.45)');
    for (let i = 0; i < 6; i++) { const x = 160 + i * 170, ph = ((lt * 0.7 + hz(i, 3)) % 1), len = 120 + 560 * ph * (0.4 + hz(i, 4)); s += R(x - 14, 880, 28, len, PAL.paint, 'rx="14"') + C(x, 880 + len, 24 + 4 * ph, PAL.paint) + C(x - 8, 880 + len - 6, 7, 'rgba(255,255,255,0.6)'); }
    const f = E_.outCubic(k(lt, 0.9, 1.6));
    s += handObj(H.lerp(1250, 820, f), H.lerp(1700, 1060, f), 18, 1.4);
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1.15 + 0.1 * lt / dur, 0, 1, s);
  });

  /* 88. Duas palavras: letras surgindo */
  add(sg(88), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10161a') + glow(Pf, 'R', 540, 960, 1000, 0.3);
    s += TX(540, 780, 'EU', 330 * E_.outBack(k(lt, 0, 0.25)), PAL.paint, 'opacity="0.9"') + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 6 * Math.exp(-lt * 6), s);
  });
  /* 89. EU TAMBÉM */
  add(sg(89), 0.01, (t, lt, Pf) => {
    const dur = sg(90) - sg(89), a = E_.outBack(k(lt, 0, 0.2)), pul = 0.5 + 0.5 * Math.sin(lt * 14);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0b0f12') + glow(Pf, 'R', 540, 960, 1200, 0.3 + 0.3 * pul);
    s += TX(540, 800, 'EU', 330 * a, PAL.paint) + TX(540, 1120, 'TAMBÉM', 205 * a, PAL.paint);
    for (let i = 0; i < 5; i++) { const x = 140 + i * 200; s += R(x, 1160, 20, 60 + 200 * E_.outCubic(k(lt, 0.2 + 0.05 * i, 1.0)) * hz(i, 6), PAL.paint, 'rx="10" opacity="0.8"'); }
    s += flash('#fff', 0.5 * Math.exp(-lt * 14)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.04 * lt, 0, 10 * Math.exp(-lt * 5), s);
  });

  /* 90. correu até a porta */
  add(sg(90), 0.02, (t, lt, Pf) => {
    const dur = sg(91) - sg(90), u = E_.inQuad(k(lt, 0, dur));
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 0.3, moon: 0, win: 0.6, px: 0, dawn: 1 });
    s += R(740, 900, 300, 640, '#1d262b') + R(780, 960, 220, 580, '#0a0f12') + speedLines(t, 8, 'rgba(255,255,255,0.18)', -1);
    s += G(arthurFig({ back: true, walk: t * 2.6, run: 1, lean: 8, scale: H.lerp(1.5, 0.9, u), arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)), beard: 1.0 }), `translate(${f1(H.lerp(240, 870, u))} ${f1(H.lerp(1850, 1540, u))})`) + vignette(Pf, 0.9);
    return camG(t, 540, 1000, 1.0, 0, 5, s);
  });

  /* 91. entreaberta */
  add(sg(91), 0.02, (t, lt, Pf) => {
    const dur = sg(92) - sg(91), g = E_.inOutQuad(k(lt, 0.0, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10161a') + R(260, 300, 560, 1300, '#06090b');
    s += POLY([[260, 300], [260 + 520 * 0.5 * (0.06 + 0.1 * g), 320], [260 + 520 * 0.5 * (0.06 + 0.1 * g), 1580], [260, 1600]], '#3a2c24') + R(260, 300, 40, 1300, '#26190f') + R(282, 300, 8 + 30 * g, 1300, 'rgba(255,225,170,0.22)');
    s += glow(Pf, 'A', 300, 960, 200, 0.15) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.2 * g, 0, 1, s);
  });

  /* 92. na maçaneta */
  add(sg(92), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#2b2018') + R(0, 600, 1080, 700, '#3b2c24', 'opacity="0.0"');
    s += R(380, 760, 340, 380, '#c9a45a', 'rx="170"') + R(480, 840, 540, 70, '#a98a42', 'rx="35"') + R(480, 850, 540, 20, 'rgba(255,255,255,0.35)', 'rx="10"');
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.2 * lt, 0, 1, s);
  });

  /* 93. uma marca de mão que não era sua */
  add(sg(93), 0.02, (t, lt, Pf) => {
    const dur = sg(94) - sg(93), a = E_.outCubic(k(lt, 0.1, 0.5)), cmp = E_.outCubic(k(lt, 1.0, 1.6));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#2b2018') + R(200, 400, 680, 1100, '#c9a45a', 'rx="40"');
    s += handPrint(540, 1000, 2.0, '#5a1210', -8, 0.85 * a) + handPrint(540, 1000, 2.0, 'rgba(255,60,50,0.35)', -8, 0.5 * a);
    s += G(handObj(0, 0, 0, 1.0), `translate(${f1(H.lerp(1300, 900, cmp))} 1500) scale(0.85)`) + bigX(540, 1000, 220 * cmp, 1, 'rgba(255,255,255,0.0)', 1);
    s += vignette(Pf, 1) + flash(PAL.red, 0.08 * Math.sin(t * 9) ** 2);
    return camG(t, 540, 960, 1.0 + 0.06 * lt, 0, 1.2, s);
  });

  /* 94. olhou para o prédio distante */
  add(sg(94), 0.03, (t, lt, Pf) => {
    const dur = sg(95) - sg(94), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 0.3, moon: 0, win: 1, px: 0, dawn: 1 });
    s += vignette(Pf, 0.9);
    return camG(t, H.lerp(540, 745, u), H.lerp(1000, 900, u), H.lerp(1.0, 2.0, u), 0, 0.5, s);
  });

  /* 95. a janela continuava acesa */
  add(sg(95), 0.02, (t, lt, Pf) => {
    const pul = 0.5 + 0.5 * Math.sin(t * 4);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 0.3, moon: 0, win: 1, px: 0, dawn: 1 });
    s += glow(Pf, 'A', 745, 890, 260 + 60 * pul, 0.45) + vignette(Pf, 1);
    return camG(t, 745, 900, 2.5 + 0.5 * lt / (sg(96) - sg(95)), 0, 0.6, s);
  });

  /* 96. o detalhe mais aterrorizante: rosto, pupilas encolhem */
  add(sg(96), 0.03, (t, lt, Pf) => {
    const dur = sg(97) - sg(96), u = E_.inOutCubic(k(lt, 0, dur)), bpm = 80 + 80 * u, beat = Math.exp(-(((t * bpm / 60) % 1)) * 9);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0b0809') + glow(Pf, 'R', 540, 900, 1100, 0.15 + 0.35 * beat);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: H.lerp(0.9, 0.22, u), worry: 1, mouth: 0.0, sweat: 1, cold: 0.3 * u, tremble: 1 + 3 * beat, mess: 1, beard: 1.0, dark: 1, tilt: 0 }, 540, 1000, H.lerp(1.7, 2.7, u)));
    s += vignette(Pf, 1 + 0.3 * u) + flash(PAL.red, 0.1 * beat);
    return camG(t, 540, 960, 1.0, 0, 4 * beat, s);
  });

  /* 97. escrita enquanto ele dormia: o vulto com o pincel ao lado da cama */
  add(sg(97), 0.03, (t, lt, Pf) => {
    const dur = sg(98) - sg(97), u = E_.inOutQuad(k(lt, 0, dur)), ap = E_.outCubic(k(lt, 0.7, 1.7));
    let s = defsC(Pf) + bedroom(Pf, t, { light: 0.35 });
    s += R(0, 0, 1080, 1920, '#02040a', OP(0.45));
    // Arthur dormindo
    s += G(R(-300, -40, 600, 120, '#335a76', 'rx="40"') + E(-210, -50, 110, 56, '#d8d2c2') + E(-196, -86, 62, 56, PAL.skin) + E(-200, -112, 62, 32, PAL.hair) + P('M-250,-80 q14,-12 28,0', 'none', 'stroke="#17110f" stroke-width="6" stroke-linecap="round"') + P('M-190,-80 q14,-12 28,0', 'none', 'stroke="#17110f" stroke-width="6" stroke-linecap="round"'), 'translate(400 1320)');
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.4 + i / 3) % 1); s += TX(300 + ph * 90, 1180 - ph * 200, 'Z', 50 + 40 * ph, '#cfe0ea', OP(1 - ph)); }
    // vulto ao lado
    s += G(X(Pf, manSilNew({ eyes: ap, col: '#010203', rim: 0.5, lean: 8 })), `translate(800 1500) scale(${H.lerp(1.5, 1.8, u).toFixed(3)})`, OP(ap)) + G(R(-6, -30, 12, 150, '#555') + R(-26, -50, 52, 30, PAL.paint, 'rx="6"'), `translate(${f1(660 - 20 * Math.sin(t * 3))} 1360) rotate(${f1(-20 + 6 * Math.sin(t * 3))})`, OP(ap));
    s += vignette(Pf, 1) + grain(t, 0.06);
    return camG(t, 540, 1150, H.lerp(1.0, 1.3, u), 0, 0.8, s);
  });

  /* 98. se o sobrevivente estava do outro lado do rio */
  add(sg(98), 0.03, (t, lt, Pf) => {
    const dur = sg(99) - sg(98), u = E_.inOutCubic(k(lt, 0, dur)), pul = 0.5 + 0.5 * Math.sin(t * 3);
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 1.9, moon: 0.9, win: 1, px: 0 });
    s += glow(Pf, 'A', 745, 890, 300 + 60 * pul, 0.5) + G(arthurFig({ back: true, scale: 1.0, arms: [8, 8, -8, -8], beard: 1.0 }), 'translate(300 1900)') + vignette(Pf, 1);
    return camG(t, H.lerp(540, 745, u), H.lerp(1000, 940, u), H.lerp(1.0, 2.0, u), 0, 0.5, s);
  });

  /* 99. quem passou a noite no prédio com Arthur? o vulto atrás dele */
  add(sg(99), 0.04, (t, lt, Pf) => {
    const end = S[99].end - sg(99), ap = E_.outCubic(k(lt, 0.3, 1.2)), z = H.lerp(1.0, 1.45, E_.inQuad(k(lt, 0, end))), bt = Math.exp(-(((t * 1.6) % 1)) * 8);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080c') + glow(Pf, 'B', 540, 900, 1000, 0.15);
    s += R(300, 300, 480, 1500, '#02030a') + R(300, 300, 480, 1500, 'rgba(120,150,190,0.06)');
    s += G(X(Pf, manSilNew({ eyes: ap, col: '#000', rim: 0.35 })), `translate(540 1650) scale(${H.lerp(1.2, 1.55, ap).toFixed(3)})`, OP(ap));
    s += G(arthurFig({ back: true, scale: 1.3, arms: [8, 8, -8, -8], beard: 1.0, headTilt: 0 }), 'translate(540 1900)');
    s += flash(PAL.red, 0.1 * bt) + vignette(Pf, 1.1) + grain(t, 0.07);
    return camG(t, 540, 1100, z, 0, 1.0 + 3 * bt, s);
  });
}
