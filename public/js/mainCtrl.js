var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, $http, $animate, userService, googleService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];

$scope.getUser = function(){
  $scope.user = userService.currentUser().then(function(res){
    $scope.user = res;

  })
};

$scope.targetForReview = function(){


}

$scope.googleBookSearch = [];
$scope.getBooksRegSearch = function(regSearchText, typeOfSearch){
      console.log(regSearchText);
    $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText, typeOfSearch)
    .then(function(res){
      $scope.googleBookSearch = res;
      console.log($scope.googleBookSearch)
    })
};

// Injecting getUser function from app.js resolve.
// $scope.user = getUser;

})
