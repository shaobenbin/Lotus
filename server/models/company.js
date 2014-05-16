'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 公司模型
 * Company Schema
 */
var CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },                  //"公司名称",
    description: {
        type: String,
        required: true
    },                  //"公司描述",
    logo_url: String,
    user_name: String,
    user_id: String     //"1"
});

mongoose.model('Company', CompanySchema);
