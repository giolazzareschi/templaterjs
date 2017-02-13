var PhoneInput = Templater.extend({

	type: 'PhoneInput',

	constructor: function(config) {

		if( config.id )
			this.template_data.id = config.id;

		this.onChange = config.onChange;

		this.base.call(this);
	},

	binds: function() {
		
	},

	onChange: function() {},

	clear: function() {
		this.setData({
			phone: ''
		});
	},

	template_data: {
		phone: ''
	},

	events: {
		'keyup': function(e) {

			var input = e.currentTarget;

			if(e.keyCode === 8){
				if( input.value.substr(-1) !== '-' )
					e.currentTarget.value = e.currentTarget.value.substr(0,e.currentTarget.value.length);
				else
					e.currentTarget.value = e.currentTarget.value.substr(0,e.currentTarget.value.length-1);
			}
		}
	},

	reactions: {
		'phone': function(dom, from, to) {
			var
				initial = to,
				clean = to
						.replace(/\D/gi,'')
						.replace(/(\d\d)(\d{4})(\d{0,4}).*/g,"($1) $2-$3");

			dom.value = clean;

			if( clean ){
				this.onChange(clean);
			}
		}
	},

	template: '<input id="{{id}}" value="{{phone}}" placeholder="(99) 99999-9999" />'

});