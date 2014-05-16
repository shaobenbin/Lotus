'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product');


/**
 * 增加产品线
 * Create ProductLine
 */
exports.create = function (req, res) {
    // 根据 post 过来的数据创建新产品线
    // var productLine = new ProductLine(req.body);
    var product = new Product({
        name: 'A市产品线路一',
        description: '一量产超过',
        project_num: 12,
        user_id: 'lanxi',
        projects: [
            {
                version: '0.0.1',
                name: '产品一',
                user_id: 'lanxi',
                description: '产品描述一',
                stage: 1,
                related_ids: 1,
                update_time: 'sdf'
            }
        ]
    });

    // 调用 mongoose 方法保存到数据库
    product.save(function (err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('error' + err);
                    break;
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        // 创建成功，返回
        res.jsonp({success: '添加成功'});
    });
}


/**
 * 删除产品线
 * Create ProductLine
 */
exports.delete = function (req, res, next) {
    // 根据 post 过来的数据创建新用户
    var productLine = new Product(req.body);

    // 验证参数
    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

}

/**
 * 修改产品线
 * Create ProductLine
 */
exports.save = function (req, res, next) {
    // 根据 post 过来的数据创建新用户
    var productLine = new Product(req.body);

    // 验证参数
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

}

/**
 * 查询产品线-根据 id
 * Find ProductLine by id
 */
exports.find = function (req, res, next, id) {
    Product.findOne({
        _id: id
    })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load User ' + id));
            }
            req.profile = user;

            next();
        });
};


/**
 * 增加产品线
 * Create ProductLine
 */

exports.create = function (req, res, next) {
    // 根据 post 过来的数据创建新产品线
    //    var productLine = new ProductLine(req.body);
    var productLine = {
        name: 'A市产品线路一',           //"",
        description: 'A市产品线路一量产超过',
        //        create_time: '12',
        project_num: 12,    //"",
        user_id: 'lanxi',        //"",
        projects: [
            {
                version: '0.0.1', //"",
                name: '产品一',    //"",
                //            create_data: 12,//"",
                user_id: 'lanxi',
                description: '产品描述一',//"",
                stage: '1',//"",
                //            project_data: 'string',//"",
                related_ids: 'sdf',//"",
                update_time: 'sdf'//""
            }
        ]
    };

    // 验证参数
    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

    // 调用 mongoose 方法保存到数据库
    productLine.save(function (err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('error');
                    break;
                default:
                    res.status(400).send('error');
            }
            return res.status(400);
        }

        // TODO 返回前要更新界面视图

        // 创建成功，返回
        res.status(200);
    });
}

/**
 * 删除产品线
 * Create ProductLine
 */

exports.delete = function (req, res, next) {
    // 根据 post 过来的数据创建新用户
    var productLine = new ProductLine(req.body);

    // 验证参数
    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

}

/**
 * 修改产品线
 * Create ProductLine
 */

exports.save = function (req, res, next) {
    // 根据 post 过来的数据创建新用户
    var productLine = new ProductLine(req.body);

    // 验证参数
    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);

}

/**
 * 查询产品线-根据 id
 * Find ProductLine by id
 */

exports.find = function (req, res, next, id) {
    ProductLine.findOne({
        _id: id
    })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load User ' + id));
            }
            req.profile = user;

            next();
        });
};
