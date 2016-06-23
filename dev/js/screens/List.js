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

		this.items = new ListItem({
			template_data : {
				pizzas : this.template_data.pizzas
			}
		});

		this.items.render( this.elements.list_here );
	},

	reactions : {
		pizzas : function(){
			
		},
		flavours : function(){
			
		}
	},

	events : {
		'click .btn-delete-item' : function(e){
			var el = e.srcElement || e.target;

			console.log( this.template_data.pizzas[ el.getAttribute('pizza-index') ].flavours[el.getAttribute('flavour-index')] );
		}
	},

	template : '' +		
		'<ul class="list-wrapper">'+
			'<div id="likes_wrapper"></div>' +
			'<div id="list_here"></div>'+
		'</ul>'

});