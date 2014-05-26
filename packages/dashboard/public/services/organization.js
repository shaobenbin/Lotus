'use strict';

angular.module('mean')
    .service('Organization', ['$http', '$resource', function ($http, $resource) {

        /**
         * 取得用户拥有的和参与的组织
         */
//        this.getOrganizations = function () {
//            $http.get('http://127.0.0.1:3000/api/organizations/1').success(function (organizations) {
//                return organizations;
//            });
//        }

        this.getOrganizations = function () {
            var Organization = $resource('http://127.0.0.1:3000/api/organizations');
            var organizations = Organization.query().$promise.then(function(data) {
                return data;
            });
            return organizations;
        }

    }]);
