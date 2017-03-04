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
            vm.abstract = "a.jpg";
            // vm.kelvin = 100;
            // vm.temperature = (vm.kelvin + 459.67) * 5 / 9;
            $scope.view.temp = 78;
            $scope.view.airParticlesRead = 4.68;
        };
        vm.change_rainbow = () => {
          $scope.view.rainbow.forEach((color, index, rainbow) => {
            color.r = $scope.view.temp < 125 ?
            Math.ceil($scope.view.temp / 125 * 255) :
            255;
            color.g = Math.ceil($scope.view.airParticlesRead / 20 * 200);
            color.b =
            Math.floor(Math.random() * 100);
            color.a = Math.random() / 20 + 0.5;
            color.percentage = index > 0 ?
            Math.random() * (100 - parseFloat(rainbow[index - 1].percentage)) + parseFloat(rainbow[index - 1].percentage) + "%" :
            Math.random() * 50 + "%";
          });
        }

    }
})();
