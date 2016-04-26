'use strict';
(function (angular) {
    angular.module('navbar')
            .controller('menuCtrl',['$scope','navbarList', function ($scope, navbarList)
            {
                $scope.list = navbarList.list;

                //Здесь задаются пункты меню. Состояния к ним прописываются в navbar.module.js

                var mymenu = [{name: 'Main', url: '#', state: 'main'},
                    {name: 'test-1', url: '#', state: 'test-1'},
                    {name: 'test-2', url: '#',
                        location: ['test-3']
                    },
                    {name: 'test-3', url: '#', state: 'test-3'},
                    {name: 'test-4', url: "#",
                        location: ['test-5']
                    },
                    {name: 'test-7', url: '#', state: 'test-7'},
                    {name: 'test-5', url: '#',
                        location: ['test-6']
                        },
                    {name: 'test-6', url: '#',
                        location: ['test-7']
                            }

                ];

                for (var i = 0; i < mymenu.length; i++)
                {

                    navbarList.add(mymenu[i]);

                }

                navbarList.createDependence();

                ;
            }]);
})(window.angular);