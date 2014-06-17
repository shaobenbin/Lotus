'use strict';

var _ = require('lodash'),
    fs = require('fs');

// Set the node environment variable if not set before
process.env.NODE_ENV = ~fs.readdirSync('./server/config/env').map(function (file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// 根据环境变量扩展all.js里的基础配置
// ./env/all 中的变量将覆盖 ./env/ + process.evn.NODE_ENV
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
