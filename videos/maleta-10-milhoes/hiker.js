/* hiker.js - Trilheiro de boné: rig com caminhada, respiração, piscada. Nomes próprios (hk*). */
const HK = { cap: '#2f8a78', capDk: '#1f5f52', capLt: '#4fb09a', jacket: '#e07a2e', jacketDk: '#b25a1c', jacketLt: '#f0a060', pants: '#6a6552', pantsDk: '#4d4a3b', boot: '#6b4a30', bootDk: '#3a281a', sole: '#2a211b', pack: '#2f4a63', packDk: '#203446', strap: '#1c2a38', skin: '#e0ac86', skinDk: '#b9805f', hair: '#3a281e', shirt: '#e8e4d6' };
const hkBlink = t => { const p = (t + 0.7) % 3.4; return p < 0.13 ? Math.abs(p - 0.065) / 0.065 : 1; };
const lmb = (x, y, a1, l1, a2, l2) => { const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180, kx = x + Math.sin(r1) * l1, ky = y + Math.cos(r1) * l1; return [[x, y], [kx, ky], [kx + Math.sin(r2) * l2, ky + Math.cos(r2) * l2]]; };
const hkTube = (pts, w1, w2, col) => { let s = ''; for (let i = 0; i < pts.length - 1; i++) s += L(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, i === 0 ? w1 : w2); return s; };

/* Rosto frontal em close (origem = centro do rosto): lucasFace recolorido + boné + alças da mochila */
function hikerFace(o) {
  const sv = Object.assign({}, PAL);
  Object.assign(PAL, { skin: HK.skin, skinSh: HK.skinDk, hair: HK.hair, hairHi: '#5a4030', hood: HK.jacket, hoodSh: HK.jacketDk, vest: HK.shirt });
  const t = o.t || 0, eye = (o.eye === undefined ? 1 : o.eye) * hkBlink(t + (o.ph || 0));
  let inner; try { inner = lucasFace(Object.assign({ beard: 0.28, dark: 0.1, wet: 0, mess: 0, bodyLen: 430, tremble: 0 }, o, { eye })); } finally { Object.assign(PAL, sv); }
  const br = 12 * (o.worry || 0), tilt = o.capTilt || 0;
  let cap = P('M-182,-94 C-196,-282 196,-282 182,-94 C110,-122 -110,-122 -182,-94Z', HK.cap) + P('M-182,-94 C-196,-282 -20,-282 -10,-110 C-80,-112 -140,-108 -182,-94Z', HK.capDk, OP(0.45));
  cap += P('M-60,-200 Q0,-230 60,-200 L50,-130 Q0,-120 -50,-130Z', HK.capLt, OP(0.9)) + POLY([[-26, -150], [0, -190], [26, -150]], '#f4f0e6') + POLY([[-14, -150], [4, -176], [14, -150]], HK.cap) + L(0, -278, 0, -208, HK.capDk, 4, OP(0.5)) + C(0, -274, 9, HK.capDk);
  cap += P('M-214,-92 Q0,-34 214,-92 Q0,-146 -214,-92Z', HK.capDk) + P('M-214,-92 Q0,-34 214,-92', 'none', `stroke="${HK.cap}" stroke-width="7" opacity="0.8"`) + P('M-150,-84 Q0,-44 150,-84 L150,-60 Q0,-20 -150,-60Z', '#000', OP(0.2));
  const straps = P('M-150,226 L-122,430 L-70,430 L-96,226Z', HK.strap) + P('M150,226 L122,430 L70,430 L96,226Z', HK.strap) + R(-124, 330, 54, 18, '#6a7a88', 'rx="4"') + R(70, 330, 54, 18, '#6a7a88', 'rx="4"');
  return inner + straps + G(cap, `rotate(${tilt} 0 -60)`);
}
const hkF = (o, x, y, sc) => G(hikerFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);

/* Figura de corpo inteiro. view: 's' (perfil, olha p/ +x), 'b' (de costas), 'f' (de frente).
   o: {t, walk (fase 0..1 contínua), view, flip, scale, lean, stride, arms:[[a,e],[a,e]] near/far, holdNear, holdFar, look, scared, mouth, bag(1/0), idle} origem = pés */
