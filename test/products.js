var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProductsController', function() {

  beforeEach(function(done) {
    // check module node-database-cleaner
    var conn = express.infra.connectionFactory();
    conn.query('delete from products', function(ex, result) {
      if(!ex) {
        done();
      }
    });
  });

  it('should return json', function(done) {
    request.get('/products')
    .set('Accept', 'application/json')
    .expect(200, done)
    .expect('Content-Type', /json/); // done for async functions
  });

  it('should return 400 when add new product with invalid data', function(done) {
    request.post('/products')
    .send({
      title: '',
      description: 'novo livro'
    })
    .expect(400, done);
  });

  it('should return 302 when add new product with valid data', function(done) {
    request.post('/products')
    .send({
      title: 'titulo',
      description: 'novo livro',
      price: 20.50
    })
    .expect(302, done);
  });
});
