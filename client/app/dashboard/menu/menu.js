'use strict';


angular.module('myWordPress.admin.menu', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider.state('dashboard.indexMenu', {
		url: '/menu',
		templateUrl: 'dashboard/menu/index.html',
		controller: 'indexMenuController'
	})

}])

.controller('indexMenuController', ['$scope', '$state','$stateParams', 'Page', 'Preferences', 'Menu', 'CurrentUser', 'dialogs',
function($scope, $state, $stateParams, Page, Preferences, Menu, CurrentUser, dialogs){
	$scope.boolAdd = false;
	$scope.firstTabSelected = true;
	$scope.preferences = Preferences.get();

	$scope.pages = Page.query();
	$scope.menus = Menu.query();
	$scope.user = CurrentUser;

	$scope.dropdown = [{ 
		title : "", 
		page : {}
	}];

	$scope.addSubMenu = function(){
		$scope.dropdown.push({
			title : "",
			page : {}
		});
	}

	$scope.showAddMenu = function(){
		$scope.boolAdd = true;
	}



	$scope.saveMenuSimple = function() {
		if ($scope.createMenuForm.$valid){ 
			
			var newMenu={
			   	name: $scope.menu.title,
				single: $scope.firstTabSelected,
				page: $scope.menu.page._id
			};

			Menu.save(newMenu, function(savedMenu){
				$scope.menus.push(savedMenu);
				$scope.resetMenuCreation();
			});

		} else {
			console.log('Formulaire Invalide.');
		}
	}

	$scope.saveMenuDropDown = function() {

		if ($scope.createMenuForm.$valid){ 
			
			var newMenu = {
			   	name: $scope.menu.title,
				single: $scope.firstTabSelected,
				dropdown: $scope.dropdown
			};

			Menu.save(newMenu, function(savedMenu){
				$scope.menus.push(savedMenu);
				$scope.resetMenuCreation();
			});

		} else {
			console.log('Formulaire Invalide.');
		}
	}

	$scope.resetMenuCreation = function(){
		$scope.menu = {};
				$scope.dropdown = [{ 
				title : "", 
				page : {}
			}];

		$scope.boolAdd = false;
	};

	$scope.deleteMenu = function(menuIndex){

		var dlg = dialogs.create('./components/dialogs/menu/confirmation_dialog.html', 
		'confirmationDialogController', 
		{ menuname: $scope.menus[menuIndex].name },
		'lg');

		dlg.result.then(function(){
			Menu.remove({id: $scope.menus[menuIndex]._id }, function(removed_menu){
				$scope.menus.splice(menuIndex, 1);
			});
		});
	};

}])

.controller('confirmationDialogController', function($scope, $modalInstance, data){

		$scope.menuname = data.menuname;
		
		$scope.cancel = function(){
			$modalInstance.dismiss('Canceled');
		};
		
		$scope.save = function(){
			$modalInstance.close();
		};

});
