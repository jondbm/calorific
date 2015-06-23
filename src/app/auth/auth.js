(function(module) {
    
    module.controller('AuthController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', 'Foods', function ($rootScope, $scope, $location, $localStorage, Auth, Foods) {
        var model = this;
        model.loading = false;
        model.products = [];

        init();

        $scope.signingin = true;
        function init() {
            //alert("poojijn");
            model.products = getMyInfo();
        }
        /* get from API */
        function getMyInfo() {
            model.loading = true;
            Auth.getMyInfo().query().$promise.then(function(response) {
                model.products = response;
                model.loading = false;
            });
            /*Auth.getWeather()
                // then() called when son gets back
                .then(function(data) {
                    // promise fulfilled
                    if (data.forecast==='good') {
                        alert("goog");
                    } else {
                        alert("bad");
                    }
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    alert("error");
                });*/
        }

        function successAuth(res) {
            $localStorage.token = res.token;
            $scope.loggedin=true;
             Foods.getMacros().then(function(response) {
                $scope.myMacros = response.data;
                if (response.data.macros[1]['new']==1) {
                    window.location = "#/macro";
                }
                else {
                    window.location = "#/home";

                }
            });
            
        }

        $scope.signin = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signin(formData, successAuth, function () {
                $rootScope.error = 'Invalid credentials.';
            });
        };

        $scope.signup = function () {
           // alert("787678678degvegerergerg");
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            });
        };

        $scope.logout = function () {
            Auth.logout(function () {
                window.location = "/";
            });
        };
        $scope.token = $localStorage.token;
        $scope.tokenClaims = Auth.getTokenClaims();
    }]);
    
    
}(angular.module("calorific.auth")));