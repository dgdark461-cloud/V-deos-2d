/* scenes_b.js - parte 2, ~47 a 95 s: fuga, riacho, lobo, cabana, fotografias. */
function branchSweep(t, n, y0, y1, col = '#0b1210', a = 1) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = ((t * 1.8 + hz(i, 4)) % 1), x = 1300 - ph * 1700, y = y0 + hz(i, 5) * (y1 - y0); s += PL([[x, y], [x - 160, y + 40 * (hz(i, 6) - 0.5)], [x - 340, y + 80 * (hz(i, 7) - 0.5)]], col, 12 + 8 * hz(i, 8), OP(a)) + PL([[x - 100, y + 10], [x - 180, y - 70]], col, 7, OP(a)); }
  return s;
}
function partB(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start;

  /* 34. você aproveita e corre */
  add(sg(34), 0.02, (t, lt, Pf) => {
    const u = E_.inQuad(k(lt, 0, 1.2));
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 500, glowFire: 0.5, fx: 900 - lt * 600 });
    s += fireFx(Pf, H.lerp(800, 100, u), 1330, 0.9, t, 1 - u);
    s += speedLines(t, 8) + G(womanFig({ back: true, run: 1, walk: t * 2.6, scale: H.lerp(1.5, 1.0, u), lean: -10, scared: 1, arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)) }), `translate(540 ${f1(H.lerp(1800, 1500, u))})`);
    s += fgTrunks(t, lt * 900, 2, -200, 4, 0.9) + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.1, 0, 7, s);
  });

  /* 35. galhos arranham os braços */
  add(sg(35), 0.02, (t, lt, Pf) => {
    const hit = Math.floor(lt * 3.2), ph = (lt * 3.2) % 1;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090d') + glow(Pf, 'B', 900, 400, 700, 0.15);
    s += G(PL([[-100, 1500], [400, 1100], [900, 900]], '#e7dcc9', 150) + PL([[400, 1100], [900, 900]], '#e7dcc9', 130) + E(980, 860, 90, 70, '#e9bb9c') + P('M300,1120 L860,900', 'none', 'stroke="#b4a68c" stroke-width="8" opacity="0.4"'), `translate(0 ${f1(10 * Math.sin(t * 20))})`);
    for (let i = 0; i <= hit; i++) { const a = i === hit ? E_.outCubic(k(ph, 0.3, 0.6)) : 1; s += L(420 + i * 90, 1000 + i * 14, 560 + i * 90, 1080 + i * 10, '#c0392b', 7, OP(a)) + L(440 + i * 90, 990 + i * 14, 580 + i * 90, 1070 + i * 10, '#ff6b5a', 4, OP(a * 0.8)); }
    s += branchSweep(t, 6, 600, 1500, '#0a110f') + flash('#fff', 0.15 * Math.exp(-ph * 10)) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0, 0, 6, s);
  });

  /* 36. a lanterna balança atrás de você */
  add(sg(36), 0.02, (t, lt, Pf) => {
    const sw = Math.sin(t * 3.2), bx = 640 + 140 * sw, by = 1130 + 30 * Math.sin(t * 6.4);
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 600, glowFire: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.2));
    s += beam(Pf, bx, by, 188 + 14 * sw, 900, 16, 0.6) + glow(Pf, 'A', bx, by, 150, 0.8) + C(bx, by, 14, '#fff6c8');
    s += fgTrunks(t, lt * 700, 2, -200, 4, 1) + G(womanFig({ back: true, run: 1, walk: t * 2.6, scale: 1.3, lean: -8, scared: 1, arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)) }), 'translate(300 1880)') + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0, 0, 5, s);
  });

  /* 37. o homem grita para que pare */
  add(sg(37), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 400, glowFire: 0 });
    s += beam(Pf, 640, 1160, 190, 1000, 14, 0.4) + G(X(Pf, manJacket(Pf, { eyes: 1, scale: 0.8, lantern: 1, t, walk: t * 2.2, rim: 0.5 })), `translate(${f1(700 - 40 * lt)} 1700)`);
    for (let i = 0; i < 4; i++) { const ph = ((t * 1.2 + i / 4) % 1); s += C(560, 1180, 40 + ph * 520, 'none', `stroke="rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})" stroke-width="${f1(8 * (1 - ph) + 2)}"`); }
    s += fgTrunks(t, lt * 500, 2, -200, 4, 1) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.1, 0, 4, s);
  });

  /* 38. continua correndo até o riacho */
  add(sg(38), 0.02, (t, lt, Pf) => {
    const dur = sg(39) - sg(38), r = E_.inCubic(k(lt, 0.5, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 800, glowFire: 0 });
    s += streamBand(Pf, t, H.lerp(2000, 1380, r), 540, { moonx: 700 });
    s += speedLines(t, 8) + G(womanFig({ back: true, run: 1, walk: t * 2.6, scale: 1.1, lean: -8, scared: 1, arms: [60 * Math.sin(t * 16), 70, -60 * Math.sin(t * 16), 70], bob: 8 * Math.abs(Math.sin(t * 16)) }), 'translate(540 1700)');
    s += fgTrunks(t, lt * 800, 2, -200, 4, 0.9) + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0, 0, 5, s);
  });

  /* 39-40. do outro lado: margem oposta */
  add(sg(39), 0.03, (t, lt, Pf) => {
    const dur = sg(41) - sg(39);
    let s = defsC(Pf) + nightBG(Pf, t, { px: 0, glowFire: 0, ground: 1100 }) + R(0, 1100, 1080, 120, '#060a0d');
    s += streamBand(Pf, t, 1200, 420, { moonx: 700, speed: 1.2 }) + R(0, 1620, 1080, 300, '#0a100e');
    s += G(womanFig({ back: true, scale: 1.0, scared: 1, arms: [8, 14, -8, -14] }), 'translate(300 1880)') + motes(t, 14, 1080, 1100, 5, 'rgba(210,230,255,0.4)', 3, 5) + vignette(Pf, 1);
    return camG(t, 540, 1150, H.lerp(1.0, 1.3, lt / dur), 0, 0.6, s);
  });

  /* 41. surge o lobo cinzento */
  add(sg(41), 0.03, (t, lt, Pf) => {
    const dur = sg(42) - sg(41), a = E_.outCubic(k(lt, 0.1, 0.8));
    let s = defsC(Pf) + nightBG(Pf, t, { px: 0, glowFire: 0, ground: 1100 }) + R(0, 1100, 1080, 120, '#060a0d');
    s += streamBand(Pf, t, 1200, 420, { moonx: 700 }) + R(0, 1620, 1080, 300, '#0a100e');
    s += eyesPair(Pf, 780, 1130, 1.0, '#ffd35a', E_.outCubic(k(lt, 0, 0.4)), 36) + G(wolfSide({ phase: 0.1, scale: 0.9, flip: -1, head: 0, t, glow: 1, dark: 0.2, tail: 0 }), 'translate(800 1190)', OP(a)) + fgTrunks(t, 0, 2, -300, 2, 0.8) + vignette(Pf, 1);
    return camG(t, 760, 1150, H.lerp(1.0, 1.6, E_.inOutQuad(lt / dur)), 0, 0.5, s);
  });

  /* 42-43. ele não rosna, apenas observa */
  add(sg(42), 0.02, (t, lt, Pf) => {
    const dur = sg(44) - sg(42);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05080d') + glow(Pf, 'B', 540, 700, 900, 0.22) + glow(Pf, 'A', 540, 1000, 500, 0.12);
    s += X(Pf, G(wolfHead({ t, uid: 'c', glow: 1, ears: 0, snarl: 0, calm: 1, lookx: 0, looky: 0, eye: 1 }), `translate(540 960) scale(${H.lerp(1.4, 1.8, lt / dur).toFixed(3)})`)) + vignette(Pf, 1) + grain(t, 0.04);
    return s;
  });

  /* 44. você hesita */
  add(sg(44), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080709') + glow(Pf, 'B', 200, 900, 800, 0.25) + glow(Pf, 'A', 1000, 900, 700, 0.25);
    const lk = 30 * Math.sin(lt * 9);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.5, lookx: lk, worry: 1, mouth: 0.15, sweat: 1, tremble: 1.5, mess: 1, dirt: 0.8, tilt: 3 * Math.sin(lt * 9) }, 540, 1020, 2.0));
    return s + vignette(Pf, 1);
  });
  /* 45-46. atrás, os passos se aproximam: luz e batidas */
  add(sg(45), 0.02, (t, lt, Pf) => {
    const dur = sg(47) - sg(45), g = E_.inQuad(k(lt, 0, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.2));
    s += beam(Pf, 540, 1150, 180 + 20 * Math.sin(t * 5), 1400, 24, 0.3 + 0.5 * g) + glow(Pf, 'A', 540, 1150, 80 + 300 * g, 0.9 * g) + ringWaves(540, 1500, t, sg(45), 3, 700, 'rgba(255,255,255,0.4)', 1, 8);
    s += fgTrunks(t, 0, 2, -250, 4, 1) + G(womanFig({ back: true, scale: 1.2, scared: 1 }), 'translate(540 1900)') + vignette(Pf, 1);
    return camG(t, 540, 1100, H.lerp(1.0, 1.3, g), 0, 2 + 4 * g, s);
  });

  /* 47a. o lobo atravessa a água */
  add(sg(47), 0.02, (t, lt, Pf) => {
    const dur = 1.7, u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0, ground: 1100 }) + R(0, 1100, 1080, 120, '#060a0d') + streamBand(Pf, t, 1200, 420, { moonx: 700 });
    const wx = H.lerp(900, 140, u), wy = H.lerp(1250, 1560, u);
    s += G(wolfSide({ phase: (lt * 1.8) % 1, scale: 1.0, flip: 1, head: 0, t, glow: 1, dark: 0.1 }), `translate(${f1(wx)} ${f1(wy)})`) + ringWaves(wx, wy + 10, t, sg(47), 3, 160, 'rgba(220,240,255,0.5)', 1, 6) + sparksFx(wx, wy, t, 0.7, 10, 80, '#cfe9ff') + vignette(Pf, 1);
    return camG(t, 540, 1300, 1.0, 0, 1.2, s);
  });
  /* 47b. trilha estreita: o lobo some entre o mato */
  add(sg(47) + 1.7, 0.02, (t, lt, Pf) => {
    const dur = sg(48) - (sg(47) + 1.7), u = E_.inCubic(k(lt, 0.2, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.3));
    s += POLY([[540, 900], [300, 1920], [780, 1920]], '#14201a') + POLY([[540, 900], [480, 1920], [600, 1920]], 'rgba(255,255,255,0.05)');
    const wy = H.lerp(1500, 920, u), sc = H.lerp(0.9, 0.12, u);
    s += G(wolfSide({ phase: (lt * 2) % 1, scale: sc, flip: 1, head: 0, t, glow: 1, dark: 0.4 + 0.5 * u, run: 1 }), `translate(540 ${f1(wy)})`, OP(1 - 0.7 * u));
    s += eyesPair(Pf, 540, 900, 0.5, '#ffd35a', u * (1 - k(lt, dur - 0.4, dur)), 20) + fgTrunks(t, 0, 2, -300, 4, 1) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0, 0, 1, s);
  });

  /* 48. você decide segui-lo */
  add(sg(48), 0.02, (t, lt, Pf) => {
    const g = E_.outCubic(k(lt, 0.1, 0.8));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090d') + glow(Pf, 'B', 540, 800, 1000, 0.2);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: H.lerp(1, 0.75, g), pupil: 0.65, lookx: -22 * g, worry: 0.2, anger: 0.5 * g, mouth: 0.0, sweat: 1, mess: 1, dirt: 0.8 }, 540, 1020, H.lerp(1.9, 2.2, g)));
    return s + vignette(Pf, 1);
  });

  /* 49. minutos depois: tempo passando, lua cruza o céu */
  add(sg(49), 0.02, (t, lt, Pf) => {
    const dur = sg(50) - sg(49), u = k(lt, 0, dur);
    let s = defsC(Pf) + nightBG(Pf, t, { px: lt * 900, glowFire: 0, fx: H.lerp(300, 800, u) });
    s += G(womanFig({ back: true, run: 1, walk: t * 2.2, scale: 0.8, scared: 1, arms: [50 * Math.sin(t * 14), 70, -50 * Math.sin(t * 14), 70] }), 'translate(540 1650)') + G(clockObj(Pf, { h: 12 + u * 3, m: u * 600, glow: 1 }), 'translate(900 360) scale(0.7)') + fgTrunks(t, lt * 900, 2, -200, 4, 0.9) + vignette(Pf, 1);
    return camG(t, 540, 1050, 1.0, 0, 2, s);
  });

  /* 50. cabana abandonada na clareira */
  add(sg(50), 0.03, (t, lt, Pf) => {
    const dur = sg(51) - sg(50), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + nightBG(Pf, t, { glowFire: 0, ground: 1300 }) + R(0, 1300, 1080, 620, '#0a1210');
    s += POLY([[260, 1300], [260, 900], [540, 700], [820, 900], [820, 1300]], '#1b140e') + POLY([[220, 900], [540, 640], [860, 900], [820, 930], [540, 720], [260, 930]], '#0e0a07') + R(450, 1050, 180, 250, '#0a0705') + R(300, 980, 100, 110, '#0a0705') + R(680, 980, 100, 110, '#0a0705');
    s += R(450, 1050, 14, 250, 'rgba(255,190,90,0.6)') + glow(Pf, 'A', 460, 1170, 150, 0.4) + R(0, 1000, 1080, 500, 'rgba(180,200,210,0.06)');
    s += G(womanFig({ back: true, scale: 0.5, scared: 1 }), 'translate(540 1800)') + fgTrunks(t, 0, 2, -300, 3, 1) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1100, H.lerp(1.0, 1.7, u), 0, 0.5, s);
  });

  /* 51. a porta está aberta: range */
  add(sg(51), 0.02, (t, lt, Pf) => {
    const dur = sg(52) - sg(51), o = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080604') + R(240, 300, 600, 1300, '#0a0705');
    s += POLY([[240, 300], [240 + 520 * (0.1 + 0.3 * o), 340], [240 + 520 * (0.1 + 0.3 * o), 1560], [240, 1600]], '#3a2c1f') + R(260, 300, 40 + 120 * o, 1300, 'rgba(255,190,90,0.2)') + glow(Pf, 'A', 300, 960, 300 * (0.3 + o), 0.35) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.2 * o, 0, 1, s);
  });

  /* 52. dentro: garrafas vazias */
  add(sg(52), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.25 }) + R(0, 0, 1080, 1920, '#000', OP(0.3));
    for (let i = 0; i < 7; i++) { const x = 140 + i * 130 + 20 * Math.sin(i * 2), r = (hz(i, 3) - 0.5) * 60; s += G(R(-26, -150, 52, 150, 'rgba(120,190,150,0.55)', 'rx="14"') + R(-12, -210, 24, 70, 'rgba(120,190,150,0.55)', 'rx="8"') + R(-20, -120, 12, 100, 'rgba(255,255,255,0.3)', 'rx="6"'), `translate(${f1(x)} ${f1(1560 + 20 * (i % 2))}) rotate(${f1(r > 0 ? 80 * (i % 3 === 0) : 0)})`); }
    s += R(0, 0, 1080, 1920, '#9fd0ff', OP(0.04)) + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.1 * lt, 0, 1, s);
  });
  /* 53. cobertores úmidos */
  add(sg(53) + 0.0, 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.3));
    s += P('M60,1700 Q200,1380 420,1500 Q620,1360 840,1480 Q1000,1440 1040,1700Z', '#3a4a52') + P('M120,1700 Q260,1480 440,1560 Q640,1460 800,1560 L900,1700Z', '#2c3a42') + P('M200,1500 q80,-60 160,0', 'none', 'stroke="#46585f" stroke-width="10"');
    for (let i = 0; i < 6; i++) { const ph = ((t * 0.8 + i * 0.17) % 1); s += E(200 + i * 140, 1560 + ph * 220, 8, 14, 'rgba(160,210,240,0.8)', OP(1 - ph)); }
    s += vignette(Pf, 1);
    return camG(t, 540, 1500, 1.1 + 0.1 * lt, 0, 0.8, s);
  });
  /* 54. rádio antigo */
  add(sg(54), 0.02, (t, lt, Pf) => {
    const dur = sg(55) - sg(54), g = E_.outCubic(k(lt, 0.2, 1.0));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.15, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.35)) + R(200, 1200, 680, 40, '#2a1a10');
    s += glow(Pf, 'A', 440, 1050, 700 * g, 0.4 * g) + radioVintage(Pf, { t, x: 540, y: 1050, scale: 1.6, glow: g }) + vignette(Pf, 1);
    return camG(t, 540, 1050, H.lerp(1.0, 1.5, lt / dur), 0, 0.6, s);
  });

  /* 55-56. parede com dezenas de fotos */
  const wall = (Pf, t, n, o = {}) => {
    let s = cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.3));
    const dates = ['03/11', '19/02', '07/08', '28/01', '14/05', '30/09', '11/12', '22/04', '05/07', '17/10', '09/03', '26/06'];
    for (let i = 0; i < n; i++) { const col = i % 4, row = Math.floor(i / 4); s += polaroid(Pf, { x: 150 + col * 260 + (hz(i, 2) - 0.5) * 40, y: 380 + row * 400 + (hz(i, 3) - 0.5) * 40, w: 180, h: 200, rot: (hz(i, 4) - 0.5) * 14, who: i, bag: i % 5 === 3, date: dates[i % 12], a: 1 }); }
    return s;
  };
  add(sg(55), 0.02, (t, lt, Pf) => {
    const dur = sg(57) - sg(55), p = k(lt, 0, dur), n = Math.min(16, Math.floor(lt * 7));
    let s = defsC(Pf) + wall(Pf, t, n) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, H.lerp(300, 780, E_.inOutCubic(p)), H.lerp(500, 1000, p), 1.1, 0, 0.8, s);
  });

  /* 57-58. pessoas diferentes na mesma floresta: cortes de foto em foto */
  add(sg(57), 0.02, (t, lt, Pf) => {
    const dur = sg(59) - sg(57), i = Math.floor(lt / dur * 4), ph = (lt / dur * 4) % 1;
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.4));
    s += polaroid(Pf, { x: 540, y: 900, w: 600, h: 700, rot: (i % 2 ? 3 : -3) + Math.sin(t) * 0.8, who: i * 2 + 1, bag: 0, date: ['03/11', '19/02', '07/08', '28/01'][i % 4], trees: 1 });
    s += flash('#fff', 0.2 * Math.exp(-ph * 12)) + vignette(Pf, 1);
    return camG(t, 540, 900, 1.0 + 0.1 * ph, 0, 1 + 6 * Math.exp(-ph * 8), s);
  });

  /* 59-60. embaixo de cada foto, uma data */
  add(sg(59), 0.02, (t, lt, Pf) => {
    const ds = ['03/11', '19/02', '07/08', '28/01', '14/05', '30/09', '11/12'], i = Math.floor(lt * 5);
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.4));
    s += R(120, 700, 840, 380, '#ece6d6', 'rx="8"') + TXT(540, 950, ds[i % ds.length], 240, '#2a2a2a', 'font-weight="700"') + R(120, 1100, 840, 8, 'rgba(0,0,0,0.2)');
    s += flash('#fff', 0.12 * Math.exp(-((lt * 5) % 1) * 10)) + vignette(Pf, 1);
    return camG(t, 540, 900, 1.0 + 0.05 * lt, 0, 1.2, s);
  });

  /* 61. você reconhece o saco preto */
  add(sg(61), 0.02, (t, lt, Pf) => {
    const dur = sg(62) - sg(61), g = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.45));
    s += polaroid(Pf, { x: 540, y: 880, w: 620, h: 720, rot: -2, who: 2, bag: 1, date: '17/10', trees: 1 });
    s += G(sackShape({}), `translate(540 ${f1(H.lerp(640, 600, g))}) scale(0.7)`, OP(g * 0.9)) + glow(Pf, 'R', 540, 800, 800 * g, 0.2 * g) + vignette(Pf, 1);
    return camG(t, 540, 900, H.lerp(1.0, 1.4, g), 0, 1, s);
  });

  /* 62. e então encontra uma foto sua */
  add(sg(62), 0.02, (t, lt, Pf) => {
    const dur = sg(63) - sg(62), g = E_.outBack(k(lt, 0.2, 0.8));
    let s = defsC(Pf) + wall(Pf, t, 12) + R(0, 0, 1080, 1920, '#000', OP(0.55 * (1 - 0.0)));
    s += glow(Pf, 'R', 540, 900, 700 * g, 0.4 * g) + polaroid(Pf, { x: 540, y: 900, w: 560, h: 640, rot: 0, who: 0, bag: 0, date: 'ontem', trees: 0, sleep: 1 }).replace('<g', '<g ') ;
    s += R(0, 0, 1080, 1920, '#fff', OP(0.0)) + vignette(Pf, 1);
    return camG(t, 540, 900, H.lerp(0.9, 1.5, g), 0, 2, s);
  });

  /* 63-64. tirada naquela noite, inconsciente no carro: porta-malas, flash */
  add(sg(63), 0.02, (t, lt, Pf) => {
    const dur = sg(65) - sg(63), fl = Math.exp(-((lt * 0.9) % 1) * 12);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06070a') + R(80, 560, 920, 900, '#3a2e33', 'rx="24"') + R(80, 560, 920, 120, '#251d22');
    s += G(womanFig({ scale: 0.7, cold: 0.2, arms: [60, 80, -60, -80] }), 'translate(600 1520) rotate(-84) scale(1.3)') + G(sackShape({}), 'translate(250 1060) scale(0.9)');
    s += R(0, 0, 1080, 1920, '#fff', OP(0.5 * fl)) + R(0, 0, 1080, 1920, '#ff3b30', OP(0.08)) + vignette(Pf, 1) + grain(t, 0.06);
    return camG(t, 540, 1000, H.lerp(1.0, 1.25, lt / dur), 0, 1 + 6 * fl, s);
  });

  /* 65-67. no verso, alguém escreveu: ESCOLHEU O LOBO. */
  add(sg(65), 0.02, (t, lt, Pf) => {
    const dur = sg(68) - sg(65), fl = E_.inOutCubic(k(lt, 0, 0.7)), sx = Math.cos(fl * Math.PI), tT = tw('escolheu', 0, 93.4), w = E_.outCubic(k(t, tT, tT + 0.7));
    let s = defsC(Pf) + cabinWall(Pf, t, { light: 0.2, win: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.45));
    const back = G(R(-300, -380, 600, 760, '#e7dfcb', 'rx="6"') + R(-300, -380, 600, 760, 'rgba(0,0,0,0.05)') + TXT(0, -40, 'ESCOLHEU', 100 * w, '#a31616', 'font-weight="800" transform="rotate(-4)"') + TXT(0, 100, 'O LOBO.', 120 * w, '#a31616', 'font-weight="800" transform="rotate(-4)"'), `translate(540 900) scale(${Math.abs(sx).toFixed(3)} 1)`);
    s += sx > 0 ? polaroid(Pf, { x: 540, y: 900, w: 560, h: 640, who: 0, sleep: 1, trees: 0 }).replace('<g transform="', `<g transform="scale(${Math.abs(sx).toFixed(3)} 1) `) : back;
    s += glow(Pf, 'R', 540, 900, 900 * w, 0.3 * w) + vignette(Pf, 1);
    return camG(t, 540, 900, 1.0 + 0.08 * lt / dur, 0, 1.2 + 5 * Math.exp(-(t - tT) * 8) * (t > tT ? 1 : 0), s);
  });

  /* 68. seu coração dispara */
  add(sg(68), 0.02, (t, lt, Pf) => {
    const dur = sg(69) - sg(68), bpm = H.lerp(110, 170, k(lt, 0, dur)), beat = Math.exp(-(((t * bpm / 60) % 1)) * 9);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080508') + glow(Pf, 'R', 540, 760, 1000, 0.15 + 0.35 * beat);
    s += camG(t, 540, 960, 1, 0, 0, wFace(Pf, { t, eye: 1, pupil: 0.45, worry: 1, mouth: 0.1, sweat: 1, tremble: 1 + 3 * beat, mess: 1, dirt: 0.8 }, 540, 1000, 1.7 + 0.06 * beat));
    s += ecgLine(40, 1700, 1000, t, bpm, 1, 120 + 30 * beat) + flash(PAL.red, 0.12 * beat) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 6 * beat, s);
  });
}
