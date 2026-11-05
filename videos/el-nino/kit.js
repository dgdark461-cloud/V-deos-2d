/* kit.js - El Niño: personagens e cenários. Paleta clara e quente: céu azul-turquesa, sol amarelo,
   nuvens de tempestade lilás com bordas pêssego iluminadas, verdes de lavoura, oceano azul -> laranja quente.
   Personagem principal: Bia (capa de chuva amarela, cabelo cacheado castanho, sardas). */
const PAL = {
  sky0: '#2fa8f0', sky1: '#8fdcff', sky2: '#fff1c9', sun: '#ffd83a', sunHot: '#ffb21e',
  cloud: '#ffffff', cloudSh: '#cfe3f7', storm0: '#6c6fd0', storm1: '#9d8ef0', stormRim: '#ffc7a0', stormSh: '#4e56b8',
  grass: '#62cc5c', grass2: '#3fae55', field: '#a8e05a', soil: '#d98b4a', road: '#7c8aa6',
  ocean: '#1e9be0', oceanDk: '#1572c4', oceanHi: '#7fe0ff', warm: '#ff8a3d', warm2: '#ff5a3c', cold: '#3fb8ff',
  skin: '#c98a5e', skinSh: '#a86a44', skinHi: '#e3a97c', blush: '#ff8a73', hair: '#4a2618', hairHi: '#8c4a26',
  coat: '#ffc928', coatSh: '#e39a12', coatHi: '#fff07a', trim: '#ff6159', shirt: '#17b3a6', jeans: '#3e6fd8', shoe: '#ff6159',
  ink: '#2a1e3a', white: '#ffffff', rim: '#fff4cf',
  roofA: '#ff6a4d', roofB: '#e8573f', wallA: '#ffe6b3', wallB: '#bfe8ff', wallC: '#ffd0e0', wallD: '#c9f2c0',
};

/* ------------------------------------------------------------ piscadas e respiração */
/* piscada determinística: intervalos de 2,2 a 4,6 s, fecha em ~0,13 s */
function blinkK(t, seed = 0) {
  let acc = -seed * 0.7, i = 0;
  while (acc < t - 6) { acc += 2.2 + 2.4 * hz(i, seed + 3); i++; }
  for (let k = 0; k < 6; k++) {
    const d = t - acc;
    if (d >= 0 && d < 0.14) return Math.sin(d / 0.14 * Math.PI);
    acc += 2.2 + 2.4 * hz(i + k, seed + 3);
    if (acc > t) break;
  }
  return 0;
}
const breath = (t, sp = 1) => Math.sin(t * 2.1 * sp);

