animation = require('alloy/animation');
$.splashwin.open();
setTimeout(function(){
    Ti.API.info("In callback.");
    var main = Alloy.createController('main');
    var mainView = main.getView();
    animation.crossFade($.splashwin, mainView, 500, function() {
        Ti.API.info("Animation done.");
        $.splashwin.close();
    });
}, 200);
