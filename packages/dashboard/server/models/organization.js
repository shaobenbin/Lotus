'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 组织模型
 */
var OrganizationSchema = new Schema({
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
        default: 'http://m.j/80x80'
    },
    owner: {
        type: String,
        required: true
    },
    member: [{
        type: String,
        required: true
    }],
    created: {
        date: Date
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Organization', OrganizationSchema);

var Organization = mongoose.model('Organization');

/**
 * 同一个用户只能建立统一个组织
 */
OrganizationSchema.pre('save', function(next) {
    var name = this.name;
    var owner = this.owner;

    //校验下是否已经有了
    Organization.find({name:name,owner:owner},function(err,result){
        if(err){
            next(err);
        }else{
            if(result.length > 0){
                next(new Error('has organization['+name+'] of owner['+owner+']'));
            }else{
                next();
            }
        }
    });
});

