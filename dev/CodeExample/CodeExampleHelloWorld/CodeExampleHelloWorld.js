Templater.register("CodeExampleHelloWorld", {

  constructor: function(cf) {
    this.base.call(this,cf);
  },

  code_template: ''+
  '<code>'+
    'Templater.<span class="keyword">register</span>(<span class="string">\'HelloWorld\'</span>, {'+
      '<div class="line-spacer"></div>'+
      '  <span class="keyword">template</span>: <span class="string">\'&lt;div&gt;Component says: Hello World!&lt;/div&gt;\'</span>'+
      '<div class="line-spacer"></div>'+
    '});'+
    '<div class="line-spacer"></div>'+
    '<span class="keyword">var</span> instance1 = Templater.<span class="keyword">create</span>(<span class="string">\'HelloWorld\'</span>);'+
    '<div class="line-spacer"></div>'+
    '<span class="keyword">var</span> instance2 = Templater.<span class="keyword">create</span>(<span class="string">\'HelloWorld\'</span>);'+
  '</code>',

}, {}, "CodeExample");