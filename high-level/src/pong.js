
/* pong.js */


// start button value and posedge
var start_value = false;
var start_pedge = false;

// up button value and posedge
var up_value = false;
var up_pedge = false;

// down button value and posedge
var down_value = false;
var down_pedge = false;


const
const bot_velocity = 10;

class Pad {
    constructor() {
        this.xp = new Q11_4(32); // position
        this.yp = new Q11_4(128);
        this.xv = new Q11_4(0); // velocity
        this.yv = new Q11_4(0);
        this.height = 24; // my guess is this will become a bar
        this.width = 8;
        this.object = 0;
        OBM_setColor(this.object, 0b110);
    }
    move_up() {
        // if top of pad not touching top of screen
        // or if bottom of pad not touching bottom of screen
        
}

var pad_velocity = 0;
var ball_velocity = 0;

class Bot {
    constructor() {
        this.xp = new Q11_4(280);
        this.
    }
}
function updatePPU() {

}

function reset() {
    console.log("reseting!");

    // update VRAM
    VRAM_RESET();
}
