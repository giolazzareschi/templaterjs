if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);


window.$app;
function start_app(){

	(new Templater({
		require : {
			url : 'scripts',
			files : ['ScreenManager']
		},
		binds : function(){

			$app = new ScreenManager();

			$app.render( document.getElementById('entry_point') );
		}
	}));
};