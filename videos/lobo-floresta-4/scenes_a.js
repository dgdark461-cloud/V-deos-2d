/* scenes_a.js - Parte 4, 0 a ~60 s */
const FZ = (Pf, t, s, lt, d, z0, z1, x = 540, y = 960, shk = 2, rot = 0) => cam3(t, lt, x, y, z0, z1, d, rot, shk + 1.2 * Math.sin(t * 2.3), s) + vignette(Pf, 1) + grain(t, 0.08);
const vidFx = (Pf, t, inner, o = {}) => {
  let s = inner;
  for (let i = 0; i < 40; i++) s += R(0, i * 48 + ((t * 80) % 48), 1080, 4, 'rgba(0,0,0,0.18)');
  s += R(-400, -400, 1880, 2720, 'rgba(120,200,255,0.06)');
  const g = o.glitch || 0; if (g > 0) for (let i = 0; i < 6; i++) s += R(0, hz(i, Math.floor(t * 18)) * 1920, 1080, 8 + 60 * hz(i, 4), 'rgba(255,255,255,0.18)', OP(g));
  s += C(110, 130, 20, '#ff3b30', OP(0.5 + 0.5 * Math.sin(t * 5))) + TXT(250, 148, 'REC', 56, '#fff') + TXT(880, 148, o.stamp || '03:12', 50, '#fff');
  return s + vignette(Pf, 0.7) + grain(t, 0.12);
};
const HERO = (t, x, y, sc, o = {}) => G(heroFig(Object.assign({ t, view: 's', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const WH = (t, lt, x0, x1, y, dur, sc, o = {}) => { const u = Math.min(1, lt / dur), e = u < 1 ? u * u * (3 - 2 * u) * 0.3 + u * 0.7 : 1, x = H.lerp(x0, x1, e); return HERO(t, x, y, sc, Object.assign({ walk: Math.abs(x - x0) / (430 * sc), flip: x1 >= x0 ? 1 : -1, stride: u < 1 ? 0.95 : 0 }, o)); };
const FACE = (t, o, x = 540, y = 980, sc = 2.6) => wf(Object.assign({ t, eye: 1, pupil: 0.45 }, o), x, y, sc);
const grnd = (Pf, y, col = '#0e1a18') => R(-500, y, 2080, 1500, col) + R(-500, y, 2080, 6, '#000', OP(0.4));
const nightF = (Pf, t, o = {}) => nightBG(Pf, t, Object.assign({ k: 2, fog: 0.7, shafts: 0, px: 0 }, o));
const shadowFoot = (x, y, w = 160) => E(x, y + 6, w, 16, 'rgba(0,0,0,0.5)');
const bedroomDark = (Pf, t, a = 0.15) => BIG('#0a121c') + R(-400, 1350, 1880, 700, '#101a24') + G(R(-170, -230, 340, 460, '#0e1c34', 'stroke="#1a2a40" stroke-width="16"') + C(80, -120, 32, '#dbe9f4', OP(0.85)) + glow(Pf, 'B', 80, -120, 240, 0.5), 'translate(800 700)') + glow(Pf, 'B', 800, 700, 700, a);
const msgBubble = (x, y, sc, w = 520) => G(R(-w / 2, -60, w, 120, '#2a3648', 'rx="40"') + C(-60, 0, 10, '#8fb0d6') + C(0, 0, 10, '#8fb0d6') + C(60, 0, 10, '#8fb0d6'), T(x, y, 0, sc));

function partD(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  /* 0.0 HOOK: olhos do lobo em close extremo no escuro */
  SN(0, 0.001, (t, lt, Pf) => {
    let s = BIG('#050a0e') + nightF(Pf, t, { fog: 0.9 }) + R(-400, -400, 1880, 2720, '#000', OP(0.45)) + wolfHead({ t, lookx: 0, snarl: 0, glow: 1, eye: 1, calm: 1 }).replace(/^/, '') ;
    s = BIG('#050a0e') + glow(Pf, 'A', 540, 900, 800, 0.2) + G(wolfHead({ t, lookx: 0, glow: 1, calm: 0 }), 'translate(540 960) scale(3.0)');
    return FZ(Pf, t, s, lt, 1.4, 1.0, 1.15, 540, 960, 4) + FB('#fff', 0.55 * Math.exp(-lt * 14));
  });
  /* "em vez de ficar com um homem": silhueta do homem */
  SN(2.9, 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060b10') + glow(Pf, 'R', 540, 900, 700, 0.2) + G(manJacket(Pf, { scale: 1.7, t, lantern: 0, eyes: 1, rim: 0.7 }), 'translate(540 1700)') + nightF(Pf, t, { fog: 0.9 }).slice(0, 0), lt, 1.3, 1.0, 1.15, 540, 1000, 3));
  /* 3.76 sobreviveu à floresta: protagonista cruza a floresta */
  SN(sg(1), 0.02, (t, lt, Pf) => { mb(sg(1), sg(2)); let s = nightF(Pf, t, { fog: 0.6, px: 0 }) + grnd(Pf, 1400) + shadowFoot(300 + 180 * lt, 1500, 150) + WH(t, lt, 150, 880, 1500, 1.7, 1.0, { scared: 0.2 }); return FZ(Pf, t, s, lt, 1.7, 1.0, 1.08, 540, 1100, 2); });
  /* 5.48 descobriu o jogo macabro / ajudou a polícia: tela de monitoramento + luzes */
  SN(sg(2), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#070d14') + monitorGrid(Pf, t, 1) + glow(Pf, 'R', 540, 900, 600, 0.12 + 0.1 * Math.sin(t * 6)), lt, 2.0, 1.0, 1.12, 540, 960, 2));
  SN(tw('polícia', 0, 7.4), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#060a12') + policeGlow(Pf, t, 1) + copSil({ x: 540, y: 1700, sc: 1.8, t }), lt, 2.1, 1.0, 1.12, 540, 1100, 3));
  /* 9.52 alguém muito mais perigoso escapou: algemas abertas + silhueta fugindo */
  SN(sg(3), 0.02, (t, lt, Pf) => { const u = lt / 4.2; let s = nightF(Pf, t, { fog: 0.8 }) + R(-400, -400, 1880, 2720, '#000', OP(0.35)) + glow(Pf, 'R', 540, 900, 900, 0.2 + 0.1 * Math.sin(t * 8)) + cuffs(540, 1300, 1.8, 1) + G(manSil({ scale: 1, eyes: 1, col: '#030508', t, rim: 1 }), `translate(${f1(H.lerp(1100, 200, u))} ${f1(1500 - 20 * Math.abs(Math.sin(u * 40)))}) scale(0.9)`); return FZ(Pf, t, s, lt, 4.2, 1.0, 1.12, 540, 1100, 2); });
  /* 13.75 nos primeiros dias */
  SN(sg(4), 0.03, (t, lt, Pf) => FZ(Pf, t, homeBG(Pf, t, { }) + HERO(t, 300, 1600, 1.15, { stride: 0, view: 'f', look: 0.3 }), lt, 0.9, 1.0, 1.07, 540, 1100, 1));
  /* 14.6 voltar à vida normal: rosto calmo, xícara */
  SN(sg(5), 0.03, (t, lt, Pf) => { let s = homeBG(Pf, t, {}) + FACE(t, { eye: 1, pupil: 0.5, worry: 0, smile: 0.3, mouth: 0 }, 540, 1000, 2.5); s += G(R(-60, -50, 120, 100, '#e8e0d0', 'rx="14"') + E(0, -50, 56, 12, '#6a4a30') + R(50, -30, 36, 54, 'none', 'rx="18" stroke="#e8e0d0" stroke-width="12"'), 'translate(860 1700) scale(1.6)'); for (let i = 0; i < 3; i++) s += E(860 + 14 * Math.sin(t * 2 + i), 1560 - ((t * 60 + i * 50) % 150), 14, 30, 'rgba(255,255,255,0.25)'); return FZ(Pf, t, s, lt, 1.7, 1.0, 1.1, 540, 1000, 1); });
  /* 16.28 evita falar / acredita estar livre: olhar baixo, depois alívio */
  SN(sg(6), 0.03, (t, lt, Pf) => FZ(Pf, t, homeBG(Pf, t, {}) + FACE(t, { eye: 1, pupil: 0.5, worry: 0.2, looky: 14 * Math.sin(lt * 1.2), mouth: 0, smile: H.prog(lt, 3, 5) * 0.6 }, 540, 1000, 2.6) + glow(Pf, 'A', 540, 800, 700, 0.2 * H.prog(lt, 3, 5)), lt, 5.3, 1.0, 1.15, 540, 1000, 1));
  /* 21.58 numa madrugada: relógio digital 03:07 */
  SN(sg(7), 0.02, (t, lt, Pf) => FZ(Pf, t, bedroomDark(Pf, t, 0.2) + TXT(540, 700, '03:07', 240, '#ff5a4a', OP(0.9 + 0.1 * Math.sin(t * 3))) + bedObj(540, 1500), lt, 1.3, 1.0, 1.12, 540, 1000, 1));
  /* 22.89 celular recebe mensagem de número desconhecido */
  SN(sg(9), 0.02, (t, lt, Pf) => FZ(Pf, t, bedroomDark(Pf, t, 0.1) + phoneN(Pf, 540, 1000, 1.9, { t, title: 'NÚMERO DESCONHECIDO', body: 'VÍDEO', shake: 4 * Math.max(0, Math.sin(t * 30)) }) + glow(Pf, 'B', 540, 1000, 600, 0.5), lt, 3.1, 1.0, 1.2, 540, 1000, 2));
  /* 26.06 não existe texto / 26.96 apenas um vídeo */
  SN(sg(10), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 900, 700, 0.3) + msgBubble(540, 960, 1.5) + TXT(540, 1250, '?', 200, '#8fb0d6', OP(0.6)), lt, 0.9, 1.0, 1.15, 540, 960, 2));
  SN(sg(11), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 900, 700, 0.3) + G(R(-260, -340, 520, 680, '#15202c', 'rx="26"') + POLY([[-70, -90], [-70, 90], [90, 0]], '#e8eef8'), 'translate(540 960)'), lt, 0.7, 1.0, 1.2, 540, 960, 2));
  /* 27.65 aperta para assistir: dedo */
  SN(sg(12), 0.02, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.2, 0.9)); return FZ(Pf, t, BIG('#0a121c') + G(R(-260, -340, 520, 680, '#15202c', 'rx="26"') + POLY([[-70, -90], [-70, 90], [90, 0]], '#e8eef8'), 'translate(540 900)') + HAND(540, H.lerp(1700, 1020, u), 2.2, PAL.skin, 0) + ringWaves(540, 900, t, 0, 2, 400 * u, 'rgba(200,230,255,0.5)', 1, 5), lt, 1.4, 1.0, 1.12, 540, 960, 2); });
  /* 29.04 vídeo: a mesma floresta */
  SN(sg(13), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, nightF(Pf, t, { fog: 0.5 }) + grnd(Pf, 1350, '#0a1614'), { stamp: '02:51' }), lt, 2.9, 1.0, 1.1, 540, 1000, 3));
  /* 31.92 câmera se aproxima da árvore */
  SN(sg(14), 0.02, (t, lt, Pf) => { const u = ez(lt / 2.1); return FZ(Pf, t, vidFx(Pf, t, nightF(Pf, t, { fog: 0.5 }) + grnd(Pf, 1350, '#0a1614') + G(R(-60, -900, 120, 900, '#1a120e') + E(0, -900, 30, 10, '#1a120e'), `translate(540 1350) scale(${f1(H.lerp(0.5, 1.6, u))})`), { stamp: '02:52' }), lt, 2.1, 1.0, 1.0, 540, 1000, 6); });
  /* 34.03 algo pendurado / 35.7 jaqueta / 36.85 manchada */
  SN(sg(15), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(R(-80, -1100, 160, 1700, '#1a120e'), 'translate(540 1300)') + G(P('M-130,-60 Q-150,-20 -120,120 L-80,360 L80,360 L120,120 Q150,-20 130,-60 L80,-120 Q0,-90 -80,-120Z', '#4a5a3a') + P('M-130,-60 L-180,200 L-120,220 L-80,40Z', '#3a4a2e') + P('M130,-60 L180,200 L120,220 L80,40Z', '#3a4a2e'), `translate(540 880) rotate(${f1(3 * Math.sin(t * 1.6))})`) + L(540, 600, 540, 760, '#2a1c14', 8), { stamp: '02:53' }), lt, 1.6, 1.0, 1.1, 540, 900, 4));
  SN(sg(16), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(P('M-130,-60 Q-150,-20 -120,120 L-80,360 L80,360 L120,120 Q150,-20 130,-60 L80,-120 Q0,-90 -80,-120Z', '#4a5a3a') + P('M-60,-100 Q0,-60 60,-100 L60,-40 Q0,0 -60,-40Z', '#2a3a22') + R(-12, -100, 24, 460, 'rgba(0,0,0,0.25)'), 'translate(540 960) scale(3.2)'), { stamp: '02:53' }), lt, 1.1, 1.0, 1.15, 540, 960, 4));
  SN(sg(17), 0.02, (t, lt, Pf) => { const u = ez(lt / 0.9); return FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + G(P('M-130,-60 Q-150,-20 -120,120 L-80,360 L80,360 L120,120 Q150,-20 130,-60 L80,-120 Q0,-90 -80,-120Z', '#4a5a3a') + P('M-90,40 Q-40,0 10,60 Q40,120 -20,150 Q-80,150 -90,90Z', '#8a1c1c', OP(u)) + P('M40,160 Q70,120 100,190 Q80,250 50,220Z', '#8a1c1c', OP(u)) + [0, 1, 2].map(i => C(-30 + 40 * i, 200 + ((t * 80 + i * 40) % 120), 8, '#a02020', OP(u))).join(''), 'translate(540 960) scale(3.2)'), { stamp: '02:54', glitch: 0.4 }) + glow(Pf, 'R', 540, 960, 600, 0.25 * u), lt, 0.9, 1.0, 1.1, 540, 960, 5); });
  /* 37.8 então aparece uma frase / 39.37 / 40.39 */
  SN(sg(18), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210'), { stamp: '02:55', glitch: 0.5 }) + G(R(-420, -80, 840, 160, 'rgba(0,0,0,0.6)', 'rx="20"'), 'translate(540 960)'), lt, 1.4, 1.0, 1.1, 540, 960, 3));
  SN(sg(19), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + TXT(540, 900, 'VOCÊ SAIU', 120, '#e8eef8') + TXT(540, 1040, 'DO JOGO.', 120, '#e8eef8'), { stamp: '02:55', glitch: 0.5 }), lt, 1.0, 1.0, 1.15, 540, 960, 4));
  SN(sg(20), 0.02, (t, lt, Pf) => FZ(Pf, t, vidFx(Pf, t, BIG('#0a1210') + TXT(540, 820, 'MAS O JOGO', 120, '#ff5a4a') + TXT(540, 960, 'NÃO SAIU', 120, '#ff5a4a') + TXT(540, 1100, 'DE VOCÊ.', 120, '#ff5a4a'), { stamp: '02:56', glitch: 0.6 }), lt, 2.9, 1.0, 1.15, 540, 960, 4));
  /* 42.4 coração dispara */
  SN(tw('coração', 0, 42.6), 0.02, (t, lt, Pf) => { const b = Math.pow(Math.max(0, Math.sin(t * 9)), 6); return FZ(Pf, t, BIG('#18080c') + glow(Pf, 'R', 540, 960, 600 + 200 * b, 0.4) + ecgLine(t, 540, 1500, 900, '#ff3b30') + FACE(t, { eye: 1, pupil: 0.25, worry: 1, sweat: 1, mouth: 0.3 }, 540, 880, 2.3), lt, 1.0, 1.0, 1.12, 540, 960, 5 * b); });
  /* 43.38 bloqueia o número */
  SN(sg(21), 0.02, (t, lt, Pf) => { const u = ez(H.prog(lt, 0.5, 1.0)); return FZ(Pf, t, BIG('#0a121c') + phoneN(Pf, 540, 960, 1.7, { t, title: 'DESCONHECIDO', body: 'BLOQUEAR' }) + bigX(540, 960, 330, u, '#ff3b30'), lt, 0.9, 1.0, 1.1, 540, 960, 2); });
  /* 44.26 segundos depois: relógio / 45.12 outra mensagem */
  SN(sg(23), 0.02, (t, lt, Pf) => FZ(Pf, t, bedroomDark(Pf, t, 0.1) + TXT(540, 800, '03:08', 220, '#ff5a4a') + ringWaves(540, 1100, t, 0, 3, 500, 'rgba(143,176,214,0.4)', 1, 5), lt, 0.7, 1.0, 1.12, 540, 960, 3));
  SN(sg(24), 0.02, (t, lt, Pf) => FZ(Pf, t, bedroomDark(Pf, t, 0.1) + phoneN(Pf, 540, 1000, 1.9, { t, title: 'NOVA MENSAGEM', body: 'LOCAL', shake: 5 * Math.max(0, Math.sin(t * 30)) }) + glow(Pf, 'B', 540, 1000, 600, 0.5), lt, 1.1, 1.0, 1.15, 540, 1000, 3));
  /* 46.27 se quiser saber quem escapou / venha sozinho */
  SN(sg(25), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + G(R(-380, -200, 760, 400, '#1c2838', 'rx="40"') + TXT(0, -40, 'QUEM ESCAPOU?', 70, '#e8eef8') + eyesPair(Pf, 0, 100, 0.5, '#ffd35a', 0.8, 40), 'translate(540 960)'), lt, 0.8, 1.0, 1.15, 540, 960, 2));
  SN(sg(26), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a0608') + glow(Pf, 'R', 540, 960, 700, 0.3 + 0.2 * Math.sin(t * 8)) + TXT(540, 900, 'VENHA', 170, '#ff5a4a') + TXT(540, 1090, 'SOZINHO.', 170, '#ff5a4a'), lt, 1.3, 1.0, 1.15, 540, 960, 4));
  /* 48.38 localização */
  SN(sg(27), 0.02, (t, lt, Pf) => { let s = BIG('#0e1a20'); for (let i = 0; i < 10; i++) s += L(-100 + i * 140, 0, 200 + i * 80, 1920, '#1a2a30', 8) + L(0, 160 + i * 200, 1080, 100 + i * 200, '#1a2a30', 8); s += P('M200,1500 Q500,1200 700,1000 T900,500', 'none', 'stroke="#ffd35a" stroke-width="10" stroke-dasharray="30 20" opacity="0.7"'); s += G(P('M0,0 q-70,-120 0,-200 q70,80 0,200Z', '#ff3b30') + C(0, -130, 24, '#0a1218'), `translate(900 ${f1(520 + 12 * Math.sin(t * 6))}) scale(1.6)`) + ringWaves(900, 500, t, 0, 3, 300, 'rgba(255,59,48,0.5)', 1, 5); return FZ(Pf, t, s, lt, 1.9, 1.0, 1.2, 800, 800, 2); });
  /* 50.24 deveria procurar a polícia */
  SN(sg(28), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 1) + copSil({ x: 540, y: 1700, sc: 1.7, t }) + HERO(t, 220, 1760, 1.0, { stride: 0, view: 's', look: 0 }), lt, 1.8, 1.0, 1.1, 540, 1100, 2));
  /* 52.08 hesitar */
  SN(sg(29), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + FACE(t, { eye: 1, pupil: 0.4, worry: 0.8, looky: 10 * Math.sin(t * 2), mouth: 0, sweat: 1 }, 540, 1000, 2.6) + glow(Pf, 'B', 540, 800, 700, 0.2), lt, 2.7, 1.0, 1.15, 540, 1000, 1));
  /* 54.75 foto de Clara / 56.06 tirada naquele instante */
  SN(sg(30), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 960, 700, 0.3) + G(R(-190, -230, 380, 460, '#ece6d6', 'rx="8"') + R(-170, -210, 340, 340, '#1a2a26') + G(cf({ eye: 0.9, worry: 0.9, bruise: 0.3, bodyLen: 260 }, 0, 20, 0.42), ''), 'translate(540 960) scale(2.6) rotate(-3)'), lt, 1.3, 1.0, 1.15, 540, 960, 2));
  SN(sg(31), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + glow(Pf, 'R', 540, 960, 600, 0.25) + G(R(-190, -230, 380, 460, '#ece6d6', 'rx="8"') + R(-170, -210, 340, 340, '#1a2a26') + G(cf({ eye: 0.9, worry: 0.9, bruise: 0.3, bodyLen: 260 }, 0, 20, 0.42), ''), 'translate(540 900) scale(2.2) rotate(2)') + G(R(-250, -50, 500, 100, 'rgba(0,0,0,0.7)', 'rx="16"') + TXT(0, 24, 'AGORA · 03:09', 56, '#ff5a4a'), 'translate(540 1550)'), lt, 1.5, 1.0, 1.15, 540, 960, 2));
  /* 57.56 liga para ela / 58.22 ninguém atende */
  SN(sg(32), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + glow(Pf, 'B', 540, 960, 700, 0.3) + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + C(0, -150, 80, '#2a3648') + TXT(0, 80, 'CLARA', 70, '#e8eef8') + G(C(0, 240, 70, '#3ac060') + P('M-30,260 q10,-60 60,-40', 'none', 'stroke="#fff" stroke-width="12"'), ''), 'translate(540 960)') + ringWaves(540, 1200, t, 0, 3, 400, 'rgba(58,192,96,0.5)', 1, 5), lt, 0.7, 1.0, 1.12, 540, 960, 3));
  SN(sg(33), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + C(0, -150, 80, '#2a3648') + TXT(0, 80, 'CLARA', 70, '#e8eef8') + TXT(0, 260, '. . .', 100, '#8fb0d6', OP(0.5 + 0.5 * Math.sin(t * 6))), 'translate(540 960)') + FB('#000', 0.35 * H.prog(lt, 0.3, 0.8)), lt, 0.8, 1.0, 1.1, 540, 960, 2));
  /* 59.01 decide ir ao local: pega jaqueta e chaves, sai */
  SN(sg(34), 0.02, (t, lt, Pf) => { mb(sg(34), sg(35)); const u = lt / 1.5; return FZ(Pf, t, homeBG(Pf, t, {}) + doorM(840, 1560, 1.3, ez(H.prog(lt, 0.3, 1.0))) + WH(t, lt, 150, 700, 1700, 1.5, 1.05, { view: 's', scared: 0.3 }), lt, 1.5, 1.0, 1.1, 540, 1100, 3); });
  /* 60.54 mas dessa vez não comete o mesmo erro */
  SN(sg(35), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#0a121c') + FACE(t, { eye: 1, pupil: 0.5, worry: 0, anger: 0.5, mouth: 0 }, 540, 1000, 2.6) + glow(Pf, 'A', 540, 800, 700, 0.2), lt, 1.8, 1.0, 1.15, 540, 1000, 1));
  /* 62.35 avisa policial e compartilha localização */
  SN(sg(36), 0.02, (t, lt, Pf) => FZ(Pf, t, BIG('#070d14') + policeGlow(Pf, t, 0.7) + copSil({ x: 760, y: 1700, sc: 1.4, t }) + G(R(-260, -400, 520, 800, '#15202c', 'rx="40"') + P('M0,0 q-70,-120 0,-200 q70,80 0,200Z', '#3ac060') + C(0, -130, 24, '#0a1218') + TXT(0, 280, 'LOCALIZAÇÃO ENVIADA', 36, '#e8eef8'), 'translate(300 1000) scale(1.1)') + ringWaves(300, 900, t, 0, 3, 350, 'rgba(58,192,96,0.5)', 1, 5), lt, 4.0, 1.0, 1.1, 540, 1100, 2));
}
