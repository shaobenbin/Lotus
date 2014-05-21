'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', '$state','$http', '$modal', '$log', 'Global',
        function ($scope,$state,$http, $modal, $log, Global) {
            $scope.global = Global;

//            var baseUrl = 'http://127.0.0.1:3000/public/test/';

//            $http.get(baseUrl + 'organizations.json').success(function(data) {
            $scope.organizations = [
                {
                    _id: '1',
                    name: 'A市产品线路一',
                    desc: '一量产超过',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    member: ['lanxi', 'binbin'],
                    create: 1400242725796,
                    modified: 1400242725796
                },
                {
                    _id: '2',
                    name: 'A市产品线路一',
                    desc: '一量产超过',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    member: ['lanxi', 'binbin'],
                    create: 1400242725796,
                    modified: 1400242725796
                },
                {
                    _id: '3',
                    name: 'A市产品线路一',
                    desc: '一量产超过',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    member: ['lanxi', 'binbin'],
                    create: 1400242725796,
                    modified: 1400242725796
                }
            ];
//            });

//            $http.get(baseUrl + 'projects.json').success(function(data) {
            $scope.projects = [
                {
                    _id: '1',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '1'
                },
                {
                    _id: '2',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '1'
                },
                {
                    _id: '3',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '2'
                },
                {
                    _id: '4',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '3'
                },
                {
                    _id: '5',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '3'
                },
                {
                    _id: '6',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '3'
                },
                {
                    _id: '7',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '3'
                },
                {
                    _id: '8',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: ''
                },
                {
                    _id: '9',
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: '3'
                }
            ];
//            });

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
                if ($scope.projects[i].organization === '') {
                    $scope.personal.projects.push($scope.projects[i]);
                } else {
                    for (j = 0; j < jLen; j++) {
                        if ($scope.projects[i].organization === $scope.organizations[j]._id) {
                            $scope.organizations[j].projects.push($scope.projects[i]);
                        }
                    }
                }
            }

            $scope.ProjectDetail = function (param) {
                $state.go('projects.detail', {projectId: param});
            };


            $scope.showCreateOrganizationDialog = function() {
                $scope.user = 'hello';
                $scope.items = ['item1', 'item2', 'item3'];

                var ModalInstanceCtrl = function ($scope, $modalInstance,$http, $log, user,items) {
                    $log.log('user:' + user);
                    $log.log('items:' + items);

                    $scope.user = user + 'wenbin';
                    $scope.items = items.push('item4');

                    $scope.selected = {
                        item: $scope.items[0]
                    };
                    $scope.organization = {};
                    $scope.organization.name = 'a';
                    $scope.organization.desc = 'b';
                    $scope.organization.logo = 'http://m.j/80x80';

                    $scope.submit = function () {
//                            $http.get(baseUrl + 'projects.json').success(function(data) {
                        $log.log('submit done');
                        $log.log('name:' + $scope.organization.name);
                        $log.log('desc:' + $scope.organization.desc);
                        $log.log('logo:' + $scope.organization.logo);
//                            });

                        $modalInstance.close({
                            selectedItem: $scope.selected.item,
                            user: $scope.user,
                            items: $scope.items,
                            name: $scope.organization.name,
                            desc: $scope.organization.desc,
                            logo: $scope.organization.logo
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                var modalInstance = $modal.open({
                    templateUrl: 'dashboard/create-organization.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: ModalInstanceCtrl,
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
                    $scope.selected = data.selectedItem;
                    $scope.user = data.user;
                    $scope.items = data.items;
                    $log.log('selected:' + $scope.selected);
                    $log.log('user:' + $scope.user);
                    $log.log('items:' + $scope.items);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.showCreateProjectDialog = function() {
                $modal.open({
                    templateUrl: 'dashboard/create-project.html',
                    backdrop: true,
                    windowClass: 'modal',
                    controller: function ($scope, $modalInstance, $log, user) {
                        $scope.user = user;

//                        $http.get(baseUrl + 'projects.json').success(function(data) {
                        var data = [{
                                _id: '1',
                                name: 'A市产品线路一',
                                desc: '一量产超过',
                                logo: 'http://m.j/100x100',
                                owner: 'lanxi',
                                member: ['lanxi', 'binbin'],
                                create: 1400242725796,
                                modified: 1400242725796
                            },
                            {
                                _id: '2',
                                name: 'A市产品线路一',
                                desc: '一量产超过',
                                logo: 'http://m.j/100x100',
                                owner: 'lanxi',
                                member: ['lanxi', 'binbin'],
                                create: 1400242725796,
                                modified: 1400242725796
                            }];


                        // 设置我的组织列表
                        $scope.organizations = [];
                        var i,
                            len = data.length;

                        for (i = 0; i < len; i ++) {
                            $scope.organizations.push(data[i].name);
                        }
//                        });

                        $scope.submit = function () {
                            $log.log('submit done.');
                            $modalInstance.close(user);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    resolve: {
                        user: function () {
                            return $scope.user;
                        }
                    }
                });
            };


        }
    ]);




