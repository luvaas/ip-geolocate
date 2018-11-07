# ip-geolocate

## Overview

Use ipinfo.io to get geolocation information based on IP address. See <https://ipinfo.io/> for more information.

Note that ipinfo.io allows up to 1k requests a day for free. Once this limit is reached, all of your requests will get throttled until your quota is cleared.

## Install

    npm install ip-geolocate --save

## Usage

The getLocation method requires an IP address (as a string) and a callback.  Note that the method will check for IP address validity and that both IPv4 and IPv6 IP addresses are supported.

```javascript
var geolocate = require('ip-geolocate');

var ip = '127.0.0.1';

geolocate.getLocation(ip, function(err, location) {
    if(err) {
        // Error occurred, latency threshold hit, or IP address is invalid
        console.log(err);
    }
    else {
        // Success
       console.log(location);
    }
});
```

## Optional Options Argument

You can (optionally) pass an options object as the second argument. It handles the following fields:

* __maxLatency__: By default, the max time to wait for a response from ipinfo.io service is 2000 milliseconds. Change this to whatever you want.
* __serviceUrl__: By default the serviceUrl is set to `"https://ipinfo.io/"`.  However, you may decide to install your own service on your own servers if the request limit is too restrictive (see https://ipinfo.io/ documentation for more info). If so, include the URL of your service here, including the protocol (e.g., http://) and trailing slash.

### Example

```javascript
var geolocate = require('ip-geolocate');

var ip = '8.8.8.8';
var options = {
    maxLatency : 5000,
    serviceUrl : 'https://ipinfo.io/'
}

geolocate.getLocation(ip, options, function(err, location) {
    if(err) {
        console.log(err);
    }
    else {
       console.log(location);
    }
});
```

## Response

The method will return a _location_ object in the callback that will look something like this:

```json
{
  "ip": "8.8.8.8",
  "hostname": "google-public-dns-a.google.com",
  "city": "Mountain View",
  "region": "California",
  "country": "US",
  "loc": "37.3860,-122.0840",
  "postal": "94035",
  "phone": "650",
  "org": "AS15169 Google LLC"
}
```
