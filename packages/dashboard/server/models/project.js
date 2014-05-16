'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 项目模型
 */
var ProjectSchema = new Schema({
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
    owner: {
        type: String,
        required: true
    },
    created: {
        date: Date
    },
    modified: {
        date: Date
    },
    organization: {
        type: String
    }
});

mongoose.model('Project', ProjectSchema);







