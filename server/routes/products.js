'use strict';

module.exports = function (app, auth) {

    var products = require('../controllers/products');

    app.get('/products/create', products.create);

}