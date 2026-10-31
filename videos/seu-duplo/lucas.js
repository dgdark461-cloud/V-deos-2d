/* lucas.js - Lucas (29 anos, pescador): rosto e corpo. Usa PAL de art.js + extras. */
Object.assign(PAL, { hood: '#cfc9b6', hoodSh: '#9a9585', vest: '#2a3a52', pants: '#2a3548', shoe: '#3a2a20', sole: '#1c1410' });
const TX = (x, y, str, size, fill, ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" font-family="Poppins, DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="${f1(size)}" fill="${fill}" ${ex}>${str}</text>`;
/* ---------------- ARTHUR: rosto de frente (close). origem = centro do rosto, escala 1 ~ largura 330 */
function lucasFace(o) {
  const d = Object.assign({ eye: 1, pupil: 1, lookx: 0, looky: 0, worry: 0, anger: 0, mouth: 0, smile: 0, tilt: 0, cold: 0, sweat: 0, tremble: 0, t: 0, beard: 0.12, tear: 0, dark: 0.25, mess: 0, bodyLen: 430, hood: 1, shadow: 0, wet: 1, cuts: 0 }, o);
  const skin = mixc(PAL.skin, '#7f9fc0', d.cold), skd = mixc(PAL.skinSh, '#40556f', d.cold);
  const tx = d.tremble ? H.noise(d.t * 40, 1) * d.tremble : 0, ty = d.tremble ? H.noise(d.t * 40, 2) * d.tremble : 0;
  let s = '';
  // ombros / moletom
  s += P(`M-340,${d.bodyLen} Q-330,262 -190,226 L190,226 Q330,262 340,${d.bodyLen}Z`, PAL.hood) + P(`M-340,${d.bodyLen} Q-330,262 -190,226 L-110,226 Q-230,310 -250,${d.bodyLen}Z`, PAL.hoodSh, OP(0.6));
  s += R(-62, 120, 124, 130, skin) + R(-62, 120, 124, 46, skd, OP(0.5));
  s += P('M-120,226 L0,330 L120,226 L150,260 L0,420 L-150,260Z', PAL.vest) + P('M-60,226 L0,300 L60,226 L40,226 L0,262 L-40,226Z', PAL.hood) + P('M-34,226 L0,290 L34,226', 'none', 'stroke="#8aa0a8" stroke-width="4"');
  s += E(-170, 24, 20, 38, skd) + E(170, 24, 20, 38, skd);
  // rosto
  s += P('M-166,-44 C-166,-200 166,-200 166,-44 C166,100 112,200 0,214 C-112,200 -166,100 -166,-44Z', skin);
  s += P('M-166,34 C-150,150 -80,208 0,214 C80,208 150,150 166,34 C140,112 80,166 0,170 C-80,166 -140,112 -166,34Z', skd, OP(0.3));
  // barba por fazer / barba cheia
  const b = d.beard;
  s += P(`M-166,10 C-160,120 -90,210 0,216 C90,210 160,120 166,10 C150,70 120,92 ${60 - 10 * b},${100 - 14 * b} Q0,${86 + 30 * (1 - b)} ${-60 + 10 * b},${100 - 14 * b} C-120,92 -150,70 -166,10Z`, '#1b1310', OP(0.18 + 0.7 * b));
  s += P('M-9,6 Q-22,58 -30,74 Q0,90 30,74', 'none', `stroke="${skd}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"`);
  const eo = cl(d.eye), ey = -24;
  for (const sx of [-1, 1]) {
    const cx = sx * 74;
    if (eo < 0.1) s += P(`M${cx - 44},${ey + 4} Q${cx},${ey + 20} ${cx + 44},${ey + 4}`, 'none', `stroke="${PAL.hair}" stroke-width="8" stroke-linecap="round"`);
    else {
      s += E(cx, ey, 46, Math.max(3, 33 * eo), '#f4efe9');
      if (d.tear) s += E(cx, ey + 34 * eo, 40, 6, '#bfe4ff', OP(0.75));
      const cid = 'WEYEa' + (sx > 0 ? 'R' : 'L');
      s += `<clipPath id="${cid}"><ellipse cx="${cx}" cy="${ey}" rx="46" ry="${f1(Math.max(3, 33 * eo))}"/></clipPath><g clip-path="url(#${cid})">` + C(cx + d.lookx, ey + d.looky, 21 * d.pupil + 3, '#4a3022') + C(cx + d.lookx, ey + d.looky, 11 * d.pupil, '#080403') + C(cx + d.lookx - 7, ey + d.looky - 8, 5.5, '#fff', OP(0.9)) + '</g>';
      s += P(`M${cx - 48},${ey + 3} Q${cx},${f1(ey - 44 * eo - 2)} ${cx + 48},${ey + 3}`, 'none', `stroke="${PAL.hair}" stroke-width="7" stroke-linecap="round"`);
      if (eo < 0.75) s += P(`M${cx - 47},${ey} Q${cx},${f1(ey - 52 + eo * 38)} ${cx + 47},${ey} L${cx + 47},${ey - 40} L${cx - 47},${ey - 40}Z`, mixc(PAL.skin, '#000', 0.1));
    }
    s += P(`M${cx - 40},${ey + 40} Q${cx},${ey + 56} ${cx + 40},${ey + 40}`, 'none', `stroke="#3a2230" stroke-width="9" stroke-linecap="round" opacity="${(d.dark * 0.7).toFixed(2)}"`);
    const w = cl(d.worry), an = cl(d.anger);
    s += L(cx - sx * 46, ey - 62 - 20 * w + 16 * an, cx + sx * 46, ey - 58 + 8 * w - 22 * an, PAL.hair, 15);
  }
  const m = cl(d.mouth), my = 124, sm = d.smile;
  if (m < 0.06) s += P(`M-40,${my} Q0,${f1(my + 24 * sm - 8 * d.worry)} 40,${my}`, 'none', `stroke="#6e2f2c" stroke-width="9" stroke-linecap="round"`);
  else s += E(0, my + 6, 40 + 12 * m, 8 + 46 * m, '#2f0f12') + R(-32, my - 6, 64, Math.min(14, 8 + m * 10), '#f4f0ea', 'rx="4"') + E(0, my + 24 * m + 10, 26, 12 * m, '#8a2f35');
  // cabelo curto
  s += P('M-190,-30 C-205,-212 205,-212 190,-30 C172,-118 120,-166 20,-174 C-60,-176 -150,-140 -190,-30Z', PAL.hair);
  s += P('M-160,-70 C-110,-124 -30,-160 60,-166 C0,-146 -90,-110 -160,-36Z', '#3a2b25', OP(0.5));
  for (let i = 0; i < 6; i++) { const bx = -130 + i * 52; s += P(`M${f1(bx)},-150 Q${f1(bx + 10)},${f1(-90 - 8 * hz(i, 4))} ${f1(bx + 30 + 10 * d.mess)},${f1(-60 - 30 * hz(i, 5))} Q${f1(bx + 30)},-110 ${f1(bx + 50)},-156Z`, PAL.hair); if (d.wet) s += E(bx + 30, -60 - 30 * hz(i, 5) + 14 + 8 * Math.sin(d.t * 3 + i), 3, 7, 'rgba(180,235,255,0.9)'); }
  if (d.cuts) s += L(-100, -80, -50, -40, '#d62d3f', 7, OP(d.cuts)) + L(60, 40, 120, 90, '#d62d3f', 6, OP(d.cuts)) + L(-120, 60, -70, 110, '#d62d3f', 6, OP(d.cuts)) + L(-20, -130, 30, -100, '#d62d3f', 6, OP(d.cuts));
  if (d.sweat) s += P('M130,-104 Q150,-62 130,-38 Q108,-64 130,-104Z', 'rgba(200,235,255,0.85)') + P('M-124,6 Q-108,38 -124,56 Q-142,38 -124,6Z', 'rgba(200,235,255,0.7)');
  if (d.shadow) s += R(-420, -300, 840, 820, '#000', OP(d.shadow));
  return G(s, T(tx, ty, d.tilt));
}

/* ---------------- ARTHUR corpo inteiro. origem = pés, altura ~ 560. arms [aL,eL,aR,eR] */
function lucasFig(o) {
  const d = Object.assign({ back: false, side: 0, arms: [8, 14, -8, -14], walk: 0, lean: 0, bob: 0, scale: 1, flip: 1, run: 0, scared: 0, sandwich: 0, bag: 0, look: 0, headTilt: 0, beard: 0.12, cold: 0, mouth: 0, pose: 0, tilt: 0 }, o);
  const skin = mixc(PAL.skin, '#7f9fc0', d.cold), hood = mixc(PAL.hood, '#6b88a8', d.cold * 0.7);
  const sw = Math.sin(d.walk * Math.PI * 2);
  const hipY = -255 + d.bob, shY = -440 + d.bob, shW = 58;
  let s = '';
  const legA = d.run ? 42 : 20, kneeB = d.run ? 36 : 14;
  const lg = (side, ph) => {
    const a = side * legA * ph, a2 = a * 0.4 + (ph > 0 ? -kneeB * ph : 0);
    const pts = limb(side * 26, hipY, a, 130, a2, 125);
    return PL(pts, PAL.pants, 42) + E(pts[2][0] + 9 * d.flip * (d.back ? 0 : 1), pts[2][1] + 4, 36, 16, PAL.shoe) + E(pts[2][0] + 9 * d.flip * (d.back ? 0 : 1), pts[2][1] + 14, 36, 6, PAL.sole);
  };
  s += lg(-1, sw) + lg(1, -sw);
  if (d.bag) s += P(`M${-52 + d.lean},${shY + 6} L${-60 + d.lean},${shY + 160} Q${d.lean},${shY + 190} ${60 + d.lean},${shY + 160} L${52 + d.lean},${shY + 6}Z`, '#2b4a55', d.back ? '' : OP(0.0));
  s += P(`M${-64 + d.lean * 0.3},${hipY + 20} L${-shW + d.lean},${shY} Q${d.lean},${shY - 30} ${shW + d.lean},${shY} L${64 + d.lean * 0.3},${hipY + 20}Z`, hood);
  s += P(`M${-64 + d.lean * 0.3},${hipY + 20} L${-shW + d.lean},${shY} L${-shW + 14 + d.lean},${shY + 6} L${-46 + d.lean * 0.3},${hipY + 20}Z`, PAL.hoodSh, OP(0.5));
  s += R(-30 + d.lean * 0.5, hipY - 70, 60, 36, PAL.hoodSh, 'rx="10" opacity="0.55"');
  if (d.bag && d.back) s += R(-44 + d.lean, shY + 20, 88, 150, '#2b4a55', 'rx="22"') + R(-30 + d.lean, shY + 60, 60, 30, '#1e3640', 'rx="8"');
  const armsS = (side, a, e) => {
    const pts = limb(side * shW + d.lean, shY + 8, a, 108, e, 100);
    return PL(pts, hood, 36) + PL([pts[1], pts[2]], PAL.hoodSh, 5, OP(0.35)) + C(pts[2][0], pts[2][1], 18, skin) + C(pts[0][0], pts[0][1], 21, hood);
  };
  const [aL, eL, aR, eR] = d.arms;
  s += armsS(-1, aL, eL) + armsS(1, aR, eR);
  if (d.sandwich) { const pR = limb(shW + d.lean, shY + 8, aR, 108, eR, 100)[2]; s += G(R(-28, -12, 56, 24, '#e3b66a', 'rx="10"') + R(-28, -3, 56, 8, '#6dbb55', 'rx="3"') + R(-28, 6, 56, 8, '#d9694f', 'rx="3"') + R(-28, 12, 56, 10, '#e3b66a', 'rx="8"'), `translate(${f1(pR[0])} ${f1(pR[1] - 8)}) rotate(${-20})`); }
  const hx = d.lean * 1.2, hy = shY - 90 + d.bob;
  let h = '';
  h += R(hx - 15, hy + 34, 30, 40, skin);
  h += E(hx, hy, 46, 52, skin);
  if (d.back) h += E(hx, hy - 6, 49, 54, PAL.hair) + R(hx - 50, hy + 40, 100, 14, PAL.hoodSh, 'rx="6"');
  else {
    const lk = d.look * 7, ro = d.scared ? 9 : 6.5, ey = hy - 4;
    h += P(`M${hx - 44},${hy + 20} Q${hx},${hy + 74} ${hx + 44},${hy + 20} Q${hx},${hy + 50} ${hx - 44},${hy + 20}Z`, '#1b1310', OP(0.15 + 0.7 * d.beard));
    h += E(hx - 17, ey, 9, ro, '#f4efe9') + E(hx + 17, ey, 9, ro, '#f4efe9') + C(hx - 17 + lk, ey, 4, '#1a0f0b') + C(hx + 17 + lk, ey, 4, '#1a0f0b');
    h += L(hx - 28, ey - 16 - 4 * d.scared, hx - 8, ey - 14, PAL.hair, 5) + L(hx + 8, ey - 14, hx + 28, ey - 16 - 4 * d.scared, PAL.hair, 5);
    h += d.mouth > 0.1 ? E(hx, hy + 28, 12, 6 + 12 * d.mouth, '#2f0f12') : P(`M${hx - 11},${hy + 28} Q${hx},${hy + (d.scared ? 24 : 34)} ${hx + 11},${hy + 28}`, 'none', 'stroke="#6e2f2c" stroke-width="4" stroke-linecap="round"');
    h += P(`M${hx - 47},${hy - 8} C${hx - 44},${hy - 66} ${hx + 44},${hy - 66} ${hx + 47},${hy - 8} C${hx + 24},${hy - 38} ${hx - 20},${hy - 40} ${hx - 47},${hy - 8}Z`, PAL.hair);
  }
  s += `<g transform="rotate(${d.headTilt} ${f1(hx)} ${f1(hy + 40)})">${h}</g>`;
  return G(s, `scale(${d.flip * d.scale} ${d.scale})`);
}

