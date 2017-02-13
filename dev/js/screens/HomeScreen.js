var HomeScreen = Templater.extend({

	type: 'HomeScreen',

	buttons: [],

	binds: function() {
		this.buttons = this.dom.querySelectorAll('.menu-wrap');
	},

	setContent: function( contentClass ) {
		contentClass.render(this.elements.content_area);
	},

	resetView: function() {
		this.elements.content_area.innerHTML = '';
	},

	unselectAllButtons: function() {
		for(var i=0, qt=this.buttons.length; i<qt; i++)
			this.buttons[i].classList.remove('selected');
	},

	selectButton(index){
		this.unselectAllButtons();
		this.buttons[index].classList.add('selected');
	},

	events: {
		'click #new_order': function() {
			GlobalContext.navigate('new-order');
		},
		'click #home': function() {
			GlobalContext.navigate('');
		}
	},

	template: '' +
		'<home-screen>' +
			'<div class="entry_point home-screen">'+
				'<div class="main-header">'+
					'<div class="menu-wrap"><a id="home">Início</a></div>'+
					'<div class="menu-wrap"><a id="new_order">Novo pedido</a></div>'+
					'<div class="menu-wrap"><a href="#logout">Sair</a></div>'+
				'</div>'+
				'<div class="flex-box flex-content">'+
					'<div id="content_area" class="content-area"></div>'+
				'</div>'+
			'</div>'+
		'</home-screen>'

});