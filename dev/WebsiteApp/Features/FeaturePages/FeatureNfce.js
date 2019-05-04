Templater.register("FeatureNfce", {

  constructor: function(cf) {
    cf.template_data.title = "Nota fiscal NFCe";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Emita nota fiscal de maneira simples.",
      },
      {
        title: "",
        description: "Escolha os pedidos que serão emitidos.",
      },
      {
        title: "",
        description: "Tudo isso online direto pela plataforma.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "https://s3-us-west-1.amazonaws.com/igopizzas-promos-images/default/promo.jpg";
  }

}, {}, "FeaturePageBase");