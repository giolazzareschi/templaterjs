var ServiceBaseManager = Templater.extend({
	type: 'ServiceBaseManager'
},{
	queue: [],
	map: {},
	started: false,
	running: {},
	debug: 0,
	register: function(service_request, success_service, id, info) {
		if(info.url) {
			ServiceBaseManager.map[id] = {
				info: info,
				service_request: service_request,
				success_service: success_service
			};
			
			if(this.mapSize() > -1) {
				ServiceBaseManager.dispatch();
			}
		}
	},
	mapSize: function() {
		var
		count = 0;

		for(var index in ServiceBaseManager.map)
			count++;

		return count;
	},
	bufferSize: function() {
		var
		count = 0;

		for(var index in ServiceBaseManager.running)
			count++;

		return count;
	},
	dispatch: function() {
		var
		calls = [];
		for(var index in ServiceBaseManager.map) {
			if(ServiceBaseManager.bufferSize() < 1) {
				calls.push(index);
				ServiceBaseManager.running[index] = ServiceBaseManager.map[index];
				ServiceBaseManager.map[index].service_request();
			}else{
				break;
			}
		}

		calls.forEach(function(called) {
			delete ServiceBaseManager.map[called];
		});
	},
	response: function(id, server_response, state, readyState) {
		var
		hasYet = 0,
		running = ServiceBaseManager.bufferSize(),
		thread = ServiceBaseManager.running[id];

		delete ServiceBaseManager.running[id];

		if(running > -1)
			ServiceBaseManager.dispatch();

		if(thread && thread.success_service)
			thread.success_service(server_response, state, readyState);

	}
});