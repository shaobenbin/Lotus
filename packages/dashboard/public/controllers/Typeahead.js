'use strict';

angular.module('mean')
    .controller('TypeaheadController', ['$scope', '$http',
        function ($scope, $http) {

            $scope.selected = undefined;

            // Any function returning a promise object can be used to load values asynchronously
            $scope.getLocation = function (val) {
                return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        sensor: false
                    }
                }).then(function (res) {
                    var addresses = [];
                    angular.forEach(res.data.results, function (item) {
                        addresses.push(item.formatted_address);
                    });
                    return addresses;
                });
            };
        }
    ]);
