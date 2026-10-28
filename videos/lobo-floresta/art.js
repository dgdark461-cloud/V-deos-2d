/* art.js - desenho deste vídeo (floresta, mulher, lobo, homem). Tudo devolve strings SVG.
   Estética: thriller sombrio, verdes-acinzentados em névoa, azul gelado da lua, laranja do fogo, vermelho de alerta. */
const PAL = {
  skin: '#e9bb9c', skinSh: '#b87a62', hair: '#2b1a14', hairHi: '#5a3a2c', sweater: '#e7dcc9', sweaterSh: '#b4a68c', scarf: '#c92f2b',
  jeans: '#2d3a58', boot: '#4a3226',
  wolf: '#8d9298', wolfDk: '#4b5056', wolfLt: '#cfd2d4', amber: '#ffb52e', red: '#ff3b30', fire1: '#ff7a1f', fire2: '#ffc44d', fire3: '#fff2b0',
  ink: '#05080c', moon: '#dbe9f4', bagBlack: '#0b0b0e',
};
const f1 = n => Math.round(n * 10) / 10;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const R = (x, y, w, h, fill, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0, r))}" fill="${fill}" ${ex}/>`;
const E = (x, y, rx, ry, fill, ex = '') => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(Math.max(0, rx))}" ry="${f1(Math.max(0, ry))}" fill="${fill}" ${ex}/>`;
const P = (d, fill, ex = '') => `<path d="${d}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, stroke, w, ex = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const PL = (pts, stroke, w, ex = '') => `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const POLY = (pts, fill, ex = '') => `<polygon points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${fill}" ${ex}/>`;
const G = (inner, tf = '', ex = '') => `<g transform="${tf}" ${ex}>${inner}</g>`;
const T = (x, y, rot = 0, sx = 1, sy = sx) => `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`;
const OP = v => `opacity="${cl(v).toFixed(3)}"`;
const hex2rgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
function mixc(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); k = cl(k); return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',') + ')'; }
const hz = (n, s = 0) => H.hash(n * 1.0 + s * 131);

/* ---------------------------------------------------------------- defs e overlays comuns */
function defsC(Pf) {
  return `<defs>
  <radialGradient id="${Pf}vig" cx="0.5" cy="0.5" r="0.78"><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.82"/></radialGradient>
  <radialGradient id="${Pf}glowW" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowF" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb347" stop-opacity="0.95"/><stop offset="0.45" stop-color="#ff6a1a" stop-opacity="0.35"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowR" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff3b30" stop-opacity="0.95"/><stop offset="1" stop-color="#ff3b30" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowB" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#9fd0ff" stop-opacity="0.9"/><stop offset="1" stop-color="#9fd0ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${Pf}glowA" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd35a" stop-opacity="1"/><stop offset="0.5" stop-color="#ffb52e" stop-opacity="0.45"/><stop offset="1" stop-color="#ffb52e" stop-opacity="0"/></radialGradient>
  </defs>`;
}
const vignette = (Pf, a = 1) => `<rect x="0" y="0" width="1080" height="1920" fill="url(#${Pf}vig)" ${OP(a)}/>`;
const glow = (Pf, kind, x, y, r, a = 1) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#${Pf}glow${kind})" ${OP(a)}/>`;
const flash = (c, a) => a > 0.005 ? R(0, 0, 1080, 1920, c, OP(a)) : '';
/** faixas de cinema simples (sem texto): cantos escuros de câmera tremida */
function grain(t, a = 0.06) {
  let s = '';
  for (let i = 0; i < 18; i++) {
    const x = hz(i, Math.floor(t * 24)) * 1080, y = hz(i + 40, Math.floor(t * 24)) * 1920;
    s += R(x, y, 2 + hz(i + 9) * 5, 2 + hz(i + 11) * 5, '#fff', OP(a * hz(i + 3)));
  }
  return s;
}

