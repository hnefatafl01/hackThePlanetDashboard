(function() {
    'use strict';

    angular.module("app")
        .component("dash", {
            controller,
            templateUrl: 'dash/dash.html'
        })

    function controller() {
        const vm = this;

        vm.$onInit = function() {
            console.log('sdfgh');
        };

    }
})();
