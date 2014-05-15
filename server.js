'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * 主程序入口文件
 * Main application entry file.
 * 请注意加载顺序很重要
 * Please note that the order of loading is important.
 */
// 初始化系统变量
// Initializing system variables
var config = require('./server/config/config');
// 连接数据库
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(passport, db);

// 开启程序监听端口
// Start the app by listening on <port>
app.listen(config.port);

console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// 初始化日志系统
// Initializing logger
logger.init(app, passport, mongoose);

// 导出 app
// Expose app
exports = module.exports = app;
