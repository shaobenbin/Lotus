'use strict';

var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization');

exports.create = function (req, res) {

    // var productLine = new ProductLine(req.body);
    var dateNow =  Date.now();
    var organization = new Organization({
        name: 'A市产品线路一',
        desc: '一量产超过',
        logo: 'http://m.j/100x100',
        owner: 'lanxi',
        create: dateNow,
        modified: dateNow
    });

    // 调用 mongoose 方法保存到数据库
    organization.save(function (err) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        // 创建成功，返回
        res.jsonp({success: '添加成功'});
    });

}

exports.findByOwner = function (req, res) {

}