/* ------------------------------------------------------------ BIA: rosto em close (origem = centro da cabeça; raio ~150) */
function biaHead(t, o = {}) {
  const d = Object.assign({ lookx: 0, looky: 0, eye: 1, brow: 0, worry: 0, open: 0, smile: 0.3, oShape: 0, tilt: 0, wind: 0, windDir: 1, hood: 0, rim: 1, blinkSeed: 1, cheeks: 1, turn: 0 }, o);
  const bl = blinkK(t, d.blinkSeed), op = Math.max(0.05, d.eye * (1 - bl));
  const tx = d.turn * 40; // giro de cabeça (desloca traços do rosto)
  let s = '';
  /* cabelo de trás (cachos) com vento e sobra */
  const curls = [];
  for (let i = 0; i < 22; i++) {
    const a = -Math.PI * 1.08 + i / 21 * Math.PI * 1.16, rr = 150 + 30 * hz(i, 4);
    const lag = H.noise(t * 2.4 + i * 0.7, 6) * 6 + d.wind * d.windDir * (22 + 26 * hz(i, 8)) * (0.6 + 0.4 * Math.sin(t * 7 + i));
    curls.push([Math.cos(a) * rr + lag, Math.sin(a) * rr * 0.98 - 10 + Math.abs(lag) * 0.1, 50 + 22 * hz(i, 5)]);
  }
  /* mechas laterais longas */
  const sideL = 0.5 * d.wind * d.windDir * 40 + H.noise(t * 2, 9) * 6;
  s += P(`M-150,-40 C-200,40 ${-190 + sideL},170 ${-130 + sideL},230 C-100,190 -120,100 -110,20Z`, PAL.hair);
  s += P(`M150,-40 C200,40 ${190 + sideL},170 ${130 + sideL},230 C100,190 120,100 110,20Z`, PAL.hair);
  curls.forEach(c => { s += C(c[0], c[1], c[2], PAL.hair); });
  /* orelhas */
  s += E(-142 + tx * 0.4, 18, 26, 36, PAL.skinSh) + E(142 + tx * 0.4, 18, 26, 36, PAL.skinSh);
  s += E(-140 + tx * 0.4, 18, 18, 26, PAL.skin) + E(140 + tx * 0.4, 18, 18, 26, PAL.skin);
  s += C(-144 + tx * 0.4, 52, 7, '#ffe26a') + C(144 + tx * 0.4, 52, 7, '#ffe26a');
  /* rosto */
  s += P('M-138,-30 C-142,-150 142,-150 138,-30 C134,80 80,150 0,156 C-80,150 -134,80 -138,-30Z', PAL.skin);
  s += P('M-138,-30 C-134,80 -80,150 0,156 C-60,140 -116,90 -120,-20Z', PAL.skinSh, OP(0.45));
  /* bochechas e sardas */
  if (d.cheeks) {
    s += E(-82 + tx, 58, 30, 18, PAL.blush, OP(0.45 + 0.2 * d.smile)) + E(82 + tx, 58, 30, 18, PAL.blush, OP(0.45 + 0.2 * d.smile));
    for (let i = 0; i < 7; i++) { s += C(-96 + tx + hz(i, 21) * 40, 34 + hz(i, 22) * 20, 3, PAL.skinSh, OP(0.7)) + C(58 + tx + hz(i, 23) * 40, 34 + hz(i, 24) * 20, 3, PAL.skinSh, OP(0.7)); }
  }
  /* olhos */
  const lx = d.lookx * 12, ly = d.looky * 10;
  const eye = (cx) => {
    const ry = 34 * op;
    let e = E(cx, -8, 30, ry + 1, '#fff', ST(PAL.ink, 4));
    if (op > 0.15) {
      const clipId = 'ec' + Math.round(cx + 500);
      e += C(cx + lx, -8 + ly, 19, '#6b3a1f') + C(cx + lx, -8 + ly, 10, '#1d1020') + C(cx + lx + 6, -16 + ly, 6, '#fff') + C(cx + lx - 6, -2 + ly, 2.5, '#fff', OP(0.8));
      /* pálpebra superior (recorte simples: faixa de pele cobrindo o topo quando op<1) */
      if (op < 0.98) e += P(`M${cx - 34},-${8 + 40} L${cx + 34},-${8 + 40} L${cx + 34},${-8 - ry} Q${cx},${-8 - ry - 6} ${cx - 34},${-8 - ry}Z`, PAL.skin);
    } else e += P(`M${cx - 30},-8 Q${cx},4 ${cx + 30},-8`, 'none', ST(PAL.ink, 5));
    /* cílios */
    if (op > 0.15) e += P(`M${cx - 31},${-8 - ry * 0.3} Q${cx},${-8 - ry * 1.25} ${cx + 31},${-8 - ry * 0.3}`, 'none', ST(PAL.ink, 7));
    return e;
  };
  s += eye(-56 + tx) + eye(56 + tx);
  /* sobrancelhas: brow>0 levanta (surpresa), worry inclina para cima no meio */
  const by = -62 - d.brow * 22, wv = d.worry * 14;
  s += P(`M${-92 + tx},${by + 6 + wv * 0.2} Q${-60 + tx},${by - 10} ${-26 + tx},${by + 4 - wv}`, 'none', ST(PAL.hair, 11));
  s += P(`M${92 + tx},${by + 6 + wv * 0.2} Q${60 + tx},${by - 10} ${26 + tx},${by + 4 - wv}`, 'none', ST(PAL.hair, 11));
  /* nariz */
  s += P(`M${-4 + tx * 1.2},20 Q${10 + tx * 1.2},44 ${-10 + tx * 1.2},48`, 'none', ST(PAL.skinSh, 6));
  /* boca */
  const mx = tx * 1.1, my = 92;
  if (d.open > 0.05) {
    const w = lp(30, 22, d.oShape) + 10 * d.smile, h = 10 + 38 * d.open;
    s += P(`M${mx - w},${my} Q${mx},${my - 8 - 6 * d.smile} ${mx + w},${my} Q${mx + w * 0.8},${my + h} ${mx},${my + h} Q${mx - w * 0.8},${my + h} ${mx - w},${my}Z`, '#7a1f2e', ST(PAL.ink, 4));
    s += E(mx, my + h * 0.72, w * 0.55, h * 0.26, '#ff7d86');
    if (d.oShape < 0.5) s += R(mx - w * 0.7, my - 3, w * 1.4, 8, '#fff', 'rx="3"');
  } else {
    const sm = d.smile * 16;
    s += P(`M${mx - 34},${my - sm * 0.5} Q${mx},${my + sm} ${mx + 34},${my - sm * 0.5}`, 'none', ST('#8a2d2d', 7));
  }
  /* franja de cachos sobre a testa (com vento) */
  for (let i = 0; i < 7; i++) {
    const bx = -110 + i * 36 + d.wind * d.windDir * 14 * Math.sin(t * 9 + i) , byy = -128 + 10 * Math.sin(i * 1.7);
    s += C(bx, byy, 34 + 6 * hz(i, 31), PAL.hair);
  }
  for (let i = 0; i < 5; i++) s += P(`M${-90 + i * 42},-150 q14,-12 28,0`, 'none', ST(PAL.hairHi, 6, OP(0.8)));
  /* luz de contorno (lado do sol) */
  if (d.rim) s += P('M132,-40 C130,40 100,110 40,146 C90,100 116,40 120,-36Z', PAL.skinHi, OP(0.8 * d.rim));
  return G(s, `rotate(${f1(d.tilt)})`, 'data-face=""');
}
/* busto com capa de chuva. origem = centro da cabeça */
function biaBust(t, o = {}) {
  const d = Object.assign({ br: 1, hood: 0, wind: 0, windDir: 1, headTilt: 0, headX: 0, headY: 0, armUp: 0, sh: 0 }, o);
  const b = breath(t) * 5 * d.br;
  let s = '';
  /* ombros / capa */
  const hy = 150 + b * 0.4;
  s += P(`M-60,${hy} C-200,${hy + 40} -290,${hy + 120} -310,${hy + 460} L310,${hy + 460} C290,${hy + 120} 200,${hy + 40} 60,${hy}Z`, PAL.coat);
  s += P(`M-310,${hy + 460} C-290,${hy + 140} -230,${hy + 80} -160,${hy + 60} C-200,${hy + 160} -220,${hy + 300} -210,${hy + 460}Z`, PAL.coatSh, OP(0.55));
  s += P(`M120,${hy + 22} C230,${hy + 62} 282,${hy + 150} 298,${hy + 460} L262,${hy + 460} C254,${hy + 180} 214,${hy + 92} 110,${hy + 40}Z`, PAL.coatHi, OP(0.6));
  /* gola + camiseta + zíper */
  s += P(`M-70,${hy - 6} L0,${hy + 110} L70,${hy - 6} L50,${hy + 460} L-50,${hy + 460}Z`, PAL.shirt);
  s += P(`M-88,${hy - 20} Q-40,${hy + 30} -10,${hy + 120} L-40,${hy + 140} Q-100,${hy + 60} -120,${hy - 4}Z`, PAL.trim);
  s += P(`M88,${hy - 20} Q40,${hy + 30} 10,${hy + 120} L40,${hy + 140} Q100,${hy + 60} 120,${hy - 4}Z`, PAL.trim);
  s += C(-120, hy + 230, 12, PAL.trim) + C(-118, hy + 330, 12, PAL.trim);
  /* pescoço */
  s += R(-46, 100, 92, hy - 80, PAL.skinSh, 'rx="30"');
  /* capuz caído atrás (com vento) */
  if (d.hood < 0.98) {
    const hw = d.wind * d.windDir * 30 + H.noise(t * 3, 2) * 5;
    s = P(`M-150,${hy - 30} C-170,${hy - 120} ${-60 + hw},${hy - 150} ${0 + hw},${hy - 140} C${80 + hw},${hy - 150} 170,${hy - 120} 150,${hy - 30}Z`, PAL.coatSh) + s;
  }
  s += G(biaHead(t, Object.assign({}, o, { tilt: d.headTilt })), `translate(${f1(d.headX)} ${f1(d.headY + b * 0.6)})`);
  if (d.hood > 0.02) { const k = H.ease.outBack(cl(d.hood), 1.4); s += G(P(`M-214,140 C-250,-260 250,-260 214,140 C200,180 170,190 150,160 C170,90 160,-40 150,-60 C120,-150 60,-175 0,-176 C-60,-175 -120,-150 -150,-60 C-160,-40 -170,90 -150,160 C-170,190 -200,180 -214,140Z`, PAL.coat) + P('M-196,80 C-216,-160 -110,-226 0,-226', 'none', ST(PAL.coatHi, 14, OP(0.8))) + P('M-150,150 C-176,40 -170,-90 -110,-150 C-60,-182 60,-182 110,-150 C170,-90 176,40 150,150', 'none', ST(PAL.coatSh, 12, OP(0.9))), `translate(0 ${f1((1 - k) * -170)}) scale(${(0.85 + 0.15 * k).toFixed(3)})`, OP(cl(d.hood * 3))); }
  return s;
}

