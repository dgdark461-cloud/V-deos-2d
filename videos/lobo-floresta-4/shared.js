function camG(t, cx, cy, zoom, rot, shk, inner) {
  const sx = shk ? H.noise(t * 45, 1) * shk : 0, sy = shk ? H.noise(t * 45, 2) * shk : 0;
  return `<g transform="translate(${f1(540 + sx)} ${f1(960 + sy)}) rotate(${f1(rot)}) scale(${zoom.toFixed(4)}) translate(${f1(-cx)} ${f1(-cy)})">${inner}</g>`;
}
function rainFx(t, n, w, h, col = 'rgba(190,210,235,0.35)', slant = 0.18, sp = 1.8) {
  let s = '';
  for (let i = 0; i < n; i++) { const ph = (t * sp + hz(i, 91)) % 1, x = hz(i, 92) * (w + 300) - 150 + ph * 120, y = ph * (h + 200) - 100; s += L(x, y, x - slant * 70, y + 70, col, 2.5); }
  return s;
}
/* scenes_c.js - ~111 s a 173,6 s: inventário, fogueira, noite, o lobo volta, o homem. */
function womanSit(o) {
  const d = Object.assign({ scale: 1, lookx: 0, cold: 0, t: 0, scared: 0, rim: 1, eye: 1, breathe: 0 }, o);
  const skin = mixc(PAL.skin, '#8fb0d6', d.cold), swe = mixc(PAL.sweater, '#8aa0c0', d.cold * 0.6), br = Math.sin(d.t * 2) * 3 * d.breathe;
  let s = E(0, 6, 180, 22, 'rgba(0,0,0,0.45)');
  s += PL([[-52, -8], [-78, -120], [-34, -178]], PAL.jeans, 46) + PL([[52, -8], [78, -120], [34, -178]], PAL.jeans, 46) + E(-54, -2, 38, 16, PAL.boot) + E(54, -2, 38, 16, PAL.boot);
  s += P(`M-74,-150 L-58,${-330 + br} Q0,${-356 + br} 58,${-330 + br} L74,-150Z`, swe) + P('M-58,-330 L-74,-150 L-48,-150 L-36,-330Z', PAL.sweaterSh, OP(0.45));
  s += P(`M-46,${-336 + br} Q0,${-300 + br} 46,${-336 + br} L50,${-318 + br} Q0,${-278 + br} -50,${-318 + br}Z`, PAL.scarf);
  s += PL([[-58, -318], [-96, -230], [-42, -182]], swe, 32) + PL([[58, -318], [96, -230], [42, -182]], swe, 32) + C(-40, -180, 15, skin) + C(40, -180, 15, skin);
  const hy = -396 + br;
  s += P(`M-52,${hy} C-70,${hy + 90} -58,${hy + 140} -44,${hy + 150} L44,${hy + 150} C58,${hy + 140} 70,${hy + 90} 52,${hy}Z`, PAL.hair) + R(-14, hy + 36, 28, 30, skin) + E(0, hy, 44, 50, skin);
  const ro = d.scared ? 9 : 6.5;
  s += E(-16, hy - 2, 8.5, ro * d.eye + 0.5, '#fff') + E(16, hy - 2, 8.5, ro * d.eye + 0.5, '#fff') + C(-16 + d.lookx, hy - 2, 3.8, '#1a0f0b') + C(16 + d.lookx, hy - 2, 3.8, '#1a0f0b');
  s += P(`M-10,${hy + 26} Q0,${hy + (d.scared ? 38 : 30)} 10,${hy + 26}`, 'none', 'stroke="#9a4a47" stroke-width="3" stroke-linecap="round"');
  s += P(`M-46,${hy - 6} C-42,${hy - 60} 42,${hy - 60} 46,${hy - 6} C20,${hy - 36} -20,${hy - 36} -46,${hy - 6}Z`, PAL.hair);
  if (d.rim) s += P(`M52,${hy - 10} C60,${hy + 30} 56,${hy + 70} 44,${hy + 100}`, 'none', 'stroke="#ff9a3a" stroke-width="5" opacity="0.7"') + L(58, -318, 94, -232, '#ff9a3a', 5, OP(0.5));
  return G(s, T(0, 0, 0, d.scale));
}
function campWorld(Pf, t, o) {
  const d = Object.assign({ k: 2, fire: 1, woman: true, px: 0, cold: 0, look: 0, scared: 0, eye: 1, fx: 760, wx: 380, ground: 1250, ws: 1.0 }, o);
  let s = forest(Pf, t, { k: d.k, px: d.px, fog: 0.7, shafts: 0, glowFire: d.fire, fx: d.fx, fy: 1330, ground: d.ground });
  s += E(d.fx, 1340, 470, 70, 'rgba(255,140,40,0.14)', OP(d.fire));
  if (d.woman) s += G(womanSit({ t, lookx: d.look, cold: d.cold, scared: d.scared, eye: d.eye, breathe: 1, scale: d.ws }), `translate(${d.wx} 1340)`);
  s += fireFx(Pf, d.fx, 1340, 1.0, t, d.fire);
  return s;
}
function ecgLine(x, y, w, t, bpm, a = 1, amp = 120, col = '#ff4a4a') {
  let pts = []; const per = 60 / bpm;
  for (let i = 0; i <= 80; i++) { const xx = x + w * i / 80, tt = (t - (w - w * i / 80) * 0.004) / per, ph = tt - Math.floor(tt); let yy = y; if (ph > 0.1 && ph < 0.16) yy = y - amp * 0.9 * Math.sin((ph - 0.1) / 0.06 * Math.PI); else if (ph > 0.16 && ph < 0.2) yy = y + amp * 0.5 * Math.sin((ph - 0.16) / 0.04 * Math.PI); else if (ph > 0.3 && ph < 0.4) yy = y - amp * 0.2 * Math.sin((ph - 0.3) / 0.1 * Math.PI); pts.push([xx, yy]); }
  return PL(pts, col, 7, OP(a)) + glow('', 'R', 0, 0, 0, 0);
}
function frost(t, a) {
  if (a <= 0.01) return '';
  let s = '';
  for (const [cx, cy, sg] of [[0, 0, 1], [1080, 0, -1], [0, 1920, 1], [1080, 1920, -1]]) for (let i = 0; i < 9; i++) { const ang = (i / 9) * 1.5, l = (160 + 220 * hz(i, 2)) * a; s += L(cx, cy, cx + sg * Math.cos(ang) * l, cy + (cy ? -1 : 1) * Math.sin(ang) * l * 1.3, 'rgba(220,245,255,0.8)', 4 + 3 * hz(i, 3)); }
  return s + R(0, 0, 1080, 1920, '#9fd0ff', OP(0.12 * a));
}

