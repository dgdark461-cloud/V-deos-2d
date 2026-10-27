/* art.js - desenho específico DESTE vídeo (carro no lago). Tudo devolve strings SVG.
   Personagem original: Alex (jaqueta laranja, cabelo escuro, barba curta). */
const PAL = {
  nightTop: '#040916', nightBot: '#13274b', moon: '#e6f6ff',
  waterTop: '#1d6c88', waterMid: '#0b3047', deep: '#030d16',
  ice: '#c4e9f5', iceDark: '#5d9db8', warn: '#ff4636', amber: '#ffb340',
  jacket: '#e0782c', jacketDark: '#a8501a', pants: '#27324a', skin: '#e3aa84', hair: '#2a1b16',
  car: '#5d7390', carDark: '#3b4b63', steel: '#a9b9cb', glass: '#9fd4e6', seat: '#2b3242',
};
const f1 = n => Math.round(n * 10) / 10;
const R = (x, y, w, h, fill, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0, r))}" fill="${fill}" ${ex}/>`;
const E = (x, y, rx, ry, fill, ex = '') => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(Math.max(0, rx))}" ry="${f1(Math.max(0, ry))}" fill="${fill}" ${ex}/>`;
const P = (d, fill, ex = '') => `<path d="${d}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, stroke, w, ex = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const PL = (pts, stroke, w, ex = '') => `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const POLY = (pts, fill, ex = '') => `<polygon points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;
const G = (inner, tf = '', ex = '') => `<g transform="${tf}" ${ex}>${inner}</g>`;
const T = (x, y, rot = 0, sx = 1, sy = sx) => `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`;
const OP = v => `opacity="${Math.max(0, Math.min(1, v)).toFixed(3)}"`;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

function hex2rgb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function mixc(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); k = cl(k); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',') + ')'; }

/** cotovelo/joelho de um membro de 2 segmentos. dir=+1 dobra "para baixo/esquerda", -1 o oposto */
function ik(sx, sy, tx, ty, l1, l2, dir = 1) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || 0.001; const mx = l1 + l2 - 0.5;
  if (d > mx) { dx *= mx / d; dy *= mx / d; d = mx; }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  return [sx + dx * a / d - dy * h / d * dir, sy + dy * a / d + dx * h / d * dir];
}

/* ---------------------------------------------------------------- defs comuns (ids com prefixo da cena) */
function defs(Pf) {
  return `<defs>
  <linearGradient id="${Pf}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PAL.nightTop}"/><stop offset="1" stop-color="${PAL.nightBot}"/></linearGradient>
  <linearGradient id="${Pf}wat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PAL.waterTop}"/><stop offset="0.12" stop-color="${PAL.waterMid}"/><stop offset="0.5" stop-color="#04151f"/><stop offset="1" stop-color="${PAL.deep}"/></linearGradient>
  <radialGradient id="${Pf}glow"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.25" stop-color="${PAL.moon}" stop-opacity="0.35"/><stop offset="1" stop-color="${PAL.moon}" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.78"/></radialGradient>
  <radialGradient id="${Pf}amb"><stop offset="0" stop-color="${PAL.amber}" stop-opacity="0.8"/><stop offset="1" stop-color="${PAL.amber}" stop-opacity="0"/></radialGradient>
  <linearGradient id="${Pf}beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff2b8" stop-opacity="0.55"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient>
  </defs>`;
}
const vignette = Pf => `<rect x="0" y="0" width="1080" height="1920" fill="url(#${Pf}vig)"/>`;

/* ---------------------------------------------------------------- partículas */
function bubbles(t, x0, y0, spread, n, rise, seed = 1, speed = 0.35, rmax = 11) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const ph = ((t * speed * (0.7 + H.hash(i + seed * 50) * 0.6) + H.hash(i + seed)) % 1 + 1) % 1;
    const x = x0 + (H.hash(i + seed * 7) - 0.5) * spread + Math.sin(t * 2.3 + i) * 9 * ph;
    const y = y0 - ph * rise, r = 3 + H.hash(i + seed * 13) * rmax * (0.4 + ph * 0.8);
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="rgba(200,240,255,0.10)" stroke="rgba(210,245,255,0.55)" stroke-width="2" ${OP(Math.min(1, ph * 6) * (1 - ph * 0.6))}/>`;
  }
  return s;
}
function sparks(x, y, t, k, n = 12, len = 60) {
  if (k <= 0) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = H.hash(i + Math.floor(t * 18) * 31) * Math.PI * 2, l = len * (0.3 + H.hash(i + 7 + Math.floor(t * 18) * 17)) * k;
    const d0 = 6 + H.hash(i) * 10;
    s += L(x + Math.cos(a) * d0, y + Math.sin(a) * d0, x + Math.cos(a) * (d0 + l), y + Math.sin(a) * (d0 + l), i % 3 ? '#ffd45e' : '#fff6c8', 3, OP(k));
  }
  return s + C(x, y, 16 * k, '#fff1b0', OP(0.8 * k));
}
function stars(t, n = 60, w = 1080, h = 900, seed = 4) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = H.hash(i + seed) * w, y = H.hash(i + seed + 99) * h, r = 1 + H.hash(i + 5) * 2.2;
    s += C(x, y, r, '#dff2ff', OP(0.35 + 0.4 * Math.abs(Math.sin(t * 1.5 + i))));
  }
  return s;
}
function moonDisc(Pf, x, y, r, glow = 1) {
  return C(x, y, r * 4.2, `url(#${Pf}glow)`, OP(0.55 * glow)) + C(x, y, r, PAL.moon) + C(x - r * 0.3, y - r * 0.2, r * 0.2, '#c3dceb', OP(0.6)) + C(x + r * 0.35, y + r * 0.3, r * 0.14, '#c3dceb', OP(0.6));
}
function wavePath(x0, x1, y, amp, t, k = 0.02, step = 30) {
  let d = `M${x0},${f1(y + 4000)} L${x0},${f1(y)}`;
  for (let x = x0; x <= x1; x += step) d += ` L${x},${f1(y + Math.sin(x * k + t * 2) * amp + Math.sin(x * k * 2.3 - t * 3) * amp * 0.5)}`;
  return d + ` L${x1},${f1(y + 4000)} Z`;
}
function waveLine(x0, x1, y, amp, t, k = 0.02, step = 30) {
  let d = '';
  for (let x = x0; x <= x1; x += step) d += (d ? ' L' : 'M') + `${x},${f1(y + Math.sin(x * k + t * 2) * amp + Math.sin(x * k * 2.3 - t * 3) * amp * 0.5)}`;
  return d;
}

