var mysql = require('mysql');

function createDBConnection() {
	if(!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'nodejs_sandbox'
		});
	}

	if(process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'nodejs_sandbox_test'
		});
	}
}

module.exports = function() {
	return createDBConnection;
}
