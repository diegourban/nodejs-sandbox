module.exports = function(app) {
  app.get('/promotions/form', function(req, res) {
    var connection = app.infra.connectionFactory();
		var productDAO = new app.infra.ProductDAO(connection);

		productDAO.list(function(err, result) {
      res.render('promotions/form', {list: result});
		});

    connection.end();
  });

  app.post('/promotions', function(req, res) {
      var promotion = req.body;
      app.get('io').emit('newPromotion', promotion);
      res.redirect('promotions/form');
  });
}
