var List = Templater.extend({

	type : 'List',

	autopaint : true,

	binds : function(){

	},

	reactions : {
		pizzas : function(){
			
		},
		flavours : function(){
			
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
						'<span><input value="{{this}}" /></span>'+
					'</li>'+
				'{{/each}}'+
				'</ul>'+
			'</div>'+
		'{{/each}}'+
		
		'</ul>'

});