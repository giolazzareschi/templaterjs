Templater.register("Plans", {

  constructor: function(cf) {
    this.mapPeriod = {
      '0': 'por mês',
      '0.2': 'trimestral',
      '0.35': 'anual',
    };
    this.mapBasic = {
      '0': '89',
      '0.2': '213',
      '0.35': '694',
    };
    this.mapPriceTri = {
      '0': '119',
      '0.2': '285',
      '0.35': '928',
    };
    this.mapPriceYear = {
      '0': '158',
      '0.2': '357',
      '0.35': '1162',
    };
    cf.template_data.periodBasic = "";
    cf.template_data.periodAdvanced = "";
    cf.template_data.periodProfessional = "";
    cf.template_data.priceBasic = this.mapBasic[0];
    cf.template_data.priceAdvanced = this.mapPriceTri[0];
    cf.template_data.priceProfessional = this.mapPriceYear[0];
    this.base.call(this,cf);
  },

  binds: function() {
    this.setDiscount(0);
    this.appendRedActionButtons();
  },

  setDiscount: function(discount) {
    this.setData({
      periodBasic: this.mapPeriod[String(discount)],
      periodAdvanced: this.mapPeriod[String(discount)],
      periodProfessional: this.mapPeriod[String(discount)],
      priceBasic: this.mapBasic[String(discount)],
      priceAdvanced: this.mapPriceTri[String(discount)],
      priceProfessional: this.mapPriceYear[String(discount)],
    });
  },

  appendRedActionButtons: function() {
    this.RedActionButtonBasic = Templater.create("RedActionButton");
    this.RedActionButtonBasic.render(this.elements.RedActionButtonBasic);
    this.RedActionButtonAdvanced = Templater.create("RedActionButton");
    this.RedActionButtonAdvanced.render(this.elements.RedActionButtonAdvanced);
    this.RedActionButtonProfessional = Templater.create("RedActionButton");
    this.RedActionButtonProfessional.render(this.elements.RedActionButtonProfessional);
  },

  template: 
  '<div>'+
    '<div class="container">'+
      '<ul class="list-boxes">'+

        '<li class="list-boxes-item" hide=true>'+
          '<div>'+
            '<strong class="mukta">Básico</strong>'+
          '</div>'+
          '<div class="price-box mukta">'+
            '<div class="currency">R$</div>'+
            '<div class="decimal">{{priceBasic}}</div>'+
            '<div class="rest">,90</div>'+
          '</div>'+
          '<div class="price-period">'+
            '<span>{{periodBasic}}</span>'+
          '</div>'+
          '<div class="action-button" id="RedActionButtonBasic"></div>'+
          '<ul class="list-features">'+
            '<li>Plataforma de gestão</li>'+
            '<li>Controle de motoboys</li>'+
            '<li>Fechamento de caixa</li>'+
            '<li>Relatórios</li>'+
            '<li>Suporte por chat</li>'+
          '</ul>'+
        '</li>'+

        '<li class="list-boxes-item" hide=true>'+
          '<div>'+
            '<strong class="mukta">Avançado</strong>'+
          '</div>'+
          '<div class="price-box mukta">'+
            '<div class="currency">R$</div>'+
            '<div class="decimal">{{priceAdvanced}}</div>'+
            '<div class="rest">,90</div>'+
          '</div>'+
          '<div class="price-period">'+
            '<span>{{periodAdvanced}}</span>'+
          '</div>'+
          '<div class="action-button" id="RedActionButtonAdvanced"></div>'+
          '<ul class="list-features">'+
            '<li>Plataforma de gestão</li>'+
            '<li>Controle de motoboys</li>'+
            '<li>Fechamento de caixa</li>'+
            '<li>Relatórios</li>'+
            '<li>Suporte por chat</li>'+
            '<li>SMS</li>'+
            '<li>Fidelidade</li>'+
            '<li>Mapa de calor de pedidos</li>'+
          '</ul>'+
        '</li>'+

        '<li class="list-boxes-item">'+
          '<div>'+
            '<strong class="mukta">Profissional</strong>'+
          '</div>'+
          '<div class="price-box mukta">'+
            '<div class="currency">R$</div>'+
            '<div class="decimal">{{priceProfessional}}</div>'+
            '<div class="rest">,70</div>'+
          '</div>'+
          '<div class="price-period">'+
            '<span>{{periodProfessional}}</span>'+
          '</div>'+
          '<div class="action-button" id="RedActionButtonProfessional"></div>'+
          '<ul class="list-features">'+
            '<li>Plataforma de gestão</li>'+
            '<li>Controle de motoboys</li>'+
            '<li>Fechamento de caixa</li>'+
            '<li>Relatórios</li>'+
            '<li>Suporte por chat</li>'+
            '<li>SMS</li>'+
            '<li>Fidelidade</li>'+
            '<li>Mapa de calor de pedidos</li>'+
            // '<li>Integração IFood</li>'+
            '<li>Loja virtual + (5% de comissão de pedidos entregues)</li>'+
            // '<li>Site personalizado</li>'+
          '</ul>'+
        '</li>'+

      '</ul>'+
    '</div>'+
  '</div>'

});