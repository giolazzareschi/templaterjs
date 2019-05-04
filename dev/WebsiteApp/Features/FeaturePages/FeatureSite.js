Templater.register("FeatureSite", {

  constructor: function(cf) {
    cf.template_data.title = "Site personalizado";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Tenha seu próprio site com sua logo e cores personalizados.",
      },
      {
        title: "",
        description: "Site sempre atualizado com as informações do seu cardápio.",
      },
      {
        title: "",
        description: "Apareça nas buscas do Google.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/ladingpages.png";
  },

  getClassImage: function() {
    return "vertical no-shadow";
  },

}, {}, "FeaturePageBase");