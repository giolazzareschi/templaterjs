Templater.register("HelloWorld", {

  binds: function() {
    this.CodeExampleHelloWorld = Templater.create("CodeExampleHelloWorld");
    this.CodeExampleHelloWorld.render(this.elements.CodeExampleHelloWorld);
  },

  template: 
  '<div id="HelloWorld">'+
    '<div class="main-banner">'+
      '<div class="container">'+
        '<div class="container-banner">'+
          '<h1>Hello World !</h1>'+
          '<h2>The traditional learning code.</h1>'+
          '<p>'+
            'First we must register a component. Then we use as much as we want. '+
          '</p>'+
          '<div id="CodeExampleHelloWorld"></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'

});