'use strict';


angular.module('myWordPress.editPage', ['ui.router', 'contenteditable'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.editPage', {
		url: '/page/:id/edit',
		templateUrl: 'dashboard/adminPage/editPage.html',
		controller: 'editPageController'
	}).state('dashboard.editHome', {
        url: '/page/home/edit',
        templateUrl: 'dashboard/adminPage/editHome.html',
        controller: 'editPageHomeController'
    });

}])

.controller('editPageController', ['$scope', 'Page','PageArticle','Article','$state','$stateParams', 'CurrentUser',
    function($scope,Page,PageArticle,Article, $state,$stateParams, CurrentUser){
    	
        $scope.page = Page.get({id: $stateParams.id}, function(page) {
            console.log("get page "+$stateParams.id);
        });

        $scope.editTitle=$scope.page.title;
        $scope.isEdit=false;
        $scope.boolArticle=false;
        $scope.articles=Article.query();
        $scope.user = CurrentUser;

         $scope.valid=function(){
         	var npage={
         	id : $scope.page._id,
         	title : $scope.editTitle
         	};
         	Page.update({id: $stateParams.id},npage);
         	$scope.isEdit=false;
         	$scope.page = Page.get({id: $stateParams.id}, function(page) {
                console.log("get page "+$stateParams.id);
            });
         };


        $scope.modeArticle=function(editable){
        	$scope.boolArticle=editable;
        };

        $scope.switchEdit= function(editable){
            $scope.isEdit=editable;
        };

        $scope.delArticle=function(idArt){
        	PageArticle.remove({id:$stateParams.id,idart: idArt});
            $scope.page = Page.get({id: $stateParams.id}, function(page) {});
        }
     	

        $scope.addArticle=function(idArt,article){
        	PageArticle.update({id:$stateParams.id,idart: idArt},article);
        	$scope.page = Page.get({id: $stateParams.id}, function(page) {});
        }

}]);