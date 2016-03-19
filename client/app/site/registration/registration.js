'use strict';


angular.module('myWordPress.registration', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.registration', {
		url: '/registration',
		templateUrl: 'site/registration/registration.html',
		controller: 'registrationController'
	});

}])

.controller('registrationController', ['$scope', 'User', '$state',
	function($scope, User, $state){

		$scope.newUser = {};

		$scope.loginAlreadyUsed = false;
		$scope.emailAlreadyUsed = false;

		$scope.invalidForm = false;

		$scope.nonMatchingPwd = false;

		$scope.saveNewUser = function() {

		  	if ($scope.registrationForm.$valid) {

		    	if($scope.newUser.password === $scope.newUser.passwordConfirmation){

		    		var nuser =  {
						firstname: $scope.newUser.firstName,
						lastname: $scope.newUser.lastName, 
						login: $scope.newUser.login,
						email: $scope.newUser.email,
						password: $scope.newUser.password
					};

		    		User.save(nuser, function(resp) {
						if(resp.error == 0){
							console.log("Successfuly posted: " + resp.error);
							$state.go('site.connection', {registration : true});
						}else if( resp.error == 1){
							$scope.emailAlreadyUsed = true;
						}else if(resp.error == 2){
							$scope.loginAlreadyUsed = true;
						}

					}, function(error){
						console.log("Response: " + error);
					});

		    	}
		    	else{
		    		$scope.nonMatchingPwd = true;
		    		console.log("the passwords don't match !!");
		    	}
		  	}
		  	else{
		  		console.log("Invalide form: ");
		  		$scope.invalidForm = true;
		  	}

		  	console.log($scope.newUser);
		};

		$scope.resetRegistrationForm = function() {
			$scope.newUser = {};

			$scope.loginAlreadyUsed = false;
			$scope.emailAlreadyUsed = false;

			$scope.nonMatchingPwd = false;;
  		};

  		/* For debugging purposes only */
  		var printNewUser = function(newUser){
  			console.log("User lastName: " + newUser.lastName);
  			console.log("User firstName: " + newUser.firstName);
  			console.log("User email: " + newUser.email);
  			console.log("User password: " + newUser.password);
  			console.log("User passwordConfirmation: " + newUser.passwordConfirmation);
  		};

  		$scope.closeAlert = function() {
			$scope.invalidForm = false;
		};

}]);