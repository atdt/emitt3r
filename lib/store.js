/*jslint node:true, white:true */

"use strict";

var emitt3r = require( './base' );

var redis = require( 'redis' );
var client = redis.createClient();

emitt3r.store = function ( event ) {

    // Be atomic
    var transaction = client.multi();
    
    // Set hash of the event, keyed to its uuid
    transaction.hmset( event.uuid, event );

    // Adds the event's uuid to the event's set
    transaction.sadd( event.event, event.uuid );

    // Adds the event's uuid to the user's set
    transaction.sadd( event.token, event.uuid );

    // Commit
    transaction.exec();

};
