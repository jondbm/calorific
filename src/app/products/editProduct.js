(function(module) {

    module.controller('EditProductController', function ($state, $window, Product) {
        var model = this;
        model.product = {};
        model.loading = false;
        model.update = update;

        init();

        function init() {
            model.product = getProduct();
        }

        function getProduct() {
            model.loading = true;
            Product.get({ id: $state.params.id }).$promise
                .then(function(response) {
                    model.product = response;
                    model.loading = false;
                });
        }

        function update() {
            model.product.$update()
                .then(function(response) {
                    $window.location = '#/products';
                });
        }
    });

}(angular.module("calorific.products")));
