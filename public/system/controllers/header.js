'use strict';

angular.module('mean.system')
    .controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
        function ($scope, $rootScope, Global, Menus) {
            $scope.global = Global;
            $scope.menus = {};

            // 默认的硬编码菜单
            var defaultMainMenu = [];

            // 查询模块中加入的菜单，返回用户有权限查看的菜单
            function queryMenu(name, defaultMenu) {
                Menus.query({
                    name: name,
                    defaultMenu: defaultMenu
                }, function (menu) {
                    $scope.menus[name] = menu;
                });
            }

            // 查询菜单和检验权限
            queryMenu('main', defaultMainMenu);

            $scope.isCollapsed = false;

            $rootScope.$on('loggedin', function () {
                queryMenu('main', defaultMainMenu);
                $scope.global = {
                    authenticated: !!$rootScope.user,
                    user: $rootScope.user
                };
            });
        }
    ]);
