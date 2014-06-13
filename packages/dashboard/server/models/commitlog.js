'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 项目模型
 * 版本内容存储，全量存储
 */
var CommitLogSchema = new Schema({
    //当前人的用户编号
    ownerId:{
        type:String
    },
    //冗余字段
    owner:{
        type:String,
        required:true
    },
    //版本编号
    version:{
        type:Number
    },
    //版本控制的对象名字，比如project的objectType就是project
    objectName:{
        type:String,
        required: true
    },
    //版本控制对象的ID
    objectId:{
        type:String
    },
    //版本控制的对象的数据，JSON控制
    objectData:{
        type:Object
    },
    //描述
    description:{
        type:String
    },
    created:{
        type:Date
    }
});



mongoose.model('CommitLog', CommitLogSchema);

CommitLogSchema.pre("save",function(next){
    var self = this;
    this.model('CommitLog').find().where('version').gt(0).limit(1)
        .sort('-version').exec(function(err, checkin){
            if(err){
                next(err);
            }else{
                if(checkin[0] && checkin[0].version){
                    self.version = parseInt(checkin[0].version)+1;
                }else{
                    //初始化从100开始
                    self.version = 100;
                }
                next();
            }
        });
});
