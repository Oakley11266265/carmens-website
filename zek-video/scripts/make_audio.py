#!/usr/bin/env python3
"""
ZEK Agency — original music + SFX generator.

Everything this script emits is synthesised from scratch (sine/saw/noise
oscillators, envelopes and a hand-rolled reverb). No sampled, licensed or
third-party audio is used, so the output is original work owned by ZEK Agency
and cleared for commercial promotional use.

Usage:  python3 scripts/make_audio.py
Output: public/audio/*.wav  (then encoded to .m4a by scripts/encode_audio.sh)
"""
import math
import os
import struct
import wave

import numpy as np

SR = 48000
BPM = 120.0
SPB = 60.0 / BPM          # 0.5 s per beat
BAR = SPB * 4             # 2.0 s per bar
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "audio")

# ---------------------------------------------------------------- utilities

def t(n):
    return np.arange(n) / SR


def env_ad(n, attack, decay, curve=2.0):
    """Attack/decay envelope, lengths in seconds."""
    a = max(1, int(attack * SR))
    d = max(1, int(decay * SR))
    e = np.zeros(n)
    a = min(a, n)
    e[:a] = np.linspace(0.0, 1.0, a) ** 0.6
    rest = n - a
    if rest > 0:
        d = min(d, rest)
        e[a:a + d] = np.linspace(1.0, 0.0, d) ** curve
    return e


def env_adsr(n, a, d, s, r):
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    s_n = max(0, n - a_n - d_n - r_n)
    parts = [
        np.linspace(0, 1, max(1, a_n)) ** 0.7,
        np.linspace(1, s, max(1, d_n)),
        np.full(s_n, s),
        np.linspace(s, 0, max(1, r_n)) ** 1.6,
    ]
    e = np.concatenate(parts)
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))


def onepole_lp(x, cutoff):
    """Cheap one-pole lowpass; cutoff may be scalar or per-sample array."""
    c = np.clip(np.asarray(cutoff, dtype=float) / (SR / 2.0), 1e-4, 0.99)
    alpha = 1.0 - np.exp(-2.0 * math.pi * c * 0.5)
    if alpha.ndim == 0:
        alpha = np.full(len(x), float(alpha))
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += alpha[i] * (x[i] - acc)
        y[i] = acc
    return y


def onepole_hp(x, cutoff):
    return x - onepole_lp(x, cutoff)


def saw(freq, n, phase=0.0):
    ph = (np.cumsum(np.full(n, freq / SR)) + phase) % 1.0
    return 2.0 * ph - 1.0


def sine(freq, n, phase=0.0):
    if np.isscalar(freq):
        return np.sin(2 * math.pi * freq * t(n) + phase)
    return np.sin(2 * math.pi * np.cumsum(freq) / SR + phase)


def tri(freq, n):
    return 2.0 * np.abs(2.0 * ((np.cumsum(np.full(n, freq / SR))) % 1.0) - 1.0) - 1.0


def noise(n, seed=0):
    return np.random.default_rng(seed).uniform(-1, 1, n)


def reverb(x, mix=0.3, decay=0.55, size=1.0):
    """Schroeder-style: 4 combs into 2 allpasses."""
    combs = [int(SR * d * size) for d in (0.0297, 0.0371, 0.0411, 0.0437)]
    wet = np.zeros(len(x) + max(combs) * 4)
    src = np.pad(x, (0, len(wet) - len(x)))
    for cd in combs:
        buf = np.zeros(len(wet))
        for i in range(len(wet)):
            v = src[i] + (buf[i - cd] * decay if i >= cd else 0.0)
            buf[i] = v
        wet += buf / len(combs)
    for ad, g in ((int(SR * 0.005), 0.7), (int(SR * 0.0017), 0.7)):
        out = np.zeros(len(wet))
        for i in range(len(wet)):
            d = wet[i - ad] if i >= ad else 0.0
            out[i] = -g * wet[i] + d + g * (out[i - ad] if i >= ad else 0.0)
        wet = out
    wet = wet[:len(x)]
    wet = onepole_lp(wet, 5200)
    return (1 - mix) * x + mix * wet * 0.6


