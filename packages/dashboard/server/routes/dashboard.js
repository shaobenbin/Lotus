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
    //获取版本信息
    app.get('/project/queryVersion', auth.requiresLogin, project.queryVersion);
    //查看指定版本的project
    app.get('/project/viewVersion', auth.requiresLogin, project.viewVersion);
    //查看
    app.get('/project/changeVersion',auth.requiresLogin,project.changeVersion);
    //增加modules
    app.get('/project/addmodules',auth.requiresLogin,project.addModules);

    //module相关
    var modules = require('../controllers/modules.js');
    app.post('/modules/save', auth.requiresLogin, modules.save);
    app.post('/modules/fetch',auth.requiresLogin,modules.fetch);
    app.get('/modules/fetchofversion',auth.requiresLogin,modules.fetchOfVersion);

    var mockjs = require('../controllers/mockjs.js');
    app.get('/mockjs/generatedata',mockjs.generateData);
};
