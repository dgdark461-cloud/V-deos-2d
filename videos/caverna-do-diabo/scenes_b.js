/* scenes_b.js - 68 a ~121 s */
const bigText = (Pf, t, str, sz, col, y = 1000) => TX(540, y, str, sz, col);
const knock = (lt, x) => Math.exp(-Math.pow((lt - x) * 16, 2));
function partE(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  /* 68.04 primeira regra */
  SN(sg(37), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + TX(540, 1000, '1', 800, 'rgba(230,225,205,0.9)') + txtBox(540, 1420, 'PRIMEIRA REGRA', 86, BONE, 'rgba(0,0,0,0.6)', 880), lt, 1.0, 1.0, 1.2, 540, 960, 4));
  /* 69.04 perdido */
  SN(sg(38), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.35 }) + G(rafaelFig({ back: 0, scale: 1, t, scared: 0.8, look: 1 }), 'translate(540 1780) scale(1.1)') + beam(Pf, 480, 1250, -70, 900, 14, 0.4) + lightMask(Pf, 540, 1300, 750, 0.95), lt, 1.9, 1.0, 1.12, 540, 1100, 1));
  /* 70.96 não entre em passagens desconhecidas */
  SN(sg(39), 0.02, (t, lt, Pf) => { let s = BIG('#060607') + P('M200,1920 L200,900 Q540,500 880,900 L880,1920Z', '#020203') + P('M200,900 Q540,500 880,900', 'none', 'stroke="#43474f" stroke-width="26"'); for (let i = 0; i < 6; i++) s += stalac(300 + i * 90, 760 + 6 * i, 60, 120, '#43474f'); s += eyesG(Pf, 540, 1250, 0.9, 0.4 + 0.4 * Math.sin(t * 4), 50) + bigX(540, 1150, 380, ez(H.prog(lt, 0.8, 1.3)), '#b02222') + glow(Pf, 'W', 540, 1200, 400, 0.1); return FZ(Pf, t, s, lt, 2.1, 1.0, 1.15, 540, 1100, 1); });
  /* 73.13 pare: mão levantada */
  SN(sg(40), 0.01, (t, lt, Pf) => FZ(Pf, t, BIG('#07080a') + HAND(540, 1050, 5.0, '#b09a86', 0) + txtBox(540, 1700, 'PARE', 120, BONE, 'rgba(0,0,0,0.6)', 560), lt, 0.4, 1.0, 1.1, 540, 1000, 5));
  /* 73.45 economize energia / chamar atenção */
  SN(sg(41), 0.02, (t, lt, Pf) => { const sw = 25 * Math.sin(t * 3.5); let s = DK(Pf, t, { bright: 0.3 }) + phoneLight(Pf, 300, 1400, 0.8, 0, 16, t) + (lt < 1.5 ? '' : '') + G(rafaelFig({ back: 0, scale: 1, t, arms: [-70 + sw, 160, 8, 14], scared: 0.4 }), 'translate(640 1800) scale(1.3)') + beam(Pf, 560, 1250, -90 + sw, 1200, 12, 0.5) + lightMask(Pf, 560, 1200, 800, 0.95); return FZ(Pf, t, s, lt, 2.8, 1.0, 1.1, 540, 1100, 1); });
  /* 76.33 decidiu permanecer perto da passarela: sentado */
  SN(sg(42), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.4, shift: -50 }) + G(rafaelFig({ back: 0, scale: 1, t, scared: 0.3, bob: 0 }), 'translate(300 1780) scale(1.1)') + phoneLight(Pf, 540, 1560, 0.5, 80, 16, t) + glow(Pf, 'W', 540, 1560, 260, 0.3) + lightMask(Pf, 500, 1400, 900, 0.93), lt, 2.1, 1.0, 1.12, 540, 1200, 1));
  /* 78.51 três batidas */
  SN(sg(43), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#040405') + RF(t, { eye: 1, pupil: 0.3, worry: 0.8, sweat: 1, mouth: 0, lookx: 25 }, 540, 1000, 2.6) + lightMask(Pf, 540, 1000, 800, 0.95), lt, 1.6, 1.0, 1.1, 540, 1000, 2));
  for (const [i, lab] of [[44, 'TOC.'], [45, 'TOC.'], [46, 'TOC.']]) SN(sg(i), 0.005, (t, lt, Pf) => { const kn = knock(lt, 0.05); return FZ(Pf, t, BIG('#060607') + TX(540, 1050, lab, 330 + 30 * kn, '#e6e0cc') + ringWaves(540, 960, t, 0, 3, 600, 'rgba(230,225,205,0.4)', 1, 6) + FB('#fff', 0.35 * kn), lt, 0.5, 1.0, 1.1, 540, 960, 3 + 14 * kn); });
  /* 81.18 vinham de dentro da parede */
  SN(sg(47), 0.02, (t, lt, Pf) => { let s = BIG('#0a0b0d') + R(-400, -400, 1880, 2720, '#16181c'); for (let i = 0; i < 8; i++) s += P(`M${200 + i * 100},-100 q40,400 -30,700 q60,500 -20,1200`, 'none', 'stroke="#05060a" stroke-width="10"'); s += P('M540,700 L500,900 L560,1000 L520,1200 L600,1400', 'none', 'stroke="#000" stroke-width="14"') + eyesG(Pf, 540, 1000, 0.5, 0.3 * (0.5 + 0.5 * Math.sin(t * 5)), 30) + ringWaves(540, 1000, t, 0, 3, 500, 'rgba(230,225,205,0.3)', 1, 5); return FZ(Pf, t, s + lightMask(Pf, 540, 1000, 800, 0.9), lt, 1.2, 1.0, 1.15, 540, 1000, 2); });
  /* 82.43 aproximou a lanterna */
  SN(sg(48), 0.02, (t, lt, Pf) => { const u = ez(lt / 1.4); let s = BIG('#101216'); for (let i = 0; i < 14; i++) s += E(hz(i, 61) * 1080, hz(i, 62) * 1920, 140 + 100 * hz(i, 63), 60 + 60 * hz(i, 64), mixc('#1c1f24', '#3a3e46', hz(i, 65)), OP(0.8)); s += lightMask(Pf, H.lerp(900, 540, u), 1000, H.lerp(500, 900, u), 0.96) + glow(Pf, 'W', H.lerp(900, 540, u), 1000, 260, 0.3); return FZ(Pf, t, s, lt, 1.4, 1.0, 1.12, 540, 1000, 2); });
  /* 83.96 entre duas rochas / 85.17 objeto metálico */
  SN(sg(49), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#07080a') + rockI(220, 1800, 760, 1500, 71, '#2a2d33') + rockI(880, 1800, 760, 1500, 72, '#2a2d33') + R(480, 600, 120, 1200, '#000', OP(0.9)) + lightMask(Pf, 540, 1100, 900, 0.7), lt, 1.2, 1.0, 1.15, 540, 1100, 1));
  SN(sg(50), 0.02, (t, lt, Pf) => { const gl = 0.5 + 0.5 * Math.sin(t * 5); return FZ(Pf, t, BIG('#07080a') + rockI(220, 1800, 760, 1500, 71, '#2a2d33') + rockI(880, 1800, 760, 1500, 72, '#2a2d33') + R(480, 600, 120, 1200, '#000', OP(0.9)) + glow(Pf, 'W', 540, 1250, 220, 0.4 + 0.4 * gl) + R(520, 1220, 60, 40, '#cfd0d2', OP(0.9)) + sparksFx(540, 1240, t, 1, 6, 50, '#fff') + lightMask(Pf, 540, 1200, 800, 0.93), lt, 1.6, 1.0, 1.25, 540, 1200, 1); });
  /* 86.75 era um relógio */
  SN(sg(51), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060708') + glow(Pf, 'W', 540, 960, 700, 0.3) + watchObj(Pf, 540, 960, 3.0, 12, 0, 0, t) + lightMask(Pf, 540, 960, 1000, 0.8), lt, 0.9, 1.0, 1.2, 540, 960, 2));
  /* 87.68 coração quase parou */
  SN(sg(52), 0.02, (t, lt, Pf) => { const b = Math.pow(Math.max(0, Math.sin(t * 7)), 8); return FZ(Pf, t, BIG('#0a0405') + glow(Pf, 'R', 540, 960, 600 + 200 * b, 0.35) + G(P('M0,60 C-200,-80 -120,-220 0,-120 C120,-220 200,-80 0,60Z', '#7a1c1c'), T(540, 960, 0, 3.4 + 0.4 * b)) + ringWaves(540, 960, t, 0, 3, 800, 'rgba(180,30,30,0.35)', 1, 6), lt, 1.2, 1.0, 1.1, 540, 960, 6 * b); });
  /* 88.9 relógio do irmão: relógio + fantasma */
  SN(sg(53), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060708') + G(ghostFace({ a: 0.3 }), 'translate(540 760) scale(2.3)') + watchObj(Pf, 540, 1400, 1.9, 0, 0, 0, t) + glow(Pf, 'W', 540, 1400, 400, 0.3), lt, 2.0, 1.0, 1.1, 540, 1000, 1));
  /* 90.97 colocou no pulso: aniversário (flashback) */
  SN(sg(54), 0.02, (t, lt, Pf) => { let s = BIG('#14120f') + glow(Pf, 'A', 540, 700, 700, 0.35); s += G(P('M-120,-100 L120,-100 L140,200 L-140,200Z', '#d9d4c6') + R(-100, -180, 200, 80, '#8a6a5a', 'rx="20"') + [-60, 0, 60].map(x => R(x - 6, -260, 12, 80, '#d9d4c6') + E(x, -280 + 6 * Math.sin(t * 9 + x), 10, 20, '#e0b050')).join(''), 'translate(540 1500)'); s += HAND(300, 1000, 2.2, '#b09a86', 80) + watchObj(Pf, 380, 1020, 0.7, 80, 0, 0, t) + HAND(780, 1050, 2.2, '#c0a894', -80); return FZ(Pf, t, s, lt, 3.2, 1.0, 1.15, 540, 1100, 1) + FB('#d9d4c6', 0.07); });
  /* 94.16 como aquilo poderia estar ali */
  SN(sg(55), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + questionMarks(t, 540, 940, 430, 6, '#b0ab9a') + RF(t, { eye: 1, pupil: 0.3, worry: 1, sweat: 1, mouth: 0.1 }, 540, 1050, 1.9) + lightMask(Pf, 540, 1000, 1000, 0.85), lt, 1.7, 1.0, 1.12, 540, 1000, 2));
  /* 95.89 antes que conseguisse pensar / 97.21 passos */
  SN(sg(56), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#040405') + RF(t, { eye: 1, pupil: 0.3, worry: 0.8, mouth: 0, lookx: 30 }, 540, 1000, 2.5) + lightMask(Pf, 540, 1000, 800, 0.95), lt, 1.3, 1.0, 1.12, 540, 1000, 2));
  SN(sg(57), 0.02, (t, lt, Pf) => { let s = BIG('#050506'); for (let i = 0; i < 6; i++) { const a = ((t * 1.2 + i * 0.5) % 3) / 3; s += E(300 + 480 * (i % 2) , 1700 - a * 900, 90 * (1 - a), 40 * (1 - a), 'rgba(220,215,195,0.4)', OP(1 - a)); } s += ringWaves(540, 1700, t, 0, 3, 700, 'rgba(230,225,205,0.25)', 1, 5); return FZ(Pf, t, s, lt, 0.9, 1.0, 1.1, 540, 1100, 2); });
  /* 98.05 lanterna ao longe */
  SN(sg(58), 0.02, (t, lt, Pf) => { const u = ez(lt / 1.5); let s = DK(Pf, t, { bright: 0.2 }) + glow(Pf, 'W', 640, 1240, 70 + 40 * u, 0.9) + beam(Pf, 640, 1240, 180, 500 + 300 * u, 10, 0.5) + lightMask(Pf, 640, 1240, 1100, 0.8); return FZ(Pf, t, s, lt, 1.5, 1.0, 1.15, 600, 1200, 1); });
  /* 99.58 finalmente alguém */
  SN(sg(59), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060708') + glow(Pf, 'W', 540, 900, 700, 0.3) + RF(t, { eye: 1, pupil: 0.6, worry: 0, mouth: 0.4, smile: 0.6 }, 540, 1000, 2.5) + lightMask(Pf, 540, 950, 1100, 0.7), lt, 1.0, 1.0, 1.12, 540, 1000, 2));
  /* 100.59 gritar */
  SN(sg(61), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060708') + RF(t, { eye: 1, pupil: 0.5, worry: 0.4, mouth: 0.9 + 0.1 * Math.sin(t * 20), anger: 0.2 }, 540, 1020, 2.7) + ringWaves(540, 1180, t, 0, 4, 800, 'rgba(230,225,205,0.3)', 1, 5) + lightMask(Pf, 540, 1000, 1100, 0.8), lt, 1.0, 1.0, 1.15, 540, 1000, 4));
  /* 101.6 a pessoa parou */
  SN(sg(62), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.25 }) + G(manJacket(Pf, { scale: 0.5, t, lantern: 1, walk: 0, beamA: 0.5, beamAng: 180, col: '#0a0b0c' }), 'translate(700 1340)') + lightMask(Pf, 700, 1200, 800, 0.96), lt, 0.8, 1.0, 1.1, 640, 1200, 1));
  /* 102.34 voz masculina respondeu / 104.1 Rafael? */
  SN(sg(63), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + ringWaves(540, 960, t, 0, 4, 800, 'rgba(230,225,205,0.3)', 1, 5) + TX(540, 1000, '?', 700, 'rgba(230,225,205,0.12)'), lt, 1.7, 1.0, 1.05, 540, 960, 1));
  SN(sg(64), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + TX(540, 1010, 'RAFAEL?', 190, '#e6e0cc') + ringWaves(540, 960, t, 0, 3, 800, 'rgba(230,225,205,0.3)', 1, 5), lt, 0.5, 1.0, 1.2, 540, 960, 4));
  /* 105.07 fica onde está / era o monitor */
  SN(sg(66), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.4 }) + monF({ t, eye: 1, pupil: 0.5, mouth: 0.3, worry: 0.1, wet2: 1 }, 540, 1000, 2.4) + beam(Pf, 540, 1800, -90, 1200, 20, 0.25) + lightMask(Pf, 540, 1000, 1100, 0.8), lt, 1.4, 1.0, 1.1, 540, 1000, 1));
  /* 106.47 alívio */
  SN(sg(67), 0.02, (t, lt, Pf) => FZ(Pf, t, DK(Pf, t, { bright: 0.5 }) + glow(Pf, 'W', 540, 900, 800, 0.25) + RF(t, { eye: 0.6, pupil: 0.6, worry: 0, mouth: 0.2, smile: 0.7 }, 540, 1000, 2.5), lt, 1.3, 1.0, 1.1, 540, 1000, 1));
  /* 107.77 mas, ao se aproximar / estranho */
  SN(sg(69), 0.02, (t, lt, Pf) => { const u = ez(lt / 1.4); return FZ(Pf, t, DK(Pf, t, { bright: 0.25 }) + G(monF({ t, eye: 1, pupil: 0.5, mouth: 0, wet2: 1 }, 0, 0, 1), `translate(540 1000) scale(${f1(0.9 + 1.5 * u)})`) + lightMask(Pf, 540, 1000, 1000, 0.9), lt, 1.4, 1.0, 1.05, 540, 1000, 1); });
  SN(sg(70), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + monF({ t, eye: 1, pupil: 0.3, mouth: 0, wet2: 1 }, 540, 1000, 2.7) + questionMarks(t, 540, 960, 450, 3, '#b0ab9a') + lightMask(Pf, 540, 1000, 1000, 0.9), lt, 1.0, 1.0, 1.15, 540, 1000, 1));
  /* 110.15 uniforme molhado */
  SN(sg(71), 0.02, (t, lt, Pf) => { let s = BIG('#08090b') + R(100, 500, 880, 1400, '#2c3a44', 'rx="60"') + R(480, 500, 120, 1400, '#111820'); for (let i = 0; i < 18; i++) { const x = 140 + hz(i, 81) * 800, y = ((t * 220 * (0.5 + hz(i, 82)) + hz(i, 83) * 1400) % 1400) + 500; s += P(`M${f1(x)},${f1(y)} q9,22 0,30 q-9,-8 0,-30Z`, '#8aa0b0', OP(0.8)); } s += E(540, 1850, 520, 40, 'rgba(120,150,170,0.3)') + lightMask(Pf, 540, 1100, 1000, 0.8); return FZ(Pf, t, s, lt, 1.9, 1.0, 1.12, 540, 1100, 1); });
  /* 112.09 sangue escorrendo pela testa */
  SN(sg(72), 0.02, (t, lt, Pf) => { const u = ez(lt / 1.5); return FZ(Pf, t, BIG('#050506') + monF({ t, eye: 1, pupil: 0.3, mouth: 0, wet2: 1, blood: u }, 540, 1000, 2.7) + lightMask(Pf, 540, 1000, 1000, 0.85), lt, 1.8, 1.0, 1.2, 540, 900, 1); });
  /* 113.91 o que aconteceu / você perguntou */
  SN(sg(73), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + RF(t, { eye: 1, pupil: 0.4, worry: 0.8, mouth: 0.5 * Math.abs(Math.sin(t * 9)), sweat: 1 }, 540, 1000, 2.5) + lightMask(Pf, 540, 1000, 1000, 0.85), lt, 1.0, 1.0, 1.12, 540, 1000, 2));
  /* 115.37 ele ignorou */
  SN(sg(75), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + monF({ t, eye: 1, pupil: 0.3, lookx: 40, mouth: 0, wet2: 1, blood: 1 }, 540, 1000, 2.6) + lightMask(Pf, 540, 1000, 1000, 0.85), lt, 0.7, 1.0, 1.08, 540, 1000, 1));
  /* 116.0 apenas disse */
  SN(sg(76), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#050506') + monF({ t, eye: 1, pupil: 0.3, mouth: 0.4 * Math.abs(Math.sin(t * 8)), wet2: 1, blood: 1 }, 540, 1000, 2.6) + lightMask(Pf, 540, 1000, 1000, 0.85), lt, 0.7, 1.0, 1.1, 540, 1000, 1));
  /* 116.67 precisamos sair antes que ele volte / ele quem */
  SN(sg(77), 0.02, (t, lt, Pf) => { let s = DK(Pf, t, { bright: 0.3 }) + monF({ t, eye: 1, pupil: 0.4, lookx: 30, mouth: 0.3, wet2: 1, blood: 1 }, 540, 900, 2.2) + eyesG(Pf, 900, 1500, 0.9, 0.5 + 0.4 * Math.sin(t * 5), 40); return FZ(Pf, t, s + lightMask(Pf, 540, 1000, 1000, 0.88), lt, 4.0, 1.0, 1.15, 540, 1000, 1); });
  /* 120.66 sussurrou */
  SN(sg(78), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#030304') + eyesG(Pf, 540, 900, 1.6, 0.6, 80) + mist(t, 800, 1500, 6, 0.1) + ringWaves(540, 900, t, 0, 3, 700, 'rgba(230,225,205,0.25)', 1, 4), lt, 0.6, 1.0, 1.15, 540, 900, 2));
}
