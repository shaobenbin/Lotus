'use strict';

module.exports = function(Dashboard, app, auth) {

    // 项目相关
    var project = require('../controllers/project.js');

    //获取所有项目
    app.get('/project', auth.requiresLogin, project.fetchAll);
    // 新增项目
    app.post('/project', auth.requiresLogin, project.create);

    //根据项目编号获取项目详情,
    app.get('/project/:id', auth.requiresLogin, project.fetchOne);
    //增加modules
    app.post('/project/:id',auth.requiresLogin,project.addModules);
    // 删除项目
    app.delete('/project/:id', auth.requiresLogin, project.del);


    // 获取的是工作中的项目,为了描述资源是正在工作的project
    app.get('/onwork/project', auth.requiresLogin, project.fetch);

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
