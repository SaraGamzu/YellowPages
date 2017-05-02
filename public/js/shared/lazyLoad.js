angular.module('lazy-load', [])
    .directive('lazyLoad', function ($document, $window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var scroller = element[0]
                $(scroller).bind('scroll', function () {
                    if (scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
                        return scope.$apply(attrs.lazyLoad);
                    }
                })
            }
        }
    });
