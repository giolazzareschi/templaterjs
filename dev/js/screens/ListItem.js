var ListItem = Templater.extend({

	type : 'ListItem',

	autopaint : true,

	reactions : {
		flavours : {
			add : function(){
				debugger;
			},
			remove : function(){
				debugger;
			}
		}
	},

	template : `
		<div>
		{{#each flavours}}
			<li>
				{{this}}
			</li>
		{{/each}}
		</div>
	`

});