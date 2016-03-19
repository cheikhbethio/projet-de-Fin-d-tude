'use strict';


angular.module('myWordPress.site.home', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.home', {
		url: '/?connectionSuccess',
		controller: 'siteHomeController'
	});

}])

.controller('siteHomeController', ['$scope', '$state', '$stateParams', 'Article', 'CurrentUser', 'User', 'AddFavorite',
	function($scope, $state, $stateParams, Article, CurrentUser, User, AddFavorite){
		
		$state.go('site.pages', {id:"home", connectionSuccess:$stateParams.connectionSuccess});
}]);
