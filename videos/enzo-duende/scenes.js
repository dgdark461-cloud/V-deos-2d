function makeScenes(WORDS, S) {
  const sc = [];
  const add = (start, fin, draw) => sc.push({ start, fin, draw });
  const k = (t, a, b) => H.prog(t, a, b);
  const c = { add, k, E_: H.ease, S, WORDS };
  if (typeof partX === 'function') partX(c);
  if (typeof partY === 'function') partY(c);
  if (typeof partZ === 'function') partZ(c);
  sc.sort((a, b) => a.start - b.start);
  return { scenes: sc, end: S[S.length - 1].end };
}
