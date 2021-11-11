const Sequelize = require('sequelize');

let sqConnection = new Sequelize('internetshop', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sqConnection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const ProductItem = sqConnection.define('ProductItem', {
    name: {
        type: Sequelize.STRING
    },
    categoryid: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
});

ProductItem.sync({ force: false })
    .then(() => console.log("db sync success"))
    .catch(e => console.error("db sync", e));

let getItems = async () => {
    await ProductItem.findAll();
}

const addItem = async (item) => {
    await ProductItem.create(item)
    .then(data => console.log("product item added", data))
    .catch(e => console.error(e));
}

module.exports = { getItems, addItem }