'use strict';

angular.module('mean.about').controller('AboutController', ['$scope', 'Global',
    function($scope, Global, About) {
        $scope.global = Global;
        $scope.about = {
            name: 'About'
        };
    }

]);


