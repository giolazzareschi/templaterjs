var Crono = Templater.extend({
	
	type: 'Crono',

	template_data: {
		time: 0
	},

	initial: undefined,

	timer: undefined,

	binds: function() {

		this.initial = +new Date;

		this.update();

		this.start();
	},

	start: function() {

		this.timer = setInterval( this.update.bind(this), 1000 );
	},

	stop: function() {

		clearTimeout( this.timer );
	},

	update: function() {

		var 
			diff = now - this.initial,
			hour = ("0" + Math.floor(diff / 1000 / 60 / 60)).slice(-2), 
			minutes = ("0" + time.getMinutes()).slice(-2),
			seconds = ("0" + time.getSeconds()).slice(-2);

		this.setData({
			time: format
		});
	},

	template: '' +
		'<div class="cronotime">' +
			'<div>{{time}}</div>'+
		'</div>'

});