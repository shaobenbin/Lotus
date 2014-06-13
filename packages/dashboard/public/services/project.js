'use strict';

/**
 * 项目相关 service
 */
angular.module('mean')
    .factory('ProjectFactory', ['$http','$resource', function ($http, $resource) {

        return $resource('/project/:id',
            {id: '@projectId'},
            {
                loan: {
                    method: 'PUT',
                    params: { id: '@projectId' },
                    isArray: false
                },
                'update': {
                    method: 'PUT',
                    isArray: false
                },
                'get': {method: 'GET'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            }
        );
    }]);
