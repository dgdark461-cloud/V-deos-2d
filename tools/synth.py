#!/usr/bin/env python3
"""synth.py - efeitos sonoros sintetizados (numpy/scipy) e mixagem voz + efeitos + música.

Uso como biblioteca:
    from tools import synth
    wav = synth.fx("impact", dur=1.2)                 # efeito normalizado pelo pico (±1)
    synth.mix_to_file("narracao.mp3", "events.json", "mix.wav", duration=40.0)

Uso na linha de comando:
    python tools/synth.py demo  --out /tmp/fx            # grava todos os efeitos em WAV
    python tools/synth.py mix --voice narr.mp3 --events videos/x/events.json --out /tmp/mix.wav

events.json:
{
  "music": {"root": 55, "chord": [1, 1.2, 1.5], "level": 0.10, "pulse": 0.0, "fade_in": 2.0},
  "events": [
     {"t": 1.20, "fx": "whoosh",  "gain": 0.18},
     {"t": 3.05, "fx": "impact",  "gain": 0.25, "args": {"dur": 1.4}}
  ]
}
"gain" é relativo ao pico da voz (efeitos ficam bem abaixo da voz). Sem "music" = sem música.

LIMITE: tudo é sintetizado (não são gravações); o resultado não é ouvido por mim,
só medido (pico/RMS), então o gosto final do mix precisa de ouvidos humanos.
"""
import argparse, json, os, subprocess, sys, tempfile
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 44100
_rng = np.random.default_rng(7)


# ----------------------------------------------------------------- utilidades
def _t(dur):
    return np.arange(int(dur * SR)) / SR


def _norm(x, peak=1.0):
    m = np.max(np.abs(x)) if len(x) else 0
    return (x / m * peak).astype(np.float32) if m > 1e-9 else x.astype(np.float32)


