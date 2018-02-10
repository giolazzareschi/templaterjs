var ServiceBaseManager = Templater.extend({
	type: 'ServiceBaseManager'
},{
	queue: [],
	register: function(service_request, success_service) {
		ServiceBaseManager.queue.push({
			service_request: service_request,
			success_service: success_service
		});
		if(ServiceBaseManager.queue.length === 1)
			service_request();
	},
	callNext: function() {
		if(ServiceBaseManager.queue.length)
			ServiceBaseManager.queue[0].service_request();
	},
	response: function(server_response) {
		var 
			current = ServiceBaseManager.queue.shift();
		current.success_service(server_response);
		this.callNext();
	}
});