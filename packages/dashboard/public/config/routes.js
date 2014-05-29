'use strict';

angular.module('mean')
    .config(['$stateProvider',
    // @see http://www.angularjs.cn/A00x
    function($stateProvider) {
        // @see https://github.com/angular-ui/ui-router/wiki
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard/views/index.html'
            })
            .state('dashboard.projects', {
                url: '/projects',
                templateUrl: 'dashboard/views/projects.html'
            })
            .state('dashboard.project', {
                url: '/project/:id',
                templateUrl: 'dashboard/views/project.html'
            })
            .state('dashboard.project.module', {
                url: '/module/:moduleId',
                views: {
                    moduleContent: {
                        templateUrl: 'dashboard/views/module.html'
                    }
                }
            })
            .state('dashboard.project.page', {
                url: '/page',
                views: {
                    moduleContent: {
                        templateUrl: 'dashboard/views/page.html'
                    }
                }
            })
            .state('dashboard.project.interface', {
                url: '/interface',
                views: {
                    moduleContent: {
                        templateUrl: 'dashboard/views/interface.html'
                    }
                }
            })
            .state('otherwise', {
                url: '*path',

                templateUrl: 'dashboard/views/404.html'
            });

    }
]);
