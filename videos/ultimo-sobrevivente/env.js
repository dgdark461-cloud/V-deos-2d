/* env.js - cenários: cidade vazia, rua em perspectiva, quarto, estação, trem, terraço, porta. */
function skyPal(k) {
  // k: 0 manhã fria e cinza, 1 entardecer, 2 noite
  const a = [['#6f8c98', '#c5d3d1'], ['#26324e', '#d68f6a'], ['#04070f', '#16233d']];
  const i = Math.min(1, Math.floor(k)), f = k - i;
  return [mixc(a[i][0], a[i + 1] ? a[i + 1][0] : a[i][0], f), mixc(a[i][1], a[i + 1] ? a[i + 1][1] : a[i][1], f)];
}
/** skyline plana com janelas. lights 0..1 = fração de janelas acesas */
function skyline(Pf, t, o) {
  const d = Object.assign({ k: 0, px: 0, y: 1250, lights: 0.0, layers: 2, w: 1080, flick: 0, clouds: 1, moon: 0, sunx: -1 }, o);
  const [c0, c1] = skyPal(d.k);
  let s = `<defs><linearGradient id="${Pf}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>`;
  s += R(-300, -300, 1700, d.y + 320, `url(#${Pf}sk)`);
  if (d.moon) s += glow(Pf, 'B', 800, 380, 260, 0.5 * d.moon) + C(800, 380, 64, '#eaf3fb', OP(d.moon));
  if (d.k < 1.2 && d.clouds) for (let i = 0; i < 5; i++) { const x = ((hz(i, 7) * 1600 + t * (8 + 6 * hz(i, 8))) % 1700) - 300; s += E(x, 260 + hz(i, 9) * 560, 250 + 130 * hz(i, 4), 38 + 22 * hz(i, 5), 'rgba(255,255,255,0.18)'); }
  if (d.k > 1.6) for (let i = 0; i < 40; i++) s += C(hz(i, 70) * 1080, hz(i, 71) * 700, 1 + 2 * hz(i, 72), '#fff', OP(0.3 + 0.6 * Math.abs(Math.sin(t * 1.5 + i))));
  for (let L_ = 0; L_ < d.layers; L_++) {
    const par = 0.25 + 0.35 * L_, col = mixc(['#4c6672', '#2b3d49'][L_] || '#2b3d49', '#02050a', cl(d.k / 2) * 0.88);
    for (let i = 0; i < 14; i++) {
      const w = 110 + hz(i, 80 + L_) * 120, x = -260 + i * 150 * (L_ ? 1.05 : 1) - d.px * par, h = (L_ ? 340 : 520) + hz(i, 82 + L_) * (L_ ? 360 : 640);
      s += R(x, d.y - h, w, h + 400, col);
      if (hz(i, 90 + L_) > 0.6) s += R(x + w * 0.4, d.y - h - 70, 8, 70, col);
      if (d.lights > 0 || d.k < 1) for (let r = 0; r < h / 62; r++) for (let q = 0; q < w / 40; q++) {
        const on = hz(r * 13 + q, i * 3 + L_ + 5);
        const lit = d.lights > 0 && on < d.lights * 0.5 * (1 + 0.0 * d.flick);
        const fl = d.flick ? (Math.sin(t * 17 + r * 3 + q * 5 + i) > 0.2 ? 1 : 0.2) : 1;
        if (lit) s += R(x + 12 + q * 40, d.y - h + 18 + r * 62, 20, 28, on < 0.18 ? '#ffd98a' : '#bfe6ff', OP((0.55 + 0.35 * hz(r + q, i)) * fl));
        else if (d.k < 1) s += R(x + 12 + q * 40, d.y - h + 18 + r * 62, 20, 28, 'rgba(10,25,32,0.35)');
      }
    }
  }
  return s;
}

