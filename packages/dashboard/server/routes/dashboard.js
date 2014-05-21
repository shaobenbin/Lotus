'use strict';

module.exports = function(Dashboard, app, auth, database) {

    // TODO: 怎么拆封路由
    // 组织相关
    var organization = require('../controllers/organization.js');
    app.get('/api/organization/create', auth.requiresLogin, organization.create);
    app.get('/api/organizations/', auth.requiresLogin, organization.findByOwner);

    // 项目相关
    var project = require('../controllers/project.js');
    app.get('/project/create', auth.requiresLogin, project.create);

};
