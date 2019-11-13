#include <gb/gb.h>
#include "map.c"
#include "sprites.c"

void main(){
    set_bkg_data(0, 2, sprites);
    set_bkg_tiles(0, 0, 40, 40, map);

    SHOW_BKG;
    DISPLAY_ON;

    while(1){
        scroll_bkg(0,0);
        delay(100);
    }
}