/* ---------------------------------------------------------------- MULHER (rosto de frente, close-up) */
function womanFace(o) {
  const d = Object.assign({ eye: 1, pupil: 1, lookx: 0, looky: 0, worry: 0, anger: 0, mouth: 0, smile: 0, tilt: 0, cold: 0, sweat: 0, tremble: 0, t: 0, mess: 0, scarf: 1, tear: 0, dirt: 0, shadow: 0, bodyLen: 430 }, o);
  const skin = mixc(PAL.skin, '#8fb0d6', d.cold), skd = mixc(PAL.skinSh, '#4c5f86', d.cold);
  const tx = d.tremble ? H.noise(d.t * 40, 1) * d.tremble : 0, ty = d.tremble ? H.noise(d.t * 40, 2) * d.tremble : 0;
  let s = '';
  s += P('M-215,-40 C-262,130 -240,320 -200,400 L200,400 C240,320 262,130 215,-40 C205,-235 -205,-235 -215,-40Z', PAL.hair);
  s += P(`M-330,${d.bodyLen} Q-320,255 -190,222 L190,222 Q320,255 330,${d.bodyLen}Z`, PAL.sweater) + P(`M-330,${d.bodyLen} Q-320,255 -190,222 L-120,222 Q-230,300 -250,${d.bodyLen}Z`, PAL.sweaterSh, OP(0.6));
  s += R(-60, 110, 120, 130, skin) + R(-60, 110, 120, 44, skd, OP(0.5));
  if (d.scarf) s += P('M-205,215 Q0,300 205,215 L225,270 Q0,365 -225,270Z', PAL.scarf) + P('M-60,262 Q-40,360 -70,410 L-20,400 Q0,330 20,262Z', mixc(PAL.scarf, '#000', 0.25));
  s += E(-168, 20, 20, 36, skd) + E(168, 20, 20, 36, skd);
  s += P('M-165,-40 C-165,-200 165,-200 165,-40 C165,90 110,190 0,205 C-110,190 -165,90 -165,-40Z', skin);
  s += P('M-165,30 C-150,140 -80,200 0,205 C80,200 150,140 165,30 C140,110 80,160 0,166 C-80,160 -140,110 -165,30Z', skd, OP(0.35));
  s += E(-98, 78, 42, 22, '#e07a7a', OP(0.2 + 0.2 * d.smile)) + E(98, 78, 42, 22, '#e07a7a', OP(0.2 + 0.2 * d.smile));
  s += P('M-9,10 Q-18,56 -26,70 Q0,84 26,70', 'none', `stroke="${skd}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"`);
  const eo = cl(d.eye), ey = -24;
  for (const sx of [-1, 1]) {
    const cx = sx * 74;
    if (eo < 0.1) s += P(`M${cx - 44},${ey + 4} Q${cx},${ey + 22} ${cx + 44},${ey + 4}`, 'none', `stroke="${PAL.hair}" stroke-width="7" stroke-linecap="round"`);
    else {
      s += E(cx, ey, 46, Math.max(3, 33 * eo), '#f7f3ee');
      if (d.tear) s += E(cx, ey + 36 * eo, 40, 5, '#bfe4ff', OP(0.7));
      const cid = 'WEYEf' + (sx > 0 ? 'R' : 'L');
      s += `<clipPath id="${cid}"><ellipse cx="${cx}" cy="${ey}" rx="46" ry="${f1(Math.max(3, 33 * eo))}"/></clipPath><g clip-path="url(#${cid})">` + C(cx + d.lookx, ey + d.looky, 20 * d.pupil + 3, '#4a2f22') + C(cx + d.lookx, ey + d.looky, 11 * d.pupil, '#0b0605') + C(cx + d.lookx - 7, ey + d.looky - 8, 5.5, '#fff', OP(0.9)) + '</g>';
      s += P(`M${cx - 48},${ey + 3} Q${cx},${f1(ey - 46 * eo - 2)} ${cx + 48},${ey + 3}`, 'none', `stroke="${PAL.hair}" stroke-width="8" stroke-linecap="round"`);
      s += L(cx + sx * 44, ey - 2, cx + sx * 58, ey - 12, PAL.hair, 5) + L(cx + sx * 36, ey - 12, cx + sx * 48, ey - 26, PAL.hair, 4);
      if (eo < 0.75) s += P(`M${cx - 47},${ey} Q${cx},${f1(ey - 52 + eo * 38)} ${cx + 47},${ey} L${cx + 47},${ey - 40} L${cx - 47},${ey - 40}Z`, mixc(skin, '#000', 0.06));
    }
    const w = cl(d.worry), an = cl(d.anger);
    s += L(cx - sx * 44, ey - 58 - 18 * w + 14 * an, cx + sx * 44, ey - 56 + 6 * w - 20 * an, PAL.hair, 11);
  }
  const m = cl(d.mouth), my = 118, sm = d.smile;
  if (m < 0.06) s += P(`M-42,${my} Q0,${f1(my + 22 * sm - 6 * d.worry)} 42,${my}`, 'none', `stroke="#9a4a47" stroke-width="8" stroke-linecap="round"`);
  else s += E(0, my + 6, 42 + 10 * m, 8 + 44 * m, '#3a1417') + R(-32, my - 8 - 40 * m * 0.1, 64, Math.min(14, 8 + m * 10), '#f4f0ea', 'rx="4"') + E(0, my + 22 * m + 8, 26, 12 * m, '#8a2f35');
  s += P('M-196,-34 C-205,-215 205,-215 196,-34 C175,-120 120,-168 20,-176 C-60,-178 -150,-140 -196,-34Z', PAL.hair);
  s += P('M-170,-60 C-120,-120 -30,-166 70,-170 C10,-150 -90,-110 -170,-30Z', PAL.hairHi, OP(0.5));
  s += P('M60,-176 C110,-150 150,-110 168,-40 C150,-90 110,-125 40,-140Z', PAL.hair);
  const mess = d.mess;
  s += P(`M-196,-20 C-215,40 -210,110 ${-205 - 20 * mess},180 C-186,100 -184,30 -178,-10Z`, PAL.hair) + P(`M196,-20 C215,40 210,110 ${205 + 20 * mess},180 C186,100 184,30 178,-10Z`, PAL.hair);
  for (let i = 0; i < 3 + Math.round(mess * 4); i++) { const a = hz(i, 3) * 1.4 - 0.7; s += PL([[-30 + hz(i, 4) * 120, -170], [-10 + hz(i, 5) * 160 + Math.sin(d.t * 2 + i) * 6, -200 - 40 * hz(i, 6) - 30 * mess], [-30 + hz(i, 7) * 200, -150 + 30 * hz(i, 8)]], PAL.hair, 3, OP(0.55)); }
  if (d.sweat) s += P('M128,-100 Q146,-60 128,-38 Q108,-62 128,-100Z', 'rgba(200,235,255,0.85)') + P('M-120,10 Q-104,40 -120,58 Q-138,40 -120,10Z', 'rgba(200,235,255,0.7)');
  if (d.dirt) s += E(-80, 60, 30, 14, '#3a2a20', OP(0.5 * d.dirt)) + L(40, -90, 90, -60, '#4a3326', 6, OP(0.45 * d.dirt));
  if (d.shadow) s += R(-400, -300, 800, 800, '#000', OP(d.shadow));
  return G(s, T(tx, ty, d.tilt));
}

