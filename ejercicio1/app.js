var fs = require('fs')
var sys = require('sys')

fs.readFile('source.json', 'utf8', function(err, data) {
	console.log('fichero leído')
	
	// TODO: parsear 'data' como JSON
	
	// TODO: mostrar datos parseado
	
	// TODO: modificar datos parseados
	
	// TODO: generar en 'data' la representación JSON de los datos tras ser modificados
	
	fs.writeFile('output.json', data, 'utf8', function(err) {
		console.log('fichero escrito')
	})
})

console.log('hello world')