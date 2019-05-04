Templater.register("FeaturePageBase", {

  constructor: function(cf) {
    this.features = [];
    this.base.call(this,cf);
  },

  binds: function() {
    this.dom.classList.add("FeaturePageBase");
    this.createList();
  },

  createList: function() {
    this.FeaturePageBaseList = Templater.create("FeaturePageBaseList");
    this.FeaturePageBaseList.setItems(this.features);
    this.FeaturePageBaseList.append(this.dom);
  },

  getClassImage: function() {
    return "";
  },

  template: 
  '<div>'+
    '<h1>{{title}}</h1>'+
  '</div>'

});