var TaskListItem = Templater.extend({

	type : 'TaskListItem',

	autopaint : true,

	binds : function(){
		
	},

	template : `
		<li>
			<input placeholder="Name task here:" value="{{name}}" />
		</li>
	`

});