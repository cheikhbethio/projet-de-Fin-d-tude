'use strict';


angular.module('myWordPress.dashboardTemplate', ['ui.router'])

.controller('dashboardTemplateController', ['$scope', '$state','$stateParams', 'CurrentUser',
	function($scope, $state, $stateParams, CurrentUser){

		$scope.menuOpen = false;
		$scope.user = CurrentUser;

		$scope.isActiveDashboard = function (viewLocation) {
        	return viewLocation === $state.current.name;
        }

        $scope.snapOpts = {
      		disable: 'right',
            touchToDrag: false
    	};
}]);