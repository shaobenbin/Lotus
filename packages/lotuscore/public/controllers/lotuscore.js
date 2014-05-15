'use strict';

angular.module('mean')
    .controller('LotuscoreController', ['$scope', 'Global',
    function($scope, Global, Lotuscore) {
        $scope.global = Global;
        $scope.lotuscore = {
            name: 'lotuscore'
        };
    }
]);
