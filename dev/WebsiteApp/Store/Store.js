Templater.register("Store", {

  constructor: function(cf) {
    cf.template_data.hideMobileVersion = true;
    this.base.call(this,cf);
  },

  binds: function() {
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Otimize seu tempo de atendimento',
        description: 'Simplifique os processos para realizar os pedidos, diminuindo o tempo de atendimento.',
        icon: './images/clock.svg'
      }
    });
    this.ClockInfo.append(this.elements.infos);
    
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Seja mais ágil usando o Whatsapp',
        description: 'Otimize os pedidos, disponibilizando as informações essenciais para guiar o cliente. Deixe que o WhatsApp faça o resto.',
        icon: './images/whats.svg'
      }
    });
    this.ClockInfo.append(this.elements.infos);
    
    this.ClockInfo = Templater.create("InfoWrap", {
      template_data: {
        title: 'Conheça seu público',
        description: 'Tenha o histórico de pedidos de seus clientes e crie estratégias promocionais para satisfazer e manter seu público fiel.',
        icon: './images/recommend.svg'
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
    '<div class="container">'+
      '<div class="store-grid">'+
        
        '<div id="infos" class="store-grid-left">'+
          '<h1 class="mukta">Mais agilidade nos pedidos de entrega</h1>'+

          '<div class="mobile-bg" hide={{hideMobileVersion}}>'+
            '<img src="./images/appstore.png" />'+
          '</div>'+

        '</div>'+

      '</div>'+
    '</div>'+
  '</div>'

});