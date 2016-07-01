var SelectedCities = TemplaterList.extend({

	type : 'SelectedCities',

	autopaint : true,

	binds : function(){		
		
	},

	remove_item : function( item ){
		var items = this.template_data.$$item__;
		for( var tt in items ){
			if( items[ tt ].id === item.id ){
				this.template_data.$$item__.pop( tt * 1 );
			}
		}
	},

	template : `<ul class="selected-cities"></ul>`

});