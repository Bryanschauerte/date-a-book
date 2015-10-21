var app = angular.module('dateABook')
.controller('searchCtrl', function($scope, $http, $animate, userService, googleService, $timeout, bookService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];

$scope.enterInfo = true;
$scope.searchResults = [];
$scope.lookingFor = {};

$scope.testRate = {
  violence: 0,
  loveEct: 0,
  suspence: 0,
  realism: 0,
  horror: 0,
  humor: 0,
  scienceFiction: 0,
  supernaturalContent: 0,
  understandability: 0
}


$scope.getUser = function(){
  if(!$scope.user){
    $scope.user = userService.getUser().then(function(res){
      $scope.user =res.userInfo;

    })
  }
};

$scope.reviewsSearch = function(){
  //check to see if in db
  $scope.searchHappening = true;
for(var crit in $scope.lookingFor){
  var target
}
$scope.searchHappening = false;



};



})
