Templater.register("FeatureButtonsListItem", {

  binds: function() {
    this.klass = Templater.create(this.template_data.class);
  },

  select: function() {
    this.__parent.deselectAll(this.__index);
    this.dom.classList.add("selected");
    this.__parent.onSelect(this.klass);
  },

  deselect: function() {
    this.dom.classList.remove("selected");
  },

  events: {
    'click': function() {
      this.select();
    }
  },

  template:
  '<li>'+
    '<span>{{name}}</span>'+
  '</li>'
  
});