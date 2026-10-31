#!/usr/bin/env python3
"""Realinha words.json usando reconhecimento de fala (sherpa-onnx + whisper) em janelas curtas.
Uso: python tools/align_asr.py <audio> <words.json> --model <dir_whisper> --out <novo.json>
O Whisper nao da tempos; cada janela (6 s, passo 2 s) diz QUAIS palavras do roteiro estao nela, e o tempo
de cada palavra e distribuido pelas silabas dentro da janela. A mediana entre janelas sobrepostas ancora."""
import argparse, json, re, subprocess, unicodedata, difflib, sys, os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from align import count_syllables

def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in w if unicodedata.category(c) != 'Mn'))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('audio'); ap.add_argument('words'); ap.add_argument('--model', required=True)
    ap.add_argument('--out', required=True); ap.add_argument('--win', type=float, default=6.0)
    ap.add_argument('--hop', type=float, default=2.0); ap.add_argument('--raw', default='')
    a = ap.parse_args()
    import sherpa_onnx as s
    d = a.model.rstrip('/') + '/'
    name = [f for f in os.listdir(d) if f.endswith('-encoder.int8.onnx')][0][:-len('-encoder.int8.onnx')]
    r = s.OfflineRecognizer.from_whisper(d + name + '-encoder.int8.onnx', d + name + '-decoder.int8.onnx', d + name + '-tokens.txt', language='pt', num_threads=2)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.audio, '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.float32); sr = 16000; dur = len(x) / sr
    W = json.load(open(a.words)); words = W['words']
    sw = [norm(w['w']) for w in words]; syl = [max(1, count_syllables(w['w'])) for w in words]
    est = np.array([w['start'] for w in words])
    est_t = []
    cand = [[] for _ in words]
    t0 = 0.0; wins = []
    while t0 < dur - 1.0:
        t1 = min(dur, t0 + a.win)
        st = r.create_stream(); st.accept_waveform(sr, x[int(t0 * sr):int(t1 * sr)]); r.decode_stream(st)
        txt = st.result.text; wins.append((t0, t1, txt))
        rec = [norm(w) for w in txt.split() if norm(w)]
        if rec:
            lo = int(np.searchsorted(est, t0 - 12)); hi = int(np.searchsorted(est, t1 + 12))
            lo = max(0, lo - 2); hi = min(len(words), hi + 2)
            sm = difflib.SequenceMatcher(None, rec, sw[lo:hi], autojunk=False)
            m = {}
            for blk in sm.get_matching_blocks():
                for k in range(blk.size): m[blk.a + k] = lo + blk.b + k
            rs = np.array([max(1, count_syllables(w)) for w in rec], float)
            cum = np.concatenate([[0], np.cumsum(rs)]); tot = cum[-1]
            pad = 0.15
            for i, j in m.items():
                cand[j].append(t0 + pad + (t1 - t0 - 2 * pad) * (cum[i] / tot))
        print(f'{t0:6.1f} {txt[:90]}', flush=True)
        t0 += a.hop
    if a.raw: json.dump(wins, open(a.raw, 'w'), ensure_ascii=False)
    anc = {j: float(np.median(c)) for j, c in enumerate(cand) if len(c) >= 2}
    keys = sorted(anc)
    # monotonia: remove ancoras que quebram a ordem
    good = []; last = -1
    for j in keys:
        if anc[j] > last: good.append(j); last = anc[j]
    st = np.zeros(len(words)); 
    gi = good
    cs = np.concatenate([[0], np.cumsum(syl)]).astype(float)
    for n, j in enumerate(words):
        pass
    for k in range(len(words)):
        # vizinhos
        p = max([g for g in gi if g <= k], default=None); q = min([g for g in gi if g >= k], default=None)
        if p is None: st[k] = anc[q] - (cs[q] - cs[k]) * 0.2
        elif q is None: st[k] = anc[p] + (cs[k] - cs[p]) * 0.2
        elif p == q: st[k] = anc[p]
        else: st[k] = anc[p] + (anc[q] - anc[p]) * (cs[k] - cs[p]) / (cs[q] - cs[p])
    st = np.maximum.accumulate(st)
    out = json.loads(json.dumps(W))
    for k, w in enumerate(out['words']):
        w['start'] = round(float(st[k]), 3); w['end'] = round(float(st[k + 1] if k + 1 < len(st) else min(dur, st[k] + 0.5)), 3)
    by = {}
    for w in out['words']: by.setdefault(w['seg'], []).append(w)
    for sg in out['segments']:
        ws = by.get(sg['i'], [])
        if ws:
            sg['start'] = ws[0]['start']; sg['end'] = ws[-1]['end']
    out['method'] = 'asr-anchored (whisper windows) + syllables'
    json.dump(out, open(a.out, 'w'), ensure_ascii=False, indent=1)
    print('ancoras', len(good), 'de', len(words))
main()
