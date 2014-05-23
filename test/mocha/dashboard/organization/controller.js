'use strict';

var assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    querystring = require('querystring'),
    Organization = mongoose.model('Organization'),
    superagent = require('superagent');

//Globals
var cookie;

var postData;

var host = "http://localhost:3000";

var owner;

describe('<dashboard organization controller test>', function() {
    before(function(done) {
        var member = new Array();
        member.push('binbin');
        postData = {
            name: 'A市产品线路一_controller',
            desc: '一量产超过B_controller',
            logo: 'http://m.j/100x100',
            member:member
        };

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
        it('create a organization without problem',function(done){
            var request = superagent.agent();
            request.post(host+'/api/organization/create')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        });

        it('get oranization witch owner is me',function(done){
            var request = superagent.agent();
            request.get(host+'/api/organizations/me')
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var organizations = JSON.parse(res.text);
                    organizations.length.should.greaterThan(0);
                    done();
                });
        });

        it('get oranization of member',function(done){
            var request = superagent.agent();
            request.get(host+'/api/organizations')
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    var organizations = JSON.parse(res.text);
                    organizations.length.should.greaterThan(0);
                    owner = organizations[0].owner;
                    done();
                });
        });

        it('modify organization', function(done) {
            var request = superagent.agent();
            postData.member.push('hala');
            request.post(host+'/api/organization/modify')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        });

        it('query organization of new member user', function(done) {
            Organization.findOne({member:'hala',owner:owner},function(err,result){
                should.not.exist(err);
                result.owner = owner;
                done();
            })
        });

        it('del the organization without problem',function(done){
            var request = superagent.agent();
            request.post(host+'/api/organization/del')
                .send(postData)
                .set('cookie',cookie)
                .end(function(res){
                    res.status.should.equal(200);
                    done();
                });
        });

    });

    after(function(done) {
        done();
    });
});

