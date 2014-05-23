'use strict';

module.exports = function(Dashboard, app, auth, database) {

    // 测试相关
    app.get('/dashboard/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });
    app.get('/dashboard/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });
    app.get('/dashboard/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });
    app.get('/dashboard/example/render', function(req, res, next) {
        Dashboard.render('index', {
            package: 'dashboard'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    // 显示创建组织窗口
    app.get('/dashboard/create-organization.html', function(req, res, next) {
        Dashboard.render('create-organization', {
            package: 'dashboard'
        }, function(err, html) {
            res.send(html);
        });
    });
    // 显示创建项目窗口
    app.get('/dashboard/create-project.html', function(req, res, next) {
        Dashboard.render('create-project', {
            package: 'dashboard'
        }, function(err, html) {
            res.send(html);
        });
    });

    // TODO: 怎么拆封路由
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
    app.get('/modules/fetch',auth.requiresLogin,modules.fetch);
    app.get('/modules/fetchofversion',auth.requiresLogin,modules.fetchOfVersion);

};

