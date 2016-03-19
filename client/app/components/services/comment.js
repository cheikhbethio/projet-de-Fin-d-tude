'use strict';

/* Services */

angular.module('myWordPress.commentService', ['ngResource'])
.factory('Commentaire', ['$resource', function($resource){
	return $resource('/api/comments/:id', {}, {
		get: {method:'GET', isArray:true},
		save: {method:'POST', isArray:false}
	});
}]);


