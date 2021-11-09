const path = require('path');
module.exports = {
    "mode": "none",
    "context": path.resolve(__dirname, 'src'),
    "entry": {
        main: "./modules/main.js",
        mainAddNew: "./modules/mainAddNew.js",
        mainBasket: "./modules/mainBasket.js",
        basket: "./basket/basket.js"
    },
    "output": {
        "path": __dirname + '/dist',
        "filename": "[name].js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          }
    },
    devtool: "source-map"
}