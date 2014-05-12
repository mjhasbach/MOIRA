var moira = require( '../lib/moira' );

moira.getIP( function( err, ip, service ){
    if( err ) throw err;

    console.log( 'Your external IP address is ' + ip );
    console.log( 'The fastest service to return your IP address was ' + service );
});