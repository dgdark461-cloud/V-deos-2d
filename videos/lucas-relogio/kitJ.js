/* CACADOR: capa de chuva com capuz, sorriso, lanterna. (0,0)=pes */
const HUNT = (x, y, sc, t, o = {}) => { const rim = o.rim || '#6ab4d8', lit = o.lit || 0, sw = Math.sin(t * 1.4) * 2;
  let s = E(0, 4, 110, 14, '#000', OP(0.45));
  s += P('M-86,0 Q-110,-230 -70,-470 Q-40,-540 0,-548 Q40,-540 70,-470 Q110,-230 86,0Z', '#12171a', `stroke="${rim}" stroke-width="4"`);
  s += P('M-30,-470 Q0,-300 30,-470 M-60,-380 Q-70,-200 -76,-40 M60,-380 Q70,-200 76,-40', 'none', 'stroke="#0a0d10" stroke-width="5"');
  s += P('M-62,-540 Q-70,-650 0,-670 Q70,-650 62,-540 Q0,-500 -62,-540Z', '#12171a', `stroke="${rim}" stroke-width="4"`);
  s += E(0, -590, 38, 44, '#05070a');
  s += E(-14, -598, 6, 3.5, '#fff') + E(14, -598, 6, 3.5, '#fff');
  s += P('M-22,-574 Q0,-556 22,-574 Q0,-562 -22,-574Z', '#f4f2ec');
  s += LIM2([[-60, -470], [-100, -380], [-90, -300]], '#12171a', 30);
  const hx = 100, hy = -330 + sw;
  s += LIM2([[60, -470], [118, -410], [hx, hy]], '#12171a', 30);
  s += R(hx - 6, hy - 14, 56, 28, '#1a1e28', `rx="6" stroke="${rim}" stroke-width="2"`) + R(hx + 46, hy - 18, 14, 36, lit ? '#fff6c8' : '#2a2e38', 'rx="3"');
  if (lit) s += P(`M${hx + 56},${hy} L${hx + 900},${hy - 140 - 40 * lit} L${hx + 900},${hy + 160 + 40 * lit}Z`, '#fff6c8', OP(0.16 * lit));
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
/* rosto do cacador em close: capuz, sombra, olhos, sorriso */
const HUNTF = (Pf, t, x, y, sc, o = {}) => { const gr = o.grin == null ? 1 : o.grin, rim = o.rim || '#6ab4d8', bl = (t % 3.6) < 0.1 ? 0.15 : 1;
  let s = P('M-190,300 Q-210,-120 -110,-260 Q0,-330 110,-260 Q210,-120 190,300Z', '#12171a', `stroke="${rim}" stroke-width="6"`);
  s += E(0, 0, 118, 160, '#07090c');
  s += P('M-110,-130 Q0,-190 110,-130', 'none', 'stroke="#0d1114" stroke-width="40" stroke-linecap="round"');
  s += [-1, 1].map(sg => E(sg * 46, -30, 22, 10 * bl + 1, '#fff') + E(sg * 46, -30, 7, 7 * bl, '#000')).join('');
  s += P(`M-62,70 Q0,${70 + 70 * gr} 62,70 Q0,${74 + 20 * gr} -62,70Z`, '#150a0a') + P(`M-56,72 Q0,${76 + 14 * gr} 56,72 L50,${80 + 10 * gr} Q0,${86 + 18 * gr} -50,${80 + 10 * gr}Z`, '#f4f2ec');
  s += P('M-120,-80 Q-150,40 -100,170 M120,-80 Q150,40 100,170', 'none', `stroke="${rim}" stroke-width="5" opacity="0.6"`);
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`); };
