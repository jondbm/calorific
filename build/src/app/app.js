(function(app) {

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }]);

    app.run(function () {});

    app.controller('AppController', ['$scope', function ($scope) {

    }]);

}(angular.module("calorific", [
    'calorific.home',
    'calorific.about',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
])));
