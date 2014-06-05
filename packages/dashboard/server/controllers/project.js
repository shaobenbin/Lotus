'use strict';

var mongoose = require('mongoose'),
    CheckIn = mongoose.model('CheckIn'),
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
    project.ownerId = req.user._id;
    project.member = [];
    project.member.push(req.user.username);

    // 验证数据
    req.assert('name', 'name cannot be more than 20 characters').len(1, 20);

    // 调用框架方法验证参数
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    project.save(function (err,project) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        } else {
            res.status(200);
            res.send(project);
        }
    });
}

exports.addModules = function(req,res){
    var modules = req.body.modules;
    var projectId = req.body.projectId;
    Project.checkIn({_id:projectId},{modules:modules},null,function(err,project){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        } else {
            res.status(200);
            res.send("success");
            return;
        }
    })
};

/**
 * 获取项目
 * @param req
 * @param res
 */
exports.fetch = function (req, res) {
    var username = req.user.username;

    Project.find({member: username}, function (err, projects) {
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
//    var username = req.user.username,
//        organization = req.body.organization,
//        name = req.body.name;
//
//    if (!organization || organization === '个人') {
//        organization = '个人';
//    }

    var projectId = req.body.projectId;

    Project.findOne({_id:projectId},function(err,project){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        res.status(200);
        res.send(project);
        return;

    });
}

/**
 * 删除项目
 * @param req
 * @param res
 */
exports.del = function(req,res){
//    var name = req.body.name,
//        organization = req.body.organization,
//        username = req.user.username;
    var projectId = req.body.projectId;
    Project.findOne({_id:projectId},function(err,project){
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

/**
 * 查看某个版本的具体内容
 * @param req
 * @param res
 */
exports.queryVersion = function(req,res){
    var objectName = 'project',
        objectId = req.body.objectId;

    CheckIn.find({objectName:objectName,objectId:objectId},function(err,checkIns){
        if(err){
            res.status(400);
            res.send("err!");
            return;
        }

        res.status(200);
        res.send(checkIns);
    });
}

/**
 * 查看某个版本的信息
 * @param req
 * @param res
 */
exports.viewVersion = function(req,res){
    var objectName = 'project',
        version = req.body.version,
        objectId = req.body.objectId;

    CheckIn.findOne({objectName:objectName,objectId:objectId,versionId:version},function(err,checkIn){
        if(err){
            res.status(400);
            res.send("err!");
            return;
        }

        var objectData = checkIn.objectData;

        if(objectName == "project"){
            Project.findOne({_id:objectId},function(err,project){
                project.modules=objectData;
                project.version = version;
                res.status(200);
                res.send(project);
                return;
            });
        }
    });
}

/**
 * 变更version
 * @param req
 * @param res
 */
exports.changeVersion = function(req,res){
    var objectName = "project",
        version = req.body.versionId,
        objectId = req.body.objectId;
    if(objectName == 'product'){
        CheckIn.findOne({objectName:objectName,objectId:objectId,version:versionId},function(err,checkIn){
            if(err){
                res.status(400);
                res.send("err!");
                return;
            }

            var objectData = checkIn.objectData;
            var now = Date.now();
            Project.findOne({_id:objectId},{modules:objectData,version:version,updated:now},function(err){
                if(err){
                    res.status(400);
                    res.send("err!");
                    return;
                }

                res.status(200);
                res.send('success');
            })
        });
    }

    res.status(400);
    res.send("error object name!");
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
