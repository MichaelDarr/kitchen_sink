alias mirrorlist='curl -s "https://www.archlinux.org/mirrorlist/?country=US&protocol=https&use_mirror_status=on" | sed -e 's/^#Server/Server/' -e '/^#/d' | rankmirrors -n 5 -'
alias poly='~/.config/polybar/launch.sh >/dev/null 2>&1'
alias yayu='yay -Syu --noconfirm'
alias sysenabled='systemctl list-unit-files | grep enabled'
alias birthday='awk -F "[[ ]" '"'"'NR==1 {print $2;}'"'"' /var/log/pacman.log'
