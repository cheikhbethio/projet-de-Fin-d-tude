angular.module('myWordPress.keywordService', ['ngResource'])

.factory('KeyWord', ['$resource', function($resource){
	return $resource('/api/search/article', {}, {    	
    	get: {method:'GET', isArray:true}
    });
  }]);
