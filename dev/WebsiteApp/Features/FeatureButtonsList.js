Templater.register("FeatureButtonsList", {

  constructor: function(cf) {
    this.onSelect = cf.onSelect || function() {};
    this.base.call(this,cf);
  },

  select: function(index) {
    this.items[index].select();
  },

  deselectAll: function(index) {
    for(var i in this.items)
      this.items[i].deselect();
  }

});