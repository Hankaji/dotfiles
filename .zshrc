# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
source "$HOME/.zshenv"

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME=""

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
HIST_STAMPS="dd/mm/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-autosuggestions zsh-autocomplete zsh-syntax-highlighting auto-notify direnv)
source $ZSH/oh-my-zsh.sh

# -------------------------------------------------
# User configuration
# -------------------------------------------------

# Starship
eval "$(starship init zsh)"

# Zsh autocomplete
# Make <LeftArrow> and <RightArrow> move cursor instead of selection on menu
bindkey -M menuselect  '^[[D' .backward-char  '^[OD' .backward-char
bindkey -M menuselect  '^[[C'  .forward-char  '^[OC'  .forward-char

# Make <Enter> submit command instead of confirm command
bindkey -M menuselect '^M' .accept-line

# In case a command is not found, try to find the package that has it
#function command_not_found_handler {
#    local purple='\e[1;35m' bright='\e[0;1m' green='\e[1;32m' reset='\e[0m'
#    printf 'zsh: command not found: %s\n' "$1"
#    local entries=( ${(f)"$(/usr/bin/pacman -F --machinereadable -- "/usr/bin/$1")"} )
#    if (( ${#entries[@]} )) ; then
#        printf "${bright}$1${reset} may be found in the following packages:\n"
#        local pkg
#        for entry in "${entries[@]}" ; do
#            local fields=( ${(0)entry} )
#            if [[ "$pkg" != "${fields[2]}" ]] ; then
#                printf "${purple}%s/${bright}%s ${green}%s${reset}\n" "${fields[1]}" "${fields[2]}" "${fields[3]}"
#            fi
#            printf '    /%s\n' "${fields[4]}"
#            pkg="${fields[2]}"
#        done
#    fi
#    return 127
#}

aurhelper="paru"

function in {
    local pkg="$1"
    if pacman -Si "$pkg" &>/dev/null ; then
        sudo pacman -S "$pkg"
    else 
        $aurhelper -S "$pkg"
    fi
}

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='nvim'
fi

# Compilation flags
export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
alias nzcfg="z ~/.config/nvims/lazyvim/ && nz ."
alias zshrc="nz ~/.zshrc && source ~/.zshrc"
alias neo="neo-matrix"
alias vc="code --disable-gpu"
# alias cd="z"
alias icat="kitty icat"
alias kssh="kitten ssh"
alias cw="~/.config/hypr/scripts/swww_change_wpaper.sh"
alias lg="lazygit"
alias zlj="zellij"
alias pls="sudo"
alias q="exit"
alias se="sudoedit"
alias clr="clear"
alias task="go-task"
alias pwdcp="pwd | tr -d '\n' | clipcopy"
# alias vc="code --ozone-platform-hint=wayland --disable-gpu"

alias nv="nvim"
alias nz="NVIM_APPNAME=nvims/lazyvim nvim"
alias nc="NVIM_APPNAME=nvims/nvchad nvim"
alias gdv="nz . --listen ./godothost"

alias un='$aurhelper -Rns' # uninstall package
alias up='$aurhelper -Syu' # update system/package/aur
alias pl='$aurhelper -Qs' # list installed package
alias ps='$aurhelper -Ss' # search for availabe package
alias pc='$aurhelper -Sc' # remove unused cache
alias po='$aurhelper -Qtdq | $aurhelper -Rns -' # remove unused packages, also try > $aurhelper -Qqd | $aurhelper -Rsu --print -

# Handy change dir shortcuts
alias ..='z ..'
alias ...='z ../..'
alias .3='z ../../..'
alias .4='z ../../../..'
alias .5='z ../../../../..'

alias ls='eza -lT -L 1 --icons --git-ignore --hyperlink --no-filesize --no-user --no-permissions --no-time'

# Play Bell sound on passwd prompt
export SUDO_PROMPT=$'\a[sudo] password for %p: '

# Local binaries
export PATH="$HOME/.local/bin/:$PATH"

# Display pokemon
source /home/hankaji/.zsh/scripts/startup-display.sh

# Set default editor
function editor { NVIM_APPNAME=nvims/lazyvim nvim $@ }
export SUDO_EDITOR='editor'
export EDITOR='editor'

# The fuck
eval "$(thefuck --alias)"

# Zoxide
eval "$(zoxide init zsh)"

# bun completions
[ -s "/home/hankaji/.bun/_bun" ] && source "/home/hankaji/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Pyenv
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Jenv (Java environment manager)
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"

export PATH=$PATH:/home/hankaji/.spicetify

# Add .NET Core SDK tools
# export DOTNET_ROOT=$HOME/.dotnet
# export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools

# Flutter
export PATH="$HOME/development/flutter/bin:$PATH"

# Add Android command line tools
# export ANDROID_SDK_ROOT=/opt/android-sdk
export ANDROID_HOME=/opt/android-sdk
export ANDROID_AVD_HOME=$HOME/.android/avd
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin/
export PATH=$PATH:$ANDROID_HOME/platform-tools/
export PATH=$PATH:$ANDROID_HOME/tools/bin/
export PATH=$PATH:$ANDROID_HOME/emulator/
export PATH=$PATH:$ANDROID_HOME/tools/

# Paru configuration
export PARU_CONF="$HOME/.config/paru/paru.conf"

# Tex live
export PATH="/usr/local/texlive/2024/bin/x86_64-linux:$PATH"

# Don't know what is this but just commented out for safe
# . "$HOME/.local/share/../bin/env"

# uv - Python package manager (Written in rust)
# eval "$(uv generate-shell-completion zsh)"
eval "$(uvx --generate-shell-completion zsh)"

# GCR SSH
export SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/gcr/ssh"
