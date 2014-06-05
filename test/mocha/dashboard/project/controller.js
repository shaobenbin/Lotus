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

describe('<dashboard organization controller test', function () {
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

    describe('project test', function () {
        it('should create project', function (done) {
            var request = superagent.agent();
            request.post('http://localhost:3000/project/create')
                .send(postData)
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    project = res.body;
                    done();
                });
        });

        it('should add modules',function(done){
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
                        request_url:"lkul",
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
            request.get('http://localhost:3000/project/addmodules')
                .send({projectId:project._id,modules:modules})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });

        });


        it('query project of project id', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/project/fetchOne')
                .send({projectId:project._id})
                .set('cookie', cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    done();
                });
        });

        it('query all project', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/project/fetch')
                .send({})
                .set('cookie',cookie)
                .end(function (res) {
                    res.status.should.equal(200);
                    var project = JSON.parse(res.text);
                    project[0].name.should.equal(postData['name']);
                    done();
                });
        });
    });

    describe('mock data test', function () {
        it('should get problem use miss request url', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/mockjs/generatedata')
                .send({projectId:project._id,requestUrl:'lkul1111'})
                .end(function (res) {
                    res.status.should.equal(400);
                    done();
                });
        });

        it('should get mock data', function (done) {
            var request = superagent.agent();
            request.get('http://localhost:3000/mockjs/generatedata')
                .send({projectId:project._id,requestUrl:'lkul'})
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
        var request = superagent.agent();
        request.post('http://localhost:3000/project/del')
            .send({projectId:project._id})
            .set('cookie', cookie)
            .end(function (res) {
                res.status.should.equal(200);
                done();
            });
    });
});

