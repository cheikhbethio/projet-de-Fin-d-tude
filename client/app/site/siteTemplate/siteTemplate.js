'use strict';


angular.module('myWordPress.siteTemplate', ['ui.router'])

.controller('siteTemplateController', ['$scope', '$rootScope', '$state','$stateParams', '$localStorage', 'Preferences', 'Menu', 'CurrentUser', 'Page',
        function($scope, $rootScope, $state, $stateParams, $localStorage, Preferences, Menu, CurrentUser, Page){

                $scope.menus = Menu.query();
                $scope.home = Page.get({ id: "home"});
                $scope.user = CurrentUser;

                Preferences.get(function(preferences){
                        $scope.preferences = preferences;
                });
                
                $scope.isActiveHome = function (viewLocation) {
                        return viewLocation === $state.params.id;
                }

                $scope.isActiveHeader = function (viewLocation) {
                	return viewLocation === $state.current.name;
                }

                $scope.isActiveHeaderPage = function (stateParamsId) { 
                        return stateParamsId === $state.params.id;
                }

                $scope.isUserConnected = function() {
                	return CurrentUser.isLoggedIn();
                }

                $scope.logOut = function() {
                        CurrentUser.clear();
                        $state.go("site.home", {connectionSuccess:false});
                }

                $scope.search= function(key){
                        $state.go('site.searchKeyWord',{keywords: key});
                }
}]);