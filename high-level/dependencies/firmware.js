
/* machine.js */



class Q9_6 {
    /**
     * @param {number} number
     */
    constructor( number ) {
        this.update( number );
    }
    /**
     * @param {number} number
     */
    update( number ) {
        while ( number < -512 ) number += 512;
        while ( number >= 512 ) number -= 512;
        this.value = Math.floor(number * 64);
    }

    /**
     * Q9_6 to signed INT16
     * @return {number} sint16
     */
    toSINT() {
        return this.value >> 6;
    }

    toNumber() { return this.value / 64; }
    toString() { return `${ this.toNumber() }`; }
}



/* ======== Methods ======== */

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} sum
 */
function Q9_6_add( a, b ) {
    return new Q9_6( a.toNumber() + b.toNumber() );
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} difference
 */
function Q9_6_sub( a, b ) {
    return new Q9_6( a.toNumber() - b.toNumber() );
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} product
 */
function Q9_6_mul( a, b ) {
    let sign = ( a.toNumber() * b.toNumber() < 0);
    a.value = Math.abs(a.value);
    b.value = Math.abs(b.value);
    let out = new Q9_6( a.toNumber() * b.toNumber() )
    out.value *= 1 - (2*sign);
    return out;
}

/**
 * @param {Q9_6} a
 * @return {Q9_6} negative_value
 */
 function Q9_6_neg( a ) {
    return new Q9_6( -a.toNumber() );
}

/**
 * @param {Q9_6} a
 * @return {Q9_6} absolute_value
 */
 function Q9_6_abs( a ) {
    return new Q9_6( Math.abs(a.toNumber()) );
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} quotient
 */
function Q9_6_div( a, b ) {
    let sign = ( a.toNumber() * b.toNumber() < 0);
    a.value = Math.abs(a.value);
    b.value = Math.abs(b.value);
    let out = new Q9_6( a.toNumber() / b.toNumber() )
    out.value *= 1 - (2*sign);
    return out;
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
function Q9_6_lt( a, b ) {
    return a.toNumber() < b.toNumber();
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
 function Q9_6_lte( a, b ) {
    return a.toNumber() <= b.toNumber();
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
 function Q9_6_gt( a, b ) {
    return a.toNumber() > b.toNumber();
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
 function Q9_6_gte( a, b ) {
    return a.toNumber()
     >= b.toNumber();
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
function Q9_6_eq( a, b ) {
    return a.toNumber() == b.toNumber();
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {boolean} comparison
 */
 function Q9_6_ne( a, b ) {
    return a.toNumber() != b.toNumber();
}
/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} quotient
 */
function Q9_6_min( a, b ) {
    return new Q9_6(Math.min( a.toNumber(), b.toNumber() ));
}

/**
 * @param {Q9_6} a
 * @param {Q9_6} b
 * @return {Q9_6} quotient
 */
 function Q9_6_max( a, b ) {
    return new Q9_6(Math.max(a.toNumber(), b.toNumber()));
}