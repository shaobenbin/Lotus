# 莲藕项目

定义数据结构
```
"users" :
{
    "_id" : ObjectId( "53575cf30c9b1d015a9fb8a5" ),
    "provider" : "",
    "email" : "",
    "hashed_password" : "",
    "salt" : "",
    "username" : "",
    "create_data": "",
    "is_locked_out": "",
    "is_hint_enabled": "",
    "last_login_date": "",
    "incorrect_login_attempt":"",
    "realname": ""
    "name" : "",
    "roles" : [
        "authenticated"
    ],
    "__v" : 0
}

"company" :
{
    "_id" : "",
    "name" : "公司名称",
    "description" : "公司描述",
    "logo_url" : "公司URL",
    "user_id" : "1"

}

"productline":{
        "_id":  "",
        "name": "",
        "project_num": "",
        "user_id": ""
        "campany": ""
        "porjects": [
            {
                "_id": "",
                "version" : "",
                "name" : "",
                "create_data" : "",
                "user_id" : "",
                "description" : "",
                "stage" : "",
                "project_data" : "",
                "related_ids" : "",
                "group_id" : "",
                "update_time" : ""
            },
            {
                "_id": "",
                "version" : "",
                "name" : "",
                "create_data" : "",
                "user_id" : "",
                "description" : "",
                "stage" : "",
                "project_data" : "",
                "related_ids" : "",
                "group_id" : "",
                "update_time" : ""
            }
        ]
    }


"module": {
    "_id" : "",
    "project_id" : "",
    "name" : "",
    "description : "",
    "page": {
        "_id" : "",
        "name" : "",
        "module_id" : "",
        "description" : "",
        "template" : ""
        "action" :[{
                    "_id" : "",
                    "name" : "",
                    "description" : "",
                    "request_type" : "",
                    "request_url" : "",
                    "map_url": "",
                    "request_parameter": {
                          "_id" : "",
                          "name" : "",
                          "identifier" : "",
                          "data_type" : "",
                          "remark" : "",
                          "expression" : "",
                          "mock_data" : "",

                      }
                    "response_parameter" : {
                          "_id" : "",
                          "name" : "",
                          "identifier" : "",
                          "data_type" : "",
                          "remark" : "",
                          "expression" : "",
                          "mock_data" : "",
                      }
                },
                 {
                    "_id" : "",
                    "name" : "",
                    "description" : "",
                    "request_type" : "",
                    "request_url" : "",
                    "response_template" : "",
                        "request_parameter_list": [{
                              "_id" : "",
                              "name" : "",
                              "identifier" : "",
                              "data_type" : "",
                              "remark" : "",
                              "expression" : "",
                              "mock_data" : "",

                          }],
                        "response_parameter_list" : [{
                              "_id" : "",
                              "name" : "",
                              "identifier" : "",
                              "data_type" : "",
                              "remark" : "",
                              "expression" : "",
                              "mock_data" : "",

                          }]
                }]
    }
}






"check_in" :
{
    "_id" : "",
    "create_data" : "",
    "tag" : "",
    "user_id" : "",
    "project_id" : "",
    "description" : "",
    "version" : "",
    "project_data" : "",
    "log" : ""


}
packages
{
    "_id" : ObjectId( "53577a23c56fbd4e912890b2" ),
    "name" : "about",
    "settings" : { "anotherSettings" : "some value" },
    "updated" : Date( 1398242081206 )
}

action设计
lotus/dashboard

lotus/                    首页
lotus/about               关于页面

公司模块
lotus/company             公司列表
lotus/company/:id         公司详情lotus/company/view
lotus/company/create      创建公司lotus/company/create
lotus/company/edit        修改公司lotus/company/edit

产品线
lotus/productline
lotus/productline/:id
lotus/productline/create
lotus/productline/edit

项目
lotus/project
lotus/project/:id
lotus/project/create
lotus/project/edit

模块
lotus/module/create
lotus/module/edit

页面
lotus/page/create
lotus/page/edit

请求
lotus/action/create




用户模块
lotus/account/:id
lotus/login
lotus/register
lotus/logout



```

定义页面请求

分模块





## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.



## Getting Started
* [The Model](server/models/article.js) - 定义模型.
* [The Controller](server/controllers/articles.js) - 后台逻辑.
* [NodeJS Routes](server/routes) - 后台路由.
* [AngularJs Routes](public/articles/routes/articles.js) - 前台路由.
* [The AngularJs Service](public/articles/services/articles.js) - Where we connect to our REST service.
* [The AngularJs Controller](public/articles/controllers/articles.js) - 前台逻辑.
* [The AngularJs Views Folder](public/articles/views) - 前台视图.
