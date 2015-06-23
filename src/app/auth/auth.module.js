(function(module) {
    
    module.config(function ($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/auth',
                views: {
                    'main@': {
                        controller: 'AuthController as model',
                        templateUrl: 'auth/auth.signup.tpl.html'
                    }
                },
                data:{ pageTitle: 'Auth' }
            });
            /*.state('auth.signin', {
                url: '/signin',
                views: {
                    'main@': {
                        controller: 'AuthController as model',
                        templateUrl: 'auth/auth.signin.html'
                    }
                },
                data:{ pageTitle: 'Signin' }
            });*/
    });
    
}(angular.module('calorific.auth', [
    'ui.router',
    'ngResource'
])));
