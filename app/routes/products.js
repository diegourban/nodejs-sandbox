module.exports = function(app) {
	app.get('/products', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosBanco = new app.infra.ProdutosDAO(connection);

		produtosBanco.list(function(err, result) {
			if (err) {
				console.error('error connecting: ' + err.stack);
			    return;
			}

			res.render('products/list', {
				lista : result
			});
		});

		connection.end();
	});

}
