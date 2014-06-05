//'use strict';
//
//var should = require('should'),
//    mongoose = require('mongoose'),
//    Organization = mongoose.model('Organization');
//
////Globals
//var organization, organization2;
//
////The Test
//describe('<dashboard organization model test>', function() {
//    describe('Model Organization:', function() {
//        before(function(done) {
//            var dateNow =  Date.now();
//            var member = new Array();
//            member.push('binbin');
//            organization = new Organization({
//                name: 'A市产品线路一',
//                desc: '一量产超过',
//                logo: 'http://m.j/100x100',
//                owner: 'lanxi',
//                member:member,
//                create: dateNow,
//                modified: dateNow
//            });
//
//            organization2 = new Organization(organization);
//
//            done();
//        });
//        describe('scene 1', function() {
//            it('should begin without the test name', function(done) {
//                Organization.find({ name: 'A市产品线路' }, function(err, organizations) {
//                    organizations.should.have.length(0);
//                    done();
//                });
//            });
//
//            it('save organization without problems', function(done) {
//                organization.save(function(err){
//                    should.not.exist(err);
//                    done();
//                });
//            });
//
//            it('save same organization have err', function(done) {
//                organization.save(function(err){
//                    should.exist(err);
//                    done();
//                });
//            });
//
//
//            it('save without name have err', function(done) {
//                organization.name = '';
//                return organization.save(function(err) {
//                    should.exist(err);
//                    done();
//                });
//            });
//
//            it('query user organization in member',function(done){
//                Organization.findOne({member:'binbin',owner:organization2.owner},function(err,result){
//                    should.not.exist(err);
//                    result.owner.should.equal(organization2.owner);
//                    done();
//                })
//            });
//        });
//
//        after(function(done) {
//            organization.remove();
//            done();
//        });
//    });
//});
