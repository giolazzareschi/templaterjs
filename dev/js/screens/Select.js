var Select = Templater.extend({

	type : 'Select',

	template : `
		<select id="{{id}}">
			{{#each items}}
				<option value="{{id}}">{{name}}</option>
			{{/each}}
		</select>
	`

});