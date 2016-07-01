var ListSearchItem = Templater.extend({

	type : 'ListSearchItem',

	autopaint : true,

	binds : function(){

	},

	template : `<li hideall="{{allcss.hide}}" hide="{{css.hide}}" selectedall="{{allcss.selected}}" selected="{{css.selected}}" class="{{css.class}}">{{name}}</li>`

});