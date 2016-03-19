angular.module('myWordPress.lastArticleService', ['ngResource'])

.factory('LastArticle', ['$resource', function($resource){
	return $resource('/api/last_articles', {}, {    	
    	getLast: {method:'GET', isArray:true}
    });
  }]);
