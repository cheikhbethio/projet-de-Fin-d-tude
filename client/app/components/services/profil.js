angular.module('myWordPress.profilService', ['ngResource'])

.factory('User_articles', ['$resource', function($resource){
	return $resource('/api/articles_editor/:id', {}, {
    	get: {method:'GET', isArray:true}
    });
}])
 .factory('User_comments', ['$resource', function($resource){
	return $resource('/api/comments_editor/:id', {}, {
    	get: {method:'GET', isArray:true}
    });
  }])
 .factory('Profile', ['$resource', function($resource){
	return $resource('/api/users/:id/profile', {}, {    	
    	get: {method:'GET', isArray:false}
    });
  }]);
