#include <gb/gb.h>
#include "map.c"
#include "sprites.c"

void main(){
    set_bkg_data(0, 4, SPRITES_);
    set_bkg_tiles(0, 0, 40, 40, MAP_NAME_);

    SHOW_BKG;
    DISPLAY_ON;

    while(1){
        scroll_bkg(0,0);
        delay(100);
    }
}
