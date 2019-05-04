Templater.register("WebsiteApp", {

  binds: function() {
    this.append(document.body);

    this.registerPubSub();

    this.Header = Templater.create("Header");
    this.Header.append(this.dom);

    this.Banner = Templater.create("Banner");
    this.Banner.append(this.dom);

    this.Customers = Templater.create("Customers");
    this.Customers.append(this.dom);

    this.Store = Templater.create("Store");
    this.Store.append(this.dom);

    this.QuickInfo = Templater.create("QuickInfo");
    this.QuickInfo.append(this.dom);

    this.Features = Templater.create("Features");
    this.Features.append(this.dom);

    this.Prices = Templater.create("Prices");
    this.Prices.append(this.dom);

    this.Testimony = Templater.create("Testimony");
    this.Testimony.append(this.dom);

    this.Trynow = Templater.create("Trynow");
    this.Trynow.append(this.dom);

    this.Footer = Templater.create("Footer");
    this.Footer.append(this.dom);
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