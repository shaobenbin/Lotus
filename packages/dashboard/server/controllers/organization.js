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

    //处理下member
    if(!organization.member || organization.member.length==0){
        var member = new Array();

        organization.member = member;
    }

    organization.member.push(req.user.username);
//    var organization = new Organization({
//        name: 'A市产品线路一',
//        desc: '一量产超过',
//        logo: 'http://m.j/100x100',
//        owner: 'lanxi',
//        member: ['lanxi', 'binbin'],
//        create: dateNow,
//        updated: dateNow
//    });

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

    Organization.find({"owner":user_name},function(err,result){
        if(err){
            return res.status(400);
        }

        res.status(200);
        res.jsonp(result);
    })
}

/**
 * 获取我参与的组织
 * @param req
 * @param res
 */
exports.fetchByMember = function(req,res){
    var member_name = req.user.username;

    Organization.find({member:member_name},function(err,result){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        res.status(200);
        res.send(result);
    });
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
            res.send('删除成功');
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
        member = req.body.member,
        desc = req.body.desc,
        logo = req.body.logo;

    var dateNow =  Date.now();

    if (!(member instanceof Array)){
        member = new Array();
    }

    member.push(owner);


    Organization.update({name:name,owner:owner},{member:member,desc:desc,logo:logo,modified:dateNow},function(err){
        if (err) {
            switch (err.code) {
                default:
                    res.status(400).send('error' + err);
            }
            return res.status(400);
        }

        res.status(200);
        res.jsonp('修改成功');
    });
}
