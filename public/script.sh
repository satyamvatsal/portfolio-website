for f in *.png; do ffmpeg -i "$f" -q:v 80 "${f%.png}.webp"; done

