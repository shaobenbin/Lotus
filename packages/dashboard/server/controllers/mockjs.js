// 调用mockjs生成动态接口
// 使用
var MockUtil = require('../util/mockutil.js');

var Mock = require('mockjs'),
    mongoose = require('mongoose'),
    Modules = mongoose.model('Modules'),
    Project = mongoose.model('Project');

var data = Mock.mock({
    'list|1-10': [
        {
            'id|+1': 1
        }
    ]
});

exports.generateData = function (req, res) {
    var projectId = req.params.id,
        request_url = req.params.url;

    Project.findOne({_id: projectId}, function (err, project) {
        if (err) {
            switch (err.code) {
                default:
                    res.send(400, 'Please fill all the required fields');
            }
            res.status(200).send({code:4004,result:{errorMsg:'undefined error!'}});
            return;
        }

        var modules = project.modules;

        for (var m_index = 0; m_index < modules.length; m_index++) {
            var items = modules[m_index].items;
            for (var i_index = 0; i_index < items.length; i_index++) {
                var subItems = items[i_index].items;
                for (var si_index = 0; si_index < subItems.length; si_index++) {
                    var subItem = subItems[si_index];
                    if (subItem.request_url == request_url) {
                        var response_parameter = subItem.response_parameter;
                        console.log(response_parameter);
                        var rule = MockUtil.preMock(response_parameter);
                        if(!rule){
                            res.status(200).send({code:4004,result:{errorMsg:'error response parameter!'}});
                            return;
                        }
                        var mockData = MockUtil.mock(rule);
                        if(!mockData){
                            res.status(200).send({code:4004,result:{errorMsg:'error rule!'}});
                            return;
                        }
                        res.status(200);
                        res.send({code:1001,result:mockData});
                        return;
                    }
                }
            }
        }

        res.status(200).send({code:4004,result:{errorMsg:'not find action!'}});

    });
}

//console.log(JSON.stringify(data, null, 4))
exports.mockTest = function (req, res) {
    var paramter = {
        userId: {desc: '用户id', value: 'number', remark: 'haha'},
        userName: {desc: '用户名',
            value: [
                {
                    a: {value: 'a', remark: '@time'}, b: {value: 'b'}
                }
            ],
            remark: 'lal'},

        'isDeleted|3': {value: 'boolean'}

    }

    //var rule = {'userId':'NUMBER','userName':{a:'@time',b:'@image'},'isDeleted|3':'BOOLEAN'};
    var rule = MockUtil.preMock(paramter);
    var mockData = MockUtil.mock(rule);
    res.send(200, mockData);
}

exports.save = function (req, res) {
    var dd = {
        name: 'lal',
        desc: 'dd',
        projectId: '333',
        version: '222',
        author: 'ben',
        type: 'aa',
        items: [
            {
                name: 'sasf',
                template: 'aasjdf',
                type: 'jkd',
                items: [
                    {
                        name: 'sdf',
                        desc: 'ssasa',
                        type: 'd',
                        request_type: 'c',
                        request_url: 'lkul',
                        map_url: 'bulul',
                        request_parameter: {

                        },
                        response_parameter: {
                            userId: {desc: '用户id', value: 'number', remark: 'haha'},
                            userName: {desc: '用户名',
                                value: [
                                    {
                                        a: {value: 'a', remark: '@time'}, b: {value: 'b'}
                                    }
                                ],
                                remark: 'lal'},
                            isDeleted: {value: 'boolean'}
                        }
                    }
                ]
            }
        ]
    }

    var modules = new Modules(dd);

    modules.save(function (err) {
        res.send('success');
    });
}
