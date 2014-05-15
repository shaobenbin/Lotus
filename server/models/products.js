'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 产品线模型
 * Productline Schema
 */
var ProductLineSchema = new Schema({
    name: String,           //"",
    description: String,
//    create_time: {
//        type: Date,
//        default: Date.now
//    },
    project_num: Number,    //"",
    user_id: Number,        //"",
    projects: [{
        version: String, //"",
        name: String,    //"",
//        create_data: Date,//"",
        user_id: Number,
        description: String,//"",
        stage: String,//"",
        project_data: String,//"",
        related_ids: Number//"",
//        update_time: Date//""
    }]
});

mongoose.model('ProductLine', ProductLineSchema);







