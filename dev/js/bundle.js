if (document.addEventListener) 
	document.addEventListener("DOMContentLoaded", start_app, false);

window.$list;
window.$list_search;
window.$app;
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
		{ id : "001", aka : "CTBA", name : "CURITIBA", css : {selected : ''} },
		{ id : "002", aka : "JLLE", name : "JOINVILLE", css : {selected : ''} }
	];

	var tpl_data = {
		cssClass : 'city-list',
		count : 0,
		selected_items : [],
		items : city_list,
		searchbar : {
			message : '',
			placeholder : 'Search here:',
			term : '',
			hide : 'hide',
			cssClass : 'search-list',
			items : [],
			allcss : {
				hide : '',
				selected : false,
				successMessage : false
			}
		}
	};

	tpl_data.searchbar.items = [
		{name : "Broto", css : {class : "item-list", hide : false, selected : false} },
		{name : "Média", css : {class : "item-list", hide : false, selected : false}  },
		{name : "Grande", css : {class : "item-list", hide : false, selected : false} }
	]

	// window.$list = new CityList({
	// 	template_data : tpl_data
	// });

	$app = new ScreenManager({
		template_data : tpl_data
	});

};

create_items = function(parent){	
	var items = parent.template_data.$$item__.items, model_name = parent.type + 'Item', model = window[model_name], cc = 0;

	model.prototype.type = model_name;
	model.prototype.isListItem = true;

	for( var i in items ){
		var tt = new model({
			__parent : parent,
			__index  : cc*1,
			template_data : items[ i ]
		});

		parent.items[String(cc)] = tt;
		cc++;
	}	
}