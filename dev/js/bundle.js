if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){

	template_data = { 
		phones : ["(47) 9128-2329", "(47) 9911-4370"]
	};

	$list = new List({
		template_data : template_data
	});

	$list.render( document.querySelector('#entry_point') );
};