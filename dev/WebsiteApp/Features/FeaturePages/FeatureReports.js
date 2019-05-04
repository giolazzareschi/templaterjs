Templater.register("FeatureReports", {

  constructor: function(cf) {
    cf.template_data.title = "Gerencie sua pizzaria com base nos dados que mais importam para você tudo online";
    this.base.call(this,cf);
  },

  binds: function() {
    this.features = [
      {
        title: "Quais sabores você mais vende",
        description: "Foque nos itens que mais vende e até mesmo remover do cardápio itens não vendidos.",
      },
      {
        title: "Mapa de calor de vendas",
        description: "Entenda o comportamento das suas campanhas de marketing, quais bairros você vende mais e onde não faz sentido continuar vendendo.",
      },
      {
        title: "Clientes",
        description: "Tenha informações completas de seus clientes ultimas compras, total gasto pelo clientes, cartão de pontos etc.",
      },
      {
        title: "Fechamento de caixa",
        description: "De forma estruturada e simples sua pizzaria terá as informações detalhadas de caixa diariamente.",
      },
    ];
    this.base.call(this);
  },

  getImage: function() {
    return "./images/screen2.png";
  }

}, {}, "FeaturePageBase");