var assert = require('assert');
var geolocate = require('../lib/index.js');

suite('Basic', function() {
    test('get localhost', function(done) {
        var ip = '127.0.0.1';
        geolocate.getLocation(ip, function(err, location) {
            assert(err === null, "Error " + err);
            assert(location.ip === ip, "Wrong ip received");
            done();
        });
    });

    test('get invalid ip', function(done) {
        var ip = '127.';
        geolocate.getLocation(ip, function(err, location) {
            assert(err !== null, "Error was expected.  No error received.");
            done();
        });
    });

    test('use optional options argument', function(done) {
        var ip = '192.30.253.113';
        var options = {
            maxLatency : 5000
        };

        geolocate.getLocation(ip, options, function(err, location) {
            assert(err === null, "Error " + err);
            assert(location !== null, "Location not received");
            done();
        });
    });
});
