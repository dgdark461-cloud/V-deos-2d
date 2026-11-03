/* kitH.js - Daniel e a pantera: personagens adultos, pantera, cenarios dark, paralaxe 2.5D. */
const OD = '#070a12';
const PAL2 = { dan: { skin: '#d9a47c', sh: '#a8744e', hair: '#14100e', jk: '#c8602c', jks: '#8f3f1c', pants: '#2c3a52', pantsS: '#1e2a3e', boot: '#241812' }, org: { skin: '#c8946c', sh: '#9a6a48', hair: '#0a0a0a', jk: '#1a1e2a', jks: '#10131c', pants: '#10131c', pantsS: '#0a0c12', boot: '#050608' }, hel: { skin: '#e2b896', sh: '#b88a68', hair: '#0c0a10', jk: '#e8dcc4', jks: '#b8a888', pants: '#1c2230', pantsS: '#121722', boot: '#14100e' } };
const LIM2 = (pts, col, w) => PL(pts, OD, w + 6) + PL(pts, col, w);
/* paralaxe 2.5D: camadas [{d, svg}], cam {x,y,dz} */
const PAR = (layers, cam = {}) => layers.map(l => { const dz = (cam.dz || 0) * l.d, sc = 1 + dz; return G(l.svg, `translate(540 960) scale(${sc.toFixed(4)}) translate(${f1(-540 - (cam.x || 0) * l.d)} ${f1(-960 - (cam.y || 0) * l.d)})`); }).join('');
function FACE2(t, o = {}) {
  const d = Object.assign({ c: 'dan', eye: 1, lx: 0, ly: 0, raise: 0, worry: 0, angry: 0, m: 0, sm: 0, sweat: 0, trem: 0, tilt: 0, rim: '', bl: 1 }, o), Q = PAL2[d.c], F = d.c === 'hel';
  const blk = d.bl && (t % 4.1) < 0.12 ? 0.08 : 1, ey = Math.min(1.7, d.eye) * blk, sx = d.trem ? H.noise(t * 40, 5) * 3 * d.trem : 0, lx = Math.max(-1, Math.min(1, d.lx)) * 5, ly = Math.max(-1, Math.min(1, d.ly)) * 4;
  const sm = d.sm - d.worry * 0.9 - d.angry * 0.5;
  let s = '';
  if (F && !d.nb) s += P('M-66,-30 Q-86,90 -64,210 L64,210 Q86,90 66,-30 Q44,-98 0,-100 Q-44,-98 -66,-30Z', Q.hair, `stroke="${OD}" stroke-width="3"`);
  if (!F) s += E(-60, 8, 11, 20, Q.skin, `stroke="${OD}" stroke-width="3"`) + E(60, 8, 11, 20, Q.skin, `stroke="${OD}" stroke-width="3"`);
  s += P('M-58,-22 Q-62,-84 0,-88 Q62,-84 58,-22 Q58,40 32,76 Q0,92 -32,76 Q-58,40 -58,-22Z', Q.skin, `stroke="${OD}" stroke-width="3.5"`);
  s += P('M-58,10 Q-56,50 -30,76 Q0,92 30,76 Q56,50 58,10 Q40,60 0,64 Q-40,60 -58,10Z', Q.sh, OP(F ? 0.18 : 0.3));
  if (!F) s += P('M-50,30 Q-40,70 0,76 Q40,70 50,30 Q30,52 0,52 Q-30,52 -50,30Z', '#2a1c16', OP(0.38));
  const eye = cx => G(E(0, 0, 14, 11 * ey + 1.2, '#f4f2ec', `stroke="${OD}" stroke-width="2.5"`) + (ey > 0.2 ? C(lx, ly, 7.4, F ? '#3a2a24' : '#3a2a1c') + C(lx, ly, 3.8, '#050505') + C(lx + 2.5, ly - 3, 2.4, '#fff') : '') + P(`M-15,${-2 - 5 * ey} Q0,${-12 - 8 * ey} 15,${-2 - 5 * ey}`, 'none', `stroke="${OD}" stroke-width="${F ? 3 : 4}" stroke-linecap="round"`), `translate(${cx} -6)`);
  s += eye(-24) + eye(24);
  const rb = d.raise * 8, wb = d.worry * 8, ab = d.angry * 8, bw = F ? 5 : 8;
  s += PL([[-40, -27 - rb + wb * 0.3 - ab * 0.3], [-24, -34 - rb - wb * 0.3], [-8, -27 - rb - wb + ab]], Q.hair, bw) + PL([[40, -27 - rb + wb * 0.3 - ab * 0.3], [24, -34 - rb - wb * 0.3], [8, -27 - rb - wb + ab]], Q.hair, bw);
  s += P('M-3,-4 Q-6,18 4,22 Q9,22 10,18', 'none', `stroke="${Q.sh}" stroke-width="4" stroke-linecap="round"`);
  const m = d.m, lc = F ? '#a8483e' : '#8a4a3a';
  if (m > 0.08) s += P(`M-19,46 Q0,${46 + sm * 12} 19,46 Q0,${48 + m * 44 + 4} -19,46Z`, '#3a0c10', `stroke="${OD}" stroke-width="3" stroke-linejoin="round"`) + (m > 0.4 ? R(-11, 47, 22, 6, '#f4f2ec') : '') + E(0, 46 + m * 24 + 4, 8, 4 + m * 5, '#c85a4e');
  else s += P(`M-18,47 Q0,${47 + sm * 16} 18,47`, 'none', `stroke="${F ? lc : OD}" stroke-width="${F ? 5 : 4}" stroke-linecap="round"`);
  if (d.sweat) { const u = (t * 0.9) % 1; s += P('M54,-34 q-9,16 0,24 q9,-8 0,-24Z', '#a8d8f0', `stroke="${OD}" stroke-width="2" ${OP(d.sweat)}`) + P(`M-50,${-4 + u * 20} q-7,12 0,18 q7,-6 0,-18Z`, '#a8d8f0', OP(d.sweat * (1 - u * 0.6))); }
  if (F) s += P('M0,-100 Q-72,-96 -66,-18 Q-60,-62 -28,-70 Q-8,-76 0,-100Z', Q.hair, `stroke="${OD}" stroke-width="3"`) + P('M0,-100 Q72,-96 66,-18 Q60,-62 28,-70 Q8,-76 0,-100Z', Q.hair, `stroke="${OD}" stroke-width="3"`) + P('M-40,-84 Q-10,-96 0,-92', 'none', 'stroke="#3a3a50" stroke-width="5" stroke-linecap="round" opacity="0.7"');
  else s += P('M-62,-24 Q-72,-98 0,-102 Q72,-98 62,-24 Q58,-62 26,-72 Q-18,-58 -62,-24Z', Q.hair, `stroke="${OD}" stroke-width="3"`) + P('M-30,-92 Q0,-104 36,-88', 'none', 'stroke="#3a3a4a" stroke-width="5" stroke-linecap="round" opacity="0.7"');
  if (d.gl) s += R(-44, -18, 36, 22, '#05060a', `rx="5" stroke="#4a4f5a" stroke-width="2"`) + R(8, -18, 36, 22, '#05060a', `rx="5" stroke="#4a4f5a" stroke-width="2"`) + L(-8, -8, 8, -8, '#4a4f5a', 3);
  if (d.rim) s += P('M54,-60 Q66,-10 52,40 Q44,64 28,78', 'none', `stroke="${d.rim}" stroke-width="5" stroke-linecap="round" opacity="0.8"`);
  return G(s, `translate(${f1(sx)} 0) rotate(${f1(d.tilt)})`);
}
function FACE2S(t, o = {}) {
  const d = Object.assign({ c: 'dan', eye: 1, m: 0, worry: 0, raise: 0, tilt: 0, sm: 0, rim: '' }, o), Q = PAL2[d.c], F = d.c === 'hel', blk = (t % 4.1) < 0.12 ? 0.08 : 1, ey = Math.min(1.5, d.eye) * blk;
  let s = F ? P('M-70,-30 Q-96,90 -70,210 L40,210 Q50,90 40,-40Z', Q.hair, `stroke="${OD}" stroke-width="3"`) : '';
  s += P('M-52,-24 Q-56,-84 0,-88 Q54,-84 56,-30 Q68,-6 60,8 Q70,20 56,28 Q58,50 40,72 Q10,92 -22,74 Q-50,48 -52,-24Z', Q.skin, `stroke="${OD}" stroke-width="3.5"`);
  if (!F) s += P('M-30,50 Q10,80 44,54 Q30,62 0,60Z', '#2a1c16', OP(0.38)) + E(-24, 6, 10, 18, Q.skin, `stroke="${OD}" stroke-width="3"`);
  s += E(22, -6, 11, 9 * ey + 1.2, '#f4f2ec', `stroke="${OD}" stroke-width="2.5"`) + (ey > 0.2 ? C(25, -6, 6, '#3a2a1c') + C(26, -6, 3, '#050505') : '') + PL([[10, -24 - d.raise * 6 + d.worry * 3], [24, -30 - d.raise * 6], [38, -24 - d.raise * 6 - d.worry * 5]], Q.hair, F ? 4 : 7);
  s += d.m > 0.1 ? E(40, 46, 7, 3 + d.m * 10, '#3a0c10', `stroke="${OD}" stroke-width="2.5"`) : P(`M30,48 Q42,${48 + (d.sm - d.worry) * 8} 52,${44 - (d.sm - d.worry) * 2}`, 'none', `stroke="${F ? '#a8483e' : OD}" stroke-width="4" stroke-linecap="round"`);
  s += P(F ? 'M-40,-30 Q-50,-96 6,-96 Q50,-90 52,-40 Q34,-62 6,-64 Q-20,-62 -40,-30Z' : 'M-52,-26 Q-60,-98 4,-100 Q56,-96 56,-34 Q30,-66 -2,-62 Q-28,-56 -52,-26Z', Q.hair, `stroke="${OD}" stroke-width="3"`);
  if (d.rim) s += P('M54,-50 Q62,-10 58,10 Q66,24 52,34', 'none', `stroke="${d.rim}" stroke-width="4" stroke-linecap="round" opacity="0.8"`);
  return G(s, `rotate(${f1(d.tilt)})`);
}
/* ---------------- pessoa adulta: corpo inteiro (0,0 = pes; altura ~ 610) ---------------- */
function PERS(o = {}) {
  const d = Object.assign({ c: 'dan', view: 'f', ph: 0, walk: 0, t: 0, arms: 'swing', eye: 1, m: 0, sm: 0, raise: 0, worry: 0, angry: 0, sweat: 0, lx: 0, ly: 0, hold: '', lean: 0, shadow: 1, tilt: 0, hand: null, handL: null, look: 0, rim: '', crouch: 0, creep: 0 }, o), Q = PAL2[d.c], F = d.c === 'hel', wd = F ? 0.86 : 1;
  const sp = d.walk ? (d.creep ? 0.5 : 0.75) : 0, bob = d.walk ? Math.abs(Math.cos(d.ph)) * (d.creep ? 4 : 8) : Math.sin(d.t * 1.5) * 2, cr = d.crouch * 80;
  const hip = [0, -250 - bob + cr], sh = -436 - bob + cr * 1.3, hdY = -522 - bob + cr * 1.5, fs = F ? 0.8 : 0.86;
  const lean = d.creep ? 10 : d.lean;
  let s = d.shadow ? E(0, 4, 100, 14, '#000', OP(0.4)) : '';
  const face = G(FACE2(d.t, { c: d.c, eye: d.eye, m: d.m, sm: d.sm, raise: d.raise, worry: d.worry, angry: d.angry, sweat: d.sweat, lx: d.lx, ly: d.ly, tilt: d.tilt, rim: d.rim, nb: 1 }), `translate(${f1(d.look * 8)} ${f1(hdY)}) scale(${fs})`);
  if (d.view === 's') {
    const leg = (ph, back) => { const sw = Math.sin(ph) * sp * 0.75, kn = Math.max(0, -Math.cos(ph)) * sp * 0.95 + 0.04, k = [hip[0] + 114 * Math.sin(sw), hip[1] + 114 * Math.cos(sw)], an = [k[0] + 118 * Math.sin(sw - kn), k[1] + 118 * Math.cos(sw - kn)]; return LIM2([hip, k], back ? Q.pantsS : Q.pants, 46) + LIM2([k, an], back ? Q.pantsS : Q.pants, 36) + G(E(14, 0, 36, 15, Q.boot, `stroke="${OD}" stroke-width="3"`), `translate(${f1(an[0])} ${f1(an[1] + 10)}) rotate(${f1((sw - kn * 0.6) * 20)})`); };
    const arm = (ph, back) => { const sw = d.arms === 'swing' ? Math.sin(ph + Math.PI) * sp * 0.7 : -1.2, el = d.arms === 'swing' ? 0.3 + Math.max(0, Math.sin(ph + Math.PI)) * sp * 0.5 : -0.5, S = [0, sh + 20], e = [S[0] + 84 * Math.sin(sw), S[1] + 84 * Math.cos(sw)], h = [e[0] + 80 * Math.sin(sw + el), e[1] + 80 * Math.cos(sw + el)]; return LIM2([S, e], back ? Q.jks : Q.jk, 40) + LIM2([e, h], back ? Q.jks : Q.jk, 34) + C(h[0], h[1], 17, Q.skin, `stroke="${OD}" stroke-width="3"`) + (!back && d.hold ? G(d.hold, `translate(${f1(h[0])} ${f1(h[1])})`) : ''); };
    if (F) s += P(`M-36,${hdY + 30} Q-70,${sh} -56,${sh + 130} L-20,${sh + 130} Z`, Q.hair, OP(0.0));
    s += arm(d.ph + Math.PI, 1) + leg(d.ph + Math.PI, 1);
    s += G(P(`M-52,${sh} Q-62,${hip[1] - 60} -54,${hip[1] + 20} L54,${hip[1] + 20} Q64,${hip[1] - 60} 52,${sh} Q0,${sh - 26} -52,${sh}Z`, Q.jk, `stroke="${OD}" stroke-width="3"`) + P(`M-54,${hip[1] + 20} L54,${hip[1] + 20} L56,${hip[1] - 30} L-56,${hip[1] - 30}Z`, Q.jks, OP(0.4)), `rotate(${f1(lean)} 0 ${hip[1]})`);
    s += leg(d.ph, 0) + arm(d.ph, 0) + R(-16, hdY + 60, 32, 44, Q.sh, 'rx="10"') + G(FACE2S(d.t, { c: d.c, eye: d.eye, m: d.m, worry: d.worry, raise: d.raise, sm: d.sm, rim: d.rim }), `translate(${f1(10 + d.look * 6)} ${f1(hdY)}) scale(${fs})`);
  } else {
    const fb = d.view === 'f';
    const legF = (x, ph) => { const lift = Math.max(0, Math.sin(ph)) * sp * 30; return LIM2([[x, hip[1] + 20], [x, hip[1] + 120]], Q.pants, 48 * wd) + LIM2([[x, hip[1] + 110], [x, -24 - lift]], Q.pants, 38 * wd) + E(x, -10 - lift, 34, 17, Q.boot, `stroke="${OD}" stroke-width="3"`); };
    if (d.crouch) s += LIM2([[-34, hip[1] + 20], [-70, hip[1] + 90], [-40, -24]], Q.pants, 40) + LIM2([[34, hip[1] + 20], [70, hip[1] + 90], [40, -24]], Q.pants, 40) + E(-40, -10, 34, 17, Q.boot, `stroke="${OD}" stroke-width="3"`) + E(40, -10, 34, 17, Q.boot, `stroke="${OD}" stroke-width="3"`);
    else s += legF(-30 * wd - 8, d.ph) + legF(30 * wd + 8, d.ph + Math.PI);
    const Sx = 86 * wd, Sy = sh + 18;
    const armSet = sg => {
      const kind = d.arms, swg = Math.sin(d.ph + (sg > 0 ? 0 : Math.PI)) * sp * 30; let tg;
      if (sg > 0 && d.hand) tg = d.hand; else if (sg < 0 && d.handL) tg = d.handL;
      else if (kind === 'up') tg = [sg * 140, sh - 170]; else if (kind === 'cover') tg = [sg * 40, hdY + 50]; else if (kind === 'cheeks') tg = [sg * 70, hdY + 40]; else if (kind === 'hold') tg = [sg * 50, sh + 130]; else if (kind === 'wide') tg = [sg * 190, sh + 80]; else if (kind === 'crossed') tg = [-sg * 40, sh + 120]; else tg = [sg * 108, sh + 190 - Math.abs(swg) * 0.3];
      const ik = IK([sg * Sx, Sy], tg, 84, 82, -sg);
      return LIM2([ik[0], ik[1]], Q.jk, 40 * wd) + LIM2([ik[1], ik[2]], Q.jk, 32 * wd) + C(ik[2][0], ik[2][1], 17, Q.skin, `stroke="${OD}" stroke-width="3"`) + (sg > 0 && d.hold ? G(d.hold, `translate(${f1(ik[2][0])} ${f1(ik[2][1])})`) : '');
    };
    if (!fb && F) s += P(`M-64,${hdY} Q-84,${sh} -70,${sh + 160} L70,${sh + 160} Q84,${sh} 64,${hdY}Z`, Q.hair);
    if (fb && F) s += G(P('M-66,-30 Q-86,90 -64,210 L64,210 Q86,90 66,-30 Q44,-98 0,-100 Q-44,-98 -66,-30Z', Q.hair, `stroke="${OD}" stroke-width="3"`), `translate(${f1(d.look * 8)} ${f1(hdY)}) scale(${fs})`);
    s += armSet(-1);
    s += P(`M${-92 * wd},${sh} Q${-100 * wd},${hip[1] - 40} ${-70 * wd},${hip[1] + 30} L${70 * wd},${hip[1] + 30} Q${100 * wd},${hip[1] - 40} ${92 * wd},${sh} Q0,${sh - 30} ${-92 * wd},${sh}Z`, Q.jk, `stroke="${OD}" stroke-width="3"`) + P(`M${-70 * wd},${hip[1] + 30} L${70 * wd},${hip[1] + 30} L${74 * wd},${hip[1] - 20} L${-74 * wd},${hip[1] - 20}Z`, Q.jks, OP(0.4));
    if (fb) s += L(0, sh + 10, 0, hip[1] + 26, Q.jks, 5) + P(`M-30,${sh - 6} Q0,${sh + 26} 30,${sh - 6}`, Q.sh, OP(0.9));
    s += armSet(1) + R(-17, hdY + 62, 34, 44, Q.sh, 'rx="10"');
    if (fb) s += G(face, '');
    else s += G(E(0, 0, 60, 84, Q.hair, `stroke="${OD}" stroke-width="3.5"`) + E(0, 0, 0, 0, 'none'), `translate(${f1(d.look * 8)} ${f1(hdY)}) scale(${fs})`);
  }
  return s;
}
function PERSF(t, o = {}, x = 540, y = 960, sc = 2.6) {
  const d = Object.assign({ c: 'dan' }, o), Q = PAL2[d.c];
  return G(P('M-150,260 Q-150,130 -80,100 L80,100 Q150,130 150,260Z', Q.jk, `stroke="${OD}" stroke-width="4"`) + P('M-30,98 Q0,134 30,98Z', Q.sh) + R(-22, 62, 44, 56, Q.sh, 'rx="12"') + FACE2(t, d), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
}
/* ---------------- pantera (de perfil, olhando para +x; 0,0 = chao sob a barriga) ---------------- */
function PANT(o = {}) {
  const d = Object.assign({ t: 0, ph: 0, walk: 0, prowl: 0, crouch: 0, head: 0, tail: 0, eyes: 1, rim: '#2a6a8a', shadow: 1, growl: 0 }, o);
  const sp = d.walk ? 0.8 : 0, cy = d.crouch * 50, bob = d.walk ? Math.sin(d.ph * 2) * 5 : Math.sin(d.t * 1.6) * 2, hy = -150 + cy - bob;
  let s = d.shadow ? E(0, 4, 300, 20, '#000', OP(0.45)) : '';
  const leg = (x, ph, back) => { const sw = Math.sin(ph) * sp * 0.7, kn = Math.max(0, -Math.cos(ph)) * sp * 0.9 + 0.12 + d.crouch * 0.5, top = [x, hy + 10], k = [x + 78 * Math.sin(sw), top[1] + 78 * Math.cos(sw)], an = [k[0] + 80 * Math.sin(sw - kn), k[1] + 80 * Math.cos(sw - kn)]; return PL([top, k, an], back ? '#05060a' : '#0a0c12', 36) + PL([top, k, an], back ? '#05060a' : '#0e1118', 28) + E(an[0] + 12, Math.min(0, an[1]) - 4, 28, 13, back ? '#05060a' : '#0e1118'); };
  s += leg(-180, d.ph + Math.PI, 1) + leg(180, d.ph, 1);
  const tl = d.tail, tp = []; for (let i = 0; i <= 8; i++) { const u = i / 8; tp.push([-230 - u * 190, hy - 30 - 60 * u * u * 2 + Math.sin(d.t * 2 + u * 3) * 16 * tl * u]); }
  s += PL(tp, '#05060a', 28);
  s += P(`M-240,${hy - 40} Q-120,${hy - 110} 0,${hy - 96 + cy * 0.2} Q120,${hy - 110} 230,${hy - 60} Q262,${hy - 30} 240,${hy + 20} Q120,${hy + 50} 0,${hy + 40} Q-130,${hy + 50} -250,${hy + 10} Q-280,${hy - 20} -240,${hy - 40}Z`, '#0a0c12', `stroke="${d.rim}" stroke-width="3"`);
  s += P(`M-200,${hy - 70} Q0,${hy - 118} 210,${hy - 70}`, 'none', `stroke="${d.rim}" stroke-width="5" stroke-linecap="round" opacity="0.7"`);
  s += leg(-170, d.ph, 0) + leg(190, d.ph + Math.PI, 0);
  const hx = 300, hyy = hy - 30 + d.head * 30 + cy * 0.3;
  s += P(`M${hx - 70},${hyy + 30} Q${hx - 80},${hyy - 40} ${hx - 10},${hyy - 56} Q${hx + 60},${hyy - 58} ${hx + 100},${hyy - 10} Q${hx + 130},${hyy + 14} ${hx + 100},${hyy + 36} Q${hx + 40},${hyy + 54} ${hx - 20},${hyy + 50}Z`, '#0c0e15', `stroke="${d.rim}" stroke-width="3"`) + P(`M${hx - 20},${hyy - 56} L${hx - 34},${hyy - 100} L${hx + 14},${hyy - 62}Z`, '#0c0e15', `stroke="${d.rim}" stroke-width="3"`) + P(`M${hx + 22},${hyy - 58} L${hx + 40},${hyy - 100} L${hx + 62},${hyy - 50}Z`, '#0c0e15', `stroke="${d.rim}" stroke-width="3"`);
  if (d.growl) s += P(`M${hx + 40},${hyy + 38} L${hx + 52},${hyy + 58} L${hx + 62},${hyy + 38}Z M${hx + 74},${hyy + 36} L${hx + 84},${hyy + 54} L${hx + 92},${hyy + 34}Z`, '#f4f2ec');
  s += d.eyes ? P(`M${hx + 24},${hyy - 12} Q${hx + 44},${hyy - 26} ${hx + 66},${hyy - 8} Q${hx + 44},${hyy + 4} ${hx + 24},${hyy - 12}Z`, '#e6ff3a', `stroke="#050505" stroke-width="3"`) + E(hx + 46, hyy - 12, 5, 11, '#050505') + glow('', 'A', hx + 46, hyy - 12, 46, 0.5 * d.eyes) : '';
  return s;
}
const EYESP = (Pf, t, x, y, sc, a = 1, o = {}) => { const b = (t % 3.3) < 0.12 ? 0.15 : 1; return G(glow(Pf, 'A', 0, 0, 260, 0.45 * a) + [-1, 1].map(sg => P(`M${sg * 90 - 54},0 Q${sg * 90},${-44 * b} ${sg * 90 + 54},0 Q${sg * 90},${34 * b} ${sg * 90 - 54},0Z`, o.col || '#e6ff3a', `stroke="#050505" stroke-width="6" ${OP(a)}`) + E(sg * 90, -2, 11, 28 * b, '#050505', OP(a))).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
/* cenarios */
const FOREST2L = (Pf, t, o = {}) => {
  const px = o.px || 0, dz = o.dz || 0, tone = o.tone || 'blue', ground = o.ground === undefined ? 1250 : o.ground;
  const mk = (n, col, w, hh, seed, dep) => { let s = ''; for (let i = 0; i < n; i++) { const x = (hz(i, seed) * 2400 - 600), ww = w * (0.7 + 0.6 * hz(i, seed + 1)); s += P(`M${f1(x - ww)},${ground + 200} Q${f1(x - ww * 0.5)},${ground - hh * 0.5} ${f1(x - ww * 0.25)},${ground - hh} L${f1(x + ww * 0.25)},${ground - hh} Q${f1(x + ww * 0.5)},${ground - hh * 0.5} ${f1(x + ww)},${ground + 200}Z`, col) + P(`M${f1(x - ww * 0.25)},${ground - hh} Q${f1(x - ww * 0.5)},${ground - hh * 0.5} ${f1(x - ww)},${ground + 200}`, 'none', `stroke="#6ab4d8" stroke-width="${dep > 0.3 ? 5 : 3}" opacity="${dep < 0.3 ? 0.18 : 0.3}"`); } return s; };
  const layers = [
    { d: 0.05, svg: R(-800, -800, 2680, 3200, `url(#sk_night)`) + glow(Pf, 'B', 760, 380, 760, 0.45) + C(760, 380, 90, '#d8e8f8') + C(792, 366, 78, '#0a1030', OP(0.0)) + glow(Pf, 'W', 760, 380, 300, 0.3) + RAYS(Pf, t, 760, 380, 9, 2000, '#bfe0ff', 0.05) },
    { d: 0.2, svg: mk(14, '#14303f', 60, 1300, 11, 0.2) + R(-800, ground - 80, 2680, 400, '#14303f') },
    { d: 0.4, svg: mk(11, '#0f2433', 80, 1500, 21, 0.4) + R(-800, ground - 20, 2680, 400, '#0f2433') },
    { d: 0.7, svg: mk(7, '#0a1a28', 110, 1800, 31, 0.7) + R(-800, ground + 40, 2680, 1200, '#0a1a28') + E(540, ground + 20, 1200, 60, '#2a5a6a', OP(0.18 + 0.05 * Math.sin(t))) },
    { d: 1.0, svg: [[-140, 150], [1230, 170]].map(p => P(`M${p[0] - p[1]},${ground + 400} Q${p[0] - p[1] * 0.5},${ground - 600} ${p[0] - p[1] * 0.3},-400 L${p[0] + p[1] * 0.3},-400 Q${p[0] + p[1] * 0.5},${ground - 600} ${p[0] + p[1]},${ground + 400}Z`, '#03060c') + P(`M${p[0] - p[1] * 0.3},-400 Q${p[0] - p[1] * 0.5},${ground - 600} ${p[0] - p[1]},${ground + 400}`, 'none', 'stroke="#6ab4d8" stroke-width="5" opacity="0.3"')).join('') }
  ];
  return layers;
};
const FOREST2 = (Pf, t, o = {}) => PAR(FOREST2L(Pf, t, o), { x: o.px || 0, y: o.py || 0, dz: o.dz || 0 }) + (o.fog === 0 ? '' : R(-100, 700, 1280, 1000, '#4a8aa0', OP(0.07 + 0.03 * Math.sin(t * 0.7))));
const TORCH = (x, y, ang, len, w, a = 0.5) => { const r = ang * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r), nx = -dy, ny = dx; return P(`M${f1(x)},${f1(y)} L${f1(x + dx * len + nx * w)},${f1(y + dy * len + ny * w)} L${f1(x + dx * len - nx * w)},${f1(y + dy * len - ny * w)}Z`, '#fff6c8', OP(a)) + glow('', 'W', x + dx * 40, y + dy * 40, 60, 0.9); };
const CAMH = (x, y, sc, t) => G(R(-26, -18, 52, 36, '#15181e', `rx="6" stroke="#3a3f4a" stroke-width="3"`) + C(0, 0, 12, '#05060a', 'stroke="#3a3f4a" stroke-width="3"') + C(0, 0, 6, '#1a2a4a') + C(-4, -4, 2.5, '#fff', OP(0.7)) + C(18, -10, 4, '#ff2a2a', OP(Math.sin(t * 6) > 0 ? 1 : 0.15)) + glow('', 'R', 18, -10, 20, Math.sin(t * 6) > 0 ? 0.8 : 0.1), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const CAGE = (x, y, sc, o = {}) => { const open = o.open || 0, sx = Math.cos(open * Math.PI * 0.62); let s = R(-170, -150, 340, 150, '#0a0c12', OP(0.6)) + (o.inside ? G(PANT({ t: o.t || 0, crouch: 1, shadow: 0, rim: '#2a4a5a' }), 'translate(-20 -10) scale(0.5)') : ''); for (let i = 0; i <= 6; i++) s += L(-170 + i * 42.5, -150, -170 + i * 42.5, 0, '#6a7480', 7); s += R(-176, -158, 352, 14, '#4a5260', `stroke="${OD}" stroke-width="3"`) + R(-176, -8, 352, 14, '#4a5260', `stroke="${OD}" stroke-width="3"`); s += G(R(-85, -150, 85, 150, 'none', `stroke="#8a94a0" stroke-width="8"`) + [1, 2, 3].map(i => L(-85 + i * 21, -150, -85 + i * 21, 0, '#8a94a0', 6)).join(''), `translate(170 0) scale(${f1(sx)} 1)`); return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const TRUCK = (Pf, t, x, y, sc, o = {}) => { const wr = (o.spin || 0); const wheel = (cx) => G(C(0, 0, 46, '#0a0c12', `stroke="${OD}" stroke-width="4"`) + C(0, 0, 22, '#3a4250') + [0, 1, 2, 3, 4].map(i => L(0, 0, Math.cos(wr + i * 1.2566) * 20, Math.sin(wr + i * 1.2566) * 20, '#8a94a0', 4)).join(''), `translate(${cx} 0)`); let s = E(0, 6, 360, 18, '#000', OP(0.4)) + R(-320, -190, 360, 150, '#2a3240', `rx="8" stroke="${OD}" stroke-width="4"`) + CAGE(-140, -50, 0.85, { inside: o.inside === undefined ? 1 : o.inside, t, open: 0 }) + P('M60,-60 L60,-210 L190,-210 L260,-130 L300,-110 L300,-60Z', '#3a5a72', `stroke="${OD}" stroke-width="4"`) + P('M100,-198 L100,-130 L240,-130 L184,-198Z', '#1a2a3a', `stroke="${OD}" stroke-width="3"`) + P('M100,-198 L184,-198 L110,-130Z', '#fff', OP(0.08)) + R(-330, -62, 650, 26, '#1a2028', `rx="6" stroke="${OD}" stroke-width="3"`) + C(290, -90, 14, '#fff3b0') + wheel(-220) + wheel(200).replace('translate(200 0)', 'translate(200 0)');
  s += glow(Pf, 'W', 296, -90, 130, 0.9) + P('M300,-92 L900,-200 L900,20Z', '#fff6c8', OP(0.16));
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const CABINX = (Pf, t, x, y, sc, o = {}) => { let s = R(-340, -300, 680, 300, '#4a2c18', `stroke="${OD}" stroke-width="5"`); for (let i = 0; i < 6; i++) s += R(-340, -300 + i * 50, 680, 46, i % 2 ? '#5a361e' : '#4e2f1a', `rx="22" stroke="${OD}" stroke-width="3"`); s += P('M-400,-300 L0,-460 L400,-300Z', '#1a1410', `stroke="${OD}" stroke-width="5"`) + R(-250, -230, 150, 130, '#ffb347', `stroke="${OD}" stroke-width="6"`) + glow(Pf, 'F', -175, -165, 200, o.lit === undefined ? 0.9 : o.lit) + L(-175, -230, -175, -100, OD, 6) + L(-250, -165, -100, -165, OD, 6) + R(60, -250, 130, 250, '#3a2010', `stroke="${OD}" stroke-width="6"`) + C(170, -120, 8, '#d8b050') + R(220, -420, 50, 120, '#2a2018', `stroke="${OD}" stroke-width="4"`) + (o.smoke ? [0, 1, 2, 3].map(i => { const u = (t * 0.2 + i / 4) % 1; return C(245 + 30 * u + 10 * Math.sin(t + i), -430 - u * 220, 22 + 26 * u, '#aab8c8', OP(0.25 * (1 - u))); }).join('') : ''); return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const CABINI = (Pf, t, o = {}) => { let s = BIG('#2a1a10'); for (let i = 0; i < 16; i++) s += R(-100, i * 130 - 60, 1280, 126, i % 2 ? '#3a2314' : '#33200f', `stroke="#1a0e06" stroke-width="3"`); s += R(-100, 1380, 1280, 700, '#1c1008', `stroke="${OD}" stroke-width="4"`); for (let i = 0; i < 6; i++) s += L(-100 + i * 260, 1380, -300 + i * 330, 1920, '#0a0603', 4, OP(0.6));
  s += R(60, 300, 300, 400, '#0a1220', `stroke="#4a2c18" stroke-width="22"`) + (o.winInner || '') + L(210, 300, 210, 700, '#4a2c18', 12) + L(60, 500, 360, 500, '#4a2c18', 12);
  s += (o.frame === false ? '' : (o.frameOff ? '' : R(700, 760, 220, 280, '#6a4a2a', `stroke="${OD}" stroke-width="8"`) + R(722, 782, 176, 236, '#2a4a3a') + P('M722,940 L800,860 L850,920 L898,880 L898,1018 L722,1018Z', '#1a2a22')));
  s += R(80, 1060, 400, 30, '#5a3a20', `stroke="${OD}" stroke-width="4"`) + R(110, 1090, 24, 300, '#4a2c18') + R(426, 1090, 24, 300, '#4a2c18') + R(240, 960, 60, 100, '#d8a040', `stroke="${OD}" stroke-width="4"`) + P('M250,960 Q270,900 290,960Z', '#ffd070');
  s += glow(Pf, 'F', 270, 940, 560, o.lamp === undefined ? 0.9 : o.lamp) + (o.door === false ? '' : R(-50, 560, 20, 20, 'none'));
  return s; };
const HOUSEBED = 0;
