#!/usr/bin/env bash

killall -q polybar

while pgrep -u $UID -x polybar > /dev/null; do sleep 1; done

first_monitor=true

if type "xrandr"; then
  for m in $(xrandr --query | grep " connected" | cut -d" " -f1); do
    if $first_monitor; then
      MONITOR=$m polybar --reload main -c $HOME/.config/polybar/config &
      first_monitor=false
    else
      MONITOR=$m polybar --reload secondary -c $HOME/.config/polybar/config &
    fi
  done
else
  polybar --reload main -c $HOME/.config/polybar/config &
fi

echo "polybars launched"
