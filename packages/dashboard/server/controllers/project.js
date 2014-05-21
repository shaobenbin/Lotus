'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

mongoose.set('debug', true);

/**
 * 创建一个项目
 * @param req
 * @param res
 * @returns {*}
 */
exports.create = function (req, res) {
    var dateNow = Date.now();
    // 根据 post 过来的数据创建新用户



    var project = new Project(req.body);
    project.created = dateNow;
    project.modified = dateNow;
    project.owner = req.user.username;

    // 验证数据
    req.assert('name', 'name cannot be more than 20 characters').len(1, 20);

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
        res.jsonp({success: '添加成功'});
    });
}

/**
 * 获取项目
 * @param req
 * @param res
 */
exports.fetch = function(req,res){
    var organization = req.body.organization,
        username = req.user.username;

    if(!organization){
        organization = null;
    }

    Project.find({organization:organization,owner:username},function(err,projects){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp(projects);

    });
}

/**
 * 根据项目名获取一个项目
 * @param req
 * @param res
 */
exports.fetchOne = function(req,res){
    var username = req.user.username,
        organization = req.body.organization,
        name = req.body.name;

    Project.findOne({organization:organization,owner:username,name:name},function(err,project){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp(project);

    });
}

/**
 * 删除项目
 * @param req
 * @param res
 */
exports.del = function(req,res){
    var name = req.body.name,
        organization = req.body.organization,
        username = req.user.username;
    Project.findOne({name:name,organization:organization,owner:username},function(err,project){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        var project = new Project(project);
        project.remove(function(err){
                if (err) {
                    switch (err.code) {
                        default:
                            res.status(400).send(err.message);
                    }
                    return res.status(400);
                }

                res.status(200);
                res.jsonp({success: '添加成功'});
        })
    });
}