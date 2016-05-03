'use strict';
(function (angular) {
  angular.module('navbar')
    .controller('changesideCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
      $scope.$storage = $localStorage.$default({
        savedside: 'navmenu navmenu-inverse navmenu-fixed-left offcanvas',
        savedbuttonside: 'buttonleft'
      });

      $scope.attr = 'navmenu navmenu-inverse navmenu-fixed-left offcanvas';

      $scope.changeleft = function () {
        $scope.side = "left";
        $localStorage.savedside = 'navmenu navmenu-inverse navmenu-fixed-left offcanvas';
        $localStorage.savedbuttonside = 'buttonleft';
      };
      $scope.changeright = function () {
        $scope.side = "right";
        $localStorage.savedside = 'navmenu navmenu-inverse navmenu-fixed-right offcanvas';
        $localStorage.savedbuttonside = 'buttonright';
      };

    }
    ]);

})(window.angular);
