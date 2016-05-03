'use strict';
(function (angular) {
  angular.module('navbar')
    .directive('navbarmenu', [function () {
      return {
        restrict: 'A',
        scope: {menuItemsList: '='},
        templateUrl: 'template/navbar.template.html',
        link: function (scope, elem, attr) {
          scope.showingmenu = attr.menuItemsList;
          elem.attr('role', 'navigation');
        }
      };
    }])

  ;
})(window.angular);




