'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModuleSchema = new Schema({
    project_id: Number,
    name: String,
    description: String,
    page: [{
        name: String,
        module_id: String,
        description: String,
        template: String,
        action: [{
            name: String,
            description: String,
            request_type: String,
            request_url: String,
            map_url: String,
            request_parameter_list: [{
                name: String,
                identifier: String,
                data_type: String,
                remark: String,
                expression: String,
                mock_data: String
            }],
            response_parameter_list: [{
                name: String,
                identifier: String,
                data_type: String,
                remark: String,
                expression: String,
                mock_data: String
            }]
        }]
    }]
});

mongoose.model('Module', ModuleSchema);
