
        var W = 20
        var H = 20
        var CHO = 8

        var SW = 8
        var SH = 8
        var SCHO = 8

        var sprite_list_canvas
        var map_offset_x 
        var map_offset_y   

        var colour_list_canvas
        var sprite_offset_x 
        var sprite_offset_y   

        var cs, ss

        var tile_index=0
        var max_tiles = 5
        var colour_index=0
        var max_colours = 4

        var  current_map = []
        var  current_sprites = []

        var current_sprite_index

        var map_edge_selection
        var sprite_edge_selection

        function create_blank_sprite() {
            var new_sprite = []
            for (var x=0;x<SW;x++) {
                for (var y=0;y<SH;y++) {
                    new_sprite.push({"x":x,"y":y, "value":0})
                }
            }
            return new_sprite
        }

        function add_new_sprite() {
            var new_spr = create_blank_sprite()
            current_sprites.push(new_spr)
            console.log("added new",current_sprites)
            sprite = current_sprites[current_sprites.length-1]
        }

        function update_map(element, object) {
            var ctx = element.node().getContext("2d")
            ctx.drawImage(sprite_list_canvas, tile_index*8,0,8,8,0, 0,8,8);
        }

        function update_sprite(element, object) {
            //console.log(element.node(), object)
            var ctx = element.node().getContext("2d")
            ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        }

        function update_sprite_canvases() {
            //console.log(sprite)
            //.style('border','solid')
            //.style('border-width','1px')          
        }
            
        function setup_sprite_ui() {

            d3.select('body').append('img')
                .attr('id','colours')
                .attr('src','colours.png')
                .attr('width','64')
                .attr('height','16')
                .style('border','solid')
                .style('border-width','1px')

            d3.select('body').append('canvas')
                .attr('id','current_colour')
                .attr('width','32')
                .attr('height','32')
                .style('border','solid')
                .style('border-width','1px')

            sprite_edge_selection = d3.select('body').append('div')
                .attr('id','sprite_edge')
                .style('border','solid')
                .style('border-width','1px')
                //.style('position','absolute')
                .style('width',`${SW * SCHO+3}px`)
                .style('height',`${SH * SCHO+3}px`)
                //.style('top',`${offset_y-2}px`)
                //.style('posleftition',`${offset_x-2}`)

            d3.select('body').append('input')
                .attr('id','new_sprite_button')
                .attr('type','button')
                .on('click',add_new_sprite)
        
        }

        function setup_map_ui() {
            d3.select('body').append('img')
                .attr('id','tiles')
                .attr('src','tiles.png')
                .attr('width','80')
                .attr('height','16')
                .style('border','solid')
                .style('border-width','1px')

            d3.select('body').append('canvas')
                .attr('id','current_tile')
                .attr('width','32')
                .attr('height','32')
                .style('border','solid')
                .style('border-width','1px')

            map_edge_selection = d3.select('body').append('div')
                .attr('id','map_edge')
                .style('border','solid')
                .style('border-width','1px')
                //.style('position','1px')
                .style('width',`${W * CHO+3}px`)
                .style('height',`${H * CHO+3}px`)
                //.style('top',`${offset_y-2}px`)
                //.style('posleftition',`${offset_x-2}`)

            }

        function setup_map_ui_action() {
   
            //set up ui actions
            d3.select('#tiles').on('mouseup', function() {
                //console.log(tile_index)
                tile_index++
                if (tile_index==max_tiles) tile_index=0
                var ctx = document.getElementById('current_tile').getContext('2d')
                ctx.drawImage(tiles, tile_index*8, 0, 8, 8,
                    0, 0, 32, 32)
            })
        }

        function setup_sprite_ui_action() {       

            d3.select('#colours').on('mouseup', function() {
                //console.log(colour_index)
                colour_index++
                if (colour_index==max_colours) colour_index=0
                var ctx = document.getElementById('current_colour').getContext('2d')
                ctx.drawImage(colours, colour_index*8, 0, 8, 8,
                    0, 0, 32, 32)
            })      


        }

        function initialize_map() {            
            //initialize map

            for (var x=0;x<W;x++) {
                for (var y=0;y<H;y++) {
                    current_map.push({"x":x,"y":y, "value":0})
                }
            }
        }

        function gogogo() {


            add_new_sprite()
            current_sprite_index = current_sprites.length-1

            setup_sprite_ui()    
            d3.select('body').append('br')
            setup_map_ui()
         
            setup_map_ui_action()
            setup_sprite_ui_action()

            //get elements for projecting colours and tile graphics to

            sprite_list_canvas = document.getElementById("tiles");
            colour_list_canvas = document.getElementById("colours");
            

            //get offsets for laying the canvas for tiles

            map_offset_x = map_edge_selection.node().offsetLeft + 1
            map_offset_y = map_edge_selection.node().offsetTop + 1
            
            sprite_offset_x = sprite_edge_selection.node().offsetLeft + 1
            sprite_offset_y = sprite_edge_selection.node().offsetTop + 1

            initialize_map()

            //create map cells

            cs = d3.select('body').selectAll('.cell').data(current_map).enter()

            cs
                .append('canvas')
                .attr('class','cell')
                .attr('width','8px')
                .attr('height','8px')
                .style('position','absolute')
                .style('top',function(d) { return `${ map_offset_y + CHO*d.y}px`})
                .style('left',function(d) { return `${ map_offset_x + CHO*d.x}px`})
                //.style('border','solid')
                //.style('border-width','1px')
                .on('mousedown', function(d,i) {
                    //disbale dragg
                    d3.event.preventDefault ? d3.event.preventDefault() : d3.event.returnValue = false
                    d.value=tile_index
                    if (d3.event.buttons==1) update_map(d3.select(this), d)
                })
                .on('mouseenter', function(d,i) {
                    //console.log("mounse enter", d3.event)
                    if (d3.event.buttons==1) {
                        d.value=tile_index
                        update_map(d3.select(this), d)
                    }
                })


            //create sprite colour cells

            ss = d3.select('body').selectAll('.spr_cell').data(sprite).enter()
                .append('canvas')
                .attr('class','spr_cell')
                .attr('width','8px')
                .attr('height','8px')
                .style('position','absolute')
                .style('top',function(d) { return `${ sprite_offset_y + SCHO*d.y}px`})
                .style('left',function(d) { return `${ sprite_offset_x + SCHO*d.x}px`})
                .on('mousedown', function(d,i) {
                    //disbale dragg
                    console.log('sprite mouse down')
                    d3.event.preventDefault ? d3.event.preventDefault() : d3.event.returnValue = false
                    d.value=colour_index
                    if (d3.event.buttons==1) update_sprite(d3.select(this), d)
                })
                .on('mouseenter', function(d,i) {
                    //console.log("mounse enter", d3.event)
                    if (d3.event.buttons==1) {
                        d.value=colour_index
                        update_sprite(d3.select(this), d)
                    }
                })
                
    
            }