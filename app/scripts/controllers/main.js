'use strict';

/**
 * @ngdoc function
 * @name angularHttpCacheTransformApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularHttpCacheTransformApp
 */
angular.module('angularHttpCacheTransformApp')
  .controller('MainCtrl', function ($scope, WeatherService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    WeatherService.getWeatherIntoScopeMessage($scope);

  })
  .factory('WeatherService', function ($http) {

    return {

      // the factory method that get weather data and put it into scope's message
      // the http data is transformed using a web worker
      getWeatherIntoScopeMessage: function ($scope) {
        $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk?',
          transformResponse: function (value) {

            if (!!window.Worker) {
              var myWorker = new Worker('workers/worker.js');

              myWorker.postMessage(value);

              myWorker.onmessage = function (e) {

                $scope.$apply(function () {
                  $scope.message = e.data;
                });
              }
            }

            return '';
          }
        }).error(function (reason) {
          console.log(reason);
        });
      }
    }


  });
