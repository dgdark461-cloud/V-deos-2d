/* env.js - cenário, carro, fogo e objetos deste vídeo. Depende de art.js. */
const ENV = {
  day:   { sky0: '#b9c9c0', sky1: '#e3e9df', far: '#8aa197', mid: '#4f6c60', near: '#1b2c27', gr0: '#34463a', gr1: '#16221c', fog: '#cfdad2', sun: 1 },
  dusk:  { sky0: '#5a4468', sky1: '#e39a68', far: '#6e5a74', mid: '#3a3a52', near: '#141826', gr0: '#232530', gr1: '#0e1018', fog: '#b98a7e', sun: 0.6 },
  night: { sky0: '#03060d', sky1: '#10203a', far: '#16283b', mid: '#0d1927', near: '#04080e', gr0: '#0b121b', gr1: '#04070b', fog: '#1c3550', sun: 0 },
};
function envPal(k) {
  const a = k < 1 ? ENV.day : ENV.dusk, b = k < 1 ? ENV.dusk : ENV.night, u = k < 1 ? k : cl(k - 1);
  const o = {};
  for (const key of Object.keys(ENV.day)) o[key] = key === 'sun' ? H.lerp(a.sun, b.sun, u) : mixc(a[key], b[key], u);
  return o;
}
/** Floresta em profundidade. k: 0 dia, 1 entardecer, 2 noite. px: deslocamento de câmera para paralaxe. W: largura total. */
function forest(Pf, t, o) {
  const d = Object.assign({ k: 0, px: 0, fog: 0.5, shafts: 0.5, ground: 1250, W: 3400, x0: -1100, moon: true, density: 1, glowFire: 0, fx: 540, fy: 1250 }, o);
  const c = envPal(d.k), gy = d.ground, x0 = d.x0, W = d.W;
  let s = `<defs><linearGradient id="${Pf}fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky0}"/><stop offset="1" stop-color="${c.sky1}"/></linearGradient>
  <linearGradient id="${Pf}fgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.gr0}"/><stop offset="1" stop-color="${c.gr1}"/></linearGradient>
  <linearGradient id="${Pf}ffog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.fog}" stop-opacity="0"/><stop offset="1" stop-color="${c.fog}" stop-opacity="0.9"/></linearGradient>
  <linearGradient id="${Pf}shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity="0.5"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient></defs>`;
  s += R(x0, -1400, W, gy + 1400, `url(#${Pf}fsky)`);
  if (d.k > 1.2 && d.moon) s += C(d.fx + 200, 380, 70, '#e6f1fa') + C(d.fx + 200, 380, 330, `url(#${Pf}glowB)`, OP(0.5)) + (() => { let q = ''; for (let i = 0; i < 70; i++) q += C(x0 + hz(i, 4) * W, -300 + hz(i, 9) * 900, 1 + hz(i, 3) * 2, '#dff2ff', OP(0.3 + 0.5 * Math.abs(Math.sin(t * 1.4 + i)))); return q; })();
  if (d.k < 1.5) s += C(d.fx - 150, 300, 260, `url(#${Pf}glowW)`, OP(0.35 * c.sun));
  const layer = (depth, n, baseCol, hTop, wMin, wMax, seed, pine, alpha = 1) => {
    const off = -d.px * (1 - depth);
    let q = `<g transform="translate(${f1(off)} 0)" ${OP(alpha)}>`;
    for (let i = 0; i < n * d.density; i++) {
      const x = x0 + (i + hz(i, seed) * 0.8) * (W / (n * d.density)), w = wMin + hz(i, seed + 1) * (wMax - wMin), top = hTop - hz(i, seed + 2) * 260;
      if (pine) {
        const h = gy - top; q += POLY([[x, top], [x - w * 2.2, top + h * 0.38], [x - w * 0.9, top + h * 0.36], [x - w * 3, top + h * 0.7], [x - w, top + h * 0.66], [x - w * 3.6, gy], [x + w * 3.6, gy], [x + w, top + h * 0.66], [x + w * 3, top + h * 0.7], [x + w * 0.9, top + h * 0.36], [x + w * 2.2, top + h * 0.38]], baseCol);
      } else {
        q += POLY([[x - w, gy + 20], [x - w * 0.62 + Math.sin(i) * 6, top], [x + w * 0.62, top], [x + w, gy + 20]], baseCol);
        if (w > 40) q += R(x - w * 0.2, top, 4, gy - top, 'rgba(255,255,255,0.05)') + L(x + w * 0.3, top + 120, x + w * 0.32, top + 300 + hz(i, seed + 5) * 300, 'rgba(0,0,0,0.25)', 6);
      }
    }
    return q + '</g>';
  };
  s += layer(0.15, 16, c.far, gy - 700, 26, 34, 11, true, 0.9);
  s += R(x0, gy - 360, W, 380, `url(#${Pf}ffog)`, OP(0.55 * d.fog));
  s += layer(0.35, 11, c.mid, gy - 900, 36, 52, 21, true, 1);
  s += R(x0, gy - 300, W, 330, `url(#${Pf}ffog)`, OP(0.5 * d.fog));
  s += R(x0, gy, W, 1400, `url(#${Pf}fgr)`);
  s += layer(0.7, 9, c.near, gy - 1500, 44, 70, 31, false, 1);
  s += R(x0, gy - 120, W, 200, `url(#${Pf}ffog)`, OP(0.45 * d.fog));
  for (let i = 0; i < 3; i++) s += E(x0 + ((hz(i, 8) * W + t * (10 + 6 * i)) % W), gy - 40 + i * 30, 520, 60, c.fog, OP(0.12 * d.fog));
  if (d.shafts > 0 && d.k < 1.4) for (let i = 0; i < 5; i++) { const x = 100 + i * 300 + Math.sin(t * 0.4 + i) * 40; s += POLY([[x, -200], [x + 70, -200], [x + 330, gy], [x + 80, gy]], `url(#${Pf}shaft)`, OP(0.4 * d.shafts * (1 - d.k))); }
  s += `<g transform="translate(${f1(-d.px * 0.1)} 0)">` + R(x0, gy + 10, W, 3, 'rgba(255,255,255,0.06)') + '</g>';
  // folhas de chão
  for (let i = 0; i < 36; i++) { const x = x0 + hz(i, 61) * W, y = gy + 30 + hz(i, 62) * 330; s += E(x, y, 10 + hz(i, 63) * 26, 3 + hz(i, 64) * 6, mixc(c.near, '#000', 0.2), OP(0.6)); }
  if (d.glowFire) s += glow(Pf, 'F', d.fx, d.fy - 160, 900 * d.glowFire, 0.5 * d.glowFire);
  return s;
}
/** troncos escuros de primeiro plano (enquadramento) com paralaxe maior */
function fgTrunks(t, px, k = 0, x0 = -400, n = 5, alpha = 1) {
  const col = mixc('#0a120f', '#000', cl(k / 2));
  let s = '';
  for (let i = 0; i < n; i++) { const x = x0 + i * 620 + hz(i, 77) * 160 - px * 0.5, w = 120 + hz(i, 78) * 120; s += POLY([[x - w / 2, 2200], [x - w * 0.32, -200], [x + w * 0.32, -200], [x + w / 2, 2200]], col, OP(alpha)); }
  return s;
}

