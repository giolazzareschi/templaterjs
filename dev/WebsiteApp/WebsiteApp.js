Templater.register("WebsiteApp", {

  binds: function() {
    this.append(document.body);

    this.registerPubSub();

    this.Header = Templater.create("Header");
    this.Header.append(this.dom);

    this.Banner = Templater.create("Banner");
    this.Banner.append(this.dom);

    this.HelloWorld = Templater.create("HelloWorld");
    this.HelloWorld.append(this.dom);

    this.Variables = Templater.create("Variables");
    this.Variables.append(this.dom);
  },

  registerPubSub: function() {
    var
    fn = this.resizeDispatch.bind(this);

    Templater.Classes.WebsiteApp.PubSub = new PubSub();
    window.removeEventListener("resize", fn);
    window.addEventListener("resize", fn);
  },

  resizeDispatch: function() {
    Templater.Classes.WebsiteApp.PubSub.publish("windowResize", {
      width: window.innerWidth
    });
  }

}, {

  PubSub: {},

});