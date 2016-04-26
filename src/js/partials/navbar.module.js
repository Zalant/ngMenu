'use strict';
(function () {
    angular.module('navbar', ['ui.router', 'ngStorage'])
            .config(['$stateProvider','$urlRouterProvider',
                    function ($stateProvider, $urlRouterProvider) {
//      $urlRouterProvider.otherwise('/first');
                        $stateProvider
                                .state('main', {
                                    url: '/main',
                                    templateUrl: 'mainpage.html'
                                })
                                .state('test-1', {
                                    url: '/test1',
                                    templateUrl: 'test-1.html'
                                })
                                .state('test-3', {
                                    url: '/test3',
                                    templateUrl: 'test-3.html'
                                })
                                .state('test-7', {
                                    url: '/test7',
                                    templateUrl: 'test-7.html'
                                })
                              ;

                    }
            ]);
})();