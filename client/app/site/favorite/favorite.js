'use strict';


angular.module('myWordPress.gestionFavoris', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.editFavorite', {
		url: '/favorite/?success?editSuccess',
		templateUrl: 'site/favorite/index.html',
		controller: 'indexFavorisController',
		data: { 
            requireLogin: true
        }
	}).state('site.showFavorite', {
		url: '/favorite/:id',
		templateUrl: 'site/favorite/show.html',
		controller: 'showFavoriteController',
		data: { 
            requireLogin: true
        }
	});

}])

.controller('indexFavorisController', ['AddFavorite' ,'$localStorage', 'GetFavorite', '$scope', '$state','$stateParams', 'Article', function(AddFavorite, $localStorage, GetFavorite, $scope, $state, $stateParams, Article){
	
	if(typeof $localStorage.currentUser != 'undefined'){
    	$scope.id_user = $localStorage.currentUser._id;
    	console.log("id de user actuel"+ JSON.stringify($scope.id_user) );
	}
	
	GetFavorite.get({id : $scope.id_user}, function(res){
		$scope.favorite = res;	
		if (res.length ==0 ) { alert("vous n'avez pas encore d'article favoris!!")};
		console.log('liste des favorites :'+ JSON.stringify($scope.favorite));
	});

	$scope.success = $stateParams.success;
	$scope.editSuccess = $stateParams.editSuccess;

	$scope.deleteFavorite=function(articleId) {
		if (confirm("Voulez vous vraiment supprimer ce favoris?") == true) {
			AddFavorite.remove({id_user: $scope.id_user, id_art: articleId});	
			
			$scope.favorite = GetFavorite.get({id : $scope.id_user});

		}
    }

}]).controller('showFavoriteController', ['$scope', '$state','$stateParams', 'Article', function($scope, $state, $stateParams, Article){
	
	$scope.article = Article.get({id: $stateParams.id}, function(page) {
        console.log("get article "+$stateParams.id);
    });

    
}]);
