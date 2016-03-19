angular.module('myWordPress.tokenService', ['ngResource'])

.factory('Token', ['$resource', function($resource){
	return $resource('/api/token', {}, {
		login : {method:'POST', isArray:false}
	});
}]);


