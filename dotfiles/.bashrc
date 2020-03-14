export EDITOR=vim

export PYWAL_WAYBAR=$HOME/.cache/wal/colors-waybar.css
export WAYBAR_STYLE_RAW=$HOME/.config/waybar/raw_style.css
export WAYBAR_STYLE=$HOME/.config/waybar/style.css

export WALLPAPER_DIR=$HOME/pictures/wallpapers
export WALLPAPER_FILE=default

# clear and regenerate the pywal cache
function loadpaper(){
	wal -c
	wal -i $WALLPAPER_DIR/$WALLPAPER_FILE >/dev/null 2>&1;
}

# generate the full waybar style sheet, including pywal colors
function pywaybar(){
	cat $PYWAL_WAYBAR $WAYBAR_STYLE_RAW > $WAYBAR_STYLE
}

# set a wallpaper, reload pywal cache, and generate waybar styles
function setpaper(){
	cp $WALLPAPER_DIR/$1 $WALLPAPER_DIR/$WALLPAPER_FILE;
	loadpaper;
	pywaybar;
}

# '--user'-installed python modules
export PATH=/home/michael/.local/bin:$PATH

# alias support
if [ -f ~/.bash_aliases ]; then
	. ~/.bash_aliases
fi
