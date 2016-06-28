var ListFlavours = TemplaterList.extend({

	type : 'ListFlavours',

	autopaint : true,

	binds : function(){

	},

	events : {
		'click .add' : function(){
			this.template_data.items.push({name : +new Date});
		}
	},

	template : `
		<div>
			<button class="add"> ADD </button>
			<div class="itemss"></div>
		</div>`

});