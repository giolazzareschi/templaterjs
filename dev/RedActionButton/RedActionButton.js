Templater.register("RedActionButton", {

  constructor: function(cf) {
    cf.template_data.text = cf.template_data.text || "Faça seu teste grátis";
    this.base.call(this,cf);
  },

  openRegister: function() {
    window.open("http://igopizzas.rds.land/agende-uma-demo", "_blank");
  },

  events: {
    'click': function() {
      this.openRegister();
    }
  },

  template: 
  '<div class="RedActionButton">{{text}}</div>'

});