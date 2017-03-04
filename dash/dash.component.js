(function() {
    'use strict';

    angular.module("app")
        .component("dash", {
            controller: controller,
            templateUrl: 'dash/dash.html'
        })

    function controller($scope) {
        const vm = this;
        console.log($scope);
        $scope.view={}
        vm.$onInit = function() {
            console.log('sdfgh');
            // url(img/background.jpg);"
            $scope.view.rainbow = [
                "rgba(69, 7, 204, 0.94) 0%",
                "rgba(104, 82, 153, 0.94) 10%",
                "rgba(34, 84, 255, 0.94) 30%",
                "rgba(255, 197, 98, 0.94) 80%",
                "rgba(204, 107, 7, 0.94) 100%"
            ];
            // vm.abstract = "background.jpg";
            // vm.kelvin = 100;
            // vm.temperature = (vm.kelvin + 459.67) * 5 / 9;
        };

    }
})();
