'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('core example page', {
            url: '/core/example',
            templateUrl: 'core/views/index.html'
        });
    }
]);
