'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', 'Global',
        function ($scope, Global, Dashboard) {

//            var baseUrl = 'http://127.0.0.1:3000/public/test/'
//
//            $http.get(baseUrl + 'organizations.json').success(function(data) {
//                $scope.organizations = data;
//            });
//
//            $http.get(baseUrl + 'projects.json').success(function(data) {
//                $scope.projects = data;
//            });
//
////            $scope.personal.projects
//
//            var i,
//                len = $scope.projects.length;
//
//            for (i = 0; i < len; i++) {
//                if ($scope.projects[i].organization !== null) {
//                    $scope.personal.projects.push($scope.projects[i]);
//                }
//            }

            $scope.organizations = [{
                name: 'A市产品线路一',
                desc: '一量产超过',
                logo: 'http://m.j/100x100',
                owner: 'lanxi',
                create: 1400242725796,
                modified: 1400242725796,
                projects: [{
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: 'mogujie'
                }]
            },{
                name: 'A市产品线路一',
                desc: '一量产超过',
                logo: 'http://m.j/100x100',
                owner: 'lanxi',
                create: 1400242725796,
                modified: 1400242725796,
                projects: [{
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: 'mogujie'
                }]
            },{
                name: 'A市产品线路一',
                desc: '一量产超过',
                logo: 'http://m.j/100x100',
                owner: 'lanxi',
                create: 1400242725796,
                modified: 1400242725796,
                projects: [{
                    name: '项目一',
                    desc: '项目一描述',
                    logo: 'http://m.j/100x100',
                    owner: 'lanxi',
                    create: 1400242725796,
                    modified: 1400242725796,
                    organization: 'mogujie'
                }]
            }];

        }
    ]);




