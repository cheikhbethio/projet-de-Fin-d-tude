angular.module('myWordPress.preferenceService', ['ngResource'])

.factory('Preferences', ['$resource', function($resource){
	return $resource('http://localhost:4711/api/preferences', {}, {
    	get: {method:'GET', isArray:false},
    	save: {method:'PUT', isArray:false}
    });
  }]);