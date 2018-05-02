let fs = require('fs'),
		{ transform } = require('babel-core')

let fileName = process.argv[2] // get from cmd args

// read the code from this file
fs.readFile(fileName, function(err, data) {
	if(err) throw err

	// convert from a buffer to a string
	let src = data.toString()

	// use our plugin to transform the source
	let { code } = transform(src, {
		plugins: [require('../src/index')]
	})

	console.log(code)
})


// http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/html' })

// 	let fileName = process.argv[2] // get from cmd args

// 	// read the code from this file
// 	fs.readFile(fileName, function(err, data) {
// 		if(err) throw err

// 		// convert from a buffer to a string
// 		let src = data.toString()

// 		// use our plugin to transform the source
// 		let out = babel.transform(src, {
// 			plugins: [jadex]
// 		})

// 		// print the generated code to screen
// 		res.end(`<script type="text/javascript">${out.code}</script>`) // console.log(out.code)
// 	})
// }).listen(8080)