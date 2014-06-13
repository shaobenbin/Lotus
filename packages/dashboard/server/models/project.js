'use strict';

var mongoose = require('mongoose'),
    CommitLog = mongoose.model('CommitLog'),
    Schema = mongoose.Schema;


var ModulesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
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
    // 页面
    items: [
        {
            name: {
                type: String,
                required: true
            },
            template: {
                type: String,
                required: true
            },
//        type: {
//            type: String,
//            required: true
//        },
            // 接口
            items: [
                {
                    name: {
                        type: String
                    },
                    desc: {
                        type: String
                    },
                    type: {
                        type: String,
                        required: true
                    },
                    // 请求类型
                    request_type: {
                        type: String
                    },
                    // 请求路径
                    request_url: {
                        type: String
                    },
                    // 童虎接口路径
                    map_url: {
                        type: String
                    },
                    // 请求参数
                    request_parameter: {
                        type: Object
                    },
                    // 响应参数
                    response_parameter: {
                        type: Object
                    }
                }
            ]
        }
    ]
});

/**
 * 项目模型
 */
var ProjectSchema = new Schema({
    //版本号
    version: {
        type: Number
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
    ownerId: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    isSaveFile: {
        type: Number,
        default: 0
    },
    member: [
        {
            type: String,
            required: true
        }
    ],
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
    modules: [ModulesSchema]
});


//ProjectSchema.pre("update",function(next){
//    var self = this;
//    ProjectSchema.findOne({_id:this._id},function(err,product){
//        //先备份下原来的modules;
//        commitLogData(product,self,next);
//    });
//});

ProjectSchema.statics.commit = function (query, updateData, options, callback) {
    this.model('Project').find(query, function (err, doc) {
        var next = function (realUpData) {
            realUpData.updated = Date.now();
            Project.update(query, realUpData, function (err, result) {
                callback(err, result);
            });
        };
        commitLogData(doc, updateData, next);
    });
};


var commitLogData = function (data, original, next) {
    data = data[0];
    var commitData = data;
    commitData.modules = original.modules;
    var commitLogData = {};
    commitLogData['ownerId'] = data.ownerId;
    commitLogData['owner'] = data.owner;
    commitLogData['objectName'] = 'project';
    commitLogData['objectId'] = data._id;
    commitLogData['objectData'] = commitData;
    var commitLog = new CommitLog(commitLogData);
    commitLog.save(function (err, commitLogResult) {
        if (err) {
            console.log(err);
            return false;
        }
        //获取备份的版本号.
        original.version = commitLogResult.version;
        next(original);
    })
}

mongoose.model('Project', ProjectSchema);

var Project = mongoose.model('Project');
