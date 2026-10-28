/* scenes_a.js - 0 a ~41 s: gancho, pergunta, escolha, sequestro, porta-malas, abandono. */
function camG(t, cx, cy, zoom, rot, shk, inner) {
  const sx = shk ? H.noise(t * 45, 1) * shk : 0, sy = shk ? H.noise(t * 45, 2) * shk : 0;
  return `<g transform="translate(${f1(540 + sx)} ${f1(960 + sy)}) rotate(${f1(rot)}) scale(${zoom.toFixed(4)}) translate(${f1(-cx)} ${f1(-cy)})">${inner}</g>`;
}
function rainFx(t, n, w, h, col = 'rgba(190,210,235,0.35)', slant = 0.18, sp = 1.8) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = (t * sp + hz(i, 91)) % 1, x = hz(i, 92) * (w + 300) - 150 + ph * 120, y = ph * (h + 200) - 100; s += L(x, y, x - slant * 70, y + 70, col, 2.5); }
  return s;
}
function cityNight(Pf, t, o) {
  const d = Object.assign({ lamp: 1, px: 0 }, o);
  let s = `<defs><linearGradient id="${Pf}csk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070a14"/><stop offset="1" stop-color="#26304e"/></linearGradient>
  <linearGradient id="${Pf}cgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2133"/><stop offset="1" stop-color="#07090f"/></linearGradient></defs>`;
  s += R(-600, -400, 2300, 1900, `url(#${Pf}csk)`);
  for (let i = 0; i < 12; i++) {
    const w = 140 + hz(i, 51) * 140, x = -500 + i * 190 - d.px * 0.2, h = 500 + hz(i, 52) * 700;
    s += R(x, 1380 - h, w, h, i % 2 ? '#0d1220' : '#111828');
    for (let r = 0; r < h / 70; r++) for (let q = 0; q < w / 46; q++) if (hz(r * 9 + q, i + 60) > 0.62) s += R(x + 14 + q * 46, 1380 - h + 20 + r * 70, 22, 32, hz(r + q, i) > 0.5 ? '#ffd98a' : '#9fc4ff', OP(0.5 + 0.4 * hz(r * 3 + q, i + 3)));
  }
  s += R(-600, 1380, 2300, 700, `url(#${Pf}cgr)`);
  s += L(-600, 1380, 1700, 1380, 'rgba(255,255,255,0.06)', 4);
  for (const lx of [150, 940]) {
    const fl = d.lamp * (0.85 + 0.15 * Math.sin(t * 23 + lx));
    s += R(lx - 7, 760, 14, 620, '#05070b') + R(lx - 7, 760, 80, 12, '#05070b') + C(lx + 74, 784, 18, '#fff3c4') + glow(Pf, 'A', lx + 74, 800, 420, 0.85 * fl) + POLY([[lx + 30, 800], [lx + 120, 800], [lx + 330, 1380], [lx - 180, 1380]], 'rgba(255,230,160,0.08)', OP(fl));
    s += E(lx + 70, 1500, 160, 400, 'rgba(255,220,140,0.10)', OP(fl));
  }
  return s;
}

