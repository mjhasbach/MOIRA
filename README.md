> # MOIRA #
> Most Outstanding IP Reporting Assistant

## Description ##

MOIRA is a Node module that retrieves your external IP address asynchronously. It works by requesting your IP from several different IP-fetching services simultaneously and reports the quickest result after verifying that it is a valid IP address. Similar modules that rely on only a single IP-reporting service can introduce issues (returning undefined, etc) in the event that the service is offline; I needed something with a bit more redundancy and reliability.

## Installation ##

You may install MOIRA via Node Package Manager as follows:

    npm install MOIRA

The source code is available on [GitHub](https://github.com/mjhasbach/MOIRA).

## Usage ##

    var moira = require('moira');
    
    moira.getIP(function(ip, service) {
        console.log("Your external IP address is " + ip);
        console.log("The fastest service to return your IP address was " + service);
    });

Example Output:

    Your external IP address is 74.125.239.128
    The fastest service to return your IP address was http://whatismyip.akamai.com/

## Improving MOIRA ##

If you would like to contribute code or simply add an IP reporting service, feel free to submit a pull request. Please report issues [here](https://github.com/mjhasbach/MOIRA/issues).