if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){
	// var x = performance.now();

	template_data = {
		pizzas : [{
			flavours: []
		}],
		places : [
			{
				id : 'P1',
				name : 'Brazil',
				states : [{ 
					id : 'S1',
					name : 'Santa Catarina',
					cities : [
						{ id : 'C1', name : 'Joinville' },
						{ id : 'C2', name : 'Florianópolis' }
					]
				},{ 
					id : 'S2',
					name : 'Paraná',
					cities : [
						{ id : 'C3', name : 'Curitiba' },
						{ id : 'C4', name : 'Maringá' }
					]
				}]
			}
		]
	};

	$list = new List({
		template_data : template_data
	});

	$list.render( document.querySelector('#entry_point') );

	// console.log(performance.now() - x);
};