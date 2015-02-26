angular.module('angularHttpCacheTransformApp')
  .factory('WeatherService', function ($http, country) {

    return {

      // the factory method that get weather data and put it into scope;
      // the http data is transformed using a web worker
      getWeatherIntoScopeMessage: function ($scope, city) {
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '?',
          cache: true,
          transformResponse: function (value) {

            if (!!window.Worker) {
              var myWorker = new Worker('workers/worker.js');
              myWorker.postMessage(value);
              myWorker.onmessage = function (e) {
                $scope.$apply(function () {
                  var result = JSON.parse(e.data);
                  $scope.selectedCities.unshift(result);
                });
              };
            }

            return '';
          }
        }).error(function (reason) {
          console.log(reason);
        });
      }
    };
  });
