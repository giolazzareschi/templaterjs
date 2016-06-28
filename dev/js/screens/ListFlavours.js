var ListFlavours = TemplaterList.extend({

	type : 'ListFlavours',

	autopaint : true,

	binds : function(){		
		
	},

	events : {
		'click .add' : function(){
			this.template_data.items.push({name : +new Date, age : 35, phones : ["dddddddd"]});
		}
	},

	template : `
		<div>
			<button class="add"> ADD </button>
			<div id="itemss" class="itemss"></div>
		</div>`

});