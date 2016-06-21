var List = Templater.extend({

	autopaint : true,

	binds : function(){

	},

	template : '' +
		'<div class="list-wrapper">'+
			'<div id="list_items">{{name}}</div>'+
			'<input value="{{name}}" />'+
			'<select>'+
				'{{#each phones}}'+
					'<option>{{this}}</option>'+
				'{{/each}}'+
			'</select>'+
		'</div>'

});