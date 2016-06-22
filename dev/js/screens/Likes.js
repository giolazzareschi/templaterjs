var Likes = Templater.extend({

	type : 'Likes',

	autopaint : true,

	events : {
		'click #btnlike' : function(){
			++this.template_data.counter;
		}
	},

	template : '' +
		'<div class="btn-like-wrapper">'+
			'<button id="btnlike">Likes : (<label>{{counter}}</label>)</button>'+			
		'<div>'

});