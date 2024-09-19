#!/bin/bash

# Randomly sort images in the directory and select the first one
function getImg() {
  # Get current wallpaper
  in_use_wpp=$(swww query | awk -F'image: ' '{print $2}' | head -1)
  find "$1" \( -name "*.png" -o -name "*.jpg" -o -name "*.gif" \) -not -path "$in_use_wpp" | sort -R | head -1
}

if [ -z "$1" ]; then
  image_source=$(getImg "$HOME/Pictures/wallpaper/")
else
  image_source=$1
fi

transition_type=center
transition_step=30
transition_fps=60
transition_pos=0.8,0.9

# Set the wallpaper
swww img "$image_source" --transition-type $transition_type --transition-step $transition_step --transition-fps $transition_fps --transition-pos $transition_pos
