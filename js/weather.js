angular.module('weather', [])
.directive('weather', function(){
    return{
        restrict: 'E',
        scope: {
            location: '=?',
            weather: '@?'
        },
        controller: ['$scope', '$http', function($scope, $http){
            $scope.location = " Seattle";

            $scope.widget = function(){
                var req = {
                url: "http://api.openweathermap.org/data/2.5/weather?",
                params: {
                q: $scope.location
                    }
                }
                $http(req).success(function(data){
                    $scope.weather = data.weather[0].description
                })
            }
        $scope.widget()
    }],
    replace: true,
        template: '<small>{{location}}, {{weather}}</small>'
  }
})