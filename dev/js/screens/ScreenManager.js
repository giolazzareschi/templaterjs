var ScreenManager = Templater.extend({

	type : 'ScreenManager',

	autopaint : true,

	binds : function(){
		this.addscreen( 
			new LoginScreen({
				template_data : this.template_data.$$item__.loginscreen
			}) 
		);

		this.render( document.body );
	},

	screens : {},

	addscreen : function( screen ){
		this.screens[ screen.type ] = screen;

		if( screen.appmainheader )
			screen.appmainheader.render( this.elements.appmainheader );
		else
			this.hideheder();

		if( screen.appmainfooter )
			screen.appmainfooter.render( this.elements.appmainfooter );
		else
			this.hidefooter();

		screen.render( this.elements.appmaincontent );
	},

	hideheder : function(){
		this.elements.appmainheader.classList.add('hide');
	},

	hidefooter : function(){
		this.elements.appmainfooter.classList.add('hide');
	},

	template : `
	<div appmaincenter>
		<div id="appmainheader"  appmainheader></div>
		<div id="appmaincontent" appmaincontent></div>
		<div id="appmainfooter"  appmainfooter></div>
	</div>
	`

});