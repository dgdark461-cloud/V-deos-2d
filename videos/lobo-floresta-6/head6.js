/* scenes_a.js - Parte 5: 0 a ~48 s (tempos estimados -> remapeados pelo ASR) */
function MK5(c) {
  const SN = (s0, fin, fn) => SNP(c, s0, fin, fn); const E_ = ez;
  const mb = (a, b) => { window.MBI = window.MBI || []; window.MBI.push([a, b]); };
  const sh = (s0, dur, o, fn, pf) => SN(s0, 0.001, (t, lt, Pf) => CM(Pf, t, fn(t, lt, Pf), lt, dur, o) + (pf === 0 ? '' : PUNCH(lt, pf === undefined ? 0.35 : pf, typeof pf === 'string' ? pf : '#fff')));
  return { SN, sh, mb, E_ };
}
const CLR = (Pf, t, x, y, sc, o = {}) => chairClara(Pf, t, x, y, sc, o);
const YOUB = (t, x, y, sc, o = {}) => G(heroFig(Object.assign({ t, view: 'b', idle: 1 }, o)), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const ROOMW = (Pf, t, o = {}) => DUELBG(Pf, t, o);
const TVBG = (Pf, t) => DUELBG(Pf + 'b', t, { lamp: 0 }) + R(-300, -300, 1680, 2520, '#000', OP(0.6));
const WIDE = (Pf, t, o = {}) => ROOMW(Pf, t, o.bg || {}) + WOLFX(Pf, t, o.wx || 330, 1420, 0.85, { mouth: o.wm === undefined ? 0.7 : o.wm, dark: 0.45, crouch: 0.9, head: 0.3, phase: o.wp || 0 }) + MANX(Pf, t, o.mx || 830, 1430, 1.0, { flip: -1, walk: o.walk || 0 });
const CF = (t, o, x, y, sc) => cf(Object.assign({ t, eye: 1, worry: 0.7, tear: 0.5 }, o), x, y, sc);
const TABLE = (Pf, t) => ROOMW(Pf, t, { lamp: 1, x: 540 }) + R(-300, 1180, 1680, 800, '#2a1d14') + R(-300, 1170, 1680, 14, '#4a3222') + R(-300, 1184, 1680, 700, '#1a120c', OP(0.5)) + E(540, 1420, 620, 120, '#ffe3a8', OP(0.12));
const CAGEF = (Pf, t, x, y, sc, wolf = 0) => G(R(-300, -480, 600, 480, '#05080b', OP(0.5)) + (wolf ? WOLFX(Pf, t, 0, -20, 0.8, { mouth: 0.3, dark: 0.5, crouch: 0.8 }) : '') + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => R(-300 + i * 75, -500, 14, 520, '#1a232a')).join('') + R(-320, -520, 640, 24, '#1a232a') + R(-320, -14, 640, 24, '#1a232a'), `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
const PHOTOYC = (t, x, y, sc, rot = 0, o = {}) => photoCard(x, y, sc, rot, G(R(-114, -134, 228, 220, o.cage ? '#16222a' : '#2a3a46') + (o.cage ? CAGEF('ph', t, 0, 80, 0.35) : '') + G(heroFig({ t, view: 's', idle: 0 }), 'translate(-40 84) scale(0.2)') + G(claraFig({ t }), 'translate(44 84) scale(0.2)'), ''));
const EMER = (Pf, t, a = 1) => R(-300, -300, 1680, 2520, '#ff1a10', OP(a * (0.1 + 0.1 * Math.sin(t * 8)))) + glow(Pf, 'E', 120, 120, 700, 0.8 * a * (0.6 + 0.4 * Math.sin(t * 8))) + glow(Pf, 'F', 960, 120, 700, 0.8 * a * (0.6 + 0.4 * Math.cos(t * 8)));
const WOLFEYES = (Pf, x, y, s, a = 1) => eyesPair(Pf, x, y, s, '#ffb02a', a, 60);
