function ProductDAO(connection) {
	this._connection = connection;
}

ProductDAO.prototype.list = function(callback) {
	this._connection.query('select * from products', callback);
}

ProductDAO.prototype.save = function(product, callback) {
	//this._connection.query('insert into products (title, price, description) values (?, ?, ?)',  [product.title, product.price, product.description], callback);
	this._connection.query('insert into products set ?', product, callback);
}

module.exports = function() {
	return ProductDAO;
}
