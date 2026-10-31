/* bri.js - personagem Lucas (moletom preto de capuz) + cenario e objetos do quarto */
const BR = { skin: '#c98a58', skinSh: '#9a6238', hoodC: '#1a1a20', hoodSh: '#0c0c10', hoodHi: '#33333c', hair: '#1c120c', ink: '#0a0608' };
function LUC2(o, x, y, sc) {
  const d = Object.assign({ eye: 1, pupil: 1, lookx: 0, looky: 0, laugh: 0, mouth: 0, smile: 0.5, worry: 0, anger: 0, sweat: 0, tear: 0, tremble: 0, t: 0, hood: 1, tilt: 0, bodyLen: 520, red: 0, cold: 0, blush: 0.3, mom: 0, hairC: BR.hair, body: 1 }, o);
  const skin = mixc(d.mom ? '#e6b48e' : BR.skin, '#8fb0d0', d.cold), skd = mixc(d.mom ? '#b8805a' : BR.skinSh, '#506a88', d.cold);
  const tx = d.tremble ? H.noise(d.t * 40, 1) * d.tremble : 0, ty = d.tremble ? H.noise(d.t * 40, 2) * d.tremble : 0;
  const lg = cl(d.laugh), shake = lg * 6 * Math.sin(d.t * 38);
  let s = '';
  const hc = d.mom ? '#8a3a5a' : BR.hoodC, hs = d.mom ? '#5a2038' : BR.hoodSh;
  if (d.body) {
    s += P(`M-330,${d.bodyLen} Q-330,270 -190,236 L190,236 Q330,270 330,${d.bodyLen}Z`, hc, `stroke="${BR.ink}" stroke-width="7"`) + P(`M-330,${d.bodyLen} Q-330,270 -190,236 L-110,236 Q-220,320 -240,${d.bodyLen}Z`, hs, OP(0.55));
    s += R(-52, 120, 104, 130, skin) + R(-52, 120, 104, 40, skd, OP(0.5)) + P('M-60,236 L0,296 L60,236 L40,236 L0,270 L-40,236Z', '#e8e8ee') + L(-34, 250, -42, 400, '#d8d8e0', 5) + L(34, 250, 42, 400, '#d8d8e0', 5) + C(-42, 406, 9, '#d8d8e0') + C(42, 406, 9, '#d8d8e0');
    if (!d.mom) s += R(-150, 420, 300, 100, hs, OP(0.0));
  }
  if (d.hood && !d.mom) s += P('M-200,70 C-250,-260 250,-260 200,70 C214,150 150,226 0,230 C-150,226 -214,150 -200,70Z', hc, `stroke="${BR.ink}" stroke-width="7"`) + P('M-170,60 C-190,-200 190,-200 170,60 C180,130 120,200 0,206 C-120,200 -180,130 -170,60Z', BR.hoodSh) + P('M-200,70 C-250,-260 -120,-250 -100,-216 C-190,-180 -210,-60 -200,70Z', BR.hoodHi, OP(0.5));
  if (d.mom) s += P('M-180,-20 C-220,-230 220,-230 180,-20 C220,120 200,260 160,300 L-160,300 C-200,260 -220,120 -180,-20Z', '#3a1a28', `stroke="${BR.ink}" stroke-width="6"`);
  s += E(-150, 20, 14, 26, skd) + E(150, 20, 14, 26, skd);
  s += P('M-148,-30 C-148,-146 148,-146 148,-30 C148,90 92,168 0,176 C-92,168 -148,90 -148,-30Z', skin, `stroke="${BR.ink}" stroke-width="6"`);
  s += P('M-148,40 C-130,130 -70,172 0,176 C70,172 130,130 148,40 C120,110 70,148 0,152 C-70,148 -120,110 -148,40Z', skd, OP(0.28));
  if (!d.mom) { s += P('M-118,96 C-80,150 -30,166 0,166 C30,166 80,150 118,96 C100,128 60,142 0,142 C-60,142 -100,128 -118,96Z', '#3a2616', OP(0.4)); for (let i = 0; i < 26; i++) s += C(-90 + hz(i, 1) * 180, 100 + hz(i, 2) * 64, 1.6, '#2a1608', OP(0.35)); }
  s += E(-86, 62, 30, 18, '#e0707a', OP(0.22 + d.blush * 0.4 * lg)) + E(86, 62, 30, 18, '#e0707a', OP(0.22 + d.blush * 0.4 * lg));
  const ey = -18, eo = lg > 0.5 ? 0.12 : cl(d.eye), w = cl(d.worry), an = cl(d.anger);
  for (const sx of [-1, 1]) {
    const cx = sx * 62 + shake * 0.3;
    if (eo < 0.15) s += P(`M${cx - 30},${ey + 6} Q${cx},${ey - 18 * (lg > 0.5 ? 1 : 0.2)} ${cx + 30},${ey + 6}`, 'none', `stroke="${BR.ink}" stroke-width="9" stroke-linecap="round"`);
    else {
      const ry = Math.max(3, 21 * eo), cid = 'WEYEb' + (sx > 0 ? 'R' : 'L');
      s += E(cx, ey, 31, ry, d.red ? mixc('#f4efe9', '#e03a3a', d.red * 0.6) : '#f4efe9', `stroke="${BR.ink}" stroke-width="4"`);
      s += `<clipPath id="${cid}"><ellipse cx="${cx}" cy="${ey}" rx="31" ry="${f1(ry)}"/></clipPath><g clip-path="url(#${cid})">` + C(cx + d.lookx * 12, ey + d.looky * 10, 14 * d.pupil + 2, '#4a2a18') + C(cx + d.lookx * 12, ey + d.looky * 10, 7.5 * d.pupil + 1.5, '#08040a') + C(cx + d.lookx * 12 - 5, ey + d.looky * 10 - 6, 3.6, '#fff') + '</g>';
      if (eo < 0.8) s += P(`M${cx - 33},${ey + 2} Q${cx},${f1(ey - 40 * eo - 2)} ${cx + 33},${ey + 2} L${cx + 33},${ey - 30} L${cx - 33},${ey - 30}Z`, skin);
      s += P(`M${cx - 33},${ey + 2} Q${cx},${f1(ey - 36 * eo - 4)} ${cx + 33},${ey + 2}`, 'none', `stroke="${BR.ink}" stroke-width="6" stroke-linecap="round"`);
    }
    s += L(cx - sx * 40, ey - 42 - 18 * w + 14 * an + 6 * lg, cx + sx * 36, ey - 46 + 12 * w - 18 * an - 6 * lg, d.hairC, 14);
    if (d.tear || lg) { const u = (d.t * 1.2 + (sx > 0 ? 0.5 : 0)) % 1; s += P(`M${cx - sx * 10},${ey + 24} q${-sx * 14},40 ${-sx * 4},${60 + 40 * u} q${sx * 20},-30 ${sx * 4},-${60 + 40 * u}Z`, 'rgba(160,215,255,0.8)', OP(Math.max(d.tear, lg))); }
  }
  s += P('M-10,10 Q-26,56 -34,68 Q0,86 34,68', 'none', `stroke="${skd}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`);
  if (!d.mom) s += P('M-44,86 Q-20,76 0,84 Q20,76 44,86 Q20,94 0,92 Q-20,94 -44,86Z', '#1c120c', OP(0.9));
  const m = Math.max(cl(d.mouth), lg * 0.9), my = 112, sm = d.smile;
  if (m < 0.06) s += P(`M-42,${my} Q0,${f1(my + 26 * sm - 14 * w)} 42,${my}`, 'none', `stroke="${BR.ink}" stroke-width="8" stroke-linecap="round"`);
  else { const mw = 44 + 34 * m, mh = 14 + 70 * m; s += P(`M${-mw},${my} Q0,${my + mh * 1.5} ${mw},${my} Q0,${my - 10 * (1 - m)} ${-mw},${my}Z`, '#3a0f14', `stroke="${BR.ink}" stroke-width="6"`) + P(`M${-mw + 6},${my + 2} Q0,${my - 8} ${mw - 6},${my + 2} L${mw - 12},${my + 18} Q0,${my + 8} ${-mw + 12},${my + 18}Z`, '#f6f2ea') + E(0, my + mh * 0.95, mw * 0.5, mh * 0.35, '#c8505a'); }
  if (d.cold) s += E(0, 20, 150, 150, '#8fb0d0', OP(0.12));
  if (!d.mom) { s += P('M-148,-44 C-160,-150 150,-170 148,-44 C130,-82 100,-96 60,-98 C40,-120 -10,-126 -34,-100 C-80,-104 -128,-86 -148,-44Z', d.hairC) + P('M-20,-100 C-30,-150 30,-160 50,-120 C30,-130 10,-120 -20,-100Z', d.hairC) + P('M-140,-60 C-100,-104 -50,-114 -10,-112', 'none', 'stroke="#3a2a22" stroke-width="5" opacity="0.6"'); }
  else s += P('M-160,-20 C-170,-170 170,-170 160,-20 C140,-100 90,-120 0,-120 C-90,-120 -140,-100 -160,-20Z', '#3a1a28');
  if (d.sweat) s += P('M118,-90 Q136,-52 118,-30 Q98,-54 118,-90Z', 'rgba(200,235,255,0.9)') + P('M-112,0 Q-98,30 -112,48 Q-128,30 -112,0Z', 'rgba(200,235,255,0.8)');
  return G(G(s, `translate(${f1(tx + shake)} ${f1(ty)})`), `translate(${f1(x)} ${f1(y)}) rotate(${d.tilt}) scale(${sc.toFixed(3)})`);
}
const LB = (o, x, y, sc) => LUC2(o, x, y, sc);
const MOMF = (o, x, y, sc) => LUC2(Object.assign({ mom: 1, hood: 0, hairC: '#3a1a28' }, o), x, y, sc);
const figB = a => { const sv = Object.assign({}, HK); Object.assign(HK, { jacket: '#1a1a20', jacketDk: '#0c0c10', jacketLt: '#33333c', shirt: '#e8e8ee', pants: '#6a6a72', pantsDk: '#4a4a52', boot: '#16161a', bootDk: '#0a0a0e', sole: '#f2f2f2', skin: '#c98a58', skinDk: '#9a6238', hair: '#1c120c', cap: '#1a1a20', capDk: '#0c0c10', capLt: '#33333c' }); try { return hikerFig(Object.assign({ cap: 1, bag: 0, hair: 0 }, a)); } finally { Object.assign(HK, sv); } };
/* brigadeiro (doce) */
function BRIG(x, y, sc, t = 0, o = {}) {
  const d = Object.assign({ glow: 1, face: 1 }, o), bob = 6 * Math.sin(t * 3);
  let s = d.glow ? C(0, 0, 220, '#ff3ad0', OP(0.18 + 0.1 * Math.sin(t * 4))) + C(0, 0, 140, '#7a3aff', OP(0.2)) : '';
  s += E(0, 120, 120, 18, 'rgba(0,0,0,0.4)') + P('M-100,40 L-80,120 L80,120 L100,40Z', '#e8a8d8', 'stroke="#7a2a6a" stroke-width="5"') + [0, 1, 2, 3, 4].map(i => L(-70 + i * 35, 44, -62 + i * 31, 118, '#b868a8', 4)).join('');
  s += C(0, -10, 100, '#3a1a0c') + C(-30, -40, 50, '#5a2c14', OP(0.7)) + [...Array(40)].map((_, i) => { const a = hz(i, 7) * 6.283, r = 20 + 76 * Math.sqrt(hz(i, 8)); return R(Math.cos(a) * r - 7, -10 + Math.sin(a) * r - 3, 14, 6, ['#ff5aa0', '#5aff9a', '#ffd23a', '#5ab0ff', '#fff'][i % 5], `transform="rotate(${f1(hz(i, 9) * 180)} ${f1(Math.cos(a) * r)} ${f1(-10 + Math.sin(a) * r)})"`); }).join('');
  if (d.face) s += P('M-40,10 Q0,50 40,10', 'none', 'stroke="#fff" stroke-width="7" stroke-linecap="round"') + E(-30, -28, 12, 14, '#fff') + E(30, -28, 12, 14, '#fff') + C(-30 + 3 * Math.sin(t * 2), -26, 6, '#000') + C(30 + 3 * Math.sin(t * 2), -26, 6, '#000') + P('M-48,-52 L-14,-46 M48,-52 L14,-46', 'none', 'stroke="#fff" stroke-width="7" stroke-linecap="round"');
  return G(s, `translate(${f1(x)} ${f1(y + bob)}) scale(${sc})`);
}
/* quarto psicodelico */
const PSY = (Pf, t, o = {}) => { const d = Object.assign({ hue: 0, amt: 1 }, o), cols = ['#ff2ad0', '#2affd0', '#7a3aff', '#ffb02a']; let s = ''; for (let i = 0; i < 4; i++) s += C(300 + 480 * hz(i, 1) + 120 * Math.sin(t * 0.7 + i * 2), 400 + 1100 * hz(i, 2) + 100 * Math.cos(t * 0.6 + i), 520, cols[(i + d.hue) % 4], OP(0.16 * d.amt)); return s; };
function BEDR(Pf, t, o = {}) {
  const d = Object.assign({ dark: 0.45, amt: 1, breathe: 0, hue: 0, lamp: 1, ceil: 0 }, o), br = d.breathe * 0.025 * Math.sin(t * 2.6);
  let s = BIG('#150a28') + R(-300, 0, 1680, 1280, '#1c0e38') + R(-300, 1280, 1680, 800, '#120a1c') + R(-300, 1274, 1680, 14, '#0a0612');
  s += PSY(Pf, t, d) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(-300 + i * 210, 0, 6, 1280, '#000', OP(0.15))).join('');
  s += G(R(-130, -170, 260, 340, '#0e1a3a', 'rx="10" stroke="#2a1c4a" stroke-width="14"') + L(0, -170, 0, 170, '#2a1c4a', 8) + L(-130, 0, 130, 0, '#2a1c4a', 8) + C(60, -90, 34, '#e8e0b0', OP(0.8)), `translate(220 520) scale(${1 + br})`);
  s += G(R(-160, -26, 320, 52, '#2a1c4a', 'rx="12"') + R(-140, -230, 280, 200, '#3a1c5a', 'rx="12"') + C(-60, -130, 20, '#ff2ad0') + C(40, -130, 20, '#2affd0') + C(0, -80, 14, '#ffb02a'), `translate(840 540) rotate(-4) scale(${1 - br})`);
  s += G(R(-220, -140, 440, 200, '#3a2a5a', 'rx="40"') + R(-200, 20, 400, 160, '#2a1a48', 'rx="20"') + R(-220, 60, 60, 130, '#241442', 'rx="14"'), `translate(840 1120) scale(${1 + br * 1.5})`);
  if (d.lamp) s += glow(Pf, 'A', 150, 1010, 360, 0.5 * d.lamp) + R(120, 1020, 60, 250, '#3a2a1a') + P('M60,1030 L240,1030 L200,920 L100,920Z', '#ffb870');
  s += R(-300, -300, 1680, 2520, '#02010a', OP(d.dark * (1 - 0.5 * (d.lamp ? 1 : 0))));
  return s;
}
const CLK = (Pf, t, x, y, sc, slow = 1, melt = 0) => G(C(0, 0, 130, '#f4efe9', 'stroke="#1a1a20" stroke-width="12"') + [...Array(12)].map((_, i) => L(110 * Math.sin(i * 0.5236), -110 * Math.cos(i * 0.5236), 122 * Math.sin(i * 0.5236), -122 * Math.cos(i * 0.5236), '#1a1a20', 5)).join('') + L(0, 0, 0, -70, '#1a1a20', 9) + L(0, 0, 90 * Math.sin(t * 6 * slow), -90 * Math.cos(t * 6 * slow), '#e03030', 5) + C(0, 0, 9, '#1a1a20'), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc)} ${f1(sc * (1 + 0.4 * melt))})`);
const MIRR = (Pf, t, x, y, sc, inner, o = {}) => G(R(-230, -420, 460, 840, '#2a2040', 'rx="30" stroke="#8a6a3a" stroke-width="18"') + `<clipPath id="${Pf}mir"><rect x="-210" y="-400" width="420" height="800" rx="20"/></clipPath>` + G(R(-210, -400, 420, 800, '#1a2a3a') + inner + P('M-210,-400 L-60,-400 L-210,-180Z', '#fff', OP(0.12)) + R(-210, -400, 420, 800, 'none'), '', `clip-path="url(#${Pf}mir)"`), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const EYEDANG = (Pf, t, x, y, sc, a = 1) => G(P('M-30,-1000 L-14,0 L14,0 L30,-1000Z', '#05030a') + E(0, 40, 90, 150, '#05030a') + E(-30, 20, 14, 22, '#e8f0c0', OP(a)) + E(30, 20, 14, 22, '#e8f0c0', OP(a)) + C(-30, 24, 5, '#000') + C(30, 24, 5, '#000') + P('M-40,110 Q0,150 40,110', 'none', 'stroke="#e8f0c0" stroke-width="5"'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(4 * Math.sin(t * 1.7))}) scale(${sc})`);
const SHADOWM = (Pf, t, x, y, sc, o = {}) => { const d = Object.assign({ grin: 1, a: 1 }, o); return G(glow(Pf, 'B', 0, -300, 600, 0.3) + P('M-170,0 Q-200,-300 -80,-480 Q0,-560 80,-480 Q200,-300 170,0 Q120,-40 80,10 Q40,-30 0,16 Q-40,-30 -80,10 Q-120,-40 -170,0Z', '#05030a') + E(-50, -330, 26, 40, '#ff2ad0') + E(50, -330, 26, 40, '#ff2ad0') + C(-50, -330, 8, '#fff') + C(50, -330, 8, '#fff') + (d.grin ? P('M-90,-240 Q0,-170 90,-240 L70,-250 L50,-225 L20,-250 L0,-225 L-20,-250 L-50,-225 L-70,-250Z', '#f0f0f0') : ''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`, OP(d.a)); };
const HAHA = (t, x, y, sc, txt = 'HA!', col = '#ffe03a') => G(P('M-130,-60 L-70,-110 L-30,-70 L10,-120 L50,-70 L120,-100 L90,-30 L140,10 L80,40 L100,100 L40,70 L0,120 L-40,70 L-100,100 L-80,40 L-140,10Z', col, `stroke="#1a1a20" stroke-width="8"`) + TXT(0, 20, txt, 84, '#1a1a20'), `translate(${f1(x)} ${f1(y)}) rotate(${f1(8 * Math.sin(t * 12))}) scale(${f1(sc * (1 + 0.12 * Math.sin(t * 20)))})`);
const HAND3 = (x, y, sc, rot, col = BR.skin, point = 0) => G(R(-40, 0, 80, 300, col, `rx="30" stroke="${BR.ink}" stroke-width="5"`) + E(0, -10, 56, 70, col, `stroke="${BR.ink}" stroke-width="5"`) + (point ? R(-14, -150, 28, 150, col, 'rx="14"') : [-30, -10, 10, 30].map((q, i) => R(q - 10, -70 - 6 * (i % 2), 20, 70, col, 'rx="10"')).join('')) + R(-46, 240, 92, 80, BR.hoodC), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
const NEON = ['#ff2ad0', '#2affd0', '#ffb02a', '#7a3aff'];
const RULEN = (Pf, t, lt, n) => BIG('#120626') + PSY(Pf, t, { hue: n }) + G(R(-330, -440, 660, 880, '#1a0a38', `rx="44" stroke="${NEON[n]}" stroke-width="16"`) + TXT(0, 150, String(n), 560, NEON[n]) + [0, 1, 2].map(i => C(-100 + i * 100, -330, 24, i < n ? '#2affd0' : '#3a2a5a')).join(''), `translate(540 960) scale(${f1(lp(0.4, 1, ez(lt / 0.3)))}) rotate(${f1(-8 * Math.exp(-lt * 6))})`);
const SPIRAL = (t, x, y, r, col = '#ff2ad0', sp = 3) => { let d = ''; for (let i = 0; i < 160; i++) { const a = i * 0.22 + t * sp, rr = r * i / 160; d += (i ? 'L' : 'M') + f1(x + rr * Math.cos(a)) + ',' + f1(y + rr * Math.sin(a)); } return P(d, 'none', `stroke="${col}" stroke-width="12" stroke-linecap="round"`); };
const WAVES = (t, a = 1) => [0, 1, 2, 3, 4, 5].map(i => P(`M-300,${300 + i * 300} ` + [0, 1, 2, 3, 4, 5, 6, 7].map(j => `Q${-300 + j * 240 + 120},${300 + i * 300 + 120 * Math.sin(t * 3 + i + j) * (i % 2 ? 1 : -1)} ${-300 + (j + 1) * 240},${300 + i * 300}`).join(' '), 'none', `stroke="${NEON[i % 4]}" stroke-width="40" opacity="${(0.55 * a).toFixed(2)}"`)).join('');
const HEARTB = (t, x, y, sc) => { const bt = Math.pow(Math.max(0, Math.sin(t * 9)), 6); return G(P('M0,200 C-300,-20 -200,-250 0,-100 C200,-250 300,-20 0,200Z', '#e0204a') + P('M0,200 C-300,-20 -200,-250 0,-100', '#ff6080', OP(0.4)), `translate(${f1(x)} ${f1(y)}) scale(${f1(sc * (1 + 0.18 * bt))})`); };
const DOORMIND = (Pf, t, u, mon) => G(P('M-280,300 C-340,-100 -240,-360 0,-380 C240,-360 340,-100 280,300 L120,300 L120,420 L-120,420 L-120,300Z', '#c98a58', `stroke="${BR.ink}" stroke-width="8"`) + R(-110, -190, 220, 330, '#0a0412', 'rx="10" stroke="#3a2a1a" stroke-width="12"') + (u > 0 ? R(-110, -190, 220, 330, '#ff2ad0', OP(0.25 * u)) : '') + (mon ? G(SHADOWM(Pf, t, 0, 0, 0.3, { grin: 1 }), 'translate(0 120)') : '') + P(`M-110,-190 L${-110 - 160 * u},-170 L${-110 - 160 * u},170 L-110,140Z`, '#3a2a1a', `stroke="${BR.ink}" stroke-width="6"`), 'translate(540 900) scale(1.7)');
const WRAP = (x, y, sc, n = 18) => G([...Array(n)].map((_, i) => G(P('M-60,40 L-48,120 L48,120 L60,40Z', '#e8a8d8', 'stroke="#7a2a6a" stroke-width="4"') + [0, 1, 2].map(k => L(-34 + k * 34, 46, -28 + k * 28, 116, '#b868a8', 3)).join(''), `translate(${f1((hz(i, 3) - 0.5) * 520)} ${f1(-hz(i, 4) * 240 + 120)}) rotate(${f1((hz(i, 5) - 0.5) * 90)})`)).join(''), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const STRANGER = (Pf, t, x, y, sc) => G(E(0, 6, 160, 16, 'rgba(0,0,0,0.5)') + P('M-110,0 L-90,-420 Q0,-470 90,-420 L110,0Z', '#1a1822') + P('M-110,0 L-90,-420 L-30,-430 L-50,0Z', '#000', OP(0.3)) + R(-24, -500, 48, 90, '#2a2430') + E(0, -560, 66, 70, '#2a2430') + P('M-130,-560 Q0,-680 130,-560 L150,-540 L-150,-540Z', '#0e0c14') + E(-22, -560, 8, 11, '#e8f0c0') + E(22, -560, 8, 11, '#e8f0c0'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
