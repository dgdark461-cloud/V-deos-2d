function partX(c) {
  const { sh } = MK(c);
  const T0 = (t0, d, o, fn) => sh(t0, d, o, (t, lt, Pf) => fn(t, lt, Pf) + GRADEE(t, { dcol: '#bcd8e8', dop: 0.25 }), 0);
  const at = (g, x, y, sc) => G(g, `translate(${f1(x)} ${f1(y)}) scale(${sc})`);
  T0(0, 2, {}, (t, lt, Pf) => FOREST2(Pf, t, { px: 100 * lt, dz: 0.2 * lt }) + at(PERS({ c: 'dan', view: 'f', t, arms: 'swing', worry: 0.6, rim: '#6ac' }), 300, 1700, 1.3) + at(PERS({ c: 'hel', view: 'f', t, arms: 'crossed', rim: '#6ac' }), 760, 1700, 1.3));
  T0(2, 2, {}, (t, lt, Pf) => FOREST2(Pf, t, {}) + at(PANT({ t, walk: 1, ph: t * 5, tail: 1 }), 540, 1650, 1.2) + EYESP(Pf, t, 540, 700, 1.0, 1));
  T0(4, 2, {}, (t, lt, Pf) => FOREST2(Pf, t, {}) + TRUCK(Pf, t, 400, 1500, 1.3, { spin: t * 8 }) + at(CABINX(Pf, t, 0, 0, 1, { smoke: 1 }), 900, 1300, 0.6));
  T0(6, 2, {}, (t, lt, Pf) => CABINI(Pf, t, {}) + at(PERS({ c: 'hel', view: 'f', t, arms: 'hold', m: 0.3 }), 330, 1700, 1.4) + at(PERS({ c: 'dan', view: 's', walk: 1, ph: t * 6, t, hold: R(-8, -8, 60, 16, '#222') }), 760, 1700, 1.3) + CAMH(810, 520, 1.5, t));
  T0(8, 2, {}, (t, lt, Pf) => BIG('#0a0e18') + PERSF(t, { c: 'dan', eye: 1.4, m: 0.3, worry: 1, sweat: 1, rim: '#6ac' }, 540, 960, 2.6) + EYESP(Pf, t, 540, 400, 0.6, 1));
  T0(10, 2, {}, (t, lt, Pf) => BIG('#0a0e18') + PERSF(t, { c: 'hel', eye: 1, m: 0, sm: 0.2, rim: '#fb7' }, 540, 960, 2.6) + CAGE(540, 1700, 1, { open: 0.8 }) + TORCH(100, 200, 40, 800, 150));
}
