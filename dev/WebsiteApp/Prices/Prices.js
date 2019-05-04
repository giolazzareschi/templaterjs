Templater.register("Prices", {

  binds: function() {
    this.createPriceSelector();
    this.createPlans();
  },

  createPriceSelector: function() {
    this.PriceSelector = Templater.create("PriceSelector", {
      onSelect: this.onSelectDiscount.bind(this)
    });
    this.PriceSelector.render(this.elements.PriceSelector);
  },

  onSelectDiscount: function(discount) {
    this.Plans.setDiscount(discount);
  },

  createPlans: function() {
    this.Plans = Templater.create("Plans");
    this.Plans.render(this.elements.Plans);
  },

  template: 
  '<div id="Prices">'+
    '<div class="container">'+
      '<h1 class="mukta mukta-title">O plano ideal para sua pizzaria</h1>'+
      '<h3>O principal é ajudar você e seu negócio. Aproveite o nosso teste grátis e tire suas dúvidas com nosso suporte.</h3>'+
      '<div id="PriceSelector"></div>'+
      '<div id="Plans"></div>'+
    '</div>'+
  '</div>'

});