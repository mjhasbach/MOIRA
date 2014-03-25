"use strict";

var request = require('request');

// List of IP reporting services
// Criteria: HTTP requests to URL returns an IP address ONLY in the response body
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

// Callback the fastest IP address returned from request()
function getIP(callback) {
    var done = false,
        completedRequests = 0;

    this.isLastResponse = function () {
        return completedRequests == services.length
    };

    services.forEach(function(service) {
        request(service, function(err, response, body) {
            body = body.replace(/\s+/,""); // Remove whitespace from address
            completedRequests += 1;

            // Callback IP address and reporting service if an IP address has not yet been found and the response body is a valid IP address
            if (!done && (isIP(body))) {
                done = true;
                callback(null, body, response.request.uri.href);
            }

            // Callback an error and null values if all searches were exhausted without locating an IP address
            if (!done && getIP.isLastResponse()) {
                callback(true, null, null);
            }
        });
    })
}

// Based on http://www.w3resource.com/javascript/form/ip-address-validation.php
function isIP(address) {
    var octet = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.";
    var isIP = new RegExp("^" + octet + octet + octet + octet.slice(0, -1) + "$");

    if(address) {
        return isIP.test(address)
    } else {
        return(false);
    }
}

exports.getIP = getIP;