/* ---------------------------------------------------------------- MULHER (corpo pequeno, frente/costas) */
function limb(x, y, a1, l1, a2, l2) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const jx = x + Math.sin(r1) * l1, jy = y + Math.cos(r1) * l1;
  return [[x, y], [jx, jy], [jx + Math.sin(r2) * l2, jy + Math.cos(r2) * l2]];
}
/** origem = pés (centro). altura ~ 560. arms: [aL, eL, aR, eR] ângulos absolutos (0 = pendurado, 180 = para cima). */
function womanFig(o) {
  const d = Object.assign({ back: false, arms: [8, 14, -8, -14], walk: 0, lean: 0, bob: 0, scale: 1, cold: 0, sit: 0, headTilt: 0, look: 0, scared: 0, run: 0, jacket: false }, o);
  const skin = mixc(PAL.skin, '#8fb0d6', d.cold), swe = mixc(PAL.sweater, '#6d86a8', d.cold * 0.8), jns = mixc(PAL.jeans, '#10182a', d.cold * 0.4);
  const sw = Math.sin(d.walk * Math.PI * 2), cw = Math.cos(d.walk * Math.PI * 2);
  const hipY = -255 + d.bob, shY = -440 + d.bob, shW = 56;
  let s = '';
  const legA = d.run ? 38 : 20, kneeB = d.run ? 34 : 14;
  const lg = (side, ph) => {
    const a = side * legA * ph, a2 = a - kneeB * Math.max(0, ph * side) * 0 + (ph > 0 ? -kneeB * ph : 0);
    const pts = limb(side * 26, hipY, a, 130, a2 * 0.4, 125);
    return PL(pts, jns, 40) + E(pts[2][0] + 8 * (d.back ? 0 : 1), pts[2][1] + 4, 34, 15, PAL.boot);
  };
  s += lg(-1, sw) + lg(1, -sw);
  s += P(`M${-62 + d.lean * 0.3},${hipY + 20} L${-shW + d.lean},${shY} Q${d.lean},${shY - 30} ${shW + d.lean},${shY} L${62 + d.lean * 0.3},${hipY + 20}Z`, swe);
  s += P(`M${-62 + d.lean * 0.3},${hipY + 20} L${-shW + d.lean},${shY} L${-shW + 14 + d.lean},${shY + 6} L${-44 + d.lean * 0.3},${hipY + 20}Z`, PAL.sweaterSh, OP(0.5));
  s += R(-62 + d.lean * 0.3, hipY + 6, 124, 22, mixc(PAL.jeans, '#000', 0.2), 'rx="8"');
  const armsS = (side, a, e) => {
    const pts = limb(side * shW + d.lean, shY + 8, a, 108, e, 100);
    return PL(pts, swe, 34) + PL([pts[1], pts[2]], PAL.sweaterSh, 5, OP(0.35)) + C(pts[2][0], pts[2][1], 17, skin) + C(pts[0][0], pts[0][1], 20, swe);
  };
  const [aL, eL, aR, eR] = d.arms;
  s += armsS(-1, aL, eL) + armsS(1, aR, eR);
  s += P(`M${-44 + d.lean},${shY - 6} Q${d.lean},${shY + 40} ${44 + d.lean},${shY - 6} L${48 + d.lean},${shY + 14} Q${d.lean},${shY + 60} ${-48 + d.lean},${shY + 14}Z`, PAL.scarf);
  const hx = d.lean * 1.2, hy = shY - 86 + d.bob;
  const head = (() => {
    let h = '';
    if (d.back) {
      h += PL([[hx + 20, hy - 20], [hx + 70 + 20 * sw, hy + 30], [hx + 62 + 28 * sw, hy + 110]], PAL.hair, 28);
      h += E(hx, hy, 46, 52, PAL.hair) + P(`M${hx - 40},${hy + 10} Q${hx},${hy + 80} ${hx + 40},${hy + 10} L${hx + 30},${hy + 60} Q${hx},${hy + 90} ${hx - 30},${hy + 60}Z`, PAL.hair) + R(hx - 14, hy + 36, 28, 34, skin);
    } else {
      h += P(`M${hx - 50},${hy} C${hx - 66},${hy + 90} ${hx - 52},${hy + 140} ${hx - 40},${hy + 150} L${hx + 40},${hy + 150} C${hx + 52},${hy + 140} ${hx + 66},${hy + 90} ${hx + 50},${hy}Z`, PAL.hair);
      h += R(hx - 14, hy + 36, 28, 34, skin) + E(hx, hy, 42, 48, skin);
      const lk = d.look * 6, ey = hy - 2, ro = d.scared ? 8 : 6;
      h += E(hx - 15, ey, 8, ro, '#fff') + E(hx + 15, ey, 8, ro, '#fff') + C(hx - 15 + lk, ey, 3.6, '#1a0f0b') + C(hx + 15 + lk, ey, 3.6, '#1a0f0b');
      h += P(`M${hx - 10},${hy + 26} Q${hx},${hy + (d.scared ? 40 : 30)} ${hx + 10},${hy + 26}`, 'none', 'stroke="#9a4a47" stroke-width="3" stroke-linecap="round"');
      h += P(`M${hx - 44},${hy - 6} C${hx - 40},${hy - 58} ${hx + 40},${hy - 58} ${hx + 44},${hy - 6} C${hx + 20},${hy - 34} ${hx - 20},${hy - 34} ${hx - 44},${hy - 6}Z`, PAL.hair);
    }
    return h;
  })();
  s += G(head, T(0, 0, d.headTilt, 1, 1, 0, 0), `transform-origin="${f1(hx)} ${f1(hy + 40)}"`);
  return G(s, T(0, 0, 0, d.scale));
}

