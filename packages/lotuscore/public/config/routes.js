'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('lotuscore example page', {
                url: '/lotuscore/example',
                templateUrl: 'lotuscore/views/index.html'
            });
    }
]);
