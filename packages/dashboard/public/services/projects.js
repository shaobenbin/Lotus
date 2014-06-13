'use strict';

/**
 * 项目列表页相关 service
 */
angular.module('mean')
    .service('ProjectList', ['Organization', 'Project', function (Organization, Project) {

        /**
         * 查询项目列表
         */
        this.getProjectList = function () {
            var organizations = Organization.getOrganizations();
            var projects = Project.getProjects();

            var personal = {};
            personal.projects = [];

            var i,
                j,
                iLen = projects.length,
                jLen = organizations.length;

            for (j = 0; j < jLen; j++) {
                organizations[j].projects = [];
            }

            for (i = 0; i < iLen; i++) {
                if (!projects[i].organization || projects[i].organization === '个人') {
                    personal.projects.push(projects[i]);
                } else {
                    for (j = 0; j < jLen; j++) {
                        if (projects[i].organization === organizations[j].name) {
                            organizations[j].projects.push(projects[i]);
                        }
                    }
                }
            }
            return {
                personal: personal,
                organizations: organizations
            }
        }

    }]);
