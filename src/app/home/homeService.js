(function(module) {
 module.factory('Foods', ['$resource','$http','$localStorage','urls','$q','$location',function($resource,$http,$localStorage,urls,$q,$location) {
    return {
        testo: function() {
            return true;
        },
        list: function() {
            console.log("get list of all the foods in the index");
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/foodlist')
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
        todaysFoods: function(datasrc) {
            console.log("today's foods");
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/todaysfoods',datasrc)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
        changeBulk: function(item) {
            // change bulking function
            console.log("changing between bulk and refresh");
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/changebulk',item)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
        
        changeWorkout: function(item) {
            // change workout function
            console.log("changing between workout and rest");
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/changeworkout',item)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },

        addNewFood: function(formData) {
            console.log("adding food and refresh");
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/addnewfood',formData)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },

        addFood: function(item) {
            var deferred = $q.defer();
                console.log("adding food and refresh things");  
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                $http.post(urls.BASE_API + '/addfood',item)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
           
        },

        changeDate: function(item) {
            // change date function
            console.log("changing date and refresh");
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/changedate',item)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },

        changeSummaryDate: function(item) {
            // change date function
            console.log("change summary date and refresh");
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/changesummarydate',item)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
         
        removeFood: function(datasrc) {
            console.log("remove food and refresh");
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/removefood',datasrc)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
        foodDiary: function() {
            console.log("fetch foods in diary format");
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/fooddiary')
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
         todaysMacros: function(datasrc) {
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            
            console.log("fetching todays macros");
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/todaysmacros',datasrc)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },
             
        summaryItems: function() {
            var deferred = $q.defer();
            $http.post(urls.BASE_API + '/summary')
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },

        getMacros: function() {
            var deferred = $q.defer();
             $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            
            $http.post(urls.BASE_API + '/getmacros')
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        },

        setMacros: function(datasrc) {
            var deferred = $q.defer();
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(urls.BASE_API + '/changemacros',datasrc)
                .success(function(data) {
                    deferred.resolve({
                        data: data.data.dataitem
                    });
            }).error(function(msg, code) {
                deferred.reject(msg);
                console.log("Error!");
                //$log.error(msg, code);
            });
            return deferred.promise;
        }     
    };
}]);
module.factory("globalScope",function(){
    return {};
});
 //['$resource','$http','$localStorage','urls','$q','$location',function($resource,$http,$localStorage,urls,$q,$location) {

})(angular.module("calorific.home"));