var List = Templater.extend({

	autopaint : true,

	binds : function(){

	},

	template : '' +
		'<div class="list-wrapper">'+
			'<ul>'+
			'{{#each phones}}'+
				'<li>{{this}}</li>'+
			'{{/each}}'+
			'</ul>'+
		'</div>'

});