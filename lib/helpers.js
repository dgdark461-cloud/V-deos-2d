/* helpers.js - funções NEUTRAS de SVG e animação. Nenhum estilo, cor ou personagem definidos aqui.
 * Tudo vive em window.H. Cada cena deve usar um prefixo único nos ids (ex.: "s3_") para que
 * gradientes e recortes não colidam durante a transição entre cenas.
 */
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const H = {};

  /* ---------------------------------------------------------- matemática / tempo */
  H.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  H.lerp = (a, b, k) => a + (b - a) * k;
  H.map = (v, a, b, c, d) => c + (d - c) * ((v - a) / (b - a));
  /** progresso 0..1 de t entre a e b (com easing opcional) */
  H.prog = (t, a, b, ease) => {
    const k = H.clamp((t - a) / (b - a));
    return ease ? ease(k) : k;
  };
  /** 1 quando t >= a (degrau suave de largura w) */
  H.step = (t, a, w = 0.001) => H.clamp((t - a) / w);
  /** pulso 0→1→0 centrado em c, com subida up e descida down */
  H.pulse = (t, c, up = 0.1, down = 0.4) =>
    t < c ? H.prog(t, c - up, c, H.ease.outQuad) : 1 - H.prog(t, c, c + down, H.ease.inOutQuad);
  H.loop = (t, period) => ((t % period) + period) % period / period;
  H.wave = (t, period, phase = 0) => Math.sin((t / period + phase) * Math.PI * 2);
  H.deg = (d) => d * Math.PI / 180;

  /* ---------------------------------------------------------- easings */
  const E = {
    linear: k => k,
    inQuad: k => k * k,
    outQuad: k => 1 - (1 - k) * (1 - k),
    inOutQuad: k => k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2,
    inCubic: k => k * k * k,
    outCubic: k => 1 - Math.pow(1 - k, 3),
    inOutCubic: k => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
    outQuart: k => 1 - Math.pow(1 - k, 4),
    inOutSine: k => -(Math.cos(Math.PI * k) - 1) / 2,
    outBack: (k, s = 1.70158) => 1 + (s + 1) * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2),
    inBack: (k, s = 1.70158) => (s + 1) * k * k * k - s * k * k,
    outElastic: k => k === 0 ? 0 : k === 1 ? 1 :
      Math.pow(2, -10 * k) * Math.sin((k * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
    outBounce: k => {
      const n = 7.5625, d = 2.75;
      if (k < 1 / d) return n * k * k;
      if (k < 2 / d) return n * (k -= 1.5 / d) * k + 0.75;
      if (k < 2.5 / d) return n * (k -= 2.25 / d) * k + 0.9375;
      return n * (k -= 2.625 / d) * k + 0.984375;
    },
    /** mola amortecida: sobe até 1 oscilando (f = frequência, z = amortecimento) */
    spring: (k, f = 3, z = 5) => 1 - Math.exp(-z * k) * Math.cos(f * Math.PI * 2 * k),
  };
  H.ease = E;

  /* ---------------------------------------------------------- aleatório determinístico */
  /** mulberry32: mesma semente → mesma sequência (essencial: setT(t) é função pura do tempo) */
  H.rng = (seed = 1) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  H.hash = (n) => { const r = H.rng(Math.floor(n) * 9973 + 17); r(); return r(); };
  /** ruído de valor 1D suave */
  H.noise = (x, seed = 0) => {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return H.lerp(H.hash(i + seed * 131), H.hash(i + 1 + seed * 131), u) * 2 - 1;
  };

  /* ---------------------------------------------------------- criação de SVG */
  /** el('rect', {x:0,...}, parent) → elemento SVG. Atributos null/undefined são ignorados. */
  H.el = (tag, attrs = {}, parent = null) => {
    const e = document.createElementNS(NS, tag);
    H.attr(e, attrs);
    if (parent) parent.appendChild(e);
    return e;
  };
  H.attr = (e, attrs) => {
    for (const k in attrs) {
      const v = attrs[k];
      if (v === null || v === undefined) continue;
      if (k === 'text') e.textContent = v;
      else e.setAttribute(k, v);
    }
    return e;
  };
  H.g = (attrs, parent) => H.el('g', attrs, parent);
  H.rect = (x, y, w, h, attrs = {}, parent) => H.el('rect', Object.assign({ x, y, width: w, height: h }, attrs), parent);
  H.rrect = (x, y, w, h, r, attrs = {}, parent) => H.el('rect', Object.assign({ x, y, width: w, height: h, rx: r, ry: r }, attrs), parent);
  H.circle = (cx, cy, r, attrs = {}, parent) => H.el('circle', Object.assign({ cx, cy, r }, attrs), parent);
  H.ellipse = (cx, cy, rx, ry, attrs = {}, parent) => H.el('ellipse', Object.assign({ cx, cy, rx, ry }, attrs), parent);
  H.line = (x1, y1, x2, y2, attrs = {}, parent) => H.el('line', Object.assign({ x1, y1, x2, y2 }, attrs), parent);
  H.path = (d, attrs = {}, parent) => H.el('path', Object.assign({ d }, attrs), parent);
  H.text = (str, x, y, attrs = {}, parent) => H.el('text', Object.assign({ x, y, text: str }, attrs), parent);
  H.poly = (pts, attrs = {}, parent) =>
    H.el('polygon', Object.assign({ points: pts.map(p => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ') }, attrs), parent);

  /* ---------------------------------------------------------- geometria (strings de path) */
  H.polyPoints = (cx, cy, r, n, rot = 0) =>
    Array.from({ length: n }, (_, i) => [cx + r * Math.cos(rot + i * 2 * Math.PI / n), cy + r * Math.sin(rot + i * 2 * Math.PI / n)]);
  H.starPoints = (cx, cy, ro, ri, n, rot = -Math.PI / 2) =>
    Array.from({ length: n * 2 }, (_, i) => {
      const r = i % 2 ? ri : ro, a = rot + i * Math.PI / n;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });
  H.arcPath = (cx, cy, r, a0, a1) => {
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    return `M${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} ${a1 > a0 ? 1 : 0} ${x1.toFixed(2)},${y1.toFixed(2)}`;
  };
  /** curva suave (Catmull-Rom → Bézier) passando pelos pontos */
  H.smoothPath = (pts, closed = false, tension = 0.5) => {
    const n = pts.length;
    if (n < 2) return '';
    const P = i => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
    const end = closed ? n : n - 1;
    for (let i = 0; i < end; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) * tension / 3 * 2 / 2, p1[1] + (p2[1] - p0[1]) * tension / 3 * 2 / 2];
      const c2 = [p2[0] - (p3[0] - p1[0]) * tension / 3 * 2 / 2, p2[1] - (p3[1] - p1[1]) * tension / 3 * 2 / 2];
      d += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
    }
    return d + (closed ? 'Z' : '');
  };
  /** blob orgânico: raio varia com ruído determinístico */
  H.blobPath = (cx, cy, r, wobble = 0.2, n = 8, seed = 1, time = 0) => {
    const pts = Array.from({ length: n }, (_, i) => {
      const a = i * 2 * Math.PI / n, k = 1 + wobble * H.noise(i * 1.7 + time, seed);
      return [cx + r * k * Math.cos(a), cy + r * k * Math.sin(a)];
    });
    return H.smoothPath(pts, true);
  };
  /** corda/linha ondulada entre dois pontos (amp, freq, fase) */
  H.wavyLine = (x1, y1, x2, y2, amp, freq, phase, seg = 24) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const pts = Array.from({ length: seg + 1 }, (_, i) => {
      const k = i / seg, o = amp * Math.sin(k * freq * Math.PI * 2 + phase);
      return [x1 + dx * k + nx * o, y1 + dy * k + ny * o];
    });
    return pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ');
  };

  /* ---------------------------------------------------------- transformações */
  H.tf = (x = 0, y = 0, rot = 0, sx = 1, sy = sx, ox = 0, oy = 0) =>
    `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rot.toFixed(2)}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(${-ox} ${-oy})`;
  H.setTf = (e, x, y, rot, sx, sy, ox, oy) => e.setAttribute('transform', H.tf(x, y, rot, sx, sy, ox, oy));
  H.show = (e, on) => e.setAttribute('display', on ? 'inline' : 'none');
  H.opacity = (e, v) => e.setAttribute('opacity', H.clamp(v).toFixed(3));

  /* ---------------------------------------------------------- gradientes e recortes (ids únicos!) */
  /** stops: [[offset, cor, opacidade?], ...]. 'id' deve ser único na página (use prefixo da cena). */
  const stops = (g, st) => st.forEach(s => H.el('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] === undefined ? 1 : s[2] }, g));
  H.defs = (svgOrG) => H.el('defs', {}, svgOrG);
  H.linearGradient = (defs, id, st, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => {
    const g = H.el('linearGradient', { id, x1, y1, x2, y2 }, defs); stops(g, st); return 'url(#' + id + ')';
  };
  H.radialGradient = (defs, id, st, cx = 0.5, cy = 0.5, r = 0.5, fx = cx, fy = cy) => {
    const g = H.el('radialGradient', { id, cx, cy, r, fx, fy }, defs); stops(g, st); return 'url(#' + id + ')';
  };
  /** cria <clipPath id> e devolve { ref:'url(#id)', node } para adicionar formas dentro de node */
  H.clip = (defs, id) => { const node = H.el('clipPath', { id }, defs); return { ref: 'url(#' + id + ')', node }; };
  H.blur = (defs, id, std) => {
    const f = H.el('filter', { id, x: '-50%', y: '-50%', width: '200%', height: '200%' }, defs);
    H.el('feGaussianBlur', { stdDeviation: std }, f); return 'url(#' + id + ')';
  };

  /* ---------------------------------------------------------- partículas determinísticas */
  /** Gera N partículas fixas (semente) e devolve função at(t) → [{x,y,r,a,i}]
   *  Cada partícula nasce em t0 + i*gap, vive 'life' s, sobe/cai conforme vx, vy e gravidade g. */
  H.particles = (n, o = {}) => {
    const rnd = H.rng(o.seed || 1), P = [];
    for (let i = 0; i < n; i++) {
      P.push({
        x0: H.lerp(o.x0 || 0, o.x1 === undefined ? (o.x0 || 0) : o.x1, rnd()),
        y0: H.lerp(o.y0 || 0, o.y1 === undefined ? (o.y0 || 0) : o.y1, rnd()),
        vx: H.lerp(o.vx0 === undefined ? -60 : o.vx0, o.vx1 === undefined ? 60 : o.vx1, rnd()),
        vy: H.lerp(o.vy0 === undefined ? -120 : o.vy0, o.vy1 === undefined ? -20 : o.vy1, rnd()),
        r: H.lerp(o.r0 || 2, o.r1 || 6, rnd()),
        delay: rnd() * (o.spread || 0),
        ph: rnd() * Math.PI * 2,
      });
    }
    const life = o.life || 1.5, g = o.gravity || 0, t0 = o.t0 || 0, loop = !!o.loop;
    return (t) => {
      const out = [];
      P.forEach((p, i) => {
        let age = t - t0 - p.delay;
        if (loop) age = ((age % life) + life) % life;
        if (age < 0 || age > life) return;
        const k = age / life;
        out.push({
          i, k,
          x: p.x0 + p.vx * age + (o.sway ? Math.sin(p.ph + age * 3) * o.sway : 0),
          y: p.y0 + p.vy * age + 0.5 * g * age * age,
          r: p.r * (o.shrink ? 1 - k : 1),
          a: Math.min(1, k * 8) * (1 - k),
        });
      });
      return out;
    };
  };
  /** Pool de elementos SVG reutilizados para desenhar partículas (evita criar/destruir por quadro). */
  H.pool = (parent, n, make) => {
    const els = Array.from({ length: n }, () => make(parent));
    return {
      els,
      draw(list, apply) {
        els.forEach((e, i) => {
          const p = list[i];
          if (!p) { e.setAttribute('display', 'none'); return; }
          e.setAttribute('display', 'inline');
          apply(e, p);
        });
      },
    };
  };

  /* ---------------------------------------------------------- narração (words.json) */
  /** Índice da palavra ativa em t (-1 se nenhuma) */
  H.wordIndexAt = (words, t) => {
    let lo = 0, hi = words.length - 1, r = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (words[m].start <= t) { r = m; lo = m + 1; } else hi = m - 1; }
    return r;
  };
  /** Início da primeira ocorrência de uma palavra (busca sem acento/maiúscula). start = a partir de qual índice. */
  const fold = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  H.findWord = (words, str, from = 0) => {
    const f = fold(str);
    for (let i = from; i < words.length; i++) if (fold(words[i].w) === f) return i;
    return -1;
  };
  /** Tempo de início de uma palavra; se não achar devolve fallback */
  H.timeOf = (words, str, fallback = 0, from = 0) => {
    const i = H.findWord(words, str, from); return i < 0 ? fallback : words[i].start;
  };
  /** Cada trecho de roteiro: {start,end,text} (de words.json.segments) */
  H.segAt = (segs, t) => segs.find(s => t >= s.start && t < s.end) || null;
  /** Intensidade de "fala" 0..1 em t (1 durante palavras, suaviza nas bordas) - útil para boca/gesto */
  H.talk = (words, t, soft = 0.04) => {
    const i = H.wordIndexAt(words, t);
    if (i < 0) return 0;
    const w = words[i];
    if (t > w.end + soft) return 0;
    return H.clamp(Math.min((t - w.start) / soft + 0.3, (w.end + soft - t) / soft + 0.3));
  };

  /* ---------------------------------------------------------- cenas e transições */
  /** Opacidade de uma cena [start,end] com fade de 'fade' s centrado nas fronteiras (padrão 0,25 s). */
  H.sceneAlpha = (t, start, end, fade = 0.25, first = false, last = false) => {
    const h = fade / 2;
    const a = first ? 1 : H.prog(t, start - h, start + h);
    const b = last ? 1 : 1 - H.prog(t, end - h, end + h);
    return Math.min(a, b);
  };
  /** Câmera simples: aplica pan/zoom/shake em um <g> raiz. cx,cy = centro do foco em coordenadas da cena. */
  H.camera = (g, W, Hh, cx, cy, zoom = 1, rot = 0, shakeAmt = 0, t = 0) => {
    const sx = shakeAmt ? H.noise(t * 30, 3) * shakeAmt : 0, sy = shakeAmt ? H.noise(t * 30, 5) * shakeAmt : 0;
    g.setAttribute('transform',
      `translate(${W / 2 + sx} ${Hh / 2 + sy}) rotate(${rot}) scale(${zoom}) translate(${-cx} ${-cy})`);
  };

  global.H = H;
})(typeof window !== 'undefined' ? window : globalThis);
