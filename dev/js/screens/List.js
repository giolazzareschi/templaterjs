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

	events : {
		'click #thechanger' : function(e){
			++this.likes.template_data.counter;
		}
	},

	template : '' +		
		'<ul class="list-wrapper">'+
		
		'<button id="thechanger">The Changer</button>'+
		
		'<div id="likes_wrapper"></div>' +

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