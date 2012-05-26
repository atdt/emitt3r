#!/usr/bin/env node

var emitt3r = require( '../lib/emitt3r' );

var tracker = emitt3r.createTracker();

tracker.on( 'track', emitt3r.store );

tracker.on( 'listening', function () {
    console.log( 'emitt3r listening at ' + tracker.addr );
} );

tracker.listen();
