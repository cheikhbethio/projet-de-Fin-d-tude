angular.module('myWordPress.rightService', ['ngResource'])

.factory('Right', ['$resource', function($resource){
	return $resource('/api/users/:id/right', {}, {    	
    	update: {method:'PUT', isArray:false}
    });
  }]);
