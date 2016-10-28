# Templater.js

#### Micro javascript lib to create base components or scalable frontend lifecycle.

**License:**

* Templater.js, version 1.0-alpha
* Copyright 2016, Giordano Bruno Lazzareschi
* Github: https://github.com/giolazzareschi/templaterjs
* License: http://www.opensource.org/licenses/mit-license.php

This framework uses two very known (or should be at least) js libs:

**Dependencies:**
* Dean Edwards "Base.js" - http://dean.edwards.name/weblog/2006/03/base/
* Handlebars (currently @4.0.5) - http://handlebarsjs.com/

Templater.js ships the minified version of both above script already. But you can donwload them separately, but it'll just works if you include them properly on your project context.

So, basicaly this framework uses this above libs to create a simple pattern to develop frontend. But the main focus is reduce the most we can browser memory usage. Shortly, what it does is store the DOM objects one time and try reuse it along the app lifecicle, reducing a lof of js recreation/garbage collection and worring just with repainting/re-rendering.

**Instalation:**

* Create a simple .html file structure
* Add this line in head or body
```html
<script src="paths/maybemorepaths/templater.min.js" />
```

**Very basic example:**
Well, better than explain is execute:

```javascript
 /**
    Create a class that inherits from Templater.
    Basic Base.js syntax here.
 **/
  var Hello = Templater.extend({
    
    /**
        "require" is the AMD loader system. You basicaly points which url will serve other files
        and the name of the classes which will be returned.
        This current object just will start working after all depedencies are loaded.
        "World" is another class we'll in the next code.
    **/
    require: {
        url: 'scripts',
        files: ['World']
    },
    
    /**
        "templater_data" is where you put structured data to be renderd in the "template" string.
    **/
    template_data: {
      username: 'Default username'
    },
  
    /**
        "events" is, well, the events api. 
        First argument is the event name (like 'click' or 'blur') to binded to the element dom, 
        from the second string you start to specify the css selector to find the element.
        If you inform just the event name, you gonna bind the callback to the root element.
    **/
    events: {
      /**
        "click" then "selector".     
      **/
      'click #main_message': function() {
        console.log( this, this.elements ); // "this" is the class instance (Hello in this example).
      },
      /**
        binds and click event to the root DOM element.
      **/
      'click': function() {
      }
    },
  
    /**
        Here goes the Handlebars template system. The systax is pure handlebars.
        If you want create inner elements, pay attention to the TemplaterList special object.
        We will talk about it later.
    **/
    template : '' +
      '<div>' +
        '<h1 id="main_message">Hey {{username}}.</h1>'+
      '</div>',
      
      /**
        "binds" is a funcion called after the object is created and ready to interact with other 
        objects in your app context. 
        Here is where you can start "bind" other stuff to your object.
      **/
      binds:  function(){
      
      }
  });
  
  /**
    Go to console browser and write this.
  **/
  var hello = new Hello();
  
  hello.render( document.body );
  
  setTimeout( function(){
  
    hello.setData({
        username : 'New name here pls'
    });
  },5000);
````
