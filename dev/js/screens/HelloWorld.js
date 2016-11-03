var HelloWorld = Templater.extend({	

	type: 'HelloWorld',

	// autopaint: true,

	require: {
		url: 'scripts',
		files: ['List','ListItem']
	},

	template_data: {
		tasks: []
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
		'click span': function() {

			this.List.add({id: 1, name : ''});
		}
	},

	reactions: {
		'pizzas.tasks': function() {
			console.log( arguments );
		}
	},

	template: '' +
		'<div class="hello-world-container">'+
			'<span class="icon-play-1"></span>'+
			'<div id="listwrap"></div>'+
		'</div>'

});