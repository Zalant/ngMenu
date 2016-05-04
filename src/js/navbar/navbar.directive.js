'use strict';
(function (angular) {
  angular.module('navbar')
    .directive('navbarmenu', ['$state', function ($state) {
      return {
        restrict: 'A',
        scope: {menuItemsList: '='},
        templateUrl: 'template/navbar.template.html',
        link: function ($scope, elem, attr) {
          $scope.showingmenu = attr.menuItemsList;
          elem.attr('role', 'navigation');

          $scope.states = $state;


          var menuItems = [];

          for (var i = 0; i < $scope.menuItemsList.length; i++) {
            add($scope.menuItemsList[i]);
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


          //Обработчик кнопок. При нажатии добавляется стиль active к li
          //liNumber определяет текущее положение active

          $scope.liNumber = -1;
          window.onkeydown = function (e) {
            var li = document.getElementsByTagName('li');
            // console.log(li.length);

            // for(var k=0; k<li.length; k++){
            //
            //   if ($(li[k]).children[2] == 'ul'){li[k].classList.add('secondlvl')} else {li[k].classList.add('firstlvl')}
            // }

            var evt = e.keyCode;
            // console.log(evt);
            switch (evt) {

              //вниз

              case 40 :
              {

                if ($scope.liNumber != -1) {
                  li[$scope.liNumber].classList.remove('active');
                }
                if ($scope.liNumber != li.length / 2 + 1) {
                  ++$scope.liNumber;
                  li[$scope.liNumber].classList.add('active');

                  // console.log($scope.liNumber);
                }
                break;
              }

              //вверх

              case 38:
              {
                if ($scope.liNumber != -1) {
                  li[$scope.liNumber].classList.remove('active');
                }
                --$scope.liNumber;
                li[$scope.liNumber].classList.add('active');

                console.log($scope.liNumber);
                break;
              }


              //вправо (открывает подпункты)

              case 39:
              {
                li[$scope.liNumber].classList.add('ng-scope', 'active', 'open');
                break;
              }

              //влево (скрывает подпункты)

              case 37:
              {
                li[$scope.liNumber].classList.remove('ng-scope', 'open');
                break;
              }
              case 13:
              {

                $(li[$scope.liNumber]).children().click();
                break;
              }

            }

          };
        }
      };
    }])

  ;
})(window.angular);

