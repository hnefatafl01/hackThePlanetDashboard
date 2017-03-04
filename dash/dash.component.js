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
        $scope.view = {}
        vm.$onInit = function() {
            console.log('sdfgh');
            // url(img/background.jpg);"
            $scope.view.rainbow = [
              //Each RGB value has to be an integer between 0 and 255
              //Each A value has to be a floating point decimal between 0 and 1
              //each PERCENTAGE value has to be a string between 0% and 100%.
              {r: 69, g: 7, b: 204, a: .94, percentage: "0%"},
              {r: 104, g: 82, b: 153, a: .94, percentage: "10%"},
              {r: 34, g: 84, b: 255, a: .94, percentage: "30%"},
              {r: 255, g: 197, b: 98, a: .94, percentage: "80%"},
              {r: 204, g: 107, b: 7, a: .94, percentage: "100%"}
            ];
            vm.abstract = "background.jpg";
            vm.kelvin = 100;
            vm.temperature = (vm.kelvin + 459.67) * 5 / 9;
        };

    }
})();
