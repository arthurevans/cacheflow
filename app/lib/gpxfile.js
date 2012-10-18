
var gpxStrAttrs = {
	'groundspeak:name' : 'name',
	'groundspeak:owner' : 'owner_name',
	'groundspeak:type' : 'type',
	'groundspeak:container' : 'container',
	'groundspeak:long_description' : 'long_description',
	'groundspeak:short_description' : 'short_description',
	'groundspeak:encoded_hints' : 'hint'
}
var gpxNumAttrs = {
	'groundspeak:difficulty' : 'difficulty',
	'groundspeak:terrain' : 'terrain'
}

function parse(file, callback) {
	var gpxDoc, cachelist = [], cache, cachedata, waypoints, waypoint, i, len, j, numChildren, childNode, tagName, loadedCaches = 0;
	Ti.API.debug("Processing GPX file " + file);
	gpxDoc = Ti.XML.parseString(file.read().text).documentElement;
	waypoints = gpxDoc.getElementsByTagName('wpt');
	Ti.API.debug("Found " + waypoints.length + " points.");
	for ( i = 0, len = waypoints.length; i < len; i++) {
		waypoint = waypoints.item(i);

		// for some reason, we need to scan manually for this tag... getElementByTagNameNS doesn't do it
		for ( j = 0, numChildren = waypoint.childNodes.length; j < numChildren; j++) {
			if (waypoint.childNodes.item(j).tagName === "groundspeak:cache") {
				cache = waypoint.childNodes.item(j);
				break;
			}
		}
		if (cache) {
			cachedata = {};
			cachedata.id = cache.getAttribute('id');
			cachedata.lat = parseFloat(waypoint.getAttribute('lat'));
			cachedata.long = parseFloat(waypoint.getAttribute('lon'));
			for ( j = 0, numChildren = cache.childNodes.length; j < numChildren; j++) {
				childNode = cache.childNodes.item(j);
				tagName = childNode.tagName;
				if ( tagName in gpxStrAttrs) {
					cachedata[gpxStrAttrs[tagName]] = childNode.textContent;
				}
				if ( tagName in gpxNumAttrs) {
					cachedata[gpxNumAttrs[tagName]] = parseFloat(childNode.textContent);
				}
			}
			callback(cachedata);
			loadedCaches++;
		} else {
			//Ti.API.info("No cache element, skipping.");
		}
	}
	Ti.API.debug("Loaded " + loadedCaches + " caches from file.");
	return (loadedCaches > 0);
}
exports.parse = parse;