'use strict';

angular.module('mean')
    .controller('AccordionProjectController', ['$scope',
        function ($scope) {
            $scope.oneAtATime = false;

            $scope.status = {
            };

            $scope.getProjectList = function (val) {
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
