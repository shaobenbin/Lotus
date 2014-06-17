'use strict';

var mongoose = require('mongoose'),
    CommitLog = mongoose.model('CommitLog'),
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
    project.modules = [];
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
            res.send(project);
        }
    });

}

exports.addModules = function (req, res) {
    var modules = req.body.modules;
    var projectId = req.params.id;
    Project.commit({_id: projectId}, {modules: modules},null, function (err, numberAffected, project) {
        if (err) {
            switch (err.code) {
                default:
                    res.send(400, 'error!');
            }
        } else {
            res.send(project);
        }
    })
};

/**
 * 获取未存档的项目
 * @param req
 * @param res
 */
exports.fetch = function (req, res) {
    var username = req.user.username;

    Project.find({member: username, isSaveFile: 0}, function (err, projects) {
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
 * 获取所有项目
 * @param req
 * @param res
 */
exports.fetchAll = function (req, res) {
    var username = req.user.username;

    Project.find({member: username}, function (err, projects) {
        if (!err) {
            res.send(projects);
        } else {
             switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }
    });
}

/**
 * 根据项目名获取一个项目
 * @param req
 * @param res
 */
exports.fetchOne = function (req, res) {
//    var username = req.user.username,
//        organization = req.body.organization,
//        name = req.body.name;
//
//    if (!organization || organization === '个人') {
//        organization = '个人';
//    }

    var projectId = req.params.id;

    Project.findOne({_id: projectId}, function (err, project) {

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
exports.del = function (req, res) {
    var projectId = req.params.id;
    Project.findOne({_id: projectId}, function (err, project) {
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        var newProject = new Project(project);
        newProject.remove(function (err) {
            if (err) {
                switch (err.code) {
                    default:
                        res.status(400).send(err.message);
                }
                return res.status(400);
            }

            res.send({success: '删除成功'});
        });
    });
}

exports.save2File = function (req, res) {
    var projectId = req.params.id;
    Project.update({_id: projectId}, {isSaveFile: 1}, function (err, rows) {

        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        res.send({success: '归档成功!'});
    });
}

/**
 * 查看某个版本的具体内容
 * @param req
 * @param res
 */
exports.queryVersion = function (req, res) {
    var objectName = 'project',
    //objectId = req.body.objectId;
        objectId = req.params.id;

    CommitLog.find({objectName: objectName, objectId: objectId}, function (err, commitLogs) {
        if (err) {
            res.status(400);
            res.send('err!');
            return;
        }

        res.status(200);
        res.send(commitLogs);
    });
}

/**
 * 查看某个版本的信息
 * @param req
 * @param res
 */
exports.viewVersion = function (req, res) {
    var objectName = 'project',
        version = req.params.versionId,
        objectId = req.params.id;

    CommitLog.findOne({objectName: objectName, objectId: objectId, version: version}, function (err, commitLog) {
        if (err) {
            res.status(400);
            res.send('err!');
            return;
        }

        var objectData = commitLog.objectData;

        if (objectName == 'project') {
            Project.findOne({_id: objectId}, function (err, project) {
                project.modules = objectData;
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
exports.changeVersion = function (req, res) {
    var objectName = 'project',
        version = req.params.versionId,
        objectId = req.params.id;
    if (objectName == 'project') {
        CommitLog.findOne({objectName: objectName, objectId: objectId, version: version}, function (err, commitLog) {
            if (err) {
                res.status(400);
                res.send('err!');
                return;
            }

            var modules = commitLog.objectData.modules;
            //objectData.version = version;
            //var now = Date.now();
            Project.update({_id: objectId}, {version: version, modules: modules}, function (err, rows) {
                if (err) {

                    res.status(400);
                    res.send('err!');
                }

                res.status(200);
                res.send('success');
            });
        });
    }
}

exports.save2File = function(req,res){
    var projectId = req.params.id;
    Project.update({_id:projectId},{isSaveFile:1},function(err,rows){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send(err.message);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp({success: '归档成功!'});
    });
}

/**
 * 查看某个版本的具体内容
 * @param req
 * @param res
 */
exports.queryVersion = function(req,res){
    var objectName = 'project',
        //objectId = req.body.objectId;
         objectId = req.params.id;

    CommitLog.find({objectName:objectName,objectId:objectId},function(err,commitLogs){
        if(err){
            res.status(400);
            res.send('err!');
            return;
        }

        res.status(200);
        res.send(commitLogs);
    });
}

/**
 * 查看某个版本的信息
 * @param req
 * @param res
 */
exports.viewVersion = function(req,res){
    var objectName = 'project',
        version = req.params.versionId,
        objectId = req.params.id;

    CommitLog.findOne({objectName:objectName,objectId:objectId,version:version},function(err,commitLog){
        if(err){
            res.status(400);
            res.send('err!');
            return;
        }

        var objectData = commitLog.objectData;

        if(objectName == 'project'){
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
    var objectName = 'project',
        version = req.params.versionId,
        objectId = req.params.id;
    if(objectName == 'project'){
        CommitLog.findOne({objectName:objectName,objectId:objectId,version:version},function(err,commitLog){
            if(err){
                res.status(400);
                res.send('err!');
                return;
            }

            var modules = commitLog.objectData.modules;
            //objectData.version = version;
            //var now = Date.now();
            Project.update({_id:objectId},{version:version,modules:modules},function(err,rows){
                if(err){
                    res.status(400);
                    res.send('err!');
                }

                res.status(200);
                res.send('success');
            });
        });
    }
}
