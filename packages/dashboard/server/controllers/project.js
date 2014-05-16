'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

mongoose.set('debug', true);

exports.create = function (req, res) {
    var dateNow = Date.now();
    // 根据 post 过来的数据创建新用户
    var project = new Project({
        name: '项目一',
        desc: '项目一描述',
        logo: 'http://m.j/100x100',
        owner: 'lanxi',
        create: dateNow,
        modified: dateNow,
        organization: 'mogujie'
    });

    // 验证数据
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

    // 调用框架方法验证参数
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    project.save(function(err) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        }
        res.status(200);
    });
}