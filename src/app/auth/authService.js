(function(module) {
    module.factory('Auth', ['$resource','$http','$localStorage','urls','$q','$location',function($resource,$http,$localStorage,urls,$q,$location) {
            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                return window.atob(output);
            }

            function getClaimsFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined' && token!==null) {
                    var encoded = token.split('.')[1];
                    if (encoded===undefined) { encoded = token;}
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                return user;
            }

            var tokenClaims = getClaimsFromToken();

            return {
                signup: function (data, success, error) {
                    $http.post(urls.BASE_API + '/signup', data).success(success).error(error);
                },
                signin: function (data, success, error) {
                    $http.post(urls.BASE_API + '/signin', data).success(success).error(error);
                },
                tokentest: function (data, success, error) {

                    $http.post(urls.BASE_API + '/dbtest', data).success(success).error(error);
                },
                logout: function (success) {
                    tokenClaims = {};
                    console.log("DELETING:");
                    console.log($localStorage.token);
                    delete $localStorage.token;
                    console.log("BUT StiLL:");
                    console.log($localStorage.token);
                    setTimeout(function(){ success(); }, 1000);

                  //  setTimeOut(2000,function() { success(); } );
                   
                },
                getTokenClaims: function () {
                    return tokenClaims;
                },
                getMyInfo: function() {
                    return $resource(
                    '/api/products/:id',
                        { id: '@id' },
                        { 'update': {method: 'PUT'} }
                    );
                },
                getWeather: function() {
                    // the $http API is based on the deferred/promise APIs exposed by the $q service
                    // so it returns a promise for us by default
                    return $http.get('http://fishing-weather-api.com/sunday/afternoon')
                        .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
                }
            };

    }]);
})(angular.module("calorific.auth"));
