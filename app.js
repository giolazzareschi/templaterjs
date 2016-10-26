var express = require('express');
var compression = require('compression')
var server = express();

server.use(compression());
server.use(express.static(__dirname + '/public'));
 
var port = 3000;

server.get('/scripts/:file', function(req, res){
	res.header('Content-Encoding', 'gzip');
	res.sendFile(__dirname + '/public/build/gzip/' + req.params.file + '.js');
});


server.listen(port, function() {
    console.log('server listening on port ' + port);
});