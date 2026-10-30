/* maleta.js - cenário e objetos: rua ao entardecer, carro, maleta, dinheiro, documento, envelope, foto, apartamento, corredor. */
const MG = { money: '#5aa05a', moneyDk: '#357a3c', band: '#e8d6a0', gold: '#f2c14a', case: '#26292e', caseLt: '#3c4148', metal: '#b8bcc4', red: '#d04040', paper: '#f2ead6' };
const BGR = (c) => R(-600, -600, 2280, 3120, c);
const SKYM = { dusk: ['#3a4a8a', '#e8886a', '#ffd08a'], day: ['#5aa0e0', '#9acaf0', '#e8f2f8'], night: ['#0a1030', '#1c2a5a', '#34508a'], morning: ['#6aa0d8', '#f0c8a0', '#fff0d0'] };
function skyM(Pf, mode, hor, o = {}) { const c = SKYM[mode]; return `<defs><linearGradient id="${Pf}sm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="0.65" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient></defs>` + R(-600, -900, 2280, hor + 1100, `url(#${Pf}sm)`); }
function cityLayer(Pf, t, seed, base, hmin, hmax, col, win, wcol = '#ffd98a') {
  let s = ''; let x = -500; let i = 0;
  while (x < 1600) { const w = 110 + 120 * hz(i, seed), h = hmin + (hmax - hmin) * hz(i, seed + 1); s += R(x, base - h, w, h + 400, col); if (win) for (let yy = base - h + 24; yy < base - 10; yy += 34) for (let xx = x + 14; xx < x + w - 20; xx += 30) if (hz(xx + yy, seed + 2) < win) s += R(xx, yy, 14, 18, wcol, OP(0.6 + 0.4 * hz(xx, yy))); x += w + 4 * hz(i, 3); i++; }
  return s;
}
function lampPost(Pf, x, y, sc, on = 1) { return G(R(-6, -520, 12, 520, '#2a2f38') + P('M-6,-520 Q-6,-570 40,-566 L40,-552 Q4,-556 6,-520Z', '#2a2f38') + R(24, -556, 44, 14, '#3a4048', 'rx="6"') + (on ? glow(Pf, 'A', 46, -540, 260, 0.9) + POLY([[26, -546], [66, -546], [200, 0], [-110, 0]], 'rgba(255,220,130,0.14)') : ''), T(x, y, 0, sc)); }
function streetM(Pf, t, o = {}) {
  const d = Object.assign({ hor: 900, mode: 'dusk', win: 0.4, lamps: 1 }, o);
  let s = skyM(Pf, d.mode, d.hor) + C(800, d.hor - 170, 90, '#fff0c0', OP(d.mode === 'dusk' ? 0.8 : 0)) + glow(Pf, 'A', 800, d.hor - 170, 400, d.mode === 'dusk' ? 0.7 : 0);
  s += cityLayer(Pf, t, 11, d.hor + 10, 160, 340, mixc('#5a6a9a', '#c88aa0', 0.3), 0.15, '#fff0c0') + cityLayer(Pf, t, 21, d.hor + 40, 220, 520, mixc('#2a3350', '#4a4a6a', 0.3), d.win);
  s += R(-600, d.hor + 30, 2280, 1500, '#3a3e48') + R(-600, d.hor + 30, 2280, 80, '#7a7e88') + R(-600, d.hor + 106, 2280, 14, '#2a2d34');
  s += R(-600, d.hor + 520, 2280, 1500, '#2e323b');
  for (let i = 0; i < 8; i++) s += POLY([[-300 + i * 340, d.hor + 800], [-260 + i * 340, d.hor + 800], [-200 + i * 380, d.hor + 1000], [-120 + i * 380, d.hor + 1000]], '#e8d8a0', OP(0.6));
  if (d.lamps) s += lampPost(Pf, 160, d.hor + 100, 1.2) + lampPost(Pf, 920, d.hor + 100, 1.0);
  return s;
}
function carM(Pf, x, y, sc, col = '#a8402e', o = {}) {
  const d = Object.assign({ hazard: 1, t: 0, flat: 1, door: 0 }, o);
  let s = E(0, 4, 380, 26, 'rgba(0,0,0,0.35)') + P('M-350,-90 Q-350,-190 -250,-196 L-170,-204 Q-110,-300 20,-306 L150,-304 Q230,-298 270,-200 L340,-188 Q372,-160 372,-90Z', col) + P('M-130,-200 Q-84,-270 20,-278 L140,-276 Q196,-270 224,-200Z', '#cfe4f0') + L(60, -276, 60, -204, col, 10) + P('M-350,-90 Q-350,-190 -250,-196 L-170,-204 L-170,-90Z', '#000', OP(0.1)) + R(-372, -110, 740, 22, '#000', OP(0.2));
  s += P('M-350,-140 L-350,-110 L-322,-110 L-322,-140Z', '#ffd040') + R(344, -150, 28, 22, '#ff6030', 'rx="4"');
  if (d.hazard) { const on = Math.sin(d.t * 7) > 0; s += glow(Pf, 'A', 358, -140, on ? 150 : 40, on ? 0.9 : 0.2) + glow(Pf, 'A', -336, -126, on ? 130 : 30, on ? 0.8 : 0.2); }
  for (const wx of [-220, 230]) s += C(wx, -50, 62, '#16181c') + C(wx, -50, 36, '#b8bcc4') + C(wx, -50, 12, '#555') + (wx > 0 && d.flat ? E(wx, -8, 70, 10, '#16181c') : '');
  s += R(-30, -200, 6, 110, '#000', OP(0.3)) + R(-60, -150, 36, 8, '#555', 'rx="3"');
  return G(s, T(x, y, 0, sc));
}
function billStack(w, h, o = {}) { const col = o.col || MG.money; return R(-w / 2, -h, w, h, col, 'rx="4"') + R(-w / 2, -h, w, h * 0.18, '#fff', OP(0.18)) + R(-w * 0.1, -h, w * 0.2, h, MG.band) + C(0, -h / 2, h * 0.22, MG.moneyDk, OP(0.9)) + L(-w / 2, -h * 0.5, w / 2, -h * 0.5, '#000', 2, OP(0.15)); }
function caseM(Pf, x, y, sc, o = {}) {
  const d = Object.assign({ open: 0, rot: 0, t: 0, money: 1, glow: 1, empty: 0 }, o), u = ez(d.open);
  let s = E(0, 8, 300, 26, 'rgba(0,0,0,0.35)');
  if (u > 0.01) {
    const lidH = 330 * u;
    s += P(`M-290,-150 L-270,${-150 - lidH} L270,${-150 - lidH} L290,-150Z`, MG.case) + P(`M-250,-160 L-238,${-150 - lidH + 20} L238,${-150 - lidH + 20} L250,-160Z`, '#15171b');
    if (d.glow && d.money) s += glow(Pf, 'A', 0, -240, 460, 0.85 * u);
    s += P('M-290,0 L290,0 L270,-150 L-270,-150Z', '#1a1c20') + R(-290, -158, 580, 14, MG.metal, 'rx="5"');
    if (d.money) for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) s += G(billStack(80, 64), `translate(${-215 + c * 86} ${-14 - r * 50})`);
    if (d.empty) s += R(-150, -150, 300, 150, '#0a0c10', OP(0.85));
  } else {
    s += R(-290, -280, 580, 280, MG.case, 'rx="26"') + R(-270, -262, 540, 60, '#fff', OP(0.06)) + R(-290, -150, 580, 8, '#000', OP(0.4));
    for (const sx of [-1, 1]) s += P(`M${sx * 290},-280 l${-sx * 56},0 l0,56 l${sx * 20},0Z`, MG.metal) + P(`M${sx * 290},0 l${-sx * 56},0 l0,-56 l${sx * 20},0Z`, MG.metal);
    s += R(-90, -330, 180, 56, 'none', 'rx="28" stroke="#15171b" stroke-width="14"') + R(-170, -176, 50, 26, MG.metal, 'rx="6"') + R(120, -176, 50, 26, MG.metal, 'rx="6"') + R(-20, -170, 40, 20, MG.gold, 'rx="4"');
  }
  return G(s, T(x, y, d.rot, sc));
}
function moneyFly(t, n, a = 1, seed = 5) { let s = ''; for (let i = 0; i < n; i++) { const ph = ((t * 0.4 * (0.6 + hz(i, seed)) + hz(i, seed + 1)) % 1), x = hz(i, seed + 2) * 1200 - 60 + 80 * Math.sin(t * 2 + i), y = -100 + ph * 2200; s += G(R(-46, -22, 92, 44, MG.money, 'rx="4"') + C(0, 0, 11, MG.moneyDk) + R(-40, -16, 80, 32, 'none', 'rx="3" stroke="#e8f4e0" stroke-width="3" opacity="0.7"'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(ph * 540 * (hz(i, 3) - 0.5) + hz(i, 4) * 90)}) scale(${(1.2 + hz(i, 5)).toFixed(2)} ${(Math.cos(t * 3 + i)).toFixed(2)})`, OP(a)); } return s; }
function docM(x, y, sc, rot, lines, o = {}) { let s = R(-200, -270, 400, 540, MG.paper, 'rx="6"') + R(-200, -270, 400, 540, '#000', OP(0.04)); s += R(-170, -240, 340, 40, '#b8b0a0') + TX(0, -208, o.head || 'CERTIFICADO', 28, '#4a4438'); lines.forEach((ln, i) => { s += TX(0, -120 + i * 70, ln, o.size || 44, '#2a2418'); }); s += C(110, 190, 44, 'none', 'stroke="#c04040" stroke-width="6" opacity="0.7"') + TX(110, 205, 'OK', 36, '#c04040', OP(0.7)); return G(s, T(x, y, rot, sc)); }
function envM(x, y, sc, rot, open = 0) { let s = R(-240, -150, 480, 300, '#e8dcc0', 'rx="10"') + P('M-240,-150 L0,40 L240,-150Z', '#d8caa6') + P('M-240,150 L-60,-10 M240,150 L60,-10', 'none', 'stroke="#bfae88" stroke-width="5"'); if (open) s += R(-200, -150 - 100 * open, 400, 200, '#fff', OP(0.95), 'rx="6"'); s += E(0, 10, 28, 24, '#c04040'); return G(s, T(x, y, rot, sc)); }
function photoM(Pf, x, y, sc, rot, o = {}) { let s = R(-210, -240, 420, 480, '#f4f0e6', 'rx="8"') + R(-186, -216, 372, 360, '#4a5a70'); s += R(-186, -216, 372, 220, '#8ab0d8') + R(-186, -6, 372, 150, '#4a4e58'); s += G(caseM(Pf, 0, 0, 0.5), 'translate(0 90)') ; if (o.back) s = R(-210, -240, 420, 480, '#e8e0cc', 'rx="8"') + R(-210, -240, 420, 480, '#000', OP(0.05)); return G(s, T(x, y, rot, sc)); }
function phoneM(x, y, sc, rot, o = {}) { const d = Object.assign({ scr: '#e8f0ff', txt: '', t: 0, ring: 0 }, o); let s = R(-110, -220, 220, 440, '#15171b', 'rx="34"') + R(-98, -208, 196, 416, d.scr, 'rx="24"') + R(-30, -204, 60, 10, '#15171b', 'rx="5"'); if (d.txt) s += TX(0, 20, d.txt, d.txtSize || 28, '#15171b'); if (d.ring) s += `<g>${C(0, 0, 14 + 60 * ((d.t * 2) % 1), 'none', `stroke="#3ac060" stroke-width="5" opacity="${(1 - (d.t * 2) % 1).toFixed(2)}"`)}</g>`; return G(s, T(x, y, rot, sc)); }
function houseM(x, y, sc) { return G(R(-300, -260, 600, 260, '#e8e2d2') + POLY([[-340, -260], [0, -420], [340, -260]], '#8a4a3a') + R(-260, -200, 120, 140, '#7ac0e8') + R(-60, -200, 120, 200, '#6a4a3a') + R(140, -200, 120, 140, '#7ac0e8') + R(-380, -40, 760, 40, '#7ac04a') + E(-330, -80, 70, 100, '#3a8a3a'), T(x, y, 0, sc)); }
function carLux(x, y, sc, col = '#d0b040') { return G(E(0, 4, 360, 22, 'rgba(0,0,0,0.3)') + P('M-340,-60 Q-340,-120 -240,-130 L-120,-150 Q-60,-210 80,-214 Q180,-212 230,-150 L330,-130 Q356,-100 356,-60Z', col) + P('M-100,-150 Q-60,-196 80,-200 Q150,-198 196,-150Z', '#2a3a4a') + C(-210, -40, 54, '#15171b') + C(-210, -40, 30, '#c8ccd4') + C(220, -40, 54, '#15171b') + C(220, -40, 30, '#c8ccd4') + R(330, -100, 30, 16, '#fff6c0'), T(x, y, 0, sc)); }
/* interior */
function roomM(Pf, t, o = {}) {
  const d = Object.assign({ mode: 'night', lamp: 1, win: 1 }, o), night = d.mode === 'night';
  let s = BGR(night ? '#3a3248' : '#e8d8c0') + R(-600, 1300, 2280, 1400, night ? '#4a3a32' : '#b08a62') + R(-600, 1290, 2280, 20, '#00000030');
  if (d.win) s += G(R(-170, -230, 340, 460, night ? '#16224a' : '#9ac8f0', 'stroke="#e8e2d2" stroke-width="18"') + L(0, -230, 0, 230, '#e8e2d2', 12) + L(-170, 0, 170, 0, '#e8e2d2', 12) + (night ? C(70, -110, 34, '#f4f0d0') : glow(Pf, 'A', 0, -50, 300, 0.4)), 'translate(800 700)');
  if (d.lamp) s += glow(Pf, 'A', 260, 900, 420, night ? 0.6 : 0.3) + R(250, 900, 20, 400, '#2a2420') + P('M200,900 L320,900 L300,820 L220,820Z', '#f0c060');
  return s;
}
function hallM(Pf, t, o = {}) { const d = Object.assign({ light: 1 }, o); let s = BGR('#3a342e') + R(-600, 1250, 2280, 1500, '#5a4a3a') + R(-600, 1244, 2280, 12, '#2a2018'); for (let i = 0; i < 3; i++) s += R(-120 + i * 420, 480, 240, 780, '#6a4a30', 'rx="10"') + R(-96 + i * 420, 510, 192, 330, '#7a5a3a') + C(80 + i * 420, 900, 12, '#d8b050'); s += glow(Pf, 'A', 540, 360, 700, 0.5 * d.light) + R(480, 340, 120, 24, '#f8e8b0', 'rx="10"') + R(-600, 1250, 2280, 10, '#000', OP(0.2)); return s; }
function doorM(x, y, sc, open = 0, col = '#6a4a30') { return G(R(-170, -540, 340, 540, '#2a2018') + (open ? P(`M-160,-530 L${-160 + 300 * open},-560 L${-160 + 300 * open},20 L-160,0Z`, col) + R(-160, -530, 320 - 300 * open * 0.2, 530, '#e8c880', OP(0.4 * open)) : R(-160, -530, 320, 530, col, 'rx="6"') + R(-120, -490, 240, 200, '#fff', OP(0.06)) + C(110, -260, 16, '#d8b050')), T(x, y, 0, sc)); }
function suitFig(o) { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#23293a', jacketDk: '#151a26', pants: '#1c2030', pantsDk: '#12151f', boot: '#15110f', bootDk: '#0a0807', pack: '#23293a', packDk: '#23293a', shirt: '#f0f0f0', skin: '#d8b090', skinDk: '#a8806a', hair: '#8a8a90' }); try { return hikerFig(Object.assign({ cap: 0, bag: 0, lean: 0 }, o)); } finally { Object.assign(HK, sv); } }
function suitFace(o) { const sv = Object.assign({}, PAL); Object.assign(PAL, { skin: '#d8b090', skinSh: '#a8806a', hair: '#8a8a90', hairHi: '#aaaaaa', hood: '#23293a', hoodSh: '#151a26', vest: '#f0f0f0' }); try { return lucasFace(Object.assign({ beard: 0.1, dark: 0.3, eye: 1, bodyLen: 430 }, o, { eye: (o.eye === undefined ? 1 : o.eye) * hkBlink(o.t || 0) })); } finally { Object.assign(PAL, sv); } }
const suitF = (o, x, y, sc) => G(suitFace(o), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})`);
const ptxt = (x, y, str, sz, col = '#fff', ex = '') => TX(x, y, str, sz, col, `stroke="rgba(0,0,0,0.5)" stroke-width="${f1(sz * 0.06)}" paint-order="stroke" ${ex}`);
const wispL = (t, n, y0, y1, col = 'rgba(210,225,235,0.5)') => { let s = ''; for (let i = 0; i < n; i++) { const x = ((hz(i, 41) * 1800 + t * (40 + 40 * hz(i, 42))) % 1800) - 360; s += E(x, y0 + (y1 - y0) * hz(i, 43), 300 + 200 * hz(i, 44), 40 + 30 * hz(i, 45), col); } return s; };
const billP = (x, y, sc, rot, label, col = '#f0ead8') => G(R(-150, -190, 300, 380, col, 'rx="8"') + R(-150, -190, 300, 70, '#c04040', 'rx="8"') + TX(0, -140, label, 38, '#fff') + [0, 1, 2, 3].map(i => R(-110, -80 + i * 50, 220, 14, '#b0a890')).join('') + TX(0, 160, 'R$', 50, '#c04040'), T(x, y, rot, sc));
const clockM = (x, y, sc, hr, mn) => G(C(0, 0, 200, '#e8e4d6') + C(0, 0, 180, '#2a2d38') + C(0, 0, 170, '#f4f0e6') + [...Array(12)].map((_, i) => { const a = i / 12 * 6.283; return L(Math.sin(a) * 140, -Math.cos(a) * 140, Math.sin(a) * 162, -Math.cos(a) * 162, '#2a2d38', 7); }).join('') + L(0, 0, 100 * Math.sin(hr), -100 * Math.cos(hr), '#2a2d38', 14) + L(0, 0, 140 * Math.sin(mn), -140 * Math.cos(mn), '#2a2d38', 9) + C(0, 0, 12, '#c04040'), T(x, y, 0, sc));
const bedM = (x, y, sc) => G(R(-330, -200, 660, 60, '#5a3e2a', 'rx="10"') + R(-330, -150, 660, 190, '#e8e2d6', 'rx="14"') + R(-330, -150, 660, 60, '#c8c0b0', 'rx="14"') + R(-330, -60, 660, 100, '#4a7ab0', 'rx="14"') + E(-230, -130, 100, 36, '#fff') + R(-340, -260, 40, 300, '#5a3e2a', 'rx="8"') + R(300, -200, 40, 240, '#5a3e2a', 'rx="8"'), T(x, y, 0, sc));
const wardM = (x, y, sc, open = 0) => G(R(-190, -640, 380, 640, '#7a5a3a', 'rx="12"') + (open ? R(-170, -620, 340, 600, '#2a1c12') + P(`M-170,-620 L${-170 - 150 * open},-590 L${-170 - 150 * open},-30 L-170,-20Z`, '#6a4a2e') : R(-170, -620, 165, 600, '#8a6a46', 'rx="6"') + R(5, -620, 165, 600, '#8a6a46', 'rx="6"') + C(-20, -300, 10, '#d8b050') + C(20, -300, 10, '#d8b050')), T(x, y, 0, sc));
const listM = (x, y, sc, rot, marks, o = {}) => { let s = R(-250, -380, 500, 760, '#f4efe0', 'rx="8"') + R(-250, -380, 500, 64, '#2a2d38', 'rx="8"') + TX(0, -332, 'LISTA', 40, '#f4efe0'); const nm = ['M. SOUZA', 'A. LIMA', 'R. COSTA', 'T. ALVES', 'P. DIAS', 'C. NUNES', 'L. MOTA', 'J. REIS', 'F. CRUZ', 'VOCÊ']; for (let i = 0; i < 10; i++) { const y0 = -260 + i * 62, mk = marks[i]; s += TX(-60, y0 + 14, nm[i], 28, '#2a2d38') + (mk === undefined ? '' : G(R(-35, -22, 170, 40, mk ? '#c04040' : '#3a9a50', 'rx="8"') + TX(50, 8, mk ? 'ROUBOU' : 'DEVOLVEU', 22, '#fff'), `translate(100 ${y0})`)); } return G(s, T(x, y, rot, sc)); };
const calM = (x, y, sc, a = 1) => G(R(-220, -260, 440, 520, '#f4efe0', 'rx="16"') + R(-220, -260, 440, 120, '#c04040', 'rx="16"') + TX(0, -168, 'AMANHÃ', 60, '#fff') + TX(0, 90, '7', 300, '#2a2d38') + TX(0, 190, 'DIA', 60, '#c04040'), T(x, y, 0, sc), OP(a));
const winM = (Pf, x, y, sc, mode) => G(R(-190, -260, 380, 520, mode === 'night' ? '#16224a' : '#9ac8f0', 'stroke="#e8e2d2" stroke-width="18"') + L(0, -260, 0, 260, '#e8e2d2', 12) + L(-190, 0, 190, 0, '#e8e2d2', 12) + (mode === 'night' ? C(80, -130, 36, '#f4f0d0') : glow(Pf, 'A', 0, -60, 340, 0.4)), T(x, y, 0, sc));
