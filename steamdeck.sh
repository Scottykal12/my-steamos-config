#!/bin/bash

sudo steamos-readonly disable

# Update
sudo pacman -Syu --noconfirm
sudo pacman -S git --noconfirm

git clone https://github.com/Scottykal12/my-os-config.git

cd my-os-config

# set shell to fish
sudo chsh -s /usr/bin/fish

# AUR support via yay
sudo pacman -S --needed base-devel git --noconfirm
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# pull from current scp deck@192.168.1.8/home/deck/homebrew .
cp -r homebrew /home/deck/

# yay -S waydroid
# # memfd instead of ashmem_linux
