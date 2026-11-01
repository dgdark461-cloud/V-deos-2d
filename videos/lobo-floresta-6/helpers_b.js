/* scenes_b.js - 66.1 a 113.5 s */
const INT = (Pf, col = '#0a0e12') => BIG(col) + R(-400, 1350, 1880, 800, '#10161c') + R(-400, 1344, 1880, 8, '#000', OP(0.4));
const HALL = (Pf, t, dist, gy = 1500, col = '#0a0e12') => { let s = BIG(col) + R(-300, gy, 1680, 900, '#10161c') + R(-300, gy - 4, 1680, 8, '#000', OP(0.4)); const base = Math.floor(dist / 380); for (let k = -1; k <= 4; k++) { const i = k + base, x = k * 380 - (dist - base * 380); s += R(x, gy - 900, 220, 900, '#141c24') + R(x + 220, gy - 900, 160, 900, '#0d131a') + R(x, gy - 900, 6, 900, '#222c36') + (hz(i, 5) > 0.6 ? R(x + 40, gy - 700, 140, 200, '#0a0f14') : ''); } return s; };
const gunObj = (x, y, sc, rot = 0) => G(R(-20, -40, 150, 46, '#15181e', 'rx="8"') + R(-6, -10, 44, 110, '#15181e', 'rx="8"') + R(120, -34, 50, 18, '#0a0c10') + L(-10, 30, 130, 30, '#2a2f38', 4), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const photoCard = (x, y, sc, rot, inner) => G(R(-130, -150, 260, 300, '#ece6d6', 'rx="6"') + R(-114, -134, 228, 220, '#0e1a22') + inner, `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);