/* ------------------------------------------------------------ BIA corpo inteiro. origem = pés; altura ~560 */
/* view: 'side' (olhando p/ direita), 'front', 'back'. walkDist: distância andada (fase do passo ligada a ela). */
function legPts(hx, hy, thigh, knee, l1 = 122, l2 = 118) {
  const a1 = H.deg(thigh), a2 = H.deg(thigh - knee);
  const kx = hx + Math.sin(a1) * l1, ky = hy + Math.cos(a1) * l1;
  return [[hx, hy], [kx, ky], [kx + Math.sin(a2) * l2, ky + Math.cos(a2) * l2]];
}
function armPts(sx, sy, sh, el, l1 = 92, l2 = 88) {
  const a1 = H.deg(sh), a2 = H.deg(sh + el);
  const ex = sx + Math.sin(a1) * l1, ey = sy + Math.cos(a1) * l1;
  return [[sx, sy], [ex, ey], [ex + Math.sin(a2) * l2, ey + Math.cos(a2) * l2]];
}
function biaBody(t, o = {}) {
  const d = Object.assign({ view: 'front', walk: 0, dist: 0, stride: 300, aL: 8, eL: -10, aR: -8, eR: 10, lean: 0, face: {}, wind: 0, crouch: 0, jump: 0, hood: 0, shadow: 1 }, o);
  let s = '';
  if (d.shadow) s += E(0, 4, 150 - d.jump * 0.3, 20, 'rgba(60,40,90,0.22)');
  const br = breath(t) * 3;
  if (d.view === 'side') {
    const ph = d.dist / d.stride * Math.PI * 2;
    const w = d.walk;
    const bob = w * (-7 * Math.cos(2 * ph)) + (1 - w) * br * 0.5;
    const hy = -240 + bob + d.crouch * 40 - d.jump;
    const legA = legPts(0, hy, w * 27 * Math.sin(ph), 6 + w * 52 * Math.pow(Math.max(0, Math.cos(ph)), 2));
    const legB = legPts(0, hy, w * 27 * Math.sin(ph + Math.PI), 6 + w * 52 * Math.pow(Math.max(0, Math.cos(ph + Math.PI)), 2));
    /* ajusta pé ao chão (y=0): sobe o quadril se o pé de apoio ficou abaixo */
    const low = Math.max(legA[2][1], legB[2][1]);
    const fix = w ? (low - 0) : 0;
    const sh = (pts) => pts.map(p => [p[0], p[1] - fix]);
    const A = sh(legA), B = sh(legB), hyy = hy - fix;
    const foot = (p, ang, col) => G(P('M-14,-14 L44,-10 Q56,0 44,8 L-16,8 Q-22,-4 -14,-14Z', col), `translate(${f1(p[0])} ${f1(p[1])}) rotate(${f1(ang)})`);
    const footAng = (pts) => cl((pts[2][1] - (0 - 0)) * -0.3, -25, 25) + (pts[1][0] - pts[2][0]) * 0.08;
    /* perna de trás (mais escura) */
    s += PL(B, mixc(PAL.jeans, '#1d2f6b', 0.35), 46) + foot(B[2], footAng(B), mixc(PAL.shoe, '#7a1f1f', 0.35));
    /* braço de trás */
    const ty = hyy - 150, twist = w * 6 * Math.sin(ph);
    const armB = armPts(6 - twist, ty + 10, w * 24 * Math.sin(ph) + d.aL * (1 - w), -(w * (14 + 12 * Math.max(0, Math.sin(ph))) + 10));
    s += PL(armB, mixc(PAL.coat, PAL.coatSh, 0.8), 38) + C(armB[2][0], armB[2][1], 17, PAL.skinSh);
    /* tronco (capa) com sobra na barra */
    const hem = H.noise(t * 3 + d.dist * 0.01, 4) * 8 * (0.3 + w) - w * 10 * Math.sin(ph * 2 - 0.8);
    s += G(P(`M-58,0 C-62,-60 -50,-140 -36,-176 L40,-176 C60,-140 70,-60 ${78 + hem},14 Q10,26 ${-66 + hem * 0.6},10Z`, PAL.coat) + P(`M-58,0 C-62,-60 -50,-140 -36,-176 L-10,-176 C-24,-120 -30,-50 ${-30 + hem * 0.5},16Z`, PAL.coatSh, OP(0.5)) + L(30, -170, 44, 2, PAL.trim, 6) + P('M38,-160 C56,-110 62,-50 66,0', 'none', ST(PAL.coatHi, 8, OP(0.7))), `translate(${f1(twist * 0.5)} ${f1(hyy)}) rotate(${f1(d.lean + w * 4)})`);
    /* perna da frente */
    s += PL(A, PAL.jeans, 46) + foot(A[2], footAng(A), PAL.shoe);
    /* cabeça de perfil (contramovimento atrasado) */
    const headRot = w * 2.5 * Math.sin(2 * ph - 0.6) + d.lean * 0.5;
    const hx = 12 + twist * 0.3, hY = hyy - 176 - 70;
    const hairLag = w * -5 * Math.sin(2 * ph - 1.2) - d.wind * 18;
    let hd = '';
    for (let i = 0; i < 12; i++) { const a = Math.PI * 0.55 + i / 11 * Math.PI * 1.25; hd += C(Math.cos(a) * 62 + hairLag * (i / 11), Math.sin(a) * 60 - 4, 26 + 6 * hz(i, 41), PAL.hair); }
    hd += R(-14, 40, 30, 36, PAL.skinSh, 'rx="10"');
    hd += P('M-40,-30 C-40,-74 40,-74 52,-30 C58,-10 70,4 66,14 C60,20 56,22 56,30 C54,56 30,70 0,66 C-34,62 -46,30 -40,-30Z', PAL.skin);
    hd += E(-14, 6, 15, 20, PAL.skinSh) + E(-14, 6, 9, 13, PAL.skin);
    const bl = blinkK(t, 4), fo = d.face;
    hd += (bl > 0.5 ? P('M24,-8 Q32,-2 40,-8', 'none', ST(PAL.ink, 4)) : E(32, -8, 9, 12 * (fo.eye || 1), '#fff', ST(PAL.ink, 3)) + C(35, -8, 6, '#1d1020'));
    hd += P(`M20,${-28 - (fo.brow || 0) * 8} Q32,${-34 - (fo.brow || 0) * 8} 44,${-28 - (fo.brow || 0) * 8}`, 'none', ST(PAL.hair, 6));
    hd += (fo.open > 0.1 ? E(46, 36, 8, 4 + 8 * fo.open, '#7a1f2e') : P('M36,36 Q46,42 54,34', 'none', ST('#8a2d2d', 4)));
    hd += E(40, 20, 10, 6, PAL.blush, OP(0.5));
    for (let i = 0; i < 6; i++) { const a = -Math.PI * 0.95 + i / 5 * Math.PI * 0.6; hd += C(Math.cos(a) * 50 + hairLag * 0.3, Math.sin(a) * 52 - 14, 22, PAL.hair); }
    hd += P('M30,-64 C50,-60 62,-40 64,-20', 'none', ST(PAL.rim, 5, OP(0.8)));
    s += G(hd, `translate(${f1(hx)} ${f1(hY)}) rotate(${f1(headRot)})`, 'data-face=""');
    /* braço da frente */
    const armA = armPts(10 + twist, ty + 14, w * 24 * Math.sin(ph + Math.PI) + d.aR * (1 - w), -(w * (14 + 12 * Math.max(0, Math.sin(ph + Math.PI))) + 10) + d.eR * (1 - w));
    s += PL(armA, PAL.coat, 40) + C(armA[2][0], armA[2][1], 18, PAL.skin);
    return s;
  }
  /* frente / costas */
  const hy = -236 + br * 0.4 + d.crouch * 50 - d.jump;
  const sway = Math.sin(t * 1.3) * 3;
  const lL = legPts(-30, hy, 3 + d.crouch * 30, d.crouch * 60), lR = legPts(30, hy, -3 - d.crouch * 30, -d.crouch * 60);
  const fixY = (pts) => { const dy = pts[2][1] - (0 - d.jump); return pts.map((p, i) => [p[0], p[1] - (i ? dy * (i / 2) : 0)]); };
  s += PL(fixY(lL), PAL.jeans, 48) + PL(fixY(lR), PAL.jeans, 48);
  s += E(-36, -d.jump - 2, 34, 16, PAL.shoe) + E(36, -d.jump - 2, 34, 16, PAL.shoe);
  const ty = hy - 170;
  const hem = H.noise(t * 2.5, 7) * 8 + d.wind * 20 * Math.sin(t * 6);
  s += G(P(`M-80,${170 + hem * 0.3} C-90,100 -78,20 -60,-4 L60,-4 C78,20 90,100 ${84 + hem},170 Q0,186 -80,${170 + hem * 0.3}Z`, PAL.coat) + (d.view === 'front' ? L(0, 0, 0, 176, PAL.trim, 7) + P('M-40,-4 L0,40 L40,-4Z', PAL.shirt) + C(-30, 70, 7, PAL.trim) + C(-30, 120, 7, PAL.trim) : P('M-60,-4 C-90,30 -80,70 0,80 C80,70 90,30 60,-4Z', PAL.coatSh, OP(0.7))) + P('M58,14 C74,60 78,120 74,164', 'none', ST(PAL.coatHi, 8, OP(0.7))), `translate(${f1(sway * 0.3)} ${f1(ty)}) rotate(${f1(d.lean)})`);
  const shY = ty + 12;
  const arm = (side, a, e) => { const pts = armPts(side * 62 + sway * 0.3, shY, -side * a, -side * e); return PL(pts, PAL.coat, 38) + C(pts[2][0], pts[2][1], 18, PAL.skin); };
  s += arm(-1, d.aL, d.eL) + arm(1, d.aR, d.eR);
  const hx = sway * 0.5, hY = ty - 74;
  if (d.view === 'front') s += G(biaHead(t, Object.assign({ blinkSeed: 7 }, d.face)), `translate(${f1(hx)} ${f1(hY)}) scale(0.44) rotate(${f1(d.lean * 0.6)})`);
  else {
    let hd = R(-22, 30, 44, 50, PAL.skinSh, 'rx="16"');
    for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; hd += C(Math.cos(a) * 52 + d.wind * 10 * Math.sin(t * 7 + i), Math.sin(a) * 54 - 6, 28 + 6 * hz(i, 51), PAL.hair); }
    hd += C(0, -6, 52, PAL.hair) + P('M30,-52 C60,-40 70,0 60,30', 'none', ST(PAL.hairHi, 7, OP(0.8)));
    s += G(hd, `translate(${f1(hx)} ${f1(hY)})`);
  }
  return s;
}
const BIA = (t, o, x, y, sc = 1, flip = 1) => G(biaBody(t, o), `translate(${f1(x)} ${f1(y)}) scale(${(sc * flip).toFixed(3)} ${sc.toFixed(3)})`);

