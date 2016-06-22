var List = Templater.extend({

	type : 'List',

	autopaint : true,

	binds : function(){
		this.likes = new Likes({
			template_data : {
				counter : 0
			}
		});

		this.likes.render( this.elements.likes_wrapper );
	},

	reactions : {
		pizzas : function(){
			
		},
		flavours : function(){
			
		}
	},

	template : '' +		
		'<ul class="list-wrapper">'+
		
		'<div id="likes_wrapper"></div>' +

		'{{#each pizzas}}'+
			'<div class="todo-list">'+
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