/* ---------------------------------------------------------------- FOGO */
function fireFx(Pf, x, y, s, t, k = 1, o = {}) {
  if (k <= 0.01) return '';
  const fl = 0.8 + 0.2 * Math.sin(t * 17) + 0.1 * Math.sin(t * 31 + 1);
  let q = glow(Pf, 'F', x, y - 80 * s, 480 * s * (0.8 + 0.2 * fl) * k, 0.9);
  q += E(x, y + 6, 190 * s, 20 * s, 'rgba(0,0,0,0.4)');
  for (const [dx, a] of [[-90, -28], [90, 26], [0, 0], [-40, 12], [50, -14]]) q += G(R(-90 * s, -16 * s, 180 * s, 30 * s, '#3a2517', 'rx="14"') + R(-90 * s, -16 * s, 180 * s, 8 * s, '#59392a', 'rx="4"'), T(x + dx * s, y - 8 * s + Math.abs(dx) * 0.08 * s, a, 1));
  const tongue = (h, w, col, ph, dxo) => {
    const sw = Math.sin(t * 11 + ph) * 16 * s, hh = h * k * (0.85 + 0.25 * Math.sin(t * 13 + ph * 2));
    return P(`M${f1(x + dxo - w)},${f1(y)} C${f1(x + dxo - w * 1.2)},${f1(y - hh * 0.5)} ${f1(x + dxo + sw * 0.4)},${f1(y - hh * 0.7)} ${f1(x + dxo + sw)},${f1(y - hh)} C${f1(x + dxo + w * 0.5 + sw * 0.4)},${f1(y - hh * 0.6)} ${f1(x + dxo + w * 1.2)},${f1(y - hh * 0.4)} ${f1(x + dxo + w)},${f1(y)}Z`, col);
  };
  q += tongue(250 * s, 110 * s, PAL.fire1, 0, -30 * s) + tongue(210 * s, 90 * s, PAL.fire1, 2, 40 * s) + tongue(300 * s, 90 * s, PAL.fire2, 1, 0) + tongue(190 * s, 60 * s, PAL.fire3, 3, 6 * s) + tongue(120 * s, 40 * s, '#fff', 4, 0);
  for (let i = 0; i < 18; i++) { const ph = ((t * 0.6 + hz(i, 5)) % 1), ex = x + (hz(i, 6) - 0.5) * 140 * s + Math.sin(t * 3 + i) * 30 * ph * s, ey = y - 80 * s - ph * 520 * s * (0.5 + hz(i, 7)); q += C(ex, ey, (2 + hz(i, 8) * 4) * (1 - ph) * s, PAL.fire2, OP((1 - ph) * k)); }
  return q;
}

