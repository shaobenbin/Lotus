'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Modules = mongoose.model('Modules');

var modules, modules;

describe('<dashboard module model test>', function() {
    describe('save find and del:', function() {
        before(function(done) {
            modules = new Modules({
                name:'卡拉',
                description:'卡拉是一条狗_model',
                projectName:'啦啦_model',
                owner:'binbin',
                organizationName:'lalalala',
                page:[{
                    name:'葛优',
                    template:'/xx/xx/xx/xx.html',
                    action:[{
                        name:'要签名',
                        description:'要签名呀',
                        request_type:'get',
                        request_url:'xx/xx/xx.action',
                        map_url:'xx/xx/xx.action',
                        request_parameter:[{
                            name:'a',
                            identifier:'a',
                            data_type:'a',
                            remark:'a',
                            expression:'a',
                            mock_data:'a'
                        }],
                        response_parameter:[{
                            name:'a',
                            identifier:'a',
                            data_type:'a',
                            remark:'a',
                            expression:'a',
                            mock_data:'a'
                        }]
                    }]
                }]
            });

            done();
        });

        it('save with no err',function(done){
            modules.save(function(err){
                should.not.exist(err);
                done();
            })
        });

        it('fetch modules no err',function(done){
            Modules.find({name:modules.name,projectName:modules.projectName},function(err,modules){
                should.not.exist(err);
                modules.should.have.length(1);
                done();
            });
        });

        after(function(done) {
            modules.remove();
            done();
        });
    });
});