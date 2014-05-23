'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', '$state','$http', '$modal', '$log', 'Global',
        function ($scope,$state,$http, $modal, $log, Global) {

            $scope.name = 'test';
        }
    ]);
