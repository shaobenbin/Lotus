'use strict';

var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Project'),
    querystring = require('querystring'),
    superagent = require('superagent');


var cookie;

var postData;
var postNoOrganizData;
describe('<dashboard organization controller test', function () {
    before(function(done) {
        postData = {
            'name': '项目一_controller',
            'desc': '项目一描述_controller',
            'logo': 'http://m.j/100x100',
            'organization': 'mogujie'
        };

        postNoOrganizData = {
            'name': '项目二_controller',
            'desc': '项目二描述_controller',
            'logo': 'http://m.j/100x100'
        }

        var request = superagent.agent();
        request
            .post('http://localhost:3000/login')
            .send({"email":"binbin@gmail.com","password":"mogujie123"})
            .end(function(res){
                res.status.should.equal(200);
                cookie = res.headers['set-cookie'];
                done();
            });

    });

    describe('scene 1', function() {
        it('should create project',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/create')
                    .send(postData)
                    .set('cookie',cookie)
                    .end(function(res){
                        res.status.should.equal(200);
                        done();
                 });
        });

        it('query project of organization and username',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/create')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(400);
                    done();
                });
        });

        it('query project of project name',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/fetchOne')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var project = JSON.parse(res.text);
                    project.name.should.equal(postData['name']);
                    done();
                });
        });

        it('should get user organization projects',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/fetch')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var projects = JSON.parse(res.text);
                    projects.length.should.equal(1);
                    projects[0].name.should.equal(postData['name']);
                   // res.text[0].name.should.equal('项目一');
                    done();
                });
        });

        it('should create project no organization',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/create')
                .send(postNoOrganizData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        });

        it('can not create repeat project no organization',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/create')
                .send(postNoOrganizData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(400);
                    done();
                });
        });

        it('query project of project name,the project no organization',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/fetchOne')
                .send(postNoOrganizData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var project = JSON.parse(res.text);
                    project.name.should.equal(postNoOrganizData['name']);
                    done();
                });
        });

        it('query project of username,the project no organization',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/fetch')
                .send(postNoOrganizData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var projects = JSON.parse(res.text);
                    projects.length.should.equal(1);
                    projects[0].name.should.equal(postNoOrganizData['name']);
                    done();
                });
        });

        it('should del project',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/del')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        });

        it('shoule del the project ,and the project has no organization',function(done){
            var request = superagent.agent();
            request.post('http://localhost:3000/project/del')
                .send(postNoOrganizData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        })

    });

    after(function(done) {
        done();
    });
});

