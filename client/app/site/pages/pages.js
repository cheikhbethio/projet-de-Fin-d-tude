'use strict';


angular.module('myWordPress.pages', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.pages', {
		url: '/page/:id?connectionSuccess',
		templateUrl: 'site/pages/pages.html',
		controller: 'pagesController'
	});

}])

.controller('pagesController', ['$scope', '$state', '$stateParams', 'Page','AddFavorite', 'Article', 'CurrentUser', 'User',
	function($scope, $state, $stateParams, Page, AddFavorite, Article, CurrentUser, User){

		$scope.connectionSuccess = $stateParams.connectionSuccess;

		$scope.user = CurrentUser;

		if(CurrentUser.isLoggedIn()){
	    	$scope.id_user = CurrentUser.currentUser()._id;
		}

		$scope.isFavorite=[];
		$scope.mypage;
		$scope.page = Page.get({id: $stateParams.id}, function(page) {
	        $scope.mypage = page.content;
	        var tempo = page.content;
	        var bool = false;

			User.get({id :$scope.id_user}, function(res){
				$scope.ListFavorite = res.favorite;
		        
		        for(var i = 0; i < tempo.length; i++){
		        	 for (var j = 0; j < $scope.ListFavorite.length; j++) {
		        	 	if($scope.ListFavorite[j] == tempo[i]._id){
		        	 		bool = true;
		        	 	}
		        	 }
		        	$scope.isFavorite[i]=bool;  
		        	bool = false;
		        };
			});

	    });

		$scope.pushFavoris=function(id_article){
			
			AddFavorite.update({id_user: $scope.id_user, id_art: id_article}, {});
			
			User.get({id :$scope.id_user}, function(res){
				$scope.ListFavorite = res.favorite;
		        var temp = $scope.mypage;
		        var bool=false;
		        for(var i = 0; i < temp.length; i++){
		        	 for (var j = 0; j < $scope.ListFavorite.length; j++) {
		        	 	if($scope.ListFavorite[j] == temp[i]._id){
		        	 		bool = true;
		        	 	}
		        	 }
		        	$scope.isFavorite[i]=bool;  
		        	bool = false;
		        };
			});
		};

		$scope.popFavoris=function(id_article){

			AddFavorite.remove({id_user: $scope.id_user, id_art: id_article});

			User.get({id :$scope.id_user}, function(res){
				$scope.ListFavorite = res.favorite;
		        var temp = $scope.mypage;
		        var bool=false;
		        for(var i = 0; i < temp.length; i++){
		        	 for (var j = 0; j < $scope.ListFavorite.length; j++) {
		        	 	if($scope.ListFavorite[j] == temp[i]._id){
		        	 		bool = true;
		        	 	}
		        	 }
		        	$scope.isFavorite[i]=bool;  
		        	bool = false;
		        };
			});
		};

		$scope.closeAlert = function() {
			$scope.connectionSuccess = false;
		};
}]);