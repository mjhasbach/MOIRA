"use strict";

var request = require('request');

// HTTP requests to a service should return an IP address ONLY in the response body
var services = [
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

function getIP(callback) {
    var GetIP = this,
        completedRequests = 0,
        done = false;
    this.isDone = function() {done = true};
    this.isNotDone = function() {return !done};
    this.isOnItsLastResponse = function() {return completedRequests == services.length};

    services.forEach(function(service) {
        request(service, function(err, response, address) {
            if (address) address = address.replace(/\s+/,""); //Remove whitespace
            if (GetIP.isNotDone() && thisIsAnIP(address)) {
                GetIP.isDone();
                callback(null, address, response.request.uri.href)
            }
            if (GetIP.isNotDone() && GetIP.isOnItsLastResponse()) {
                callback(true, null, null)
            }
            completedRequests++
        });
    })
}

function thisIsAnIP(address) {
    var octet = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.",
        isIP = new RegExp("^" + octet + octet + octet + octet.slice(0, -1) + "$");
    if(address) {return isIP.test(address)} else {return(null)}
}

exports.getIP = getIP;