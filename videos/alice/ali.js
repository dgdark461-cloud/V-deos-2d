/* ali.js - Alice: rosto/busto detalhado, corpo inteiro, cenarios de madrugada */
const AL = { skin: '#f1c9a8', skinSh: '#d9a07e', skinHi: '#f8dcc2', hair: '#2a1a14', hairMid: '#3e2a20', hairHi: '#6a4a38', tee: '#b9d6f2', teeSh: '#8fb4da', teeHi: '#d6e8fa', lip: '#d98a8a', ink: '#2a1812', eyeIris: '#6a4228' };
const wavyHair = (side, len, w) => { let d = `M${side * 150},-150 `; for (let i = 1; i <= 6; i++) d += `Q${side * (w + 24 * Math.sin(i * 1.7))},${-150 + len * (i - 0.5) / 6} ${side * (w - 6 + 20 * Math.sin(i * 1.3 + 1))},${-150 + len * i / 6} `; return d; };
function ALI(o, x, y, sc) {
  const d = Object.assign({ eye: 1, pupil: 1, lookx: 0, looky: 0, red: 0, worry: 0, anger: 0, mouth: 0, smile: 0, sweat: 0, tear: 0, tremble: 0, t: 0, tilt: 0, body: 1, bodyLen: 560, tint: null, tintA: 0.3, cold: 0, back: 0, hairFront: 1, lid: 0 }, o);
  const skin = mixc(AL.skin, '#9fb8d8', d.cold), skd = mixc(AL.skinSh, '#6a84a8', d.cold);
  const tx = d.tremble ? H.noise(d.t * 40, 1) * d.tremble : 0, ty = d.tremble ? H.noise(d.t * 40, 2) * d.tremble : 0;
  let s = '';
  /* cabelo de tras */
  const hairBack = P(`M-190,-70 C-236,-290 236,-290 190,-70 C240,80 222,260 262,${d.bodyLen + 20} C140,${d.bodyLen + 60} -140,${d.bodyLen + 60} -262,${d.bodyLen + 20} C-222,260 -240,80 -190,-70Z`, AL.hair) + P(`M-120,-120 C-210,40 -170,300 -230,${d.bodyLen}`, 'none', `stroke="${AL.hairMid}" stroke-width="22" opacity="0.7"`) + P(`M110,-130 C200,30 170,300 224,${d.bodyLen}`, 'none', `stroke="${AL.hairMid}" stroke-width="18" opacity="0.6"`);
  if (d.back) {
    s += hairBack;
    if (d.body) s += P(`M-330,${d.bodyLen + 90} Q-320,300 -160,262 L160,262 Q320,300 330,${d.bodyLen + 90}Z`, AL.tee, `stroke="${AL.ink}" stroke-width="4"`);
    s += P(`M-190,-70 C-240,-330 240,-330 190,-70 C230,60 190,200 140,260 C60,300 -60,300 -140,260 C-190,200 -230,60 -190,-70Z`, AL.hair) + P('M-60,-250 C-20,-120 -40,60 -70,240 M20,-260 C50,-100 30,80 40,250 M100,-200 C130,-60 100,100 120,230', 'none', `stroke="${AL.hairHi}" stroke-width="9" opacity="0.5"`);
    return G(G(s, `translate(${f1(tx)} ${f1(ty)})`), `translate(${f1(x)} ${f1(y)}) rotate(${d.tilt}) scale(${sc.toFixed(3)})`);
  }
  s += hairBack;
  if (d.body) {
    s += R(-46, 120, 92, 160, skin) + P('M-46,200 Q0,250 46,200 L46,280 L-46,280Z', skd, OP(0.4));
    s += P(`M-330,${d.bodyLen + 90} Q-326,300 -160,262 L-70,236 Q0,300 70,236 L160,262 Q326,300 330,${d.bodyLen + 90}Z`, AL.tee, `stroke="${AL.ink}" stroke-width="4"`) + P(`M-330,${d.bodyLen + 90} Q-326,300 -160,262 L-110,262 Q-250,340 -262,${d.bodyLen + 90}Z`, AL.teeSh, OP(0.55)) + P('M-70,236 Q0,300 70,236', 'none', `stroke="${AL.teeSh}" stroke-width="18" stroke-linecap="round"`) + P('M-210,300 Q-160,330 -170,420 M210,300 Q160,330 170,420', 'none', `stroke="${AL.teeSh}" stroke-width="6" opacity="0.6"`);
  }
  /* rosto */
  s += P('M-134,-52 C-134,-172 134,-172 134,-52 C134,76 92,164 0,184 C-92,164 -134,76 -134,-52Z', skin, `stroke="${AL.ink}" stroke-width="3.5"`);
  s += P('M-134,30 C-120,120 -64,172 0,184 C64,172 120,120 134,30 C112,100 62,148 0,152 C-62,148 -112,100 -134,30Z', skd, OP(0.25)) + E(-84, 74, 30, 17, '#e89a96', OP(0.28)) + E(84, 74, 30, 17, '#e89a96', OP(0.28)) + E(0, -92, 66, 22, AL.skinHi, OP(0.35));
  const ey = -14, eo = cl(d.eye) * (1 - 0.6 * cl(d.lid));
  for (const sx of [-1, 1]) {
    const cx = sx * 58, ry = Math.max(2.4, 21 * eo), cid = 'WEYEc' + (sx > 0 ? 'R' : 'L');
    s += P(`M${cx - 40},${ey + 3} Q${cx},${ey - 12 - 32 * eo} ${cx + 40},${ey + 3} Q${cx},${ey + 3 + 22 * eo} ${cx - 40},${ey + 3}Z`, d.red ? mixc('#f6f1ee', '#e83a3a', d.red * 0.65) : '#f6f1ee', `stroke="${AL.ink}" stroke-width="2.5"`);
    s += `<clipPath id="${cid}"><path d="M${cx - 40},${ey + 3} Q${cx},${ey - 12 - 32 * eo} ${cx + 40},${ey + 3} Q${cx},${ey + 3 + 22 * eo} ${cx - 40},${ey + 3}Z"/></clipPath><g clip-path="url(#${cid})">` + C(cx + d.lookx * 12, ey + 2 + d.looky * 9, 20 * (0.8 + 0.3 * d.pupil), d.red ? mixc(AL.eyeIris, '#c01818', d.red * 0.7) : AL.eyeIris) + C(cx + d.lookx * 12, ey + 2 + d.looky * 9, 9 * d.pupil + 2, '#0a0508') + C(cx + d.lookx * 12 - 6, ey + d.looky * 9 - 6, 4.4, '#fff', OP(0.95)) + C(cx + d.lookx * 12 + 6, ey + 7 + d.looky * 9, 2.2, '#fff', OP(0.6)) + (d.red > 0.15 ? [0, 1, 2, 3, 4, 5].map(i => L(cx + sx * (34 - 4 * i), ey + 2 + 6 * (i - 3), cx + sx * (16 - 2 * i), ey + 2 + 3 * (i - 3), '#c02020', 1.6, OP(d.red * 0.9))).join('') : '') + '</g>';
    s += P(`M${cx - 36},${ey + 4} Q${cx},${ey - 12 - 28 * eo} ${cx + 36},${ey + 4}`, 'none', `stroke="${AL.ink}" stroke-width="6" stroke-linecap="round"`) + P(`M${cx + sx * 34},${ey + 3} l${sx * 9},-5 M${cx + sx * 28},${ey - 6} l${sx * 8},-8`, 'none', `stroke="${AL.ink}" stroke-width="3" stroke-linecap="round"`);
    if (eo < 0.9) s += P(`M${cx - 34},${ey + 3} Q${cx},${ey - 8 - 26 * eo} ${cx + 34},${ey + 3} L${cx + 34},${ey - 40} L${cx - 34},${ey - 40}Z`, skin);
    s += P(`M${cx - 30},${ey + 28} Q${cx},${ey + 38} ${cx + 30},${ey + 28}`, 'none', `stroke="${skd}" stroke-width="5" opacity="${(0.3 + 0.4 * d.red).toFixed(2)}" stroke-linecap="round"`);
    const w = cl(d.worry), an = cl(d.anger);
    s += P(`M${cx - sx * 40},${ey - 50 - 12 * w + 8 * an} Q${cx},${ey - 70 - 8 * w - 6 * an} ${cx + sx * 36},${ey - 54 + 10 * w - 16 * an}`, 'none', `stroke="${AL.hair}" stroke-width="8" stroke-linecap="round"`);
    if (d.tear) s += P(`M${cx - sx * 6},${ey + 24} q${-sx * 8},50 ${-sx * 2},${80 * d.tear} q${sx * 12},-30 ${sx * 2},${-80 * d.tear}Z`, 'rgba(180,220,255,0.75)');
  }
  s += P('M-3,6 Q-10,58 -18,70 Q0,80 18,70', 'none', `stroke="${skd}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"`) + E(-9, 72, 4, 2.6, skd, OP(0.7)) + E(9, 72, 4, 2.6, skd, OP(0.7));
  const m = cl(d.mouth), my = 118, sm = d.smile;
  if (m < 0.05) s += P(`M-34,${my} Q-14,${my - 7} 0,${my - 4} Q14,${my - 7} 34,${my} Q0,${f1(my + 14 + 18 * sm - 8 * d.worry)} -34,${my}Z`, AL.lip, `stroke="${AL.ink}" stroke-width="2.5"`) + P(`M-34,${my} Q0,${my + 2 + 10 * sm} 34,${my}`, 'none', `stroke="#a25a5a" stroke-width="3"`);
  else s += P(`M-36,${my} Q-14,${my - 8} 0,${my - 5} Q14,${my - 8} 36,${my} Q0,${my + 12 + 60 * m} -36,${my}Z`, '#3a1418', `stroke="${AL.ink}" stroke-width="3"`) + P(`M-30,${my + 1} Q0,${my - 6} 30,${my + 1} L26,${my + 10} Q0,${my + 4} -26,${my + 10}Z`, '#f6f2ee') + E(0, my + 26 * m + 14, 18, 7 * m + 2, '#c8606a');
  if (d.sweat) s += P('M104,-100 Q118,-62 104,-42 Q88,-64 104,-100Z', 'rgba(210,235,255,0.9)') + P('M-100,-8 Q-88,22 -100,38 Q-114,22 -100,-8Z', 'rgba(210,235,255,0.8)');
  if (d.cold) s += E(0, 20, 140, 170, '#8fb0d0', OP(0.1));
  /* cabelo da frente: repartido ao meio */
  if (d.hairFront) s += P('M0,-176 C-140,-176 -200,-60 -196,40 C-186,-30 -150,-90 -86,-118 C-50,-134 -20,-150 0,-176Z', AL.hair) + P('M0,-176 C140,-176 200,-60 196,40 C186,-30 150,-90 86,-118 C50,-134 20,-150 0,-176Z', AL.hair) + P('M-196,40 C-210,160 -190,300 -226,430 C-176,360 -150,200 -156,60Z', AL.hair) + P('M196,40 C210,160 190,300 226,430 C176,360 150,200 156,60Z', AL.hair) + P('M0,-170 C-70,-168 -130,-110 -160,-20', 'none', `stroke="${AL.hairHi}" stroke-width="7" opacity="0.55"`) + P('M0,-170 C70,-168 130,-110 160,-20', 'none', `stroke="${AL.hairHi}" stroke-width="7" opacity="0.5"`) + L(0, -176, 0, -150, skd, 3, OP(0.6));
  return G(G(s, `translate(${f1(tx)} ${f1(ty)})`), `translate(${f1(x)} ${f1(y)}) rotate(${d.tilt}) scale(${sc.toFixed(3)})`);
}
/* mao com celular */
const PHONEH = (Pf, t, x, y, sc, rot, o = {}) => { const d = Object.assign({ screen: '#9fd0ff', glow: 1, content: '' }, o); return G(glow(Pf, 'B', 0, -100, 420, 0.5 * d.glow) + R(-70, -240, 140, 280, '#0c0f16', `rx="22" stroke="#2a3040" stroke-width="5"`) + R(-60, -226, 120, 252, d.screen, 'rx="14"') + d.content + E(-72, 40, 34, 28, AL.skin, OP(0)) + R(-90, 30, 180, 40, AL.skin, 'rx="20"') + R(-72, -10, 22, 70, AL.skin, 'rx="11"') + R(-40, -10, 22, 70, AL.skin, 'rx="11"') + R(-8, -10, 22, 70, AL.skin, 'rx="11"') + R(24, -10, 22, 70, AL.skin, 'rx="11"'), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`); };
const MANO = (x, y, sc, rot, col = AL.skin, point = 0) => G(R(-30, 0, 60, 320, col, 'rx="26"') + E(0, -6, 44, 56, col) + (point ? R(-11, -120, 22, 120, col, 'rx="11"') : [-24, -8, 8, 24].map((q, i) => R(q - 8, -56 - 5 * (i % 2), 16, 58, col, 'rx="8"')).join('')) + R(-34, 250, 68, 80, AL.tee), `translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${sc})`);
/* quarto de madrugada: azul escuro, luz fria do celular */
const NIGHT = (Pf, t, o = {}) => { const d = Object.assign({ wall: '#0f1830', floor: '#0a1022', glowA: 0.0, door: 0, win: 1 }, o); let s = BIG(d.wall) + R(-300, 1250, 1680, 800, d.floor) + R(-300, 1244, 1680, 12, '#050810'); if (d.win) s += G(R(-150, -210, 300, 420, '#0c1a3a', 'stroke="#1a2a4a" stroke-width="14"') + L(0, -210, 0, 210, '#1a2a4a', 8) + L(-150, 0, 150, 0, '#1a2a4a', 8) + C(70, -100, 30, '#dfe8f8', OP(0.7)) + glow(Pf, 'B', 70, -100, 220, 0.4), 'translate(840 520)'); if (d.glowA) s += glow(Pf, 'B', 540, 900, 900, d.glowA); return s; };
const BEDC = (Pf, t, o = {}) => G(R(-420, 80, 840, 150, '#1a2848', 'rx="20"') + R(-420, 200, 840, 60, '#0e1630') + R(-460, -160, 80, 420, '#101a34', 'rx="14"') + P('M-420,80 Q-200,10 20,60 Q240,110 420,50 L420,200 L-420,200Z', '#2a3c66') + E(-290, 30, 150, 52, '#e8eef8', OP(0.9)) + E(-290, 30, 150, 52, '#8aa0c8', OP(0.25)), 'translate(540 1250)');
const CLOCKD = (txt, x, y, sc, col = '#ff2a2a', a = 1) => G(R(-190, -90, 380, 180, '#06060a', 'rx="20" stroke="#1a1a22" stroke-width="10"') + TXT(0, 50, txt, 130, col, OP(a)) + glow('', 'A', 0, 0, 0, 0), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const SUPT = (txt, x, y, sz, lt, col = '#ffffff', o = {}) => { const u = ez(lt / 0.16); return G(TXT(0, 0, txt, sz, '#000', `stroke="#000" stroke-width="${f1(sz * 0.18)}" opacity="0.7"`) + TXT(0, 0, txt, sz, col, ''), `translate(${f1(x)} ${f1(y + 20 * (1 - u))}) scale(${f1(0.7 + 0.3 * u)})`, OP(u)); };
/* corpo inteiro (pe no chao em 0,0; altura ~1700). view: 'f' frente, 'b' costas */
function ALIB(o, x, y, sc) {
  const d = Object.assign({ view: 'f', t: 0, armR: 8, armL: -8, elbR: 6, elbL: -6, sway: 1, head: {}, tee: AL.tee, point: 0 }, o), sw = d.sway * 3 * Math.sin(d.t * 1.6);
  const skin = AL.skin, skd = AL.skinSh;
  const leg = (sx) => P(`M${sx * 20},-690 L${sx * 112},-690 L${sx * 98},-330 Q${sx * 96},-300 ${sx * 92},-230 L${sx * 88},-30 Q${sx * 88},0 ${sx * 70},0 L${sx * 14},0 Q${sx * 0},0 ${sx * 8},-30 L${sx * 14},-240 Q${sx * 14},-330 ${sx * 20},-400Z`, skin, `stroke="${AL.ink}" stroke-width="3"`) + P(`M${sx * 20},-690 L${sx * 112},-690 L${sx * 98},-330 L${sx * 60},-330Z`, skd, OP(0.12)) + (d.view === 'f' ? '' : '');
  const arm = (sx, a, e) => G(P('M-34,0 L34,0 L28,330 Q0,350 -28,330Z', skin, `stroke="${AL.ink}" stroke-width="3"`) + P('M-34,0 L34,0 L28,150 L-28,150Z', AL.tee, `stroke="${AL.ink}" stroke-width="3"`) + E(0, 372, 30, 46, skin, `stroke="${AL.ink}" stroke-width="3"`), `translate(${sx * 204} -1290) rotate(${sx > 0 ? -a : a})`);
  let s = E(0, 8, 170, 18, 'rgba(0,0,0,0.4)');
  s += leg(-1) + leg(1);
  s += P('M-120,-640 Q-124,-840 -112,-860 L112,-860 Q124,-840 120,-640 L20,-600 L-20,-600Z', mixc(AL.tee, '#8fb4da', 0.35), `stroke="${AL.ink}" stroke-width="3"`);
  s += P(`M-170,-860 Q-186,-1180 -150,-1290 L-60,-1330 Q0,-1300 60,-1330 L150,-1290 Q186,-1180 170,-860Z`, d.tee, `stroke="${AL.ink}" stroke-width="3"`) + P(`M-170,-860 Q-186,-1180 -150,-1290 L-110,-1300 Q-130,-1100 -128,-860Z`, AL.teeSh, OP(0.5)) + L(-170, -862, 170, -862, AL.teeSh, 5, OP(0.6));
  s += arm(-1, d.armL, d.elbL) + arm(1, d.armR, d.elbR);
  s += G(ALI(Object.assign({ body: 0, t: d.t, back: d.view === 'b' ? 1 : 0, bodyLen: 300 }, d.head), 0, 0, 1), `translate(${sw} -1470) scale(0.56)`);
  return G(s, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
}
/* camera de seguranca: monocromatico esverdeado, granulado */
const CCTV = (Pf, t, inner, o = {}) => { const d = Object.assign({ cam: 'CAM 02 · SALA', ts: '03:17:04', rec: 1 }, o); let s = G(inner, '', `style="filter:grayscale(1) contrast(1.05)"`) + R(-300, -300, 1680, 2520, '#3aff8a', OP(0.10)) + R(-300, -300, 1680, 2520, '#001a0c', OP(0.28)); for (let i = 0; i < 80; i++) s += R(0, i * 24, 1080, 2, '#000', OP(0.16)); for (let i = 0; i < 90; i++) s += R(hz(i + Math.floor(t * 24), 1) * 1080, hz(i + Math.floor(t * 24), 2) * 1920, 3 + 5 * hz(i, 3), 2, '#e8ffe8', OP(0.22 * hz(i + Math.floor(t * 24), 4))); s += TXT(0, 0, '', 1, '#000') + G(TXS(d.cam, 38, '#d8ffe0') , 'translate(70 130)') + G(TXS(d.ts, 38, '#d8ffe0'), 'translate(70 1830)') + (d.rec && (t * 1.2) % 1 < 0.6 ? C(960, 120, 18, '#ff2a2a') + G(TXS('REC', 34, '#ff5a5a'), 'translate(990 134) scale(0.9)') : ''); return s + R(40, 40, 1000, 1840, 'none', 'stroke="#d8ffe0" stroke-width="3" opacity="0.5"'); };
/* corredor em perspectiva */
const HALLC = (Pf, t, o = {}) => { const d = Object.assign({ light: 0, door: 1, far: 1 }, o), wall = d.light ? '#4a3a30' : '#10162a', wall2 = d.light ? '#382c24' : '#0a1020', fl = d.light ? '#2a2020' : '#080c1a'; let s = BIG('#05070e') + P('M-300,-300 L540,640 L540,1300 L-300,2200Z', wall2) + P('M1380,-300 L540,640 L540,1300 L1380,2200Z', wall) + P('M-300,-300 L1380,-300 L540,640Z', '#080c18') + P('M-300,2200 L1380,2200 L540,1300Z', fl) + R(400, 640, 280, 660, d.light ? '#d8b878' : '#0b101f', d.light ? OP(0.45) : OP(0.9)) + L(540, 640, 540, 1300, '#000', 4, OP(0.4)); if (d.light) s += glow(Pf, 'A', 540, 300, 900, 0.5) + R(380, -200, 320, 40, '#fff0c0', 'rx="14"'); return s; };
const DOORA = (Pf, t, o = {}) => { const d = Object.assign({ handle: 0, knock: 0, gap: 0.0, x: 540, y: 1620, sc: 2.2 }, o); let s = BIG('#070b18') + R(-300, 1560, 1680, 700, '#0a1020') + G(R(-200, -560, 400, 560, '#3a2a28', `stroke="#1a1210" stroke-width="12"`) + R(-170, -520, 150, 220, '#46342f', 'rx="6"') + R(20, -520, 150, 220, '#46342f', 'rx="6"') + R(-170, -270, 150, 240, '#46342f', 'rx="6"') + R(20, -270, 150, 240, '#46342f', 'rx="6"') + C(150, -270, 20, '#b8b8c0') + G(R(0, -7, 78, 14, '#b8b8c0', 'rx="7"') + C(0, 0, 0, '#000'), `translate(150 -270) rotate(${f1(d.handle)})`), `translate(${f1(d.x + (d.knock ? 5 * Math.sin(t * 80) : 0))} ${f1(d.y)}) scale(${d.sc})`); if (d.gap) s += R(d.x - 200 * d.sc, d.y - 2, 400 * d.sc, 3 * d.sc, '#ffe9a0', OP(d.gap)) + P(`M${d.x - 200 * d.sc},${d.y} L${d.x + 200 * d.sc},${d.y} L${d.x + 360 * d.sc},${d.y + 300} L${d.x - 360 * d.sc},${d.y + 300}Z`, '#ffe9a0', OP(0.1 * d.gap)); return s; };

const TXS = (str, size, fill) => `<text x="0" y="0" text-anchor="start" font-family="Poppins, DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="${size}" fill="${fill}" opacity="0.92">${str}</text>`;
