'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * 验证回调
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * 显示登录表单
 * Show login form
 */
exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * 创建用户
 * Create user
 */
exports.create = function(req, res, next) {
    // 根据 post 过来的数据创建新用户
    var user = new User(req.body);

    // 设置用户来源
    user.provider = 'local';

    // 验证数据
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('password', 'Password must be between 8-20 characters long').len(1, 20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    // 调用框架方法验证参数
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    // 硬编码用户角色，后期会加上权限管理系统
    user.roles = ['authenticated'];

    // 调用 mongoose 方法保存到数据库
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Username already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        }
        // 登录账号
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
        res.status(200);
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * 根据 id 查找用户
 */
exports.user = function(req, res, next, id) {
    User.findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};