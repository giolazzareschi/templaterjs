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
			'customers': function() {

				var Customers = new GlobalContext.Export.Customers();

				AppBundle.renderPage(Customers);
			},
			'login': function() {

			},
			'logout': function() {
				GlobalContext.restartApp();
			}
		};
})();