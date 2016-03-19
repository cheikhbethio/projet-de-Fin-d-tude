angular.module('myWordPress.userService', ['ngResource'])

.factory('User', ['$resource',
  function($resource){
    return $resource('/api/users/:id', {}, {
      register: {method:'POST', isArray:false },
      get: {method:'GET', isArray:false },
      update: {method:'PUT', isArray:false},
      query: {method: 'GET', isArray:true}
    });
}]);