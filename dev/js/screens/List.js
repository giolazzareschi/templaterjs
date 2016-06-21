var List = Templater.extend({

	type : 'List',

	autopaint : true,

	binds : function(){

	},

	reactions : {
		pizzas : function(){
			console.log( this );
		}
	},

	template : '' +		
		'<ul class="list-wrapper">'+
		
		'{{#each pizzas}}'+
			'<div>'+
				'<label>Flavours:</label>'+
				'<ul>'+
				'{{#each flavours}}'+
					'<li>'+
						'<span>{{this}}</span>'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</div>'+
		'{{/each}}'+
		
		'</ul>'

});