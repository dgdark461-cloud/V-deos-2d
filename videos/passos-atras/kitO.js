/* kitO.js - Davi e Rui, rua ao entardecer, objetos da cena dos passos */
PAL2.luc = { skin: '#c48a62', sh: '#9a6644', hair: '#15110e', jk: '#ffc83a', jks: '#d49a1a', pants: '#3a3f5a', pantsS: '#262a40', boot: '#f4efe6' };
PAL2.raf = { skin: '#e0b088', sh: '#b8855a', hair: '#2a2018', jk: '#6a7ae8', jks: '#4a58c0', pants: '#2e3448', pantsS: '#1e2230', boot: '#222222' };
/* rua ao entardecer: reaproveita STD trocando o ceu */
const STN = (Pf, t, o = {}) => { const L_ = STD(Pf, t, o); L_[0].svg = SKYE('dusk', 1500) + glow(Pf, 'F', 300, 1000, 900, 0.5) + C(300, 1000, 150, '#ffe2a0', OP(0.95)) + NUV(((t * 10 + 600) % 1500) - 200, 300, 1.4, 0.6) + NUV(((t * 7 + 100) % 1500) - 200, 520, 1.0, 0.5); L_.push({ d: 1.02, svg: R(-400, -400, 1880, 2720, '#ff8a3a', OP(0.1)) }); return L_; };
const SHAD = (x, y, w, o = 0.35) => E(x, y, w, w * 0.14, '#3a1a4a', OP(o));
const WARN = (x, y, sc, a = 1) => G(P('M0,-170 L170,120 L-170,120Z', '#ffd84a', `stroke="#2a2230" stroke-width="12" stroke-linejoin="round"`) + TXE('!', 0, 90, 220, 9, '#2a2230', {}), `translate(${f1(x)} ${f1(y)}) scale(${sc})`, OP(a));
const BULB = (x, y, sc, on = 1) => G(glow('', 'F', 0, 0, 260, 0.6 * on) + C(0, 0, 80, on ? '#ffe566' : '#ddd', `stroke="#2a2230" stroke-width="8"`) + R(-34, 70, 68, 60, '#9a9aa6', `rx="10" stroke="#2a2230" stroke-width="7"`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const TGT = (x, y, w, h, col, t) => { const k = 14 + 4 * Math.sin(t * 8); return G([[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => P(`M${sx * (w / 2)},${sy * (h / 2 - k * 3)} L${sx * (w / 2)},${sy * (h / 2)} L${sx * (w / 2 - k * 3)},${sy * (h / 2)}`, 'none', `stroke="${col}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"`)).join(''), `translate(${f1(x)} ${f1(y)})`); };
const BAGP = (x, y, sc, t) => G(P(`M-70,-120 Q-110,0 -80,100 Q0,160 80,100 Q110,0 70,-120 Q40,${f1(-170 + 14 * Math.sin(t * 20))} 0,-130 Q-40,${f1(-170 - 14 * Math.sin(t * 20))} -70,-120Z`, '#f4f4f8', `stroke="#2a2230" stroke-width="7" stroke-linejoin="round"` + OP(0.95)) + P('M-40,-30 Q0,20 40,-30', 'none', 'stroke="#c8c8d8" stroke-width="6"'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(8 * Math.sin(t * 9))}) scale(${sc})`);
const EYEX = (x, y, sc, lx, ly = 0, col = '#6a3a1e') => G(E(0, 0, 330, 190, '#fff', `stroke="#2a2230" stroke-width="12"`) + C(lx, ly, 120, col, `stroke="#2a2230" stroke-width="8"`) + C(lx, ly, 56, '#050505') + C(lx - 30, ly - 40, 20, '#fff') + P('M-380,-110 Q0,-330 380,-110', 'none', 'stroke="#2a2230" stroke-width="34" stroke-linecap="round"'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const HOUSEW = (Pf, x, y, sc, t, lit = 1) => G(P('M-260,0 L0,-220 L260,0Z', '#c8483a', `stroke="#2a2230" stroke-width="9" stroke-linejoin="round"`) + R(-220, 0, 440, 330, '#ffe4b0', `stroke="#2a2230" stroke-width="9"`) + R(-170, 60, 130, 130, lit ? '#ffd35a' : '#8ab0d0', `stroke="#2a2230" stroke-width="7"`) + (lit ? glow(Pf, 'F', -105, 125, 220, 0.5) : '') + R(40, 110, 120, 220, '#8a5a34', `stroke="#2a2230" stroke-width="7"`) + C(130, 230, 9, '#ffd35a'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const SCALEJ = (x, y, sc, tilt) => G(R(-12, -200, 24, 360, '#4a4a5a') + R(-140, 150, 280, 28, '#4a4a5a', 'rx="10"') + G(L(-240, 0, 240, 0, '#2a2230', 14) + G(C(0, 0, 70, '#9ae8b0', `stroke="#2a2230" stroke-width="7"`) + P('M-28,12 Q0,44 28,12', 'none', 'stroke="#2a2230" stroke-width="7" stroke-linecap="round"') + C(-22, -10, 7, '#2a2230') + C(22, -10, 7, '#2a2230'), 'translate(-240 120)') + G(C(0, 0, 70, '#ff8a8a', `stroke="#2a2230" stroke-width="7"`) + P('M-28,34 Q0,10 28,34', 'none', 'stroke="#2a2230" stroke-width="7" stroke-linecap="round"') + C(-22, -10, 7, '#2a2230') + C(22, -10, 7, '#2a2230'), 'translate(240 120)'), `translate(0 -200) rotate(${f1(tilt)})`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const PUZZ = (x, y, sc, fill, t) => { let s = ''; for (let i = 0; i < 9; i++) { const cx = (i % 3 - 1) * 150, cy = (Math.floor(i / 3) - 1) * 150, miss = [1, 4, 7].includes(i) && fill < (i === 1 ? 0.3 : i === 4 ? 0.6 : 0.9); s += miss ? R(cx - 70, cy - 70, 140, 140, '#fff', `rx="14" stroke="${'#ff4a5a'}" stroke-width="6" stroke-dasharray="14 10"`) + TXE('?', cx, cy + 40, 120, 9, '#ff4a5a', {}) : R(cx - 70, cy - 70, 140, 140, ['#ffd36a', '#9ad0ff', '#ffb4c8', '#a8e8b0', '#c8b8ff'][i % 5], `rx="14" stroke="#2a2230" stroke-width="6"`); } return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const RADAR = (x, y, sc, t, blips = []) => { const a = (t * 2.4) % 6.283; return G(C(0, 0, 300, '#0a3a2a', `stroke="#2a2230" stroke-width="10"`) + [100, 200, 300].map(r => C(0, 0, r, 'none', 'stroke="#4aff9a" stroke-width="4" opacity="0.5"')).join('') + L(-300, 0, 300, 0, '#4aff9a', 3) + L(0, -300, 0, 300, '#4aff9a', 3) + P(`M0,0 L${f1(Math.cos(a) * 300)},${f1(Math.sin(a) * 300)} A300,300 0 0 0 ${f1(Math.cos(a - 0.6) * 300)},${f1(Math.sin(a - 0.6) * 300)}Z`, '#4aff9a', OP(0.45)) + blips.map(b => C(b[0], b[1], 16, '#ff4a5a', `stroke="#fff" stroke-width="4"` + OP(0.6 + 0.4 * Math.sin(t * 8)))).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
/* ===== personagens novos: estilo "massinha", sem contorno, cabecas grandes ===== */
const WHO = {
  d: { skin: '#a9693f', skin2: '#8a512e', hair: '#1c120e', top: '#ffc83a', top2: '#e09a1c', pants: '#3a3f5a', pants2: '#262a40', shoe: '#f4efe6' },
  r: { skin: '#f2c8a4', skin2: '#d9a27e', hair: '#e0503c', top: '#4a78e8', top2: '#3358c0', pants: '#5a4a3a', pants2: '#3e3226', shoe: '#7a3e1e' }
};
const HEADW = (w, t, o = {}, view = 'f') => {
  const K = WHO[w], bl = ((t * 0.6) % 2.9) < 0.1 ? 0.12 : 1, e = Math.max(0.12, (o.eye == null ? 1 : o.eye) * bl), lx = (o.lx || 0) * 14, ly = (o.ly || 0) * 10;
  const wr = o.worry || 0, sm = o.sm || 0, rs = o.raise || 0, jx = (o.trem || 0) * Math.sin(t * 50) * 4;
  let s = '';
  if (w === 'd') {
    const puff = [[-85, -110, 70], [0, -155, 80], [85, -110, 70], [-115, -55, 42], [115, -55, 42]].map(a => C(a[0], a[1], a[2], K.hair)).join('');
    s += puff + C(-122, 15, 26, K.skin2) + C(122, 15, 26, K.skin2) + R(-120, -135, 240, 270, K.skin, 'rx="105"');
    if (view === 'b') return s + C(0, -20, 128, K.hair) + C(-122, 15, 26, K.skin2) + C(122, 15, 26, K.skin2) + R(-40, 90, 80, 50, K.skin2, 'rx="20"');
    s += P('M-118,-60 Q-110,-150 0,-152 Q110,-150 118,-60 Q60,-105 0,-96 Q-60,-105 -118,-60Z', K.hair);
    let f = '';
    for (const i of [-1, 1]) {
      const ex = i * 56;
      f += C(ex, 0, 50, 'rgba(255,255,255,0.55)', 'stroke="#2a2230" stroke-width="9"') + E(ex, 0, 36, 36 * e, '#fff') + C(ex + lx, ly * e, 15, '#1a1014') + C(ex + lx - 5, ly * e - 5, 5, '#fff');
      f += L(ex - 40 * i * 0 - 38, -78 - rs * 22 + (i < 0 ? 0 : 0), ex + 38, -78 - rs * 22 - (i * -1) * 0, '#1c120e', 13);
      f += L(i * 98, -74 - rs * 22 + wr * 6, i * 22, -86 - rs * 22 - wr * 16, '#1c120e', 13).replace(/^<line/, '<line');
    }
    f += L(-8, -2, 8, -2, '#2a2230', 8) + P('M-8,34 Q10,56 -8,60', 'none', 'stroke="#7a4426" stroke-width="7" stroke-linecap="round"') + P(`M-38,92 Q0,${f1(92 + sm * 42 - wr * 26 + 10)} 38,92`, 'none', 'stroke="#3a1a10" stroke-width="9" stroke-linecap="round"');
    if (sm > 0.5) f += P('M-30,98 Q0,128 30,98Z', '#fff', 'opacity="0.0"');
    if (o.sweat) f += P('M118,-70 Q136,-30 118,-14 Q100,-30 118,-70Z', '#8ad0ff', `stroke="#fff" stroke-width="3"`);
    s += view === 's' ? G(f, 'translate(46 0) scale(0.78 1)') + P('M118,0 Q150,30 118,52Z', K.skin) : f;
  } else {
    s += C(-148, 20, 26, K.skin2) + C(148, 20, 26, K.skin2) + E(0, 0, 150, 125, K.skin);
    if (view === 'b') return s + E(0, -10, 148, 120, '#3a2a20') + P('M-152,-20 Q-152,-170 0,-175 Q152,-170 152,-20 Q0,-60 -152,-20Z', K.hair) + R(-154, -45, 308, 50, '#b83420', 'rx="24"') + C(0, -185, 34, '#fff1d8');
    let f = '';
    for (const i of [-1, 1]) {
      const ex = i * 58;
      f += C(ex, 0, 26, '#fff') + E(ex + lx * 0.7, ly * 0.6, 12, 12 * e, '#1a1014') + C(ex + lx * 0.7 - 3, ly * 0.6 - 3, 3.5, '#fff');
      f += L(ex - i * (-34) * 0 - 38, -40 - rs * 20 + wr * (i < 0 ? 8 : 8), ex + 38, -40 - rs * 20 - wr * 14 * 0, '#2a1a10', 18);
      f += E(i * 96, 52, 22, 14, '#ff9a8a', OP(0.45));
    }
    f += C(0, 30, 30, '#dc8e6c') + P('M-96,82 Q-48,40 0,72 Q48,40 96,82 Q52,118 0,96 Q-52,118 -96,82Z', '#3a2418') + P(`M-26,${f1(120)} Q0,${f1(120 + sm * 34 - wr * 22)} 26,120`, 'none', 'stroke="#3a1a10" stroke-width="8" stroke-linecap="round"');
    if (o.sweat) f += P('M138,-60 Q156,-22 138,-6 Q120,-22 138,-60Z', '#8ad0ff', `stroke="#fff" stroke-width="3"`);
    s += view === 's' ? G(f, 'translate(54 0) scale(0.8 1)') + C(150, 34, 20, '#dc8e6c') : f;
    s += P('M-152,-20 Q-152,-170 0,-175 Q152,-170 152,-20 Q0,-62 -152,-20Z', K.hair) + R(-154, -45, 308, 50, '#b83420', 'rx="24"') + C(0, -185, 34, '#fff1d8');
  }
  return G(s, `translate(${f1(jx)} 0)`);
};
const BUSTW = (w, t, o, x, y, sc) => {
  const K = WHO[w], view = o.view || 'f';
  let body = P('M-240,520 Q-240,190 -110,160 L110,160 Q240,190 240,520Z', K.top) + P('M-110,160 Q0,230 110,160 L110,175 Q0,250 -110,175Z', K.top2, OP(0.8)) + R(-34, 90, 68, 90, K.skin2, 'rx="26"');
  if (w === 'd') body = P('M-240,520 Q-240,190 -110,160 L110,160 Q240,190 240,520Z', K.top) + E(0, 168, 125, 52, K.top2) + R(-34, 100, 68, 80, K.skin2, 'rx="26"') + L(-34, 200, -40, 290, '#fff', 7) + L(34, 200, 40, 290, '#fff', 7);
  else body += L(0, 200, 0, 520, K.top2, 8) + P('M-70,160 L0,230 L-90,230Z', K.top2) + P('M70,160 L0,230 L90,230Z', K.top2);
  const rim = o.rim ? P('M122,-90 Q150,0 118,80', 'none', `stroke="${o.rim}" stroke-width="9" stroke-linecap="round" opacity="0.6"`) : '';
  return G(body + HEADW(w, t, o, view) + rim, `translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${sc})`);
};
const FIGW = (w, o, x, y, sc) => {
  const K = WHO[w], view = o.view || 'f', walk = o.walk ? 1 : 0, ph = o.ph || 0, t = o.t || 0, bob = walk ? Math.abs(Math.sin(ph)) * 12 : Math.sin(t * 2) * 3;
  const hipY = -300 + bob, side = view === 's';
  const leg = i => { const p = ph + (i > 0 ? Math.PI : 0), col = i > 0 ? K.pants : K.pants2;
    if (side) { const a = Math.sin(p) * 0.62 * walk, lift = Math.max(0, Math.cos(p)) * 48 * walk, fx = Math.sin(a) * 290 + i * 0, fy = hipY + Math.cos(a) * 290 - lift, kx = fx * 0.5 + 26, ky = (hipY + fy) / 2;
      return P(`M${f1(i * 6)},${f1(hipY)} Q${f1(kx)},${f1(ky)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="64" stroke-linecap="round"`) + E(fx + 34, fy + 6, 62, 28, K.shoe, `stroke="#2a2230" stroke-width="0"`); }
    const lift = Math.max(0, Math.sin(p)) * 56 * walk, fx = i * 52, fy = hipY + 290 - lift;
    return P(`M${i * 46},${f1(hipY)} Q${f1(i * 62)},${f1((hipY + fy) / 2)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="64" stroke-linecap="round"`) + E(fx + i * 6, fy + 8, 50, 28, K.shoe); };
  const arm = i => { const p = ph + (i > 0 ? 0 : Math.PI), s = (walk ? Math.sin(p) * 0.7 : Math.sin(t * 1.5) * 0.08), sx = side ? 0 : i * 112, sy = -440 + bob, hx = side ? sx + Math.sin(s) * 230 : sx + i * 10 + Math.sin(s) * 24, hy = sy + 225 + (side ? -Math.abs(Math.sin(s)) * 30 : 0);
    return L(sx, sy, hx, hy, i > 0 ? K.top : K.top2, 50) + C(hx, hy + 14, 30, K.skin); };
  const tw = side ? 150 : 210, torso = R(-tw / 2, -490 + bob, tw, 240, K.top, 'rx="72"') + (w === 'd' ? R(-tw / 2 + 24, -330 + bob, tw - 48, 70, K.top2, 'rx="26"') : L(0, -480 + bob, 0, -255 + bob, K.top2, 8));
  const head = G(HEADW(w, t, o, view), `translate(0 ${f1(-612 + bob)}) scale(0.78)`), neck = R(-28, -525 + bob, 56, 60, K.skin2, 'rx="20"');
  let s = leg(-1) + (side ? arm(-1) : '') + G(neck + torso, `rotate(${f1((o.lean || 0) * 0.6)} 0 ${f1(hipY)})`) + leg(1) + arm(side ? 1 : -1) + (side ? '' : arm(1)) + G(head, `rotate(${f1(o.lean || 0)} 0 ${f1(hipY)})`);
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const DAV = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTW('d', t, o || {}, x, y, sc);
const RUI = (t, o, x = 540, y = 1000, sc = 2.5) => BUSTW('r', t, o || {}, x, y, sc);
const DAVB = (o, x, y, sc) => FIGW('d', o, x, y, sc);
const RUIB = (o, x, y, sc) => FIGW('r', o, x, y, sc);
