var TemplateCompilerEngine = Base.extend({

  type: 'TemplateCompilerEngine',

  constructor: function(cf) {
    this.base.call(this,cf);
  },

  compile: function(template, template_data) {
    for(var index in template_data){ 
      var 
      position = 2,
      value = template_data[index],
      type = typeof value;
      if(type === "string") {
        correct = [value.slice(0, position), "$", value.slice(position)].join(''),
        search = new RegExp("{{"+index+"}}","gim");
      }else if(type === "object") {
        return this.compile(template, value);
      }

      template = template.replace(search,correct); 
    };

    return template;
  },

});