def place(buf, sig, start_s, gain=1.0):
    s = int(start_s * SR)
    e = min(len(buf), s + len(sig))
    if s >= len(buf):
        return
    buf[s:e] += sig[:e - s] * gain


def note(name):
    """Scientific pitch -> Hz. e.g. 'A3', 'C#4', 'Eb2'."""
    semis = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
    n = name[0].upper()
    i = 1
    v = semis[n]
    while i < len(name) and name[i] in "#b":
        v += 1 if name[i] == "#" else -1
        i += 1
    octave = int(name[i:])
    midi = 12 * (octave + 1) + v
    return 440.0 * (2 ** ((midi - 69) / 12.0))


# ---------------------------------------------------------------- voices

def v_pad(freqs, dur, detune=0.006, bright=1200):
    n = int(dur * SR)
    out = np.zeros(n)
    for k, f in enumerate(freqs):
        for d in (-detune, 0.0, detune):
            out += saw(f * (1 + d), n, phase=(k * 0.13 + d * 40) % 1.0) * 0.33
    out /= max(1, len(freqs))
    cutoff = np.linspace(bright * 0.55, bright, n)
    out = onepole_lp(out, cutoff)
    return out * env_adsr(n, 0.35, 0.3, 0.75, min(0.9, dur * 0.45))


def v_pluck(freq, dur=0.55, timbre=0.5):
    n = int(dur * SR)
    body = tri(freq, n) * (1 - timbre) + sine(freq * 2, n) * timbre * 0.5 + sine(freq, n) * 0.6
    body = onepole_lp(body, 3400)
    return body * env_ad(n, 0.004, dur * 0.95, curve=2.6) * 0.5


def v_sub(freq, dur=0.9):
    n = int(dur * SR)
    return sine(freq, n) * env_adsr(n, 0.02, 0.15, 0.7, dur * 0.4) * 0.8


def v_kick(dur=0.5, f0=115.0, f1=42.0):
    n = int(dur * SR)
    sweep = f1 + (f0 - f1) * np.exp(-np.linspace(0, 1, n) * 9.0)
    body = sine(sweep / SR * SR, n) if False else np.sin(2 * math.pi * np.cumsum(sweep) / SR)
    click = noise(int(0.006 * SR), 7) * np.linspace(1, 0, int(0.006 * SR))
    out = body * env_ad(n, 0.001, dur, curve=2.4)
    out[:len(click)] += click * 0.35
    return out * 0.9


def v_hat(dur=0.06, seed=3, tone=9000):
    n = int(dur * SR)
    return onepole_hp(noise(n, seed), tone) * env_ad(n, 0.0005, dur, curve=3.2) * 0.35


def v_riser(dur=1.5, seed=11, f_start=300, f_end=7000):
    n = int(dur * SR)
    cut = np.linspace(f_start, f_end, n) ** 1.0
    body = onepole_hp(noise(n, seed), 400)
    body = onepole_lp(body, cut)
    return body * (np.linspace(0, 1, n) ** 2.2) * 0.5


def v_impact(dur=1.6):
    n = int(dur * SR)
    sweep = 38 + 120 * np.exp(-np.linspace(0, 1, n) * 14)
    body = np.sin(2 * math.pi * np.cumsum(sweep) / SR) * env_ad(n, 0.002, dur, curve=2.0)
    air = onepole_lp(noise(n, 21), np.linspace(4000, 300, n)) * env_ad(n, 0.001, dur * 0.5, curve=2.8)
    return (body * 0.9 + air * 0.35)


def v_whoosh(dur=0.55, seed=5, reverse=False):
    n = int(dur * SR)
    cut = np.linspace(600, 6000, n)
    if reverse:
        cut = cut[::-1]
    body = onepole_lp(onepole_hp(noise(n, seed), 300), cut)
    shape = np.sin(np.linspace(0, math.pi, n)) ** 1.6
    return body * shape * 0.45


