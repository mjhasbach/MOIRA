var request = require('request');

var foundIP = false;
var completedRequests = 0;

// List of IP reporting services
// Criteria: URL returns an IP address ONLY in the response body
var IPService = [
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
    for (var i = 0; i < IPService.length; i++) {
        request(IPService[i], function(error, response, body) {
            completedRequests += 1;
            if (error || response.statusCode != 200) {body = ""}
            handleResponse(this.uri.href, body, callback);
        });
    }
}

//Ensure only 1 callback is executed per getIP() call, validate IP address, then callback
function handleResponse(service, address, callback) {
    if (!foundIP) {
        address = address.replace(/\s+/,"");
        if (isIP(address)) {
            foundIP = true;
            callback(address, service, false);
        } else if (isLastRequest()) {
            callback(address, service, true);
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

function isLastRequest() {
    return completedRequests == IPService.length
}


exports.getIP = getIP;