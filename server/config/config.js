'use strict';

// 工具类 Lo-Dash
var _ = require('lodash'),
    fs = require('fs');

// 加载配置
// Set the node environment variable if not set before
// 波浪号将整理作为一个表达式执行
process.env.NODE_ENV = ~fs.readdirSync('./server/config/env').map(function (file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// 根据环境变量扩展all.js里的基础配置
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
