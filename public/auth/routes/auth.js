'use strict';

// 设置前端路由
// Setting up route
angular.module('mean.auth').config(['$stateProvider',
    function($stateProvider) {
        // 检测用户是否已经登出
        // Check if the user is not conntect
        var checkLoggedOut = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // 发起一个 ajax 请求来检测用户使用是否出于登录状态
            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // 检验通过
                // Authenticated
                if (user !== '0') {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
                // 检验失败
                // Not Authenticated
                else {
                    $timeout(deferred.resolve, 0);

                }
            });

            return deferred.promise;
        };

        // 应用状态
        // states for my app
        $stateProvider
            .state('auth.login', {
                url: '/login',
                templateUrl: 'public/auth/views/login.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('auth.register', {
                url: '/register',
                templateUrl: 'public/auth/views/register.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            });
    }
]);
