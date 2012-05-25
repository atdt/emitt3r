/*jslint node:true, white:true */

"use strict";

var emitt3r = require( './base' );

module.exports = emitt3r;

require( './tracker.js' );
require( './store.js' );

if ( require.main === module ) {
    tracker.on( 'track', tracker.store );
    tracker.listen();
}
