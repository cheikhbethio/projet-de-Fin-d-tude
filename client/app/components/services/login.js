'use strict';

/* Services */

angular.module('myWordPress.loginService', ['ngResource'])
.factory('Login', ['$resource', function($resource){
	return $resource('/api/login', {}, {
		login: {method:'POST', isArray:false}
	});
}]);


