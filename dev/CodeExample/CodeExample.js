Templater.register("CodeExample", {

  code_template: '',

  constructor: function(cf) {
    this.base.call(this,cf);
  },

  binds: function() {
    this.dom.classList.add('CodeExample');
  },

  template:
  '<div>'+
    '<div>'+
      '<pre class="ft-syntax-highlight" data-syntax="js" data-syntax-theme="one-dark">'+
        '{{code_template}}'+
      '</pre>'+
    '</div>'+
  '</div>'

});