(function(module) {
    module.factory('Product', function($resource) {
        return $resource(
            '/api/products/:id',
            { id: '@id' },
            { 'update': {method: 'PUT'} }
        );
    });
})(angular.module("calorific.products"));
