const express = require('express')
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const { getItems, addItem, deleteItem } = require('./db')
const { Product } = require('../src/models/Product');

const app = express();

app.use(cors())

const port = 3000

app.route("/items")
	.get(async (_, res) => {
		let items = await getItems();
		res.json(items);
	})
	.post((req, res) => {
		try {
			let productItem = new Product();

			let bb = new Busboy({ headers: req.headers });

			bb.on('file', function (fieldname, file, filename) {
				let saveTo = path.join(__dirname, "../dist/images", filename);
				productItem[fieldname.toLowerCase()] = filename;

				let ws = fs.createWriteStream(saveTo);
				file.pipe(ws).on('finish', function () {
					console.log('Done writing request');
				});
			});

			bb.on('field', function (fieldname, value) {
				if (fieldname.toLowerCase() === 'categoryid') {
					value = Number.parseInt(value);
				}
				productItem[fieldname.toLowerCase()] = value;
			});

			bb.on('finish', async function () {
				delete productItem["id"];
				await addItem(productItem);
				res.writeHead(201);
				res.end('success');
			});

			req.pipe(bb);
			
		}
		catch (e) {
			console.error(e);
			req.pipe(bb);
		}
	})
	.delete((req, res) => {
		try {
			let bb = new Busboy({ headers: req.headers });

			let itemId = -1;

			bb.on('field', function (fieldname, value) {
				if (fieldname.toLowerCase() === 'itemid') {
					itemId = Number.parseInt(value);
				}
			});

			bb.on('finish', async function () {
				if (itemId === -1) {
					res.writeHead(400);
					res.end('bad request');
				}
				else{
					await deleteItem(itemId);
					res.writeHead(204);
					res.end('success');
				}
			});

			req.pipe(bb);
		}
		catch (e) {
			console.error(e);
			req.pipe(bb);
		}
	});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});