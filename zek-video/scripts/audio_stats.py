#!/usr/bin/env python3
"""Peak, RMS and trailing-silence measurement for a WAV file.

Used by scripts/verify-output.mjs to confirm a rendered reel actually carries
audio, at a sane level, all the way to the end.
"""
import json
import sys
import wave

import numpy as np

with wave.open(sys.argv[1]) as w:
    sr = w.getframerate()
    n = w.getnframes()
    data = np.frombuffer(w.readframes(n), dtype="<i2").astype(float) / 32768.0

peak = float(np.max(np.abs(data))) if data.size else 0.0
rms = float(np.sqrt(np.mean(data ** 2))) if data.size else 0.0

# How long the tail is below -60 dBFS. A reel that ends on a fade should be
# under a second or so; several seconds means the bed ran out early.
mono = data.reshape(-1, 2).mean(axis=1) if data.size else np.array([0.0])
win = sr // 20 or 1
frames = mono[: len(mono) // win * win].reshape(-1, win)
loud = np.sqrt((frames ** 2).mean(axis=1)) > 10 ** (-60 / 20)
tail = 0.0
if loud.any():
    tail = (len(loud) - 1 - int(np.max(np.nonzero(loud)))) * win / sr

db = lambda v: round(20 * np.log10(v + 1e-12), 2)
print(json.dumps({
    "peakDb": db(peak),
    "rmsDb": db(rms),
    "durationSeconds": round(len(mono) / sr, 2),
    "silentTailSeconds": round(tail, 2),
}))
