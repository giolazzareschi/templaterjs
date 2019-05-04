Templater.register("FeatureOnline", {

  constructor: function(cf) {
    cf.template_data.title = "Atendimento online";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "",
        description: "Atenda seus clientes de maneira rápida e eficiente.",
      },
      {
        title: "",
        description: "Histórico de últimos pedidos ao digitar celular.",
      },
      {
        title: "",
        description: "Controle as fases do pedido como Produção, Entrega e Concluído na tela do operador.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/loja.png";
  },

  getClassImage: function() {
    return "vertical";
  }

}, {}, "FeaturePageBase");