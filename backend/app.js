const express = require('express')
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const {getItems, addItem} = require('./db')
const { Product } = require('../src/models/Product');

const app = express()

const port = 3000

app.route("/items")
    .get((req, res) => {
        res.send(getItems())
    })
    .post((req, res, next) => {
        // var fstream;
        // req.pipe(req.busboy);
        // req.busboy.on('file', function (fieldname, file, filename) {
        //     console.log("Uploading: " + filename);

        //     //Path where image will be uploaded
        //     fstream = fs.createWriteStream(__dirname + '/img/' + filename);
        //     file.pipe(fstream);
        //     fstream.on('close', function () {    
        //         console.log("Upload Finished of " + filename);              
        //         res.redirect('back');           //where to go next
        //     });
        // });

        try{
            //create a form to begin parsing
            let productItem = new Product();
            
            var busboy = new Busboy({ headers: req.headers });

            busboy.on('file', function(fieldname, file, filename) {
                var saveTo = path.join(__dirname, "../dist/images", filename);
                productItem[fieldname.toLowerCase()] = filename;
                file.pipe(fs.createWriteStream(saveTo));
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

            // let form = new multiparty.Form();
            // let productItem = new Product();

            // form.on('error', next);
            // form.on('close', function(){
            //     console.log('on close');
            //     addItem(productItem);
            // });

            // // listen on field event for title
            // form.on('field', function(name, value){
            //     productItem[name.toLowerCase()] = value;
            // });

            // // listen on part event for image file
            // form.on('part', function(part){
            //     if (!part.filename) return;
                
            //     productItem[part.name.toLowerCase()] = part.filename;
                
            //     part.on('data', function(buf){
            //         let size = buf.length;
            //     });
            // });


            // // parse the form
            // form.parse(req, (err, fields, files) => {
            //     let f = fields;

            // });

            // if(productItem.id === 0)
            // {
            //     productItem.id = null;
            // }
        }
        catch(e){
            console.error(e);
        }

        res.send('Hello World!')
    });
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});