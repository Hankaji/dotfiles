#!/bin/bash

# set variables
chosenSetting=$(printf "Animation high\nDisable animation" | rofi -dmenu -p "Choose animation setting: " )
srcDir="${XDG_CONFIG_HOME:-$HOME/.config}/hypr"

# Check if animation.conf exist, else delete it
if [ -f $srcDir/animation.conf ]; then
    rm $srcDir/animation.conf
fi

# apply setting
case $chosenSetting in
    "Animation high")
        ln -s $srcDir/animations/animation-high.conf $srcDir/animation.conf
        ;;
    "Disable animation")
        ln -s $srcDir/animations/animation-none.conf $srcDir/animation.conf
        ;;
esac
