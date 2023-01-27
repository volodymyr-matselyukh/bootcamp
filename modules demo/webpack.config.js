const path = require('path');

module.exports = {
	mode: "development",
	context: __dirname,
	entry: './src/main_module.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          }
    },
	devtool: "source-map"
};