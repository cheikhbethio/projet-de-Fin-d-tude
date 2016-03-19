'use strict';


angular.module('myWordPress.site.article', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.showArticle', {
		url: '/article/:id?isfavorite',
		templateUrl: 'site/articles/show.html',
		controller: 'siteArticleController'
	})

}])

.controller('siteArticleController', ['User','$scope', '$state','$stateParams',"$localStorage", 'Article','Commentaire', 'AddFavorite', 'CurrentUser',
 function(User, $scope, $state, $stateParams,$localStorage, Article, Commentaire, AddFavorite, CurrentUser){
	
	//$scope.isfavorite;
	$scope.user = CurrentUser;

	if(typeof $localStorage.currentUser != 'undefined'){
    	$scope.id_user = $localStorage.currentUser._id;
    	console.log($scope.id_user );
	}

    $scope.boolformulaire = false;
	$scope.isFavorite=false;
   
	$scope.article = Article.get({id: $stateParams.id}, function(page) {
        console.log("get article "+$stateParams.id);
		console.log("id de l'article: " + JSON.stringify(page._id));

		User.get({id :$scope.id_user}, function(res){
			$scope.ListFavorite = res.favorite;
			var bool = false;
			console.log("id de l'article: " + JSON.stringify(page._id));
			for (var i = 0; i <$scope.ListFavorite.length; i++) {
				if ($scope.ListFavorite[i] == page._id) {
					console.log("cool");
					bool = true;
				};
				console.log($scope.ListFavorite[i]);
			};
			$scope.isFavorite=bool;
		});
    
    });
/////////////////////////////Favoris hyper chiant////////////////////////////////////////
	/*
	User.get({id :$scope.id_user}, function(res){
		$scope.ListFavorite = res.favorite;
		var bool = false;
		console.log("id de l'article: " + JSON.stringify($scope.article._id));
		for (var i = 0; i <$scope.ListFavorite.length; i++) {
			if ($scope.ListFavorite[i] == $scope.article._id) {
				console.log("cool");
				bool = true;
			};
			console.log($scope.ListFavorite[i]);
		};
		$scope.isFavorite=bool;
	});*/

	$scope.pushFavoris=function(art){
		console.log('push Favoris');
		console.log("id de l'article recu en parametre: " + JSON.stringify(art));
		console.log("la liste des favorite avant le push Favoris: " + JSON.stringify($scope.ListFavorite));

		AddFavorite.update({id_user: $scope.id_user, id_art: art}, {});
		
		User.get({id :$scope.id_user}, function(res){
			$scope.ListFavorite = res.favorite;
			var boole =false
			for (var i = 0; i <$scope.ListFavorite.length; i++) {
				if ($scope.ListFavorite[i] == art) {
					console.log("cool");
					boole = true;
				};
			};
			$scope.isFavorite=boole;
		});	
	};

	$scope.popFavoris=function(art){
		console.log('popFavoris');
		console.log("id de l'article recu en parametre: " + JSON.stringify(art));
		console.log("la liste des favorite avant le popFavoris: " + JSON.stringify($scope.ListFavorite));

		AddFavorite.remove({id_user: $scope.id_user, id_art: art});
		
		User.get({id :$scope.id_user}, function(res){
			$scope.ListFavorite = res.favorite;
			var boole =false
			for (var i = 0; i <$scope.ListFavorite.length; i++) {
				if ($scope.ListFavorite[i] == art) {
					console.log("cool");
					boole = true;
				};
			};
			$scope.isFavorite=boole;
		});	
	};

/////////////////////////////////////////////////
    $scope.addComment=function(){

    	var newComment={
			author : CurrentUser.currentUser()._id,
			article :$scope.article._id,
			date : Date.now(),
			content : $scope.comment.content
		};

		Commentaire.save(newComment, function(res){

			Commentaire.get({id: $stateParams.id},function(res){
				$scope.commentList = res;
			});

			$scope.comment.content = "";
			$scope.boolformulaire=false;
		});
	};

    $scope.modeFormulaire = function(editable){
        $scope.boolformulaire=editable;
    };

    $scope.commentList = Commentaire.get({id: $stateParams.id},function(){
    	console.log('');
    });

}]);
