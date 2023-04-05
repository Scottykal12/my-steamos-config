#!/bin/bash

sudo steamos-readonly disable

# Update 
flatpak update --noninteractive
sudo pacman -Syu --noconfirm
sudo pacman -S git --noconfirm

# set shell to fish
sudo chsh -s /usr/bin/fish

curl -L https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/install_release.sh | sh

cd Desktop
wget https://www.emudeck.com/EmuDeck.desktop
cd

git clone https://github.com/Scottykal12/my-steamos-config.git
cd my-steamos-config

for i in $(cat flatpaks); do
    flatpak install $i --noninteractive
done

# AUR support via yay
sudo pacman -S --needed base-devel git --noconfirm
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# decky plugins
# pull from current scp deck@192.168.1.8/home/deck/homebrew
cd ~/my-steamos-config
mv homebrew /home/deck/

# yay -S waydroid
# # memfd instead of ashmem_linux
