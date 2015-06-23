(function(module) {
    module.controller('HomeController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth', function ($rootScope, $scope, $location, $localStorage, Auth) {
        function success(res) {
        }
        $scope.logout = function() {
            Auth.logout(function() {
                window.location = "/";
            });
        };
        function tokenTester() {
            var formData = {
            };

            Auth.tokentest(formData, successAuth2, function () {
                delete $localStorage.token;
                $location.path('/auth');
                $rootScope.error = 'Invalid returned credentials.';
            });
        }
    }]);

    module.controller('TodayController', ['$rootScope', '$scope', '$location', '$localStorage', 'Foods','globalScope', function ($rootScope, $scope, $location, $localStorage,Foods,globalScope) {
        $scope.globalScope = globalScope;
        function successTodaysmacros(res) {
            var resr = res.data;
            $scope.globalScope.macros = res;
            //$scope.globalScope.summarydate = $scope.globalScope.macros.thedate;
           
            if ($scope.globalScope.macros.kcsofar>$scope.globalScope.macros.kclimit) {
                $scope.globalScope.macros.kcsofarbg = "#990000";
            }
            else {
                $scope.globalScope.macros.kcsofarbg = "#006600";
            }
            if ($scope.globalScope.macros.protsofar>$scope.globalScope.macros.protlimit) {
                $scope.globalScope.macros.protsofarbg = "#990000";
            }
            else {
                $scope.globalScope.macros.protsofarbg = "#006600";
            }
            if ($scope.globalScope.macros.carbsofar>$scope.globalScope.macros.carblimit) {
                $scope.globalScope.macros.carbsofarbg = "#990000";
            }
            else {
                $scope.globalScope.macros.carbsofarbg = "#006600";
            }
            if ($scope.globalScope.macros.fatsofar>$scope.globalScope.macros.fatlimit) {
                $scope.globalScope.macros.fatsofarbg = "#990000";
            }
            else {
                $scope.globalScope.macros.fatsofarbg = "#006600";
            }
        }

        // functions for Bootstrap-UI datepicker
        $scope.today = function() {
            $scope.globalScope.todaysdate = new Date();
        };
        $scope.today();
        $scope.todaysMacros = function () {
            var datasrc = $.param({
                json: JSON.stringify({
                  //  date: $scope.todaysdate
                }),
                todaydate: $scope.globalScope.todaysdate
            });
            Foods.todaysMacros(datasrc).then(function(response) {
                successTodaysmacros(response.data);
            });
        };

        $scope.todaysMacros();

        $scope.changeDate = function(isValid) {
            var datasrc = $.param({
            json: JSON.stringify($scope.globalScope.todaysdate),
                todaydate: $scope.globalScope.todaysdate
            });
            Foods.changeDate(datasrc).then(function(response) {
                if (response.data=="empty foods") {
                    $scope.globalScope.todaysfoodItems = [];
                }
                else {
                    $scope.globalScope.todaysfoodItems = response.data;
                }
                $scope.todaysMacros();
            });

            newdate = $scope.globalScope.todaysdate;  
        };

        $scope.clear = function () {
            $scope.globalScope.summarydate = null;
        };

        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        };
        // end of Datepicker functions
    }]);

    module.controller('TodayFoodController', ['$rootScope', '$scope', '$location', '$localStorage','Foods', 'globalScope', function ($rootScope, $scope, $location, $localStorage,Foods,globalScope) {
        $scope.globalScope = globalScope;
        var datasrc = $.param({
            json: JSON.stringify($scope.globalScope.todaysdate),
            todaydate:$scope.globalScope.todaysdate
        });
        Foods.todaysFoods(datasrc).then(function(response) {
            if (response.data!=="empty foods") {
                $scope.globalScope.todaysfoodItems = response.data;
            }
        });
        $scope.removeFood = function(item) {
            var datasrc = $.param({
                json: JSON.stringify(item),
                todaydate: $scope.globalScope.todaysdate
            });
            Foods.removeFood(datasrc).then(function(response) {
                $scope.globalScope.getMacros();
                if (response.data!=="removal") {
                    $scope.globalScope.todaysfoodItems = response.data;
                    $scope.todaysMacros();
                }
                else {
                    $scope.globalScope.todaysfoodItems = [];
                    $scope.todaysMacros();
                }
            });
        };
    }]);

    module.controller('AddFoodController', ['$rootScope', '$scope', '$location', '$localStorage','Foods', function ($rootScope, $scope, $location, $localStorage,Foods) {
        $scope.selected = undefined;
        $scope.foodItems = Foods.list().then(function(response) {
            $scope.foodItems = response.data;
        });
        $scope.radioModelrest = "workout";

        $scope.workoutType = function(isValid) {
                var datasrc = $.param({
                json: JSON.stringify({
                    workoutType: $scope.radioModelrest
                }),
                    todaydate: $scope.globalScope.todaysdate
            });
            Foods.changeWorkout(datasrc).then(function(response) {
                });
        };

        $scope.addNewFood = function(isValid) {
            if (isValid) {
                var datasrc = $.param({
                json: JSON.stringify({
                    foodname: $scope.addform.foodname,
                    protein: $scope.addform.protein,
                    calories: $scope.addform.calories,
                    fats: $scope.addform.fats,
                    carbs: $scope.addform.carbs
                }),
                todaydate: $scope.globalScope.todaysdate
            });
            Foods.addNewFood(datasrc).then(function(response) {
                $scope.todaysMacros();
                $scope.foodItems = response.data.totalfoods;
                $scope.globalScope.todaysfoodItems = response.data.dataitem;
                });
            }
            else {
                // form is invalid, don't submit
            }
        };

        $scope.onAddFoodSelect = function(val) {
            foodobj = {"name":val.name,"id":val.id};
            $scope.thisfood=foodobj;
        };

        $scope.addFood = function(type) {
            var formData;
            if (type=='list') {
                foodobj = {"name":$scope.selectedItemlist.name,"id":$scope.selectedItemlist.id};
                $scope.thisfood=foodobj;
                var mynewdate = $scope.globalScope.todaysdate;
                formData = {
                    food: $scope.thisfood,
                    date: mynewdate,
                    mymacro_id: $scope.mymacro_id,
                    type: $scope.radioModelrest
                };            
            }
            if (type=='input') {
                formData = {
                    food: $scope.thisfood
                };
            }
            var datasrc = $.param({
                json: JSON.stringify(formData),
                todaydate: $scope.globalScope.todaysdate
            });
            Foods.addFood(datasrc).then(function(response) {
                $scope.todaysMacros();
                $scope.globalScope.getMacros();
                $scope.globalScope.todaysfoodItems = response.data;
            });
        };
    }]);

    module.controller('SummaryController', ['$rootScope', '$scope', '$location', '$localStorage', 'Foods', 'globalScope',function ($rootScope, $scope, $location, $localStorage,Foods,globalScope) {
        $scope.globalScope = globalScope;

        // alert("let's get going!");
        $scope.today = function() {
            $scope.globalScope.summarydate = new Date();
        };
        $scope.today();


        function successAuthmacros(res) {
           var resr = res.data.dataitem;
           $scope.globalScope.macrosummary = resr;
           return resr;
        }

        $scope.radioModelbulk = "Cutting";
        $scope.globalScope.getMacros = function () {
                var formData = {
                    email: $scope.email,
                    password: $scope.password
                };

            Foods.summaryItems().then(function(response) {
                $scope.globalScope.summarydate = new Date(response.data.macrosummary.data.dataitem.thedate);
                $scope.radioModelbulk = response.data.macrosummary.data.dataitem.bulking;
                $scope.globalScope.macrosummary = response.data.macrosummary.data.dataitem;
                if ($scope.globalScope.macrosummary.kcsofar>$scope.globalScope.macrosummary.kclimit) {
                    $scope.globalScope.macrosummary.kcsofarbg = "#990000";
                }
                else {
                    $scope.globalScope.macrosummary.kcsofarbg = "#006600";
                }
                if ($scope.globalScope.macrosummary.protsofar>$scope.globalScope.macrosummary.protlimit) {
                    $scope.globalScope.macrosummary.protsofarbg = "#990000";
                }
                else {
                    $scope.globalScope.macrosummary.protsofarbg = "#006600";
                }
                if ($scope.globalScope.macrosummary.carbsofar>$scope.globalScope.macrosummary.carblimit) {
                    $scope.globalScope.macrosummary.carbsofarbg = "#990000";
                }
                else {
                    $scope.globalScope.macrosummary.carbsofarbg = "#006600";
                }
                if ($scope.globalScope.macrosummary.fatsofar>$scope.globalScope.macrosummary.fatlimit) {
                    $scope.globalScope.macrosummary.fatsofarbg = "#990000";
                }
                else {
                    $scope.globalScope.macrosummary.fatsofarbg = "#006600";
                }

            });
        };

        $scope.globalScope.getMacros();

        $scope.changeBulk = function() {
            var datasrc = $.param({
                json: JSON.stringify($scope.radioModelbulk)
            });
            Foods.changeBulk(datasrc).then(function(response) {
            });
        };
        $scope.changeDateSummary = function() {
            var datasrc = $.param({
                json: JSON.stringify($scope.globalScope.summarydate)
            });
            Foods.changeSummaryDate(datasrc).then(function(response) {
                $scope.globalScope.getMacros();
                $scope.todaysMacros();
            }); 
        };
    }]);

    module.controller('HeaderController', ['$rootScope', '$scope', '$location', '$localStorage', function ($rootScope, $scope, $location, $localStorage) {
    }]);

    module.controller('FoodDiaryController', ['$rootScope', '$scope', '$location', '$localStorage','Foods', function ($rootScope, $scope, $location, $localStorage,Foods) {
        Foods.foodDiary().then(function(response) {
            $scope.diaryList = response.data;
        });
    }]); 

    
// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("calorific.home")));