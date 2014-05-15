'use strict';

// 工具类
// Utilize Lo-Dash utility library
var _ = require('lodash'),
    fs = require('fs');

// 加载配置
// Load configurations
// Set the node environment variable if not set before
// 波浪号将整理作为一个表达式执行
process.env.NODE_ENV = ~fs.readdirSync('./server/config/env').map(function (file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// 扩展基础配置
// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
