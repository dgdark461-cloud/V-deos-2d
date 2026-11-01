/* scenes_b.js - Alice 62 a 125 s */
function MK(c) {
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn); const E_ = ez;
  const sh = (s0, dur, o, fn, pf) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + (pf === 0 ? '' : PUNCH(lt, pf === undefined ? 0.4 : pf, typeof pf === 'string' ? pf : '#fff')));
  const ST = (txt, x, y, sz, lt, a = 0, col) => lt >= a ? SUPT(txt, x, y, sz, lt - a, col) : '';
  return { SN, sh, ST, E_ };
}
const DARK = () => R(-300, -300, 1680, 2520, '#000', OP(0.3));
const FIG = (x, y, sc, a = 0.8) => G(P('M-50,0 Q-80,-300 -40,-440 Q0,-500 40,-440 Q80,-300 50,0Z', '#000', OP(a)), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})`);
function partE(c) {
  const { sh, SN, ST, E_ } = MK(c);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(62.12, 62.89); mb(100.41, 101);
  sh(61.16, 1.53, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, eye: 0.12, lid: 1 }, 540, 880, 1.25) + DARK() + ST('3:17', 540, 340, 140, lt, 0.1, '#ff5a5a'), 0.4);
  SN(62.12, 0.001, (t, lt, Pf) => CM(Pf, t, DOORA(Pf, t, { knock: lt < 1.6 ? Math.max(0, Math.sin(lt * 5)) : 0 }) + ST('TOC', 540, 420, 120, lt, 0.0, '#fff') + ST('TOC', 540, 560, 120, lt, 0.55, '#fff') + ST('TOC', 540, 700, 120, lt, 1.1, '#fff'), lt, 3.0, { z0: 1.0, z1: 1.25, shk: 5 * Math.exp(-((lt % 0.55)) * 6) }) + PUNCH(lt % 0.55, 0.5));
  sh(65.59, 1.18, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, eye: 1.2, worry: 0.7, lookx: 1, tremble: 0.6, lid: 0 }, 540, 880, 1.25) + DARK(), 0.5);
  SN(66.69, 0.001, (t, lt, Pf) => CM(Pf, t, DOORA(Pf, t, { handle: E_(lt / 2.0) * 0.8, gap: 0.0 }), lt, 2.4, { z0: 1.0, z1: 1.7, y0: 960, y1: 1300, shk: 2 }));
  sh(69.14, 1.3, { z0: 1.0, z1: 1.4, shk: 6 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.3 }) + BEDC(Pf, t) + ALI({ t, eye: 1.3, worry: 0.6, looky: 0.8, tremble: 1 }, 540, 880, 1.25) + glow(Pf, 'B', 540, 1500, 800, 0.5) + ST('VIBROU', 540, 330, 110, lt, 0.15, '#9fd0ff'), '#9fd0ff');
  sh(70.45, 1.98, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, NOTIF('Câmera Sala', 'Nova notificação', t), 0) + PLA(Pf, 0.45), 0.5);
  sh(72.42, 2.51, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => FCA({ t, eye: 1.45, pupil: 0.55, worry: 1, tremble: 1, sweat: 1, cold: 1 }, NIGHT(Pf, t, { glowA: 0.1 }), 540, 800, 1.5) + PLA(Pf, 0.55) + ST('SANGUE GELOU', 540, 1580, 90, lt, 0.3, '#bfe0ff'), 0.6);
  sh(74.93, 3.1, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => CCTV(Pf, t, HALLC(Pf, t, {}) + FIG(540, 1330, 1.0, 0.8), { ts: '03:17:2' + Math.floor(lt % 9) }), 0.5);
  sh(78.03, 1.52, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => CCTV(Pf, t, HALLC(Pf, t, {}) + FIG(540, 1330, 1.0 + 0.3 * E_(lt / 1.8), 0.8), { ts: '03:17:3' + Math.floor(lt % 9) }) + ST('IMPOSSÍVEL', 540, 1580, 110, lt, 0.4, '#ff4a4a'), 0.7);
  sh(79.55, 1.8, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => FCA({ t, eye: 1.2, worry: 0.6, lookx: 0.4, looky: 0.8 }, NIGHT(Pf, t, { glowA: 0.1 }), 540, 800, 1.45) + PLA(Pf, 0.5), 0.5);
  /* pijama igual */
  sh(81.16, 2.39, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => CCTV(Pf, t, BIG('#10162a') + G(ALIB({ t, view: 'f' }, 0, 0, 1.0), `translate(540 1150)`) + DARK(), { ts: '03:17:4' + Math.floor(lt % 9) }) + ST('MESMO PIJAMA', 540, 330, 100, lt, 0.3, '#ffffff'), 0.7);
  sh(83.55, 1.16, { z0: 1.0, z1: 1.5, y0: 960, y1: 1100, shk: 2 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.1 }) + G(ALIB({ t, view: 'f' }, 0, 0, 1.0), `translate(540 1150)`) + PHF(800, 700, 0.5, FEED(t)) + DARK(), 0.4);
  sh(84.71, 1.73, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => FCA({ t, eye: 1.3, worry: 0.9, looky: 0.9, tremble: 0.8 }, NIGHT(Pf, t, { glowA: 0.1 }), 540, 800, 1.5) + PLA(Pf, 0.5), 0.5);
  sh(86.44, 1.89, { z0: 1.0, z1: 1.25, shk: 2 }, (t, lt, Pf) => CCTV(Pf, t, HALLC(Pf, t, {}) + FIG(540, 1330 - 30 * E_(lt / 1.5), 1.0 + 0.1 * E_(lt / 1.5), 0.8), { ts: '03:17:5' + Math.floor(lt % 9) }), 0.5);
  sh(88.33, 3.34, { z0: 1.0, z1: 2.0, x0: 540, x1: 540, y0: 960, y1: 780, shk: 2 }, (t, lt, Pf) => CCTV(Pf, t, BIG('#0a1020') + G(P('M-130,0 Q-170,-600 -110,-900 Q0,-1020 110,-900 Q170,-600 130,0Z', '#020308') + E(-36, -760 + 40 * (1 - E_(lt / 1.2)), 12, 20, '#e8f0ff') + E(36, -760 + 40 * (1 - E_(lt / 1.2)), 12, 20, '#e8f0ff'), 'translate(540 1500) scale(1.0)'), { ts: '03:17:5' + Math.floor(lt % 9) }) + ST('ELA OLHA', 540, 360, 110, lt, 0.8, '#ff4a4a'), 0.7);
  SN(91.66, 0.001, (t, lt, Pf) => CM(Pf, t, DOORA(Pf, t, { handle: 0.2 }) + G(MANO(0, 0, 1.2, 0, '#c9b7a8', 1), 'translate(540 1100) rotate(-30)') + ST('APONTA', 540, 360, 120, lt, 0.3, '#ff5a5a'), lt, 3.2, { z0: 1.0, z1: 1.3, shk: 2 }) + PUNCH(lt, 0.6));
  sh(94.41, 1.15, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, eye: 1.3, worry: 0.9, lookx: 1, tremble: 1 }, 540, 880, 1.25) + DARK() + ST('"EU SEI QUE VOCÊ', 540, 320, 70, lt, 0.5, '#ff6a6a') + ST('ESTÁ ACORDADA"', 540, 410, 70, lt, 0.9, '#ff6a6a'), 0.6);
  sh(95.57, 1.87, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => DOORA(Pf, t, { gap: 0.7, handle: 0.2 }), 0.5);
  sh(97.44, 1.87, { z0: 1.0, z1: 1.8, y0: 960, y1: 720, shk: 4 }, (t, lt, Pf) => FCA({ t, eye: 1.45, pupil: 0.5, worry: 1, tremble: 1, sweat: 1, mouth: 0 }, NIGHT(Pf, t, { glowA: 0.1 }), 540, 800, 1.5) + G(MANO(0, 0, 1.2, -90, AL.skin), `translate(${f1(540 - 70)} ${f1(1050)}) rotate(-90)`) + PLA(Pf, 0.45), 0.6);
  sh(99.31, 1.24, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => DOORA(Pf, t, { gap: 0.9, handle: 0.0 }) + ST('"NÃO DEVERIA', 540, 340, 80, lt, 0.2, '#ff6a6a') + ST('TER OLHADO"', 540, 440, 80, lt, 0.6, '#ff6a6a'), 0.6);
  /* apagao */
  SN(100.54, 0.001, (t, lt, Pf) => CM(Pf, t, HOUSEX(Pf, t, lt < 0.4 ? [0, 1, 2, 3, 4, 5] : []) + (lt < 0.4 ? '' : BIG('#000', 0.35)), lt, 2.2, { z0: 1.0, z1: 1.2, shk: 1 }) + (lt > 0.4 ? PUNCH(lt - 0.4, 0.8, '#000') : ''));
  sh(102.46, 1.93, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => BIG('#010206') + glow(Pf, 'B', 540, 1000, 800, 0.0) + FCA({ t, eye: 1.4, worry: 1, lookx: Math.sin(t * 3) }, '', 540, 800, 1.5) + R(-300, -300, 1680, 2520, '#000', OP(0.65)) + ST('TUDO ESCURO', 540, 1580, 90, lt, 0.2, '#fff'), 0.6);
  sh(104.38, 2.15, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => BIG('#030510') + PHF(540, 960, 2.4, R(-60, -150, 120, 60, '#101822') + C(0, -20, 44, 'none', 'stroke="#fff" stroke-width="8"') + P('M-60,-60 L60,60', 'none', 'stroke="#ff3a3a" stroke-width="10"') + TXS('Ligando...', 20, '#fff').replace('x="0" y="0"', 'x="-50" y="100"'), 0) + PLA(Pf, 0.4), 0.5);
  sh(106.54, 1.42, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => BIG('#030510') + PHF(540, 960, 2.4, TXS('SEM SINAL', 26, '#ff6a6a').replace('x="0" y="0"', 'x="-100" y="-20"') + P('M-60,100 L-60,60 M-20,100 L-20,30 M20,100 L20,0 M60,100 L60,-30', 'none', 'stroke="#445" stroke-width="12" stroke-linecap="round"') + P('M-90,-120 L90,130', 'none', 'stroke="#ff3a3a" stroke-width="10"'), 0) + PLA(Pf, 0.4), 0.7);
  sh(107.96, 1.87, { z0: 1.0, z1: 1.3, shk: 4 }, (t, lt, Pf) => BIG('#030510') + glow(Pf, 'B', 540, 900, 900, 0.5) + FCA({ t, eye: 1.3, worry: 0.8, looky: 0.8, tremble: 0.9 }, '', 540, 800, 1.45) + ST('ÚLTIMA NOTIFICAÇÃO', 540, 1600, 70, lt, 0.2, '#9fd0ff'), '#9fd0ff');
  sh(109.83, 2.06, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, NOTIF('Câmera Quarto', '(!) Nova imagem', t), 0) + PLA(Pf, 0.45), 0.5);
  /* camera quarto */
  sh(111.89, 3.44, { z0: 1.0, z1: 1.2, shk: 1.5 }, (t, lt, Pf) => CCTV(Pf, t, NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, back: 0, eye: 0.9, looky: 0.8 }, 540, 880, 1.2) + DARK(), { cam: 'CAM 04 · QUARTO', ts: '03:19:1' + Math.floor(lt % 9) }) + ST('IMPOSSÍVEL', 540, 330, 110, lt, 0.6, '#ff4a4a'), 0.6);
  sh(115.33, 1.5, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => FCA({ t, eye: 1.3, worry: 0.8 }, NIGHT(Pf, t, { glowA: 0.05 }), 540, 800, 1.5) + R(-300, -300, 1680, 2520, '#000', OP(0.4)), 0.5);
  sh(116.84, 1.85, { z0: 1.0, z1: 1.2, shk: 1.5 }, (t, lt, Pf) => CCTV(Pf, t, NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, back: 1 }, 540, 1000, 1.2) + DARK() + PHF(540, 1330, 0.7, FEED(t)), { cam: 'CAM 04 · QUARTO', ts: '03:19:3' + Math.floor(lt % 9) }), 0.5);
  sh(118.69, 2.32, { z0: 1.0, z1: 1.35, y0: 960, y1: 760, shk: 3 }, (t, lt, Pf) => CCTV(Pf, t, NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, back: 1 }, 540, 1000, 1.2) + FIG(740, 1450, 1.5, 0.9) + DARK(), { cam: 'CAM 04 · QUARTO', ts: '03:19:4' + Math.floor(lt % 9) }) + ST('ALGUÉM ATRÁS', 540, 360, 100, lt, 0.5, '#ff4a4a'), 0.7);
  sh(120.95, 0.94, { z0: 1.2, z1: 1.0, shk: 7 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, eye: 1.4, worry: 1, lookx: -1, tremble: 1 }, 540, 880, 1.25) + DARK(), 0.9);
  sh(121.89, 1.82, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + R(-300, 600, 1680, 40, '#000', OP(0)) + DARK() + ST('NINGUÉM', 540, 900, 150, lt, 0.2, '#ffffff'), 0.4);
  sh(123.71, 1.73, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => FCA({ t, eye: 1.2, worry: 0.7, looky: 0.8 }, NIGHT(Pf, t, { glowA: 0.05 }), 540, 800, 1.5) + PLA(Pf, 0.5), 0.5);
}
