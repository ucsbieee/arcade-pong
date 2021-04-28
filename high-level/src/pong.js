
/* pong.js */
var initialized = false;

const   leftPaddle_x        = 60;
var     leftPaddle_y        = 30;
var     leftScore           = 0;

const   rightPaddle_x       = 90;
var     rightPaddle_y       = 30;
var     rightScore          = 0;

var     ball_xp             = 30;
var     ball_xv             = 0;
var     ball_yp             = 34;
var     ball_yv             = 0;

const   ball_PMFA           = 0;
const   paddle_PMFA         = 1;
const   number_corner_PMBA  = 0;
const   number_edgev_PMBA    = 1;
const   number_edgeh_PMBA   = 2;

const   ball_o              = 0;
const   paddle1top_o        = 1;
const   paddle1bottom_o     = 2;
const   paddle2top_o        = 3;
const   paddle2bottom_o     = 4;

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
    NTBL_setAddr(0,number_corner_PMBA);
    NTBL_setColor(0,true);
    NTBL_setAddr(1,number_edgev_PMBA);
    NTBL_setColor(1,true);

    for( let i = 50; i < 52; i++){
        NTBL_setAddr(i,number_edgev_PMBA);
        NTBL_setColor(i,true);
    }

    drawNumber0(0)
    drawNumber1(1)
    drawNumber0(2)
    drawNumber0(3)

    NTBL_setAddr(278,number_edgeh_PMBA);
    NTBL_setColor(278,true);






}



function updatePPU() {
    if (initialized) return;
    reset();
    //draw_ball();
    //draw_paddles();
    draw_scores();
    initialized = true;
}

function reset() {
    // update VRAM
    console.log("reseting!");
    VRAM_RESET();

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

    // number_corner
    PMB[ 0] = 0b11111111; PMB[ 1] = 0b11111111;
    PMB[ 2] = 0b11111111; PMB[ 3] = 0b11111111;
    PMB[ 4] = 0b11111111; PMB[ 5] = 0b11111111;
    PMB[ 6] = 0b11111111; PMB[ 7] = 0b11111111;
    PMB[ 8] = 0b11111111; PMB[ 9] = 0b00000000;
    PMB[10] = 0b11111111; PMB[11] = 0b00000000;
    PMB[12] = 0b11111111; PMB[13] = 0b00000000;
    PMB[14] = 0b11111111; PMB[15] = 0b00000000;

    // number_edge
    PMB[16] = 0b11111111; PMB[17] = 0b00000000;
    PMB[18] = 0b11111111; PMB[19] = 0b00000000;
    PMB[20] = 0b11111111; PMB[21] = 0b00000000;
    PMB[22] = 0b11111111; PMB[23] = 0b00000000;
    PMB[24] = 0b11111111; PMB[25] = 0b00000000;
    PMB[26] = 0b11111111; PMB[27] = 0b00000000;
    PMB[28] = 0b11111111; PMB[29] = 0b00000000;
    PMB[30] = 0b11111111; PMB[31] = 0b00000000;

    // number_edgeh
    PMB[32] = 0b11111111; PMB[33] = 0b11111111;
    PMB[34] = 0b11111111; PMB[35] = 0b11111111;
    PMB[36] = 0b11111111; PMB[37] = 0b11111111;
    PMB[38] = 0b11111111; PMB[39] = 0b11111111;
    PMB[40] = 0b00000000; PMB[41] = 0b00000000;
    PMB[42] = 0b00000000; PMB[43] = 0b00000000;
    PMB[44] = 0b00000000; PMB[45] = 0b00000000;
    PMB[46] = 0b00000000; PMB[47] = 0b00000000;

    NTBL_Color1 = 0;
    NTBL_Color2 = 7;
}

/* DRAWS A NUMBER 0 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 0*
*           use 1 to write for left player's "ones" digit: *0
*           use 2 to write for right player's "tens" digit: 0*
*           use 3 to write for right player's "ones" digit: *0
*
*           all other values are ignored
*/
function drawNumber0( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_corner_PMBA)
    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_corner_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_edgev_PMBA)
    NTBL_setColor( base+32, true )
    //4
    NTBL_setAddr( base+33, number_edgev_PMBA)
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setAddr( base+64, number_edgev_PMBA)
    NTBL_setColor( base+64, true )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setAddr( base+96, number_corner_PMBA)
    NTBL_setVFlip(base+96, true)
    NTBL_setColor( base+96, true )
    //8
    NTBL_setAddr( base+97, number_corner_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 1 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 1*
*           use 1 to write for left player's "ones" digit: *1
*           use 2 to write for right player's "tens" digit: 1*
*           use 3 to write for right player's "ones" digit: *1
*
*           all other values are ignored
*/
function drawNumber1( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //2
    NTBL_setAddr( base+1, number_edgev_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //4
    NTBL_setAddr( base+33, number_edgev_PMBA)
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //8
    NTBL_setAddr( base+97, number_edgev_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 2 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 2*
*           use 1 to write for left player's "ones" digit: *2
*           use 2 to write for right player's "tens" digit: 2*
*           use 3 to write for right player's "ones" digit: *2
*
*           all other values are ignored
*/
function drawNumber2( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_edgev_PMBA)
    NBTL_set
    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_corner_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_edgev_PMBA)
    NTBL_setColor( base+32, true )
    //4
    NTBL_setAddr( base+33, number_edgev_PMBA)
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setAddr( base+64, number_edgev_PMBA)
    NTBL_setColor( base+64, true )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setAddr( base+96, number_corner_PMBA)
    NTBL_setVFlip(base+96, true)
    NTBL_setColor( base+96, true )
    //8
    NTBL_setAddr( base+97, number_corner_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}
