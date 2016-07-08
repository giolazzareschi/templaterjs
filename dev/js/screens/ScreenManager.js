var ScreenManager = Templater.extend({

	type : 'ScreenManager',

	autopaint : true,

	binds : function(){
		this.addscreen( 
			new SearchBar({
				template_data : this.template_data.$$item__.searchbar
			}) 
		);

		this.render( document.body );
	},

	screens : {},

	addscreen : function( screen ){
		this.screens[ screen.type ] = screen;

		screen.render( this.elements.appmaincontent );
	},

	template : `
	<div appmaincenter>
		<div appmainheader></div>
		<div id="appmaincontent" appmaincontent></div>
		<div appmainfooter></div>
	</div>
	`

});