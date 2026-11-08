/* kitQ.js - noir: Mariana (personagem nova), presenca, comodos escuros, efeitos de terror controlados */
const NV0 = '#070b16', NV1 = '#0d1830', NV2 = '#16284a', CYN = '#5ad0ff', AMB = '#ffb45a', REDD = '#ff2f4a', INKQ = '#05070c';
const MRQ = { skin: '#d9a07c', sk2: '#a8704f', hair: '#150f1c', sheen: '#3a3a6a', top: '#7c6cc0', top2: '#5a4a9a', pants: '#3a3f6a', lip: '#a8444e' };
const MARH = (t, o = {}) => {
  const bl = ((t * 0.5) % 3.3) < 0.1 ? 0.08 : 1, e = Math.max(0.06, (o.eye == null ? 1 : o.eye) * bl), lx = (o.lx || 0) * 9, ly = (o.ly || 0) * 7, wr = o.worry || 0, rs = o.raise || 0, sm = o.sm || 0, op = o.open || 0, jx = (o.trem || 0) * Math.sin(t * 55) * 4, key = o.key || CYN, side = o.side == null ? 1 : o.side, tx = (o.turn || 0) * 40;
  let s = P('M-150,330 Q-196,-80 -104,-152 Q0,-214 104,-152 Q196,-80 150,330Z', MRQ.hair) + P('M-120,-130 Q-60,-190 40,-186', 'none', `stroke="${MRQ.sheen}" stroke-width="9" stroke-linecap="round" opacity="0.8"`);
  s += R(-30, 80, 60, 90, MRQ.sk2, 'rx="22"');
  s += P('M-112,-30 Q-116,-130 0,-135 Q116,-130 112,-30 Q112,60 60,112 Q0,142 -60,112 Q-112,60 -112,-30Z', MRQ.skin);
  let f = '';
  for (const i of [-1, 1]) {
    const ex = i * 48, ey = -4;
    f += P(`M${ex - 36},${ey} Q${ex},${f1(ey - 34 * e)} ${ex + 36},${ey} Q${ex},${f1(ey + 26 * e)} ${ex - 36},${ey}Z`, '#f4f1ee', `stroke="#1a1018" stroke-width="3"`);
    f += E(ex + lx, ey + ly * 0.5, 17, 17 * Math.min(1, e + 0.2), '#3a2418') + C(ex + lx, ey + ly * 0.5, 8, '#05030a') + C(ex + lx + 5, ey + ly * 0.5 - 6, 4.5, '#fff');
    f += P(`M${ex - 40},${ey + 2} Q${ex},${f1(ey - 40 * e)} ${ex + 40},${ey + 2}`, 'none', 'stroke="#150f1c" stroke-width="7" stroke-linecap="round"');
    f += P(`M${ex + i * 38},${f1(-48 - rs * 20 + wr * 6)} Q${ex},${f1(-74 - rs * 20)} ${ex - i * 36},${f1(-52 - rs * 20 - wr * 18)}`, 'none', 'stroke="#150f1c" stroke-width="10" stroke-linecap="round"');
  }
  f += P('M0,14 Q8,40 -6,46', 'none', `stroke="${MRQ.sk2}" stroke-width="6" stroke-linecap="round"`);
  if (op > 0.05) f += E(0, 78, 22 + sm * 8, 8 + op * 30, '#3a0a14') + P(`M-24,76 Q0,${f1(64)} 24,76`, 'none', `stroke="${MRQ.lip}" stroke-width="9" stroke-linecap="round"`);
  else f += P(`M${-26 - sm * 6},76 Q0,${f1(76 + sm * 26 - wr * 16 + 4)} ${26 + sm * 6},76`, 'none', `stroke="${MRQ.lip}" stroke-width="11" stroke-linecap="round"`);
  if (o.sweat) f += P('M104,-40 Q124,-4 104,12 Q84,-4 104,-40Z', '#9ae0ff') + P('M-98,0 Q-80,34 -98,46 Q-116,34 -98,0Z', '#9ae0ff', OP(0.8));
  s += G(f, `translate(${f1(tx)} 0)`);
  s += P('M-124,-30 Q-130,-156 0,-158 Q130,-156 124,-30 Q70,-118 -6,-106 Q-70,-82 -124,-30Z', MRQ.hair) + P('M-124,-30 Q-140,60 -100,150 Q-132,40 -112,-40Z', MRQ.hair);
  s += P('M-6,-106 Q-30,-140 -70,-150', 'none', `stroke="${MRQ.sheen}" stroke-width="5" opacity="0.7"`);
  s += P(`M${side * 116},-60 Q${side * 140},20 ${side * 100},96`, 'none', `stroke="${key}" stroke-width="9" stroke-linecap="round" opacity="0.85"`);
  s += P(`M${-side * 112},-20 Q${-side * 116},60 ${-side * 64},112 Q${-side * 30},60 ${-side * 60},-40Z`, '#0a0818', OP(0.14 * (o.shade == null ? 1 : o.shade)));
  return G(s, `translate(${f1(jx)} 0)`);
};
const MARI = (t, o, x, y, sc) => { o = o || {}; const key = o.key || CYN;
  const body = P('M-240,560 Q-250,210 -104,176 L104,176 Q250,210 240,560Z', MRQ.top) + P('M-70,176 L0,250 L70,176Z', MRQ.sk2) + L(0, 250, 0, 560, MRQ.top2, 8) + [330, 410, 490].map(yy => C(0, yy, 8, '#d8d0f0', OP(0.7))).join('') + P(`M${(o.side == null ? 1 : o.side) * 236},300 Q${(o.side == null ? 1 : o.side) * 244},200 ${(o.side == null ? 1 : o.side) * 112},176`, 'none', `stroke="${key}" stroke-width="9" stroke-linecap="round" opacity="0.8"`);
  return G(body + MARH(t, o), `translate(${f1(x + Math.sin(t * 1.1) * 3)} ${f1(y + Math.sin(t * 2.2) * 5)}) rotate(${f1((o.tilt || 0) + Math.sin(t * 1.3) * 1.2)}) scale(${sc})`); };
