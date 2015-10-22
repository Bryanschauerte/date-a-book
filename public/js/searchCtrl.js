var app = angular.module('dateABook')
.controller('searchCtrl', function($scope, $http, $animate, userService, googleService, $timeout, bookService, $mdToast){
$scope.getUser();


$scope.searchCriteria = ["Author", "Title"];
$scope.showSearchFields = true;
$scope.range =0;
$scope.enterInfo = true;
// $scope.searchResults = [];

// dummy data

$scope.searchResults = [{
  title: "how to be a shoe",
  author: ["red-sock", "blueSock"],
  publishDate: "1222",
  description:"How to think and do like a shoe. Stop being a sock today!",
  loveEct:0,
  violence:0,
  suspence:0,
  realism:0,
  horror:0,
  humor:0,
  scienceFiction:0,
  supernaturalContent:0,
  understandability:0

}]
// dummy data

$scope.lookingFor = {
  genre: "",
  violence: 2,
  loveEct: 9,
  suspence: 0,
  realism: 10,
  horror: 0,
  humor: 4,
  scienceFiction: 7,
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

$scope.getAllBooks = function() {

  $scope.books = bookService.getAllBooks()
  .then(function(resolve){
    $scope.books = resolve;
  });
};




$scope.reviewsSearch = function(lookingFor, range){

  $scope.searchResults = [];
  $scope.showSearchFields = false;
  //check to see if in db
  $scope.searchHappening = true;

  $scope.matchCount = 0


  $scope.books = bookService.getAllBooks()
  .then(function(resolve){
    $scope.books = resolve.data;
//

for(var book in $scope.books){


var crit = {
loveEct:0,
  violence:0,
suspence:0,
realism:0,
horror:0,
  scienceFiction:0,
supernaturalContent:0,
  understandability:0
};
var count = 0;


book.reviews.forEach(function(item){

crit.loveEct += item["loveEct"];
crit.violence += item["violence"];
crit.suspence += item["suspence"];
crit.realism += item["realism"];
crit.horror += item["horror"];
crit.scienceFiction += item["scienceFiction"];
crit.supernaturalContent += item["supernaturalContent"];
crit.understandability += item["understandability"];
count +=1;

})

for(var part in crit){
part = part/count;
}
//
console.log(crit);

  crit.forEach(function(item){

    if((lookingFor["loveEct"]-range) <= item["loveEct"] <= (lookingFor["loveEct"]+range)){
      $scope.matchCount +=1
    }

    if((lookingFor["violence"]-range) <= item["loveEct"] <= (lookingFor["violence"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["suspence"]-range) <= item["suspence"] <= (lookingFor["suspence"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["realism"]-range) <= item["realism"] <= (lookingFor["realism"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["horror"]-range) <= item["horror"] <= (lookingFor["horror"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["scienceFiction"]-range) <= item["scienceFiction"] <= (lookingFor["scienceFiction"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["supernaturalContent"]-range) <= item["supernaturalContent"] <= (lookingFor["supernaturalContent"]+range)){
      $scope.matchCount +=1
    }
    if((lookingFor["understandability"]-range) <= item["understandability"] <= (lookingFor["understandability"]+range)){
      $scope.matchCount +=1
    }

    if($scope.matchCount >= 5){
    $scope.searchResults.push(item);
    }
}
})

for(var i = 0; i < $scope.searchResults.length; i++){
  $scope.searchResults[i].author = Array($scope.searchResults[i].author);

}

  });
};
//
// $scope.searchHappening = false;
//
//
//
// };


$scope.resetSeaches = function(){
$scope.showSearchFields = true;
$scope.enterInfo = true;
$scope.searchHappening = false;
$scope.lookingFor = {
  genre: "",
  violence: 0,
  loveEct: 0,
  suspence: 0,
  realism: 0,
  horror: 0,
  humor: 0,
  scienceFiction: 0,
  supernaturalContent: 0,
  understandability: 0
};

$scope.searchResults = [];


}


})
