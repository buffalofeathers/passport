angular.module('Auth.factories', [])
.factory('User', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/users/:id', { id: '@id'}, {
        update: { method: 'PUT'}
    })
}])