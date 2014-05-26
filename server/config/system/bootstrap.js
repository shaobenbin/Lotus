'use strict';

var express = require('express'),
    appPath = process.cwd();

var mean = require('meanio');

mean.app('莲藕项目', {});

module.exports = function(passport, db) {

    function bootstrapModels() {
        // Bootstrap 模型
        require('../util').walk(appPath + '/server/models', null, function(path) {
            require(path);
        });

        require('../util').walk(appPath + '/packages/dashboard/server/models', null, function(path) {
            require(path);
        });
    }

    bootstrapModels();

    // Bootstrap passport config
    require(appPath + '/server/config/passport')(passport);

    function bootstrapDependencies() {
        // 注册 passport 依赖
        mean.register('passport', function() {
            return passport;
        });

        // 注册 auth 依赖
        mean.register('auth', function() {
            return require(appPath + '/server/routes/middlewares/authorization');
        });

        // 注册数据库依赖
        mean.register('database', {
            connection: db
        });

        // 注册应用依赖
        mean.register('app', function() {
            return app;
        });
    }

    bootstrapDependencies();

    // express 设置
    // Express settings
    var app = express();
    require(appPath + '/server/config/express')(app, passport, db);

    return app;
};