def _decay(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def _fade(x, a=0.003, b=0.01):
    n = len(x)
    na, nb = min(int(a * SR), n // 2), min(int(b * SR), n // 2)
    if na:
        x[:na] *= np.linspace(0, 1, na)
    if nb:
        x[-nb:] *= np.linspace(1, 0, nb)
    return x


def _filt(x, kind, freq, order=2):
    sos = signal.butter(order, freq, btype=kind, fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def _noise(n):
    return _rng.standard_normal(n)


def _place(buf, x, at):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(x))
    buf[i:j] += x[: j - i]


# ----------------------------------------------------------------- efeitos
def pop(dur=0.18, f0=520):
    t = _t(dur)
    f = f0 * np.exp(-t * 18) + 120
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * _decay(len(t), 0.05)
    x += 0.3 * _filt(_noise(len(t)), "bandpass", [1500, 4500]) * _decay(len(t), 0.01)
    return _fade(x)


def whoosh(dur=0.9, rising=True):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    x = _noise(n)
    out = np.zeros(n)
    centers = 400 + 5200 * (t if rising else 1 - t) ** 1.5
    block = 512
    for i in range(0, n - block, block):
        c = float(np.clip(centers[i], 200, 12000))
        sos = signal.butter(2, [c * 0.7, c * 1.3], btype="bandpass", fs=SR, output="sos")
        out[i:i + block] = signal.sosfilt(sos, x[i:i + block])
    env = np.sin(np.pi * t) ** 2
    return _fade(out * env, 0.02, 0.05)


def impact(dur=1.2, f0=95):
    t = _t(dur)
    f = f0 * np.exp(-t * 4) + 38
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * _decay(len(t), 0.35)
    thump = _filt(_noise(len(t)), "lowpass", 220) * _decay(len(t), 0.08)
    click = _filt(_noise(len(t)), "bandpass", [800, 3000]) * _decay(len(t), 0.01) * 0.4
    return _fade(body + 0.6 * thump + click, 0.001, 0.05)


def click(dur=0.05):
    t = _t(dur)
    x = _filt(_noise(len(t)), "highpass", 2500) * _decay(len(t), 0.004)
    x += 0.5 * np.sin(2 * np.pi * 1800 * t) * _decay(len(t), 0.006)
    return _fade(x, 0.0005, 0.005)


def heartbeat(beats=2, bpm=64, dur=None):
    gap = 60.0 / bpm
    total = dur or (gap * beats + 0.4)
    buf = np.zeros(int(total * SR))
    for b in range(beats):
        for off, amp in ((0.0, 1.0), (0.26 * gap, 0.7)):
            n = int(0.22 * SR)
            t = np.arange(n) / SR
            thump = np.sin(2 * np.pi * (62 - 20 * t * 4) * t) * _decay(n, 0.05)
            _place(buf, _fade(thump) * amp, b * gap + off)
    return buf


def shimmer(dur=1.6, base=1760):
    t = _t(dur)
    x = np.zeros(len(t))
    for k, r in enumerate((1.0, 1.5, 2.0, 2.52, 3.0)):
        x += np.sin(2 * np.pi * base * r * t + k) * _decay(len(t), 0.5 / (1 + 0.3 * k)) / (1 + k)
    trem = 0.6 + 0.4 * np.sin(2 * np.pi * 7 * t)
    return _fade(x * trem, 0.01, 0.1)


def wood_knock(dur=0.35, f0=210):
    t = _t(dur)
    x = np.zeros(len(t))
    for r, a, tau in ((1.0, 1.0, 0.05), (2.3, 0.6, 0.03), (3.9, 0.35, 0.02)):
        x += a * np.sin(2 * np.pi * f0 * r * t) * _decay(len(t), tau)
    x += 0.4 * _filt(_noise(len(t)), "bandpass", [500, 2500]) * _decay(len(t), 0.006)
    return _fade(x, 0.0005, 0.02)


def creak(dur=1.3, f0=180):
    t = _t(dur)
    wob = f0 * (1 + 0.35 * np.sin(2 * np.pi * 2.2 * t) + 0.5 * t / dur) + 30 * _filt(_noise(len(t)), "lowpass", 40)
    ph = 2 * np.pi * np.cumsum(wob) / SR
    x = signal.sawtooth(ph) * 0.5 + 0.5 * np.sin(ph * 3.1)
    x = _filt(x, "bandpass", [300, 1800])
    pulses = (0.5 + 0.5 * np.sin(2 * np.pi * 14 * t)) ** 2
    env = np.sin(np.pi * t / dur) ** 1.2
    return _fade(x * pulses * env, 0.02, 0.05)


def footsteps(steps=4, interval=0.52, dur=None):
    total = dur or interval * steps + 0.3
    buf = np.zeros(int(total * SR))
    for i in range(steps):
        n = int(0.16 * SR)
        s = _filt(_noise(n), "lowpass", 700 + 200 * (i % 2)) * _decay(n, 0.035)
        s += 0.8 * np.sin(2 * np.pi * (85 + 10 * (i % 2)) * np.arange(n) / SR) * _decay(n, 0.04)
        _place(buf, _fade(s, 0.001, 0.02) * (0.85 + 0.15 * ((i + 1) % 2)), i * interval)
    return buf


def dirt_fall(dur=1.4):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    x = _filt(_noise(n), "bandpass", [300, 3500])
    grains = (_rng.random(n) < (0.02 + 0.03 * (1 - t))).astype(float)
    grains = np.convolve(grains, _decay(600, 0.004), mode="same")
    env = np.minimum(1, t * 8) * (1 - t) ** 0.8
    thud = _filt(_noise(n), "lowpass", 160) * _decay(n, 0.25) * 0.8
    return _fade(x * (0.25 + 2.5 * grains) * env + thud * 0.5, 0.01, 0.1)


def beep(dur=0.18, f=1000):
    t = _t(dur)
    x = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + np.sin(2 * np.pi * f * t) * 0.6
    return _fade(x, 0.003, 0.01)


def ticktock(ticks=4, interval=0.5, dur=None):
    total = dur or interval * ticks + 0.2
    buf = np.zeros(int(total * SR))
    for i in range(ticks):
        n = int(0.05 * SR)
        f = 2300 if i % 2 == 0 else 1700
        c = (_filt(_noise(n), "bandpass", [f * 0.8, f * 1.2]) * _decay(n, 0.006)
             + 0.5 * np.sin(2 * np.pi * f * np.arange(n) / SR) * _decay(n, 0.01))
        _place(buf, _fade(c, 0.0003, 0.005), i * interval)
    return buf


def drone(dur=6.0, f0=55):
    t = _t(dur)
    x = np.zeros(len(t))
    for r, a, d in ((1, 1.0, 0.0), (2.003, 0.5, 0.7), (3.01, 0.25, 1.3), (0.5, 0.6, 0.4)):
        x += a * np.sin(2 * np.pi * f0 * r * t + d + 0.8 * np.sin(2 * np.pi * (0.1 + 0.05 * r) * t))
    x = _filt(x, "lowpass", 600)
    env = np.minimum(1, t / 1.5) * np.minimum(1, (dur - t) / 1.5)
    return x * env


def chord(dur=3.0, root=220, ratios=(1.0, 1.2, 1.5), attack=0.05):
    t = _t(dur)
    x = np.zeros(len(t))
    for r in ratios:
        for dt, a in ((-0.4, 0.6), (0.0, 1.0), (0.5, 0.6)):
            f = root * r + dt
            x += a * (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) * _decay(len(t), 1.2))
    x = _filt(x, "lowpass", 3500)
    env = np.minimum(1, t / attack) * np.exp(-t / (dur * 0.6))
    return _fade(x * env, 0.002, 0.15)


FX = {
    "pop": pop, "whoosh": whoosh, "impact": impact, "click": click, "heartbeat": heartbeat,
    "shimmer": shimmer, "wood_knock": wood_knock, "creak": creak, "footsteps": footsteps,
    "dirt_fall": dirt_fall, "beep": beep, "ticktock": ticktock, "drone": drone, "chord": chord,
}


def fx(name, **kw):
    """Efeito pelo nome, normalizado pelo pico (±1)."""
    if name not in FX:
        raise KeyError(f"efeito desconhecido: {name}. Disponíveis: {', '.join(FX)}")
    return _norm(FX[name](**kw))


# ----------------------------------------------------------------- música de fundo
def music_bed(duration, root=55.0, chord_ratios=(1.0, 1.2, 1.5), pulse=0.0, fade_in=2.0, fade_out=3.0):
    """Pad contínuo (drone + acorde lento). pulse>0 adiciona batida suave a 'pulse' Hz."""
    t = _t(duration)
    x = np.zeros(len(t))
    for r in chord_ratios:
        for dt, a in ((-0.3, 0.7), (0.0, 1.0), (0.4, 0.7)):
            f = root * 2 * r + dt
            x += a * np.sin(2 * np.pi * f * t + 0.9 * np.sin(2 * np.pi * 0.07 * t + r))
    x += 1.2 * np.sin(2 * np.pi * root * t)
    x = _filt(x, "lowpass", 1400)
    x *= 0.8 + 0.2 * np.sin(2 * np.pi * 0.11 * t)
    if pulse > 0:
        x *= 0.75 + 0.25 * (0.5 + 0.5 * np.sin(2 * np.pi * pulse * t)) ** 3
    env = np.minimum(1, t / max(fade_in, 1e-3)) * np.minimum(1, (duration - t) / max(fade_out, 1e-3))
    return _norm(x * env)


# ----------------------------------------------------------------- mixagem
def read_audio(path, sr=SR):
    """Lê qualquer áudio via FFmpeg -> float32 mono em sr."""
    p = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                       capture_output=True)
    if p.returncode != 0:
        sys.exit("ffmpeg falhou:\n" + p.stderr.decode(errors="ignore"))
    return np.frombuffer(p.stdout, dtype=np.float32).copy()


