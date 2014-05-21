'use strict';

angular.module('mean.system')
    .factory('Global', [

    // 全局变量
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };
        return _this._data;
    }
]);