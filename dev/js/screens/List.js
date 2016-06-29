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

		this.places = new Places({
			template_data : {
				places: this.template_data.places
			}
		});

		this.places.render( this.elements.placeshere );

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
			<ul id="placeshere"></ul>
		</ul>
	`

});