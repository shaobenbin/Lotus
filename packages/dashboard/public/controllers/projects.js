'use strict';

angular.module('mean')
    .controller('ProjectsController', ['$scope', '$state', '$resource', '$http', '$modal', '$log', 'Global','ProjectFactory',
        function ($scope, $state, $resource, $http, $modal, $log, Global, ProjectFactory) {

            /**
             * 取得项目列表
             */
            $scope.projects = ProjectFactory.query();

            /**
             * 跳转项目详情
             * @param projectId
             * @constructor
             */
            $scope.ProjectDetail = function (projectId) {
                $state.go('dashboard.project', {projectId: projectId});
            };

            /**
             * 创建项目
             */
            $scope.createProjectModal = function () {

                var createProjectModalInstanceController = function ($scope, $modalInstance) {
                    $scope.project = new ProjectFactory;
                    $scope.submit = function () {
                        $scope.project.$save(function() {
                            $modalInstance.close();
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                $scope.modalInstance = $modal.open({
                    templateUrl: 'dashboard/views/create-project.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createProjectModalInstanceController,
                    resolve: {
                    }
                });

                $scope.modalInstance.result.then(function() {
                    $log.log('success')
                }, function() {
                    $log.log('cancelled')
                });
            };

        }
    ]);
