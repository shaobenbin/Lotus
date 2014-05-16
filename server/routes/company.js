'use strict';

module.exports = function (app) {

    // Home route
    var company = require('../controllers/company');

    app.get('/company/created', company.created);
};