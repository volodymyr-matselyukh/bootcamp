const express = require('express')
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const {getItems, addItem} = require('./db')
const { Product } = require('../src/models/Product');

const app = express()

app.use(cors())

const port = 3000

app.route("/items")
    .get(async (_, res) => {
        let items = await getItems();
        res.json(items);
    })
    .post((req, res) => {
        try{
            let productItem = new Product();
            
            var busboy = new Busboy({ headers: req.headers });

            busboy.on('file', function(fieldname, file, filename) {
                var saveTo = path.join(__dirname, "../dist/images", filename);
                productItem[fieldname.toLowerCase()] = filename;

                var ws = fs.createWriteStream(saveTo);
                file.pipe(ws).on('finish', function() {
                    console.log('Done writing request');
                });
            });

            busboy.on('field', function(fieldname, value) {
                if(fieldname.toLowerCase() === 'categoryid')
                {
                    value = Number.parseInt(value);
                }
                productItem[fieldname.toLowerCase()] = value;
            });

            busboy.on('finish', function() {
                delete productItem["id"];
                addItem(productItem);
                res.writeHead(201);
                res.end();
            });

            return req.pipe(busboy);
        }
        catch(e){
            console.error(e);
        }

        res.send('Hello World!')
    });
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});