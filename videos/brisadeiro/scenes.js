/* scenes.js - monta a lista de cenas a partir de words.json. */
function makeScenes(WORDS, S) {
  const sc = [];
  const add = (start, fin, draw) => sc.push({ start, fin, draw });
  const tw = (w, n = 0, fb = 0) => { let i = -1, from = 0; for (let q = 0; q <= n; q++) { i = H.findWord(WORDS, w, from); if (i < 0) return fb; from = i + 1; } return WORDS[i].start; };
  const k = (t, a, b) => H.prog(t, a, b);
  const c = { add, tw, k, E_: H.ease, S, WORDS };
  if (typeof partD === 'function') partD(c);
  if (typeof partE === 'function') partE(c);
  if (typeof partF === 'function') partF(c);
  sc.sort((a, b) => a.start - b.start);
  return { scenes: sc, end: S[S.length - 1].end };
}
