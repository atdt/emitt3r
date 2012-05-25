/*jslint node:true, white:true, plusplus:true */

"use strict"; 

var dgram = require( 'dgram' ),
    events = require( 'events' ),
    util = require( 'util' ),
    uuid = require( 'node-uuid' );


var keys = [ 'prefix', 'event', 'timestamp', 'auth', 'token' ];

function parse( response ) {
    var chunks = response.toString( 'utf8' ).split( /\s+/ ),
        event = { uuid: uuid.v4() };

    for ( var i = 0; i < 5; i++ ) {
        event[ keys[i] ] = chunks.shift();
    }

    event.extra = chunks.join(' ');  // leftovers
    return event;
}


function Tracker( listener ) {

    events.EventEmitter.call( this );

    var self = this, socket = dgram.createSocket( 'udp4' );

    socket.on( 'message', function ( message, rinfo ) {
        self.emit( 'track', parse(message) );
    } );

    socket.on( 'listening', function () {
        self.emit( 'listening' );
    } );

    this.socket = socket;
}

util.inherits( Tracker, events.EventEmitter );

Tracker.prototype.listen = function ( port, host ) {
    port = port || 514;
    this.socket.bind( port, host );
};

exports.Tracker = Tracker;

exports.createTracker = function ( listener ) {
    return new Tracker( listener );
};
