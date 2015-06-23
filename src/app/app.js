(function(app) {

    app.constant('urls', {
            BASE: 'http://homestead.app',
            BASE_API: 'http://homestead.app/v1'
        });

    app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
// For any unmatched url, redirect to /state1

  //

$stateProvider.state('app', {


});



  $stateProvider.state('app.home', {
            url: '/home',
            views: {
                "main@": {
                    controller: 'HomeController as model',
                    templateUrl: 'home/home.tpl.html'
                },
                "header@app.home": {
                    controller: 'HeaderController',
                    templateUrl: 'home/header.tpl.html'
                },
                "summary@app.home": {
                    controller: 'SummaryController',
                    templateUrl: 'home/summary.tpl.html'
                },
                "addfood@app.home": {
                    controller: 'AddFoodController',
                    templateUrl: 'home/addfood.tpl.html'
                },
                "todayfood@app.home": {
                    controller: 'TodayFoodController',
                    templateUrl: 'home/todayfood.tpl.html'
                },
                "today@app.home": {
                    controller: 'TodayController',
                    templateUrl: 'home/today.tpl.html'
                }

            },
            data:{ pageTitle: 'Home' }
        });

  $stateProvider.state('app.macro', {
        url: '/macro',
            views: {
                "main@": {
                    controller: 'MacroController as model',
                    templateUrl: 'macro/macro.tpl.html'
                },
                "header@app.macro": {
                     templateUrl: 'home/header.tpl.html'
                },
            },
        data:{ pageTitle: 'Macro' }
 
    });
  $stateProvider.state('printfood', {
        url: '/fooddiary',
            views: {
                "main": {
                    controller: 'FoodDiaryController as model',
                    templateUrl: 'home/fooddiary.tpl.html'
                }
            },
        data:{ pageTitle: 'Food Diary' }
 
    });
  $stateProvider.state('app.explain', {
        url: '/explain',
            views: {
                "main@": {
                    templateUrl: 'home/explain.tpl.html'
                },
                "header@app.explain": {
                     templateUrl: 'home/header.tpl.html'
                },
            },
        data:{ pageTitle: 'Food Diary' }
 
    });
  $urlRouterProvider.otherwise("home");
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403 || response.status===500) {
                            delete $localStorage.token;
                            $location.path('/auth');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
    }]);


    //app.run(function () {});
    app.run(function($rootScope, $location, $localStorage) {
        if ($localStorage.token == null || $localStorage.token===undefined) {
            $location.path("/auth");
        }
        else {
          console.log("fine!");
        }
            $rootScope.$on( "$stateChangeStart", function(event, next) {
                if ($localStorage.token == null) {
                   $location.path("/auth");
                   /*if ( next.templateUrl === "partials/restricted.html") {
                        $location.path("/signin");
                    }*/
                }
            });
    });

    app.controller('AppController', function ($scope) {

    });

    

}(angular.module("calorific", [
    'ui.router',
    'calorific.home',
    'calorific.macro',
    'calorific.about',
    'templates-app',
    'templates-common',
    'calorific.products',
    'calorific.auth',
    'ngStorage',
    'ui.bootstrap',
])));
