function ProductDAO(connection) {
	this._connection = connection;
}

ProductDAO.prototype.list = function(callback) {
	this._connection.query('select * from livros', callback);
}

ProductDAO.prototype.save = function(product, callback) {
	//this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
	this._connection.query('insert into livros set ?', product, callback);
}

module.exports = function() {
	return ProductDAO;
}