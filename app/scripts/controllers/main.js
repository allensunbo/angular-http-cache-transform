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

    $scope.selectedCities = [];

    $scope.cities = CityService.getAllCities();

    $scope.selectedCity = $scope.cities[0];

    $scope.update = function () {
      var selectedCity = $scope.selectedCity.name;
      WeatherService.getWeatherIntoScopeMessage($scope, selectedCity);
    }

    $scope.update();

  })
  // we only consider UK in this example
  .constant('country', 'uk')
  .directive('myRotate', function ($compile) {
    return {
      restrict: 'EA',
      scope: {
        degree: '='
      },
      // transclude: true,
      template: '<i class="fa fa-compass" style="font-size: 44px;"></i>',
      link: function (scope, elem, attrs) {
        var initialTilt = -32;
        scope.$watch('degree', function () {
          if (!scope.degree) {
            return;
          }
          var degree = scope.degree;
          angular.element(elem.children()[0]).css('-webkit-transform', 'rotate('
            + (initialTilt + degree) + 'deg)');
        });
      }
    }
  })
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
                  // console.log(result);
                  var weather = result.weather[0].description;
                  var wind = result.wind;
                  $scope.selectedCities.unshift({
                    name: $scope.selectedCity.name, weather: weather, wind: wind
                  });
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
          name: 'London'
        }, {
          id: 2,
          name: 'Birmingham'
        }, {
          id: 3,
          name: 'Bristol'
        }, {
          id: 4,
          name: 'Cambridge'
        }, {
          id: 5,
          name: 'Durham'
        }]
      }
    }
  });
