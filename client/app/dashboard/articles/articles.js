'use strict';


angular.module('myWordPress.admin.article', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('dashboard.indexArticle', {
			url: '/article/?success?editSuccess',
			templateUrl: 'dashboard/articles/index.html',
			controller: 'indexArticleController'
		})
		.state('dashboard.createArticle', {
			url: '/article/create',
			templateUrl: 'dashboard/articles/create.html',
			controller: 'createArticleController'
		})
		.state('dashboard.editArticle', {
			url: '/article/:id/edit',
			templateUrl: 'dashboard/articles/edit.html',
			controller: 'editArticleController'
		})
		.state('dashboard.showArticle', {
			url: '/article/:id',
			templateUrl: 'dashboard/articles/show.html',
			controller: 'showArticleController'
		});

}])

.controller('indexArticleController', ['$scope', '$state','$stateParams', 'Article', 'dialogs',
	function($scope, $state, $stateParams, Article, dialogs){
	
	$scope.articles = Article.query();

	$scope.success = $stateParams.success;
	$scope.editSuccess = $stateParams.editSuccess;

	$scope.closeAlert = function() {
        $scope.success = false;
        $scope.editSuccess = false;
    };

	$scope.deleteArticle=function(articleIndex) {

		console.log("Article: " + JSON.stringify($scope.articles[articleIndex]));

		var dlg = dialogs.create('components/dialogs/adminPage/confirmation_dialog.html', 
		'deleteArticleDialogController', 
		{ articletitle: $scope.articles[articleIndex].title },
		'lg');

		dlg.result.then(function(){
			Article.remove({id: $scope.articles[articleIndex]._id }, function(removed_article){
				$scope.articles.splice(articleIndex, 1);
			});
		});
    };

}])

.controller('deleteArticleDialogController', function($scope, $modalInstance, data){

		$scope.articletitle = data.articletitle;
		console.log("Title: " + $scope.articletitle);

		console.log("Title: ");
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		};
		
		$scope.save = function(){
			$modalInstance.close();
		};

})


.controller('createArticleController', ['$scope', '$state','$stateParams', 'Article', 'CurrentUser', function($scope, $state, $stateParams, Article, CurrentUser){
	
	$scope.user = CurrentUser;

	$scope.addArticle = function() {
		if ($scope.createArticleForm.$valid){ 
			if(typeof $scope.ispublic === 'undefined')
				$scope.ispublic = false;
			
			var newArticle={
				title: $scope.title,
				author : CurrentUser.currentUser()._id,
				date : Date.now(),
				content: $scope.htmlVariable,
				ispublic : $scope.ispublic,
				keywords : $scope.keywords
			};

			Article.save(newArticle);
			$state.go('dashboard.indexArticle', {success:true});
		} else {
			console.log('Formulaire Invalide.');
		}
	}

}]).controller('editArticleController', ['$scope', '$state','$stateParams', 'Article', function($scope, $state, $stateParams, Article){
	
	$scope.article = Article.get({id: $stateParams.id}, function(page) {
        console.log("get article "+$stateParams.id);
    });

    $scope.editArticle = function(){
    	if ($scope.editArticleForm.$valid){ 
	    	Article.update({id: $stateParams.id}, $scope.article);
	    	$state.go('dashboard.indexArticle', {editSuccess:true});
	   	} else {
			console.log('Formulaire Invalide.');
		}
    }

}]).controller('showArticleController', ['$scope', '$state','$stateParams', 'Article', function($scope, $state, $stateParams, Article){
	
	$scope.article = Article.get({id: $stateParams.id}, function(page) {
        console.log("get article "+$stateParams.id);
    });
    
}]);
