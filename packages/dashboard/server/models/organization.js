'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * 组织模型
 */
var OrganizationSchema = new Schema({
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
        default: 'http://m.j/80x80'
    },
    owner: {
        type: String,
        required: true
    },
    member: [{
        type: String,
        required: true
    }],
    created: {
        date: Date
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Organization', OrganizationSchema);
