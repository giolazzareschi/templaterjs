var List = Templater.extend({

	type : 'List',

	autopaint : true,

	binds : function(){

	},

	template : '' +		
		'<ul class="list-wrapper">'+
		'{{#each pizzas}}'+
			'<ul>'+
			'{{#each flavours}}'+
				'<li><span>{{this}}</span></li>'+
			'{{/each}}'+
			'</ul>'+
		'{{/each}}'+
		'</ul>'

});