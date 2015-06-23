(function(module) {
    module.directive('productForm', function() {
        var linker = function(scope, element, attrs) {
            // do DOM Manipulation here
        };
        return {
            restrict: 'A',
            templateUrl: 'products/directives/productForm.tpl.html',
            link: linker,
            controller: 'ProductFormController as model',
            bindToController: true,
            scope: {
                product: '=productForm',
                lookups: '=productLookups'
            }
        };
    });

    module.controller('ProductFormController', function() {
        var model = this;

    });
})(angular.module('calorific.products'));