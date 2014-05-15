'use strict';


module.exports = function(app, auth) {

    // Home route
    var index = require('../controllers/index');

    app.get('/', index.render);

//    var productLine = require('../controllers/products');
//
//    app.get('/products/create', productLine.create);

};