/* ---------------------------------------------------------------- ALEX */
function headProfile(d) {
  const sk = d.skin, sh = mixc(PAL.skin, '#7a4a3a', 0.35);
  let s = '';
  s += E(-9, 4, 8, 13, mixc(sk, '#000000', 0.12));                                         // orelha
  s += E(0, 0, 34, 40, sk);                                                                  // rosto
  s += P('M30,-2 L49,15 L30,19 Z', sk);                                                      // nariz
  s += P('M-22,14 Q2,50 32,26 L32,18 Q6,32 -22,14Z', 'rgba(55,30,22,0.28)');                 // barba curta
  const eo = cl(d.eye);
  if (eo < 0.12) s += L(10, -6, 26, -6, PAL.hair, 3.5);
  else {
    s += E(18, -6, 8, Math.max(1, 7 * eo), '#f4f4ee') + C(20 + d.look, -6, 3.6 * (d.pupil || 1), '#17100d');
    if (eo < 0.7) s += P('M9,-6 Q18,' + f1(-14 + eo * 6) + ' 27,-6 L27,-12 L9,-12Z', mixc(sk, '#000000', 0.1));  // pálpebra
  }
  const w = cl(d.worry);
  s += L(8, -20 - 7 * w, 27, -18 + 3 * w, PAL.hair, 5);                                      // sobrancelha
  const m = cl(d.mouth);
  if (m < 0.08) s += L(15, 24, 30, 23 - (d.frown || 0) * 3, '#7c3a33', 3.5);
  else s += E(23, 24, 9, 3 + 11 * m, '#3a1612') + R(15, 20.5, 16, Math.min(5, m * 7), '#f2f0e8');
  s += P('M-38,0 C-46,-52 -4,-66 26,-52 C44,-44 42,-24 36,-14 C18,-28 -6,-24 -24,-2 Z', PAL.hair);  // cabelo
  if (d.sweat) s += P('M-2,-34 Q4,-22 -2,-18 Q-8,-22 -2,-34Z', 'rgba(190,235,255,0.85)');
  return s;
}

