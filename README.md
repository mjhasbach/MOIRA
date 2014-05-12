# MOIRA
##### Most Outstanding IP Reporting Assistant

### Installation

You may install MOIRA via ```npm``` as follows:

    npm install moira

The source code is available on [GitHub](https://github.com/mjhasbach/MOIRA).

### Usage

#### moira.getIP( callback( ```err```, ```ip```, ```service``` ))

Retrieve your external IP address asynchronously by requesting it from several different IP-fetching services simultaneously. ```moira.getIP()``` reports the quickest result after verifying that it is a valid IP address. ```err``` is null if an IP address was found. ```ip``` is an IPv4 address. ```service``` is the URL of the IP-reporting service that returned ```ip``` (e.g. http://whatismyip.akamai.com/).

Example (see test/test.js):

    var moira = require( 'moira' );
    
    moira.getIP( function( err, ip, service ){
        if( err ) throw err;
    
        console.log( 'Your external IP address is ' + ip );
        console.log( 'The fastest service to return your IP address was ' + service );
    });

### Improving MOIRA

If you would like to contribute code or simply add an IP reporting service, feel free to submit a pull request. Please report issues [here](https://github.com/mjhasbach/MOIRA/issues).