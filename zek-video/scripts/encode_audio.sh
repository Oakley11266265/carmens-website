#!/usr/bin/env bash
# Encode the synthesised WAVs in public/audio to .m4a (AAC) and remove the WAVs.
# Run after scripts/make_audio.py.
set -euo pipefail
cd "$(dirname "$0")/.."
shopt -s nullglob
for f in public/audio/*.wav; do
  out="${f%.wav}.m4a"
  npx remotion ffmpeg -y -loglevel error -f wav -i "$f" -c:a aac -b:a 192k -ar 48000 -ac 2 -f mp4 "$out"
  echo "encoded $out"
done
rm -f public/audio/*.wav