def soft_limit(x, ceiling=0.89, knee=0.6):
    """Limitador suave: linear até 'knee', depois tanh até 'ceiling'."""
    ax = np.abs(x)
    over = ax > knee
    y = x.copy()
    y[over] = np.sign(x[over]) * (knee + (ceiling - knee) * np.tanh((ax[over] - knee) / (ceiling - knee)))
    return y


def _voice_envelope(voice, win=0.05):
    n = max(1, int(win * SR))
    e = np.sqrt(np.convolve(voice ** 2, np.ones(n) / n, mode="same"))
    ref = np.percentile(e[e > 1e-4], 90) if np.any(e > 1e-4) else 1.0
    return np.clip(e / ref, 0, 1)


def mix(voice, events=None, music=None, duration=None, duck=0.55):
    """voice: array float mono em SR. events: lista [{t, fx, gain, args}].
    music: dict (root, chord, level, pulse, fade_in, fade_out) ou None.
    Retorna array float32 mono em SR (já limitado, pico <= ~0.89)."""
    duration = duration or len(voice) / SR
    n = int(duration * SR)
    v = np.zeros(n, dtype=np.float64)
    v[: min(n, len(voice))] = voice[:n]
    vpk = np.max(np.abs(v)) or 1.0
    v = v / vpk * 0.80                                    # voz com pico em 0,80

    out = v.copy()

    # efeitos: cada um normalizado pelo pico; "gain" é relativo ao pico da voz (padrão 0,16)
    sfx = np.zeros(n)
    for ev in (events or []):
        w = fx(ev["fx"], **ev.get("args", {}))
        _place(sfx, w.astype(np.float64) * 0.80 * float(ev.get("gain", 0.16)), float(ev["t"]))
    out += sfx

    if music:
        m = music_bed(duration, music.get("root", 55.0), tuple(music.get("chord", (1.0, 1.2, 1.5))),
                      music.get("pulse", 0.0), music.get("fade_in", 2.0), music.get("fade_out", 3.0))
        env = _voice_envelope(v)
        # a música abaixa quando a voz fala (ataque rápido, soltura lenta)
        sos = signal.butter(1, 2.5, btype="low", fs=SR, output="sos")
        env = np.clip(signal.sosfilt(sos, env), 0, 1)
        gain_curve = 1.0 - duck * env
        out += m.astype(np.float64) * 0.80 * float(music.get("level", 0.10)) * gain_curve

    return soft_limit(out).astype(np.float32)


