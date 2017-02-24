GlobalContext.Export.LearnPage = Templater.extend({

	type: 'LearnPage',

	events: {
		'click #hello_world': function() {
			GlobalContext.navigate('hello-world');
		}
	},

	template: ''+
		'<div class="home-screen">'+
			'<h1 class="page-title">Learn</h1>'+
			'<h4 class="page-subtitle">develop faster.</h4>'+
			//'<p class="page-description">As front-end frameworks grows faster, the complexity of them grows too. Amazing and robust frameworks on the market like Angular, Angular2, React, Ember, Knockout and others can be tricky to learn and start when you just want put some idea to run.</p>'+
			//'<p class="page-description">Start an app with them demands knowledge over the basic js. Debug in them is hard and sometimes you just want go fast and see the results.</p>'+
			//'<p class="page-description">Our purpose here is not compete against those listed. Our purpose is give a fast bootstrap and low learning curve to create a good webapp.</p>'+
			'<ul class="learning-list">'+
				'<li id="hello_world">Hello World</li>'+
				'<li>The bootstrap</li>'+
			'</ul>'+
		'</div>'

});