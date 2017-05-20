var 
	express     = require('express'),
	compression = require('compression'),
	spdy        = require('spdy'),
	http        = require('http'),
    fs          = require('fs'),
	server      = express(),
	port        = 9100;

server.use(compression());

server.use(express.static(__dirname + '/public'));

server.get('/scripts/:file', function(req, res){
	res.sendFile(__dirname + '/public/build/scripts/' + req.params.file + '.js');
});

var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
};

// spdy.createServer(options, server).listen(port);
http.createServer(server).listen(port);