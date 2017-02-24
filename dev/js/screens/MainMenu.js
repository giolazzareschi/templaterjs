GlobalContext.Export.MainMenu = Templater.extend({

	type: 'MainMenu',

	events: {
		'click #home': function() {
			GlobalContext.navigate('');
		},
		'click #learn': function() {
			GlobalContext.navigate('learn');
		},
		'click #use': function() {
			GlobalContext.navigate('use');
		}
	},

	template: ''+
		'<div class="main-menu">'+
			'<ul>'+
				'<li id="home">Home</li>'+
				'<li id="learn">Learn</li>'+
			'</ul>'+
		'</div>'

});