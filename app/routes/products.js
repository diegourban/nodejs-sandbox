module.exports = function(app) {

	app.get('/products', function(req, res) {
		var connection = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(connection);

		productDAO.list(function(err, result) {
			if (err) {
				console.error('error connecting: ' + err.stack);
			    return;
			}

			res.format({
				html: function() {
					res.render('products/list', {
						lista : result
					});
				},
				json: function() {
					res.json(result);
				}
			});
			
		});

		connection.end();
	});

	app.get('/products/form', function(req, res) {
		res.render('products/form');
	});

	app.post('/products', function(req, res) {
		var product = req.body;

		var connection = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(connection);

		productDAO.save(product, function(err, result) {
			if (err) {
				console.error('error connecting: ' + err.stack);
			    return;
			}

			res.redirect('/products');
		});

		connection.end();
	});

}
