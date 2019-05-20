Templater.register("CodeExampleVariables", {

  constructor: function(cf) {
    this.base.call(this,cf);
  },

  code_template: ''+
  '<code>'+
    'Templater.<span class="keyword">register</span>(<span class="string">\'HelloWorld\'</span>, {'+
      '<div class="line-spacer"></div>'+
      '  <span class="keyword">template</span>: <span class="string">\'&lt;div&gt;Component says: Hello World!, &#123;&#123;name&#125;&#125;&lt;/div&gt;\'</span>'+
      '<div class="line-spacer"></div>'+
    '});'+
    '<div class="line-spacer"></div>'+
    
    '<span class="keyword">var</span> template_data_1 = &#123; '+
    '\n template_data: &#123; '+
    '\n    name: <span class="string">\'John\'</span>'+
    '\n  &#125;'+
    '\n&#125;\;'+
    '\n<span class="keyword">var</span> instance1 = Templater.<span class="keyword">create</span>(<span class="string">\'HelloWorld\'</span>, template_data_1);'+
    '<div class="line-spacer"></div>'+

    '<span class="keyword">var</span> template_data_2 = &#123; '+
    '\n template_data: &#123; '+
    '\n    name: <span class="string">\'Marie\'</span>'+
    '\n  &#125;'+
    '\n&#125;\;'+
    '\n<span class="keyword">var</span> instance2 = Templater.<span class="keyword">create</span>(<span class="string">\'HelloWorld\'</span>, template_data_2);'+
    '<div class="line-spacer"></div>'+

    
  '</code>',

}, {}, "CodeExample");