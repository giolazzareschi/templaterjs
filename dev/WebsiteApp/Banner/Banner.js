Templater.register("Banner", {

  binds: function() {
    this.RedActionButton = Templater.create("RedActionButton", {
      template_data: {
        text: "Faça seu teste grátis"
      }
    });
    this.RedActionButton.append(this.elements.RedActionButtonBanner);
  },

  template: 
  '<div>'+
    '<div class="main-banner">'+
      '<div class="container">'+
        '<div class="container-banner">'+
          '<div class="container-banner-left">'+
            '<h1 class="mukta">Sua pizzaria vende mais com a iGo.</h1>'+
            '<h4>Simplifique a gestão operacional de sua pizzaria e foque no que realmente importa: a satisfação do seu cliente.</h4>'+
            '<div class="mobile-gif">'+
              '<img src="./images/banner.gif" />'+
            '</div>'+
            '<div id="RedActionButtonBanner"></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="banner-arrow-wrap">'+
        '<img src="./images/arrow.png" />'+
      '</div>'+
      '<div class="banner-container">'+
        '<div class="banner-container-float">'+
          '<img src="./images/banner.gif" />'+
          '<div class="seconds">'+
            '<div class="seconds">O pedido acima foi feito em 19 segundos.</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'

});