/* ------------------------------------------------------------ figurantes (rosto+busto) para multidão */
const FOLK = [
  { skin: '#f0c49c', hair: '#2b2b33', top: '#ff7a59', style: 0 }, { skin: '#8d5a3b', hair: '#1b1414', top: '#4fc3f7', style: 1 },
  { skin: '#e8b48c', hair: '#c9c9c9', top: '#9be15d', style: 2 }, { skin: '#b97a50', hair: '#5a2e1a', top: '#b388ff', style: 3 },
  { skin: '#f3d0b0', hair: '#e0a030', top: '#ffd54f', style: 1 }, { skin: '#6e4630', hair: '#141010', top: '#ff8a80', style: 4 },
];
function folkBust(t, i, o = {}) {
  const f = FOLK[i % FOLK.length], d = Object.assign({ scared: 1, look: -0.4, umbrella: 0, umbCol: '#ff4f7b' }, o);
  const b = breath(t + i) * 3, sh = d.scared * H.noise(t * 14 + i * 3, 3) * 2;
  let s = P(`M-110,${150 + b} C-110,90 -60,70 0,70 C60,70 110,90 110,${150 + b} L120,320 L-120,320Z`, f.top) + P('M60,80 C96,96 108,130 112,200', 'none', ST(PAL.rim, 6, OP(0.7)));
  s += R(-20, 30, 40, 50, mixc(f.skin, '#000', 0.15), 'rx="14"');
  const hairBack = [
    () => E(0, -20, 70, 74, f.hair),
    () => C(0, -10, 78, f.hair) + C(-60, 30, 40, f.hair) + C(60, 30, 40, f.hair),
    () => E(0, -34, 62, 56, f.hair),
    () => P('M-70,-10 C-80,-90 80,-90 70,-10 L80,80 L-80,80Z', f.hair),
    () => E(0, -30, 66, 60, f.hair),
    () => C(0, -40, 60, f.hair) + C(-50, -70, 30, f.hair) + C(50, -70, 30, f.hair) + C(0, -90, 34, f.hair),
  ][f.style]();
  s += hairBack;
  s += E(0, 0, 58, 64, f.skin);
  const op = 1 - blinkK(t, i + 11), ey = (d.scared ? 13 : 10) * Math.max(0.1, op);
  s += E(-22, -6, 11, ey, '#fff', ST(PAL.ink, 2.5)) + E(22, -6, 11, ey, '#fff', ST(PAL.ink, 2.5));
  if (op > 0.3) s += C(-22 + d.look * 5, -6 - d.scared * 3, 5, '#1d1020') + C(22 + d.look * 5, -6 - d.scared * 3, 5, '#1d1020');
  s += P(`M-34,${-30 - d.scared * 8} L-12,${-26 - d.scared * 4}`, 'none', ST(f.hair, 5)) + P(`M34,${-30 - d.scared * 8} L12,${-26 - d.scared * 4}`, 'none', ST(f.hair, 5));
  s += d.scared > 0.5 ? E(0, 34, 10, 13, '#7a1f2e') : P('M-14,32 Q0,40 14,32', 'none', ST('#8a2d2d', 4));
  if (f.style === 2) s += P('M-60,-30 C-50,-80 50,-80 60,-30 C30,-56 -30,-56 -60,-30Z', f.hair);
  if (f.style === 4) s += P('M-60,-20 C-60,-90 60,-90 60,-20 C40,-50 -20,-60 -60,-20Z', f.hair);
  s += P('M40,-50 C58,-30 60,0 52,24', 'none', ST(PAL.rim, 4, OP(0.7)));
  if (d.umbrella) {
    const k = d.umbrella;
    s += L(70, 200, 70, -170 * k, '#3b2a4a', 6) + G(P('M-150,0 Q0,-120 150,0 Q112,-16 75,0 Q37,-16 0,0 Q-37,-16 -75,0 Q-112,-16 -150,0Z', d.umbCol) + P('M-150,0 Q-60,-100 0,-110', 'none', ST('#fff', 5, OP(0.4))), `translate(70 ${f1(-170 * k)}) scale(${f1(k)} ${f1(k)})`);
  }
  return G(s, `translate(${f1(sh)} 0)`, 'data-face=""');
}
/* agente da Defesa Civil (genérico: macacão laranja, capacete, colete refletivo, sem logotipos reais) */
function rescuer(t, o = {}) {
  const d = Object.assign({ look: 0, talk: 0 }, o);
  const b = breath(t) * 4;
  let s = E(0, 4, 160, 22, 'rgba(60,40,90,0.22)');
  s += PL([[-34, -240], [-38, -120], [-40, 0]], '#ff7a1a', 54) + PL([[34, -240], [38, -120], [40, 0]], '#ff7a1a', 54) + E(-44, -6, 38, 16, '#4a3a5a') + E(44, -6, 38, 16, '#4a3a5a');
  s += P(`M-92,-230 C-100,-330 -80,${-420 + b} 0,${-424 + b} C80,${-420 + b} 100,-330 92,-230Z`, '#ff7a1a') + R(-92, -330, 184, 20, '#e6f86a') + R(-92, -280, 184, 20, '#e6f86a') + R(-40, -400, 80, 60, '#ff9a4a', 'rx="8"');
  s += PL([[-90, -400], [-130, -320], [-80, -280]], '#ff7a1a', 40) + C(-80, -280, 20, PAL.skinHi);
  /* tablet */
  s += G(R(-70, -60, 140, 100, '#2a2a3a', 'rx="12"') + R(-60, -50, 120, 80, '#9fe7ff') + R(-50, -40, 60, 10, '#fff', OP(0.8)) + R(-50, -22, 90, 8, '#fff', OP(0.6)) + R(-50, -8, 70, 8, '#fff', OP(0.6)), `translate(60 ${-300 + b}) rotate(-12)`);
  s += PL([[90, -400], [120, -330], [60, -300]], '#ff7a1a', 40);
  s += G(E(0, 0, 54, 60, PAL.skinHi) + E(-20, -4, 7, 9 * (1 - blinkK(t, 5)) + 1, '#1d1020') + E(20, -4, 7, 9 * (1 - blinkK(t, 5)) + 1, '#1d1020') + P('M-26,-26 L-10,-24 M26,-26 L10,-24', 'none', ST('#3a2a2a', 5)) + (d.talk > 0.2 ? E(0, 30, 12, 6 + 8 * d.talk, '#7a1f2e') : P('M-14,28 Q0,34 14,28', 'none', ST('#8a2d2d', 4))) + E(0, 44, 40, 14, '#6a4a3a', OP(0.35)) +
    P('M-64,-14 C-64,-90 64,-90 64,-14 L76,-10 L-76,-10Z', '#ffd21e') + R(-8, -88, 16, 30, '#ffe866', 'rx="6"') + P('M30,-74 C52,-60 62,-40 64,-16', 'none', ST('#fff7c0', 6)), `translate(${f1(d.look * 6)} ${f1(-480 + b)})`, 'data-face=""');
  return s;
}

