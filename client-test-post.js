var http = require('http');

var configs = {
	hostname: 'localhost',
	port: 3000,
	path: '/products',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(configs, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Corpo: ' + body);
	});
});

var produto = {
	titulo: 'more about node',
	descricao: 'node, javascript and a little about http',
	preco: 100
};

client.end(JSON.stringify(produto));