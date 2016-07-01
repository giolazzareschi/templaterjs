var CityList = TemplaterList.extend({

	type : 'CityList',

	autopaint : true,

	binds : function(){		
		
	},

	template : `<ul class="city-list {{cssClass}}"><div>{{limit}}</div></ul>`

});