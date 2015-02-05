var redditApp = angular.module("RedditApp", ['ui.bootstrap', 'like-button', 'weather']);

console.log('running...');

redditApp.filter('imgFilter', function(){
  return function(img){
    var thumbs = [];
    for(var i = 0; i < img.length; i++ ){
      if(img[i].data.thumbnail.length > 4){
        thumbs.push(img[i]);
      }
        }
        return thumbs;
    }
});

redditApp.controller('RedditController', ['$scope', '$http', '$modal', function($scope, $http, $modal){
    $scope.posts = ""
    $scope.searchTerm = "";
    $scope.searchHistory = JSON.parse(window.localStorage.searchHistory || "[]");
    console.log($scope.searchHistory);

    //  try {
    //   $scope.terms = JSON.parse(window.localStorage.terms) || [];
    // }catch(e){
    //   console.log('error', e);
    //   $scope.terms = [];
    // }

     $scope.search = function(){

     var req = {
        url: "http://www.reddit.com/search.json?",
        params: {
          q: $scope.searchTerm
          // r: $scope.permaLink
        }};

        $http(req).success(function(data){

              $scope.posts = data.data.children;
               $scope.searchHistory.push($scope.searchTerm)
               window.localStorage.searchHistory = JSON.stringify($scope.searchHistory)
        })

     };

     $scope.reddit = function(idx){

        var req = {
          url: "http://www.reddit.com/search.json?",
          params: {
            q: $scope.searchHistory[idx]
          }
        };

        $http(req).success(function(data){
          $scope.posts = data.data.children
          // $scope.thumbnails = create for loop to skip 'self' thumbnail urls
         })
     };

     $scope.showAbout = function(){
          var aboutModal = $modal.open({
            templateUrl: 'aboutModal.html',
            controller: 'AboutModalCtrl',
            size: 'md'
          })
     }

      $scope.delete = function(index){
        $scope.searchHistory.splice(index,1)
        window.localStorage.searchHistory = JSON.stringify($scope.searchHistory)
    }

}]);

redditApp.controller('AboutModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){
    $scope.greeting = "good morning";
    $scope.closeThisModal = function(){
      $modalInstance.close();
    }
}]);
