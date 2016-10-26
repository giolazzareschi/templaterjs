var HelloWorld = Templater.extend({	

	type: 'HelloWorld',

	require: {
		url: 'scripts',
		files: ['List','ListItem']
	},

	template_data: {
		name : 'Things to do:',
		tasks : []
	},

	binds: function() {

		this.List = new List({
			template_data: {
				items: this.template_data.tasks
			}
		});

		this.List.render( this.elements.listwrap );
	},

	events: {
		'click button': function() {

			this.List.add({id: 1, name : ''});
		}
	},

	template: '' +
		'<div class="hello-world-container">'+
			'<div>{{name}}</div><button>Create new item:</button>'+
			'<div id="listwrap"></div>'+
		'</div>'

});