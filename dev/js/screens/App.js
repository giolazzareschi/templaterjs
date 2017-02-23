GlobalContext.Export.App = Templater.extend({

	type: 'App',

	binds: function() {

		this.MainMenu = new GlobalContext.Export.MainMenu();

		this.MainMenu.render(this.elements.main_menu);
	},

	renderPage: function(component) {
		component.render(this.elements.page_content);
	},

	template: ''+
		'<div class="app-bundle">'+
			'<div id="main_menu"></div>'+
			'<div id="page_content"></div>'+
		'</div>'

});