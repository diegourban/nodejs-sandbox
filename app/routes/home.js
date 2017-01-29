module.exports = function(app) {
  app.get('/', function(req, res) {
    var connection = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(connection);

		productDAO.list(function(err, result) {
      res.render('home/index', {livros: result});
		});

    connection.end();
  });
}
