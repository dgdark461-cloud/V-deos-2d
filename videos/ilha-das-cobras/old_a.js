/* scenes_a.js - parte 2, 0 a ~47 s: o lobo foge, a voz, o homem da lanterna, a mensagem. */
const wFace = (Pf, o, x, y, sc) => X(Pf, G(womanFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
function voiceWave(t, y, amp, col = '#fff', a = 1, w = 1080) {
  let pts = [];
  for (let i = 0; i <= 90; i++) { const x = i * w / 90, env = Math.sin(i / 90 * Math.PI); pts.push([x, y + Math.sin(i * 0.9 + t * 24) * amp * env * (0.5 + 0.5 * Math.sin(i * 0.31 + t * 7))]); }
  return PL(pts, col, 8, OP(a));
}
function nightBG(Pf, t, o) { return forest(Pf, t, Object.assign({ k: 2, px: 0, fog: 0.75, shafts: 0, glowFire: 0 }, o)); }
function questionMarks(t, cx, cy, r, n, col = '#e8f2ff') {
  let s = '';
  for (let i = 0; i < n; i++) { const a = t * 1.4 + i * 6.283 / n; s += TXT(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, '?', 90 + 40 * Math.sin(t * 3 + i), col, `opacity="0.85"`); }
  return s;
}
function boot(x, y, sc, col = '#0a0b0e') { return G(P('M-40,-200 L40,-200 L46,-40 Q90,-30 100,10 L100,30 L-50,30 L-50,-40Z', col) + R(-50, 18, 150, 16, '#1a1c20') + L(-30, -170, 30, -170, '#2a2c32', 8), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); }

function speedLines(t, n, col = 'rgba(255,255,255,0.3)') { let s = ''; for (let i = 0; i < n; i++) { const y = 900 + hz(i, 5) * 600, x = ((hz(i, 6) * 1600 - t * 3000 * (0.6 + hz(i, 7))) % 1600 + 1600) % 1600 - 260; s += L(x, y, x + 200 + hz(i, 8) * 300, y, col, 3 + 3 * hz(i, 9)); } return s; }
function partA(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start;

  /* 0. GANCHO: close extremo do rosto, fogo à esquerda, olhos disparam */
  add(0, 0.001, (t, lt, Pf) => {
    const snap = E_.outCubic(k(lt, 0.0, 0.18)), dx = 22 * E_.outCubic(k(lt, 0.2, 0.4)), pul = 0.5 + 0.5 * Math.sin(t * 18);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080d') + glow(Pf, 'F', 80, 900, 900, 0.8) + glow(Pf, 'B', 1000, 700, 700, 0.25);
    s += camG(t, 540, 960, 1 + 0.2 * lt, 0, 8 * Math.exp(-lt * 1.5) + 3, wFace(Pf, { t, eye: H.lerp(0.5, 1, snap), pupil: 0.42, lookx: dx, looky: -2, worry: 1, mouth: 0.18, sweat: 1, tremble: 3, mess: 1, dirt: 0.8, cold: 0.1 }, 540, 1000, 2.4));
    s += P('M0,0 L300,0 L200,1920 L0,1920Z', 'rgba(255,120,40,0.22)') + flash('#fff', 0.3 * Math.exp(-lt * 12)) + flash('#ff7a1f', 0.08 * pul) + vignette(Pf, 1) + grain(t, 0.07);
    return s;
  });

  /* 1. o lobo foge da fogueira */
  add(0.9, 0.02, (t, lt, Pf) => {
    const dur = 1.0, u = E_.inQuad(k(lt, 0.0, dur));
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, wx: 320, fx: 520, scared: 1, look: 6 });
    s += G(wolfSide({ phase: (lt * 3.4) % 1, run: 1, scale: 1.15, flip: 1, mouth: 0.5, t, tail: 1, dark: 0.1 }), `translate(${f1(H.lerp(620, 1700, u))} 1340)`);
    s += sparksFx(520, 1260, t, 1 - lt, 16, 160, '#ffb04a') + speedLines(t, 8) + flash('#fff', 0.2 * Math.exp(-lt * 10)) + vignette(Pf, 1);
    return camG(t, 540, 1150, 1.1, 0, 8 * Math.exp(-lt * 2) + 2, s);
  });

  /* 2. passos pesados: bota esmaga galhos, lanterna acima */
  add(1.9, 0.02, (t, lt, Pf) => {
    const dur = sg(1) - 1.9 + 0.0 + 1.57, st = Math.floor(lt * 2.2), ph = (lt * 2.2) % 1, down = E_.inQuad(k(ph, 0, 0.35)), x = 380 + st * 300;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#070b10') + R(0, 1300, 1080, 620, '#0e1814') + glow(Pf, 'A', 540, 700, 800, 0.2);
    s += beam(Pf, 540, -100, 90, 1500, 22, 0.35);
    for (let i = 0; i < 14; i++) s += L(100 + hz(i, 3) * 880, 1400 + hz(i, 4) * 400, 200 + hz(i, 3) * 880, 1400 + hz(i, 4) * 400 + 30 * (hz(i, 6) - 0.5), '#3a2b1c', 6);
    s += boot(540 + (st % 2 ? 40 : -40), H.lerp(1000, 1560, down), 2.2);
    if (ph > 0.35) s += ringWaves(540, 1580, t, 1.9 + (st + 0.35) / 2.2, 1, 500, 'rgba(255,255,255,0.5)', 1 - k(ph, 0.35, 0.9), 10) + sparksFx(540, 1580, t, 1 - k(ph, 0.35, 0.8), 10, 120, '#c9b48a');
    s += vignette(Pf, 1);
    return camG(t, 540, 1200, 1.0, 0, ph > 0.35 ? 12 * (1 - k(ph, 0.35, 0.8)) : 0, s);
  });

  /* 3. lobo apavorado */
  add(sg(1), 0.02, (t, lt, Pf) => {
    const dur = 1.75, z = H.lerp(1.5, 1.1, E_.outCubic(k(lt, 0, dur)));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090e') + glow(Pf, 'F', 100, 900, 800, 0.3) + glow(Pf, 'B', 900, 700, 800, 0.15);
    s += X(Pf, G(wolfHead({ t, uid: 'a', glow: 1, ears: 1, snarl: 0, lookx: 10 * Math.sin(lt * 9), looky: -6, eye: 1.0, tilt: 3 * Math.sin(lt * 12) }), `translate(540 ${f1(980 + 6 * Math.sin(t * 22))}) scale(${z.toFixed(3)})`));
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 3, s);
  });

  /* 4. sombra enorme do homem avança sobre a fogueira */
  add(sg(1) + 1.75, 0.02, (t, lt, Pf) => {
    const dur = 1.8, g = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, wx: 360, fx: 700, scared: 1, look: 6 });
    s += G(X(Pf, manSil({ eyes: 0.9 * g, col: '#010203', rim: 0.3 })), `translate(1180 1400) scale(${H.lerp(0.9, 3.0, g).toFixed(3)})`, OP(0.2 + 0.8 * g));
    s += POLY([[1080, 1250], [1080, 1450], [H.lerp(1080, 200, g), 1400], [H.lerp(1080, 120, g), 1300]], 'rgba(0,0,0,0.75)');
    s += R(0, 0, 1080, 1920, '#000', OP(0.4 * g)) + vignette(Pf, 1);
    return camG(t, 540, 1150, H.lerp(1.0, 1.25, g), 0, 1 + 3 * g, s);
  });

  /* 5. olho do lobo refletindo o vulto enorme */
  add(sg(1) + 3.55, 0.02, (t, lt, Pf) => {
    const dur = sg(2) - (sg(1) + 3.55), g = E_.outCubic(k(lt, 0.2, 1.2));
    const refl = G(X(Pf, manSil({ eyes: 1, col: '#010203', rim: 0.4 })), `translate(140 230) scale(${H.lerp(0.2, 0.55, g).toFixed(3)})`) + G(womanFig({ scale: 0.3, scared: 1 }), 'translate(-120 200)');
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050403') + glow(Pf, 'F', 540, 960, 900, 0.25);
    s += camG(t, 0, 0, 1.45 + 0.3 * lt / dur, 0, 2, X(Pf, wolfEye(Pf, { t, pupil: H.lerp(0.9, 0.35, g), lookx: 8, looky: -4, refl, reflA: 1, red: 0.3 })));
    s += vignette(Pf, 1);
    return s;
  });

  /* 6. você continua imóvel */
  add(sg(2), 0.03, (t, lt, Pf) => {
    const dur = sg(3) - sg(2);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, wx: 380, fx: 760, scared: 1, look: 0, cold: 0.2 + 0.3 * lt });
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.7 + i / 3) % 1); s += E(372 + 20 * ph, 1000 - ph * 90, 18 + ph * 28, 12 + ph * 16, 'rgba(210,230,245,0.5)', OP(1 - ph)); }
    s += vignette(Pf, 1);
    return camG(t, 400, 1150, H.lerp(1.2, 1.9, E_.inOutQuad(k(lt, 0, dur))), 0, 0.5, s);
  });

  /* 7. atrás das suas costas: costas dela, escuridão à frente */
  add(sg(3), 0.03, (t, lt, Pf) => {
    const dur = sg(4) - sg(3);
    let s = defsC(Pf) + nightBG(Pf, t, { fx: 700, glowFire: 0.3 });
    s += fgTrunks(t, 0, 2, -300, 4, 0.95) + R(0, 0, 1080, 1920, '#000', OP(0.25));
    s += G(womanFig({ back: true, scale: 1.55, scared: 1, arms: [8, 14, -8, -14] }), 'translate(540 1900)') + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1000, H.lerp(1.0, 1.15, lt / dur), 0, 1.2, s);
  });

  /* 8. uma voz pergunta: ondas de som vindas do fundo */
  add(sg(4), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.25 }) + R(0, 0, 1080, 1920, '#000', OP(0.35));
    for (let i = 0; i < 5; i++) { const ph = ((lt * 0.9 + i / 5) % 1), r = H.lerp(1000, 60, ph); s += C(540, 900, r, 'none', `stroke="rgba(255,255,255,${(0.35 * ph).toFixed(2)})" stroke-width="${f1(10 * ph + 2)}"`); }
    s += eyesPair(Pf, 540, 880, 0.9, '#e8f4ff', E_.outCubic(k(lt, 0.3, 0.8)), 36) + G(womanFig({ back: true, scale: 0.7, scared: 1 }), 'translate(540 1900)') + vignette(Pf, 1);
    return camG(t, 540, 900, 1.0 + 0.15 * lt, 0, 1.5, s);
  });

  /* 9. "Ainda prefere o lobo?" */
  add(sg(5), 0.02, (t, lt, Pf) => {
    const dur = sg(6) - sg(5), a = E_.outCubic(k(lt, 0, 0.2));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080d') + glow(Pf, 'R', 540, 900, 1100, 0.25);
    s += G(X(Pf, manJacket(Pf, { eyes: 1, scale: 1.6, lantern: 0, rim: 0.6 })), 'translate(540 1700)', OP(0.35));
    s += voiceWave(t, 880, 300 * a, '#fff', 0.95) + voiceWave(t + 0.1, 880, 220 * a, PAL.red, 0.7) + ringWaves(540, 880, t, sg(5), 3, 800, 'rgba(255,255,255,0.4)', 1, 6) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt / dur, 0, 3, s);
  });

  /* 10. a mesma voz do carro */
  add(sg(6), 0.02, (t, lt, Pf) => {
    const dur = sg(7) - sg(6), g = E_.outCubic(k(lt, 0.1, 0.7));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0507') + glow(Pf, 'R', 540, 1150, 1000, 0.45);
    s += G(carBack(Pf, { brake: 1, dust: 0.8, t, scale: 1.4 }), `translate(540 ${f1(H.lerp(1500, 1300, g))})`);
    s += voiceWave(t, 640, 160, '#fff', 0.8) + voiceWave(t + 0.1, 640, 110, PAL.red, 0.6) + ringWaves(540, 1180, t, sg(6), 3, 700, 'rgba(255,60,50,0.5)', 1, 8);
    s += vignette(Pf, 1) + flash(PAL.red, 0.08 * Math.sin(t * 9) ** 2);
    return camG(t, 540, 1000, 1.0 + 0.1 * lt / dur, 0, 2, s);
  });

  /* 11. você se vira lentamente: de costas para o rosto */
  add(sg(7), 0.02, (t, lt, Pf) => {
    const dur = sg(8) - sg(7), u = E_.inOutCubic(k(lt, 0, dur)), sx = Math.cos(u * Math.PI);
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.3 }) + R(0, 0, 1080, 1920, '#000', OP(0.35));
    const fig = womanFig({ back: sx > 0, scale: 1.5, scared: 1, arms: [8, 14, -8, -14] });
    s += G(fig, `translate(540 1850) scale(${Math.abs(sx).toFixed(3)} 1)`) + vignette(Pf, 1);
    return camG(t, 540, 1100, H.lerp(1.0, 1.3, u), 0, 0.4, s);
  });

  /* 12. um homem aparece entre as árvores */
  add(sg(8), 0.03, (t, lt, Pf) => {
    const dur = sg(9) - sg(8), ap = E_.inOutQuad(k(lt, 0.1, 1.2)), sw = Math.sin(t * 2.2);
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.2, fx: 400 });
    s += beam(Pf, 640, 1100, 188 + 6 * sw, 1100, 14, 0.5 * ap) + G(manJacket(Pf, { eyes: ap, scale: 0.62, lantern: 1, t, rim: 0.4 }), 'translate(720 1360)', OP(ap));
    s += fgTrunks(t, lt * 40, 2, -250, 4, 1) + R(0, 0, 1080, 1920, '#000', OP(0.15)) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1100, H.lerp(1.0, 1.2, lt / dur), 0, 1, s);
  });

  /* 13a. jaqueta escura: gola e zíper */
  add(sg(9), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090d') + glow(Pf, 'A', 200, 1500, 800, 0.35);
    s += G(X(Pf, manJacket(Pf, { eyes: 0.5, scale: 3.4, lantern: 0, rim: 0.7 })), 'translate(540 2500)');
    s += L(540, 1000, 540, 1800, '#2a323b', 10) + R(520, 1040, 40, 70, '#8a94a0', 'rx="8"') + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.08 * lt, 0, 1.2, s);
  });
  /* 13b. mão segurando a lanterna */
  add(sg(9) + 1.0, 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090d');
    s += beam(Pf, 540, 1000, -90, 1100, 18, 0.5) + lanternObj(Pf, { x: 540, y: 1000, scale: 3.6, sw: 4 * Math.sin(t * 3) }) + HAND(540, 1180, 3.0, '#7a5a4a') + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.06 * lt, 0, 2, s);
  });
  /* 13c. corpo inteiro, feixe na direção da câmera */
  add(sg(9) + 1.95, 0.02, (t, lt, Pf) => {
    const dur = sg(10) - (sg(9) + 1.95), g = E_.outCubic(k(lt, 0, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.2 });
    s += beam(Pf, 540, 1100, 90 + 8 * Math.sin(t * 2), 1200, 24, 0.6) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: H.lerp(0.9, 1.15, g), lantern: 1, t, rim: 0.6 })), 'translate(540 1860)');
    s += fgTrunks(t, 0, 2, -300, 4, 1) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1100, 1.0, 0, 1.2, s);
  });

  /* 14. Ele está sozinho: plano aberto, só ele na floresta */
  add(sg(10), 0.03, (t, lt, Pf) => {
    const dur = sg(11) - sg(10);
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 60, glowFire: 0.1 });
    s += beam(Pf, 620, 1260, 190, 900, 12, 0.5) + G(manJacket(Pf, { eyes: 1, scale: 0.5, lantern: 1, t, rim: 0.5 }), 'translate(640 1380)') + vignette(Pf, 1);
    return camG(t, 540, 1100, H.lerp(1.2, 0.9, lt / dur), 0, 0.6, s);
  });

  /* 15. Pelo menos, é o que você consegue enxergar: olhos no escuro atrás dele */
  add(sg(11), 0.03, (t, lt, Pf) => {
    const dur = sg(13) - sg(11);
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.4));
    s += G(manJacket(Pf, { eyes: 1, scale: 0.6, lantern: 1, t, rim: 0.4 }), 'translate(540 1400)');
    const pos = [[160, 1000], [300, 1200], [900, 1040], [820, 1230], [90, 1250], [980, 1170]];
    pos.forEach((p, i) => { const a = E_.outCubic(k(lt, 0.6 + i * 0.25, 1.1 + i * 0.25)) * (0.5 + 0.5 * Math.abs(Math.sin(t * 2 + i))); s += eyesPair(Pf, p[0], p[1], 0.7, '#e8f4ff', a, 30); });
    s += vignette(Pf, 1) + grain(t, 0.06);
    return camG(t, 540, 1150, H.lerp(1.0, 1.4, E_.inQuad(k(lt, 0, dur))), 0, 1, s);
  });

  /* 16. Você tem até o amanhecer: rosto iluminado por baixo + relógio solar */
  add(sg(13), 0.03, (t, lt, Pf) => {
    const dur = sg(15) - sg(13), g = E_.outCubic(k(lt, 0.5, 1.8));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05070b') + glow(Pf, 'A', 540, 1500, 900, 0.5);
    s += X(Pf, G(shadowFace({ t, smile: 0.5 + 0.4 * g, lookx: 4 * Math.sin(t * 2), tilt: 2 * Math.sin(lt * 1.5) }), 'translate(540 1000) scale(1.7)'));
    s += R(0, 1400, 1080, 520, 'rgba(255,200,90,0.25)') + vignette(Pf, 1);
    s += G(clockObj(Pf, { h: 5, m: 40, glow: 1 }), 'translate(930 330) scale(0.7)', OP(g));
    return camG(t, 540, 960, 1.0 + 0.06 * lt / dur, 0, 0.8, s);
  });

  /* 17. Você pergunta o que ele quer */
  add(sg(15), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080709') + glow(Pf, 'F', 100, 900, 800, 0.4) + glow(Pf, 'A', 1000, 900, 700, 0.25);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.55, lookx: 14, worry: 1, mouth: 0.3 * Math.abs(Math.sin(lt * 10)), sweat: 1, tremble: 2, mess: 1, dirt: 0.8 }, 540, 1020, 1.95));
    return s + vignette(Pf, 1);
  });

  /* 18a. o homem aponta */
  add(sg(16), 0.02, (t, lt, Pf) => {
    const g = E_.outBack(k(lt, 0.1, 0.5));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.2 });
    s += beam(Pf, 600, 1100, 10, 1100, 14, 0.4) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: 1.1, lantern: 0, point: g, t, rim: 0.5 })), 'translate(380 1850)');
    s += fgTrunks(t, 0, 2, -300, 4, 1) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.1 * lt, 0, 1.2, s);
  });
  /* 18b. o celular na mão dela */
  add(sg(16) + 1.2, 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080c') + beam(Pf, 1100, 200, 150, 1200, 20, 0.4);
    s += G(phoneMsg(Pf, { t, batt: 0.12 }), 'translate(540 960) scale(2.4) rotate(-6)') + HAND(380, 1500, 2.6, '#d9ab8c', 20) + vignette(Pf, 1);
    return camG(t, 540, 960, 1 + 0.08 * lt, 0, 1.5, s);
  });

  /* 19. Doze por cento de bateria? */
  add(sg(17), 0.02, (t, lt, Pf) => {
    const lv = H.lerp(0.5, 0.12, E_.outCubic(k(lt, 0, 0.6))), bl = 0.5 + 0.5 * Math.sin(t * 9);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080509') + glow(Pf, 'R', 540, 900, 900, 0.3 * bl);
    s += R(160, 660, 700, 380, 'rgba(5,5,8,0.9)', 'rx="50" stroke="#e8eef4" stroke-width="16"') + R(860, 760, 54, 180, '#e8eef4', 'rx="14"') + R(190, 690, 640 * lv, 320, mixc('#ff3b30', '#ff9a3a', bl * 0.5), 'rx="30"');
    s += TXT(540, 1300, '12%', 210, '#fff', `opacity="${E_.outCubic(k(lt, 0.4, 0.7)).toFixed(2)}"`) + X(Pf, G(shadowFace({ t, smile: 0.9 }), 'translate(540 1620) scale(0.5)')) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2, s);
  });

  /* 20. Não desperdice tentando ligar para alguém */
  add(sg(18), 0.02, (t, lt, Pf) => {
    const a = E_.outBack(k(lt, 0, 0.3));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080c') + glow(Pf, 'B', 540, 900, 1000, 0.3);
    s += G(phoneMsg(Pf, { t, batt: 0.12 }), `translate(540 960) scale(${(2.2 * a).toFixed(3)})`) + bigX(540, 960, 260, E_.outBack(k(lt, 0.4, 0.8)), PAL.red, 40);
    s += X(Pf, G(shadowFace({ t, smile: 1, tilt: -4 }), 'translate(880 1640) scale(0.55)'), OP(0.9)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2, s);
  });

  /* 21. Seu estômago afunda: dolly zoom no rosto */
  add(sg(19), 0.02, (t, lt, Pf) => {
    const dur = sg(20) - sg(19), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.3, fx: 540 });
    s += camG(t, 540, 960, H.lerp(1.4, 0.7, u), 0, 0, '');
    s = defsC(Pf) + camG(t, 540, 960, H.lerp(0.8, 1.5, u), 0, 0, nightBG(Pf, t, { glowFire: 0.3, fx: 540 })) + R(0, 0, 1080, 1920, '#000', OP(0.5));
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: H.lerp(0.8, 0.35, u), lookx: 0, worry: 1, mouth: 0.1, sweat: 1, tremble: 1 + 2 * u, mess: 1, dirt: 0.8, cold: 0.3 * u }, 540, 1050, H.lerp(1.3, 2.2, u)));
    s += vignette(Pf, 1 + 0.4 * u);
    return s;
  });

  /* 22. Como ele sabe? */
  add(sg(20), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080d') + glow(Pf, 'B', 540, 900, 900, 0.2);
    s += G(X(Pf, manJacket(Pf, { eyes: 1, scale: 1.3, lantern: 0, rim: 0.7 })), 'translate(540 1900)', OP(0.55)) + questionMarks(t, 540, 800, 380, 5) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 2, s);
  });

  /* 23. você dá um passo para trás */
  add(sg(21), 0.02, (t, lt, Pf) => {
    const g = E_.outCubic(k(lt, 0.1, 0.6));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.2 }) + R(0, 0, 1080, 1920, '#000', OP(0.2));
    s += G(womanFig({ scale: 1.5, scared: 1, arms: [30, 40, -30, -40], walk: g * 0.5, lean: -12 * g }), `translate(${f1(H.lerp(460, 380, g))} 1800)`) + ringWaves(380, 1810, t, sg(21) + 0.5, 1, 300, 'rgba(255,255,255,0.4)', 1 - k(lt, 0.5, 1.0), 8) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.1, 0, 2 * Math.exp(-lt * 4), s);
  });

  /* 24. ele dá dois para a frente */
  add(sg(22), 0.02, (t, lt, Pf) => {
    const a = E_.inQuad(k((lt * 2.0) % 1, 0, 0.3)), st = Math.floor(lt * 2.0);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090d') + R(0, 1400, 1080, 520, '#0c1612') + beam(Pf, 540, -100, 90, 1500, 20, 0.35);
    s += boot(300 + st * 320, H.lerp(1100, 1620, a), 2.3);
    s += ringWaves(300 + st * 320, 1640, t, sg(22) + (st + 0.3) / 2.0, 1, 500, 'rgba(255,255,255,0.5)', (lt * 2.0) % 1 > 0.3 ? 1 - k((lt * 2.0) % 1, 0.3, 0.9) : 0, 12) + vignette(Pf, 1);
    return camG(t, 540, 1200, 1.0, 0, (lt * 2.0) % 1 > 0.3 ? 12 * (1 - k((lt * 2.0) % 1, 0.3, 0.8)) : 0, s);
  });

  /* 25. então o celular vibra */
  add(sg(23), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080c') + glow(Pf, 'B', 540, 900, 1000, 0.3);
    s += G(phoneMsg(Pf, { t, shake: 14 * (1 - lt * 0.5) }), 'translate(540 960) scale(2.4)') + ringWaves(540, 960, t, sg(23), 4, 800, 'rgba(120,200,255,0.5)', 1, 7) + flash('#fff', 0.2 * (Math.sin(t * 38) > 0.6 ? 1 : 0)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 6, s);
  });

  /* 26. mensagem surge na tela mesmo sem sinal */
  add(sg(24), 0.02, (t, lt, Pf) => {
    const dur = sg(26) - sg(24), m = E_.outCubic(k(lt, 0.8, 2.0));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05070b') + glow(Pf, 'R', 540, 900, 1000, 0.15 + 0.25 * m);
    s += G(phoneMsg(Pf, { t, msg: m }), `translate(540 960) scale(${H.lerp(2.3, 3.0, E_.inOutQuad(lt / dur)).toFixed(3)})`) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2, s);
  });

  /* 27. NÃO CONFIE NELE.: letras batendo na tela */
  add(sg(26), 0.01, (t, lt, Pf) => {
    const a = E_.outBack(k(lt, 0, 0.2)), g = Math.floor(lt * 20) % 5 === 0 ? 8 : 0;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10060a') + glow(Pf, 'R', 540, 960, 1200, 0.5);
    s += TXT(540 + g, 760, 'NÃO', 300 * a, '#fff', 'stroke="#ff3b30" stroke-width="8"') + TXT(540 - g, 1000, 'CONFIE', 225 * a, '#ff3b30') + TXT(540, 1250, 'NELE.', 300 * a, '#fff', 'stroke="#ff3b30" stroke-width="8"');
    s += flash('#fff', 0.5 * Math.exp(-lt * 12)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.04 * lt, 0, 10 * Math.exp(-lt * 4), s);
  });

  /* 28. você olha para o homem */
  add(sg(27), 0.02, (t, lt, Pf) => {
    const g = E_.outCubic(k(lt, 0.1, 0.5));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080709') + glow(Pf, 'A', 1000, 800, 900, 0.3);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.5, lookx: 30 * g, looky: -4, worry: 0.8, mouth: 0.1, sweat: 1, mess: 1, dirt: 0.8, tilt: 4 * g }, 540, 1020, 2.0));
    return s + vignette(Pf, 1);
  });

  /* 29. ele também ouviu: cabeça gira, lanterna apontando */
  add(sg(28), 0.02, (t, lt, Pf) => {
    const g = E_.outBack(k(lt, 0.0, 0.3));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0.1 });
    s += beam(Pf, 700, 1260, 190 - 10 * g, 1100, 12, 0.5) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: 1.0, lantern: 1, t, headLook: 3 * g, rim: 0.6 })), 'translate(720 1850)') + ringWaves(300, 1300, t, sg(28), 3, 600, 'rgba(120,200,255,0.4)', 0.8, 6) + vignette(Pf, 1);
    return camG(t, 540, 1150, 1.1, 0, 1.2, s);
  });

  /* 30-31. Quem mandou isso? perdendo o sorriso */
  add(sg(29), 0.02, (t, lt, Pf) => {
    const dur = sg(32) - sg(29), sm = 1 - E_.inOutQuad(k(lt, 0.4, dur - 0.1));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05070b') + glow(Pf, 'A', 540, 1500, 900, 0.45);
    s += X(Pf, G(shadowFace({ t, smile: sm, lookx: 6 * Math.sin(lt * 2), tilt: 3 * Math.sin(lt * 3) }), 'translate(540 1000) scale(1.7)')) + R(0, 1400, 1080, 520, 'rgba(255,200,90,0.2)') + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.08 * lt / dur, 0, 0.8, s);
  });

  /* 32-33. Pela primeira vez, parece assustado */
  add(sg(32), 0.02, (t, lt, Pf) => {
    const dur = sg(34) - sg(32), g = E_.outCubic(k(lt, 0.2, 1.0));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06070b') + glow(Pf, 'A', 540, 1500, 800, 0.3);
    s += X(Pf, G(shadowFace({ t, smile: 0, lookx: 10 * Math.sin(t * 30) * g, tilt: 2 * Math.sin(t * 20) * g }), `translate(540 1000) scale(${H.lerp(1.6, 2.0, g).toFixed(3)})`)) + R(0, 0, 1080, 1920, '#bcd6ee', OP(0.05)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2 * g, s);
  });
}
