'use strict';


angular.module('myWordPress.listMember', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.listMember', {
		url: '/members',
		templateUrl: 'dashboard/listeMembre/listMember.html',
		controller: 'listMemberController'
	});

}])

.controller('listMemberController', ['$scope', 'User','Right', '$state','$stateParams', 'CurrentUser',
	function($scope, User, Right, $state, $stateParams, CurrentUser){

	$scope.currentUser = CurrentUser;
	
	User.query(function(users){
		$scope.users = users;
	});

	$scope.rights = [
		{rightNumber: 0, name: 'Membre'},
		{rightNumber: 1, name: 'Rédacteur'},
		{rightNumber: 2, name: 'Moderateur'}, //Modérateur non géré par l'application, ligne écrite par cohérence. Filtré dans le html.
		{rightNumber: 3, name: 'Administrateur'}
	];

	$scope.editedUser = false;
    
    $scope.saveUserRight = function(selectedRight) {
    	
    	var id = {id : $scope.editedUser._id};
    	var update = {right : selectedRight.rightNumber};

    	Right.update(id, update, function(res){
    		$scope.editedUser.right = res.result.right;
    		$scope.setEditUserMode(false);
    	});
   };

	$scope.setEditUserMode = function(user) {

		if(user === false)
			$scope.editedUser = false;
		else
			$scope.editedUser = user;
	}

}]);
