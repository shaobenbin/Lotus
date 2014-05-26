'use strict';

angular.module('mean')
    .controller('ProjectsController', ['$scope', '$state', '$resource', '$http', '$modal', '$log', 'Global', 'ProjectList',
        function ($scope, $state, $resource, $http, $modal, $log, Global, ProjectList) {

            $scope.global = Global;

            /**
             * 查询项目列表
             */
            $http.get('http://127.0.0.1:3000/api/organizations').success(function(organizations) {
                $scope.organizations = organizations;
                $http.get('http://127.0.0.1:3000/project/fetch').success(function(projects) {
                    $scope.projects = projects;
                    $scope.personal = {};
                    $scope.personal.projects = [];

                    var i,
                        j,
                        iLen = $scope.projects.length,
                        jLen = $scope.organizations.length;

                    for (j = 0; j < jLen; j++) {
                        $scope.organizations[j].projects = [];
                    }

                    for (i = 0; i < iLen; i++) {
                        if (!$scope.projects[i].organization || $scope.projects[i].organization === '个人') {
                            $scope.personal.projects.push($scope.projects[i]);
                        } else {
                            for (j = 0; j < jLen; j++) {
                                if ($scope.projects[i].organization === $scope.organizations[j].name) {
                                    $scope.organizations[j].projects.push($scope.projects[i]);
                                }
                            }
                        }
                    }
                });
            });
//            $scope.personal = ProjectList.getProjectList().personal;
//            $scope.organizations = ProjectList.getProjectList().organizations;

            /**
             * 跳转项目详情
             * @param param
             * @constructor
             */
            $scope.ProjectDetail = function (id) {
                $state.go('dashboard.project', {id: id});
            };

            /**
             * 创建组织
             */
            $scope.createOrganizationModal = function () {

                var createOrganizationModalInstanceController = function ($scope, $modalInstance, $http, $log, user, items) {
                    $scope.organization = {};
                    $scope.organization.name = '';
                    $scope.organization.desc = '';
                    $scope.organization.logo = 'http://m.j/80x80';

                    $scope.submit = function () {
                        var newOrganization = {
                            name: $scope.organization.name,
                            desc: $scope.organization.desc,
                            logo: $scope.organization.logo
                        };

                        $http.post('http://127.0.0.1:3000/api/organization/create', newOrganization)
                            .success(function (data) {
                                // 成功的话返回给前端渲染到页面上
                                // 或者直接刷新页面
                                $modalInstance.close({
                                    name: $scope.organization.name,
                                    desc: $scope.organization.desc,
                                    logo: $scope.organization.logo,
                                    status: 'success'
                                });
                                $state.reload();
                            });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'dashboard/views/create-organization.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createOrganizationModalInstanceController,
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
                    $log.log('selected:' + data.name);
                    $log.log('user:' + data.desc);
                    $log.log('items:' + data.logo);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            /**
             * 创建项目
             */
            $scope.createProjectModal = function () {

                var createProjectModalInstanceController = function ($scope, $modalInstance, $log, user) {
                    $scope.project = {};
                    $scope.project.name = 'name-test';
                    $scope.project.desc = 'name-desc';
                    $scope.project.logo = 'http://m.j/80x80';
                    $scope.organizationNames = [];

                    // 取到自己所有的组织
                    $http.get('http://127.0.0.1:3000/api/organizations/1').success(function (organizations) {
                        $scope.organizations = organizations;
                        $scope.organizations.unshift({name: '个人'});
                        var i,
                            len = $scope.organizations.length;
                        for (i = 0; i < len; i++) {
                            $scope.organizationNames[i] = $scope.organizations[i].name;
                        }
//                        $scope.project.organization = $scope.organizationNames[0];
                    });

                    $scope.submit = function () {
                        var newProject = {
                            'name': $scope.project.name,
                            'desc': $scope.project.desc,
                            'logo': $scope.project.logo,
                            'organization': $scope.project.organization
                        };
                        $http.post('http://127.0.0.1:3000/project/create', newProject).success(function (data) {
                            // 成功的话返回给前端渲染到页面上
                            // 暂时新用直接刷新页面的方式
                            $modalInstance.close({
                                name: $scope.project.name,
                                desc: $scope.project.desc,
                                logo: $scope.project.logo,
                                status: 'success'
                            });
                            $state.reload();
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };
                $modal.open({
                    templateUrl: 'dashboard/views/create-project.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: createProjectModalInstanceController,
                    resolve: {
                        user: function () {
                            return $scope.user;
                        }
                    }
                });
            };

        }
    ]);
