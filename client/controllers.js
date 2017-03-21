angular.module('Auth.controllers', [])
.controller('UserListController', ['$scope', 'User', 'UserService', function($scope, User, UserService) {
    UserService.requireLogin();
    $scope.users = User.query();
}])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    UserService.me().then(function(me) {
        redirect();
    });
    function redirect() {
        var dest = $location.search().p;
        if(!dest) {
            dest = '/';
        }
        $location.path(dest).search('p', null);
    }

    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }
}])
.controller('CreateUserController', ['$scope', 'User', function ($scope, User) {

    $scope.create = function() {
        var data = {
            email: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        }

        var user = new User(data);
        user.$save(function(success) {
            console.log('user saved!');
            console.log(success);       
        });    
    }
}])