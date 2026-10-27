#!/usr/bin/env python3
"""align.py - alinha o texto do roteiro ao áudio da narração (estimativa).

Uso:
    python tools/align.py narracao.mp3 roteiro.txt --out videos/<nome>/words.json

Como funciona (sem reconhecimento de fala, sem modelos):
  1. FFmpeg converte o áudio para 16 kHz mono; mede-se a energia (RMS em dB) a cada 10 ms.
  2. Detecta pausas reais: trechos de volume muito baixo dentro da fala.
  3. Divide o roteiro pela pontuação em trechos e posiciona o FIM de cada trecho na
     pausa mais próxima do tempo previsto (previsão por sílabas, recalculada a cada âncora).
  4. Distribui o tempo das palavras de cada trecho pelas sílabas e ajusta cada fronteira
     para o ponto de menor volume por perto. Nenhuma palavra fica com menos de 90 ms.

LIMITE: é uma ESTIMATIVA. Não há transcrição; o erro típico é de dezenas de ms dentro
de um trecho e maior se o locutor acelerar/desacelerar muito entre pausas.
"""
import argparse, json, re, subprocess, sys
import numpy as np

SR = 16000
HOP = SR // 100          # 10 ms
MIN_WORD = 0.090         # s
VOWELS = "aeiouáéíóúâêôãõàü"
STRONG = set("aeoáéóâêôãõà")
STRONG_END = re.compile(r"[.!?…]+[\"')\]]*$")
PUNCT_END = re.compile(r"[.,;:!?…]+[\"')\]]*$")


# ----------------------------------------------------------------- áudio
def load_audio(path):
    cmd = ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR),
           "-f", "f32le", "-"]
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode != 0:
        sys.exit("ffmpeg falhou ao ler o áudio:\n" + p.stderr.decode(errors="ignore"))
    x = np.frombuffer(p.stdout, dtype=np.float32)
    if len(x) < SR // 2:
        sys.exit("áudio vazio ou muito curto")
    return x


def energy_db(x):
    n = len(x) // HOP
    fr = x[: n * HOP].reshape(n, HOP).astype(np.float64)
    rms = np.sqrt((fr ** 2).mean(axis=1) + 1e-12)
    return 20 * np.log10(rms + 1e-9)


def smooth(a, k=3):
    if k <= 1:
        return a
    return np.convolve(a, np.ones(k) / k, mode="same")


def find_speech_and_pauses(db, min_pause=0.12, drop=22.0):
    """Retorna (i_ini, i_fim, limiar_dB, pausas); índices em quadros de 10 ms."""
    s = smooth(db, 3)
    floor = np.percentile(s, 5)
    peak = np.percentile(s, 95)
    thr = max(peak - drop, floor + 6.0)           # "queda forte de volume"
    voiced = s > thr
    idx = np.where(voiced)[0]
    if len(idx) == 0:
        sys.exit("não encontrei fala no áudio (tudo abaixo do limiar)")
    i0, i1 = int(idx[0]), int(idx[-1]) + 1
    runs, run = [], None
    for i in range(i0, i1):
        if not voiced[i]:
            if run is None:
                run = i
        elif run is not None:
            runs.append((run, i))
            run = None
    out = []
    for a, b in runs:
        if (b - a) * 0.01 >= min_pause:
            out.append({"start": a * 0.01, "end": b * 0.01,
                        "mid": (a + b) * 0.005, "dur": (b - a) * 0.01})
    return i0, i1, thr, out


# ----------------------------------------------------------------- texto
def count_syllables(word):
    w = re.sub(r"[^a-zA-ZÀ-ÿ0-9]", "", word).lower()
    if not w:
        return 0
    if w.isdigit():
        return max(1, int(round(len(w) * 1.6)))
    letters = re.sub(r"[^a-zà-ÿ]", "", w)
    n = 0
    for g in re.findall("[%s]+" % VOWELS, letters):
        n += 1
        for a, b in zip(g, g[1:]):
            if a in STRONG and b in STRONG:
                n += 1                                   # hiato (ex.: "oa", "ea")
            elif b in "íú" and a in VOWELS:
                n += 1
    return max(1, n)


def split_segments(text):
    """Divide em trechos pela pontuação; devolve lista de listas de palavras."""
    toks = re.sub(r"\s+", " ", text.strip()).split(" ")
    segs, cur = [], []
    for t in toks:
        if not t:
            continue
        cur.append(t)
        if PUNCT_END.search(t):
            segs.append(cur)
            cur = []
    if cur:
        segs.append(cur)
    # descarta "palavras" sem letra (ex.: travessão solto) e trechos vazios
    segs = [[w for w in s if count_syllables(w)] for s in segs]
    return [s for s in segs if s]


def seg_weight(words):
    return sum(count_syllables(w) for w in words) + 0.6   # leve folga por trecho


