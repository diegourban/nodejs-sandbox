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

	if(process.env.NODE_ENV == 'production') {
		var connectionURL = process.env.CLEARDB_DATABASE_URL;
		var groups = connectionURL.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);

		//mysql://bc4d94da7389fa:d13c18bd@us-cdbr-iron-east-04.cleardb.net/heroku_5da476e7893418a?reconnect=true

		return mysql.createConnection({
			host : groups[3],
			user : groups[1],
			password : groups[2],
			database : groups[4]
		});
	}
}

module.exports = function() {
	return createDBConnection;
}
