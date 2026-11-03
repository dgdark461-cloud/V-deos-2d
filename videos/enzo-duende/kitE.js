/* kitE.js - Enzo e o duende: personagens articulados (membros por polilinha, sem distorcao). Estilo livro ilustrado quente. */
const OL = '#2a1710';
const ENZ = { skin: '#c98d63', sh: '#a26c48', hair: '#2b1a14', hair2: '#4a3226', shirt: '#e8602c', shirtSh: '#b84418', short: '#2f6fb0', shortSh: '#234f80', shoe: '#f4f1ea', sole: '#8a8a8a' };
const LIMB = (pts, col, w, ol = OL) => PL(pts, ol, w + 6) + PL(pts, col, w);
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
/* cinematica inversa de 2 ossos: ombro/quadril s -> alvo tg, bend = lado do cotovelo (+1/-1) */
function IK(s, tg, l1, l2, bend) {
  let dx = tg[0] - s[0], dy = tg[1] - s[1], dist = Math.hypot(dx, dy) || 1e-3; const m = Math.min(dist, l1 + l2 - 0.5), ux = dx / dist, uy = dy / dist;
  const a = (l1 * l1 - l2 * l2 + m * m) / (2 * m), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const el = [s[0] + ux * a - uy * h * bend, s[1] + uy * a + ux * h * bend];
  return [s, el, [s[0] + ux * m, s[1] + uy * m]];
}
/* rosto frontal (0,0 = centro da cabeca; ~140 x 156) */
function EF(t, o = {}) {
  const d = Object.assign({ skin: ENZ.skin, sh: ENZ.sh, hair: ENZ.hair, hair2: ENZ.hair2, hs: 'enzo', eye: 1, lx: 0, ly: 0, raise: 0, worry: 0, angry: 0, m: 0, sm: 0.35, sweat: 0, blush: 0, trem: 0, tears: 0, tilt: 0, bl: 1 }, o);
  const blk = d.bl && (t % 3.7) < 0.11 ? 0.08 : 1, ey = Math.min(1.7, d.eye) * blk, sx = d.trem ? H.noise(t * 40, 5) * 3 * d.trem : 0;
  const lx = Math.max(-1, Math.min(1, d.lx)) * 6, ly = Math.max(-1, Math.min(1, d.ly)) * 5;
  const eye = cx => G(E(0, 0, 18, 20 * ey + 1.5, '#fbfaf5', `stroke="${OL}" stroke-width="3"`) + (ey > 0.2 ? C(lx, ly, 10 * Math.min(1.2, 0.8 + 0.25 * ey), '#4a2a1a') + C(lx, ly, 5, '#0c0806') + C(lx + 3.5, ly - 4, 3, '#fff') : ''), `translate(${cx} -4)`);
  let s = '';
  /* cabelo atras (mulher) */
  if (d.hs === 'mom') s += P('M-80,-30 Q-96,60 -70,120 L70,120 Q96,60 80,-30 Q40,-110 0,-100 Q-40,-110 -80,-30Z', d.hair);
  s += E(-70, 8, 13, 22, d.skin, `stroke="${OL}" stroke-width="3"`) + E(70, 8, 13, 22, d.skin, `stroke="${OL}" stroke-width="3"`) + E(-70, 10, 6, 11, d.sh);
  s += E(0, 0, 70, 76, d.skin, `stroke="${OL}" stroke-width="3.5"`);
  s += P('M-56,34 Q0,98 56,34 Q40,72 0,80 Q-40,72 -56,34Z', d.sh, OP(0.25));
  if (d.blush) s += E(-42, 26, 15, 9, '#e8604a', OP(0.35 * d.blush)) + E(42, 26, 15, 9, '#e8604a', OP(0.35 * d.blush));
  s += eye(-27) + eye(27);
  const rb = d.raise * 9, wb = d.worry * 9, ab = d.angry * 9;
  s += PL([[-46, -33 - rb + wb * 0.3 - ab * 0.2], [-30, -40 - rb - wb * 0.3], [-10, -33 - rb - wb + ab]], d.hair, 8) + PL([[46, -33 - rb + wb * 0.3 - ab * 0.2], [30, -40 - rb - wb * 0.3], [10, -33 - rb - wb + ab]], d.hair, 8);
  s += P('M-4,10 Q0,22 8,19', 'none', `stroke="${d.sh}" stroke-width="4" stroke-linecap="round"`);
  const m = d.m, sm = d.sm;
  if (m > 0.08) s += P(`M-24,${42 - sm * 4} Q0,${42 + sm * 12} 24,${42 - sm * 4} Q0,${44 + m * 52 + 6} -24,${42 - sm * 4}Z`, '#4a1414', `stroke="${OL}" stroke-width="3" stroke-linejoin="round"`) + E(0, 42 + m * 30 + 6, 11, 5 + m * 6, '#d8604c') + (m > 0.4 ? R(-14, 42 - sm * 2, 28, 7, '#fff') : '');
  else s += P(`M-22,${42} Q0,${42 + sm * 22} 22,${42}`, 'none', `stroke="${OL}" stroke-width="4" stroke-linecap="round"`);
  if (d.sweat) { const u = (t * 0.9) % 1; s += P(`M62,-40 q-10,18 0,26 q10,-8 0,-26Z`, '#9fd6f0', `stroke="${OL}" stroke-width="2" ${OP(d.sweat)}`) + P(`M-58,${-10 + u * 20} q-8,14 0,20 q8,-6 0,-20Z`, '#9fd6f0', `${OP(d.sweat * (1 - u * 0.6))}`); }
  if (d.tears) s += P('M-36,16 q-6,26 -2,50', 'none', 'stroke="#9fd6f0" stroke-width="6" stroke-linecap="round" opacity="0.8"') + P('M36,16 q6,26 2,50', 'none', 'stroke="#9fd6f0" stroke-width="6" stroke-linecap="round" opacity="0.8"');
  /* cabelo frente */
  if (d.hs === 'enzo') {
    s += P('M-72,-18 Q-84,-92 0,-96 Q84,-92 72,-18 Q66,-52 30,-60 Q0,-48 -30,-60 Q-66,-52 -72,-18Z', d.hair, `stroke="${OL}" stroke-width="3"`);
    [[-60, -70, 22], [-34, -90, 24], [-4, -98, 24], [28, -92, 24], [56, -72, 22], [-72, -40, 16], [72, -40, 16]].forEach((c, i) => { s += C(c[0], c[1] + 3 * Math.sin(t * 1.3 + i), c[2], d.hair, `stroke="${OL}" stroke-width="2.5"`); });
    s += P('M-40,-92 Q-14,-104 16,-96', 'none', `stroke="${d.hair2}" stroke-width="6" stroke-linecap="round" opacity="0.8"`);
  } else if (d.hs === 'mom') {
    s += P('M-74,-6 Q-80,-96 0,-98 Q80,-96 74,-6 Q50,-60 10,-62 Q-40,-56 -74,-6Z', d.hair, `stroke="${OL}" stroke-width="3"`) + C(0, -108, 30, d.hair, `stroke="${OL}" stroke-width="3"`) + P('M-30,-110 Q0,-130 30,-108', 'none', `stroke="${d.hair2}" stroke-width="6" stroke-linecap="round" opacity="0.7"`);
  }
  return G(s, `translate(${f1(sx)} 0) rotate(${f1(d.tilt)})`);
}
/* rosto de perfil (olhando para +x) */
function EFS(t, o = {}) {
  const d = Object.assign({ skin: ENZ.skin, sh: ENZ.sh, hair: ENZ.hair, eye: 1, m: 0, sm: 0.3, worry: 0, raise: 0, tilt: 0, sweat: 0 }, o);
  const blk = (t % 3.7) < 0.11 ? 0.08 : 1, ey = Math.min(1.6, d.eye) * blk;
  let s = E(-6, 0, 66, 74, d.skin, `stroke="${OL}" stroke-width="3.5"`) + P('M60,6 Q80,16 62,26', d.skin, `stroke="${OL}" stroke-width="3"`);
  s += E(-12, 8, 12, 20, d.skin, `stroke="${OL}" stroke-width="3"`) + E(-12, 10, 5, 10, d.sh);
  s += E(30, -6, 12, 17 * ey + 1.5, '#fbfaf5', `stroke="${OL}" stroke-width="3"`) + (ey > 0.2 ? C(34, -6, 7.5, '#4a2a1a') + C(35, -7, 3.5, '#0c0806') : '');
  s += PL([[16, -30 - d.raise * 8 + d.worry * 4], [32, -34 - d.raise * 8], [46, -28 - d.raise * 8 - d.worry * 6]], d.hair, 7);
  const m = d.m;
  if (m > 0.1) s += E(46, 42, 9, 4 + m * 14, '#4a1414', `stroke="${OL}" stroke-width="2.5"`); else s += P(`M34,44 Q46,${44 + d.sm * 10} 54,${40 - d.sm * 3}`, 'none', `stroke="${OL}" stroke-width="3.5" stroke-linecap="round"`);
  s += P('M-72,-14 Q-80,-86 0,-92 Q70,-90 70,-24 Q50,-52 20,-56 Q-20,-44 -50,-50 Q-66,-44 -72,-14Z', d.hair, `stroke="${OL}" stroke-width="3"`);
  [[-58, -66, 22], [-32, -86, 24], [0, -92, 24], [34, -82, 22], [-70, -36, 16]].forEach((c, i) => { s += C(c[0], c[1] + 3 * Math.sin(t * 1.3 + i), c[2], d.hair, `stroke="${OL}" stroke-width="2.5"`); });
  if (d.sweat) s += P('M-30,-50 q-8,16 0,24 q8,-8 0,-24Z', '#9fd6f0', OP(d.sweat));
  return G(s, `rotate(${f1(d.tilt)})`);
}
/* ---------------- Enzo, corpo inteiro: 0,0 = pes; altura ~ 470 ---------------- */
function ENZO(o = {}) {
  const d = Object.assign({ look: 0, view: 'f', ph: 0, walk: 0, run: 0, t: 0, arms: 'swing', eye: 1, m: 0, sm: 0.3, raise: 0, worry: 0, angry: 0, sweat: 0, lx: 0, ly: 0, hold: '', lean: 0, shadow: 1, tilt: 0, hand: null, handL: null, crouch: 0, blush: 0 }, o);
  const sp = d.walk ? (d.run ? 1.25 : 0.7) : 0, a = Math.sin(d.ph), b = Math.sin(d.ph + Math.PI), bob = d.walk ? Math.abs(Math.cos(d.ph)) * (d.run ? 14 : 7) : Math.sin(d.t * 1.6) * 2;
  const cr = d.crouch * 60, hip = [0, -168 - bob + cr], sh = -300 - bob + cr * 1.3, hdY = -370 - bob + cr * 1.4;
  let s = d.shadow ? E(0, 4, 90, 13, '#000', OP(0.28)) : '';
  const face = (scl) => G(EF(d.t, { eye: d.eye, m: d.m, sm: d.sm, raise: d.raise, worry: d.worry, angry: d.angry, sweat: d.sweat, lx: d.lx, ly: d.ly, tilt: d.tilt, blush: d.blush }), `translate(${f1(d.look * 8)} ${f1(hdY)}) scale(${scl})`);
  if (d.view === 's') {
    const leg = (ph, back) => { const sw = Math.sin(ph) * sp * 0.75, kn = Math.max(0, -Math.cos(ph)) * sp * 0.95 + 0.04; const k = [hip[0] + 82 * Math.sin(sw), hip[1] + 82 * Math.cos(sw)], an = [k[0] + 84 * Math.sin(sw - kn), k[1] + 84 * Math.cos(sw - kn)]; const col = back ? ENZ.sh : ENZ.skin; return LIMB([hip, k], back ? ENZ.shortSh : ENZ.short, 40) + LIMB([k, an], col, 28) + G(E(10, 0, 30, 15, ENZ.shoe, `stroke="${OL}" stroke-width="3"`) + R(-18, 8, 56, 7, ENZ.sole, 'rx="3"'), `translate(${f1(an[0])} ${f1(an[1] + 8)}) rotate(${f1((sw - kn * 0.6) * 20)})`); };
    const arm = (ph, back) => { const sw = d.arms === 'swing' ? Math.sin(ph + Math.PI) * sp * 0.7 : -1.4, el = d.arms === 'swing' ? 0.3 + Math.max(0, Math.sin(ph + Math.PI)) * sp * 0.5 : -0.4; const S = [0, sh + 16], e = [S[0] + 60 * Math.sin(sw), S[1] + 60 * Math.cos(sw)], h = [e[0] + 60 * Math.sin(sw + el), e[1] + 60 * Math.cos(sw + el)]; return LIMB([S, e], back ? ENZ.shirtSh : ENZ.shirt, 34) + LIMB([e, h], back ? ENZ.sh : ENZ.skin, 26) + C(h[0], h[1], 15, back ? ENZ.sh : ENZ.skin, `stroke="${OL}" stroke-width="3"`) + (!back && d.hold ? G(d.hold, `translate(${f1(h[0])} ${f1(h[1])})`) : ''); };
    s += arm(d.ph + Math.PI, 1) + leg(d.ph + Math.PI, 1);
    s += G(P(`M-42,-300 Q-52,-230 -40,-168 L42,-168 Q52,-230 40,-300 Q0,-322 -42,-300Z`, ENZ.shirt, `stroke="${OL}" stroke-width="3"`) + P('M-40,-200 L40,-200 L42,-168 L-40,-168Z', ENZ.shirtSh, OP(0.35)) + R(-44, -196, 90, 40, ENZ.short, `rx="14" stroke="${OL}" stroke-width="3"`), `translate(0 ${f1(cr * 1.2 - bob)}) rotate(${f1(d.lean)} 0 -168)`);
    s += leg(d.ph, 0) + arm(d.ph, 0);
    s += R(-14, hdY + 54, 28, 40, ENZ.sh, 'rx="10"') + G(EFS(d.t, { eye: d.eye, m: d.m, sm: d.sm, worry: d.worry, raise: d.raise, sweat: d.sweat, tilt: d.tilt }), `translate(${f1(8 + d.look * 6)} ${f1(hdY)}) scale(0.9)`);
  } else {
    const fb = d.view === 'f';
    const legF = (x, ph) => { const sw = Math.sin(ph) * sp, lift = Math.max(0, Math.sin(ph)) * sp * 26; const top = [x, hip[1] + 20], an = [x + (fb ? 0 : 0), -22 - lift]; return LIMB([top, [x, hip[1] + 64]], ENZ.short, 44) + LIMB([[x, hip[1] + 60], an], ENZ.skin, 26) + G(E(0, 0, 32, 16, ENZ.shoe, `stroke="${OL}" stroke-width="3"`) + R(-30, 8, 60, 7, ENZ.sole, 'rx="3"'), `translate(${f1(x)} ${f1(an[1] + 14)})`); };
    if (d.crouch) { s += LIMB([[-30, hip[1] + 20], [-58, hip[1] + 70], [-34, -22]], ENZ.skin, 28) + LIMB([[30, hip[1] + 20], [58, hip[1] + 70], [34, -22]], ENZ.skin, 28) + E(-34, -8, 32, 16, ENZ.shoe, `stroke="${OL}" stroke-width="3"`) + E(34, -8, 32, 16, ENZ.shoe, `stroke="${OL}" stroke-width="3"`); }
    else s += legF(-30, d.ph) + legF(30, d.ph + Math.PI);
    const Sx = 74, Sy = sh + 14;
    const armSet = (side) => {
      const sg = side, kind = d.arms; let tgt;
      const swg = Math.sin(d.ph + (sg > 0 ? 0 : Math.PI)) * sp * 26;
      if (sg > 0 && d.hand) tgt = d.hand; else if (sg < 0 && d.handL) tgt = d.handL;
      else if (kind === 'up') tgt = [sg * 130, sh - 150]; else if (kind === 'cover') tgt = [sg * 40, hdY + 40]; else if (kind === 'cheeks') tgt = [sg * 66, hdY + 30]; else if (kind === 'point' && sg > 0) tgt = [250, sh - 20]; else if (kind === 'hold') tgt = [sg * 40, sh + 110]; else if (kind === 'wide') tgt = [sg * 170, sh + 70]; else if (kind === 'reach') tgt = [sg * 56, sh + 150]; else tgt = [sg * (92 + 6), sh + 150 + (fb ? -swg * 0.0 : 0)];
      if (kind === 'swing' && !d.hand && !d.handL) tgt = [sg * 98, sh + 148 - Math.abs(swg) * 0.3];
      const ik = IK([sg * Sx, Sy], tgt, 66, 66, sg * 1);
      return LIMB([ik[0], ik[1]], fb ? ENZ.shirt : ENZ.shirt, 34) + LIMB([ik[1], ik[2]], ENZ.skin, 26) + C(ik[2][0], ik[2][1], 16, ENZ.skin, `stroke="${OL}" stroke-width="3"`) + (sg > 0 && d.hold ? G(d.hold, `translate(${f1(ik[2][0])} ${f1(ik[2][1])})`) : '');
    };
    s += (fb ? armSet(-1) : '') + (fb ? '' : armSet(-1));
    s += G(P(`M-72,${sh} Q-76,${hip[1] - 20} -56,${hip[1] + 24} L56,${hip[1] + 24} Q76,${hip[1] - 20} 72,${sh} Q0,${sh - 26} -72,${sh}Z`, ENZ.shirt, `stroke="${OL}" stroke-width="3"`) + P(`M-56,${hip[1] + 24} L56,${hip[1] + 24} L60,${hip[1] - 12} L-60,${hip[1] - 12}Z`, ENZ.shirtSh, OP(0.3)) + R(-60, hip[1] + 4, 120, 54, ENZ.short, `rx="16" stroke="${OL}" stroke-width="3"`) + (fb ? P(`M-24,${sh - 4} Q0,${sh + 22} 24,${sh - 4}`, ENZ.sh) + R(-6, hip[1] + 8, 12, 10, ENZ.shortSh, 'rx="3"') : ''), '');
    s += armSet(1);
    s += R(-16, hdY + 56, 32, 36, ENZ.sh, 'rx="10"');
    if (fb) s += face(0.95);
    else s += G(E(0, 0, 70, 76, ENZ.hair, `stroke="${OL}" stroke-width="3.5"`) + [[-52, -60, 24], [0, -80, 26], [52, -60, 24], [-62, -10, 22], [62, -10, 22], [-30, -78, 22], [30, -78, 22]].map(c => C(c[0], c[1], c[2], ENZ.hair, `stroke="${OL}" stroke-width="2.5"`)).join('') + P('M-30,-40 Q0,-60 30,-40', 'none', `stroke="${ENZ.hair2}" stroke-width="6" stroke-linecap="round" opacity="0.7"`) + E(-70, 20, 12, 20, ENZ.skin, `stroke="${OL}" stroke-width="3"`) + E(70, 20, 12, 20, ENZ.skin, `stroke="${OL}" stroke-width="3"`), `translate(${f1(d.look * 8)} ${f1(hdY)}) scale(0.95)`);
  }
  return G(s, '');
}
/* Enzo grande (close): cabeca + ombros */
function ENZOF(t, o = {}, x = 540, y = 960, sc = 2.6) {
  const d = Object.assign({ pj: 0 }, o);
  return G(P('M-130,200 Q-140,120 -70,90 L70,90 Q140,120 130,200Z', ENZ.shirt, `stroke="${OL}" stroke-width="3.5"`) + P('M-30,86 Q0,118 30,86Z', ENZ.sh) + R(-22, 60, 44, 50, ENZ.sh, 'rx="12"') + EF(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
}
/* ---------------- mae ---------------- */
function MOM(o = {}) {
  const d = Object.assign({ t: 0, eye: 1, m: 0, sm: 0, raise: 0, worry: 0, arms: 'down', shadow: 1, tilt: 0 }, o);
  const skin = '#d8a07a', sh = '#b07a58', sh0 = -270, hdY = -340;
  let s = d.shadow ? E(0, 4, 90, 13, '#000', OP(0.28)) : '';
  s += LIMB([[-26, -150], [-26, -22]], skin, 26) + LIMB([[26, -150], [26, -22]], skin, 26) + E(-26, -10, 30, 14, '#6a3a4a', `stroke="${OL}" stroke-width="3"`) + E(26, -10, 30, 14, '#6a3a4a', `stroke="${OL}" stroke-width="3"`);
  const arm = sg => { const tg = d.arms === 'cheeks' ? [sg * 66, hdY + 40] : d.arms === 'cover' ? [sg * 30, hdY + 58] : [sg * 92, sh0 + 150]; const ik = IK([sg * 66, sh0 + 14], tg, 62, 62, sg); return LIMB([ik[0], ik[1]], '#8a6ad0', 30) + LIMB([ik[1], ik[2]], skin, 24) + C(ik[2][0], ik[2][1], 15, skin, `stroke="${OL}" stroke-width="3"`); };
  s += arm(-1) + P('M-66,-270 Q-74,-200 -90,-90 Q-60,-70 0,-70 Q60,-70 90,-90 Q74,-200 66,-270 Q0,-292 -66,-270Z', '#8a6ad0', `stroke="${OL}" stroke-width="3"`) + P('M-90,-90 Q0,-50 90,-90 L96,-30 L-96,-30Z', '#6a4ab0', `stroke="${OL}" stroke-width="3"`) + arm(1);
  s += R(-14, hdY + 56, 28, 36, sh, 'rx="10"') + G(EF(d.t, { skin, sh, hair: '#241418', hair2: '#4a2a30', hs: 'mom', eye: d.eye, m: d.m, sm: d.sm, raise: d.raise, worry: d.worry, tilt: d.tilt }), `translate(0 ${hdY}) scale(0.92)`);
  return s;
}
/* ---------------- duende ---------------- */
const DU = { coat: '#2f7a4a', coatSh: '#1f5634', hat: '#2f9a4a', hatSh: '#1f6a34', beard: '#d8782a', beardSh: '#a8541a', skin: '#e2a888', gold: '#f2c84a', boot: '#5a3420' };
function DUEF(t, o = {}) {
  const d = Object.assign({ eye: 1, grin: 0.8, fear: 0, lx: 0, ly: 0, m: 0, tilt: 0 }, o);
  const blk = (t % 4.1) < 0.12 ? 0.08 : 1, ey = Math.min(1.7, d.eye + d.fear * 0.5) * blk, lx = d.lx * 5, ly = d.ly * 4;
  const eye = cx => G(E(0, 0, 15, 15 * ey + 1.5, '#fbfaf5', `stroke="${OL}" stroke-width="3"`) + (ey > 0.2 ? C(lx, ly, 8, '#2a6a3a') + C(lx, ly, 4, '#0c0806') + C(lx + 3, ly - 3, 2.6, '#fff') : ''), `translate(${cx} -10)`);
  let s = P('M-86,10 L-124,-40 L-82,-4Z', DU.skin, `stroke="${OL}" stroke-width="3"`) + P('M86,10 L124,-40 L82,-4Z', DU.skin, `stroke="${OL}" stroke-width="3"`);
  s += E(0, 0, 76, 70, DU.skin, `stroke="${OL}" stroke-width="3.5"`) + E(-44, 22, 16, 10, '#e8604a', OP(0.35)) + E(44, 22, 16, 10, '#e8604a', OP(0.35));
  s += eye(-30) + eye(30);
  const bw = d.fear * 10, gr = d.grin * 8;
  s += PL([[-54, -38 - bw + gr * 0.3], [-30, -46 - bw], [-8, -34 - bw * 0.2 + gr * 0.6]], DU.beardSh, 8) + PL([[54, -38 - bw + gr * 0.3], [30, -46 - bw], [8, -34 - bw * 0.2 + gr * 0.6]], DU.beardSh, 8);
  s += P('M-8,8 Q0,40 22,22 Q26,4 8,2 Q-6,0 -8,8Z', '#d8906e', `stroke="${OL}" stroke-width="3"`);
  /* barba enorme */
  s += P('M-80,16 Q-96,110 -40,170 Q0,200 40,170 Q96,110 80,16 Q50,60 0,56 Q-50,60 -80,16Z', DU.beard, `stroke="${OL}" stroke-width="3.5"`) + P('M-30,90 Q-10,150 0,170 M30,90 Q10,150 0,170 M0,70 L0,160', 'none', `stroke="${DU.beardSh}" stroke-width="4" stroke-linecap="round" opacity="0.7"`);
  const m = d.m, g = d.grin;
  if (m > 0.08) s += P(`M-26,${62} Q0,${62 + g * 18} 26,62 Q0,${66 + m * 46} -26,62Z`, '#4a1414', `stroke="${OL}" stroke-width="3"`) + (m > 0.3 ? R(-16, 64, 32, 7, '#fff') : '');
  else s += P(`M-30,${58 - g * 4} Q0,${58 + g * 34} 30,${58 - g * 4}`, 'none', `stroke="${OL}" stroke-width="5" stroke-linecap="round"`) + (g > 0.5 ? P(`M-24,${60} Q0,${60 + g * 22} 24,60Z`, '#fff', `stroke="${OL}" stroke-width="2"`) : '');
  s += E(-14, 50, 20, 8, DU.beard, OP(0.0));
  /* chapeu */
  s += P('M-98,-30 Q-100,-60 -70,-64 Q0,-80 70,-64 Q100,-60 98,-30 Q0,-52 -98,-30Z', DU.hatSh, `stroke="${OL}" stroke-width="3.5"`) + P('M-74,-52 Q-60,-150 -10,-190 Q40,-224 90,-176 Q50,-186 22,-150 Q40,-100 74,-52 Q0,-70 -74,-52Z', DU.hat, `stroke="${OL}" stroke-width="3.5"`) + R(-76, -64, 152, 20, '#3a2418', `rx="6" stroke="${OL}" stroke-width="3"`) + R(-14, -66, 28, 24, DU.gold, `rx="5" stroke="${OL}" stroke-width="3"`) + R(-6, -60, 12, 12, '#3a2418', 'rx="2"');
  return G(s, `rotate(${f1(d.tilt)})`);
}
function DUE(o = {}) {
  const d = Object.assign({ t: 0, view: 'f', grin: 0.7, fear: 0, m: 0, eye: 1, lx: 0, ly: 0, arms: 'down', ph: 0, walk: 0, sit: 0, shadow: 1, tilt: 0, point: null, ghost: 0 }, o);
  const bob = d.walk ? Math.abs(Math.cos(d.ph)) * 5 : Math.sin(d.t * 2) * 1.5, sw = Math.sin(d.ph) * (d.walk ? 22 : 0);
  let s = d.shadow ? E(0, 3, 56, 9, '#000', OP(0.25)) : '';
  const hipY = -92 - bob + d.sit * 30, shY = -170 - bob + d.sit * 30, hdY = -228 - bob + d.sit * 30;
  if (d.sit) s += LIMB([[-22, hipY], [-48, hipY + 40], [-38, hipY + 80]], '#7a4a2a', 24) + LIMB([[22, hipY], [48, hipY + 40], [38, hipY + 80]], '#7a4a2a', 24) + E(-38, hipY + 88, 24, 12, DU.boot, `stroke="${OL}" stroke-width="3"`) + E(38, hipY + 88, 24, 12, DU.boot, `stroke="${OL}" stroke-width="3"`);
  else s += LIMB([[-20, hipY], [-20 + sw, -14]], '#7a4a2a', 22) + LIMB([[20, hipY], [20 - sw, -14]], '#7a4a2a', 22) + E(-20 + sw, -6, 26, 12, DU.boot, `stroke="${OL}" stroke-width="3"`) + E(20 - sw, -6, 26, 12, DU.boot, `stroke="${OL}" stroke-width="3"`);
  const arm = sg => { const tg = d.point && sg > 0 ? d.point : d.arms === 'wide' ? [sg * 104, shY + 10] : d.arms === 'hips' ? [sg * 62, shY + 80] : d.arms === 'up' ? [sg * 70, shY - 70] : [sg * 62, shY + 78 + (sg > 0 ? sw : -sw) * 0.3]; const ik = IK([sg * 44, shY + 8], tg, 40, 40, sg); return LIMB([ik[0], ik[1]], DU.coat, 22) + LIMB([ik[1], ik[2]], DU.skin, 17) + C(ik[2][0], ik[2][1], 11, DU.skin, `stroke="${OL}" stroke-width="3"`); };
  s += arm(-1) + P(`M-48,${shY - 6} Q-56,${hipY} -62,${hipY + 20} L62,${hipY + 20} Q56,${hipY} 48,${shY - 6} Q0,${shY - 24} -48,${shY - 6}Z`, DU.coat, `stroke="${OL}" stroke-width="3"`) + R(-62, hipY + 6, 124, 14, '#3a2418', `rx="4" stroke="${OL}" stroke-width="3"`) + R(-9, hipY + 3, 18, 20, DU.gold, `rx="3" stroke="${OL}" stroke-width="3"`) + [0, 1, 2].map(i => C(0, shY + 8 + i * 22, 5, DU.gold)).join('') + arm(1);
  s += G(DUEF(d.t, { grin: d.grin, fear: d.fear, m: d.m, eye: d.eye, lx: d.lx, ly: d.ly, tilt: d.tilt }), `translate(0 ${hdY}) scale(0.62)`);
  return G(s, '', d.ghost ? OP(1 - d.ghost) : '');
}
