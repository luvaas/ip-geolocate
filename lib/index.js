var request = require('request');
var ipRegex = require('ip-regex');

var serviceUrl = "https://ipinfo.io/";
var maxLatency = 2000;
var geoLocate = {};

geoLocate.getLocation =  function(ip, options, next) {
	var args = Array.prototype.slice.call(arguments);

	// Determine whether or not we received the optional options argument
	options = (args.length === 3 && typeof args[1] === 'object') ? args[1] : undefined; 
	next = (args.length === 3 && typeof args[2] === 'function') ? args[2] : args[1];

	// Check validity of IP
	if (!ipRegex().test(ip)) {
		return next('Invalid IP address.', null);
	}

	var latency = options && options.maxLatency && !isNaN(options.maxLatency) ? Number(options.maxLatency) : maxLatency;
	var url = options && options.serviceUrl ? options.serviceUrl : serviceUrl;
	
	request.get({
		url: url + ip,
		json: true,
		timeout: latency,
	}, function(err, res, location) {
		if (err) {
			return next(err, null);
		}
		if (res.statusCode != 200) {
			return next("Error getting location.  Possibly throttled.", null);
		}
		return next(null, location);
	});
};

module.exports = geoLocate;
