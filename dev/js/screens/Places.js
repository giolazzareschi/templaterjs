var Places = Templater.extend({

	type : 'Places',

	autopaint : true,

	binds : function(){		
		
	},

	events : {
		'change #states' : function(e){
			debugger;
		}
	},

	template : `
		<div>
			<select id="countries">
			{{#each places}}
				<option value="{{id}}">{{name}}</option>
			{{/each}}
			</select>
			
			<select id="states">
			{{#each places}}
				{{#each states}}
					<option value="{{id}}">{{name}}</option>
				{{/each}}
			{{/each}}
			</select>

			<select id="cities">
			{{#each places}}
				{{#each states}}
					{{#each cities}}
						<option value="{{id}}">{{name}}</option>
					{{/each}}
				{{/each}}
			{{/each}}
			</select>
		</div>
	`

});