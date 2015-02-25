'use strict';

/**
 * @ngdoc function
 * @name angularHttpCacheTransformApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularHttpCacheTransformApp
 */
angular.module('angularHttpCacheTransformApp')
  .controller('MainCtrl', function ($scope, CityService, WeatherService) {

    $scope.values = CityService.getAllCities();

    $scope.selected = $scope.values[0];

    $scope.update = function () {
      var selectedCity = $scope.selected.label;
      WeatherService.getWeatherIntoScopeMessage($scope, selectedCity);
    }

    $scope.update();

  })
  // we only consider UK in this example
  .constant('country', 'uk')
  .factory('WeatherService', function ($http, country) {

    return {

      // the factory method that get weather data and put it into scope's message
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
                  console.log(result);
                  $scope.weather = result.weather[0].description;
                  $scope.wind = result.wind;
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


  })
  .factory('CityService', function () {
    return {
      getAllCities: function () {
        return [{
          id: 1,
          label: 'London'
        }, {
          id: 2,
          label: 'Birmingham'
        }, {
          id: 3,
          label: 'Bristol'
        }, {
          id: 4,
          label: 'Cambridge'
        }, {
          id: 5,
          label: 'Durham'
        }]
      }
    }
  });
