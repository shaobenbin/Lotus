'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', '$state', '$http', '$modal', '$log', 'Global','$location',
        function ($scope, $state, $http, $modal, $log, Global,$location) {

            var id = $location.absUrl().slice(-24);

            $http.post('http://127.0.0.1:3000/api/modules/fetch', {projectId:id}).success(function(modules) {
                $scope.list = modules;
            });

            $scope.test = 'test'

            $scope.treeOptions = {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    return true;
                }
            };

            $scope.saveModule = function() {
                var module = $scope.list;
                console.log(module);
                $http.post('http://127.0.0.1:3000/modules/save', module).success(function(success) {
                    console.log(success)
                });
            };

            $scope.selectedItem = {};

            // 上面按钮
            var getRootNodesScope = function() {
                return angular.element(document.getElementById("tree-root")).scope();
            };

            $scope.collapseAll = function() {
                var scope = getRootNodesScope();
                scope.collapseAll();
            };

            $scope.expandAll = function() {
                var scope = getRootNodesScope();
                scope.expandAll();
            };

            // 前面按钮
            $scope.toggle = function(scope) {
                scope.toggle();
            };

            // 列表3个按钮
            $scope.remove = function(scope) {
                scope.remove();
            };

            $scope.editNode = function(scope) {
                console.log(scope);
                console.log(scope.$modelValue.parentNode);
                if (scope.type === 'module') {
                    $state.go('dashboard.project.module', {moduleId: scope.$modelValue._id});
                } else if(scope.type === 'page') {
                    $state.go('dashboard.project.page', {pageId: scope.$modelValue.id});
                } else if (scope.type === 'action') {
                    $state.go('dashboard.project.interface', {interfaceId: scope.$modelValue.id});
                } else {
                    $state.go('dashboard.project.module');
                }
            };

            // 新建模块
            $scope.newNode = function(scope) {
                if (scope.$modelValue.type === 'module') {
                    $state.go('dashboard.project.module', {moduleId: scope.$modelValue.type});
                } else if(scope.$modelValue.type === 'page') {
                    $state.go('dashboard.project.page');
                } else if (scope.$modelValue.type === 'action') {
                    $state.go('dashboard.project.interface');
                } else {
                    console.log(scope.$element);
                    console.log(scope.$modelValue);
                    console.log(scope.$nodes);
                    console.log(scope.$nodeScope );
                    $state.go('dashboard.project.module');
                }
            };

            /**
             * 创建模块
             */
            $scope.createModule = function () {
                var createModuleController = function ($scope, $modalInstance, $location, $http, $log, user, items) {
                    $scope.module = {};
                    $scope.module.name = '';
                    $scope.module.desc = '';
                    $scope.module.projectId = $location.absUrl().slice(-24);
                    $scope.module.type = 'module';
                    $scope.module.items = [];

                    $scope.submit = function () {
                        var newModule = {
                            name: $scope.module.name,
                            desc: $scope.module.desc,
                            projectId: $location.absUrl().slice(-24),
                            type: 'module',
                            items: []
                        };

                        $http.post('http://127.0.0.1:3000/api/modules/save', newModule)
                            .success(function (data) {
                                // 成功的话返回给前端渲染到页面上
                                // 或者直接刷新页面
                                var alert = [].push(data);
                                $modalInstance.close({
                                    name: $scope.module.name,
                                    desc: $scope.module.desc,
                                    alerts: alert
                                });
                                $state.reload();
                            });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'dashboard/views/module.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createModuleController,
                    resolve: {
                        user: function () {
                            return $scope.user;
                        },
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (data) {
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };


        }
    ]);
