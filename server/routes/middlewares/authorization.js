'use strict';

/**
 * 登录路由中间件
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * 管理路由中间件
 * Generic require Admin routing middleware
 * 简单的角色管理检测 - 后期会加入完善的权限管理系统
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function (req, res, next) {
    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
        return res.send(401, 'User is not authorized');
    }
    next();
};