(function() {
    'use strict';

    angular.module("app")
        .component("dash", {
            controller: controller,
            templateUrl: 'dash/dash.html'
        })

    function controller($scope,$http, ApiRequests) {
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
            var date=new Date();
            $scope.view.date=date.toDateString();

        };
        $scope.view={}
        vm.gps = gps;
        vm.locationSearch = locationSearch;
        vm.airPollution = airPollution
        vm.airTemp = airTemp
        gps()

        function gps() {
            var options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;

                console.log(vm);
                $scope.view.location = {
                    lat: crd.latitude,
                    lng: crd.longitude
                };
                airPollution($scope.view.location )
                airTemp($scope.view.location )
                $scope.$apply()
                $http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${$scope.view.location.lat},${$scope.view.location.lng}`+ "&key=AIzaSyDK9X5OV-tZJoXLGT6w1kvx3m-iviDDXiI")
                    .then(function(res) {
                      console.log(res);
                      $scope.view.locationName=res.data.results[2].formatted_address

                  })
            };

            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, options)
        }

        function locationSearch() {
            let local = vm.searchTerm;
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + local + "&key=AIzaSyDK9X5OV-tZJoXLGT6w1kvx3m-iviDDXiI")
                .then(function(res) {
                  $scope.view.location = res.data.results[0].geometry.location
                  airPollution($scope.view.location )
                  airTemp($scope.view.location )

                })
        }

        function airPollution(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_aqfs_pm25_bc_conus/point?origin=dataset-details&lat="+local.lat+"&apikey=df2428181b194321977a4019aa15ecaf&lon="+local.lng+"&_ga=1.196584740.908249478.1488639799")
          .then(function(res){
            $scope.view.airParticles = res.data.entries[0].data
            $scope.view.airParticlesRead=   $scope.view.airParticles.PMTF_1sigmalevel.toFixed(2)
          })
        }

        function airTemp(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_gfs_global_sflux_0.12d/point?origin=dataset-details&lat="+local.lat+"&apikey=df2428181b194321977a4019aa15ecaf&lon="+local.lng+"&_ga=1.229213460.908249478.1488639799")
          .then(function(res){
            let tempK =res.data.entries[5].data.Temperature_surface
            let temp = (9/5)*(tempK-273)+32
            $scope.view.tempSurface={TempSurface:temp}
            $scope.view.tempSurface.readable=Math.round($scope.view.tempSurface.TempSurface);
            console.log($scope);
          })
        }

    }
})();
