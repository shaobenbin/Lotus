'use strict';

module.exports = function(Dashboard, app, auth, database) {

//    // 组织相关
//    var organization = require('../controllers/organization.js');
//    app.post('/api/organization/create', auth.requiresLogin, organization.create);
//    app.post('/api/organization/del', auth.requiresLogin, organization.del);
//    app.post('/api/organization/modify', auth.requiresLogin, organization.modify);
//    app.get('/api/organizations', auth.requiresLogin, organization.fetchByMember);
//    app.get('/api/organizations/me', auth.requiresLogin, organization.fetchByOwner);

    // 项目相关
    var project = require('../controllers/project.js');
    //新增项目
    app.put('/project', auth.requiresLogin, project.create);
    //删除项目
    app.delete('/project/:id', auth.requiresLogin, project.del);
    //获取的是工作中的项目,为了描述资源是正在工作的project
    app.get('/onwork/project', auth.requiresLogin, project.fetch);
    //根据项目编号获取项目详情,
    app.get('/project/:id', auth.requiresLogin, project.fetchOne);
    //获取所有项目
    app.get('/project', auth.requiresLogin, project.fetchAll);
    //增加modules
    app.post('/project/:id',auth.requiresLogin,project.addModules);
    //获取版本信息
    app.get('/project/:id/version', auth.requiresLogin, project.queryVersion);
    //查看指定版本的project
    app.get('/project/:id/version/:versionId', auth.requiresLogin, project.viewVersion);
    //查看
    app.post('/project/:id/version/:versionId',auth.requiresLogin,project.changeVersion);


    //项目归档
    app.post('/project/:id/notwork',auth.requiresLogin,project.save2File);

//    //module相关
//    var modules = require('../controllers/modules.js');
//    app.post('/modules/save', auth.requiresLogin, modules.save);
//    app.post('/modules/fetch',auth.requiresLogin,modules.fetch);
//    app.get('/modules/fetchofversion',auth.requiresLogin,modules.fetchOfVersion);

    var mockjs = require('../controllers/mockjs.js');
    app.get('/mockjs/project/:id/:url',mockjs.generateData);
};
