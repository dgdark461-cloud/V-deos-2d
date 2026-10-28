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

function partC(c) {
  const { add, tw, k, E_, S } = c;
  const seg = i => S[i].start;

  /* 39. Mantém a calma: respiração profunda */
  add(seg(67), 0.1, (t, lt, Pf) => {
    const br = 0.5 + 0.5 * Math.sin(lt * 2.6 - 1.2), op = lt < 0.6 ? 0.1 : 1;
    let s = defsC(Pf) + forest(Pf, t, { k: 0.9, px: 0, fog: 0.9, shafts: 0 }) + R(0, 0, 1080, 1920, '#050a10', OP(0.55));
    s += X(Pf, G(womanFace({ t, eye: H.lerp(0.1, 1, k(lt, 0.4, 0.9)), pupil: 0.9, worry: 0.2, mouth: 0.08 + 0.12 * br, dirt: 0.8, mess: 1, cold: 0.15, tilt: 1.5 * Math.sin(lt * 1.3) }), `translate(540 ${f1(1100 - 14 * br)}) scale(${(1.7 + 0.04 * br).toFixed(3)})`));
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.5 + i / 3) % 1); s += E(540, 1210 - ph * 120, 40 + ph * 60, 20 + ph * 30, 'rgba(210,230,245,0.3)', OP((1 - ph) * br)); }
    s += vignette(Pf, 1);
    return s;
  });

  /* 40. Confere o que tem: tateia os bolsos */
  add(seg(68), 0.06, (t, lt, Pf) => {
    const pat = Math.abs(Math.sin(lt * 6));
    let s = defsC(Pf) + forest(Pf, t, { k: 1.0, px: 0, fog: 0.85, shafts: 0 }) + R(0, 0, 1080, 1920, '#04070d', OP(0.45));
    s += G(womanFig({ scale: 1.55, arms: [-18 - 14 * pat, 24 + 40 * pat, 18 + 14 * pat, -24 - 40 * pat], scared: 0.4, headTilt: 4 * Math.sin(lt * 3) }), 'translate(540 1780)');
    for (let i = 0; i < 3; i++) { const a = k(lt, 0.4 + i * 0.4, 0.8 + i * 0.4); s += R(150 + i * 300, 360, 220, 220, 'rgba(255,255,255,0.05)', `rx="30" stroke="rgba(255,255,255,0.35)" stroke-width="5" stroke-dasharray="14 12" ${OP(0.4 + 0.6 * a)}`); }
    s += vignette(Pf, 1);
    return s;
  });

  /* 41. Celular sem sinal */
  add(seg(69), 0.05, (t, lt, Pf) => {
    const up = E_.outBack(k(lt, 0, 0.4));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05080d') + glow(Pf, 'B', 540, 960, 1000, 0.2);
    s += G(phoneObj(Pf, { t, batt: 0.12, noSig: 1 }), `translate(540 ${f1(1000 + 120 * (1 - up))}) rotate(${f1(-6 + 6 * up)}) scale(${(2.6 * up).toFixed(3)})`);
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); s += `<path d="M${f1(300 - ph * 40)},${f1(520 - ph * 40)} a${f1(120 + ph * 120)},${f1(120 + ph * 120)} 0 0 1 ${f1(240 + ph * 80)},0" fill="none" stroke="rgba(255,255,255,${(0.35 * (1 - ph)).toFixed(2)})" stroke-width="8"/>`; }
    s += bigX(540, 560, 90, E_.outBack(k(lt, 0.45, 0.8)), PAL.red, 22);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 42. 12% de bateria */
  add(seg(70), 0.05, (t, lt, Pf) => {
    const lv = H.lerp(0.6, 0.12, E_.outCubic(k(lt, 0, 0.9))), bl = 0.5 + 0.5 * Math.sin(t * 8);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#08050a') + glow(Pf, 'R', 540, 960, 900, 0.25 * bl);
    s += R(160, 700, 700, 380, 'rgba(5,5,8,0.9)', 'rx="50" stroke="#e8eef4" stroke-width="16"') + R(860, 800, 54, 180, '#e8eef4', 'rx="14"');
    s += R(190, 730, 640 * lv, 320, mixc('#ff3b30', '#ff9a3a', bl * 0.5), 'rx="30"');
    s += `<text x="540" y="1330" text-anchor="middle" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="800" font-size="190" fill="#fff" ${OP(k(lt, 0.8, 1.1))}>12%</text>`;
    s += vignette(Pf, 1);
    return s;
  });

  /* 43. Isqueiro no bolso */
  add(seg(71), 0.05, (t, lt, Pf) => {
    const fl = E_.outCubic(k(lt, 0.5, 0.8)), rot = H.lerp(-30, 6, E_.outBack(k(lt, 0, 0.4)));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080c') + glow(Pf, 'F', 540, 800, 800 * fl + 50, 0.7 * fl);
    s += G(lighterObj({ flame: fl, t, rot: 0 }), `translate(540 ${f1(1000)}) rotate(${f1(rot)}) scale(3.4)`);
    s += sparksFx(540, 880, t, lt > 0.35 && lt < 0.6 ? 1 : 0, 10, 100, '#ffd45e');
    s += vignette(Pf, 1);
    return s;
  });

  /* 44. 20 horas até o amanhecer */
  add(seg(72), 0.06, (t, lt, Pf) => {
    const dur = seg(73) - seg(72), h = E_.inOutCubic(k(lt, 0.4, dur - 0.3)), tN = tw('amanhecer', 0, 120.5);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05070d') + glow(Pf, 'B', 540, 800, 1000, 0.15);
    // mostrador de 24 h com setor de 20 h
    const cx = 540, cy = 760, r = 330;
    s += C(cx, cy, r, '#0d141c', 'stroke="#e8eef4" stroke-width="12"');
    const a0 = -Math.PI / 2, a1 = a0 + Math.PI * 2 * (20 / 24) * h;
    s += `<path d="M${cx},${cy} L${f1(cx + Math.cos(a0) * r)},${f1(cy + Math.sin(a0) * r)} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${f1(cx + Math.cos(a1) * r)},${f1(cy + Math.sin(a1) * r)}Z" fill="rgba(255,74,74,0.35)"/>`;
    for (let i = 0; i < 24; i++) { const a = a0 + i * Math.PI / 12; s += L(cx + Math.cos(a) * (r - 14), cy + Math.sin(a) * (r - 14), cx + Math.cos(a) * (r - (i % 6 ? 34 : 56)), cy + Math.sin(a) * (r - (i % 6 ? 34 : 56)), '#e8eef4', i % 6 ? 4 : 8); }
    s += L(cx, cy, cx + Math.cos(a1) * (r - 40), cy + Math.sin(a1) * (r - 40), PAL.red, 12) + C(cx, cy, 16, PAL.red);
    s += `<text x="540" y="1300" text-anchor="middle" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="800" font-size="220" fill="#ffd35a" ${OP(E_.outCubic(k(t, tw('horas', 2, 119.7) - 0.3, tw('horas', 2, 119.7) + 0.2)))}>20</text>`;
    // sol nascendo no horizonte, baixo
    const sy = H.lerp(1700, 1560, h);
    s += R(0, 1560, 1080, 360, '#05070b') + L(0, 1560, 1080, 1560, 'rgba(255,255,255,0.25)', 4) + C(540, 1560 + (1 - h) * 160, 90, '#ffb347', OP(0.3 + 0.7 * h)) + glow(Pf, 'A', 540, 1560, 360 * h + 40, 0.5 * h);
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 45. Juntando gravetos e acendendo */
  add(seg(73), 0.06, (t, lt, Pf) => {
    const tF = tw('fogueira', 0, 122.5), ig = E_.outCubic(k(t, tF - 0.1, tF + 0.3));
    let s = defsC(Pf) + forest(Pf, t, { k: 1.15, px: 0, fog: 0.8, shafts: 0, ground: 1250 }) + R(0, 0, 1080, 1920, '#02040a', OP(0.25));
    const n = Math.min(9, Math.floor(lt * 7));
    for (let i = 0; i < n; i++) { const a = -35 + i * 9, x = 540 + (i - 4) * 14; s += G(R(-110, -8, 220, 16, '#4a3322', 'rx="8"'), `translate(${f1(x)} ${f1(1500 - Math.abs(i - 4) * 4 - 10 * (i % 2))}) rotate(${a + (i % 2 ? 90 : 0) * 0 + (i % 2 ? 60 : -60) * 0.9})`); }
    s += E(540, 1520, 200, 22, 'rgba(0,0,0,0.4)');
    s += G(lighterObj({ flame: lt > 0.8 && ig < 1 ? 1 : (ig > 0.5 ? 0.4 : 0), t, rot: -25 }), `translate(${f1(H.lerp(900, 640, E_.outCubic(k(lt, 0.2, 0.8))))} 1330) scale(1.1)`);
    s += fireFx(Pf, 540, 1500, 0.7, t, ig) + glow(Pf, 'F', 540, 1400, 600 * ig, 0.5 * ig);
    s += G(womanFig({ scale: 1.0, arms: [60, 90, -20, -40], scared: 0.5 }), 'translate(260 1700)') + vignette(Pf, 0.9);
    return s;
  });

  /* 46. O fogo afasta os bichos: olhos recuando */
  add(seg(74), 0.06, (t, lt, Pf) => {
    const dur = seg(75) - seg(74);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 1.4, fire: 1, wx: 360, look: 3, cold: 0.1 });
    for (let i = 0; i < 6; i++) { const u = k(lt, 0.3 + i * 0.18, dur), x = H.lerp(540 + (i % 3) * 200, i % 2 ? 1250 : -150, u) + (i % 2 ? 120 : -100), y = 1180 - 90 * (i % 3), a = Math.sin(Math.PI * cl(u * 1.2)) * 0.9 * (1 - u); s += eyesPair(Pf, x, y, 0.8, i % 2 ? '#ffd35a' : '#ff6a3a', a, 34); }
    s += vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.1 * lt / dur, 0, 1, s);
  });

  /* 47. "Em teoria... basta sobreviver até o sol nascer": sol distante surge atrás das árvores */
  add(seg(75), 0.08, (t, lt, Pf) => {
    const dur = seg(77) - seg(75), u = E_.inOutCubic(k(lt, 0.6, dur - 0.1));
    let s = defsC(Pf) + campWorld(Pf, t, { k: 1.4 + 0.3 * (1 - u), fire: 1, wx: 360 });
    const sx = 880, sy = H.lerp(1260, 640, u);
    s += glow(Pf, 'A', sx, sy, 380 * (0.4 + u), 0.8 * u) + C(sx, sy, 60, '#ffd98a', OP(0.2 + 0.8 * u)) + `<g ${OP(0.5 * u)}>` + (() => { let q = ''; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * 0.2; q += L(sx + Math.cos(a) * 90, sy + Math.sin(a) * 90, sx + Math.cos(a) * 170, sy + Math.sin(a) * 170, '#ffd98a', 6); } return q; })() + '</g>';
    s += vignette(Pf, 0.9);
    return s;
  });

  /* 48. Escurece: noite cai, linha do tempo acelerada */
  add(seg(77), 0.06, (t, lt, Pf) => {
    const dur = seg(78) - seg(77), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + campWorld(Pf, t, { k: H.lerp(1.5, 2.0, u), fire: H.lerp(0.9, 1.15, u), wx: 380, look: 2 });
    s += R(0, 0, 1080, 1920, '#000', OP(0.3 * u));
    s += vignette(Pf, 0.8 + 0.2 * u);
    return camG(t, 540, 1150, H.lerp(1.0, 1.25, u), 0, 0.6, s);
  });

  /* 49. Os sons da floresta: olhos no escuro, morcegos, ondas */
  add(seg(78), 0.06, (t, lt, Pf) => {
    const dur = seg(79) - seg(78);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1.1, wx: 380, look: 6, scared: 1 });
    const pos = [[100, 1040], [260, 1180], [900, 1060], [1000, 1190], [620, 1010], [180, 900], [820, 880]];
    pos.forEach((p, i) => { const a = k(lt, 0.2 + i * 0.3, 0.6 + i * 0.3) * (0.6 + 0.4 * Math.abs(Math.sin(t * 2 + i))); s += eyesPair(Pf, p[0], p[1], 0.7, i % 3 ? '#ffd35a' : '#ff5a3a', a, 28); });
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.6 + i / 4) % 1); s += C(540, 1100, 80 + ph * 900, 'none', `stroke="rgba(160,210,255,${(0.22 * (1 - ph)).toFixed(3)})" stroke-width="5"`); }
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.25 + i * 0.33) % 1), bx = -100 + ph * 1300, by = 300 + 90 * Math.sin(ph * 9 + i) + i * 120, fl = Math.sin(t * 22 + i); s += G(P('M0,0 Q-30,-30 -70,-8 Q-40,-4 -26,14 Q-12,6 0,22 Q12,6 26,14 Q40,-4 70,-8 Q30,-30 0,0Z', '#05070b'), `translate(${f1(bx)} ${f1(by)}) scale(${(1.6).toFixed(2)} ${(1.0 + 0.45 * fl).toFixed(2)})`); }
    s += vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1100, 1.05, 0, 1.2, s);
  });

  /* 50. Completamente sozinha: câmera sobe */
  add(seg(79), 0.08, (t, lt, Pf) => {
    const dur = seg(80) - seg(79), u = E_.inOutCubic(k(lt, 0, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#000');
    s += camG(t, 540, H.lerp(1250, 900, u), H.lerp(1.9, 0.52, u), 0, 0, campWorld(Pf, t, { k: 2, fire: 1.0, wx: 380, ws: 1.0 }));
    s += vignette(Pf, 1);
    return s;
  });

  /* 51. "Pelo menos... é o que parece": olhar escondido atrás dos troncos, vulto distante */
  add(seg(80), 0.1, (t, lt, Pf) => {
    const dur = seg(82) - seg(80), u = k(lt, 0, dur);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, px: -lt * 40, wx: 380 });
    s += G(X(Pf, manSil({ eyes: 0.0, col: '#02030a' })), 'translate(1010 1270) scale(0.44)', OP(0.35 * E_.inOutQuad(k(lt, 0.4, 1.2)) ));
    s += fgTrunks(t, lt * 90, 2, -200, 4, 1);
    s += vignette(Pf, 1) + grain(t, 0.07);
    return camG(t, 540, 1150, H.lerp(1.1, 1.5, u), 0, 1.5, s);
  });

  /* 52. Meia-noite: lua alta + relógio, o lobo retorna */
  add(seg(82), 0.08, (t, lt, Pf) => {
    const dur = seg(84) - seg(82), tR = seg(83), ch = Math.exp(-(t - seg(82)) * 3);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, wx: 380, look: 0 });
    s += G(clockObj(Pf, { h: 0, m: 0, glow: 0.7, col: '#cfe2f4' }), `translate(540 420) scale(${(1.1 + 0.15 * ch).toFixed(3)})`, OP(1 - k(lt, 1.0, 1.4)));
    s += ringWaves(540, 420, t, seg(82), 3, 500, 'rgba(190,225,255,0.5)', 1 - k(lt, 1.0, 1.4), 5);
    const ek = k(t, tR + 0.1, tR + 0.7);
    s += eyesPair(Pf, 1010, 1200, 1.2, '#ffd35a', ek, 40) + G(wolfSide({ scale: 0.8, flip: -1, head: 0.2, t, glow: 1, dark: 0.7 }), `translate(${f1(H.lerp(1300, 1030, E_.outCubic(ek)))} 1300)`, OP(ek));
    s += vignette(Pf, 1);
    return s;
  });

  /* 53. Dez metros da fogueira */
  add(seg(84), 0.06, (t, lt, Pf) => {
    const dur = seg(85) - seg(84), u = E_.outCubic(k(lt, 0, 1.2)), gk = E_.outCubic(k(lt, 0.8, 1.8));
    let s = defsC(Pf);
    let w = campWorld(Pf, t, { k: 2, fire: 1, wx: 300, fx: 640, scared: 1, look: 6 });
    w += G(wolfSide({ phase: (lt * 0.7) % 1 * (1 - u) + 0.1, scale: 1.05, flip: -1, head: 0.2, t, glow: 1, dark: 0.15, tail: 0 }), `translate(${f1(H.lerp(1500, 1000, u))} 1340)`);
    const x0 = 640, x1 = 1000, yb = 1480;
    w += L(x0, yb, x0 + (x1 - x0) * gk, yb, '#ffd35a', 8) + C(x0, yb, 12, '#ffd35a') + C(x0 + (x1 - x0) * gk, yb, 12, '#ffd35a');
    for (let i = 0; i <= 10; i++) if (i / 10 <= gk) w += L(x0 + (x1 - x0) * i / 10, yb - 18, x0 + (x1 - x0) * i / 10, yb + 18, '#ffd35a', 4);
    s += camG(t, 640, 1200, 1.0 + 0.12 * lt / dur, 0, 0.8, w) + vignette(Pf, 1);
    return s;
  });

  /* 54a. Coração dispara */
  add(seg(85), 0.05, (t, lt, Pf) => {
    const dur = seg(86) - seg(85), bpm = H.lerp(110, 170, k(lt, 0, dur)), beat = Math.exp(-(((t * bpm / 60) % 1)) * 9);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080508') + glow(Pf, 'R', 540, 760, 1000, 0.15 + 0.35 * beat);
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.55, worry: 1, mouth: 0.1, sweat: 1, tremble: 1 + 3 * beat, dirt: 0.8, mess: 1, cold: 0.15 }), `translate(540 ${f1(1000)}) scale(${(1.6 + 0.06 * beat).toFixed(3)})`));
    s += ecgLine(40, 1700, 1000, t, bpm, 1, 120 + 30 * beat) + flash(PAL.red, 0.12 * beat) + vignette(Pf, 1);
    return camG(t, 540, 960, 1, 0, 6 * beat, s);
  });

  /* 54b. Completamente imóvel */
  add(seg(86), 0.08, (t, lt, Pf) => {
    const dur = seg(87) - seg(86), u = k(lt, 0, dur);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, wx: 380, scared: 1, look: 6, eye: 1 }).replace(/<g transform="translate\(380 1340\)"/, '<g transform="translate(380 1340)"');
    s += R(0, 0, 1080, 1920, '#7aa6d0', OP(0.10 + 0.1 * u)) + R(0, 0, 1080, 1920, '#000', OP(0.15 * u));
    s += `<g ${OP(0.9)}><path d="M460,1000 Q474,1040 460,1060 Q446,1040 460,1000Z" fill="rgba(200,235,255,0.8)" transform="translate(0 ${f1(30 * u)})"/></g>`;
    s += eyesPair(Pf, 1040, 1230, 0.9, '#ffd35a', 0.9, 34);
    s += vignette(Pf, 1);
    return camG(t, 540, 1150, H.lerp(1.2, 1.7, u), 0, 0, s);
  });

  /* 55. Algo estranho: efeito vertigem no lobo */
  add(seg(87), 0.06, (t, lt, Pf) => {
    const dur = seg(88) - seg(87), u = E_.inQuad(k(lt, 0, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#02040a');
    s += camG(t, 540, 1100, H.lerp(0.6, 1.4, 1 - u) * 0 + H.lerp(1.0, 0.55, u), 0, 0, forest(Pf, t, { k: 2, px: 0, fog: 0.7, shafts: 0, glowFire: 0.6, fx: 540, fy: 1250 }));
    s += X(Pf, G(wolfHead({ t, uid: 'v', glow: 1, looky: 0, lookx: -14 + 10 * u, ears: 0.2 }), `translate(540 900) scale(${H.lerp(0.9, 1.7, u).toFixed(3)})`));
    s += vignette(Pf, 1) + flash('#fff', 0.05 * Math.sin(lt * 40));
    return s;
  });

  /* 56. O lobo não está olhando para você: pupila desvia */
  add(seg(88), 0.05, (t, lt, Pf) => {
    const dur = seg(89) - seg(88), sh = E_.inOutCubic(k(lt, 0.4, 1.2));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050403') + glow(Pf, 'F', 540, 960, 1000, 0.3);
    const woman = G(womanFig({ scale: 0.5, scared: 1 }), 'translate(-150 150)', OP(1 - sh));
    s += camG(t, 0, 0, 1.4 + 0.12 * lt, 0, 2, X(Pf, wolfEye(Pf, { t, pupil: 0.55, lookx: H.lerp(-6, 150, sh), looky: -6 * sh, refl: woman, reflA: 0.7 * (1 - sh) })));
    s += vignette(Pf, 1);
    return s;
  });

  /* 57. Ele olha para algo atrás das suas costas: reflexo no olho */
  add(seg(89), 0.06, (t, lt, Pf) => {
    const dur = seg(91) - seg(89), rk = E_.inOutCubic(k(lt, 0.8, 2.2));
    const refl = G(womanFig({ back: true, scale: 0.42, arms: [10, 20, -10, -20] }), 'translate(-90 190)') + G(X(Pf, manSil({ eyes: 0.9 * rk, col: '#020203', rim: 0.4 })), `translate(130 220) scale(${H.lerp(0.18, 0.34, rk).toFixed(3)})`, OP(rk));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050403') + glow(Pf, 'F', 540, 960, 1000, 0.25);
    s += camG(t, 0, 0, 1.55 + 0.35 * k(lt, 0, dur), 0, 1.5, X(Pf, wolfEye(Pf, { t, pupil: 0.5 - 0.1 * rk, lookx: 150, looky: -6, refl, reflA: 1 })));
    s += vignette(Pf, 1) + flash('#fff', 0.15 * Math.exp(-(lt - 0.8) * 8) * (lt > 0.8 ? 1 : 0));
    return s;
  });

  /* 58. Por um segundo... paralisado */
  add(seg(91), 0.05, (t, lt, Pf) => {
    const dur = seg(93) - seg(91), u = k(lt, 0, dur);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050403') + glow(Pf, 'F', 540, 900, 900, 0.3 + 0.1 * Math.sin(t * 3));
    s += X(Pf, G(wolfHead({ t, uid: 'p', glow: 1, ears: 0.7, snarl: 0, lookx: 18, eye: 1.0, tilt: 0 }), `translate(${f1(540 + H.noise(t * 30, 3) * 3)} ${f1(960 + H.noise(t * 30, 4) * 3)}) scale(${H.lerp(1.5, 1.8, u).toFixed(3)})`));
    s += R(0, 0, 1080, 1920, '#bcd6ee', OP(0.06)) + vignette(Pf, 1);
    return s;
  });

  /* 59. De repente: o lobo dá meia-volta */
  add(seg(93), 0.03, (t, lt, Pf) => {
    const turn = E_.inQuad(k(lt, 0.0, 0.5)), flip = k(lt, 0.15, 0.4);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, woman: true, wx: 330, scared: 1, look: 6 });
    s += G(wolfSide({ phase: (lt * 3) % 1, run: 1, scale: 1.15, flip: flip > 0.5 ? 1 : -1, head: 0, t, mouth: 0.3, dark: 0.1 }), `translate(${f1(H.lerp(1000, 1100 + 900 * Math.max(0, turn - 0.4), 1))} 1340) rotate(${f1(-8 * Math.sin(turn * 3.14))})`);
    for (let i = 0; i < 8; i++) s += L(900 + hz(i, 4) * 200, 1150 + hz(i, 5) * 200, 1100 + hz(i, 4) * 200 + 200 * turn, 1150 + hz(i, 5) * 200, 'rgba(255,255,255,0.35)', 4, OP(turn));
    s += flash('#fff', 0.25 * Math.exp(-lt * 10)) + vignette(Pf, 1);
    return camG(t, 540, 1150, 1.1, 0, 5 * Math.exp(-lt * 3), s);
  });

  /* 60. Dispara floresta adentro */
  add(seg(95), 0.04, (t, lt, Pf) => {
    const dur = seg(97) - seg(95), u = E_.inQuad(k(lt, 0, dur));
    let s = defsC(Pf) + forest(Pf, t, { k: 2, px: lt * 700, fog: 0.8, shafts: 0, glowFire: 0.35, fx: 900 - lt * 300, fy: 1250 });
    const wx = H.lerp(520, 1500, u), sc = H.lerp(1.3, 0.35, u);
    s += G(wolfSide({ phase: (lt * 3.2) % 1, run: 1, scale: sc, flip: 1, mouth: 0.6, t, tail: 1, dark: 0.1 + 0.6 * u }), `translate(${f1(wx)} ${f1(H.lerp(1500, 1330, u))})`);
    s += fireFx(Pf, H.lerp(300, -300, u), 1340, 0.9, t, 1 - u);
    s += R(0, 0, 1080, 1920, '#000', OP(0.35 * u)) + fgTrunks(t, lt * 900, 2, 200, 4, 0.9) + vignette(Pf, 1);
    return s;
  });

  /* 61. Você não entende o que aconteceu */
  add(seg(97), 0.06, (t, lt, Pf) => {
    const lk = 30 * Math.sign(Math.sin(lt * 2.4)) * Math.min(1, Math.abs(Math.sin(lt * 2.4)) * 4);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080507') + glow(Pf, 'F', 540, 900, 1000, 0.3 + 0.1 * Math.sin(t * 17));
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.9, lookx: lk, looky: -4, worry: 0.8, mouth: 0.12, dirt: 0.8, mess: 1, sweat: 1, tremble: 0.8, tilt: 3 * Math.sin(lt * 2.4) }), 'translate(540 1060) scale(1.75)'));
    s += R(0, 0, 1080, 1920, '#ff7a1f', OP(0.08 + 0.06 * Math.sin(t * 15))) + vignette(Pf, 1);
    return s;
  });

  /* 62. Galho se quebra atrás: ondas */
  add(seg(98), 0.04, (t, lt, Pf) => {
    const tG = tw('galho', 1, 162.5), hit = k(t, tG - 0.05, tG + 0.1);
    let s = defsC(Pf) + campWorld(Pf, t, { k: 2, fire: 1, woman: false, wx: 380 });
    s += G(womanSit({ t, scale: 1.0, rim: 1, scared: 1 }), 'translate(380 1340)');
    s += G(womanSit({ t, scale: 1.0 }), 'translate(380 1340)', OP(0));
    // galho quebrando no escuro, atrás
    s += G(R(-120, -8, 120, 16, '#2a1f17') , `translate(${f1(150 - 20 * hit)} ${f1(1190 + 36 * hit)}) rotate(${f1(-24 * hit)})`, OP(hit > 0 ? 1 : 0)) + G(R(0, -8, 120, 16, '#2a1f17'), `translate(${f1(150 + 20 * hit)} ${f1(1190 + 46 * hit)}) rotate(${f1(26 * hit)})`, OP(hit > 0 ? 1 : 0));
    s += ringWaves(150, 1190, t, tG, 3, 700, 'rgba(255,255,255,0.6)', hit > 0 ? 1 : 0, 6) + sparksFx(150, 1190, t, hit > 0 ? (1 - k(t, tG + 0.1, tG + 0.5)) : 0, 12, 90, '#d9c7a0');
    s += flash('#fff', 0.15 * (1 - k(t, tG, tG + 0.2)) * hit) + vignette(Pf, 1);
    return camG(t, 540, 1150, 1.25, 0, 5 * (1 - k(t, tG, tG + 0.6)) * hit + 1, s);
  });

  /* 63. Bem atrás de você: sombras na árvore */
  add(seg(99), 0.04, (t, lt, Pf) => {
    const dur = seg(100) - seg(99), u = E_.inOutQuad(k(lt, 0, dur)), sk = E_.outCubic(k(lt, 0.2, 1.0));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050810') + glow(Pf, 'F', 540, 1450, 1200, 0.35);
    s += trunkTree(540, 460, -400, 1500, '#140f0b', false) + R(0, 1500, 1080, 500, '#0a0e14');
    s += glow(Pf, 'F', 540, 1450, 700, 0.35);
    // sombras projetadas no tronco (dela e de um segundo vulto)
    s += E(480, 1100, 140, 300, 'rgba(0,0,0,0.65)') + C(480, 760, 80, 'rgba(0,0,0,0.65)');
    s += P('M640,1500 L640,980 Q640,860 700,820 Q740,800 760,860 Q770,900 780,980 L800,1500Z', 'rgba(0,0,0,0.85)', OP(sk)) + C(715, 770, 66, 'rgba(0,0,0,0.85)', OP(sk));
    s += fireFx(Pf, 540, 1700, 1.0, t, 1);
    s += G(womanSit({ t, scale: 0.9, rim: 1, scared: 1 }), 'translate(300 1740)');
    s += vignette(Pf, 1) + grain(t, 0.07);
    return camG(t, 540, 1100, H.lerp(1.0, 1.15, u), 0, 1.5, s);
  });

  /* 64. Corpo congela */
  add(seg(100), 0.05, (t, lt, Pf) => {
    const dur = seg(101) - seg(100), fz = E_.outCubic(k(lt, 0.1, 0.9));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#050810') + glow(Pf, 'B', 540, 900, 1000, 0.15);
    s += X(Pf, G(womanFace({ t, eye: 1, pupil: 0.35, worry: 1, mouth: 0.0, sweat: 1, cold: 0.9 * fz, tremble: 0.0, dirt: 0.8, mess: 1 }), `translate(540 1060) scale(${H.lerp(1.7, 2.0, k(lt, 0, dur)).toFixed(3)})`));
    s += frost(t, fz) + ecgLine(40, 1700, 1000, t, 150 * (1 - fz) + 8, 1, 120 * (1 - fz) + 4, '#9fd0ff') + vignette(Pf, 1);
    return s;
  });

  /* 65. Lembra a última frase: lanternas traseiras, vermelho */
  add(seg(101), 0.04, (t, lt, Pf) => {
    const dur = seg(103) - seg(101), u = E_.outQuad(k(lt, 0, dur));
    let s = defsC(Pf) + forest(Pf, t, { k: 1.3, px: 0, fog: 0.9, shafts: 0 }) + R(0, 0, 1080, 1920, '#2a0606', OP(0.35)) + POLY([[500, 1180], [580, 1180], [1100, 1950], [-60, 1950]], '#1c1a1c');
    const cy = H.lerp(1700, 1190, u);
    s += G(carBack(Pf, { brake: 0.7, dust: 0.8, t, scale: H.lerp(1.1, 0.14, u) }), `translate(540 ${f1(cy)})`);
    s += ringWaves(540, 1100, t, seg(102), 5, 760, 'rgba(255,60,50,0.5)', k(lt, 0.6, 1.2), 6);
    s += G(womanFig({ back: true, scale: 1.0, arms: [10, 20, -10, -20] }), 'translate(540 1900)');
    s += flash('#000', 0.2) + vignette(Pf, 1) + grain(t, 0.08);
    return s;
  });

  /* 66. "Quando anoitecer... vamos trazer o homem": rosto + eco */
  add(seg(103), 0.04, (t, lt, Pf) => {
    const tH = tw('homem', 3, 171.7), eyeO = E_.outCubic(k(t, tH - 0.3, tH + 0.3));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#080406') + glow(Pf, 'R', 540, 960, 1100, 0.28);
    for (let i = 0; i < 5; i++) { const ph = (((t - seg(103)) * 0.7 + i / 5) % 1); s += C(540, 1000, 100 + ph * 900, 'none', `stroke="rgba(255,60,50,${(0.4 * (1 - ph)).toFixed(3)})" stroke-width="${f1(8 * (1 - ph) + 2)}"`); }
    s += X(Pf, G(womanFace({ t, eye: H.lerp(0.9, 1, eyeO), pupil: H.lerp(0.8, 0.4, eyeO), worry: 1, mouth: 0.1 + 0.3 * eyeO, dirt: 0.8, mess: 1, sweat: 1, cold: 0.5, tremble: 1 + 2 * eyeO }), `translate(540 1060) scale(${H.lerp(1.7, 2.1, k(lt, 0, 2.2)).toFixed(3)})`));
    s += vignette(Pf, 1);
    return s;
  });

  /* 67. Eles trouxeram o homem */
  add(seg(105), 0.05, (t, lt, Pf) => {
    const dur = S[105].end - seg(105), u = E_.inOutCubic(k(lt, 0.0, dur)), tT = tw('trouxeram', 0, 172.6), hit = k(t, tT, tT + 0.15);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#000');
    let w = campWorld(Pf, t, { k: 2, fire: 1, woman: false, wx: 380, fx: 760 });
    w += G(womanSit({ t, scale: 1.1, rim: 1, scared: 1, look: 0 }), 'translate(380 1340)');
    // homem: surge atrás, alto, entre as árvores, na luz da fogueira
    const mk = E_.outCubic(k(lt, 0.0, 0.9));
    w += G(X(Pf, manSil({ eyes: 1, rim: 0.7, col: '#010102', sway: 0 })), `translate(${f1(H.lerp(140, 220, mk))} 1300) scale(${H.lerp(0.9, 1.35, u + 0 * mk).toFixed(3)})`, OP(mk));
    w += P('M0,1340 L1080,1340 L1080,1920 L0,1920Z', 'rgba(0,0,0,0)', '');
    s += camG(t, 520, 1150, H.lerp(1.05, 1.55, u), 0, 2 + 10 * Math.exp(-(t - tT) * 5) * hit, w);
    s += flash('#fff', 0.35 * Math.exp(-(t - tT) * 12) * (t >= tT ? 1 : 0)) + flash(PAL.red, 0.12 * hit) + vignette(Pf, 1) + grain(t, 0.06);
    return s;
  });
}