/** Alex sentado de perfil olhando para a direita, em coordenadas do carro */
function alexSeated(o) {
  const d = Object.assign({ lean: 0, hx: 0, hy: 0, tilt: 0, eye: 1, mouth: 0, worry: 0, look: 0, handA: [10, -246], foot: [16, -78], cold: 0, sweat: 0, tremble: 0, t: 0, pupil: 1, frown: 0 }, o);
  const tr = d.tremble ? [H.noise(d.t * 38, 1) * d.tremble, H.noise(d.t * 38, 2) * d.tremble] : [0, 0];
  const hip = [-105, -130], sh = [-120 + d.lean + tr[0], -252 + tr[1]];
  const hc = [sh[0] + 4 + d.hx + tr[0] * 0.5, sh[1] - 50 + d.hy];
  const skin = mixc(PAL.skin, '#86aed4', d.cold);
  let s = '';
  const knee = ik(hip[0], hip[1], d.foot[0], d.foot[1], 92, 88, -1);
  s += PL([hip, knee, d.foot], PAL.pants, 28) + E(d.foot[0] + 14, d.foot[1] + 8, 24, 10, '#1b1f2b');
  s += L(hip[0], hip[1], sh[0], sh[1], PAL.jacket, 64);
  s += L(hip[0] + 8, hip[1] - 14, sh[0] + 8, sh[1] + 16, PAL.jacketDark, 7, 'opacity="0.5"');
  s += L(sh[0], sh[1] - 4, hc[0], hc[1] + 26, skin, 22);
  s += P(`M${f1(sh[0] - 14)},${f1(sh[1] - 14)} L${f1(sh[0] + 22)},${f1(sh[1] - 16)} L${f1(sh[0] + 6)},${f1(sh[1] + 6)}Z`, PAL.jacketDark);   // gola
  s += G(headProfile({ skin, eye: d.eye, mouth: d.mouth, worry: d.worry, look: d.look, sweat: d.sweat, pupil: d.pupil, frown: d.frown }), T(hc[0], hc[1], d.tilt));
  const el = ik(sh[0], sh[1], d.handA[0], d.handA[1], 80, 74, 1);
  s += PL([[sh[0], sh[1]], el, d.handA], PAL.jacket, 23) + PL([el, d.handA], PAL.jacketDark, 3, 'opacity="0.4"') + C(d.handA[0], d.handA[1], 12.5, skin) + C(sh[0], sh[1], 17, PAL.jacket);
  return s;
}

