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

    // bind scope methods
    $scope.update = function () {
      var selectedCity = $scope.selectedCity.name;
      WeatherService.getWeatherIntoScopeMessage($scope, selectedCity);
    };

    // we should generate uuid for each selected city instead of using raw city id;
    // index is not reliable if we use filter
    $scope.remove = function (index) {
      $scope.selectedCities.splice(index, 1);
    };

    // init scope variables
    init($scope, CityService);

  })
  // we only consider UK in this example
  .constant('country', 'uk');

function init($scope, CityService) { //jshint ignore: line
  $scope.selectedCities = [];

  $scope.cities = CityService.getAllCities();

  $scope.selectedCity = $scope.cities[0];

  $scope.update();
}








