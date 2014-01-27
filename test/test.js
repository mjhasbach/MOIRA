var moira = require('../lib/moira');

moira.getIP(function(ip, service, err) {
    if(!err) {
        console.log("Your external IP address is " + ip);
        console.log("The fastest service to return your IP address was " + service);
    } else {
        console.log("All attempts to retrieve your IP address were exhausted. Is there a problem with your connection?");
    }
});