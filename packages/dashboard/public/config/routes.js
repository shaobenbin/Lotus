'use strict';

// configure existing services inside initialization blocks.
angular.module('mean')
    .config(['$stateProvider',
    // provider-injector
    // @see http://www.angularjs.cn/A00x
    function($stateProvider) {
        // The new $stateProvider works similar to Angular's v1 router, but it focuses purely on state.
        // Configure existing providers
        // 定义子状态
        // @see https://github.com/angular-ui/ui-router/wiki
        $stateProvider.state('dashboard example page', {
            url: '/dashboard/example',
            // 引入模板。需要使用内联模板的话使用 template 而不是 templateUrl
            // templateUrl 也可以是一个 返回模板页的方法
            // @example
            //            templateUrl: function (stateParams){
            //                 return '/partials/contacts.' + stateParams.filterBy + '.html';
            //            }
            // 可以使用依赖注入
            // @example
            //            templateProvider: function ($timeout, $stateParams) {
            //                return $timeout(function () {
            //                    return '<h1>' + $stateParams.contactId + '</h1>'
            //                }, 100);
            //            }
            templateUrl: 'dashboard/views/test.html'
        });
    }
]);
