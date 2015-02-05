angular.module('like-button',[])
.directive('likeButton', function(){
    return {
        restrict: 'E',
        scope: {
            startlikes: '=?',
            // starting-value: '@count'
        },
    controller:  ['$scope', function($scope){
            $scope.like = $scope.startlikes ? $scope.startlikes : 0
            $scope.liked = function(){
                $scope.like++
            }
        }],
        replace: true,
        template:'<button class="btn btn-primary" ng-click="liked()" startlikes="">Likes : {{like}}</button>'
   }
});