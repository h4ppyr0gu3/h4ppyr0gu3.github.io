---
layout: single
title: My Setup
toc: true
---
# My Setup (and the path to creating it)

## Introduction

The reason I love linux so much is that once you set it up once or automate it once it is not going to be an issue in the future (Considering well tested scripts or not 1 am scripts written on the verge of blacking out from sleep deprivation) 

## The tools I use 

Contrary to popular opinion the oldest tools are the best and the specific tool i am referring to when saying this is vim and in general any application or interface controlled by a dot-file as once the configuration is set to your preferences and specification it is the same accross multiple machines and so they all feel like home
in my specific case I prefer neovim not because I have the knowledge to contribute to the source code but because I know that if I had to it would be possible and the code would be audited by more than one person (and it would actually be possible) as well as the fact that the experience and setup are very similar to that of vim so after going through the vimtutor you feel comfortable on either vim or neovim. Another reason to love vim (referring to the concept of both vim and neovim) is that in combination with asciinema it can be a very powerful tool to teach begginers or to be able to share my thought process with others but especially for tutorial hosted on my blog [site](http://localhost:3000) 

ZSH is another tool I wouldn't be able to live without as it adds so many desirable features to the terminal which we interact with so often due to its plugin ecosystem

I think a very important thing for every individual is to also develop key combinations which only they know, I feel this is the real password to your laptop especially if you are using a window manager with customized key combinations, however, at the moment i prefer GNOME's keypad gestures and i have become familiar with the settings and plugins i use

## The power of shell scripting

I have reinstalled my Distro multiple times because as one tinkers they end up touching something they weren't ready for resulting in getting burned by the creators who look down at us with empathy for our feeble minds getting over confident after having installed linux and thinking it is our rite to the knowledge the creators possessed. Any way, the problem remains, my system is reinstalled and feels absolutely naked as you key the wrong combination for the 100th time as you reach for the familiarity you created with your tools, the solution is simple, record each and every distinguishable feature on your machine and write a script to download, install and set the values you prefer. 
Being able to run remote scripts means you don't even have to pull your repo from wherever it is hosted to run it (but remeber to refer to remote paths when referring to copying files such as a dot-file which is located remotely).... And after running this singular command and possibly a reboot later you have a house that feels like a home.

## Lets get to the script already 

A few things I like to have setup 
- sirula application launcer
- sway window manager
- ly login and display manager
- slack
- vim
    - neovim
    - ctags
- languages
    - ruby (with rbenv for version management)
    - crystal
- development environment
    - git
    - docker
    - postman
- aesthetic improvements
    - icon pack
    - font
    - wallpapers
- browser with bookmarks
- installed packages
    - document viewers
    - media player
    - office suite
    - hdparm
- latest kernel
- bootloader

NB: This script should be able to handle both server side install and local install and so must accept arguments 

Having told our shell script how to execute we can now get to the installation of the script which we expect to handle 2 flags namely `-d/--desktop` or `-s/--server`
however there are certain applications which we would like to have on both desktops and servers so to decide where to put these in the script will depend on the dependencies we will install before hand
I am going to start with the development environment i would like which we will add flags for for each different language we would like to install
The idea behind this is that if we have microservices you can create a seperate node with only the rewuired dependencies so that there is no unnecessary storage space taken up
Before we get to a finalized script lets decide how we are going to install each of our requirements after which we will refine the script to handle our flags

### Ruby

``` bash
# execute commands as root so that we don't have to call sudo throughout the script

sudo su

# install ruby with rbenv following the digital ocean blog: https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-20-04
# first install all dependencies

apt update
apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev

# pull the and run rbenv installer script

curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# add rbenv to the path in shell and make it so that it runs on every shell startup

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# install ruby-build so that the latest versions of ruby are available through rbenv

git clone https://github.com/rbenv/ruby-build.git
PREFIX=/usr/local ./ruby-build/install.sh

# install ruby version specified in command line arguments or latest and install bundler gem

rbenv install 3.0.2
gem install bundler
```  

### Sirula
``` bash
# dependencies
# gtk shell layer and related dependencies
sudo apt install meson libwayland-dev libgtk-3-dev gobject-introspection libgirepository1.0-dev gtk-doc-tools valac

git clone git@github.com:wmww/gtk-layer-shell.git 

meson build -Dexamples=true -Ddocs=true -Dtests=true
ninja -C build
sudo ninja -C build install
sudo ldconfig

# install serula chmod and move binary
git clone git@github.com:DorianRudolph/sirula.git
cargo build --release
cp -r ./sample-config/c/ ~/.config/sirula/
cp ./target/release/sirula /usr/bin/sirula && chmod 555 /usr/bin/sirula
```

### Vim/Nvim (I will use neovim in my case)

``` bash
# vim and nvim are in the repository if not already installed

apt install neovim

# copy our configuration file from setup repo

curl -o $HOME/.config/nvim/init.vim github-url-here-for-nvim-init.vim-file
```

### ZSH

``` bash
# install ZSH

sudo apt install zsh

# install oh-my-zsh instruction taken from https://github.com/ohmyzsh/ohmyzsh#unattended-install

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
```

### ly

``` bash
git clone --recurse-submodules https://github.com/nullgemm/ly.git
make
sudo make install
sudo systemctl enable ly.service
sudo systemctl disable getty@tty2.service
```   

### Keeping the configuration files up to date accross multiple machines

Rsync is a great tool to sync files from remote servers so if we have a server which we can store the configurations on we can set up a service which syncs the most recently modified file accross multiple machines and updates conigurations on sleep or boot