/* corpo inteiro: view b (costas) / f / s */
const MARF = (o, x, y, sc) => { o = o || {}; const view = o.view || 'f', walk = o.walk ? 1 : 0, ph = o.ph || 0, t = o.t || 0, bob = walk ? Math.abs(Math.sin(ph)) * 10 : Math.sin(t * 2) * 3, side = view === 's', hipY = -330 + bob, key = o.key || CYN;
  const leg = i => { const p = ph + (i > 0 ? Math.PI : 0), col = MRQ.pants;
    if (side) { const a = Math.sin(p) * 0.55 * walk, lift = Math.max(0, Math.cos(p)) * 40 * walk, fx = Math.sin(a) * 320, fy = hipY + Math.cos(a) * 320 - lift; return P(`M${i * 5},${f1(hipY)} Q${f1(fx * 0.5 + 18)},${f1((hipY + fy) / 2)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="54" stroke-linecap="round"`) + E(fx + 28, fy + 6, 50, 22, '#e8e0f0'); }
    const lift = Math.max(0, Math.sin(p)) * 44 * walk, fx = i * 44, fy = hipY + 320 - lift; return P(`M${i * 38},${f1(hipY)} Q${f1(i * 50)},${f1((hipY + fy) / 2)} ${f1(fx)},${f1(fy)}`, 'none', `stroke="${col}" stroke-width="54" stroke-linecap="round"`) + E(fx, fy + 8, 42, 22, '#e8e0f0'); };
  const sy = hipY - 150, arm = i => { const p = ph + (i > 0 ? 0 : Math.PI), sw = walk ? Math.sin(p) * 0.6 : Math.sin(t * 1.4) * 0.07, sx = side ? 0 : i * 88, AL = 240, up = (o.up === true || (o.up === 'r' && i > 0) || (o.up === 'l' && i < 0)), hd = o.hold && i > 0; let hx = side ? sx + Math.sin(sw) * AL : sx + i * 8 + Math.sin(sw) * 22, hy = sy + AL - 20; if (up) { hx = sx + i * 40; hy = sy - 170; } if (hd) { hx = sx + 40; hy = sy + 120; }
    return L(sx, sy, hx, hy, i > 0 ? MRQ.top : MRQ.top2, 40) + C(hx, hy + 12, 25, MRQ.skin) + (hd && o.hold === 'cup' ? G(P('M-26,-60 L26,-60 L20,40 L-20,40Z', 'rgba(170,220,255,0.55)', 'stroke="#cfeaff" stroke-width="4"') + R(-22, -20, 44, 56, 'rgba(110,190,255,0.55)'), `translate(${f1(hx)} ${f1(hy - 20)})`) : '') + (hd && o.hold === 'phone' ? G(R(-20, -44, 40, 78, '#111', 'rx="8"') + R(-15, -38, 30, 64, '#6ac8ff', 'rx="4"'), `translate(${f1(hx + 10)} ${f1(hy - 30)})`) : ''); };
  const tw = side ? 120 : 176, torso = R(-tw / 2, hipY - 190, tw, 250, MRQ.top, 'rx="64"') + R(-tw / 2 + 10, hipY - 20, tw - 20, 44, MRQ.top2, 'rx="20"');
  const head = G((view === 'b' ? P('M-150,330 Q-196,-80 -104,-152 Q0,-214 104,-152 Q196,-80 150,330Z', MRQ.hair) + C(0, -20, 126, MRQ.hair) + P('M-80,-120 Q0,-190 90,-130', 'none', `stroke="${MRQ.sheen}" stroke-width="9" opacity="0.7"`) : MARH(t, o)), `translate(0 ${f1(hipY - 190 - 105)}) scale(0.75)`);
  const rim = P(`M${tw / 2},${f1(hipY - 150)} L${tw / 2 - 4},${f1(hipY + 40)}`, 'none', `stroke="${key}" stroke-width="7" opacity="0.75" stroke-linecap="round"`);
  return G(leg(-1) + (side ? arm(-1) : '') + G(R(-26, hipY - 214, 52, 50, MRQ.sk2, 'rx="18"') + torso + rim, `rotate(${f1((o.lean || 0) * 0.6)} 0 ${f1(hipY)})`) + leg(1) + arm(side ? 1 : -1) + (side ? '' : arm(1)) + G(head, `rotate(${f1(o.lean || 0)} 0 ${f1(hipY)})`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
/* a presenca: silhueta alta, sem rosto, com contorno frio */
const PRES = (x, y, sc, t, o = {}) => { const br = Math.sin(t * 1.6) * 4, a = o.a == null ? 1 : o.a;
  return G(P(`M-70,0 Q-96,-260 -62,-360 Q-50,-430 0,-440 Q50,-430 62,-360 Q96,-260 70,0Z`, INKQ, `stroke="${o.rim || '#2a4a7a'}" stroke-width="5"`) + C(0, -400 + br, 52, INKQ, `stroke="${o.rim || '#2a4a7a'}" stroke-width="5"`) + (o.eyes ? E(-18, -404 + br, 9, 5, '#fff', OP(0.9)) + E(18, -404 + br, 9, 5, '#fff', OP(0.9)) : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`, OP(a)); };
const LIGHTM = (Pf, x, y, r, a = 0.9, col = '#02040a') => `<defs><radialGradient id="${Pf}lm" gradientUnits="userSpaceOnUse" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"><stop offset="0" stop-color="${col}" stop-opacity="0"/><stop offset="0.6" stop-color="${col}" stop-opacity="${f1(a * 0.5)}"/><stop offset="1" stop-color="${col}" stop-opacity="${a}"/></radialGradient></defs>` + R(-100, -100, 1280, 2200, `url(#${Pf}lm)`);
const NOISEQ = (t, a = 0.5, n = 40) => { const fr = Math.floor(t * 30); let s = ''; for (let i = 0; i < n; i++) s += R(hz(i + fr, 3) * 1080, hz(i + fr, 4) * 1920, 40 + hz(i, 5) * 300, 3 + hz(i, 6) * 10, hz(i + fr, 7) > 0.5 ? '#e8f0ff' : '#506080', OP(a * 0.7)); return s; };
const VHSQ = (t, a = 1) => { let s = ''; for (let y = 0; y < 1920; y += 8) s += R(0, y, 1080, 2, '#000', OP(0.12 * a)); const y2 = ((t * 300) % 2200) - 100; return s + R(0, y2, 1080, 90, '#fff', OP(0.04 * a)); };
/* ---- comodos ---- */
const WALLQ = (Pf, c1 = NV1, c2 = NV2) => R(-100, -100, 1280, 2200, c1) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(-100 + i * 170, -100, 6, 2200, c2, OP(0.35))).join('');
const LIVINGQ = (Pf, t, o = {}) => { const k = o.k || 'show', fl = 0.8 + 0.2 * Math.sin(t * 17) * (k === 'static' ? 1 : 0.4); return [
  { d: 0.05, svg: WALLQ(Pf) + (k !== 'off' ? glow(Pf, 'B', 540, 820, 900, 0.5 * fl) : '') + R(-100, 1500, 1280, 600, '#0a0f1e') },
  { d: 0.4, svg: G(TVQ(t, 560, 320, k), 'translate(540 820)') + R(500, 990, 80, 90, '#05070c') + R(300, 1060, 480, 26, '#080c18') },
  { d: 0.85, svg: P('M-100,1700 Q-100,1380 140,1360 L940,1360 Q1180,1380 1180,1700Z', '#141028') + P('M-100,1700 Q-100,1380 140,1360 L200,1360 L200,1700Z', '#1a1634', OP(0.6)) + (k !== 'off' ? P('M140,1362 L940,1362', 'none', `stroke="${CYN}" stroke-width="5" opacity="${f1(0.5 * fl)}"`) : '') }]; };
const HALLQ = (Pf, t, o = {}) => { const vx = o.vx == null ? 540 : o.vx, vy = o.vy == null ? 900 : o.vy, bw = o.bw || 150; let fl = '';
  for (let i = 0; i < 9; i++) { const k = i / 8, y = lp(vy + bw * 0.9, 2100, k * k); fl += P(`M${f1(vx - bw)},${f1(y)} L${f1(vx + bw)},${f1(y)}`, 'none', 'stroke="#1a2440" stroke-width="3" opacity="0.8"'); }
  const dr = (side, kk, col) => { const x0 = vx + side * lp(bw, 1300, kk), x1 = vx + side * lp(bw, 1300, kk + 0.14), h0 = lp(bw * 1.6, 1300, kk), h1 = lp(bw * 1.6, 1300, kk + 0.14); return P(`M${f1(x0)},${f1(vy - h0 * 0.5)} L${f1(x1)},${f1(vy - h1 * 0.5)} L${f1(x1)},${f1(vy + h1 * 0.55)} L${f1(x0)},${f1(vy + h0 * 0.55)}Z`, col); };
  return [{ d: 0.05, svg: R(-100, -100, 1280, 2200, '#03060e') + P(`M-100,-100 L${vx - bw},${vy - bw * 1.6} L${vx - bw},${vy + bw * 0.9} L-100,2100Z`, '#0c1630') + P(`M1180,-100 L${vx + bw},${vy - bw * 1.6} L${vx + bw},${vy + bw * 0.9} L1180,2100Z`, '#0a1226') + P(`M-100,-100 L${vx - bw},${vy - bw * 1.6} L${vx + bw},${vy - bw * 1.6} L1180,-100Z`, '#070c1a') + P(`M-100,2100 L${vx - bw},${vy + bw * 0.9} L${vx + bw},${vy + bw * 0.9} L1180,2100Z`, '#101a34') + fl + dr(-1, 0.3, '#1a2a4c') + dr(1, 0.45, '#16223e') + R(vx - bw, vy - bw * 1.6, bw * 2, bw * 2.5, o.end || '#02040a') + (o.glowL ? P(`M${vx - bw},${vy - bw * 1.2} L-100,300 L-100,1700 L${vx - bw},${vy + bw * 0.6}Z`, AMB, OP(0.16)) : '') }]; };
const BEDQ = (Pf, t, o = {}) => { const lamp = o.lamp; return [
  { d: 0.05, svg: WALLQ(Pf, '#0b1228', '#16224a') + (lamp ? glow(Pf, 'A', 260, 1000, 800, 0.5) : '') + R(-100, 1450, 1280, 700, '#0a0e1c') + R(700, 220, 330, 460, '#9fc8f0', OP(0.14)) + R(700, 220, 330, 460, 'none', 'stroke="#2a3a6a" stroke-width="14"') + C(900, 330, 46, '#e8f0ff', OP(0.7)) },
  { d: 0.4, svg: R(640, 280, 440, 1300, '#150f22') + R(850, 280, 6, 1300, '#05030a') + R(820, 880, 14, 140, '#6a5a8a') + R(870, 880, 14, 140, '#6a5a8a') + R(640, 280, 440, 14, '#241a38') + P('M-100,1480 L560,1480 L560,1620 L-100,1620Z', '#1c1a3a') + R(-100, 1380, 560, 110, '#242048') },
  { d: 0.75, svg: o.noChair ? '' : CHAIRQ(300, 1560, 1.0, o.pile || 'person', t) }]; };
/* cadeira com pilha: 'person' (escura, parece alguem) ou 'clothes' (colorida, iluminada) */
const CHAIRQ = (x, y, sc, mode, t) => { const lit = mode === 'clothes'; let pile = lit ? P('M-90,-30 Q-110,-170 -40,-250 Q0,-290 50,-240 Q110,-170 90,-30Z', '#c8506a') + P('M-60,-120 Q-20,-200 40,-150 Q70,-90 20,-40Z', '#4a7ad0') + P('M-80,-70 Q-60,-150 -20,-110 Q10,-60 -40,-30Z', '#e8c050') + P('M20,-250 Q60,-300 80,-230 Q60,-200 30,-210Z', '#6a4a9a') : P('M-86,-30 Q-96,-200 -40,-300 Q-20,-380 20,-380 Q60,-380 56,-300 Q100,-200 86,-30Z', '#06040e', 'stroke="#2a3a6a" stroke-width="4"') + C(8, -366, 34, '#06040e', 'stroke="#2a3a6a" stroke-width="4"');
  return G(L(-90, 0, -90, 170, '#2a1c14', 14) + L(90, 0, 90, 170, '#2a1c14', 14) + R(-110, -30, 220, 28, '#3a281c', 'rx="6"') + L(-100, -30, -100, -160, '#3a281c', 14) + pile, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const BATHQ = (Pf, t, inner = '') => [
  { d: 0.05, svg: R(-100, -100, 1280, 2200, '#0c1a26') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => L(-100 + i * 140, -100, -100 + i * 140, 2100, '#16303e', 4)).join('') + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => L(-100, i * 180, 1180, i * 180, '#16303e', 4)).join('') + glow(Pf, 'F', 540, 600, 800, 0.25) },
  { d: 0.4, svg: R(190, 260, 700, 920, '#cfe4f0', 'rx="20" stroke="#1a2a3a" stroke-width="20"') + `<svg x="210" y="280" width="660" height="880" viewBox="0 0 660 880">${inner}</svg>` + R(210, 280, 660, 880, 'rgba(160,200,240,0.12)') + P('M210,280 L520,280 L210,760Z', '#fff', OP(0.1)) },
  { d: 0.85, svg: R(-100, 1300, 1280, 700, '#e8f0f6', OP(0.9)) + R(-100, 1300, 1280, 14, '#6a8aa0') + E(540, 1500, 260, 60, '#d0e0ea') + R(520, 1100, 40, 220, '#8aa0b0') }];
const GLASSQ = (x, y, sc, lvl = 0.7, t = 0) => G(P('M-48,-120 L48,-120 L38,60 Q0,76 -38,60Z', 'rgba(190,230,255,0.28)', 'stroke="#d8f0ff" stroke-width="5"') + P(`M-44,${f1(60 - 180 * lvl)} L44,${f1(60 - 180 * lvl)} L38,60 Q0,76 -38,60Z`, 'rgba(110,190,255,0.6)') + E(0, f1(60 - 180 * lvl), 44, 8, 'rgba(210,240,255,0.7)') + L(-30, -100, -26, 30, '#fff', 5, OP(0.5)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const CLOCKQ = (x, y, sc, txt, t) => G(R(-190, -90, 380, 180, '#05070c', `rx="24" stroke="#2a3a5a" stroke-width="8"`) + TXE(txt, 0, 56, 150, 9, REDD, { stroke: '#2a0008' }) + glow('', 'R', 0, 0, 300, 0.22 + 0.1 * Math.sin(t * 6)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const EYEQ = (x, y, sc, t, o = {}) => { const e = o.e == null ? 1 : o.e, lx = (o.lx || 0) * 26, ly = (o.ly || 0) * 16; return G(P(`M-200,0 Q0,${f1(-170 * e)} 200,0 Q0,${f1(130 * e)} -200,0Z`, '#f6f2ee', 'stroke="#1a1018" stroke-width="6"') + C(lx, ly, 74, '#3a2418') + C(lx, ly, 38, '#05030a') + C(lx + 22, ly - 22, 16, '#fff') + P(`M-210,4 Q0,${f1(-180 * e)} 210,4`, 'none', 'stroke="#150f1c" stroke-width="18" stroke-linecap="round"') + (o.red ? P(`M-200,0 Q0,${f1(-170 * e)} 200,0 Q0,${f1(130 * e)} -200,0Z`, 'none', 'stroke="#ff3a4a" stroke-width="3" opacity="0.5"') : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
const SHOUT = (txt, x, y, sz, lt, col = '#fff', o = {}) => { const u = ez(lt / (o.dur || 0.16)); if (u <= 0) return ''; return G(TXE(txt, 0, 0, sz, 9, col, { stroke: o.stroke || INKQ }), `translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0}) scale(${f1(1.35 - 0.35 * u)})`, OP(u)); };
const BGQ = (a = NV1, b = NV2, Pf = '', x = 540, y = 800) => R(-100, -100, 1280, 2200, a) + glow(Pf || 's', 'B', x, y, 900, 0.35) + C(x, y, 520, b, OP(0.35));
const ROTQ = (svg, deg, cx = 540, cy = 960) => deg ? G(svg, `rotate(${f1(deg)} ${cx} ${cy})`) : svg;
const FLASHQ = (lt, d0 = 0, dur = 0.12, col = '#fff') => { const u = 1 - (lt - d0) / dur; return u > 0 && u <= 1 ? R(-100, -100, 1280, 2200, col, OP(u * 0.9)) : ''; };

const TVQ = (t, w, h, k = 'show') => { let c; const fr = Math.floor(t * 30);
  if (k === 'off') c = R(-w / 2, -h / 2, w, h, '#03050a') + P(`M${-w / 2},${-h / 2} L${f1(-w / 2 + w * 0.4)},${-h / 2} L${-w / 2},${f1(-h / 2 + h * 0.55)}Z`, '#fff', OP(0.07)) + (c2 => c2)('');
  else if (k === 'static') { c = R(-w / 2, -h / 2, w, h, '#2a3440'); for (let i = 0; i < 60; i++) c += R(-w / 2 + hz(i + fr, 3) * w * 0.9, -h / 2 + hz(i + fr, 4) * h, 30 + hz(i, 5) * 160, 6 + hz(i, 6) * 14, hz(i + fr, 7) > 0.5 ? '#e8eef2' : '#506070', OP(0.8)); }
  else { c = R(-w / 2, -h / 2, w, h, '#123a66') + E(((t * 60) % (w * 1.5)) - w * 0.25, -h * 0.1, w * 0.5, h * 0.4, '#1f6aa8', OP(0.7)) + R(-w / 2, h * 0.2, w, h * 0.3, '#0c2a4a') + [0, 1, 2].map(i => R(-w / 2 + ((t * 90 + i * 200) % (w + 120)) - 60, -h / 2 + 30 + i * 90, 120, 18, '#9ad8ff', OP(0.35))).join('') + C(w * 0.25, -h * 0.2, h * 0.1, '#cfeaff', OP(0.8)); }
  return R(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, '#05070c', 'rx="14"') + c + R(-w / 2, -h / 2, w, h, '#fff', OP(0.04)); };
