var Places = Templater.extend({

	type : 'Places',

	autopaint : true,

	binds : function(){		
		
	},

	success : function(){
		this.template_data.places.cssClass += "success";
	},

	events : {
		'change #states' : function(e){
			debugger;
		}
	},

	template : `
		<div place="{{places.pageid}}" class="{{places.cssClass}}">
			<div class="{{places.cssClass}}">
				{{places.pageid}}
			</div>
		</div>
	`

});