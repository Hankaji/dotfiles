# Dotfiles

This is the dotfiles for my configuration i used on Linux

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
$ cd ~/dotfiles
```

Then, use stow to start creating symlinks for dotfiles

```
$ stow .
```
