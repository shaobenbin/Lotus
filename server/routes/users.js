'use strict';

var users = require('../controllers/users');

module.exports = function (app, passport) {

    app.get('/logout', users.signout);
    app.get('/users/me', users.me);
    app.post('/register', users.create);

    // 设置用户 id 参数
    app.param('userId', users.user);

    // 判断是否已经登录
    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    // 本地登录路由策略
    app.post('/login', passport.authenticate('local', {
        failureFlash: true
    }), function (req, res) {
        res.send(req.user);
    });

    // 第三方账号登录
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '#!/login'
    }), users.signin);

    app.get('/auth/facebook/ca' +
        'llback', passport.authenticate('facebook', {
        failureRedirect: '#!/login'
    }), users.authCallback);

    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '#!/login'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '#!/login'
    }), users.authCallback);

    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '#!/login'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '#!/login'
    }), users.authCallback);

    app.get('/auth/linkedin', passport.authenticate('linkedin', {
        failureRedirect: '#!/login',
        scope: [ 'r_emailaddress' ]
    }), users.signin);

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        failureRedirect: '#!/login'
    }), users.authCallback);

    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '#!/login',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '#!/login'
    }), users.authCallback);

};
