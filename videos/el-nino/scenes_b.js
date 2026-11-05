/* scenes_b.js - 31 s ao fim (2D com zoom e movimentos de câmera). */
const ZC = (lt, dur, a, b, ease = H.ease.inOutSine) => { const u = ease(cl(lt / dur)); return { x: lp(a.x, b.x, u), y: lp(a.y, b.y, u), z: lp(a.z, b.z, u), r: lp(a.r || 0, b.r || 0, u) }; };
const CG = (t, k, inner, shk = 3) => camG(t, k.x, k.y, k.z, k.r, shk, inner);
const fmtKm = n => Math.round(n).toLocaleString('pt-BR');

function partB(c) {
  const { add, W } = c;
  const fold = x => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  const tw = (w, fb) => { let best = fb, bd = 1e9; const f = fold(w); for (const x of W) if (fold(x.w) === f && Math.abs(x.start - fb) < bd) { bd = Math.abs(x.start - fb); best = x.start; } return bd < 1.5 ? best : fb; };
  const bg = (Pf, a, b, c2) => DEFS(LG(Pf + 'bgx', [[0, a], [0.6, b], [1, c2 || b]])) + R(-1500, -1500, 4080, 4920, U(Pf + 'bgx'));

  /* 15 ─ NO MEIO DO OCEANO PACÍFICO: globo gira do Brasil para o Pacífico e aproxima */
  const s15 = tw('no', 31.0);
  add(s15, (t, lt, Pf) => {
    const u = H.ease.inOutCubic(cl(lt / 1.4)), lon0 = lp(-50, -135, u), lat0 = lp(-15, 0, u);
    let s = bg(Pf, '#7fd6ff', '#c9f1ff', '#fff1c9') + DEFS(skyDefs(Pf)) + motes(t, 26, { col: '#ffffff', a: 0.7, r: 5 });
    const k = { x: 540, y: 960, z: lp(0.85, 1.35, u), r: 0 };
    let g = globe(Pf, t, 540, 960, 420, lon0, lat0, { warm: H.prog(t, s15 + 0.9, s15 + 1.4) * 0.6 });
    const p = gpt(-140, 0, lon0, lat0, 540, 960, 420);
    const lab = H.prog(t, s15 + 0.8, s15 + 1.1, H.ease.outBack);
    if (p[2] > 0 && lab > 0) g += G(R(-170, -50, 340, 76, '#ffffff', 'rx="38"') + TXT(0, 4, 'PACÍFICO', 50, '#1572c4'), `translate(${f1(p[0])} ${f1(p[1] - 110)}) scale(${f1(lab / k.z)})`, 'class="maplabel"') + C(p[0], p[1], 14, '#ff5a3c', ST('#fff', 5));
    return s + CG(t, k, g, 0);
  }, 'zoom', 0.25);

  /* 16 ─ O EL NIÑO ACONTECE QUANDO AS ÁGUAS DESSA REGIÃO...: mar aberto com barco, sol forte */
  const s16 = tw('o', 32.53);
  add(s16, (t, lt, Pf) => {
    const k = ZC(lt, 2.6, { x: 420, y: 980, z: 1.08 }, { x: 640, y: 1020, z: 1.22 });
    const warm = H.prog(t, tw('águas', 34.14), tw('ficam', 35.14) + 0.3) * 0.55;
    let s = sky(Pf, t, { sunX: 700, sunY: 560, sun: 1 });
    s += cloudPuff(200, 520, 1.1, { seed: 4, t }) + cloudPuff(980, 380, 0.9, { seed: 6, t });
    s += seaSurface(Pf, t, 1080, { warm });
    s += boat(520 + lt * 30, 1220, 0.9, t);
    /* ondas de calor subindo */
    for (let i = 0; i < 9; i++) { const ph = (t * 0.6 + hz(i, 5)) % 1, x = 80 + i * 115; s += P(H.wavyLine(x, 1180 - ph * 380, x, 1080 - ph * 380 - 160, 12, 1.5, t * 6 + i), 'none', ST('#fff3c4', 6, OP(0.6 * Math.sin(ph * Math.PI) * (0.3 + warm * 1.5)))); }
    s += motes(t, 14, { y0: 900, y1: 1700, a: 0.6 });
    return CG(t, k, s, 3);
  }, 'fade', 0.22);

  /* 17 ─ FICAM MAIS QUENTES QUE O NORMAL: termômetro sobe, corte do oceano fica laranja */
  const s17 = tw('ficam', 35.14);
  add(s17, (t, lt, Pf) => {
    const k = ZC(lt, 1.4, { x: 540, y: 960, z: 1.12 }, { x: 540, y: 940, z: 1.0 }, H.ease.outCubic);
    const h = H.prog(t, s17 + 0.05, s17 + 1.1, H.ease.outCubic);
    let s = sky(Pf, t, { sunX: 880, sunY: 260 });
    s += seaSurface(Pf, t, 760, { warm: 0.4 + 0.6 * h });
    /* corte vertical: água normal (azul) x água quente (laranja) */
    s += R(90, 1000, 360, 560, '#1e9be0', 'rx="30" ' + ST('#fff', 10)) + R(90, 1000, 360, 140, '#5fc8f5', 'rx="30"') + TXT(270, 1640, 'NORMAL', 54, '#ffffff', ST('#1572c4', 12, 'paint-order="stroke"'));
    s += R(620, 1000, 360, 560, mixc('#1e9be0', '#ff6a3c', h), 'rx="30" ' + ST('#fff', 10)) + R(620, 1000, 360, 140 + 200 * h, mixc('#5fc8f5', '#ffb21e', h), 'rx="30"') + TXT(800, 1640, 'EL NIÑO', 54, '#ffffff', ST('#e8452e', 12, 'paint-order="stroke"'));
    for (let i = 0; i < 6; i++) { const ph = (t * 0.8 + hz(i, 3)) % 1; s += C(660 + hz(i, 4) * 280, 1540 - ph * 520, 10, '#fff3c4', OP(h * Math.sin(ph * Math.PI))); }
    s += thermometer(540, 1520, 0.9, 0.3 + 0.65 * h);
    s += keyTag(540, 300, '+ QUENTE', 120, lt - 0.3, { bg: '#ff5a3c', rot: -4 });
    return CG(t, k, s, 2);
  }, 'slideU', 0.25, 1760);

  /* 18 ─ PARECE ALGO DISTANTE, NÃO É?: Bia com binóculo, depois baixa e dá de ombros para a câmera */
  const s18 = tw('parece', 36.50);
  add(s18, (t, lt, Pf) => {
    const tN = tw('não', 37.54);
    const k = ZC(lt, 1.5, { x: 540, y: 900, z: 1.0 }, { x: 540, y: 860, z: 1.12 });
    const down = H.prog(t, tN - 0.35, tN, H.ease.inOutCubic), shrug = H.prog(t, tN - 0.05, tN + 0.25, H.ease.outBack);
    let s = sky(Pf, t, { sunX: 160, sunY: 300 }) + seaSurface(Pf, t, 1250) + cloudPuff(850, 520, 1.0, { seed: 9, t });
    const face = { lookx: lp(0, 0, down), looky: lp(-0.2, 0, down), eye: 1.05, brow: lp(0.3, 0.9, shrug), smile: lp(0.4, 0.2, shrug), open: 0.25 * shrug, oShape: 0.3, turn: lp(0.2, -0.05, shrug), headTilt: lp(0, 8, shrug), br: 1 };
    let b = G(biaBust(t, face), `translate(0 ${f1(-20 * shrug)})`);
    /* binóculo diante dos olhos, desce antes do "não é?" (fica abaixo do rosto) */
    b += binoculars(0, lp(-20, 420, down), 1.4, lp(0, 10, down));
    b += hand(lp(-110, -330, shrug), lp(160, 300 - 80 * shrug, down) + 300 * (1 - down), 0.7, lp(10, -40, shrug), 'open') + hand(lp(110, 330, shrug), lp(160, 300 - 80 * shrug, down) + 300 * (1 - down), 0.7, lp(-10, 40, shrug), 'open');
    s += G(b, 'translate(540 860) scale(1.55)');
    return CG(t, k, s, 3);
  }, 'fade', 0.2);

  /* 19 ─ ALTERAR A CIRCULAÇÃO DOS VENTOS: setas de vento ao redor do globo invertem */
  const s19 = tw('só', 38.01);
  add(s19, (t, lt, Pf) => {
    const tA = tw('alterar', 39.5), tV = tw('ventos', 40.98);
    const k = ZC(lt, 3.2, { x: 540, y: 980, z: 1.0 }, { x: 540, y: 900, z: 1.18 });
    const flip = H.prog(t, tA, tA + 0.6, H.ease.inOutCubic);
    let s = bg(Pf, '#a6ebff', '#e2f8ff', '#fff3d6') + DEFS(skyDefs(Pf)) + motes(t, 20, { col: '#ffffff', a: 0.8 });
    s += globe(Pf, t, 540, 960, 380, -110 + lt * 5, 5, { warm: 0.9 + 0.1 * Math.sin(t * 3) });
    for (let i = 0; i < 6; i++) {
      const y = 760 + i * 80, dir = lp(1, -1, flip) * (i % 2 ? 1 : 1), off = (t * 0.6 + i * 0.17) % 1;
      const x1 = 540 - 520 * dir, x2 = 540 + 520 * dir;
      const k1 = cl(off * 1.4);
      s += windArrow(lp(x1, x2, off * 0.3), y - 220, lp(x1, x2, 0.3 + off * 0.6), y - 260, 0.12, mixc('#ffffff', '#ffd84a', flip), 14, k1, 0.85 * Math.sin(off * Math.PI));
    }
    const tag = H.prog(t, tV - 0.2, tV + 0.2);
    s += keyTag(540, 330, 'VENTOS MUDAM', 90, t - tA - 0.2, { bg: '#7c5cff', rot: 3 });
    return CG(t, k, s, 2);
  }, 'iris', 0.3, 1740);

  /* 20 ─ PADRÕES DE CHUVA NO PLANETA: mapa-múndi com chuva e sol trocando de lugar */
  const s20 = tw('e', 41.26);
  add(s20, (t, lt, Pf) => {
    const k = ZC(lt, 2.6, { x: 420, y: 960, z: 1.05 }, { x: 660, y: 960, z: 1.2 });
    let s = mapOcean(Pf, t) + DEFS(skyDefs(Pf));
    s += worldFlat(Pf, t, 540, 960, 3.3, -40, 5, { warm: 0.8 });
    const spots = [[-100, 40], [-60, -10], [-50, -27], [20, 5], [30, -25], [80, 25], [130, -25], [105, 45], [-5, 48], [140, 35]];
    spots.forEach(([lon, lat], i) => {
      const q = eq(lon, lat, 540, 960, 3.3, -40, 5), t0 = s20 + 0.2 + i * 0.18, u = H.ease.outBack(cl((t - t0) / 0.3), 2);
      if (u <= 0) return;
      const rain = i % 2 === 0;
      let ic = rain ? cloudPuff(0, 0, 0.42, { seed: i, t }) + [0, 1, 2].map(j => { const ph = (t * 2 + j * 0.33) % 1; return L(-40 + j * 40, 20 + ph * 60, -48 + j * 40, 40 + ph * 60, '#3f8ff0', 6, OP(1 - ph)); }).join('')
        : C(0, 0, 70, U(Pf + 'glwA')) + C(0, 0, 36, PAL.sun, ST('#ffb21e', 5)) + [0, 1, 2, 3, 4, 5, 6, 7].map(j => { const a = j / 8 * 6.28 + t; return L(Math.cos(a) * 46, Math.sin(a) * 46, Math.cos(a) * 62, Math.sin(a) * 62, '#ffb21e', 6); }).join('');
      s += G(ic, `translate(${f1(q[0])} ${f1(q[1] - 30)}) scale(${u.toFixed(3)})`);
    });
    return CG(t, k, s, 2);
  }, 'slideL', 0.25);

  /* 21 ─ NO SUL DO BRASIL: zoom no mapa, Sul destacado e pulsando */
  const s21 = tw('no', 43.90);
  add(s21, (t, lt, Pf) => {
    const u = H.ease.inOutCubic(cl(lt / 1.3));
    const sc = lp(9, 34, u), lonC = lp(-52, -51, u), latC = lp(-14, -26, u);
    let s = mapOcean(Pf, t) + DEFS(skyDefs(Pf));
    const hiS = H.prog(t, s21 + 0.3, s21 + 0.7) * (0.75 + 0.25 * Math.sin(t * 6));
    s += worldFlat(Pf, t, 540, 960, sc, lonC, latC, { hiBR: 1, hiSouth: hiS, hiPR: H.prog(t, s21 + 1.1, s21 + 1.5) });
    const lb = eq(-60, -30, 540, 960, sc, lonC, latC);
    s += keyTag(540, 330, 'SUL DO BRASIL', 92, lt - 0.5, { bg: PAL.trim, rot: -3 });
    const mg = eq(-51.94, -23.42, 540, 960, sc, lonC, latC);
    s += C(mg[0], mg[1], 14, '#ffffff', OP(H.prog(t, s21 + 1.2, s21 + 1.4)) + ' ' + ST('#ff4f7b', 6));
    for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1, q = eq(-51, -27, 540, 960, sc, lonC, latC); s += C(q[0], q[1], 60 + ph * 260, 'none', ST('#ffffff', 6, OP((1 - ph) * hiS * 0.7))); }
    return s;
  }, 'zoom', 0.22, 1700);

  /* 22 ─ CHUVA ACIMA DA MÉDIA: gráfico de barras que se enche de água e passa da linha da média */
  const s22 = tw('costuma', 46.05);
  add(s22, (t, lt, Pf) => {
    const tA = tw('acima', 48.15);
    const k = ZC(lt, 2.8, { x: 540, y: 1000, z: 1.0 }, { x: 560, y: 960, z: 1.1 });
    let s = bg(Pf, '#bff0ff', '#e9fbff', '#ffffff') + rainFx(t, 30, { col: '#7fc8ff', a: 0.5, len: 50, w: 4 });
    const base = 1560, avg = 1060, bars = [0.55, 0.7, 0.62, 1.2, 1.35, 1.5];
    s += R(110, base, 860, 10, '#2a1e3a', 'rx="5"');
    bars.forEach((v, i) => {
      const x = 150 + i * 135, g = H.prog(t, s22 + 0.2 + i * 0.22, s22 + 0.9 + i * 0.22, H.ease.outCubic), h = (base - avg) * v * g;
      s += R(x, base - h, 100, h, i > 2 ? '#3f8ff0' : '#8cc8ff', 'rx="18"') + R(x, base - h, 100, Math.min(24, h), '#bfe4ff', 'rx="12"');
      if (h > 20) s += P(H.wavyLine(x + 8, base - h + 8, x + 92, base - h + 8, 4, 2, t * 6 + i), 'none', ST('#ffffff', 4, OP(0.7)));
      if (i > 2 && g > 0.95) s += C(x + 50, base - h - 40, 26, '#ffffff', ST('#3f8ff0', 4)) + TXT(x + 50, base - h - 30, '↑', 34, '#3f8ff0');
    });
    s += L(100, avg, 980, avg, '#ff5a5f', 8, 'stroke-dasharray="30 20"') + G(R(-90, -34, 180, 60, '#ff5a5f', 'rx="18"') + TXT(0, 10, 'MÉDIA', 38, '#ffffff'), 'translate(880 1010)', 'class="maplabel"');
    s += keyTag(540, 400, 'ACIMA DA MÉDIA', 96, t - tA + 0.1, { bg: '#3f8ff0', rot: -3 });
    return CG(t, k, s, 2);
  }, 'slideL', 0.22, 1740);

  /* 23 ─ MAIS UMIDADE NA ATMOSFERA: vapor subindo da lavoura sob o sol (ângulo baixo) */
  const s23 = tw('com', 48.88);
  add(s23, (t, lt, Pf) => {
    const k = ZC(lt, 1.4, { x: 540, y: 1100, z: 1.15 }, { x: 540, y: 880, z: 1.0 });
    let s = sky(Pf, t, { sunX: 820, sunY: 380 }) + hillBand(1300, 60, '#9be88a', 5) + fieldRows(1360, 700, '#a8e05a', '#6fc24a', 12);
    for (let i = 0; i < 16; i++) {
      const ph = (t * 0.45 + hz(i, 31)) % 1, x = 60 + hz(i, 32) * 960, y = 1500 - ph * 900;
      s += P(H.wavyLine(x, y + 160, x + 20, y - 40, 18, 1.2, t * 3 + i), 'none', ST('#ffffff', 22 - ph * 10, OP(0.5 * Math.sin(ph * Math.PI))));
      const dx = x + Math.sin(t * 2 + i) * 20, dy = y - 60;
      s += P(`M${f1(dx)},${f1(dy - 22)} C${f1(dx + 14)},${f1(dy)} ${f1(dx + 12)},${f1(dy + 14)} ${f1(dx)},${f1(dy + 14)} C${f1(dx - 12)},${f1(dy + 14)} ${f1(dx - 14)},${f1(dy)} ${f1(dx)},${f1(dy - 22)}Z`, '#9fdcff', OP(0.9 * Math.sin(ph * Math.PI)) + ' ' + ST('#ffffff', 3));
    }
    s += C(820, 380, 400, U(Pf + 'glwA'), OP(0.5));
    return CG(t, k, s, 3);
  }, 'fade', 0.2);

  /* 24 ─ FORMAÇÃO DE TEMPORAIS: cumulonimbo cresce em time-lapse e solta o primeiro raio */
  const s24 = tw('aumentam', 50.21);
  add(s24, (t, lt, Pf) => {
    const tT = tw('temporais', 52.30);
    const g = H.prog(t, s24, tT + 0.1, H.ease.inOutSine);
    const k = ZC(lt, 2.5, { x: 540, y: 1100, z: 1.15 }, { x: 540, y: 880, z: 0.92 });
    let s = sky(Pf, t, { storm: 0.3 * g, sunX: 180, sunY: 300 });
    s += hillBand(1560, 50, '#9be88a', 2) + R(-600, 1600, 2400, 800, PAL.grass);
    s += stormCloud(560, 1380, lp(0.45, 1.25, g), t * 3, { seed: 31, grow: lp(0.15, 1, g), anvil: H.prog(g, 0.6, 1), a: 1 });
    s += bolt(560, 1400, 220, 5, flashAt(t, tT + 0.05, 1, 4), 12) + rainFx(t, 26, { x0: 380, x1: 760, y0: 1420, y1: 1640, a: 0.7 * H.prog(t, tT - 0.2, tT + 0.2), len: 50, w: 4 });
    s += house(200, 1640, 0.6) + tree(880, 1650, 0.7, t, { wind: 0.4 + g });
    s += R(-500, -500, 2080, 2920, '#fff6d8', OP(flashAt(t, tT + 0.05, 0.35, 6)));
    return CG(t, k, s, 2);
  }, 'fade', 0.2);

  /* 25 ─ FRENTES FRIAS: frente fria (azul com triângulos) sobe e encontra o ar quente e úmido */
  const s25 = tw('principalmente', 52.73);
  add(s25, (t, lt, Pf) => {
    const tF = tw('frentes', 55.04);
    const k = ZC(lt, 2.7, { x: 540, y: 1000, z: 1.0 }, { x: 540, y: 960, z: 1.12 });
    let s = mapOcean(Pf, t) + DEFS(skyDefs(Pf));
    s += worldFlat(Pf, t, 540, 960, 26, -52, -26, { hiPR: 0.6 });
    /* ar quente/úmido vindo do norte */
    s += C(620, 560, 360, U(Pf + 'glwR'), OP(0.65 + 0.1 * Math.sin(t * 3)));
    for (let i = 0; i < 4; i++) s += windArrow(520 + i * 70, 420, 500 + i * 70, 760, 0.15, '#ff8a3d', 12, cl((t - s25) / 0.8), 0.9);
    /* frente fria avançando do sul */
    const fy = lp(1800, 1180, H.prog(t, s25 + 0.2, tF + 0.3, H.ease.inOutSine));
    let fr = `M-100,${f1(fy + 60)}`; const tri = [];
    for (let x = -100; x <= 1200; x += 60) fr += ` Q${x + 30},${f1(fy + Math.sin(x * 0.01) * 40 - 20)} ${x + 60},${f1(fy + Math.sin((x + 60) * 0.01) * 40)}`;
    s += P(fr, 'none', ST('#2f6ff0', 16));
    for (let x = -80; x <= 1180; x += 120) { const y = fy + Math.sin((x + 30) * 0.01) * 40 - 8; s += POLY([[x, y], [x + 50, y], [x + 25, y - 50]], '#2f6ff0'); }
    s += C(540, fy + 300, 420, U(Pf + 'glwB'), OP(0.7)) + G(R(-190, -40, 380, 72, '#ff8a3d', 'rx="30"') + TXT(0, 14, 'AR QUENTE', 44, '#ffffff'), 'translate(620 640)', 'class="maplabel"') + G(R(-170, -40, 340, 72, '#2f6ff0', 'rx="30"') + TXT(0, 14, 'AR FRIO', 44, '#ffffff'), `translate(540 ${f1(fy + 170)})`, 'class="maplabel"');
    /* encontro: nuvem de temporal surge */
    const meet = H.prog(t, tF + 0.2, tF + 0.6, H.ease.outBack);
    if (meet > 0) s += stormCloud(560, 1060, 0.55 * meet, t, { seed: 33 }) + bolt(570, 1060, 160, 3, flashAt(t, tF + 0.5, 1, 4), 9);
    s += keyTag(540, 300, 'FRENTE FRIA', 100, t - tF, { bg: '#2f6ff0', rot: -3 });
    return CG(t, k, s, 2);
  }, 'slideU', 0.25, 1760);

  /* 26 ─ OUTROS SISTEMAS METEOROLÓGICOS: Bia de costas diante dos painéis (radar, satélite, anemômetro) */
  const s26 = tw('e', 55.44);
  add(s26, (t, lt, Pf) => {
    const k = ZC(lt, 2.2, { x: 540, y: 1050, z: 1.12 }, { x: 540, y: 960, z: 1.0 });
    let s = DEFS(skyDefs(Pf)) + R(-500, -500, 2080, 2920, '#d9ecff') + R(-500, 1500, 2080, 900, '#b7c9ee');
    s += radarScreen(Pf, t, 100, 380, 420, 380) + radarScreen(Pf + 'b', t * 0.7 + 3, 600, 380, 380, 380);
    s += G(R(-200, -150, 400, 300, '#e9eef8', 'rx="20"') + R(-182, -132, 364, 264, '#24407a') + globe(Pf + 'g', t, 0, 0, 110, -50 + t * 20, 0, { atm: 0, hiBR: 1 }), 'translate(310 1050)');
    /* anemômetro */
    const an = t * 600;
    s += G(R(-140, -150, 280, 300, '#e9eef8', 'rx="20"') + R(-122, -132, 244, 264, '#fff7d6') + L(0, 100, 0, -20, '#7a4fd8', 10) + [0, 1, 2].map(i => { const a = H.deg(an + i * 120); return L(0, -20, Math.cos(a) * 80, -20 + Math.sin(a) * 26, '#7a4fd8', 6) + E(Math.cos(a) * 80, -20 + Math.sin(a) * 26, 22, 16, '#ff5a5f'); }).join(''), 'translate(780 1050)');
    s += R(60, 1250, 960, 40, '#7a8fc9', 'rx="10"');
    const turn = H.prog(t, s26 + 1.0, s26 + 1.4, H.ease.inOutCubic);
    s += BIA(t, { view: 'back', aR: lp(10, 70, turn), eR: lp(10, 40, turn), aL: 10 }, 540, 1830, 1.15);
    return CG(t, k, s, 3);
  }, 'fade', 0.22);

  /* 27 ─ UM DETALHE AINDA MAIS INTERESSANTE: lupa diante do olho */
  const s27 = tw('mas', 57.70);
  add(s27, (t, lt, Pf) => {
    const tI = tw('interessante', 59.27);
    const k = ZC(lt, 2.3, { x: 540, y: 880, z: 1.0 }, { x: 600, y: 760, z: 1.25 });
    const lift = H.prog(t, s27 + 0.1, s27 + 0.6, H.ease.outBack), wow = H.prog(t, tI, tI + 0.3, H.ease.outBack);
    let s = bg(Pf, '#ffe08a', '#ffc46b', '#ff9a73') + motes(t, 20, { a: 0.6, r: 8 });
    const face = { eye: lp(0.9, 1.25, wow), brow: lp(0.2, 1, wow), smile: 0.5 + 0.3 * wow, open: 0.3 * wow, oShape: 0.6, lookx: 0.3, looky: 0, turn: 0.1, headTilt: lp(0, -6, wow) };
    let b = biaBust(t, face);
    /* lupa ao lado do olho direito (sem tapar o rosto inteiro) */
    b += magnifier(lp(260, 120, lift), lp(500, -10, lift), 0.8, -20);
    b += hand(lp(330, 270, lift), lp(800, 220, lift), 0.7, -30, 'open');
    s += G(b, 'translate(540 860) scale(1.5)');
    for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + t; s += sparkle(720 + Math.cos(a) * 320 * wow, 840 + Math.sin(a) * 320 * wow, 30, wow * (0.5 + 0.5 * Math.sin(t * 6 + i)), '#ffffff'); }
    return CG(t, k, s, 3);
  }, 'flash', 0.2);

  /* 28 ─ DIFICULTAR A FORMAÇÃO...: furacão tenta se organizar (vista de satélite) e o vento do El Niño atrapalha */
  const s28 = tw('o', 60.01);
  add(s28, (t, lt, Pf) => {
    const tD = tw('dificultar', 61.04);
    const k = ZC(lt, 2.2, { x: 540, y: 960, z: 1.0 }, { x: 540, y: 960, z: 1.2 });
    const org = lp(0.3, 0.9, H.prog(t, s28, tD + 0.2)) - 0.35 * H.prog(t, tD + 0.3, tD + 1.0);
    let s = DEFS(skyDefs(Pf) + RG(Pf + 'sea', [[0, '#5fd0ff'], [1, '#1572c4']])) + R(-500, -500, 2080, 2920, U(Pf + 'sea'));
    for (let i = 0; i < 12; i++) s += P(H.wavyLine(-100, 200 + i * 150, 1200, 200 + i * 150, 10, 4, t * 0.6 + i), 'none', ST('#ffffff', 3, OP(0.18)));
    s += hurricane(Pf, t, 560, 980, 420, { k: org, tear: H.prog(t, tD + 0.3, tD + 1.0) * 0.35 });
    for (let i = 0; i < 5; i++) { const off = (t * 0.7 + i * 0.2) % 1; s += windArrow(-60 + off * 700, 600 + i * 180, 140 + off * 700, 560 + i * 180, 0.08, '#ffb21e', 16, H.prog(t, tD - 0.2, tD + 0.2), 0.9 * Math.sin(off * Math.PI)); }
    return CG(t, k, s, 2);
  }, 'zoom', 0.22);

  /* 29 ─ FURACÕES NO OCEANO ATLÂNTICO: mapa do Atlântico, ícone de furacão encolhe */
  const s29 = tw('de', 62.17);
  add(s29, (t, lt, Pf) => {
    const k = ZC(lt, 2.0, { x: 540, y: 960, z: 1.1 }, { x: 540, y: 960, z: 1.0 }, H.ease.outCubic);
    let s = mapOcean(Pf, t) + DEFS(skyDefs(Pf));
    s += worldFlat(Pf, t, 540, 960, 7.5, -50, 20);
    const q = eq(-50, 18, 540, 960, 7.5, -50, 20);
    const shrink = 1 - 0.55 * H.prog(t, s29 + 0.7, s29 + 1.6, H.ease.inOutCubic);
    s += G(hurricane(Pf, t, 0, 0, 200, { k: 1, a: 1 }) + C(0, 0, 200, 'none', ST('#ffffff', 6, 'stroke-dasharray="20 16" opacity="0.6"')), `translate(${f1(q[0])} ${f1(q[1])}) scale(${shrink.toFixed(3)})`);
    const lb = H.prog(t, s29 + 0.2, s29 + 0.5, H.ease.outBack);
    s += G(R(-200, -44, 400, 80, '#ffffff', 'rx="40"') + TXT(0, 14, 'ATLÂNTICO', 50, '#1572c4'), `translate(540 1420) scale(${lb.toFixed(3)})`, 'class="maplabel"');
    s += keyTag(540, 330, 'MENOS FURACÕES', 90, t - s29 - 0.8, { bg: '#7c5cff', rot: -3 });
    return CG(t, k, s, 2);
  }, 'slideL', 0.22, 1700);

  /* 30 ─ VENTOS EM DIFERENTES ALTURAS: corte da atmosfera, setas de tamanhos/direções diferentes, nuvem inclinada */
  const s30 = tw('isso', 64.15);
  add(s30, (t, lt, Pf) => {
    const tH = tw('alturas', 66.81);
    const k = ZC(lt, 3.5, { x: 540, y: 1000, z: 1.0 }, { x: 540, y: 900, z: 1.12 });
    let s = DEFS(LG(Pf + 'atm', [[0, '#3f6fe0'], [0.35, '#5fb8f5'], [0.75, '#a6ebff'], [1, '#e9fbff']])) + R(-500, -500, 2080, 2920, U(Pf + 'atm')) + R(-500, 1600, 2080, 800, PAL.ocean);
    const layers = [[500, 'ALTO', -1, 1.0], [880, 'MÉDIO', -1, 0.6], [1260, 'BAIXO', 1, 0.35]];
    layers.forEach(([y, lab, dir, str], i) => {
      s += L(-100, y + 150, 1180, y + 150, '#ffffff', 3, 'stroke-dasharray="14 14" opacity="0.5"');
      const on = H.prog(t, s30 + 0.3 + i * 0.4, s30 + 0.8 + i * 0.4);
      for (let j = 0; j < 3; j++) { const off = (t * 0.5 * (0.5 + str) + j / 3) % 1, x0 = dir > 0 ? -200 + off * 1300 : 1280 - off * 1300; s += windArrow(x0, y + j * 40 - 40, x0 + dir * 300 * str, y + j * 40 - 40, 0, '#ffffff', 10 + 10 * str, on, 0.9 * Math.sin(off * Math.PI)); }
      s += G(R(-120, -44, 240, 80, '#2a1e3a', 'rx="22" opacity="0.7"') + TXT(0, 16, lab, 48, '#ffffff'), `translate(150 ${y - 110})`, 'class="maplabel"');
    });
    /* nuvem alta é inclinada pelos ventos (cisalhamento) */
    const tilt = H.prog(t, tH - 0.6, tH + 0.6, H.ease.inOutSine);
    let cloud = '';
    for (let j = 0; j < 9; j++) { const y = 1560 - j * 120, x = 600 - tilt * j * j * 7; cloud += C(x - 60, y, 110 - j * 4, '#ffffff') + C(x + 60, y - 20, 100 - j * 4, '#f0f6ff') + C(x - 30, y - 50, 70, PAL.stormRim, OP(0.25)); }
    s += cloud;
    return CG(t, k, s, 2);
  }, 'fade', 0.22, 1760);

  /* 31 ─ ATRAPALHANDO O DESENVOLVIMENTO: topo do furacão é arrancado e o mar se acalma ao sol */
  const s31 = tw('atrapalhando', 67.77);
  add(s31, (t, lt, Pf) => {
    const tear = H.prog(t, s31 + 0.2, s31 + 2.0, H.ease.inOutSine);
    const k = ZC(lt, 2.5, { x: 540, y: 960, z: 1.15 }, { x: 600, y: 960, z: 0.95 });
    let s = DEFS(skyDefs(Pf) + RG(Pf + 'sea', [[0, '#7fe6ff'], [1, '#1e9be0']])) + R(-500, -500, 2080, 2920, U(Pf + 'sea'));
    for (let i = 0; i < 12; i++) s += P(H.wavyLine(-100, 200 + i * 150, 1200, 200 + i * 150, 10 * (1 - tear * 0.7), 4, t * 0.6 + i), 'none', ST('#ffffff', 3, OP(0.2)));
    s += hurricane(Pf, t, 520, 960, 440, { k: 1 - 0.5 * tear, tear, spin: 1 - tear * 0.6, a: 1 - tear * 0.4 });
    s += C(900, 300, 400, U(Pf + 'glwA'), OP(tear * 0.8)) + C(900, 300, 80, PAL.sun, OP(tear));
    return CG(t, k, s, 2);
  }, 'fade', 0.22);

  /* 32 ─ AQUECIMENTO DO OUTRO LADO DO PLANETA: globo gira, arco do Pacífico ao Brasil */
  const s32 = tw('ou', 70.26);
  add(s32, (t, lt, Pf) => {
    const u = H.ease.inOutSine(cl(lt / 2.6)), lon0 = lp(-140, -85, u);
    const k = ZC(lt, 2.6, { x: 540, y: 960, z: 1.15 }, { x: 540, y: 960, z: 1.0 });
    let s = bg(Pf, '#a6ebff', '#e2f8ff', '#fff3d6') + DEFS(skyDefs(Pf)) + motes(t, 20, { col: '#ffffff', a: 0.8 });
    s += globe(Pf, t, 540, 960, 400, lon0, -5, { warm: 1, hiBR: H.prog(t, s32 + 1.2, s32 + 1.6) });
    const a = gpt(-130, 0, lon0, -5, 540, 960, 400), b = gpt(-50, -15, lon0, -5, 540, 960, 400);
    const kk = H.prog(t, s32 + 0.8, s32 + 2.0, H.ease.inOutCubic);
    if (kk > 0) { const pts = []; for (let i = 0; i <= 30 * kk; i++) { const v = i / 30; pts.push([lp(a[0], b[0], v), lp(a[1], b[1], v) - Math.sin(v * Math.PI) * 300]); } if (pts.length > 1) s += PL(pts, '#ff8a3d', 22, OP(0.4)) + PL(pts, '#ffffff', 10, `stroke-dasharray="24 18" stroke-dashoffset="${f1(-t * 120)}"`); }
    return CG(t, k, s, 2);
  }, 'iris', 0.3);

  /* 33 ─ INTENSIDADE DAS CHUVAS: rua com chuva que aumenta, pluviômetro enchendo, respingos */
  const s33 = tw('pode', 72.90);
  add(s33, (t, lt, Pf) => {
    const tI = tw('intensidade', 74.27);
    const r = lp(0.25, 1, H.prog(t, s33 + 0.3, tI + 0.6, H.ease.inOutSine));
    const k = ZC(lt, 2.4, { x: 540, y: 960, z: 1.0 }, { x: 500, y: 1020, z: 1.15 });
    let s = sky(Pf, t, { storm: 0.25 + 0.3 * r, sunX: 900, sunY: 300, sun: 1 - r * 0.4 }) + cloudPuff(300, 500, 1.3, { seed: 3, t, col: '#eef0ff' }) + cloudPuff(850, 420, 1.1, { seed: 4, t, col: '#eef0ff' });
    s += house(180, 1360, 1.0, { wall: PAL.wallB }) + house(560, 1360, 1.0, { wall: PAL.wallA, seed: 3 }) + house(940, 1360, 1.0, { wall: PAL.wallD, seed: 5 }) + R(-500, 1360, 2080, 900, '#a6b4d4') + R(-500, 1350, 2080, 18, '#e9eef8');
    for (let i = 0; i < 4; i++) s += E(150 + i * 260, 1600 + (i % 2) * 120, 110, 22, '#8fc4f0', OP(0.7));
    for (let i = 0; i < Math.round(26 * r); i++) { const ph = (t * 3 + hz(i, 41)) % 1, x = 60 + hz(i, 42) * 960, y = 1420 + hz(i, 43) * 400; s += E(x, y, 40 * ph, 10 * ph, 'none', ST('#ffffff', 3, OP(1 - ph))); }
    s += rainFx(t, Math.round(30 + 90 * r), { a: 0.4 + 0.3 * r, len: 60 + 60 * r, w: 3 + 2 * r, sp: 2 + r });
    /* pluviômetro */
    s += G(R(-60, -320, 120, 320, '#ffffff', 'rx="20" opacity="0.85" ' + ST('#2a1e3a', 6)) + R(-50, -10 - 290 * r, 100, 290 * r, '#3f8ff0', 'rx="12"') + [1, 2, 3, 4].map(i => L(30, -i * 70, 60, -i * 70, '#2a1e3a', 5)).join(''), 'translate(900 1780)');
    return CG(t, k, s, 3);
  }, 'fade', 0.22, 1700);

  /* 34 ─ QUE VOCÊ VÊ PELA JANELA: Bia de costas olhando a chuva pela janela */
  const s34 = tw('que', 75.33);
  add(s34, (t, lt, Pf) => {
    const k = ZC(lt, 1.5, { x: 540, y: 900, z: 1.0 }, { x: 540, y: 860, z: 1.12 });
    let s = DEFS(skyDefs(Pf)) + roomWall(Pf, t, { wall: '#ffe2c8' });
    s += windowView(Pf, t, 110, 280, 860, 1000, { rain: 1, storm: 0.35, drops: 1 });
    s += BIA(t, { view: 'back', aR: 30, eR: 60, aL: 8 }, 540, 2150, 1.9);
    return CG(t, k, s, 3);
  }, 'fade', 0.22);

  /* 35 ─ TÃO IMPRESSIONANTE: Bia lá fora pula de alegria, arco-íris aparece */
  const s35 = tw('e', 76.76);
  add(s35, (t, lt, Pf) => {
    const tI = tw('impressionante', 78.94);
    const k = ZC(lt, 2.7, { x: 540, y: 1000, z: 1.15 }, { x: 540, y: 960, z: 1.0 });
    const rb = H.prog(t, s35 + 0.2, s35 + 1.6, H.ease.inOutSine);
    /* pulo: antecipação (agacha), salto e aterrissagem */
    const jt = t - (tI - 0.35);
    let crouch = 0, jump = 0;
    if (jt > 0 && jt < 0.2) crouch = Math.sin(jt / 0.2 * Math.PI / 2) * 0.6;
    else if (jt >= 0.2 && jt < 0.75) { const u = (jt - 0.2) / 0.55; jump = 4 * u * (1 - u) * 160; crouch = 0.6 * (1 - u * 4) > 0 ? 0.6 * (1 - u * 4) : 0; }
    else if (jt >= 0.75 && jt < 1.0) crouch = Math.sin((jt - 0.75) / 0.25 * Math.PI) * 0.4;
    const arms = H.prog(t, tI - 0.2, tI + 0.1, H.ease.outBack);
    let s = sky(Pf, t, { sunX: 860, sunY: 420 }) + cloudPuff(220, 520, 1.1, { seed: 5, t });
    for (let i = 0; i < 6; i++) s += P(H.arcPath(540, 1500, 760 - i * 40, Math.PI, Math.PI * (1 + rb)), 'none', ST(['#ff4f4f', '#ff9a3c', '#ffe14a', '#5fd16a', '#3fb8ff', '#8a6cff'][i], 40, OP(0.8)));
    s += hillBand(1500, 70, '#9be88a', 6) + R(-600, 1560, 2400, 800, PAL.grass) + tree(150, 1600, 1.0, t, { wind: 0.3 }) + house(900, 1600, 0.9, { wall: PAL.wallC });
    for (let i = 0; i < 5; i++) s += E(200 + i * 180, 1800 + (i % 2) * 40, 80, 16, '#8fd4ff', OP(0.6));
    s += BIA(t, { view: 'front', aL: lp(15, 150, arms), eL: lp(-10, -20, arms), aR: lp(15, 150, arms), eR: lp(10, 20, arms), crouch, jump, face: { smile: 1, open: 0.5 * arms + 0.2, oShape: 0, eye: 1.1, brow: 0.6, lookx: 0, looky: -0.2 } }, 540, 1720, 1.9);
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28 + t * 0.5; s += sparkle(540 + Math.cos(a) * (300 + 60 * Math.sin(t * 3 + i)), 1150 + Math.sin(a) * 340, 26, arms * (0.4 + 0.6 * Math.abs(Math.sin(t * 4 + i))), i % 2 ? '#ffffff' : '#ffe14a'); }
    return CG(t, k, s, 3);
  }, 'flash', 0.22, 1820);

  /* 36 ─ MILHARES DE QUILÔMETROS: globo recua, linha do Pacífico ao Brasil com contador de km */
  const s36 = tw('suas', 79.51);
  add(s36, (t, lt, Pf) => {
    const tM = tw('milhares', 81.18);
    const k = ZC(lt, 4.0, { x: 540, y: 980, z: 1.5 }, { x: 540, y: 900, z: 0.92 }, H.ease.inOutCubic);
    const lon0 = -90 + lt * 3;
    let s = bg(Pf, '#7fd6ff', '#c9f1ff', '#fff1c9') + DEFS(skyDefs(Pf)) + motes(t, 30, { col: '#ffffff', a: 0.8 });
    s += C(540, 960, 700, U(Pf + 'glwA'), OP(0.4));
    s += globe(Pf, t, 540, 960, 400, lon0, -5, { warm: 1, hiBR: 1 });
    const a = gpt(-130, 0, lon0, -5, 540, 960, 400), b = gpt(-50, -24, lon0, -5, 540, 960, 400);
    const kk = H.prog(t, s36 + 0.3, tM + 0.5, H.ease.inOutCubic);
    const pts = []; for (let i = 0; i <= 30 * kk; i++) { const v = i / 30; pts.push([lp(a[0], b[0], v), lp(a[1], b[1], v) - Math.sin(v * Math.PI) * 220]); }
    if (pts.length > 1) s += PL(pts, '#ff8a3d', 24, OP(0.45)) + PL(pts, '#ffffff', 10, `stroke-dasharray="24 18" stroke-dashoffset="${f1(-t * 120)}"`);
    s += C(a[0], a[1], 20, '#ff5a3c', ST('#fff', 6)) + C(b[0], b[1], 20 * (kk > 0.98 ? 1 + 0.2 * Math.sin(t * 8) : 1), '#ffd84a', ST('#fff', 6));
    let o = CG(t, k, s, 2);
    const km = 12000 * H.prog(t, s36 + 0.3, tM + 0.5, H.ease.outCubic);
    const pop = H.ease.outBack(cl((t - s36 - 0.2) / 0.3), 2);
    o += G(R(-330, -80, 660, 150, '#ffffff', 'rx="40" opacity="0.92"') + TXT(0, 34, fmtKm(km) + ' km', 104, '#e8452e'), `translate(540 300) scale(${pop.toFixed(3)})`, 'class="keytag"');
    o += keyTag(540, 470, 'MILHARES DE KM', 70, t - tM, { bg: '#2a1e3a', rot: 2 });
    o += R(0, 0, 1080, 1920, '#ffffff', OP(H.prog(t, 83.1, 83.5) * 0.9));
    return o;
  }, 'zoom', 0.25, 1700);
}
