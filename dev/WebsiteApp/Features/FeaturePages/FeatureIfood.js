Templater.register("FeatureIfood", {

  constructor: function(cf) {
    cf.template_data.title = "Integração com iFood";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "Agilidade",
        description: "Receba os pedidos do iFood automaticamente na plataforma.",
      },
      {
        title: "Gestão",
        description: "Veja de forma clara quantos % da sua pizzaria vem do iFood.",
      },
      {
        title: "Controle",
        description: "Tudo integrado com nossos relatórios gerenciais.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/screen3.png";
  }

}, {}, "FeaturePageBase");