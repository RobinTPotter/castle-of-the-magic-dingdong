#include <gb/gb.h>
#include "map3.c"
#include "tiles3.c"

void main(){
    set_bkg_data(0, 3, tiles);
    set_bkg_tiles(0, 0, 120, 120, map);

    SHOW_BKG;
    DISPLAY_ON;

    while(1){
        scroll_bkg(1,0);
        delay(100);
    }
}
