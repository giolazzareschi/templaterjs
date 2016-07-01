var SearchBar = Templater.extend({

	type : 'SearchBar',

	autopaint : true,

	binds : function(){

		var list_search = new ListSearch({
			template_data : {
				items : this.template_data.$$item__.items
			}
		});

		list_search.render( this.dom );
		this.render( document.body );

	},

	template : `
	<div class="search-bar">
		<div class="search-input-wrapper">
			<input placeholder="Search here:" />
		</div>
	</div>
	`

});