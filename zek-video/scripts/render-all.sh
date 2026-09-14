#!/usr/bin/env bash
#
# Renders the three finished reels and their cover images.
#
#   ./scripts/render-all.sh            # everything
#   ./scripts/render-all.sh Reel01-PhotosIntoFilm   # one composition
#
# Output lands in out/. H.264 video + AAC audio in an MP4 container, which is
# what Instagram, TikTok and YouTube all accept without re-encoding surprises.
set -euo pipefail
cd "$(dirname "$0")/.."

REELS=("Reel01-PhotosIntoFilm" "Reel02-UseWhatYouHave" "Reel03-OpeningShot")
if [ $# -gt 0 ]; then REELS=("$@"); fi

declare -A FILES=(
  ["Reel01-PhotosIntoFilm"]="zek-reel-01-photos-into-film"
  ["Reel02-UseWhatYouHave"]="zek-reel-02-use-what-you-have"
  ["Reel03-OpeningShot"]="zek-reel-03-opening-shot"
)

mkdir -p out
for id in "${REELS[@]}"; do
  name="${FILES[$id]:-$id}"
  echo "▸ $id → out/$name.mp4"
  npx remotion render "$id" "out/$name.mp4" \
    --codec=h264 \
    --crf=18 \
    --audio-codec=aac \
    --audio-bitrate=192k \
    --pixel-format=yuv420p \
    --log=error

  echo "▸ $id-Cover → out/$name-cover.jpg"
  npx remotion still "$id-Cover" "out/$name-cover.jpg" \
    --image-format=jpeg \
    --jpeg-quality=92 \
    --log=error
done
echo "Done."
