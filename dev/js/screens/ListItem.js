var ListItem = Templater.extend({	

	type: 'ListItem',

	// autopaint: true,

	template_data: {
		id : 0,
		name: ''
	},

	constructor: function() {

		arguments[0].template_data.id = +new Date;

		arguments[0].template_data.name = '';

		this.base.apply(this, arguments);
	},

	events: {
		'keyup .names-area input': function(e) {

			// this.template_data.name = e.target.value;

			this.setData({
				name: e.target.value
			});
		}
	},

	template: '' +
		'<div class="hello-world-list-item">'+
			'<div class="title-area" dataid="{{id}}"></div>'+
			'<div class="names-area"><input value="{{name}}" /></div>'+
		'</div>'

});