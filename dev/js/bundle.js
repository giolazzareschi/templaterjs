if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);


window.$app;
var data;
function start_app(){
	(new Templater({
		binds : function(){

			data = {
				hello: 'Hello',
				buttonState: true,
				child: {
					world:['World 1','World 2','World 3','World 4']
				}
			};

			$app = new SessionManager({
				template_data: data
			});

			$app.render(document.body);
		}
	}));
};