
var titleView = $.getView('title');
var webView = $.getView('details');
var win = $.getView('detail_win');
var backButton;
var details;
var navi = require('ti.navibridge');
navi.setApplicationId('ICiAV4Ay');

function hideDetails() {
	win.close();
}

function showDetails(cacheDetails) {
	details = cacheDetails;
	var html = "<html><head><meta name=\"viewport\" content=\"width=device-width\" /><style type=\"text/css\" media=\"all\">\r";
	html += "body { font: 14px Helvetica,sans-serif; color: #333 }\r</style></head><body>";
	titleView.text = cacheDetails.name;
	html += "<p>Owner: " + cacheDetails.owner_name + " Type: " + cacheDetails.type + "/" + cacheDetails.container + "<br />";
	html += "Difficulty: " + cacheDetails.difficulty + "  Terrain: " + cacheDetails.terrain + "<br /></p>";
	html += "<p>Short description: " + cacheDetails.short_description + "</p>" + cacheDetails.long_description +"</body></html>";

	webView.html = html;
	if (Ti.Platform.name === 'iPhone OS' && backButton === undefined) {
		backButton = Ti.UI.createButton({
			title : "Back",
			//style : Ti.UI.iPhone.SystemButtonStyle.PLAIN
		});
		backButton.addEventListener('click', hideDetails);
		win.leftNavButton = backButton;
	}
	win.open();
}

function seekCache () {
	Ti.API.info("Seek cache!");
}

function addToList() {
	Ti.API.info("Add to list!");
}

function driveToCache() {
	Ti.API.info("Drive to cache!");
	var poi = {
		title: details.name,
		lat: details.lat,
		lon: details.long
	};
	Ti.API.info("Sending POI: " + JSON.stringify(poi));
	navi.addPOI(poi);
}
exports.showDetails = showDetails;
exports.hideDetails = hideDetails; 
