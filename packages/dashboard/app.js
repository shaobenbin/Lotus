'use strict';

var Module = require('meanio').Module;
var Dashboard = new Module('Dashboard', ['ui.bootstrap']);

Dashboard.register(function (app, auth, database) {

    // 开启路由
    Dashboard.routes(app, auth, database);

    // 为注册用户添加菜单
    Dashboard.menus.add({
        title: 'dashboard',
        link: 'dashboard.projects',
        roles: ['authenticated'],
        menu: 'main'
    });

    // 引入模块资源
    Dashboard.aggregateAsset('css','dashboard.css');
    Dashboard.aggregateAsset('css', 'project.css');
    Dashboard.aggregateAsset('css', 'projects.css');

    return Dashboard;
});
