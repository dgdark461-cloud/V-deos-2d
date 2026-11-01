/* art3.js - parte 2: homem de jaqueta com lanterna, cabana, rádio antigo, fotos, armário, riacho. */
const TXT = (x, y, str, size, fill, ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" font-family="Poppins, DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="${f1(size)}" fill="${fill}" ${ex}>${str}</text>`;
const HAND = (x, y, sc, col = '#e9bb9c', rot = 0) => G(E(0, 0, 40, 52, col) + E(-30, -18, 11, 34, col, 'transform="rotate(14 -30 -18)"') + E(-10, -52, 11, 38, col) + E(12, -54, 11, 40, col) + E(32, -42, 10, 34, col, 'transform="rotate(-10 32 -42)"') + E(44, 14, 10, 30, col, 'transform="rotate(-50 44 14)"'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);

/** feixe de lanterna: cone a partir de (x,y) apontando para 'ang' (graus, 0 = direita) */
function beam(Pf, x, y, ang, len, spread, a = 1) {
  const r = ang * Math.PI / 180, s1 = r - spread * Math.PI / 180, s2 = r + spread * Math.PI / 180;
  return `<defs><linearGradient id="${Pf}bm${f1(x)}" gradientUnits="userSpaceOnUse" x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x + Math.cos(r) * len)}" y2="${f1(y + Math.sin(r) * len)}"><stop offset="0" stop-color="#fff2b8" stop-opacity="0.85"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient></defs>` +
    POLY([[x, y], [x + Math.cos(s1) * len, y + Math.sin(s1) * len], [x + Math.cos(s2) * len, y + Math.sin(s2) * len]], `url(#${Pf}bm${f1(x)})`, OP(a));
}
function lanternObj(Pf, o) {
  const d = Object.assign({ on: 1, t: 0, x: 0, y: 0, scale: 1, sw: 0 }, o);
  let s = glow(Pf, 'A', 0, 20, 160, 0.8 * d.on) + R(-20, -30, 40, 8, '#2a2f36') + R(-26, -22, 52, 80, 'rgba(255,230,150,0.9)', 'rx="10"') + R(-26, 56, 52, 12, '#2a2f36', 'rx="4"') + L(-26, -22, -26, 58, '#2a2f36', 5) + L(26, -22, 26, 58, '#2a2f36', 5) + C(0, 20, 14, '#fff', OP(0.8 * d.on)) + PL([[-14, -30], [0, -56], [14, -30]], '#2a2f36', 6);
  return G(s, `translate(${f1(d.x)} ${f1(d.y)}) rotate(${d.sw}) scale(${d.scale})`);
}

