'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Lotuscore = new Module('Lotuscore');

/*
 * 注册 MEAN 模块
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lotuscore.register(function(app, auth, database) {

    // 跳转的时候，默认包对象会传递过给路由
    // We enable routing. By default the Package Object is passed to the routes
    Lotuscore.routes(app, auth, database);

    // 为所有通过验证的用户添加菜单
    // We are adding a link to the main menu for all authenticated users
    Lotuscore.menus.add({
        title: 'lotuscore',
        link: 'lotuscore example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    // Save settings with callback
    // Use this for saving data from administration pages
    Lotuscore.settings({
        'someSetting': 'some value'
    }, function (err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Lotuscore.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Lotuscore.settings(function (err, settings) {
        console.log(settings);
        //you now have the settings object
    });

    return Lotuscore;
});
