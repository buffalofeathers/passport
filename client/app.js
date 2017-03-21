angular.module('Auth', ['ngRoute', 'ngResource', 'Auth.factories', 'Auth.controllers', 'Auth.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })
    .when('/users', {
        templateUrl: 'views/userslist.html',
        controller: 'UserListController'
    })
    .when('/users/create', {
        templateUrl: 'views/createuser.html',
        controller: 'CreateUserController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/createuser', {
        templateUrl: 'views/createuser.html',
        controller: 'CreateUserController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);