'use strict';

if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

var	
	data,
	GlobalContext = new GlobalContext(),
	Routes = {
		'': function() {
			if( !GlobalContext.HomeScreen )
				GlobalContext.HomeScreen = new HomeScreen();

			GlobalContext.SessionManager.renderView(GlobalContext.HomeScreen);
			
			GlobalContext.HomeScreen.resetView();

			GlobalContext.HomeScreen.selectButton(0);
		},
		'login': function() {
			var
				loginScreen = new LoginScreen({
					template_data: {
						buttonDisabled: false,
						hideErrorMessage: 'hide',
						loginData: {
							email: '',
							password: '',
							placeholders: {
								placeholderPassword: 'Senha',
								placeholderUsername: 'Nome do usuário'
							}
						}
					}
				});

			GlobalContext.SessionManager.renderView(loginScreen);
		},
		'logout': function() {
			GlobalContext.restartApp();
		},
		'new-order': function() {
			var
				newOrder = new NewOrderScreen({template_data: {
						disableWhenIsBalcao: false,
						disableWhenIsMesa: true,
						hideWhenOrderIsEmpty: true,
						telefone: '',
						ismanual: 1,
						is_balcao: 0,
						num_mesa: 0,
						nome: '',
						endereco_rua: '',
						endereco_numero: '',
						endereco_bairro: '',
						endereco_complemento: '',
						pizzas: [],
						bebidas: [],
						pagamentos: []
					}
				});

			Routes['']();

			window.newOrder = newOrder;

			GlobalContext.HomeScreen.setContent(newOrder);

			GlobalContext.HomeScreen.selectButton(1);
		}
	};

function start_app(){
	
	GlobalContext.Router.setLoginRoute('login');
	for(var route in Routes)
		GlobalContext.Router.register(route, Routes[route]);

	(new Templater({
		binds : function(){
			this.SessionManager = new SessionManager();
			this.SessionManager.render(document.body);
			GlobalContext.navigateToLastRoute();
		}
	}));
};