/** Alex de frente em close-up (origem = centro do rosto, tamanho ~ rx 190) */
function alexFace(o) {
  const d = Object.assign({ eye: 1, pupil: 1, lookx: 0, looky: 0, mouth: 0, worry: 0, tilt: 0, cold: 0, sweat: 0, red: 0, brow: 0, t: 0, tremble: 0 }, o);
  const skin = mixc(PAL.skin, '#86aed4', d.cold), dark = mixc(PAL.skin, '#000000', 0.18);
  const tx = d.tremble ? H.noise(d.t * 40, 1) * d.tremble : 0, ty = d.tremble ? H.noise(d.t * 40, 2) * d.tremble : 0;
  let s = '';
  s += P('M-330,330 Q-300,230 -170,200 L170,200 Q300,230 330,330 Z', PAL.jacket) + P('M-90,200 L0,290 L90,200 L60,170 L-60,170Z', PAL.jacketDark);
  s += R(-52, 120, 104, 110, mixc(skin, '#000', 0.08));
  s += E(-188, 20, 24, 50, dark) + E(188, 20, 24, 50, dark);
  s += P('M-176,-30 C-176,-210 176,-210 176,-30 C176,120 120,200 0,208 C-120,200 -176,120 -176,-30Z', skin);
  s += P('M-176,40 C-160,170 -70,214 0,214 C70,214 160,170 176,40 C150,120 90,160 0,164 C-90,160 -150,120 -176,40Z', 'rgba(55,30,22,0.30)');
  s += P('M-12,-10 Q-22,60 -34,80 Q0,96 34,80 Q22,60 12,-10', 'none', 'stroke="rgba(110,60,45,0.5)" stroke-width="7" stroke-linecap="round"');
  const eo = cl(d.eye), ey = -42;
  for (const sx of [-1, 1]) {
    const cx = sx * 78;
    if (eo < 0.1) s += L(cx - 40, ey + 4, cx + 40, ey + 4, PAL.hair, 8);
    else {
      s += E(cx, ey, 46, Math.max(3, 34 * eo), '#f5f4ee');
      if (d.red) s += E(cx, ey, 46, Math.max(3, 34 * eo), 'none', `stroke="rgba(220,40,40,${0.5 * d.red})" stroke-width="5"`);
      s += C(cx + d.lookx, ey + d.looky, 17 * d.pupil, '#1a110d') + C(cx + d.lookx - 5, ey + d.looky - 6, 5, '#fff', OP(0.8));
      if (eo < 0.8) s += P(`M${cx - 48},${ey} Q${cx},${f1(ey - 50 + eo * 40)} ${cx + 48},${ey} L${cx + 48},${ey - 40} L${cx - 48},${ey - 40}Z`, mixc(skin, '#000', 0.08));
    }
    const w = cl(d.worry), lift = d.brow * 14;
    s += L(cx - sx * 44, ey - 52 - 22 * w - lift, cx + sx * 44, ey - 54 + 6 * w - lift, PAL.hair, 14);
  }
  const m = cl(d.mouth), my = 120;
  if (m < 0.06) s += L(-44, my, 44, my - (d.worry * 6), '#7c3a33', 8);
  else s += E(0, my, 52, 8 + 46 * m, '#3a1612') + R(-40, my - 8 - 40 * m * 0.1, 80, Math.min(18, 10 + m * 14), '#f2f0e8', 'rx="4"') + E(0, my + 20 * m, 30, 12 * m, '#8a2f2f');
  s += P('M-190,-30 C-205,-250 205,-250 190,-30 C176,-120 120,-160 0,-160 C-120,-160 -176,-120 -190,-30Z', PAL.hair);
  s += P('M-60,-160 C-20,-180 40,-176 90,-150 L40,-120 C0,-140 -30,-136 -60,-160Z', PAL.hair);
  if (d.sweat) s += P('M130,-90 Q150,-50 130,-30 Q110,-50 130,-90Z', 'rgba(190,235,255,0.85)');
  return G(s, T(tx, ty, d.tilt));
}

/** Alex nadando (perfil, olhando +x). Origem no centro do tronco. */
function alexSwim(o) {
  const d = Object.assign({ ph: 0, eye: 1, mouth: 0, worry: 0.8, cold: 0.5, kick: 1, armAmp: 1, t: 0, pupil: 1 }, o);
  const skin = mixc(PAL.skin, '#86aed4', d.cold), hip = [-55, 0], sh = [38, 0];
  let s = '';
  const fa = [-155 - 8 * Math.cos(d.ph * 2), 22 * Math.sin(d.ph) * d.kick], fb = [-155 + 8 * Math.cos(d.ph * 2), -22 * Math.sin(d.ph) * d.kick];
  s += PL([hip, ik(hip[0], hip[1], fb[0], fb[1], 60, 60, 1), fb], mixc(PAL.pants, '#000', 0.2), 26) + E(fb[0] - 10, fb[1], 12, 20, '#161a24');
  const hb = [sh[0] + 62 * Math.cos(d.ph + Math.PI) * d.armAmp + 30, 48 * Math.sin(d.ph + Math.PI) * d.armAmp];
  s += PL([sh, ik(sh[0], sh[1], hb[0], hb[1], 48, 48, 1), hb], mixc(PAL.jacket, '#000', 0.35), 20) + C(hb[0], hb[1], 10, mixc(skin, '#000', 0.2));
  s += L(hip[0], hip[1], sh[0], sh[1], PAL.jacket, 62);
  s += PL([hip, ik(hip[0], hip[1], fa[0], fa[1], 60, 60, 1), fa], PAL.pants, 26) + E(fa[0] - 10, fa[1], 12, 20, '#1b1f2b');
  s += L(sh[0] + 6, sh[1] - 4, sh[0] + 34, sh[1] - 2, skin, 20);
  s += G(headProfile({ skin, eye: d.eye, mouth: d.mouth, worry: d.worry, look: 0, pupil: d.pupil }), T(sh[0] + 50, -6, 0, 0.92));
  const ha = [sh[0] + 62 * Math.cos(d.ph) * d.armAmp + 30, 48 * Math.sin(d.ph) * d.armAmp];
  s += PL([sh, ik(sh[0], sh[1], ha[0], ha[1], 48, 48, 1), ha], PAL.jacket, 21) + C(ha[0], ha[1], 10.5, skin) + C(sh[0], sh[1], 16, PAL.jacket);
  return s;
}

