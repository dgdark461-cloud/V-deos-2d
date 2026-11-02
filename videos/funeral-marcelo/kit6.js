/* kit6.js - Funeral do Marcelo: estilo adulto/cinematográfico, paleta cinza-esverdeada de dia nublado, personagens consistentes. */
const FK = {
  mar: { skin: '#c99a78', sh: '#8f6450', hair: '#4a3326', hl: '#6a4c38', cloth: '#7f93a8', clothSh: '#566679', jacket: '#2c3038', style: 'short', stub: 0.8, bags: 0.5 },
  esp: { skin: '#d6b198', sh: '#9c735f', hair: '#2a1d1c', hl: '#4a3836', cloth: '#14141a', clothSh: '#0a0a0e', jacket: '#14141a', style: 'long', stub: 0, bags: 1.3, fem: 1 },
  irm: { skin: '#c4957a', sh: '#8a5e4c', hair: '#14110f', hl: '#32292a', cloth: '#e8eaee', clothSh: '#b4b8c0', jacket: '#0c0d11', style: 'slick', stub: 0.55, bags: 0.2, tie: '#0a0a0c', cold: 1 },
  iry: { skin: '#cc9f84', sh: '#93654f', hair: '#14110f', hl: '#32292a', cloth: '#9aa6b4', clothSh: '#6a7684', jacket: '#3a4a5a', style: 'boy', stub: 0, bags: 0 },
  m1: { skin: '#b98a6a', sh: '#7f5846', hair: '#2a2420', hl: '#443a34', cloth: '#d8dce2', clothSh: '#a0a4ac', jacket: '#16171c', style: 'bald', stub: 0.4, bags: 0.6 },
  m2: { skin: '#e0bfa4', sh: '#a8806a', hair: '#bdbdc2', hl: '#dcdce0', cloth: '#1a1a20', clothSh: '#101014', jacket: '#1a1a20', style: 'bun', stub: 0, bags: 1.0, fem: 1, wr: 1 },
  m3: { skin: '#8f6448', sh: '#634330', hair: '#16120f', hl: '#2c2420', cloth: '#d0d4da', clothSh: '#9a9ea6', jacket: '#101216', style: 'short', stub: 0.5, bags: 0.4 },
  m4: { skin: '#dcb394', sh: '#a47a62', hair: '#5a3a2a', hl: '#7a5a46', cloth: '#1a1a22', clothSh: '#101016', jacket: '#1a1a22', style: 'long', stub: 0, bags: 0.6, fem: 1 },
};
function FM(t, o = {}) {
  const d = Object.assign({ kind: 'mar', eye: 1, lookx: 0, looky: 0, brow: 0, mouth: 0, smile: 0, tilt: 0, sweat: 0, trem: 0, pal: 0, tears: 0, wet: 0, cry: 0, body: 1, up: 0 }, o), K = FK[d.kind];
  const bl = (t % 4.1) < 0.11 ? 0.1 : 1, ey = Math.max(0.05, Math.min(1.4, d.eye)) * bl, lx = d.lookx * 9, ly = d.looky * 6, br = Math.sin(t * 1.3) * 2 + (d.trem ? H.noise(t * 38, 4) * 3.5 * d.trem : 0);
  const skin = d.pal ? mixc(K.skin, '#d8dcd6', d.pal) : K.skin, sh = d.pal ? mixc(K.sh, '#8a9490', d.pal) : K.sh, ink = 'stroke="#0a0a0e" stroke-width="2.4" stroke-linejoin="round"';
  let s = '';
  /* ombros e roupa */
  if (d.body) {
    s += P('M-130,170 Q-150,260 -200,340 L200,340 Q150,260 130,170 Q60,196 0,196 Q-60,196 -130,170Z', K.jacket);
    if (d.kind === 'esp') s += P('M-60,190 Q0,260 60,190 L48,230 Q0,300 -48,230Z', '#0a0a0e') + P('M-50,196 Q0,236 50,196', 'none', 'stroke="#2a2a32" stroke-width="3"');
    else if (d.kind === 'm2' || d.kind === 'm4') s += P('M-56,190 Q0,244 56,190 L44,226 Q0,270 -44,226Z', '#0a0a0e');
    else { s += P('M-52,186 L0,260 L52,186 L40,176 L0,214 L-40,176Z', K.cloth) + P('M-52,186 L0,260 L0,214 L-40,176Z', K.clothSh);
      if (K.tie) s += P('M-9,222 L9,222 L15,330 L0,348 L-15,330Z', K.tie) + P('M-12,206 L12,206 L8,226 L-8,226Z', K.tie);
      s += P('M-130,170 Q-90,230 -52,186 L-40,176 Q-80,196 -130,170Z', '#00000033') + P('M130,170 Q90,230 52,186 L40,176 Q80,196 130,170Z', '#00000033');
      s += P('M-30,236 L-24,330 M30,236 L24,330', 'none', 'stroke="#000" stroke-width="2" opacity="0.25"'); }
  }
  s += P('M-34,120 Q-36,190 -50,200 Q0,230 50,200 Q36,190 34,120Z', sh);
  s += E(-112, 20, 14, 28, skin, ink) + E(112, 20, 14, 28, skin, ink);
  if (K.style === 'long') s += P('M-124,-20 Q-150,-190 0,-196 Q150,-190 124,-20 Q148,120 126,260 L70,260 Q90,80 80,-10 L-80,-10 Q-90,80 -70,260 L-126,260 Q-148,120 -124,-20Z', K.hair);
  if (K.style === 'bun') s += C(0, -184, 40, K.hair);
  /* cabeça (oval realista: mais estreita no queixo) */
  s += P('M-112,-20 Q-118,-130 0,-150 Q118,-130 112,-20 Q116,60 84,112 Q50,160 0,164 Q-50,160 -84,112 Q-116,60 -112,-20Z', skin, ink);
  /* sombra do lado direito e abaixo do queixo (luz fria da esquerda-cima) */
  s += P('M30,-146 Q118,-130 112,-20 Q116,60 84,112 Q50,160 0,164 Q60,120 70,40 Q80,-40 30,-146Z', sh, OP(0.42));
  s += P('M-84,112 Q-50,160 0,164 Q50,160 84,112 Q50,142 0,146 Q-50,142 -84,112Z', '#000', OP(0.12));
  if (K.stub) s += P('M-100,30 Q-98,120 0,160 Q98,120 100,30 Q76,92 46,92 Q24,80 0,86 Q-24,80 -46,92 Q-76,92 -100,30Z', '#241a1a', OP(0.3 * K.stub));
  /* cabelo */
  const hs = K.style;
  if (hs === 'short' || hs === 'boy') s += P('M-116,-18 Q-136,-172 0,-182 Q136,-172 116,-18 Q112,-74 76,-98 Q32,-70 -26,-102 Q-84,-82 -102,-52 Q-112,-40 -116,-18Z', K.hair) + P('M-90,-120 Q-30,-168 40,-150', 'none', `stroke="${K.hl}" stroke-width="6" stroke-linecap="round" opacity="0.7"`);
  if (hs === 'slick') s += P('M-116,-18 Q-134,-166 0,-178 Q134,-166 116,-18 Q104,-86 36,-106 Q-34,-102 -92,-78 Q-112,-54 -116,-18Z', K.hair) + P('M-70,-140 Q0,-166 70,-136 M-90,-110 Q-10,-138 90,-104', 'none', `stroke="${K.hl}" stroke-width="5" opacity="0.6"`);
  if (hs === 'long') s += P('M-116,-18 Q-134,-170 0,-182 Q134,-170 116,-18 Q96,-110 20,-128 Q-60,-108 -116,-18Z', K.hair) + P('M-60,-150 Q0,-170 60,-148', 'none', `stroke="${K.hl}" stroke-width="5" opacity="0.5"`);
  if (hs === 'bun') s += P('M-116,-18 Q-134,-166 0,-178 Q134,-166 116,-18 Q102,-100 0,-114 Q-102,-100 -116,-18Z', K.hair);
  if (hs === 'bald') s += P('M-116,-18 Q-120,-100 -92,-100 Q-112,-60 -116,-18Z', K.hair, OP(0.6)) + P('M116,-18 Q120,-100 92,-100 Q112,-60 116,-18Z', K.hair, OP(0.6)) + P('M-40,-140 Q0,-156 40,-140', 'none', 'stroke="#fff" stroke-width="6" opacity="0.12"');
  if (d.wet) s += [0, 1, 2, 3, 4, 5].map(i => L(-80 + i * 30, -150 + hz(i, 3) * 30, -76 + i * 30, -118 + hz(i, 4) * 40, '#cfe0f0', 2, OP(0.35))).join('');
  /* olhos amendoados com pálpebras */
  const eye = (cx, sg) => { const w = 30, h = 13 * ey + 1.5, ir = 10.5 * (0.9 + 0.1 * Math.min(1.3, d.eye));
    return G(P(`M${-w},0 Q0,${-h * 1.4} ${w},-2 Q0,${h} ${-w},0Z`, '#e9e6e0', ink) + C(lx, ly, ir, K.fem ? '#3a2a22' : '#3c2a1e') + C(lx, ly, 5, '#050507') + C(lx + 3, ly - 3, 2.6, '#fff', OP(0.9)) + P(`M${-w - 2},0 Q0,${-h * 1.5 - 4} ${w + 2},-2`, 'none', 'stroke="#0a0a0e" stroke-width="4.5" stroke-linecap="round"') + P(`M${-w},2 Q0,${h + 3} ${w},0`, 'none', `stroke="${sh}" stroke-width="2.5" opacity="0.6"`) + (K.fem ? P(`M${w},-2 L${w + 8},-8`, 'none', 'stroke="#0a0a0e" stroke-width="3"') : ''), `translate(${cx} -10)`); };
  s += eye(-46) + eye(46);
  if (K.bags) s += [-46, 46].map(cx => P(`M${cx - 28},12 Q${cx},${28 + 8 * K.bags} ${cx + 28},12`, 'none', `stroke="${sh}" stroke-width="${f1(4 + 3 * K.bags)}" stroke-linecap="round" opacity="${f1(0.3 + 0.18 * K.bags)}"`)).join('');
  /* sobrancelhas */
  const bw = d.brow * 12, bi = (K.cold ? 5 : 0) + (d.brow > 0 ? 0 : 0);
  s += P(`M-80,${-44 + bi - (d.up ? 8 : 0)} Q-48,${-62 - (d.up ? 8 : 0)} -16,${-46 + bw + bi}`, 'none', `stroke="${K.hair}" stroke-width="8" stroke-linecap="round"`) + P(`M80,${-44 + bi - (d.up ? 8 : 0)} Q48,${-62 - (d.up ? 8 : 0)} 16,${-46 + bw + bi}`, 'none', `stroke="${K.hair}" stroke-width="8" stroke-linecap="round"`);
  if (K.wr) s += [0, 1].map(i => P(`M-70,${-86 + i * 10} q70,-12 140,0`, 'none', `stroke="${sh}" stroke-width="2.5" opacity="0.4"`)).join('') + P('M-60,46 Q-44,90 -18,104 M60,46 Q44,90 18,104', 'none', `stroke="${sh}" stroke-width="3" opacity="0.45"`);
  /* nariz */
  s += P('M-4,-20 Q-8,28 -16,40 Q0,54 16,40 Q10,34 6,-20Z', sh, OP(0.35)) + P('M-16,40 Q0,52 16,40', 'none', `stroke="${sh}" stroke-width="3.5" stroke-linecap="round"`) + P('M-3,-18 L-5,34', 'none', 'stroke="#fff" stroke-width="4" opacity="0.14" stroke-linecap="round"');
  /* boca */
  const mo = d.mouth, sm = d.smile, my = 92;
  if (mo > 0.05) s += P(`M-30,${my} Q0,${my - 6 + 2 * mo} 30,${my} Q24,${my + 8 + 34 * mo} 0,${my + 10 + 36 * mo} Q-24,${my + 8 + 34 * mo} -30,${my}Z`, '#40161c', ink) + (mo > 0.3 ? P(`M-22,${my + 2} Q0,${my - 2} 22,${my + 2} L20,${my + 10} Q0,${my + 7} -20,${my + 10}Z`, '#ece8e0') : '') + P(`M-32,${my} Q0,${my - 8} 32,${my}`, 'none', 'stroke="#7a3a3a" stroke-width="4" stroke-linecap="round"');
  else s += P(`M-30,${my - 3 * sm - 3 * d.cry} Q0,${my + 7 + 14 * sm - 8 * d.cry} 30,${my - 3 * sm - 3 * d.cry}`, 'none', `stroke="${K.fem ? '#9a4a52' : '#6a3434'}" stroke-width="${K.fem ? 7 : 5.5}" stroke-linecap="round"`) + P(`M-24,${my + 8 + 4 * sm} Q0,${my + 14 + 6 * sm} 24,${my + 8 + 4 * sm}`, 'none', `stroke="${sh}" stroke-width="3" opacity="0.4"`);
  if (K.cold) s += P('M-36,92 Q-30,96 -22,94', 'none', 'stroke="#000" stroke-width="2" opacity="0.3"');
  if (d.sweat > 0) s += P('M96,-70 Q108,-44 96,-34 Q84,-44 96,-70Z', '#bfd6ee', OP(0.85 * d.sweat) + ' stroke="#fff" stroke-width="1.5"');
  if (d.tears > 0) s += [-46, 46].map((cx, k) => P(`M${cx + (k ? 20 : -20)},12 Q${cx + (k ? 26 : -26)},${50 + 40 * ((t * 0.5 + k * 0.4) % 1)} ${cx + (k ? 16 : -16)},${70 + 50 * ((t * 0.5 + k * 0.4) % 1)}`, 'none', `stroke="#cfe6ff" stroke-width="5" stroke-linecap="round" opacity="${0.8 * d.tears}"`)).join('') + E(-46, 10, 26, 6, '#f08a8a', OP(0.2 * d.tears)) + E(46, 10, 26, 6, '#f08a8a', OP(0.2 * d.tears));
  return G(s, `translate(0 ${f1(br)}) rotate(${d.tilt})`);
}
const FMX = (t, o, x = 540, y = 1000, sc = 2.6) => G(FM(t, o), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
/* iluminação cinematográfica em cima de qualquer plano: vinheta + granulado + chuva */
const GRADE = (t, o = {}) => { const rn = o.rain === undefined ? 0.35 : o.rain; let s = '';
  if (rn > 0) s += rainFx(t, Math.round(44 * rn / 0.35), 1080, 1920, `rgba(200,215,230,${0.22 * Math.min(1.4, rn / 0.35)})`, 0.2, 2.2);
  s += '<defs><radialGradient id="vigX" cx="0.5" cy="0.5" r="0.75"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></radialGradient></defs>' + R(-400, -400, 1880, 2720, 'url(#vigX)');
  s += R(-400, -400, 1880, 2720, o.tint || '#2a3a44', OP(o.tintA === undefined ? 0.08 : o.tintA));
  for (let i = 0; i < 26; i++) s += C(hz(i, Math.floor(t * 24) + 3) * 1080, hz(i, Math.floor(t * 24) + 4) * 1920, 1.3, '#fff', OP(0.08));
  return s; };
/* figura de pessoa de luto (silhueta com guarda-chuva), para multidão */
const MOURN = (t, x, y, sc, k = 0, o = {}) => { const umb = o.umb !== false, bow = Math.sin(t * 0.8 + k) * 0.5, cols = ['#14161c', '#1a1c22', '#101216', '#1c1a20'], uc = ['#0c0d11', '#202a36', '#12151a', '#262a30'];
  return G((umb ? P('M-120,-300 Q0,-400 120,-300 Q60,-318 0,-312 Q-60,-318 -120,-300Z', uc[k % 4]) + L(0, -312, 0, -150, '#0a0a0c', 4) : '') + P('M-44,0 L-38,-170 Q-62,-184 -54,-246 Q-46,-296 -20,-300 Q0,-330 20,-300 Q46,-296 54,-246 Q62,-184 38,-170 L44,0Z', cols[k % 4]) + (o.face ? G(FM(t, { kind: o.face, eye: 0.9, body: 0, brow: 0.2, mouth: 0, ...(o.fo || {}) }), 'translate(0 -250) scale(0.22)') : C(0, -262, 26, '#2a2420')) + P('M-30,-170 Q0,-160 30,-170', 'none', 'stroke="#000" stroke-width="3" opacity="0.4"'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(bow)}) scale(${sc})`); };
/* céu nublado + cemitério (lápides em perspectiva, cruzes, árvores escuras, muro) */
const CEMBG = (Pf, t, o = {}) => { const hy = o.hy || 760; let s = R(-400, -400, 1880, hy + 400, mixc('#6c7a82', '#4a5860', 0.5)) + R(-400, -400, 1880, 700, '#8a979e', OP(0.5));
  for (let i = 0; i < 5; i++) s += E(200 + i * 220 + 30 * Math.sin(t * 0.1 + i), 260 + hz(i, 2) * 140, 260, 60, '#a8b4ba', OP(0.2));
  s += R(-400, hy, 1880, 1300, '#2e3a2e') + R(-400, hy, 1880, 60, '#3a4a40', OP(0.8));
  for (let i = 0; i < 6; i++) { const x = -60 + i * 230 + hz(i, 4) * 60; s += P(`M${x},${hy + 10} q10,-250 40,-330 q30,-60 90,-30 q10,120 -10,360Z`, '#141a18', OP(0.95)); }
  for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const y = hy + 40 + r * 110 + r * r * 8, sc = 0.5 + r * 0.3, x = -200 + i * 190 * (0.8 + r * 0.12) + (r % 2) * 80, hh = 70 + hz(i, r + 6) * 50;
    s += G(R(-28, -hh, 56, hh, mixc('#8a9298', '#5a6268', hz(i, r)), 'rx="6"') + (hz(i, r + 9) > 0.5 ? R(-4, -hh - 40, 8, 40, '#8a9298') + R(-20, -hh - 28, 40, 8, '#8a9298') : '') + R(-32, 0, 64, 10, '#1e2420'), `translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(2)})`); }
  s += R(-400, hy + 30, 1880, 20, '#0a0e0c', OP(0.3));
  if (o.fog !== 0) s += R(-400, hy - 80, 1880, 180, '#b0bcc0', OP(0.18 * (o.fog === undefined ? 1 : o.fog)));
  return s; };
/* caixão com foto, flores e coroa */
const COFFIN = (Pf, t, x, y, sc, o = {}) => G(P('M-230,60 L-190,-40 L190,-40 L230,60 L200,110 L-200,110Z', '#3a2418', 'stroke="#0e0804" stroke-width="5"') + P('M-190,-40 L190,-40 L230,60 L-230,60Z', '#5a3a24') + P('M-170,-30 L170,-30 L200,50 L-200,50Z', '#4a2e1c', OP(0.7)) + (o.flowers === 0 ? '' : [0, 1, 2, 3, 4, 5, 6].map(i => C(-150 + i * 50, -14 + 8 * Math.sin(i * 2), 22, i % 2 ? '#e8e4dc' : '#b8b4aa') + C(-150 + i * 50, -14 + 8 * Math.sin(i * 2), 8, '#8a7a50')).join('')) + L(-230, 62, 230, 62, '#d8c8a0', 3, OP(0.4)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const FRAME = (t, x, y, sc, rot = 0, o = {}) => G(R(-130, -170, 260, 340, '#1c1814', 'rx="8" stroke="#8a7a50" stroke-width="10"') + R(-110, -150, 220, 300, '#c8c4bc') + G(FM(t, { kind: 'mar', eye: 1, smile: 0.5, body: 1, wet: 0 }), 'translate(0 18) scale(0.58)') + P('M-130,-170 L-40,-170 L-130,-80Z', '#000', OP(0.95)) + P('M-134,-176 L-50,-176 L-134,-92Z', '#0a0a0c') + (o.glare ? R(-110, -150, 220, 300, '#fff', OP(0.08)) : ''), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
/* funeral amplo: caixão no centro, multidão em guarda-chuvas, chuva */
const FUNERAL = (Pf, t, o = {}) => { let s = CEMBG(Pf, t, { hy: 700 }) + R(-400, 780, 1880, 1300, '#222a22', OP(0.7));
  s += P('M300,780 Q540,720 780,780 L860,1040 L220,1040Z', '#2a1c12', OP(0.8));
  s += COFFIN(Pf, t, 540, 960, 1.5, { flowers: 1 });
  if (!o.nophoto) s += FRAME(t, 540, 690, 0.9, 0, {});
  for (let i = 0; i < 14; i++) { const side = i % 2 ? 1 : -1, row = Math.floor(i / 2), x = 540 + side * (230 + row * 78 + hz(i, 3) * 20), y = 1050 + row * 70 + hz(i, 2) * 30; s += MOURN(t, x, y, 1.0 + row * 0.05, i, {}); }
  return s + (o.over || ''); };
/* documentos */
const CERT = (t, o = {}) => R(-210, -300, 420, 600, '#e8e2d0', 'stroke="#8a7e66" stroke-width="4"') + R(-190, -280, 380, 560, 'none', 'stroke="#6a5e46" stroke-width="3"') + TXT(0, -230, 'CERTIDÃO DE ÓBITO', 30, '#2a2418') + L(-170, -205, 170, -205, '#6a5e46', 3) + [0, 1, 2, 3, 4, 5].map(i => R(-170, -170 + i * 44, 80 + (i * 53 % 160), 12, '#5a5240', OP(0.7)) + R(-170 + 200, -170 + i * 44, 90, 12, '#5a5240', OP(0.5))).join('') + TXT(0, -140, 'MARCELO', 28, '#2a2418') + (o.stamp === undefined ? 1 : o.stamp) * 0 + (o.st ? G(R(-150, -40, 300, 90, 'none', 'stroke="#b01820" stroke-width="8" rx="6"') + TXT(0, 28, 'ÓBITO', 64, '#b01820'), `translate(30 120) rotate(-10) scale(${f1(1 + 0.5 * (1 - o.st))})`, OP(o.st)) : '');
const RGCARD = (t, o = {}) => R(-260, -170, 520, 340, '#c8d4c0', 'rx="18" stroke="#6a7a62" stroke-width="5"') + R(-240, -150, 190, 230, '#7a8a9a') + G(FM(t, { kind: 'mar', eye: 1, body: 1 }), 'translate(-145 -30) scale(0.44)') + [0, 1, 2, 3].map(i => R(-20, -130 + i * 46, 220 - i * 20, 14, '#4a5a44', OP(0.7))).join('') + TXT(110, 135, 'IDENTIDADE', 26, '#3a4a34') + (o.st ? TXT(0, 20, 'CANCELADO', 56, '#b01820', `transform="rotate(-14)" opacity="${o.st}"`) : '');
const EXAM = (t, o = {}) => R(-200, -290, 400, 580, '#e6eef0', 'stroke="#8a9aa0" stroke-width="4"') + R(-200, -290, 400, 70, '#2a6a8a') + TXT(0, -240, 'LAUDO MÉDICO', 30, '#fff') + [0, 1, 2, 3, 4, 5, 6].map(i => R(-170, -190 + i * 36, 140 + (i * 41 % 100), 11, '#5a6a70', OP(0.6))).join('') + ecgLine(-170, 120, 340, o.t === undefined ? t : o.t, 60, 1, 40, '#c02830') + (o.st ? TXT(0, 235, 'ÓBITO CONFIRMADO', 34, '#b01820', `opacity="${o.st}"`) : '');
const BRIEFCASE = (t, x, y, sc, open = 1) => G(R(-260, -40, 520, 280, '#14100c', 'rx="18" stroke="#3a2e22" stroke-width="6"') + P(`M-250,-30 L-230,${-30 - 220 * open} L230,${-30 - 220 * open} L250,-30Z`, '#1c1610', 'stroke="#3a2e22" stroke-width="6"') + R(-110, -4, 220, 20, '#8a7a50', OP(0.8)) + [0, 1, 2].map(i => R(-200 + i * 20, -20 - 60 * open + i * 8, 400 - i * 40, 160, i % 2 ? '#d8d2c0' : '#e8e2d0', 'stroke="#8a7e66" stroke-width="2"')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const PHONEX = (t, o = {}) => R(-160, -330, 320, 660, '#0a0e14', 'rx="44" stroke="#2a3038" stroke-width="8"') + R(-146, -316, 292, 632, '#10161e', 'rx="34"') + C(0, -150, 70, '#2a3a4a') + TXT(0, -130, 'E', 70, '#9fb0c0') + TXT(0, -30, o.name || 'Amor', 44, '#fff') + TXT(0, 20, o.status || 'chamando...', 26, o.bad ? '#ff6a5a' : '#9fb0c0') + C(0, 220, 52, o.bad ? '#444c56' : '#d83a3a') + (o.bad ? '' : L(-18, 210, 18, 230, '#fff', 6));
const PHOTOCAR = (t, o = {}) => R(-250, -190, 500, 380, '#d8d2c4', 'stroke="#f0ece0" stroke-width="14"') + R(-230, -170, 460, 340, '#6a7a82') + R(-230, 40, 460, 130, '#3a4044') + P('M-170,50 Q-150,-30 -70,-40 L90,-40 Q170,-30 200,50 Z', '#7a8a92') + R(-190, 40, 400, 56, '#6a7a82', 'rx="10"') + C(-110, 98, 26, '#14161a') + C(130, 98, 26, '#14161a') + G(FM(t, { kind: 'mar', eye: 0.9, body: 1 }), 'translate(-20 -6) scale(0.16)') + (o.ts ? TXT(130, 160, o.ts, 18, '#e8a030') : '');
const BACKNOTE = (t, lt) => { const words = ['"Agora', 'ninguém', 'vai', 'procurar', 'pelo', 'verdadeiro', 'desaparecido."'], pos = [[-150, -80], [20, -80], [-150, -10], [-10, -10], [-150, 60], [-20, 60], [-150, 130]]; return R(-250, -190, 500, 380, '#cdc4ae', 'stroke="#f0ece0" stroke-width="14"') + words.map((w, i) => { const u = ez((lt - i * 0.45) / 0.25); return u > 0 ? TXT(pos[i][0] + w.length * 7, pos[i][1], w, 34, '#2a2a5a', `opacity="${u}" font-style="italic"`) : ''; }).join(''); };
const POSTER = (t, o = {}) => R(-230, -330, 460, 660, '#d8d4c4', 'stroke="#8a8470" stroke-width="5"') + TXT(0, -250, 'DESAPARECIDO', 50, '#8a1a20') + R(-130, -200, 260, 300, '#6a7a8a') + G(FM(t, { kind: 'iry', eye: 1, body: 1 }), 'translate(0 -40) scale(0.62)') + TXT(0, 150, 'HÁ 15 ANOS', 38, '#2a2a2a') + [0, 1, 2].map(i => R(-150, 190 + i * 30, 300 - i * 60, 10, '#5a5448', OP(0.6))).join('') + R(-230, -330, 460, 660, '#7a6a40', OP(o.age === undefined ? 0.15 : o.age));
/* carro (vista traseira/lateral simples) e estacionamento */
const CARX = (Pf, t, x, y, sc, o = {}) => G(P('M-300,0 L-280,-90 Q-240,-170 -100,-190 L120,-190 Q250,-170 290,-90 L310,0Z', o.col || '#8a949a', 'stroke="#14181c" stroke-width="6"') + P('M-200,-100 Q-180,-160 -90,-172 L-8,-172 L-8,-100Z', '#1a2630') + P('M8,-172 L110,-172 Q190,-160 220,-100 L8,-100Z', '#1a2630') + R(-320, -20, 640, 50, '#2a3036', 'rx="14"') + C(-190, 36, 52, '#0c0e10') + C(-190, 36, 24, '#7a848a') + C(200, 36, 52, '#0c0e10') + C(200, 36, 24, '#7a848a') + (o.lights ? C(-292, -50, 18, '#ff3a30') + glow(Pf, 'R', -292, -50, 120, 0.7) : '') + (o.door ? R(8, -170, 8, 160, '#0a0e12') : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const CARPARK = (Pf, t, o = {}) => { let s = R(-400, -400, 1880, 1250, '#7a868c') + R(-400, 600, 1880, 300, '#5a6468', OP(0.5)) + R(-400, 820, 1880, 1300, '#3a4044');
  for (let i = 0; i < 6; i++) s += P(`M${i * 200 - 60},1900 L${540 + (i - 2.5) * 70},830 L${540 + (i - 2.5) * 70 + 14},830 L${i * 200 - 20},1900Z`, '#c8c8c0', OP(0.35));
  s += [0, 1, 2].map(i => P(`M${-80 + i * 440},700 q30,-120 120,-130 l150,0 q80,10 100,130Z`, '#2a3238', OP(0.8))).join('');
  s += R(-400, 560, 1880, 160, '#8a9a8a', OP(0.35));
  return s + (o.over || ''); };
const CLOSEUP = (inner, bg = '#0a0c10') => BIG(bg) + inner;
