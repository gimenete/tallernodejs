var http = require('http')
var querystring = require('querystring')

var port = process.argv[2] || 1337

http.createServer(function (req, res) {
	
	/*
	var method = req.method
	var url = require('url').parse(req.url, true)
	
	console.log('request')
	console.log(method)
	console.log(url)
	console.log()
	*/
	
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('Hello World')
	
}).listen(port)

console.log('Server running at http://127.0.0.1:'+port)

process.on('SIGINT', function () {
	console.log()
	console.log('Good bye!')
	process.exit(0)
});
