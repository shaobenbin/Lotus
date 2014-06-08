'use strict';

angular.module('mean').controller('CoreController', ['$scope', 'Global',
    function($scope, Global, Core) {
        $scope.global = Global;
        $scope.core = {
            name: 'core'
        };
    }
]);
