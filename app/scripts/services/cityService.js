'use strict';

angular.module('angularHttpCacheTransformApp')
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
        }];
      }
    };
  });
