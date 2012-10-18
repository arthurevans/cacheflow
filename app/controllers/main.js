var listController, menu, menuView, details, detailView, detailsVisible = false;
var caches = Alloy.createCollection('cache');
var cacheAnnotations = [];
var selectedCache = undefined;
var selectedCacheID = undefined;
var tabGroup = $.tabgroup;
var win = $.win;
var mapView = $.map;
var currentLat, currentLong;
var dataDir = "gpx";
var gpxFile = require("gpxfile");
var navi = require('ti.navibridge');
navi.setApplicationId('ICiAV4Ay');


function addCacheToCollection(cachedata) {
	cache = Alloy.createModel('cache', cachedata);
	caches.add(cache);
	cache.save();
}

function initModel() {
	Ti.API.info("In init model, about to load data.");
	var file, files, gpxDataFile, loadedFileList, loadedFiles = false, gpxDataDir, annotation, cacheAnnotations = [], i, len, attr, aMenu;
	// Load data from files, if required.
	loadedFileList = Ti.App.Properties.getList('loadedGPXFiles', []);
	gpxDataDir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, dataDir);
	files = gpxDataDir.getDirectoryListing();
	if (files) {
		for ( i = 0, len = files.length; i < len; i++) {
			file = files[i];
			Ti.API.info("File: " + file);
			if (! _.include(loadedFileList, file)) {
				gpxDataFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, dataDir, file);
				if (gpxFile.parse(gpxDataFile, addCacheToCollection)) {
					loadedFileList.push(file);
					loadedFiles = true;
				}
			}
		}
		if (loadedFiles) {
			Ti.App.Properties.setList('loadedGPXFiles', loadedFileList);
		}
	}

}

$.addAnnotations = function(collection) {
	// Now create the annotations. Surely there is a smarter way to do this.
	// should probably only create the annotations that are on screen.
	var annotation, annotationCount = 0, attr;
	collection.all(function(model) {
		attr = model.attributes;
		// aMenu = Alloy.createController('annotation_menu').getView();
		annotation = Ti.Map.createAnnotation({
			latitude : attr.lat,
			longitude : attr.long,
			image : 'icon_cache.png',
			title : attr.name,
			subtitle : "by " + attr.owner_name + " | " + attr.type + "/" + attr.container,
			id : attr.id,
			height : '100dp',
			rightButton : Ti.UI.iPhone.SystemButton.DISCLOSURE
		});
		cacheAnnotations.push(annotation);
		if (cacheAnnotations.length >= 100) {
			return false;
		} else {
			return true;
		}
	});
	mapView.annotations = cacheAnnotations;
};
caches.on("fetch", function() {
	$.addAnnotations(caches)
});

function showDetails(cacheId) {
	var cache;

	cache = caches.get(cacheId);
	if (cache !== undefined) {
		details.showDetails(cache.attributes);
	}

}

function hideDetails() {
	details.hideDetails();
}

function getCacheIndexById(cacheId) {
	var i, len, index = undefined;
	for ( i = 0, len = caches.length; i < len; i++) {
		if (caches.at(i).id === cacheId) {
			index = i;
			break;
		}
	}
	return index;
}

function selectCache(evt) {
	var i, len, annotation, index = undefined;
	Ti.API.info("Got select event for: " + JSON.stringify(evt));
	if (evt.id) {
		selectedCache = caches.get(evt.id);
	}
}

function showList() {
	listController.show(caches, {
		latitude : currentLat,
		longitude : currentLong,
		latitudeDelta : mapView.latitudeDelta,
		longitudeDelta : mapView.longitudeDelta
	});
}

//
$.tabgroup.open();
listController = Alloy.createController('cache_list');
listController.getView('win').addEventListener('cache_selected', selectCache);
var parkButton = Alloy.createController('park_button').getView();
var parkingAnnotation = Ti.Map.createAnnotation({
	image : 'parking_spot.png',
	title : 'I Parked Here',
	animated : true,
	rightButton : 'icon_car.png',
	isDisplayed : false
});
$.win.rightNavButton = parkButton;
parkButton.addEventListener('click', function(e) {
	if (parkingAnnotation.isDisplayed) {
		mapView.removeAnnotation(parkingAnnotation);
		parkingAnnotation.isDisplayed = false
	} else {
		if (currentLat && currentLong) {
			parkingAnnotation.latitude = currentLat;
			parkingAnnotation.longitude = currentLong;
			mapView.addAnnotation(parkingAnnotation);
			parkingAnnotation.isDisplayed = true;
		}
	}
});
/*
menu = Alloy.createController('menu');
menuView = menu.getView();
$.win.add(menuView);

menuView.addEventListener('showList', showList);
menuView.addEventListener('findCache', showDetails);
mapView.addEventListener('regionChanged', function(evt) {
	currentLat = evt.latitude;
	currentLong = evt.longitude;
});
*/
var toolbar = Alloy.createController('toolbar');
function seekCache () {
	Ti.API.info("Seek cache!");
}

function addToList() {
	Ti.API.info("Add to list!");
}

function driveToCache() {
	Ti.API.info("Drive to cache!");
	if (selectedCache && selectedCache.attributes) {
	var details = selectedCache.attributes;
	var poi = {
		title: details.name,
		lat: details.lat,
		lon: details.long
	};
	Ti.API.info("Sending POI: " + JSON.stringify(poi));
	navi.addPOI(poi);
	}
}
toolbar.setClickHandlers({
	add_to_list: addToList,
	seek: seekCache,
	drive: driveToCache
});
mapView.addEventListener('click', function(e) {
	if (e.annotation) {
		Ti.API.info("Got click event, clicksource = " + e.clicksource + " id = " + e.annotation.id);
		if (e.clicksource === "rightButton") {
			showDetails(e.annotation.id);
		} else if (e.clicksource == "pin") {
			selectCache({ id: e.annotation.id});
			$.win.add(toolbar.getView());
		}
	} else {
		$.win.remove(toolbar.getView());
	}
});
details = Alloy.createController('cache_detail');
initModel();
caches.fetch();
mapView.setLocation({
	latitude : 37.389288,
	longitude : -122.050236,
	latitudeDelta : 0.05,
	longitudeDelta : 0.05,
	animate : true
});
