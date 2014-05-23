'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Project = mongoose.model('Project');

//Globals
var project, project2;

var data = {
    'name': '项目一',
    'desc': '项目一描述',
    'owner': 'binbin',
    'logo': 'http://m.j/100x100',
    'organization': 'mogujie',
    'created': '111111',
    'modified': '1111111'

};

//The Test
describe('<dashboard prject model test>', function () {
    describe('Model Organization:', function () {
        before(function (done) {
            project = new Project(data);

            project2 = new Project(data);

            //project3 = new Project(data1);

            //project4 = new Project(data1);

            done();
        });
        describe('scene 1', function () {
            it('should begin without the test user', function (done) {
                Project.find({ name: '项目一' }, function (err, projects) {
                    projects.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function (done) {
                project.save(done);
            });


            it('should show an error when try to save without name', function (done) {
                project.name = '';
                return project.save(function (err) {
                    should.exist(err);
                    done();
                });
            });

            it('should remove without problems', function (done) {
                project.remove(done());
            });

            it('save project of no organization', function (done) {
                project2.organization = null;
                project2.save(function (err) {
                    should.not.exist(err);
                    done()
                });
            });

            it('query project of user but no organization', function (done) {
                Project.findOne({name: '项目一'}, function (err, result) {
                    result.name.should.equal('项目一');
                    done();
                });
            });
        });

        after(function (done) {
            project2.remove();
            done();
        });
    });
});
