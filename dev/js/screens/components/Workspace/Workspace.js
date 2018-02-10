var Workspace = Templater.extend({

	type: 'Workspace',

	binds: function() {
		this.render(document.body);
		this.Banner = new Banner();
		this.MenuHome = new MenuHome();
		this.Banner.append(this.dom);
		this.MenuHome.append(this.dom);
	},

	template: '' +
		'<div class="Workspace">'+
		'</div>'
});