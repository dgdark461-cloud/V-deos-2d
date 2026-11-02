function partX(c) {
  const { sh, SN } = MK(c), WD = c.WORDS, W = i => WD[i].start, END = c.S[c.S.length - 1].end;
  const q = (i0, i1, o, fn, pf) => { const s0 = W(i0), d = (i1 === null ? END : W(i1)) - s0; sh(s0, d, o, fn, pf); };
  const BGF = (Pf, col = '#3a3050') => BIG(col) + glow(Pf, 'A', 540, 900, 900, 0.28);
  const M = (t, o, x = 540, y = 1000, sc = 2.6) => FGX(t, Object.assign({ kind: 'mar' }, o), x, y, sc);
  const A = (t, o, x = 540, y = 1000, sc = 2.6) => FGX(t, Object.assign({ kind: 'aug' }, o), x, y, sc);
  const Pt = (t, o, x = 540, y = 1000, sc = 2.6) => FGX(t, Object.assign({ kind: 'por' }, o), x, y, sc);
  const W3 = (Pf, t, x, y) => ({ x, y });
  const FX = 390, FY = 940;
  const warm = (w) => w;
  /* ---------- abertura: o senhor de costas, pouca luz, olhando para a janela (sem revelar) ---------- */
  const DK2 = '#04030a';
  const DARK = (Pf) => BIG(DK2) + glow(Pf, 'A', 540, 960, 600, 0.05);
  q(0, 5, { z0: 1.0, z1: 1.35, shk: 1, gl: 0 }, (t, lt, Pf) => DARK(Pf) + EYESX(Pf, t, 540, 960, 2.2, { open: 0.55 * ez(lt / 0.4), dil: 0.2, glow: 1 }), 0);
  q(5, 7, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, shk: 2 }, (t, lt, Pf) => DARK(Pf) + EYESX(Pf, t, 540, 960, 2.2, { open: 0.7, dil: 0.9, look: 1.2, glow: 1 }), '#ffe9c0');
  q(7, 10, { z0: 1.0, z1: 1.15, shk: 3 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.5 }) + M(t, { eye: 1.1, lookx: -1, worry: 0.2, smile: 0 }, lp(1350, 560, ez(lt / 1.0)), 1000, 2.2), '#fff');
  q(10, 16, { z0: 1.15, z1: 1.0, shk: 3 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.5 + 0.4 * Math.sin(t * 9) }) + M(t, { eye: 1.1, lookx: -1 + 2 * ez(lt / 1.2), worry: 0.3, smile: 0 }, lp(560, -400, ez((lt - 0.2) / 1.6)), 1000, 2.2), 0);
  q(16, 19, { z0: 1.0, z1: 9.0, x0: 540, x1: 540, y0: 1000, y1: 814, shk: 3 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.5 }), 0);
  q(19, 22, { z0: 1.0, z1: 1.12, shk: 2 }, (t, lt, Pf) => BIG('#0a0810') + PEEPCIRC(Pf, t, 540, 960, 430, BIG(DK2) + EYESX(Pf, t, 540, 960, 1.35, { look: 0.5, dil: 0.9 }) + glow(Pf, 'A', 540, 960, 520, 0.12)), '#ffe9c0');
  q(22, 25, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, y0: 1000, y1: 1100, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.25, bl: 0 }) + BGX({ kind: 'mar', view: 'f', bag: 1, t, walk: 1, ph: lt * 8 }, 540 + 40 * lt, 1850, 1.0), 0);
  q(25, 30, { z0: 1.0, z1: 2.6, x0: 540, x1: FX, y0: 1000, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.3, bl: 0 }) + (lt > 1.2 ? G(EYESX(Pf, t, 0, 0, 0.2, { open: ez((lt - 1.2) / 0.3) }), `translate(${FX + 80} ${FY + 80})`) : ''), 0);
  q(30, 34, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.3 }) + NAMEP(540, 540, 1.0) + PEEPCIRC(Pf, t, 540, 1150 - 240 * 1.5, 40, BIG(DK2) + EYESX(Pf, t, 540, 790, 0.1, { dil: 1 })), '#fff');
  /* ---------- apresentação do mistério ---------- */
  q(34, 37, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + R(250, 1480, 600, 40, '#5a3a24', OP(0.9)) + DOORA(Pf, t, 540, 1150, 1.0, { strip: 0 }));
  q(37, 42, { z0: 1.0, z1: 1.3, x0: 700, x1: 560, shk: 1 }, (t, lt, Pf) => LOBBYA(Pf, t, {}) + G(R(-90, -70, 180, 140, '#c8a070', 'stroke="#5a3a24" stroke-width="8"') + TXT(0, 10, '302', 44, '#3a2418') + L(-90, -20, 90, -20, '#8a6a3a', 8), 'translate(250 1440)') + G(R(-80, -60, 160, 120, '#d8b080', 'stroke="#5a3a24" stroke-width="8"'), 'translate(440 1452)'));
  q(42, 46, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + Pt(t, { smile: 0.4, mouth: 0.3 * Math.abs(Math.sin(t * 8)) }), 0);
  q(46, 49, { z0: 1.0, z1: 1.2, x0: 540, x1: 540, shk: 1 }, (t, lt, Pf) => LOBBYA(Pf, t, {}) + BGX({ kind: 'por', view: 'f', t, armL: -20, armR: 20 }, 540, 1500, 1.2) + G(R(-120, -330, 240, 660, '#8fd0ff', OP(0.25)), 'translate(900 1200)'));
  q(49, 54, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: ez(lt / 2.4) * 0.6, bl: 0 }), '#ffe9c0');
  q(54, 58, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#3a3050') + WALLCLK(Pf, t, 540, 900, 3.0, 55 + 5 * ez(lt / 1.2), 8), '#ffe9c0');
  q(58, 63, { z0: 1.0, z1: 2.4, x0: 540, x1: FX, y0: 1000, y1: FY, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 0 }));
  q(63, 68, { z0: 2.4, z1: 2.4, x0: FX, x1: FX, y0: FY, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: BLINK3(lt) }) + SIGNAL(Pf, t, 540, 1650, 0.8, Math.min(3, Math.floor(lt / 0.6) + (BLINK3(lt) ? 1 : 0))), '#ffe9a0');
  q(68, 72, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { eye: 1, lookx: 1, looky: -0.5, worry: 0.3, smile: 0 }), 0);
  q(72, 77, { z0: 1.0, z1: 1.3, shk: 2 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + FUSE(Pf, t, 540, 960, 2.4, Math.sin(t * 6) > 0.7), '#ffe9a0');
  q(77, 83, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => BGF(Pf) + CAL(Pf, t, 540, 960, 1.7, 1 + Math.floor(lt / 0.8)), 0);
  q(83, 89, { z0: 1.0, z1: 1.2, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: BLINK3(lt - 0.2) }) + WALLCLK(Pf, t, 880, 1700, 0.9, 0, 9) + SIGNAL(Pf, t, 540, 1550, 0.9, 1 + Math.floor(lt / 0.7)), '#ffe9a0');
  q(89, 93, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { eye: 1.1, lookx: 0.8, looky: -0.8, smile: 0.2, up: 0.5 }, 540, 1000, 2.6), 0);
  q(93, 97, { z0: 1.0, z1: 1.4, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + WALLCLK(Pf, t, 540, 900, 3.2, 0, 9), '#ffe9c0');
  /* sala acende/apaga sincronizado com as palavras */
  q(97, 99, { z0: 2.4, z1: 2.4, x0: FX, x1: FX, y0: FY, y1: FY, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 0 }), 0);
  q(99, 100, { z0: 1.8, z1: 2.6, x0: FX, x1: FX, y0: FY, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 1 }), '#ffe9a0');
  q(100, 101, { z0: 2.6, z1: 1.3, x0: FX, x1: 540, y0: FY, y1: 1000, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 0 }), 0);
  q(101, 102, { z0: 1.0, z1: 1.8, x0: 540, x1: FX, y0: 1000, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 1 }), '#ffe9a0');
  q(102, 103, { z0: 2.6, z1: 2.6, x0: FX, x1: FX, y0: FY, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 0 }), 0);
  q(103, 107, { z0: 2.0, z1: 2.8, x0: FX, x1: FX, y0: FY, y1: FY, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: 1 }), '#ffe9a0');
  q(107, 111, { z0: 2.8, z1: 1.2, x0: FX, x1: 540, y0: FY, y1: 1000, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: Math.max(0, 1 - lt / 0.5) }), 0);
  /* ---------- porteiro ---------- */
  q(111, 115, { z0: 1.0, z1: 1.25, shk: 2 }, (t, lt, Pf) => LOBBYA(Pf, t, {}) + BGX({ kind: 'mar', view: 'b', t, walk: 1, ph: lt * 8 }, 260 + 140 * ez(lt / 1.5), 1750, 1.2) + BGX({ kind: 'por', view: 'f', t }, 720, 1500, 1.0));
  q(115, 119, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { smile: 0.2, mouth: 0.4 * Math.abs(Math.sin(t * 9)), up: 0.4 }), 0);
  q(119, 124, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + Pt(t, { smile: 0.2, eye: 0.9, looky: -0.5, worry: 0.2 }), 0);
  q(124, 131, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + Pt(t, { smile: 0.4, mouth: 0.5 * Math.abs(Math.sin(t * 8)) }), 0);
  q(131, 135, { z0: 1.0, z1: 1.6, x0: 540, x1: 540, y0: 1000, y1: 700, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.4, {}) + NAMEP(540, 540, 1.0), 0);
  q(135, 139, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + Pt(t, { smile: 0.5, eye: 0.8 }) + TXP('', 540, 1500, 10, 1), 0);
  q(139, 146, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { worry: 0.8, mouth: 0.3 * Math.abs(Math.sin(t * 8)), up: 0.6, tilt: -4 }), 0);
  q(146, 152, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + Pt(t, { smile: 0.9, eye: 0.85 }), 0);
  q(152, 157, { z0: 1.0, z1: 1.25, x0: 540, x1: 620, shk: 2 }, (t, lt, Pf) => LOBBYA(Pf, t, {}) + BGX({ kind: 'por', view: 'f', t, armR: -150 }, 540, 1500, 1.3));
  /* ---------- diante da porta ---------- */
  q(157, 163, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + WALLCLK(Pf, t, 540, 900, 3.0, 55, 8), '#ffe9c0');
  q(163, 170, { z0: 1.0, z1: 1.6, x0: 540, x1: 540, y0: 1100, y1: 1050, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + BGX({ kind: 'mar', view: 'b', t }, 540, 1750, 1.5));
  q(170, 173, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { worry: 0.4, smile: 0, lookx: 0.4 }), 0);
  q(173, 177, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + WALLCLK(Pf, t, 540, 900, 3.2, 0, 9), '#ffe9c0');
  q(177, 183, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, y0: 1400, y1: 1450, shk: 2 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: BLINK3(lt - 0.2) * 1 }), '#ffe9a0');
  q(183, 185, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { eye: 1.1, worry: 0.5, smile: 0, up: 0.3 }), 0);
  q(185, 187, { z0: 1.0, z1: 1.2, shk: 4 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.4, {}) + KNOCKR(lt, 540, 1000) + KNOCKR(lt - 0.2, 540, 1000), '#fff');
  q(187, 191, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { worry: 0.7, lookx: 0.3, smile: 0, trem: 0 }), 0);
  q(191, 194, { z0: 1.0, z1: 1.4, x0: 540, x1: 540, y0: 1400, y1: 1450, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.6, sil: 0.6 + 0.3 * Math.sin(t * 3) }), 0);
  q(194, 201, { z0: 1.0, z1: 1.5, x0: 540, x1: 540, y0: 1000, y1: 1050, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { open: 0.12 + 0.12 * ez(lt / 2.5) }), '#ffe9a0');
  q(201, 204, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { open: 0.3 + 0.2 * ez(lt / 0.8) }), 0);
  q(204, 207, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + A(t, { smile: 0.1, eye: 1.1, up: 0.5 }, 540, 1000, 2.6), '#ffe9c0');
  q(207, 212, { z0: 1.0, z1: 1.15, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + AUGX({ t, view: 'f' }, 540, 1720, 1.3), 0);
  q(212, 217, { z0: 1.0, z1: 1.35, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + A(t, { eye: 1.3, up: 0.8, worry: 0.2, smile: 0 }), 0);
  q(217, 224, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { worry: 0.7, smile: 0.1, blush: 1, mouth: 0.25 * Math.abs(Math.sin(t * 8)), tilt: -3 }), 0);
  q(224, 227, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.5, bl: BLINK3(lt) }) + C(FX, FY - 150, 40, 'none', 'stroke="#fff" stroke-width="0"'), '#ffe9a0');
  q(227, 231, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + A(t, { lookx: -1, looky: 0.1, smile: 0.5 + 0.3 * ez(lt / 1.5) }), 0);
  q(231, 234, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => SALAA(Pf, t, { lamp: 1, dark: 0.05, warm: 0.5 }), '#ffe9c0');
  /* ---------- flashback sépia ---------- */
  q(234, 240, { z0: 1.0, z1: 1.3, x0: 540, x1: 540, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.8 }) + SEP, '#ffe9c0');
  q(240, 247, { z0: 1.0, z1: 1.25, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.8 }) + BGX({ kind: 'mar', view: 'f', t, walk: 1, ph: lt * 7, kp: WIFEKP }, 100 + 200 * lt / 6, 1750, 1.2) + SEP);
  q(247, 255, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.8 }) + WALLCLK(Pf, t, 880, 420, 0.7, 0, 9) + BGX({ kind: 'mar', view: 'f', bag: 1, t, walk: 1, ph: lt * 7, kp: WIFEKP }, 700 - 260 * lt / 7, 1750, 1.2) + SEP);
  q(255, 258, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.6 }) + BGX({ kind: 'mar', view: 'f', t, kp: WIFEKP, lean: 3 }, 540, 1750, 1.3) + SEP + R(-400, -400, 1880, 2720, '#2a2438', OP(0.2)));
  q(258, 263, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.8 }) + BGX({ kind: 'mar', view: 'f', bag: 0, t, kp: WIFEKP, armR: -160 + 25 * Math.sin(t * 9) }, 540, 1750, 1.3) + SEP);
  q(263, 270, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.8, bl: BLINK3(lt - 0.3), over: BGX({ kind: 'mar', view: 'f', t, kp: WIFEKP, armR: -160 + 25 * Math.sin(t * 9) }, 800, 1900, 0.9) }) + SEP, '#ffe9a0');
  /* sinal dos dois */
  q(270, 275, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + WINX(Pf, t, 540, 700, 2.4, BLINK3(lt)) + BGX({ kind: 'mar', view: 'f', t, kp: WIFEKP, armR: -160 + 25 * Math.sin(t * 9) }, 540, 1900, 1.1), '#ffe9a0');
  q(275, 278, { z0: 1.0, z1: 1.4, shk: 2 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + SIGNAL(Pf, t, 540, 960, 1.9, Math.min(3, 1 + Math.floor(lt / 0.5))), '#ffe9a0');
  q(278, 280, { z0: 1.0, z1: 1.5, shk: 2 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + glow(Pf, 'A', 540, 960, 700, 0.9) + WINX(Pf, t, 540, 960, 2.6, 1), '#fff');
  /* esposa falecida */
  q(280, 285, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => STREETA(Pf, t, { warm: 0.5 }) + BGX({ kind: 'mar', view: 'f', t, kp: WIFEKP, armR: -150 }, 540, 1750, 1.3) + R(-400, -400, 1880, 2720, '#2a2438', OP(0.6 * ez(lt / 3))) + SEP);
  q(285, 292, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => SALAA(Pf, t, { lamp: BLINK3(lt - 0.3), dark: 0.1, warm: 0.5 }) + SWITCH(Pf, t, 300, 1000, 1.5, BLINK3(lt - 0.3)), '#ffe9a0');
  q(292, 300, { z0: 1.0, z1: 1.25, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + A(t, { smile: 0.5, eye: 0.8, tilt: 4, lookx: Math.sin(t * 1.5) * 0.4 }), 0);
  q(300, 307, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => SALAA(Pf, t, { lamp: 1, dark: 0.05, warm: 0.6 }) + SWITCH(Pf, t, 300, 1000, 1.4, 1) + PHOTOF(Pf, t, 800, 760, 0.8, 4), '#ffe9c0');
  q(307, 311, { z0: 1.0, z1: 1.3, x0: 470, x1: 400, y0: 1000, y1: 900, shk: 0.5 }, (t, lt, Pf) => SALAA(Pf, t, { dark: 0.05, warm: 0.9 }) + AUGX({ t, view: 'b', hide: 1 }, 520, 1700, 1.2), '#ffe9c0');
  q(311, 315, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + PHOTOF(Pf, t, 400, 800, 1.2, -6) + PHOTOF(Pf, t, 700, 1100, 1.0, 5), '#ffe9c0');
  /* ---------- desfecho ---------- */
  q(315, 319, { z0: 1.0, z1: 1.35, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { eye: 1.1, worry: 0.6, smile: 0.4, up: 0.6, blush: 1 }), 0);
  q(319, 325, { z0: 1.0, z1: 1.3, x0: 540, x1: FX, y0: 1000, y1: FY, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.4 + 0.3 * ez(lt / 2), bl: 0.3 }), 0);
  q(325, 332, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + PHOTOF(Pf, t, 540, 960, 1.8, 0) + glow(Pf, 'A', 540, 960, 700, 0.5), '#ffe9c0');
  q(332, 336, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + BGX({ kind: 'mar', view: 'f', t }, 540, 1750, 1.3) + DOORA(Pf, t, 170, 1150, 0.9, { open: 0.15 }));
  q(336, 342, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { smile: 0.8, up: 0.4, mouth: 0.3 * Math.abs(Math.sin(t * 8)), blush: 1 }), 0);
  q(342, 348, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + COFFEE(Pf, t, 400, 960, 2.0) + COFFEE(Pf, t, 720, 1040, 1.8), '#ffe9c0');
  q(348, 352, { z0: 1.0, z1: 1.35, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#4a3a4c') + A(t, { smile: 1, eye: 0.7, up: 0.4 }), '#ffe9c0');
  q(352, 357, { z0: 1.0, z1: 1.4, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { open: 0.3 + 0.5 * ez(lt / 2) }), '#ffe9a0');
  q(357, 365, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.9, bl: 0 }), '#ffe9c0');
  q(365, 372, { z0: 1.3, z1: 2.3, x0: FX, x1: FX, y0: FY, y1: FY, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.9, bl: 1 }), '#ffe9a0');
  q(372, 377, { z0: 2.3, z1: 1.2, x0: FX, x1: 540, y0: FY, y1: 1000, shk: 2 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 1, bl: 1 }) + glow(Pf, 'A', FX, FY, 700 * ez(lt / 1.5), 0.6), '#fff');
  q(377, 382, { z0: 1.0, z1: 1.3, shk: 3 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { open: 0.7 }) + KNOCKR(lt, 540, 800, 0.8) + KNOCKR(lt - 0.25, 540, 800, 0.8), '#ffe9a0');
  q(382, 384, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + M(t, { smile: 0.6, eye: 1.05, up: 0.3 }), 0);
  q(384, 388, { z0: 1.0, z1: 1.8, x0: 540, x1: FX, y0: 1000, y1: FY, shk: 1 }, (t, lt, Pf) => FACADE(Pf, t, { warm: 0.4, bl: BLINK3(lt) }), '#ffe9a0');
  q(388, 392, { z0: 1.0, z1: 1.2, shk: 1 }, (t, lt, Pf) => BGF(Pf, '#2a2438') + CAL(Pf, t, 540, 960, 1.7, 5 + Math.floor(lt / 0.3)), 0);
  q(392, 395, { z0: 1.0, z1: 1.3, shk: 1 }, (t, lt, Pf) => BGF(Pf) + SIGNAL(Pf, t, 540, 960, 1.9, 1 + Math.floor(lt / 0.4)), '#ffe9a0');
  q(395, 404, { z0: 1.0, z1: 1.5, x0: 540, x1: 540, y0: 1000, y1: 1050, shk: 1 }, (t, lt, Pf) => HALLA(Pf, t, {}) + DOORA(Pf, t, 540, 1150, 1.5, { strip: 0.5 }) + BGX({ kind: 'mar', view: 'b', t, armR: -80 + 10 * Math.sin(t * 9) }, 760, 1850, 1.2), '#ffe9c0');
  q(404, null, { z0: 1.0, z1: 1.1, shk: 1 }, (t, lt, Pf) => COMMENTA(Pf, t, lt), '#ffe9c0');
}
