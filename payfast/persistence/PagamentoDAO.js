function PagamentoDAO(connection) {
	this._connection = connection;
}

PagamentoDAO.prototype.listar = function(callback) {
	this._connection.query('select * from pagamentos', callback);
}

PagamentoDAO.prototype.salvar = function(pagamento, callback) {
	this._connection.query('insert into pagamentos set ?', pagamento, callback);
}

PagamentoDAO.prototype.atualizar = function(pagamento, callback) {
	this._connection.query('update pagamentos set status = ? where id = ?', [pagamento.status, pagamento.id], callback);
}

PagamentoDAO.prototype.buscarPorId = function(id, callback) {
	this._connection.query('select * from pagamentos where id = ?', [id], callback);
}

module.exports = function() {
	return PagamentoDAO;
}
