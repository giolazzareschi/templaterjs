var TaskScreen = Templater.extend({

	type : 'TaskScreen',

	autopaint : true,

	binds : function(){

		this.tasklist = new TaskList({
			template_data : {
				items : []
			}
		});

		this.tasklist.render( this.elements.tasksarea );

		this.addtask({ name : 'Task 1' });
	},

	addtask : function( json ){
		this.tasklist.addtask( json );
	},

	template : `
		<div id="taskscreen">
			<h1 id="stepmessage">Start creating a task</h1>
			<div id="tasksarea"></div>
		</div>
	`

});