var ScreenManager = Templater.extend({

	type : 'ScreenManager',

	autopaint : true,

	leftmenu : undefined,

	binds : function(){
		this.addscreen( 
			new LoginScreen({
				template_data : this.template_data.$$item__.loginscreen
			}) 
		);

		this.addscreen( 
			new LeftMenu({
				template_data : this.template_data.$$item__.loginscreen
			}) 
		);

		this.render( document.body );
	},

	screens : {},

	addscreen : function( screen ){
		this.screens[ screen.type ] = screen;

		screen.append( this.dom );
	},

	template : `
	<div id="appmainstage" appmaincenter></div>
	`

});