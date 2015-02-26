'use strict';

angular.module('angularHttpCacheTransformApp')
  .directive('myRotate', function () {
    return {
      restrict: 'EA',
      scope: {
        degree: '@'
      },
      // transclude: true,
      template: '<i class="fa fa-compass" style="font-size: 44px;"></i>',
      link: function (scope, elem) {
        var initialTilt = -32;
        scope.$watch('degree', function () {
          if (!scope.degree) {
            return;
          }
          var degree = scope.degree, rotation = initialTilt + parseFloat(degree);
          var compass = elem.children()[0];
          angular.element(compass).css('-webkit-transform', 'rotate(' + rotation + 'deg)');
          angular.element(compass).css('-moz-transform', 'rotate(' + rotation + 'deg)');
        });
      }
    };
  });
