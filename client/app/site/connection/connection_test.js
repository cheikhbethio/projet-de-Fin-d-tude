'use strict';

describe("Connection", function() {

  beforeEach(module('myWordPress'));

 	var $controller;
  var $rootScope;
  var $injector;
  var $httpBackend;
  var $localStorage;

	beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _$localStorage_){
		$controller = _$controller_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $localStorage = _$localStorage_;
	}));

  describe('initialy', function(){

		var scope, controller;

  		beforeEach(function(){
  			scope = $rootScope.$new();
    		controller = $controller('connectionController', { $scope: scope });
  		});

  		it('should have a connectionController', function(){
        expect('myWordPress.connectionController').toBeDefined();
		  });

      it('$scope.connectionError should be false', function(){
        expect(scope.connectionError).toBe(false);
      });

      it('should start with an undefined new user model', function(){
        expect(scope.userCredentials).toEqual({});
      });
      
  	});

  describe('when login and password are entered', function(){

    var scope, controller;

    beforeEach(function(){
      scope = $rootScope.$new();

      controller = $controller('connectionController', { $scope: scope });
    });

    it('and the credentials are correct', function(){

      var aUser = {
        'login': 'aUser' ,
        'password': 'xxx',
        'firstname': 'user01',
        'lastname': 'user01',
        'email': 'user01@mywp.com',
        'right': 1
      };

      var someCredentials = {
        login: 'aUser',
        password: 'xxx'
      }

      scope.userCredentials.login = 'aUser';
      scope.userCredentials.password = 'aPassword';

      //scope.connectionForm

      $httpBackend.when('POST', 'http://localhost:4711/api/token').
          respond({ token: 'xxx', user: aUser });

      //scope.credentials = someCredentials;
      scope.connectUser();

      $httpBackend.flush();

    });

  });

  	/*describe('reset', function(){

  		var $scope, controller;

  		var incompleteFakeUser = {
        firstName:'John', 
        lastName:'Do'
    	};

  		beforeEach(function(){
  			$scope = {};
    		controller = $controller('registrationController', { $scope: $scope });
    		
  		});

  		it('should reset the newUser', function(){
        $scope.newUser = incompleteFakeUser;

  			expect($scope.newUser).toEqual(incompleteFakeUser);
  			$scope.resetRegistrationForm();
  			expect($scope.newUser).toEqual({});
		  });

  	});

  	describe('save', function(){

  		var $scope, controller;

  		var correctFakeUser = {
        firstName:'John', 
        lastName:'Do',
        login: 'johnDo',
        email: 'johnDo@do.com',
        password: 'do',
        passwordConfirmation: 'do'
    	};

      var nonMatchingPassFakeUser = {
        firstName:'John', 
        lastName:'Do',
        login: 'johnDo',
        email: 'johnDo@do.com',
        password: 'do',
        passwordConfirmation: 'dop'
      };

  		beforeEach(function(){
  			$scope = {};
    		controller = $controller('registrationController', { $scope: $scope });
  		});

      it('should set the nonMatchingPwd to true if the passwords dont match', function(){


      });

  	});*/

});

