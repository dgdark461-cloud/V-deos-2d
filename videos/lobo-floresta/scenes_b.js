/* scenes_b.js - ~41 s a ~110 s: sozinha na floresta, lobo, as duas regras. */
function blurG(Pf, id, std, inner) { return `<defs><filter id="${Pf}${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${std}"/></filter></defs><g filter="url(#${Pf}${id})">${inner}</g>`; }
function claws(Pf, n, x, y, s, k, a = 1) {
  if (k <= 0.01) return '';
  let q = '';
  for (let i = 0; i < n; i++) {
    const dx = i * 70, d = `M${dx},0 C${dx + 30},120 ${dx + 10},260 ${dx + 56},400`;
    q += `<path d="${d}" fill="none" stroke="#ff4a2a" stroke-width="54" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${(1 - k).toFixed(3)}" opacity="0.28"/>` + `<path d="${d}" fill="none" stroke="#ffb199" stroke-width="22" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${(1 - k).toFixed(3)}"/>`;
  }
  return G(q, `translate(${f1(x)} ${f1(y)}) rotate(-12) scale(${s})`, OP(a));
}
function trunkTree(x, w, top, bottom, col = '#2a1f18', branches = true) {
  let s = POLY([[x - w / 2, bottom], [x - w * 0.42, top], [x + w * 0.42, top], [x + w / 2, bottom]], col);
  for (let i = 0; i < 14; i++) s += L(x - w * 0.35 + hz(i, 21) * w * 0.7, top + hz(i, 22) * (bottom - top), x - w * 0.35 + hz(i, 21) * w * 0.7 + 4, top + hz(i, 22) * (bottom - top) + 140, 'rgba(0,0,0,0.35)', 5);
  if (branches) for (let i = 0; i < 5; i++) { const y = top + 120 + i * 260, sg = i % 2 ? 1 : -1; s += PL([[x, y], [x + sg * 150, y - 60], [x + sg * 270, y - 40]], col, 26 - i * 2); }
  return s;
}
function fadeRect(Pf, id, x, y, w, h, col) { return `<defs><linearGradient id="${Pf}${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity="0"/><stop offset="1" stop-color="${col}" stop-opacity="1"/></linearGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${Pf}${id})"/>`; }
function bearClimb(o) {
  const d = Object.assign({ x: 0, y: 0, s: 1, climb: 0 }, o);
  const arm = Math.sin(d.climb * 6.28) * 40;
  let s = E(0, 0, 150, 210, '#4a3123') + E(-10, 40, 100, 140, '#5b3d2c', OP(0.7));
  s += E(70, -230, 94, 86, '#4a3123') + C(20, -300, 34, '#4a3123') + C(120, -290, 34, '#4a3123') + C(20, -300, 16, '#2b1a12') + C(120, -290, 16, '#2b1a12');
  s += E(120, -210, 54, 40, '#8a6a52') + E(142, -222, 14, 10, '#0a0706') + C(70, -250, 6, '#0a0706') + C(112, -258, 6, '#0a0706');
  s += PL([[110, -120], [180, -220 - arm], [200, -330 - arm]], '#4a3123', 56) + PL([[-40, -100], [60, -240 + arm], [90, -350 + arm]], '#3a281c', 56);
  for (let i = -1; i <= 1; i++) s += L(200 + i * 14, -330 - arm, 224 + i * 14, -362 - arm, '#e6dcc8', 6) + L(90 + i * 14, -350 + arm, 112 + i * 14, -380 + arm, '#e6dcc8', 6);
  s += PL([[60, 170], [120, 250], [130, 330]], '#3a281c', 62) + PL([[-60, 170], [-120, 240], [-100, 330]], '#4a3123', 62);
  return G(s, T(d.x, d.y, 0, d.s));
}
function pawPrint(x, y, s, a = 1, rot = 0) {
  return G(E(0, 14, 34, 28, '#1a1410') + E(-34, -22, 13, 18, '#1a1410') + E(-12, -40, 13, 19, '#1a1410') + E(14, -40, 13, 19, '#1a1410') + E(36, -22, 13, 18, '#1a1410'), T(x, y, rot, s), OP(a));
}
function speedo(Pf, cx, cy, r, k, t) {
  const a0 = -210, a1 = 30, ang = H.lerp(a0, a0 + (a1 - a0) * 0.5, k) + (k > 0.98 ? 3 * Math.sin(t * 40) : 0);
  let s = glow(Pf, 'R', cx, cy, r * 1.5, 0.25 * k) + C(cx, cy, r, 'rgba(8,10,14,0.92)', 'stroke="#cfd8e0" stroke-width="10"');
  for (let i = 0; i <= 12; i++) { const a = (a0 + (a1 - a0) * i / 12) * Math.PI / 180, rr = r - 20, ro = r - (i % 3 ? 36 : 52); s += L(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, cx + Math.cos(a) * ro, cy + Math.sin(a) * ro, i > 6 ? PAL.red : '#e8eef4', i % 3 ? 4 : 8); }
  const an = ang * Math.PI / 180; s += L(cx, cy, cx + Math.cos(an) * (r - 40), cy + Math.sin(an) * (r - 40), PAL.red, 12) + C(cx, cy, 20, '#e8eef4');
  s += `<text x="${cx}" y="${f1(cy + r * 0.62)}" text-anchor="middle" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="700" font-size="${f1(r * 0.42)}" fill="#fff" ${OP(k)}>60</text>`;
  return s;
}
function topWolf(x, y, rot, s, a = 1) {
  return G(E(0, 0, 70, 34, '#6d7379') + E(-70, 4, 40, 14, '#4b5056') + E(78, 0, 34, 28, '#7f858b') + POLY([[90, -20], [118, -42], [112, -8]], '#4b5056') + POLY([[90, 20], [118, 42], [112, 8]], '#4b5056') + E(130, 0, 20, 14, '#cfd2d4') + C(128, -9, 4, PAL.amber) + C(128, 9, 4, PAL.amber), T(x, y, rot, s), OP(a));
}