# ----------------------------------------------------------------- alinhamento
def place_boundaries(segs, t0, t1, pauses):
    """Define o fim de cada trecho (exceto o último) escolhendo pausas reais.
    Retorna ([(início, fim)], [ancorado_em_pausa])."""
    n = len(segs)
    weights = [seg_weight(s) for s in segs]
    spans, chosen = [], []
    cur_start, used = t0, -1
    for i in range(n - 1):
        remaining = sum(weights[i:])
        pred = cur_start + (t1 - cur_start) * weights[i] / remaining
        tol = max(0.6, 0.6 * (pred - cur_start))
        strong = bool(STRONG_END.search(segs[i][-1]))
        best, best_score = None, 1e9
        for j in range(used + 1, len(pauses)):
            p = pauses[j]
            # um trecho não pode ser bem mais curto que o previsto pelas sílabas
            if p["mid"] < cur_start + max(0.15, 0.55 * (pred - cur_start)):
                continue
            d = abs(p["mid"] - pred)
            if d > tol * (1.4 if strong else 1.0):
                if p["mid"] > pred:
                    break
                continue
            score = d - 0.6 * min(p["dur"], 0.7) - (0.15 if strong else 0.0)
            if score < best_score:
                best, best_score = j, score
        if best is not None:
            p = pauses[best]
            end, nxt, used = p["start"], p["end"], best
            chosen.append(True)
        else:
            end = nxt = pred
            chosen.append(False)
        end = max(end, cur_start + MIN_WORD * len(segs[i]))
        spans.append((cur_start, end))
        cur_start = max(nxt, end)
    spans.append((cur_start, t1))
    chosen.append(None)
    return spans, chosen


def local_min(db, t, radius, lo, hi):
    a = max(int(round(max(t - radius, lo) * 100)), 0)
    b = min(int(round(min(t + radius, hi) * 100)) + 1, len(db))
    if b - a < 2:
        return t
    return (a + int(np.argmin(db[a:b]))) * 0.01 + 0.005


def align_segment(words, a, b, db):
    syl = [max(1, count_syllables(w)) for w in words]
    wts = [s + 0.12 * len(re.sub(r"\W", "", w)) for s, w in zip(syl, words)]
    tot = sum(wts)
    bounds, acc = [a], 0.0
    for w in wts[:-1]:
        acc += w
        bounds.append(a + (b - a) * acc / tot)
    bounds.append(b)
    # cada fronteira interna vai para o ponto de menor volume por perto
    for k in range(1, len(bounds) - 1):
        left = bounds[k] - bounds[k - 1]
        right = bounds[k + 1] - bounds[k]
        rad = min(0.06, 0.3 * min(left, right))
        bounds[k] = local_min(db, bounds[k], rad,
                              bounds[k - 1] + MIN_WORD, bounds[k + 1] - MIN_WORD)
    # mínimo de 90 ms por palavra (passada para frente e para trás)
    for k in range(1, len(bounds)):
        bounds[k] = max(bounds[k], bounds[k - 1] + MIN_WORD)
    for k in range(len(bounds) - 2, 0, -1):
        bounds[k] = min(bounds[k], bounds[k + 1] - MIN_WORD)
    for k in range(1, len(bounds)):                        # se o trecho for curto demais
        bounds[k] = max(bounds[k], bounds[k - 1] + MIN_WORD)
    return [(bounds[i], bounds[i + 1]) for i in range(len(words))]


def run(audio, script_text, min_pause=0.12, drop=22.0):
    x = load_audio(audio)
    dur = len(x) / SR
    db = energy_db(x)
    i0, i1, thr, pauses = find_speech_and_pauses(db, min_pause, drop)
    t0, t1 = i0 * 0.01, i1 * 0.01
    segs = split_segments(script_text)
    if not segs:
        sys.exit("roteiro vazio")
    spans, chosen = place_boundaries(segs, t0, t1, pauses)
    words, segments = [], []
    for si, (seg, (a, b)) in enumerate(zip(segs, spans)):
        times = align_segment(seg, a, b, db)
        segments.append({"i": si, "text": " ".join(seg), "start": round(a, 3),
                         "end": round(b, 3), "anchored_on_pause": chosen[si]})
        for w, (s, e) in zip(seg, times):
            words.append({"w": w, "start": round(s, 3), "end": round(e, 3), "seg": si})
    return {
        "method": "estimated: pauses + syllables (no speech recognition)",
        "duration": round(dur, 3),
        "speech_start": round(t0, 3), "speech_end": round(t1, 3),
        "silence_threshold_db": round(float(thr), 1),
        "pauses": [{"start": round(p["start"], 3), "end": round(p["end"], 3)} for p in pauses],
        "segments": segments,
        "words": words,
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("audio")
    ap.add_argument("script", help="arquivo .txt com o roteiro")
    ap.add_argument("--out", default="words.json")
    ap.add_argument("--min-pause", type=float, default=0.12,
                    help="pausa mínima em segundos (padrão 0.12)")
    ap.add_argument("--drop-db", type=float, default=22.0,
                    help="queda (dB abaixo do pico) que conta como pausa; use 14-18 em narração muito comprimida")
    a = ap.parse_args()
    with open(a.script, encoding="utf-8") as f:
        text = f.read()
    res = run(a.audio, text, a.min_pause, a.drop_db)
    with open(a.out, "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=1)
    anch = sum(1 for s in res["segments"] if s["anchored_on_pause"])
    print(f"{len(res['words'])} palavras, {len(res['segments'])} trechos, "
          f"{len(res['pauses'])} pausas detectadas, {anch} trechos ancorados em pausa -> {a.out}")
    print(f"fala de {res['speech_start']:.2f}s a {res['speech_end']:.2f}s (áudio {res['duration']:.2f}s)")


if __name__ == "__main__":
    main()