/* ---------------------------------------------------------------- MULHER encolhida (posição fetal), de lado */
function womanFetal(o) {
  const d = Object.assign({ k: 1, cold: 0, t: 0, tremble: 0 }, o);
  const skin = mixc(PAL.skin, '#8fb0d6', d.cold), tr = d.tremble ? H.noise(d.t * 36, 1) * d.tremble : 0;
  let s = '';
  s += E(0, -6, 170, 18, 'rgba(0,0,0,0.35)');
  s += PL([[60, -40], [-30, -70], [-90, -40]], PAL.jeans, 44) + E(-100, -30, 36, 16, PAL.boot);
  s += E(10 + tr, -90, 100, 60, PAL.sweater) + E(0 + tr, -105, 90, 38, PAL.sweaterSh, OP(0.3));
  s += PL([[60, -60], [80, -100], [40, -130]], PAL.sweater, 34);
  s += E(80 + tr, -130, 52, 58, PAL.hair) + E(60 + tr, -120, 36, 40, skin, OP(0)) + P('M30,-100 Q60,-70 20,-60 L10,-90Z', PAL.scarf);
  s += PL([[34, -150], [86, -176], [120, -148]], skin, 18) + PL([[34, -140], [90, -168], [120, -140]], PAL.sweater, 24) + C(100, -166, 15, skin);
  s += PL([[110, -158], [66, -176], [38, -150]], skin, 15);
  return G(s, T(0, 0, 0, 1 + 0 * d.k));
}

