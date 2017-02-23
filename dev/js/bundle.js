'use strict';

if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

var	
	data,
	GlobalContext = new GlobalContext(),
	Routes = {
		'': function() {

		},
		'login': function() {

		},
		'logout': function() {
			GlobalContext.restartApp();
		}
	};

function start_app(){
	
	GlobalContext.Router.setLoginRoute('login');
	for(var route in Routes)
		GlobalContext.Router.register(route, Routes[route]);

	(new Templater({
		binds : function(){
			
			GlobalContext.navigateToLastRoute();
		}
	}));
};