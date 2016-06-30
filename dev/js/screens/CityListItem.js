var CityListItem = Templater.extend({

	type : 'CityListItem',

	autopaint : true,

	binds : function(){

	},

	template : `{{#each item}}<li>{{name}}</li>{{/each}}`

});