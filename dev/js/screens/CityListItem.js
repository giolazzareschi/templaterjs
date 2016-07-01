var CityListItem = Templater.extend({

	type : 'CityListItem',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click' : function(e){
			this.template_data.item.css.selected = this.template_data.item.css.selected ? "" : "selected";
		}
	},

	template : `<li class="{{item.css.selected}}">{{item.name}}</li>`

});