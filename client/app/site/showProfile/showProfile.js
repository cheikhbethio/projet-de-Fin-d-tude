'use strict'

angular.module('myWordPress.showProfile', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('site.showprofile', {
		url: '/showprofile/:id',
		templateUrl: 'site/showProfile/showProfile.html',
		controller: 'showProfileController',
	});

}])


.controller('showProfileController', ['$scope','$state', '$stateParams', '$localStorage', 'User_articles','User_comments', 'Profile', 'CurrentUser',
  function($scope, $state, $stateParams, $localStorage, User_articles, User_comments, Profile, CurrentUser){

        $scope.currentUser = CurrentUser;

        $scope.user = Profile.get({id: $stateParams.id}, function(user) {
            console.log("get user "+$stateParams.id);
            console.log(user);


            $scope.articles = User_articles.get({id:user._id}, function(articles){
                console.log("get articles for user_id: "+user._id);
            });
            $scope.comments = User_comments.get({id: user._id}, function(comments){
                console.log("get comments for user_id: "+user._id);
            });

            if(user.right===0){
                $scope.user_statut = 'Membre';
            }
            else if(user.right===1){
                $scope.user_statut = 'Rédacteur'; 
            }
            else if(user.right===2){
                $scope.user_statut = 'Moderateur'; 
            }
            else if(user.right===3){
              $scope.user_statut = 'Administrateur'; 
            }
        });

        $scope.editFavorite= function(){
            $state.go('site.editFavorite');

        }
        
        $scope.editprofile= function(){
            $state.go('site.editprofile');

        }

    }]);

