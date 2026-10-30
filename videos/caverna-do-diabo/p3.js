/* p3.js - parte 3: Clara, túnel, nuca, monitores, torre, polícia, casa. Depende de art.js, art3.js, env.js, shared.js. */
const ez = x => { x = cl(x); return x * x * (3 - 2 * x); };
const SNP = (c, start, fin, fn) => c.add(start, fin, (t, lt, Pf) => defsC(Pf) + X(Pf, fn(t, lt, Pf)));
const cam3 = (t, lt, cx, cy, z0, z1, d, rot, shk, inner) => camG(t, cx, cy, z0 + (z1 - z0) * ez(lt / d), rot, shk, inner);
const FB = (c, a) => a > 0.005 ? R(-300, -300, 1680, 2520, c, OP(a)) : '';
const BIG = (col, a = 1) => R(-400, -400, 1880, 2720, col, OP(a));
const wf = (o, x, y, sc) => G(womanFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
function withClara(fn) {
  const sv = { hair: PAL.hair, hairHi: PAL.hairHi, sweater: PAL.sweater, sweaterSh: PAL.sweaterSh, scarf: PAL.scarf, jeans: PAL.jeans };
  PAL.hair = '#8a3a1c'; PAL.hairHi = '#c4682e'; PAL.sweater = '#3f5f52'; PAL.sweaterSh = '#25403a'; PAL.scarf = '#e8c46a'; PAL.jeans = '#3a342e';
  try { return fn(); } finally { Object.assign(PAL, sv); }
}
const bruiseObj = k => k <= 0 ? '' : E(-100, 62, 48, 32, 'rgba(110,50,140,0.6)', OP(k)) + E(-100, 62, 28, 17, 'rgba(60,20,90,0.5)', OP(k)) + E(84, -104, 36, 26, 'rgba(120,50,130,0.5)', OP(k)) + P('M-150,8 L-112,40 L-120,52', 'none', `stroke="#b01c2c" stroke-width="7" stroke-linecap="round" opacity="${k}"`) + P('M-128,30 q-4,30 -2,50', 'none', `stroke="#c8283a" stroke-width="5" stroke-linecap="round" opacity="${0.8 * k}"`);
const cf = (o, x, y, sc) => withClara(() => G(womanFace(o) + bruiseObj(o.bruise === undefined ? 1 : o.bruise), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`));
const claraFig = o => withClara(() => womanFig(o));
const youFig = o => womanFig(o);

/* túnel de terra e madeira em perspectiva; speed>0 avança; light = cor da luz no fundo */
function tunnelBG(Pf, t, o = {}) {
  const d = Object.assign({ speed: 0.4, light: '#ffcf8a', la: 0.9, cx: 540, cy: 880, dark: 0 }, o);
  let s = BIG('#1a120d') + glow(Pf, 'A', d.cx, d.cy, 380 + 80 * Math.sin(t * 3), d.la);
  const n = 10;
  const zs = []; for (let i = 0; i < n; i++) zs.push((((i / n) + t * d.speed) % 1 + 1) % 1);
  zs.sort((a, b) => a - b);
  for (const z of zs) {
    const sc = 0.05 + Math.pow(z, 2.2) * 3.2, w = 1100 * sc, h = 1900 * sc, a = cl(z * 3);
    s += `<rect x="${f1(d.cx - w / 2)}" y="${f1(d.cy - h / 2)}" width="${f1(w)}" height="${f1(h)}" fill="none" stroke="${mixc('#5a3a24', '#1a120d', 1 - z)}" stroke-width="${f1(10 + 60 * z)}" opacity="${a.toFixed(2)}"/>`;
    s += L(d.cx - w / 2, d.cy - h / 2 - 4, d.cx + w / 2, d.cy - h / 2 - 4, '#ffcf8a', 3 + 10 * z, OP(0.25 * a * (1 - d.dark)));
  }
  s += glow(Pf, 'W', d.cx, d.cy, 140, 0.35 * d.la);
  return s + (d.dark ? BIG('#000', d.dark) : '');
}
function napeObj(o) {
  const d = Object.assign({ t: 0, glow: 1, hand: 0 }, o);
  let s = P('M-250,-320 C-270,80 -230,300 -170,420 L170,420 C230,300 270,80 250,-320 C210,-480 -210,-480 -250,-320Z', PAL.hair);
  for (let i = 0; i < 14; i++) s += PL([[-220 + i * 32, -300], [-215 + i * 32 + 8, 40], [-200 + i * 32, 330]], 'rgba(0,0,0,0.35)', 4);
  s += R(-80, 330, 160, 260, PAL.skin) + R(-80, 330, 160, 60, PAL.skinSh, OP(0.5)) + P('M-200,520 Q0,460 200,520 L260,700 L-260,700Z', PAL.sweater);
  s += P('M-60,336 Q0,380 70,346', 'none', 'stroke="#ff5a5a" stroke-width="16" stroke-linecap="round"') + P('M-60,336 Q0,380 70,346', 'none', 'stroke="#ffd0d0" stroke-width="5" stroke-linecap="round"') + glow('', 'R', 0, 350, 0, 0) + C(3, 352, 70 * d.glow, 'rgba(255,90,90,0.25)') + C(3, 352, 24 * d.glow, 'rgba(255,200,200,0.5)');
  if (d.hand) s += G(HAND(0, 0, 1.9, PAL.skin, 8), `translate(${f1(190 + 300 * (1 - d.hand))} ${f1(520 + 60 * (1 - d.hand))}) rotate(-25)`);
  return s;
}
function towerObj(Pf, x, y, sc, t, a = 1) {
  const bl = Math.sin(t * 7) > 0 ? 1 : 0.15;
  let s = P('M-120,0 L-14,-760 L14,-760 L120,0 L90,0 L0,-640 L-90,0Z', '#10161e');
  for (let i = 1; i < 8; i++) { const yy = -i * 95, w = 120 - i * 14; s += L(-w, yy, w * 0.4, yy - 60, '#10161e', 6) + L(w, yy, -w * 0.4, yy - 60, '#10161e', 6); }
  s += glow(Pf, 'R', 0, -770, 90 * (0.6 + bl), 0.9 * bl) + C(0, -770, 12, '#ff3b30', OP(bl));
  for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1); s += C(0, -770, 40 + ph * 520, 'none', `stroke="#ff6a5a" stroke-width="${f1(7 * (1 - ph) + 1)}" ${OP((1 - ph) * 0.7)}`); }
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`, OP(a));
}
function monitorGrid(Pf, t, live, o = {}) {
  const cols = 2, rows = 4; let s = '';
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const i = r * cols + q, x = 90 + q * 480, y = 200 + r * 380, w = 420, h = 320;
    s += R(x - 10, y - 10, w + 20, h + 20, '#0b0f14', 'rx="14"') + R(x, y, w, h, live ? '#10222c' : '#222', 'rx="8"');
    if (live) {
      s += P(`M${x},${y + h} L${x + w * 0.3},${y + h * 0.45} L${x + w * 0.5},${y + h} Z`, '#0a1418') + C(x + w * 0.7, y + h * 0.4, 16 + 6 * Math.sin(t * 2 + i), '#e9bb9c', OP(0.7)) + E(x + w * 0.7, y + h * 0.75, 28, 52, '#6d86a8', OP(0.7));
      s += TXT(x + w - 70, y + h - 22, 'x' + (1.5 + hz(i, 4) * 6).toFixed(1), 44, '#6dff9a') + C(x + 26, y + 26, 9, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 6 + i)));
    } else for (let j = 0; j < 40; j++) s += R(x + hz(j, i + Math.floor(t * 20)) * w, y + hz(j + 50, i + Math.floor(t * 20)) * h, 40 + 40 * hz(j, 3), 6, '#fff', OP(0.5 * hz(j, 9)));
  }
  return s;
}
function policeGlow(Pf, t, a = 1) { const ph = Math.sin(t * 9) > 0; return glow(Pf, 'R', ph ? 160 : 920, 400, 900, 0.55 * a) + glow(Pf, 'B', ph ? 920 : 160, 600, 900, 0.55 * a); }
function copSil(o) { const d = Object.assign({ x: 540, y: 1500, sc: 1, t: 0, col: '#0a0d14' }, o); return G(manSil({ scale: 1, eyes: 0, col: d.col, t: d.t, rim: 1 }) + P('M-60,-640 L60,-640 L50,-690 Q0,-720 -50,-690Z', d.col) + R(-64, -650, 128, 14, '#1a2230'), `translate(${d.x} ${d.y}) scale(${d.sc})`); }
function cuffs(x, y, sc, k) { return G(C(-40, 0, 44, 'none', 'stroke="#c8d2dc" stroke-width="14"') + C(40, 0, 44, 'none', 'stroke="#c8d2dc" stroke-width="14"') + PL([[-4, 0], [4, 0]], '#c8d2dc', 8) + R(-52, -64, 24, 28, '#8a97a4', 'rx="5"') + R(28, -64, 24, 28, '#8a97a4', 'rx="5"'), T(x, y, 0, sc * k)); }
function calGrid(t, k) {
  let s = R(120, 360, 840, 1100, '#f1ead8', 'rx="24"') + R(120, 360, 840, 150, '#c92f2b', 'rx="24"') + TXT(540, 460, 'SEMANAS', 70, '#fff');
  for (let r = 0; r < 5; r++) for (let q = 0; q < 7; q++) { const i = r * 7 + q, gone = cl(k * 40 - i * 0.9); s += R(150 + q * 114, 540 + r * 160, 96, 130, '#fff', 'rx="10"') + (gone < 1 ? TXT(198 + q * 114, 640 + r * 160, String(i + 1), 56, '#2a2a2a', OP(1 - gone)) : TXT(198 + q * 114, 640 + r * 160, '?', 70, '#c92f2b', OP(gone))); }
  return s;
}
function homeBG(Pf, t, o = {}) {
  let s = BIG('#f2dcc0') + R(-400, 1500, 1880, 800, '#b8895c') + R(120, 260, 380, 520, '#9ad6ff', 'rx="12" stroke="#fff" stroke-width="22"') + glow(Pf, 'W', 310, 520, 520, 0.7) + L(310, 260, 310, 780, '#fff', 14) + L(120, 520, 500, 520, '#fff', 14);
  s += G(R(-30, -120, 60, 120, '#d9623a', 'rx="8"') + P('M0,-110 Q-70,-200 -50,-280 Q0,-220 0,-110Z M0,-110 Q70,-190 60,-290 Q10,-210 0,-110Z', '#3fa066'), 'translate(860 1500)');
  s += R(0, 1500, 1080, 30, '#8a5a38');
  return s;
}
function bedObj(x, y) { return R(x - 460, y, 920, 120, '#c8d6e8', 'rx="20"') + R(x - 460, y - 160, 920, 200, '#e8eef8', 'rx="30"') + R(x - 400, y - 190, 260, 100, '#fff', 'rx="30"'); }
