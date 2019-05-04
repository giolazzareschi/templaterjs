var PubSub = Templater.extend({

	type: 'PubSub',

	subscriptions: {},

	subscribe: function(name, callback) {
		var
		subscriptions = this.subscriptions[name];

		if(!subscriptions)
			this.subscriptions[name] = [];

		this.subscriptions[name].push(callback);
	},

	publish: function(name, params) {
		var
		subscriptions = this.subscriptions[name],
		length = (subscriptions && subscriptions.length) || 0;

		for(var i = 0; i < length; i++)
			subscriptions[i](params);

		for(var y = 0; y < length; y++)
			subscriptions.splice(y,1);
	},

	exists: function(alias) {
		return this.subscriptions[alias] !== undefined;
	}
});