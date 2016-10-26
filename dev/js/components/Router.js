var Router = Base.extend({

	routes : {},

	constructor : function(){

		window.addEventListener('hashchange', this.change.bind(this));

		this.base();
	},

	before_action : undefined,

	register : function( data ){

		this.routes[ data.route ] = data.callback;
	},

	href : function( route ){

		if( this.getCurrentRoute() === route )
			this.change();
		else
			window.location.hash = route;
	},

	getCurrentRoute : function(){

		return window.location.hash.replace('#','');
	},

	validate : function(){
		var rule = true;

		if( this.before_action )
			rule = this.before_action.rule && this.before_action.rule();

		return rule;
	},

	entry : false,

	change : function(){

		var route = this.getCurrentRoute();

		if( !this.validate() ){
			
			this.routes[ this.before_action.fails ]();
		}else{

			if( route !== this.before_action.fails )
				this.routes[ route ]();
		}

	}

});