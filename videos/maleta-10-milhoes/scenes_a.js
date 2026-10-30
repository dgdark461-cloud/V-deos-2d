/* scenes_a.js - 0 a ~41 s. 0-14.38 em 2.5D, resto 2D. */
const FZ = (Pf, t, s, lt, d, z0, z1, x = 540, y = 960, shk = 1.5, rot = 0) => cam3(t, lt, x, y, z0, z1, d, rot, shk, s) + vignette(Pf, 0.55) + grain(t, 0.05);
const HF = (t, o, x, y, sc) => hkF(Object.assign({ t, eye: 1, pupil: 0.5 }, o), x, y, sc);
const HW = (t, x, y, sc, o = {}) => G(hikerFig(Object.assign({ t, view: 's' }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* anda de x0 a x1 em dur s; fase proporcional à distância (sem patinar) */
const walkX = (t, lt, x0, x1, dur, sc, o = {}) => { const u = Math.min(1, lt / dur), x = H.lerp(x0, x1, u), dist = Math.abs(x - x0); return { x, o: Object.assign({ t, walk: dist / (440 * sc), view: 's', flip: x1 >= x0 ? 1 : -1, stride: u < 1 ? 0.85 : 0 }, o) }; };
const WLK = (t, lt, x0, x1, y, dur, sc, o) => { const w = walkX(t, lt, x0, x1, dur, sc, o); return G(hikerFig(w.o), `translate(${f1(w.x)} ${f1(y)}) scale(${sc})`); };
const qmarks = (t, cx, cy, r, n, col = '#fff') => questionMarks(t, cx, cy, r, n, col);
const hint = (x, y, str, sz = 90, col = '#fff') => ptxt(x, y, str, sz, col, 'font-weight="900"');
const goldFlash = (Pf, a, x = 540, y = 960) => glow(Pf, 'A', x, y, 900, a);

function partD(c) {
  const { add, tw, k, E_, S } = c; const sg = i => S[i].start;
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn);
  const bgS = (Pf, t, o) => streetM(Pf, t, o);
  /* ---------- 2.5D (0 a 14.38) ---------- */
  /* 0.0 HOOK: close extremo da maleta aberta, rosto aceso pela luz do dinheiro */
  SN(0, 0.001, (t, lt, Pf) => {
    const u = ez(lt / 1.3), cam = { x: 540 + 10 * Math.sin(t * 3), y: 960 + 40 * (1 - u), z: 1.0 + 0.16 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800 }), blur: 14 },
      { d: 0.6, svg: goldFlash(Pf, 0.55, 540, 900) + HF(t, { eye: 1, pupil: 0.6, worry: 0.1, mouth: 0.25, lookx: 0, looky: 14 }, 540, 640, 1.9) },
      { d: 1.2, svg: caseM(Pf, 540, 1780, 1.8, { open: 1, t }) },
      { d: 1.9, svg: moneyFly(t, 12, 0.95), blur: 6 },
    ]) + goldFlash(Pf, 0.2, 540, 1200) + vignette(Pf, 0.5) + grain(t, 0.05) + FB('#fff', 0.7 * Math.exp(-lt * 14));
  });
  /* maleta abandonada: plano aberto rua + carro (paralaxe) */
  SN(tw('maleta', 0, 1.29), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.2), cam = { x: 540 - 120 * u, y: 1000, z: 1.0 + 0.3 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800 }) },
      { d: 0.7, svg: carM(Pf, 280, 1280, 0.9, '#a8402e', { t }) },
      { d: 1.1, svg: caseM(Pf, 760, 1500, 0.8, { open: 0, t }) + glow(Pf, 'A', 760, 1380, 200, 0.3 + 0.2 * Math.sin(t * 4)) },
      { d: 1.8, svg: lampPost(Pf, 1000, 1700, 2.4) + lampPost(Pf, -80, 1700, 2.4), blur: 14 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* abandonada: carro com pisca */
  SN(tw('abandonada', 0, 1.58), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.9), cam = { x: 540 + 60 * u, y: 1050, z: 1.1 + 0.3 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800, lamps: 0 }), blur: 6 },
      { d: 0.8, svg: carM(Pf, 500, 1400, 1.5, '#a8402e', { t }) },
      { d: 1.5, svg: caseM(Pf, 120, 1800, 1.4, { t }), blur: 6 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* na rua */
  SN(tw('rua', 0, 2.44), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.6), cam = { x: 540, y: 1000 - 60 * u, z: 1.0 + 0.2 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 850 }) },
      { d: 0.8, svg: WLK(t, lt, 120, 560, 1360, 3, 0.9, { bag: 1 }) },
      { d: 1.0, svg: caseM(Pf, 760, 1420, 0.75, { t }) },
      { d: 1.7, svg: lampPost(Pf, 960, 1800, 2.2), blur: 14 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 10 milhões: pilhas de dinheiro subindo + número */
  SN(tw('10', 0, 2.79), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.0), cam = { x: 540, y: 960, z: 1.0 + 0.12 * u };
    let st = ''; for (let i = 0; i < 18; i++) { const f = Math.min(1, Math.max(0, (lt * 18 - i) / 3)); st += G(billStack(140, 90), `translate(${180 + (i % 6) * 144} ${1500 - Math.floor(i / 6) * 100 * f - 0}) scale(${f1(f)})`); }
    return par(Pf, cam, [
      { d: 0.2, svg: BGR('#12301f') + goldFlash(Pf, 0.5, 540, 800) },
      { d: 1.0, svg: st + hint(540, 700, '10.000.000', 130, '#ffe9a0') },
      { d: 1.8, svg: moneyFly(t, 10, 0.9, 9), blur: 6 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* dentro: rosto mirando a maleta */
  SN(tw('dentro', 0, 3.98), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.5), cam = { x: 540, y: 960, z: 1.0 + 0.1 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800 }), blur: 14 },
      { d: 1.0, svg: goldFlash(Pf, 0.5, 540, 1000) + HF(t, { eye: 1, pupil: 0.5, worry: 0, mouth: 0.4, looky: 18 }, 540, 880, 2.7) },
      { d: 1.6, svg: caseM(Pf, 540, 1950, 1.6, { open: 1, t }), blur: 6 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 4.25 duas opções: placa de encruzilhada "1" e "2" */
  SN(sg(1), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.2), cam = { x: 540, y: 960 + 40 * (1 - u), z: 1.0 + 0.12 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: skyM(Pf, 'dusk', 900) + cityLayer(Pf, t, 21, 940, 200, 480, '#3a4166', 0.3) + R(-600, 940, 2280, 1500, '#3a3e48') },
      { d: 0.9, svg: G(R(-14, -700, 28, 700, '#5a606a'), 'translate(540 1500)') + G(P('M-420,-640 L330,-640 L400,-560 L330,-480 L-420,-480Z', '#2f8a78') + hint(-150, -530, '1', 130), 'translate(540 1500)') + G(P('M420,-440 L-330,-440 L-400,-360 L-330,-280 L420,-280Z', '#e07a2e') + hint(150, -330, '2', 130), 'translate(540 1500)') },
      { d: 1.7, svg: moneyFly(t, 6, 0.6, 13), blur: 14 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 5.75 pegar o dinheiro: mão pega maços, chuva de notas, luxo */
  SN(sg(3), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.2), cam = { x: 540, y: 960, z: 1.0 + 0.18 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: BGR('#143a28') + goldFlash(Pf, 0.7, 540, 900) },
      { d: 0.6, svg: carLux(280, 1000, 0.7) + houseM(800, 900, 0.6) },
      { d: 1.1, svg: G(HAND(0, 0, 3.2, '#e0ac86', 0) + G(billStack(240, 150), 'translate(0 -40)'), `translate(${f1(H.lerp(540, 540, u))} ${f1(H.lerp(1900, 1350, u))})`) },
      { d: 1.8, svg: moneyFly(t, 14, 1, 17), blur: 6 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* fazer o que quiser: luxo */
  SN(tw('quiser', 0, 7.43), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.9), cam = { x: 540 - 80 + 160 * u, y: 960, z: 1.15 };
    return par(Pf, cam, [
      { d: 0.1, svg: skyM(Pf, 'day', 900) + R(-600, 900, 2280, 1500, '#4a9a52') },
      { d: 0.7, svg: houseM(540, 1000, 1.7) },
      { d: 1.2, svg: carLux(520, 1700, 1.2, '#e0b030') },
      { d: 1.8, svg: moneyFly(t, 10, 0.9, 19), blur: 6 },
    ]) + vignette(Pf, 0.4) + grain(t, 0.05);
  });
  /* 8.33 segunda: procurar o dono — trilheiro caminha com a maleta, olha em volta */
  SN(sg(4), 0.02, (t, lt, Pf) => {
    const cam = { x: 540 + 40 * Math.sin(lt), y: 1000, z: 1.0 + 0.1 * lt / 2.4 };
    const w = walkX(t, lt, -120, 700, 2.4, 0.95, { bag: 1, holdNear: caseM(Pf, 0, 150, 0.3, {}), look: 1 });
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800 }) },
      { d: 0.8, svg: G(hikerFig(w.o), `translate(${f1(w.x)} 1380) scale(0.95)`) + qmarks(t, w.x + 120, 700, 200, 3, '#fff') },
      { d: 1.7, svg: lampPost(Pf, 1000, 1800, 2.2), blur: 14 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 8.79 procurar o dono / devolver: entrega ao dono */
  SN(sg(5), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 1.5), cam = { x: 540, y: 1000, z: 1.0 + 0.2 * u };
    return par(Pf, cam, [
      { d: 0.1, svg: bgS(Pf, t, { hor: 800, lamps: 0 }), blur: 6 },
      { d: 0.9, svg: G(hikerFig({ t, view: 's', stride: 0, holdNear: caseM(Pf, 60, 140, 0.3, {}), arms: [[50, 40], [10, 10]] }), 'translate(300 1400) scale(1.0)') + G(suitFig({ t, view: 's', flip: -1, stride: 0, arms: [[45, 30], [8, 10]] }), 'translate(780 1400) scale(1.0)') + qmarks(t, 540, 650, 160, 2, '#fff') },
      { d: 1.6, svg: moneyFly(t, 5, 0.5, 23), blur: 14 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 10.28 cada centavo: moeda gigante */
  SN(tw('centavo.', 0, 10.28), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.5);
    return par(Pf, { x: 540, y: 960, z: 1.0 + 0.12 * u }, [
      { d: 0.1, svg: BGR('#143a28') + goldFlash(Pf, 0.6, 540, 900) },
      { d: 1.0, svg: G(C(0, 0, 260, '#e8b840') + C(0, 0, 220, '#f6d070') + TX(0, 70, '¢', 260, '#b8862a') + P('M-140,-90 Q0,-200 140,-90', 'none', 'stroke="#fff" stroke-width="14" opacity="0.5"'), `translate(540 960) rotate(${f1(Math.sin(t * 3) * 6)}) scale(${(Math.cos(t * 4)).toFixed(2) < 0.2 ? 0.2 : Math.abs(Math.cos(t * 2.4)).toFixed(2)} 1)`) },
      { d: 1.8, svg: moneyFly(t, 8, 0.8, 29), blur: 6 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* 10.85 mas tome cuidado: sinal de alerta + olhos nas janelas */
  SN(sg(6), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 0.8), pulse = 1 + 0.06 * Math.sin(t * 9);
    return par(Pf, { x: 540, y: 960, z: 1.0 + 0.15 * u }, [
      { d: 0.1, svg: skyM(Pf, 'dusk', 900) + cityLayer(Pf, t, 21, 940, 260, 600, '#2a2f4a', 0.5) + R(-600, 940, 2280, 1500, '#30343e') },
      { d: 1.0, svg: G(POLY([[0, -260], [250, 180], [-250, 180]], '#f2c030') + POLY([[0, -190], [180, 140], [-180, 140]], '#15171b') + TX(0, 90, '!', 300, '#f2c030'), `translate(540 880) scale(${pulse.toFixed(3)})`) + glow(Pf, 'R', 540, 880, 500, 0.3 + 0.2 * Math.sin(t * 9)) },
      { d: 1.8, svg: eyesPair(Pf, 160, 1500, 1.2, '#fff', 0.6 + 0.4 * Math.sin(t * 5), 40) + eyesPair(Pf, 900, 1700, 1.6, '#fff', 0.5, 50), blur: 6 },
    ]) + vignette(Pf, 0.55) + grain(t, 0.05);
  });
  /* 11.64 decisão muda destino: bifurcação vista de cima, câmera sobe */
  SN(sg(7), 0.02, (t, lt, Pf) => {
    const u = ez(lt / 2.7), cam = { x: 540, y: 1100 - 220 * u, z: 1.0 + 0.5 * u };
    const road = (x1, x2, col) => P(`M440,2000 L640,2000 L${x2 + 80},900 L${x2 - 80},900Z`, col);
    return par(Pf, cam, [
      { d: 0.05, svg: skyM(Pf, 'dusk', 800) },
      { d: 0.35, svg: cityLayer(Pf, t, 11, 900, 160, 380, '#5a6a9a', 0.2) + R(-600, 900, 2280, 1500, '#4a8a50') },
      { d: 0.8, svg: P('M440,2100 L640,2100 L600,1300 L760,950 L700,930 L540,1200 L380,930 L320,950 L480,1300Z', '#4a4e58') + P('M540,1990 L540,1320', 'none', 'stroke="#e8d8a0" stroke-width="10" stroke-dasharray="40 30"') + G(C(0, 0, 80, '#f2c030', OP(0.0)), '') + goldFlash(Pf, 0.3, 700, 900) },
      { d: 1.2, svg: WLK(t, 0, 540, 540, 1500, 1, 0.5, { stride: 0, view: 'b', bag: 1 }) },
      { d: 1.8, svg: wispL(t, 3, 300, 1500, 'rgba(255,255,255,0.35)'), blur: 26 },
    ]) + vignette(Pf, 0.5) + grain(t, 0.05);
  });
  /* ---------- 2D ---------- */
  /* 14.38 se escolher a primeira opção: trilheiro com maleta cheia, sorriso de ganância */
  SN(sg(8), 0.03, (t, lt, Pf) => FZ(Pf, t, BGR('#143a28') + goldFlash(Pf, 0.6, 540, 900) + HF(t, { eye: 0.85, pupil: 0.6, mouth: 0.3, smile: 1, worry: 0, looky: 10 }, 540, 1000, 2.6) + moneyFly(t, 10, 0.9, 31), lt, 1.8, 1.0, 1.1, 540, 1000, 1));
  /* 16.22 coisas que o dinheiro não compra: trilheiro sozinho na mansão vazia, dinheiro caindo */
  SN(sg(10), 0.03, (t, lt, Pf) => { let s = BGR('#1c1e2a') + R(-600, 1300, 2280, 900, '#2a2c38') + glow(Pf, 'A', 540, 700, 700, 0.25) + G(R(-190, -300, 380, 600, '#3a3d4c', 'rx="20"') + R(-170, -280, 340, 560, '#15192a'), 'translate(540 900)'); s += WLK(t, lt, 540, 540, 1760, 1, 1.1, { stride: 0, view: 'b', bag: 1 }) + moneyFly(t, 18, 0.9, 33); return FZ(Pf, t, s, lt, 3.2, 1.0, 1.18, 540, 1100, 1); });
  /* 19.44 voltando para casa, encontra a maleta ao lado do carro */
  SN(sg(11), 0.03, (t, lt, Pf) => { const cam = 1; let s = bgS(Pf, t, { hor: 820 }) + carM(Pf, 760, 1360, 0.9, '#a8402e', { t }) + caseM(Pf, 940, 1470, 0.55, { t }) + WLK(t, lt, -100, 460, 1560, 3.2, 1.2, { bag: 1 }); return FZ(Pf, t, s, lt, 4.8, 1.0, 1.08, 540, 1000, 1); });
  /* 24.24 olha ao redor */
  SN(sg(12), 0.03, (t, lt, Pf) => FZ(Pf, t, bgS(Pf, t, { hor: 820 }) + HW(t, 540, 1700, 1.35, { stride: 0, look: Math.sin(lt * 3), headTilt: 6 * Math.sin(lt * 3), view: 'f', bag: 1 }), lt, 0.6, 1.0, 1.06, 540, 1100, 1));
  /* 24.83 ninguém por perto: rua vazia */
  SN(sg(13), 0.03, (t, lt, Pf) => FZ(Pf, t, bgS(Pf, t, { hor: 820 }) + carM(Pf, 300, 1300, 0.9, '#a8402e', { t }) + caseM(Pf, 760, 1420, 0.7, { t }) + moneyFly(t, 0, 0) , lt, 1.2, 1.0, 1.08, 540, 1050, 1));
  /* 26.05 ao abrir / 26.41 coração dispara */
  SN(sg(14), 0.02, (t, lt, Pf) => { const u = ez(lt / 0.35); return FZ(Pf, t, bgS(Pf, t, { hor: 820, lamps: 0 }) + goldFlash(Pf, 0.5 * u, 540, 1300) + caseM(Pf, 540, 1600, 1.4, { open: u, t }), lt, 0.6, 1.0, 1.15, 540, 1200, 2); });
  SN(sg(15), 0.02, (t, lt, Pf) => { const b = Math.pow(Math.max(0, Math.sin(t * 8)), 6); return FZ(Pf, t, BGR('#2a1a1c') + glow(Pf, 'R', 540, 960, 600 + 200 * b, 0.4) + G(P('M0,60 C-200,-80 -120,-220 0,-120 C120,-220 200,-80 0,60Z', '#c03a3a'), T(540, 1000, 0, 3.0 + 0.4 * b)) + HF(t, { eye: 1, pupil: 0.3, worry: 1, mouth: 0.3, sweat: 1 }, 540, 400, 1.2), lt, 1.0, 1.0, 1.1, 540, 960, 5 * b); });
  /* 27.44 maços de dinheiro organizados */
  SN(sg(16), 0.02, (t, lt, Pf) => { let s = BGR('#143a28') + goldFlash(Pf, 0.6, 540, 900); for (let r = 0; r < 4; r++) for (let q = 0; q < 5; q++) s += G(billStack(170, 100), `translate(${150 + q * 195} ${1000 + r * 130})`); return FZ(Pf, t, s + moneyFly(t, 5, 0.6, 37), lt, 3.5, 1.0, 1.18, 540, 1100, 1); });
  /* 30.83 documento confirma valor / 33.0 dez milhões */
  SN(sg(18), 0.02, (t, lt, Pf) => FZ(Pf, t, BGR('#3a3228') + docM(540, 1000, 1.9, -3, ['VALOR:', 'R$ 10.000.000']) , lt, 1.9, 1.0, 1.12, 540, 1000, 1));
  SN(sg(20), 0.02, (t, lt, Pf) => FZ(Pf, t, BGR('#143a28') + goldFlash(Pf, 0.6, 540, 900) + hint(540, 960, '10.000.000', 150, '#ffe9a0') + hint(540, 1130, 'REAIS', 100, '#fff') + moneyFly(t, 12, 0.9, 41), lt, 1.2, 1.0, 1.15, 540, 960, 2));
  /* 34.21 olha para a rua novamente */
  SN(sg(21), 0.02, (t, lt, Pf) => FZ(Pf, t, bgS(Pf, t, { hor: 820 }) + HW(t, 300, 1700, 1.3, { stride: 0, view: 's', look: 1, headTilt: -4, bag: 1 }) + caseM(Pf, 640, 1650, 0.6, { open: 1, t, glow: 0 }), lt, 1.5, 1.0, 1.08, 540, 1100, 1));
  /* 35.76 nenhuma câmera / 37.34 nenhuma pessoa: sinais riscados */
  SN(sg(22), 0.02, (t, lt, Pf) => { const x = ez(H.prog(lt, 0.4, 0.9)); return FZ(Pf, t, bgS(Pf, t, { hor: 820 }) + G(R(-60, -50, 120, 100, '#2a2f38', 'rx="20"') + C(0, 0, 30, '#6a7a8a') + C(0, 0, 14, '#15171b'), 'translate(540 600) scale(2.6)') + bigX(540, 600, 360, x, '#e04040'), lt, 1.5, 1.0, 1.1, 540, 900, 1); });
  SN(sg(23), 0.02, (t, lt, Pf) => { const x = ez(H.prog(lt, 0.4, 0.9)); return FZ(Pf, t, bgS(Pf, t, { hor: 820 }) + G(E(0, -150, 40, 44, '#2a2f38') + P('M-60,-90 Q0,-120 60,-90 L70,100 L-70,100Z', '#2a2f38'), 'translate(540 800) scale(2.6)') + bigX(540, 800, 400, x, '#e04040'), lt, 1.2, 1.0, 1.1, 540, 900, 1); });
  /* 38.53 então toma sua decisão */
  SN(sg(24), 0.02, (t, lt, Pf) => FZ(Pf, t, BGR('#1c2030') + glow(Pf, 'A', 540, 900, 700, 0.3) + HF(t, { eye: 1, pupil: 0.5, worry: 0.3, mouth: 0, anger: 0.3, looky: 4 }, 540, 1000, 2.7), lt, 1.2, 1.0, 1.2, 540, 1000, 1));
  /* 39.81 pega a maleta */
  SN(sg(25), 0.02, (t, lt, Pf) => { const u = ez(lt / 0.5); return FZ(Pf, t, bgS(Pf, t, { hor: 820, lamps: 1 }) + carM(Pf, 760, 1300, 0.9, '#a8402e', { t }) + caseM(Pf, 540, H.lerp(1650, 1450, u), 1.0, { t }) + G(HAND(0, 0, 2.2, '#e0ac86', 0), `translate(${f1(H.lerp(900, 540, u))} ${f1(H.lerp(1700, 1350, u))})`), lt, 0.9, 1.0, 1.15, 540, 1300, 3); });
}
