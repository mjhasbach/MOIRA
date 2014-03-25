var moira = require('../lib/moira');

moira.getIP(function(err, IP, service) {
    if(err) {
        console.log("All attempts to retrieve your IP address were exhausted. Is there a problem with your connection?");
    } else {
        console.log("Your external IP address is " + IP);
        console.log("The fastest service to return your IP address was " + service);
    }
});