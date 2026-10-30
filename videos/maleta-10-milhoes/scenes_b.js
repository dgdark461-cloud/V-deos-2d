/* scenes_b.js - 40.7 a ~92 s */
const RM = (Pf, t, o) => roomM(Pf, t, o);
const sofaGlow = (Pf, a = 0.5) => glow(Pf, 'A', 540, 700, 800, a);
function partE(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  /* 40.73 naquela noite: janela noturna, cidade */
  SN(sg(26), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'night' }) + bedM(400, 1500, 1.5) + winM(Pf, 800, 620, 1.3, 'night'), lt, 1.0, 1.0, 1.1, 540, 1000, 1));
  /* 41.7 quase não consegue dormir: deitado, olhos abertos, relógio */
  SN(sg(27), 0.03, (t, lt, Pf) => { let s = RM(Pf, t, { mode: 'night' }) + bedM(540, 1550, 1.45) + HF(t, { eye: 1, pupil: 0.4, worry: 0.4, mouth: 0, looky: -6, tilt: 70 }, 330, 1250, 0.8) + clockM(880, 500, 0.9, 2.5 + lt * 0.01, 5.5 + lt * 0.2); return FZ(Pf, t, s, lt, 1.1, 1.0, 1.1, 540, 1100, 1); });
  /* 42.78 pela primeira vez na vida: respiro, alívio, sorriso */
  SN(sg(28), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'night' }) + HF(t, { eye: 1, pupil: 0.5, worry: 0, mouth: 0.1, smile: 1, looky: -8 }, 540, 1000, 2.6) + glow(Pf, 'A', 540, 800, 600, 0.3), lt, 1.4, 1.0, 1.12, 540, 1000, 1));
  /* 44.22 aluguel / 46.59 contas / trabalho: contas voam e somem */
  SN(sg(29), 0.03, (t, lt, Pf) => { let s = BGR('#2a3350') + glow(Pf, 'A', 540, 900, 700, 0.2); const f = ez(H.prog(lt, 0.8, 2.2)); s += billP(H.lerp(540, 1300, f), 900 - 250 * f, 1.8, -8 + 40 * f, 'ALUGUEL') + HF(t, { eye: 1, pupil: 0.5, worry: 0, smile: 1 }, 540, 1450, 1.4); return FZ(Pf, t, s, lt, 2.3, 1.0, 1.1, 540, 1000, 1); });
  SN(sg(30), 0.03, (t, lt, Pf) => { let s = BGR('#2a3350') + glow(Pf, 'A', 540, 900, 700, 0.2); const f = ez(H.prog(lt, 0.5, 1.2)); s += billP(H.lerp(300, -300, f), 800 - 200 * f, 1.4, -10 - 40 * f, 'LUZ', '#e8f0d8') + billP(H.lerp(780, 1400, f), 800 - 200 * f, 1.4, 10 + 40 * f, 'ÁGUA', '#d8e8f4') + HF(t, { eye: 1, pupil: 0.5, smile: 1 }, 540, 1450, 1.4); return FZ(Pf, t, s, lt, 1.1, 1.0, 1.1, 540, 1000, 1); });
  /* 47.72 casa enorme */
  SN(sg(31), 0.03, (t, lt, Pf) => FZ(Pf, t, skyM(Pf, 'day', 900) + R(-600, 900, 2280, 1500, '#58a858') + houseM(540, 1250, 2.4) + HF(t, { eye: 1, pupil: 0.5, smile: 1 }, 180, 1650, 0.9) + glow(Pf, 'A', 540, 700, 700, 0.3), lt, 2.9, 1.0, 1.15, 540, 1100, 1));
  /* 50.59 carros de luxo */
  SN(sg(32), 0.03, (t, lt, Pf) => { const u = lt / 2.9; return FZ(Pf, t, skyM(Pf, 'day', 900) + R(-600, 900, 2280, 1500, '#4a4e58') + carLux(H.lerp(-300, 1400, u), 1250, 1.3, '#e0b030') + carLux(H.lerp(-900, 900, u), 1650, 1.5, '#c03030') + glow(Pf, 'A', 540, 800, 500, 0.25), lt, 2.9, 1.0, 1.08, 540, 1100, 1); });
  /* 53.48 mas existe um problema */
  SN(sg(33), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'night' }) + HF(t, { eye: 1, pupil: 0.4, worry: 0.8, mouth: 0, lookx: 18, sweat: 1 }, 540, 1000, 2.6) + qmarks(t, 540, 400, 300, 3), lt, 0.6, 1.0, 1.12, 540, 1000, 2));
  /* 54.05 não pode depositar dez milhões: banco + alarme */
  SN(sg(34), 0.03, (t, lt, Pf) => { const al = 0.5 + 0.5 * Math.sin(t * 9); let s = BGR('#dcd8cc') + G(R(-330, -420, 660, 420, '#e8e4d6') + POLY([[-380, -420], [0, -600], [380, -420]], '#8a8a96') + [-220, -80, 80, 220].map(x => R(x - 22, -400, 44, 400, '#c8c4b4')).join('') + TX(0, -440, 'BANCO', 70, '#2a2d38'), 'translate(540 1250)') + G(billStack(260, 160), 'translate(540 1650)'); s += glow(Pf, 'R', 540, 800, 500 + 200 * al, 0.35 * al) + G(P('M0,-120 Q80,-120 80,-30 L80,30 L-80,30 L-80,-30 Q-80,-120 0,-120Z', '#d03030') + R(-30, 40, 60, 22, '#d03030', 'rx="10"'), `translate(540 560) rotate(${f1(8 * Math.sin(t * 20))}) scale(1.8)`); return FZ(Pf, t, s, lt, 3.1, 1.0, 1.12, 540, 1000, 2 + 2 * al); });
  /* 57.2 decide esconder: guarda-roupa/colchão */
  SN(sg(35), 0.03, (t, lt, Pf) => { const o = ez(H.prog(lt, 0.4, 1.0)); return FZ(Pf, t, RM(Pf, t, { mode: 'night' }) + wardM(780, 1450, 1.4, o) + (lt < 2 ? G(caseM(Pf, 0, 0, 0.55, {}), `translate(${f1(H.lerp(300, 700, ez(H.prog(lt, 1.0, 2.2))))} ${f1(H.lerp(1500, 1320, ez(H.prog(lt, 1.0, 2.2))))})`) : '') + WLK(t, lt, 100, 400, 1560, 1.5, 1.0, { bag: 0, holdNear: caseM(Pf, 0, 150, 0.25, {}) }), lt, 3.9, 1.0, 1.1, 540, 1100, 1); });
  /* 61.18 na manhã seguinte */
  SN(sg(36), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'morning', win: 1 }) + bedM(400, 1500, 1.5) + winM(Pf, 800, 620, 1.3, 'morning') + glow(Pf, 'A', 800, 620, 700, 0.5), lt, 0.95, 1.0, 1.08, 540, 1000, 1));
  /* 62.16 envelope debaixo da porta */
  SN(sg(37), 0.03, (t, lt, Pf) => { const u = ez(lt / 1.2); let s = hallM(Pf, t) + R(-600, 1230, 2280, 30, '#2a2018') + doorM(540, 1300, 1.8) + envM(540, H.lerp(1290, 1380, u), 0.75 * (0.4 + 0.6 * u), 0, 0) + R(300, 1300, 480, 30, '#f8e4a0', OP(0.35)); return FZ(Pf, t, s, lt, 1.8, 1.0, 1.18, 540, 1200, 1); });
  /* 64.01 dentro / 64.23 fotografia da maleta */
  SN(sg(38), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + envM(540, 1000, 1.7, 0, ez(lt / 0.5)) + HAND(780, 1600, 2.4, '#e0ac86', -30), lt, 0.6, 1.0, 1.1, 540, 1000, 1));
  SN(sg(39), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + photoM(Pf, 540, 1000, 2.0, -3) + HAND(240, 1500, 2.2, '#e0ac86', 30), lt, 2.2, 1.0, 1.15, 540, 1000, 1));
  /* 66.49 no verso: frase manuscrita */
  SN(sg(40), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + photoM(Pf, 540, 1000, 2.0, 2, { back: 1 }) + [0, 1].map(i => P(`M300,${860 + i * 90} q40,-30 80,0 t80,0 t80,0 t80,0 t80,0`, 'none', 'stroke="#2a2d38" stroke-width="7" opacity="0.8"')).join(''), lt, 1.0, 1.0, 1.1, 540, 1000, 1));
  SN(sg(42), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#d8c8a0') + R(80, 480, 920, 920, '#f4f0e6', 'rx="10"') + TX(540, 820, 'VOCÊ FEZ A', 100, '#2a2d38', 'font-style="italic"') + TX(540, 940, 'ESCOLHA', 100, '#2a2d38') + TX(540, 1100, 'ERRADA.', 150, '#c03030', OP(ez(H.prog(lt, 0.6, 1.0)))), lt, 1.3, 1.0, 1.15, 540, 1000, 1));
  /* 69.5 estômago gela */
  SN(sg(43), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#2a3a5a') + goldFlash(Pf, 0.0) + HF(t, { eye: 1, pupil: 0.25, worry: 1, sweat: 1, mouth: 0.15, cold: 0.5, tremble: 2 }, 540, 1000, 2.7), lt, 0.9, 1.0, 1.15, 540, 1000, 3));
  /* 70.4 fechaduras */
  SN(sg(44), 0.03, (t, lt, Pf) => { let s = hallM(Pf, t) + doorM(540, 1300, 2.0) + G(C(0, 0, 42, '#b8bcc4') + C(0, 0, 14, '#15171b') + R(-10, 14, 20, 40, '#15171b'), 'translate(780 1020) scale(1.5)'); return FZ(Pf, t, s, lt, 1.3, 1.0, 1.22, 700, 1050, 1); });
  SN(sg(45), 0.03, (t, lt, Pf) => { const ck = ez(H.prog(lt, 0.3, 0.7)); return FZ(Pf, t, hallM(Pf, t) + doorM(540, 1300, 2.0) + checkMark(540, 900, 300, ck, '#3ac060'), lt, 0.8, 1.0, 1.1, 540, 1000, 1); });
  /* 72.54 segunda regra */
  SN(sg(46), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#23293a') + hint(540, 740, '2', 560, '#f2c030') + hint(540, 1100, 'REGRA', 130, '#fff'), lt, 1.0, 1.0, 1.15, 540, 960, 3));
  /* 73.56 não conte a ninguém: dedo nos lábios */
  SN(sg(47), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#23293a') + HF(t, { eye: 1, pupil: 0.5, worry: 0.3, mouth: 0 }, 540, 1000, 2.6) + HAND(540, 1180, 2.3, '#e0ac86', 0), lt, 1.5, 1.0, 1.12, 540, 1000, 1));
  /* 75.12 quem está procurando / até onde pode ir: sombras */
  SN(sg(48), 0.03, (t, lt, Pf) => { let s = bgS2(Pf, t, 'night') + G(E(0, -150, 40, 44, '#0a0b10') + P('M-60,-90 Q0,-120 60,-90 L70,300 L-70,300Z', '#0a0b10'), 'translate(300 1500) scale(1.8)') + G(E(0, -150, 40, 44, '#0a0b10') + P('M-60,-90 Q0,-120 60,-90 L70,300 L-70,300Z', '#0a0b10'), 'translate(800 1450) scale(1.5)') + eyesPair(Pf, 300, 1220, 1.0, '#fff', 0.6, 30) + eyesPair(Pf, 800, 1230, 0.8, '#fff', 0.5, 26); return FZ(Pf, t, s, lt, 1.5, 1.0, 1.12, 540, 1200, 1); });
  SN(sg(49), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#16182a') + qmarks(t, 540, 960, 520, 5, '#d8d8e8') + eyesPair(Pf, 540, 960, 2.2, '#fff', 0.5 + 0.3 * Math.sin(t * 4), 80), lt, 1.7, 1.0, 1.12, 540, 960, 1));
  /* 78.37 naquela tarde: celular recebe ligação */
  SN(sg(51), 0.03, (t, lt, Pf) => FZ(Pf, t, RM(Pf, t, { mode: 'morning', win: 1 }) + winM(Pf, 800, 600, 1.2, 'morning') + phoneM(540, 1300, 1.2, 0, { txt: 'NÚMERO', t }), lt, 1.0, 1.0, 1.06, 540, 1000, 1));
  SN(sg(52), 0.03, (t, lt, Pf) => { const sh = Math.sin(t * 40); return FZ(Pf, t, BGR('#e8e0d0') + phoneM(540 + 6 * sh, 960, 2.7, 3 * sh, { txt: 'DESCONHECIDO', txtSize: 24, t, ring: 1, scr: '#e0ecff' }), lt, 2.5, 1.0, 1.12, 540, 960, 2); });
  /* 82.06 você atende */
  SN(sg(53), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#e8e0d0') + HF(t, { eye: 1, pupil: 0.5, worry: 0.5, mouth: 0.1 }, 540, 1000, 2.6) + phoneM(160, 1100, 1.5, -18, { scr: '#15171b' }), lt, 0.6, 1.0, 1.1, 540, 1000, 1));
  /* 82.67 voz masculina calma / 84.43 gostou do que encontrou */
  SN(sg(54), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0, smile: 0.3 }, 540, 1000, 2.5) + ringWaves(540, 1500, t, 0, 3, 700, 'rgba(255,255,255,0.25)', 1, 5), lt, 1.7, 1.0, 1.1, 540, 1000, 1));
  SN(sg(55), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#1a1c28') + suitF({ t, eye: 1, pupil: 0.5, mouth: 0.3 * Math.abs(Math.sin(t * 8)), smile: 0.4 }, 540, 1000, 2.6) + glow(Pf, 'A', 540, 700, 600, 0.2), lt, 0.9, 1.0, 1.15, 540, 1000, 1));
  /* 85.35 silêncio */
  SN(sg(56), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#e8e0d0') + HF(t, { eye: 1, pupil: 0.4, worry: 0.6, mouth: 0, sweat: 1, lookx: 10 }, 540, 1000, 2.7), lt, 1.1, 1.0, 1.08, 540, 1000, 1));
}
const bgS2 = (Pf, t, mode) => streetM(Pf, t, { hor: 820, mode, win: 0.4 });
