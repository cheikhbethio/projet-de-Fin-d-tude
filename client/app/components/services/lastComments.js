angular.module('myWordPress.lastCommentService', ['ngResource'])

.factory('LastComment', ['$resource', function($resource){
	return $resource('/api/last_comments', {}, {    	
    	getLast: {method:'GET', isArray:true}
    });
  }]);
