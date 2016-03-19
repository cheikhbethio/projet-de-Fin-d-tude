'use strict';

/* Services */

var pageServices = angular.module('pageServices', ['ngResource']);

pageServices.factory('login', ['$resource', function($resource){
	return $resource('http://localhost:4711/api/login', {}, {
		login: {method:'POST', isArray:false}
	});
}]);


