var Router = Base.extend({

	routes : [{}],

	constructor : function( routes ){
		this.routes = routes;

		this.base();
	},

	render : function( route ){
		var render = this.routes[ route ];
	}

});