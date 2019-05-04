Templater.register("FeatureStore", {

  constructor: function(cf) {
    cf.template_data.title = "Loja online";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Totalmente integrada ao Whatsapp.",
      },
      {
        title: "",
        description: "Receba os pedidos automaticamente pela plataforma e economize com atendimento telefônico.",
      },
      {
        title: "",
        description: "Muito mais agilidade.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/screen4.png";
  },

  getClassImage: function() {
    return "vertical no-shadow";
  },

}, {}, "FeaturePageBase");