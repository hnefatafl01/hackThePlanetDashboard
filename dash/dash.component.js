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
          })
        }

        function airTemp(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_gfs_global_sflux_0.12d/point?origin=dataset-details&lat="+local.lat+"&apikey=df2428181b194321977a4019aa15ecaf&lon="+local.lng+"&_ga=1.229213460.908249478.1488639799")
          .then(function(res){
            let tempK =res.data.entries[5].data.Temperature_surface
            let temp = (9/5)*(tempK-273)+32
            $scope.view.tempSurface={TempSurface:temp}
            console.log($scope);
          })
        }

    }
})();
