function PaymentDAO(connection) {
	this._connection = connection;
}

PaymentDAO.prototype.list = function(callback) {
	this._connection.query('select * from pagamentos', callback);
}

PaymentDAO.prototype.save = function(payment, callback) {
	this._connection.query('insert into pagamentos set ?', payment, callback);
}

PaymentDAO.prototype.findById = function(id, callback) {
	this._connection.query('select * from pagamentos where id = ?', [id], callback);
}

module.exports = function() {
	return PaymentDAO;
}
