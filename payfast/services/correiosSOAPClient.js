var soap = require('soap');

function CorreiosSOAPClient() {
  this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function(dados, callback) {
  soap.createClient(this._url, function(err, client) {
    console.log('Cliente SOAP criado.');
    client.CalcPrazo(dados, callback);
  });
}

module.exports = function() {
  return CorreiosSOAPClient;
}
