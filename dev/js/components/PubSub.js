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
			subscriptions = this.subscriptions[name];

		if(subscriptions)
			subscriptions.forEach(function(subscription) {
				subscription(params);
			});
	},

	exists: function(alias) {
		return this.subscriptions[alias] !== undefined;
	}
});