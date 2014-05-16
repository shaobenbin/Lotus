'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    roles: [{
        type: String,
        default: 'authenticated'
    }],
    hashed_password: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    github: {},
    google: {},
    linkedin: {}
});

/**
 * 虚拟
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function() {
    return this._password;
});

/**
 * 验证
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * 普通注册需要通过下面的验证
 */
UserSchema.path('username').validate(function(username) {
    if (!this.provider) {
        return true;
    }
    return (typeof username === 'string' && username.length > 0);
}, 'Username cannot be blank');

UserSchema.path('email').validate(function(email) {
    if (!this.provider) {
        return true;
    }
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    if (!this.provider) {
        return true;
    }
    return (typeof hashed_password === 'string' && hashed_password.length > 0);
}, 'Password cannot be blank');

/**
 * 预保存钩子
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }
    if (!validatePresenceOf(this.password) && !this.provider) {
        next(new Error('Invalid password'));
    } else{
        next();
    }
});

UserSchema.methods = {

    /**
     * 是否属于某角色 - 检测用户是否属于某用户组
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    hasRole: function(role) {
        var roles = this.roles;
        return (roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1);
    },

    /**
     * 验证 - 检测两次输入密码是否相同
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.hashPassword(plainText) === this.hashed_password;
    },

    /**
     * 加盐
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * 加密密码
     * @param {String} password
     * @return {String}
     * @api public
     */
    hashPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }

};

mongoose.model('User', UserSchema);
