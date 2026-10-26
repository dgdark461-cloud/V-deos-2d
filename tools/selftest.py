#!/usr/bin/env python3
"""selftest.py - testa a cadeia inteira com uma "narração" sintética (sem áudio real).

  python tools/selftest.py            # align + synth + render (2 s) + MP4
  python tools/selftest.py --quick    # sem render (não precisa de Chromium)

A narração falsa tem sílabas (rajadas de tom) e pausas conhecidas, então dá para medir
o erro do alinhamento contra o "gabarito". Isso valida o código, NÃO a qualidade com voz real.
"""
import argparse, json, os, shutil, subprocess, sys, tempfile
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
from tools import align, synth  # noqa: E402

SCRIPT = ("Era uma vez uma primeira ideia, simples e curiosa. "
          "Depois, tudo mudou de repente! "
          "Ninguém esperava aquela resposta; mas ela chegou. "
          "No fim, restou apenas o silêncio.")


def fake_narration(sr=16000, seed=3):
    rng = np.random.default_rng(seed)
    segs = align.split_segments(SCRIPT)
    out, truth_words, truth_segs = [], [], []
    t = 0.45
    out.append(np.zeros(int(t * sr)))
    for si, seg in enumerate(segs):
        s0 = t
        for w in seg:
            w0 = t
            for _ in range(align.count_syllables(w)):
                d = rng.uniform(0.13, 0.20)
                n = int(d * sr)
                x = np.arange(n) / sr
                f0 = rng.uniform(110, 180)
                tone = sum(np.sin(2 * np.pi * f0 * k * x) / k for k in (1, 2, 3, 4))
                out.append(tone * np.hanning(n) * 0.25)
                t += d
            truth_words.append((w, w0, t))
            gap = int(0.035 * sr)                       # respiro mínimo entre palavras
            out.append(rng.standard_normal(gap) * 0.0005)
            t += 0.035
        truth_segs.append((s0, t - 0.035))
        if si < len(segs) - 1:
            p = rng.uniform(0.28, 0.5)                  # pausa real entre trechos
            out.append(rng.standard_normal(int(p * sr)) * 0.0005)
            t += p
    out.append(np.zeros(int(0.4 * sr)))
    t += 0.4
    return np.concatenate(out).astype(np.float32), truth_words, truth_segs, t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quick", action="store_true")
    a = ap.parse_args()
    tmp = tempfile.mkdtemp(prefix="selftest_")
    ok = True

    # 1) áudio falso + alinhamento
    x, tw, ts, dur = fake_narration()
    wav = os.path.join(tmp, "narr.wav")
    synth.write_wav(wav, np.repeat(x, 1), 16000)
    res = align.run(wav, SCRIPT)
    words = res["words"]
    assert len(words) == len(tw), (len(words), len(tw))
    err = [abs(w["start"] - g[1]) for w, g in zip(words, tw)]
    seg_err = [abs(s["start"] - g[0]) for s, g in zip(res["segments"], ts)]
    shortest = min(w["end"] - w["start"] for w in words)
    print(f"[align] {len(words)} palavras | {len(res['pauses'])} pausas | erro médio início de palavra "
          f"{np.mean(err) * 1000:.0f} ms (máx {np.max(err) * 1000:.0f}) | trechos {np.mean(seg_err) * 1000:.0f} ms | "
          f"menor palavra {shortest * 1000:.0f} ms")
    if shortest < 0.0899:
        print("  FALHA: palavra com menos de 90 ms"); ok = False
    if np.mean(err) > 0.12:
        print("  FALHA: erro médio alto"); ok = False
    if len(res["pauses"]) < len(ts) - 1:
        print("  FALHA: pausas não detectadas"); ok = False

    # 2) efeitos + mix
    voice = synth.read_audio(wav)
    events = [{"t": 1.0, "fx": "whoosh", "gain": 0.18}, {"t": 2.5, "fx": "impact", "gain": 0.22},
              {"t": 4.0, "fx": "pop", "gain": 0.16}]
    mix = synth.mix(voice, events, {"root": 55, "level": 0.12}, duration=dur)
    mwav = os.path.join(tmp, "mix.wav")
    synth.write_wav(mwav, mix)
    pk = float(np.max(np.abs(mix)))
    vpk = float(np.max(np.abs(voice)))
    print(f"[synth] mix {len(mix) / synth.SR:.2f}s, pico {20 * np.log10(pk):.1f} dBFS (voz sozinha {20 * np.log10(vpk):.1f})")
    if pk > 0.95:
        print("  FALHA: mix estourou"); ok = False

    if a.quick:
        print("OK (quick)" if ok else "COM FALHAS"); sys.exit(0 if ok else 1)

    # 3) render de 2 s com o modelo
    vdir = os.path.join(ROOT, "render_tmp", "_selftest")
    shutil.rmtree(vdir, ignore_errors=True)
    os.makedirs(vdir)
    shutil.copy(os.path.join(ROOT, "templates", "scene_template.html"), os.path.join(vdir, "scene.html"))
    with open(os.path.join(vdir, "words.json"), "w", encoding="utf-8") as f:
        json.dump(res, f)
    html = os.path.join(vdir, "scene.html")
    mp4 = os.path.join(tmp, "t.mp4")
    r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "render.py"), html, "--audio", mwav,
                        "--duration", "2", "--out", mp4, "--scale", "0.5", "--fps", "15"],
                       capture_output=True, text=True)
    print(r.stdout.strip()[-300:] or r.stderr.strip()[-600:])
    if r.returncode or not os.path.exists(mp4):
        print("  FALHA no render"); ok = False
    else:
        pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,codec_name,width,height,nb_frames",
                             "-of", "csv=p=0", mp4], capture_output=True, text=True).stdout.strip().splitlines()
        print("[render] streams:", pr)
    shutil.rmtree(vdir, ignore_errors=True)
    print("OK" if ok else "COM FALHAS")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
