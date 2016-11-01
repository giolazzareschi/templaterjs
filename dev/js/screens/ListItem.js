var ListItem = Templater.extend({	

	type: 'ListItem',

	// autopaint: true,

	require: {
		url: 'scripts',
		files: ['Crono']
	},

	template_data: {
		id : 0,
		name: ''
	},

	constructor: function() {

		arguments[0].template_data.id = +new Date;

		arguments[0].template_data.name = '';

		this.base.apply(this, arguments);
	},

	binds: function() {

		this.Crono = new Crono();

		this.Crono.render( this.elements.crono );		
	},

	events: {

		'keyup .names-area input': function(e) {

			// this.template_data.name = e.target.value;

			this.setData({
				name: e.target.value
			});
		},

		'click #remove': function(e) {

			this.__parent.remove( this.__index );
		}
	},

	template: '' +
		'<div class="hello-world-list-item">'+
			'<div class="title-area" dataid="{{id}}"></div>'+
			'<div id="crono"></div>'+
			'<div class="names-area"><input value="{{name}}" /><button id="remove">X</button></div>'+
		'</div>'

});