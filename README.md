# Templater JS

#### Micro javascript lib to create base components or scalable frontend lifecycle.

This framework uses two very known (or should be at least) js libs:

**Dependencies:**
* Dean Edwards "Base.js" - http://dean.edwards.name/weblog/2006/03/base/
* Handlebars (currently @4.0.5) - http://handlebarsjs.com/

Templater.js ships the minified version on both above script already. But you can donwload them separately, but it'll just works if you include them properly on your project context.

So, basicaly this framework uses this above libs to create a simple pattern to develop frontend. But the main focus is reduce the most we can browser memory usage. Shortly, what it does is store the DOM objects one time and try reuse it along the app lifecicle, reducing a lof of js recreation/garbage collection and worring just with repainting/re-rendering.

**Instalation:**

* Create a simple .html file structure
* Add this line in head or body
``` html
<script src="paths/maybemorepaths/templater.js.min" />
```

**Very basic example:**
Well, better than explain is execute:

```javascript:
  var Hello = Templater.extend({
  
    template_data : {
      username : 'Default username'
    },
  
    events : {
      'click #main_message' : function(){
        console.log( this, this.elements );
      }
    },
  
    template : '' +
      '<div>' +
        '<h1 id="main_message">Hey {{username}}.</h1>'+
      '</div>'
  });
  
  var hello = new Hello();
  
  hello.render( document.body );
  setTimeout( function(){ 
    hello.template_data = {
      username : 'New name here pls'
    };
    
    hello.repaint();
  },5000);
````
