var clickHandlers = {
	add_to_list: undefined,
	seek: undefined,
	drive: undefined
}
$.setClickHandlers = function(handlers) {
	if (handlers.add_to_list) {
		clickHandlers.add_to_list = handlers.add_to_list;
	}
	if (handlers.seek) {
		clickHandlers.seek = handlers.seek;
	}
	if (handlers.drive) {
		clickHandlers.drive = handlers.drive;
	}
}
function addToList() {
	if (clickHandlers.add_to_list) {
		clickHandlers.add_to_list();
	}
}
function seekCache() {
	if (clickHandlers.seek) {
		clickHandlers.seek();
	}
}
function driveToCache() {
	if (clickHandlers.drive) {
		clickHandlers.drive();
	}
}
