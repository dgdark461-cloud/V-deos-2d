/* scenes_c.js - 86.5 s ao fim */
function partF(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const SF = (Pf, t, o) => suitF(o, 540, 1000, 2.6);
  /* 86.51 o homem continua / 87.34 não precisa devolver tudo / 88.57 só quero uma coisa */
  SN(sg(57), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.2 * Math.abs(Math.sin(t * 7)), smile: 0.3 }, 540, 1000, 2.5), lt, 0.8, 1.0, 1.1, 540, 1000, 1));
  SN(sg(58), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + billStack(240, 150) + G(billStack(260, 160), 'translate(540 1100)') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.3 * Math.abs(Math.sin(t * 8)) }, 540, 800, 1.8) + glow(Pf, 'A', 540, 1300, 400, 0.2), lt, 1.2, 1.0, 1.1, 540, 1000, 1));
  SN(sg(59), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.25 * Math.abs(Math.sin(t * 8)), anger: 0.2 }, 540, 1000, 2.7) + qmarks(t, 540, 420, 300, 2, '#d8d8e8'), lt, 2.0, 1.0, 1.15, 540, 1000, 1));
  /* 90.6 você pergunta o quê */
  SN(sg(60), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#e8e0d0') + HF(t, { eye: 1, pupil: 0.4, worry: 0.7, mouth: 0.5 * Math.abs(Math.sin(t * 8)) }, 540, 1000, 2.6), lt, 0.6, 1.0, 1.1, 540, 1000, 1));
  /* 91.25 ele responde / 92.09 a fotografia */
  SN(sg(61), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0, smile: 0.2 }, 540, 1000, 2.5), lt, 0.8, 1.0, 1.1, 540, 1000, 1));
  SN(sg(62), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + photoM(Pf, 540, 1000, 2.1, 4) + glow(Pf, 'A', 540, 1000, 700, 0.25), lt, 0.8, 1.0, 1.2, 540, 1000, 3));
  /* 92.92 abre a maleta imediatamente */
  SN(sg(63), 0.03, (t, lt, Pf) => { const u = ez(lt / 0.4); return FZ(Pf, t, RM(Pf, t, { mode: 'morning' }) + caseM(Pf, 540, 1550, 1.5, { open: u, t }), lt, 1.8, 1.0, 1.15, 540, 1200, 2); });
  /* 94.93 entre os maços / 96.24 pequeno compartimento */
  SN(sg(64), 0.03, (t, lt, Pf) => { let s = BGR('#143a28') + goldFlash(Pf, 0.5, 540, 900); for (let r = 0; r < 3; r++) for (let q = 0; q < 5; q++) s += G(billStack(170, 100), `translate(${150 + q * 195} ${900 + r * 130})`); s += HAND(300 + 80 * Math.sin(t * 3), 1500, 2.2, '#e0ac86', 20); return FZ(Pf, t, s, lt, 1.3, 1.0, 1.1, 540, 1000, 1); });
  SN(sg(65), 0.03, (t, lt, Pf) => { const u = ez(lt / 1.0); let s = BGR('#143a28') + R(120, 700, 840, 700, '#1a1c20', 'rx="14"') + R(200 - 0, 800, 680, 500, '#2e3238', 'rx="10"') + R(300, 900, 480, 300, '#0a0c10', OP(u), 'rx="10"') + R(300, 900, 480, 20, '#fff', OP(0.15 * u)) + glow(Pf, 'W', 540, 1050, 300 * u, 0.4 * u); return FZ(Pf, t, s, lt, 3.0, 1.0, 1.22, 540, 1050, 1); });
  /* 99.32 está vazio */
  SN(sg(66), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141a') + R(180, 700, 720, 700, '#0a0c10', 'rx="14" stroke="#3a4048" stroke-width="16"') + hint(540, 1400, 'VAZIO', 150, '#e04040', OP(ez(lt / 0.3))), lt, 0.9, 1.0, 1.18, 540, 1050, 3));
  /* 100.25 entende / 103.78 alguém retirou */
  SN(sg(67), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#e8e0d0') + HF(t, { eye: 1, pupil: 0.3, worry: 1, mouth: 0.1, sweat: 1 }, 540, 1000, 2.7) + photoM(Pf, 880, 360, 0.8, 8), lt, 3.5, 1.0, 1.18, 540, 1000, 1));
  SN(sg(68), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141a') + G(HAND(0, 0, 3.4, '#d8b090', 0) + photoM(Pf, 0, -40, 0.7, 0), 'translate(780 1700)') + R(120, 600, 420, 700, '#0a0c10', 'rx="14"') + eyesPair(Pf, 330, 900, 0.5, '#fff', 0.2, 20), lt, 1.7, 1.0, 1.1, 540, 1000, 1));
  /* 105.51 naquela noite: sai de casa com maleta */
  SN(sg(69), 0.03, (t, lt, Pf) => FZ(Pf, t, hallM(Pf, t) + doorM(540, 1300, 1.8), lt, 0.7, 1.0, 1.06, 540, 1000, 1));
  SN(sg(70), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'night' }) + doorM(850, 1500, 1.2) + WLK(t, lt, 100, 700, 1560, 2.0, 1.1, { bag: 1, holdNear: caseM(Pf, 0, 150, 0.28, {}) }), lt, 2.1, 1.0, 1.08, 540, 1100, 1));
  /* 108.57 quando abre a porta: porta abre, corredor iluminado */
  SN(sg(72), 0.03, (t, lt, Pf) => FZ(Pf, t, hallM(Pf, t, { light: 0.6 }) + doorM(540, 1300, 1.8, ez(lt / 0.8)) + glow(Pf, 'A', 540, 900, 600, 0.4 * ez(lt / 0.8)), lt, 1.1, 1.0, 1.15, 540, 1100, 2));
  /* 109.73 homem sentado no corredor */
  SN(sg(73), 0.03, (t, lt, Pf) => { let s = hallM(Pf, t) + G(R(-20, -160, 40, 160, '#2a1c12') + R(-120, -170, 240, 20, '#5a3e2a'), 'translate(540 1500) scale(1.5)'); s += G(suitF({ t, eye: 1, pupil: 0.5, mouth: 0, smile: 0.3 }, 0, 0, 0.62), 'translate(540 960)') + R(300, 1100, 480, 420, '#23293a', OP(0.0)); return FZ(Pf, t, s + goldFlash(Pf, 0.0), lt, 1.8, 1.0, 1.18, 540, 1100, 1); });
  /* 111.64 ele não está armado / 112.52 não grita */
  SN(sg(74), 0.03, (t, lt, Pf) => FZ(Pf, t, hallM(Pf, t) + G(suitFig({ t, view: 'f', stride: 0, arms: [[8, 10], [-8, 10]], mouth: 0 }), 'translate(540 1650) scale(1.5)') + HAND(300, 1000, 1.4, '#d8b090', 0) + HAND(780, 1000, 1.4, '#d8b090', 0), lt, 0.9, 1.0, 1.1, 540, 1100, 1));
  SN(sg(75), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0, smile: 0.3 }, 540, 1000, 2.6), lt, 1.0, 1.0, 1.12, 540, 1000, 1));
  /* 112.88 apenas segura uma fotografia sua (do trilheiro) */
  SN(sg(76), 0.03, (t, lt, Pf) => { let s = hallM(Pf, t) + G(HF(t, { eye: 1, pupil: 0.5 }, 0, 0, 0.22), 'translate(540 960)'); s = BGR('#2a2a38') + G(R(-210, -240, 420, 480, '#f4f0e6', 'rx="8"') + R(-186, -216, 372, 360, '#8ab0d8') + G(hikerFig({ t, view: 'f', stride: 0 }), 'translate(0 150) scale(0.32)'), 'translate(540 960) scale(2.2) rotate(-3)') + HAND(300, 1500, 2.6, '#d8b090', 30) + HAND(780, 1500, 2.6, '#d8b090', -30); return FZ(Pf, t, s, lt, 2.4, 1.0, 1.15, 540, 1000, 1); });
  /* 115.27 tirada naquela mesma manhã: sol da manhã */
  SN(sg(77), 0.03, (t, lt, Pf) => FZ(Pf, t, skyM(Pf, 'morning', 900) + R(-600, 900, 2280, 1500, '#a0a090') + G(R(-210, -240, 420, 480, '#f4f0e6', 'rx="8"') + R(-186, -216, 372, 360, '#8ab0d8') + G(hikerFig({ t, view: 'f', stride: 0 }), 'translate(0 150) scale(0.32)'), 'translate(540 900) scale(1.8) rotate(4)') + glow(Pf, 'A', 800, 300, 400, 0.6), lt, 1.3, 1.0, 1.1, 540, 1000, 1));
  /* 116.64 você tem duas opções: dois caminhos */
  SN(sg(78), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.25 * Math.abs(Math.sin(t * 7)) }, 540, 1000, 2.6) + hint(300, 400, '1', 200, '#f2c030') + hint(800, 400, '2', 200, '#f2c030'), lt, 2.0, 1.0, 1.1, 540, 1000, 1));
  /* 118.63 pode me entregar a maleta / 120.92 ou pode descobrir por quê */
  SN(sg(80), 0.03, (t, lt, Pf) => { const u = ez(lt / 1.0); return FZ(Pf, t, hallM(Pf, t) + caseM(Pf, H.lerp(300, 780, u), 1500, 1.0, { t }) + HAND(H.lerp(200, 900, u), 1700, 2.2, '#d8b090', 30), lt, 2.2, 1.0, 1.1, 540, 1100, 1); });
  SN(sg(81), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.2 * Math.abs(Math.sin(t * 7)) }, 540, 1000, 2.5) + qmarks(t, 540, 420, 320, 3, '#d8d8e8'), lt, 2.5, 1.0, 1.15, 540, 1000, 1));
  /* 123.66 você pergunta quem são eles */
  SN(sg(82), 0.03, (t, lt, Pf) => FZ(Pf, t, hallM(Pf, t) + HF(t, { eye: 1, pupil: 0.4, worry: 0.8, mouth: 0.4 * Math.abs(Math.sin(t * 8)) }, 540, 1000, 2.6), lt, 1.5, 1.0, 1.1, 540, 1000, 1));
  /* 125.24 o homem sorri */
  SN(sg(83), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.1, smile: 1 }, 540, 1000, 2.8) + glow(Pf, 'R', 540, 900, 500, 0.15), lt, 0.7, 1.0, 1.2, 540, 1000, 1));
  /* 125.94 dez milhões não são o pagamento. 127.9 são o teste */
  SN(sg(84), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#143a28') + goldFlash(Pf, 0.5, 540, 900) + hint(540, 900, '10.000.000', 130, '#ffe9a0') + hint(540, 1100, 'NÃO É O PAGAMENTO', 70, '#fff') + moneyFly(t, 8, 0.7, 43), lt, 1.9, 1.0, 1.1, 540, 960, 1));
  SN(sg(85), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + hint(540, 1000, 'O TESTE', 190, '#f2c030') + glow(Pf, 'R', 540, 900, 600, 0.3 + 0.2 * Math.sin(t * 8)), lt, 0.8, 1.0, 1.25, 540, 960, 4));
  /* 128.7 antes que consiga responder / 130.04 coloca outro envelope e vai embora */
  SN(sg(86), 0.03, (t, lt, Pf) => FZ(Pf, t, hallM(Pf, t) + HF(t, { eye: 1, pupil: 0.4, worry: 0.9, mouth: 0.3, sweat: 1 }, 540, 1000, 2.6), lt, 1.3, 1.0, 1.1, 540, 1000, 1));
  SN(sg(87), 0.03, (t, lt, Pf) => { const u = lt / 2.2; return FZ(Pf, t, hallM(Pf, t) + envM(300, 1550, 0.7, -5, 0) + G(suitFig({ t, view: 's', walk: u * 2.2 * 1.0, stride: 0.8, flip: 1 }), `translate(${f1(H.lerp(500, 1300, u))} 1500) scale(1.1)`), lt, 2.2, 1.0, 1.08, 540, 1100, 1); });
  /* 132.31 dentro, lista com dez nomes */
  SN(sg(88), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + envM(540, 1000, 1.6, 0, ez(lt / 0.5)) + listM(540, 1100, 0.5 + 0.5 * ez(lt / 0.8), 0, [], {}), lt, 1.7, 1.0, 1.12, 540, 1000, 1));
  /* 134.06 o seu é o último */
  SN(sg(89), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + listM(540, 1000, 2.0, 0, []) + R(120, 1330, 840, 80, '#f2c030', OP(0.5 + 0.3 * Math.sin(t * 8)), 'rx="10"'), lt, 1.4, 1.0, 1.15, 540, 1250, 1));
  /* 135.43 ao lado de cada nome / 137.91 DEVOLVEU ou ROUBOU */
  SN(sg(90), 0.03, (t, lt, Pf) => { const n = Math.min(9, Math.floor(lt * 5)), mk = []; for (let i = 0; i < n; i++) mk[i] = 1; return FZ(Pf, t, BGR('#d8c8a0') + listM(540, 1000, 2.0, 0, mk), lt, 2.5, 1.0, 1.1, 540, 1000, 1); });
  SN(sg(92), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + hint(300, 800, 'DEVOLVEU', 80, '#3ac060') + hint(780, 1100, 'ROUBOU', 110, '#e04040') + moneyFly(t, 6, 0.5, 47), lt, 1.2, 1.0, 1.15, 540, 960, 2));
  /* 139.15 os nove primeiros ROUBOU */
  SN(sg(93), 0.03, (t, lt, Pf) => { const mk = []; for (let i = 0; i < 9; i++) mk[i] = 1; return FZ(Pf, t, BGR('#d8c8a0') + listM(540, 1000, 2.0, 0, mk), lt, 2.6, 1.0, 1.1, 540, 1000, 1); });
  /* 141.77 detalhe embaixo da lista */
  SN(sg(94), 0.03, (t, lt, Pf) => { const mk = []; for (let i = 0; i < 9; i++) mk[i] = 1; return FZ(Pf, t, BGR('#d8c8a0') + listM(540, 1000, 2.0, 0, mk) + glow(Pf, 'R', 540, 1500, 400, 0.4 + 0.2 * Math.sin(t * 6)), lt, 2.7, 1.0, 1.3, 540, 1450, 1); });
  /* 144.47 todos desapareceram sete dias depois: silhuetas somem */
  SN(sg(95), 0.03, (t, lt, Pf) => { let s = BGR('#23293a') + glow(Pf, 'A', 540, 900, 700, 0.2); for (let i = 0; i < 9; i++) { const f = ez(H.prog(lt, 0.2 + i * 0.3, 0.8 + i * 0.3)); s += G(E(0, -150, 36, 40, '#d8d8e8') + P('M-52,-90 Q0,-120 52,-90 L60,60 L-60,60Z', '#d8d8e8'), `translate(${130 + (i % 5) * 200} ${i < 5 ? 700 : 1100}) scale(1.2)`, OP(1 - f)); } s += hint(540, 1550, '7 DIAS', 160, '#f2c030'); return FZ(Pf, t, s, lt, 3.8, 1.0, 1.12, 540, 1000, 1); });
  /* 148.32 canto do papel: data */
  SN(sg(96), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + listM(540, 1000, 2.0, 0, [1, 1, 1, 1, 1, 1, 1, 1, 1]) , lt, 1.5, 1.2, 1.0, 900, 1500, 1));
  SN(sg(98), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + calM(540, 1000, 1.9 + 0.1 * ez(lt / 0.8)), lt, 0.9, 1.0, 1.15, 540, 1000, 2));
  /* 150.51 Amanhã. */
  SN(sg(99), 0.01, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + hint(540, 1000, 'AMANHÃ', 220, '#f2c030') + glow(Pf, 'R', 540, 900, 700, 0.3 + 0.2 * Math.sin(t * 10)), lt, 0.5, 1.0, 1.25, 540, 960, 6));
  /* 150.94 Seu sétimo dia. */
  SN(sg(100), 0.02, (t, lt, Pf) => FZ(Pf, t, BGR('#12141f') + HF(t, { eye: 1, pupil: 0.2, worry: 1, sweat: 1, mouth: 0, tremble: 2 }, 540, 1000, 2.8) + calM(880, 360, 0.7), lt, 1.0, 1.0, 1.2, 540, 1000, 3) + FB('#000', 0.7 * H.prog(lt, 0.4, 1.0)));
}
