if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.template_data;
function start_app(){
	// var x = performance.now();

	// template_data = {
	// 	pizzas : [{
	// 		flavours: []
	// 	}],
	// 	places : {
	// 		pageid : 'PAGEDDD',
	// 		cssClass : 'warn',
	// 		countries : {
	// 			id : 'P1',
	// 			name : 'Brazil',
	// 			states : [{ 
	// 				id : 'S1',
	// 				name : 'Santa Catarina',
	// 				cities : [
	// 					{ id : 'C1', name : 'Joinville' },
	// 					{ id : 'C2', name : 'Florianópolis' }
	// 				]
	// 			},{ 
	// 				id : 'S2',
	// 				name : 'Paraná',
	// 				cities : [
	// 					{ id : 'C3', name : 'Curitiba' },
	// 					{ id : 'C4', name : 'Maringá' }
	// 				]
	// 			}]
	// 		}
	// 	}
	// };

	// $list = new List({
	// 	template_data : template_data
	// });

	// $list.render( document.querySelector('#entry_point') );

	// console.log(performance.now() - x);


	var city_list = [
		{ id : "001", aka : "CTBA", name : "CURITIBA" }
	];

	window.$list = new CityList({
		template_data : {
			cssClass : '',
			items : {
				cities : city_list
			}
		}
	});
	
	$list.render( document.querySelector('#entry_point') );

};