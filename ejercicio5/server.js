var fs = require('fs')
var crypto = require('crypto')

function randomId() {
	return crypto.createHash('sha1').update((new Date().getTime())+'#'+Math.random()).digest('hex')
}

var server = require('http').createServer(function(req, res){
	fs.readFile('template.html', 'utf8', function(err, html) {
		res.writeHead(200, {'Content-Type': 'text/html'})
		res.end(html);
	})
});
server.listen(8080);

var nowjs = require("now")
var everyone = nowjs.initialize(server)

everyone.now.distributeRemove = function(id) {
	everyone.now.receiveRemove(id)
}

everyone.now.distributeAdd = function(text) {
	everyone.now.receiveAdd(randomId(), text)
}
