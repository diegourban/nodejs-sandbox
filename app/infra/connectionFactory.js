var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'nodejs_sandbox'
	});
}

module.exports = function() {
	return createDBConnection;
}