/* ---------------------------------------------------------------- LOBO */
function wolfHead(o) {
  const d = Object.assign({ lookx: 0, looky: 0, snarl: 0, ears: 0, glow: 1, t: 0, tilt: 0, sniff: 0, eye: 1, calm: 0 }, o);
  const bob = d.sniff ? Math.sin(d.t * 18) * 5 * d.sniff : 0;
  let s = '';
  const furStrokes = (seed, n, x0, y0, w, h, col, a) => { let q = ''; for (let i = 0; i < n; i++) { const x = x0 + hz(i, seed) * w, y = y0 + hz(i, seed + 7) * h; q += L(x, y, x + (hz(i, seed + 2) - 0.5) * 16, y + 20 + hz(i, seed + 3) * 22, col, 3, OP(a)); } return q; };
  const spikes = []; for (let i = 0; i <= 14; i++) { const a = Math.PI * (0.05 + 0.9 * i / 14); spikes.push([Math.cos(a) * (i % 2 ? 270 : 330), 60 + Math.sin(a) * (i % 2 ? 230 : 300)]); }
  s += POLY([[-300, 40]].concat(spikes.map(p => [p[0], p[1]])).concat([[300, 40]]), '#575c63');
  const ea = d.ears * 24;
  s += G(P('M-40,0 L-130,-250 L60,-100Z', '#55595f') + P('M-50,-30 L-110,-200 L20,-100Z', '#2b2024'), T(-170, -50, ea * -1, 1, 1));
  s += G(P('M40,0 L130,-250 L-60,-100Z', '#55595f') + P('M50,-30 L110,-200 L-20,-100Z', '#2b2024'), T(170, -50, ea, 1, 1));
  s += P('M-225,-70 C-225,-185 225,-185 225,-70 C225,60 160,150 74,220 L-74,220 C-160,150 -225,60 -225,-70Z', mixc(PAL.wolf, '#000', 0.12));
  s += P('M-12,-180 L-30,-60 L0,-30 L30,-60 L12,-180Z', PAL.wolfDk, OP(0.7)) + P('M-225,-70 C-225,-150 -150,-176 -100,-176 C-140,-120 -190,-60 -225,-20Z', PAL.wolfDk, OP(0.45)) + P('M225,-70 C225,-150 150,-176 100,-176 C140,-120 190,-60 225,-20Z', PAL.wolfDk, OP(0.45));
  s += furStrokes(1, 22, -200, -60, 400, 200, PAL.wolfLt, 0.35) + furStrokes(9, 18, -200, -150, 400, 120, '#2a2e33', 0.35);
  s += P('M-112,70 C-112,10 112,10 112,70 L96,214 Q0,254 -96,214Z', PAL.wolfLt);
  s += P('M-112,70 C-112,10 112,10 112,70 L96,214 Q0,254 -96,214Z', 'none', 'stroke="#9aa0a6" stroke-width="4" opacity="0.6"');
  const sn = cl(d.snarl);
  s += P(`M-52,170 Q0,${f1(150 - 6 * sn)} 52,170 Q42,${f1(206 - 4 * sn)} 0,216 Q-42,${f1(206 - 4 * sn)} -52,170Z`, '#0b0b0d') + E(-16, 172, 12, 5, 'rgba(255,255,255,0.35)');
  if (sn > 0.05) {
    const lift = 26 * sn;
    s += P(`M-92,${f1(218 - lift)} Q0,${f1(252 + 14 * sn)} 92,${f1(218 - lift)} L88,${f1(236 + 24 * sn)} Q0,${f1(268 + 34 * sn)} -88,${f1(236 + 24 * sn)}Z`, '#2a0d12');
    s += POLY([[-78, 218 - lift], [-62, 218 - lift], [-68, 218 - lift + 40 * sn]], '#f4f1ea') + POLY([[62, 218 - lift], [78, 218 - lift], [68, 218 - lift + 40 * sn]], '#f4f1ea') + POLY([[-30, 226 - lift], [-18, 226 - lift], [-24, 226 - lift + 22 * sn]], '#f4f1ea') + POLY([[18, 226 - lift], [30, 226 - lift], [24, 226 - lift + 22 * sn]], '#f4f1ea');
    s += L(-86, 160 - lift * 0.4, -52, 176, '#2a2e33', 4 + 4 * sn) + L(86, 160 - lift * 0.4, 52, 176, '#2a2e33', 4 + 4 * sn);
  } else s += P('M0,216 L0,238 M-72,236 Q-36,252 0,238 Q36,252 72,236', 'none', 'stroke="#2a2e33" stroke-width="5" stroke-linecap="round"');
  const eo = cl(d.eye), glowA = d.glow;
  for (const sx of [-1, 1]) {
    const cx = sx * 100, cy = -28 + 3 * sn, ang = sx * (14 + 12 * sn);
    s += `<circle cx="${cx}" cy="${cy}" r="${f1(66 * (0.6 + 0.4 * glowA))}" fill="url(#GLOWA)" ${OP(0.55 * glowA)}/>`;
    s += P(`M${cx - sx * 58},${cy + 8} Q${cx},${cy - 40 * eo - 14} ${cx + sx * 58},${cy - 18} Q${cx + sx * 10},${cy + 36 * eo + 4} ${cx - sx * 58},${cy + 8}Z`, '#18130e');
    if (eo > 0.1) {
      s += `<clipPath id="WEYE${sx > 0 ? 'R' : 'L'}"><path d="M${cx - sx * 54},${cy + 8} Q${cx},${cy - 36 * eo - 12} ${cx + sx * 54},${cy - 16} Q${cx + sx * 10},${cy + 32 * eo + 2} ${cx - sx * 54},${cy + 8}Z"/></clipPath>`;
      s += `<g clip-path="url(#WEYE${sx > 0 ? 'R' : 'L'})">` + C(cx, cy, 40, PAL.amber) + C(cx, cy, 24, '#ff8a1f', OP(0.6)) + E(cx + d.lookx, cy + d.looky, 6 - 2 * sn, 30, '#050303') + C(cx + d.lookx - 9, cy + d.looky - 10, 5, '#fff', OP(0.9)) + '</g>';
    }
    s += L(cx - sx * 62, cy - 34 - 8 * sn, cx + sx * 56, cy - 14 + 18 * sn + 6 * sn, '#24282d', 11);
  }
  return G(s, T(0, bob, d.tilt)).replace(/GLOWA/g, '__GLOWA__').replace(/WEYE/g, 'WEYE' + (o.uid || ''));
}

