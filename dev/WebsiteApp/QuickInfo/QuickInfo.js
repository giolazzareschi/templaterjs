Templater.register("QuickInfo", {

  constructor: function(cf) {
    cf.template_data.hideMobileVersion = true;
    this.base.call(this,cf);
  },

  binds: function() {
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Pedido fácil e rápido',
        description: 'Pedidos organizados e claros para o pizzaiolo, evitando erros e melhorando a gestão do tempo da pizzaria.',
        icon: './images/objective.svg'
      }
    });
    this.ClockInfo.append(this.elements.infos);
    
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Controle seu caixa',
        description: 'Agilize o processo de fechamento de vendas do dia. Relatório rápido dos produtos vendidos e valores recebidos.',
        icon: './images/analysis.svg'
      }
    });
    this.ClockInfo.append(this.elements.infos);
    
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Conte com a gente',
        description: 'Dúvidas? Nossa equipe está sempre disponível para ajudá-lo.',
        icon: './images/service.svg'
      }
    });
    this.ClockInfo.append(this.elements.infos);

    this.renderByWindowSize(window.innerWidth);
    this.listenWindowSizeChange();
  },

  listenWindowSizeChange: function() {
    Templater.Classes.WebsiteApp.PubSub.subscribe("windowResize", this.windowSizeChange.bind(this));
  },

  windowSizeChange: function(data) {
    this.renderByWindowSize(data.width);
    this.listenWindowSizeChange();
  },

  renderByWindowSize: function(width) {
    if(width < 768)
      this.showMobileMenu();
    else
      this.showDesktopMenu();
  },
  
  showDesktopMenu: function() {
    this.dom.classList.remove("mobile");
    this.setData({
      hideMobileVersion: true,
    });
  },
  
  showMobileMenu: function() {
    this.dom.classList.add("mobile");
    this.setData({
      hideMobileVersion: false,
    });
  },

  template: 
  '<div>'+
    '<div class="quick-container">'+
      '<div class="quick-container-float">'+
        '<img src="./images/screen1.png" />'+
      '</div>'+
    '</div>'+
  
    '<div class="container">'+

      '<div class="store-grid">'+
        
        '<div class="store-grid-left">'+
        '</div>'+

        '<div id="infos" class="store-grid-right">'+
          '<h1 class="mukta">Fácil gerenciamento e controle de pedidos</h1>'+
          
          '<div class="mobile-image" hide={{hideMobileVersion}}>'+
            '<img src="./images/screen1.png" />'+
          '</div>'+

        '</div>'+

      '</div>'+
    '</div>'+
  '</div>'

});