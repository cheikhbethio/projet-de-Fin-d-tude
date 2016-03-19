'use strict';

/* Services */

angular.module('myWordPress.favoriteService', ['ngResource'])

.factory('AddFavorite', ['$resource', function($resource){
	return $resource('/api/users/:id_user/article/:id_art', {}, {    	
     	update: {method:'PUT', isArray:true},
     	remove : {method : 'DELETE', isArray:false}
    });
  }])
.factory('GetFavorite', ['$resource', function($resource){
	return $resource('/api/users/favoris/:id', {}, {
		get: {method:'GET', isArray:true},
	});
}]);
