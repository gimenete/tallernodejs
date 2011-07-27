var http = require('http')
var querystring = require('querystring')

var assert = require('assert')

function request(host, port, method, path, params, callback) {
	if (method === 'GET') {
		path += '?'+querystring.stringify(params)
	}
	
	var options = { host: host, port: port, path: path, method: method }
	
	var req = http.request(options, function(res) {
		res.setEncoding('utf8')
		var data = ''
		res.on('data', function (chunk) {
			data += chunk
		})
		res.on('end', function() {
			callback(null, res.statusCode, data)
		})
	})
	
	if (method === 'POST') {
		req.write(querystring.stringify(params))
	}
	
	req.on('error', function(e) {
		callback(e, 0, null)
	})

	req.end()
}

var name = 'gimenete'

request('127.0.0.1', 1337, 'GET', '/hello', {name:name}, function(error, statusCode, data) {
	assert.ifError(error)
	assert.equal(statusCode, 200)
	assert.equal('Hello '+name, data)
})

/*
exports.series = function(tests, callback) {
	var serie = {
		k: 0,
		errors: [],
		results: [],
		next: function() {
			if (this.k >= tests.length) {
				callback(this.errors, this.results)
			} else {
				var f = tests[this.k]
				this.k++
				f(function(that) {
					return function(a, b) {
						that.errors.push(a)
						that.results.push(b)
						that.next()
					}
				}(this))
			}
		}
	}
	serie.next()
}
*/