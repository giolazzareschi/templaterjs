Templater.register("Variables", {

  binds: function() {
    this.CodeExampleVariables = Templater.create("CodeExampleVariables");
    this.CodeExampleVariables.render(this.elements.CodeExampleVariables);
  },

  template: 
  '<div id="Variables">'+
    '<div class="main-banner">'+
      '<div class="container">'+
        '<div class="container-banner">'+
          '<h1>Template variables</h1>'+
          '<h2>You can pass a json and print its values.</h1>'+
          '<p>'+
            'Any changes to this variables will be propagated to the original json. '+
          '</p>'+
          '<div id="CodeExampleVariables"></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'

});