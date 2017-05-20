var TemplaterWatcher = Base.extend({

	type: 'TemplaterWatcher',

	map: [],

	register: function( ref ) {
		this.map.push(ref);
	},

	propagate: function(trackChanged, valueChanged, typeCaller, originalSetData, indexTemplateItem) {
		var
			total = this.map.length;

		while( total-- ){
			var templater = this.map[ total ];
			if( templater.type !== typeCaller ){
				if(typeof templater.__index === 'undefined'){
					templater.changes(trackChanged, valueChanged, true, originalSetData, indexTemplateItem);
				}else{
					var temp = Templater.propagatingTemplateData[trackChanged];
					if(temp && temp.join)
						temp = temp[templater.__index];
					if(JSON.stringify(Templater.propagatingTemplateData) === JSON.stringify(templater.template_data)){
						templater.changes(trackChanged, valueChanged, true, originalSetData, indexTemplateItem);
					}
				}
			}
		}
	}

});