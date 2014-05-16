'use strict';

var Module = require('meanio').Module;
var Dashboard = new Module('Dashboard');

Dashboard.register(function (app, auth, database) {

    // 开启路由
    Dashboard.routes(app, auth, database);

    // 为注册用户添加菜单
    Dashboard.menus.add({
        title: 'dashboard',
        link: 'dashboard example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    // 为注册用户添加菜单
    Dashboard.menus.add({
        title: 'dashboard2',
        link: 'dashboard example page 2',
        roles: ['authenticated'],
        menu: 'main2'
    });

    return Dashboard;
});
