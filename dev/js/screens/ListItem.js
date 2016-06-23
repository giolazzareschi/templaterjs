var ListItem = Templater.extend({

	type : 'ListItem',

	template : ''+
		'<div>'+
			'{{#each pizzas}}'+
			'<div class="todo-list">'+
				'<label>Flavours:</label>'+
				'{{#each flavours}}'+
					'<li>'+
						'{{this}}'+
					'</li>'+
				'{{/each}}'+
			'</div>'+
			'{{/each}}'+
		'</div>'

});