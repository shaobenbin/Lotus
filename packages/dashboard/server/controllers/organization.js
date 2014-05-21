'use strict';

var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization');

//Global
var perpage = 20;

/**
 * 创建一个组织
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    var dateNow =  Date.now();
    var organization = new Organization(req.body);
    organization.owner = req.user.username;
    organization.created = dateNow;
    organization.modified = dateNow;

    //处理下members
    if(!organization.members || organization.members.length==0){
        var members = new Array();

        organization.members = members;
    }

    organization.members.push(req.user.username);

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

/**
 * 获取我创建的组织
 * @param req
 * @param res
 */
exports.fetchByOwner = function (req, res) {
    var user_name = req.user.username;
    var page = req.param.page;
    if(!page || page>100){
        page = 1;
    }

    var skip_num = (page-1)*perpage;

    Organization.find({"owner":user_name},function(err,result){
        if(err){
            return res.status(400);
        }

        res.status(200);
        res.jsonp(result);
    }).skip(skip_num).limit(perpage);
}

/**
 * 获取我参与的组织
 * @param req
 * @param res
 */
exports.fetchByMember = function(req,res){
    var member_name = req.user.username;
    var page = req.param.page;

    if(!page || page>100){
        page = 1;
    }

    var skip_num = (page-1)*perpage;

    Organization.find({members:member_name},function(err,result){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp(result);
    }).skip(skip_num).limit(perpage);
}

/**
 * 删除组织
 * @param req
 * @param res
 */
exports.del = function(req,res){
    var name = req.body.name,
        owner = req.user.username;

    Organization.findOne({name:name,owner:owner},function(err,organization){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        var organization = new Organization(organization);
        organization.remove(function(err){
            if (err) {
                switch (err.code) {
                    default:
                        res.status(400).send('error' + err);
                }
                return res.status(400);
            }

            res.status(200);
            res.jsonp({success: '删除成功'});
        });
    });
}

/**
 *
 * @param req
 * @param res
 * members是一个数组{'用户名1','用户名2','用户名3','用户名4'.....}
 * 修改组织
 */
exports.modify = function(req,res){
    var name = req.body.name,
        owner = req.user.username,
        members = req.body.members,
        desc = req.body.desc,
        logo = req.body.logo;

    var dateNow =  Date.now();

    if (!(members instanceof Array)){
        members = new Array();
    }

    members.push(owner);


    Organization.update({name:name,owner:owner},{members:members,desc:desc,logo:logo,modified:dateNow},function(err){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp({success: '修改成功'});
    });
}