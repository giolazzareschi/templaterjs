GlobalContext.Export.HelloWorldPage = Templater.extend({

	type: 'HelloWorldPage',

	binds: function() {

		this.IndexPageCode = new GlobalContext.Export.Code({
			template_data: {
				code: '<!DOCTYPE html>\n'+
					'<html>\n'+
					'\u00A0\u00A0\u00A0\u00A0<head>\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0<title>Hello World</title>\n'+
					'\u00A0\u00A0\u00A0\u00A0</head>\n'+
					'\u00A0\u00A0\u00A0\u00A0<body>\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0<script src="templater.min.js"></script>\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0<script type="text/javascript">\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\\\\here you\'ll code\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</script>\n'+
					'\u00A0\u00A0\u00A0\u00A0</body>\n'+
					'</html>'
			}
		});

		this.IndexPageJsCode = new GlobalContext.Export.Code({
			template_data: {
				code: ''+
					'GlobalContext.Export.HelloWorld = Templater.extend({\n'+
					'\n'+
					'\u00A0\u00A0\u00A0\u00A0type: "HelloWorld",\n'+
					'\n'+
					'\u00A0\u00A0\u00A0\u00A0binds: function() {\n'+
					'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 this.render(window.document.body);\n'+
					'\u00A0\u00A0\u00A0\u00A0},\n'+
					'\n'+
					'\u00A0\u00A0\u00A0\u00A0template: "<h1>{{message}}</h1>"\n'+
					'});\n\n'+
					'var HelloWorld = new GlobalContext.Export.HelloWorld({\n'+
					'\u00A0\u00A0template_data: {\n'+
					'\u00A0\u00A0\u00A0\u00A0message: "Hello World!"\n'+
					'\u00A0\u00A0}\n'+
					'})'
			}
		});

		this.IndexPageCode.render(this.elements.index_page);
		this.IndexPageJsCode.render(this.elements.index_page_js);
	},

	template: ''+
		'<div class="home-screen">'+
			'<h1 class="page-title">Hello</h1>'+
			'<h4 class="page-subtitle">world.</h4>'+
			'<p class="page-description">The classic example. Create and basic html file with the configuration as described below:</p>'+
			'<div id="index_page"></div>'+
			'<p class="page-description"><span>Well, the templater.min.js file you can download from</span><a href="https://github.com/giolazzareschi/templaterjs" target="_blank">github</a></p>'+
			'<p class="page-description">There where says "here you\'ll code" you can put the code below:</p>'+
			'<div id="index_page_js"></div>'+
		'</div>'

});