function hikerFig(o) {
  const d = Object.assign({ t: 0, walk: 0, view: 's', flip: 1, scale: 1, lean: 0, stride: 1, arms: null, holdNear: '', holdFar: '', look: 0, scared: 0, mouth: 0, bag: 1, idle: 1, cap: 1, eyes: 1 }, o);
  const ph = d.walk * 2 * Math.PI, st = d.stride, br = d.idle * Math.sin(d.t * 1.9) * 3;
  const bob = -9 * st * Math.abs(Math.sin(ph)) * (d.stride ? 1 : 0) - br * 0.4;
  const hipY = -440 + bob, shY = -700 + bob + br * 0.3, lean = d.lean + 6 * st, hipX = 0;
  const bl = hkBlink(d.t), v = d.view;
  /* pernas */
  const leg = (side, phase) => {
    const a1 = 30 * st * Math.sin(phase) * side, k = 6 + 38 * st * Math.max(0, Math.sin(phase * side + 1.4)), a2 = a1 - k * (v === 's' ? 1 : 0.3);
    const p = lmb(hipX + (v === 's' ? 0 : side * 24), hipY, v === 's' ? a1 : a1 * 0.25, 222, v === 's' ? a2 : a2 * 0.25, 222);
    const col = side === 1 ? HK.pants : HK.pantsDk, ax = p[2][0], ay = p[2][1];
    const toe = v === 's' ? 40 : 0;
    return hkTube(p, 52, 44, col) + E(p[1][0], p[1][1], 28, 28, col) + G(P(`M-30,-30 L${22 + toe},-30 Q${52 + toe},-24 ${54 + toe},4 L-36,4 Z`, side === 1 ? HK.boot : HK.bootDk) + R(-36, -2, 92 + toe, 12, HK.sole, 'rx="5"') + R(-30, -34, 54, 8, '#d8d0c0', 'rx="4"'), `translate(${f1(ax)} ${f1(ay)})`);
  };
  const armP = (side, phase) => {
    const sw = d.arms ? null : -26 * st * Math.sin(phase) * side, ea = d.arms ? null : 14 + 22 * st * Math.max(0, Math.sin(phase * side + 0.4));
    const A = d.arms ? d.arms[side === 1 ? 0 : 1] : [sw, ea];
    return lmb(side === 1 || v !== 's' ? (v === 's' ? lean : side * 78 + lean) : lean, shY + 20, A[0] * (v === 's' ? 1 : (side === 1 ? 1 : 1)), 150, A[0] + A[1], 140);
  };
  const arm = (side, phase, hold, col) => { const p = armP(side, phase); return hkTube(p, 40, 34, col) + E(p[1][0], p[1][1], 21, 21, col) + C(p[2][0], p[2][1], 19, HK.skin) + (hold ? G(hold, `translate(${f1(p[2][0])} ${f1(p[2][1])})`) : ''); };
  let s = '';
  const sh = v === 's' ? 58 : 98;
  /* mochila (atrás) */
  const pack = d.bag ? (v === 's' ? G(P('M-52,-690 Q-150,-690 -150,-590 L-146,-470 Q-146,-420 -90,-420 L-46,-428Z', HK.pack) + R(-140, -560, 70, 60, HK.packDk, 'rx="10"') + P('M-150,-640 Q-110,-660 -60,-648', 'none', `stroke="${HK.packDk}" stroke-width="10"`) + R(-136, -690, 80, 22, '#8a3a2a', 'rx="8"'), `translate(${f1(lean * 0.7)} ${f1(bob * 0.5)})`) : '') : '';
  if (v === 's') {
    s += leg(-1, ph + Math.PI) + (d.holdFar ? '' : '') + arm(-1, ph + Math.PI, d.holdFar, HK.jacketDk);
    s += pack;
    s += P(`M${-52 + lean * 0.3},${hipY + 30} Q${-62 + lean},${(hipY + shY) / 2} ${-48 + lean},${shY} Q${lean},${shY - 34} ${50 + lean},${shY} Q${62 + lean},${(hipY + shY) / 2} ${52 + lean * 0.3},${hipY + 30}Z`, HK.jacket) + P(`M${-52 + lean * 0.3},${hipY + 30} Q${-62 + lean},${(hipY + shY) / 2} ${-48 + lean},${shY} L${-20 + lean},${shY - 6} Q${-30 + lean * 0.6},${(hipY + shY) / 2} ${-26 + lean * 0.3},${hipY + 30}Z`, HK.jacketDk, OP(0.55));
    s += R(-54 + lean * 0.3, hipY + 12, 106, 22, HK.jacketDk, 'rx="8"') + L(46 + lean * 0.8, shY + 10, 40 + lean * 0.3, hipY + 20, '#fff', 3, OP(0.4));
    s += P(`M${-46 + lean},${shY - 6} Q${lean + 6},${shY - 40} ${46 + lean},${shY - 6} L${40 + lean},${shY + 14} Q${lean},${shY - 16} ${-40 + lean},${shY + 14}Z`, HK.shirt) + leg(1, ph) + arm(1, ph, d.holdNear, HK.jacket);
  } else {
    s += leg(-1, ph + Math.PI) + leg(1, ph);
    if (v === 'b' && d.bag) s += R(-96 + lean, shY - 6, 192, 270, HK.pack, 'rx="44"') + R(-70 + lean, shY + 110, 140, 90, HK.packDk, 'rx="16"') + R(-86 + lean, shY - 20, 172, 34, '#8a3a2a', 'rx="14"') + P(`M${-96 + lean},${shY + 40} Q${-130 + lean},${shY + 160} ${-96 + lean},${shY + 250}`, 'none', `stroke="${HK.packDk}" stroke-width="12"`) + P(`M${96 + lean},${shY + 40} Q${130 + lean},${shY + 160} ${96 + lean},${shY + 250}`, 'none', `stroke="${HK.packDk}" stroke-width="12"`);
    else s += P(`M${-70},${hipY + 30} Q${-100 + lean},${(hipY + shY) / 2} ${-sh + lean},${shY} Q${lean},${shY - 40} ${sh + lean},${shY} Q${100 + lean},${(hipY + shY) / 2} ${70},${hipY + 30}Z`, HK.jacket) + L(lean * 0.6, shY + 4, 0, hipY + 24, HK.jacketDk, 5, OP(0.6)) + P(`M${-34 + lean},${shY - 10} Q${lean},${shY + 40} ${34 + lean},${shY - 10}Z`, HK.shirt) + P(`M${-sh + 14 + lean},${shY + 6} L${-sh + 4 + lean},${shY + 200}`, 'none', `stroke="${HK.strap}" stroke-width="16"`) + P(`M${sh - 14 + lean},${shY + 6} L${sh - 4 + lean},${shY + 200}`, 'none', `stroke="${HK.strap}" stroke-width="16"`);
    s += arm(-1, ph + Math.PI, d.holdFar, HK.jacketDk) + arm(1, ph, d.holdNear, HK.jacket);
    if (v === 'b' && d.bag) { /* alças já na mochila */ }
  }
  /* cabeça */
  const hx = lean * 1.4 + (v === 's' ? 12 : 0), hy = shY - 92 + br * 0.4, lk = d.look * 7, tilt = (d.headTilt || 0);
  let h = R(hx - 17, hy + 36, 34, 50, HK.skinDk);
  if (v === 's') {
    h += E(hx, hy, 46, 52, HK.skin) + E(hx - 30, hy + 6, 11, 17, HK.skinDk) + P(`M${hx + 44},${hy - 4} q16,14 6,24 q-12,2 -14,-4Z`, HK.skin) + P(`M${hx - 40},${hy + 24} Q${hx + 6},${hy + 64} ${hx + 44},${hy + 22} Q${hx},${hy + 44} ${hx - 40},${hy + 24}Z`, '#2a1c14', OP(0.35));
    const ey = hy - 6; h += E(hx + 22, ey, 7.5, 6.5 * bl, '#f4efe9') + C(hx + 24 + lk * 0.4, ey, 3.6, '#1a0f0b') + L(hx + 10, ey - 15 - 3 * d.scared, hx + 34, ey - 12, HK.hair, 5) + (d.mouth > 0.1 ? E(hx + 24, hy + 30, 9, 4 + 10 * d.mouth, '#2f0f12') : P(`M${hx + 12},${hy + 30} Q${hx + 24},${hy + (d.scared ? 26 : 34)} ${hx + 34},${hy + 29}`, 'none', 'stroke="#7a3a30" stroke-width="4" stroke-linecap="round"'));
    if (d.cap) h += P(`M${hx - 52},${hy - 6} C${hx - 54},${hy - 80} ${hx + 50},${hy - 84} ${hx + 50},${hy - 14} Q${hx},${hy - 22} ${hx - 52},${hy - 6}Z`, HK.cap) + P(`M${hx - 52},${hy - 6} C${hx - 54},${hy - 80} ${hx - 10},${hy - 80} ${hx - 6},${hy - 18} Q${hx - 30},${hy - 16} ${hx - 52},${hy - 6}Z`, HK.capDk, OP(0.5)) + P(`M${hx + 44},${hy - 22} Q${hx + 96},${hy - 20} ${hx + 100},${hy - 8} Q${hx + 60},${hy - 12} ${hx + 40},${hy - 6}Z`, HK.capDk) + P(`M${hx - 54},${hy - 8} q-12,26 -2,44 q16,-14 10,-40Z`, HK.hair);
  } else if (v === 'b') {
    h += E(hx, hy, 46, 52, HK.skin) + P(`M${hx - 46},${hy - 4} Q${hx},${hy + 60} ${hx + 46},${hy - 4} L${hx + 46},${hy + 20} Q${hx},${hy + 66} ${hx - 46},${hy + 20}Z`, HK.hair) + E(hx - 46, hy + 8, 9, 15, HK.skinDk) + E(hx + 46, hy + 8, 9, 15, HK.skinDk);
    if (d.cap) h += P(`M${hx - 52},${hy + 4} C${hx - 56},${hy - 84} ${hx + 56},${hy - 84} ${hx + 52},${hy + 4} Q${hx},${hy + 22} ${hx - 52},${hy + 4}Z`, HK.cap) + C(hx, hy - 62, 6, HK.capDk) + P(`M${hx},${hy - 70} L${hx},${hy + 16}`, 'none', `stroke="${HK.capDk}" stroke-width="3" opacity="0.5"`) + R(hx - 22, hy - 2, 44, 10, '#8a8a8a', 'rx="3"');
  } else {
    h += E(hx, hy, 46, 52, HK.skin) + E(hx - 46, hy + 6, 9, 15, HK.skinDk) + E(hx + 46, hy + 6, 9, 15, HK.skinDk);
    const ey = hy - 2; for (const sx of [-1, 1]) h += E(hx + sx * 18, ey, 9, 7 * bl * (d.eyes), '#f4efe9') + C(hx + sx * 18 + lk, ey, 4, '#1a0f0b') + L(hx + sx * 28, ey - 15 - 4 * d.scared, hx + sx * 8, ey - 13, HK.hair, 5);
    h += P(`M${hx - 40},${hy + 22} Q${hx},${hy + 72} ${hx + 40},${hy + 22} Q${hx},${hy + 46} ${hx - 40},${hy + 22}Z`, '#2a1c14', OP(0.35)) + (d.mouth > 0.1 ? E(hx, hy + 30, 11, 4 + 12 * d.mouth, '#2f0f12') : P(`M${hx - 11},${hy + 30} Q${hx},${hy + (d.scared ? 25 : 35)} ${hx + 11},${hy + 30}`, 'none', 'stroke="#7a3a30" stroke-width="4" stroke-linecap="round"'));
    if (d.cap) h += P(`M${hx - 52},${hy - 14} C${hx - 56},${hy - 86} ${hx + 56},${hy - 86} ${hx + 52},${hy - 14} Q${hx},${hy - 30} ${hx - 52},${hy - 14}Z`, HK.cap) + P(`M${hx - 60},${hy - 14} Q${hx},${hy + 4} ${hx + 60},${hy - 14} Q${hx},${hy - 34} ${hx - 60},${hy - 14}Z`, HK.capDk) + POLY([[hx - 10, hy - 52], [hx, hy - 66], [hx + 10, hy - 52]], '#f4f0e6');
  }
  s += `<g transform="rotate(${tilt} ${f1(hx)} ${f1(hy + 44)})">${h}</g>`;
  return G(s, `scale(${d.flip * d.scale} ${d.scale})`);
}
