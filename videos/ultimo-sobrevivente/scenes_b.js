/* scenes_b.js - ~48 a 85 s: apagão, suprimentos, silêncio, rádio, VIVO, um ano, desligar o rádio. */
function bottle(x, y, s, col = '#9fd8ff') { return G(R(-14, -70, 28, 70, col, 'rx="10" opacity="0.85"') + R(-8, -88, 16, 20, '#fff', 'rx="4"') + R(-14, -40, 28, 18, '#2f7fc6', 'rx="3"'), `translate(${f1(x)} ${f1(y)}) scale(${s})`); }
function canObj(x, y, s, col = '#c9553f') { return G(R(-24, -60, 48, 60, col, 'rx="6"') + R(-24, -46, 48, 14, '#f0e6c8') + E(0, -60, 24, 6, '#cfd4d6') + E(0, 0, 24, 6, mixc(col, '#000', 0.3)), `translate(${f1(x)} ${f1(y)}) scale(${s})`); }
function jerry(x, y, s) { return G(P('M-60,0 L-60,-130 L-30,-170 L30,-170 L60,-130 L60,0Z', '#d4463c') + R(-20, -200, 40, 34, '#9b2f28', 'rx="6"') + R(-46, -100, 92, 14, '#7a221d') + R(-30, -70, 60, 40, 'rgba(255,255,255,0.25)', 'rx="6"'), `translate(${f1(x)} ${f1(y)}) scale(${s})`); }
function mannequin(o) {
  const d = Object.assign({ tilt: 0, scale: 1 }, o);
  let s = R(-90, -300, 180, 300, '#cfc6b6', 'rx="40"') + R(-18, -340, 36, 50, '#b8ae9c') + E(0, -400, 52, 66, '#d8cfbf') + P('M-36,-380 Q0,-330 36,-380', 'none', 'stroke="#a79d8a" stroke-width="4" opacity="0.6"');
  s += PL([[-90, -270], [-150, -150], [-130, -60]], '#cfc6b6', 34) + PL([[90, -270], [150, -150], [130, -60]], '#cfc6b6', 34);
  return G(G(s, `rotate(${d.tilt} 0 -340)`), T(0, 0, 0, d.scale));
}
function photoFrame(x, y, w, h, who, rot = 0, a = 1) {
  const cols = ['#d9a23a', '#7aa8c9', '#c97a9a', '#8bbf7a'];
  return G(R(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, '#4a3a2e', 'rx="6"') + R(-w / 2, -h / 2, w, h, '#cfd6d4') + C(0, -h * 0.12, w * 0.2, cols[who % 4]) + E(0, h * 0.3, w * 0.34, h * 0.26, cols[who % 4]), `translate(${f1(x)} ${f1(y)}) rotate(${rot})`, OP(a));
}
function staticFx(t, a = 0.5) {
  let s = '';
  for (let i = 0; i < 70; i++) { const y = hz(i, Math.floor(t * 30)) * 1920, x = hz(i + 70, Math.floor(t * 30)) * 700, w = 60 + 380 * hz(i + 20, Math.floor(t * 30)); s += R(x, y, w, 4 + 14 * hz(i + 3, Math.floor(t * 30)), '#fff', OP(a * hz(i + 9, Math.floor(t * 30)))); }
  return s;
}
function letterVIVO(a, progress, col = PAL.paint) {
  // letras grandes em traços; progress 0..1 revela V I V O
  const L_ = [
    k => PL([[0, 0], [60 * k, 190 * k], [120 * Math.min(1, k * 1.0), 0 + 190 * (1 - Math.min(1, k)) * 0]], col, 40),
  ];
  return '';
}
function vivoStrokes(p, col = PAL.paint, w = 56) {
  // V I V O desenhados como traços; cada letra ocupa 1/4 do progresso
  const part = (i) => cl(p * 4 - i);
  let s = '';
  const V = (x, k) => { if (k <= 0) return ''; const a = [x, 0], b = [x + 70, 220], c = [x + 140, 0]; const k1 = cl(k * 2), k2 = cl(k * 2 - 1); return PL([a, [a[0] + (b[0] - a[0]) * k1, a[1] + (b[1] - a[1]) * k1]], col, w) + (k2 > 0 ? PL([b, [b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2]], col, w) : ''); };
  s += V(0, part(0));
  if (part(1) > 0) s += L(230, 0, 230, 220 * part(1), col, w);
  s += V(310, part(2));
  if (part(3) > 0) s += `<ellipse cx="590" cy="110" rx="70" ry="110" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="${f1(520 * part(3))} 600" transform="rotate(-90 590 110)"/>`;
  return s;
}

