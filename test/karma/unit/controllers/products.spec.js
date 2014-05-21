'use strict';

(function() {
    describe('MEAN controllers', function() {
        describe('IndexController', function() {
            // 载入控制器
            // Load the controllers module
            beforeEach(module('mean'));

            var scope, IndexController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                IndexController = $controller('IndexController', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });
        });

        describe('PhoneListCtrl', function(){
            it('should create "phones" model with 3 phones', function() {
                var scope = {},
                    ctrl = new PhoneListCtrl(scope);

                expect(scope.phones.length).toBe(3);
            });
        });

    });
})();