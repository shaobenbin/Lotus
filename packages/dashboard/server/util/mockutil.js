var Mock = require('mockjs');

exports.preMock = function(param){
    return parseRule(param);
}

var parseRule = function(param){

    var rule = {};
    var key;
    for(key in param){
        var value = param[key]['value'];
        var remark = param[key]['remark'];
        if(remark && typeof(remark) == "string" && remark.substring(0,1) == "@"){
            value = remark;
        }
        if(value instanceof Array){
            var subValue = value[0];
            rule[key] = [parseRule(subValue)];
        }else if(typeof(value) == 'object'){
            rule[key] = parseRule(value);
        }else{
            rule[key] = value;
        }
    }

    return rule;
}

exports.mock = function(rule){
    return generateMockData(rule);
}

/**
 * 根据rule生成数据，rule是一个json格式的玩意.
 * @param _rule
 * @returns {{}}
 */
var generateMockData = function(_rule){
    if(!_rule || typeof(_rule) != 'object'){
        return;
    }

    var orgianRule = _rule;
    var result = {};
    var key;
    for(key in orgianRule){
        var type = orgianRule[key];
        var value = null;
        if(type instanceof Array){
            var subRule = type[0];
            value = getMockData(key,[generateMockData(subRule)]);
        }else if(typeof(type) == 'object'){
            value = getMockData(key,generateMockData(type));
        }else{
            value = getMockData(key,orgianRule[key]);
        }

        result[getRealKey(key)] = value;
    }

    return result;
}

var getMockData = function(key,type){
    var value = null;
    if(typeof(type) == "string" && (type.toLowerCase() == "number" || type.toLowerCase() == 'string' || type.toLowerCase() == 'boolean')){
        value = getBasicMockData(type);
    }else{
        value = type;
    }

    //var stringJson = '{"'+ key +'": ""}';
    //var query = JSON.parse(stringJson);

    //query[key] = value;
    var query = {};
    query[key] = value;
    var data = Mock.mock(query);
    return data[getRealKey(key)];
}

var getRealKey = function(key){
    if(key.indexOf('|')>0){
        return key.substring(0,key.indexOf('|'));
    }else{
        return key;
    }
}


var getBasicMockData = function(type){
    if(type.toLowerCase() == "number"){
        return "@natural(1,99999)";
    }
    if(type.toLowerCase() == "string"){
        return "@string";
    }
    if(type.toLowerCase() == "boolean"){
        return "@boolean";
    }
}
