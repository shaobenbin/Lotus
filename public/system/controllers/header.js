'use strict';

angular.module('mean.system')
    .controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
        function ($scope, $rootScope, Global, Menus) {
            $scope.global = Global;
            $scope.menus = {};

            // 默认的硬编码菜单
            // Default hard coded menu items for main menu
            var defaultMainMenu = [];

            // 查询模块中加入的菜单，返回用户有权限查看的菜单
            // Query menus added by modules. Only returns menus that user is allowed to see.
            function queryMenu(name, defaultMenu) {
                Menus.query({
                    name: name,
                    defaultMenu: defaultMenu
                }, function (menu) {
                    $scope.menus[name] = menu;
                });
            }

            // 查询菜单和检验权限
            // Query server for menus and check permissions
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
