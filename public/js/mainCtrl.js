var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, $http, userService, googleService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];

$scope.getUser = function(){
  $scope.user = userService.currentUser().then(function(res){
    $scope.user = res;
    $scope.loggingIn();
  })
};

$scope.loggingIn = function(){
  if($scope.user){
    $scope.loggedIn();
  }else{
  $scope.notLoggedIn();
  }
};

$scope.loggedIn = function(){
  var $toastContent = $("Welcome! Youre logged in via Facebook");
  Materialize.toast($toastContent, 100);

};

$scope.notLoggedIn = function(){
  var $toastContent = $("Sorry! Youre Not logged in via Facebook! Try again!");
  Materialize.toast($toastContent, 100);

};


$scope.getBooksRegSearch = function(regSearchText){
      console.log(regSearchText);
    $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText)
    .then(function(res){
      $scope.regBooksToShow = res;

    })
  // }
};

//
// var $toastContent = $('I am toast content');
// Materialize.toast($toastContent, 5000);
//
//
// $scope.showSimpleToast = function(message) {
//     $mdToast.show(
//       $mdToast.simple()
//         .content('item Saved!')
//         .hideDelay(3000)
//     );


// Injecting getUser function from app.js resolve.
// $scope.user = getUser;

})
