/* scenes_a.js - Parte 4 v2: helpers + 0 a 66 s (cortes ancorados nas palavras do reconhecimento de fala) */
const lp = (a, b, u) => a + (b - a) * u;
const CM = (Pf, t, s, lt, dur, o = {}) => { const u = ez(Math.min(1, lt / dur)), q = (a, b, d) => a === undefined ? d : (b === undefined ? a : a + (b - a) * u); return camG(t, q(o.x0, o.x1, 540), q(o.y0, o.y1, 960), q(o.z0, o.z1, 1), q(o.r0, o.r1, 0) + 0.35 * Math.sin(t * 1.7), o.shk === undefined ? 2 : o.shk, s) + vignette(Pf, 1) + grain(t, 0.08); };
const PUNCH = (lt, a = 0.5, col = '#fff') => FB(col, a * Math.exp(-lt * 16));
const vidFx = (Pf, t, inner, o = {}) => {
  let s = inner;
  for (let i = 0; i < 40; i++) s += R(0, i * 48 + ((t * 80) % 48), 1080, 4, 'rgba(0,0,0,0.18)');
  s += R(-400, -400, 1880, 2720, 'rgba(120,200,255,0.06)');
  const g = o.glitch || 0; if (g > 0) for (let i = 0; i < 6; i++) s += R(0, hz(i, Math.floor(t * 18)) * 1920, 1080, 8 + 60 * hz(i, 4), 'rgba(255,255,255,0.18)', OP(g));
  s += C(110, 130, 20, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 5))) + TXT(250, 148, 'REC', 56, '#fff') + TXT(880, 148, o.stamp || '03:12', 50, '#fff');
  return s + vignette(Pf, 0.7) + grain(t, 0.12);
};
const HERO = (t, x, y, sc, o = {}) => G(heroFig(Object.assign({ t, view: 's', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const FACE = (t, o, x = 540, y = 980, sc = 2.6) => wf(Object.assign({ t, eye: 1, pupil: 0.45 }, o), x, y, sc);
const nightF = (Pf, t, o = {}) => nightBG(Pf, t, Object.assign({ k: 2, fog: 0.7, shafts: 0, px: 0 }, o));
const bedroomDark = (Pf, t, a = 0.15) => BIG('#0a121c') + R(-400, 1350, 1880, 700, '#101a24') + G(R(-170, -230, 340, 460, '#0e1c34', 'stroke="#1a2a40" stroke-width="16"') + C(80, -120, 32, '#dbe9f4', OP(0.85)) + glow(Pf, 'B', 80, -120, 240, 0.5), 'translate(800 700)') + glow(Pf, 'B', 800, 700, 700, a);
const msgBubble = (x, y, sc, w = 520) => G(R(-w / 2, -60, w, 120, '#2a3648', 'rx="40"') + C(-60, 0, 10, '#8fb0d6') + C(0, 0, 10, '#8fb0d6') + C(60, 0, 10, '#8fb0d6'), T(x, y, 0, sc));
const pine = (x, b, h, w, col) => P(`M${f1(x)},${f1(b - h)} L${f1(x + w * .32)},${f1(b - h * .62)} L${f1(x + w * .16)},${f1(b - h * .62)} L${f1(x + w * .42)},${f1(b - h * .3)} L${f1(x + w * .22)},${f1(b - h * .3)} L${f1(x + w * .5)},${f1(b)} L${f1(x - w * .5)},${f1(b)} L${f1(x - w * .22)},${f1(b - h * .3)} L${f1(x - w * .42)},${f1(b - h * .3)} L${f1(x - w * .16)},${f1(b - h * .62)} L${f1(x - w * .32)},${f1(b - h * .62)}Z`, col);
/* floresta que rola: dist em px do chao; camadas em paralaxe */
const FOREST = (Pf, t, dist, o = {}) => {
  const gy = o.gy || 1500, mx = o.mx || 800, my = o.my || 300; let s = BIG('#060d15') + R(-300, 0, 1680, gy, '#0a1722', OP(0.9));
  s += glow(Pf, 'B', mx, my, 700, 0.35) + C(mx, my, 72, '#dbe9f4', OP(0.92));
  const lay = (sp, w, col, hh, b, kind) => { const off = dist * sp, base = Math.floor(off / w); let q = ''; for (let k = -1; k <= Math.ceil(1480 / w) + 1; k++) { const i = k + base, x = k * w - (off - base * w) + hz(i, 11) * w * 0.5, h = hh * (0.7 + 0.5 * hz(i, 12)); q += kind ? R(x - (30 + 40 * hz(i, 13)), -100, 60 + 80 * hz(i, 13), b + 100, col) : pine(x, b, h, w * (1.1 + 0.4 * hz(i, 14)), col); } return q; };
  s += lay(0.12, 210, '#0d1d29', 900, gy - 120) + R(-300, gy - 380, 1680, 240, 'rgba(120,150,175,0.05)') + lay(0.3, 260, '#0a1621', 1100, gy - 40) + R(-300, gy - 260, 1680, 300, 'rgba(110,140,160,0.06)');
  s += R(-300, gy, 1680, 900, '#0b1614') + R(-300, gy, 1680, 8, '#000', OP(0.35));
  const off = dist, base = Math.floor(off / 150); for (let k = -1; k <= 9; k++) { const i = k + base, x = k * 150 - (off - base * 150) + hz(i, 21) * 80; s += L(x, gy + 40 + 80 * hz(i, 22), x + 60 + 40 * hz(i, 23), gy + 40 + 80 * hz(i, 22), '#16302a', 5, OP(0.6)) + (hz(i, 24) > 0.7 ? E(x + 20, gy + 150, 40, 10, '#050a0a') : ''); }
  s += lay(1.0, 520, '#04090c', 0, gy + 20, 1);
  return s + R(-300, gy - 120, 1680, 260, 'rgba(120,150,170,0.05)');
};
const WALKSHOT = (Pf, t, lt, o = {}) => {
  const sc = o.sc || 1.1, gy = o.gy || 1500, run = o.run ? 1 : 0, cyc = run ? RUN_CYCLE : WALK_CYCLE, cps = o.cps || (run ? 1.35 : 0.95), dist = (o.d0 || 0) + cyc * sc * cps * lt, hx = o.hx === undefined ? 540 : o.hx;
  const fig = o.fig || (a => heroFig(a));
  return FOREST(Pf, t, dist, { gy, mx: o.mx, my: o.my }) + E(hx, gy + 6, 150 * sc, 16 * sc, 'rgba(0,0,0,0.5)') + G(fig({ t, walk: dist / (cyc * sc), view: o.view || 's', stride: 1, run, scared: o.scared || 0, mouth: o.mouth || 0, flip: o.flip || 1 }), `translate(${f1(hx)} ${f1(o.hy === undefined ? gy : o.hy)}) scale(${sc})`);
};
const silFig = a => { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#07090d', jacketDk: '#040608', jacketLt: '#111820', shirt: '#07090d', pants: '#07090d', pantsDk: '#040608', boot: '#020304', bootDk: '#020304', sole: '#000', skin: '#07090d', skinDk: '#040608', hair: '#040608', cap: '#07090d', capDk: '#040608', capLt: '#07090d' }); try { return hikerFig(Object.assign({ cap: 1, bag: 0, hair: 0, lean: 0 }, a)); } finally { Object.assign(HK, sv); } };
const holdPhone = (Pf, t, k) => '';
const MANEYES = (Pf, x, y, s = 1, a = 0.9) => eyesPair(Pf, x, y, s, '#ffd35a', a, 40);
const jacketHang = (t, x, y, sc) => G(P('M-130,-60 Q-150,-20 -120,120 L-80,360 L80,360 L120,120 Q150,-20 130,-60 L80,-120 Q0,-90 -80,-120Z', '#4a5a3a') + P('M-130,-60 L-180,200 L-120,220 L-80,40Z', '#3a4a2e') + P('M130,-60 L180,200 L120,220 L80,40Z', '#3a4a2e') + P('M-60,-100 Q0,-60 60,-100 L60,-40 Q0,0 -60,-40Z', '#2a3a22'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(4 * Math.sin(t * 1.6))} 0 -120) scale(${sc})`);
const mapBG = (Pf, t) => { let s = BIG('#0e1a20'); for (let i = 0; i < 10; i++) s += L(-100 + i * 140, 0, 200 + i * 80, 1920, '#1a2a30', 8) + L(0, 160 + i * 200, 1080, 100 + i * 200, '#1a2a30', 8); return s; };
const pinObj = (x, y, sc, col = '#ff3b30') => G(P('M0,0 q-70,-120 0,-200 q70,80 0,200Z', col) + C(0, -130, 24, '#0a1218'), T(x, y, 0, sc));
const homeFloor = (Pf, t) => homeBG(Pf, t, {});
