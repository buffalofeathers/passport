angular.module('Auth.directives', [])
.directive('blogPost', function() {
    return {
        templateUrl: 'directives/post.html',
        restrict: 'E'
    }
});