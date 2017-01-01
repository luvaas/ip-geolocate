# Overview
Use freegeoip.net to get geolocation information based on IP address.

If you like the freegeoip.net service (it's an awesome free service), please consider donating to it.  See <http://freegeoip.net/> for more information.

Note that freegeoip.net allows up to 10,000 queries per hour. Once this limit is reached, all of your requests will result in errors until your quota is cleared at the end of the hour.

# Install

    npm install ip-geolocate --save


# Usage
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

# Optional Options Argument

You can (optionally) pass an options object as the second argument.

* __maxLatency__: By default, the max time to wait for a response from freegeoip.net service is 2000 milliseconds.  Change this to whatever you want.
* __serviceUrl__: By default the serviceUrl is set to "http://freegeoip.net/json/".  However, you may decide to install your own service on your own servers if the 10,000 request limit is too restrictive (see freegeoip.net documentation for more info).  If so, include the URL of your service here, including the protocol (e.g., http://) and trailing slash.

## Example

```javascript
var geolocate = require('ip-geolocate');

var ip = '127.0.0.1';
var options = {
    maxLatency : 5000,
    serviceUrl : 'http://alternetfreegeoip.net/json/'
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

# Response
The method will return a _location_ object in the callback that will look something like this:

```javascript
{
    ip: '127.0.0.1',
    country_code: 'US',
    country_name: 'United States',
    region_code: 'CA',
    region_name: 'California',
    city: 'San Mateo',
    zip_code: '94403',
    time_zone: 'AmericaLos_Angeles',
    latitude: 37.5402,
    longitude: -122.3041,
    metro_code: 807
}
```

