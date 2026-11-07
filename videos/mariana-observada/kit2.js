/* kit2.js - cenários extras: cidade, olho, planta, mão no vidro, trinco, comentários */
const CITYN = (Pf, t, o = {}) => {
  const off = o.off || 0; let s = R(-400, -400, 1880, 2720, '#050a16') + glow(Pf, 'B', 800, 260, 420, 0.25) + C(820, 280, 80, '#e8f0ff') + C(850, 262, 70, '#050a16') + C(820, 280, 80, 'none', 'stroke="#9fb3d8" stroke-width="3" opacity="0.4"');
  for (let i = 0; i < 70; i++) s += C(hz(i, 1) * 1080, hz(i, 2) * 900, 1 + hz(i, 3) * 2, '#fff', OP(0.3 + 0.5 * hz(i, 4)));
  const bl = [[-40, 700, 260, 1300, '#0a1324'], [200, 520, 240, 1480, '#0d182c'], [430, 800, 220, 1200, '#0a1324'], [630, 600, 260, 1400, '#0d182c'], [880, 760, 260, 1240, '#0a1324']];
  bl.forEach((b, bi) => { s += R(b[0], b[1], b[2], b[3], b[4]); for (let r = 0; r < 14; r++) for (let q = 0; q < 4; q++) { const id = bi * 100 + r * 4 + q, on = hz(id, 5) > 0.35 + off * 0.65; if (hz(id, 6) > 0.22) s += R(b[0] + 22 + q * 54, b[1] + 30 + r * 66, 30, 40, on ? (hz(id, 8) > 0.5 ? '#ffd88a' : '#9fd0ff') : '#0f1a2e', OP(on ? 0.85 : 1)); } });
  if (o.hero) s += G(R(-60, -50, 120, 100, '#ffe6a0') + glow(Pf, 'A', 0, 0, 200, 0.6 + 0.2 * Math.sin(t * 7)), `translate(${f1(o.hx || 540)} ${f1(o.hy || 1100)}) scale(${o.hs || 1})`);
  return s;
};
const EYEBIG = (Pf, t, x, y, sc, o = {}) => {
  const op = o.open === undefined ? 1 : o.open, dil = o.dil === undefined ? 0.5 : o.dil, lx = (o.lx || 0) * 22 + 3 * Math.sin(t * 2);
  const vein = [0, 1, 2, 3, 4, 5, 6].map(i => P(`M${-230 + i * 12},${-30 + i * 14} Q${-170 + i * 18},${-10 - i * 4} ${-110 + i * 10},${-20 + i * 6}`, 'none', `stroke="#d4505a" stroke-width="3" ${OP(0.35)}`) + P(`M${230 - i * 12},${-20 + i * 12} Q${170 - i * 18},${-6 - i * 3} ${110 - i * 10},${-14 + i * 6}`, 'none', `stroke="#d4505a" stroke-width="3" ${OP(0.35)}`)).join('');
  const lid = 150 * op;
  return G(P(`M-260,0 Q0,${-lid * 1.8} 260,0 Q0,${lid * 1.8} -260,0Z`, '#f2f0ea', 'stroke="#05080b" stroke-width="10"') + vein + G(C(0, 0, 110, '#2a6a74') + C(0, 0, 82, '#154a56') + C(0, 0, 30 + 40 * dil, '#030608') + C(-30, -30, 18, '#fff'), `translate(${f1(lx)} 0)`) + P(`M-260,0 Q0,${-lid * 1.8} 260,0 L260,-300 L-260,-300Z`, '#05080b', OP(0)) + glow(Pf, 'B', 0, 0, 380, 0.15), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
};
const PLANN = (Pf, t, o = {}) => {
  let s = BIG('#06223a');
  for (let i = 0; i < 28; i++) s += L(i * 40 - 20, 0, i * 40 - 20, 1920, '#0d3c60', 2, OP(0.6));
  for (let i = 0; i < 50; i++) s += L(0, i * 40, 1080, i * 40, '#0d3c60', 2, OP(0.6));
  const wl = 'stroke="#7fd0ff" stroke-width="10" fill="none" stroke-linejoin="round"';
  s += `<path d="M100,300 L980,300 L980,1500 L100,1500Z" ${wl}/><path d="M100,900 L560,900 M740,900 L980,900 M560,300 L560,900" ${wl}/>`;
  s += R(130, 330, 250, 330, 'none', 'stroke="#7fd0ff" stroke-width="6"') + R(150, 350, 210, 150, '#0d3c60') + R(620, 360, 300, 120, 'none', 'stroke="#7fd0ff" stroke-width="6"') + R(180, 1200, 420, 170, 'none', 'stroke="#7fd0ff" stroke-width="6"') + R(700, 1000, 220, 360, 'none', 'stroke="#7fd0ff" stroke-width="6"');
  const px = o.px === undefined ? 400 : o.px, py = o.py === undefined ? 1100 : o.py;
  s += glow(Pf, 'B', px, py, 130, 0.8) + C(px, py, 26, '#ffd23a', 'stroke="#fff" stroke-width="5"') + C(px, py, 26 + 30 * ((t * 1.5) % 1), 'none', `stroke="#ffd23a" stroke-width="4" ${OP(1 - (t * 1.5) % 1)}`);
  s += o.extra || '';
  return s;
};
const HANDPR = (x, y, sc, a = 1) => G(E(0, 40, 62, 78, '#dfe8ee') + [[-70, -40, -18], [-34, -78, -6], [8, -92, 4], [48, -76, 14], [86, -10, 52]].map(f => G(E(0, -40, 11, 62, '#dfe8ee'), `translate(${f[0]} ${f[1] + 50}) rotate(${f[2]})`)).join('') + [0, 1, 2, 3].map(i => P(`M${-50 + i * 30},${60 + i * 6} l${(i % 2 ? 6 : -6)},40`, 'none', 'stroke="#dfe8ee" stroke-width="5" opacity="0.5"')).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`, OP(a * 0.75));
const GLASSW = (Pf, t, o = {}) => R(-400, -400, 1880, 2720, '#070d18') + R(60, 200, 960, 1500, '#0a1526', 'stroke="#27384f" stroke-width="30"') + glow(Pf, 'B', 540, 900, 700, 0.2) + [0, 1, 2, 3, 4, 5, 6].map(i => R(160 + (i % 4) * 200, 1100 + (i % 3) * 90, 60, 90, hz(i, 3) > 0.4 ? '#ffd88a' : '#142238', OP(0.6))).join('') + P('M60,200 L560,200 L60,1000Z', 'rgba(255,255,255,0.05)') + (o.over || '');
const LATCHN = (Pf, t, o = {}) => { const r = o.rot === undefined ? -70 : o.rot; return BIG('#0b1424') + R(-300, 500, 1680, 900, '#27384f') + R(-300, 500, 1680, 20, '#3a5070') + G(C(0, 0, 140, '#8a8f98', 'stroke="#05080b" stroke-width="10"') + C(0, 0, 100, '#aeb4bc') + G(R(-30, -30, 60, 360, '#c7ccd4', 'rx="30" stroke="#05080b" stroke-width="8"') + C(0, 300, 44, '#d9a441'), `rotate(${f1(r)})`) + C(0, 0, 26, '#05080b'), 'translate(540 960) scale(1.5)'); };
const COMMENTN = (Pf, t, lt) => BIG('#07101c') + glow(Pf, 'B', 540, 900, 700, 0.2) + G(R(-300, -140, 600, 280, '#121c2a', 'rx="40" stroke="#2a6cf0" stroke-width="8"') + TXT(0, -40, 'O que o Rafael', 58, '#fff') + TXT(0, 34, 'deveria fazer?', 58, '#fff') + TXT(0, 100, '💬 comente', 40, '#ffd23a'), `translate(540 ${f1(900)}) scale(${f1(0.8 + 0.2 * ez(lt / 0.3))})`);