/** O homem da jaqueta: silhueta escura com gola alta, olhos pálidos, lanterna opcional. origem = pés. */
function manJacket(Pf, o) {
  const d = Object.assign({ scale: 1, eyes: 1, t: 0, lantern: 1, point: 0, rim: 0.5, walk: 0, lean: 0, flip: 1, headLook: 0, col: '#05070a', beamA: 0.0, beamAng: 190 }, o);
  const sw = Math.sin(d.walk * 6.283), col = d.col;
  let s = '';
  // pernas
  s += PL([[-26, -250], [-26 + 18 * sw, -120], [-26 + 30 * sw, 0]], col, 46) + PL([[26, -250], [26 - 18 * sw, -120], [26 - 30 * sw, 0]], col, 46) + E(-26 + 30 * sw + 10, 4, 36, 14, col) + E(26 - 30 * sw + 10, 4, 36, 14, col);
  // jaqueta
  s += P(`M-92,-470 Q-96,-540 -48,-556 L48,-556 Q96,-540 92,-470 L104,-250 L56,-236 L0,-244 L-56,-236 L-104,-250Z`, col) + P('M-48,-556 L-20,-520 L-34,-470 L-60,-520Z', '#10151b') + P('M48,-556 L20,-520 L34,-470 L60,-520Z', '#10151b') + L(0, -520, 0, -250, '#10151b', 5);
  // braços
  const aL = d.point ? [100, -460, 250, -470] : [-98, -462, -112, -300];
  s += PL([[-86, -490], [-108, -380], [-100, -250]], col, 40);
  if (d.point) s += PL([[86, -490], [190, -470], [320, -470]], col, 36) + C(330, -470, 20, col);
  else s += PL([[86, -490], [112, -380], [118, -260]], col, 40);
  // cabeça (capuz curto / cabelo)
  s += R(-14, -604, 28, 30, col) + E(d.headLook * 8, -650, 40, 52, col) + P(`M${d.headLook * 8 - 44},-650 Q${d.headLook * 8},-720 ${d.headLook * 8 + 44},-650 Q${d.headLook * 8},-690 ${d.headLook * 8 - 44},-650Z`, col);
  if (d.rim) s += L(-92, -468, -104, -250, '#5f86b0', 4, OP(d.rim)) + L(d.headLook * 8 - 38, -650, d.headLook * 8 - 32, -604, '#5f86b0', 3, OP(d.rim));
  if (d.eyes) s += E(-16 + d.headLook * 8, -652, 10, 3.5, '#eaf6ff', OP(d.eyes)) + E(16 + d.headLook * 8, -652, 10, 3.5, '#eaf6ff', OP(d.eyes)) + C(-16 + d.headLook * 8, -652, 22, 'url(#__GLOWW__)', OP(0.4 * d.eyes)) + C(16 + d.headLook * 8, -652, 22, 'url(#__GLOWW__)', OP(0.4 * d.eyes));
  if (d.lantern && !d.point) s += lanternObj(Pf, { x: -118, y: -240, on: 1, t: d.t, sw: 6 * Math.sin(d.t * 3), scale: 1 });
  return G(s, `scale(${d.flip * d.scale} ${d.scale})`);
}

