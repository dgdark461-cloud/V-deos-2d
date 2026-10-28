/* scenes_a.js - 0 a ~48 s: despertar, celular, 8 bilhões, batida, segunda-feira, cidade vazia, estação, 3h12. */
const DK = '#05080e';
const faceAt = (Pf, o, x, y, sc) => X(Pf, G(arthurFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
const fmtBig = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function questionMarks(t, cx, cy, r, n, col = '#e8f2ff') {
  let s = '';
  for (let i = 0; i < n; i++) { const a = t * 1.4 + i * 6.283 / n; s += TX(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, '?', 90 + 40 * Math.sin(t * 3 + i), col, `opacity="0.85" transform="rotate(${f1(Math.sin(a) * 20)} ${f1(cx + Math.cos(a) * r)} ${f1(cy + Math.sin(a) * r * 0.6)})"`); }
  return s;
}
function handObj(x, y, rot, sc, col = PAL.skin, sleeve = PAL.hood) {
  let s = PL([[0, 520], [0, 120]], sleeve, 120) + R(-56, 90, 112, 60, sleeve, 'rx="20"');
  s += E(0, 40, 56, 76, col) + E(-48, 20, 16, 50, col, 'transform="rotate(14 -48 20)"') + E(-20, -34, 16, 54, col) + E(16, -36, 16, 58, col) + E(48, -20, 15, 50, col, 'transform="rotate(-10 48 -20)"') + E(72, 46, 14, 44, col, 'transform="rotate(-50 72 46)"');
  return G(s, `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sc.toFixed(3)})`);
}
function speedLines(t, n, col = 'rgba(255,255,255,0.35)', dir = 1) {
  let s = '';
  for (let i = 0; i < n; i++) { const y = hz(i, 5) * 1920, x = ((hz(i, 6) * 1600 - t * 2600 * dir * (0.6 + hz(i, 7))) % 1600 + 1600) % 1600 - 260, l = 160 + hz(i, 8) * 320; s += L(x, y, x + l, y, col, 3 + 4 * hz(i, 9)); }
  return s;
}

function partA(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start;

  /* 0. ACORDA: close extremo no rosto, olhos arregalando */
  add(0, 0.001, (t, lt, Pf) => {
    const o = E_.outBack(k(lt, 0.0, 0.3)), pul = 0.5 + 0.5 * Math.sin(t * 16);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0710') + glow(Pf, 'R', 540, 760, 1100, 0.35 + 0.35 * pul);
    s += camG(t, 540, 960, 1 + 0.18 * lt, 0, 7 * Math.exp(-lt * 2) + 2, faceAt(Pf, { t, eye: H.lerp(0.25, 1, o), pupil: H.lerp(1.2, 0.5, o), looky: -4, worry: 1, mouth: 0.35 * o, sweat: 1, tremble: 3, mess: 1, beard: 0.35, dark: 0.7, tilt: 3 * Math.sin(t * 9) }, 540, 980, 2.3));
    s += flash('#fff', 0.4 * Math.exp(-lt * 14)) + flash('#ff2a2a', 0.12 * pul) + vignette(Pf, 1) + grain(t, 0.08);
    return s;
  });

  /* 1. pega o celular: mão agarra o aparelho */
  add(sg(1), 0.02, (t, lt, Pf) => {
    const u = E_.outCubic(k(lt, 0.0, 0.5)), v = E_.inOutCubic(k(lt, 0.45, 1.0));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0c12') + R(0, 1300, 1080, 620, '#2a211c') + glow(Pf, 'B', 420, 1140, 640, 0.35 * (1 - v));
    const px = H.lerp(420, 540, v), py = H.lerp(1180, 900, v), ps = H.lerp(1.0, 2.2, v);
    s += G(phoneObj(Pf, { screen: 'lock', t, glow: 1, time: '08:47' }), `translate(${f1(px)} ${f1(py)}) scale(${ps.toFixed(3)}) rotate(${f1(-10 * (1 - v))})`);
    s += handObj(H.lerp(1250, px + 150 * (1 - v), u), H.lerp(1700, py + 60, u) + 200 * v * 0, H.lerp(60, 36, u) - 20 * v, 1.6 + 0.5 * v);
    s += vignette(Pf, 1);
    return camG(t, 540, 1100, 1 + 0.1 * lt, 0, 4 * Math.exp(-lt * 3), s);
  });

  /* 2. celular: lock -> chat vazio de resposta */
  add(sg(1) + 1.0, 0.02, (t, lt, Pf) => {
    const ch = lt > 0.85, a = E_.outBack(k(lt, 0, 0.35));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, DK) + glow(Pf, 'B', 540, 960, 1000, 0.3);
    s += G(phoneObj(Pf, { screen: ch ? 'chat' : 'lock', t: lt - 0.85, time: '08:47', rows: 6 }), `translate(540 ${f1(960 + 20 * Math.sin(t * 2))}) scale(${(2.55 * a).toFixed(3)})`);
    if (ch) s += bigX(540, 960, 160, E_.outBack(k(lt, 1.1, 1.4)), PAL.red, 30);
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 3, s);
  });

  /* 3. oito bilhões desapareceram: globo apagando + contador */
  add(sg(2), 0.03, (t, lt, Pf) => {
    const dur = sg(3) - sg(2), p = E_.inOutCubic(k(t, sg(2) + 0.5, sg(3) - 0.2)), cx = 540, cy = 800, r = 340;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#03060c');
    s += `<defs><radialGradient id="${Pf}gb" cx="0.38" cy="0.35" r="0.8"><stop offset="0" stop-color="#2d6fa6"/><stop offset="0.6" stop-color="#123a63"/><stop offset="1" stop-color="#06162c"/></radialGradient><clipPath id="${Pf}gcl"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
    s += glow(Pf, 'B', cx, cy, 560, 0.35) + C(cx, cy, r, `url(#${Pf}gb)`);
    let inner = '';
    const cont = [[-150, -150, 120, 70], [-30, -60, 100, 130], [90, -110, 160, 80], [150, 40, 70, 60], [-220, 70, 90, 60]];
    for (const q of cont) inner += E(cx + q[0] + t * 8 % 60 - 30, cy + q[1], q[2], q[3], '#2f6b49', OP(0.8));
    for (let i = 0; i < 170; i++) {
      const a = hz(i, 3) * 6.283, rr = r * Math.sqrt(hz(i, 4)) * 0.96, off = 0.1 + 0.85 * hz(i, 5);
      const alive = off > p ? 1 : 0, fl = (off > p - 0.06 && off < p + 0.02) ? 2.2 : 1;
      if (alive || fl > 1) inner += C(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3.2 * fl, hz(i, 6) > 0.5 ? '#ffd98a' : '#fff3c4', OP(alive ? 0.95 : 0.7));
    }
    s += `<g clip-path="url(#${Pf}gcl)">${inner}</g>` + C(cx, cy, r, 'none', 'stroke="rgba(150,210,255,0.45)" stroke-width="6"');
    s += R(0, 0, 1080, 1920, '#000', OP(0.0)) + C(cx, cy, r, `rgba(0,0,0,${(0.5 * p).toFixed(2)})`);
    const v = 8000000000 * (1 - p);
    s += TX(540, 1400, fmtBig(v), 118, p > 0.95 ? PAL.red : '#f3f8ff', `opacity="${E_.outCubic(k(lt, 0.0, 0.3)).toFixed(2)}"`);
    s += vignette(Pf, 1) + flash(PAL.red, 0.35 * Math.exp(-(t - (sg(3) - 0.35)) * 10) * (t > sg(3) - 0.35 ? 1 : 0));
    return camG(t, 540, 900, 1.0 + 0.2 * p, 0, 1 + 3 * p, s);
  });

  /* 4. só você ficou: ponto de luz -> Arthur minúsculo no vazio */
  add(sg(3), 0.02, (t, lt, Pf) => {
    const dur = sg(4) - sg(3), z = H.lerp(4.2, 1.0, E_.inOutCubic(k(lt, 0.15, dur)));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#02040a');
    let w = POLY([[430, 0], [650, 0], [1100, 1500], [-20, 1500]], 'rgba(190,225,255,0.14)') + E(540, 1500, 520, 64, 'rgba(190,225,255,0.2)') + E(540, 1500, 360, 36, 'rgba(0,0,0,0.5)');
    w += G(arthurFig({ scale: 0.55, scared: 1, beard: 0.3, look: 0, arms: [10, 10, -10, -10] }), 'translate(540 1500)');
    w += R(-600, 1500, 2400, 900, '#05080e', OP(0.5));
    s += camG(t, 540, 1480, z, 0, 2.5, w) + vignette(Pf, 1) + flash('#fff', 0.5 * Math.exp(-lt * 14));
    return s;
  });

  /* 5a. a porta: empurra, sombra sob a porta */
  add(sg(4), 0.03, (t, lt, Pf) => {
    const tB = tw('bate', 0, 8.8), dur = tB - sg(4), z = H.lerp(1.0, 1.28, E_.inOutQuad(k(lt, 0, dur))), sh = E_.outCubic(k(lt, 0.9, 1.5));
    let s = defsC(Pf) + doorView(Pf, t, {});
    s += E(540 - 90 + 20 * Math.sin(t * 1.5), 1522, 70 * sh, 10, 'rgba(0,0,0,0.9)', OP(sh)) + E(540 + 60, 1522, 60 * sh, 9, 'rgba(0,0,0,0.9)', OP(sh));
    s += R(0, 0, 1080, 1920, '#000', OP(0.22)) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 940, z, 0, 1.5, s);
  });

  /* 5b. toc toc toc: batidas na porta */
  add(tw('bate', 0, 8.8) - 0.15, 0.02, (t, lt, Pf) => {
    const t0 = tw('bate', 0, 8.8), hits = [t0 - 0.05, t0 + 0.28, t0 + 0.6];
    let hit = 0, last = 0; for (const h of hits) if (t >= h) { hit = Math.exp(-(t - h) * 14); last = h; }
    let s = defsC(Pf) + doorView(Pf, t, { light: 1 }) + R(0, 0, 1080, 1920, '#000', OP(0.2));
    for (let i = 0; i < hits.length; i++) if (t >= hits[i]) s += ringWaves(540, 900, t, hits[i], 1, 420, 'rgba(255,230,180,0.7)', 1 - k(t, hits[i], hits[i] + 0.5), 10) + flash('#fff', 0.0);
    s += flash('#fff', 0.35 * hit) + vignette(Pf, 1);
    return camG(t, 540, 940, 1.3 + 0.1 * hit, 0, 14 * hit, s);
  });

  /* 5c. olho mágico: figura escura no corredor */
  add(sg(4) + 3.5, 0.02, (t, lt, Pf) => {
    const dur = sg(5) - (sg(4) + 3.5), cl2 = k(lt, 0.0, 0.35), app = E_.outCubic(k(lt, 0.2, 0.7));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#000');
    s += `<defs><clipPath id="${Pf}pe"><circle cx="540" cy="960" r="${f1(520 + 300 * (1 - cl2))}"/></clipPath></defs><g clip-path="url(#${Pf}pe)">`;
    s += R(0, 0, 1080, 1920, '#2a3a36') + POLY([[0, 0], [380, 520], [380, 1400], [0, 1920]], '#1d2a28') + POLY([[1080, 0], [700, 520], [700, 1400], [1080, 1920]], '#1d2a28') + R(380, 520, 320, 880, '#0e1614');
    s += R(0, 1400, 1080, 520, '#16201e') + R(480, 0, 120, 120, '#cfe8d8', OP(0.6 + 0.3 * Math.sin(t * 25)));
    s += G(X(Pf, manSilNew({ eyes: app, col: '#020304' })), `translate(540 1380) scale(${H.lerp(0.5, 0.95, app).toFixed(3)})`, OP(app));
    s += '</g>' + C(540, 960, 520 + 300 * (1 - cl2), 'none', 'stroke="#000" stroke-width="160"');
    s += vignette(Pf, 1) + flash(PAL.red, 0.08);
    return camG(t, 540, 960, 1.05 + 0.1 * lt, 0, 3, s);
  });

  /* 6. Arthur ainda não sabia disso: relógio voltando (rewind) */
  add(sg(5), 0.04, (t, lt, Pf) => {
    const dur = sg(6) - sg(5), spin = E_.outCubic(k(lt, 0, 1.0)) * 1.0;
    const m = 12 - lt * 380, ang = m / 60 * 360;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#cfd9d6') + glow(Pf, 'W', 540, 900, 1000, 0.35);
    s += G(clockFace(Pf, { h: 3 - lt * 6, m, col: '#27353d', face: '#eef3f0', glow: 0, scale: 3.0 }), 'translate(540 900)');
    for (let i = 0; i < 14; i++) s += R(0, ((hz(i, 2) * 1920 + t * 900) % 1920), 1080, 3 + 5 * hz(i, 3), 'rgba(0,0,0,0.12)');
    s += R(0, 0, 1080, 1920, '#9fd0e8', OP(0.08)) + flash('#fff', 0.5 * Math.exp(-lt * 10));
    s += vignette(Pf, 0.5);
    return camG(t, 540, 900, 1 + 0.08 * lt, -3 * lt, 3, s);
  });

  /* 7. Naquela segunda-feira: folha de calendário */
  add(sg(6), 0.04, (t, lt, Pf) => {
    const fl = E_.inOutCubic(k(lt, 0.15, 0.7)), pg = (y, txt, n, sc) => G(R(-300, -380, 600, 760, '#f6f4ee', 'rx="28"') + R(-300, -380, 600, 150, '#d4463c', 'rx="28"') + R(-300, -300, 600, 70, '#d4463c') + TX(0, -272, txt, 76, '#fff') + TX(0, 130, n, 420, '#2a3138'), `translate(540 ${f1(y)}) scale(${sc})`);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#bcc9c8');
    const pgs = (txt, n, sy) => G(R(-300, -380, 600, 760, '#f6f4ee', 'rx="28"') + R(-300, -380, 600, 150, '#d4463c', 'rx="28"') + R(-300, -300, 600, 70, '#d4463c') + TX(0, -272, txt, 76, '#fff') + TX(0, 130, n, 420, '#2a3138'), `translate(540 960) scale(1.35 ${(1.35 * sy).toFixed(3)})`);
    s += pgs('DOMINGO', '27', fl < 0.5 ? Math.cos(fl * Math.PI) : 0) + pgs('SEGUNDA', '28', fl < 0.5 ? 0 : Math.cos((1 - fl) * Math.PI));
    s += vignette(Pf, 0.4) + flash('#fff', 0.2 * Math.exp(-lt * 8));
    return camG(t, 540, 960, 1 + 0.06 * lt, 0, 2 * Math.exp(-lt * 4), s);
  });

  /* 8. saiu atrasado: corre pela porta, olhando o relógio de pulso */
  add(sg(7), 0.03, (t, lt, Pf) => {
    const dur = sg(8) - sg(7), x = H.lerp(-120, 1180, E_.inOutQuad(k(lt, 0, dur)));
    let s = defsC(Pf) + skyline(Pf, t, { k: 0, px: t * 700, y: 1380, layers: 2 }) + R(0, 1380, 1080, 540, '#46555d');
    s += speedLines(t, 14, 'rgba(255,255,255,0.3)');
    s += E(x, 1390, 120, 18, 'rgba(0,0,0,0.35)') + G(arthurFig({ walk: t * 2.6, run: 1, bag: 1, lean: -16, arms: [70 * Math.sin(t * 16), 70 + 20 * Math.sin(t * 16), -70 * Math.sin(t * 16), 70], bob: 10 * Math.abs(Math.sin(t * 16)), scale: 1.7, flip: 1 }), `translate(${f1(x)} 1400)`);
    s += vignette(Pf, 0.6);
    return camG(t, 540, 1000, 1.0, 0, 3, s);
  });

  /* 9. mordendo um sanduíche: close mastigando correndo */
  add(sg(8), 0.03, (t, lt, Pf) => {
    const ch = Math.abs(Math.sin(lt * 11));
    let s = defsC(Pf) + skyline(Pf, t, { k: 0, px: t * 900, y: 1500, layers: 2 }) + R(0, 0, 1080, 1920, '#cfe0e0', OP(0.2)) + speedLines(t, 12, 'rgba(255,255,255,0.35)');
    s += camG(t, 540, 960, 1, 0, 5 + 3 * ch, faceAt(Pf, { t, eye: 0.7, worry: 0.2, mouth: 0.25 * ch, mess: 1, beard: 0.4, dark: 0.5, lookx: 8, tilt: 4 * Math.sin(lt * 11) }, 540, 1010 + 14 * ch, 1.9));
    s += G(R(-120, -50, 240, 100, '#e3b66a', 'rx="40"') + R(-120, -10, 240, 24, '#6dbb55', 'rx="8"') + R(-120, 16, 240, 28, '#d9694f', 'rx="8"') + R(-120, 40, 240, 40, '#e3b66a', 'rx="30"') + C(50, -22, 38, '#cf9b50', 'opacity="0.0"') + P('M120,-50 Q70,-10 120,50 L140,50 L140,-50Z', '#c99a4f'), `translate(${f1(520)} ${f1(1330 + 14 * ch)}) rotate(-8)`);
    s += vignette(Pf, 0.8);
    return s;
  });

  /* 10. rumo ao metrô: entrada com letreiro */
  add(sg(9), 0.03, (t, lt, Pf) => {
    const dur = sg(10) - sg(9), p = E_.inCubic(k(lt, 0, dur));
    let s = defsC(Pf) + streetView(Pf, t, { k: 0, dolly: lt * 0.4, cars: 0, tl: 0, trash: 0 });
    s += R(260, 560, 560, 120, '#e8eee9', 'rx="16"') + C(540, 620, 80, '#26b36b', 'stroke="#fff" stroke-width="10"') + TX(540, 650, 'M', 100, '#fff');
    s += P('M260,1000 L820,1000 L760,1300 L320,1300Z', '#0a1114') + P('M300,1040 L780,1040 L750,1280 L330,1280Z', '#15222a');
    for (let i = 0; i < 6; i++) s += L(320 + i * 8, 1060 + i * 38, 760 - i * 8, 1060 + i * 38, '#3d4d56', 6);
    s += G(arthurFig({ back: true, walk: t * 2.4, run: 1, bag: 1, lean: -8, arms: [60 * Math.sin(t * 15), 70, -60 * Math.sin(t * 15), 70], bob: 8 * Math.abs(Math.sin(t * 15)), scale: H.lerp(0.9, 0.55, p) }), `translate(540 ${f1(H.lerp(1700, 1300, p))})`);
    s += vignette(Pf, 0.7);
    return camG(t, 540, 960, 1.0 + 0.08 * lt, 0, 2.5, s);
  });

  /* 11. Até perceber o silêncio: congela, sanduíche cai */
  add(sg(10), 0.02, (t, lt, Pf) => {
    const dur = sg(11) - sg(10), fall = E_.inQuad(k(lt, 0.15, 0.8));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#9fb0b0') + R(0, 0, 1080, 1920, '#10181c', OP(0.55 * E_.outCubic(k(lt, 0, 0.5))));
    s += glow(Pf, 'B', 540, 900, 900, 0.18);
    // ondas de som sendo "sugadas"
    s += radioWaves(540, 640, 1.0 - lt * 0.9, 0, 4, 700 * (1 - E_.outCubic(k(lt, 0.0, 0.6))), 'rgba(255,255,255,0.4)', 1 - k(lt, 0.4, 0.8), 6, 6.283);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.45, lookx: 22 * Math.sign(Math.sin(lt * 7)) * Math.min(1, lt * 3), worry: 0.7, mouth: 0.08, mess: 1, beard: 0.4, dark: 0.6, tilt: 2 }, 540, 1000, 1.7 + 0.12 * lt));
    s += G(R(-100, -36, 200, 72, '#e3b66a', 'rx="30"') + R(-100, -6, 200, 20, '#6dbb55', 'rx="6"'), `translate(${f1(700 + 80 * fall)} ${f1(1280 + 560 * fall)}) rotate(${f1(40 * fall)})`);
    s += vignette(Pf, 1) + flash('#000', 0.3 * k(lt, 0.7, 1));
    return s;
  });

  /* 12. Nenhum carro: avenida vazia */
  add(sg(11), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + streetView(Pf, t, { k: 0, dolly: t * 0.22, cars: 1, tl: 1, fog: 0.7 });
    s += R(0, 0, 1080, 1920, '#0a1418', OP(0.25)) + vignette(Pf, 0.8) + flash('#fff', 0.25 * Math.exp(-lt * 12));
    return camG(t, 540, 940, 1.12 - 0.08 * lt, 0, 1.2, s);
  });

  /* 13. Nenhuma conversa: terraço de café vazio */
  add(sg(12), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + skyline(Pf, t, { k: 0, px: lt * 60, y: 1100, layers: 2 }) + R(0, 1100, 1080, 820, '#505e63') + R(0, 1100, 1080, 14, '#2b363b');
    for (let i = 0; i < 3; i++) {
      const x = 180 + i * 380 - lt * 40, sc = 0.9 + 0.1 * i;
      s += G(E(0, 20, 140, 26, 'rgba(0,0,0,0.35)') + R(-6, -190, 12, 200, '#2b363b') + E(0, -196, 130, 24, '#cfd8d6') + R(-158, -150, 18, 160, '#1f2a2f') + R(-158, -150, 90, 16, '#1f2a2f') + R(140, -150, 18, 160, '#1f2a2f') + R(68, -150, 90, 16, '#1f2a2f') + R(-34, -240, 40, 46, '#fff') + P('M-34,-240 h40 v34 q0,12 -12,12 h-16 q-12,0 -12,-12Z', '#ffffff') + C(40, -236, 8, '#d88a3a', 'opacity="0"'), `translate(${f1(x)} 1400) scale(${sc.toFixed(2)})`);
      for (let q = 0; q < 3; q++) { const ph = ((t * 0.7 + q / 3 + i * 0.2) % 1); s += E(x - 14 + 6 * Math.sin(ph * 9), 1160 - ph * 160, 12 + ph * 10, 22, 'rgba(255,255,255,0.35)', OP(1 - ph)); }
    }
    // balões de fala vazios se desmanchando
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.5 + i / 4) % 1); s += E(220 + i * 220, 700 - ph * 140, 80, 52, 'none', `stroke="rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})" stroke-width="6" stroke-dasharray="14 10"`); }
    s += vignette(Pf, 0.8);
    return camG(t, 540, 1100, 1.1, 0, 1, s);
  });

  /* 14. Nem um único passo além dos seus: pegadas ecoando */
  add(sg(13), 0.02, (t, lt, Pf) => {
    const dur = sg(14) - sg(13), step = Math.floor(lt * 2.4);
    let s = defsC(Pf) + streetView(Pf, t, { k: 0, dolly: lt * 0.5, cars: 0, tl: 0, trash: 0, fog: 0.8 });
    for (let i = 0; i <= step; i++) { const a = 1 - (lt * 2.4 - i) / 3.2; if (a > 0) s += ringWaves(540 + (i % 2 ? 90 : -90), 1520 - i * 12, t, sg(13) + i / 2.4, 1, 420, 'rgba(255,255,255,0.6)', a * 0.8, 8); }
    s += G(arthurFig({ back: true, walk: lt * 1.2, bag: 1, scale: 1.3, arms: [10 * Math.sin(lt * 7), 10, -10 * Math.sin(lt * 7), -10], scared: 1 }), 'translate(540 1860)');
    s += vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0, 0, 1.4, s);
  });

  /* 15. Ele ergueu os olhos: close olhando para cima */
  add(sg(14), 0.03, (t, lt, Pf) => {
    const up = E_.outCubic(k(lt, 0.1, 0.6));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#a9bcc0');
    s += camG(t, 540, 960, 1, 0, 2, faceAt(Pf, { t, eye: 1, pupil: 0.6, looky: -22 * up, lookx: 0, worry: 0.5, mouth: 0.15 * up, mess: 1, beard: 0.4, dark: 0.6, tilt: -3 * up }, 540, H.lerp(1000, 1160, up), H.lerp(1.9, 2.2, up)));
    s += vignette(Pf, 1);
    return s;
  });

  /* 16. A cidade inteira estava vazia: câmera sobe revelando tudo */
  add(sg(15), 0.03, (t, lt, Pf) => {
    const dur = sg(16) - sg(15), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + skyline(Pf, t, { k: 0, px: 0, y: 1250, layers: 2 }) + R(-300, 1250, 1700, 900, '#4c5b61') + R(-300, 1250, 1700, 12, '#2b363b');
    for (let i = 0; i < 9; i++) s += L(540 + (i - 4) * 160, 1250, 540 + (i - 4) * 700, 1920, 'rgba(0,0,0,0.25)', 6);
    for (let i = 0; i < 5; i++) s += R(100 + i * 220, 1330 + (i % 2) * 40, 90, 40, ['#8a2f2f', '#3d5a74', '#c9c3b1', '#2c3a3a', '#a77a2a'][i], 'rx="10"');
    s += G(arthurFig({ back: true, scale: 0.28, scared: 1, arms: [8, 8, -8, -8] }), 'translate(540 1620)');
    s += motes(t, 20, 1080, 1600, 4, 'rgba(255,255,255,0.4)', 3, 6) + vignette(Pf, 0.7);
    return camG(t, 540, H.lerp(1600, 900, u), H.lerp(2.1, 0.78, u), 0, 1, s);
  });

  /* 17. Correu para a estação */
  add(sg(16), 0.03, (t, lt, Pf) => {
    const dur = sg(17) - sg(16);
    let s = defsC(Pf) + streetView(Pf, t, { k: 0, dolly: t * 0.9, cars: 1, tl: 1, trash: 0 }) + speedLines(t, 8, 'rgba(255,255,255,0.18)');
    s += G(arthurFig({ back: true, walk: t * 2.6, run: 1, bag: 1, lean: -8, scale: 1.1, arms: [60 * Math.sin(t * 15), 70, -60 * Math.sin(t * 15), 70], bob: 8 * Math.abs(Math.sin(t * 15)) }), 'translate(540 1840)');
    s += vignette(Pf, 0.9);
    return camG(t, 540, 960, 1.0 + 0.06 * lt, 0, 4, s);
  });

  /* 18. Escadas rolantes funcionando (vazias) */
  add(sg(17), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10181c');
    let esc = '';
    for (let i = -4; i < 14; i++) { const o = ((i + (t * 1.6) % 1)), y = 200 + o * 90, x = o * 120; esc += POLY([[x, y], [x + 600, y], [x + 600, y + 40], [x, y + 40]], i % 2 ? '#8e9aa0' : '#6f7b82') + R(x, y + 40, 600, 10, '#4a545a'); }
    s += G(esc, 'translate(180 300) skewX(0)') + L(120, 260, 900, 1340, '#1a1f23', 28) + L(120, 230, 900, 1310, '#e0e6e8', 8);
    s += R(0, 0, 1080, 120, '#cfe9d8', OP(0.6 + 0.3 * Math.sin(t * 20 * (hz(Math.floor(t * 8), 1) > 0.8 ? 1 : 0)))) + POLY([[300, 120], [800, 120], [1080, 1400], [0, 1400]], 'rgba(207,233,216,0.06)');
    s += vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 960, 1.05, 0, 1, s);
  });

  /* 19. Trem parado, portas abertas */
  add(sg(18), 0.02, (t, lt, Pf) => {
    const dur = sg(20) - sg(18), dr = E_.outCubic(k(lt, 0.5, 1.2));
    let s = defsC(Pf) + platformTrain(Pf, t, { doors: dr, lights: 0.6 + 0.4 * (Math.sin(t * 22) > -0.3 ? 1 : 0.2), px: 0 });
    s += vignette(Pf, 1) + flash('#cfe9d8', 0.15 * Math.exp(-lt * 10));
    return camG(t, 540, 960, H.lerp(1.05, 1.3, E_.inOutQuad(k(lt, 0, dur))), 0, 1, s);
  });

  /* 20. Nenhum passageiro: interior em perspectiva, alças balançando */
  add(sg(20), 0.02, (t, lt, Pf) => {
    const dur = sg(21) - sg(20), vx = 540, vy = 820;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0f171a') + POLY([[0, 0], [1080, 0], [vx + 160, vy - 120], [vx - 160, vy - 120]], '#dfe9e3') + POLY([[0, 1920], [1080, 1920], [vx + 160, vy + 160], [vx - 160, vy + 160]], '#3a464b');
    s += POLY([[0, 0], [vx - 160, vy - 120], [vx - 160, vy + 160], [0, 1920]], '#5a6b71') + POLY([[1080, 0], [vx + 160, vy - 120], [vx + 160, vy + 160], [1080, 1920]], '#5a6b71');
    for (let i = 0; i < 6; i++) { const z = i / 6, f = 1 / (0.35 + z * 1.4); for (const sd of [-1, 1]) { const x = vx + sd * 430 * f / 1.5, y = vy + 520 * f / 1.5, sc = f / 1.5 * 0.9; s += G(R(-150, -60, 300, 70, '#3c6a8a', 'rx="14"') + R(-150, -160, 300, 110, '#335a76', 'rx="14"'), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)} ${sc.toFixed(3)})`); } }
    for (let i = 0; i < 6; i++) { const z = i / 6, f = 1 / (0.35 + z * 1.4), x = vx + 90 * f / 1.5, sw = Math.sin(t * 2.2 + i) * 12 * f; s += L(x, vy - 100 * f / 1.5 - 120, x + sw, vy + 80 * f / 1.5 - 120, '#cfd8d6', 3 + 3 * f) + C(x + sw, vy + 80 * f / 1.5 - 120, 14 * f, '#cfd8d6') ; }
    s += R(0, 0, 1080, 1920, '#fff', OP(0.04 * (Math.sin(t * 26) > 0.5 ? 1 : 0))) + vignette(Pf, 1);
    return camG(t, 540, 900, H.lerp(1.0, 1.35, E_.inQuad(k(lt, 0, dur))), 0, 1.2, s);
  });

  /* 21. Nenhum corpo: assento com um copo esquecido */
  add(sg(21), 0.01, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#2a4a5e') + R(0, 1100, 1080, 820, '#335a76') + R(0, 1000, 1080, 120, '#3c6a8a');
    s += G(R(-60, -200, 120, 200, '#f1efe8', 'rx="12"') + R(-70, -220, 140, 36, '#d4463c', 'rx="10"') + R(-52, -150, 104, 40, '#a5352c', 'rx="8"'), 'translate(540 1100)');
    for (let q = 0; q < 3; q++) { const ph = ((t * 0.9 + q / 3) % 1); s += E(540 + 14 * Math.sin(ph * 8), 860 - ph * 200, 18 + ph * 14, 30, 'rgba(255,255,255,0.4)', OP(1 - ph)); }
    s += vignette(Pf, 1) + flash('#fff', 0.2 * Math.exp(-lt * 14));
    return camG(t, 540, 1000, 1.2, 0, 2, s);
  });

  /* 22. Nenhuma explicação: câmera gira ao redor, pontos de interrogação */
  add(sg(22), 0.02, (t, lt, Pf) => {
    const dur = sg(23) - sg(22);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0b1216') + glow(Pf, 'B', 540, 900, 900, 0.3);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.7, lookx: 28 * Math.sin(lt * 5), worry: 1, mouth: 0.3, sweat: 1, mess: 1, beard: 0.4, dark: 0.6, tilt: 4 * Math.sin(lt * 3) }, 540, 1020, 1.7));
    s += questionMarks(t, 540, 820, 380, 6) + vignette(Pf, 1);
    return camG(t, 540, 960, 1 + 0.1 * lt, 6 * Math.sin(lt * 3), 2, s);
  });

  /* 23. Desesperado, ligou: rosto em pânico + celular */
  add(sg(23), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10090a') + glow(Pf, 'R', 540, 900, 1000, 0.3 + 0.2 * Math.sin(t * 12));
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.45, worry: 1, mouth: 0.6, sweat: 1, tremble: 4, mess: 1, beard: 0.4, dark: 0.7, tilt: 5 * Math.sin(t * 14) }, 540, 980, 2.1));
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1.05, 0, 6, s);
  });

  /* 24-26. Ligações: mãe, pai, amigos */
  const callScene = (i, name) => add(sg(i), 0.02, (t, lt, Pf) => {
    const dur = sg(i + 1) - sg(i), a = E_.outBack(k(lt, 0, 0.3));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, DK) + glow(Pf, 'B', 540, 960, 1000, 0.3);
    s += G(phoneObj(Pf, { screen: 'dial', name, ring: 1, t }), `translate(540 960) scale(${(2.5 * a).toFixed(3)}) rotate(${f1(2 * Math.sin(t * 10))})`);
    s += radioWaves(540, 960, t, sg(i), 3, 520, 'rgba(120,200,255,0.5)', 0.8, 6) + vignette(Pf, 1);
    return camG(t, 540, 960, 1 + 0.08 * lt, 0, 1.5, s);
  });
  callScene(24, 'Mãe'); callScene(25, 'Pai');
  add(sg(26), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, DK);
    const names = ['Lucas', 'Bia', 'Rafa', 'Duda'];
    for (let q = 0; q < 4; q++) { const a = E_.outBack(k(lt, q * 0.12, 0.3 + q * 0.12)); s += G(phoneObj(Pf + 'p' + q, { screen: 'dial', name: names[q], ring: 1, t, glow: 0 }), `translate(${f1(270 + (q % 2) * 540)} ${f1(560 + Math.floor(q / 2) * 760)}) scale(${(1.15 * a).toFixed(3)})`); }
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2, s);
  });

  /* 27. Ninguém respondeu: chamada encerrada + X */
  add(sg(27), 0.02, (t, lt, Pf) => {
    const a = E_.outCubic(k(lt, 0, 0.3));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a0709') + glow(Pf, 'R', 540, 960, 1000, 0.25);
    s += G(phoneObj(Pf, { screen: 'dial', name: 'Mãe', ring: 0, t }), `translate(540 ${f1(1000)}) scale(2.2) rotate(${f1(-3 * a)})`) + bigX(540, 960, 330 * a, E_.outBack(k(lt, 0.2, 0.6)), PAL.red, 46);
    s += vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 3 * Math.exp(-lt * 3), s);
  });

  /* 28. Então viu algo perturbador */
  add(sg(28), 0.02, (t, lt, Pf) => {
    const dur = sg(29) - sg(28);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, DK) + glow(Pf, 'B', 540, 960, 1100, 0.25);
    s += G(phoneObj(Pf, { screen: 'chat', t: lt, rows: 6 }), `translate(540 ${f1(1000 - 60 * lt)}) scale(${(2.3 + 0.4 * lt).toFixed(3)})`);
    s += R(0, 0, 1080, 1920, PAL.red, OP(0.08 * (Math.sin(t * 9) > 0 ? 1 : 0))) + vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 960, 1, 0, 2, s);
  });

  /* 29. todos online às 3h12: cascata de "visto por último 03:12" */
  add(sg(29), 0.02, (t, lt, Pf) => {
    const tE = tw('exatamente', 0, 39.2), big = E_.outBack(k(t, tE, tE + 0.4));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080c12');
    for (let i = 0; i < 9; i++) { const a = E_.outCubic(k(lt, i * 0.16, 0.25 + i * 0.16)), y = 180 + i * 190; s += G(C(120, 0, 44, ['#d9a23a', '#7aa8c9', '#c97a9a', '#8bbf7a', '#b59bd6', '#e0845a'][i % 6]) + R(200, -34, 440, 26, '#cfdae4', 'rx="10"') + R(200, 8, 360, 20, '#6f8497', 'rx="8"') + TX(880, 24, '03:12', 54, '#ff6a5e', 'text-anchor="middle"'), `translate(0 ${f1(y)})`, OP(a * (1 - 0.8 * big))); }
    if (big > 0) s += glow(Pf, 'R', 540, 960, 900 * big, 0.6) + TX(540, 1080, '03:12', 300 * big, '#ff5448', `opacity="${big.toFixed(2)}"`);
    s += vignette(Pf, 1) + flash('#fff', 0.25 * Math.exp(-(t - tE) * 12) * (t > tE ? 1 : 0));
    return camG(t, 540, 960, 1 + 0.15 * big, 0, 2 + 8 * Math.exp(-(t - tE) * 6) * (t > tE ? 1 : 0), s);
  });

  /* 30. O que aconteceu naquele minuto? relógio 3:12 -> 3:13 */
  add(sg(30), 0.02, (t, lt, Pf) => {
    const dur = sg(31) - sg(30), tk = E_.outElastic(k(lt, 0.7, 1.1));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080b10') + glow(Pf, 'R', 540, 900, 1000, 0.3);
    s += G(clockFace(Pf, { h: 3, m: 12 + tk, col: '#e9f1f7', face: '#0e151c', glow: 1, scale: 3.1 }), 'translate(540 900)');
    s += questionMarks(t, 540, 900, 460, 5, '#ff5448') + ringWaves(540, 900, t, sg(30) + 0.7, 2, 700, 'rgba(255,84,72,0.6)', k(lt, 0.7, 0.8), 8);
    s += vignette(Pf, 1);
    return camG(t, 540, 900, 1 + 0.06 * lt, 0, 3, s);
  });

  /* 31a. procurou sobreviventes: megafone na rua */
  add(sg(31), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + streetView(Pf, t, { k: 0.4, dolly: 0, cars: 1, tl: 0, trash: 0, fog: 0.6 });
    s += G(arthurFig({ back: true, scale: 1.25, arms: [10, 10, 160, 30], scared: 1 }), 'translate(540 1840)') + G(P('M0,0 L90,-40 L90,40Z', '#d8d2c2') + R(-30, -18, 30, 36, '#555'), 'translate(640 1220) rotate(-20)');
    s += radioWaves(700, 1190, t, sg(31), 4, 800, 'rgba(255,255,255,0.5)', 1, 8, 1.5, -0.35);
    s += vignette(Pf, 0.9);
    return camG(t, 540, 1000, 1.1, 0, 2, s);
  });
  /* 31b. lanterna em prédio escuro */
  add(sg(31) + 0.8, 0.02, (t, lt, Pf) => {
    const ang = -0.6 + 1.2 * (0.5 + 0.5 * Math.sin(lt * 4));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#04070b');
    s += POLY([[0, 0], [380, 500], [380, 1300], [0, 1920]], '#0c141a') + POLY([[1080, 0], [700, 500], [700, 1300], [1080, 1920]], '#0c141a') + R(380, 500, 320, 800, '#070c10');
    s += `<g transform="rotate(${f1(ang * 18)} 540 1700)">` + POLY([[540, 1700], [160, 400], [920, 400]], 'rgba(255,240,190,0.22)') + '</g>';
    s += G(arthurFig({ back: true, scale: 1.1, arms: [10, 10, 100, 70], scared: 1 }), 'translate(540 1900)') + vignette(Pf, 1) + grain(t, 0.06);
    return camG(t, 540, 960, 1.05, 0, 2, s);
  });
  /* 31c. dias passando */
  add(sg(31) + 1.4, 0.02, (t, lt, Pf) => {
    const n = Math.floor(lt * 14);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a1016');
    s += G(R(-260, -330, 520, 660, '#f1efe8', 'rx="28"') + R(-260, -330, 520, 120, '#d4463c', 'rx="28"') + R(-260, -270, 520, 60, '#d4463c') + TX(0, -240, 'DIA', 62, '#fff') + TX(0, 130, String(2 + n), 340, '#25303a'), `translate(540 960) scale(1.2) rotate(${f1(Math.sin(lt * 20) * 1.5)})`);
    s += flash('#fff', 0.12 * (lt * 14 - n)) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 2, s);
  });
  /* 32. Nada. */
  add(sg(32), 0.01, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#010204') + glow(Pf, 'B', 540, 960, 300 + 60 * Math.sin(t * 9), 0.12) + motes(t, 12, 1080, 1920, 2, 'rgba(255,255,255,0.25)', 3, 4);
    return s + vignette(Pf, 1);
  });

  /* 33. sozinho era apenas o primeiro perigo: alerta vermelho e cidade escurecendo */
  add(sg(33), 0.03, (t, lt, Pf) => {
    const dur = sg(34) - sg(33), u = E_.inOutCubic(k(lt, 0.2, dur - 0.2)), pul = 0.5 + 0.5 * Math.sin(t * 7);
    let s = defsC(Pf) + skyline(Pf, t, { k: H.lerp(0.2, 1.6, u), px: 0, y: 1300, lights: 0.5 * (1 - u), layers: 2 }) + R(-300, 1300, 1700, 700, mixc('#4c5b61', '#05080c', u));
    s += G(arthurFig({ back: true, scale: 0.6, scared: 1, arms: [8, 8, -8, -8] }), 'translate(540 1620)');
    const a = E_.outBack(k(lt, 0.6, 1.2));
    s += G(POLY([[0, -170], [160, 110], [-160, 110]], PAL.red, 'stroke="#ffd0cb" stroke-width="14" stroke-linejoin="round"') + R(-9, -90, 18, 110, '#fff', 'rx="9"') + C(0, 76, 11, '#fff'), `translate(540 600) scale(${(1.6 * a).toFixed(3)})`, OP(0.7 + 0.3 * pul));
    s += glow(Pf, 'R', 540, 600, 700 * a, 0.4 * pul) + vignette(Pf, 1) + flash(PAL.red, 0.1 * pul);
    return camG(t, 540, 1000, H.lerp(1.1, 0.9, u), 0, 1.5, s);
  });
}
