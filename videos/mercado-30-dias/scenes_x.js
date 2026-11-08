function partX(c) {
  const q = QF(c);
  q(0, 30, { z0: 1, z1: 1.05 }, (t, lt, Pf) => MKTI(Pf, t, { flick: 1 }) + PRT('full', 540, 1750, 1300, { bob: t * 3 }), 0);
  q(30, 70, { z0: 1, z1: 1.05 }, (t, lt, Pf) => MKTF(Pf, t, { crowd: 18 }) + PRT('walk', 540, 1500, 700, { bob: t * 9 }), 0);
  q(70, 140, { z0: 1, z1: 1.05 }, (t, lt, Pf) => BGQ(NV0, NV2, Pf) + PRT('face1', 540, 1000, 1200, { ay: 0.5, bob: t * 2 }), 0);
  q(140, 220, { z0: 1, z1: 1.05 }, (t, lt, Pf) => ROOFR(Pf, t, {}) + GRILL(Pf, t, 540, 1300, 1.4) + ZMB(200, 1700, 1.2, t, {}) + MTR(800, 1500, 1.0, t, { sp: 'marta', bust: 1 }), 0);
  q(220, null, { z0: 1, z1: 1.05 }, (t, lt, Pf) => MKTF(Pf, t, { shutter: 0.6 }) + LETR(Pf, 540, 400, 1, t, 1) + CAMN(700, 1700, 1.0, t, { chain: 1 }), 0);
}
