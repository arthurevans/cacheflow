var identityMatrix =  Ti.UI.create2DMatrix();
var listButtonStart = identityMatrix.rotate(-90);
var ninety = identityMatrix.rotate(90);
var findButtonStart = identityMatrix.rotate(-179);
var menuOpenTime = 300;
var listButton = $.getView('login_menu_button');
listButton.transform = listButtonStart;
var findButton = $.getView('caches_menu_button');
findButton.transform = findButtonStart;
var open = false;
var	listButtonOpenAnim = Ti.UI.createAnimation({
		left: '70',
		transform: identityMatrix,
		duration: menuOpenTime
	});
var	findButtonOpenAnim = Ti.UI.createAnimation({
		left: '140',
		transform: identityMatrix,
		duration: menuOpenTime
	});
var	listButtonCloseAnim = Ti.UI.createAnimation({
		left: '0',
		transform: listButtonStart,
		duration: menuOpenTime
	});
var	findButtonCloseAnim = Ti.UI.createAnimation({
		left: '0',
		transform: findButtonStart,
		duration: menuOpenTime
	});
var menu = $.getView('menu');

var resetMenu = function resetMenu() {
	Ti.API.info("Animation done.");
	menu.updateLayout({ left: 0, width: '60dp'});
	listButton.transform = listButtonStart;
	findButton.transform = findButtonStart;
	open = false;
}
//findButtonCloseAnim.addEventListener('complete', resetMenu);
/// Event handlers
function openMenu(e) {
	if (!open) {
		menu.updateLayout({ left: 0, width: '100%'});
		listButton.animate(listButtonOpenAnim);
		findButton.animate(findButtonOpenAnim);
		open = true;
	} else {
		listButton.animate(listButtonCloseAnim);
		findButton.animate(findButtonCloseAnim, resetMenu);
		open = false;
	}
    Ti.API.info("openMenu called.");
}

function showList(e) {
    $.getView().fireEvent('showList');
    openMenu({});
}

function findCache(e) {
    $.getView().fireEvent('findCache');
    openMenu({});
}
