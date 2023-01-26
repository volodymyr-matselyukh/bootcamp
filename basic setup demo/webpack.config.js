const path = require('path');

module.exports = {
	
	mode: "production",
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: "./scripts/main.js"
	},
	output: {
		"path": __dirname + '/dist',
		"filename": "index.js"
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		}
	},
	devtool: "source-map"
}