/* ------------------------------------------------------------ mãos e objetos de mão */
/* mão estilizada: origem = pulso; aponta para cima. pose: 'open' | 'point' | 'thumb' */
function hand(x, y, s, rot, pose = 'open', sleeve = true) {
  const sk = PAL.skin, sh = PAL.skinSh;
  let h = '';
  if (sleeve) h += R(-56, 30, 112, 260, PAL.coat, 'rx="40"') + R(-60, 22, 120, 34, PAL.trim, 'rx="16"');
  h += E(0, -40, 58, 66, sk);
  if (pose === 'point') h += R(-12, -190, 30, 130, sk, 'rx="15"') + E(-30, -82, 20, 28, sh) + E(10, -86, 20, 28, sh, OP(0.6)) + R(-70, -70, 30, 70, sk, 'rx="15" transform="rotate(-30 -55 -35)"');
  else if (pose === 'thumb') h += R(-14, -170, 34, 110, sk, 'rx="17" transform="rotate(-15 0 -60)"');
  else for (let i = 0; i < 4; i++) h += R(-50 + i * 30, -150 + Math.abs(i - 1.5) * 12, 26, 100, sk, 'rx="13"');
  if (pose !== 'thumb') h += R(-80, -80, 28, 70, sk, 'rx="14" transform="rotate(-38 -66 -45)"');
  h += P('M40,-90 C56,-60 58,-20 44,10', 'none', ST(PAL.skinHi, 6, OP(0.8)));
  return G(h, T(x, y, rot, s));
}
function binoculars(x, y, s, rot) {
  return G(R(-120, -50, 100, 100, '#3a2f5a', 'rx="30"') + R(20, -50, 100, 100, '#3a2f5a', 'rx="30"') + R(-30, -20, 60, 40, '#2a2140') + C(-70, -50, 40, '#8be0ff', ST('#2a2140', 10)) + C(70, -50, 40, '#8be0ff', ST('#2a2140', 10)) + C(-82, -62, 12, '#fff', OP(0.8)) + C(58, -62, 12, '#fff', OP(0.8)), T(x, y, rot, s));
}
function magnifier(x, y, s, rot, inner = '') {
  return G(L(80, 80, 210, 210, '#7a4fd8', 38) + L(80, 80, 210, 210, '#9a74ff', 16) + inner + C(0, 0, 130, '#bff4ff', OP(0.18)) + C(0, 0, 130, 'none', ST('#ffb21e', 26)) + C(0, 0, 130, 'none', ST('#ffe27a', 8)) + P('M-80,-60 Q-60,-96 -20,-104', 'none', ST('#fff', 12, OP(0.8))), T(x, y, rot, s));
}
