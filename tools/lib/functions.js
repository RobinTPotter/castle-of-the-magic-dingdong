
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

var current_sprite_canvas
var current_map_canvas

var current_tile_index=0
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
    current_sprite_index = current_sprites.length-1
    sprite = current_sprites[current_sprite_index]
    
}

//function update_map(element, object) {
//    var ctx = element.node().getContext("2d")
//    ctx.drawImage(sprite_list_canvas, current_tile_index*8,0,8,8,0, 0,8,8);/
//}

//function update_sprite(element, object) {
// /   console.log(element.node(), object)
//    var ctx = element.node().getContext("2d")
//    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
//}

function update_sprite_canvases() {
    ss.each(function(d,i) {
        var ctx=this.getContext("2d")
        ctx.drawImage(colour_list_canvas,d.value*8,0,8,8,0,0,8,8)
    })         
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
        .style('width',`${SW * SCHO+2}px`)
        .style('height',`${SH * SCHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)

    d3.select('body').append('input')
        .attr('id','new_sprite_button')
        .attr('type','button')
        .on('click',add_new_sprite)

    current_sprite_canvas = d3.select('body').append('canvas')
        .attr('id','current_sprite_canvas')
        .style('width',`${SW * SCHO}px`)
        .style('height',`${SH * SCHO}px`)
        .style('position','absolute')

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
        .style('width',`${W * CHO+2}px`)
        .style('height',`${H * CHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)

    current_map_canvas = d3.select('body').append('canvas')
        .attr('id','current_map_canvas')
        .style('width',`${W * CHO}px`)
        .style('height',`${H * CHO}px`)
        .style('position','absolute')
        .on('mousedown', function() {
            console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/CHO))
            cy=Math.abs(Math.floor(my/CHO))
            cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
            console.log(cx,cy,cell)
            cell.value=current_tile_index
            update_map_canvas()            
        })

}

function update_map_canvas() {
    current_map.forEach(function(cell) {
        console.log(cell)
        //    var ctx = element.node().getContext("2d")
        //    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        var ctx = current_map_canvas.node().getContext("2d")
        ctx.drawImage(sprite_list_canvas, cell.value * 8, 0, 8, 8, cell.x*CHO, cell.y*CHO,8,8);

    })


}

function setup_map_ui_action() {

    //set up ui actions
    d3.select('#tiles').on('mouseup', function() {
        //console.log(current_tile_index)
        current_tile_index++
        if (current_tile_index==max_tiles) current_tile_index=0
        var ctx = document.getElementById('current_tile').getContext('2d')
        ctx.drawImage(tiles, current_tile_index*8, 0, 8, 8,
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

    map_offset_x = map_edge_selection.node().offsetLeft + 2
    map_offset_y = map_edge_selection.node().offsetTop + 2
    
    sprite_offset_x = sprite_edge_selection.node().offsetLeft + 2
    sprite_offset_y = sprite_edge_selection.node().offsetTop + 2

    initialize_map()

    current_sprite_canvas.style('top',`${sprite_offset_y}px`)
    current_sprite_canvas.style('left',`${sprite_offset_x}px`)
    current_map_canvas.style('top',`${map_offset_y}px`)
    current_map_canvas.style('left',`${map_offset_x}px`)

    //create map cells  


    //create sprite colour cells
    sprite = current_sprites[current_sprite_index]

}