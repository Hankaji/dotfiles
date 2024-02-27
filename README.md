# Dotfiles

This is the dotfiles for my configuration i used on Linux

# System

- OS: EndeavourOS Linux x86_64
- Kernel: 6.7.1-arch1-1
- Shell: Zsh
- Terminal: Kitty
- DE : Hyprland
    - Status bar and widgets: [ags](https://github.com/Aylur/ags)
    - File explorer: Dolphin
    - Musicplayer: mpd, ncmpcpp
    - Audio visualizer: cava

## Requirement

- Git
- stow
- Zsh
- Oh-my-zsh
- Hyprland-git
    - Hyprlock-git
    - Hypridle-git
    - Hyprpicker-git
    - Hyprlang-git
- Kitty
- Neofetch
- 

### Arch Linux

```bash
$ pacman -S git stow zsh neofetch kitty

$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

$ yay -S hyprlang-git hyprland-git hypridle-git hyprlock-git hyprpicker-git cava
```

## Installation

Check out the dotfiles in your $HOME directory

```
$ git clone https://github.com/Hankaji/dotfiles.git ~/dotfiles
$ cd ~/dotfiles
```

Then, use stow to start creating symlinks for dotfiles

Use `$ stow .` or `$ stow --adopt .` to stow all the config files
