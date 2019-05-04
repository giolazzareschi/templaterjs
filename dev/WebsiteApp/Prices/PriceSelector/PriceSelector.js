Templater.register("PriceSelector", {

  constructor: function(cf) {
    this.onSelect = cf.onSelect || function() {};
    this.map = {
      0: 0,
      1: .20,
      2: .35
    };
    this.base.call(this,cf);
  },

  binds: function() {
    this.children = Array.prototype.slice.call(this.elements.list.children);
  },

  select: function(index) {
    this.deselectAll();
    this.children[index].classList.add("active");
    this.onSelect(this.map[index]);
  },

  deselectAll: function() {
    this.children.forEach(function(item) {
      item.classList.remove("active");
    });
  },

  events: {
    'click li': function(index) {
      this.select(index);
    }
  },

  template:
  '<div>'+
    '<ul id="list">'+
      '<li class="active">Mensal</li>'+
      // '<li>Trimensal - 20% de desconto</li>'+
      // '<li>Anual - 35% de desconto</li>'+
    '</ul>'+
  '</div>'

});