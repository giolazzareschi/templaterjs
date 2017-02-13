var OnlyNumberInput = Templater.extend({

	type: 'OnlyNumberInput',

	template_data: {
		value: ''
	},

	constructor: function(config) {

		this.template_data.id = config.id ? config.id : '';

		this.template_data.placeholder = config.placeholder ? config.placeholder : '';

		this.onChange = config.onChange;

		this.base.call(this);
	},

	onChange: function() {},

	setValue: function(number) {
		this.dom.value = number.replace(/\D/gi,'');
	},

	reactions: {
		'value': function(dom, from, to){
			var
				initial = to,
				clean = to
						.replace(/\D/gi,'');

			this.setValue(clean);

			this.onChange(clean);
		}
	},

	template: '<input id="{{id}}" value={{value}} placeholder={{placeholder}} />'

});