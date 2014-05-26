'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    _ = require('lodash');

mongoose.set('debug', true);

/**
 * 创建一个项目
 */
exports.create = function (req, res) {
    var project = new Project(req.body);
    var dateNow = Date.now();
    project.created = dateNow;
    project.modified = dateNow;
    project.owner = req.user.username;
    project.member = [];
    project.member.push(req.user.username);

    // 验证数据
    req.assert('name', 'name cannot be more than 20 characters').len(1, 20);

    // 调用框架方法验证参数
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    project.save(function (err) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        } else {
            res.jsonp({success: '添加成功'});
        }
    });
}

/**
 * 获取项目
 * @param req
 * @param res
 */
exports.fetch = function (req, res) {
    var organization = req.body.organization,
        username = req.user.username;

//    if (!organization || organization === '个人') {
//        organization = '个人';
//    }

    Project.find({owner: username}, function (err, projects) {
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

    if (!organization || organization === '个人') {
        organization = '个人';
    }

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
        });
    });
}

///**
// * Delete an project
// */
//exports.destroy = function(req, res) {
//    var project = req.project;
//
//    project.remove(function(err) {
//        if(err) {
//            return res.send('users/signup', {
//                error: err.errors,
//                project: project
//            });
//        } else {
//            res.jsonp(project);
//        }
//    })
//}
//
///**
// * Show an project
// */
//exports.show = function(req, res) {
//    res.jsonp(req.project)
//}
//
///**
// * List of Projects
// */
//exports.all = function(req, res) {
//    var username = req.user.username;
//
//    Project.find({member: username}, function (err, projects) {
//        if (err) {
//            res.render('error', {
//                status: 500
//            })
//        } else {
//            res.jsonp(projects);
//        }
//    });
//}