/** olho gigante do lobo (close extremo). refl = SVG desenhado dentro do reflexo. */
function wolfEye(Pf, o) {
  const d = Object.assign({ pupil: 1, lookx: 0, looky: 0, lid: 1, t: 0, refl: '', reflA: 0, red: 0 }, o);
  let s = '';
  s += E(0, 0, 470, 330, '#1d1a17');
  for (let i = 0; i < 46; i++) { const a = hz(i, 5) * 6.28, r = 330 + hz(i, 6) * 140; s += L(Math.cos(a) * r * 1.2, Math.sin(a) * r * 0.85, Math.cos(a) * (r + 60) * 1.2, Math.sin(a) * (r + 60) * 0.85, i % 3 ? '#4b5056' : '#8d9298', 8, OP(0.6)); }
  const op = Math.max(0.02, d.lid);
  s += `<clipPath id="${Pf}eyec"><path d="M-400,10 Q0,${f1(-260 * op)} 400,0 Q10,${f1(250 * op)} -400,10Z"/></clipPath>`;
  s += P('M-410,10 Q0,-280 410,0 Q10,260 -410,10Z', '#e9d9a8');
  s += `<g clip-path="url(#${Pf}eyec)">`;
  s += `<radialGradient id="${Pf}iris" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffcf4a"/><stop offset="0.55" stop-color="#ff9d1a"/><stop offset="0.9" stop-color="#8a4a0a"/><stop offset="1" stop-color="#2c1604"/></radialGradient>`;
  s += C(d.lookx, d.looky, 250, `url(#${Pf}iris)`);
  for (let i = 0; i < 40; i++) { const a = i * 0.157; s += L(d.lookx + Math.cos(a) * 70 * d.pupil, d.looky + Math.sin(a) * 70 * d.pupil, d.lookx + Math.cos(a) * 240, d.looky + Math.sin(a) * 240, i % 2 ? '#8a4a0a' : '#ffe27a', 3, OP(0.45)); }
  s += E(d.lookx, d.looky, 62 * d.pupil, 210, '#030202');
  if (d.refl && d.reflA > 0) s += `<g ${OP(d.reflA)}>` + d.refl + '</g>';
  s += C(d.lookx - 90, d.looky - 100, 38, '#fff', OP(0.9)) + C(d.lookx + 70, d.looky + 80, 16, '#fff', OP(0.55));
  s += E(0, -300 * op, 500, 150, '#000', OP(0.35)) + E(0, 280 * op, 500, 120, '#000', OP(0.3));
  if (d.red) s += R(-450, -320, 900, 640, PAL.red, OP(0.25 * d.red));
  s += '</g>';
  s += P('M-410,10 Q0,-280 410,0 Q10,260 -410,10Z', 'none', 'stroke="#0b0907" stroke-width="22" stroke-linejoin="round"');
  return s;
}

