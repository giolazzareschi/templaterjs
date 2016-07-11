var SearchBar = Templater.extend({

	type : 'SearchBar',

	autopaint : true,

	binds : function(){

		var list_search = new ListSearch({
			template_data : {
				items : this.template_data.$$item__.items
			}
		});

		list_search.parent = this;

		this.updateMessage( list_search.limit );

		this.listmodel = list_search;

		list_search.render( this.elements.listhere );

	},

	updateMessage : function( items ){
		if( items ){
			this.template_data.$$item__.allcss.successMessage = false;
			this.template_data.$$item__.message = "Escolha " + items + " tamanho";
		}else{
			this.template_data.$$item__.message = "Sabores >>";
			this.template_data.$$item__.allcss.successMessage = true;
		}
	},

	events : {
		'keyup .search-input-wrapper input' : function(e){
			var items = this.template_data.$$item__.items, i=0, qt = items.length, value = e.currentTarget.value;
			for( ; i < qt ; i++ ){	
				var item = items[ i ];
				try{
					if( value === ""){
						item.css.hide = false;
					}else{
						if( item.name.match( new RegExp(value, 'gi')) && value ){
							item.css.hide = false;
						}else{
							item.css.hide = true;
						}
					}
				}catch(e){}
			}
		}
	},

	template : `
	<div class="search-bar">
		<div class="search-input-wrapper">
			<input placeholder="{{placeholder}}" value="{{searched}}" />
		</div>
		<div id="limitmessage"><span success="{{allcss.successMessage}}">{{message}}</span></div>
		<div id="listhere"></div>
	</div>
	`

});