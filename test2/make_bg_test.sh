export GBDKDIR=/opt/gbdk/
/opt/gbdk/bin/lcc -Wa-l -Wl-m -Wl-j -c -o main.o main.c
/opt/gbdk/bin/lcc -Wa-l -Wl-m -Wl-j -o main.gb main.o
gngb --filter 2 main.gb
