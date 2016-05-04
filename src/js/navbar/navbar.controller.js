'use strict';
(function (angular) {
  angular.module('navbar')
    .controller('menuCtrl', ['$scope', function ($scope) {


      //Здесь задаются пункты меню. Состояния к ним прописываются в navbar.module.js

      $scope.mymenu = [{name: 'Main', url: '#', state: 'main'},
        {name: 'test-1', url: '#', state: 'test-1'},
        {
          name: 'test-2', url: '#',
          location: ['test-3']
        },
        {name: 'test-3', url: '#', state: 'test-3'},
        {
          name: 'test-4', url: "#",
          location: ['test-5', 'test-8']
        },
        {name: 'test-7', url: '#', state: 'test-7'},
        {
          name: 'test-5', url: '#',
          location: ['test-6']
        },
        {
          name: 'test-6', url: '#',
          location: ['test-7']
        },
        {name: 'test-8', url: '#', state: 'test-8'}

      ];

    }]);
})(window.angular);
