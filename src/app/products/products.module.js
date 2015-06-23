(function(module) {
    
    module.config(function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                views: {
                    'main@': {
                        controller: 'ProductsController as model',
                        templateUrl: 'products/products.tpl.html'
                    }
                },
                data:{ pageTitle: 'Products' }
            })
            .state('addProduct', {
                url: '/products/add-product',
                views: {
                    'main@': {
                        controller: 'AddProductController as model',
                        templateUrl: 'products/addProduct.tpl.html'
                    }
                },
                data:{ pageTitle: 'Add Product' }
            })
            .state('editProduct', {
                url: '/products/edit-product/{id}',
                views: {
                    'main@': {
                        controller: 'EditProductController as model',
                        templateUrl: 'products/editProduct.tpl.html'
                    }
                },
                data:{ pageTitle: 'Edit Product' }
            });
    });
    
}(angular.module('calorific.products', [
    'ui.router',
    'ngResource'
])));
