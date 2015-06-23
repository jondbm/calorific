(function(module) {
    
    module.controller('ProductsController', function (Product) {
        var model = this;
        model.loading = false;
        model.products = [];

        init();

        function init() {
            model.products = getProducts();
        }

        function getProducts() {
            model.loading = true;
            Product.query().$promise.then(function(response) {
                model.products = response;
                model.loading = false;
            });
        }
    });
    
}(angular.module("calorific.products")));