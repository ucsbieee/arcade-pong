
/* pong.js */
var initialized = false;

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
    if (initialized) return;
    reset();
    initialized = true;
}

function reset() {
    // update VRAM
    VRAM_RESET();
    console.log("reseting!");

    var ball = 0;
    PMF[ 0] = 0b00001111; PMF[ 1] = 0b11110000;
    PMF[ 2] = 0b00111111; PMF[ 3] = 0b11111100;
    PMF[ 4] = 0b11111111; PMF[ 5] = 0b11111111;
    PMF[ 6] = 0b11111111; PMF[ 7] = 0b11111111;
    PMF[ 8] = 0b11111111; PMF[ 9] = 0b11111111;
    PMF[10] = 0b11111111; PMF[11] = 0b11111111;
    PMF[12] = 0b00111111; PMF[13] = 0b11111100;
    PMF[14] = 0b00001111; PMF[15] = 0b11110000;

    var paddle = 1;
    PMF[16] = 0b11111111; PMF[17] = 0b11000000;
    PMF[18] = 0b11111111; PMF[19] = 0b11000000;
    PMF[20] = 0b11111111; PMF[21] = 0b11000000;
    PMF[22] = 0b11111111; PMF[23] = 0b11000000;
    PMF[24] = 0b11111111; PMF[25] = 0b11000000;
    PMF[26] = 0b11111111; PMF[27] = 0b00000000;
    PMF[28] = 0b11111111; PMF[29] = 0b00000000;
    PMF[30] = 0b00111100; PMF[31] = 0b00000000;


    let ball_object = 0;
    let paddletop_object = 1;
    let paddlebottom_object = 2;

    OBM_setAddr( ball_object, ball );
    OBM_setColor( ball_object, 7 );
    OBM_setX( ball_object, 30 );
    OBM_setY( ball_object, 30 );

    OBM_setAddr( paddletop_object, paddle );
    OBM_setColor( paddletop_object, 7 );
    OBM_setX( paddletop_object, 60 );
    OBM_setY( paddletop_object, 38 );

    OBM_setAddr( paddlebottom_object, paddle );
    OBM_setColor( paddlebottom_object, 7 );
    OBM_setX( paddlebottom_object, 60 );
    OBM_setY( paddlebottom_object, 30 );
    OBM_setVFlip( paddlebottom_object, true );

    NTBL_Color1 = 0;
    NTBL_Color2 = 0;
}
