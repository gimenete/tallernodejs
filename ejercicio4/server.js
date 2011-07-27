var fs = require('fs')
var http = require('http')
var querystring = require('querystring')
var crypto = require('crypto')
var ejs = require('ejs')

var data = {"1": "Comprar leche", "2": "Sacar a pasear al perro"}

function randomId() {
	return crypto.createHash('sha1').update((new Date().getTime())+'#'+Math.random()).digest('hex')
}

function list(req, res, params) {
	fs.readFile('template.html', 'utf8', function(err, html) {
		var out = ejs.render(html, {locals:{data:data}})
		
		res.writeHead(200, {'Content-Type': 'text/html'})
		res.end(out)
	})
}

function add(req, res, params) {
	data[randomId()] = params.text
	
	res.writeHead(302, { 'Location': '/' })
	res.end()
}

function remove(req, res, params) {
	var id = params.id
	
	delete data[id]
	
	res.writeHead(302, { 'Location': '/' })
	res.end()
}

var routes = {
	'POST/add': add,
	'GET/remove': remove,
	'GET/': list,
}

var port = process.argv[2] || 1337

http.createServer(function (req, res) {
	var method = req.method
	var url = require('url').parse(req.url, true)
	
	var controller = routes[method+url.pathname]
	if (!controller) {
		res.writeHead(404, {'Content-type': 'text/html;charset=utf8'});
		res.end('<h1>Not found</h1>');
		return
	}
	
	if (method === 'POST') {
		var query = '';
		req.addListener('data', function(chunk) {
			query += chunk;
		}).addListener('end', function() {
			var params = querystring.parse(query)
			controller(req, res, params)
		})
	} else {
		controller(req, res, url.query)
	}
	
}).listen(port, "127.0.0.1")

console.log('Server running at http://127.0.0.1:'+port)

process.on('SIGINT', function () {
	console.log()
	console.log('Good bye!')
	process.exit(0)
});