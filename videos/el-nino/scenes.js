/* scenes.js - monta a lista de cenas (partA: 0-31 s em 2.5D; partB: 31 s ao fim em 2D). */
function makeScenes(WORDS, S) {
  const sc = [];
  const add = (start, draw, kind, tr, capY) => sc.push({ start, draw, kind, tr, capY });
  const mb = (a, b, v) => window.MBI.push([a, b, v]);
  const c = { add, mb, W: WORDS, S };
  partA(c);
  if (typeof partB === 'function') partB(c);
  sc.sort((a, b) => a.start - b.start);
  const capY = t => { let y = 1440; for (const s of sc) { if (s.start <= t) y = s.capY || 1440; else break; } return y; };
  return { scenes: sc, end: 83.5, capY };
}
