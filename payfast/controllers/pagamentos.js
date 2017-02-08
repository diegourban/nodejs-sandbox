module.exports = function(app) {

  app.get('/pagamentos', function(req, res) {
    console.log('Test request received.');
    res.send('OK.');
  });

}
