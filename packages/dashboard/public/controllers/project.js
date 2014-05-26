'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', '$state', '$http', '$modal', '$log', 'Global','$location',
        function ($scope, $state, $http, $modal, $log, Global,$location) {

            var id = $location.absUrl().slice(-24);

            $http.post('http://127.0.0.1:3000/modules/fetch', {projectId:id}).success(function(modules) {
                $scope.list = modules;
            });

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

            // 前面阿牛
            $scope.toggle = function(scope) {
                scope.toggle();
            };

            // 列表3个按钮
            $scope.remove = function(scope) {
                scope.remove();
            };

            $scope.editNode = function(scope) {
                console.log(scope);
                console.log(scope.type);

                if (scope.type === 'module') {

                    $state.go('dashboard project module');
                } else if(scope.type === 'page') {
                    $state.go('dashboard project module');
                } else if (scope.type === 'action') {
                    $state.go('dashboard project action');
                } else {
                    $state.go('dashboard project module');
                }
            };

            // 新建模块
            $scope.newNode = function(scope) {
                console.log(scope);
                if (scope.type === 'module') {
                    $state.go('dashboard project module');
                } else if(scope.type === 'page') {
                    $state.go('dashboard project module');
                } else if (scope.type === 'action') {
                    $state.go('dashboard project action');
                } else {
                    $state.go('dashboard project module');
                }
            };






        }
    ]);
