'use strict';

var mongoose = require('mongoose'),
    CheckIn = mongoose.model('CheckIn'),
    Schema = mongoose.Schema;


var ModulesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc:String,
//    projectId:{
//        type: String,
//        required: true
//    },
//    author:{
//        type:String,
//        required: true
//    },
//    type: {
//        type: String,
//        required: true
//    },
    items:[{
        name:{
            type: String,
            required: true
        },
        template:{
            type:String,
            required:true
        },
//        type: {
//            type: String,
//            required: true
//        },
        items:[{
            name:{
                type:String
            },
            desc:{
                type:String
            },
            type: {
                type: String,
                required: true
            },
            request_type:{
                type:String
            },
            request_url:{
                type:String
            },
            map_url:{
                type:String
            },
            request_parameter:{
                type:Object
            },
            response_parameter:{
                type:Object
            }
        }]
    }]
});

/**
 * 项目模型
 */
var ProjectSchema = new Schema({
    //版本号
    version:{
        type:Number
    },
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
    ownerId:{
        type:String
    },
    owner: {
        type: String,
        required: true
    },
    isSaveFile:{
        type:Number,
        default:0
    },
    member: [{
        type: String,
        required: true
    }],
    created: {
        date: Date
    },
    updated: {
        date: Date
    },
    organization: {
        type: String,
        default: '个人'
        //required: true
    },
    modules:[ModulesSchema]
});



ProjectSchema.pre("update",function(next){
    var self = this;
    ProjectSchema.findOne({_id:this._id},function(err,product){
        //先备份下原来的modules;
        checkInData(product,self,next);
    });
});

ProjectSchema.statics.checkIn = function(query,updateData,options,callback){
    this.model('Project').find(query,function(err,doc){
        var next = function(realUpData){
            realUpData.updated = Date.now();
            Project.update(query,realUpData,function(err,result){
                callback(err,result);
            });
        };
        checkInData(doc,updateData,next);
    });
};


var checkInData = function(data,original,next){
    data = data[0];
    var checkInData = {};
    checkInData['ownerId'] = data.ownerId;
    checkInData['owner'] = data.owner;
    checkInData['objectName'] = 'product';
    checkInData['objectId'] = data._id;
    checkInData['objectData'] = original.modules;
    var checkIn = new CheckIn(checkInData);
    checkIn.save(function(err,checkIn){
        if(err){
            console.log(err);
            return false;
        }
        //获取备份的版本号.
        original.version = checkIn.version;
        next(original);
    })
}

mongoose.model('Project', ProjectSchema);

var Project = mongoose.model('Project');