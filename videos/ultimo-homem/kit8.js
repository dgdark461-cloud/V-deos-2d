/* kit8.js - Daniel (último homem): estilo vetorial limpo com degradês suaves, luz de amanhecer pastel → noite. Personagem articulado de corpo inteiro. */
const D8 = '<defs><linearGradient id="dawn8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb0dc"/><stop offset="0.55" stop-color="#f6c9a4"/><stop offset="1" stop-color="#ffe8c8"/></linearGradient><linearGradient id="dusk8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1030"/><stop offset="0.6" stop-color="#2a3a7a"/><stop offset="1" stop-color="#7a5a9a"/></linearGradient><linearGradient id="night8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a1c"/><stop offset="1" stop-color="#162450"/></linearGradient><radialGradient id="vig8" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#05080f" stop-opacity="0"/><stop offset="1" stop-color="#05080f" stop-opacity="0.55"/></radialGradient></defs>';
const SKIN8 = '#dfaa82', SKSH8 = '#b27a58', HAIR8 = '#2a1c16', JACK8 = '#c79a60', JACKSH8 = '#9a7240', SHIRT8 = '#2f4a7a', JEAN8 = '#3a4a6c', JEANSH8 = '#2a3650', BOOT8 = '#3a2a22';
/* ---------------- Daniel: corpo inteiro. 0,0 = pés. altura ~ 520 ---------------- */
function DAN(o = {}) {
  const d = Object.assign({ pj: 0, view: 's', ph: 0, walk: 0, run: 0, t: 0, beard: 0, tired: 0, pack: 0, arms: 'swing', look: 0, sit: 0, shadow: 1, hold: '', mouth: 0, eye: 1, up: 0, lean: 0, wear: 0 }, o);
  const jk = d.pj ? '#8a98b0' : d.wear ? mixc(JACK8, '#8a7a60', 0.5) : JACK8, jks = d.pj ? '#6a7890' : d.wear ? mixc(JACKSH8, '#6a5a44', 0.5) : JACKSH8, jn = d.pj ? '#4a5470' : JEAN8, jns = d.pj ? '#363e58' : JEANSH8;
  const sp = d.walk ? (d.run ? 1.3 : 0.75) : 0, a = Math.sin(d.ph), b = Math.sin(d.ph + Math.PI), bob = d.walk ? Math.abs(Math.cos(d.ph)) * (d.run ? 14 : 8) : Math.sin(d.t * 1.5) * 2;
  const hipY = -250 - bob + d.sit * 110, shY = hipY - 190, hdY = shY - 78;
  let s = d.shadow ? E(0, 4, 120, 16, '#000', OP(0.28)) : '';
  const bl = (t) => (t % 3.9) < 0.11 ? 0.12 : 1;
  const legS = (ph, back) => { const sw = Math.sin(ph) * sp * 0.75, kn = Math.max(0, -Math.cos(ph)) * sp * 0.9 + 0.05, col = back ? jns : jn; return G(R(-24, 0, 48, 128, col, 'rx="20"') + G(R(-21, 0, 42, 128, col, 'rx="18"') + R(-14, 118, 70, 30, BOOT8, 'rx="12"'), `translate(0 120) rotate(${f1((kn - sw * 0.3) * 57)})`), `translate(0 ${f1(hipY)}) rotate(${f1(sw * 57)})`); };
  const armS = (ph, back) => { const sw = d.arms === 'up' ? -2.6 : d.arms === 'hold' ? -1.15 : Math.sin(ph + Math.PI) * sp * 0.7, el = d.arms === 'hold' ? -1.2 : d.arms === 'up' ? -0.3 : 0.3 + Math.max(0, Math.sin(ph + Math.PI)) * sp * 0.5; return G(R(-18, 0, 36, 112, back ? jks : jk, 'rx="16"') + G(R(-16, 0, 32, 108, back ? jks : jk, 'rx="14"') + C(0, 112, 18, SKIN8) + (d.hold && !back ? d.hold : ''), `translate(0 104) rotate(${f1(el * 57)})`), `translate(0 ${f1(shY + 14)}) rotate(${f1(sw * 57)})`); };
  if (d.view === 's') {
    if (d.sit) s += R(-60, hipY + 70, 220, 24, '#7a5a3a', OP(0));
    s += armS(d.ph + Math.PI, 1) + legS(d.ph + Math.PI, 1);
    s += G(P('M-56,0 Q-70,-120 -48,-210 L58,-210 Q72,-110 56,0Z', jk, 'stroke="#0a0a10" stroke-width="2"') + P('M-56,0 L56,0 L50,-30 L-50,-30Z', jks) + R(-52, -230, 104, 30, SHIRT8, OP(0.0)) + (d.pack ? R(-96, -200, 52, 150, '#2a3a44', 'rx="16" stroke="#0a0a10" stroke-width="3"') + R(-90, -180, 40, 40, '#3a4e5a', 'rx="8"') : ''), `translate(0 ${f1(hipY)}) rotate(${f1(d.lean)})`);
    s += legS(d.ph, 0) + armS(d.ph, 0);
    const hx = 12 * d.look;
    s += G(R(-18, 0, 36, 34, SKSH8, 'rx="10"') + E(0, -44, 54, 62, SKIN8, 'stroke="#0a0a10" stroke-width="2"') + P('M-54,-52 Q-56,-112 4,-112 Q56,-106 54,-52 Q40,-84 8,-82 Q-30,-74 -54,-52Z', HAIR8) + P('M52,-30 Q70,-22 52,-14', SKIN8) + C(24, -52, 5.5 * bl(d.t), '#06080e') + P('M12,-66 L40,-62', 'none', 'stroke="#2a1c16" stroke-width="5" stroke-linecap="round"') + E(-30, -42, 10, 20, SKSH8, OP(0.0)) + (d.beard ? P(`M-34,-24 Q-30,${f1(10 + 20 * d.beard)} 18,${f1(14 + 26 * d.beard)} Q50,${f1(4 + 14 * d.beard)} 48,-10 Q40,-24 10,-20 Q-10,-30 -34,-24Z`, '#2a1c16', OP(0.9)) : '') + (d.mouth ? E(40, -14, 8, 5 + 10 * d.mouth, '#4a1a20') : P('M34,-14 L46,-14', 'none', 'stroke="#7a3a38" stroke-width="3" stroke-linecap="round"')) + (d.tired ? P('M10,-44 Q24,-34 40,-44', 'none', `stroke="#6a4a5a" stroke-width="${f1(3 + 3 * d.tired)}" opacity="0.6"`) : ''), `translate(${f1(hx)} ${f1(hdY + 44)})`);
  } else {
    const fb = d.view === 'f', sw1 = a * sp * 22, sw2 = b * sp * 22, lift1 = Math.max(0, a) * sp * 26, lift2 = Math.max(0, b) * sp * 26;
    const leg = (x, sw, lift) => R(x - 26, hipY, 52, 250 + bob - lift, jn, 'rx="20"') + R(x - 28, -34 - lift, 56, 34, BOOT8, 'rx="12"');
    s += leg(-34, sw1, lift1) + leg(34, sw2, lift2);
    const arm = (x, sw, up) => G(R(-19, 0, 38, 200, jk, 'rx="17"') + C(0, 204, 19, SKIN8) + (d.hold && x > 0 && fb ? d.hold : ''), `translate(${x} ${f1(shY + 16)}) rotate(${f1((d.arms === 'up' ? (x > 0 ? -150 : 150) : x > 0 ? -sw : sw) + (x > 0 ? -5 : 5))})`);
    s += arm(-100, sw1 * 0.8) + arm(100, sw2 * 0.8);
    s += P(`M-92,${shY} Q-100,${hipY - 20} -72,${hipY + 24} L72,${hipY + 24} Q100,${hipY - 20} 92,${shY} Q0,${shY - 34} -92,${shY}Z`, jk, 'stroke="#0a0a10" stroke-width="2"') + P(`M-72,${hipY + 24} L72,${hipY + 24} L68,${hipY - 4} L-68,${hipY - 4}Z`, jks);
    if (fb) s += P(`M-34,${shY - 6} L0,${shY + 90} L34,${shY - 6}Z`, SHIRT8) + L(0, shY + 90, 0, hipY + 20, jks, 4);
    else s += (d.pack ? R(-70, shY + 10, 140, 190, '#2a3a44', 'rx="22" stroke="#0a0a10" stroke-width="3"') + R(-50, shY + 50, 100, 60, '#3a4e5a', 'rx="10"') : '');
    const hx = d.look * 14;
    s += G(R(-18, 0, 36, 34, SKSH8, 'rx="10"') + (fb ? E(0, -44, 54, 62, SKIN8, 'stroke="#0a0a10" stroke-width="2"') + P('M-54,-52 Q-56,-112 0,-112 Q56,-112 54,-52 Q40,-86 0,-84 Q-40,-86 -54,-52Z', HAIR8) + [-22, 22].map(x => E(x, -44, 8, 8 * bl(d.t) * Math.max(0.2, d.eye), '#f4f0e8') + C(x + hx * 0.3, -44, 4, '#06080e')).join('') + P('M-34,-62 L-10,-58 M34,-62 L10,-58', 'none', 'stroke="#2a1c16" stroke-width="5" stroke-linecap="round"') + (d.beard ? P(`M-44,-24 Q-44,${f1(16 + 26 * d.beard)} 0,${f1(24 + 30 * d.beard)} Q44,${f1(16 + 26 * d.beard)} 44,-24 Q30,-8 0,-6 Q-30,-8 -44,-24Z`, '#2a1c16', OP(0.9)) : '') + (d.mouth ? E(0, -14, 12, 4 + 12 * d.mouth, '#4a1a20') : P('M-12,-14 L12,-14', 'none', 'stroke="#7a3a38" stroke-width="3" stroke-linecap="round"')) : E(-55, -38, 8, 15, SKIN8) + E(55, -38, 8, 15, SKIN8) + E(0, -48, 55, 64, HAIR8, 'stroke="#0a0a10" stroke-width="2"') + P('M-38,-16 Q0,8 38,-16 L34,-2 Q0,18 -34,-2Z', HAIR8) + P('M-30,-96 q30,-12 60,0', 'none', 'stroke="#4a3426" stroke-width="5" stroke-linecap="round"')), `translate(${f1(hx)} ${f1(hdY + 44)})`);
  }
  return G(s, `rotate(${f1(d.lean * 0.3)})`);
}
const DB = (o, x, y, sc = 1, flip = 0) => G(DAN(o), `translate(${f1(x)} ${f1(y)}) scale(${flip ? -sc : sc} ${sc})`);
/* ---------------- rosto grande de Daniel (close-ups) ---------------- */
function DF(t, o = {}) {
  const d = Object.assign({ pj: 0, eye: 1, lookx: 0, looky: 0, brow: 0, mouth: 0, smile: 0, tilt: 0, sweat: 0, trem: 0, beard: 0, tired: 0, tears: 0, wear: 0, pal: 0, body: 1, look: 0 }, o);
  const bl = (t % 3.8) < 0.11 ? 0.1 : 1, ey = Math.max(0.08, Math.min(1.4, d.eye)) * bl, lx = d.lookx * 9, ly = d.looky * 6, br = Math.sin(t * 1.4) * 2 + (d.trem ? H.noise(t * 36, 4) * 3.5 * d.trem : 0);
  const skin = d.pal ? mixc(SKIN8, '#d8dce0', d.pal) : SKIN8, jk = d.pj ? '#8a98b0' : d.wear ? mixc(JACK8, '#8a7a60', 0.5) : JACK8;
  let s = '';
  if (d.body) s += P('M-140,176 Q-160,260 -210,340 L210,340 Q160,260 140,176 Q70,200 0,200 Q-70,200 -140,176Z', jk) + (d.pj ? '' : P('M-56,190 L0,270 L56,190 L40,176 L0,214 L-40,176Z', SHIRT8)) + P('M140,176 Q160,260 210,340 L120,340 Q130,250 100,200Z', '#000', OP(0.18));
  s += R(-34, 118, 68, 90, SKSH8, 'rx="24"') + E(-98, 14, 12, 26, skin) + E(98, 14, 12, 26, skin);
  s += P('M-98,-40 Q-102,-126 0,-140 Q102,-126 98,-40 L92,58 Q72,122 0,148 Q-72,122 -92,58Z', skin) + P('M30,-136 Q102,-126 98,-40 L92,58 Q72,122 0,148 Q40,100 52,30 Q62,-60 30,-136Z', SKSH8, OP(0.35));
  if (d.beard) s += P(`M-90,20 Q-92,${f1(90 + 40 * d.beard)} 0,${f1(150 + 30 * d.beard)} Q92,${f1(90 + 40 * d.beard)} 90,20 Q70,70 40,70 Q0,56 -40,70 Q-70,70 -90,20Z`, '#2a1c16', OP(0.5 + 0.45 * d.beard)); else s += P('M-84,40 Q-76,118 0,146 Q76,118 84,40 Q60,92 30,88 Q0,78 -30,88 Q-60,92 -84,40Z', '#2a1c16', OP(0.18));
  s += P('M-104,-40 Q-120,-150 -20,-158 Q60,-170 100,-110 Q108,-70 96,-40 Q72,-88 24,-94 Q-30,-70 -60,-96 Q-92,-80 -104,-40Z', HAIR8) + P('M-60,-130 q30,-18 60,-4', 'none', 'stroke="#4a3426" stroke-width="6" stroke-linecap="round"');
  const eye = (cx) => G(P('M-27,0 Q0,' + f1(-22 * ey - 4) + ' 27,-2 Q0,' + f1(14 * ey + 2) + ' -27,0Z', '#f6f2ea', 'stroke="#14100e" stroke-width="3"') + C(lx, ly, 11, '#4a2e1c') + C(lx, ly, 5.5, '#050507') + C(lx + 3, ly - 4, 3, '#fff') + P('M-29,1 Q0,' + f1(-26 * ey - 6) + ' 29,-3', 'none', 'stroke="#14100e" stroke-width="5" stroke-linecap="round"'), `translate(${cx} -8)`);
  s += eye(-44) + eye(44);
  if (d.tired) s += [-44, 44].map(cx => P(`M${cx - 26},14 Q${cx},${28 + 12 * d.tired} ${cx + 26},14`, 'none', `stroke="#6a4a5a" stroke-width="${f1(4 + 4 * d.tired)}" stroke-linecap="round" opacity="${f1(0.35 + 0.3 * d.tired)}"`)).join('');
  const bw = d.brow * 14;
  s += P(`M-84,-46 L-16,${f1(-42 + bw)}`, 'none', 'stroke="#2a1c16" stroke-width="10" stroke-linecap="round"') + P(`M84,-46 L16,${f1(-42 + bw)}`, 'none', 'stroke="#2a1c16" stroke-width="10" stroke-linecap="round"');
  s += P('M-8,-14 Q-14,30 -20,44 Q0,56 20,44', 'none', `stroke="${SKSH8}" stroke-width="5" stroke-linecap="round"`) + P('M4,-14 L10,34', 'none', 'stroke="#fff" stroke-width="4" opacity="0.15"');
  const mo = d.mouth, sm = d.smile, my = 96;
  s += mo > 0.05 ? P(`M-30,${my} Q0,${my - 8} 30,${my} Q24,${my + 10 + 34 * mo} 0,${my + 12 + 36 * mo} Q-24,${my + 10 + 34 * mo} -30,${my}Z`, '#4a1a20') + (mo > 0.3 ? R(-20, my + 2, 40, 9, '#f4f0e8') : '') : P(`M-28,${my - 2 * sm} Q0,${my + 8 + 16 * sm} 28,${my - 2 * sm}`, 'none', 'stroke="#6a2e2e" stroke-width="6" stroke-linecap="round"');
  if (d.sweat > 0) s += P('M90,-70 Q102,-44 90,-34 Q78,-44 90,-70Z', '#c8e4ff', OP(0.9 * d.sweat));
  if (d.tears > 0) s += [-44, 44].map((cx, k) => P(`M${cx + (k ? 18 : -18)},12 Q${cx + (k ? 24 : -24)},${48 + 40 * ((t * 0.5 + k * 0.4) % 1)} ${cx + (k ? 14 : -14)},${68 + 50 * ((t * 0.5 + k * 0.4) % 1)}`, 'none', `stroke="#cfe8ff" stroke-width="6" stroke-linecap="round" opacity="${0.85 * d.tears}"`)).join('');
  return G(s, `translate(0 ${f1(br)}) rotate(${d.tilt})`);
}
const DFX = (t, o, x = 540, y = 1000, sc = 2.6) => G(DF(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* ---------------- cenários ---------------- */
const SKYD = (t, k = 0, hy = 900) => R(-400, -400, 1880, hy + 400, k === 0 ? 'url(#dawn8)' : k === 1 ? 'url(#dusk8)' : 'url(#night8)') + (k === 0 ? C(780, hy - 120, 110, '#fff2cc', OP(0.9)) + C(780, hy - 120, 220, '#ffd9a0', OP(0.3)) : '') + (k === 2 ? Array.from({ length: 60 }, (_, i) => C(hz(i, 1) * 1080, hz(i, 2) * (hy - 80), 1.2 + hz(i, 3) * 1.8, '#fff', OP(0.4 + 0.5 * Math.abs(Math.sin(t * 1.2 + i))))).join('') + C(220, 220, 60, '#f4f0d8') + C(220, 220, 130, '#c8d0ff', OP(0.18)) : '');
const CITY8 = (t, hy, k = 0, o = {}) => { const far = k === 0 ? '#9bb0cc' : k === 1 ? '#2a3466' : '#0e1838', mid = k === 0 ? '#6a7fa0' : k === 1 ? '#1a2250' : '#0a1230', win = k === 0 ? '#ffe9b0' : '#ffd88a'; let s = '';
  for (let i = 0; i < 14; i++) { const w = 90 + hz(i, 1) * 80, h = 200 + hz(i, 2) * 320, x = -40 + i * 90; s += R(x, hy - h, w, h, far); }
  for (let i = 0; i < 10; i++) { const w = 120 + hz(i, 4) * 90, h = 160 + hz(i, 5) * 360, x = -60 + i * 130; s += R(x, hy - h, w, h, mid); if (k > 0 || o.lights) for (let r = 0; r < 8; r++) for (let c2 = 0; c2 < 3; c2++) if (hz(i * 31 + r * 7 + c2, 9) > (o.dark ? 1.1 : 0.62)) s += R(x + 16 + c2 * 34, hy - h + 20 + r * 38, 16, 22, win, OP(0.85)); }
  return s; };
const STREET8 = (Pf, t, o = {}) => { const k = o.k || 0, hy = o.hy || 880; let s = SKYD(t, k, hy) + CITY8(t, hy, k, o) + R(-400, hy, 1880, 1300, k === 0 ? '#4a5266' : '#161c30') + R(-400, hy, 1880, 18, k === 0 ? '#8a94a8' : '#2a3250');
  /* faixa central em perspectiva */
  for (let i = 0; i < 9; i++) { const v = (i / 9 + (o.scroll || 0)) % 1, y = lp(hy + 20, 1950, v * v), w = lp(6, 70, v * v), h = lp(4, 90, v * v); s += R(540 - w / 2, y, w, h, k === 0 ? '#e8e0c0' : '#8a90b0', OP(0.9)); }
  s += P('M0,1950 L430,' + hy + ' L450,' + hy + ' L40,1950Z', '#000', OP(0.12)) + P('M1080,1950 L650,' + hy + ' L630,' + hy + ' L1040,1950Z', '#000', OP(0.12));
  return s + (o.over || ''); };
/* carro parado (vista traseira em perspectiva simples) */
const CAR8 = (Pf, t, x, y, sc, col = '#c84a3a', o = {}) => G(P('M-170,0 L-164,-70 Q-140,-118 -76,-128 L76,-128 Q140,-118 164,-70 L170,0Z', col) + P('M-120,-80 Q-104,-112 -62,-118 L62,-118 Q104,-112 120,-80Z', '#1a2236') + P('M-120,-80 Q-104,-112 -62,-118 L-30,-118 L-70,-80Z', '#fff', OP(0.18)) + R(-180, -22, 360, 34, '#0a0e18', 'rx="10"') + [-110, 110].map(cx => C(cx, 18, 34, '#0a0e18') + C(cx, 18, 14, '#7a8296')).join('') + [-1, 1].map(sg => R(sg * 132 - 20, -64, 40, 22, '#ff4a4a', 'rx="6"')).join('') + R(-34, -40, 68, 20, '#f0f0f0', 'rx="3"'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* semáforo */
const LIGHT8 = (Pf, t, x, y, sc, st = 0) => G(R(-8, -400, 16, 400, '#2a3040') + R(-44, -520, 88, 170, '#10141e', 'rx="14" stroke="#2a3040" stroke-width="4"') + [0, 1, 2].map(i => C(0, -480 + i * 50, 18, st === i ? ['#ff3b30', '#ffcc30', '#30e060'][i] : '#2a2e38') + (st === i ? glow(Pf, ['R', 'A', 'B'][i], 0, -480 + i * 50, 100, 0.8) : '')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* corredor de hospital em perspectiva */
const HALL8 = (Pf, t, o = {}) => { const fl = o.flick ? (Math.sin(t * 29) > 0.2 ? 1 : 0.5) : 1; let s = BIG('#06100f') + P('M-400,-400 L1480,-400 L680,560 L400,560Z', '#d8eee8') + P('M-400,-400 L400,560 L400,1330 L-400,2320Z', '#b8d8d0') + P('M1480,-400 L680,560 L680,1330 L1480,2320Z', '#a8cdc4') + P('M-400,2320 L400,1330 L680,1330 L1480,2320Z', '#7aa098') + R(400, 560, 280, 770, '#e8f8f4');
  [0, 1, 2, 3, 4].forEach(i => { const u = i / 5, y = lp(560, -60, 1 - Math.pow(0.55, i + 1)) ; s += R(lp(470, 120, 1 - Math.pow(0.5, i + 0.5)) - 30, y - 6, lp(140, 520, 1 - Math.pow(0.5, i + 0.5)), 18, '#fff', OP(0.95 * fl)); });
  [0, 1, 2].forEach(i => { const x = lp(380, 20, i / 2.4), w = lp(18, 120, i / 2.4); s += P(`M${x},${560 - 60 * (1 + i)} L${x + w},${580 - 40 * i} L${x + w},${1180 + 40 * i} L${x},${1180 - 8 * i}Z`, '#7aa0b8', OP(0.55)) ; });
  s += R(400, 560, 280, 770, '#fff', OP(0.2 * fl)) + glow(Pf, 'W', 540, 900, 520, 0.2 * fl);
  return s + (o.over || ''); };
const ROOM8 = (Pf, t, o = {}) => { const k = o.k === undefined ? 0 : o.k; return R(-400, -400, 1880, 2720, o.wall || '#e6d6c0') + R(-400, 1380, 1880, 700, o.floor || '#a8825a') + R(-400, 1370, 1880, 14, '#6a4a30') + (o.win === 0 ? '' : G(R(-190, -250, 380, 500, '#8ab4dc', 'stroke="#f4f0e8" stroke-width="18"') + R(-190, -250, 380, 500, 'url(#dawn8)') + L(0, -250, 0, 250, '#f4f0e8', 12) + L(-190, 0, 190, 0, '#f4f0e8', 12), 'translate(800 640)')) + glow(Pf, 'W', 800, 640, 700, 0.25 * (o.light === undefined ? 1 : o.light)); };
/* ---------------- legendas: Bebas Neue, tamanho médio, borda preta, palavra por palavra ---------------- */
const CAPS = (t, words) => { let i = -1; for (let k = 0; k < words.length; k++) { if (words[k].start <= t) i = k; else break; } if (i < 0) return ''; const w = words[i], nxt = words[i + 1], endt = Math.min(nxt ? nxt.start : w.end + 0.4, w.start + 1.2); if (t > endt + 0.05) return '';
  const txt = String(w.w).replace(/["“”]/g, '').toUpperCase().replace(/&/g, '&amp;'), lt = t - w.start, u = Math.min(1, lt / 0.08), sc = 0.84 + 0.16 * u + (lt < 0.15 ? 0.08 * Math.sin(lt / 0.15 * Math.PI) : 0), sz = txt.length > 12 ? 92 : 108, Y = 1640;
  return `<text x="540" y="${Y}" text-anchor="middle" font-family="'Bebas Neue', Impact, sans-serif" font-size="${sz}" font-weight="700" letter-spacing="2" fill="#ffffff" stroke="#000" stroke-width="${f1(sz * 0.15)}" stroke-linejoin="round" paint-order="stroke" transform="translate(540 ${Y}) scale(${sc.toFixed(3)}) translate(-540 -${Y})" opacity="${u.toFixed(2)}">${txt}</text>`; };
const GRADE8 = (t, o = {}) => D8 + R(-400, -400, 1880, 2720, 'url(#vig8)') + (o.tint ? R(-400, -400, 1880, 2720, o.tint, OP(o.tintA || 0.1)) : '') + (o.dust === 0 ? '' : Array.from({ length: o.dust || 14 }, (_, i) => C(((hz(i, 3) * 1200 + t * (10 + 14 * hz(i, 4))) % 1200) - 60, ((hz(i, 5) * 2000 - t * (6 + 8 * hz(i, 6))) % 2000 + 2000) % 2000 - 40, 1.5 + hz(i, 7) * 2, '#fff', OP(0.25))).join(''));
