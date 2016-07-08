var ListSearchItem = Templater.extend({

	type : 'ListSearchItem',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click' : function(){
			this.__parent.toggle( this.template_data.$$item__ );
		}
	},

	template : `
		<li hideall="{{allcss.hide}}" hide="{{css.hide}}" selectedall="{{allcss.selected}}" selected="{{css.selected}}" class="{{css.class}}">			
			<label>{{name}}</label>
		</li>`

});