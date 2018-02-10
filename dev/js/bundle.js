;(function(window){
	'use strict';

	if (document.addEventListener) {
		document.removeEventListener("DOMContentLoaded", start_app, false);
		document.addEventListener("DOMContentLoaded", start_app, false);
	}

	function start_app(){
		new Workspace();
	};

	window.start_app = start_app;
})(window);