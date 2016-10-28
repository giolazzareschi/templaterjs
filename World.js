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
  require: {
      url: 'scripts',
      files: ['World']
  },
  **/

  /**
      "templater_data" is where you put structured data to be renderd in the "template" string.
  **/
  template_data: {
    hello: 'Hello'
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
      '<h1 id="main_message">{{hello}} <span id="worldplace"></span>.</h1>'+
    '</div>',

    /**
      "binds" is a funcion called after the object is created and ready to interact with other 
      objects in your app context. 
      Here is where you can start "bind" other stuff to your object.
    **/
    binds:  function(){

      this.render( document.body );

      this.World = new World();

      this.World.render( this.elements.worldplace );

      var me = this;
      setTimeout(function(){
        me.World.setData({
          world: 'Changed'
        });
      },2000);
    }
});

var World = Templater.extend({

  type: 'World',

  template_data: {
    world: 'World'
  },

  template : '' +    
    '<label>{{world}}</label>'
});

/**
  Go to console browser and write this.
**/
var hello = new Hello();