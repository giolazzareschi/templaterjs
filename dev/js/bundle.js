if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){
	// var x = performance.now();

	template_data = {
		pizzas : [{
			flavours: [
				{name : 'giordano 1', age : 27},
				{name : 'giordano 2', age : 27}
			]
		}]
	};

	$list = new List({
		template_data : template_data
	});

	$list.render( document.querySelector('#entry_point') );

	// console.log(performance.now() - x);
};