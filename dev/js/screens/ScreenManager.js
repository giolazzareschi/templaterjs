var ScreenManager = Templater.extend({

	type : 'ScreenManager',

	require: {
		url: 'scripts',
		files: ['HelloWorld']
	},

	binds: function() {

		this.HelloWorld = new HelloWorld();

		this.HelloWorld.render( this.elements.hello );
	},

	template : '' +
	'<div appmaincenter>' +
		'<span id="hello"></span>' +
	'</div>'
});