#include <gb/gb.h>
#include "map40.c"
#include "tiles40.c"

void main(){
    set_bkg_data(0, 5, tiles);
    set_bkg_tiles(0, 0, 40, 40, map_part_1);

    SHOW_BKG;
    DISPLAY_ON;

    while(1){
        scroll_bkg(1,0);
        delay(100);
    }
}