def v_tick(dur=0.05, freq=2200, seed=13):
    n = int(dur * SR)
    return (sine(freq, n) * 0.5 + onepole_hp(noise(n, seed), 4000) * 0.5) * env_ad(n, 0.0004, dur, curve=4.0) * 0.5


# ---------------------------------------------------------------- master

def master(mono, peak_db=-1.5, drive=1.15):
    x = np.tanh(mono * drive) / math.tanh(drive)
    x = x - np.mean(x)
    peak = np.max(np.abs(x)) or 1.0
    target = 10 ** (peak_db / 20.0)
    return x * (target / peak)


def write_wav(path, left, right=None, bits=16):
    right = left if right is None else right
    n = min(len(left), len(right))
    inter = np.empty(n * 2)
    inter[0::2] = left[:n]
    inter[1::2] = right[:n]
    inter = np.clip(inter, -1.0, 1.0)
    data = (inter * (2 ** (bits - 1) - 1)).astype("<i2").tobytes()
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data)
    print(f"  {os.path.relpath(path)}  {n / SR:.2f}s")


def widen(mono, amount=0.012):
    d = int(amount * SR)
    left = mono.copy()
    right = np.concatenate([np.zeros(d), mono[:-d]]) if d else mono.copy()
    return left, right * 0.98


# ---------------------------------------------------------------- tracks
#
# All three beds run at 120 BPM: 0.5 s per beat, 2.0 s per bar.
# At 30 fps that is 15 frames per beat and 60 frames per bar, so every cut in
# the reels can be placed on a musical boundary.

CHORDS = {
    # name: (bass, [upper voices])
    "Am9":   ("A1",  ["A3", "C4", "E4", "B4"]),
    "Fmaj7": ("F1",  ["F3", "A3", "C4", "E4"]),
    "Cmaj9": ("C2",  ["C4", "E4", "G4", "D5"]),
    "G6":    ("G1",  ["G3", "B3", "D4", "E4"]),
    "Dm9":   ("D2",  ["D4", "F4", "A4", "E5"]),
    "Em7":   ("E1",  ["E3", "G3", "B3", "D4"]),
}


