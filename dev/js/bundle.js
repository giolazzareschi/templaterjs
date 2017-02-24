;(function(){
	'use strict';

	if (document.addEventListener) 
		document.addEventListener("DOMContentLoaded", start_app, false);


	function start_app(){
		
		GlobalContext.Router.setLoginRoute('login');
		for(var route in Routes)
			GlobalContext.Router.register(route, Routes[route]);

		(new Templater({
			binds : function(){

				AppBundle = new GlobalContext.Export.App();

				AppBundle.render(document.body);

				GlobalContext.navigate('');
			}
		}));
	};

	var	
		data,
		AppBundle,
		Routes = {
			'': function() {
				var HomeScreen = new GlobalContext.Export.HomeScreen();

				AppBundle.renderPage(HomeScreen);
			},
			'learn': function() {

				var LearnPage = new GlobalContext.Export.LearnPage();

				AppBundle.renderPage(LearnPage);
			},
			'use': function() {

				var UsePage = new GlobalContext.Export.UsePage();

				AppBundle.renderPage(UsePage);
			},
			'hello-world': function() {

				var HelloWorldPage = new GlobalContext.Export.HelloWorldPage();

				AppBundle.renderPage(HelloWorldPage);
			},
			'login': function() {

			},
			'logout': function() {
				GlobalContext.restartApp();
			}
		};
})();