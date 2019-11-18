#include <gb/gb.h>
#include "res.c"

void main(){
    set_bkg_data(0, 4, spr);
    set_bkg_tiles(0, 0, 40, 40, map);

    SHOW_BKG;
    DISPLAY_ON;

    while(1){
        scroll_bkg(1,1);
        delay(100);
    }
}
