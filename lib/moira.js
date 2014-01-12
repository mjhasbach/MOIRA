var request = require('request');

var foundIP = false;

// List of IP reporting services
// Criteria: URL returns an IP address ONLY in the response body
var IPServices = [
    "http://ifconfig.me/ip",
    "http://icanhazip.com/",
    "http://ip.appspot.com/",
    "http://curlmyip.com/",
    "http://ident.me/",
    "http://ipecho.net/plain",
    "http://whatismyip.akamai.com/",
    "http://tnx.nl/ip",
    "http://myip.dnsomatic.com/"
];

//Initiate 1 IP address retrieval request for each IP reporting service
function getIP(callback) {
    for(var i = 0; i < IPServices.length; i++) {
        request(IPServices[i], function(error, response, body) {
            if (!error && response.statusCode == 200) {
                processIP(this.uri.href, body, callback);
            }
        });
    }
}

//Ensure only 1 callback is executed per getIP() call, validate IP address, then callback
function processIP(IPService, address, callback) {
    if(!foundIP) {
        address = address.replace(/\s+/,"");
        if(isIP(address)) {
            foundIP = true;
            callback(address, IPService);
        }
    }
}

// Based on http://www.w3resource.com/javascript/form/ip-address-validation.php
function isIP(address) {
    var octet = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.";
    var IPTest = new RegExp("^" + octet + octet + octet + octet.slice(0, -1) + "$");

    if (IPTest.test(address)) {
        return(true);
    } else {
        return(false);
    }
}

exports.getIP = getIP;