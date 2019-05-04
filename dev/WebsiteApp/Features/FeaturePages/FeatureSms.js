Templater.register("FeatureSms", {

  constructor: function(cf) {
    cf.template_data.title = "Sms";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Envie campanhas promocionais de SMS para seus clientes.",
      },
      {
        title: "",
        description: "Receba avaliações dos seus clientes por SMS.",
      },
      {
        title: "",
        description: "Informe seu cliente que o pedido saiu para entrega.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/screen5.png";
  },

  getClassImage: function() {
    return "vertical";
  },

}, {}, "FeaturePageBase");