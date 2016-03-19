'use strict';

angular.module('myWordPress', [
    // site
	'myWordPress.registration',
	'myWordPress.siteTemplate',
	'myWordPress.connection',
	'myWordPress.editProfile',
	'myWordPress.pages',
    'myWordPress.site.article',
    'myWordPress.site.home',
    'myWordPress.site.searchKeyWord',
    'myWordPress.showProfile',
    'myWordPress.gestionFavoris',
    'myWordPress.Statistiques',    

    // admin
    'myWordPress.editPage',
    'myWordPress.adminPage',
	'myWordPress.userService',
    'myWordPress.pageService',
    'myWordPress.articleService',
    'myWordPress.commentService',
    'myWordPress.loginService',
    'myWordPress.admin.article',
    'myWordPress.admin.home',
    'myWordPress.sitePreferences',
    'myWordPress.site.article',
    'myWordPress.pageArticleService',
    'myWordPress.preferenceService',
    'myWordPress.admin.menu',
    'myWordPress.dashboardTemplate',
    'myWordPress.listMember',

    // libs
    'colorpicker.module',
	'ui.bootstrap.showErrors',
	'ui.router',
	'contenteditable',
    'ngStorage',    
    'textAngular',
    'snap',
    'ngToast',
    'minicolors',
    'ui.bootstrap',
    'ui.bootstrap.modal',
    'dialogs.main',

    // services
    'myWordPress.keywordService',
    'myWordPress.pageArticleService',
    'myWordPress.userService',
    'myWordPress.pageService',
    'myWordPress.articleService',
    'myWordPress.loginService',
    'myWordPress.tokenService',
    'myWordPress.service.menuService',
    'myWordPress.lastArticleService',
    'myWordPress.lastCommentService',
    'myWordPress.statisticService',
    'myWordPress.profilService',
    'myWordPress.favoriteService',
    'myWordPress.rightService',
    'myWordPress.currentUser',


    // directives
	'myWordPress.registration.registration-directive',
    'myWordPress.siteTemplate.siteTemplate-directive'
])

.config(['$stateProvider', '$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state("site", {
		views: {
            'header': {
                templateUrl: 'site/siteTemplate/header.html',
                controller: 'siteTemplateController'
            },
            'content': {
                templateUrl: 'site/siteTemplate/content.html',
                controller: 'siteTemplateController'
            },
            'footer': {
                templateUrl: 'site/siteTemplate/footer.html'
            }
        },
        data: { 
            requireLogin: false
        }
	})
	.state("dashboard", {
		url: '/dashboard',
		views: {
            'header': {
                templateUrl: 'dashboard/dashboardTemplate/header.html',
                controller: 'dashboardTemplateController'
            },
            'content': {
                templateUrl: 'dashboard/dashboardTemplate/content.html',
                controller: 'dashboardTemplateController'
            }
        },
        data: { 
            requireLogin: true,
            requireLoginDashboard: true
        }
	});

}])

.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      maxNumber: 1,
      dismissOnTimeout: true,
      timeout: 2000
    });
}])

.config(function (minicolorsProvider) {
    angular.extend(minicolorsProvider.defaults, {
        theme: 'bootstrap'
    });
})

.run(function ($rootScope,  $state, CurrentUser) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var requireLoginDashboard = toState.data.requireLoginDashboard;

        if ((requireLogin && !CurrentUser.isLoggedIn()) || (requireLoginDashboard && CurrentUser.getRight() == 0)) {
            event.preventDefault();
            $state.go('site.connection');
        } 
  });

})


.run(['$localStorage','$injector',function($localStorage,$injector){
    $injector.get("$http").defaults.transformRequest=function(data, headersGetter){
        if($localStorage.accessToken){
           headersGetter()['x-access-token']=$localStorage.accessToken;
        }
        if(data){
            return angular.toJson(data);
        }
    }
}]);