/* ---------------------------------------------------------------- CARRO (visto por trás) */
/** origem = centro do solo sob o carro; largura ~ 520. brake: 0..1 luz de freio. */
function carBack(Pf, o) {
  const d = Object.assign({ brake: 0, scale: 1, dust: 0, t: 0, rot: 0, headlights: 0, shake: 0 }, o);
  const sx = d.shake ? H.noise(d.t * 40, 1) * d.shake : 0;
  let s = E(0, 4, 300, 26, 'rgba(0,0,0,0.5)');
  s += R(-250, -64, 76, 64, '#0a0c10', 'rx="10"') + R(174, -64, 76, 64, '#0a0c10', 'rx="10"');
  s += P('M-262,-70 L-262,-210 Q-262,-250 -222,-262 L-176,-380 Q-160,-410 -120,-410 L120,-410 Q160,-410 176,-380 L222,-262 Q262,-250 262,-210 L262,-70Z', '#2f3b4a');
  s += P('M-150,-260 L-120,-372 Q-110,-388 -92,-388 L92,-388 Q110,-388 120,-372 L150,-260Z', '#0f161f') + P('M-150,-260 L-120,-372 L-70,-372 L-100,-260Z', 'rgba(255,255,255,0.08)');
  s += R(-262, -150, 524, 14, '#222c38') + R(-110, -120, 220, 40, '#cfd3d8', 'rx="6"') + R(-96, -112, 192, 24, '#e9ecef', 'rx="4"');
  const b = d.brake, lc = mixc('#7d1612', '#ff2a1f', b);
  for (const sg of [-1, 1]) {
    s += R(sg > 0 ? 160 : -250, -232, 90, 56, lc, 'rx="12"');
    if (b > 0.05) s += glow(Pf, 'R', sg * 205, -204, 190 * (0.6 + 0.6 * b), 0.9 * b);
  }
  s += R(-60, -236, 120, 16, lc, 'rx="6"');
  if (d.dust > 0) for (let i = 0; i < 10; i++) { const ph = (d.t * 0.7 + i / 10) % 1; s += E((hz(i, 4) - 0.5) * 520 + (ph * (i % 2 ? 160 : -160)), -30 - ph * 160, 60 + ph * 120, 40 + ph * 70, 'rgba(180,170,150,0.35)', OP(d.dust * (1 - ph))); }
  return G(s, T(sx, 0, d.rot, d.scale));
}

