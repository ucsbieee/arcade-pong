
/* pong.js */
var initialized = false;

const   leftPaddle_x    = 60;
var     leftPaddle_y    = 30;
var     leftScore       = 0;

const   rightPaddle_x   = 90;
var     rightPaddle_y   = 30;
var     rightScore      = 0;

var     ball_xp         = 30;
var     ball_xv         = 0;
var     ball_yp         = 34;
var     ball_yv         = 0;

const   ball_PMFA       = 0;
const   paddle_PMFA     = 1;

const   ball_o          = 0;
const   paddle1top_o    = 1;
const   paddle1bottom_o = 2;
const   paddle2top_o    = 3;
const   paddle2bottom_o = 4;

// fill OBM with paddle sprites
function draw_paddles() {
    OBM_setAddr( paddle1top_o, paddle_PMFA );
    OBM_setColor( paddle1top_o, 7 );
    OBM_setX( paddle1top_o, leftPaddle_x );
    OBM_setY( paddle1top_o, leftPaddle_y );
    OBM_setVFlip( paddle1top_o, true );
    OBM_setHFlip( paddle1top_o, true );

    OBM_setAddr( paddle1bottom_o, paddle_PMFA );
    OBM_setColor( paddle1bottom_o, 7 );
    OBM_setX( paddle1bottom_o, leftPaddle_x );
    OBM_setY( paddle1bottom_o, leftPaddle_y+8 );
    OBM_setHFlip( paddle1bottom_o, true );

    OBM_setAddr( paddle2top_o, paddle_PMFA );
    OBM_setColor( paddle2top_o, 7 );
    OBM_setX( paddle2top_o, rightPaddle_x );
    OBM_setY( paddle2top_o, rightPaddle_y );
    OBM_setVFlip( paddle2top_o, true );

    OBM_setAddr( paddle2bottom_o, paddle_PMFA );
    OBM_setColor( paddle2bottom_o, 7 );
    OBM_setX( paddle2bottom_o, rightPaddle_x );
    OBM_setY( paddle2bottom_o, rightPaddle_y+8 );
}

// fill OBM with ball sprite
function draw_ball() {
    OBM_setAddr( ball_o, ball_PMFA );
    OBM_setColor( ball_o, 7 );
    OBM_setX( ball_o, ball_xp );
    OBM_setY( ball_o, ball_yp );
}

// fill NTBL with number_edge and number_corner tiles
function draw_scores() {

}



function updatePPU() {
    if (initialized) return;
    reset();
    draw_ball();
    draw_paddles();
    initialized = true;
}

function reset() {
    // update VRAM
    VRAM_RESET();
    console.log("reseting!");

    // ball
    PMF[ 0] = 0b00001111; PMF[ 1] = 0b11110000;
    PMF[ 2] = 0b00111111; PMF[ 3] = 0b11111100;
    PMF[ 4] = 0b11111111; PMF[ 5] = 0b11111111;
    PMF[ 6] = 0b11111111; PMF[ 7] = 0b11111111;
    PMF[ 8] = 0b11111111; PMF[ 9] = 0b11111111;
    PMF[10] = 0b11111111; PMF[11] = 0b11111111;
    PMF[12] = 0b00111111; PMF[13] = 0b11111100;
    PMF[14] = 0b00001111; PMF[15] = 0b11110000;

    // paddle
    PMF[16] = 0b11111111; PMF[17] = 0b11000000;
    PMF[18] = 0b11111111; PMF[19] = 0b11000000;
    PMF[20] = 0b11111111; PMF[21] = 0b11000000;
    PMF[22] = 0b11111111; PMF[23] = 0b11000000;
    PMF[24] = 0b11111111; PMF[25] = 0b11000000;
    PMF[26] = 0b11111111; PMF[27] = 0b00000000;
    PMF[28] = 0b11111111; PMF[29] = 0b00000000;
    PMF[30] = 0b00111100; PMF[31] = 0b00000000;

    NTBL_Color1 = 0;
    NTBL_Color2 = 0;
}
