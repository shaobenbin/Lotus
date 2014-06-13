//'use strict';
//
//var assert = require('assert'),
//    should = require('should'),
//    mongoose = require('mongoose'),
//    querystring = require('querystring'),
//    Organization = mongoose.model('Organization'),
//    superagent = require('superagent');
//
////Globals
//var cookie;
//
//var postData;
//
//var host = "http://localhost:3000";
//
//var owner;
//
//describe('<dashboard modules controller test>', function() {
//    describe('save find and del:', function() {
//        before(function(done) {
//            var member = new Array();
//            member.push('binbin');
//            postData = {
//                name:'卡拉',
//                desc:'卡拉是一条狗_controller',
//                projectId:'啦啦_controller',
//                author: 'binbin',
//                type: 'module',
//                items:[{
//                    name:'葛优',
//                    template:'/xx/xx/xx/xx.html',
//                    type: 'page',
//                    items:[{
//                        name:'要签名',
//                        desc:'要签名呀',
//                        type:'action',
//                        request_type:'get',
//                        request_url:'xx/xx/xx.action',
//                        map_url:'xx/xx/xx.action',
//                        request_parameter:[{
//                            name:'a',
//                            identifier:'a',
//                            data_type:'a',
//                            remark:'a',
//                            expression:'a',
//                            mock_data:'a'
//                        }],
//                        response_parameter:[{
//                            name:'a',
//                            identifier:'a',
//                            data_type:'a',
//                            remark:'a',
//                            expression:'a',
//                            mock_data:'a'
//                        }]
//                    }]
//                }]
//            };
//
//
//            var request = superagent.agent();
//            request
//                .post('http://localhost:3000/login')
//                .send({"email":"binbin@gmail.com","password":"mogujie123"})
//                .end(function(res){
//                    res.status.should.equal(200);
//                    cookie = res.headers['set-cookie'];
//                    done();
//                });
//        });
//
//        it('save modules',function(done){
//            var request = superagent.agent();
//            request.post(host+'/modules/save')
//                .send(postData)
//                .set('cookie',cookie)
//                .end(function(res){
//                    res.status.should.equal(200);
//                    done();
//                });
//        });
//
//        it('fetch modules',function(done){
//            var request = superagent.agent();
//            request.get(host+'/modules/fetch')
//                .send(postData)
//                .set('cookie',cookie)
//                .end(function(res){
//                    res.status.should.equal(200);
//                    done();
//                });
//        });
//
//        it('fetch module of version',function(done){
//            var request = superagent.agent();
//            request.get(host+'/modules/fetchofversion')
//                .send(postData)
//                .set('cookie',cookie)
//                .end(function(res){
//                    res.status.should.equal(200);
//                    done();
//                });
//        });
//
//        after(function(done){
//            done();
//        });
//
//    });
//});