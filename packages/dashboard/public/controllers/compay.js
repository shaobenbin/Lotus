'use strict';

angular.module('mean')
    .controller('CompanyController', ['$scope','$http', 'Global',
        function ($scope, $http, Global) {
            $scope.global = Global;

            $scope.oneAtATime = false;

            $scope.status = {
                name: 'test'
            };

//            $scope.company = function (val) {
//                return $http.get('http://127.0.0.1:3000/company/created', {
//                }).then(function (res) {
//                    console.log(res);
//                    return res;
//                });
//            };

            $http.get('http://127.0.0.1:3000/company/created').success(function(data) {
                $scope.company = data;
            });
        }
    ]);