def write_wav(path, x, sr=SR):
    wavfile.write(path, sr, (np.clip(x, -1, 1) * 32767).astype(np.int16))


def mix_to_file(voice_path, events_path, out_path, duration=None):
    voice = read_audio(voice_path)
    cfg = {}
    if events_path and os.path.exists(events_path):
        with open(events_path, encoding="utf-8") as f:
            cfg = json.load(f)
    y = mix(voice, cfg.get("events"), cfg.get("music"), duration)
    write_wav(out_path, y)
    pk = 20 * np.log10(np.max(np.abs(y)) + 1e-9)
    rms = 20 * np.log10(np.sqrt(np.mean(y.astype(np.float64) ** 2)) + 1e-9)
    print(f"{out_path}: {len(y) / SR:.2f}s, pico {pk:.1f} dBFS, RMS {rms:.1f} dBFS, "
          f"{len(cfg.get('events', []))} efeitos, música {'sim' if cfg.get('music') else 'não'}")
    return y


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    d = sub.add_parser("demo", help="grava todos os efeitos em WAV")
    d.add_argument("--out", default="fx_demo")
    m = sub.add_parser("mix", help="mixa voz + efeitos + música")
    m.add_argument("--voice", required=True)
    m.add_argument("--events", default=None)
    m.add_argument("--out", required=True)
    m.add_argument("--duration", type=float, default=None)
    a = ap.parse_args()
    if a.cmd == "demo":
        os.makedirs(a.out, exist_ok=True)
        for name in FX:
            w = fx(name)
            write_wav(os.path.join(a.out, name + ".wav"), w * 0.9)
            print(f"{name:11s} {len(w) / SR:5.2f}s  pico {np.max(np.abs(w)):.2f}")
        write_wav(os.path.join(a.out, "music_bed.wav"), music_bed(8.0) * 0.5)
    else:
        mix_to_file(a.voice, a.events, a.out, a.duration)


if __name__ == "__main__":
    main()
