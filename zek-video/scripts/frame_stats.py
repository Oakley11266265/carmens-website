#!/usr/bin/env python3
"""Reports blank frames and frozen runs for a directory of sampled frames.

Used by scripts/verify-output.mjs. A frame counts as blank when it is almost
uniformly one colour AND that colour is near-white or near-black; the hook
scenes are legitimately white pages with type on them, so uniformity alone is
not enough to fail.
"""
import glob
import json
import sys

import numpy as np
from PIL import Image

paths = sorted(glob.glob(f"{sys.argv[1]}/*.png"))
lumas, arrays = [], []
for p in paths:
    a = np.asarray(Image.open(p).convert("L"), dtype=float)
    arrays.append(a)
    lumas.append(a.mean())

blank = 0
for a in arrays:
    uniform = a.std() < 1.5
    extreme = a.mean() > 250 or a.mean() < 5
    if uniform and extreme:
        blank += 1

changes, run, max_run = 0, 0, 0
for i in range(1, len(arrays)):
    diff = float(np.abs(arrays[i] - arrays[i - 1]).mean())
    if diff > 0.35:
        changes += 1
        run = 0
    else:
        run += 1
        max_run = max(max_run, run)

print(json.dumps({
    "count": len(arrays),
    "blank": blank,
    "changes": changes,
    "maxFreeze": max_run,
    "meanLuma": float(np.mean(lumas)) if lumas else 0.0,
}))
