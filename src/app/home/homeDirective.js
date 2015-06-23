(function(module) {
	module.directive('macrotable', function() {
   return {
    restrict: 'EA',
    require: '^ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'home/macrotable.tpl.html'
  };
});
	})(angular.module("calorific.home"));