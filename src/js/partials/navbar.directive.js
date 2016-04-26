'use strict';
(function (angular) {
    angular.module('navbar')
            .directive('navbarmenu',['navbarList', function (navbarList) {
                return {
                    restrict: 'A',
                    templateUrl: 'template/navbar.template.html',
                    link: function (scope, elem) {




//                            elem.addClass('navmenu navmenu-inverse navmenu-fixed-left offcanvas');

                        elem.attr('role', 'navigation');


                        scope.list = navbarList.list;



                        ;
                    }};
            }])

            ;
})(window.angular);




