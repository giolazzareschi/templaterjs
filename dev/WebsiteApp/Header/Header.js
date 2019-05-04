Templater.register("Header", {

  constructor: function(cf) {
    cf.template_data.hideDesktopVersion = false;
    cf.template_data.hideMobileVersion = true;
    this.base.call(this,cf);
  },

  binds: function() {
    this.renderRedActionButton();
    this.renderByWindowSize(window.innerWidth);
    this.listenWindowSizeChange();
  },

  renderRedActionButton: function() {
    this.RedActionButton = Templater.create("RedActionButton", {
      template_data: {
        text: "Agendar demonstração"
      }
    });
    this.RedActionButton.append(this.elements.RedActionButton);

    this.RedActionButtonMobile = Templater.create("RedActionButton", {
      template_data: {
        text: "Agendar demonstração"
      }
    });
    this.RedActionButtonMobile.append(this.elements.RedActionButtonMobile);
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
    this.setData({
      hideDesktopVersion: false,
      hideMobileVersion: true,
    });
  },
  
  showMobileMenu: function() {
    this.setData({
      hideDesktopVersion: true,
      hideMobileVersion: false,
    });
  },

  openMobileMenu: function() {
    this.elements.MobileMenu.classList.add("open");
  },

  closeMobileMenu: function() {
    this.elements.MobileMenu.classList.remove("open");
  },

  goToEnter: function() {
    if(window.location.href.match(/localhost/gi))
      window.top.location.href = "http://app.localhost/home/login"; 
    else
      window.top.location.href = "http://app.igopizzas.com/home/login"; 
  },

  events: {
    'click .menu-content-mobile': function(index, e) {
      this.openMobileMenu();
    },
    'click .close-mobile': function(index, e) {
      this.closeMobileMenu();
    },
    'click .mobile-menu-wrap a': function(index, e) {
      this.closeMobileMenu();
    },
    'click .menu-enter': function(index, e) {
      this.goToEnter();
    },
    'click .menu-enter-mobile': function(index, e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.goToEnter();
      return false;
    },
  },

  template: 
  '<div>'+
    '<div class="header">'+
      
      '<div id="MobileMenu" class="mobile-menu-wrap">'+
        '<div class="mobile-menu-head">'+
          '<div class="logo">'+
            '<img src="./images/logo.svg" />'+
          '</div>'+
          '<div class="menu-content close-mobile">'+
            '<img src="./images/close.svg" />'+
          '</div>'+
        '</div>'+
        '<div class="mobile-menu-list">'+
          '<a href="#Prices" class="menu-item">Preços</a>'+
          '<a href="#Features" class="menu-item">Funcionalidades</a>'+
          '<a href="https://blog.igopizzas.com/blog" target="_blank" class="menu-item">Blog</a>'+
          '<a href="#" class="menu-item menu-enter-mobile">'+
            '<span>Entrar</span>'+
          '</a>'+
          '<a href="#" id="RedActionButtonMobile"></a>'+
        '</div>'+
      '</div>'+

      '<div class="container" hide={{hideDesktopVersion}}>'+
        '<div class="header-container">'+
          '<div class="logo">'+
            '<img src="./images/logo.svg" />'+
          '</div>'+
          '<div class="menu-content">'+
            '<a href="#Prices" class="menu-item">Preços</a>'+
            '<a href="#Features" class="menu-item">Funcionalidades</a>'+
            '<a href="https://blog.igopizzas.com/blog" target="_blank" class="menu-item">Blog</a>'+
            '<a href="#" class="menu-item menu-enter">Entrar</a>'+
            '<a href="#" class="menu-item menu-enter-mobile">Entrar</a>'+
            '<a href="#" id="RedActionButton"></a>'+
          '</div>'+
        '</div>'+
      '</div>'+

      '<div class="container" hide={{hideMobileVersion}}>'+
        '<div class="header-container mobile">'+
          '<div class="logo">'+
            '<img src="./images/logo.svg" />'+
          '</div>'+
          '<div class="menu-content-mobile">'+
            '<img src="./images/sandwich.svg" />'+
          '</div>'+
        '</div>'+
      '</div>'+

    '</div>'+
  '</div>'

});