def build_bed(progression, bars, *, seed, groove_from, break_bars, brightness,
              arp_notes, hats=True, length_s=32.0):
    """One 32-second music bed.

    progression : list of chord names cycled two bars at a time
    groove_from : bar index where the kick/hats enter
    break_bars  : set of bar indices that drop the drums out (the process beat)
    """
    n = int(length_s * SR)
    pads = np.zeros(n)
    lows = np.zeros(n)
    tops = np.zeros(n)
    drums = np.zeros(n)

    rng = np.random.default_rng(seed)

    for bar in range(bars):
        start = bar * BAR
        chord = progression[(bar // 2) % len(progression)]
        bass_name, voices = CHORDS[chord]
        freqs = [note(v) for v in voices]

        # sustained pad, two bars per chord
        if bar % 2 == 0:
            place(pads, v_pad(freqs, BAR * 2 + 0.4, bright=brightness), start, 0.30)
        # bass
        place(lows, v_sub(note(bass_name), BAR * 0.95), start, 0.55)

        # arpeggio / pluck figure
        if bar >= 1:
            for beat, degree in enumerate(arp_notes):
                if degree is None:
                    continue
                f = freqs[degree % len(freqs)] * (2 if degree >= len(freqs) else 1)
                jitter = float(rng.uniform(-0.004, 0.004))
                place(tops, v_pluck(f, 0.5, timbre=0.35), start + beat * SPB + jitter,
                      0.36 if beat % 2 == 0 else 0.24)

        # drums
        if bar >= groove_from and bar not in break_bars:
            place(drums, v_kick(), start, 0.85)
            place(drums, v_kick(), start + SPB * 2, 0.72)
            if hats:
                for k in range(8):
                    place(drums, v_hat(seed=int(seed + k + bar)), start + k * SPB / 2,
                          0.22 if k % 2 else 0.30)

    pads = reverb(pads, mix=0.40, decay=0.60)
    tops = reverb(tops, mix=0.30, decay=0.52)
    mix = pads * 1.0 + lows * 1.0 + tops * 0.9 + drums * 0.85
    return mix


def main():
    print("Rendering ZEK music beds (original, synthesised in-house)…")

    # --- Bed A — "Reveal" (Reel 01). Sparse open, impact at 3 s, groove, break at 17 s.
    bed = build_bed(["Am9", "Fmaj7", "Cmaj9", "G6"], bars=16, seed=1,
                    groove_from=2, break_bars={9, 10, 11}, brightness=1500,
                    arp_notes=[0, None, 2, 1])
    place(bed, v_riser(2.6, seed=31), 0.4, 0.30)
    place(bed, v_impact(2.0), 3.0, 0.75)
    place(bed, v_impact(1.4), 17.0, 0.40)
    place(bed, v_riser(1.2, seed=33), 21.8, 0.26)
    place(bed, v_impact(2.2), 23.0, 0.60)
    l, r = widen(master(bed, -1.5))
    write_wav(os.path.join(OUT, "music-reveal.wav"), l, r)

    # --- Bed B — "Warm" (Reel 02). Softer, no hats until later, gentler impacts.
    bed = build_bed(["Cmaj9", "Am9", "Fmaj7", "G6"], bars=16, seed=2,
                    groove_from=3, break_bars={8, 9, 10}, brightness=1150,
                    arp_notes=[0, 2, None, 3])
    place(bed, v_riser(2.0, seed=41, f_end=5200), 1.0, 0.22)
    place(bed, v_impact(1.8), 3.0, 0.55)
    place(bed, v_impact(1.2), 16.0, 0.34)
    place(bed, v_impact(2.0), 22.0, 0.52)
    l, r = widen(master(bed, -1.5))
    write_wav(os.path.join(OUT, "music-warm.wav"), l, r)

    # --- Bed C — "Focus" (Reel 03). Tighter, more rhythmic, A/B comparison feel.
    bed = build_bed(["Dm9", "Am9", "Fmaj7", "Em7"], bars=16, seed=3,
                    groove_from=1, break_bars={10, 11}, brightness=1800,
                    arp_notes=[0, 1, 2, None])
    place(bed, v_riser(1.6, seed=51), 1.4, 0.26)
    place(bed, v_impact(1.6), 3.0, 0.62)
    place(bed, v_impact(1.2), 8.0, 0.40)
    place(bed, v_impact(1.2), 12.0, 0.40)
    place(bed, v_impact(2.0), 23.0, 0.58)
    l, r = widen(master(bed, -1.5))
    write_wav(os.path.join(OUT, "music-focus.wav"), l, r)

    # --- Sound effects (mono, short, used sparingly) -----------------------
    print("Rendering SFX…")
    sfx = {
        "sfx-whoosh.wav":  v_whoosh(0.55, seed=5),
        "sfx-swipe.wav":   v_whoosh(0.34, seed=9, reverse=True),
        "sfx-impact.wav":  v_impact(1.5),
        "sfx-tick.wav":    v_tick(0.06),
        "sfx-shutter.wav": np.concatenate([
            v_tick(0.03, 3200, seed=17) * 1.2,
            np.zeros(int(0.035 * SR)),
            v_tick(0.05, 1800, seed=19),
        ]),
        "sfx-riser.wav":   v_riser(1.4, seed=61),
    }
    for name, sig in sfx.items():
        sig = reverb(sig, mix=0.18, decay=0.4)
        l, r = widen(master(sig, -3.0, drive=1.0), amount=0.004)
        write_wav(os.path.join(OUT, name), l, r)

    print("Done.")


if __name__ == "__main__":
    main()
