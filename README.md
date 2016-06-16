# Templater.js

#### Micro javascript lib to create base components or scalable frontend lifecycle.

This framework uses two very known (or should be at least) js libs:

**Dependencies:**
* Dean Edwards "Base.js" - http://dean.edwards.name/weblog/2006/03/base/
* Handlebars (currently @4.0.5) - http://handlebarsjs.com/

Templater.js ships the minified version of both above script already. But you can donwload them separately, but it'll just works if you include them properly on your project context.

So, basicaly this framework uses this above libs to create a simple pattern to develop frontend. But the main focus is reduce the most we can browser memory usage. Shortly, what it does is store the DOM objects one time and try reuse it along the app lifecicle, reducing a lof of js recreation/garbage collection and worring just with repainting/re-rendering.

**Instalation:**

* Create a simple .html file structure
* Add this line in head or body
``` html
<script src="paths/maybemorepaths/templater.min.js" />
```

**Very basic example:**
Well, better than explain is execute:

```javascript:
  var Hello = Templater.extend({ // Create a class thaat inherits from Templater. Basic Base.js syntax here.
  
    template_data : { // "templater_data" is where you put structured data to be renderd in the "template" string.
      username : 'Default username' // a data.
    },
  
    events : { // "events" api. First argument is the event, from second is the selector.
      'click #main_message' : function(){ // "click" then "selector". 
        console.log( this, this.elements ); // "this" is the class instance (Hello in this example).
      }
    },
  
    template : '' + // the page template to be rendered.
      '<div>' + // ALWAYS START WITH A DIV wrapping all stuff around.
        '<h1 id="main_message">Hey {{username}}.</h1>'+ // The stuff. All elements with "id" attr will be mapped in "this.elements"
      '</div>'
  });
  
  var hello = new Hello(); // Create an hello object. 
  
  hello.render( document.body ); // Render the object in somewhere. In this case, the document.body
  
  setTimeout( function(){ // just for testing purposes, after 5 secs repaint something.
  
    hello.template_data = { // change the template data on the fly.
      username : 'New name here pls' // data being changed on the fly.
    };
    
    hello.repaint(); // repaint template.
    
  },5000);
````
