'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', '$state', '$stateParams', '$http', '$modal', '$log', 'Global', '$location', 'ProjectFactory',
        function ($scope, $state, $stateParams, $http, $modal, $log, Global, $location, ProjectFactory) {

            /**
             * 取得项目信息
             */
            var id = $location.absUrl().slice(-24);
            $scope.project = ProjectFactory.get({id: id});
            $scope.newProject = {
                name: '',
                desc: ''
            };
            $scope.newPage = {
                name: '',
                desc: ''
            };
            $scope.newInterface = {
                name: '',
                desc: ''
            };
            $scope.createPagePop = {
                title:'新建页面',
                content: ['<form class="form-inline" role="form">',
                            '<div class="form-group">',
                                '<label class="sr-only">接口名称</label>',
                                '<input type="text" class="form-control input-sm" placeholder="接口名称" ng-model="newInterface.name">',
                            '</div>',
                            '<div class="form-group">',
                                '<label class="sr-only">接口描述</label>',
                                '<input type="text" class="form-control input-sm" placeholder="接口描述" ng-model="newInterface.desc">',
                            '</div>',
                            '<button type="submit" class="btn btn-default" ng-click="createNewModule($index)">{{$index}}添加接口</button>',
                        '</form>'].join('')
            }
            /**
             * 创建模块
             */
            $scope.createModule = function() {
                var newModule = $scope.newProject;
                $scope.project.modules.push(newModule);
                $scope.project = $scope.project.$save({id: id});
            }

            $scope.createModuleTmp = function () {

                var createModuleController = function ($scope, $modalInstance) {
                    if (!project.modules) {
                        project.modules = [];
                    }

                    $scope.project.module = {
                        name: '默认模块名测试',
                        desc: '默认模块描述测试',
                        items: []
                    };

                    $scope.submit = function () {
                        var module = $scope.project.module;
                        project.modules.push(module);
                        project.$save({id: id}, function () {
                            $modalInstance.close({});
                        });
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'dashboard/views/create-module.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createModuleController,
                    keyboard: true,
                    resolve: {
                    }
                });

                modalInstance.result.then(function (data) {
                    $log.log('success');
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            /**
             * 删除模块
             */
            $scope.deleteModule = function(index) {
                for (var i = $scope.project.modules.length - 1; i >= 0; i--) {
                    if ($scope.project.modules[i]._id === index) {
                        $scope.project.modules[i].pop();
                    }

                };
            }

            /**
             * 创建页面
             */
            $scope.createPage = function (moduleIndex) {
                $log.log(index);
                $scope.project.modules[moduleIndex].items.push($scope.newPage);
                $scope.project.$save({id: id}, function() {
                    $log.log(success);
                });
            }

            /**
             * 创建页面
             */
            $scope.createPageTemp = function (index) {
                var createModuleController = function ($scope, $modalInstance) {
                    if (!$scope.project.modules[index].items) {
                        $scope.project.modules[index].items = [];
                    }
                    $scope.module = {
                        name: '',
                        desc: '',
                        items: []
                    };

                    $scope.submit = function () {
                        project.modules.push($scope.module);
                        project.$save({id: id}, function () {
                            $modalInstance.close({
                                module: $scope.module,
                                alerts: 'success'
                            });
                        });
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'dashboard/views/create-module.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createModuleController,
                    keyboard: true,
                    resolve: {
                    }
                });

                modalInstance.result.then(function (data) {
                    $scope.project.modules.push(data.module);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

            /**
             * 删除页面
             */
            $scope.deletePage = function (index) {}

            /**
             * 创建接口
             */
            $scope.createInterface = function (modulesIndex, pageIndex) {
                var newInterface = $scope.newInterface;
                newInterface.response_parameter = JSON.parse(newInterface.response_parameter)
                $scope.project.modules[modulesIndex].items[pageIndex].items.push(newInterface);
                $scope.project.$save({id: id}, function() {
                    $log.log('success');
                });
            }

            /**
             * 删除接口
             */
            $scope.deleteInterface = function (index) {

            }
        }
    ]);
