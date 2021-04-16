
/* pong.js */

const   leftPaddle_x    = 0;
var     leftPaddle_y    = 0;
var     leftScore       = 0;

const   rightPaddle_x   = 0;
var     rightPaddle_y   = 0;
var     rightScore      = 0;

var     ball_xp         = 0;
var     ball_xv         = 0;
var     ball_yp         = 0;
var     ball_yv         = 0;

// fill OBM with paddle sprites
function draw_paddles() {

}
// fill OBM with ball sprite
function draw_ball() {

}
// fill NTBL with number_edge and number_corner tiles
function draw_scores() {

}



function updatePPU() {

}

function reset() {
    console.log("reseting!");

    // update VRAM
    VRAM_RESET();
}
