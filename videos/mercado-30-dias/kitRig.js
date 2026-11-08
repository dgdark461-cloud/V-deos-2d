/* kitRig.js - protagonista fragmentado (pecas recortadas da imagem original) */
const RIGM = {"W": 648, "H": 1438, "parts": {"fill": [109, 227, 419, 737], "base": [119, 177, 430, 759], "head": [187, 0, 289, 311], "armL": [0, 372, 197, 674], "armR": [425, 381, 223, 785], "legL": [33, 936, 284, 502], "legR": [316, 936, 278, 501]}};
const RIGP = { head: [320, 292], armL: [150, 470], armR: [515, 450], legL: [205, 940], legR: [430, 940] };
const RIGF = (x, by, ht, o = {}, t = 0) => {
  const s = ht / RIGM.H, M = RIGM.parts, cx = RIGM.W / 2, ph = o.ph || 0, wk = o.walk ? 1 : 0, br = Math.sin(t * 2.2) * (o.breath == null ? 1 : o.breath);
  const img = n => `<image href="assets/rig_${n}.png" x="${M[n][0]}" y="${M[n][1]}" width="${M[n][2]}" height="${M[n][3]}"/>`;
  const piv = (n, rot, dx, dy, inner, sy) => `<g transform="translate(${RIGP[n][0] + dx} ${RIGP[n][1] + dy}) rotate(${rot.toFixed(2)}) scale(1 ${(sy || 1).toFixed(3)}) translate(${-RIGP[n][0]} ${-RIGP[n][1]})">${inner}</g>`;
  const lg = (n, k) => { const p = ph + k * Math.PI, lift = wk * Math.max(0, Math.sin(p)) * 55, sw = wk * Math.cos(p); return piv(n, (o.legRot || 0) * (k ? 1 : -1) + sw * 3.2, 0, -lift + (o.legDy || 0), img(n), 1 - wk * 0.05 * Math.max(0, Math.sin(p))); };
  const bob = (wk ? -Math.abs(Math.sin(ph)) * 16 : 0) + br * 3 + (o.bob || 0), roll = wk ? Math.sin(ph) * 1.6 : 0, torso = o.torso || 0;
  const aL = (o.armL == null ? 0 : o.armL) + (wk ? Math.cos(ph) * 7 : Math.sin(t * 1.6) * 1.2), aR = (o.armR == null ? 0 : o.armR) + (wk ? -Math.cos(ph) * 7 : Math.sin(t * 1.6 + 1) * 1.2);
  const hd = (o.head || 0) + Math.sin(t * 1.3) * 1.4 - roll * 0.8;
  const body = img('fill') + lg('legL', 0) + lg('legR', 1) + img('base') + piv('armL', aL, 0, 0, img('armL')) + piv('armR', aR, 0, 0, img('armR')) + piv('head', hd, o.hx || 0, o.hy || 0, img('head'));
  return `<g transform="translate(${x.toFixed(1)} ${by.toFixed(1)}) rotate(${(o.rot || 0).toFixed(2)}) scale(${(s * (o.sx || 1)).toFixed(4)} ${s.toFixed(4)}) translate(${-cx} ${-RIGM.H})"${o.a != null ? ` opacity="${o.a}"` : ''}><g transform="translate(0 ${bob.toFixed(1)}) rotate(${(roll + torso).toFixed(2)} 324 940)">${body}</g></g>`;
};
