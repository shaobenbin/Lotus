'use strict';

module.exports = function(app, auth) {

    var index = require('../controllers/index');

    app.get('/', index.render);

}