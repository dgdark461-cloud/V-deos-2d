/* scenes_b.js - 27 a 66 s: arremessado, correnteza, praia, desmaio, as três regras. */
const wetSky = (Pf, t, hor, o = {}) => sky(Pf, t, hor, flk(t), o);
const vest = (x, y, rot, sc, t, i) => G(P('M-60,-40 Q-30,-70 0,-40 Q30,-70 60,-40 L50,40 Q0,56 -50,40Z', '#ff9a2a') + R(-14, -40, 28, 80, '#fff2cf') + L(-50, 0, 50, 0, '#fff', 5), T(x + 8 * Math.sin(t + i), y + 6 * Math.sin(t * 1.7 + i), rot + 8 * Math.sin(t * 1.2 + i), sc));
const hat = (x, y, rot, sc, t, i) => G(E(0, 12, 80, 16, '#26306a') + P('M-50,10 Q-40,-50 0,-52 Q40,-50 50,10Z', '#3a4aa0') + R(-50, -2, 100, 12, '#ffd24a'), T(x + 8 * Math.sin(t * 1.1 + i), y + 5 * Math.sin(t * 1.5 + i), rot, sc));
const darkSil = (x, y, sc, t, i) => G(E(0, 0, 90, 26, '#0b1a50', OP(0.35)), T(x + 14 * Math.sin(t * 0.7 + i), y, 0, sc));
const arrows = (t, col, n, dir, y0, y1) => { let s = ''; for (let i = 0; i < n; i++) { const y = y0 + (y1 - y0) * hz(i, 14), x = ((hz(i, 15) * 1400 + t * 700 * dir * (0.6 + hz(i, 16))) % 1400 + 1400) % 1400 - 160, l = 150 + 200 * hz(i, 17); s += L(x, y, x + l * dir, y, col, 9, OP(0.8)) + POLY([[x + l * dir, y], [x + (l - 40) * dir, y - 26], [x + (l - 40) * dir, y + 26]], col, OP(0.8)); } return s; };

