
/* pong.js */


var initialized             = false;

// game will start when either of the controllers will be moved
var gameStarted             = false;

const   leftPaddle_x        = 30;
var     leftPaddle_y        = 150;
var     leftScoreOnes       = 0;
var     leftScoreTens       = 0;

const   screenBottomLimit   = 225;
const   screenTopLimit      = 0;

const   leftPaddleHitBoxX   = 38;
const   rightPaddleHitBoxX  = 209;
const   paddleHitBoxTop     = -7;
const   paddleHitBoxBottom  = 14;




const   paddleSpeed         = 5;

const   rightPaddle_x       = 217;
var     rightPaddle_y       = 150;
var     rightScoreOnes      = 0;
var     rightScoreTens      = 0;

// might want to make these a Q9_6
// https://github.com/ucsbieee/arcade/blob/f72d8297d7c048d84677ff8892c5a867fe0f105f/high-level/src/firmware.js#L6
var     ball_xp             = 60;
var     ball_xv             = -1;
var     ball_yp             = 150;
var     ball_yv             = 0;

const   ball_PMFA           = 0;
const   paddle_PMFA         = 1;
const   number_corner_PMBA  = 0;
const   number_edgev_PMBA   = 1;
const   number_edgeh_PMBA   = 2;

const   ball_o              = 0;
const   paddle1top_o        = 1;
const   paddle1bottom_o     = 2;
const   paddle2top_o        = 3;
const   paddle2bottom_o     = 4;




/* ====================================================================== */
/* ============================= Interrupts ============================= */
/* ====================================================================== */


function reset() {
    console.log("reseting!");
    initialized = false
}

function do_logic() {

    //console.log(`Do_logic is running ${rightPaddle_y}`)


    if        ( CONTROLLER1_UP() ) {
        rightPaddle_y -= paddleSpeed;
        gameStarted = true;
    } else if ( CONTROLLER1_DOWN() ) {
        rightPaddle_y += paddleSpeed;
        gameStarted = true;
    }

    if        ( CONTROLLER2_UP() ) {
        leftPaddle_y -= paddleSpeed;
        gameStarted = true;
    } else if ( CONTROLLER2_DOWN() ) {
        leftPaddle_y += paddleSpeed;
        gameStarted = true;
    }

    // put constraints on the paddle positions so they don't fly off screen
    rightPaddle_y = Math.max(rightPaddle_y, screenTopLimit)
    rightPaddle_y = Math.min(rightPaddle_y, screenBottomLimit)

    leftPaddle_y = Math.max(leftPaddle_y, screenTopLimit)
    leftPaddle_y = Math.min(leftPaddle_y, screenBottomLimit)

    if(gameStarted){
        ball_xp += ball_xv
        ball_yp += ball_yv
    }

    if(ball_yp <= screenTopLimit){
        ball_yv = -ball_yv
    }
    if(ball_yp >= screenBottomLimit){
        ball_yv = -ball_yv
    }

    if(ball_xp >= 250) handleRightGoal()
    else if(ball_xp <= 0) handleLeftGoal()

    handleLeftBounce()
    handleRightBounce()

}


function fill_vram() {
    draw_ball();
    draw_paddles();
    draw_scores();

    if (initialized) return;
    initialized = true;
    fill_PMF();
    fill_PMB();
}




/* ====================================================================== */
/* ============================= Game Logic ============================= */
/* ====================================================================== */


function handleRightGoal() {
    gameStarted = false;
    leftScoreOnes++
    if(leftScoreOnes == 10){
        leftScoreOnes = 0
        leftScoreTens++
    }

    ball_xp = 209
    ball_yp = 150
    ball_xv = -1
    ball_yv = 0

    leftPaddle_y = 150;
    rightPaddle_y = 150;
}

function handleLeftGoal() {

    gameStarted = false;
    rightScoreOnes++
    if(rightScoreOnes == 10){
        rightScoreOnes = 0
        rightScoreTens++
    }

    ball_xp = 38
    ball_yp = 150
    ball_xv = 1
    ball_yv = 0

    leftPaddle_y = 150;
    rightPaddle_y = 150;

}

function handleLeftBounce() {

    if(!gameStarted) return
    if(Math.abs(ball_xp - leftPaddleHitBoxX) > 0.35) return;
    if(ball_xv > 0) return

    console.log("t")

    console.log(`needs to be greater than ${leftPaddle_y - paddleHitBoxTop}, actual: ${ball_yp}`)

    if(ball_yp < (leftPaddle_y + paddleHitBoxTop)) return

    console.log("y")

    if(ball_yp > (leftPaddle_y + paddleHitBoxBottom)) return

    console.log("u")

    ball_xv = -ball_xv


}

function handleRightBounce() {

    if(!gameStarted) return
    if(Math.abs(ball_xp - rightPaddleHitBoxX) > 0.35) return;
    if(ball_xv < 0) return

    console.log("t")

    console.log(`needs to be greater than ${rightPaddle_y - paddleHitBoxTop}, actual: ${ball_yp}`)

    if(ball_yp < (rightPaddle_y + paddleHitBoxTop)) return

    console.log("y")

    if(ball_yp > (rightPaddle_y + paddleHitBoxBottom)) return

    console.log("u")

    ball_xv = -ball_xv

}




