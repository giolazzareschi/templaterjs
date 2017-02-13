var LoginScreen = Templater.extend({

	type: 'LoginScreen',

	binds: function() {
		this.LoginForm = new LoginForm({
			LoginScreen: this,
			template_data: this.template_data.loginData
		});

		this.LoginForm.render(this.elements.loginform);
	},

	goToHomePage: function(auth_token) {
		if( auth_token ){
			GlobalContext.navigate('');

			GlobalContext.preserveAuthenticationToken(auth_token);
		}
	},

	setUsernameFocus: function() {
		this.LoginForm.setUsernameFocus();
	},

	clearForm: function() {
		this.LoginForm.clear();
	},

	showErrorMessage: function() {
		this.setData({
			hideErrorMessage: false
		});

		GlobalContext.clearAuthenticationToken();

		setTimeout(this.hideErrorMessage.bind(this), 3000);
	},

	hideErrorMessage: function() {
		this.setData({
			hideErrorMessage: 'hide'
		});
	},

	enableForm: function() {
		this.setData({
			'buttonDisabled': false
		});
	},

	disableForm: function() {
		this.setData({
			'buttonDisabled': true
		});
	},

	render: function() {
		this.setUsernameFocus();
		this.clearForm();

		this.base.call(this, arguments[0]);
	},

	events: {
		'click button': function(index, e) {
			if( this.LoginForm.validateForm() )
				this.LoginForm.request();
		}
	},

	template: '' +
		'<login-screen class="login-screen fullsized centered">' +
			'<div><img src="images/igo_negativo_shadow.png" /></div>'+
			'<div class="form-login form-wrap">'+
				'<h2>'+
					'Não tem login? <a href="#">Faça aqui</a>!'+
				'</h2>'+
				'<h5 class="{{hideErrorMessage}}">'+
					'Credenciais inválidas.'+
				'</h5>'+
				'<div id="loginform"></div>'+
				'<div class="form-row">'+
					'<button type="submit" class="btn-primary" disabled="{{buttonDisabled}}">'+
						'Entrar'+
					'</button>'+
				'</div>'+
			'</div>'+
		'</login-screen>'

});