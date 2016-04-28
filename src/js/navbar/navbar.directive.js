'use strict';
(function (angular) {
  angular.module('navbar')
    .directive('navbarmenu', [function () {
      return {
        restrict: 'A',
        templateUrl: 'template/navbar.template.html',
        link: function ($scope, $elem, $attr) {
         // $scope.showingmenu = ($attr.menuItems);
          $elem.attr('role', 'navigation');
          // console.log($scope.showingmenu);

        }
      };
    }])

  ;
})(window.angular);




