(function(module) {

    module.controller('MacroController', ['$rootScope', '$scope', '$location', '$localStorage', 'Foods', function ($rootScope, $scope, $location, $localStorage,Foods) {
        var model = this;

        init();

        function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        }

        
        Foods.getMacros().then(function(response) {
            // array of macrosheets
                $scope.myMacros = response.data.macros[0];
                $scope.selectedMacro = $scope.myMacros[0];
                $scope.selectedBulk = $scope.selectedMacro.bulking;
            });

        $scope.changeMacro = function() {
            $scope.selectedMacro = $scope.selectedMacro;
            $scope.selectedBulk = $scope.selectedMacro.bulking;
        };

        $scope.clearMacro = function() {
           $scope.selectedMacro = {};
        };

        $scope.changeBulk = function() {
           console.log($scope.selectedBulk);
        };
        
        $scope.postMacros = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                var datasrc = $.param({
                    json: JSON.stringify({
                        selectedMacro: $scope.selectedMacro
                    })
                });
            Foods.setMacros(datasrc).then(function(response) {
                console.log("GOTBACKMACROS");
                console.log(response.data);
                window.location = "#/home";
            });
            }
            else {
                // form is invalid, don't submit
            }
        };

    }]);

}(angular.module("calorific.macro")));