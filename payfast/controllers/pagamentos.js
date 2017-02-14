var logger = require('../services/logger.js');

module.exports = function(app) {

  app.get('/pagamentos', function(req, res) {
    console.log('Test request received.');
    res.send('OK.');
  });

  app.get('/pagamentos/:id', function(req, res) {
    var id = req.params.id;
    logger.info('Consultando pagamento: ' + id);
    console.log('Consultando pagamento: ' + id);

    var memcachedClient = app.services.memcachedClient();
    memcachedClient.get('pagamento-' + id, function(err, retornoCache) {
      if(err || ! retornoCache) {
        console.log('MISS - chave não encontrada');

        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDAO(connection);

        pagamentoDao.buscarPorId(id, function(err, retornoBanco) {
          if(err) {
            console.log('Erro ao consultad no banco: ' + err);
            res.status(500).send(err);
            return;
          }

          console.log('Pagamento encontrado: ' + JSON.stringify(retornoBanco));
          res.json(retornoBanco);
        });
      } else {
        console.log('HIT - valor: ' + JSON.stringify(retornoCache));
        res.json(retornoCache);
      }
    });
  });

  app.post('/pagamentos', function(req, res) {
    req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
    req.assert('pagamento.valor', 'Valor é obrigatório e deve ser um decimal').notEmpty().isFloat();
    var errors = req.validationErrors();
    if(errors) {
      console.log('Erros de validação');
      res.status(400).send(errors);
      return;
    }

    var pagamento = req.body['pagamento'];
    console.log('Processando uma requisição de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date();

    var connection = app.persistence.connectionFactory();
    var pagamentoDao = new app.persistence.PagamentoDAO(connection);

    pagamentoDao.salvar(pagamento, function(err, result) {
      if(err) {
        console.log('Erro ao inserir no banco: ' + err);
        res.status(500).send(err);
        return;
      }
      pagamento.id = result.insertId;
      console.log('Pagamento criado');

      var memcachedClient = app.services.memcachedClient();
      memcachedClient.set('pagamento-' + pagamento.id, pagamento, 60000, function(err) {
        console.log('Nova chave adicionada ao cache: pagamento-', pagamento.id);
      });

      if(pagamento.forma_de_pagamento == 'cartao') {
        var cartao = req.body['cartao'];
        console.log(cartao);

        var clienteCartoes = new app.services.clienteCartoes();
        clienteCartoes.autoriza(cartao, function(errAut, reqAut, resAut, retAut) {
          if(errAut) {
            console.log(errAut);
            res.status(400).send(errAut);
            return;
          }
          console.log(retAut);
          res.location('/pagamentos/' + pagamento.id);
          var response = {
            dados_do_pagamento: pagamento,
            cartao: retAut,
            links: [
              {
                href: 'http://localhost:3000/pagamentos/' + pagamento.id,
                rel: 'confirmar',
                method: 'PUT'
              },
              {
                href: 'http://localhost:3000/pagamentos/' + pagamento.id,
                rel: 'cancelar',
                method: 'DELETE'
              }
            ]
          }
          res.status(201).json(retAut);
          return;
        });
      } else {
        res.location('/pagamentos/' + pagamento.id);

        var response = {
          dados_do_pagamento: pagamento,
          links: [
            {
              href: 'http://localhost:3000/pagamentos/' + pagamento.id,
              rel: 'confirmar',
              method: 'PUT'
            },
            {
              href: 'http://localhost:3000/pagamentos/' + pagamento.id,
              rel: 'cancelar',
              method: 'DELETE'
            }
          ]
        }

        res.status(201).json(response);
      }
    });
  });

  app.put('/pagamentos/:id', function(req, res) {
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.persistence.connectionFactory();
    var pagamentoDao = new app.persistence.PagamentoDAO(connection);

    pagamentoDao.atualizar(pagamento, function(err) {
      if(err){
        res.status(500).send(err);
        return;
      }

      console.log('Pagamento atualizado');
      res.send(pagamento);
    });
  });

  app.delete('/pagamentos/:id', function(req, res) {
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.persistence.connectionFactory();
    var pagamentoDao = new app.persistence.PagamentoDAO(connection);

    pagamentoDao.atualizar(pagamento, function(err) {
      if(err){
        res.status(500).send(err);
        return;
      }

      console.log('Pagamento cancelado');
      res.status(204).send(pagamento);
    });
  });

}