/** rua em perspectiva, ponto de fuga (540,vy). abandoned: carros parados. dolly: avanço (0..1 cíclico) */
function streetView(Pf, t, o) {
  const d = Object.assign({ k: 0, vy: 820, dolly: 0, cars: 1, lights: 0, tl: 1, px: 0, fog: 0.5, trash: 1, side: 1 }, o);
  const [c0, c1] = skyPal(d.k);
  let s = `<defs><linearGradient id="${Pf}stsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient>
  <linearGradient id="${Pf}stgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mixc('#4b5b64', '#0a1017', d.k / 2)}"/><stop offset="1" stop-color="${mixc('#2a343b', '#04070b', d.k / 2)}"/></linearGradient></defs>`;
  const vx = 540, vy = d.vy;
  s += R(-100, -100, 1280, vy + 100, `url(#${Pf}stsk)`);
  if (d.k < 1.2) for (let i = 0; i < 4; i++) { const x = ((hz(i, 7) * 1500 + t * 10) % 1600) - 250; s += E(x, 220 + hz(i, 9) * 400, 260, 36, 'rgba(255,255,255,0.16)'); }
  // prédios dos dois lados (fatias em profundidade)
  const slices = 8;
  for (let side = -1; side <= 1; side += 2) {
    for (let j = slices - 1; j >= 0; j--) {
      const z0 = (j + d.dolly) / slices, z1 = (j + 1 + d.dolly) / slices;
      const f0 = 1 / (0.2 + z0 * 2.4), f1_ = 1 / (0.2 + z1 * 2.4);
      const xn = vx + side * 760 * f0 / 5, xf = vx + side * 760 * f1_ / 5;
      const hn = 1500 * f0 / 5, hf = 1500 * f1_ / 5;
      const base = mixc(j % 2 ? '#52666f' : '#475a64', '#02050a', d.k / 2 * 0.85);
      const shade = mixc(base, '#000', 0.25);
      s += POLY([[xn, vy - hn * 0.62], [xf, vy - hf * 0.62], [xf, vy + hf * 0.25], [xn, vy + hn * 0.25]], j % 2 ? base : shade);
      // janelas
      for (let r = 0; r < 6; r++) for (let q = 0; q < 2; q++) {
        const u0 = (q * 2 + 0.6) / 4.4, u1 = (q * 2 + 1.6) / 4.4, yy = -0.55 + r * 0.17;
        const px0 = xn + (xf - xn) * u0, px1 = xn + (xf - xn) * u1;
        const py0n = vy + hn * yy, py0f = vy + hf * yy, h0 = hn * 0.1, h1 = hf * 0.1;
        const pa = py0n + (py0f - py0n) * u0, pb = py0n + (py0f - py0n) * u1;
        const lit = d.lights > 0 && hz(r * 5 + q, j * 7 + side + 3) < d.lights * 0.5;
        s += POLY([[px0, pa], [px1, pb], [px1, pb + h1 + (h0 - h1) * 0.5], [px0, pa + h0]], lit ? '#ffd98a' : 'rgba(8,18,24,0.55)', lit ? OP(0.8) : '');
      }
    }
  }
  s += POLY([[vx - 60, vy], [vx + 60, vy], [1500, 1920], [-420, 1920]], `url(#${Pf}stgr)`);
  // calçadas
  s += POLY([[vx - 60, vy], [vx - 90, vy], [-420, 1920], [-620, 1920]], '#5a6a72', OP(0.6)) + POLY([[vx + 60, vy], [vx + 90, vy], [1620, 1920], [1500, 1920]], '#5a6a72', OP(0.6));
  // faixas
  for (let i = 0; i < 10; i++) {
    const z0 = (i + d.dolly) / 10, z1 = z0 + 0.04, f0 = 1 / (0.2 + z0 * 2.4), f1_ = 1 / (0.2 + z1 * 2.4);
    const y0 = vy + 1100 * f0 / 5 * 0.55, y1 = vy + 1100 * f1_ / 5 * 0.55, w0 = 18 * f0, w1 = 18 * f1_;
    s += POLY([[vx - w0, y0], [vx + w0, y0], [vx + w1, y1], [vx - w1, y1]], 'rgba(235,225,170,0.55)');
  }
  // carros abandonados
  if (d.cars) for (let n = 0; n < 5; n++) {
    const z = (n * 0.19 + 0.12 + d.dolly / 8) % 1, f = 1 / (0.2 + z * 2.4), side = n % 2 ? 1 : -1, cx = vx + side * (230 + 120 * (n % 3 === 0)) * f / 2.2, cy = vy + 1100 * f / 5 * 0.62, sc = f / 2.2;
    const col = ['#8a2f2f', '#3d5a74', '#c9c3b1', '#2c3a3a', '#a77a2a'][n];
    s += G(R(-180, -90, 360, 70, mixc(col, '#000', d.k / 2 * 0.8), 'rx="22"') + R(-110, -150, 220, 70, mixc(col, '#000', 0.3 + d.k / 2 * 0.6), 'rx="26"') + R(-90, -138, 80, 44, 'rgba(10,20,28,0.7)', 'rx="8"') + R(10, -138, 80, 44, 'rgba(10,20,28,0.7)', 'rx="8"') + C(-110, -22, 34, '#0b0f14') + C(110, -22, 34, '#0b0f14') + (d.k > 0.9 ? C(-165, -62, 10, '#ffd98a', OP(0.2)) : ''), `translate(${f1(cx)} ${f1(cy)}) scale(${sc.toFixed(3)})`);
  }
  // semáforo
  if (d.tl) { const f = 1 / (0.2 + 0.25 * 2.4), sx = vx - 150 * f / 2.2 * 1.2, cyc = Math.floor(t * 0.7) % 3; s += G(R(-8, -380, 16, 380, '#1c2630') + R(-34, -470, 68, 130, '#0f161c', 'rx="12"') + C(0, -440, 14, cyc === 0 ? '#ff4040' : '#3a1a1a') + C(0, -406, 14, cyc === 1 ? '#ffd040' : '#3a331a') + C(0, -372, 14, cyc === 2 ? '#40ff70' : '#1a3a22'), `translate(${f1(sx)} ${f1(vy + 280)}) scale(${(f * 0.6).toFixed(3)})`); }
  // névoa
  s += R(-100, vy - 260, 1280, 520, `rgba(${d.k < 1.5 ? '190,210,215' : '40,60,90'},${(0.18 * d.fog).toFixed(2)})`);
  // lixo / sacola voando
  if (d.trash) { const ph = (t * 0.12) % 1, x = -100 + ph * 1300, y = 1450 + 40 * Math.sin(ph * 14) - 100 * Math.sin(ph * 3); s += G(P('M0,0 Q20,-26 46,-8 Q30,10 40,30 Q10,24 -6,32 Q4,10 0,0Z', 'rgba(235,240,245,0.85)'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(t * 120)})`); }
  return s;
}

/** quarto (visão frontal da cama) */
function bedroom(Pf, t, o) {
  const d = Object.assign({ light: 0.7, k: 0, awake: 0 }, o);
  let s = R(-100, -100, 1300, 2200, '#1d2a32') + R(-100, 1180, 1300, 800, '#2b2420');
  s += R(150, 300, 380, 520, mixc('#7aa0b4', '#091018', 0.3 * (1 - d.light)), 'stroke="#0f1b22" stroke-width="18"') + L(340, 300, 340, 820, '#0f1b22', 12) + L(150, 560, 530, 560, '#0f1b22', 12);
  s += POLY([[150, 820], [530, 820], [900, 1500], [-100, 1500]], '#d7c7a1', OP(0.12 * d.light));
  s += R(560, 1000, 360, 300, '#4b3b33', 'rx="10"') + R(600, 940, 280, 70, '#8c7a66', 'rx="14"');
  s += R(-100, 1120, 780, 180, '#3a5668', 'rx="30"') + R(-100, 1180, 780, 200, '#2a4150');
  return s;
}

/** plataforma e trem (visão frontal). doors 0..1 abertura */
function platformTrain(Pf, t, o) {
  const d = Object.assign({ doors: 1, lights: 1, inside: 1, px: 0 }, o);
  let s = `<defs><linearGradient id="${Pf}pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1a1f"/><stop offset="1" stop-color="#273138"/></linearGradient></defs>`;
  s += R(-100, -100, 1300, 2200, `url(#${Pf}pl)`);
  for (let i = 0; i < 6; i++) { const x = -160 + i * 260 - d.px * 0.3; s += R(x, 0, 36, 1300, '#1a262c') + R(x - 60, 80, 156, 18, '#c8e7d0', OP(0.55 + 0.25 * Math.sin(t * 9 + i * 2) * (hz(i, 2) > 0.7 ? 1 : 0))) ; }
  s += R(-100, 1180, 1300, 240, '#2c3a40') + R(-100, 1380, 1300, 20, '#d6c24a');
  // trem
  s += R(-100, 560, 1300, 640, '#8fa3ad') + R(-100, 560, 1300, 36, '#c63c3c') + R(-100, 1130, 1300, 70, '#5d6f78');
  for (let i = 0; i < 3; i++) {
    const x = -20 + i * 380 - d.px * 0.1, dw = 150 * d.doors;
    s += R(x, 620, 340, 480, '#243038') + R(x + 20, 640, 300, 440, d.inside ? '#d8f2d0' : '#0d1418', OP(d.inside ? 0.9 * d.lights : 1));
    s += R(x + 170 - dw, 620, dw, 500, '#6f838d', 'stroke="#46565e" stroke-width="6"') + R(x + 170, 620, dw, 500, '#6f838d', 'stroke="#46565e" stroke-width="6"');
    if (d.inside) for (let q = 0; q < 2; q++) s += R(x + 40 + q * 150, 940, 110, 40, '#3c5568', 'rx="10"');
  }
  return s;
}

/** porta frontal (corredor/apartamento) */
function doorView(Pf, t, o) {
  const d = Object.assign({ open: 0, light: 1, k: 1 }, o);
  let s = R(-100, -100, 1300, 2200, '#1a232a') + R(-100, 1500, 1300, 500, '#2a2320');
  s += R(250, 360, 580, 1160, '#0b0e12');
  s += P(`M250,360 L830,360 L830,1520 L250,1520Z`, '#3b2c24');
  s += R(290, 400, 500, 520, '#47362b', 'rx="12"') + R(290, 960, 500, 520, '#47362b', 'rx="12"');
  s += C(720, 960, 24, '#c9a45a') + R(700, 954, 60, 12, '#c9a45a', 'rx="6"');
  s += C(540, 520, 22, '#1c1410') + C(540, 520, 12, '#05070a') + C(540, 520, 5, '#7ae0ff', OP(0.4));
  s += R(250, 1500, 580, 22, `rgba(255,214,120,${(0.8 * d.light).toFixed(2)})`);
  return s;
}

/** terraço à noite: horizonte, rio, prédio distante com janela */
function rooftopNight(Pf, t, o) {
  const d = Object.assign({ win: 0, k: 2, px: 0, moon: 1, winGlow: 1, lights: 0, dawn: 0 }, o);
  let s = skyline(Pf, t, { k: d.k, px: d.px, y: 1150, lights: d.lights, layers: 2, moon: d.moon });
  // rio
  s += R(-100, 1100, 1300, 420, mixc('#10243a', '#3a5a7a', d.dawn));
  for (let i = 0; i < 16; i++) { const y = 1130 + i * 26, ph = Math.sin(t * 1.2 + i * 1.7); s += L(100 + hz(i, 4) * 800 + ph * 30, y, 220 + hz(i, 5) * 800 + ph * 30, y, 'rgba(200,225,255,0.16)', 3); }
  // prédio distante (outra margem)
  s += R(640, 780, 210, 380, mixc('#0a121c', '#34475a', d.dawn)) + R(700, 730, 90, 60, mixc('#0a121c', '#34475a', d.dawn));
  for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) s += R(662 + q * 62, 810 + r * 80, 30, 44, '#0a1018', OP(0.5));
  if (d.win > 0.01) s += glow(Pf, 'A', 745, 890, 160 * d.win + 30, 0.9 * d.win) + R(722, 868, 46, 56, '#ffd77a', OP(d.win)) + L(745, 868, 745, 924, '#8a5a1a', 4, OP(d.win)) + L(722, 896, 768, 896, '#8a5a1a', 4, OP(d.win));
  // reflexo da janela
  if (d.win > 0.01) s += R(735, 1160, 20, 280, 'rgba(255,215,120,0.28)', OP(d.win));
  // borda do terraço
  s += R(-100, 1500, 1300, 500, '#1a2025') + R(-100, 1480, 1300, 40, '#3a444a');
  return s;
}
