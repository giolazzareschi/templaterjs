var CustomerDataService = Templater.extend({

	type: 'CustomerDataService',

	model: {
		url: '../igoapi/validate-cellphone'
	},

	binds: function() {

	},

	request: function( number, callback ) {
		this.model.post(callback, callback, {
			number: number
		});
	},

	template: '<customer-data></customer-data>'

});