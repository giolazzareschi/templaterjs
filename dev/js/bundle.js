if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);


window.$app;
function start_app(){

	(new Templater({
		binds : function(){

			$app = new SessionManager();
		}
	}));
};