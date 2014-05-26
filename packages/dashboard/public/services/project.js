'use strict';

/**
 * 项目相关 service
 */
angular.module('mean')
    .service('Project', ['$http','$resource', function ($http, $resource) {

        /**
         * 取得用户拥有的和参与的项目
         */
//        this.getProjects = function () {
//            $http.get('http://127.0.0.1:3000/project/fetch').success(function (projects) {
//                return projects;
//            });
//        }
        return {
            getProjects: function () {
                var Project = $resource('http://127.0.0.1:3000/project/fetch');
                var projects = Project.query().$promise.then(function(data) {
                    console.log(data);
                    return data;
                });
                return projects;
            }
        }

    }]);
