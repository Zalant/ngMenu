'use strict';
(function (angular) {
  angular.module('navbar')
    .directive('navbarmenu', ['$state', '$localStorage', function ($state, $localStorage) {
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


          $scope.aNumber = -1;


          window.onkeydown = function (e) {
            var a = document.getElementsByTagName('a');
            // console.log(li.length);

            // for(var k=0; k<li.length; k++){
            //
            //   if ($(li[k]).children[2] == 'ul'){li[k].classList.add('secondlvl')} else {li[k].classList.add('firstlvl')}
            // }

            var evt = e.keyCode;

            var checkChild = function () {
              for (var i = 0; i < $(a[$scope.aNumber]).parent().children('ul').children.length; i++) {
                console.log($(a[$scope.aNumber]).parent().children('ul').children[0].tagName);
                if ($(a[$scope.aNumber]).parent().children('ul').children[i].hasClass('dropdown-toggle')) {
                  checkChild()
                }

                ++$scope.aNumber;
              }
            }


            // console.log(evt);
            switch (evt) {

              //вниз

              case 40 :
              {


                if ($scope.aNumber != -1) {
                  $(a[$scope.aNumber]).parent().removeClass('active');
                }

                if ($(a[$scope.aNumber]).hasClass('dropdown-toggle')) {
                  if ($(a[$scope.aNumber]).parent().hasClass('open')) {
                    console.log('if');
                    ++$scope.aNumber;
                    $(a[$scope.aNumber]).parent().addClass('active');
                  }
                  else {
                    console.log('else');
                    var element = $(a[$scope.aNumber]).parent('li');
                    console.log(element);
                    var count = element.find('li');
                    for (var i = 0; i < count.length; i++) {
                      ++$scope.aNumber;
                    }
                    ++$scope.aNumber;
                    $(a[$scope.aNumber]).parent().addClass('active');
                  }
                }
                else {
                  ++$scope.aNumber;
                  $(a[$scope.aNumber]).parent().addClass('active');
                }


                break;
              }

              //вверх

              case 38:
              {
                if ($scope.aNumber == 0) {
                  console.log('Выше нельзя');
                }

                else {
                  if ($scope.aNumber != -1) {
                    $(a[$scope.aNumber]).parent().removeClass('active');
                  }


                  if ($(a[$scope.aNumber - 1]).parent().hasClass('open')) {
                    --$scope.aNumber;
                    $(a[$scope.aNumber]).parent().addClass('active');
                  }
                  else {
                    if ($(a[$scope.aNumber - 1]).parent().hasClass('firstlvl')) {

                      --$scope.aNumber;
                      $(a[$scope.aNumber]).parent().addClass('active');
                    }
                    else {
                      if ($(a[$scope.aNumber - 2]).parent().hasClass('firstlvl')) {
                        if (!$(a[$scope.aNumber - 1]).parent().hasClass(''))
                          $scope.aNumber -= 2;
                        $(a[$scope.aNumber]).parent().addClass('active')
                      }
                      else {
                        while (!($(a[$scope.aNumber]).parent().hasClass('firstlvl') || $(a[$scope.aNumber - 1]).parent().hasClass('open'))) {
                          --$scope.aNumber;
                        }
                        $(a[$scope.aNumber]).parent().addClass('active');
                      }

                    }

                    $(a[$scope.aNumber]).parent().addClass('active');
                  }
                }

                break;
              }


              //вправо (открывает подпункты)

              case 39:
              {
                $(a[$scope.aNumber]).parent().addClass('open');
                break;
              }

              //влево (скрывает подпункты)

              case 37:
              {
                $(a[$scope.aNumber]).parent().removeClass('open');
                break;
              }
              case 13:
              {

                $(a[$scope.aNumber]).click();
                break;
              }

            }

          };


        }
      };
    }])

  ;
})(window.angular);

