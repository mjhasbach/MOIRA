> # MOIRA #
> Most Outstanding IP Reporting Assistant

## Description ##

MOIRA is a Node module that retrieves your external IP address asynchronously. It works by requesting your IP from several different IP-fetching services simultaneously and reports the quickest result after verifying that it is a valid IP address. Similar modules that rely on only a single IP-reporting service can introduce issues (returning undefined, etc) in the event that the service is offline; I needed something with a bit more redundancy and reliability.

## Installation ##

You may install MOIRA via Node Package Manager as follows:

    npm install moira

The source code is available on [GitHub](https://github.com/mjhasbach/MOIRA).

## Usage ##

Example (see test/test.js)

    var moira = require('moira');

    moira.getIP(function(ip, service, err) {
        if(!err) {
            console.log("Your external IP address is " + ip);
            console.log("The fastest service to return your IP address was " + service);
        } else {
            console.log("All attempts to retrieve your IP address were exhausted. Is there a problem with your connection?");
        }
    });

Callback Arguments

    "ip" - String - Validated IPv4 address (e.g. 74.125.239.128)
    "service" - String - The URL of the IP reporting service that produced the returned IP address (e.g. http://whatismyip.akamai.com/)
    "err" - Boolean - True when MOIRA was unable to retrieve an IP address

## Improving MOIRA ##

If you would like to contribute code or simply add an IP reporting service, feel free to submit a pull request. Please report issues [here](https://github.com/mjhasbach/MOIRA/issues).