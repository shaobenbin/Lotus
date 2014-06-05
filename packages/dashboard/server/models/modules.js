'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModulesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc:String,
    projectId:{
        type: String,
        required: true
    },
    version:{
        type:Number
    },
    author:{
        type:String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    items:[{
        name:{
            type: String,
            required: true
        },
        template:{
            type:String,
            required:true
        },
        type: {
            type: String,
            required: true
        },
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
//            request_parameter:[{
//                name:{
//                    type:String
//                },
//                identifier:{
//                    type:String
//                },
//                data_type:{
//                    type:String
//                },
//                remark:{
//                    type:String
//                },
//                expression:{
//                    type:String
//                },
//                mock_data:{
//                    type:String
//                }
//            }], request_parameter:[{
//                name:{
//                    type:String
//                },
//                identifier:{
//                    type:String
//                },
//                data_type:{
//                    type:String
//                },
//                remark:{
//                    type:String
//                },
//                expression:{
//                    type:String
//                },
//                mock_data:{
//                    type:String
//                }
//            }], request_parameter:[{
//                name:{
//                    type:String
//                },
//                identifier:{
//                    type:String
//                },
//                data_type:{
//                    type:String
//                },
//                remark:{
//                    type:String
//                },
//                expression:{
//                    type:String
//                },
//                mock_data:{
//                    type:String
//                }
//            }],
//            response_parameter:[{
//                name:{
//                    type:String
//                },
//                identifier:{
//                    type:String
//                },
//                data_type:{
//                    type:String
//                },
//                remark:{
//                    type:String
//                },
//                expression:{
//                    type:String
//                },
//                mock_data:{
//                    type:String
//                }
//            }]
        }]
    }]
});

mongoose.model('Modules', ModulesSchema);

// 验证不是这样写的！
var Modules = mongoose.model('Modules');

ModulesSchema.pre('save', function(next) {
    var self = this;
    Modules.find({name:this.name,projectName:this.projectName})
        .sort({version: 'desc'}).exec(function(err, modules){
            if(err){
                next(err);
            }else{
                if(!modules || modules.length==0){
                    self.version = 1;
                }else{
                    var module = modules[0];
                    self.version = module.version+1;
                }
                next();
            }
    });
});
