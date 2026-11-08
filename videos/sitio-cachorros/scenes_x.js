function partX(c) {
  const q = QF(c);
  q(0, 40, { z0: 1, z1: 1.05 }, (t, lt, Pf) => FLAT([{d:1,svg:CASAR(Pf, t, {})}]) + DOGR(200, 1500, 0.8, t, { pose: 'bark', chain: 1 }) + DOGR(800, 1560, 0.8, t, { pose: 'bark', dir: -1, col: '#2a2a30', c2: '#4a4a52', ph: 1 }), 0);
  q(40, 80, { z0: 1, z1: 1.05 }, (t, lt, Pf) => INTR(Pf, t, {}) + CAII(t, { eye: 1.2, worry: 0.5 }, 300, 1300, 1.5) + AVOI(t, { open: 0.2 }, 780, 1350, 1.4), 0);
  q(80, 140, { z0: 1, z1: 1.05 }, (t, lt, Pf) => PASTOR(Pf, t, {}) + BCHR(540, 1500, 0.9, t, { mode: 'crawl' }), 0);
  q(140, 200, { z0: 1, z1: 1.05 }, (t, lt, Pf) => JANR(Pf, t, { hand: 1 }), 0);
  q(200, 260, { z0: 1, z1: 1.05 }, (t, lt, Pf) => PAIOLR(Pf, t, {open:1}) + AVOF({t, walk:1, ph:t*4, view:'f'}, 540, 1700, 1.0) + ARMR(850, 1000, 0.6, t), 0);
  q(260, null, { z0: 1, z1: 1.05 }, (t, lt, Pf) => PASTOR(Pf, t, {}) + BCHR(540, 1700, 1.2, t, { mode: 'up' }) + CAIF({t, walk:1, ph:t*4, view:'s'}, 300, 1700, 0.8), 0);
}
