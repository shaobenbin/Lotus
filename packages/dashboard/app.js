'use strict';

var Module = require('meanio').Module;

var Dashboard = new Module('Dashboard');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
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

    return Dashboard;
});
