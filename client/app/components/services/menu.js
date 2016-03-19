angular.module('myWordPress.service.menuService', ['ngResource'])

.factory('Menu', ['$resource', function($resource){
	return $resource('/api/menus/:id', {}, {
    	query: {method:'GET', isArray:true},
    	save: {method:'POST', isArray:false},
     	update: {method:'PUT', isArray:true},
     	remove : {method : 'DELETE'}
    });
  }]);
