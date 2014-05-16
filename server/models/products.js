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
    project_num: Number,    //"",
    user_id: String,        //"",
    projects: [{
        version: String, //"",
        name: String,    //"",
        user_id: String,
        description: String,//"",
        stage: String,//"",
        project_data: String,//"",
        related_ids: Number//"",
    }]
});

mongoose.model('ProductLine', ProductLineSchema);