/* ====================================================================== */
/* ================================ Debug =============================== */
/* ====================================================================== */


setTimeout(() => {
    setNumControllers(2)
    document.querySelector("#Game__Canvas").addEventListener("click", (e) => {
        console.log(`ball position (x,y): [${ball_xp}, ${ball_yp}]`)
        console.log(`left paddle position (x,y): [${leftPaddle_x}, ${leftPaddle_y}]`)
        console.log(`right paddle position (x,y): [${rightPaddle_x}, ${rightPaddle_y}]`)
    })
}, 100)




/* ====================================================================== */
/* ============================= VRAM Update ============================ */
/* ====================================================================== */


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

    if     (leftScoreTens === 0) drawNumber0(0);
    else if(leftScoreTens === 1) drawNumber1(0);
    else if(leftScoreTens === 2) drawNumber2(0);
    else if(leftScoreTens === 3) drawNumber3(0);
    else if(leftScoreTens === 4) drawNumber4(0);
    else if(leftScoreTens === 5) drawNumber5(0);
    else if(leftScoreTens === 6) drawNumber6(0);
    else if(leftScoreTens === 7) drawNumber7(0);
    else if(leftScoreTens === 8) drawNumber8(0);
    else if(leftScoreTens === 9) drawNumber9(0);

    if     (leftScoreOnes === 0) drawNumber0(1);
    else if(leftScoreOnes === 1) drawNumber1(1);
    else if(leftScoreOnes === 2) drawNumber2(1);
    else if(leftScoreOnes === 3) drawNumber3(1);
    else if(leftScoreOnes === 4) drawNumber4(1);
    else if(leftScoreOnes === 5) drawNumber5(1);
    else if(leftScoreOnes === 6) drawNumber6(1);
    else if(leftScoreOnes === 7) drawNumber7(1);
    else if(leftScoreOnes === 8) drawNumber8(1);
    else if(leftScoreOnes === 9) drawNumber9(1);

    if     (rightScoreTens === 0) drawNumber0(2);
    else if(rightScoreTens === 1) drawNumber1(2);
    else if(rightScoreTens === 2) drawNumber2(2);
    else if(rightScoreTens === 3) drawNumber3(2);
    else if(rightScoreTens === 4) drawNumber4(2);
    else if(rightScoreTens === 5) drawNumber5(2);
    else if(rightScoreTens === 6) drawNumber6(2);
    else if(rightScoreTens === 7) drawNumber7(2);
    else if(rightScoreTens === 8) drawNumber8(2);
    else if(rightScoreTens === 9) drawNumber9(2);

    if     (rightScoreOnes === 0) drawNumber0(3);
    else if(rightScoreOnes === 1) drawNumber1(3);
    else if(rightScoreOnes === 2) drawNumber2(3);
    else if(rightScoreOnes === 3) drawNumber3(3);
    else if(rightScoreOnes === 4) drawNumber4(3);
    else if(rightScoreOnes === 5) drawNumber5(3);
    else if(rightScoreOnes === 6) drawNumber6(3);
    else if(rightScoreOnes === 7) drawNumber7(3);
    else if(rightScoreOnes === 8) drawNumber8(3);
    else if(rightScoreOnes === 9) drawNumber9(3);

}

function fill_PMF() {
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

}

function fill_PMB() {
    NTBL_Color1 = 0;
    NTBL_Color2 = 7;
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
}




