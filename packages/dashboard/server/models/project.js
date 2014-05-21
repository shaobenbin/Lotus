'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 项目模型
 */
var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'http://m.j/80x80',
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    created: {
        date: Date
    },
    updated: {
        date: Date
    },
    organization: {
        type: String
    }
});

mongoose.model('Project', ProjectSchema);

var Project = mongoose.model('Project');

/**
 * 同一个用户只能建立统一个组织
 */
ProjectSchema.pre('save', function(next) {
    var name = this.name,
        owner = this.owner,
        organization = this.organization;

    if(!organization){
        organization = null;
    }

    //校验下是否已经有了
    Project.find({name:name,owner:owner,organization:organization},function(err,result){
        if(err){
            next(err);
        }else{
            if(result.length > 0){
                next(new Error('has organization['+organization+'] of owner['+owner+'] and project['+name+']'));
            }else{
                next();
            }
        }
    });
});