/* ---------------------------------------------------------------- CARRO (corte lateral, frente para a direita) */
const BODY = 'M-385,-75 L-385,-150 Q-380,-192 -340,-196 L-296,-196 L-228,-384 Q-220,-393 -200,-393 L20,-393 Q40,-393 52,-378 L112,-200 L300,-182 Q380,-166 385,-120 L385,-75 Z';
const GLASS = [[-290, -200], [-225, -372], [32, -372], [100, -200]];

function headrestShape(x, y, rot, glow = 0) {
  return G(R(-26, -32, 54, 62, '#262d3b', 'rx="15"') + L(-12, 26, -12, 86, PAL.steel, 7) + L(14, 26, 14, 86, PAL.steel, 7) +
    (glow ? L(-12, 26, -12, 86, '#ffffff', 3, OP(glow)) + L(14, 26, 14, 86, '#ffffff', 3, OP(glow)) : ''), T(x, y, rot));
}

function carBody(Pf, o) {
  const d = Object.assign({ innerH: 0, t: 0, lights: 0, dashOn: 1, spark: 0, alex: {}, lockGlow: 0, handleGlow: 0, crack: 0, shatter: 0, wcrack: 0, headrest: null, hideAlex: false, wheelRot: 0, doorOpen: 0, glowWindow: 0, redTint: 0, switchGlow: 0, belt: 0 }, o);
  let s = `<clipPath id="${Pf}cab"><path d="${BODY}"/></clipPath>`;
  if (d.lights > 0) s += POLY([[380, -128], [1300, -330], [1300, 90]], `url(#${Pf}beam)`, OP(d.lights));
  s += P(BODY, PAL.car);
  s += P('M112,-200 L300,-182 Q380,-166 385,-120 L385,-110 L112,-196Z', 'rgba(255,255,255,0.10)');
  s += L(-380, -168, 100, -190, 'rgba(255,255,255,0.12)', 6);
  s += R(-390, -135, 12, 34, '#ff3b2f', 'rx="4"') + E(380, -122, 10, 17, d.lights ? '#fff6c0' : '#c9c39a');
  // interior visto pelo vidro
  s += POLY(GLASS, '#0a0f18');
  s += `<g clip-path="url(#${Pf}cab)">`;
  s += POLY([[-290, -200], [-250, -340], [-120, -340], [-120, -200]], '#171d29', OP(0.9));                       // banco traseiro
  s += L(-128, -118, -170, -282, PAL.seat, 48) + R(-172, -134, 156, 26, PAL.seat, 'rx="12"');                     // banco
  if (!d.headrest) s += headrestShape(-176, -318, -14);
  // painel e volante
  s += P('M38,-196 L114,-200 L114,-232 Q80,-242 38,-226 Z', '#1b222e');
  const dashC = d.dashOn > 0 ? mixc('#101419', '#6fe0ff', d.dashOn) : '#101419';
  s += R(52, -224, 36, 13, dashC, 'rx="3"') + C(98, -216, 4, d.dashOn > 0.1 ? '#ff5a3a' : '#2a1613');
  if (d.dashOn > 0.1) s += C(70, -214, 70, `url(#${Pf}amb)`, OP(0.25 * d.dashOn));
  s += L(22, -214, -4, -238, '#0f131a', 9);
  s += E(10, -244, 8, 40, 'none', 'stroke="#10151c" stroke-width="9" transform="rotate(22 10 -244)"');
  if (!d.hideAlex) s += alexSeated(Object.assign({ t: d.t }, d.alex));
  if (d.headrest) s += headrestShape(d.headrest.x, d.headrest.y, d.headrest.rot, d.headrest.glow || 0);
  s += '</g>';
  // vidro, reflexos e rachaduras
  if (d.shatter < 1) {
    s += POLY(GLASS, 'rgba(160,215,235,0.10)', OP(1 - d.shatter));
    s += POLY([[-262, -200], [-232, -300], [-200, -300], [-236, -200]], 'rgba(255,255,255,0.10)', OP(1 - d.shatter));
    s += POLY([[-150, -200], [-100, -370], [-70, -370], [-120, -200]], 'rgba(255,255,255,0.07)', OP(1 - d.shatter));
  }
  if (d.crack > 0 && d.shatter < 1) {
    const c = [-240, -360], n = Math.round(4 + d.crack * 10);
    for (let i = 0; i < n; i++) {
      const a = H.hash(i + 3) * 2.2 + 0.3, l = 40 + d.crack * 190 * (0.4 + H.hash(i + 11));
      s += L(c[0], c[1], c[0] + Math.cos(a) * l, c[1] + Math.sin(a) * l, 'rgba(255,255,255,0.85)', 2.4, OP(1 - d.shatter));
    }
  }
  if (d.wcrack > 0) {
    for (let i = 0; i < 7; i++) { const a = H.hash(i + 21) * 1.8 + 0.2, c = [70, -300], l = 30 + 80 * d.wcrack; s += L(c[0], c[1], c[0] - Math.cos(a) * l * 0.7, c[1] + Math.sin(a) * l, 'rgba(255,255,255,0.8)', 2); }
  }
  if (d.shatter > 0) {
    for (let i = 0; i < 26; i++) {
      const bx = -280 + H.hash(i + 40) * 340, by = -360 + H.hash(i + 60) * 150, k = d.shatter, vx = (H.hash(i + 80) - 0.5) * 320 - 60, vy = (H.hash(i + 70) - 0.2) * 260;
      const sz = 12 + H.hash(i + 90) * 20, a = H.hash(i + 5) * 6.28;
      s += POLY([[0, -sz], [sz * 0.8, sz * 0.5], [-sz * 0.6, sz * 0.7]], 'rgba(190,235,250,0.7)', `transform="translate(${f1(bx + vx * k)} ${f1(by + vy * k)}) rotate(${f1(a * 57 + k * 200)})" ${OP(1 - k * 0.9)}`);
    }
  }
  // carroceria: costuras da porta, maçaneta, trava
  s += PL([[-290, -196], [-284, -82], [98, -82], [110, -198]], 'rgba(0,0,0,0.35)', 3);
  s += R(-86, -172, 62, 11, d.handleGlow ? '#ffe9a8' : PAL.steel, 'rx="5"') + (d.handleGlow ? R(-92, -178, 74, 23, 'none', `rx="10" stroke="${PAL.amber}" stroke-width="4" ${OP(d.handleGlow)}`) : '');
  s += L(-262, -205, -262, -186, '#cfd8e2', 5) + C(-262, -209, 5.5, d.lockGlow ? PAL.warn : '#cfd8e2');
  if (d.lockGlow) s += C(-262, -205, 24 + 8 * Math.sin(d.t * 10), 'none', `stroke="${PAL.warn}" stroke-width="4" ${OP(d.lockGlow)}`);
  if (d.switchGlow) s += R(-60, -204, 34, 14, PAL.amber, `rx="4" ${OP(d.switchGlow)}`);
  if (d.doorOpen > 0) {
    const k = 1 - 0.62 * d.doorOpen;
    s += G(POLY([[-290, -200], [-225, -372], [32, -372], [100, -200], [110, -198], [98, -82], [-284, -82], [-290, -196]], 'rgba(10,20,30,0.55)', 'stroke="rgba(190,240,255,0.9)" stroke-width="4"'), `translate(100 0) scale(${k.toFixed(3)} 1) translate(-100 0)`);
  }
  if (d.glowWindow) s += POLY(GLASS, 'none', `stroke="#6dff9a" stroke-width="${5 + 3 * Math.sin(d.t * 8)}" stroke-linejoin="round" ${OP(d.glowWindow)}`);
  // rodas
  for (const wx of [-250, 250]) {
    s += C(wx, -62, 63, '#11151c') + C(wx, -62, 36, '#8f9cac') + C(wx, -62, 10, '#444e5c');
    for (let k = 0; k < 5; k++) { const a = d.wheelRot + k * 1.2566; s += L(wx, -62, wx + Math.cos(a) * 33, -62 + Math.sin(a) * 33, '#566274', 5); }
  }
  // água dentro da cabine
  if (d.innerH > 0) {
    const y = -75 - d.innerH + 75;     // topo da água em coordenadas locais = -innerH
    s += `<g clip-path="url(#${Pf}cab)">` + R(-430, -d.innerH + 8, 860, d.innerH + 120, 'rgba(14,74,100,0.58)') +
      `<path d="${waveLine(-430, 430, -d.innerH, 5, d.t, 0.04, 20)}" stroke="rgba(170,235,250,0.9)" stroke-width="5" fill="none"/>` +
      R(-430, -d.innerH + 10, 860, 26, 'rgba(255,255,255,0.07)') + '</g>';
  }
  if (d.redTint) s += `<g clip-path="url(#${Pf}cab)">` + R(-430, -430, 860, 520, PAL.warn, OP(d.redTint)) + '</g>';
  if (d.spark) s += sparks(70, -214, d.t, d.spark, 12, 70);
  return s;
}

