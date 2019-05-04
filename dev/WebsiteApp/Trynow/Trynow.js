Templater.register("Trynow", {

  binds: function() {
    this.RedActionButton = Templater.create("RedActionButton", {
      template_data: {
        text: "Faça seu teste grátis"
      }
    });
    this.RedActionButton.append(this.dom);
  },

  template: 
  '<div>'+
    '<h1 class="mukta">Experimente iGo e veja a diferença</h1>'+
  '</div>'

});