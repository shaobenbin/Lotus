'use strict';

module.exports = function(Dashboard, app, auth, database) {

    // TODO: 怎么拆封路由
    // 组织相关
    var organization = require('../controllers/organization.js');
    app.post('/api/organization/create', auth.requiresLogin, organization.create);
    app.post('/api/organization/del', auth.requiresLogin, organization.del);
    app.post('/api/organization/modify', auth.requiresLogin, organization.modify);
    app.get('/api/organizations/:page', auth.requiresLogin, organization.fetchByMember);
    app.get('/api/organizations/me/:page', auth.requiresLogin, organization.fetchByOwner);

    // 项目相关
    var project = require('../controllers/project.js');
    app.post('/project/create', auth.requiresLogin, project.create);
    app.post('/project/del', auth.requiresLogin, project.del);
    app.post('/project/fetch', auth.requiresLogin, project.fetch);
    app.post('/project/fetchOne', auth.requiresLogin, project.fetchOne);

};