function partB(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SCN(c, s0, fin, fn);

  /* 27.17 arremessado */
  SN(sg(7), 0.02, (t, lt, Pf) => {
    const u = lt, x = H.lerp(100, 980, cl(u / 1.1)), y = 700 + 400 * Math.sin(Math.PI * cl(u / 1.1)) * -1 + 500 * cl(u / 1.1);
    let s = wetSky(Pf, t, 1200, { top: '#2a1d8c', mid: '#d046b0', low: '#ffb070' }) + seaBand(Pf, t, 1200, 1.8, { n: 4, span: 700 }) + speedLines(t, 22);
    s += G(alexFig({ arms: [160, 20, -160, -20], mouth: 1, scared: 1, scale: 1.1 }), `translate(${f1(x)} ${f1(y)}) rotate(${f1(-30 + u * 260)})`);
    s += splash(980, 1320, t, cl((lt - 1.0) / 0.6), 16) + rainL(t, 70, 0.5);
    return cam(t, lt, 540, 960, 1.0, 1.1, 1.2, 0, 4, s) + post(Pf, t, 0.35);
  });
  /* 28.3 águas revoltas */
  SN(tw('águas', 0, 28.3), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 520, { top: '#2a1d8c', mid: '#b042c8', low: '#ff9ab8' }) + bolt(540, -100, 600, 9 + Math.floor(t * 6), flk(t) > 0.1 ? 1 : 0);
    s += seaBand(Pf, t, 540, 3.2, { n: 8, span: 1300 }) + swimmer(t, 560, 1260 + 40 * Math.sin(t * 3), 0.7, 1);
    s += seaBand(Pf, t, 1500, 4.0, { n: 2, span: 400, c1: '#18b0dc', c2: '#0a3f9a' }) + rainL(t, 80, 0.5);
    return cam(t, lt, 540, 1100, 1.0, 1.15, 1.3, 3 * Math.sin(t * 2), 6, s) + post(Pf, t, 0.4);
  });
  /* 29.6 destroços */
  SN(tw('destroços', 0, 29.6), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 700, { top: '#2a1d8c', mid: '#b042c8', low: '#ff9ab8' }) + seaBand(Pf, t, 700, 1.4, { n: 6, span: 1100 });
    for (let i = 0; i < 6; i++) s += debrisPlank(((hz(i, 7) * 1500 - lt * 160) % 1500 + 1500) % 1500 - 200, 900 + i * 150, hz(i, 9) * 50 - 25, 1 + 0.4 * i / 6, t, i);
    s += lifebuoy(780, 1300, t * 40, 1.2);
    return cam(t, lt, 540, 1100, 1.0, 1.1, 0.7, 0, 3, s) + rainL(t, 60, 0.4) + post(Pf, t, 0.4);
  });
  /* 30.3 corpos (vultos e coletes à deriva) */
  SN(tw('corpos', 0, 30.3), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 700, { top: '#1d1470', mid: '#8a38c0', low: '#d880c0' }) + seaBand(Pf, t, 700, 1.0, { n: 6, span: 1100 });
    for (let i = 0; i < 3; i++) s += darkSil(250 + i * 300, 1100 + 150 * i, 1.2 + 0.2 * i, t, i);
    s += vest(300, 1000, 10, 1.5, t, 1) + hat(780, 1150, -8, 1.3, t, 2) + vest(600, 1350, -14, 1.7, t, 3) + hat(200, 1500, 12, 1.2, t, 4);
    s += seaBand(Pf, t, 1620, 1.4, { n: 2, span: 300, c1: '#18b0dc', c2: '#0a3f9a' });
    return cam(t, lt, 540, 1100, 1.15, 1.0, 0.6, 0, 2, s) + post(Pf, t, 0.5);
  });
  /* 30.85 lutou */
  SN(sg(8), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 760, { top: '#1d1470', mid: '#8a38c0', low: '#e090c8' }) + seaBand(Pf, t, 760, 1.6, { n: 5, span: 900 });
    s += swimmer(t, 540, 1220, 2.2, 1, { sp: 5, cuts: 1 }) + seaBand(Pf, t, 1420, 2.4, { n: 3, span: 500, c1: '#18b0dc', c2: '#0a3f9a' }) + arrows(t, 'rgba(255,255,255,0.35)', 8, -1, 900, 1700) + rainL(t, 60, 0.4);
    return cam(t, lt, 540, 1200, 1.0, 1.12, 1.0, 2 * Math.sin(t * 2), 4, s) + post(Pf, t, 0.4);
  });
  /* 31.8 correnteza */
  SN(tw('correnteza', 0, 31.8), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0e6ab8') + arrows(t, '#9ff4ff', 14, -1, 100, 1800);
    s += swimmer(t, 660 + 40 * Math.sin(t * 4) - lt * 40, 960, 2.0, 1, { sp: 6 }) + arrows(t, 'rgba(255,255,255,0.8)', 6, -1, 500, 1500);
    return cam(t, lt, 540, 960, 1.0, 1.12, 1.4, 0, 3, s) + post(Pf, t, 0.35);
  });
  /* 33.2 pedras afiadas */
  SN(tw('pedras', 0, 33.2), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 780, { top: '#2a1d8c', mid: '#c03ab8', low: '#ffb080' }) + seaBand(Pf, t, 780, 1.4, { n: 4, span: 800 });
    for (let i = 0; i < 6; i++) s += POLY([[60 + i * 190, 1700], [100 + i * 190, 1100 - (i % 2) * 140 - 30 * i % 3], [140 + i * 190, 1700]], i % 2 ? '#e8884a' : '#c6683a');
    s += seaBand(Pf, t, 1560, 2.0, { n: 2, span: 300, c1: '#3ae8ee', c2: '#1a70d0' }) + splash(540, 1560, t, cl((lt % 0.6) / 0.6), 16);
    return cam(t, lt, 540, 1300, 1.2, 1.0, 0.7, 0, 3, s) + post(Pf, t, 0.35);
  });
  /* 34.4 praia */
  SN(tw('praia', 0, 34.4), 0.04, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { fl: flk(t) }) + swimmer(t, 400 + 90 * lt, 1010, 0.9, 1, { sp: 3 }) + rainL(t, 30, 0.3);
    return cam(t, lt, 540, 1000, 1.25, 1.0, 0.9, 0, 0, s) + post(Pf, t, 0.35);
  });
  /* 35.4 exausto: rastejando na areia */
  SN(sg(9), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { sandUp: 300 });
    const cr = Math.sin(t * 2.6), u = H.lerp(220, 640, cl(lt / 2.4));
    s += G(E(0, 22, 240, 40, '#b97a3c', OP(0.3)) + P('M-200,-30 Q-40,-80 160,-40 L180,40 L-200,40Z', '#f4f1e8') + E(210, -10, 44, 40, PAL.skin) + P('M180,-34 Q215,-70 250,-34 Q215,-46 180,-34Z', PAL.hair) + PL([[120, 0], [200 + 60 * cr, 40], [280 + 60 * cr, 60]], PAL.skin, 24) + L(-160, 40, -240, 60 + 10 * cr, PAL.pants, 40) + L(40, -34, 70, -8, '#d62d3f', 5), `translate(${f1(u)} 1500) scale(1.5)`);
    return cam(t, lt, 540, 1350, 1.0, 1.25, 2.4, 0, 2, s) + post(Pf, t, 0.4);
  });
  /* 37.3 cortes: braço machucado em close */
  SN(tw('cortes', 0, 37.3), 0.03, (t, lt, Pf) => {
    let s = sandBg(Pf, t, 0, '#ffe2a0', '#e0a060') + G(PL([[-300, 600], [1300, 1000]], PAL.skin, 330) + PL([[-300, 600], [300, 760]], '#f4f1e8', 360), '');
    const ks = [[600, 800], [760, 880], [900, 950], [480, 760]]; ks.forEach((p, i) => { s += L(p[0], p[1], p[0] + 90, p[1] + 40 + 20 * i, '#d62d3f', 12, OP(cl(lt * 5 - i * 0.4))); s += L(p[0], p[1], p[0] + 90, p[1] + 40 + 20 * i, '#ff9aa0', 4, OP(cl(lt * 5 - i * 0.4))); });
    for (let i = 0; i < 10; i++) { const ph = (t * 0.7 + hz(i, 3)) % 1; s += C(600 + 300 * hz(i, 1), 900 + ph * 400, 5, '#d62d3f', OP(1 - ph)); }
    return cam(t, lt, 640, 880, 1.3, 1.1, 0.7, -4, 2, s) + post(Pf, t, 0.35);
  });
  /* 37.95 desmaiou: cai na areia */
  SN(sg(10), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { sandUp: 300 });
    const fall = E_.inCubic(k(lt, 0.2, 0.9)); 
    s += G(alexFig({ arms: [10, 20, -10, -20], scale: 1.8, bob: 0, headTilt: 20 * fall }), `translate(540 ${f1(1560 + 20 * fall)}) rotate(${f1(-88 * fall)} 0 0)`);
    s += ringWaves(540, 1560, t, 0.9, 2, 400, '#fff', cl(lt - 0.9) * 2, 5);
    return cam(t, lt, 540, 1400, 1.1, 1.0, 1.0, 0, 2 * (lt > 0.9 ? 1 : 0), s) + post(Pf, t, 0.4);
  });
  /* 38.8 areia molhada: olho fechando, zoom na areia */
  SN(tw('areia', 0, 38.8), 0.04, (t, lt, Pf) => {
    let s = sandBg(Pf, t, 0, '#e8c98a', '#a87a48') + seaBand(Pf, t, 1500, 0.4, { n: 2, span: 100, bottom: 1800, c1: '#6ff4ee', c2: '#25a0e6' });
    s += faceAt({ t, eye: 0.35 * (1 - lt * 1.4), pupil: 0.6, worry: 0.5, mouth: 0, tilt: 8, cuts: 1, wet: 1 }, 540, 940, 2.1);
    return cam(t, lt, 540, 960, 1.0, 1.1, 0.7, 0, 0, s) + R(-300, -300, 1700, 2600, '#000', OP(0.35 * lt)) + post(Pf, t, 0.5);
  });
  /* 39.49 Mas, — flash */
  SN(sg(11), 0.02, (t, lt, Pf) => R(-300, -300, 1700, 2600, '#fff') + bolt(540, -100, 1000, 33, 1) + glow(Pf, 'W', 540, 960, 800, 0.8));
  /* 39.71 abrir os olhos: olho em extremo close */
  SN(sg(12), 0.03, (t, lt, Pf) => {
    const o = E_.outCubic(k(lt, 0.6, 1.5));
    let s = R(-300, -300, 1700, 2600, '#16124a') + sandBg(Pf, t, 1100, '#c9a068', '#8a6038');
    s += faceAt({ t, eye: 0.05 + 0.95 * o, pupil: 1.3 - 0.8 * o, worry: 0.7 * o, tilt: 4, mouth: 0, cuts: 1, tremble: 1 * o }, 540, 640, 4.4);
    return cam(t, lt, 540, 640, 1.0, 1.15, 2.2, 0, 1, s) + post(Pf, t, 0.55);
  });
  /* 42.02 ainda na escuridão: praia ampla, Alex deitado */
  SN(sg(13), 0.05, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { my: 280 });
    s += G(alexFig({ arms: [20, 30, -20, -30], scale: 1.4 }), `translate(960 1620) rotate(-88)`) + rainL(t, 20, 0.2);
    for (let i = 0; i < 12; i++) s += C(100 + hz(i, 4) * 900, 900 + 150 * hz(i, 5), 5, '#bff8ff', OP(0.4 + 0.5 * Math.sin(t * 3 + i)));
    return cam(t, lt, 540, 1200, 1.0, 1.2, 1.5, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 43.55 percebeu: Alex senta e olha */
  SN(sg(14), 0.04, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { jh: 420 }), up = E_.outCubic(k(lt, 0, 0.5));
    s += G(alexFig({ arms: [30, 40, -30, -40], scale: 1.6, scared: 1, look: 1, headTilt: -6 }), `translate(900 1650) rotate(${f1(-88 + 88 * up)})`);
    return cam(t, lt, 540, 1250, 1.0, 1.25, 0.9, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 44.3 silêncio da praia: calmaria, onda suave */
  SN(tw('silêncio', 0, 44.3), 0.06, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { my: 400, mx: 540 }) + motes(t, 22, 1080, 1100, 5, 'rgba(255,255,255,0.6)', 4, 6);
    s += ringWaves(540, 900, t, 0, 3, 600, 'rgba(255,255,255,0.8)', 0.5, 4);
    return cam(t, lt, 540, 1000, 1.0, 1.1, 1.2, 0, 0, s) + post(Pf, t, 0.4);
  });
  /* 45.5 ilusão: tremulação e olhos surgem na mata */
  SN(tw('ilusão', 0, 45.5), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { jh: 500, jx: 1000 }) + R(-300, 300, 1700, 800, '#08302c', OP(0.5 * lt));
    for (let i = 0; i < 8; i++) s += ratEyes(Pf, 80 + hz(i, 21) * 920, 620 + hz(i, 22) * 220, 0.9, cl((lt - i * 0.07) * 6), t + i);
    return cam(t, lt, 540, 800, 1.0, 1.25, 0.65, 2 * Math.sin(t * 12), 2 + 4 * lt, s) + post(Pf, t, 0.5);
  });
  /* 46.1 mortal: caveira na areia */
  SN(tw('mortal', 0, 46.1), 0.03, (t, lt, Pf) => {
    let s = sandBg(Pf, t, 0, '#ffd89a', '#d89050') + R(-300, -300, 1700, 2600, '#e8374a', OP(0.3 + 0.2 * Math.sin(t * 20)));
    const u = E_.outBack(k(lt, 0, 0.3));
    s += G(E(0, 0, 230, 250, '#fffaf0') + R(-110, 180, 220, 140, '#fffaf0', 'rx="30"') + E(-90, -10, 55, 70, '#2b1d3a') + E(90, -10, 55, 70, '#2b1d3a') + POLY([[0, 70], [-30, 140], [30, 140]], '#2b1d3a') + [-70, -23, 23, 70].map(x => R(x - 8, 210, 16, 80, '#2b1d3a')).join('') + ratEyes(Pf, -90, -10, 2.2, 1, t).replace(/glow\w*/g, 'glowR').replace('url(#glowR)', `url(#${Pf}glowR)`), `translate(540 940) scale(${(1.6 * u).toFixed(3)}) rotate(${f1(3 * Math.sin(t * 9))})`);
    return cam(t, lt, 540, 940, 1.0, 1.1, 0.6, 0, 5, s) + post(Pf, t, 0.4);
  });
  /* 46.59 Siga as regras: três selos */
  SN(sg(15), 0.04, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a1d8c') + glow(Pf, 'B', 540, 960, 1100, 0.5);
    [['1', '#ff4a6a', 200], ['2', '#ff9a2a', 540], ['3', '#2fb8d0', 880]].forEach((b, i) => {
      const u = E_back(k(lt, i * 0.3, i * 0.3 + 0.3));
      s += G(C(0, 0, 150, b[1]) + C(0, 0, 150, 'none', 'stroke="#fff" stroke-width="10"') + TX(0, 62, b[0], 180, '#fff'), T(b[2], 960 + (i - 1) * 0, 6 * Math.sin(t * 4 + i), u * 0.95));
    });
    s += ringWaves(540, 960, t, 0, 3, 800, 'rgba(255,255,255,0.5)', 0.5, 4);
    return cam(t, lt, 540, 960, 1.1, 1.0, 0.9, 0, 0, s) + post(Pf, t, 0.35);
  });
  /* 48.3 virar presa: Alex na mira */
  SN(tw('presa', 0, 48.3), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { jh: 500, jx: 1000 }) + G(alexFig({ arms: [10, 20, -10, -20], scale: 1.2, scared: 1 }), `translate(540 1500)`);
    for (let i = 0; i < 8; i++) s += ratEyes(Pf, 80 + hz(i, 31) * 920, 640 + hz(i, 32) * 200, 1, 1, t + i);
    const rr = 400 - 140 * cl(lt * 4);
    s += C(540, 1200, rr, 'none', 'stroke="#ff3b30" stroke-width="12"') + L(540 - rr - 60, 1200, 540 + rr + 60, 1200, '#ff3b30', 8) + L(540, 1200 - rr - 60, 540, 1200 + rr + 60, '#ff3b30', 8);
    return cam(t, lt, 540, 1150, 1.0, 1.15, 0.45, 0, 4, s) + post(Pf, t, 0.45);
  });
  /* 48.66 primeira regra */
  SN(sg(16), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#ff4a6a') + glow(Pf, 'W', 540, 900, 1000, 0.6);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += POLY([[540, 900], [540 + Math.cos(a - 0.1) * 1600, 900 + Math.sin(a - 0.1) * 1600], [540 + Math.cos(a + 0.1) * 1600, 900 + Math.sin(a + 0.1) * 1600]], '#ff8a9c', OP(0.4)); }
    s += numeralBadge(Pf, 1, 540, 900, 1.5, k(lt, 0, 0.3), t, '#c8203c');
    return cam(t, lt, 540, 900, 1.2, 1.0, 0.5, 0, 6, s) + post(Pf, t, 0.3);
  });
  /* 49.43 nunca fique perto da água */
  SN(sg(17), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { sandUp: 100 }) + G(alexFig({ arms: [20, 30, -20, -30], scale: 1.6, scared: 1, look: 1 }), `translate(760 1600)`);
    const wv = 70 * Math.sin(t * 2);
    s += waveLayer(t, 1080 + 60 * k(lt, 0.2, 1.5), 28, 2, 'rgba(60,200,240,0.7)', 1);
    s += C(300, 1100, 190, 'none', 'stroke="#ff3b30" stroke-width="26"') + L(180, 980, 420, 1220, '#ff3b30', 26);
    return cam(t, lt, 540, 1250, 1.0, 1.15, 2.0, 0, 0, s) + post(Pf, t, 0.35);
  });
  /* 51.56 cheiro de sangue: gota e ondas de odor */
  SN(sg(18), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0c5ab4') + R(-300, -300, 1700, 900, '#18b0dc', OP(0.6));
    const dy = 300 + 700 * E_.inCubic(k(lt, 0, 0.5));
    s += P(`M540,${f1(dy - 60)} Q480,${f1(dy + 30)} 540,${f1(dy + 50)} Q600,${f1(dy + 30)} 540,${f1(dy - 60)}Z`, '#e0182c') + (lt > 0.5 ? ringWaves(540, 1000, t, 0.5, 4, 900, '#ff6a7a', 0.9, 10) + C(540, 1000, 40, '#e0182c', OP(0.8)) : '');
    for (let i = 0; i < 14; i++) s += C(100 + hz(i, 61) * 880, 1900 - ((t * 120 + i * 200) % 1900), 6 + 10 * hz(i, 62), 'rgba(255,255,255,0.4)');
    return cam(t, lt, 540, 960, 1.1, 1.0, 0.8, 0, 3, s) + post(Pf, t, 0.35);
  });
  /* 52.7 tubarões circulando */
  SN(tw('tubarões', 0, 52.7), 0.03, (t, lt, Pf) => {
    let s = wetSky(Pf, t, 700, { top: '#1d1470', mid: '#8a38c0', low: '#e090c8' }) + seaBand(Pf, t, 700, 0.9, { n: 5, span: 1000 });
    for (let i = 0; i < 4; i++) { const a = t * 1.3 + i * 1.57; s += sharkFin(540 + Math.cos(a) * 340, 1150 + Math.sin(a) * 120, 1.3 + 0.3 * Math.sin(a), t, i) ; }
    s += ringWaves(540, 1150, t, 0, 3, 420, 'rgba(255,255,255,0.5)', 0.5, 5);
    return cam(t, lt, 540, 1100, 1.0, 1.2, 0.9, 0, 0, s) + post(Pf, t, 0.4);
  });
  /* 53.4 raso: barbatana perto dos pés */
  SN(tw('raso', 0, 53.4), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { sandUp: 0 }) + G(alexFig({ arms: [20, 30, -20, -30], scale: 1.3, scared: 1 }), `translate(260 1520)`);
    s += waveLayer(t, 1250, 10, 0, 'rgba(60,220,240,0.6)', 0.8, 1700) + sharkFin(H.lerp(900, 380, k(lt, 0, 0.5)), 1380, 1.7, t, 1);
    return cam(t, lt, 540, 1350, 1.0, 1.2, 0.5, 0, 3, s) + post(Pf, t, 0.4);
  });
  /* 53.9 maré alta */
  SN(tw('maré', 0, 53.9), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 700, flk(t), { top: '#1d1a90', mid: '#6a46d0', low: '#a8b8ff' }) + moon(Pf, 800, 260, 80) + seaBand(Pf, t, 760 - 80 * lt, 1.2, { n: 5, span: 1000 });
    s += waveLayer(t, 1500 - 800 * E_.inOutCubic(k(lt, 0, 1.6)), 40, 1, 'rgba(40,200,240,0.85)', 1) + rock(300, 1900, 600, 400, 5);
    return cam(t, lt, 540, 1100, 1.0, 1.15, 1.7, 0, 3, s) + post(Pf, t, 0.4);
  });
  /* 55.7 abismo: espiral escura */
  SN(tw('abismo', 0, 55.7), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0a2a8a');
    for (let i = 0; i < 9; i++) s += E(540, 960, 600 - i * 62, 800 - i * 82, mixc('#1ab0e0', '#050a40', i / 8), `transform="rotate(${f1(t * 40 * (1 + i * 0.1))} 540 960)"`);
    s += ratEyes(Pf, 540, 960, 3, 0.7 + 0.3 * Math.sin(t * 6), t).replace(/#ff4a38/g, '#9fe8ff');
    return cam(t, lt, 540, 960, 1.0, 1.25, 0.6, 20 * lt, 3, s) + post(Pf, t, 0.6);
  });
  /* 56.31 segunda regra */
  SN(sg(19), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#ff9a2a') + glow(Pf, 'W', 540, 900, 1000, 0.6);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += POLY([[540, 900], [540 + Math.cos(a - 0.1) * 1600, 900 + Math.sin(a - 0.1) * 1600], [540 + Math.cos(a + 0.1) * 1600, 900 + Math.sin(a + 0.1) * 1600]], '#ffc070', OP(0.4)); }
    s += numeralBadge(Pf, 2, 540, 900, 1.5, k(lt, 0, 0.3), t, '#d86a10');
    return cam(t, lt, 540, 900, 1.2, 1.0, 0.5, 0, 6, s) + post(Pf, t, 0.3);
  });
  /* 56.98 andar no breu: floresta escura com lanterna de lua */
  SN(sg(20), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 700, 0, { top: '#12104a', mid: '#2a3aa0', low: '#4a6ad0', stars: 0.8, clouds: 2 }) + jungle(Pf, t, -100, 1180, 1000, 560, '#0a5a48', '#26b87a') + R(-300, 900, 1700, 1200, '#0a3a40');
    s += G(alexFig({ arms: [30 * Math.sin(t * 5), 10, -30 * Math.sin(t * 5), -10], walk: t * 0.9, scale: 1.7, scared: 1, look: 1 }), `translate(${f1(300 + 80 * lt)} 1700)`);
    for (let i = 0; i < 6; i++) s += ratEyes(Pf, 120 + hz(i, 71) * 880, 760 + hz(i, 72) * 380, 0.8, 0.8, t + i);
    return cam(t, lt, 540, 1200, 1.0, 1.2, 1.0, 0, 2, s) + post(Pf, t, 0.55);
  });
  /* 58.0 breu: tateando no escuro com luar */
  SN(tw('breu', 1, 58.0), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0e0a40') + glow(Pf, 'B', 540, 800, 900, 0.5);
    s += faceAt({ t, eye: 1, pupil: 0.9, looky: 4, lookx: 14 * Math.sin(lt * 4), worry: 1, tremble: 2, cuts: 1, dark: 0.6, cold: 0.05, tilt: -3 }, 540, 900, 2.2);
    s += R(-300, -300, 1700, 2600, '#06042a', OP(0.35));
    return cam(t, lt, 540, 900, 1.0, 1.15, 1.5, 0, 2, s) + post(Pf, t, 0.65);
  });
  /* 59.55 penhascos */
  SN(sg(21), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 800, flk(t), { top: '#1a1470', mid: '#5a3ac8', low: '#b8a0ff', stars: 0.6 }) + moon(Pf, 220, 300, 70);
    s += cliffs(Pf, t, -100, 1500, 700, 1100, 3) + cliffs(Pf, t, 480, 1500, 700, 800, 7) + R(-300, 1500, 1700, 800, '#173a60');
    s += G(alexFig({ arms: [30, 10, -30, -10], scale: 0.7, scared: 1 }), `translate(560 700)`) + seaBand(Pf, t, 1700, 1.0, { n: 2, span: 200, bottom: 2200, c1: '#18b0dc', c2: '#0a3f9a' });
    return cam(t, lt, 540, 1000, 1.0, 1.25, 1.6, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 60.4 falsos: borda que parece firme, mas racha */
  SN(tw('falsos', 0, 60.4), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 900, flk(t), { top: '#1a1470', mid: '#5a3ac8', low: '#b8a0ff', stars: 0.6 }) + R(-300, 900, 1700, 400, '#d6804a');
    s += R(-300, 1300, 1700, 900, '#0f2a5a') + L(0, 920, 1080, 920, '#8c3d1c', 8);
    for (let i = 0; i < 5; i++) s += PL([[200 + i * 180, 920], [230 + i * 180, 1000 + 40 * (i % 2)], [190 + i * 180, 1090], [240 + i * 180, 1180]], '#7a2f14', 8, OP(cl(lt * 3 - i * 0.3)));
    s += ringWaves(540, 1150, t, 0.3, 2, 500, '#ff3b30', 0.6, 6);
    return cam(t, lt, 540, 1100, 1.0, 1.2, 0.5, 4 * Math.sin(t * 20), 4, s) + post(Pf, t, 0.45);
  });
  /* 60.9 passo em falso */
  SN(tw('passo', 0, 60.9), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a1d8c') + R(-300, 1100, 1000, 1000, '#d6804a');
    const sl = E_.inCubic(k(lt, 0.2, 0.8));
    s += G(PL([[0, -300], [0, 0]], PAL.pants, 90) + E(40, 20, 100, 36, PAL.shoe) + E(40, 50, 100, 12, PAL.sole), `translate(${f1(560 + 140 * sl)} ${f1(900 + 200 * sl)}) rotate(${f1(40 * sl)})`);
    for (let i = 0; i < 12; i++) { const ph = (t * 1.5 + hz(i, 9)) % 1; s += C(700 + 100 * hz(i, 8), 1100 + ph * 600, 8 + 14 * hz(i, 7), '#c06a3a', OP(1 - ph)); }
    return cam(t, lt, 640, 1000, 1.0, 1.15, 0.6, 5 * sl, 5, s) + FB('#fff', 0.5 * Math.exp(-lt * 10)) + post(Pf, t, 0.4);
  });
  /* 62.5 queda fatal */
  SN(tw('queda', 0, 62.5), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#1a1470') + speedLines(t, 24, 'rgba(255,255,255,0.4)', 1);
    s += cliffs(Pf, t, -100, 2400 - 1400 * lt, 700, 900, 3);
    s += G(alexFig({ arms: [160, 20, -160, -20], mouth: 1, scared: 1, scale: 1.2 }), `translate(560 ${f1(700 + 300 * lt)}) rotate(${f1(160 + 30 * Math.sin(t * 8))})`);
    return cam(t, lt, 540, 960, 1.0, 1.2, 0.7, 0, 6, s) + post(Pf, t, 0.5);
  });
  /* 63.2 terceira regra */
  SN(sg(22), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2fb8d0') + glow(Pf, 'W', 540, 900, 1000, 0.6);
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += POLY([[540, 900], [540 + Math.cos(a - 0.1) * 1600, 900 + Math.sin(a - 0.1) * 1600], [540 + Math.cos(a + 0.1) * 1600, 900 + Math.sin(a + 0.1) * 1600]], '#8ff0ff', OP(0.4)); }
    s += numeralBadge(Pf, 3, 540, 900, 1.5, k(lt, 0, 0.3), t, '#0e7a98');
    return cam(t, lt, 540, 900, 1.2, 1.0, 0.5, 0, 6, s) + post(Pf, t, 0.3);
  });
  /* 64.05 silêncio: dedo nos lábios */
  SN(sg(23), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#12104a') + glow(Pf, 'B', 540, 900, 900, 0.5);
    s += faceAt({ t, eye: 1, pupil: 0.8, worry: 0.6, mouth: 0, tremble: 1, cuts: 1, cold: 0.2 }, 540, 880, 2.2);
    const u = E_.outCubic(k(lt, 0, 0.3));
    s += G(E(0, 0, 30, 100, PAL.skin) + R(-12, 40, 24, 120, '#f4f1e8'), `translate(540 ${f1(1180 - 200 * u)}) rotate(0)`);
    s += ringWaves(540, 1000, t, 0.5, 3, 700, 'rgba(255,255,255,0.7)', 0.6, 5);
    return cam(t, lt, 540, 900, 1.0, 1.12, 1.6, 0, 1, s) + post(Pf, t, 0.5);
  });
  /* 64.8 silêncio absoluto: onda muda, tudo parado */
  SN(tw('absoluto', 0, 65.0), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#0c0a38');
    for (let i = 0; i < 6; i++) s += C(540, 960, 90 + i * 130 + 30 * Math.sin(t * 2 + i), 'none', `stroke="#9fe8ff" stroke-width="${3 + (5 - i)}" opacity="${f1(0.6 - i * 0.09)}"`);
    s += ratEyes(Pf, 540, 960, 2.4, 0.7, t);
    return cam(t, lt, 540, 960, 1.3, 1.0, 0.8, 0, 0, s) + post(Pf, t, 0.6);
  });
}
