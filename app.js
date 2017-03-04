(function() {

    'use strict';

    angular.module('app', [])
        .component('content', {
            templateUrl: '/views/content.html',
            controller: controller
        })

    controller.$inject = ['$http', '$scope'];

    function controller($http, $scope) {
        const dat = this
        console.log($scope);
        $scope.view={}
        dat.$onInit = onInit;
        dat.gps = gps;
        dat.locationSearch = locationSearch;
        dat.airPollution = airPollution
        dat.airTemp = airTemp

        function onInit() {

        }

        function gps() {
            var options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;

                console.log(dat);
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
            let local = dat.searchTerm;
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + local + "&key=AIzaSyDK9X5OV-tZJoXLGT6w1kvx3m-iviDDXiI")
                .then(function(res) {
                  $scope.view.location = res.data.results[0].geometry.location
                  airPollution($scope.view.location )
                  airTemp($scope.view.location )

                })
        }

        function airPollution(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_aqfs_pm25_bc_conus/point?origin=dataset-details&lat="+local.lat+"&apikey=97abc5a3bba147dca70b034cf008302f&lon="+local.lng+"&_ga=1.196584740.908249478.1488639799")
          .then(function(res){
            $scope.view.airParticles = res.data.entries[0].data
          })
        }

        function airTemp(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_gfs_global_sflux_0.12d/point?origin=dataset-details&lat="+local.lat+"&apikey=97abc5a3bba147dca70b034cf008302f&lon="+local.lng+"&_ga=1.229213460.908249478.1488639799")
          .then(function(res){
            let tempK =res.data.entries[5].data.Temperature_surface
            let temp = (9/5)*(tempK-273)+32
            $scope.view.tempSurface={TempSurface:temp}
          })
        }

    }

}());