/** lobo de corpo inteiro, de lado, virado para a direita; origem = chão sob o centro do corpo */
function wolfSide(o) {
  const d = Object.assign({ phase: 0, run: 0, head: 0, mouth: 0, tail: 0, scale: 1, flip: 1, crouch: 0, glow: 1, dark: 0, eyeOnly: false, sniff: 0, t: 0, lunge: 0 }, o);
  const A = d.run ? 38 : 18, sw = Math.sin(d.phase * Math.PI * 2), cw = Math.cos(d.phase * Math.PI * 2);
  const fur = mixc(PAL.wolf, '#000', d.dark), furD = mixc(PAL.wolfDk, '#000', d.dark), furL = mixc(PAL.wolfLt, '#000', d.dark);
  const by = -150 + d.crouch * 40 + (d.run ? Math.abs(cw) * -14 : 0), tl = d.lunge * 18;
  let s = '';
  s += E(0, 0, 230, 16, 'rgba(0,0,0,0.4)');
  const leg = (x, ph, front, shade) => {
    const a = A * ph * (front ? 1 : -1), pts = limb(x, by + 20, a, 82, a * 0.4 + (front ? 12 : -26) * (ph > 0 ? 1 : 0.2), 78 + 0);
    return PL(pts, shade ? furD : fur, 30) + E(pts[2][0] + 8, pts[2][1] + 3, 20, 10, shade ? '#2a2d32' : '#3d4146');
  };
  s += leg(-150, cw, false, true) + leg(120, -cw, true, true);
  s += PL([[-205, by - 35], [-290, by + 10 + 38 * Math.sin(d.t * 3) * d.tail + 10], [-330, by + 70 + d.tail * 24]], furD, 46) + PL([[-290, by + 20], [-336, by + 86]], furL, 20, OP(0.6));
  s += E(-10, by, 205, 84, fur) + E(-10, by - 44, 195, 40, furD, OP(0.55)) + E(0, by + 44, 175, 34, furL, OP(0.8));
  s += P(`M120,${by - 40} Q190,${by - 100} 236,${by - 130 + d.head * 20} L260,${by - 60} Q200,${by + 20} 140,${by + 60}Z`, fur) + P(`M150,${by - 20} L214,${by - 100} L238,${by - 60}Z`, furL, OP(0.6));
  for (let i = 0; i < 18; i++) s += L(-170 + i * 20, by - 70 + (i % 3) * 6, -178 + i * 20, by - 50 + (i % 4) * 8, '#2a2e33', 3, OP(0.35));
  s += leg(-120, -cw, false, false) + leg(150, cw, true, false);
  const hx = 262 + tl, hy = by - 150 + d.head * 36 + (d.sniff ? Math.sin(d.t * 16) * 4 : 0), hr = d.head * 16;
  let hd = '';
  hd += P('M-60,-40 C-60,-70 20,-76 56,-50 L128,-6 C140,0 138,22 124,28 L50,40 C10,56 -40,48 -64,20Z', fur);
  hd += P('M50,-10 L128,-6 C140,0 138,22 124,28 L50,40Z', furL);
  hd += P('M-30,-60 L-46,-122 L12,-76Z', furD) + P('M0,-64 L10,-126 L40,-66Z', furD) + P('M-30,-70 L-42,-112 L0,-80Z', '#2b2024', OP(0.8));
  hd += E(118, 4, 15, 11, '#0b0b0d');
  if (d.mouth > 0.05) hd += P(`M122,26 Q70,${f1(40 + 30 * d.mouth)} 36,28 Z`, '#2a0d12') + POLY([[110, 28], [118, 28], [114, 28 + 14 * d.mouth]], '#f4f1ea') + POLY([[60, 36], [68, 34], [64, 36 + 12 * d.mouth]], '#f4f1ea');
  hd += `<circle cx="44" cy="-14" r="30" fill="url(#__GLOWA__)" ${OP(0.7 * d.glow)}/>` + P('M26,-14 Q46,-26 66,-12 Q46,-4 26,-14Z', PAL.amber) + E(46, -14, 3, 8, '#000') + L(24, -24, 68, -14, '#1d2024', 5);
  s += G(hd, T(hx, hy, hr));
  return G(s, T(0, 0, 0, d.scale * d.flip, d.scale));
}

