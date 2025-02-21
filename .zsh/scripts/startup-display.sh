#!/bin/zsh

nscripts=2
rn=$(( $RANDOM % $nscripts ))

function getImg() {
  # Get random images
  find "$1" \( -name "*.png" -o -name "*.jpg" \) | sort -R | head -1
}

case $rn in
    0)  pokemon-colorscripts --no-title -r 1,3,6 | fastfetch --file-raw -;;
    1)  fastfetch --kitty $(getImg "$HOME/.config/fastfetch/pngs/") --logo-width 40;;
esac
