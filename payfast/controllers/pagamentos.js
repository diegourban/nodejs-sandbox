module.exports = function(app) {

  app.get('/pagamentos', function(req, res) {
    console.log('Test request received.');
    res.send('OK.');
  });

  app.post('/pagamentos', function(req, res) {
    req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
    req.assert('valor', 'Valor é obrigatório e deve ser um decimal').notEmpty().isFloat();
    var errors = req.validationErrors();
    if(errors) {
      console.log('Erros de validação');
      res.status(400).send(errors);
      return;
    }

    var pagamento = req.body;
    console.log('Processando uma requisição de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    var connection = app.persistence.connectionFactory();
    var paymentDao = new app.persistence.PaymentDAO(connection);

    paymentDao.save(pagamento, function(err, result) {
      if(err) {
        console.log('Erro ao inserir no banco: ' + err);
        res.status(500).send(err);
      } else {
        console.log('Pagamento criado');
        res.location('/pagamentos/' + result.insertId);
        res.status(201).json(pagamento);
      }
    });
  });

}
