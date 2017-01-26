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
		res.render('products/form', {validationErrors:{}, product : {}});
	});

	app.post('/products', function(req, res) {
		var product = req.body;

		req.assert('titulo', 'Title is required').notEmpty();
		req.assert('preco', 'Invalid format').isFloat();

		var errors = req.validationErrors();
		if(errors) {
			res.format({
				html: function() {
					res.status(400).render('products/form', {validationErrors:errors, product:product});
				},
				json: function() {
					res.status(400).json(errors);
				}
			});

			return;
		}

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
