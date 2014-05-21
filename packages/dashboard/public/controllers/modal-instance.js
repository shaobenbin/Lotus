'use strict';

angular.module('mean')
    .controller('ModalInstanceController', ['$scope','$modalInstance',
        function ($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);