/** parede e piso de cabana. light = luz do ambiente 0..1 */
function cabinWall(Pf, t, o) {
  const d = Object.assign({ light: 0.2, moon: 1, win: 1, px: 0 }, o);
  let s = R(-200, -200, 1500, 2400, mixc('#2a1d14', '#05080b', 1 - d.light));
  for (let i = 0; i < 16; i++) s += R(-200, i * 120 - 60, 1500, 8, 'rgba(0,0,0,0.5)') + R(-200, i * 120 - 52, 1500, 3, 'rgba(255,200,140,0.04)');
  s += R(-200, 1500, 1500, 600, mixc('#3a2a1c', '#04070a', 1 - d.light));
  for (let i = 0; i < 10; i++) s += L(-200 + i * 220, 1500, -400 + i * 320, 2100, 'rgba(0,0,0,0.5)', 5);
  if (d.win) s += R(780, 360, 220, 300, '#0c1a2a', 'stroke="#1b120c" stroke-width="16"') + R(780, 360, 220, 300, `rgba(120,170,230,${(0.25 * d.moon).toFixed(2)})`) + L(890, 360, 890, 660, '#1b120c', 10) + L(780, 510, 1000, 510, '#1b120c', 10);
  return s;
}
/** rádio antigo de madeira, mostrador âmbar */
function radioVintage(Pf, o) {
  const d = Object.assign({ on: 1, t: 0, x: 0, y: 0, scale: 1, glow: 1 }, o);
  let s = R(-200, -140, 400, 280, '#5a3a22', 'rx="26" stroke="#2a180c" stroke-width="10"') + R(-170, -110, 220, 160, '#2a1a10', 'rx="14"');
  for (let i = 0; i < 6; i++) s += L(-160, -96 + i * 24, -30, -96 + i * 24, '#4a2f1d', 8);
  s += R(-170, 66, 220, 50, d.on ? mixc('#2a2008', '#ffb347', d.glow * (0.6 + 0.4 * Math.sin(d.t * 5))) : '#1a1008', 'rx="8"');
  for (let i = 0; i < 9; i++) s += L(-156 + i * 24, 76, -156 + i * 24, 98, '#1a0e06', 3);
  s += L(-110 + 60 * Math.sin(d.t * 0.8), 70, -110 + 60 * Math.sin(d.t * 0.8), 112, '#ff4a3a', 4);
  s += C(110, -50, 40, '#d2b78a', 'stroke="#2a180c" stroke-width="6"') + C(110, 50, 40, '#d2b78a', 'stroke="#2a180c" stroke-width="6"') + L(110, -50, 110 + 24 * Math.sin(d.t * 0.3), -86, '#2a180c', 6) + L(110, 50, 134, 30, '#2a180c', 6);
  s += L(160, -140, 260, -330, '#bbb', 5) + C(260, -332, 6, '#bbb');
  const o2 = d.on ? glow(Pf, 'A', -60, 90, 260 * d.glow, 0.5 * d.glow) : '';
  return G(o2 + s, `translate(${f1(d.x)} ${f1(d.y)}) scale(${d.scale})`);
}
/** foto instantânea presa com fita. who = cor da pessoa, bag = saco na cabeça */
function polaroid(Pf, o) {
  const d = Object.assign({ x: 0, y: 0, w: 220, h: 260, rot: 0, who: 0, bag: 0, date: '', a: 1, trees: 1, sleep: 0 }, o);
  const cols = ['#d9a23a', '#6aa8c9', '#c97a9a', '#8bbf7a', '#b59bd6', '#e0845a'];
  let s = R(-d.w / 2 - 12, -d.h / 2 - 12, d.w + 24, d.h + 56, '#ece6d6', 'rx="4" stroke="rgba(0,0,0,0.25)" stroke-width="2"') + R(-d.w / 2, -d.h / 2, d.w, d.h, '#1a2a26');
  if (d.trees) for (let i = 0; i < 5; i++) s += POLY([[-d.w / 2 + 20 + i * d.w / 5, d.h / 2], [-d.w / 2 + 40 + i * d.w / 5, -d.h * 0.2 - hz(i, 3) * 30], [-d.w / 2 + 60 + i * d.w / 5, d.h / 2]], '#0b1412');
  if (d.sleep) s += E(0, d.h * 0.28, d.w * 0.34, d.h * 0.12, '#3a3f4a') + E(-d.w * 0.2, d.h * 0.22, 28, 26, '#e9bb9c') + R(-d.w * 0.28, d.h * 0.1, 50, 24, '#0a0a0d', d.bag ? '' : 'opacity="0"');
  else s += E(0, d.h * 0.3, d.w * 0.2, d.h * 0.28, cols[d.who % 6]) + C(0, d.h * 0.02, d.w * 0.12, d.bag ? '#0a0a0d' : '#e9bb9c');
  s += R(-d.w / 2, -d.h / 2, d.w, d.h, 'rgba(255,255,255,0.05)');
  if (d.date) s += TXT(0, d.h / 2 + 34, d.date, 26, '#2a2a2a', 'font-weight="600"');
  s += R(-50, -d.h / 2 - 26, 100, 30, 'rgba(230,220,170,0.75)', 'rx="2" transform="rotate(-4)"');
  return G(s, `translate(${f1(d.x)} ${f1(d.y)}) rotate(${d.rot})`, OP(d.a));
}
/** armário de madeira visto de frente, com fresta */
function wardrobe(o) {
  const d = Object.assign({ x: 0, y: 0, scale: 1, crack: 0.06 }, o);
  let s = R(-260, -900, 520, 900, '#3b2819', 'stroke="#1b120a" stroke-width="12"') + R(-240, -880, 230, 860, '#46301e', 'rx="6"') + R(10, -880, 230, 860, '#46301e', 'rx="6"');
  s += R(-14 + 0, -880, 28 * d.crack * 6, 860, '#000') + C(-30, -440, 12, '#c9a45a') + C(30, -440, 12, '#c9a45a');
  return G(s, `translate(${f1(d.x)} ${f1(d.y)}) scale(${d.scale})`);
}
/** riacho horizontal com reflexo da lua */
function streamBand(Pf, t, y0, h, o) {
  const d = Object.assign({ moonx: 740, k: 2, speed: 1 }, o);
  let s = R(-200, y0, 1500, h, mixc('#0c2236', '#02050a', 0.2)) + R(-200, y0, 1500, 8, 'rgba(180,210,240,0.25)');
  for (let i = 0; i < 22; i++) { const y = y0 + 20 + hz(i, 2) * (h - 40), x = ((hz(i, 3) * 1500 - t * 40 * d.speed * (0.5 + hz(i, 4))) % 1500 + 1500) % 1500 - 200; s += L(x, y, x + 80 + 120 * hz(i, 5), y, 'rgba(200,225,255,0.18)', 3); }
  s += E(d.moonx, y0 + h * 0.5, 40, h * 0.45, 'rgba(235,245,255,0.18)') + E(d.moonx + 20 * Math.sin(t * 1.3), y0 + h * 0.5, 14, h * 0.4, 'rgba(255,255,255,0.22)');
  return s;
}
/** comunicador de mão (walkie-talkie) */
function walkie(o) {
  const d = Object.assign({ x: 0, y: 0, scale: 1, rot: 0, led: 1, t: 0 }, o);
  let s = R(-40, -110, 80, 220, '#1c2228', 'rx="14" stroke="#3a444c" stroke-width="5"') + L(20, -110, 30, -190, '#2a3238', 9) + R(-24, -80, 48, 50, '#0a1a10', 'rx="6"') + C(0, -10, 8, d.led ? '#6dff9a' : '#244') + R(-26, 20, 52, 60, '#2a323a', 'rx="6"');
  for (let i = 0; i < 4; i++) s += L(-18, 30 + i * 12, 18, 30 + i * 12, '#10161a', 4);
  return G(s, `translate(${f1(d.x)} ${f1(d.y)}) rotate(${d.rot}) scale(${d.scale})`);
}
/** celular recebendo mensagem (texto faz parte do desenho) */
function phoneMsg(Pf, o) {
  const d = Object.assign({ t: 0, x: 0, y: 0, scale: 1, msg: 0, shake: 0, batt: 0.12 }, o);
  const sx = d.shake ? H.noise(d.t * 50, 1) * d.shake : 0, sy = d.shake ? H.noise(d.t * 50, 2) * d.shake : 0;
  let s = glow(Pf, 'B', 0, 0, 400, 0.5) + R(-130, -250, 260, 500, '#0d1117', 'rx="34" stroke="#2c3440" stroke-width="8"') + R(-114, -234, 228, 468, '#0b1620', 'rx="24"') + R(-40, -226, 80, 12, '#000', 'rx="6"');
  s += L(-98, -196, -64, -166, PAL.red, 8) + L(-64, -196, -98, -166, PAL.red, 8) + R(40, -190, 66, 30, 'none', 'rx="8" stroke="#cfd8e0" stroke-width="5"') + R(46, -184, 54 * d.batt, 18, PAL.red, 'rx="4"');
  if (d.msg > 0) { const a = H.ease.outBack(cl(d.msg)); s += G(R(-100, -40, 200, 110, '#ff3b30', 'rx="20"') + TXT(0, 4, 'NÃO CONFIE', 30, '#fff') + TXT(0, 44, 'NELE.', 38, '#fff'), `translate(0 ${f1(10)}) scale(${a.toFixed(3)})`); }
  return G(s, `translate(${f1(d.x + sx)} ${f1(d.y + sy)}) scale(${d.scale})`);
}
function placeholderGlow(str, Pf) { return str.replace(/__GLOWPF__/g, Pf); }