/* ====================================================================== */
/* =========================== Drawing Scores =========================== */
/* ====================================================================== */


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
    //1
    NTBL_setColor( base, false )
    //2
    NTBL_setAddr( base+1, number_edgev_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setColor( base+32, false )
    //4
    NTBL_setAddr( base+33, number_edgev_PMBA)
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setColor( base+96, false )
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
    NTBL_setAddr( base, number_edgeh_PMBA)

    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_corner_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_edgeh_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )

    //4
    NTBL_setAddr( base+33, number_corner_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )

    NTBL_setColor( base+33, true )
    //5
    NTBL_setAddr( base+64, number_edgev_PMBA)

    NTBL_setColor( base+64, true )
    //6
    NTBL_setColor( base+65, false )
    //7
    NTBL_setAddr( base+96, number_corner_PMBA)
    NTBL_setVFlip(base+96, true)
    NTBL_setColor( base+96, true )
    //8
    NTBL_setAddr( base+97, number_edgeh_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 3 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 3*
*           use 1 to write for left player's "ones" digit: *3
*           use 2 to write for right player's "tens" digit: 3*
*           use 3 to write for right player's "ones" digit: *3
*
*           all other values are ignored
*/
function drawNumber3( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_edgeh_PMBA)

    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_corner_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_edgeh_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )

    //4
    NTBL_setAddr( base+33, number_corner_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )

    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true)
    NTBL_setColor( base+65, true )
    //7
    NTBL_setAddr( base+96, number_edgeh_PMBA)
    NTBL_setVFlip(base+96, true)
    NTBL_setColor( base+96, true )
    //8
    NTBL_setAddr( base+97, number_corner_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 4 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 4*
*           use 1 to write for left player's "ones" digit: *4
*           use 2 to write for right player's "tens" digit: 4*
*           use 3 to write for right player's "ones" digit: *4
*
*           all other values are ignored
*/
function drawNumber4( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_edgev_PMBA)
    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_edgev_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_corner_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )
    //4
    NTBL_setAddr( base+33, number_corner_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setColor( base+96, false )
    //8
    NTBL_setAddr( base+97, number_edgev_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 5 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 5*
*           use 1 to write for left player's "ones" digit: *5
*           use 2 to write for right player's "tens" digit: 5*
*           use 3 to write for right player's "ones" digit: *5
*
*           all other values are ignored
*/
function drawNumber5( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_corner_PMBA)
    //NTBL_setVFlip( base, true )
    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_edgeh_PMBA)
    //NTBL_setVFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setAddr( base+32, number_corner_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )

    //4
    NTBL_setAddr( base+33, number_edgeh_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )

    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true)
    NTBL_setColor( base+65, true )
    //7
    NTBL_setAddr( base+96, number_edgeh_PMBA)
    NTBL_setVFlip(base+96, true)
    NTBL_setColor( base+96, true )
    //8
    NTBL_setAddr( base+97, number_corner_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 6 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 6*
*           use 1 to write for left player's "ones" digit: *6
*           use 2 to write for right player's "tens" digit: 6*
*           use 3 to write for right player's "ones" digit: *6
*
*           all other values are ignored
*/
function drawNumber6( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_edgev_PMBA)
    //NTBL_setVFlip( base, true )
    NTBL_setColor( base, true )
    //2
    NTBL_setColor( base+1, false )
    //3
    NTBL_setAddr( base+32, number_corner_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )

    //4
    NTBL_setAddr( base+33, number_edgeh_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )

    NTBL_setColor( base+33, true )
    //5
    NTBL_setAddr( base+64, number_edgev_PMBA)
    NTBL_setColor( base+64, true )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true)
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

/* DRAWS A NUMBER 7 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 7*
*           use 1 to write for left player's "ones" digit: *7
*           use 2 to write for right player's "tens" digit: 7*
*           use 3 to write for right player's "ones" digit: *7
*
*           all other values are ignored
*/
function drawNumber7( numberID ) {
    if(numberID !== 0 && numberID !== 1 && numberID !== 2 && numberID !== 3) return
    let base = 37;
    if(numberID === 1) base += 3
    if(numberID === 2) base += 17
    if(numberID === 3) base += 20
    //1
    NTBL_setAddr( base, number_edgeh_PMBA)

    NTBL_setColor( base, true )
    //2
    NTBL_setAddr( base+1, number_corner_PMBA)
    NTBL_setHFlip( base+1, true )
    NTBL_setColor( base+1, true )
    //3
    NTBL_setColor( base+32, false )
    //4
    NTBL_setAddr( base+33, number_edgev_PMBA)
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setColor( base+96, false )
    //8
    NTBL_setAddr( base+97, number_edgev_PMBA)
    NTBL_setVFlip(base+97, true)
    NTBL_setHFlip(base+97, true)
    NTBL_setColor( base+97, true )
}

/* DRAWS A NUMBER 8 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 8*
*           use 1 to write for left player's "ones" digit: *8
*           use 2 to write for right player's "tens" digit: 8*
*           use 3 to write for right player's "ones" digit: *8
*
*           all other values are ignored
*/
function drawNumber8( numberID ) {
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
    NTBL_setAddr( base+32, number_corner_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )
    //4
    NTBL_setAddr( base+33, number_corner_PMBA)
    NTBL_setVFlip( base+33, true )
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

/* DRAWS A NUMBER 9 IN YOUR PREFERRED POSITION
* numberID:
*           use 0 to write for left player's "tens" digit: 9*
*           use 1 to write for left player's "ones" digit: *9
*           use 2 to write for right player's "tens" digit: 9*
*           use 3 to write for right player's "ones" digit: *9
*
*           all other values are ignored
*/
function drawNumber9( numberID ) {
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
    NTBL_setAddr( base+32, number_corner_PMBA)
    NTBL_setVFlip( base+32, true )
    NTBL_setColor( base+32, true )
    //4
    NTBL_setAddr( base+33, number_corner_PMBA)
    NTBL_setVFlip( base+33, true )
    NTBL_setHFlip( base+33, true )
    NTBL_setColor( base+33, true )
    //5
    NTBL_setColor( base+64, false )
    //6
    NTBL_setAddr( base+65, number_edgev_PMBA)
    NTBL_setHFlip( base+65, true )
    NTBL_setColor( base+65, true )
    //7
    NTBL_setColor( base+96, false )
    //8
    NTBL_setAddr( base+97, number_edgev_PMBA)
    NTBL_setHFlip( base+97, true )
    NTBL_setColor( base+97, true )
}
