'use strict';

angular.module('myWordPress.registration.registration-directive', [])

.directive('formValidate', [function() {

}])

.directive('passwordValidate', [function() {

	return {
		restrict: 'A',
		scope: true,
		require: 'ngModel',
		link: function (scope, element, attrs, controller){

			var blurred = false;

			var checker = function () {

				var password_element = scope.$eval(attrs.ngModel);
				var passwordConfirmation_element = scope.$eval(attrs.passwordValidate);

				return password_element == passwordConfirmation_element;
			};

			scope.$watch(checker, function (valid) {
				console.log("Valid: " + valid);
				controller.$setValidity("unique", valid);
			});
		}
}
	
}]);