/* scenes_a.js - 0 a ~38 s: o hook, o naufrágio, a nadada, a praia. */
const faceAt = (o, x, y, sc) => G(alexFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
const cam = (t, lt, cx, cy, z0, z1, d, rot, shk, inner) => camG(t, cx, cy, z0 + (z1 - z0) * E_ease(lt / d), rot, shk, inner);
const E_ease = x => { x = cl(x); return x * x * (3 - 2 * x); };
const SCN = (c, start, fin, fn) => c.add(start, fin, (t, lt, Pf) => defsC(Pf) + X(Pf, fn(t, lt, Pf)));
const storm = (Pf, t, hor, rough, o = {}) => { const fl = flk(t); return sky(Pf, t, hor, fl, o) + seaBand(Pf, t, hor, rough, o.sea || {}) ; };
const rainL = (t, n = 70, a = 0.5) => rainFx(t, n, 1080, 1920, `rgba(235,245,255,${a})`, 0.2, 2.2);
const post = (Pf, t, v = 0.55) => vignette(Pf, v) + grain(t, 0.05);
const splash = (x, y, t, k, n = 14) => { let s = ''; if (k <= 0) return s; for (let i = 0; i < n; i++) { const a = -Math.PI * (0.1 + 0.8 * hz(i, 61)), v = 120 + 200 * hz(i, 62); s += C(x + Math.cos(a) * v * k, y + Math.sin(a) * v * k + 260 * k * k, 6 + 8 * hz(i, 63), '#f4fdff', OP(1 - k)); } return s; };

function partA(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SCN(c, s0, fin, fn);

  /* 0.0 HOOK: close extremo, Alex ofegante na água, raio */
  SN(0, 0.001, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 1100, fl, { clouds: 5 }) + bolt(300, -100, 900, 3, flk(t) > 0.1 ? 1 : 0) + seaBand(Pf, t, 1000, 2.2, { n: 5, span: 900 });
    const sh = Math.exp(-lt * 3);
    s += faceAt({ t, eye: 1, pupil: 0.45, looky: -3, worry: 1, mouth: 0.9 + 0.1 * Math.sin(t * 14), tremble: 4, mess: 1, sweat: 0, cuts: 1, dark: 0.5, tilt: 4 * Math.sin(t * 6) }, 540, 840 + 20 * Math.sin(t * 5), 2.35);
    s += waveLayer(t, 1380 - 20 * lt, 22, 3, mixc('#26d6e2', '#0a4cac', 0.45), 0.8) + waveLayer(t, 1500, 30, 4, mixc('#26d6e2', '#0a4cac', 0.7), 0.7);
    s += splash(300, 1380, t, cl((lt % 0.9) / 0.9)) + splash(800, 1400, t, cl(((lt + 0.4) % 0.9) / 0.9));
    s += rainL(t, 90, 0.6) + FB('#fff', 0.5 * Math.exp(-lt * 12));
    return cam(t, lt, 540, 960, 1.0, 1.12, 1.7, 0, 9 * sh + 3, s) + post(Pf, t, 0.45);
  });

  /* 1.7 naufrágio: navio inclinado afundando */
  SN(tw('naufrágio', 0, 1.7), 0.03, (t, lt, Pf) => {
    const fl = flk(t), sink = lt * 40;
    let s = sky(Pf, t, 980, fl, {}) + bolt(780, -100, 900, 7, fl > 0.15 ? 1 : 0) + seaBand(Pf, t, 980, 1.2, { n: 3, span: 300, bottom: 1500 });
    s += shipObj({ t, tilt: -10 - 6 * lt, x: 560, y: 980 + sink, sc: 1.28 });
    s += seaBand(Pf, t, 1040, 1.6, { n: 5, span: 800 }) + splash(280, 1050, t, cl((lt % 0.8) / 0.8)) + rainL(t, 70, 0.45);
    return cam(t, lt, 540, 960, 1.0, 1.14, 0.8, 1.5, 5, s) + post(Pf, t, 0.4);
  });
  /* 2.5 história: proa quase vertical */
  SN(tw('história', 0, 2.5), 0.03, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 1150, fl, { top: '#3a1f8f', mid: '#d046b0', low: '#ffb070' }) + seaBand(Pf, t, 1150, 1.4, { n: 4, span: 500, bottom: 1600 });
    s += shipObj({ t, tilt: -48 - 14 * lt, x: 650, y: 1160 + 120 * lt, sc: 1.5, smoke: 1 });
    s += seaBand(Pf, t, 1210, 1.8, { n: 4, span: 600 });
    for (let i = 0; i < 16; i++) { const ph = (lt * 1.5 + hz(i, 71)) % 1; s += C(350 + hz(i, 72) * 500, 1500 - ph * 500, 8 + 16 * hz(i, 73), '#d9fbff', OP(0.7 * (1 - ph)), 'stroke="#fff" stroke-width="3"'); }
    return cam(t, lt, 640, 1000, 1.05, 1.3, 0.9, -3, 6, s) + FB('#fff', 0.4 * Math.exp(-lt * 10)) + post(Pf, t, 0.4);
  });
  /* 3.1 Brasil: bóia e destroços após o desastre */
  SN(tw('Brasil', 0, 3.1), 0.03, (t, lt, Pf) => {
    let s = storm(Pf, t, 760, 1.6, {}) ;
    s += lifebuoy(300 + 40 * Math.sin(t * 1.5), 1200 + 14 * Math.sin(t * 2), t * 90, 1.9) + debrisPlank(760, 1420, 12, 1.4, t, 1) + debrisPlank(520, 1620, -20, 1.2, t, 2);
    s += seaBand(Pf, t, 1480, 2.4, { n: 2, span: 400 }) + rainL(t, 80, 0.5);
    return cam(t, lt, 540, 1200, 1.2, 1.0, 0.5, -4 + 4 * lt, 6, s) + post(Pf, t, 0.4);
  });
  /* 3.37 nadando no breu */
  SN(sg(1), 0.03, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 760, fl, { stars: 0.7, top: '#14104f', mid: '#5a35b0', low: '#9a6ad8' }) + moon(Pf, 200, 300, 70, 0.9) + seaBand(Pf, t, 760, 1.0, { n: 6, span: 1000 });
    s += swimmer(t, 520 + 30 * lt, 1190 + 6 * Math.sin(t * 2), 1.7, 1) + seaBand(Pf, t, 1330, 1.3, { n: 2, span: 400, c1: '#1ea0d8', c2: '#0a3f9a' }) + rainL(t, 40, 0.35);
    return cam(t, lt, 540, 1150, 1.0, 1.2, 2.5, 0, 3, s) + post(Pf, t, 0.5);
  });
  /* 4.3 madrugada: lua enorme */
  SN(tw('madrugada', 0, 4.3), 0.04, (t, lt, Pf) => {
    let s = sky(Pf, t, 900, 0, { stars: 1, top: '#0f1366', mid: '#4a46c8', low: '#ffa8d8', clouds: 3 }) + moon(Pf, 540, 520, 190);
    s += seaBand(Pf, t, 900, 0.5, { n: 6, span: 800, c1: '#7ff0f0', c2: '#1458b8' });
    for (let i = 0; i < 10; i++) s += E(540 + 14 * Math.sin(t * 2 + i), 930 + i * 38, 140 - i * 10 + 12 * Math.sin(t * 3 + i), 6, '#fff6d8', OP(0.7 - i * 0.05));
    s += swimmer(t, 560, 1250, 0.9, 1);
    return cam(t, lt, 540, 800, 1.25, 1.0, 1.2, 0, 0, s) + post(Pf, t, 0.45);
  });
  /* 5.5 ilha no horizonte */
  SN(tw('ilha', 0, 5.5), 0.03, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 820, fl, { stars: 0.6, top: '#1d1580', mid: '#9040c8', low: '#ff9ac0' }) + cliffs(Pf, t, 120, 840, 840, 330, 4) + jungle(Pf, t, 200, 880, 800, 210, '#139a62', '#4ff0a0') + glow(Pf, 'A', 540, 700, 500, 0.35);
    s += seaBand(Pf, t, 840, 1.0, { n: 5, span: 900 }) + swimmer(t, 280 + 60 * lt, 1450, 1.2, 1);
    return cam(t, lt, 540, 900, 1.0, 1.28, 0.95, 0, 3, s) + post(Pf, t, 0.45);
  });
  /* 6.37 verdadeiro terror: Alex em close, ilha atrás */
  SN(sg(2), 0.03, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 1100, fl, { top: '#1d1580', mid: '#b04ac8', low: '#ff9a9a' }) + cliffs(Pf, t, -100, 1100, 1300, 520, 8) + seaBand(Pf, t, 1100, 1.2, { n: 3, span: 400 });
    s += faceAt({ t, eye: 0.9, pupil: 0.55, lookx: 12 * Math.sin(lt * 3) , looky: -2, worry: 1, mouth: 0.3, tremble: 2.5, cuts: 1, sweat: 1, tilt: 3 }, 540, 880, 2.2) + waveLayer(t, 1500, 24, 3, '#1ba3d8', 0.8);
    return cam(t, lt, 540, 900, 1.0, 1.15, 2.1, 0, 3, s) + rainL(t, 50, 0.4) + post(Pf, t, 0.5);
  });
  /* 8.5 terror: olhos vermelhos na mata */
  SN(tw('terror', 0, 8.5), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 700, flk(t), { top: '#2a1070', mid: '#c03a98', low: '#ff8a70' }) + jungle(Pf, t, -100, 1180, 1000, 560, '#0d6a4c', '#2cc884') + R(-100, 1000, 1280, 1100, '#1a8a6a', OP(0.7));
    for (let i = 0; i < 9; i++) { const on = cl((lt - 0.1 - i * 0.1) * 6); s += ratEyes(Pf, 90 + hz(i, 81) * 900, 800 + hz(i, 82) * 600, 1.1 + hz(i, 83), on, t + i); }
    return cam(t, lt, 540, 1000, 1.3, 1.0, 1.2, 0, 4, s) + FB('#fff', 0.35 * Math.exp(-lt * 10)) + post(Pf, t, 0.55);
  });
  /* 9.7 terra firme: mão na areia */
  SN(tw('terra', 0, 9.7), 0.03, (t, lt, Pf) => {
    let s = sandBg(Pf, t, 0) + seaBand(Pf, t, 340, 0.4, { n: 2, span: 100, c1: '#6ff4ee', c2: '#25a0e6', bottom: 700 });
    const u = E_.outCubic(k(lt, 0, 0.5));
    s += G(armHand(-100, 1600, 520, 1280 + 60 * (1 - u), 2.1) , '') + G(E(520, 1400, 100, 24, '#c98a4c', OP(0.3)));
    for (let i = 0; i < 6; i++) s += C(300 + 140 * i + 20 * hz(i, 90), 800 + 100 * hz(i, 91), 8, '#fff', OP(0.5));
    s += E(540, 1700, 600, 40, '#b97a3c', OP(0.3));
    return cam(t, lt, 540, 1100, 1.15, 1.0, 0.7, 2, 2, s) + post(Pf, t, 0.35);
  });
  /* 10.36 celebra (e logo é cortado) */
  SN(sg(3), 0.03, (t, lt, Pf) => {
    let s = beachNight(Pf, t, { fl: flk(t) });
    const up = E_.outBack(k(lt, 0, 0.35));
    s += G(alexFig({ arms: [150 + 20 * Math.sin(t * 10), 8, -150 - 20 * Math.sin(t * 10), -8], bob: -14 * Math.abs(Math.sin(t * 8)) * up, mouth: 1, flip: 1, scale: 1.7, beard: 0.12 }), `translate(540 1620)`);
    for (let i = 0; i < 24; i++) { const ph = (lt * 0.9 + hz(i, 41)) % 1; s += R(120 + hz(i, 42) * 840, 400 + ph * 1200, 12, 22, ['#ffd24a', '#ff5a8a', '#4ff0e8', '#fff'][i % 4], `transform="rotate(${f1(ph * 600 + i * 40)} ${f1(120 + hz(i, 42) * 840)} ${f1(400 + ph * 1200)})"` + OP(0.9)); }
    return cam(t, lt, 540, 1250, 1.0, 1.1, 1.3, 0, 0, s) + post(Pf, t, 0.3);
  });
  /* 11.4 não! corte vermelho */
  SN(11.45, 0.02, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#e8374a') + glow(Pf, 'W', 540, 960, 900, 0.5);
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; s += POLY([[540, 960], [540 + Math.cos(a - 0.08) * 1500, 960 + Math.sin(a - 0.08) * 1500], [540 + Math.cos(a + 0.08) * 1500, 960 + Math.sin(a + 0.08) * 1500]], '#ff7a88', OP(0.5)); }
    s += bigX(540, 960, 330 * E_.outBack(k(lt, 0, 0.25)), 1, '#fff', 70) + TX(540, 1500, 'NÃO!', 190, '#fff', `transform="rotate(${f1(-4 + 2 * Math.sin(t * 12))} 540 1500)"`);
    return cam(t, lt, 540, 960, 1.15, 1.0, 0.4, 0, 12 * Math.exp(-lt * 4), s) + post(Pf, t, 0.3);
  });
  /* 11.89 estar vivo: coração */
  SN(sg(4), 0.03, (t, lt, Pf) => {
    const bp = Math.pow(Math.max(0, Math.sin(t * 7.5)), 3);
    let s = R(-300, -300, 1700, 2600, '#2a1d8c') + glow(Pf, 'R', 540, 960, 1100, 0.7);
    for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7 + t * 0.2; s += POLY([[540, 960], [540 + Math.cos(a - 0.1) * 1600, 960 + Math.sin(a - 0.1) * 1600], [540 + Math.cos(a + 0.1) * 1600, 960 + Math.sin(a + 0.1) * 1600]], '#ff4a6a', OP(0.15 + 0.15 * bp)); }
    s += heartObj(540, 940, 3.2 + 0.5 * bp);
    s += ringWaves(540, 940, t, 0, 3, 700, '#fff', 0.8, 8);
    return s + post(Pf, t, 0.4);
  });
  /* 13.8 salvo: bóia quebra com X */
  SN(tw('salvo', 0, 13.8), 0.03, (t, lt, Pf) => {
    let s = storm(Pf, t, 800, 1.2) + lifebuoy(540, 1000 + 10 * Math.sin(t * 2), 10 * Math.sin(t), 3.5);
    const kk = E_.outBack(k(lt, 0.15, 0.4));
    s += bigX(540, 1000, 300 * kk, 1, PAL.red, 60) + FB('#fff', 0.5 * Math.exp(-lt * 9));
    return cam(t, lt, 540, 1000, 1.0, 1.12, 0.7, 0, 8 * Math.exp(-lt * 3), s) + post(Pf, t, 0.4);
  });
  /* 14.4 Alex solitário na rocha, tempestade enorme */
  SN(sg(5), 0.04, (t, lt, Pf) => {
    const fl = flk(t);
    let s = sky(Pf, t, 1300, fl, { top: '#1b1470', mid: '#a83ac8', low: '#ff8ab0', clouds: 8 }) + bolt(760, -100, 1200, 11, fl > 0.1 ? 1 : 0) + bolt(260, -100, 800, 5, (fl > 0.3) ? 0.8 : 0);
    s += seaBand(Pf, t, 1300, 1.2, { n: 3, span: 400 }) + rock(540, 1640, 800, 360, 3);
    s += G(alexFig({ arms: [10, 14, -10, -14], scared: 1, bob: 0, scale: 0.9, headTilt: 3 * Math.sin(t) }), `translate(540 1560)`) + rainL(t, 90, 0.5);
    return cam(t, lt, 540, 1300, 1.05, 1.35, 3.1, 0, 2, s) + post(Pf, t, 0.45);
  });
  /* 17.1 Alex: close */
  SN(tw('Alex', 0, 17.1), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 1000, flk(t), { clouds: 4 }) + seaBand(Pf, t, 1000, 1.5, { n: 3, span: 500 });
    s += faceAt({ t, eye: 1, pupil: 0.5, worry: 1, mouth: 0.2, tremble: 2, cuts: 1, sweat: 1 }, 540, 880, 2.1) + rainL(t, 60, 0.5);
    return cam(t, lt, 540, 900, 1.2, 1.0, 0.5, 0, 5, s) + post(Pf, t, 0.5);
  });
  /* 17.6 tempestade: raios múltiplos */
  SN(tw('tempestade', 0, 17.6), 0.03, (t, lt, Pf) => {
    const fl = Math.max(flk(t), 0.5 * Math.abs(Math.sin(t * 9)) * (lt < 0.8 ? 1 : 0));
    let s = sky(Pf, t, 1000, fl, { top: '#1a1060', mid: '#8a30c0', low: '#ff6aa0', clouds: 9 });
    for (let i = 0; i < 3; i++) s += bolt(160 + i * 380, -100, 900 + i * 40, 20 + i + Math.floor(t * 8), 0.5 + 0.5 * Math.abs(Math.sin(t * 14 + i * 2)));
    s += seaBand(Pf, t, 1000, 2.6, { n: 6, span: 900 }) + shipObj({ t, tilt: 8 * Math.sin(t * 2), x: 820, y: 1030, sc: 0.5 }) + rainL(t, 110, 0.55);
    return cam(t, lt, 540, 960, 1.0, 1.1, 0.9, 2 * Math.sin(t * 5), 7, s) + FB('#fff', 0.35 * fl) + post(Pf, t, 0.4);
  });
  /* 18.5 1916: etiqueta */
  SN(tw('1916', 0, 18.5), 0.03, (t, lt, Pf) => {
    let s = storm(Pf, t, 900, 1.0);
    const u = E_.outBack(k(lt, 0, 0.3));
    s += G(R(-300, -180, 600, 360, '#f6e6b8', 'rx="26"') + R(-300, -180, 600, 360, 'none', 'stroke="#b5753a" stroke-width="14" rx="26"') + C(-250, 0, 18, '#b5753a') + TX(10, 70, '1916', 230, '#8a1d2e'), `translate(540 960) rotate(${f1(-6 + 3 * Math.sin(t * 3))}) scale(${(1.6 * u).toFixed(3)})`);
    return cam(t, lt, 540, 960, 1.0, 1.08, 1.2, 0, 3, s) + rainL(t, 60, 0.4) + post(Pf, t, 0.4);
  });
  /* 19.83 luxuoso transatlântico */
  SN(sg(6), 0.04, (t, lt, Pf) => {
    let s = sky(Pf, t, 1050, 0.1, { top: '#3a2aa8', mid: '#e05ab0', low: '#ffc080', clouds: 5, cloud: '#9a58d0' }) + glow(Pf, 'A', 540, 1050, 700, 0.5);
    s += seaBand(Pf, t, 1050, 0.5, { n: 3, span: 300, bottom: 1500 }) + shipObj({ t, tilt: 0, x: 540 + 20 * Math.sin(t), y: 1080, sc: 1.35 });
    s += seaBand(Pf, t, 1090, 0.9, { n: 5, span: 800 });
    return cam(t, lt, 540, 1000, 1.0, 1.2, 1.8, 0, 0, s) + post(Pf, t, 0.35);
  });
  /* 21.6 Príncipe de Astúrias: casco com nome */
  SN(tw('Príncipe', 0, 21.6), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 900, flk(t), { top: '#2a1d8c', mid: '#a042d4', low: '#ffa0c0' }) + shipObj({ t, name: 1, tilt: 0, x: 600, y: 1080, sc: 1.75 }) + seaBand(Pf, t, 1200, 1.0, { n: 4, span: 700 });
    return cam(t, lt, 540, 1050, 1.0, 1.25, 1.2, 0, 2, s) + post(Pf, t, 0.35);
  });
  /* 22.8 colidiu */
  SN(tw('colidiu', 0, 22.8), 0.02, (t, lt, Pf) => {
    let s = sky(Pf, t, 1000, 0.6 * Math.exp(-lt * 6), { top: '#2a1d8c', mid: '#c03ab8', low: '#ff9a70' }) + seaBand(Pf, t, 1000, 1.2, { n: 3, span: 300, bottom: 1500 });
    const hit = k(lt, 0.25, 0.4);
    s += shipObj({ t, tilt: -4 - 10 * hit, x: 400 + 80 * lt, y: 1040 + 10 * hit, sc: 1.2 }) + rock(900, 1180, 520, 360, 5) + rock(780, 1200, 300, 220, 6, '#e08a50');
    s += sparksFx(780, 1000, t, hit > 0 ? 1 - hit * 0.5 : 0, 20, 140, '#ffe27a') + glow(Pf, 'A', 780, 1000, 500 * hit, 0.8);
    s += seaBand(Pf, t, 1180, 1.8, { n: 4, span: 600 });
    return cam(t, lt, 640, 1000, 1.0, 1.15, 0.9, 0, lt > 0.25 ? 16 * Math.exp(-(lt - 0.25) * 2) : 2, s) + FB('#fff', lt > 0.25 ? 0.7 * Math.exp(-(lt - 0.25) * 10) : 0) + post(Pf, t, 0.35);
  });
  /* 23.9 rochedos */
  SN(tw('rochedos', 0, 23.9), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 700, flk(t), { top: '#2a1d8c', mid: '#c03ab8', low: '#ffb080' }) + seaBand(Pf, t, 700, 1.4, { n: 4, span: 1000 });
    for (let i = 0; i < 4; i++) s += rock(180 + i * 250, 1450 + (i % 2) * 120, 330, 560 - i * 40, 10 + i);
    s += seaBand(Pf, t, 1520, 2.2, { n: 3, span: 300, c1: '#3ae8ee', c2: '#1a70d0' }) + splash(300, 1500, t, cl((lt % 0.7) / 0.7), 18);
    return cam(t, lt, 540, 1250, 1.3, 1.0, 0.8, 0, 3, s) + post(Pf, t, 0.35);
  });
  /* 24.5 Ilhabela: ilha costa */
  SN(tw('Ilhabela', 0, 24.5), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 800, flk(t), { top: '#25188a', mid: '#9a40c8', low: '#ffa890' }) + cliffs(Pf, t, -60, 860, 700, 420, 2) + jungle(Pf, t, -60, 700, 800, 260, '#139a62', '#50f0a2') + cliffs(Pf, t, 600, 870, 600, 300, 9);
    s += seaBand(Pf, t, 860, 1.0, { n: 5, span: 900 }) + shipObj({ t, tilt: -8, x: 720, y: 1180, sc: 0.55 });
    return cam(t, lt, 540, 900, 1.0, 1.2, 0.9, 0, 2, s) + post(Pf, t, 0.35);
  });
  /* 25.3 afundou */
  SN(tw('afundou', 0, 25.3), 0.03, (t, lt, Pf) => {
    let s = sky(Pf, t, 1000, flk(t), {}) + seaBand(Pf, t, 1000, 1.0, { n: 3, span: 200, bottom: 1500 });
    s += shipObj({ t, tilt: -70 - 20 * lt, x: 540, y: 1080 + 600 * lt, sc: 1.4, lit: 1 - lt * 0.5 }) + seaBand(Pf, t, 1030, 2.0, { n: 5, span: 800 });
    for (let i = 0; i < 22; i++) { const ph = (lt * 1.2 + hz(i, 73)) % 1; s += C(200 + hz(i, 72) * 700, 1400 - ph * 400, 10 + 22 * hz(i, 74), 'rgba(230,255,255,0.35)', 'stroke="#fff" stroke-width="3"'); }
    return cam(t, lt, 540, 1100, 1.0, 1.2, 1.0, 0, 5, s) + post(Pf, t, 0.4);
  });
  /* 26.4 dez minutos: relógio */
  SN(tw('dez', 0, 26.4), 0.03, (t, lt, Pf) => {
    let s = R(-300, -300, 1700, 2600, '#2a1d8c') + glow(Pf, 'B', 540, 960, 1000, 0.6) + seaBand(Pf, t, 1500, 1.0, { n: 3, span: 300 });
    s += clockLite(540, 880, 340 * E_.outBack(k(lt, 0, 0.25)), t, lt * 18);
    for (let i = 0; i < 12; i++) { const a = (i / 12 + lt * 0.5) * 6.283; s += C(540 + Math.cos(a) * 460, 880 + Math.sin(a) * 460, 8, '#ffd24a', OP(0.7)); }
    return cam(t, lt, 540, 900, 1.0, 1.12, 0.8, 0, 3, s) + post(Pf, t, 0.35);
  });
}
