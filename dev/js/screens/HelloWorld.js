var HelloWorld = Templater.extend({	

	type: 'HelloWorld',

	require: {
		url: 'scripts',
		files: ['List','ListItem']
	},

	template_data: {
		name : 'Press play to start a new thread:',
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
		'click span': function() {

			this.List.add({id: 1, name : ''});
		}
	},

	template: '' +
		'<div class="hello-world-container">'+
			'<div>{{name}}</div><span class="icon-play-1"></span>'+
			'<div id="listwrap"></div>'+
		'</div>'

});