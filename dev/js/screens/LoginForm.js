var LoginForm = Templater.extend({

	type: 'LoginForm',

	model: {
		url: '/igoapi/authenticate'
	},

	constructor: function( superData ) {
		this.LoginScreen = superData.LoginScreen;

		this.base.call(this, superData);
	},

	clear: function(argument) {
		this.elements.username.value = '';
		this.elements.password.value = '';
	},

	setUsernameFocus: function() {
		this.elements.username.focus();
	},

	getFormData: function() {
		return {
			username: this.elements.username.value,
			password: this.elements.password.value
		}
	},
	
	validateForm: function() {
		var 
			data = this.getFormData();

		this.clearFormErrorsTimer();

		this.disableForm();

		if( !data.username ){
			this.setFormError('username');
			return false;
		}else if( !data.password ){	
			this.setFormError('password');
			return false;
		}

		return true;
	},

	setFormErrorTimer: undefined,

	setFormError: function( field ) {
		var
			field = this.elements[field];

		this.clearFormErrorsTimer();

		if( field ){
			field.classList.add('error');
			this.setFormErrorTimer = setTimeout(this.clearFormErrors.bind(this), 3000);
		}
	},

	clearFormErrorsTimer: function() {
		this.clearFormErrors();
		clearTimeout(this.setFormErrorTimer);
	},

	clearFormErrors: function() {
		this.elements.username.classList.remove('error');
		this.elements.password.classList.remove('error');
	},

	request: function() {
		this.model.post(this.returnServer, this.returnServer, {
			email: this.elements.username.value,
			password: this.elements.password.value
		});
	},

	returnServer: function(data) {
		if(data.error)
			this.LoginScreen.showErrorMessage();

		this.LoginScreen.goToHomePage(data.auth_token);
	},

	enableForm: function() {
		this.LoginScreen.enableForm();
	},

	disableForm: function() {
		this.LoginScreen.disableForm();
	},

	events: {
		'keyup input': function() {
			this.clearFormErrorsTimer();
		},
		'keydown #username': function(index, e) {
			if(e.keyCode === 13)
				this.elements.password.focus();
		},
		'keyup #password': function(index, e) {
			if( this.elements.username.value !== "" && this.elements.password.value !== "" ){
				this.enableForm();

				if(e.keyCode === 13)
					this.request();
			}else{
				this.disableForm();
			}
		}
	},

	template: '' +
		'<login-form>'+		
			'<!-- fake fields are a workaround for chrome autofill getting the wrong fields -->'+
			'<input style="display:none" type="text" name="fakeusernameremembered"/>'+
			'<input style="display:none" type="password" name="fakepasswordremembered"/>'+
			'<div class="form-row">'+
				'<input type="text" id="username" value="{{email}}" placeholder="{{placeholders.placeholderUsername}}" />'+
			'</div>'+
			'<div class="form-row">'+
				'<input type="password" id="password" value="{{password}}" placeholder="{{placeholders.placeholderPassword}}" />'+
			'</div>'+
		'</login-form>'
});