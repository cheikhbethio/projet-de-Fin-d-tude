'use strict';


angular.module('myWordPress.Statistiques', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.statistiques', {
		url: '/statistiques',
		templateUrl: 'dashboard/statistiques/indexStatistiques.html',
		controller: 'indexStatistiquesController'
	});

}])

.controller('indexStatistiquesController', ['StateComment', 'StateArticles', 'StatePage', 'StateMember', 'StateWriter', 'StateModerateur','StateAdmin','$scope', '$state','$stateParams', 'Article', 
	function(StateComment, StateArticles, StatePage, StateMember, StateWriter, StateModerateur, StateAdmin, $scope, $state, $stateParams, Article){
	
	$scope.nbTotal = 0;
	
	StateAdmin.get(function(resp){
		$scope.nbAdmin = resp.res; 
		$scope.nbTotal +=   $scope.nbAdmin ; 
	}); 	

	StateModerateur.get(function(resp){
		$scope.nbModerator = resp.res;
		$scope.nbTotal +=  $scope.nbModerator;
	});	

	StateWriter.get(function(resp){
		$scope.nbWriter = resp.res;
		$scope.nbTotal +=   $scope.nbWriter;
	});

	StateMember.get(function(resp){
		$scope.nbMember = resp.res;
		$scope.nbTotal +=   $scope.nbMember; 
	});

	StateComment.get(function(resp){
		$scope.nbCommentaires = resp.res;
	});

	StateArticles.get(function(resp){
		$scope.nbArticles = resp.res;
	});

	StatePage.get(function(resp){
		$scope.nbPages = resp.res;
	});

	//$scope.nbTotal = $scope.nbAdmin + $scope.nbMember + $scope.nbWriter + $scope.nbModerator;


	$scope.EditParticipate=function() {
		$state.go('dashboard.listMember');
		console.log('test controller');
    }

}]);
