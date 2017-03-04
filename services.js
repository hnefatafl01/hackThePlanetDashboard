angular.module('services', [])
.service("ApiRequests", function(){
  return {
     gps: function(callback) {
        var options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        navigator.geolocation.getCurrentPosition(callback, error, options)
    }
  }
})
