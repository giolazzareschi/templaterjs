var List = Templater.extend({

	type : 'List',

	autopaint : true,

	binds : function(){

		this.flavours = new ListFlavours({
			template_data : {
				items : this.template_data.pizzas[0].flavours
			}
		});

		this.flavours.render( this.elements.list_here );
	},

	reactions : {
		pizzas : function(){
			
		},
		flavours : function(){
			
		}
	},

	template : `		
		<ul class="list-wrapper">
			<div id="likes_wrapper"></div>
			<ul id="list_here"></ul>
		</ul>
	`

});