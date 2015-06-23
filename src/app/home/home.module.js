/**
 * Each module has a <moduleName>.module.js file.  This file contains the angular module declaration -
 * angular.module("moduleName", []);
 * The build system ensures that all the *.module.js files get included prior to any other .js files, which
 * ensures that all module declarations occur before any module references.
 */
(function(module) {
    module.config(function ($stateProvider) {

        
   
        /*$stateProvider.state('logout', {
            

            url: '/logout',
            views: {
                "main": {
                    controller: 'HomeController as model',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data:{ pageTitle: 'Homeloh' },
            resolve: {

                // A string value resolves to a service
                Auth: 'Auth',

                // A function value resolves to the return
                // value of the function
                foundval: function(Auth){
                    Auth.logout();
                    
                }
            }



        });*/
    });

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("calorific.home",['ui.router','calorific.auth','ui.bootstrap'])));
