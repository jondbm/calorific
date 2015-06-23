(function(module) {

    module.controller('AddProductController', function ($window, Product) {
        var model = this;
        model.product = new Product();
        model.save = save;

        init();

        function init() {

        }

        function save() {
            model.product.$save()
                .then(function (data) {
                    $window.location = '#/products';
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally();
        }
    });

}(angular.module("calorific.products")));