function partB(c) {
  const { add, tw, k, E_, S } = c;
  const sg = i => S[i].start, en = i => S[i].end;

  /* 34. usinas sem funcionários */
  add(sg(34), 0.03, (t, lt, Pf) => {
    const dur = sg(35) - sg(34), dead = E_.inOutQuad(k(lt, 0.1, dur));
    let s = defsC(Pf) + skyline(Pf, t, { k: 0.3, y: 1500, layers: 0 }) + R(-100, 1500, 1300, 500, '#2a3438');
    for (const [x, w] of [[180, 220], [600, 260]]) s += P(`M${x},1500 L${x + 40},700 L${x + w - 40},700 L${x + w},1500Z`, '#46555b') + R(x + 30, 680, w - 60, 28, '#2e3a3f');
    for (let i = 0; i < 8; i++) { const ph = ((t * 0.18 + i / 8) % 1); s += E(300 + 20 * Math.sin(ph * 5) + ph * 120, 690 - ph * 520, 60 + ph * 120, 40 + ph * 70, 'rgba(210,220,220,0.5)', OP((1 - ph) * (1 - dead))); s += E(730 + 20 * Math.sin(ph * 5 + 1) + ph * 140, 690 - ph * 520, 60 + ph * 120, 40 + ph * 70, 'rgba(210,220,220,0.5)', OP((1 - ph) * (1 - dead))); }
    s += R(380, 1280, 220, 220, '#1e282c') + R(400, 1300, 180, 110, mixc('#ffd98a', '#111a1f', dead));
    s += G(R(-60, -100, 120, 100, '#2e3a3f') + R(-10, -250, 20, 150, '#2e3a3f') + C(0, -270, 26, '#2e3a3f'), 'translate(120 1500)');
    s += R(0, 0, 1080, 1920, '#000', OP(0.35 * dead)) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.1 * lt, 0, 2, s);
  });

  /* 35. a eletricidade começa a falhar: lâmpada piscando + faíscas */
  add(sg(35), 0.02, (t, lt, Pf) => {
    const dur = sg(36) - sg(35), fl = Math.sin(t * 31) * Math.sin(t * 13) > 0.1 ? 1 : 0.1, on = lt < dur - 0.4 ? fl : 0.0;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05080c') + glow(Pf, 'A', 540, 760, 760 * (0.4 + 0.6 * on), 0.8 * on);
    s += L(540, 0, 540, 600, '#222', 8) + R(510, 590, 60, 50, '#2e353a', 'rx="6"') + E(540, 700, 70, 80, on > 0.5 ? '#fff2b0' : '#4a4f52');
    for (let i = 0; i < 7; i++) { const a = hz(i, Math.floor(t * 20)) * 6.28; if (on > 0.5) s += L(540 + Math.cos(a) * 90, 700 + Math.sin(a) * 90, 540 + Math.cos(a) * (140 + 100 * hz(i, 3)), 700 + Math.sin(a) * (140 + 100 * hz(i, 3)), '#bfe6ff', 4); }
    s += R(0, 0, 1080, 1920, '#000', OP(1 - 0.0)) .replace('opacity="1.000"', `opacity="${(0.55 * (1 - on)).toFixed(2)}"`) + vignette(Pf, 1) + flash('#fff', 0.15 * (on > 0.5 ? 1 : 0));
    return camG(t, 540, 760, 1.1 + 0.2 * lt, 0, 3 * (1 - on) + 1, s);
  });

  /* 36-37. bairros apagaram: onda de apagão na skyline */
  add(sg(36), 0.02, (t, lt, Pf) => {
    const dur = sg(38) - sg(36), wv = E_.inOutQuad(k(lt, 0.2, dur - 0.1)) * 1500 - 200;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#05080e') + skyline(Pf, t, { k: 2, y: 1300, lights: 0.8, layers: 2, px: 0, flick: 1 });
    s += `<g>` + R(0, 0, wv, 1920, '#02040a', OP(0.93)) + R(wv - 160, 0, 160, 1920, '#02040a', OP(0.5)) + `</g>` + R(wv - 6, 0, 12, 1920, '#bfe6ff', OP(0.5));
    s += vignette(Pf, 1) + flash('#fff', 0.08 * Math.exp(-lt * 6));
    return camG(t, 540, 960, 1.1, 0, 2, s);
  });

  /* 38. cidades inteiras: mapa de luzes apagando */
  add(sg(38), 0.03, (t, lt, Pf) => {
    const dur = sg(39) - sg(38), wv = E_.inOutQuad(k(lt, 0.0, dur - 0.1));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#02050a');
    for (let i = 0; i < 420; i++) { const x = 40 + hz(i, 3) * 1000, y = 200 + hz(i, 4) * 1500, d = Math.hypot(x - 540, y - 960) / 700 * 0.7 + hz(i, 5) * 0.3; const on = d > wv ? 1 : 0; if (on) s += C(x, y, 2 + 3 * hz(i, 6), '#ffd98a', OP(0.5 + 0.5 * hz(i, 7))); }
    for (let i = 0; i < 6; i++) { const a = hz(i, 90) * 6.28, r = 200 + 260 * hz(i, 91), x = 540 + Math.cos(a) * r, y = 960 + Math.sin(a) * r; if (wv < 0.1 + hz(i, 92) * 0.8) s += glow(Pf, 'A', x, y, 90 + 40 * hz(i, 93), 0.35); }
    s += C(540, 960, 400 * wv + 10, 'none', 'stroke="rgba(255,60,60,0.6)" stroke-width="6"', OP(1)) + vignette(Pf, 1);
    return camG(t, 540, 960, H.lerp(1.4, 0.9, wv), 0, 1, s);
  });

  /* 39. reunir água */
  add(sg(39), 0.02, (t, lt, Pf) => {
    const sh = lt;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10181a') + POLY([[0, 400], [300, 700], [300, 1500], [0, 1920]], '#1d2a2c') + POLY([[1080, 400], [780, 700], [780, 1500], [1080, 1920]], '#1d2a2c');
    for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++) { s += bottle(60 + q * 46, 780 + r * 160, 1.4); s += bottle(1000 - q * 46, 780 + r * 160, 1.4); }
    s += R(300, 700, 480, 800, '#0a1012') + R(0, 1500, 1080, 420, '#26343a') + POLY([[540, 1500], [380, 1920], [700, 1920]], 'rgba(255,255,255,0.06)');
    const n = Math.min(6, Math.floor(lt * 5));
    s += G(arthurFig({ back: true, scale: 1.45, arms: [30, 90, -30, -90], walk: t * 1.6, bag: 1 }), 'translate(540 1900)');
    for (let i = 0; i < n; i++) s += bottle(440 + i * 38, 1300 - 10 * (i % 2), 1.6);
    s += `<g transform="rotate(${f1(Math.sin(t * 3) * 3)} 540 1700)">` + POLY([[540, 1680], [220, 760], [860, 760]], 'rgba(255,245,200,0.12)') + '</g>' + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.05, 0, 2, s);
  });

  /* 40. comida: latas varridas para a cesta */
  add(sg(40), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#14191a') + R(0, 1100, 1080, 100, '#4a5a60') + R(0, 1200, 1080, 720, '#222c2f');
    for (let q = 0; q < 8; q++) for (let r = 0; r < 3; r++) { const gone = (q * 3 + r) / 24 < lt * 1.4 + 0.05; if (!gone) s += canObj(90 + q * 120, 1100 - r * 70, 1.2, ['#c9553f', '#d9a23a', '#6fa25a'][(q + r) % 3]); }
    s += G(R(-200, -10, 400, 220, '#3a4a50', 'rx="20"') + R(-200, -10, 400, 20, '#5d7078', 'rx="8"'), 'translate(540 1600)');
    for (let i = 0; i < 6; i++) { const ph = (lt * 1.4 + i * 0.1) % 1; s += canObj(H.lerp(150 + i * 140, 540, ph), H.lerp(1000, 1560, ph * ph), 1.2, ['#c9553f', '#d9a23a', '#6fa25a'][i % 3]); }
    s += handObj(H.lerp(900, 200, (lt * 2) % 1), 1000, -50, 1.5) + speedLines(t, 6, 'rgba(255,255,255,0.2)') + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0, 0, 3, s);
  });

  /* 41a. remédios */
  add(sg(41), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#e8efec') + R(0, 1180, 1080, 740, '#c3d3cc');
    s += R(0, 0, 1080, 1920, '#000', OP(0.15));
    s += G(R(-60, -170, 120, 170, '#f0a53a', 'rx="16"') + R(-66, -200, 132, 40, '#fff', 'rx="12"') + R(-40, -130, 80, 70, '#fff', 'rx="8"') + R(-8, -124, 16, 58, '#d4463c') + R(-34, -98, 68, 16, '#d4463c'), `translate(${f1(H.lerp(1300, 540, E_.outBack(k(lt, 0, 0.5))))} 1180) scale(2.8) rotate(${f1(-10 * (1 - k(lt, 0, 0.5)))})`);
    for (let i = 0; i < 7; i++) { const a = E_.outBounce(k(lt, 0.3 + i * 0.08, 0.9 + i * 0.08)); s += E(180 + i * 120, H.lerp(-100, 1620 + 20 * (i % 2), a), 36, 16, i % 2 ? '#fff' : '#ffd2cf', 'stroke="#c96" stroke-width="3"'); }
    s += vignette(Pf, 0.7);
    return camG(t, 540, 960, 1, 0, 3 * Math.exp(-lt * 4), s);
  });
  /* 41b. combustível */
  add(tw('combustível', 0, 56.7) - 0.1, 0.02, (t, lt, Pf) => {
    const dur = sg(42) - (tw('combustível', 0, 56.7) - 0.1), fill = k(lt, 0.2, dur);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0c1317') + R(0, 1500, 1080, 420, '#242d31') + glow(Pf, 'A', 540, 700, 800, 0.15);
    s += G(R(-110, -560, 220, 560, '#c9d2d4', 'rx="20"') + R(-90, -520, 180, 150, '#0e1a22', 'rx="10"') + TX(0, -420, fmtBig(Math.round(fill * 480)) , 52, PAL.sick) + R(110, -400, 100, 30, '#8a949a') + PL([[210, -385], [330, -250], [330, -80]], '#1a2024', 20), 'translate(300 1500)');
    s += jerry(740, 1500, 2.2) + R(700, 1500 - 380 * fill, 80, 380 * fill, 'rgba(255,214,120,0.55)') + vignette(Pf, 1);
    return camG(t, 540, 1100, 1.0 + 0.08 * lt, 0, 2, s);
  });

  /* 42. inimigo sem reserva: barricada de suprimentos e névoa escura que cresce */
  add(sg(42), 0.03, (t, lt, Pf) => {
    const dur = sg(43) - sg(42), fg = E_.inOutQuad(k(lt, 0.8, dur));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10181c') + R(0, 1400, 1080, 520, '#1d262a');
    for (let i = 0; i < 10; i++) s += R(60 + i * 100, 1380 - (i % 3) * 70, 90, 70 + (i % 3) * 70, '#6d5a42') + R(60 + i * 100, 1380 - (i % 3) * 70, 90, 14, '#8a7557');
    for (let i = 0; i < 5; i++) { s += jerry(130 + i * 200, 1380 + 10 * (i % 2), 1.1) ; s += bottle(80 + i * 220, 1380, 1.7); s += canObj(180 + i * 190, 1380, 1.6); }
    s += G(arthurFig({ scale: 1.3, scared: 0.6, arms: [20, 60, -20, -60], beard: 0.45, flip: 1 }), 'translate(540 1500)');
    for (let i = 0; i < 12; i++) { const a = hz(i, 3) * 6.28, r = 1400 - 900 * fg + 80 * Math.sin(t * 1.5 + i), x = 540 + Math.cos(a) * r, y = 960 + Math.sin(a) * r * 1.2; s += glow(Pf, 'W', x, y, 420, 0).replace('fill="url(#' + Pf + 'glowW)"', 'fill="#000"').replace('opacity="0.000"', `opacity="${(0.9 * fg).toFixed(2)}"`); }
    s += R(0, 0, 1080, 1920, '#000', OP(0.4 * fg)) + vignette(Pf, 1);
    return camG(t, 540, 1100, H.lerp(1.0, 1.25, fg), 0, 1 + 2 * fg, s);
  });

  /* 43. o silêncio: linha reta de som */
  add(sg(43), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#02040a');
    let pts = []; for (let i = 0; i <= 60; i++) pts.push([i * 18, 960 + Math.sin(i * 0.9 + t * 20) * 220 * Math.max(0, 1 - lt * 3) * Math.exp(-Math.pow((i - 30) / 18, 2))]);
    s += PL(pts, '#ff4a4a', 10, `opacity="${0.9}"`) + glow(Pf, 'R', 540, 960, 700, 0.15) + vignette(Pf, 1);
    return s;
  });

  /* 44. conversa com fotografias */
  add(sg(44), 0.03, (t, lt, Pf) => {
    const dur = sg(45) - sg(44);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#16181b') + R(0, 1450, 1080, 470, '#221c18') + glow(Pf, 'A', 540, 700, 800, 0.2);
    for (let i = 0; i < 6; i++) s += photoFrame(190 + (i % 3) * 350, 420 + Math.floor(i / 3) * 420, 200, 250, i, (i % 2 ? 4 : -3) + Math.sin(t * 1.2 + i), 1);
    s += G(arthurFig({ back: true, scale: 1.6, arms: [10, 20, 90, 60], beard: 0.5, bag: 0, walk: 0 }), 'translate(540 1950)');
    const sp = ((lt * 1.6) % 1); s += G(E(0, 0, 130, 66, 'rgba(255,255,255,0.9)') + P('M-30,50 L-60,100 L10,60Z', 'rgba(255,255,255,0.9)') + C(-50, 0, 8, '#222') + C(0, 0, 8, '#222') + C(50, 0, 8, '#222'), `translate(${f1(700 + 20 * Math.sin(lt * 4))} ${f1(1100 - 30 * sp)})`, OP(1 - sp * 0.5));
    s += vignette(Pf, 1) + grain(t, 0.04);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 1.2, s);
  });

  /* 45-46. manequim */
  add(sg(45), 0.03, (t, lt, Pf) => {
    const dur = sg(47) - sg(45), tl = Math.sin(lt * 1.3) * 5;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#17191c') + R(0, 1500, 1080, 420, '#241d18') + glow(Pf, 'A', 740, 700, 700, 0.25);
    s += R(300, 1250, 480, 28, '#6d5440') + R(520, 1278, 40, 240, '#5a4533') + G(R(-60, -50, 120, 50, '#cfd6d4', 'rx="10"') + E(0, -52, 60, 12, '#e8eeee'), 'translate(400 1250)') + G(R(-60, -50, 120, 50, '#cfd6d4', 'rx="10"') + E(0, -52, 60, 12, '#e8eeee'), 'translate(680 1250)');
    s += G(mannequin({ tilt: tl }), 'translate(800 1500) scale(1.5)') + G(arthurFig({ scale: 1.5, scared: 0, arms: [-30, -20, 50, 90], beard: 0.5, flip: 1, mouth: Math.abs(Math.sin(lt * 9)) * 0.5 }), 'translate(260 1500)');
    s += vignette(Pf, 1) + grain(t, 0.05);
    return camG(t, 540, 1000, 1.0 + 0.12 * lt, 0, 1.2, s);
  });

  /* 47. responde às próprias perguntas: dois Arthurs */
  add(sg(47), 0.03, (t, lt, Pf) => {
    const turn = Math.floor(lt * 3.4) % 2;
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#14110f') + glow(Pf, 'A', 540, 960, 900, 0.12);
    for (const [i, x] of [[0, 280], [1, 800]]) {
      const talk = turn === i ? Math.abs(Math.sin(lt * 16)) * 0.6 : 0;
      s += faceAt(Pf + 'f' + i, { t, eye: 1, pupil: 0.55, lookx: i ? -14 : 14, worry: 0.7, mouth: talk, mess: 1, beard: 0.6, dark: 0.9, tilt: i ? 4 : -4 }, x, 1050, 0.82).replace(/WEYE/g, Pf + 'weye');
      s += G(E(0, 0, 110, 60, 'rgba(255,255,255,0.9)') + C(-40, 0, 8, '#222') + C(0, 0, 8, '#222') + C(40, 0, 8, '#222'), `translate(${x} 560)`, OP(turn === i ? 1 : 0.18));
    }
    s += vignette(Pf, 1) + R(0, 0, 1080, 1920, '#ff3b3b', OP(0.04 * (Math.sin(t * 8) > 0.6 ? 1 : 0)));
    return camG(t, 540, 960, 1 + 0.1 * lt, 0, 2, s);
  });

  /* 48. para não enlouquecer: mãos na cabeça, espiral */
  add(sg(48), 0.03, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0c0a0d');
    for (let i = 0; i < 40; i++) { const a = i * 0.5 + t * 3, r = 20 + i * 18; s += C(540 + Math.cos(a) * r, 800 + Math.sin(a) * r, 8, '#c9a0ff', OP(0.15 + 0.4 * (1 - i / 40))); }
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.4, lookx: 14 * Math.sin(t * 6), worry: 1, mouth: 0.5, sweat: 1, tremble: 3, mess: 1, beard: 0.6, dark: 1, tilt: 6 * Math.sin(t * 5) }, 540, 1040, 1.9));
    s += handObj(180, 1000, 25, 1.4) + handObj(900, 1000, -25, 1.4) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 3, s);
  });

  /* 49. criou um ritual: relógio no meio-dia */
  add(sg(49), 0.02, (t, lt, Pf) => {
    const a = E_.outBack(k(lt, 0, 0.35));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0d1518') + glow(Pf, 'A', 540, 800, 900, 0.3);
    s += G(clockFace(Pf, { h: 12, m: 0, col: '#ffe9a8', face: '#14212a', glow: 0.5, scale: 3.1 * a }), 'translate(540 800)') + checkMark(540, 1450, 120 * E_.outBack(k(lt, 0.3, 0.7)), 1, '#6dff9a', 34) + vignette(Pf, 1);
    return s;
  });

  /* 50-51. meio-dia, rádio: sol a pino e rádio no terraço */
  add(sg(50), 0.03, (t, lt, Pf) => {
    const dur = sg(52) - sg(50);
    let s = defsC(Pf) + skyline(Pf, t, { k: 0, y: 1250, layers: 2, px: lt * 20 }) + glow(Pf, 'A', 540, 160, 520, 0.6) + C(540, 160, 80, '#fff6cf') + R(-100, 1250, 1300, 700, '#4a5256');
    s += G(R(-200, -10, 400, 20, '#2e3a3f') + R(-170, 10, 20, 160, '#2e3a3f') + R(150, 10, 20, 160, '#2e3a3f'), 'translate(540 1460)') + G(radioObj({ on: 1, t, led: Math.sin(t * 6) > 0 ? 1 : 0.3 }), 'translate(540 1330) scale(1.3)');
    s += G(arthurFig({ back: true, scale: 1.2, arms: [10, 10, 100, 100], beard: 0.5 }), 'translate(240 1850)');
    s += radioWaves(730, 1090, t, sg(50), 3, 700, 'rgba(255,230,160,0.6)', 0.9, 8, 3.14, -1.57) + vignette(Pf, 0.7);
    return camG(t, 540, 1000, 1.0 + 0.08 * lt, 0, 1, s);
  });

  /* 52. Meu nome é Arthur: close no microfone */
  add(sg(52), 0.03, (t, lt, Pf) => {
    const tk = Math.abs(Math.sin(lt * 13));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0f1417') + glow(Pf, 'A', 540, 900, 900, 0.25);
    s += camG(t, 540, 960, 1, 0, 0, faceAt(Pf, { t, eye: 1, pupil: 0.8, worry: 0.5, mouth: 0.35 * tk, mess: 1, beard: 0.65, dark: 0.8, tilt: 2 * Math.sin(lt * 3) }, 540, 980, 1.8));
    s += G(R(-14, 0, 28, 480, '#222a2e') + E(0, 0, 80, 110, '#1c2226', 'stroke="#59666b" stroke-width="8"') + L(-60, -40, 60, -40, '#59666b', 4) + L(-60, 0, 60, 0, '#59666b', 4) + L(-60, 40, 60, 40, '#59666b', 4), 'translate(540 1380) scale(1.3)') + radioWaves(540, 1380, t, sg(52), 3, 380, 'rgba(255,230,160,0.55)', 0.9, 6, 3.14, -1.57) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 1, s);
  });

  /* 53. Estou vivo: braços abertos, ondas */
  add(sg(53), 0.03, (t, lt, Pf) => {
    let s = defsC(Pf) + skyline(Pf, t, { k: 0.1, y: 1300, layers: 2, px: 0 }) + R(-100, 1300, 1300, 700, '#4a5256');
    s += radioWaves(540, 1100, t, sg(53), 4, 1000, 'rgba(255,255,255,0.45)', 1, 10) + G(arthurFig({ scale: 1.2, arms: [100, 140, -100, -140], beard: 0.5, scared: 0, mouth: 0.5 }), 'translate(540 1700)') + vignette(Pf, 0.8);
    return camG(t, 540, 1100, 1.0 + 0.1 * lt, 0, 2, s);
  });

  /* 54. Alguém consegue me ouvir? ondas viajam pela cidade e se apagam */
  add(sg(54), 0.03, (t, lt, Pf) => {
    const dur = sg(55) - sg(54);
    let s = defsC(Pf) + skyline(Pf, t, { k: 0.15, y: 1350, layers: 2, px: 0 }) + R(-100, 1350, 1300, 700, '#444c50');
    for (let i = 0; i < 4; i++) { const ph = E_.outQuad(((lt * 0.9 + i / 4) % 1)); s += C(540, 1000, 40 + ph * 1100, 'none', `stroke="rgba(255,255,255,${(0.5 * (1 - ph)).toFixed(2)})" stroke-width="${f1(8 * (1 - ph) + 1)}"`); }
    s += G(arthurFig({ back: true, scale: 0.7, arms: [10, 10, 10, 10], beard: 0.5 }), 'translate(540 1700)') + R(0, 0, 1080, 1920, '#000', OP(0.18 * k(lt, 0.4, 1))) + vignette(Pf, 1);
    return camG(t, 540, 1000, H.lerp(1.1, 0.85, lt / dur), 0, 0.5, s);
  });

  /* 55. No terraço: subindo a escada e abrindo a porta com tinta */
  add(sg(55), 0.02, (t, lt, Pf) => {
    const op = E_.outCubic(k(lt, 0.0, 0.5));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#10181d') + glow(Pf, 'B', 540, 800, 900 * op, 0.5 * op);
    s += R(300, 400, 480, 1000, `rgba(200,225,255,${(0.6 * op).toFixed(2)})`) + R(300, 400, 480 * (1 - op), 1000, '#2a3036') + R(200, 1380, 680, 520, '#1c2429');
    s += G(R(-60, -120, 120, 120, '#d4463c', 'rx="10"') + E(0, -122, 60, 14, '#f4f0e0') + R(-80, -126, 160, 8, '#9a2f27'), 'translate(300 1560) scale(1.6)') + G(arthurFig({ back: true, scale: 1.4, arms: [20, 40, -60, -20] }), 'translate(640 1860)') + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0 + 0.1 * lt, 0, 1, s);
  });

  /* 56. pintou VIVO (visão de cima) */
  add(sg(56), 0.03, (t, lt, Pf) => {
    const dur = sg(57) - sg(56), p = E_.inOutQuad(k(lt, 0.1, dur - 0.1));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#2a3236');
    for (let i = 0; i < 14; i++) s += R(0, i * 140, 1080, 4, 'rgba(0,0,0,0.25)') + R(i * 80, 0, 3, 1920, 'rgba(0,0,0,0.15)');
    s += G(vivoStrokes(p), 'translate(160 840) scale(1.0)');
    const rx = 160 + 130 * (p * 4 % 1) + Math.floor(p * 4) * 230, ry = 940;
    s += G(R(-60, -14, 120, 28, '#d4463c', 'rx="10"') + R(-6, 14, 12, 140, '#555'), `translate(${f1(rx)} ${f1(ry + 60)}) rotate(20)`);
    s += vignette(Pf, 0.6);
    return camG(t, 540, 960, H.lerp(1.0, 1.1, p), 0, 1, s);
  });

  /* 57. VIVO enorme visto de cima (drone) */
  add(sg(57), 0.02, (t, lt, Pf) => {
    const z = H.lerp(1.6, 0.7, E_.outCubic(k(lt, 0, 1.4)));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#252d31') + glow(Pf, 'A', 540, 960, 800, 0.25);
    s += G(vivoStrokes(1, PAL.paint, 56), 'translate(160 840)') + G(vivoStrokes(1, 'rgba(255,255,255,0.35)', 12), 'translate(160 840)');
    s += flash('#fff', 0.5 * Math.exp(-lt * 10)) + vignette(Pf, 0.8);
    return camG(t, 540, 960, z, 0, 3 * Math.exp(-lt * 4), s);
  });

  /* 58-60. cem, duzentos, um ano: contagem com céu em ciclo e barba crescendo */
  const dayScene = (i, from, to, beard, label) => add(sg(i), 0.02, (t, lt, Pf) => {
    const dur = (i === 60 ? sg(61) : sg(i + 1)) - sg(i), u = k(lt, 0, dur), n = Math.round(H.lerp(from, to, E_.outCubic(u)));
    const cyc = (t * 1.3) % 2, kk = cyc < 1 ? H.lerp(0.0, 1.2, cyc) : H.lerp(2.0, 0.0, cyc - 1);
    let s = defsC(Pf) + skyline(Pf, t, { k: Math.min(2, kk * 1.7), y: 1250, layers: 2, moon: kk > 1.2 ? 1 : 0 }) + R(-100, 1250, 1300, 700, '#3a4246');
    s += G(arthurFig({ back: true, scale: 1.05, arms: [8, 8, -8, -8], beard }), 'translate(540 1800)');
    s += TX(540, 560, String(n), 360, '#fff', `opacity="0.92"`) + TX(540, 660, 'dias', 70, '#cfe0ea', 'font-weight="600" opacity="0.8"');
    s += vignette(Pf, 0.9);
    return camG(t, 540, 1000, 1.0 + 0.06 * lt, 0, 1.2, s);
  });
  dayScene(58, 1, 100, 0.55); dayScene(59, 100, 200, 0.75); dayScene(60, 200, 365, 1.0);

  /* 61. Nenhuma resposta: rádio só com chiado */
  add(sg(61), 0.02, (t, lt, Pf) => {
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06080a') + staticFx(t, 0.5);
    s += G(radioObj({ on: 1, t, led: 1 }), 'translate(540 1000) scale(2.2)') + R(0, 0, 1080, 1920, '#000', OP(0.35)) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.06 * lt, 0, 3, s);
  });

  /* 62. Na última noite: noite chegando, Arthur abatido de costas */
  add(sg(62), 0.03, (t, lt, Pf) => {
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 1, win: 0, px: lt * 20 });
    s += G(arthurFig({ back: true, scale: 1.25, arms: [6, 6, -6, -6], beard: 1.0, headTilt: 6 }), 'translate(540 1850)') + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.06 * lt, 0, 0.8, s);
  });

  /* 63. desligou o rádio definitivamente */
  add(sg(63), 0.03, (t, lt, Pf) => {
    const dur = sg(64) - sg(63), off = E_.outCubic(k(lt, 0.7, 1.2));
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#06090b') + glow(Pf, 'R', 540, 1000, 700, 0.25 * (1 - off));
    s += staticFx(t, 0.4 * (1 - off)) + G(radioObj({ on: 1 - off > 0.5 ? 1 : 0, t, led: 1 - off }), 'translate(540 1000) scale(2.3)');
    s += handObj(H.lerp(1250, 720, E_.outCubic(k(lt, 0.0, 0.6))), H.lerp(1500, 940, E_.outCubic(k(lt, 0.0, 0.6))), 20, 1.5);
    s += R(0, 0, 1080, 1920, '#000', OP(0.5 * off)) + vignette(Pf, 1);
    return camG(t, 540, 1000, 1.0 + 0.12 * lt, 0, 2 * (1 - off), s);
  });

  /* 64. subiu ao terraço (de costas, escada) */
  add(sg(64), 0.03, (t, lt, Pf) => {
    const dur = sg(65) - sg(64), u = k(lt, 0, dur);
    let s = defsC(Pf) + R(0, 0, 1080, 1920, '#0a1015') + POLY([[0, 0], [380, 400], [380, 1500], [0, 1920]], '#141c22') + POLY([[1080, 0], [700, 400], [700, 1500], [1080, 1920]], '#141c22');
    for (let i = 0; i < 12; i++) { const y = 1500 - i * 95 + (u * 95 * 3) % 95; s += R(380 + i * 6, y, 320 - i * 12, 40, '#2a343b') + R(380 + i * 6, y + 40, 320 - i * 12, 14, '#1b2329'); }
    s += R(420, 340, 240, 250, `rgba(180,210,255,${(0.3 + 0.7 * u).toFixed(2)})`) + glow(Pf, 'B', 540, 460, 500 * u + 80, 0.5 * u);
    s += G(arthurFig({ back: true, walk: t * 1.1, scale: 1.1 - 0.35 * u, arms: [10 * Math.sin(t * 7), 10, -10 * Math.sin(t * 7), -10], beard: 1.0, bob: 6 * Math.abs(Math.sin(t * 7)) }), `translate(540 ${f1(1750 - 650 * u)})`) + vignette(Pf, 1);
    return camG(t, 540, 960, 1.0, 0, 1, s);
  });

  /* 65-66. última vez... cidade morta: panorama noturno */
  add(sg(65), 0.03, (t, lt, Pf) => {
    const dur = sg(67) - sg(65), u = E_.inOutQuad(k(lt, 0, dur));
    let s = defsC(Pf) + rooftopNight(Pf, t, { k: 2, moon: 1, win: 0, px: u * 60 });
    s += G(arthurFig({ back: true, scale: 1.1, arms: [6, 6, -6, -6], beard: 1.0 }), 'translate(300 1870)') + motes(t, 18, 1080, 1700, 6, 'rgba(210,230,255,0.35)', 3, 5) + vignette(Pf, 1);
    return camG(t, 540, 1000, H.lerp(1.05, 1.35, u), 0, 0.6, s);
  });
}