/** Mundo + carro. o: {zoom,fx,fy,rot,shake,carDy,tilt,outerH,innerH,bed,ice,holeX,shaft,dark,...car params} */
function carWorld(Pf, t, o) {
  const d = Object.assign({ zoom: 1, fx: 0, fy: -200, rot: 0, shake: 0, carDy: 0, tilt: 0, outerH: 0, sky: true, bed: null, ice: false, shaft: 0, dark: 0, extra: '', extraCar: '', bub: 0, tone: 0, moon: true }, o);
  const cx = 540, cy = 1000 + d.carDy, wy = cy - d.outerH;
  const sx = d.shake ? H.noise(t * 40, 1) * d.shake : 0, sy = d.shake ? H.noise(t * 40, 2) * d.shake : 0;
  let s = defs(Pf);
  s += `<g transform="translate(${f1(540 + sx)} ${f1(960 + sy)}) rotate(${f1(d.rot)}) scale(${d.zoom.toFixed(3)}) translate(${f1(-(cx + d.fx))} ${f1(-(cy + d.fy))})">`;
  const top = -3000;
  if (d.sky) {
    s += R(-2500, top, 6000, wy - top + 40, `url(#${Pf}sky)`) + G(stars(t, 80, 3200, 1100, 9), 'translate(-1000 -400)');
    if (d.moon) s += moonDisc(Pf, 900, wy - 760, 70, 1);
  }
  s += R(-2500, wy, 6000, 6000, `url(#${Pf}wat)`);
  if (d.ice) {
    const hx = d.holeX === undefined ? 540 : d.holeX, hw = d.holeW || 230;
    s += POLY([[-2500, wy - 110], [hx - hw, wy - 110], [hx - hw + 40, wy + 10], [hx - hw + 110, wy - 30], [hx - hw + 134, wy + 40], [-2500, wy + 30]], PAL.ice) +
      POLY([[hx + hw, wy - 110], [3500, wy - 110], [3500, wy + 30], [hx + hw - 120, wy + 50], [hx + hw - 80, wy - 20]], PAL.ice) +
      R(-2500, wy + 24, 2200, 10, 'rgba(255,255,255,0.3)');
  } else s += `<path d="${waveLine(-1500, 2600, wy, 7, t, 0.02)}" stroke="rgba(170,235,255,0.9)" stroke-width="5" fill="none"/>`;
  if (d.shaft > 0) {
    for (let i = 0; i < 4; i++) { const x = 540 - 130 + i * 90; s += POLY([[x - 20, wy], [x + 20, wy], [x + 170 + i * 40, wy + 1800], [x - 200 + i * 30, wy + 1800]], 'rgba(170,235,255,1)', OP(0.05 * d.shaft)); }
  }
  if (d.bed !== null) {
    const by = cy + d.bed;
    s += P(`M-2500,${by} Q-800,${by - 70} 300,${by - 10} T2600,${by - 30} L2600,${by + 800} L-2500,${by + 800}Z`, '#0c1a24') + P(`M-2500,${by + 6} Q-800,${by - 60} 300,${by} T2600,${by - 20}`, 'none', 'stroke="#223a4a" stroke-width="6"');
  }
  s += `<g transform="${T(cx, cy, d.tilt)}">${carBody(Pf, Object.assign({ t }, d.car || {}))}${d.extraCar}</g>`;
  if (d.outerH > 0) s += R(cx - 700, wy, 1400, 1600, 'rgba(8,60,85,0.16)');
  if (d.bub) s += bubbles(t, cx, cy - 150, 700, d.bub, 700, 3);
  s += d.extra + '</g>';
  if (d.dark > 0) s += R(0, 0, 1080, 1920, '#000', OP(d.dark));
  return s;
}
