'use strict';


angular.module('myWordPress.admin.home', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.home', {
		url: '/',
		templateUrl: 'dashboard/home/index.html',
		controller: 'homeController'
	});

}])

.controller('homeController', ['$scope', '$state','$stateParams','LastArticle','LastComment', function($scope, $state, $stateParams,LastArticle,LastComment){
	 $scope.lastArticles = LastArticle.getLast();
	 $scope.lastComments = LastComment.getLast();

}]);
