if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){

	template_data = { 
		pizzas : [
			{flavours: [57,56,63]},
		]
	};

	$list = new List({
		template_data : template_data
	});

	$list.render( document.querySelector('#entry_point') );
};