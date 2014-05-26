'use strict';

var fs = require('fs'),
    path = require('path');

/**
 * 迭代遍历模块路径为遇到的每个文件添加回调
 * @param modulesPath
 * @param excludeDir
 * @param callback
 */
exports.walk = function(modulesPath, excludeDir, callback) {
    fs.readdirSync(modulesPath).forEach(function(file) {
        var newPath = path.join(modulesPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir) {
            exports.walk(newPath, excludeDir, callback);
        }
    });
};
