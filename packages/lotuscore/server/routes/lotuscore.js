'use strict';

// 这个包作为第一个参数传递
// The Package is past automatically as first parameter
module.exports = function(Lotuscore, app, auth, database) {

    // 首页路由
    // Home route
    var project = require('../controllers/project');

    // 返回项目列表信息, 后面只是多个回调函数啦
    app.get('/project/info', auth.requiresLogin, project.render);

    // 返回项目接口信息
    app.get('/project/api', auth.requiresLogin, function(req, res){
        // 可以直接返回 json
        res.json({"a": "a"});
//        res.send('Hello World');
    });

    app.get('/lotuscore/example/anyone', function(req, res, next) {
        // 返回不包括头部和页脚等的页面
        res.send('Anyone can access this');
    });

    // 调用验证用户的中间件
    app.get('/lotuscore/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    // 调用验证用户的中间件
    app.get('/lotuscore/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/lotuscore/example/render', function(req, res, next) {
        Lotuscore.render('index', {
            package: 'lotuscore'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
