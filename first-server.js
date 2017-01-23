var http = require('http');
var port = 3000;
var ip = 'localhost';

var server = http.createServer(function(req, res) {
    console.log("Rceiving request");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body>Request received!</body></html>');
});

server.listen(port, ip);

console.log('Server running at http://' + ip + ':' + port + '/');