var NAVIBRIDGE=function(){Ti.API.trace("NAVIBRIDGE module initiated");var a={Version:"1.3",URLBase:"navicon://",Install:{iOS:"http://itunes.apple.com/us/app/navibridge/id498898448?mt=8",Android:"http://appcappstore.s3.amazonaws.com/navibridge/NaviBridge_Appcelerator_test_v3.3f.apk"},ApplicationId:null,Platform:"iphone"===Ti.Platform.osname||"ipad"===Ti.Platform.osname?"ios":"android"==Ti.Platform.osname?"android":"mobileweb"};a.setApplicationId=function(b){Ti.API.trace("NAVIBRIDGE.setApplicationId()");
a.isDefined(b)&&(a.ApplicationId=b)};a.SetApplicationID=function(b){Ti.API.info("NAVIBRIDGE.SetApplicationID() is deprecated; use NAVIBRIDGE.setApplicationId()");a.setApplicationId(b)};a.openNavi=function(){Ti.API.trace("NAVIBRIDGE.openNavi()");a.checkInstall()?Ti.Platform.openURL(a.URLBase):(Ti.API.error("NaviBridge is not installed"),a.installNavi())};a.checkInstall=function(){Ti.API.trace("NAVIBRIDGE.checkInstall()");return Ti.Platform.canOpenURL(a.URLBase)?!0:!1};a.installNavi=function(){Ti.API.trace("NAVIBRIDGE.installNavi()");
if(a.checkInstall())Ti.API.info("NaviBridge is already installed");else{var b=Ti.UI.createAlertDialog({title:"NaviBridge Not Installed",message:"This action requires you install the NaviBridge application",buttonNames:["OK","Cancel"],cancel:1});b.addEventListener("click",function(b){if(0===b.index){var d;switch(a.Platform){case "ios":d=a.Install.iOS;break;case "android":d=a.Install.Android;break;case "mobileweb":Ti.API.error("NaviBridge not available for mobile web");return}Ti.API.info("Installing NaviBridge application");
Ti.Platform.openURL(d)}else Ti.API.info("User aborted NaviBridge installation")});b.show()}};a.addPOI=function(b){Ti.API.trace("NAVIBRIDGE.addPOI()");if(a.checkInstall())if("object"===typeof b&&null!==b){if((!a.isDefined(b.lat)||!a.isDefined(b.lon))&&!a.isDefined(b.addr))return Ti.API.error("POI object must have 'lat' and 'lon' properties, or 'addr' property"),!1;var c=a.URLBase+"setPOI?ver="+a.Version;a.isDefined(b.lat)&&a.isDefined(b.lon)&&(c+=a.appendURL("ll",b.lat+","+b.lon));c+=a.appendURL("addr",
b.address);c+=a.appendURL("appName",a.ApplicationId);c+=a.appendURL("title",b.title);c+=a.appendURL("radKM",b.radiusKM);c+=a.appendURL("radML",b.radiusMI);c+=a.appendURL("tel",b.tel);c+=a.appendURL("text",b.text);c+=a.appendURL("callURL",b.callbackURL);Ti.API.info(c);Ti.Platform.openURL(c)}else return Ti.API.error("Incorrect POI data type given (or null)"),!1;else return Ti.API.error("NaviBridge is not installed"),a.installNavi(),!1};a.addMultiPOI=function(b){Ti.API.trace("NAVIBRIDGE.addMultiPOI()");
if(a.checkInstall())if("object"===typeof b&&null!==b)if(a.isDefined(b.poi)){5<b.poi.length&&Ti.API.info("Too many POI items provided; limiting to 5");for(var c=5<b.poi.length?5:b.poi.length,d=a.URLBase+"setMultiPOI?ver="+a.Version,d=d+a.appendURL("appName",a.ApplicationId),e=0;e<c;e++){var f=b.poi[e];a.isDefined(f.lat)&&a.isDefined(f.lon)&&(d+=a.appendURL("ll"+(e+1),f.lat+","+f.lon));d+=a.appendURL("addr"+(e+1),f.address);d+=a.appendURL("title"+(e+1),f.title);d+=a.appendURL("tel"+(e+1),f.tel)}d+=
a.appendURL("text",b.text);d+=a.appendURL("callURL",b.callbackURL);Ti.API.info(d);Ti.Platform.openURL(d)}else return Ti.API.error("No POIs found"),!1;else return Ti.API.error("Incorrect POI data type given (or null)"),!1;else return Ti.API.error("NaviBridge is not installed"),a.installNavi(),!1};a.appendURL=function(b,c){return a.isDefined(c)?"&"+b+"="+c:""};a.isDefined=function(a){return"undefined"!==typeof a&&null!==a?!0:!1};return a}();module.exports=NAVIBRIDGE;