/* ---------------------------------------------------------------- objetos */
function phoneObj(Pf, o) {
  const d = Object.assign({ batt: 0.12, x: 0, y: 0, scale: 1, noSig: 1, t: 0, glow: 1 }, o);
  let s = glow(Pf, 'B', 0, 0, 380, 0.5 * d.glow);
  s += R(-130, -250, 260, 500, '#0d1117', 'rx="34" stroke="#2c3440" stroke-width="8"') + R(-114, -234, 228, 468, '#0b1620', 'rx="24"');
  s += R(-40, -226, 80, 12, '#000', 'rx="6"');
  for (let i = 0; i < 4; i++) s += R(-90 + i * 26, -176 - i * 10 + 30, 16, 14 + i * 10, i === 0 ? '#555' : '#2a3038', 'rx="3"');
  if (d.noSig) s += L(-98, -190, -20, -120, PAL.red, 9);
  s += R(40, -186, 66, 32, 'none', 'rx="8" stroke="#cfd8e0" stroke-width="5"') + R(106, -176, 8, 12, '#cfd8e0', 'rx="3"');
  const lowC = d.batt < 0.2 ? mixc('#ff3b30', '#ff9a3a', 0.5 + 0.5 * Math.sin(d.t * 6)) : '#6dff9a';
  s += R(46, -180, 54 * d.batt, 20, lowC, 'rx="4"');
  s += E(0, 20, 60, 60, 'none', `stroke="${lowC}" stroke-width="12" opacity="0.9" stroke-dasharray="${f1(377 * d.batt)} 400" transform="rotate(-90)"`);
  s += R(-26, 6, 52, 30, lowC, OP(0.0));
  return G(s, T(d.x, d.y, 0, d.scale));
}
function lighterObj(o) {
  const d = Object.assign({ x: 0, y: 0, scale: 1, flame: 0, t: 0, rot: 0 }, o);
  let s = R(-34, -10, 68, 190, '#b3321e', 'rx="14"') + R(-34, -10, 68, 44, '#d9d9de', 'rx="8"') + R(-22, 34, 12, 130, 'rgba(255,255,255,0.25)', 'rx="6"') + R(-14, -36, 28, 30, '#8b8f98', 'rx="6"') + C(0, -30, 12, '#444a55');
  if (d.flame > 0.02) { const fl = 0.85 + 0.15 * Math.sin(d.t * 20), h = 110 * d.flame * fl; s += P(`M-20,-40 Q-30,${f1(-40 - h * 0.5)} 0,${f1(-40 - h)} Q30,${f1(-40 - h * 0.5)} 20,-40Z`, PAL.fire1) + P(`M-11,-40 Q-16,${f1(-40 - h * 0.4)} 0,${f1(-40 - h * 0.75)} Q16,${f1(-40 - h * 0.4)} 11,-40Z`, PAL.fire3); }
  return G(s, T(d.x, d.y, d.rot, d.scale));
}
/** relógio simples (sem números): ponteiros */
function clockObj(Pf, o) {
  const d = Object.assign({ x: 0, y: 0, scale: 1, h: 0, m: 0, col: '#e8eef4', glow: 0 }, o);
  let s = '';
  if (d.glow) s += glow(Pf, 'B', 0, 0, 300, d.glow * 0.5);
  s += C(0, 0, 150, '#0d141c', 'stroke="' + d.col + '" stroke-width="12"');
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += L(Math.sin(a) * 124, -Math.cos(a) * 124, Math.sin(a) * 140, -Math.cos(a) * 140, d.col, i % 3 ? 5 : 9); }
  const ah = d.h * Math.PI * 2, am = d.m * Math.PI * 2;
  s += L(0, 0, Math.sin(ah) * 78, -Math.cos(ah) * 78, d.col, 13) + L(0, 0, Math.sin(am) * 116, -Math.cos(am) * 116, d.col, 8) + C(0, 0, 11, PAL.red);
  return G(s, T(d.x, d.y, 0, d.scale));
}
/** medidor de distância: linha com marcas (sem texto), preenchimento animado */
function gaugeBar(x, y, w, k, col = '#ffd35a', ticks = 10) {
  let s = R(x, y, w, 16, 'rgba(255,255,255,0.15)', 'rx="8"') + R(x, y, w * k, 16, col, 'rx="8"');
  for (let i = 0; i <= ticks; i++) s += L(x + w * i / ticks, y - 12, x + w * i / ticks, y + 28, 'rgba(255,255,255,0.5)', i % 5 ? 3 : 6);
  return s;
}
function bigX(cx, cy, sz, k, col = PAL.red, w = 26) {
  if (k <= 0) return '';
  return L(cx - sz * k, cy - sz * k, cx + sz * k, cy + sz * k, col, w, OP(Math.min(1, k * 2))) + L(cx + sz * k, cy - sz * k, cx - sz * k, cy + sz * k, col, w, OP(Math.min(1, k * 2)));
}
function checkMark(cx, cy, sz, k, col = '#6dff9a', w = 22) {
  if (k <= 0) return '';
  const a = [cx - sz, cy], b = [cx - sz * 0.3, cy + sz * 0.7], c = [cx + sz, cy - sz * 0.8];
  const k1 = cl(k * 2), k2 = cl(k * 2 - 1);
  return PL([a, [a[0] + (b[0] - a[0]) * k1, a[1] + (b[1] - a[1]) * k1]], col, w) + (k2 > 0 ? PL([b, [b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2]], col, w) : '');
}
/** olhos brilhando no escuro */
function eyesPair(Pf, x, y, s, col = '#ffd35a', a = 1, sep = 40) {
  return glow(Pf, 'A', x, y, 70 * s, 0.6 * a) + E(x - sep * s, y, 14 * s, 8 * s, col, OP(a)) + E(x + sep * s, y, 14 * s, 8 * s, col, OP(a)) + E(x - sep * s, y, 3 * s, 7 * s, '#000', OP(a)) + E(x + sep * s, y, 3 * s, 7 * s, '#000', OP(a));
}
/** substitui marcadores de id por ids com prefixo da cena */
function X(Pf, str) { return str.replace(/__GLOWA__/g, Pf + 'glowA').replace(/__GLOWW__/g, Pf + 'glowW').replace(/WEYE/g, Pf + 'weye'); }
