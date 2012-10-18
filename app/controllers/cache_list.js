var cacheCollection, backButton;

function hide() {
	$.win.close();
}

function show(caches, mapregion) {
	if (Ti.Platform.name === 'iPhone OS' && backButton === undefined) {
		backButton = Ti.UI.createButton({
			title : "Back",
			style : Ti.UI.iPhone.SystemButtonStyle.PLAIN
		});
		backButton.addEventListener('click', hide);
		$.win.leftNavButton = backButton;
	}
	updateContent(caches, mapregion);
	$.win.open();
}

function updateContent(collection, mapregion) {
	var row, rows = [], i, len, cache, lat, long;
	Ti.API.info(JSON.stringify(mapregion));
	var mapheight = mapregion.latitudeDelta / 2.0;
	var mapwidth = mapregion.longitudeDelta / 2.0;
	var latmin = mapregion.latitude*1.0 - mapheight;
	var latmax = mapregion.latitude*1.0 + mapheight;
	var longmin = mapregion.longitude*1.0 - mapwidth;
	var longmax = mapregion.longitude*1.0 + mapwidth;
	Ti.API.info(String.format("%f %f %f %f", latmin, latmax, longmin, longmax));
	for (i = 0, len = collection.length; i < len; i++) {
		cache = collection.at(i).attributes;
		lat = 1.0*cache.lat;
		long = 1.0*cache.long;
		if (latmin <= lat && lat <= latmax && longmin <= long && long <= longmax) {
			row = Alloy.createController('row', {
				title : cache.name,
				owner : cache.owner_name,
				position : cache.lat + "," + cache.long,
				type : cache.type + "/" + cache.container
			}).getView();
			row.id = cache.id;
			rows.push(row);
			Ti.API.info("adding row: " + row);
		} else {
			Ti.API.info("Excluding row: " + lat + ", " + long);
		}
	}

	$.list.setData(rows);
	cacheCollection = collection;
}

$.list.addEventListener('click', function(evt) {
	if (evt.index !== undefined && evt.index < cacheCollection.length) {
		evt.row.hasCheck = ! evt.row.hasCheck;
		//Ti.API.info("firing event");
		//$.win.fireEvent('cache_selected', {
		//	index : evt.index,
		//	id : evt.row.id
		//});
	}
	//hide();
});
exports.hide = hide;
exports.show = show;
