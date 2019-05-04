Templater.register("Footer", {

  constructor: function(cf) {
    cf.template_data.year = (new Date).getFullYear();
    this.base.call(this,cf);
  },

  open: function(url) {
    window.open(url, "_blank");
  },

  events: {
    'click #insta': function() {
      this.open("https://www.instagram.com/iGoPizzas/");
    },
    'click #face': function() {
      this.open("https://www.facebook.com/iGoPizzas/");
    },
  },

  template: 
  '<div>'+
    '<div class="container">'+
      '<div class="grid-footer">'+
        '<div class="grid-cell side">'+
          '<img class="logo" src="./images/logo.svg" />'+
        '</div>'+
        '<div class="grid-cell copyright">© <label>{{year}}</label> Direitos Reservados</div>'+
        '<div class="grid-cell side brands">'+
          '<img id="insta" src="./images/facebook-brands.svg" />'+
          '<img id="face"src="./images/instagram-brands.svg" />'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'

});