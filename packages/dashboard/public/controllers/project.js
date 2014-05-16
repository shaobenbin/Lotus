'use strict';

angular.module('mean')
    .controller('ProjectController', ['$scope', 'Global',
        function ($scope, Global, Dashboard) {

            $http.get('http://127.0.0.1:3000/api/organizations/').success(function(data) {
                $scope.organizations = data;
            });

            $http.get('http://127.0.0.1:3000/api/projects/').success(function(data) {
                $scope.projects = data;
            });

//            $scope.personal.projects

            var i,
                len = $scope.projects.length;

            for (i = 0; i < len; i++) {
                if ($scope.projects[i].organization !== null) {
                    $scope.personal.projects.push($scope.projects[i]);
                }
            }

            $scope.organizations = [
                'The first choice!',
                'And another choice for you.',
                'but wait! A third!'
            ];
            $scope.status = {
                isopen: false
            };
            $scope.toggled = function (open) {
                console.log('Dropdown is now: ', open);
            };
            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };
        }
    ]);




