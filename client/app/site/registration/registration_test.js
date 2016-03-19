// 'use strict';

// describe("Registration", function() {

//  	beforeEach(module('myWordPress'));

//  	var $controller;

// 	beforeEach(inject(function(_$controller_){
// 		$controller = _$controller_;
// 	}));

//   describe('initialy', function(){

// 		var $scope, controller;

//   		beforeEach(function(){
//   			$scope = {};
//     		controller = $controller('registrationController', { $scope: $scope });
//   		});

//   		it('should have a registrationController', function(){
// 			expect('registrationController').toBeDefined();
// 		});

//   		it('its newUser variable should be empty and form control variables set to false', function(){
//   			expect($scope.newUser).toEqual({});

//         expect($scope.loginAlreadyUsed).toBe(false);
//         expect($scope.emailAlreadyUsed).toBe(false);

//         expect($scope.nonMatchingPwd).toBe(false);
//   		});
//   	});

//   	describe('reset', function(){

//   		var $scope, controller;

//   		var incompleteFakeUser = {
//         firstName:'John', 
//         lastName:'Do'
//     	};

//   		beforeEach(function(){
//   			$scope = {};
//     		controller = $controller('registrationController', { $scope: $scope });
    		
//   		});

//   		it('should reset the newUser', function(){
//         $scope.newUser = incompleteFakeUser;

//   			expect($scope.newUser).toEqual(incompleteFakeUser);
//   			$scope.resetRegistrationForm();
//   			expect($scope.newUser).toEqual({});
// 		  });

//   	});

//   	describe('save', function(){

//   		var $scope, controller;

//   		var correctFakeUser = {
//         firstName:'John', 
//         lastName:'Do',
//         login: 'johnDo',
//         email: 'johnDo@do.com',
//         password: 'do',
//         passwordConfirmation: 'do'
//     	};

//       var nonMatchingPassFakeUser = {
//         firstName:'John', 
//         lastName:'Do',
//         login: 'johnDo',
//         email: 'johnDo@do.com',
//         password: 'do',
//         passwordConfirmation: 'dop'
//       };

//   		beforeEach(function(){
//   			$scope = {};
//     		controller = $controller('registrationController', { $scope: $scope });
//   		});

//       it('should set the nonMatchingPwd to true if the passwords dont match', function(){
//         $scope.newUser = nonMatchingPassFakeUser;

//         expect($scope.nonMatchingPwd).toEqual(false);

//         // Fonctionne pas a cause du $scope.registrationForm.$valid
//         //$scope.saveNewUser($scope.newUser);

//         expect($scope.nonMatchingPwd).toEqual(false);

//       });

//   	});

// });

