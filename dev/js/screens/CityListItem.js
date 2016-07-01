var CityListItem = Templater.extend({

	type : 'CityListItem',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click' : function(e){
			var children = this.template_data.$$item__, parent = this.__parent.template_data.$$item__;
			if( parent.count < 1 ){
				children.css.selected = "selected";
				parent.count++;
				parent.selected_items.push({id: children.id , name : children.name});
			}else{
				if( this.template_data.$$item__.css.selected === "selected" ){
					this.template_data.$$item__.css.selected = "";
					this.__parent.template_data.$$item__.count--;
					this.__parent.selected_cities.remove_item({id: children.id , name : children.name});
				}
			}
		}
	},

	template : `<li class="{{css.selected}}">{{name}}</li>`

});