var Screen = Templater.extend({

	type : 'Screen',

	autopaint : true,

	appmainheader : undefined,

	appmainfooter : undefined,

	binds : function(){
		this.set_regions();

		this.base();
	},

	set_regions : function(){
		if( this.appmainheader )
			this.appmainheader.render( this.elements.appmainheader );
		else
			this.hideheader();

		if( this.appmainfooter )
			this.appmainfooter.render( this.elements.appmainfooter );
		else
			this.hidefooter();
	},

	hideheader : function(){
		this.elements.appmainheader.classList.add('hide');
	},

	hidefooter : function(){
		this.elements.appmainfooter.classList.add('hide');
	},

	addClass : function( str ){
		this.dom.classList.add( str );
	},

	template : `
		<div class="app-screen">
			<header id="appmainheader"></header>
			<article id="appmaincontent"></article>
			<footer id="appmainfooter"></footer>
		</div>
	`

});