'use strict';

module.exports = function(app, auth) {

    // Home route
    var index = require('../controllers/index');

    app.get('/', index.render);

};
