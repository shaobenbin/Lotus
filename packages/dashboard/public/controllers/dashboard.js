'use strict';

angular.module('mean')
    .controller('DashboardController', ['$scope', 'Global',
        function ($scope, Global, Dashboard) {
            $scope.global = Global;
            $scope.dashboard = {
                name: 'dashboard'
            };
        }
    ]);




