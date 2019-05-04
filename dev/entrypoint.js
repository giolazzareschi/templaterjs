;(function(window){
  'use strict';

  function renderPage() {
    window.websiteApp = new Templater.create("WebsiteApp");
  };

  function startReportsApp(){
    renderPage();
  };

  if(document.readyState === "complete" || document.readyState === "interactive")
    startReportsApp();
  else if(document.addEventListener) 
    document.addEventListener("DOMContentLoaded", startReportsApp, false);

})(window);