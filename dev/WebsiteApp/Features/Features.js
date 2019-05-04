Templater.register("Features", {

  constructor: function(cf) {
    cf.template_data.image = "";
    cf.template_data.classImage = "";
    this.base.call(this,cf);
  },

  binds: function() {
    this.createFeatureButtonsList();
  },

  createFeatureButtonsList: function() {
    this.FeatureButtonsList = Templater.create("FeatureButtonsList", {
      onSelect: this.onSelectFeature.bind(this)
    });
    this.FeatureButtonsList.render(this.elements.FeatureButtonsList);
    this.FeatureButtonsList.setItems(this.getButtons());
    this.FeatureButtonsList.select(0);
  },

  getButtons: function() {
    return [
      {name: 'Relatórios', class: 'FeatureReports'},
      {name: 'Integração com iFood', class: 'FeatureIfood'},
      {name: 'Atendimento online', class: 'FeatureOnline'},
      {name: 'Loja online', class: 'FeatureStore'},
      {name: 'Site personalizado', class: 'FeatureSite'},
      {name: 'SMS', class: 'FeatureSms'},
      {name: 'Fidelidade', class: 'FeatureFidelidade'},
      // {name: 'Nota Fiscal NFCe', class: 'FeatureNfce'},
    ]
  },

  onSelectFeature: function(instance) {
    instance.render(this.elements.FeatureInstanceList);
    this.setData({
      image: instance.getImage(),
      classImage: instance.getClassImage()
    });
  },

  events: {
    'change select': function(index, e) {
      var
      id = e.currentTarget.options[e.currentTarget.selectedIndex].id,
      instance = Templater.create(id);

      if(instance) {
        instance.render(this.elements.FeatureInstanceList);
        this.setData({
          image: instance.getImage(),
          classImage: instance.getClassImage()
        });
      }
    }
  },

  template:
  '<div id="Features">'+
    '<div class="container">'+
      '<div class="features-grid">'+
        '<div class="features-cell features-list">'+
          '<div id="FeatureButtonsList"></div>'+
          '<div class="mobile-list">'+
            '<h1 class="mukta">Funcionalidades</h1>'+
            '<select>'+
              '<option id="FeatureReports">Relatórios</option>'+
              '<option id="FeatureIfood">Integração com IFood</option>'+
              '<option id="FeatureOnline">Atendimento online</option>'+
              '<option id="FeatureStore">Loja online</option>'+
              '<option id="FeatureSite">Site personalizado</option>'+
              '<option id="FeatureSms">SMS</option>'+
              '<option id="FeatureFidelidade">Fidelidade</option>'+
            '</select>'+
          '</div>'+
          '<div id="FeatureInstanceList"></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="image-container">'+
      '<img class="{{classImage}}" src="{{image}}" />'+
    '</div>'+
  '<div>'

});