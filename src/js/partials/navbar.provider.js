'use strict';
(function (angular) {
    angular.module('navbar')
            .provider('navbarList', function () {

                //Список менюх
                var list = [];



                //Добавление подпунктов

                this.createDependence = function ()
                {
                    for (var i = 0; i < list.length; i++)
                    {
                        if (list[i].location)
                        {
                            checkElement(list[i], list);

//        return;
                        }
//    return;
                    }

                };
                //Проверка есть ли у элемента подпункты

                function checkElement(obj, list)
                {
                    if (obj.location)
                    {
                        var place = obj.location;
                        if (place.pop)
                        {
                            for (var j = 0; j < place.length; j++)
                            {
                                var dependence = place[j];
                                for (var k = 0; k < list.length; k++)
                                {
                                    if (dependence === list[k].name)
                                    {
                                        place[j] = list[k];
                                        //флаг для того, чтобы не выводить в основном меню пункты, которые являются подпунктами
                                        list[k].submenu = true;
                                        checkElement(place[j], list);
                                    }
                                }
                            }
                        }

                    }
                }

                //Функция добавления нового пункта на первый уровень меню 

                this.add = function (obj)
                {
                    if (!obj.location) {
                        var name = obj.name;
                        for (var i = 0; i < list.length; i++) {
                            var currentName = (list[i].name.pop) ? list[i].name[0] : list[i].name;
                            if (currentName === name) {
                                console.log('Warning! Меню дублируется "' + name + '".');
                                return;

                            }
                        }
                        list.push(obj);
                        return;
                    }
                    list.push(obj);
                    return;
                };


                //Служебная функция $get
                this.$get = function () {
                    return {
                        list: list,
                        add: this.add,
                        createDependence: this.createDependence
                    };
                };

            });
})(window.angular);



        