function partA(c) {
  const { add, tw, k, E_, S } = c;
  const seg = i => S[i].start;

  /* 1. GANCHO: olho de lobo gigante, pupila se fecha, a mulher refletida na íris */
  add(0, 0, (t, lt, Pf) => {
    const thump = Math.exp(-((lt * 2.2) % 1) * 8), pup = 1.05 - 0.55 * E_.outQuad(k(lt, 0, 0.8)) - 0.12 * thump;
    const z = 1.4 + 0.5 * E_.inQuad(k(lt, 0.1, 0.9)), shk = 2 + 9 * thump + 14 * k(lt, 0.7, 0.9);
    const woman = G(womanFig({ walk: lt * 1.2, scale: 1, cold: 0.2 }), 'translate(-6 150) scale(0.5)');
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#040302');
    s += glow(Pf, 'A', 540, 960, 900, 0.2 + 0.25 * thump);
    s += camG(t, 0, 0, z, 0, shk, X(Pf, wolfEye(Pf, { t, pupil: pup, lookx: 6 * Math.sin(lt * 3), looky: -4, refl: woman, reflA: 0.55 + 0.45 * E_.outQuad(k(lt, 0.2, 0.7)), red: 0.4 + 0.6 * thump })));
    s += vignette(Pf, 1) + flash('#fff', 0.7 * (1 - k(lt, 0, 0.1))) + flash('#fff', 0.8 * k(lt, 0.82, 0.9));
    return s;
  });

  /* 2. RUA: estranhos barram o caminho */
  add(0.9, 0, (t, lt, Pf) => {
    const u = E_.outCubic(k(lt, 0, 0.9));
    let s = defsC(Pf);
    const world = cityNight(Pf, t, {}) + rainFx(t, 70, 1080, 1700) + glow(Pf, 'B', 540, 1500, 700, 0.12);
    const wk = k(lt, 0.2, 1.1), stopped = lt > 0.85;
    const woman = G(womanFig({ walk: stopped ? 0 : lt * 1.3, arms: [8, 14, -8, -14], scared: stopped ? 1 : 0, look: 0, scale: 1.25, headTilt: stopped ? -6 : 0 }), 'translate(540 1500)');
    const s1 = G(X(Pf, manSil({ hat: true, eyes: stopped ? 1 : 0, rim: 0.6 })), `translate(${f1(H.lerp(-120, 250, u))} 1560) scale(1.3)`);
    const s2 = G(X(Pf, manSil({ eyes: stopped ? 1 : 0, rim: 0.6 })), `translate(${f1(H.lerp(1200, 830, u))} 1560) scale(1.4)`);
    s += camG(t, 540, 1100 - 60 * lt, 1.0 + 0.12 * lt, 0, 2, world + woman + s1 + s2);
    s += vignette(Pf, 0.9) + grain(t);
    return s;
  });

  /* 3. HOMEM x LOBO: tela dividida */
  add(seg(1), 0.05, (t, lt, Pf) => {
    const tH = tw('homem', 0, 4.245), tL = tw('lobo', 0, 5.245), slide = E_.outCubic(k(lt, 0, 0.45));
    const fH = Math.exp(-Math.max(0, t - tH) * 5) * (t >= tH ? 1 : 0), fL = Math.exp(-Math.max(0, t - tL) * 5) * (t >= tL ? 1 : 0);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050608');
    // lado homem (esquerda)
    s += `<clipPath id="${Pf}cl"><rect x="0" y="0" width="540" height="1920"/></clipPath><clipPath id="${Pf}cr"><rect x="540" y="0" width="540" height="1920"/></clipPath>`;
    s += `<g clip-path="url(#${Pf}cl)"><g transform="translate(${f1(-540 * (1 - slide))} 0)">` + R(0, 0, 540, 1920, '#0a1424') + glow(Pf, 'B', 270, 900, 620, 0.35 + 0.5 * fH) + X(Pf, G(manSil({ eyes: 1, rim: 0.9, hat: false, sway: Math.sin(t * 2) * 2 }), `translate(270 1500) scale(${(2.0 + 0.2 * fH).toFixed(3)})`)) + '</g></g>';
    // lado lobo (direita)
    s += `<g clip-path="url(#${Pf}cr)"><g transform="translate(${f1(540 * (1 - slide))} 0)">` + R(540, 0, 540, 1920, '#190c05') + glow(Pf, 'F', 810, 900, 620, 0.35 + 0.5 * fL) + X(Pf, G(wolfHead({ t, snarl: 0.3 + 0.7 * fL, ears: 0.2, uid: 's' }), `translate(810 960) scale(${(1.0 + 0.12 * fL).toFixed(3)})`)) + '</g></g>';
    s += R(536, 0, 8, 1920, '#fff', OP(0.5 + 0.4 * Math.sin(t * 12))) + glow(Pf, 'W', 540, 960, 260, 0.25);
    s += G(womanFig({ back: true, scale: 0.9, arms: [4, 8, -4, -8], bob: 0 }), 'translate(540 1860)');
    s += flash('#9fd0ff', 0.3 * fH) + flash('#ff7a1f', 0.35 * fL) + vignette(Pf, 0.9);
    return s;
  });

  /* 4. "Pense muito bem": rosto, olhar indo e vindo */
  add(seg(2), 0.06, (t, lt, Pf) => {
    const eyeX = 22 * Math.sign(Math.sin(lt * 3.2)) * Math.min(1, Math.abs(Math.sin(lt * 3.2)) * 4), tw1 = k(lt, 0, 3.1);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0d14') + glow(Pf, 'B', 540, 800, 900, 0.18);
    // balões de pensamento: homem e lobo alternando
    const sel = Math.sin(lt * 3.2) > 0;
    s += G(C(0, 0, 130, 'rgba(255,255,255,0.08)', 'stroke="rgba(255,255,255,0.35)" stroke-width="5"') + X(Pf, G(manSil({ eyes: 0, col: '#9fb0c8' }), 'translate(0 150) scale(0.3)')), `translate(190 320) scale(${(sel ? 1.15 : 0.85).toFixed(2)})`, OP(sel ? 1 : 0.45));
    s += G(C(0, 0, 130, 'rgba(255,180,60,0.10)', 'stroke="rgba(255,180,60,0.45)" stroke-width="5"') + X(Pf, G(wolfHead({ t, uid: 't', glow: 0.7 }), 'translate(0 0) scale(0.32)')), `translate(890 300) scale(${(sel ? 0.85 : 1.15).toFixed(2)})`, OP(sel ? 0.45 : 1));
    s += X(Pf, G(womanFace({ t, eye: 1, lookx: eyeX, looky: -6, worry: 0.7, mouth: 0, sweat: tw1 > 0.4 ? 1 : 0, tremble: 1.2, tilt: 3 * Math.sin(lt * 1.6) }), `translate(540 1090) scale(${(1.9 + 0.25 * tw1).toFixed(3)})`));
    s += vignette(Pf, 0.9) + grain(t);
    return s;
  });

  /* 5. "E, principalmente... nunca escolha o lobo": olho do lobo + X vermelho */
  add(seg(4), 0.04, (t, lt, Pf) => {
    const tL = tw('lobo', 1, 10.1), xk = E_.outBack(k(t, tL - 0.1, tL + 0.25)), pulse = Math.exp(-Math.max(0, t - tL) * 4);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#060403');
    s += camG(t, 0, 0, 0.95 + 0.25 * E_.inOutQuad(k(lt, 0, 2.7)), 0, 3 + 12 * pulse, X(Pf, wolfEye(Pf, { t, pupil: 0.45 + 0.4 * (1 - k(lt, 0, 1.5)), lookx: 4 * Math.sin(lt * 5), red: 0.4 + 0.5 * pulse })));
    s += flash(PAL.red, 0.25 * (xk > 0 ? 1 : 0) * (1 - k(t, tL, tL + 0.3))) + bigX(540, 960, 380, xk, PAL.red, 54) + vignette(Pf, 1);
    return s;
  });

  /* 6. Ela responde na hora; "Prefiro o lobo" */
  add(seg(6), 0.05, (t, lt, Pf) => {
    const tL = tw('lobo', 2, 13.0), say = t > seg(7) ? 1 : 0, zoom = 1.5 + 0.5 * E_.inQuad(k(lt, 0, 3.4));
    const mouth = say ? 0.45 + 0.4 * Math.abs(Math.sin(lt * 14)) * (t < tL + 0.3 ? 1 : 0) : 0.35 * Math.abs(Math.sin(lt * 12)) * (t < seg(7) ? 1 : 0);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0b0e16') + glow(Pf, 'B', 540, 800, 800, 0.2);
    s += X(Pf, G(womanFace({ t, eye: 0.95, lookx: 0, mouth: Math.min(1, mouth), smile: say ? 0.4 : 0, anger: 0.1, tilt: -4 * k(lt, 0.2, 0.6) + 2 * Math.sin(lt * 5) }), `translate(540 1060) scale(${zoom.toFixed(3)})`));
    if (say) { const wk = E_.outBack(k(t, seg(7) + 0.1, seg(7) + 0.5)); s += G(X(Pf, wolfHead({ t, uid: 'u', glow: 0.8 + 0.2 * Math.sin(t * 9) })) + C(0, 40, 360, 'none', 'stroke="#ffb52e" stroke-width="12" opacity="0.7"'), `translate(840 360) scale(${(0.4 * wk).toFixed(3)})`); }
    s += flash('#fff', 0.35 * Math.exp(-(t - seg(7)) * 9) * (t >= seg(7) ? 1 : 0)) + vignette(Pf, 0.9);
    return s;
  });

  /* 7. Estranhos trocam olhares e sorriem */
  add(seg(8), 0.08, (t, lt, Pf) => {
    const sm = E_.inOutCubic(k(t, seg(8) + 1.0, seg(10) + 0.2)), look = 26 * Math.sin(Math.min(1, lt / 1.1) * Math.PI) * (lt < 1.1 ? 1 : 0);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080d') + glow(Pf, 'B', 540, 600, 1000, 0.1);
    s += X(Pf, G(shadowFace({ lookx: look, smile: sm, t, tilt: 4 }), `translate(280 900) scale(${(1.08 + 0.06 * lt).toFixed(3)})`));
    s += X(Pf, G(shadowFace({ lookx: -look, smile: sm, t, tilt: -4 }), `translate(800 1300) scale(${(0.95 + 0.06 * lt).toFixed(3)})`));
    s += L(380, 880, 700, 1280, 'rgba(255,255,255,0.12)', 4, 'stroke-dasharray="10 12"');
    s += vignette(Pf, 1) + grain(t, 0.08);
    return s;
  });

  /* 8. Saco preto desce sobre a cabeça */
  add(seg(11), 0.05, (t, lt, Pf) => {
    const dur = seg(12) - seg(11), u = E_.inQuad(k(lt, 0.25, dur - 0.12)), y = H.lerp(-700, 70, u);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0d14') + glow(Pf, 'B', 540, 800, 900, 0.2);
    s += X(Pf, G(womanFace({ t, eye: 1 - 0.1 * u, pupil: 1 + 0.5 * u, worry: 1, mouth: 0.7 * u, mess: u, tremble: 2 + 4 * u, tilt: 0 }), `translate(540 1040) scale(1.8)`));
    s += G(sackShape({}), `translate(540 ${f1(y + 1040 - 330)}) scale(${(2.6 - 0.4 * (1 - u)).toFixed(3)} ${(2.7).toFixed(3)})`);
    s += flash('#000', 0.9 * k(lt, dur - 0.2, dur - 0.02)) + vignette(Pf, 1);
    return s;
  });

  /* 9. Porta-malas: escuro, chacoalhando, relógio girando (3 horas) */
  add(seg(12), 0.0, (t, lt, Pf) => {
    const bump = H.noise(t * 7, 5) * 10, big = Math.exp(-((t * 1.7) % 1) * 9) * 16, hrs = 3 * k(lt, 0.3, seg(13) - seg(12) - 0.1);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#020203');
    let tr = '';
    tr += R(-100, -100, 1300, 2100, '#08090c');
    tr += R(-100, -100, 1300, 30, '#0c0d11') + L(0, 160, 1080, 160, '#14161b', 6) + L(0, 1700, 1080, 1700, '#14161b', 6);
    tr += R(0, 700, 1080, 6, 'rgba(255,60,40,0.55)', OP(0.5 + 0.5 * Math.sin(t * 9))) + glow(Pf, 'R', 540, 706, 720, 0.18 + 0.1 * Math.sin(t * 9));
    tr += G(X(Pf, G(womanFetal({ t, tremble: 3 }), 'translate(0 0)')).replace('<g', '<g') , 'translate(540 1420) scale(2.4)');
    tr += G(sackShape({}), `translate(${f1(700 + bump)} ${f1(1130 + bump * 0.5)}) scale(0.75)`, OP(0.95));
    s += camG(t, 540, 960, 1.04, bump * 0.15, 6 + big, tr);
    s += clock3(Pf, t, lt, hrs);
    s += vignette(Pf, 1) + grain(t, 0.07);
    return s;
  });
  function clock3(Pf, t, lt, hrs) {
    const a = E_.inOutCubic(k(lt, 0.2, 0.7)) * (1 - k(lt, 2.4, 2.8)); if (a < 0.01) return '';
    return G(clockObj(Pf, { h: 0.5 + hrs / 12, m: hrs, glow: 0.7 }), `translate(300 400) scale(${(0.9 + 0.1 * Math.sin(t * 4)).toFixed(3)})`, OP(a));
  }

  /* 10. Carro freia e para: luz de freio, poeira, estrada de terra na floresta */
  add(seg(13), 0.05, (t, lt, Pf) => {
    const sp = 1 - E_.outQuad(k(lt, 0, 0.9)), brk = k(lt, 0.15, 0.4);
    let s = defsC(Pf) + forest(Pf, t, { k: 0.8, px: 0, fog: 0.7, shafts: 0.2 });
    s += R(-200, 1250, 1600, 700, '#2a231c') + POLY([[300, 1250], [780, 1250], [1180, 1950], [-100, 1950]], '#3a3027') + L(540, 1260, 540, 1950, 'rgba(0,0,0,0.25)', 40);
    const sc = 1.0 + 0.4 * (1 - sp);
    s += camG(t, 540, 1300, 1.0 + 0.12 * lt, 0, 2 + 6 * Math.exp(-lt * 5), G(carBack(Pf, { brake: brk, dust: 0.9, t, rot: 0, scale: 0.9 + 0.12 * sp }), `translate(540 ${f1(1400 + 40 * (1 - sp))})`));
    s += flash('#ff2a1f', 0.12 * brk) + vignette(Pf, 0.8);
    return s;
  });

  /* 11. Galho se quebrando: bota pisa no galho */
  add(seg(14), 0.05, (t, lt, Pf) => {
    const hit = k(lt, 0.6, 0.72), br = k(lt, 0.7, 1.0);
    let s = defsC(Pf) + forest(Pf + 'a', t, { k: 0.8, px: 0, fog: 0.8, shafts: 0.1, ground: 1050 });
    s += R(-100, 1050, 1300, 1000, '#231d17');
    for (let i = 0; i < 40; i++) s += E(hz(i, 5) * 1080, 1090 + hz(i, 6) * 800, 14 + hz(i, 7) * 40, 4 + hz(i, 8) * 8, i % 3 ? '#3a3027' : '#2a2a1c', OP(0.7));
    const by = H.lerp(500, 1230, E_.inQuad(hit));
    const boot = R(-95, -700, 190, 420, '#262e42') + P('M-130,-300 L130,-300 L150,-60 Q175,40 120,70 L-150,70 Q-190,20 -140,-40Z', '#2d2219') + R(-134, -300, 268, 46, '#3b2d22') + R(-152, 48, 304, 28, '#0b0907') + L(-90, -210, 90, -230, '#7a6a58', 6) + L(-96, -160, 96, -180, '#7a6a58', 6) + L(-100, -110, 100, -130, '#7a6a58', 6);
    const bootS = glow(Pf, 'W', 0, 0, 0, 0);
    s += G(R(-400, -800, 800, 760, '#08090c', OP(0.0)), '');
    s += R(260, 1230, 560, 18, '#4a3724', 'transform="rotate(-3 540 1239)"') ;
    if (br > 0) { s += G(R(-210, -9, 220, 18, '#4a3724'), `translate(${f1(260 - 40 * br)} ${f1(1232 + 90 * br)}) rotate(${f1(-25 * br)})`) + G(R(0, -9, 220, 18, '#4a3724'), `translate(${f1(540 + 40 * br)} ${f1(1232 + 120 * br)}) rotate(${f1(30 * br)})`); }
    s += G(boot, `translate(540 ${f1(by)})`);
    s += ringWaves(540, 1240, t, seg(14) + 0.7, 3, 520, 'rgba(255,255,255,0.7)', br > 0 ? 1 : 0);
    s += sparksFx(540, 1235, t, br > 0 ? (1 - k(lt, 1.0, 1.5)) : 0, 12, 90, '#d9c7a0');
    s += flash('#fff', 0.25 * (hit > 0.9 ? Math.exp(-(lt - 0.7) * 12) : 0)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 3 * Math.exp(-Math.max(0, lt - 0.7) * 6) * 3, s);
  });

  /* 12. Cheiro de mato e árvores: ela sente, fios verdes passam */
  add(seg(15), 0.06, (t, lt, Pf) => {
    const sn = Math.abs(Math.sin(lt * 7));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090a') + glow(Pf, 'B', 540, 900, 900, 0.06);
    // trilhas de cheiro verde
    for (let i = 0; i < 7; i++) { let d = ''; const y0 = 300 + i * 190; for (let x = -60; x <= 1140; x += 40) d += (d ? ' L' : 'M') + `${x},${f1(y0 + Math.sin(x * 0.012 + t * 2 + i) * 40)}`; s += `<path d="${d}" fill="none" stroke="${i % 2 ? '#6bd38a' : '#3f9f66'}" stroke-width="${6 + (i % 3) * 3}" stroke-linecap="round" stroke-dasharray="40 26" stroke-dashoffset="${f1(-t * 90)}" ${OP(0.35 + 0.35 * sn)}/>`; }
    for (let i = 0; i < 14; i++) { const ph = (t * 0.35 + hz(i, 4)) % 1, x = ph * 1300 - 120, y = 300 + hz(i, 5) * 1300 + Math.sin(t * 2 + i) * 30; s += G(P('M0,-20 Q22,0 0,26 Q-22,0 0,-20Z', i % 2 ? '#4aa86a' : '#7ed08a') + L(0, -20, 0, 26, '#1d4d2f', 3), `translate(${f1(x)} ${f1(y)}) rotate(${f1(ph * 700 + i * 30)}) scale(1.6)`, OP(0.8)); }
    s += X(Pf, G(womanFace({ t, eye: 0.35, mouth: 0.1 + 0.1 * sn, worry: 0.5, tilt: 3 * Math.sin(lt * 3), tremble: 0.8 }), `translate(540 1130) scale(1.7) translate(0 ${f1(-10 * sn)})`));
    s += G(sackShape({}), `translate(540 ${f1(1010 - 28 * sn)}) scale(1.95 1.95)`, OP(0.96));
    s += vignette(Pf, 1);
    return s;
  });

  /* 13. Saco arrancado: rosto revelado, luz forte */
  add(seg(16), 0.0, (t, lt, Pf) => {
    const rip = E_.inCubic(k(lt, 0.05, 0.45)), blink = k(lt, 0.45, 1.0);
    const shake = Math.exp(-lt * 6) * 18;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#c9d5cc') + glow(Pf, 'W', 540, 600, 1400, 0.9 * (1 - k(lt, 0.4, 1.6))) + forest(Pf + 'b', t, { k: 0, px: 0, fog: 0.9, shafts: 0.8, ground: 1500 }).replace(/<rect[^>]*fsky[^>]*\/>/, '');
    s += X(Pf, G(womanFace({ t, eye: H.lerp(0.15, 1, blink), pupil: H.lerp(0.5, 1, blink), worry: 0.8, mouth: 0.4 * blink, mess: 1, cold: 0.1, dirt: 0.8, tremble: 2.5, tear: 0.6 }), `translate(540 1060) scale(1.75)`));
    if (rip < 1) s += G(sackShape({}), `translate(${f1(540 + 900 * rip)} ${f1(960 - 1100 * rip)}) rotate(${f1(40 * rip)}) scale(2.4)`);
    s += G(P('M-40,200 L40,200 L60,40 Q0,0 -60,40Z', '#0a0a0a') + P('M-30,0 Q-6,-30 30,-6 L26,70 Q0,30 -30,70Z', '#0e0e0e'), `translate(${f1(H.lerp(900, 560, E_.outCubic(k(lt, 0, 0.25))))} 380) rotate(-30) scale(1.4)`, OP(1 - k(lt, 0.25, 0.5)));
    s += flash('#fff', 0.9 * (1 - k(lt, 0.0, 0.5))) + vignette(Pf, 0.7);
    return camG(t, 540, 960, 1.0, 0, shake, s);
  });

  /* 14. Voz sussurrada junto ao ouvido */
  add(seg(17), 0.05, (t, lt, Pf) => {
    const sp = k(lt, 0.3, 0.9), tr = 1.2 + 1.5 * Math.sin(lt * 10) * (1 - k(lt, 1.8, 2.6));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10161a') + forest(Pf + 'c', t, { k: 0.2, px: lt * 20, fog: 0.9, shafts: 0.5, ground: 1300 }) + R(0, 0, 1080, 1920, '#000', OP(0.35));
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.7, lookx: 40, worry: 1, mouth: 0.05, tremble: tr, mess: 1, dirt: 0.8, sweat: 1, tilt: -6 }), `translate(380 1040) scale(1.65)`));
    // silhueta do homem sussurrando (perfil, à direita)
    const sh = 1 - E_.outCubic(sp);
    s += G(P('M0,-300 C-90,-300 -150,-220 -150,-120 C-150,-60 -140,-20 -172,12 L-132,40 C-152,80 -122,112 -112,150 C-100,230 -60,300 -20,420 L500,420 L500,-300Z', '#030406') + P('M0,-300 C-90,-300 -150,-220 -150,-120 C-150,-60 -140,-20 -172,12', 'none', 'stroke="#5f84ad" stroke-width="5" opacity="0.7"') + E(-60, -90, 12, 4, '#dfeaf5', OP(0.7)), `translate(${f1(930 + 320 * sh)} 880) scale(1.5)`);
    const wx = 700, wy = 960;
    for (let i = 0; i < 5; i++) { const ph = (((t - seg(17)) * 1.4 + i / 5) % 1); s += `<path d="M${f1(wx - ph * 150)},${f1(wy - 90 - 40 * ph)} Q${f1(wx - ph * 150 - 40)},${f1(wy)} ${f1(wx - ph * 150)},${f1(wy + 90 + 40 * ph)}" fill="none" stroke="rgba(190,225,255,${(0.7 * (1 - ph) * sp).toFixed(3)})" stroke-width="${f1(7 - 4 * ph)}" stroke-linecap="round"/>`; }
    s += vignette(Pf, 1) + grain(t, 0.07);
    return s;
  });

  /* 15. "24 horas": relógio varrendo + rosto */
  add(seg(18), 0.05, (t, lt, Pf) => {
    const turn = E_.inOutCubic(k(lt, 0.35, 2.3)), strike = t >= tw('escolheu', 0, 35.0) ? 1 : 0;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090e') + glow(Pf, 'B', 540, 760, 1100, 0.22);
    s += G(clockObj(Pf, { h: turn, m: turn * 24 % 1, glow: 1, col: '#d8e8f6' }), `translate(540 720) scale(${(2.2 + 0.08 * Math.sin(t * 5)).toFixed(3)})`);
    for (let i = 0; i < 24; i++) { const a = i * Math.PI * 2 / 24, on = i / 24 <= turn; s += C(540 + Math.sin(a) * 440, 720 - Math.cos(a) * 440, on ? 9 : 5, on ? PAL.red : 'rgba(255,255,255,0.25)'); }
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.8, worry: 0.7, anger: 0.1, mouth: 0, mess: 1, dirt: 0.8, tremble: 1.2 + 2 * strike }), `translate(540 1560) scale(0.95)`));
    s += flash(PAL.red, 0.22 * strike * Math.exp(-(t - tw('escolheu', 0, 35.0)) * 4)) + vignette(Pf, 0.9);
    return s;
  });

  /* 16. O carro vai embora, ela fica pequena na estrada */
  add(seg(21), 0.08, (t, lt, Pf) => {
    const dur = seg(23) - seg(21), u = E_.inOutQuad(k(lt, 0.3, dur)), sc = H.lerp(1.0, 0.16, u);
    let s = defsC(Pf) + forest(Pf, t, { k: 0.9, px: 0, fog: 0.8, shafts: 0.1 });
    const roadTop = 1180;
    s += POLY([[480, roadTop], [600, roadTop], [1250, 1950], [-150, 1950]], '#3a3027') + L(540, roadTop, 540, 1950, 'rgba(0,0,0,0.25)', 30);
    const cy = H.lerp(1700, roadTop + 20, E_.outQuad(u));
    s += G(carBack(Pf, { brake: 0.5 + 0.5 * Math.sin(t * 3) * 0.3, dust: 1 - u * 0.4, t, scale: sc }), `translate(540 ${f1(cy)})`) + glow(Pf, 'R', 540, cy - 200 * sc, 400 * sc, 0.5 * (1 - 0.5 * u));
    s += G(womanFig({ back: true, scale: 1.0, arms: [10, 20, -10, -20], headTilt: 0 }), 'translate(380 1900)');
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 17. Luzes vermelhas somem: "Quando anoitecer... vamos trazer o homem" */
  add(seg(23), 0.1, (t, lt, Pf) => {
    const tH = tw('homem', 1, 40.2), fade = 1 - E_.inQuad(k(lt, 0.2, 1.8)), echo = t >= tH ? 1 : 0;
    let s = defsC(Pf) + forest(Pf, t, { k: 1.2, px: 0, fog: 0.9, shafts: 0 });
    s += R(0, 0, 1080, 1920, '#0a0612', OP(0.3 + 0.3 * k(lt, 0, 2)));
    s += POLY([[500, 1180], [580, 1180], [1100, 1950], [-60, 1950]], '#1c1a1c') + glow(Pf, 'R', 540, 1190, 500 * fade + 40, 0.8 * fade) + C(520, 1190, 8 * fade, PAL.red) + C(560, 1190, 8 * fade, PAL.red);
    if (echo) s += ringWaves(540, 1190, t, tH, 4, 700, 'rgba(255,60,50,0.6)', 1, 5);
    s += G(X(Pf, manSil({ eyes: echo * 0.9, rim: 0, col: '#030304' })), `translate(300 1255) scale(0.34)`, OP(echo * k(t, tH, tH + 0.6) * 0.8));
    s += G(womanFig({ back: true, scale: 1.0, arms: [10, 20, -10, -20] }), 'translate(540 1900)', OP(1));
    s += vignette(Pf, 1);
    return s;
  });
}
