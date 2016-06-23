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

		var pizzas = this.template_data.pizzas, list_here = this.elements.list_here;

		this.clear( list_here );

		for(var i=0, qt=pizzas.length; i < qt; i++){
			var flavours = pizzas[ i ].flavours, item;
			
			item = new ListItem({
				template_data : {
					flavours : flavours
				}
			});

			item.append( list_here );
		}

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

	template : `		
		<ul class="list-wrapper">
			<div id="likes_wrapper"></div>
			<ul id="list_here"></ul>
		</ul>
	`

});