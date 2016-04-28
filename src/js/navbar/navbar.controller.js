'use strict';
(function (angular) {
  angular.module('navbar')
    .controller('menuCtrl', ['$scope', '$state', function ($scope, $state) {


      //Здесь задаются пункты меню. Состояния к ним прописываются в navbar.module.js
      $scope.states = $state;

      var mymenu = [{name: 'Main', url: '#', state: 'main'},
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


      var menuItems = [];
      for (var i = 0; i < mymenu.length; i++) {
        add(mymenu[i]);
      }
      createDependence();


      function createDependence() {
        for (var i = 0; i < menuItems.length; i++) {
          if (menuItems[i].location) {
            checkElement(menuItems[i], menuItems);

//        return;
          }
//    return;
        }

      };

      //Проверка есть ли у элемента подпункты

      function checkElement(obj, menuItems) {
        if (obj.location) {
          var place = obj.location;
          if (place.pop) {
            for (var j = 0; j < place.length; j++) {
              var dependence = place[j];

              if (dependence === obj.name) {
                console.log('Warning! Пункт "' + dependence + '" содержит в подпунктах сам себя.');
                return;
              }
              //проверка на наличие данного подпункта в общем списке
              var flag = false;
              for (var i = 0; i < menuItems.length; i++) {
                if (dependence === menuItems[i].name) {
                  flag = true;
                }
              }
              if (!flag && !dependence.name) {
                console.log('Warning! Пункта "' + dependence + '" не существует в общем списке.');
              }

              for (var k = 0; k < menuItems.length; k++) {
                if (dependence === menuItems[k].name) {
                  place[j] = menuItems[k];
                  //флаг для того, чтобы не выводить в основном меню пункты, которые являются подпунктами
                  menuItems[k].submenu = true;

                  checkElement(place[j], menuItems);
                }
              }
            }
          }
        }
      }

      //Функция добавления нового пункта меню

      function add(obj) {
        if (obj.location) {
        } else {
          var name = obj.name;
          for (var i = 0; i < menuItems.length; i++) {
            var currentName = menuItems[i].name;
            if (currentName === name) {
              console.log('Warning! Меню дублируется "' + name + '".');
              return;
            }
          }
          menuItems.push(obj);
          return;
        }
        menuItems.push(obj);
        return;
      };

      $scope.menuList = menuItems;

    }]);
})(window.angular);
