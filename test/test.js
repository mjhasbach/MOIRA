var moira = require('../lib/moira');

moira.getIP(function(ip, service) {
    console.log("Your external IP address is " + ip);
    console.log("The fastest service to return your IP address was " + service);
});