angular.module('myWordPress.pageService', ['ngResource'])

.factory('Page', ['$resource', function($resource){
	return $resource('/api/pages/:id', {}, {
    	query: {method:'GET', isArray:true},
    	get: {method:'GET', isArray:false},
    	save: {method:'POST', isArray:false},
     	update: {method:'PUT', isArray:false},
     	remove : {method : 'DELETE'}
    });
  }]);
