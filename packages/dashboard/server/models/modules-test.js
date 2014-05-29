'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModulesTestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    projectId:{
        type: String
    },
    version:{
        type: String
    },
    author:{
        type:String
    },
    type: {
        type: String
    }
});

mongoose.model('ModulesTest', ModulesTestSchema);
