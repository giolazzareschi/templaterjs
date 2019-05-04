Templater.register("FeatureFidelidade", {

  constructor: function(cf) {
    cf.template_data.title = "Fidelidade";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Crie seu programa de fidelidade com seu cliente.",
      },
      {
        title: "",
        description: "Personalize da maneira que você achar melhor, por compra ou pizza e bonifique seus clientes mais fieis.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/screen6.png";
  },

  getClassImage: function() {
    return "";
  },

}, {}, "FeaturePageBase");