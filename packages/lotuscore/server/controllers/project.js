'use strict';

var mean = require('meanio');

exports.render = function(req, res) {

    var modules = [];

    // 页面上先加载 angular 模块等依赖模块
    // Preparing angular modules list with dependencies
    for (var name in mean.modules) {
        modules.push({
            name: name,
            module: 'mean.' + name,
            angularDependencies: mean.modules[name].angularDependencies
        });
    }

    // Send some basic starting info to the view
    res.render('index', {
        user: req.user ? JSON.stringify({
            _id: req.user._id,
            username: req.user.username,
            roles: (req.user ? req.user.roles : ['annonymous'])
        }) : 'null',
        modules: JSON.stringify(modules)
    });
};