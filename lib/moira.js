'use strict';

var request = require( 'request' );

// HTTP requests to a service should return an IP address ONLY in the response body
var services = [
    'http://ifconfig.me/ip',
    'http://icanhazip.com/',
    'http://ip.appspot.com/',
    'http://curlmyip.com/',
    'http://ident.me/',
    'http://ipecho.net/plain',
    'http://whatismyip.akamai.com/',
    'http://tnx.nl/ip',
    'http://myip.dnsomatic.com/'
];

function getIP( callback ){
    var GetIP = this;

    GetIP.done = false;
    GetIP.isOnItsLastResponse = function() { return GetIP.completedRequests === services.length };
    GetIP.completedRequests = 0;

    services.forEach( function( service ){
        request( service, function( err, response, address ){
            GetIP.completedRequests++;

            if ( address ) address = address.trim();

            if ( GetIP.done === false && thisIsAnIP( address )){
                GetIP.done = true;
                callback( null, address, response.request.uri.href )
            }

            if ( GetIP.done === false && GetIP.isOnItsLastResponse() ){
                callback( new Error( 'All attempts to retrieve your IP address were exhausted' ), null, null )
            }
        });
    })
}

function thisIsAnIP( address ){
    var octet = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.',
        isIP = new RegExp( '^' + octet + octet + octet + octet.slice( 0, -1 ) + '$' );

    if( address ) { return isIP.test( address )} else { return( null )}
}

exports.getIP = getIP;