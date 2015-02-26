angular.module('angularHttpCacheTransformApp')
  .directive('myRotate', function () {
    return {
      restrict: 'EA',
      scope: {
        degree: '@'
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
          + (initialTilt + parseFloat(degree) + 'deg)'));
        });
      }
    }
  });
