'use strict';

angular.element(document).ready(function() {
    // 通过跳转修复 facebook 的bug
    // Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    // 初始化应用
    //Then init the app
    angular.bootstrap(document, ['mean']);

    // $(".navbar-fixed-top").headroom({
    //     "tolerance": 15,
    //     "offset": 317,
    //     "classes": {
    //         "initial": "animated",
    //         "pinned": "slideDown",
    //         "unpinned": "slideUp"
    //     }
    // });

});

// 动态添加 packages 中定义的 angular 模块
// Dynamically add angular modules declared by packages
var packageModules = [];

for (var index in window.modules) {
    angular.module(window.modules[index].module, (window.modules[index].angularDependencies?window.modules[index].angularDependencies:[]));

    packageModules.push(window.modules[index].module);
}

// Default modules
var modules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'mean.system', 'mean.auth', 'ui.tree'];
modules = modules.concat(packageModules);

// Combined modules
angular.module('mean', modules);
