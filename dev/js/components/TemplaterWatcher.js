var TemplaterWatcher = Base.extend({

	type: 'TemplaterWatcher',

	map: [],

	register: function( ref ) {
		this.map.push(ref);
	},

	propagate: function(typeCaller) {
		var
			total = this.map.length;

		while( total-- ){
			var templater = this.map[ total ];
			if( templater.type !== typeCaller )
				this.map[ total ].changes(true);
		}
	}

});