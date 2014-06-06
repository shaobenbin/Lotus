
// 调用mockjs生成动态接口
// 使用
var Mock = require('mockjs');

var MockUtil = require('../util/mockutil.js');

var mongoose = require('mongoose'),
    Modules = mongoose.model('Modules');
var Project = mongoose.model('Project');

var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1
    }]
});

exports.generateData = function(req,res){
    var projectId = req.body.projectId;
    var request_url = req.body.requestUrl;
    Project.findOne({_id:projectId},function(err,project){
        if(err){
            switch (err.code) {
                default:
                    res.status(400).send('Please fill all the required fields');
            }
            return res.status(400);
        }


        var modules = project.modules;


        for(var m_index=0;m_index<modules.length;m_index++){
            var items = modules[m_index].items;
            for(var i_index = 0;i_index<items.length;i_index++){
                var subItems = items[i_index].items;
                for(var si_index=0;si_index<subItems.length;si_index++){
                    var subItem = subItems[si_index];
                    if(subItem.request_url == request_url){
                        var response_parameter = subItem.response_parameter;
                        var rule = MockUtil.preMock(response_parameter);
                        var mockData = MockUtil.mock(rule);
                        res.status(200);
                        res.send(mockData);
                        return;
                    }
                }
            }
        }

        res.status(400).send('not request url match!');
    });
}

//console.log(JSON.stringify(data, null, 4))
exports.mockTest = function(req,res){
    var paramter = {
        userId:{desc:'用户id',value:'number',remark:'haha'},
        userName:{desc:'用户名',
                    value:[{
                        a:{value:'a',remark:'@time'},b:{value:'b'}
                    }],
                    remark:'lal'},
        'isDeleted|3':{value:'boolean'}

    }

    //var rule = {'userId':'NUMBER','userName':{a:'@time',b:'@image'},'isDeleted|3':'BOOLEAN'};
    var rule = MockUtil.preMock(paramter);
    var mockData = MockUtil.mock(rule);
    res.status(200);
    res.send(mockData);
}

exports.save = function(req,res){
    var dd = {
        name:'lal',
        desc:'dd',
        projectId:'333',
        version:'222',
        author:"ben",
        type:"aa",
        items:[{
            name:'sasf',
            template:"aasjdf",
            type:"jkd",
            items:[{
                name:'sdf',
                desc:'ssasa',
                type: 'd',
                request_type:'c',
                request_url:"lkul",
                map_url:'bulul',
                request_parameter:{

                },
                response_parameter:{
                    userId:{desc:'用户id',value:'number',remark:'haha'},
                    userName:{desc:'用户名',
                        value:[{
                            a:{value:'a',remark:'@time'},b:{value:'b'}
                        }],
                        remark:'lal'},
                    isDeleted:{value:'boolean'}
                }
            }]
        }]
    }

    var modules = new Modules(dd);
    modules.save(function(err){
        res.status(200);
        res.send("success");
    });
}



//exports.getResponseData = function(req,res){
//    var projectId = req.body.projectId;
//    var requestUrl = req.body.requestUrl;
//
//    Modules.find({projectId:projectId},function(err,module){
//        if(err){
//            switch (err.code) {
//                default:
//                    res.status(400).send('Please fill all the required fields');
//            }
//            return res.status(400);
//        }
//
//
//        if(!module){
//            return res.status(400).send('not found Module');
//        }
//
//        var items = module.items;
//        var responseParam = null;
//        for(var i = 0;i<items.length;i++){
//            var subItems = items[i].items;
//
//            for(var j=0;j<items.length;j++){
//                var subItem = subItems[0];
//                if(requestUrl == subItem.request_url){
//                    responseParam = subItem.response_parameter;
//                    break;
//                }
//            }
//        }
//
//        if(!responseParam){
//            return res.status(400).send('not found response parameter');
//        }
//
//        responseParam.replace(/"NUMBER"/g,1);
//        responseParam.replace(/STRING/g,'aa');
//        responseParam.replace(/"BOOLEAN"/g,true);
//
//    });
//}