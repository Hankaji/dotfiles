# Dotfiles

This is the dotfiles for my configuration i used on Linux

# System

- OS: EndeavourOS Linux x86_64
- Kernel: 6.7.1-arch1-1
- Shell: Zsh
- Terminal: Kitty
- DE : Hyprland
    - Status bar: -to be added-
    - Notification: Dunst
    - File explorer: Dolphin
    - Musicplayer: mpd, ncmpcpp
    - Audio visualizer: cava

## Requirement

### Git

```
$ sudo pacman -S git
```

### stow

```
$ sudo pacman -S stow
```

## Installation

Check out the dotfiles in your $HOME directory

```
$ git clone https://github.com/Hankaji/dotfiles.git ~/.dotfiles
$ cd ~/.dotfiles
```

Then, use stow to start creating symlinks for dotfiles

```
$ stow .
```
