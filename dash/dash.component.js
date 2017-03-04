(function() {
    'use strict';

    angular.module("app")
        .component("dash", {
            controller: controller,
            templateUrl: 'dash/dash.html'
        })

    function controller($scope,$http, ApiRequests) {
        const API_KEY = 'c8ecc1f10bcf4911b86482b3d5b2b1a9';
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
            $scope.view.locationName='__________'
            $scope.view.temp = '___'

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
          console.log('here');
            let local = $scope.view.search;
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + local + `&key=AIzaSyAFSPs5znb5ggZ7ZyajBCJMdBiKEXV6UG0`)
                .then(function(res) {
                  $scope.view.location = res.data.results[0].geometry.location
                  $http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${$scope.view.location.lat},${$scope.view.location.lng}`+ "&key=AIzaSyDK9X5OV-tZJoXLGT6w1kvx3m-iviDDXiI")
                      .then(function(res) {
                        console.log(res);
                        $scope.view.locationName=res.data.results[2].formatted_address

                    })
                  airPollution($scope.view.location )
                  airTemp($scope.view.location )

                })
        }
        vm.search=function(){
          locationSearch()
        }
        function airPollution(local){
          $http.get("https://api.planetos.com/v1/datasets/noaa_aqfs_pm25_bc_conus/point?origin=dataset-details&lat=" + local.lat + `&apikey=${API_KEY}&lon=` + local.lng + "&_ga=1.196584740.908249478.1488639799")
          .then(function(res){
            $scope.view.airParticles = res.data.entries[0].data
            console.log(res.data.entries[0].data);
            $scope.view.airParticlesRead=  Number($scope.view.airParticles.PMTF_1sigmalevel.toFixed(2))
            setTimeout(vm.change_rainbow(), 10000);

          })
        }

        function airTemp(local){
          $http.get("https://api.wunderground.com/api/6cd1247caa587deb/conditions/q/"+local.lat+","+local.lng+".json")
          .then(function(res){
            let weather = res.data.current_observation
            console.log(weather)
            $scope.view.uv = weather.UV
            $scope.view.temp = weather.feelslike_f
            $scope.view.wind = weather.wind_mph
            $scope.view.wind_direction = weather.wind_dir
            $scope.view.weather = weather.weather
            $scope.view.image = weather.icon_url
            $scope.view.forecast = weather.forecast_url
            console.log($scope.view);

            })

        };
        vm.change_rainbow = () => {
          console.log('called');
          $scope.view.rainbow.forEach((color, index, rainbow) => {
            color.r = $scope.view.temp < 125 ?
            Math.ceil($scope.view.temp / 125 * 255) :
            255;
            color.g = 40;
            color.b =
            Math.floor(Math.random() * 100);
            color.a = $scope.view.airParticlesRead / 20;
            color.percentage = index > 0 ?
            Math.random() * (100 - parseFloat(rainbow[index - 1].percentage)) + parseFloat(rainbow[index - 1].percentage) + "%" :
            Math.random() * 50 + "%";
          });
        }

    }
})();
