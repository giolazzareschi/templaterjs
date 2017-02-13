var NewOrderScreen = Templater.extend({

	type: 'NewOrderScreen',

	timerBlurCellphone: 0,

	binds: function() {
		this.OrderFormatter = new OrderFormatter({template_data: this.template_data});

		this.PhoneInput = new PhoneInput({
			id: 'cellphone',
			onChange: this.setTelefone.bind(this)
		});

		this.PhoneInput.clear();

		this.OnlyNumberInput = new OnlyNumberInput({
			id: 'numero_endereco',
			placeholder: 'Nº',
			onChange: this.setNumeroEndereco.bind(this)
		});

		this.OrderManager = new OrderManager({
			template_data: this.template_data
		});

		this.DraftArea = new DraftArea({
			OrderManager: this.OrderManager,
			template_data: this.template_data
		});
		this.PizzaElements = new PizzaElements({
			OrderManager: this.OrderManager,
			template_data: this.template_data
		});

		this.CustomerDataService = new CustomerDataService();

		this.PhoneInput.append(this.elements.phone_area,1);
		this.OnlyNumberInput.append(this.elements.area_complemento, 0);
		this.DraftArea.render(this.elements.draft_area);
		this.PizzaElements.append(this.elements.pizza_elements);
	},

	selectOrderType: function( type ) {
		if( type === 'entrega' ){

			if( this.template_data.telefone )
				this.getUserDataByCellphone(this.template_data.telefone);

			this.setData({
				is_balcao: 0,
				num_mesa: 0,
				disableWhenIsBalcao: false,
				disableWhenIsMesa: true,
				num_mesa: 0
			});
		}else if( type === 'balcao' ){
			this.setData({
				is_balcao: 1,
				num_mesa: 0,
				endereco_rua: '',
				endereco_numero: '',
				endereco_complemento: '',
				disableWhenIsBalcao: true,
				disableWhenIsMesa: true,
				num_mesa: 0
			});

			this.OnlyNumberInput.setValue('');
		}else if( type === 'mesa' ){
			this.setData({
				is_balcao: 0,
				num_mesa: 1,
				endereco_rua: '',
				endereco_numero: '',
				endereco_complemento: '',
				disableWhenIsBalcao: true,
				disableWhenIsMesa: false,
				num_mesa: this.getNumMesa()
			});

			this.OnlyNumberInput.setValue('');
		}
	},

	getNumMesa: function() {
		return this.elements.num_mesa.value;
	},

	setTelefone( number ){
		this.setData({
			telefone: number
		});
	},

	setNumeroEndereco: function( number ) {
		this.setData({
			endereco_numero: number
		});
	},

	getUserDataByCellphone: function(number) {
		this.showLoadingCellphone();

		this.CustomerDataService.request(number, this.renderUserData.bind(this));
	},

	renderUserData: function( data ) {
		this.hideLoadingCellphone();

		if( data.nome ){

			var
				endereco = data.enderecos[0],
				endereco_rua = endereco ? endereco.endereco : '',
				endereco_numero = endereco ? endereco.numero : '',
				endereco_complemento = endereco ? endereco.endereco_complemento : '';

			this.setData({
				nome: data.nome,
				endereco_rua: endereco_rua,
				endereco_numero: endereco_numero,
				endereco_complemento: endereco_complemento,
			});

			this.OnlyNumberInput.setValue(endereco_numero);
		}else{	
			this.setData({
				nome: '',
				endereco_rua: '',
				endereco_numero: '',
				endereco_complemento: '',
			});

			this.elements.customername.focus();

			this.OnlyNumberInput.setValue('');
		}
	},

	unfocusFields: function() {
		clearTimeout(this.timerBlurCellphone);

		this.elements.btn_entrega.focus();
	},

	hideLoadingCellphone: function() {
		this.elements.loading_cellphone.classList.add('hide');
	},

	showLoadingCellphone: function() {
		this.elements.loading_cellphone.classList.remove('hide');
	},

	events: {
		'keyup #cellphone': function(index, e) {
			clearTimeout(this.timerBlurCellphone);

			if( e.currentTarget.value.length >= 14 )
				this.timerBlurCellphone = setTimeout(this.unfocusFields.bind(this), 850);
		},
		'blur #cellphone': function() {
			this.getUserDataByCellphone(this.template_data.telefone);
		},
		'click .buttons-type-order button': function(index, e) {
			var
				type = e.currentTarget.getAttribute('data-type');

			this.elements.btn_entrega.classList.remove('selected');
			this.elements.btn_balcao.classList.remove('selected');
			this.elements.btn_mesa.classList.remove('selected');

			e.currentTarget.classList.add('selected');

			this.selectOrderType(type);
		},
		'click #btn_infos': function() {
			console.log( this.template_data );
		},
		'change #num_mesa': function() {
			this.setData({
				num_mesa: this.getNumMesa()
			});
		}
	},

	canSave: function() {
		this.OrderManager.canSave();
	},

	template: ''+
		'<div class="new-order flex-box">'+
			'<div class="form">'+
				'<div class="form-wrap">'+
					'<div class="form-row">'+
						'<div id="buttons_type" class="grid-twenty-five cell buttons-type-order">'+
							'<button class="btn-primary selected" id="btn_entrega" data-type="entrega">Entrega</button>'+
							'<button class="btn-primary" id="btn_balcao" data-type="balcao">Balcão</button>'+
							'<button class="btn-primary" id="btn_mesa" data-type="mesa">Mesa</button>'+
						'</div>'+
					'</div>'+
					'<div class="form-row">'+
						'<div id="phone_area" class="grid-fourty cell">'+
							'<button class="btn-primary" id="btn_infos">Infos</button>'+
							'<span class="loading-cellphone hide" id="loading_cellphone"><span class="animate-spin icon-loading"></span></span>'+
						'</div>'+
						'<div class="grid-flex cell">'+
							'<input placeholder="Nome do cliente" id="customername" value="{{nome}}" />'+
						'</div>'+
					'</div>'+
					'<div class="form-row" hide="{{disableWhenIsBalcao}}">'+
						'<div class="grid-flex cell">'+
							'<input placeholder="Local de entrega" value="{{endereco_rua}}" />'+
						'</div>'+
						'<div id="area_complemento" class="grid-flex cell area-complemento">'+
							'<input placeholder="Complemento" id="complement_endereco" value="{{endereco_complemento}}" />'+
						'</div>'+
					'</div>'+
					'<div class="form-row" hide="{{disableWhenIsMesa}}">'+
						'<div class="grid-flex cell">'+
							'<select id="num_mesa">'+
								'<option>Mesa 1</option>'+
								'<option>Mesa 2</option>'+
								'<option>Mesa 3</option>'+
								'<option>Mesa 4</option>'+
								'<option>Mesa 5</option>'+
								'<option>Mesa 6</option>'+
								'<option>Mesa 7</option>'+
							'</select>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div id="pizza_elements"></div>'+
			'</div>'+
			'<div class="draft-area-wrap" id="draft_area"></div>'+
		'</div>'
});