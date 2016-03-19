angular.module('myWordPress.articleService', ['ngResource'])

.factory('Article', ['$resource', function($resource){
	return $resource('/api/articles/:id', {}, {
    	query: {method:'GET', isArray:true},
    	get: {method:'GET', isArray:false},
    	save: {method:'POST', isArray:false},
     	update: {method:'PUT', isArray:false},
     	remove : {method : 'DELETE'}
    });
  }]);
