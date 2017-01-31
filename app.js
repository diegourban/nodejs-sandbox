var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

var port = process.env.PORT || 3000;

var server = http.listen(port, function() {
	var host = server.address().address;
  var port = server.address().port;
	console.log('Server up and running at http://%s:%s', host, port);
});