function partB(c) {
  const { add, tw, k, E_, S } = c;
  const seg = i => S[i].start;
  const cx0 = 540;

  /* 18. Plano aéreo subindo: sozinha na floresta */
  add(seg(25), 0.1, (t, lt, Pf) => {
    const dur = seg(28) - seg(25), u = E_.inOutCubic(k(lt, 0, dur)), z = H.lerp(2.1, 0.6, u), cy = H.lerp(1380, 1000, u);
    let s = defsC(Pf);
    const world = forest(Pf, t, { k: 0.1, px: 0, fog: 0.85, shafts: 0.7 }) + G(womanFig({ back: true, scale: 1, arms: [10, 20, -10, -20], bob: Math.sin(t * 2) * 2 }), 'translate(540 1520)') + motes(t, 40, 1500, 1500, 3, 'rgba(255,255,255,0.5)', 3).replace(/<circle/g, '<circle');
    s += camG(t, 540, cy, z, 0, 0, world);
    s += vignette(Pf, 0.8 + 0.2 * u);
    return s;
  });

  /* 19a. 30 metros: panorâmica até o lobo ao lado da árvore caída, com medidor */
  add(seg(28), 0.08, (t, lt, Pf) => {
    const dur = seg(30) - seg(28), pan = E_.inOutCubic(k(lt, 0.2, 2.0)), cx = H.lerp(560, 1060, pan), z = H.lerp(0.95, 1.1, pan), gk = E_.outCubic(k(lt, 0.4, 2.2));
    let s = defsC(Pf);
    let w = forest(Pf, t, { k: 0.15, px: (cx - 540), fog: 0.7, shafts: 0.4 });
    w += G(womanFig({ back: true, arms: [10, 18, -10, -18], scale: 1.0 }), 'translate(300 1500)');
    // árvore caída
    w += P('M1220,1420 L1980,1380 L1990,1500 L1230,1520Z', '#2b1f17') + P('M1220,1420 L1980,1380 L1982,1410 L1224,1450Z', '#3d2d22') + E(1214, 1470, 40, 76, '#35261c') + L(1180, 1430, 1120, 1360, '#2b1f17', 22) + L(1190, 1490, 1110, 1520, '#2b1f17', 20) + L(1300, 1400, 1700, 1392, 'rgba(255,255,255,0.1)', 6);
    w += G(wolfSide({ phase: 0.1, scale: 0.55, flip: -1, head: -0.2, t, glow: 1 }), 'translate(1480 1400)');
    // medidor de distância (30 marcas)
    const x0 = 300, x1 = 1480, yb = 1660;
    w += L(x0, yb, x0 + (x1 - x0) * gk, yb, '#ffd35a', 8) + C(x0, yb, 12, '#ffd35a') + C(x0 + (x1 - x0) * gk, yb, 12, '#ffd35a');
    for (let i = 0; i <= 30; i++) if (i / 30 <= gk) w += L(x0 + (x1 - x0) * i / 30, yb - (i % 10 ? 12 : 30), x0 + (x1 - x0) * i / 30, yb + (i % 10 ? 12 : 30), '#ffd35a', i % 10 ? 3 : 6);
    s += camG(t, cx, 1200, z, 0, 0, w) + vignette(Pf, 0.8);
    return s;
  });

  /* 19b. O lobo encara de frente */
  add(seg(30), 0.08, (t, lt, Pf) => {
    const dur = seg(32) - seg(30), u = E_.inOutQuad(k(lt, 0, dur)), z = H.lerp(1.25, 1.75, u);
    let s = defsC(Pf) + blurG(Pf, 'bl', 10, forest(Pf, t, { k: 0.45, px: 0, fog: 0.9, shafts: 0.2 })) + R(0, 0, 1080, 1920, '#000', OP(0.35));
    s += X(Pf, camG(t, 540, 960, 1, 0, 0, G(wolfHead({ t, uid: 'w', glow: 1, lookx: 0, looky: 0, tilt: 1.5 * Math.sin(lt * 1.2), calm: 1 }), `translate(540 ${f1(1000 - 40 * u)}) scale(${z.toFixed(3)})`)));
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.5 + i / 4) % 1); s += E(540 + (i % 2 ? 40 : -40) + ph * 20, 1000 + 330 * z * 0.6 + ph * 80, 30 + ph * 80, 16 + ph * 40, 'rgba(210,225,235,0.25)', OP(1 - ph)); }
    s += vignette(Pf, 1) + grain(t, 0.05);
    return s;
  });

  /* 20. Impulso de correr -> X */
  add(seg(32), 0.06, (t, lt, Pf) => {
    const tN = seg(33), stop = t >= tN, xk = E_.outBack(k(t, tN + 0.1, tN + 0.45)), run = stop ? 0 : 1, px = stop ? 0 : lt * 500 + 200 * lt * lt;
    let s = defsC(Pf);
    const world = forest(Pf, t, { k: 0.25, px, fog: 0.8, shafts: 0.3 }) + G(womanFig({ back: true, run: 1, walk: stop ? 0.2 : (lt * 2.4) % 1, lean: stop ? 0 : 14, arms: stop ? [10, 18, -10, -18] : [-35, -70, 35, 70], scale: 1.1, bob: stop ? 0 : Math.abs(Math.sin(lt * 7.5)) * -14 }), 'translate(540 1580)');
    s += camG(t, 540, 1250, 1.05 + 0.1 * lt, 0, stop ? 4 * Math.exp(-(t - tN) * 6) : 3, world);
    if (stop) s += flash('#000', 0.35) + flash(PAL.red, 0.25 * Math.exp(-(t - tN) * 5)) + bigX(540, 860, 300, xk, PAL.red, 52);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 21. 60 km/h: lobo em disparada + velocímetro */
  add(seg(34), 0.05, (t, lt, Pf) => {
    const sk = E_.outCubic(k(lt, 0.2, 1.6));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.3, px: lt * 1400, fog: 0.7, shafts: 0.2 });
    for (let i = 0; i < 16; i++) { const y = 950 + hz(i, 3) * 700, ph = (t * (2 + hz(i, 4) * 1.5) + hz(i, 5)) % 1; s += L(1200 - ph * 1500, y, 1200 - ph * 1500 + 200 + hz(i, 6) * 300, y, 'rgba(255,255,255,0.28)', 3 + hz(i, 7) * 4); }
    s += G(wolfSide({ phase: (lt * 2.6) % 1, run: 1, mouth: 0.6, scale: 1.25, t, tail: 1 }), 'translate(540 1500)');
    s += G(speedo(Pf, 0, 0, 230, sk, t), 'translate(540 470)');
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 22. Dez passos: ela corre, o lobo alcança */
  add(seg(35), 0.05, (t, lt, Pf) => {
    const dur = seg(37) - seg(35), u = k(lt, 0.15, dur - 0.5), step = Math.min(10, Math.floor(u * 10.99)), wx = H.lerp(-380, 760, E_.inQuad(u)), wmx = H.lerp(220, 640, u);
    let s = defsC(Pf) + forest(Pf, t, { k: 0.3, px: lt * 300, fog: 0.8, shafts: 0.2 });
    for (let i = 0; i < step; i++) s += pawPrint(120 + i * 70, 1640, 0.35, 0.5);
    s += G(womanFig({ run: 1, walk: (lt * 2.2) % 1, lean: 16, arms: [-30, -60, 40, 70], scale: 1, bob: Math.abs(Math.sin(lt * 7)) * -12 }), `translate(${f1(wmx)} 1620)`);
    s += G(wolfSide({ phase: (lt * 2.8) % 1, run: 1, mouth: 0.8, scale: 1.0, t, tail: 1, lunge: u > 0.9 ? 1 : 0 }), `translate(${f1(wx)} 1620)`);
    for (let i = 0; i < 10; i++) s += C(110 + i * 86, 220, 22, i < step ? PAL.red : 'rgba(255,255,255,0.18)') + (i < step ? glow(Pf, 'R', 110 + i * 86, 220, 60, 0.6) : '');
    s += flash('#fff', 0.7 * (u >= 0.995 ? 1 : 0) * (1 - k(lt, dur - 0.5, dur))) + vignette(Pf, 0.9);
    return s;
  });

  /* 23. Subir em árvore */
  add(seg(37), 0.06, (t, lt, Pf) => {
    const u = E_.inOutQuad(k(lt, 0.1, 2.6));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#2e3d36') + glow(Pf, 'W', 540, 300, 1100, 0.18);
    const cam = H.lerp(1300, 700, u);
    let w = '';
    for (let i = 0; i < 4; i++) w += trunkTree(120 + i * 330 + (i % 2) * 40, 90, -400, 2400, i % 2 ? '#1a1612' : '#14110e', false);
    w += trunkTree(560, 250, -800, 2400, '#2a1f18', true);
    const cy = H.lerp(1850, 1050, u);
    w += G(womanFig({ back: true, arms: [170 - 20 * Math.sin(lt * 7), 175, -170 + 20 * Math.sin(lt * 7 + 3), -175], scale: 0.9, walk: lt * 2 % 1, bob: 0 }), `translate(560 ${f1(cy)})`);
    for (let i = 0; i < 3; i++) w += G(wolfSide({ phase: 0.1 + i * 0.3, scale: 0.8, flip: i % 2 ? 1 : -1, head: -0.8, mouth: 0.4, t }), `translate(${f1(260 + i * 300)} 2300)`);
    s += camG(t, 540, cam, 1.0, 0, 2, w);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 24. Urso sobe, lobo não */
  add(seg(38), 0.05, (t, lt, Pf) => {
    const dur = seg(39) - seg(38), jump = Math.abs(Math.sin(lt * 4.2)), cl_ = (lt * 0.9) % 1;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#232f2a');
    s += R(538, 0, 4, 1920, 'rgba(255,255,255,0.35)');
    s += trunkTree(270, 190, -200, 2000, '#2a1f18', false) + trunkTree(810, 190, -200, 2000, '#2a1f18', false);
    s += G(wolfSide({ phase: 0.1, scale: 0.9, flip: 1, head: -1, mouth: 0.5, t }), `translate(210 ${f1(1700 - 360 * jump)}) rotate(${f1(-35 * jump)})`);
    s += lt > 0.4 ? bigX(270, 700, 120, E_.outBack(k(lt, 0.4, 0.8)), PAL.red, 30) : '';
    s += bearClimb({ x: 780, y: H.lerp(1500, 600, E_.inOutQuad(k(lt, 0, dur))), s: 1.0, climb: cl_ });
    s += checkMark(810, 330, 70, E_.outBack(k(lt, 1.0, 1.4)), '#6dff9a', 26);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 25. Matilha cercando o tronco (visto de cima) */
  add(seg(39), 0.06, (t, lt, Pf) => {
    const rot = lt * 0.5;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#1b2420');
    for (let i = 0; i < 26; i++) s += C(hz(i, 7) * 1080, hz(i, 8) * 1920, 60 + hz(i, 9) * 120, i % 2 ? '#202c26' : '#18221d', OP(0.7));
    s += C(540, 960, 520, 'rgba(0,0,0,0.25)') + C(540, 960, 190, '#3a2a1e') + C(540, 960, 150, '#2a1d14') + C(540, 960, 90, '#1d140e');
    s += G(womanFig({ back: true, scale: 0.22 }), 'translate(540 990)', OP(0.0)) + C(540, 960, 18, PAL.sweater) + C(540, 962, 9, PAL.hair);
    const n = 7;
    for (let i = 0; i < n; i++) { const a = rot + i * Math.PI * 2 / n, r = 400 + 18 * Math.sin(t * 2 + i), appear = E_.outCubic(k(lt, 0.1 + i * 0.12, 0.5 + i * 0.12)); s += topWolf(540 + Math.cos(a) * r, 960 + Math.sin(a) * r, a * 57.3 + 180, 1.05, appear) + glow(Pf, 'A', 540 + Math.cos(a) * (r - 120), 960 + Math.sin(a) * (r - 120), 60, 0.4 * appear); }
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 0, s);
  });

  /* 26a. Primeira regra: garras + "parecer maior" */
  add(seg(40), 0.05, (t, lt, Pf) => {
    const dur = seg(42) - seg(40), ck = E_.outCubic(k(lt, 0.0, 0.5)), shr = E_.inOutCubic(k(lt, 0.7, 1.2)), grow = E_.inOutCubic(k(lt, 1.2, dur - 0.1));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.25, px: 0, fog: 0.75, shafts: 0.5 });
    const sc = H.lerp(0.9, 1.35, grow);
    s += E(540, 1520, 180 * sc, 30 * sc, 'rgba(0,0,0,0.4)') + G(womanFig({ scale: sc, arms: [8, 14, -8, -14], scared: 1 - grow }), 'translate(540 1520)');
    for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; s += arrowUp(300 + i * 240, 1450 - ph * 250, 1 - ph, grow); }
    s += claws(Pf, 1, 380 + 0 * shr, 380 - 120 * shr, H.lerp(1.9, 0.5, shr), ck) ;
    s += vignette(Pf, 0.9);
    return s;
  });
  function arrowUp(x, y, a, g) { return POLY([[x, y - 40], [x - 34, y + 10], [x - 12, y + 10], [x - 12, y + 60], [x + 12, y + 60], [x + 12, y + 10], [x + 34, y + 10]], '#ffd35a', OP(a * (0.3 + 0.6 * g))); }

  /* 26b. Braços para cima, ângulo baixo, sombra enorme */
  add(seg(42), 0.06, (t, lt, Pf) => {
    const up = E_.outBack(k(lt, 0.25, 0.9)), dur = seg(43) - seg(42);
    let s = defsC(Pf) + forest(Pf, t, { k: 0.3, px: 0, fog: 0.7, shafts: 0.8 });
    const sh = H.lerp(0.9, 1.55, up);
    s += G(womanFig({ scale: sh, arms: [H.lerp(8, 165, up), H.lerp(14, 172, up), H.lerp(-8, -165, up), H.lerp(-14, -172, up)], scared: 0, lean: 0 }), `translate(540 1700)`);
    s += G(R(-240, -1500, 480, 1500, '#000', OP(0.28 * up)), 'translate(540 1700) skewX(-8)');
    s += ringWaves(540, 900, t, seg(42) + 0.6, 3, 800, 'rgba(255,211,90,0.5)', up, 6);
    s += vignette(Pf, 0.9);
    return camG(t, 540, 1100, 1 + 0.12 * lt / dur, 0, 0, s);
  });

  /* 27. Voz firme, grave, tranquila; sem gritar */
  add(seg(43), 0.05, (t, lt, Pf) => {
    const talk = Math.abs(Math.sin(lt * 5.5)), tN = seg(45), nogrit = t >= tN;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0d1410') + glow(Pf, 'B', 540, 760, 900, 0.12);
    // ondas largas, graves e lentas
    for (let i = 0; i < 4; i++) { const ph = (((t - seg(43)) * 0.45 + i / 4) % 1); s += C(540, 1110, 220 + ph * 760, 'none', `stroke="rgba(120,210,170,${(0.6 * (1 - ph)).toFixed(3)})" stroke-width="${f1(10 * (1 - ph) + 2)}"`); }
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.9, worry: 0.15, anger: 0.4, mouth: nogrit ? 0.05 : 0.18 + 0.2 * talk, tilt: 0, dirt: 0.8, mess: 1, tremble: 0.3 }), 'translate(540 1110) scale(1.7)'));
    if (nogrit) { const xk = E_.outBack(k(t, tN, tN + 0.3)); let zz = ''; for (let i = 0; i < 6; i++) zz += PL([[240 + i * 120, 330], [270 + i * 120, 270], [240 + i * 120, 210], [270 + i * 120, 150]], PAL.red, 12, OP(0.9)); s += zz + bigX(540, 260, 210, xk, PAL.red, 30); }
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 28. Ameaça perigosa, não presa fácil: a percepção do lobo muda */
  add(seg(46), 0.06, (t, lt, Pf) => {
    const sw = E_.inOutCubic(k(lt, 1.5, 2.3)), dur = seg(48) - seg(46);
    let s = defsC(Pf) + blurG(Pf, 'bl', 8, forest(Pf, t, { k: 0.4, px: 0, fog: 0.8, shafts: 0.2 })) + R(0, 0, 1080, 1920, '#000', OP(0.4));
    s += X(Pf, G(wolfHead({ t, uid: 'x', ears: sw * 0.9, snarl: 0.1 * sw, glow: 1, looky: 0 }), `translate(300 1400) scale(0.9)`));
    const bx = 700, by = 700;
    s += C(bx, by, 330, 'rgba(10,12,16,0.78)', `stroke="${sw > 0.5 ? PAL.red : '#aab6c2'}" stroke-width="10"`) + C(380, 1020, 30, 'rgba(10,12,16,0.78)') + C(470, 930, 18, 'rgba(10,12,16,0.78)');
    const small = womanFig({ scale: 0.55, arms: [8, 14, -8, -14], cold: 0.3 }), big = womanFig({ scale: 0.55, arms: [165, 172, -165, -172] });
    s += G(small, `translate(${bx} ${by + 190})`, OP(1 - sw)) + G(big + glow(Pf, 'R', 0, -300, 260, 0.9) + POLY([[-40, -520], [-20, -600], [0, -520], [20, -600], [40, -520]], PAL.red) + E(-20, -520, 8, 4, '#fff') + E(20, -520, 8, 4, '#fff'), `translate(${bx} ${by + 190}) scale(${H.lerp(0.9, 1.0, sw).toFixed(2)})`, OP(sw));
    s += sw > 0.7 ? POLY([[bx, by - 250], [bx + 70, by - 140], [bx - 70, by - 140]], '#ffd35a', 'stroke="#fff" stroke-width="6"') + R(bx - 6, by - 220, 12, 46, '#000') + C(bx, by - 156, 7, '#000') : '';
    s += vignette(Pf, 1);
    return s;
  });

  /* 29a. Rosnado grave: close no lobo */
  add(seg(48), 0.04, (t, lt, Pf) => {
    const sn = E_.outCubic(k(lt, 0.1, 0.8)), shk = 3 + 4 * Math.abs(Math.sin(lt * 30));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0705') + glow(Pf, 'F', 540, 900, 900, 0.3);
    s += X(Pf, camG(t, 540, 960, 1, 0, shk * sn, G(wolfHead({ t, uid: 'y', snarl: sn, ears: 0.8 * sn, glow: 1 }), `translate(540 960) scale(${H.lerp(1.5, 1.9, k(lt, 0, 1.7)).toFixed(3)})`)));
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1); s += C(540, 1220, 160 + ph * 700, 'none', `stroke="rgba(255,120,60,${(0.5 * (1 - ph)).toFixed(3)})" stroke-width="${f1(9 * (1 - ph) + 2)}"`); }
    s += flash(PAL.red, 0.12 * sn) + vignette(Pf, 1);
    return s;
  });

  /* 29b. Um passo na direção dela */
  add(seg(49), 0.05, (t, lt, Pf) => {
    const u = E_.inOutQuad(k(lt, 0.2, 1.2));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.4, px: 0, fog: 0.8, shafts: 0.2 }) + R(0, 0, 1080, 1920, '#000', OP(0.25));
    s += pawPrint(300, 1700, 0.7, 0.5) + pawPrint(520, 1680, 0.7, 0.6);
    s += G(wolfSide({ phase: 0.25 + u * 0.5, scale: 1.2, flip: -1, head: 0.5, mouth: 0.4, t, glow: 1, crouch: 0.2 }), `translate(${f1(H.lerp(1000, 760, u))} 1600)`);
    s += G(womanFig({ scale: 0.8, back: false, arms: [165, 172, -165, -172], scared: 1 }), 'translate(220 1600)');
    s += E(740, 1612, 70 * u, 14 * u, 'rgba(180,170,150,0.4)', OP(1 - u * 0.5));
    s += vignette(Pf, 0.9);
    return camG(t, 540, 1250, 1 + 0.15 * u, 0, 3 * Math.exp(-Math.abs(lt - 1.0) * 6) * 2, s);
  });

  /* 30. Segunda regra: evitar o olhar */
  add(seg(50), 0.05, (t, lt, Pf) => {
    const ck = E_.outCubic(k(lt, 0, 0.5)), shr = E_.inOutCubic(k(lt, 0.7, 1.2)), tE = tw('encará-lo', 0, 82.4), lock = k(t, tE - 0.4, tE), brk = E_.outBack(k(t, tE + 0.5, tE + 0.9));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0f0d');
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.9, lookx: H.lerp(0, 30, lock), anger: 0.3, worry: 0.4, mess: 1, dirt: 0.8, bodyLen: 1700 }), `translate(300 640) scale(0.95)`)) + fadeRect(Pf, 'f1', 0, 880, 640, 200, '#0a0f0d');
    s += X(Pf, G(wolfHead({ t, uid: 'z', glow: 1, lookx: -10 }), `translate(780 1360) scale(0.85)`));
    const bw = lock * (1 - brk);
    s += L(380, 610, 700, 1300, PAL.red, 12, OP(bw)) + L(430, 640, 790, 1300, PAL.red, 12, OP(bw)) + glow(Pf, 'R', 540, 960, 380, 0.7 * bw);
    s += bigX(540, 960, 150, brk, PAL.red, 34);
    s += claws(Pf, 2, 740 - 330 * (1 - shr), 140 + 0 * shr, H.lerp(1.8, 0.5, shr), ck);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 31. Desafio de liderança: a alcateia observa */
  add(seg(52), 0.06, (t, lt, Pf) => {
    const dur = seg(53) - seg(52), tC = tw('desafio', 0, 86.8) - 0.0, sp = k(t, tC - 0.3, tC + 0.5);
    let s = defsC(Pf) + blurG(Pf, 'bl', 6, forest(Pf, t, { k: 0.6, px: 0, fog: 0.9, shafts: 0 })) + R(0, 0, 1080, 1920, '#02050a', OP(0.5));
    for (let i = 0; i < 6; i++) { const x = 120 + i * 170, y = 1400 + (i % 2) * 60, sc = i === 2 ? 1.25 : 0.75, a = E_.outCubic(k(lt, 0.1 + i * 0.1, 0.5 + i * 0.1)); s += G(wolfSide({ phase: 0.1, scale: sc, flip: i < 3 ? 1 : -1, head: 0, t, glow: i === 2 ? 1 : 0.7, dark: 0.55 }), `translate(${x} ${y})`, OP(a)) ; }
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.9, lookx: 20, worry: 0.4, anger: 0.2, dirt: 0.8, mess: 1 }), 'translate(540 560) scale(0.8)')) + fadeRect(Pf, 'f2', 200, 780, 680, 160, 'rgba(2,5,10,1)').replace('rgba(2,5,10,1)', '#02050a');
    for (let i = 0; i < 5; i++) { const x0 = 440 + i * 50, a = sp * (0.5 + 0.5 * Math.sin(t * 14 + i)); s += PL([[x0, 700], [x0 + 20, 830], [x0 - 20, 940], [x0 + 10, 1120], [x0 - 10, 1250]], PAL.red, 6, OP(a)); }
    s += glow(Pf, 'R', 540, 1000, 500 * sp + 10, 0.4 * sp) + vignette(Pf, 1);
    return s;
  });

  /* 32. Recuando de lado (visto de cima): marcos de 20 e 40 metros */
  add(seg(53), 0.06, (t, lt, Pf) => {
    const dur = seg(58) - seg(53), u = E_.inOutQuad(k(lt, 0, dur - 0.2)), wx = H.lerp(520, 930, u), wy = H.lerp(860, 1560, u), t20 = seg(56), t40 = seg(57);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#17231d');
    for (let i = 0; i < 30; i++) s += C(hz(i, 17) * 1200 - 60, hz(i, 18) * 2000, 50 + hz(i, 19) * 110, i % 2 ? '#1b2a22' : '#13201a', OP(0.85));
    const wxw = 300, wyw = 520;
    s += C(wxw, wyw, 440, 'none', `stroke="${PAL.amber}" stroke-width="5" stroke-dasharray="18 16" ${OP(t >= t20 - 0.2 ? 1 : 0.25)}`) + C(wxw, wyw, 880, 'none', `stroke="${PAL.amber}" stroke-width="5" stroke-dasharray="18 16" ${OP(t >= t40 - 0.2 ? 1 : 0.25)}`);
    s += E(wxw, wyw, 200, 200, `url(#${Pf}glowR)`, OP(0.2)) + topWolf(wxw, wyw, 30 - 6 * Math.sin(t * 1.5), 1.8);
    s += `<text x="${wxw + 330}" y="${wyw + 330}" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="700" font-size="76" fill="#ffd35a" ${OP(t >= t20 - 0.2 ? 1 : 0)}>20</text><text x="${wxw + 640}" y="${wyw + 700}" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="700" font-size="76" fill="#ffd35a" ${OP(t >= t40 - 0.2 ? 1 : 0)}>40</text>`;
    // trilha da mulher
    let tr = ''; for (let i = 0; i <= 20; i++) { const uu = u * i / 20; tr += C(H.lerp(520, 930, uu), H.lerp(860, 1560, uu), 6, 'rgba(255,255,255,0.4)'); }
    const ang = Math.atan2(wyw - wy, wxw - wx) * 57.3;
    s += tr + G(E(0, 0, 46, 24, PAL.sweater) + E(0, 0, 46, 24, 'none', 'stroke="#b4a68c" stroke-width="4"') + C(0, 0, 19, PAL.hair) + P('M-10,-26 Q0,-36 10,-26 L8,-12 Q0,-18 -8,-12Z', PAL.scarf) + L(-30, 14, -62, 46, PAL.sweater, 13) + L(30, 14, 62, 46, PAL.sweater, 13) + glow(Pf, 'W', 0, 0, 70, 0.3), `translate(${f1(wx)} ${f1(wy)}) rotate(${f1(ang - 90)}) scale(1.5)`);
    s += claws(Pf, 2, 40, 1520, 0.4, 1, 0.9);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 33. Ataque: enrola-se em posição fetal */
  add(seg(58), 0.05, (t, lt, Pf) => {
    const dur = seg(60) - seg(58), cu = E_.inOutCubic(k(lt, 0.9, 2.2)), lung = E_.inQuad(k(lt, 0.0, 0.9));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.4, px: 0, fog: 0.8, shafts: 0.2 }) + R(0, 0, 1080, 1920, '#000', OP(0.15));
    s += G(womanFig({ scale: 1.1, arms: [H.lerp(8, 80, 1 - cu), H.lerp(14, 130, 1 - cu), H.lerp(-8, -80, 1 - cu), H.lerp(-14, -130, 1 - cu)], scared: 1 }), `translate(540 1560) scale(${(1 - cu).toFixed(3)} ${(1 - 0.7 * cu).toFixed(3)})`, OP(1 - cu));
    s += G(womanFetal({ t, tremble: 1.5 }), 'translate(540 1580) scale(2.0)', OP(cu));
    s += G(wolfSide({ phase: lung * 1.5, run: 1, mouth: 1, scale: 1.2, flip: -1, lunge: 1, t }), `translate(${f1(H.lerp(1500, 940, lung))} ${f1(1560 - 120 * Math.sin(lung * Math.PI) * (1 - cu))})`, OP(1 - 0.5 * cu));
    s += flash('#fff', 0.5 * Math.exp(-Math.abs(lt - 0.95) * 10)) + vignette(Pf, 0.9);
    return s;
  });

  /* 34. Proteger o pescoço, imóvel */
  add(seg(60), 0.05, (t, lt, Pf) => {
    const ck = E_.outBack(k(lt, 1.8, 2.3)), sh = E_.outCubic(k(lt, 0.3, 1.0)), t2 = tw('permaneça', 0, 99.5);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0b110e') + glow(Pf, 'B', 540, 900, 900, 0.1);
    s += G(womanFetal({ t, tremble: 0.6 }), 'translate(500 1480) scale(2.7)');
    s += C(690, 1180, 110 + 14 * Math.sin(t * 4), 'none', `stroke="#6dc4ff" stroke-width="10" ${OP(sh)}`) + glow(Pf, 'B', 690, 1180, 260, 0.6 * sh) + P('M690,1050 L800,1090 L800,1190 Q800,1270 690,1320 Q580,1270 580,1190 L580,1090Z', 'rgba(109,196,255,0.18)', `stroke="#6dc4ff" stroke-width="8" ${OP(sh)}`);
    s += checkMark(300, 560, 90, ck, '#6dff9a', 30);
    s += clockObj(Pf, { x: 820, y: 460, scale: 0.6, h: 0.1, m: 0, glow: 0.3 }).replace('<g', '<g ' + OP(k(lt, 2.4, 3.0)));
    s += vignette(Pf, 1);
    return s;
  });

  /* 35. O lobo não ataca: baixa as orelhas, tranquilo */
  add(seg(61), 0.06, (t, lt, Pf) => {
    const dur = seg(62) - seg(61), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.5, px: lt * 40, fog: 0.8, shafts: 0.2 }) + R(0, 0, 1080, 1920, '#000', OP(0.15));
    s += G(wolfSide({ phase: (lt * 0.5) % 1, scale: 1.35, flip: 1, head: 0.4, t, glow: 0.8, tail: 0.3 }), `translate(${f1(H.lerp(300, 560, u))} 1600)`);
    s += G(womanFetal({ t }), 'translate(930 1640) scale(0.9)');
    const ck = E_.outBack(k(lt, 0.3, 0.7));
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 36. Aproxima-se do saco preto */
  add(seg(62), 0.05, (t, lt, Pf) => {
    const dur = seg(63) - seg(62), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.55, px: lt * 120, fog: 0.85, shafts: 0.1, ground: 1250 }) + R(0, 0, 1080, 1920, '#000', OP(0.2));
    s += G(sackShape({}), 'translate(860 1560) rotate(-8) scale(0.5 0.3)') + E(860, 1620, 130, 14, 'rgba(0,0,0,0.5)');
    s += G(wolfSide({ phase: (lt * 0.9) % 1, scale: 1.3, flip: 1, head: 0.7, t, glow: 0.9, tail: 0.4, sniff: u }), `translate(${f1(H.lerp(-100, 500, u))} 1600)`);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 37. Cheira o tecido com o cheiro dela */
  add(seg(63), 0.05, (t, lt, Pf) => {
    const sn = Math.abs(Math.sin(lt * 9));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0c0b') + glow(Pf, 'B', 540, 960, 1000, 0.08);
    s += G(sackShape({}), 'translate(380 1340) rotate(-6) scale(1.8 0.9)') + E(380, 1480, 340, 40, 'rgba(0,0,0,0.5)');
    for (let i = 0; i < 6; i++) { let d = ''; const ph = (t * 0.5 + i / 6) % 1; for (let y = 1320; y > 520; y -= 40) d += (d ? ' L' : 'M') + `${f1(380 + Math.sin(y * 0.02 + t * 3 + i) * 50 + (1320 - y) * 0.3)},${y}`; s += `<path d="${d}" fill="none" stroke="rgba(255,211,150,${(0.15 + 0.3 * sn).toFixed(2)})" stroke-width="${6 + i % 3 * 3}" stroke-linecap="round" stroke-dasharray="40 30" stroke-dashoffset="${f1(-t * 80 - i * 12)}"/>`; }
    s += G(womanFig({ scale: 0.45, arms: [8, 14, -8, -14] }), 'translate(300 1300)', OP(0.0));
    s += X(Pf, G(wolfHead({ t, uid: 'q', sniff: 1, glow: 0.8, ears: 0.2, looky: 10, tilt: -8 }), `translate(760 ${f1(900 + 14 * sn)}) scale(1.15)`));
    s += vignette(Pf, 1);
    return s;
  });

  /* 38. Some na escuridão */
  add(seg(64), 0.08, (t, lt, Pf) => {
    const dur = seg(67) - seg(64), u = E_.inOutQuad(k(lt, 0.4, dur - 0.1)), fade = 1 - E_.inQuad(k(lt, 1.6, dur));
    let s = defsC(Pf) + forest(Pf, t, { k: 0.8 + 0.6 * u, px: lt * 60, fog: 0.9, shafts: 0 });
    s += R(0, 0, 1080, 1920, '#02040a', OP(0.6 * u));
    s += G(wolfSide({ phase: (lt * 0.7) % 1, scale: H.lerp(1.3, 0.55, u), flip: -1, head: 0.2, t, glow: 1, dark: 0.55 * u }), `translate(${f1(H.lerp(500, 940, u))} ${f1(H.lerp(1600, 1330, u))})`, OP(fade));
    s += eyesPair(Pf, H.lerp(560, 920, u), H.lerp(1380, 1250, u) , 1.0 - 0.5 * u, '#ffd35a', 1 - k(lt, dur - 1.2, dur - 0.3), 30);
    s += vignette(Pf, 1);
    return s;
  });
}
