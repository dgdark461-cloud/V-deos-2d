/* scenes_c.js - Alice 125 a 180 s */
function partF(c) {
  const { sh, SN, ST, E_ } = MK(c);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  mb(164.01, 164.36); mb(141.59, 142.25);
  sh(125.44, 1.01, { z0: 1.0, z1: 1.4, shk: 3 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, FEED(t * 2) , 0) + PLA(Pf, 0.45), 0.5);
  sh(126.16, 2.87, { z0: 1.0, z1: 1.9, y0: 960, y1: 800, shk: 2 }, (t, lt, Pf) => CCTV(Pf, t, HALLC(Pf, t, {}) + FIG(540, 1330 + 90 * E_(lt / 2.8), 1.0 + 0.9 * E_(lt / 2.8), 0.8), { ts: '03:19:5' + Math.floor(lt % 9) }) + ST('MAIS PERTO', 540, 340, 110, lt, 0.4, '#ff4a4a'), 0.6);
  sh(129.03, 1.15, { z0: 1.0, z1: 1.5, shk: 4 }, (t, lt, Pf) => CCTV(Pf, t, BIG('#0a1020') + ALI({ t, eye: 1.0, smile: 0, worry: 0 }, 540, 900, 1.6) + DARK(), { cam: 'CAM 02 · SALA', ts: '03:20:0' + Math.floor(lt % 9) }) + ST('ERA ALICE', 540, 320, 120, lt, 0.4, '#ff4a4a'), 0.8);
  sh(130.18, 2.2, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => FCA({ t, eye: 1.45, pupil: 0.5, worry: 1, tremble: 1, sweat: 1 }, NIGHT(Pf, t, { glowA: 0.05 }), 540, 800, 1.5) + PLA(Pf, 0.5), 0.6);
  sh(132.38, 2.7, { z0: 1.0, z1: 2.0, y0: 960, y1: 800, shk: 1.5 }, (t, lt, Pf) => CCTV(Pf, t, BIG('#0a1020') + ALI({ t, eye: 1.0, smile: E_(lt / 1.0), worry: 0 }, 540, 900, 1.6) + DARK(), { cam: 'CAM 02 · SALA', ts: '03:20:1' + Math.floor(lt % 9) }) + ST('SORRINDO', 540, 340, 120, lt, 0.9, '#ff4a4a'), 0.8);
  sh(135.08, 1.96, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, NOTIF('Número desconhecido', 'Mensagem nova', t), 0) + PLA(Pf, 0.45), '#9fd0ff');
  sh(137.04, 2.15, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, R(-100, -200, 200, 120, '#14202a') + ST('', 0, 0, 1, lt), 0) + PLA(Pf, 0.45) + ST('"NÃO ABRA', 540, 800, 80, lt, 0.2, '#ffffff') + ST('A PORTA"', 540, 900, 80, lt, 0.6, '#ffffff'), 0.4);
  sh(139.19, 2.41, { z0: 1.0, z1: 1.5, y0: 960, y1: 760, shk: 3 }, (t, lt, Pf) => FCA({ t, eye: 1.2, worry: 1, tear: 1, mouth: 0.4, tremble: 1 }, NIGHT(Pf, t, { glowA: 0.05 }), 540, 800, 1.5) + PLA(Pf, 0.5), 0.5);
  SN(141.59, 0.001, (t, lt, Pf) => CM(Pf, t, DOORA(Pf, t, { knock: Math.max(0, Math.sin(lt * 7)) }) + ST('TOC TOC', 540, 420, 120, lt, 0.0, '#fff'), lt, 2.0, { z0: 1.0, z1: 1.3, shk: 6 * Math.exp(-lt * 3) }) + PUNCH(lt, 0.8));
  sh(143.86, 1.3, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + ALI({ t, eye: 1.2, worry: 0.9, lookx: 1 }, 540, 880, 1.25) + DARK(), 0.5);
  sh(145.17, 2.53, { z0: 1.0, z1: 1.35, shk: 2 }, (t, lt, Pf) => DOORA(Pf, t, { gap: 0.7 }) + ST('"FILHA, ABRE', 540, 360, 80, lt, 0.4, '#ffd0a0') + ST('A PORTA. SOU EU."', 540, 460, 80, lt, 0.9, '#ffd0a0'), 0.5);
  sh(147.7, 1.26, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.1 }) + BEDC(Pf, t) + ALI({ t, eye: 1.2, worry: 0.9, looky: 0.2 }, 540, 880, 1.25) + DARK() + G(R(-30, 0, 60, 300, AL.skin, 'rx="26"'), 'translate(300 900) rotate(-30)'), 0.5);
  sh(148.96, 2.24, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, NOTIF('Número desconhecido', 'Mensagem nova', t), 0) + PLA(Pf, 0.45), '#9fd0ff');
  sh(151.2, 2.55, { z0: 1.0, z1: 1.2, shk: 1.5 }, (t, lt, Pf) => BIG('#05070e') + PHF(540, 960, 2.4, R(-100, -200, 200, 120, '#14202a'), 0) + PLA(Pf, 0.45) + ST('"QUEM ESTÁ', 540, 780, 80, lt, 0.3, '#ffffff') + ST('DORMINDO NO', 540, 880, 80, lt, 0.8, '#ffffff') + ST('QUARTO DELA?"', 540, 980, 80, lt, 1.3, '#ff6a6a'), 0.5);
  sh(153.75, 1.81, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => HALLC(Pf, t, { light: 0 }) + R(0, 0, 1080, 1920, '#000', OP(0.3)), 0.5);
  sh(155.56, 1.75, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => DOORA(Pf, t, { gap: 0.6 }) + R(0, 0, 1080, 1920, '#000', OP(0.2)), 0.5);
  /* duas opcoes */
  sh(157.31, 1.68, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + DARK() + ST('ABRIR?', 540, 700, 150, lt, 0.1, '#ffffff') + ST('OU', 540, 900, 80, lt, 0.7, '#ff6a6a') + ST('ESCONDER?', 540, 1100, 150, lt, 1.2, '#ffffff'), 0.5);
  sh(158.98, 1.8, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => DOORA(Pf, t, { gap: 0.5 }), 0.4);
  sh(160.79, 3.23, { z0: 1.0, z1: 1.3, shk: 1.5 }, (t, lt, Pf) => NIGHT(Pf, t, { glowA: 0.0 }) + BEDC(Pf, t) + R(-300, 860, 1680, 700, '#2a3c66', OP(0.6)) + ALI({ t, back: 1, lid: 0 }, 540, 1020, 1.1) + DARK() + FIG(850, 1650, 1.0, 0.5), 0.4);
  SN(164.01, 0.001, (t, lt, Pf) => CM(Pf, t, DOORA(Pf, t, { handle: E_(lt / 1.5) * 0.9 }), lt, 3.1, { z0: 1.0, z1: 1.6, y0: 960, y1: 1300, shk: 3 }) + PUNCH(lt, 0.8));
  sh(166.84, 1.84, { z0: 1.0, z1: 1.5, shk: 3 }, (t, lt, Pf) => FCA({ t, eye: 1.45, worry: 1, tremble: 1, sweat: 1, lookx: 0.8 }, NIGHT(Pf, t, { glowA: 0.0 }), 540, 800, 1.5) + DARK(), 0.6);
  sh(168.68, 1.5, { z0: 1.0, z1: 1.6, x0: 540, x1: 540, y0: 960, y1: 700, shk: 3 }, (t, lt, Pf) => FCA({ t, eye: 1.3, worry: 1, lookx: 0, tremble: 1 }, NIGHT(Pf, t, { glowA: 0.0 }), 540, 800, 1.5) + FIG(940, 700, 2.4, 0.9) + DARK(), 0.7);
  sh(170.17, 3.27, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => DCLK('03:17', 540, 900, 2.0, t, '#ff3a3a') + ST('ATÉ AS 3:18', 540, 1400, 100, lt, 0.5, '#ff4a4a'), 0.8);
  /* CTA */
  sh(173.45, 3.26, { z0: 1.0, z1: 1.1, shk: 1 }, (t, lt, Pf) => BIG('#05070e') + glow(Pf, 'B', 540, 900, 900, 0.3) + G(R(-300, -80, 600, 160, '#7a1a1a', 'rx="30"') + TXS('ABRIR A PORTA', 46, '#fff').replace('x="0" y="0"', 'x="-220" y="16"'), `translate(540 ${f1(760 + 6 * Math.sin(t * 4))})`) + G(R(-300, -80, 600, 160, '#1a3a6a', 'rx="30"') + TXS('SE ESCONDER', 46, '#fff').replace('x="0" y="0"', 'x="-190" y="16"'), `translate(540 ${f1(1080 + 6 * Math.sin(t * 4 + 2))})`) + ST('O QUE ELA FAZ?', 540, 480, 100, lt, 0.2, '#ffffff'), 0.5);
  SN(176.71, 0.001, (t, lt, Pf) => CM(Pf, t, BIG('#05070e') + glow(Pf, 'B', 540, 900, 900, 0.35) + ALI({ t, eye: 1.1, worry: 0.7 }, 540, 860, 1.3) + ST('COMENTE', 540, 1500, 130, lt, 0.2, '#ffffff') + ST('A DECISÃO DELA', 540, 1640, 80, lt, 0.5, '#ffd0a0'), lt, 3.4, { z0: 1.0, z1: 1.15, shk: 1 }));
}
