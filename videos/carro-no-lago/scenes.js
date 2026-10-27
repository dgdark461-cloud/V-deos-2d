/* scenes.js - cenas do vídeo "carro no lago". Cada cena: {start, fin, draw(t, lt, P)} -> string SVG.
   P = prefixo único de ids da cena. Tempos vêm de words.json (segmentos e palavras). */
function makeScenes(WORDS, S) {
  const E_ = H.ease;
  const tw = (w, n = 0, fb = 0) => { let i = -1, from = 0; for (let k = 0; k <= n; k++) { i = H.findWord(WORDS, w, from); if (i < 0) return fb; from = i + 1; } return WORDS[i].start; };
  const k = (t, a, b, e) => H.prog(t, a, b, e);
  const arrow = (x1, y1, x2, y2, col, w = 10, hd = 26) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    return L(x1, y1, x2 - Math.cos(a) * hd * 0.6, y2 - Math.sin(a) * hd * 0.6, col, w) +
      POLY([[x2, y2], [x2 - Math.cos(a - 0.5) * hd, y2 - Math.sin(a - 0.5) * hd], [x2 - Math.cos(a + 0.5) * hd, y2 - Math.sin(a + 0.5) * hd]], col);
  };
  const bigX = (cx, cy, sz, kk) => kk <= 0 ? '' :
    L(cx - sz * kk, cy - sz * kk, cx + sz * kk, cy + sz * kk, PAL.warn, 24, OP(Math.min(1, kk * 2))) + L(cx + sz * kk, cy - sz * kk, cx - sz * kk, cy + sz * kk, PAL.warn, 24, OP(Math.min(1, kk * 2)));
  const pop = (t, a, d = 0.35) => E_.outBack(k(t, a, a + d));
  const ringWaves = (cx, cy, t, a0, n, maxR, col, fade = 1) => {
    let s = '';
    for (let i = 0; i < n; i++) { const ph = (((t - a0) * 0.9 + i / n) % 1 + 1) % 1; s += C(cx, cy, 20 + ph * maxR, 'none', `stroke="${col}" stroke-width="${6 - ph * 4}" ${OP((1 - ph) * fade)}`); }
    return s;
  };
  const wcam = (t, o) => o;   // atalho semântico

  /* ----------------------------------------------------------------------- limites das cenas */
  const T0 = 0, T2 = S[1].start, T2b = 4.1, T3 = tw('abrisse', 0, 4.4), T3b = tw('afundando', 0, 5.2);
  const T4 = S[2].start, T5a = S[3].start, T5b = S[4].start, T5c = S[5].start, T6 = S[6].start, T7 = S[7].start;
  const T8 = S[9].start, T9 = S[10].start, T10a = S[12].start, T10b = tw('abafará', 0, 38) - 0.25, T11 = S[13].start;
  const T12 = S[15].start, T13a = S[17].start, T13b = S[19].start, T14 = S[20].start, T15 = S[21].start, T16 = S[22].start;
  const T17 = S[25].start, T18 = S[26].start, T19a = S[27].start, T19b = S[28].start, T20 = S[29].start, T21 = S[32].start;
  const T22 = S[34].start, T23 = S[36].start, T24 = S[38].start, END = S[40].end;

  const sc = [];
  const add = (start, fin, draw) => sc.push({ start, fin, draw });

  /* ======================================================================= 1. curva no escuro (vista de cima) */
  add(T0, 0, (t, lt, Pf) => {
    const rx = y => 520 + 600 * Math.pow(Math.max(0, 1 - y / 2000), 2);
    const pos = tt => {
      let x, y, a;
      if (tt < 1) { x = H.lerp(560, 530, tt); y = H.lerp(1380, 1320, tt); a = 0; }
      else if (tt < 2.2) { const u = E_.inQuad((tt - 1) / 1.2); x = H.lerp(530, 330, u); y = H.lerp(1320, 1150, u); a = H.lerp(0, -35, u); }
      else { const u = E_.inQuad(Math.min(1, (tt - 2.2) / 0.8)); x = H.lerp(330, 40, u); y = H.lerp(1150, 1000, u); a = H.lerp(-35, -100, u); }
      return [x, y, a];
    };
    const [cx, cy, ca] = pos(t);
    const shk = t > 2.1 && t < 2.7 ? 14 : 0;
    let s = defs(Pf) + `<linearGradient id="${Pf}bv" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff2b8" stop-opacity="0.55"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient>`;
    s += `<g transform="translate(${f1(H.noise(t * 50, 1) * shk)} ${f1(H.noise(t * 50, 2) * shk)})">`;
    s += R(0, 0, 1080, 1920, '#050a14');
    for (let i = 0; i < 9; i++) s += E(60 + H.hash(i) * 280, 1300 + H.hash(i + 9) * 560, 70 + H.hash(i + 3) * 90, 6, 'rgba(160,210,235,0.10)');   // brilho do lago lá embaixo
    let road = '', l = '', r = '';
    for (let y = -100; y <= 2000; y += 100) { l += (l ? ' L' : 'M') + f1(rx(y) - 230) + ',' + y; r = (r ? ' ' : '') + r; }
    const pts = []; for (let y = -100; y <= 2000; y += 100) pts.push([rx(y) - 230, y]);
    const pts2 = []; for (let y = 2000; y >= -100; y -= 100) pts2.push([rx(y) + 230, y]);
    s += POLY(pts.concat(pts2), '#1b212b');
    s += PL(pts, 'rgba(230,230,230,0.5)', 6) + PL(pts2.slice().reverse(), 'rgba(230,230,230,0.5)', 6);
    s += POLY(pts2.concat([[1200, -100], [1200, 2000]]).reverse(), '#0a121c', OP(0.9));
    for (let i = -2; i < 18; i++) { const yy = ((i * 150 + t * 800) % 2400) - 200, a = rx(yy), b = rx(yy + 70); s += L(a, yy, b, yy + 70, '#d8c36a', 9, OP(0.8)); }
    // guard-rail
    const railBroken = t > 2.15;
    for (let y = -100; y < 2000; y += 100) {
      if (railBroken && y > 1080 && y < 1330) continue;
      s += L(rx(y) - 250, y, rx(y + 100) - 250, y + 100, PAL.steel, 10);
    }
    for (let i = -2; i < 18; i++) { const yy = ((i * 130 + t * 800) % 2200) - 100; if (railBroken && yy > 1080 && yy < 1330) continue; s += L(rx(yy) - 250, yy, rx(yy) - 275, yy, '#7e8ea0', 8); }
    if (railBroken) for (let i = 0; i < 7; i++) { const u = (t - 2.15), x = rx(1200) - 250 - u * (140 + i * 60), y = 1130 + i * 30 + u * u * 160; s += L(x, y, x + 50, y + 8, PAL.steel, 9, `transform="rotate(${f1(u * 300 + i * 40)} ${f1(x)} ${f1(y)})" ${OP(1 - u)}`); }
    // marcas de pneu
    if (t > 0.9) {
      let a1 = [], a2 = [];
      for (let u = 0; u <= 1.2; u += 0.06) { const tt = t - u; if (tt < 0.9) break; const [x, y, a] = pos(tt), r = a * Math.PI / 180; a1.push([x - Math.cos(r) * 46 + Math.sin(r) * 40, y - Math.sin(r) * 46 - Math.cos(r) * -40]); a2.push([x + Math.cos(r) * 46 + Math.sin(r) * 40, y + Math.sin(r) * 46 - Math.cos(r) * -40]); }
      if (a1.length > 1) s += PL(a1, 'rgba(0,0,0,0.65)', 12) + PL(a2, 'rgba(0,0,0,0.65)', 12);
    }
    // carro de cima
    let carS = POLY([[-34, -112], [34, -112], [190, -820], [-190, -820]], `url(#${Pf}bv)`, OP(0.9));
    carS += R(-64, -92, 16, 46, '#0b0e13', 'rx="5"') + R(48, -92, 16, 46, '#0b0e13', 'rx="5"') + R(-64, 50, 16, 46, '#0b0e13', 'rx="5"') + R(48, 50, 16, 46, '#0b0e13', 'rx="5"');
    carS += R(-56, -116, 112, 232, PAL.car, 'rx="36"') + R(-46, -56, 92, 112, '#7288a4', 'rx="24"') + P('M-42,-56 L42,-56 L36,-92 L-36,-92Z', '#0b121b') + P('M-40,58 L40,58 L34,84 L-34,84Z', '#0b121b');
    carS += C(-36, -112, 10, '#fff4c2') + C(36, -112, 10, '#fff4c2') + R(-48, 108, 28, 9, t > 1 ? '#ff6a55' : '#a02820', 'rx="4"') + R(20, 108, 28, 9, t > 1 ? '#ff6a55' : '#a02820', 'rx="4"');
    if (t > 1) carS += C(0, 118, 60, 'rgba(255,60,40,0.25)');
    s += G(carS, T(cx, cy, ca, 1.15));
    if (t > 2.1 && t < 2.5) for (let i = 0; i < 14; i++) { const a = H.hash(i + Math.floor(t * 30)) * 6.28, u = (t - 2.1) / 0.4; s += L(cx - 150 + Math.cos(a) * 30 * u, cy + Math.sin(a) * 30 * u, cx - 150 + Math.cos(a) * 110 * u, cy + Math.sin(a) * 110 * u, '#ffd45e', 4, OP(1 - u)); }
    s += '</g>' + vignette(Pf);
    return s;
  });

  /* ======================================================================= 2. queda do penhasco */
  add(T2, 0.05, (t, lt, Pf) => {
    const u = cl(lt / (T2b - T2)), carX = 330 + 600 * u, carY = 700 + 2600 * u * u, tilt = -6 + 66 * Math.pow(u, 1.4);
    const camX = 540 + (carX - 540) * 0.5, camY = carY + 260, z = 0.78;
    let s = defs(Pf) + R(0, 0, 1080, 1920, `url(#${Pf}sky)`) + stars(t, 70, 1080, 1500, 2) + moonDisc(Pf, 840, 330, 62, 1);
    s += `<g transform="translate(540 960) scale(${z}) translate(${f1(-camX)} ${f1(-camY)})">`;
    s += R(-1500, 3300, 4000, 1600, '#cfeaf5') + R(-1500, 3300, 4000, 40, '#ffffff', OP(0.5)) + E(900, 3330, 220, 14, 'rgba(255,255,255,0.7)') + E(900, 3380, 80, 10, 'rgba(255,255,255,0.4)');
    s += POLY([[-1500, 700], [300, 700], [292, 900], [330, 1200], [280, 1600], [340, 2100], [300, 2600], [350, 3000], [320, 3300], [-1500, 3300]], '#0b1420') +
      POLY([[300, 700], [292, 900], [330, 1200], [280, 1600], [340, 2100], [300, 2600], [350, 3000], [320, 3300], [360, 3300], [340, 3000], [390, 2600], [340, 2100], [380, 1600], [330, 1200], [350, 900], [340, 700]], '#1c2c40');
    s += R(-1500, 690, 1800, 20, '#222b38') + R(-1500, 706, 1800, 6, '#d8c36a', OP(0.5));
    for (let i = 0; i < 4; i++) s += L(60 - i * 140, 690, 60 - i * 140, 620, '#7e8ea0', 10) + L(60 - i * 140, 630, 200 - i * 140, 630, PAL.steel, 8);
    for (let i = 0; i < 10; i++) { const x = 600 + i * 180 + H.hash(i) * 40, y0 = camY - 1200 + ((i * 337 + t * 4000) % 2400); s += L(x - 200 + (carX - 540) * 0.2, y0, x - 200 + (carX - 540) * 0.2, y0 + 220, 'rgba(255,255,255,0.12)', 5); }
    s += G(carBody(Pf, { t, lights: 1, alex: { eye: 1, pupil: 0.6, mouth: 1, worry: 1, handA: [8, -250], sweat: 1 } }), T(carX, carY, tilt, 0.62));
    s += '</g>' + vignette(Pf);
    return s;
  });

  /* ======================================================================= 2b. impacto no gelo */
  add(T2b, 0.05, (t, lt, Pf) => {
    const fl = 1 - k(lt, 0, 0.18), sh = (1 - k(lt, 0, 0.35)) * 22;
    let s = defs(Pf) + `<g transform="translate(${f1(H.noise(t * 60, 1) * sh)} ${f1(H.noise(t * 60, 2) * sh)})">` + R(0, 0, 1080, 1920, `url(#${Pf}sky)`) + moonDisc(Pf, 220, 380, 56, 1);
    const iy = 1300;
    s += R(0, iy, 1080, 700, PAL.ice) + R(0, iy, 1080, 14, '#fff', OP(0.7));
    const k1 = E_.outQuad(k(lt, 0, 0.3));
    const imp = [560, iy + 20];
    for (let i = 0; i < 16; i++) { const a = i * 0.39 + 0.2, l = (60 + H.hash(i) * 380) * k1; s += L(imp[0], imp[1], imp[0] + Math.cos(a) * l * 1.6, imp[1] + Math.abs(Math.sin(a)) * l * 0.5 + 6, '#35586e', 5); }
    s += E(imp[0], imp[1] + 10, 260 * k1, 40 * k1, '#0a2433');
    const down = 60 * E_.outQuad(k(lt, 0, 0.3));
    s += G(carBody(Pf, { t, alex: { eye: 0.15, mouth: 0, worry: 0, lean: 30, tilt: 30 } }), T(imp[0] - 60, iy + 30 + down, 62, 0.78));
    for (let i = 0; i < 26; i++) { const a = -0.3 - H.hash(i) * 2.5, v = 300 + H.hash(i + 5) * 700, u = lt; const x = imp[0] + Math.cos(a) * v * u, y = imp[1] + Math.sin(a) * v * u + 1400 * u * u; s += POLY([[0, -14], [12, 8], [-10, 10]], i % 2 ? '#e9f8ff' : '#7fc6e0', `transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(u * 500 * (H.hash(i) - 0.5) * 3)})" ${OP(1 - u * 1.4)}`); }
    for (let i = 0; i < 20; i++) { const a = -0.4 - H.hash(i + 20) * 2.3, v = 200 + H.hash(i + 25) * 500, u = lt; s += C(imp[0] + Math.cos(a) * v * u, imp[1] + Math.sin(a) * v * u + 1100 * u * u, 8 + H.hash(i) * 10, 'rgba(180,230,255,0.8)', OP(1 - u * 1.5)); }
    s += '</g>' + R(0, 0, 1080, 1920, '#fff', OP(fl * 0.95)) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 3. olhos se abrindo na água escura */
  add(T3, 0.1, (t, lt, Pf) => {
    const open = E_.inOutQuad(k(lt, 0.45, 1.0)), zoom = H.lerp(2.35, 1.9, E_.outCubic(k(lt, 0, 1.6)));
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#03111a') + R(0, 0, 1080, 1920, `url(#${Pf}wat)`, OP(0.5));
    s += `<g transform="translate(540 930) scale(${zoom.toFixed(3)})">` + alexFace({ t, eye: open * 0.95, pupil: 0.45 + 0.5 * open, worry: 0.7, mouth: 0.1, cold: 0.45, tremble: 2.5, tilt: 4 * Math.sin(lt * 2), looky: 6 }) + '</g>';
    s += bubbles(t, 540, 1150, 500, 14, 900, 5, 0.4, 14) + R(0, 0, 1080, 1920, '#02121c', OP(0.45 * (1 - open) + 0.25));
    s += R(0, 0, 1080, 1920, '#000', OP(0.4 * (1 - E_.outQuad(k(lt, 0.3, 1.1))))) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 3b. carro afundando no buraco do gelo */
  add(T3b, 0.2, (t, lt, Pf) => {
    const u = E_.inOutQuad(k(lt, 0, T7 > 0 ? (T4 - T3b) : 1.6));
    return carWorld(Pf, t, { zoom: 0.72, fx: -20, fy: -230, ice: true, holeX: 540, holeW: 420, outerH: 120 + 230 * u, tilt: 6 + 12 * u, shake: 3, shaft: 0.5,
      car: { innerH: 30 * u, lights: 0.8 * (1 - u), alex: { eye: 0.5, worry: 0.8, mouth: 0.2, cold: 0.3, tilt: 8 } } }) +
      bubbles(t, 540, 1050, 520, 10, 300, 8, 0.5, 12) + vignette(Pf);
  });

  /* ======================================================================= 4. água subindo pelos pés, porta travada */
  add(T4, 0.2, (t, lt, Pf) => {
    const zk = E_.inOutQuad(k(lt, 0, T5a - T4)), trav = tw('travada', 0, 10.8);
    const glow = t > trav - 0.2 ? 1 : 0;
    return carWorld(Pf, t, { zoom: H.lerp(1.9, 2.4, zk), fx: H.lerp(-120, -140, zk), fy: -190, outerH: 345, shake: 1.5,
      car: { innerH: H.lerp(30, 175, E_.inQuad(k(lt, 0, 3.9))), lockGlow: glow, handleGlow: glow * (0.5 + 0.5 * Math.sin(t * 12)), dashOn: 1, alex: { eye: 1, worry: 0.85, mouth: 0.25, cold: 0.2, tremble: 1.2, handA: [14, -246] } } }) + vignette(Pf);
  });

  /* ======================================================================= 5a. "não entre em pânico" */
  add(T5a, 0.15, (t, lt, Pf) => {
    const br = Math.sin(lt * 3.2), eyes = 0.95 - 0.8 * E_.inOutQuad(k(lt, 0.3, 0.9)) + 0.6 * k(lt, 1.2, 1.5);
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#04121c');
    s += `<g transform="translate(540 ${f1(920 + br * 8)}) scale(${(2.0 + br * 0.03).toFixed(3)})">` + alexFace({ t, eye: Math.max(0.05, eyes), pupil: 0.8, worry: 0.3, mouth: 0.05, cold: 0.35, brow: 0.2 }) + '</g>';
    const wy = H.lerp(1330, 1200, lt / (T5b - T5a));
    s += `<path d="${wavePath(-20, 1100, wy, 8, t, 0.015)}" fill="rgba(14,74,100,0.82)"/><path d="${waveLine(-20, 1100, wy, 8, t, 0.015)}" stroke="rgba(170,235,250,0.9)" stroke-width="5" fill="none"/>`;
    s += R(0, 0, 1080, 1920, PAL.warn, OP(0.10 * Math.max(0, Math.sin(lt * 7)))) + bubbles(t, 540, 1180, 300, 6, 600, 2) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 5b. tenta forçar a porta */
  add(T5b, 0.1, (t, lt, Pf) => {
    const inut = tw('inútil', 0, 14.2), kx = pop(t, inut - 0.1);
    const sh = 3 + 3 * Math.sin(lt * 40);
    return carWorld(Pf, t, { zoom: 2.2, fx: -110, fy: -190, outerH: 345, shake: 2,
      car: { innerH: 185 + lt * 20, handleGlow: 1, lockGlow: 1, alex: { eye: 0.8, worry: 1, mouth: 0.5, lean: 14, tremble: sh, cold: 0.25, handA: [-60, -170], pupil: 0.7 } },
      extraCar: bigX(-120, -140, 60, kx) }) + vignette(Pf);
  });

  /* ======================================================================= 5c. pressão da água / prensa de aço */
  add(T5c, 0.12, (t, lt, Pf) => {
    const pr = tw('prensa', 0, 16.2), pk = E_.inOutCubic(k(t, pr - 0.1, pr + 1.4));
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#04101a');
    s += R(0, 1190 - 20, 1080, 800, 'rgba(14,84,120,0.55)');
    const sq = 1 - 0.1 * pk;
    s += G(R(-330, -190, 660, 380, '#0f1925', `rx="26" stroke="${PAL.steel}" stroke-width="12"`) + C(-130, 20, 36, PAL.skin) + R(-190, 56, 120, 90, PAL.jacket, 'rx="30"') + L(-90, 80, 10, 150, PAL.jacket, 22) + R(80, 168, 200, 26, PAL.warn, 'rx="8"'), `translate(540 960) scale(1 ${sq.toFixed(3)})`);
    for (let i = 0; i < 9; i++) { const x = 190 + i * 87, ln = 190 + 40 * Math.sin(t * 6 + i); s += arrow(x, 1330 + ln - 190 + 190, x, 1180 + (i % 2) * 6, 'rgba(120,205,255,0.95)', 12, 30); }
    for (let i = 0; i < 9; i++) s += arrow(190 + i * 87, 1380, 190 + i * 87, 1190, 'rgba(120,205,255,0.35)', 10, 24);
    s += arrow(300, 905, 300, 790, 'rgba(255,255,255,0.0)', 1);
    const topY = H.lerp(420, 765, pk), botY = H.lerp(1560, 1155, pk);
    s += R(160, topY - 90, 760, 90, '#8d9db0', 'rx="14"') + R(160, topY - 90, 760, 18, '#c6d3e0', 'rx="9"') + R(480, topY - 420, 120, 340, '#6f7e90') +
      R(160, botY, 760, 90, '#8d9db0', 'rx="14"') + R(160, botY + 72, 760, 18, '#5d6b7c', 'rx="9"') + R(480, botY + 90, 120, 340, '#6f7e90');
    s += R(0, 0, 1080, 1920, PAL.warn, OP(0.14 * pk * Math.abs(Math.sin(lt * 9)))) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 6. armadilha mortal: carro afundando no lago */
  add(T6, 0.2, (t, lt, Pf) => {
    const tAl = tw('Alex', 0, 20.1), tImp = tw('impacto', 0, 21.1), tArm = tw('armadilha', 0, 18.1);
    const z = H.lerp(0.62, 1.55, E_.inOutCubic(k(t, tAl - 1.9, tAl + 0.3))), fx = H.lerp(0, -110, E_.inOutCubic(k(t, tAl - 1.9, tAl + 0.3))), fy = H.lerp(-210, -270, E_.inOutCubic(k(t, tAl - 1.9, tAl + 0.3)));
    let s = carWorld(Pf, t, { zoom: z, fx, fy, ice: true, holeX: 540, holeW: 420, outerH: 330 + 60 * k(lt, 0, 5.9), tilt: 8 + 8 * k(lt, 0, 5.9), shake: 2, shaft: 0.6,
      car: { innerH: 190, dashOn: 0.6, alex: { eye: 0.55, worry: 0.8, mouth: 0.15, cold: 0.3, tilt: 6, handA: [14, -246] } } });
    const jk = E_.inOutCubic(k(t, tArm, tArm + 1.2)), open = 75 * (1 - jk);
    let jaw = '';
    for (const side of [-1, 1]) {
      let inner = `<path d="M-380,0 A380,230 0 0 ${side > 0 ? 0 : 1} 380,0" fill="none" stroke="#9aa9bb" stroke-width="18"/>`;
      for (let i = 0; i < 11; i++) { const a = Math.PI * (i + 0.5) / 11, x = -Math.cos(a) * 380, y = side * -Math.sin(a) * 230; inner += POLY([[x - 17, y], [x + 17, y], [x * 0.96, y + side * -52]], '#c7d3e0'); }
      jaw += G(inner, `translate(540 1010) rotate(${f1(side * -open)})`);
    }
    s += jaw.replace(/<g /, '<g ') ;
    s += R(0, 0, 1080, 1920, '#fff', OP(Math.max(0, 0.9 - (t - tImp) * 6) * (t >= tImp ? 1 : 0))) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 7. acorda tonto */
  add(T7, 0.2, (t, lt, Pf) => {
    const wob = Math.exp(-lt * 0.25) * 22, afund = tw('afundar', 0, 25.2);
    const eye = 0.25 + 0.3 * Math.abs(Math.sin(lt * 1.7));
    return carWorld(Pf, t, { zoom: H.lerp(2.5, 1.9, E_.inOutQuad(k(lt, 0, 3.8))), fx: -105, fy: -255, rot: 3 * Math.sin(lt * 1.3), outerH: H.lerp(330, 430, k(lt, 0, 3.8)), shake: t > afund ? 4 : 1,
      car: { innerH: H.lerp(185, 215, k(lt, 0, 3.8)), alex: { eye, worry: 0.6, mouth: 0.1, cold: 0.3, tilt: wob * Math.sin(lt * 3.4), hx: wob * 0.4 * Math.sin(lt * 3.4), pupil: 0.6, look: 2 * Math.sin(lt * 4) } },
      extraCar: (() => { let st = ''; for (let i = 0; i < 4; i++) { const a = lt * 3 + i * 1.57; st += POLY(H.starPoints(-100 + Math.cos(a) * 70, -325 + Math.sin(a) * 26, 12, 5, 5), '#ffe27a', OP(Math.exp(-lt * 0.35))); } return st; })() }) + vignette(Pf);
  });

  /* ======================================================================= 8. água no peito, painel solta faíscas */
  add(T8, 0.2, (t, lt, Pf) => {
    const tF = tw('faíscas', 0, 29.8), tP = tw('pifar', 0, 30.8);
    const sp = t > tF && t < tP + 0.25 ? 1 : 0, dash = t < tF ? 1 : t < tP ? (Math.sin(t * 40) > 0 ? 1 : 0.2) : 0;
    return carWorld(Pf, t, { zoom: 2.2, fx: -50, fy: -235, outerH: 440, shake: sp ? 3 : 1, dark: t > tP + 0.1 ? 0.3 : 0,
      car: { innerH: H.lerp(205, 235, k(lt, 0, 4.7)), dashOn: dash, spark: sp, alex: { eye: 1, worry: 1, mouth: 0.4, cold: 0.45, tremble: 1.5, handA: [14, -246] } } }) + vignette(Pf);
  });

  /* ======================================================================= 9. esmurra os vidros, grita; "Erro fatal" */
  add(T9, 0.15, (t, lt, Pf) => {
    const per = 0.3, ph = (lt / per) % 1, hit = ph < 0.5 ? E_.outQuad(ph / 0.5) : 1 - E_.inQuad((ph - 0.5) / 0.5);
    const hand = [H.lerp(-30, 78, hit), H.lerp(-262, -300, hit)], erro = tw('Erro', 0, 33.9), kx = pop(t, erro, 0.3);
    const sh = (ph < 0.12) ? 5 : 1.5;
    return carWorld(Pf, t, { zoom: 2.3, fx: -40, fy: -275, outerH: 450, shake: sh, car: { innerH: 245 + 10 * lt, wcrack: Math.min(1, lt / 2.4), redTint: 0.12 + 0.1 * Math.sin(lt * 10), alex: { eye: 0.9, pupil: 0.55, worry: 1, mouth: 1, lean: 10 * hit, cold: 0.5, handA: hand, tremble: 1.5, sweat: 1 } },
      extraCar: ringWaves(-60, -305, t, T9, 3, 260, 'rgba(255,255,255,0.7)') }) +
      (t >= erro ? R(0, 0, 1080, 1920, PAL.warn, OP(0.35 * (1 - k(t, erro, erro + 0.3)))) + bigX(540, 960, 260, kx) : '') + vignette(Pf);
  });

  /* ======================================================================= 10a. oxigênio: calmo vs. desespero */
  add(T10a, 0.15, (t, lt, Pf) => {
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#050f18');
    const dur = T10b - T10a, calm = 1 - 0.28 * lt / dur, pan = Math.max(0.02, 1 - 0.56 * lt / dur * 1.0 - 0.0);
    const tank = (cx, lvl, col, face, ch) => {
      let g = R(cx - 120, 760, 240, 700, '#1a2633', `rx="110" stroke="${PAL.steel}" stroke-width="10"`) + R(cx - 38, 700, 76, 70, '#9aa9bb', 'rx="12"') + R(cx - 70, 676, 140, 34, '#c7d3e0', 'rx="10"');
      const hh = 620 * lvl;
      g += `<clipPath id="${Pf}t${ch}"><rect x="${cx - 112}" y="768" width="224" height="684" rx="104"/></clipPath><g clip-path="url(#${Pf}t${ch})">` + R(cx - 120, 1452 - hh, 240, hh + 10, col) + R(cx - 120, 1452 - hh, 240, 12, '#fff', OP(0.4)) + '</g>';
      g += G(alexFace(face), `translate(${cx} 520) scale(0.55)`);
      return g;
    };
    s += tank(300, calm, '#46d7a5', { t, eye: 0.15, mouth: 0.03, worry: 0, cold: 0.3 }, 'a');
    s += tank(780, pan, PAL.warn, { t, eye: 1, pupil: 0.5, mouth: 1, worry: 1, cold: 0.5, tremble: 3, sweat: 1 }, 'b');
    for (let i = 0; i < 2; i++) s += POLY([[740 + i * 50, 1520], [790 + i * 50, 1555], [740 + i * 50, 1590], [740 + i * 50, 1568], [760 + i * 50, 1555], [740 + i * 50, 1542]], PAL.warn, OP(0.5 + 0.5 * Math.sin(t * 8 - i)));
    s += POLY([[260, 1520], [310, 1555], [260, 1590], [260, 1568], [280, 1555], [260, 1542]], '#46d7a5');
    s += bubbles(t, 780, 760, 140, 8, 280, 4, 0.9, 10) + bubbles(t, 300, 760, 80, 2, 200, 6, 0.3, 8) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 10b. som abafado pela água */
  add(T10b, 0.2, (t, lt, Pf) => {
    const tSom = tw('som', 0, 39.9);
    let s = carWorld(Pf, t, { zoom: 0.62, fx: 0, fy: -420, ice: true, holeX: 1500, holeW: 200, outerH: 900, shake: 0.8, shaft: 0.2,
      car: { innerH: 330, dashOn: 0, alex: { eye: 0.9, worry: 1, mouth: 1, cold: 0.6, handA: [60, -300] } } });
    const cx = 540 + (-90 * 0.62), cy = 960 + (-300 + 420) * 0.62;
    for (let i = 0; i < 4; i++) { const ph = (((t - T10b) * 0.5 + i / 4) % 1 + 1) % 1, y = cy - ph * 520, w = 220 * (1 - ph * 0.5);
      s += `<path d="M${f1(cx - w)},${f1(y)} Q${f1(cx)},${f1(y - 50 * (1 - ph))} ${f1(cx + w)},${f1(y)}" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="${f1(7 * (1 - ph))}" ${OP((1 - ph) * (1 - ph) * 1.2)} stroke-dasharray="${f1(30 * (1 - ph) + 4)} 12"/>`; }
    const sp = k(t, tSom - 0.3, tSom + 0.3), sy = 330;
    s += G(R(-30, -24, 30, 48, '#e6f0f8', 'rx="6"') + POLY([[0, -24], [48, -64], [48, 64], [0, 24]], '#e6f0f8') + (sp > 0 ? L(-50, -70, 90, 70, PAL.warn, 14) + L(-50, 70, 90, -70, PAL.warn, 14) : ''), `translate(540 ${sy}) scale(${(1.6 * sp).toFixed(3)})`, OP(sp));
    return s + vignette(Pf);
  });

  /* ======================================================================= 11. tumba líquida + protocolo */
  add(T11, 0.25, (t, lt, Pf) => {
    const tP = tw('protocolo', 0, 43.1), cardk = E_.outBack(k(t, tP - 0.1, tP + 0.5)) * (1 - E_.inQuad(k(t, T12 - 0.6, T12)));
    let s = carWorld(Pf, t, { zoom: H.lerp(0.5, 0.42, k(lt, 0, 4.2)), fx: 0, fy: -520 + 30 * lt, ice: true, holeX: 540, holeW: 200, outerH: 1100, shaft: 1,
      car: { innerH: 400, dashOn: 0, alex: { eye: 0.8, worry: 0.9, mouth: 0.1, cold: 0.7 } }, dark: 0.35 });
    if (cardk > 0.01) {
      s += `<g transform="translate(540 ${f1(1160 - 0)}) scale(${cardk.toFixed(3)})">` + R(-330, -330, 660, 560, 'rgba(10,18,28,0.9)', `rx="34" stroke="${PAL.steel}" stroke-width="8"`) + R(-90, -372, 180, 70, '#c7d3e0', 'rx="22"');
      for (let i = 0; i < 3; i++) { const y = -220 + i * 150, on = t > tP + 0.5 + i * 0.5; s += C(-230, y, 46, 'none', `stroke="${on ? PAL.amber : '#5d6b7c'}" stroke-width="8"`); for (let j = 0; j <= i; j++) s += L(-246 + j * 16, y - 18, -246 + j * 16, y + 18, on ? PAL.amber : '#5d6b7c', 7); s += R(-140, y - 14, 330 - i * 50, 28, on ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.18)', 'rx="14"'); }
      s += '</g>';
    }
    return s + vignette(Pf);
  });

  /* ======================================================================= 12. regra 1: esqueça as portas, foque nos vidros */
  add(T12, 0.2, (t, lt, Pf) => {
    const tV = tw('vidros', 1, 47.3), tT = tw('teto', 0, 49), tD = tw('portas', 0, 46.4);
    const ou = H.lerp(330, 420, k(lt, 0, 3.9)), gk = k(t, tV - 0.1, tV + 0.3);
    return carWorld(Pf, t, { zoom: 1.35, fx: -30, fy: -230, outerH: ou, shake: 1.2,
      car: { innerH: H.lerp(220, 300, k(lt, 0, 3.9)), glowWindow: gk, alex: { eye: 1, worry: 0.8, mouth: 0.2, cold: 0.4, handA: [14, -246] } },
      extraCar: bigX(-95, -135, 70, pop(t, tD + 0.05)) + (gk > 0 ? arrow(-20, -470 - 10 * Math.sin(t * 8), -20, -410, '#6dff9a', 14, 34) : '') }) + vignette(Pf);
  });

  /* ======================================================================= 13a. vidro elétrico pifa */
  add(T13a, 0.15, (t, lt, Pf) => {
    const pif = tw('pifarem', 0, 50.9), press = (lt % 0.45) < 0.18, dead = t > pif - 0.2;
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#050d16');
    s += R(150, 560, 780, 840, '#18222f', `rx="40" stroke="${PAL.steel}" stroke-width="8"`) + R(190, 600, 700, 420, '#0a1018', 'rx="20"');
    s += R(210, H.lerp(660, 640, 0), 660, 320, 'rgba(150,215,235,0.18)') + L(210, 660, 870, 660, 'rgba(255,255,255,0.35)', 6);
    s += R(300, 1100, 480, 160, '#222f40', 'rx="26"') + R(360, 1130, 360, 100, press ? '#2d3b4e' : '#3b4b60', 'rx="18"');
    s += POLY([[540, 1150], [580, 1210], [500, 1210]], dead ? '#5a2a26' : '#d8e4f0') + POLY([[540, 1220], [580, 1160], [500, 1160]], 'none');
    s += C(540, press ? 1175 : 1250, 54, PAL.skin, OP(0.95)) + R(510, press ? 1210 : 1285, 60, 400, PAL.jacket, 'rx="28"');
    if (dead) s += sparks(540, 1165, t, 1, 14, 90) + bigX(540, 810, 90, pop(t, pif + 0.1, 0.3));
    else if (press) s += arrow(840, 760, 840, 700, '#6dff9a', 10, 26);
    return s + R(0, 0, 1080, 1920, PAL.warn, OP(dead ? 0.1 : 0)) + vignette(Pf);
  });

  /* ======================================================================= 13b. não quebre o para-brisa */
  add(T13b, 0.12, (t, lt, Pf) => {
    const per = 0.34, ph = (lt / per) % 1, hit = ph < 0.35 ? E_.outQuad(ph / 0.35) : 1 - E_.inOutQuad((ph - 0.35) / 0.65), tq = tw('quebrar', 0, 51.7);
    return carWorld(Pf, t, { zoom: 2.2, fx: -10, fy: -285, outerH: 460, shake: ph < 0.2 ? 4 : 1,
      car: { innerH: 310, wcrack: 0.25, alex: { eye: 0.7, worry: 1, mouth: 0.5, lean: 18 * hit, cold: 0.45, handA: [H.lerp(-20, 74, hit), H.lerp(-262, -305, hit)], tremble: 1.5 } },
      extraCar: bigX(78, -285, 50, pop(t, tq - 0.1)) }) + vignette(Pf);
  });

  /* ======================================================================= 14. vidro laminado */
  add(T14, 0.15, (t, lt, Pf) => {
    const per = 0.8, ph = (lt / per) % 1, hit = ph < 0.3 ? E_.inQuad(ph / 0.3) : 1 - E_.outQuad((ph - 0.3) / 0.7), tU = tw('ultrarresistente', 0, 54.8);
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#050d16');
    const y0 = 820, gk = k(t, tU, tU + 0.5);
    s += R(130, y0, 820, 120, 'rgba(160,215,235,0.55)', 'rx="10"') + R(130, y0 + 120, 820, 60, 'rgba(255,214,110,0.55)') + R(130, y0 + 180, 820, 120, 'rgba(160,215,235,0.55)', 'rx="10"');
    s += R(130, y0, 820, 10, '#fff', OP(0.4)) + R(130, y0 + 120, 820, 60, 'none', 'stroke="rgba(255,255,255,0.3)" stroke-width="3"');
    const cr = Math.min(1, lt / 1.5);
    for (let i = 0; i < 9; i++) { const a = Math.PI / 2 + (i - 4) * 0.34; s += L(540, y0 + 60, 540 + Math.cos(a) * 160 * cr, y0 + 60 + Math.sin(a) * 140 * cr * 0.65, '#fff', 3.5, `clip-path="url(#${Pf}top)"`); }
    s = s.replace('</defs>', `<clipPath id="${Pf}top"><rect x="130" y="${y0}" width="820" height="120"/></clipPath></defs>`);
    const hy = H.lerp(400, y0 - 40, hit);
    s += G(R(-60, -50, 120, 100, '#7e8ea0', 'rx="14"') + R(-16, -330, 32, 290, '#8a5a34', 'rx="12"'), `translate(540 ${f1(hy)}) rotate(${f1(-6 * (1 - hit))})`);
    s += `<path d="M130,${y0 + 310} Q540,${y0 + 310 + 30 * hit} 950,${y0 + 310}" stroke="#6dff9a" stroke-width="8" fill="none" ${OP(gk)}/>`;
    for (let i = 0; i < 5; i++) s += arrow(250 + i * 145, y0 + 420 + 10 * Math.sin(t * 9 + i), 250 + i * 145, y0 + 330, '#6dff9a', 9, 22);
    s += `<g ${OP(gk)}>` + P(`M540,1400 L700,1460 L700,1600 Q700,1700 540,1760 Q380,1700 380,1600 L380,1460Z`, 'rgba(109,255,154,0.25)', 'stroke="#6dff9a" stroke-width="10"') + '</g>';
    return s + vignette(Pf);
  });

  /* ======================================================================= 15. hastes do encosto: alavanca e estilhaça o vidro lateral */
  add(T15, 0.15, (t, lt, Pf) => {
    const tAl = tw('alavancar', 0, 59.2), tEs = tw('estilhaçar', 0, 60.1), tHa = tw('hastes', 0, 56.3);
    const pull = E_.outCubic(k(t, T15 + 0.3, tHa + 0.6)), mv = E_.inOutCubic(k(t, tHa + 0.7, tAl - 0.3));
    const base = [-176, -318];
    let hx = H.lerp(base[0], base[0] - 8, pull), hy = H.lerp(base[1], base[1] - 120, pull), hr = H.lerp(-14, -14, pull);
    hx = H.lerp(hx, -214, mv); hy = H.lerp(hy, -340, mv); hr = H.lerp(hr, -75, mv);
    if (t > tAl) hr += 6 * Math.sin((t - tAl) * 14);
    const crack = k(t, tAl, tEs - 0.05), shat = E_.outQuad(k(t, tEs, tEs + 0.7));
    const handA = [hx + 10, hy + 34];
    return carWorld(Pf, t, { zoom: 1.7, fx: -140, fy: -285, outerH: 520, shake: t > tEs && t < tEs + 0.4 ? 8 : 1.5,
      car: { innerH: 380, headrest: pull > 0.02 || true ? { x: hx, y: hy, rot: hr, glow: 0.5 * Math.min(1, pull) } : null, crack, shatter: shat > 0 ? shat : 0,
        alex: { eye: 0.9, worry: 0.9, mouth: 0.3, cold: 0.5, handA, lean: 6 * mv, tremble: 1 } } }) + vignette(Pf);
  });

  /* ======================================================================= 16. regra 3: cabine lota, pressão iguala, porta abre */
  add(T16, 0.2, (t, lt, Pf) => {
    const tIg = tw('igualar', 0, 66.4), tAb = tw('abrirá', 0, 69), fill = E_.inOutQuad(k(t, T16 + 0.5, tIg - 0.4)), eq = k(t, tIg - 0.2, tIg + 0.4), dop = E_.inOutCubic(k(t, tAb - 0.2, tAb + 1));
    let ex = '';
    for (let i = 0; i < 6; i++) { const x = -330 + i * 130, a = 0.4 + 0.6 * eq; ex += arrow(x, -560 + 20 * Math.sin(t * 5 + i), x, -420, `rgba(120,205,255,${a})`, 12, 28); ex += arrow(x, 120 - 20 * Math.sin(t * 5 + i), x, -20, `rgba(120,205,255,${a})`, 12, 28); }
    for (let i = 0; i < 5; i++) { const x = -250 + i * 120, y = -250; ex += arrow(x, y, x, y - 90 * fill, `rgba(120,205,255,${0.2 + 0.8 * eq})`, 10, 22); }
    return carWorld(Pf, t, { zoom: 1.3, fx: -10, fy: -250, outerH: 620, shake: 1,
      car: { innerH: H.lerp(300, 405, fill), doorOpen: dop, alex: { eye: 0.8, worry: 0.3, mouth: 0, cold: 0.6, handA: [14, -246] } },
      extraCar: ex + (eq > 0 ? C(-90, -230, 360, 'none', `stroke="#6dff9a" stroke-width="10" ${OP(eq * (0.5 + 0.5 * Math.sin(t * 8)))}`) : '') }) + vignette(Pf);
  });

  /* ======================================================================= 17. água no queixo, frio congela os músculos */
  add(T17, 0.15, (t, lt, Pf) => {
    const cold = H.lerp(0.55, 0.95, k(lt, 0, 2.5));
    let s = carWorld(Pf, t, { zoom: 2.4, fx: -95, fy: -300, outerH: 700, shake: 3, car: { innerH: 262 + 3 * Math.sin(t * 3), alex: { eye: 1, pupil: 0.7, worry: 1, mouth: 0.25 + 0.2 * Math.sin(t * 38), cold, tremble: 5, handA: [-40, -200] } } });
    for (const [cx, cy, sg] of [[0, 0, 1], [1080, 0, -1], [0, 1920, 1], [1080, 1920, -1]]) {
      let fr = ''; for (let i = 0; i < 9; i++) { const a = (i / 9) * 1.5, l = (140 + 160 * H.hash(i + 2)) * cold * k(lt, 0, 1.5); fr += L(cx, cy, cx + sg * Math.cos(a) * l, cy + (cy ? -1 : 1) * Math.sin(a) * l * 1.3, 'rgba(220,245,255,0.75)', 4 + 3 * H.hash(i)); }
      s += fr;
    }
    return s + R(0, 0, 1080, 1920, '#7fc4ff', OP(0.08 * cold)) + vignette(Pf);
  });

  /* ======================================================================= 18. arranca o encosto no último segundo */
  add(T18, 0.12, (t, lt, Pf) => {
    const tAr = tw('arrancar', 0, 72.5), dur = T19a - T18, rip = E_.outBack(k(t, tAr - 0.15, tAr + 0.45)), sw = 1 - lt / dur;
    const hx = H.lerp(-176, -232, rip), hy = H.lerp(-318, -400, rip), hr = H.lerp(-14, -70, rip);
    let s = carWorld(Pf, t, { zoom: 1.9, fx: -145, fy: -300, outerH: 700, shake: 3 + 5 * Math.exp(-Math.abs(t - tAr) * 4),
      car: { innerH: 345, headrest: { x: hx, y: hy, rot: hr, glow: rip * 0.6 }, alex: { eye: 0.7, worry: 1, mouth: 0.3, lean: -10 * rip, cold: 0.9, tremble: 3, handA: [hx + 10, hy + 34] } } });
    s += C(900, 230, 90, 'rgba(0,0,0,0.5)') + C(900, 230, 70, 'none', `stroke="#3a1d1d" stroke-width="16"`) +
      `<path d="${H.arcPath(900, 230, 70, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.02, sw))}" fill="none" stroke="${PAL.warn}" stroke-width="16" stroke-linecap="round" ${OP(0.6 + 0.4 * Math.sin(t * 14))}/>`;
    return s + vignette(Pf);
  });

  /* ======================================================================= 19a. o ar acaba */
  add(T19a, 0.1, (t, lt, Pf) => {
    const lastB = k(lt, 0.15, 0.55), eye = 1 - 0.7 * k(lt, 0.35, 0.58);
    let s = defs(Pf) + R(0, 0, 1080, 1920, '#031018');
    s += G(alexFace({ t, eye, pupil: 0.55 + 0.4 * k(lt, 0, 0.5), worry: 1, mouth: 0.02, cold: 0.95, tremble: 3, red: 1 }), `translate(540 930) scale(${(2.0 + 0.5 * lt).toFixed(3)})`);
    if (lt < 0.55) s += C(560, 1050 - 300 * lastB, 22 - 6 * lastB, 'rgba(210,245,255,0.35)', 'stroke="rgba(230,250,255,0.9)" stroke-width="3"');
    return s + R(0, 0, 1080, 1920, PAL.warn, OP(0.12 + 0.12 * Math.sin(lt * 20))) + vignette(Pf);
  });

  /* ======================================================================= 19b. carro toca o fundo e levanta lama */
  add(T19b, 0.12, (t, lt, Pf) => {
    const dur = T20 - T19b, tl = 1.1, bed = H.lerp(520, 0, E_.inQuad(k(lt, 0, tl))), land = k(lt, tl, tl + 0.2) > 0;
    const by = 1000 + bed, mk = k(lt, tl, dur);
    let mud = '';
    if (land) for (let i = 0; i < 9; i++) { const sg = i % 2 ? 1 : -1, r = 60 + 260 * mk * (0.5 + H.hash(i)); mud += E(540 + sg * (80 + 380 * mk * H.hash(i + 3)), by - 20 - 90 * mk * H.hash(i + 6), r, r * 0.5, 'rgba(105,92,70,0.45)', OP(1 - mk * 0.7)); }
    return carWorld(Pf, t, { zoom: 0.8, fx: 0, fy: -170, outerH: 1500, bed, tilt: land ? 0 : 4, shake: land && lt < tl + 0.4 ? 10 : 0.5, dark: 0.25, shaft: 0.1,
      car: { innerH: 410, dashOn: 0, alex: { eye: 0.25, worry: 1, mouth: 0, cold: 1, tilt: 12, handA: [14, -246] } }, extra: mud }) + vignette(Pf);
  });

  /* ======================================================================= 20. breu absoluto: finca o metal, vidro estilhaça */
  add(T20, 0.2, (t, lt, Pf) => {
    const tFi = tw('finca', 0, 77.8), tEs = tw('estilhaça', 0, 79.2), crack = k(t, tFi, tEs), shat = E_.outQuad(k(t, tEs, tEs + 0.8));
    const hx = -224 + 4 * Math.sin(t * 25) * (t > tFi ? 1 : 0), hy = -352, hr = -80;
    let s = carWorld(Pf, t, { zoom: 1.7, fx: -170, fy: -300, outerH: 1500, bed: 0, shake: 1 + (t > tEs && t < tEs + 0.3 ? 9 : 0),
      car: { innerH: 410, dashOn: 0, crack, shatter: shat, headrest: { x: hx, y: hy, rot: hr, glow: 0.3 }, alex: { eye: 0.8, worry: 1, mouth: 0, cold: 1, lean: 8, handA: [hx + 10, hy + 34], tremble: 2 } } });
    s = s.replace('</g><rect', '</g><rect');
    s += `<defs><radialGradient id="${Pf}dk" cx="0.5" cy="0.5" r="0.55"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.55" stop-color="#000" stop-opacity="0.93"/><stop offset="1" stop-color="#000" stop-opacity="1"/></radialGradient></defs>` + R(0, 0, 1080, 1920, `url(#${Pf}dk)`);
    if (t > tEs) { const u = t - tEs; for (let i = 0; i < 3; i++) s += C(500, 800, 80 + (u * 700 + i * 120) % 700, 'none', `stroke="rgba(150,200,230,0.4)" stroke-width="${14 - i * 3}" ${OP(Math.max(0, 1 - u * 1.2))}`); }
    return s;
  });

  /* ======================================================================= 21. a água invade com violência */
  add(T21, 0.1, (t, lt, Pf) => {
    const u = E_.outCubic(k(lt, 0, 1.2)), strk = (() => { let q = ''; for (let i = 0; i < 26; i++) { const ph = ((lt * 2.2 + H.hash(i)) % 1), x = -230 + 300 * ph + H.hash(i + 4) * 60, y = -360 + 170 * H.hash(i + 7) + 120 * ph; q += L(x, y, x + 90, y + 36, 'rgba(190,240,255,0.8)', 5 + 5 * H.hash(i + 2), OP(1 - ph)); } return q; })();
    return carWorld(Pf, t, { zoom: 1.5, fx: -100, fy: -260, outerH: 1500, bed: 0, shake: 10 * (1 - u) + 3, rot: -3 * u,
      car: { innerH: H.lerp(250, 405, u), dashOn: 0, shatter: 1, alex: { eye: 0.9, pupil: 0.5, worry: 1, mouth: 1, lean: -45 * u, tilt: -30 * u, cold: 1, handA: [-30 + 40 * Math.sin(lt * 12), -300 + 30 * Math.cos(lt * 12)], tremble: 3 } },
      extraCar: strk }) + bubbles(t, 540, 900, 500, 14, 600, 6, 0.9, 10) + vignette(Pf);
  });

  /* ======================================================================= 22. nada contra a correnteza rumo à luz fraca da lua */
  add(T22, 0.2, (t, lt, Pf) => {
    const dur = T23 - T22, u = lt / dur, tLua = tw('lua', 0, 87.1), glow = E_.inQuad(k(t, T22 + 1.5, T23 + 0.2));
    let s = defs(Pf) + R(0, 0, 1080, 1920, `url(#${Pf}wat)`, 'transform="translate(0 -1900) scale(1 2)"') + R(0, 0, 1080, 1920, '#020b12', OP(0.65));
    s += C(540, -80, 900 * (0.5 + 0.5 * glow), `url(#${Pf}glow)`, OP(0.15 + 0.85 * glow));
    for (let i = 0; i < 22; i++) { const ph = ((lt * 0.9 + H.hash(i)) % 1), x = H.hash(i + 2) * 1080, y = 1900 - ph * 2000; s += L(x, y, x + 6, y + 80 + 80 * H.hash(i + 5), 'rgba(160,210,230,0.28)', 4); }
    const cy = H.lerp(1000, 2200, E_.inQuad(u * 1.05)); s += G(carBody(Pf, { t, hideAlex: true, dashOn: 0, shatter: 1, innerH: 410 }), T(560, cy, 8, 0.5), OP(1 - u * 0.8));
    const sy = H.lerp(1250, 760, E_.outQuad(u)) + 16 * Math.sin(t * 7), sx = 540 + 45 * Math.sin(t * 3.2);
    s += G(alexSwim({ ph: t * 8, t, eye: 1, pupil: 0.6, worry: 1, mouth: 0.2, cold: 0.9 }), T(sx, sy, -78 + 6 * Math.sin(t * 6), 1.2));
    s += bubbles(t, sx, sy - 60, 120, 9, 500, 11, 0.7, 10);
    s += `<g ${OP(Math.max(0, 1 - Math.abs(t - tLua) * 0))}></g>` + vignette(Pf);
    return s;
  });

  /* ======================================================================= 23. "emerge à tona": luz, tosse, sugando ar */
  add(T23, 0.15, (t, lt, Pf) => {
    const gasp = Math.abs(Math.sin(lt * 5.5)), flash = 1 - k(lt, 0, 0.5);
    let s = defs(Pf) + R(0, 0, 1080, 1920, `url(#${Pf}sky)`) + C(540, 220, 1100, `url(#${Pf}glow)`, OP(0.9)) + R(0, 0, 1080, 1920, '#a7dff0', OP(0.35));
    s += G(alexFace({ t, eye: 0.35, pupil: 0.8, worry: 0.9, mouth: 0.35 + 0.65 * gasp, cold: 0.9, tremble: 2.5, tilt: 4 * Math.sin(lt * 5), red: 0.6, sweat: 1 }), `translate(540 1000) scale(2.0)`);
    for (let i = 0; i < 22; i++) { const a = H.hash(i + 2) * 6.28, d = 280 + 380 * ((lt * 1.2 + H.hash(i)) % 1); s += C(540 + Math.cos(a) * d, 1000 + Math.sin(a) * d * 0.9, 6 + 8 * H.hash(i + 9), 'rgba(220,248,255,0.85)', OP(0.8)); }
    s += R(0, 0, 1080, 1920, '#fff', OP(flash * 0.8)) + vignette(Pf);
    return s;
  });

  /* ======================================================================= 24. sob uma espessa camada de gelo */
  add(T24, 0.15, (t, lt, Pf) => {
    const tG = tw('gelo', 0, 92.8), pull = E_.inOutCubic(k(t, T24 + 0.2, tG + 0.4)), z = H.lerp(2.4, 0.95, pull), fade = k(t, END - 0.6, END);
    const lensEnd = t > T24 + 2.8, tFin = S[40].start;
    let s = defs(Pf);
    s += `<g transform="translate(540 960) scale(${z.toFixed(3)}) translate(-540 ${f1(-H.lerp(700, 960, pull))})">`;
    s += R(-800, -1200, 2700, 3600, `url(#${Pf}sky)`) + moonDisc(Pf, 820, 130, 62, 1) + stars(t, 40, 1080, 300, 6);
    s += R(-800, 330, 2700, 330, PAL.ice) + R(-800, 330, 2700, 26, '#fff', OP(0.7)) + R(-800, 640, 2700, 24, PAL.iceDark);
    for (let i = 0; i < 9; i++) s += L(60 + i * 120, 345, 20 + i * 126 + 30 * H.hash(i), 650, '#fff', 3, OP(0.25));
    s += R(-800, 660, 2700, 2400, `url(#${Pf}wat)`, OP(0.96)) + R(-800, 660, 2700, 2400, '#020a10', OP(0.7));
    s += POLY([[110, 656], [90, 800], [30, 1400], [260, 1400], [200, 800], [180, 656]], 'rgba(170,235,255,1)', OP(0.07));
    s += R(-60, 330, 180, 330, '#7fc0e0', OP(0)) + POLY([[-60, 330], [60, 330], [120, 660], [-110, 660]], '#04141f') + R(-60, 330, 120, 14, '#bfe9f6', OP(0.3));
    const cxo = 380 + 0;
    s += G(carBody(Pf, { t, hideAlex: true, dashOn: 0, shatter: 1, innerH: 410 }), T(190, 1700, 0, 0.45), OP(0.9));
    s += L(210, 1560, 480, 740, 'rgba(255,255,255,0.35)', 5, 'stroke-dasharray="6 16"');
    const ax = 540, ay = 740 + 8 * Math.sin(t * 2);
    s += G(alexSwim({ ph: t * 5, t, eye: 1, pupil: 0.5, worry: 1, mouth: 0.4, cold: 1, armAmp: 0.3, kick: 0.5 }), T(ax, ay + 30, -90, 1.1));
    s += L(ax - 40, 664, ax - 40, 700, PAL.skin, 22) + L(ax + 50, 664, ax + 50, 700, PAL.skin, 22);
    s += E(ax, 678, 120, 12, 'rgba(210,245,255,0.55)') + E(ax + 140, 690, 70, 8, 'rgba(210,245,255,0.45)') + E(ax - 170, 686, 60, 7, 'rgba(210,245,255,0.4)');
    const bump = (t - T24) % 0.5 < 0.12 ? 1 : 0; s += E(ax, 666, 160 + 24 * bump, 18, 'none', `stroke="rgba(255,255,255,0.7)" stroke-width="5" ${OP(bump)}`);
    s += bubbles(t, ax, 700, 160, 8, 120, 3, 0.8, 9);
    s += '</g>';
    if (t > tFin) { const u = k(t, tFin, tFin + 0.8); s += R(0, 0, 1080, 1920, '#020a10', OP(u * 0.85)) + G(alexFace({ t, eye: 1, pupil: 0.45, worry: 1, mouth: 0.05, cold: 1, tremble: 2, red: 1, brow: 0.6 }), `translate(540 1060) scale(${(1.9 + 0.3 * u).toFixed(3)})`, OP(u)) + R(0, 0, 1080, 300, PAL.ice, OP(u * 0.9)) + R(0, 280, 1080, 30, '#fff', OP(u * 0.5)); s += bubbles(t, 540, 1160, 240, 5, 380, 12, 0.35, 10); }
    s += vignette(Pf) + R(0, 0, 1080, 1920, '#000', OP(fade));
    return s;
  });

  return { scenes: sc, rules: [S[15].start, S[17].start, S[22].start], hudEnd: S[24].end, END };
}

/** HUD: 3 marcas de regra (sem texto), acende uma por regra */
function hudSVG(t, rules, endT) {
  const a = k_(t, rules[0] - 0.1, rules[0] + 0.3) * (1 - k_(t, endT - 0.6, endT));
  if (a <= 0.01) return '';
  let s = '';
  for (let i = 0; i < 3; i++) {
    const on = t >= rules[i], cur = on && (i === 2 || t < rules[i + 1]), done = on && !cur;
    const pop = on ? H.ease.outBack(k_(t, rules[i], rules[i] + 0.35)) : 0, col = cur ? PAL.amber : done ? '#6dff9a' : '#5d6b7c';
    let g = C(0, 0, 50, 'rgba(5,12,20,0.78)', `stroke="${col}" stroke-width="8"`);
    for (let j = 0; j <= i; j++) g += L((j - i / 2) * 16, -18, (j - i / 2) * 16, 18, col, 7);
    s += G(g, `translate(${540 + (i - 1) * 140} 150) scale(${(0.8 + 0.3 * pop + (cur ? 0.08 * Math.sin(t * 6) : 0)).toFixed(3)})`);
  }
  return `<g ${OP(a)}>${s}</g>`;
}
function k_(t, a, b) { return H.prog(t, a, b); }
