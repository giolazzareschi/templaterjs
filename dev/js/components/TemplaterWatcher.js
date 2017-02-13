var TemplaterWatcher = Base.extend({

	type: 'TemplaterWatcher',

	map: [],

	register: function( ref ) {
		this.map.push(ref);
	},

	propagate: function(trackChanged, valueChanged, typeCaller, originalSetData) {
		var
			total = this.map.length;

		while( total-- ){
			var templater = this.map[ total ];
			if( templater.type !== typeCaller )
				this.map[ total ].changes(trackChanged, valueChanged, true, originalSetData);
		}
	}

});