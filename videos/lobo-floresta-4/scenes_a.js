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

function partD(c) {
  const { add, tw, k, E_, S } = c;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(2.1, 3.6); mb(3.6, 4.6); mb(5.5, 6.6); mb(13.4, 14.4); mb(59.6, 60.4);
  const dim = '#050a0e';
  /* ===== ABERTURA: close assustada gritando -> lobo -> homem ===== */
  SN(0, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 900, 800, 0.35 + 0.15 * Math.sin(t * 14)) + FACE(t, { eye: 1, pupil: 0.12, worry: 1, mouth: 1, sweat: 1, tear: 1, tremble: 3, lookx: 4 * Math.sin(t * 40) }, 540, 1010, 3.3 + 0.2 * Math.sin(t * 30)) + vidFx(Pf, t, '', { stamp: '03:12', glitch: 0.6 }), lt, 0.8, { z0: 1.0, z1: 1.18, shk: 9 }) + PUNCH(lt, 0.7));
  SN(0.78, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(dim) + glow(Pf, 'A', 540, 900, 800, 0.25) + G(wolfHead({ t, lookx: 0, glow: 1, calm: 0, snarl: 1 }), 'translate(540 960) scale(3.0)'), lt, 0.7, { z0: 1.25, z1: 1.0, shk: 6 }) + PUNCH(lt, 0.5));
  SN(1.42, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#060b10') + glow(Pf, 'R', 540, 900, 700, 0.3) + G(manJacket(Pf, { scale: 1.9, t, lantern: 0, eyes: 1, rim: 0.8 }), 'translate(540 1750)'), lt, 0.7, { z0: 1.0, z1: 1.25, y0: 1000, y1: 800, shk: 5 }) + PUNCH(lt, 0.4, '#ff3b30'));
  /* 2.1 "Você escolheu ficar sozinho": ela corre na floresta */
  SN(2.1, 0.001, (t, lt, Pf) => { return CM(Pf, t, WALKSHOT(Pf, t, lt, { run: 1, sc: 1.25, scared: 0.9, mouth: 0.6, hx: 480 }), lt, 1.5, { z0: 1.0, z1: 1.12, y0: 1200, y1: 1250, shk: 4 }); });
  /* 3.6 "com o lobo": lobo correndo atrás */
  SN(3.6, 0.001, (t, lt, Pf) => { const dist = 1500 * lt + 900; return CM(Pf, t, FOREST(Pf, t, dist, { gy: 1500 }) + E(540, 1506, 300, 18, 'rgba(0,0,0,0.5)') + G(wolfSide({ phase: dist / 520, run: 1, scale: 1.5, flip: 1, glow: 1, t, head: 0 }), 'translate(560 1500)'), lt, 1.0, { z0: 1.0, z1: 1.15, y0: 1200, y1: 1250, shk: 5 }); });
  /* 4.6 "em vez de ficar com um homem": homem sai da névoa */
  SN(4.6, 0.001, (t, lt, Pf) => CM(Pf, t, FOREST(Pf, t, 40, { gy: 1500 }) + R(-300, 600, 1680, 1000, 'rgba(110,140,160,0.12)') + G(silFig({ t, walk: 0, stride: 0, view: 'f', idle: 1 }), 'translate(540 1500) scale(1.5)') + eyesPair(Pf, 548, 322, 0.9, '#ffd35a', H.prog(lt, 0.2, 0.5), 18), lt, 0.9, { z0: 1.0, z1: 1.2, y0: 1100, y1: 950, shk: 3 }));
  /* 5.2 "homem": close nos olhos */
  SN(5.15, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#04070a') + eyesPair(Pf, 540, 960, 3.6, '#ffd35a', 0.95, 40) + glow(Pf, 'R', 540, 960, 700, 0.25), lt, 0.4, { z0: 1.0, z1: 1.15, shk: 6 }) + PUNCH(lt, 0.4));
  /* 5.5 "Sobreviveu à floresta,": caminhada */
  SN(5.5, 0.001, (t, lt, Pf) => { return CM(Pf, t, WALKSHOT(Pf, t, lt, { sc: 1.25, scared: 0.3, hx: 520 }), lt, 1.1, { z0: 1.0, z1: 1.1, y0: 1150, y1: 1200 }); });
  /* 6.6 "descobriu o jogo macabro": telas */
  SN(6.6, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + monitorGrid(Pf, t, 1) + glow(Pf, 'R', 540, 900, 600, 0.12 + 0.1 * Math.sin(t * 6)), lt, 1.5, { z0: 1.0, z1: 1.25, x0: 400, x1: 600, y0: 600, y1: 1000 }) + PUNCH(lt, 0.2));
  /* 8.1 "ajudou a polícia": luzes da viatura + policial */
  SN(8.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#060a12') + policeGlow(Pf, t, 1) + copSil({ x: 540, y: 1700, sc: 1.8, t }), lt, 1.4, { z0: 1.0, z1: 1.18, y0: 1100, y1: 1000, shk: 3 }));
  /* 9.3 "a encontrar os responsáveis": algemas fecham */
  SN(9.3, 0.001, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.1, 0.8)); return CM(Pf, t, BIG('#070b12') + policeGlow(Pf, t, 0.7) + cuffs(540, 1100, 2.0, 1 - u) + (lt > 0.7 ? FB('#fff', 0.35 * Math.exp(-(lt - 0.7) * 14)) : ''), lt, 1.1, { z0: 1.0, z1: 1.3, shk: 4 }); });
  /* 10.4 "Mas agora" corte escuro + 11.1 "vai descobrir que alguém": */
  SN(10.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#050608') + TXT(540, 1000, 'MAS AGORA...', 120, '#e8eef8', OP(H.prog(lt, 0, 0.3))), lt, 0.7, { z0: 1.0, z1: 1.1, shk: 2 }));
  SN(11.1, 0.001, (t, lt, Pf) => CM(Pf, t, FOREST(Pf, t, 0, { gy: 1560 }) + R(-300, 500, 1680, 1100, 'rgba(110,140,160,0.1)') + G(silFig({ t, stride: 0, view: 'f' }), 'translate(540 1560) scale(1.1)'), lt, 1.0, { z0: 1.0, z1: 1.15, y0: 1000, y1: 1100 }));
  SN(12.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0406') + glow(Pf, 'R', 540, 900, 800, 0.35 + 0.1 * Math.sin(t * 8)) + G(manJacket(Pf, { scale: 2.0, t, lantern: 0, eyes: 1, rim: 0.9 }), 'translate(540 1800)'), lt, 1.3, { z0: 1.0, z1: 1.3, y0: 1100, y1: 800, shk: 4 }));
  /* 13.4 "conseguiu escapar": homem corre, algemas abertas no chão */
  SN(13.4, 0.001, (t, lt, Pf) => { return CM(Pf, t, WALKSHOT(Pf, t, lt, { run: 1, sc: 1.2, fig: silFig, hx: 540 }) + glow(Pf, 'R', 540, 1000, 800, 0.15), lt, 1.0, { z0: 1.0, z1: 1.15, y0: 1250, y1: 1250, shk: 5 }) + PUNCH(lt, 0.3, '#ff3b30'); });
  /* ===== VIDA NORMAL ===== */
  SN(14.4, 0.04, (t, lt, Pf) => CM(Pf, t, homeFloor(Pf, t) + HERO(t, 360, 1620, 1.2, { stride: 0, view: 'f', look: 0.3 }), lt, 0.9, { z0: 1.0, z1: 1.08, y0: 1100, y1: 1100 }));
  SN(15.2, 0.03, (t, lt, Pf) => { let s = homeFloor(Pf, t) + FACE(t, { eye: 1, pupil: 0.5, worry: 0, smile: 0.35, mouth: 0 }, 540, 1000, 2.5); s += G(R(-60, -50, 120, 100, '#e8e0d0', 'rx="14"') + E(0, -50, 56, 12, '#6a4a30') + R(50, -30, 36, 54, 'none', 'rx="18" stroke="#e8e0d0" stroke-width="12"'), `translate(860 ${f1(1700 - 40 * ez(H.prog(lt, 0, 1.0)))}) scale(1.6)`); for (let i = 0; i < 3; i++) s += E(860 + 14 * Math.sin(t * 2 + i), 1560 - ((t * 60 + i * 40) % 120), 14, 22, 'rgba(255,255,255,0.25)'); return CM(Pf, t, s, lt, 1.7, { z0: 1.0, z1: 1.12, y0: 1000, y1: 1020 }); });
  SN(16.9, 0.03, (t, lt, Pf) => CM(Pf, t, homeFloor(Pf, t) + FACE(t, { eye: 1, pupil: 0.5, worry: 0.25, looky: 16 * Math.sin(lt * 1.6), lookx: -10 * Math.sin(lt * 1.2), mouth: 0 }, 540, 1000, 2.7) + G(R(-130, -60, 260, 120, 'rgba(0,0,0,0.5)', 'rx="30"') + TXT(0, 20, '...', 80, '#e8eef8'), 'translate(860 480)'), lt, 1.8, { z0: 1.05, z1: 1.2, x0: 560, x1: 520 }));
  SN(18.7, 0.03, (t, lt, Pf) => CM(Pf, t, homeFloor(Pf, t) + glow(Pf, 'A', 540, 800, 900, 0.3 * H.prog(lt, 0, 1)) + FACE(t, { eye: 1, pupil: 0.55, worry: 0, smile: H.prog(lt, 0.2, 1.2) * 0.8, mouth: 0 }, 540, 1000, 2.5), lt, 2.2, { z0: 1.25, z1: 1.0, shk: 1 }));
  /* 20.6 "daquele pesadelo": flash dos olhos do lobo */
  SN(20.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG(dim) + G(wolfHead({ t, glow: 1, calm: 0, snarl: 0.6 }), 'translate(540 960) scale(2.6)'), lt, 0.6, { z0: 1.0, z1: 1.2, shk: 8 }) + PUNCH(lt, 0.6));
  /* ===== MADRUGADA ===== */
  SN(21.5, 0.001, (t, lt, Pf) => CM(Pf, t, bedroomDark(Pf, t, 0.2) + TXT(540, 700, '03:07', 240, '#ff5a4a', OP(0.9 + 0.1 * Math.sin(t * 3))) + bedObj(540, 1500), lt, 0.9, { z0: 1.15, z1: 1.0, shk: 2 }));
  SN(22.3, 0.001, (t, lt, Pf) => CM(Pf, t, bedroomDark(Pf, t, 0.4) + HERO(t, 540, 1850, 1.5, { stride: 0, view: 'f' }).replace(/^/, ''), lt, 0.8, { z0: 1.0, z1: 1.2, x0: 760, x1: 700, y0: 700, y1: 760 }));
  SN(23.0, 0.001, (t, lt, Pf) => CM(Pf, t, bedroomDark(Pf, t, 0.1) + phoneN(Pf, 540, 1000, 1.9, { t, title: 'NÚMERO DESCONHECIDO', body: '...', shake: 5 * Math.max(0, Math.sin(t * 30)) }) + glow(Pf, 'B', 540, 1000, 600, 0.5) + ringWaves(540, 1000, t, 0, 3, 500, 'rgba(143,176,214,0.4)', 1, 5), lt, 1.2, { z0: 1.3, z1: 1.0, shk: 4 }));
  SN(24.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + glow(Pf, 'B', 540, 960, 800, 0.4) + phoneN(Pf, 540, 1000, 2.6, { t, title: 'NÚMERO DESCONHECIDO', body: 'VÍDEO' }), lt, 1.7, { z0: 1.0, z1: 1.2, y0: 960, y1: 940, shk: 2 }));
  SN(25.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 900, 700, 0.3) + msgBubble(540, 960, 1.5) + TXT(540, 1250, '?', 200, '#8fb0d6', OP(0.6)), lt, 1.0, { z0: 1.0, z1: 1.2, shk: 2 }) + PUNCH(lt, 0.2));
  SN(26.9, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 900, 700, 0.3) + G(R(-260, -340, 520, 680, '#15202c', 'rx="26"') + POLY([[-70, -90], [-70, 90], [90, 0]], '#e8eef8'), 'translate(540 960)'), lt, 0.9, { z0: 1.3, z1: 1.0, shk: 3 }));
  SN(27.8, 0.001, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.2, 0.9)); return CM(Pf, t, BIG('#0a121c') + G(R(-260, -340, 520, 680, '#15202c', 'rx="26"') + POLY([[-70, -90], [-70, 90], [90, 0]], '#e8eef8'), 'translate(540 900)') + HAND(540, lp(1700, 1020, u), 2.2, PAL.skin, 0) + ringWaves(540, 900, t, 0, 2, 400 * u, 'rgba(200,230,255,0.5)', 1, 5), lt, 1.3, { z0: 1.0, z1: 1.12, shk: 2 }); });
  /* ===== VÍDEO ===== */
  SN(29.1, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, FOREST(Pf, t, 20 * lt, { gy: 1500 }), { stamp: '02:51' }), lt, 1.2, { z0: 1.0, z1: 1.1 }));
  SN(30.3, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, FOREST(Pf, t, 300 + 120 * lt, { gy: 1500, mx: 300 }), { stamp: '02:51' }), lt, 1.4, { z0: 1.1, z1: 1.0, x0: 640, x1: 440 }));
  SN(31.7, 0.001, (t, lt, Pf) => { const u = ez(lt / 2.4); return CM(Pf, t, vidFx(Pf, t, FOREST(Pf, t, 600, { gy: 1500 }) + G(R(-60, -900, 120, 900, '#1a120e') + E(0, -900, 30, 10, '#1a120e') + L(0, -700, 140, -780, '#1a120e', 18) + L(0, -600, -130, -690, '#1a120e', 16), `translate(540 1500)`), { stamp: '02:52' }), lt, 2.4, { z0: 1.0, z1: 2.1, x0: 540, x1: 540, y0: 1000, y1: 700, shk: 3 }); });
  SN(34.1, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(R(-80, -1100, 160, 1700, '#1a120e'), 'translate(540 1300)') + jacketHang(t, 540, 760, 1.1), { stamp: '02:53' }), lt, 2.2, { z0: 1.0, z1: 1.5, y0: 960, y1: 1000 }));
  SN(36.3, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + jacketHang(t, 540, 760, 2.4), { stamp: '02:53' }), lt, 0.7, { z0: 1.0, z1: 1.2, shk: 5 }) + PUNCH(lt, 0.3));
  SN(36.9, 0.001, (t, lt, Pf) => { const u = ez(lt / 0.6); return CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + jacketHang(t, 540, 760, 2.4) + G(P('M-90,40 Q-40,0 10,60 Q40,120 -20,150 Q-80,150 -90,90Z', '#8a1c1c', OP(u)) + P('M40,160 Q70,120 100,190 Q80,250 50,220Z', '#8a1c1c', OP(u)) + [0, 1, 2].map(i => C(-30 + 40 * i, 200 + ((t * 90 + i * 70) % 220), 8, '#8a1c1c', OP(u))).join(''), 'translate(540 900) scale(2.2)'), { stamp: '02:54', glitch: 0.4 }), lt, 0.8, { z0: 1.0, z1: 1.25, shk: 5 }); });
  SN(37.7, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(R(-420, -80, 840, 160, 'rgba(0,0,0,0.6)', 'rx="20"') + TXT(0, 24, '. . .', 100, '#e8eef8', OP(0.5 + 0.5 * Math.sin(t * 8))), 'translate(540 960)'), { stamp: '02:55', glitch: 0.8 }), lt, 1.9, { z0: 1.0, z1: 1.15, shk: 4 }));
  SN(39.6, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + TXT(540, 900, 'VOCÊ SAIU', 120, '#e8eef8') + TXT(540, 1040, 'DO JOGO.', 120, '#e8eef8'), { stamp: '02:55', glitch: 0.5 }), lt, 0.9, { z0: 1.0, z1: 1.15, shk: 4 }) + PUNCH(lt, 0.3));
  SN(40.5, 0.001, (t, lt, Pf) => CM(Pf, t, vidFx(Pf, t, BIG('#0a1210') + TXT(540, 820, 'MAS O JOGO', 120, '#ff5a4a') + TXT(540, 960, 'NÃO SAIU', 120, '#ff5a4a') + TXT(540, 1100, 'DE VOCÊ.', 120, '#ff5a4a'), { stamp: '02:56', glitch: 0.6 }), lt, 1.4, { z0: 1.0, z1: 1.18, shk: 5 }) + PUNCH(lt, 0.3, '#ff3b30'));
  SN(41.9, 0.001, (t, lt, Pf) => { const b = Math.pow(Math.max(0, Math.sin(t * 9)), 6); return CM(Pf, t, BIG('#18080c') + glow(Pf, 'R', 540, 960, 600 + 200 * b, 0.4) + ecgLine(540, 1500, 900, t, 150, 1, 120, '#ff3b30') + FACE(t, { eye: 1, pupil: 0.25, worry: 1, sweat: 1, mouth: 0.3, tremble: 1 }, 540, 880, 2.3), lt, 1.2, { z0: 1.0, z1: 1.15, shk: 5 * b + 1 }); });
  /* ===== BLOQUEIA / SEGUNDA MENSAGEM ===== */
  SN(43.1, 0.001, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.4, 0.9)); return CM(Pf, t, BIG('#0a121c') + phoneN(Pf, 540, 960, 1.7, { t, title: 'DESCONHECIDO', body: 'BLOQUEAR' }) + HAND(540, lp(1700, 1010, ez(H.prog(lt, 0, 0.5))), 1.8, PAL.skin, 0) + bigX(540, 960, 330, u, '#ff3b30'), lt, 1.3, { z0: 1.0, z1: 1.12, shk: 2 }); });
  SN(44.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#050608') + TXT(540, 1000, 'MAS...', 140, '#e8eef8'), lt, 0.3, { z0: 1.0, z1: 1.2, shk: 6 }) + PUNCH(lt, 0.5));
  SN(44.6, 0.001, (t, lt, Pf) => CM(Pf, t, bedroomDark(Pf, t, 0.1) + TXT(540, 800, '03:08', 220, '#ff5a4a') + ringWaves(540, 1100, t, 0, 3, 500, 'rgba(143,176,214,0.4)', 1, 5), lt, 0.7, { z0: 1.2, z1: 1.0, shk: 3 }));
  SN(45.3, 0.001, (t, lt, Pf) => CM(Pf, t, bedroomDark(Pf, t, 0.1) + phoneN(Pf, 540, 1000, 1.9, { t, title: 'NOVA MENSAGEM', body: 'LOCAL', shake: 5 * Math.max(0, Math.sin(t * 30)) }) + glow(Pf, 'B', 540, 1000, 600, 0.5), lt, 1.0, { z0: 1.0, z1: 1.2, shk: 4 }));
  SN(46.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + G(R(-400, -220, 800, 440, '#1c2838', 'rx="40"') + TXT(0, -90, 'QUEM ESCAPOU?', 70, '#e8eef8') + TXT(0, 20, 'SE QUISER SABER', 56, '#8fb0d6'), 'translate(540 960)') + MANEYES(Pf, 540, 1330, 0.8, 0.8), lt, 1.2, { z0: 1.0, z1: 1.15, shk: 2 }));
  SN(47.5, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 700, 0.3 + 0.2 * Math.sin(t * 8)) + TXT(540, 900, 'VENHA', 170, '#ff5a4a') + TXT(540, 1090, 'SOZINHO.', 170, '#ff5a4a'), lt, 0.6, { z0: 1.0, z1: 1.2, shk: 6 }) + PUNCH(lt, 0.4, '#ff3b30'));
  SN(48.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 960, 700, 0.35) + phoneN(Pf, 540, 1000, 1.9, { t, title: 'ANEXO', body: 'LOCAL' }), lt, 0.7, { z0: 1.1, z1: 1.0, shk: 3 }));
  SN(48.8, 0.001, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.1, 1.2)); return CM(Pf, t, mapBG(Pf, t) + P('M200,1500 Q500,1200 700,1000 T900,500', 'none', `stroke="#ffd35a" stroke-width="10" stroke-dasharray="30 20" opacity="0.7" stroke-dashoffset="${-t * 40}"`) + pinObj(900, lp(300, 520, Math.min(1, u * 1.2)), 2.4) + ringWaves(900, 520, t, 0, 3, 260, 'rgba(255,60,50,0.6)', 1, 5), lt, 1.4, { z0: 1.0, z1: 1.3, x0: 700, x1: 880, y0: 900, y1: 520, shk: 2 }); });
  /* ===== DECISÃO ===== */
  SN(50.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 1) + FACE(t, { eye: 1, pupil: 0.5, worry: 0.3, mouth: 0, looky: 6 }, 540, 1000, 2.5), lt, 1.4, { z0: 1.0, z1: 1.15, shk: 3 }));
  SN(51.6, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 1) + copSil({ x: 540, y: 1700, sc: 1.8, t }), lt, 0.6, { z0: 1.2, z1: 1.0, shk: 3 }));
  SN(52.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 900, 700, 0.3) + phoneN(Pf, 540, 960, 2.3, { t, title: 'ANEXO', body: 'FOTO' }), lt, 1.6, { z0: 1.0, z1: 1.2, shk: 2, y0: 960, y1: 940 }));
  SN(53.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + FACE(t, { eye: 1, pupil: 0.4, worry: 0.9, looky: 10 * Math.sin(t * 2), mouth: 0, sweat: 1 }, 540, 1000, 2.8) + glow(Pf, 'B', 540, 800, 700, 0.2), lt, 1.0, { z0: 1.0, z1: 1.2, shk: 2 }));
  SN(54.7, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 960, 700, 0.3) + G(R(-190, -230, 380, 460, '#ece6d6', 'rx="8"') + R(-170, -210, 340, 340, '#1a2a26') + cf({ eye: 0.9, worry: 0.9, bruise: 0.3, bodyLen: 260 }, 0, 20, 0.42), 'translate(540 960) scale(2.6) rotate(-3)'), lt, 1.3, { z0: 1.0, z1: 1.2, r0: -2, r1: 2, shk: 2 }) + PUNCH(lt, 0.3));
  SN(56.0, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'R', 540, 960, 600, 0.25) + G(R(-190, -230, 380, 460, '#ece6d6', 'rx="8"') + R(-170, -210, 340, 340, '#1a2a26') + cf({ eye: 0.9, worry: 0.9, bruise: 0.3, bodyLen: 260 }, 0, 20, 0.42), 'translate(540 900) scale(2.2) rotate(2)') + G(R(-250, -50, 500, 100, 'rgba(0,0,0,0.7)', 'rx="16"') + TXT(0, 24, 'AGORA · 03:09', 56, '#ff5a4a'), 'translate(540 1380)'), lt, 1.3, { z0: 1.2, z1: 1.0, shk: 3 }));
  SN(57.3, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 960, 700, 0.3) + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + C(0, -150, 80, '#2a3648') + TXT(0, 80, 'CLARA', 70, '#e8eef8') + G(C(0, 240, 70, '#3ac060') + P('M-30,260 q10,-60 60,-40', 'none', 'stroke="#fff" stroke-width="12"'), ''), 'translate(540 960)') + ringWaves(540, 1200, t, 0, 3, 400, 'rgba(58,192,96,0.5)', 1, 5), lt, 0.9, { z0: 1.0, z1: 1.15, shk: 2 }));
  SN(58.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + C(0, -150, 80, '#2a3648') + TXT(0, 80, 'CLARA', 70, '#e8eef8') + TXT(0, 260, '. . .', 100, '#8fb0d6', OP(0.5 + 0.5 * Math.sin(t * 6))), 'translate(540 960)') + FB('#000', 0.35 * H.prog(lt, 0.2, 0.6)), lt, 0.6, { z0: 1.0, z1: 1.1, shk: 2 }));
  /* 58.8 decide ir: pega a jaqueta, sai pela porta */
  SN(58.8, 0.001, (t, lt, Pf) => CM(Pf, t, homeFloor(Pf, t) + G(R(-60, 0, 120, 70, '#8a6a3a', 'rx="14"') + L(0, -10, 0, -60, '#8a6a3a', 10) + C(0, -70, 20, 'none', 'stroke="#c8c8c8" stroke-width="8"'), `translate(${f1(lp(300, 480, ez(H.prog(lt, 0, 0.8))))} 1450) scale(2.2)`) + HAND(lp(900, 520, ez(H.prog(lt, 0.1, 0.8))), 1480, 2.2, PAL.skin, -90), lt, 0.8, { z0: 1.0, z1: 1.15, shk: 3 }));
  SN(59.6, 0.001, (t, lt, Pf) => { return CM(Pf, t, homeFloor(Pf, t) + doorM(850, 1570, 1.3, ez(H.prog(lt, 0.1, 0.5))) + HERO(t, lp(150, 640, ez(lt / 0.9)), 1700, 1.05, { walk: lp(150, 640, ez(lt / 0.9)) / (WALK_CYCLE * 1.05), stride: 1, flip: 1, scared: 0.3 }), lt, 0.8, { z0: 1.0, z1: 1.08, y0: 1100, y1: 1100 }); });
  SN(60.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#0a121c') + FACE(t, { eye: 1, pupil: 0.5, worry: 0, anger: 0.6, mouth: 0 }, 540, 1000, 2.7) + glow(Pf, 'A', 540, 800, 700, 0.2), lt, 1.7, { z0: 1.0, z1: 1.2, shk: 2 }));
  SN(62.1, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 0.8) + copSil({ x: 700, y: 1700, sc: 1.6, t }) + HERO(t, 260, 1760, 1.1, { stride: 0, view: 's', look: 0 }), lt, 1.1, { z0: 1.0, z1: 1.15, shk: 3 }));
  SN(63.2, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 0.7) + monitorGrid(Pf, t, 1).replace(/^/, ''), lt, 1.2, { z0: 1.0, z1: 1.2, shk: 2 }));
  SN(64.4, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#070d14') + glow(Pf, 'B', 540, 960, 800, 0.3) + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + P('M0,0 q-70,-120 0,-200 q70,80 0,200Z', '#3ac060') + C(0, -130, 24, '#0a1218') + TXT(0, 280, 'LOCALIZAÇÃO ENVIADA', 36, '#e8eef8'), 'translate(540 1000) scale(1.3)') + ringWaves(540, 900, t, 0, 3, 450, 'rgba(58,192,96,0.5)', 1, 5), lt, 1.7, { z0: 1.0, z1: 1.2, shk: 2 }));
}
