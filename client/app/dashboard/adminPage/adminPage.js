'use strict';


angular.module('myWordPress.adminPage', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.adminPage', {
		url: '/page',
		templateUrl: 'dashboard/adminPage/adminPage.html',
		controller: 'adminPageController'
	});

}])

.controller('adminPageController', ['$scope', 'Page', '$state','$stateParams','ngToast', 'dialogs', 'CurrentUser',
	function($scope, Page, $state, $stateParams, ngToast, dialogs, CurrentUser){
	
	$scope.pages = Page.query();
	$scope.home = Page.get({ id: "home"});

	$scope.user = CurrentUser;
	
	$scope.deletepage=function(pageIndex) {

		var dlg = dialogs.create('./components/dialogs/adminPage/confirmation_dialog.html', 
		'deletePageDialogController',
		{pagetitle: $scope.pages[pageIndex].title}, 
		'lg');

		dlg.result.then(function(){
			Page.remove( {id: $scope.pages[pageIndex]._id}, function(success){
				$scope.pages.splice(pageIndex, 1);
			});
		},

		function(){
			console.log('You confirmed "No."');
		});
   	};

    $scope.addPage = function() {

   		if($scope.newPage === undefined || $scope.newPage.title == ""){
   			console.log('Vous devez fournir un titre !');
   		}
   		else {
	   		Page.save($scope.newPage,
	   			function(res){
		   			$scope.pages.push(res);
		   			$scope.newPage = {};
	   			}, 
	   			function(err){
	   				console.log("Error saving page !" + err);
	   			}
	   		);
	   	}
   };

   $scope.addPageFromDialog = function(){
   		var dlg = dialogs.create('./components/dialogs/adminPage/new_page_dialog.html', 
		'newPageDialogController', 
		{}, 
		'lg');

		dlg.result.then(function(entered_title){
			Page.save({title: entered_title},
	   			function(res){
		   			$scope.pages.push(res);
		   			$scope.newPage = {};
	   			}, 
	   			function(err){
	   				console.log("Error saving page !" + err);
	   			}
	   		);
		},

		function(){
			console.log('You confirmed "No."');
		});
   };

}])

.controller('deletePageDialogController', function($scope, $modalInstance, data){

		$scope.data = data;

		console.log("ogogl");
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		};
		
		$scope.save = function(){
			$modalInstance.close();
		};

})

.controller('newPageDialogController', function($scope, $modalInstance, data){
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		};
		
		$scope.save = function(){
			$modalInstance.close($scope.title);
		};

		$scope.hitEnter = function(evt){
			if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.user.name,null) || angular.equals($scope.user.name,'')))
				$scope.save();
		};

});
