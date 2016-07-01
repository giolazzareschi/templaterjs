var CityList = TemplaterList.extend({

	type : 'CityList',

	autopaint : true,

	binds : function(){		
		var cities = new SelectedCities({
			template_data : this.template_data.$$item__.selected_items
		});

		this.render( document.querySelector('#entry_point') );
		this.selected_cities = cities;
		cities.append( document.querySelector('#entry_point') );
	},

	template : `<ul class="{{cssClass}}"></ul>`

});