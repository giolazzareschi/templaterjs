var TaskList = TemplaterList.extend({

	type : 'TaskList',

	autopaint : true,

	binds : function(){
		this.tasks = this.template_data.$$item__.items;
	},

	addtask : function( json ){
		this.template_data.$$item__.items.push( json );
	},

	tasks : [],

	template : '<ul id="tasklist"></ul>'

});