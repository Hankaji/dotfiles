#!/usr/bin/bash

ask_question() {
    echo "$1 (Y/n):"

    local answer=read -r answer

    if [[ "$answer" == "Y" || "$answer" == "y" || -z "$answer" ]]; then
        return 0
    else
        return 1
    fi
}



if [ "$ask_question" ] ;then
    sudo pacman -S thunar
fi

# Thunar plugins: 
# pacman: gvfs gvfs-mtp thunar-archive-plugin thunar-volman ffmpegthumbnailer tumbler libgsf
# aur: tumbler-folder-thumbnailer
