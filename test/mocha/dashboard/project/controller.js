'use strict';

var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Project'),
    querystring = require('querystring'),
    superagent = require('superagent');


var cookie;
var postData;
var postNoOrganizationData;
var project;
var first_version;

describe('关于项目的测试', function () {
    before(function (done) {
        postData = {
            name: "滨滨项目-1",
            desc: "滨滨的项目嘿嘿"
        };

        var request = superagent.agent();
        request
            .post('http://localhost:3000/login')
            .send({"email": "binbin@gmail.com", "password": "mogujie123"})
            .end(function (res) {
                res.status.should.equal(200);
                cookie = res.headers['set-cookie'];
                done();
            });

    });

    describe('project 场景', function () {
        it('能够创建一个项目', function (done) {
            var request = superagent.agent();
            request.put('http://localhost:3000/project')
                .send(postData)
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    project = res.body;
                    done();
                });
        });

        it('能够为项目添加模块-全量',function(done){
            var modules = {
                name:'lal',
                desc:'dd',
                projectId:'333',
                version:'222',
                author:"ben",
                type:"aa",
                items:[{
                    name:'sasf',
                    template:"aasjdf",
                    type:"jkd",
                    items:[{
                        name:'sdf',
                        desc:'ssasa',
                        type: 'd',
                        request_type:'c',
                        request_url:"/style/blog",
                        map_url:'bulul',
                        request_parameter:{

                        },
                        response_parameter:{
                            userId:{desc:'用户id',value:'number',remark:'haha'},
                            userName:{desc:'用户名',
                                value:[{
                                    a:{value:'a',remark:'@time'},b:{value:'b'}
                                }],
                                remark:'lal'},
                            isDeleted:{value:'boolean'}
                        }
                    }]
                }]
            };

            var request = superagent.agent();
            request.post('http://localhost:3000/project/'+project._id)
                .send({modules:modules})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });

        });


        it('根据项目编号查询项目详情', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/project/'+project._id)
                .send({})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    first_version = res.body.version;
                    done();
                });
        });

        it('修改项目模块-全量',function(done){
            var modules = {
                name:'lal',
                desc:'dd',
                projectId:'333',
                version:'222',
                author:"ben",
                type:"aa",
                items:[{
                    name:'',
                    template:"aasjdf",
                    type:"jkd",
                    items:[{
                        name:'sdf',
                        desc:'ssasa',
                        type: 'd',
                        request_type:'c',
                        request_url:"/style/blog",
                        map_url:'bulul',
                        request_parameter:{

                        },
                        response_parameter:{
                            userId:{desc:'用户id',value:'number',remark:'haha'},
                            userName:{desc:'用户名',
                                value:[{
                                    key1:{value:'a',remark:'@time'},key2:{value:'b'}
                                }],
                                remark:'lal'},
                            isDeleted:{value:'boolean'}
                        }
                    }]
                }]
            };

            var request = superagent.agent();
            request.post('http://localhost:3000/project/'+project._id)
                .send({modules:modules})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });

        });

        it('更新后的项目版本号加1', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/project/'+project._id)
                .send({})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    var current_version = res.body.version;
                    current_version.should.equal(first_version+1);
                    done();
                });
        });

        it('查看当前项目的版本历史',function(done){
            var request = superagent.agent();
            request.get('http://localhost:3000/project/'+project._id+"/version")
                .send({})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });
        });

        it('查看某个版本的项目',function(done){
            var request = superagent.agent();
            request.get('http://localhost:3000/project/'+project._id+"/version/"+first_version)
                .send({})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });
        });

        it('回滚到某个版本号',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/'+project._id+"/version/"+first_version)
                .send({})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });
        });

        it('查看当前用户的所有项目', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/project')
                .send({})
                .set('cookie',cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    var project = JSON.parse(res.text);
                    project[0].name.should.equal(postData['name']);
                    done();
                });
        });

        it('项目归档',function (done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/'+project._id+"/notwork")
                .send({projectId:project._id})
                .set('cookie',cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });
        });
    });

    describe('模拟数据', function () {
        it('错误的url获取模拟数据会出错', function (done) {
            var request = superagent.agent();
            var url = encodeURIComponent('/style/star');
            request.get('http://localhost:3000/mockjs/project/'+project._id+"/"+url)
                .send({})
                .end(function (res) {
                    res.status.should.equal(400);
                    done();
                });
        });

        it('正确的url获取模拟数据是正确的', function (done) {
            var request = superagent.agent();
            var url = encodeURIComponent('/style/blog');
            request.get('http://localhost:3000/mockjs/project/'+project._id+"/"+url)
                .send({})
                .end(function (res) {
                    res.status.should.equal(200);
                    console.log("********************************");
                    console.log(res.text);
                    console.log("********************************");
                    //var project = JSON.parse(res.text);
                    //project[0].name.should.equal(postData['name']);
                    done();
                });
        });
    });

    after(function (done) {
//        var request = superagent.agent();
//        request.post('http://localhost:3000/project/del')
//            .send({projectId:project._id})
//            .set('cookie', cookie)
//            .end(function (res) {
//                res.status.should.equal(200);
//                done();
//            });
        done();
    });
});

