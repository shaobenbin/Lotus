'use strict';

module.exports = function(Dashboard, app, auth, database) {

    // 组织相关
    var organization = require('../controllers/organization.js');
    app.post('/api/organization/create', auth.requiresLogin, organization.create);
    app.post('/api/organization/del', auth.requiresLogin, organization.del);
    app.post('/api/organization/modify', auth.requiresLogin, organization.modify);
    app.get('/api/organizations', auth.requiresLogin, organization.fetchByMember);
    app.get('/api/organizations/me', auth.requiresLogin, organization.fetchByOwner);

    // 项目相关
    var project = require('../controllers/project.js');
    app.post('/project/create', auth.requiresLogin, project.create);
    app.post('/project/del', auth.requiresLogin, project.del);
    app.get('/project/fetch', auth.requiresLogin, project.fetch);
    app.get('/project/fetchOne', auth.requiresLogin, project.fetchOne);


    //module相关
    var modules = require('../controllers/modules.js');
    app.post('/modules/save', auth.requiresLogin, modules.save);
    app.post('/modules/fetch',auth.requiresLogin,modules.fetch);
    app.get('/modules/fetchofversion',auth.requiresLogin,modules.fetchOfVersion);

};

