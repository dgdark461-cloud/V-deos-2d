/* scenes_a.js - 0 a 31 s (2.5D: camadas com parallax e câmera em profundidade). */
const CAM = (t, lt, dur, a, b, ease = ez, hand = 1) => {
  const u = ease(cl(lt / dur));
  return { x: lp(a.x || 0, b.x || 0, u) + H.noise(t * 0.7, 11) * 6 * hand, y: lp(a.y || 0, b.y || 0, u) + H.noise(t * 0.6, 12) * 5 * hand, z: lp(a.z || 0, b.z || 0, u) };
};
const flashAt = (t, t0, a = 0.6, dec = 7) => t >= t0 ? a * Math.exp(-(t - t0) * dec) : 0;
/* pontos dentro de polígono (para alfinetes no mapa) */
function inPoly(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
function samplePoly(poly, n, seed) {
  const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]), out = []; let i = 0;
  while (out.length < n && i < 5000) { const p = [lp(Math.min(...xs), Math.max(...xs), hz(i, seed)), lp(Math.min(...ys), Math.max(...ys), hz(i, seed + 1))]; if (inPoly(p, poly)) out.push(p); i++; }
  return out;
}

function partA(c) {
  const { add, W } = c;
  const fold = x => x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  const tw = (w, fb) => { let best = fb, bd = 1e9; const f = fold(w); for (const x of W) if (fold(x.w) === f && Math.abs(x.start - fb) < bd) { bd = Math.abs(x.start - fb); best = x.start; } return bd < 1.5 ? best : fb; };

  /* 1 ─ CLOSE da Bia: dia claro, rajada de vento, tempestade chegando, relâmpago, ela puxa o capuz */
  add(0, (t, lt, Pf) => {
    const cam = CAM(t, lt, 2.2, { x: -20, y: 30, z: -0.12 }, { x: 25, y: -10, z: 0.1 }, H.ease.inOutSine);
    const gust = H.prog(t, 0.45, 0.8, H.ease.outQuad) * (1 - 0.35 * H.prog(t, 1.6, 2.2));
    const st = H.prog(t, 0.3, 1.7, H.ease.inOutSine) * 0.6;
    const fl = flashAt(t, 1.18, 0.55, 6) + flashAt(t, 1.42, 0.3, 8);
    let s = sky(Pf, t, { storm: st, sunX: 880, sunY: 300, sun: 1 - st * 0.5 });
    s += LAY(4, stormCloud(lp(-500, 260, H.prog(t, 0, 2.2, H.ease.outCubic)), 980, 1.6, t, { seed: 5, lit: 1 }) + bolt(lp(-500, 260, H.prog(t, 0, 2.2, H.ease.outCubic)) + 40, 1000, 900, 7, fl * 1.6, 16) + cloudPuff(900, 700, 1.4, { seed: 2, t, a: 1 - st }), cam);
    s += LAY(2.4, hillBand(1500, 80, '#8fe08a', 2) + house(170, 1560, 0.9, { wall: PAL.wallB }) + house(880, 1580, 1.0, { wall: PAL.wallC, roof: '#ff8a5a', seed: 3 }) + tree(470, 1590, 1.0, t, { wind: 0.4 + gust * 1.6, seed: 2 }) + tree(1060, 1600, 0.9, t, { wind: 0.4 + gust * 1.6, seed: 5 }) + hillBand(1640, 40, PAL.grass, 6), cam);
    /* atuação */
    const k1 = H.prog(t, 0.45, 0.7, H.ease.outQuad), k2 = H.prog(t, 0.72, 0.95, H.ease.outBack), k3 = H.prog(t, 1.85, 2.1);
    const face = {
      lookx: lp(lp(0.5, 0.2, k1), -0.45, k2) + 0.4 * k3, looky: lp(-0.8, -0.5, k2) + 0.5 * k3,
      eye: lp(lp(1, 0.55, k1), 1.28, k2) - 0.3 * k3, brow: lp(lp(0.1, -0.3, k1), 1, k2) - 0.9 * k3,
      open: lp(0, 0.75, k2) * (1 - k3), oShape: 1, smile: lp(0.6, -0.2, k1) + 0.3 * k3,
      wind: gust, windDir: 1, turn: lp(0.15, -0.28, k2) + 0.2 * k3, worry: 0.3 * k2, rim: 1 + fl * 2,
    };
    const hoodK = H.prog(t, 1.62, 1.95);
    const headTilt = lp(-5, 6, k1) * (1 - k2) + lp(0, -4, k2) + 2 * Math.sin(t * 3) * gust;
    let bia = biaBust(t, Object.assign({}, face, { headTilt, hood: hoodK, br: 1.2 }));
    /* mão sobe para puxar o capuz (antecipação: desce um pouco antes) */
    const hk = H.prog(t, 1.35, 1.75, H.ease.outCubic), hdown = H.prog(t, 1.25, 1.38) * (1 - hk);
    const hx = lp(330, 230, hk), hy = lp(900, -40, hk) + hdown * 40 + H.prog(t, 1.75, 2.0, H.ease.outQuad) * 30;
    bia += hand(hx, hy, 0.75, lp(30, 18, hk), 'open');
    s += LAY(1, G(bia, `translate(540 830) scale(2.0)`), cam);
    s += LAY(1, R(-200, 0, 1480, 1920, '#fff6d8', OP(fl * 0.5)), cam);
    /* folhas e gotas passando perto da câmera */
    let fg = '';
    for (let i = 0; i < 12; i++) {
      const ph = (t * (0.9 + 0.6 * hz(i, 3)) + hz(i, 4)) % 1, on = H.prog(t, 0.5 + hz(i, 5) * 0.3, 0.7 + hz(i, 5) * 0.3);
      const x = -200 + ph * 1600, y = (i % 2 ? 120 + hz(i, 6) * 300 : 1250 + hz(i, 6) * 600) + Math.sin(ph * 9 + i) * 60;
      fg += G(P('M0,-22 C18,-12 18,12 0,22 C-18,12 -18,-12 0,-22Z', i % 3 ? '#62cc5c' : '#ffd84a') + L(0, -22, 0, 22, '#2f9e48', 3), T(x, y, ph * 900 + i * 40, 1.2 + hz(i, 7)), OP(on * 0.95));
    }
    fg += rainFx(t, 40, { a: 0.5 * H.prog(t, 1.4, 2.0), len: 120, w: 5, slant: 0.35 });
    s += LAY(0.6, fg, cam);
    return s;
  }, 'fade', 0.2);

  /* 2 ─ lavoura do Paraná sob uma SEQUÊNCIA de tempestades (dolly para frente) */
  const s2 = 2.17;
  add(s2, (t, lt, Pf) => {
    const cam = CAM(t, lt, 1.9, { x: -40, y: 40, z: -0.1 }, { x: 40, y: -30, z: 0.32 }, H.ease.inOutSine);
    let s = sky(Pf, t, { storm: 0.5, sunX: 950, sunY: 260 });
    let far = '';
    [[2.25, 160], [2.7, 560], [3.22, 950]].forEach(([t0, x], i) => {
      const g = H.prog(t, t0, t0 + 0.45, H.ease.outBack);
      if (g <= 0) return;
      far += P(`M${x - 160},1150 L${x + 160},1150 L${x + 210},1520 L${x - 120},1520Z`, '#b8b4f2', OP(0.45 * g));
      far += rainFx(t + i, 18, { x0: x - 150, x1: x + 190, y0: 1150, y1: 1520, a: 0.6 * g, len: 50, w: 3, seed: i + 3 });
      far += stormCloud(x, 1160, 0.62 * (0.4 + 0.6 * g), t, { seed: i + 2, a: cl(g * 2) });
      far += bolt(x + 30, 1140, 360, i + 9, flashAt(t, t0 + 0.35, 1, 5), 10);
    });
    s += LAY(5, far, cam);
    s += LAY(3, hillBand(1500, 70, '#9be88a', 3) + house(240, 1520, 0.5, { wall: '#fff' }) + R(300, 1380, 40, 140, '#d0dcef') + C(320, 1380, 20, '#d0dcef') + tree(760, 1530, 0.6, t, { wind: 0.9 }) + tree(820, 1540, 0.5, t, { wind: 0.9, seed: 4 }), cam);
    s += LAY(2, hillBand(1620, 30, '#7fd65a', 4) + fieldRows(1610, 600, '#a8e05a', '#6fc24a', 10), cam);
    let near = '';
    for (let i = 0; i < 9; i++) near += L(-100 + i * 160, 1700, -100 + i * 160, 1880, '#c98a5e', 16) ;
    near += L(-200, 1740, 1300, 1740, '#e8b48c', 10) + L(-200, 1810, 1300, 1810, '#e8b48c', 10);
    for (let i = 0; i < 26; i++) { const x = hz(i, 21) * 1300 - 100, sw = Math.sin(t * 4 + i) * 10; near += P(`M${f1(x)},1920 Q${f1(x + sw)},1840 ${f1(x + 10 + sw * 2)},${f1(1760 + hz(i, 22) * 40)}`, 'none', ST(i % 2 ? PAL.grass2 : PAL.grass, 10)); }
    s += LAY(1.1, near, cam);
    return s;
  }, 'zoom', 0.25);

  /* 3 ─ MILHARES DE PESSOAS ASSUSTADAS: fileiras de rostos, guarda-chuvas abrindo, câmera recua */
  const s3 = 4.05;
  add(s3, (t, lt, Pf) => {
    const cam = CAM(t, lt, 2.3, { x: 0, y: -60, z: 0.28 }, { x: 0, y: 20, z: -0.12 }, H.ease.inOutCubic);
    const fl = flashAt(t, 5.72, 0.5, 6), jolt = flashAt(t, 5.72, 1, 4);
    const tUmb = 5.2;
    let s = sky(Pf, t, { storm: 0.62, sunX: 900, sunY: 240, sun: 0.7 });
    s += LAY(6, stormCloud(300, 560, 1.05, t, { seed: 8 }) + stormCloud(880, 520, 0.95, t, { seed: 9 }) + bolt(700, 820, 600, 4, fl * 2, 14), cam);
    s += LAY(4, hillBand(1300, 40, '#9be88a', 1) + house(150, 1320, 0.45) + house(980, 1330, 0.5, { wall: PAL.wallD }), cam);
    const rows = [[3.2, 1180, 9, 0.62], [2.4, 1250, 7, 0.75], [1.7, 1350, 5, 0.9], [1.2, 1500, 3, 1.05]];
    rows.forEach(([z, y, n, sc], r) => {
      let row = '';
      for (let i = 0; i < n; i++) {
        const id = r * 3 + i, x = 540 + (i - (n - 1) / 2) * (1080 / n) * (z > 2 ? 1.25 : 1) + (r % 2 ? 40 : -20);
        const u = H.prog(t, tUmb + hz(id, 41) * 0.5, tUmb + 0.25 + hz(id, 41) * 0.5, H.ease.outBack) * (hz(id, 42) > 0.45 ? 1 : 0);
        const look = Math.sin(id) * 0.5;
        row += G(folkBust(t, id, { scared: 0.6 + 0.4 * cl(lt * 2) + jolt * 0.5, look, umbrella: u, umbCol: ['#ff4f7b', '#3fb8ff', '#ffd84a', '#7c5cff', '#5fd16a'][id % 5] }), `translate(${f1(x)} ${f1(y - jolt * 20 * hz(id, 3))}) scale(${sc})`);
      }
      s += LAY(z, row, cam);
    });
    s += LAY(0.7, rainFx(t, 50, { a: 0.55, len: 110, w: 5, slant: 0.25 }), cam);
    s += R(0, 0, 1080, 1920, '#fff6d8', OP(fl * 0.4));
    return s;
  }, 'fade', 0.2);

  /* 4 ─ MARINGÁ: torre cônica, placa da cidade, tornado tocando o chão */
  const s4 = 6.37;
  add(s4, (t, lt, Pf) => {
    const tT = tw('tornado', 7.16), tD = tw('destruição', 8.11);
    const cam = CAM(t, lt, 2.45, { x: -120, y: 0, z: -0.05 }, { x: 140, y: -40, z: 0.3 }, H.ease.inOutSine);
    const shk = 4 + 18 * H.prog(t, tT, tD);
    cam.x += H.noise(t * 14, 3) * shk; cam.y += H.noise(t * 14, 4) * shk;
    const grow = H.prog(t, tT - 0.35, tT + 0.6, H.ease.outCubic);
    let s = sky(Pf, t, { storm: 0.55, sunX: 180, sunY: 300, sun: 0.9 });
    s += LAY(5, stormCloud(700, 600, 1.3, t, { seed: 12, anvil: 1.3 }) + cloudPuff(150, 600, 1.2, { seed: 4, t, a: 0.8 }), cam);
    s += LAY(3.4, (grow > 0 ? tornado(Pf, 780, 1380, 0.85, t, { h: 900 * grow, w: 330, a: cl(grow * 3), debris: grow > 0.6 ? 1 : 0 }) : ''), cam);
    s += LAY(3, skyline(430, 1400, 1.0) + hillBand(1420, 20, '#8fe08a', 6), cam);
    s += LAY(2, hillBand(1520, 50, PAL.grass, 7) + P('M380,1920 L520,1520 L600,1520 L900,1920Z', '#9aa6c4') + L(560, 1540, 610, 1920, '#fff', 8, 'stroke-dasharray="40 40"') + tree(160, 1640, 1.0, t, { wind: 1.4 }) + tree(1000, 1620, 0.9, t, { wind: 1.4, seed: 3 }), cam);
    /* placa verde da cidade */
    const sign = G(R(-12, 0, 24, 330, '#8a93a8') + R(198, 0, 24, 330, '#8a93a8') + R(-60, -150, 340, 160, '#2fa86a', 'rx="16" ' + ST('#fff', 8)) + TXT(110, -50, 'MARINGÁ', 66, '#ffffff') + P('M240,-140 L268,-128', 'none', ST('#fff', 4, OP(0.4))), T(120 + Math.sin(t * 9) * 2 * shk / 10, 1430, Math.sin(t * 7) * 0.6 * shk / 6, 1));
    s += LAY(1.25, sign, cam);
    let deb = '';
    for (let i = 0; i < 16; i++) { const ph = (t * (1.2 + hz(i, 51)) + hz(i, 52)) % 1, on = H.prog(t, tT + 0.3, tT + 0.6); deb += G(R(-16, -8, 32 + 20 * hz(i, 53), 16, i % 3 ? '#a2683e' : '#62cc5c', 'rx="4"'), T(1300 - ph * 1700, 300 + hz(i, 54) * 1400 + Math.sin(ph * 6) * 100, ph * 1000, 1.4), OP(on)); }
    s += LAY(0.65, deb + rainFx(t, 30, { a: 0.4, slant: 0.6, len: 120 }), cam);
    return s;
  }, 'slideL', 0.28);

  /* 5 ─ OUTRAS CIDADES: rua de casas, travelling lateral, telhado arrancado */
  const s5 = 8.82;
  add(s5, (t, lt, Pf) => {
    const tR = tw('destelhadas', 11.14);
    const cam = CAM(t, lt, 3.3, { x: -260, y: 0, z: 0 }, { x: 160, y: -60, z: 0.22 }, H.ease.inOutSine);
    const roof = H.prog(t, tR - 0.15, tR + 0.9, H.ease.inQuad);
    let s = sky(Pf, t, { storm: 0.45, sunX: 300, sunY: 260 });
    s += LAY(5, stormCloud(450, 560, 1.1, t, { seed: 14 }) + stormCloud(1050, 600, 0.9, t, { seed: 15 }), cam);
    let far = hillBand(1300, 50, '#9be88a', 8);
    for (let i = 0; i < 6; i++) far += house(-200 + i * 280, 1340, 0.55, { wall: [PAL.wallA, PAL.wallB, PAL.wallC, PAL.wallD][i % 4], seed: i, roofOff: i === 2 ? H.prog(t, 9.6, 10.6) : 0 });
    s += LAY(3, far, cam);
    let mid = R(-1000, 1480, 3200, 600, '#a6b4d4') + R(-1000, 1470, 3200, 18, '#e9eef8');
    for (let i = 0; i < 5; i++) mid += tree(-300 + i * 420, 1490, 0.9, t, { wind: 1.4, seed: i + 7 });
    s += LAY(2, mid, cam);
    s += LAY(1.3, house(720, 1560, 2.0, { wall: PAL.wallC, roof: PAL.roofA, roofOff: roof, seed: 9, t }) + house(-80, 1560, 1.8, { wall: PAL.wallB, seed: 4 }), cam);
    let fg = rainFx(t, 40, { a: 0.45, slant: 0.5, len: 120 });
    for (let i = 0; i < 10; i++) { const ph = (t * 1.4 + hz(i, 61)) % 1; fg += L(-200 + ph * 1600, 300 + hz(i, 62) * 1300, -40 + ph * 1600, 300 + hz(i, 62) * 1300, '#ffffff', 6, OP(0.5 * Math.sin(ph * Math.PI))); }
    s += LAY(0.7, fg, cam);
    return s;
  }, 'fade', 0.2);

  /* 6 ─ ÁRVORE CAI (ângulo baixo, câmera inclinada) */
  const s6 = tw('árvores', 12.15);
  add(s6, (t, lt, Pf) => {
    const fall = lt < 0.55 ? H.ease.inCubic(cl(lt / 0.55)) : 1 - 0.06 * Math.sin((lt - 0.55) * 18) * Math.exp(-(lt - 0.55) * 6);
    const cam = { x: H.noise(t * 12, 5) * 10 * H.prog(lt, 0.5, 0.6), y: H.noise(t * 12, 6) * 14 * H.prog(lt, 0.5, 0.6), z: lp(0, 0.12, lt) };
    let s = sky(Pf, t, { storm: 0.4, sunX: 860, sunY: 380 });
    s += LAY(4, stormCloud(250, 560, 1.0, t, { seed: 17 }), cam);
    s += LAY(2.5, hillBand(1450, 60, '#9be88a', 9) + house(860, 1480, 0.7, { wall: PAL.wallD }), cam);
    let mid = hillBand(1700, 30, PAL.grass, 3) + tree(430, 1720, 2.3, t, { fall: fall * 0.95, wind: 0.6, seed: 8 });
    if (lt > 0.5) { for (let i = 0; i < 18; i++) { const a = hz(i, 71) * Math.PI, sp = 300 + 500 * hz(i, 72), age = lt - 0.5; mid += G(E(0, 0, 18, 10, i % 2 ? '#62cc5c' : '#4cc25a'), T(900 + Math.cos(a) * sp * age, 1690 - Math.sin(a) * sp * age + 500 * age * age, age * 500 + i * 20, 1.3), OP(1 - age * 1.2)); mid += C(900 + (hz(i, 73) - 0.5) * 300 * (age + 0.3), 1700 - hz(i, 74) * 120 * (age + 0.2), 30 + 40 * age, '#e9c39a', OP(0.5 * (1 - age * 1.3))); } }
    s += LAY(1, mid, cam);
    s += LAY(0.7, rainFx(t, 25, { a: 0.4, len: 100 }), cam);
    return G(s, `rotate(-4 540 960)`);
  }, 'slideR', 0.2);

  /* 7 ─ GRANIZO batendo nas telhas (detalhe), rachaduras */
  const s7 = tw('pedras', 13.05);
  add(s7, (t, lt, Pf) => {
    const tD = tw('danificaram', 13.95);
    const cam = CAM(t, lt, 2.1, { x: 0, y: 40, z: -0.05 }, { x: 30, y: -30, z: 0.18 }, H.ease.inOutSine);
    let roof = tileRoof(Pf, t);
    /* rachaduras crescem a partir de 'danificaram' */
    const cracks = [[300, 820, 0], [720, 1150, 0.25], [470, 1480, 0.45], [860, 620, 0.6]];
    cracks.forEach(([x, y, dl], i) => { const k = H.prog(t, tD + dl, tD + dl + 0.25, H.ease.outCubic); if (k <= 0) return; let pts = [[x, y]]; for (let j = 1; j < 5; j++) pts.push([x + (hz(j, i + 30) - 0.5) * 120 * j * k, y + j * 30 * k]); roof += PL(pts, '#6a1f14', 6) + PL([[x, y], [x - 60 * k, y - 50 * k], [x - 90 * k, y - 40 * k]], '#6a1f14', 5) + C(x, y, 22 * k, '#8a2a1a', OP(0.5)); });
    let s = LAY(1.4, G(roof, 'translate(540 960) scale(1.35 1.1) skewX(-6) translate(-540 -960)'), cam);
    /* pedras: caem, quicam e rolam */
    let hl = '';
    for (let i = 0; i < 26; i++) {
      const t0 = s7 - 0.3 + hz(i, 81) * 2.0, hx = 80 + hz(i, 82) * 920, hy = 400 + hz(i, 83) * 1200, r = 14 + 16 * hz(i, 84);
      const age = t - t0; if (age < 0) continue;
      let x = hx, y;
      if (age < 0.3) { y = hy - (1 - age / 0.3) * 1300; x = hx - (1 - age / 0.3) * 120; }
      else { const a2 = age - 0.3; y = hy - Math.max(0, 220 * a2 - 1100 * a2 * a2) * (r / 30); x = hx + a2 * 140; }
      hl += E(hx + (age > 0.3 ? (age - 0.3) * 140 : 0), hy + r * 0.6, r * 1.1, r * 0.35, '#5a1a10', OP(0.25 * cl(1 - Math.abs(y - hy) / 300))) + hail(x, y, r);
      if (age > 0.3 && age < 0.55) { const k = (age - 0.3) / 0.25; for (let j = 0; j < 5; j++) hl += C(hx + Math.cos(j * 1.3) * 60 * k, hy - Math.sin(j * 1.3) * 40 * k, 5 * (1 - k), '#ffffff', OP(1 - k)); }
    }
    s += LAY(1.1, hl, cam);
    let big = '';
    for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + hz(i, 91)) % 1; big += hail(100 + hz(i, 92) * 880, -200 + ph * 2400, 40 + 20 * hz(i, 93), 0.8); }
    s += LAY(0.55, big, cam);
    return s;
  }, 'zoom', 0.2);

  /* 8 ─ DEFESA CIVIL: agente com tablet diante da viatura, giroflex piscando */
  const s8 = tw('segundo', 15.15);
  add(s8, (t, lt, Pf) => {
    const cam = CAM(t, lt, 1.7, { x: -60, y: 20, z: -0.05 }, { x: 40, y: -20, z: 0.16 }, H.ease.inOutSine);
    let s = sky(Pf, t, { storm: 0.2, sunX: 860, sunY: 300 });
    s += LAY(4, cloudPuff(250, 600, 1.6, { seed: 3, t }) + stormCloud(-100, 900, 1.2, t, { seed: 21, a: 0.8 }), cam);
    s += LAY(2.6, hillBand(1400, 40, '#9be88a', 4) + house(150, 1430, 0.6, { seed: 6 }) + house(960, 1430, 0.6, { wall: PAL.wallB }), cam);
    const lb = Math.floor(t * 6) % 2;
    const truck = G(R(-360, -300, 560, 250, '#ffffff', 'rx="24"') + R(200, -230, 200, 180, '#ffffff', 'rx="24"') + R(230, -210, 120, 80, '#8be0ff', 'rx="10"') + R(-360, -130, 760, 40, '#ff7a1a') + TXT(-80, -170, 'DEFESA CIVIL', 54, '#ff7a1a') + R(-300, -340, 200, 40, lb ? '#ff4f4f' : '#ffd84a', 'rx="12"') + C(-200, -320, 120, lb ? '#ff4f4f' : '#ffd84a', OP(0.18)) + C(-220, -40, 64, '#3a2f5a') + C(-220, -40, 28, '#c9c9d9') + C(260, -40, 64, '#3a2f5a') + C(260, -40, 28, '#c9c9d9') + R(-360, -60, 760, 12, '#000', OP(0.1)), '');
    s += LAY(1.8, R(-1000, 1560, 3200, 600, '#a6b4d4') + G(truck, 'translate(400 1640) scale(0.85)') + G(P('M-160,0 L160,0 L120,-30 L-120,-30Z', '#7a4024') + E(0, -60, 90, 50, '#4cc25a'), 'translate(-80 1700)'), cam);
    const talk = H.talk(c.W, t) * 0;
    s += LAY(1, G(rescuer(t, { look: Math.sin(t * 1.2) * 0.5, talk }), 'translate(760 1760) scale(1.5)'), cam);
    s += LAY(0.7, motes(t, 14, { y0: 200, y1: 1700, a: 0.5 }), cam);
    return s;
  }, 'fade', 0.22);

  /* 9 ─ 13 MIL PESSOAS: plateia de ícones enchendo o chão em perspectiva + contador */
  const s9 = 16.82;
  add(s9, (t, lt, Pf) => {
    const t13 = tw('13', 17.23);
    const cam = CAM(t, lt, 2.46, { x: 0, y: 60, z: -0.1 }, { x: 0, y: -40, z: 0.18 }, H.ease.inOutSine);
    let s = DEFS(LG(Pf + 'bg', [[0, '#ffe08a'], [0.6, '#ffb36b'], [1, '#ff8a73']])) + R(-500, -500, 2080, 2920, U(Pf + 'bg'));
    s += LAY(3, motes(t, 20, { a: 0.6, r: 8 }) + C(540, 700, 520, U(Pf + 'bg'), OP(0)), cam);
    const rows = 10, fillK = H.prog(t, t13 - 0.2, t13 + 1.6, H.ease.outQuad);
    for (let r = rows - 1; r >= 0; r--) {
      const z = 1 + r * 0.32, y = 1400 + (rows - r) * 18, n = 9 + r * 2;
      let row = '';
      for (let i = 0; i < n; i++) {
        const id = r * 30 + i, on = H.prog(fillK * 1.3, hz(id, 3) * 0.9 + r * 0.02, hz(id, 3) * 0.9 + r * 0.02 + 0.08, H.ease.outBack);
        if (on <= 0) continue;
        const x = 540 + (i - (n - 1) / 2) * 118, col = ['#ff5a5f', '#3fb8ff', '#7c5cff', '#2fa86a', '#ffb21e', '#ff7ab6'][id % 6];
        row += G(C(0, -150, 34, col) + P('M-48,-100 Q0,-130 48,-100 L56,0 L-56,0Z', col) + C(-10, -156, 5, '#fff') + C(10, -156, 5, '#fff'), T(x, y - Math.abs(Math.sin(t * 5 + id)) * 6, 0, on));
      }
      s += LAY(z, row, cam);
    }
    const n = Math.round(13000 * H.prog(t, t13 - 0.1, t13 + 0.8, H.ease.outCubic));
    const str = '+' + n.toLocaleString('pt-BR');
    const pop = H.ease.outBack(cl((t - t13 + 0.15) / 0.3), 2);
    s += G(TXT(0, 0, str, 190, '#ffffff', ST('#c2410c', 22, 'paint-order="stroke"')), `translate(540 520) scale(${pop.toFixed(3)})`, 'class="keytag"');
    s += keyTag(540, 700, 'PESSOAS AFETADAS', 64, t - t13 - 0.5, { bg: '#2a1e3a', rot: 0 });
    return s;
  }, 'iris', 0.3);

  /* 10 ─ 47 MUNICÍPIOS: mapa do Paraná com alfinetes caindo */
  const s10 = tw('em', 19.28);
  const pins = samplePoly(PARANA, 47, 7);
  add(s10, (t, lt, Pf) => {
    const cam = CAM(t, lt, 1.45, { x: 0, y: 0, z: 0.18 }, { x: 0, y: -20, z: 0.02 }, H.ease.outCubic);
    let s = mapOcean(Pf, t, { col: '#59c3f7', col2: '#a6ebff' }) + DEFS(skyDefs(Pf));
    const X0 = 520, Y0 = 1060, SC = 150, LC = -51.4, LT = -24.4;
    const prPts = PARANA.map(p => eq(p[0], p[1], X0, Y0, SC, LC, LT));
    let map = P(H.smoothPath(subdiv(prPts, 1), true, 0.25), '#1d6fb8', 'transform="translate(14 26)" opacity="0.35"') + P(H.smoothPath(subdiv(prPts, 1), true, 0.25), '#7fe07a', ST('#ffffff', 10));
    const mg = eq(-51.94, -23.42, X0, Y0, SC, LC, LT);
    map += C(mg[0], mg[1], 18, '#ff5a5f', ST('#fff', 6)) + TXT(mg[0], mg[1] - 40, 'MARINGÁ', 36, '#2a1e3a', 'class="maplabel"');
    s += LAY(1.25, map, cam);
    let pp = '';
    const cnt = Math.round(47 * H.prog(t, s10 + 0.05, s10 + 1.05));
    pins.forEach((p, i) => {
      const t0 = s10 + 0.05 + i / 47 * 1.0, age = t - t0; if (age < 0) return;
      const q = eq(p[0], p[1], X0, Y0, SC, LC, LT), drop = age < 0.18 ? (1 - age / 0.18) * 260 : 0, sq = age > 0.18 && age < 0.3 ? 1 - 0.3 * Math.sin((age - 0.18) / 0.12 * Math.PI) : 1;
      pp += E(q[0], q[1] + 4, 14, 5, '#1d3a6a', OP(0.35)) + G(P('M0,0 C-8,-20 -26,-30 -26,-50 A26,26 0 1 1 26,-50 C26,-30 8,-20 0,0Z', i % 2 ? '#ff5a5f' : '#ff8a3d', ST('#fff', 4)) + C(0, -50, 9, '#fff'), `translate(${f1(q[0])} ${f1(q[1] - drop)}) scale(${f1(1 / sq)} ${f1(sq)})`);
    });
    s += LAY(1.05, pp, cam);
    s += LAY(0.6, cloudPuff(lp(-100, 200, lt / 1.4), 1700, 1.6, { seed: 5, t, a: 0.85 }) + cloudPuff(lp(1150, 900, lt / 1.4), 380, 1.3, { seed: 6, t, a: 0.85 }), cam);
    s += G(TXT(0, 0, String(cnt), 230, '#ffffff', ST('#1d6fb8', 24, 'paint-order="stroke"')), `translate(540 470)`, 'class="keytag"');
    s += keyTag(540, 620, 'MUNICÍPIOS', 70, lt - 0.2, { bg: '#ff5a5f', rot: 2 });
    return s;
  }, 'zoom', 0.22);

  /* 11 ─ VOCÊ SABIA? Bia no quarto, olha para a câmera e levanta o dedo; ideia acende */
  const s11 = tw('mas', 20.70);
  add(s11, (t, lt, Pf) => {
    const tS = tw('sabia', 21.15), tE = tw('existe', 21.6), tF = tw('fenômeno', 22.25);
    const cam = CAM(t, lt, 3.3, { x: 30, y: 30, z: -0.06 }, { x: -20, y: -50, z: 0.2 }, H.ease.inOutSine);
    let s = DEFS(skyDefs(Pf)) + roomWall(Pf, t);
    s += LAY(2.2, windowView(Pf, t, 120, 330, 840, 760, { rain: 0.7, storm: 0.35, drops: 0.8 }) + R(80, 1280, 920, 30, '#ffffff', 'rx="10"'), cam);
    s += LAY(1.6, C(160, 420, 70, '#ffffff', OP(0)) + G(R(-14, 0, 28, 220, '#7a4fd8') + P('M-90,0 L90,0 L60,-90 L-60,-90Z', '#ffd84a') + C(0, -40, 120, U(Pf + 'glwA'), OP(0.5)), 'translate(920 1200)'), cam);
    const k1 = H.prog(t, tS - 0.15, tS + 0.15, H.ease.outBack), k2 = H.prog(t, tE - 0.2, tE + 0.15, H.ease.outBack), k3 = H.prog(t, tF, tF + 0.3, H.ease.outBack);
    const face = { lookx: lp(-0.3, 0, k1), looky: lp(0.8, 0, k1), eye: lp(0.8, 1.1, k1), brow: lp(-0.1, 0.7, k1) - 0.3 * k3, open: H.talk(c.W, t) * 0 + 0.35 * k1 * (1 - k3) , oShape: 0.2, smile: lp(0.2, 0.7, k1) + 0.3 * k3, turn: lp(-0.25, 0, k1), headTilt: lp(6, -3, k1) + 4 * k3 };
    let b = biaBust(t, Object.assign({}, face, { headTilt: face.headTilt, br: 1 }));
    b += hand(lp(320, 250, k2), lp(900, 140, k2) - 20 * Math.sin(lt * 4) * k2, 0.8, lp(20, 8, k2), 'point');
    s += LAY(1, G(b, 'translate(540 840) scale(1.45)'), cam);
    /* mesa em primeiro plano com globo de mesa */
    let desk = R(-200, 1360, 1480, 700, '#ff9a5a') + R(-200, 1360, 1480, 26, '#ffc08a');
    desk += G(L(0, 0, 0, -60, '#7a4fd8', 12) + E(0, 0, 70, 16, '#7a4fd8'), 'translate(230 1400)') + globe(Pf + 'g', t, 230, 1240, 110, -50 + t * 25, 10, { atm: 0, clouds: 0 });
    desk += G(R(-170, -110, 340, 220, '#3a2f5a', 'rx="16"') + R(-150, -92, 300, 180, '#8be0ff') + P('M-110,40 Q-40,-60 30,10 T130,-20', 'none', ST('#ff5a5f', 8)) + R(-210, 110, 420, 26, '#c9c9d9', 'rx="10"'), 'translate(800 1300) rotate(-4)');
    s += LAY(0.85, desk, cam);
    /* lâmpada da ideia */
    if (k3 > 0) s += LAY(0.95, G(C(0, 0, 160, U(Pf + 'glwA'), OP(0.9)) + C(0, 0, 70, '#fff3a0', ST('#ffb21e', 8)) + R(-30, 60, 60, 40, '#9aa0b8', 'rx="8"') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * 6.28; return L(Math.cos(a) * 100, Math.sin(a) * 100, Math.cos(a) * 140, Math.sin(a) * 140, '#ffb21e', 10); }).join(''), `translate(800 300) scale(${k3.toFixed(3)}) rotate(${f1(Math.sin(t * 3) * 6)})`), cam);
    return s;
  }, 'flash', 0.2);

  /* 12 ─ CAPAZ DE INFLUENCIAR: globo com Pacífico quente ligado por seta a uma tempestade no Paraná */
  const s12 = tw('influenciar', 24.05);
  add(s12, (t, lt, Pf) => {
    const tD = tw('diretamente', 24.52), tSit = tw('situação', 26.11);
    const cam = CAM(t, lt, 2.7, { x: -120, y: -80, z: 0.05 }, { x: 110, y: 80, z: 0.18 }, H.ease.inOutSine);
    let s = sky(Pf, t, { storm: 0.15, sunX: 900, sunY: 200 });
    s += LAY(3.2, cloudPuff(800, 520, 1.2, { seed: 7, t }) + cloudPuff(150, 1200, 1.0, { seed: 8, t }), cam);
    s += LAY(2.2, globe(Pf, t, 330, 560, 270, -105 + lt * 6, 8, { warm: 1, warmPulse: 1 }), cam);
    const pac = gpt(-130, 0, -105 + lt * 6, 8, 330, 560, 270);
    const town = [780, 1380];
    const k = H.prog(t, tD - 0.1, tD + 0.9, H.ease.inOutCubic);
    let arc = '';
    if (k > 0) {
      const mx = 860, my = 600, pts = [];
      for (let i = 0; i <= 40 * k; i++) { const u = i / 40; pts.push([(1 - u) * (1 - u) * pac[0] + 2 * (1 - u) * u * mx + u * u * town[0], (1 - u) * (1 - u) * pac[1] + 2 * (1 - u) * u * my + u * u * (town[1] - 260)]); }
      if (pts.length > 1) { arc += PL(pts, '#ff8a3d', 22, OP(0.35)) + PL(pts, '#fff3c4', 10, `stroke-dasharray="26 22" stroke-dashoffset="${f1(-t * 160)}"`); const e = pts[pts.length - 1]; arc += C(e[0], e[1], 26, '#ffb21e', ST('#fff', 6)); }
    }
    s += LAY(1.9, arc, cam);
    const storm = H.prog(t, tD + 0.7, tD + 1.3, H.ease.outBack);
    let tn = hillBand(1500, 40, '#9be88a', 3, 400, 1300) + house(640, 1500, 0.55) + house(900, 1500, 0.6, { wall: PAL.wallB }) + tree(780, 1510, 0.5, t, { wind: 1 }) + R(400, 1500, 900, 600, '#7fd65a');
    tn += stormCloud(780, 1230, 0.55 * (0.3 + 0.7 * storm), t, { seed: 22, a: cl(storm * 2) }) + bolt(780, 1230, 260, 3, flashAt(t, tSit, 1, 5) + flashAt(t, tD + 1.1, 0.8, 6), 9) + rainFx(t, 20, { x0: 650, x1: 930, y0: 1250, y1: 1500, a: 0.7 * storm, len: 40, w: 3 });
    s += LAY(1.6, tn, cam);
    s += LAY(0.7, motes(t, 12, { a: 0.4, r: 7 }), cam);
    return s;
  }, 'fade', 0.22);

  /* 13 ─ "EL NIÑO": letreiro surge sobre ondas quentes */
  const s13 = 26.74;
  add(s13, (t, lt, Pf) => {
    const tEl = tw('el', 27.6);
    const cam = CAM(t, lt, 1.45, { x: 0, y: 40, z: -0.12 }, { x: 0, y: -10, z: 0.06 }, H.ease.outCubic);
    let s = DEFS(skyDefs(Pf) + LG(Pf + 'tb', [[0, '#ffd36b'], [0.5, '#ff9a5a'], [1, '#ff6a7a']])) + R(-500, -500, 2080, 2920, U(Pf + 'tb'));
    s += LAY(5, C(540, 900, 420, U(Pf + 'sun')) + C(540, 900, 170, '#fff6b0') + [...Array(16)].map((_, i) => { const a = i / 16 * 6.28 + t * 0.3; return POLY([[540, 900], [540 + Math.cos(a - 0.06) * 1400, 900 + Math.sin(a - 0.06) * 1400], [540 + Math.cos(a + 0.06) * 1400, 900 + Math.sin(a + 0.06) * 1400]], '#fff6c8', OP(0.18)); }).join(''), cam);
    for (let w = 0; w < 4; w++) {
      const y = 1180 + w * 150, z = 3 - w * 0.55;
      let d = `M-600,${y}`; for (let x = -600; x <= 1700; x += 120) d += ` q30,${f1(-40 - 10 * Math.sin(t * 2 + x * 0.01 + w))} 60,0 q30,${f1(30 + 10 * Math.sin(t * 2 + x * 0.02))} 60,0`;
      s += LAY(z, P(d + ` L1700,2600 L-600,2600Z`, mixc('#ff8a3d', '#1e9be0', 0.25 + w * 0.22)) + P(d, 'none', ST('#ffffff', 8, OP(0.5))), cam);
    }
    const q = 1 - H.prog(t, tEl - 0.3, tEl - 0.08);
    if (q > 0) s += LAY(1.2, G(TXT(0, 0, '?', 420, '#ffffff', ST('#ff5a3c', 26, 'paint-order="stroke"')), `translate(540 ${f1(860 + Math.sin(t * 4) * 20)}) rotate(${f1(Math.sin(t * 3) * 8)}) scale(${f1(q)})`, 'class="keytag"'), cam);
    const letters = ['E', 'L', ' ', 'N', 'I', 'Ñ', 'O'];
    let tt = '';
    letters.forEach((ch, i) => {
      if (ch === ' ') return;
      const u = H.ease.outBack(cl((t - tEl + 0.08 - i * 0.03) / 0.28), 2.4); if (u <= 0) return;
      const x = 540 + (i - 3) * 118, y = 900 + Math.sin(t * 4 + i * 0.8) * 14 * u;
      tt += G(TXT(0, 0, ch, 205, '#ffffff', ST('#e8452e', 28, 'paint-order="stroke"')), `translate(${f1(x)} ${f1(y + (1 - u) * 200)}) rotate(${f1((1 - u) * (i % 2 ? 20 : -20))}) scale(${u.toFixed(3)})`);
    });
    s += LAY(1, G(tt, '', 'class="keytag"'), cam);
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28, k = H.prog(t, tEl + 0.2, tEl + 0.8); if (k > 0 && k < 1) s += LAY(0.9, sparkle(540 + Math.cos(a) * 520 * k, 860 + Math.sin(a) * 360 * k, 40 * (1 - k) + 10, 1 - k, '#fff'), cam); }
    return s;
  }, 'zoom', 0.22);

  /* 14 ─ TUDO COMEÇA MUITO LONGE: Bia anda pelo píer (lado), para e olha o horizonte */
  const s14 = tw('e', 28.15);
  add(s14, (t, lt, Pf) => {
    const tL = tw('longe', 30.43);
    const stopA = tL - 0.65 - s14, stopB = tL - 0.2 - s14, v0 = 380, SC = 1.15;
    /* distância andada = integral da velocidade (desacelera até parar) */
    let dist = 0; const N = 80;
    for (let i = 0; i < N; i++) { const u = (i + 0.5) / N * lt; dist += v0 * (1 - ez((u - stopA) / (stopB - stopA))) * (lt / N); }
    const w = 1 - ez((lt - stopA) / (stopB - stopA) * 1.1);
    const bx = 260 + dist * SC;
    const cam = { x: (bx - 480) * 1.25 + H.noise(t * 0.7, 4) * 6 + H.prog(t, tL, tL + 0.6, H.ease.inOutSine) * 90, y: -20 + H.noise(t * 0.6, 5) * 5 - H.prog(t, tL, tL + 0.6) * 40, z: H.prog(t, tL - 0.1, tL + 0.6, H.ease.inOutSine) * 0.12 };
    let s = sky(Pf, t, { storm: 0, sunX: 900 + cam.x * 0.05, sunY: 520, sun: 1 });
    s += LAY(9, cloudPuff(300, 700, 1.4, { seed: 2, t }) + cloudPuff(1100, 520, 1.1, { seed: 3, t }) + cloudPuff(1800, 760, 1.2, { seed: 5, t }), cam);
    s += LAY(6, seaSurface(Pf, t, 1180, { w0: -2000, w1: 4000 }) + boat(1500, 1180, 0.4, t) + R(-2000, 1170, 6000, 6, '#ffffff', OP(0.6)), cam);
    /* píer: tábuas e postes */
    let pier = R(-1500, 1560, 5000, 70, '#c98450') + R(-1500, 1630, 5000, 30, '#a86a3a');
    for (let i = -20; i < 60; i++) pier += L(i * 90, 1562, i * 90 + 6, 1628, '#a86a3a', 5) + (i % 4 === 0 ? R(i * 90 - 18, 1630, 36, 400, '#8a5530') : '');
    for (let i = -5; i < 18; i++) pier += R(i * 360 - 10, 1380, 20, 190, '#e8a868') + R(i * 360 - 10, 1380, 360, 16, '#e8a868', 'rx="6"');
    s += LAY(1.25, pier, cam);
    const look = H.prog(t, tL - 0.1, tL + 0.3, H.ease.outBack);
    s += LAY(1.25, BIA(t, { view: 'side', walk: w, dist, stride: 430, aR: 150 * look, eR: 70 * look, aL: 6, face: { eye: 1 - 0.3 * look, brow: 0.3 } }, bx, 1566, SC), cam);
    /* gaivotas */
    let gv = '';
    for (let i = 0; i < 3; i++) { const x = 900 + i * 260 + lt * 60, y = 600 + i * 70 + Math.sin(t * 2 + i) * 20, f = Math.sin(t * 8 + i) * 18; gv += P(`M${f1(x - 40)},${f1(y - f)} Q${f1(x - 20)},${f1(y - 20)} ${f1(x)},${f1(y)} Q${f1(x + 20)},${f1(y - 20)} ${f1(x + 40)},${f1(y - f)}`, 'none', ST('#ffffff', 7)); }
    s += LAY(3, gv, cam);
    s += LAY(0.7, motes(t, 10, { a: 0.5, x0: cam.x - 200, x1: cam.x + 1400 }), cam);
    return s;
  }, 'fade', 0.25, 1720);
  c.mb(s14 + 0.2, 30.2, 0.5);
}