/* ---------------------------------------------------------------- HOMEM (silhueta) */
function manSil(o) {
  const d = Object.assign({ scale: 1, eyes: 0, sway: 0, hat: false, col: '#06090d', rim: 0, hands: 0, t: 0 }, o);
  const col = d.col, sw = d.sway;
  let s = '';
  s += P(`M-92,-470 Q-96,-540 -48,-556 L48,-556 Q96,-540 92,-470 L108,-330 L100,-110 L60,-110 L52,-300 L50,0 L8,0 L0,-220 L-8,0 L-50,0 L-52,-300 L-60,-110 L-100,-110 L-108,-330Z`, col);
  s += P('M-34,-556 Q-34,-596 0,-598 Q34,-596 34,-556 L30,-520 L-30,-520Z', col) + R(-14, -526, 28, 22, col);
  s += E(0, -640 + sw, 40, 48, col);
  if (d.hat) s += E(0, -684 + sw, 74, 14, col) + R(-38, -736 + sw, 76, 56, col, 'rx="8"');
  if (d.rim) s += L(-92, -468, -108, -330, '#6f90b5', 4, OP(d.rim)) + L(-40, -684, -40, -610, '#6f90b5', 3, OP(d.rim));
  if (d.eyes) s += E(-16, -642 + sw, 10, 3.5, '#e8f4ff', OP(d.eyes)) + E(16, -642 + sw, 10, 3.5, '#e8f4ff', OP(d.eyes)) + C(-16, -642 + sw, 22, 'url(#__GLOWW__)', OP(0.4 * d.eyes)) + C(16, -642 + sw, 22, 'url(#__GLOWW__)', OP(0.4 * d.eyes));
  return G(s, T(0, 0, 0, d.scale));
}
/** rosto sombrio de estranho (close): capuz negro, olhos finos, sorriso branco */
function shadowFace(o) {
  const d = Object.assign({ lookx: 0, smile: 0, t: 0, hood: true, tilt: 0 }, o);
  let s = '';
  s += P('M-250,420 Q-240,250 -120,210 L120,210 Q240,250 250,420Z', '#07090d');
  s += P('M-190,-30 C-200,-230 200,-230 190,-30 C190,120 120,210 0,214 C-120,210 -190,120 -190,-30Z', '#1c2535');
  if (d.hood) s += P('M-230,40 C-250,-280 250,-280 230,40 C210,-110 150,-190 0,-196 C-150,-190 -210,-110 -230,40Z', '#030406');
  s += E(-70, -24, 50, 12 + 5 * d.smile, '#e9f1f8', OP(0.95)) + E(70, -24, 50, 12 + 5 * d.smile, '#e9f1f8', OP(0.95)) + C(-70 + d.lookx, -24, 7, '#000') + C(70 + d.lookx, -24, 7, '#000');
  s += P(`M-90,70 Q0,${f1(70 + 90 * d.smile)} 90,70 Q0,${f1(86 + 60 * d.smile)} -90,70Z`, '#f2f2ee', OP(d.smile > 0.02 ? 1 : 0));
  for (let i = -3; i <= 3; i++) s += L(i * 24, 76 + Math.abs(i) * 2, i * 24, 90 + 36 * d.smile - Math.abs(i) * 6, '#07090d', 3, OP(d.smile > 0.3 ? 1 : 0));
  return G(s, T(0, 0, d.tilt));
}

/* ---------------------------------------------------------------- SACO PRETO */
function sackShape(o) {
  const d = Object.assign({ s: 1, t: 0, open: 0 }, o);
  let s = '';
  s += P('M-210,-40 C-230,-210 -120,-290 0,-292 C120,-290 230,-210 210,-40 C220,60 190,150 160,190 L-160,190 C-190,150 -220,60 -210,-40Z', '#0a0a0d');
  s += P('M-210,-40 C-230,-210 -120,-290 0,-292 C-60,-250 -150,-170 -170,-40 C-176,40 -170,120 -150,180 L-160,190 C-190,150 -220,60 -210,-40Z', '#17181d');
  s += P('M-70,-270 Q-10,-300 60,-268 L50,-230 Q-10,-250 -60,-228Z', '#17181d') + L(-60, -232, 60, -230, '#2a2b32', 8);
  for (let i = 0; i < 8; i++) s += P(`M${-150 + i * 40},${-150 + (i % 2) * 40} Q${-140 + i * 40},${-60} ${-150 + i * 40 + 12},${40 + (i % 3) * 30}`, 'none', 'stroke="#23242b" stroke-width="5" stroke-linecap="round" opacity="0.8"');
  return s;
}

/* ---------------------------------------------------------------- partículas */
function motes(t, n, w, h, seed = 1, col = 'rgba(255,255,255,0.5)', rmax = 4, speed = 12) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = (hz(i, seed) * w + Math.sin(t * 0.7 + i) * 30 + t * speed * (0.5 + hz(i, seed + 3))) % w, y = (hz(i, seed + 1) * h - t * speed * 0.6 * (0.3 + hz(i, seed + 4)) + h * 4) % h;
    s += C(x, y, 1 + hz(i, seed + 2) * rmax, col, OP(0.3 + 0.7 * Math.abs(Math.sin(t * 1.3 + i))));
  }
  return s;
}
function sparksFx(x, y, t, k, n = 12, len = 60, col = '#ffd45e') {
  if (k <= 0) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = hz(i, Math.floor(t * 16)) * 6.28, l = len * (0.3 + hz(i + 7, Math.floor(t * 16))) * k, d0 = 6 + hz(i) * 10;
    s += L(x + Math.cos(a) * d0, y + Math.sin(a) * d0, x + Math.cos(a) * (d0 + l), y + Math.sin(a) * (d0 + l), col, 3, OP(k));
  }
  return s;
}
function ringWaves(cx, cy, t, a0, n, maxR, col, fade = 1, w = 6) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = (((t - a0) * 0.9 + i / n) % 1 + 1) % 1; s += C(cx, cy, 20 + ph * maxR, 'none', `stroke="${col}" stroke-width="${f1(w * (1 - ph) + 1)}" ${OP((1 - ph) * fade)}`); }
  return s;
}
