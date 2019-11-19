#include <gb/gb.h>
#include "res.c"
#include <stdio.h>

    UINT8 tick = 0;

void main(){
    set_bkg_data(0, 21, spr);
    set_bkg_tiles(0, 0, 32, 32, map);

    SHOW_BKG;
    DISPLAY_ON;


    while(1){

        scroll_bkg(1,0);

        if (tick % 2==0) scroll_bkg(0,1);

        delay(100);
        tick++;
        if (tick>200) tick=0;
    }
}
