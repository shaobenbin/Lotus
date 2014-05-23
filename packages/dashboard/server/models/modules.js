'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 组织模型
 */
var ModulesSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description:String,

    projectName:{
        type: String,
        required: true
    },

    organizationName:{
        type: String
    },

    version:{
        type:Number
    },

    owner:{
        type:String,
        required: true
    },

    page:[{
        name:{
            type: String,
            required: true
        },

        template:{
            type:String,
            required:true
        },
        action:[{
            name:{
                type:String
            },
            description:{
                type:String
            },
            request_type:{
                type:String},
            request_url:{type:String
            },
            map_url:{
                type:String
            },
            request_parameter:[{
                name:{
                    type:String
                },
                identifier:{
                    type:String
                },
                data_type:{
                    type:String
                },
                remark:{
                    type:String
                },
                expression:{
                    type:String
                },
                mock_data:{
                    type:String
                }
            }],
            response_parameter:[{
                name:{
                    type:String
                },
                identifier:{
                    type:String
                },
                data_type:{
                    type:String
                },
                remark:{
                    type:String
                },
                expression:{
                    type:String
                },
                mock_data:{
                    type:String
                }
            }]
        }]
    }]
});

mongoose.model('Modules', ModulesSchema);
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
