#!/bin/bash

# Check for updates
aur=`yay -Qua | wc -l`
official=`checkupdates | wc -l`

# Count the number of updates
upd=$(( official + aur ))
echo "$upd"
