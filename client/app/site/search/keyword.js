'use strict';


angular.module('myWordPress.site.searchKeyWord', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.searchKeyWord', {
		url: 'article/search',
		templateUrl: 'site/search/searchShow.html',
		controller: 'siteSearchController',
		params: {keywords : {array : true}}
	})

}])

.controller('siteSearchController', ['$scope', '$state','$stateParams', 'KeyWord', function($scope, $state, $stateParams, KeyWord){
	
	var search= $stateParams.keywords;
	$scope.search=search;

	$scope.articles = KeyWord.get({keyword: search});

}]);$