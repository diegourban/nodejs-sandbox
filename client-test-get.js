var http = require('http');

var configs = {
	hostname: 'localhost',
	port: 3000,
	path: '/products',
	headers: {
		'Accept': 'application/json'
	}
};

http.get(configs, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Corpo: ' + body);
	});
});